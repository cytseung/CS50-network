from django.contrib.auth import authenticate, login, logout, get_user_model
from django.db import IntegrityError
from django.http import HttpResponse, HttpResponseRedirect
from django.shortcuts import render
from django.urls import reverse

from rest_framework import permissions, viewsets, filters
from rest_framework.decorators import action, permission_classes
from rest_framework.response import Response
from rest_framework.exceptions import ParseError, ValidationError, NotFound

from django_filters.rest_framework import DjangoFilterBackend

from .models import Post, Comment
from .serializers import PostSerializer, CommentSerializer, UserSerializer
from .forms import PostFilter, CommentFilter
from .permissions import IsOwnerOrReadOnly, IsAdminUser

User = get_user_model()

class DefaultsMixin(object):
    """Default settings for permissions and filtering """
    permission_classes = (
        # permissions.IsAuthenticatedOrReadOnly,
        permissions.IsAuthenticated,
    )
    filter_backends = (
        DjangoFilterBackend,
        # filters.SearchFilter,
    )        

class PostViewSet(DefaultsMixin, viewsets.ModelViewSet):
    """API endpoint for listing and creating posts."""
    queryset = Post.objects.filter(deleted=None).order_by('-createdOn')
    serializer_class = PostSerializer
    filter_class = PostFilter
    # searchfields = ('user', )

    permission_classes = [IsOwnerOrReadOnly|IsAdminUser]

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

    @action(detail=True, methods=['put'], permission_classes=[permissions.IsAuthenticated])
    def toggle_like_post(self, request, pk=None):
        post = self.get_object()
        if post.deleted != None:
            raise NotFound()
        if request.data['like']:
            if request.data['like'] == "True":
                if request.user not in post.likedUsers.filter(deleted=None):
                    post.likedUsers.add(request.user)
                    return Response({"status":"liked post"})
                else:
                    raise ValidationError({'like': 'Cannot like a post twice.'})
            elif request.data['like'] == "False":
                if request.user in post.likedUsers.filter(deleted=None):
                    post.likedUsers.remove(request.user)
                    return Response({"status":"unliked post"})
                else:
                    raise ValidationError({'like': 'Cannot unlike a post twice.'})
            else:
                raise ParseError({'like':'like can only be either True or False.'})
        else:
            raise ParseError()
            

    @action(detail=False, methods=['get'], permission_classes=[permissions.IsAuthenticated])
    def following(self, request):
        following_users = request.user.following.filter(deleted=None)
        posts = Post.objects.filter(user__in=following_users).filter(deleted=None)
        serializer = self.get_serializer(posts, many=True)
        return Response(serializer.data)
        

        


class CommentViewSet(DefaultsMixin, viewsets.ModelViewSet):
    """API endpoint for listing and creating commments."""
    queryset = Comment.objects.filter(deleted=None).order_by('createdOn')
    serializer_class = CommentSerializer
    filter_class = CommentFilter
    # searchfields = ('post', )

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)



class UserViewSet(DefaultsMixin, viewsets.ReadOnlyModelViewSet):
    queryset = User.objects.filter(deleted=None)
    serializer_class = UserSerializer


    @action(detail=True, methods=['put'], permission_classes=[permissions.IsAuthenticated])
    def toggle_follow_user(self, request, pk=None):
        user = self.get_object()
        if user.deleted != None:
            raise NotFound()
        if request.data['follow']:
            if request.data['follow'] == "True":
                if user == request.user:
                    raise ValidationError({'follow': 'You cannot follow yourself.'})
                elif user not in request.user.following.all():
                    request.user.following.add(user)
                    return Response({"status":"following user {username}".format(username=user.username)})
                else:
                    raise ValidationError({'follow': 'Cannot follow a user twice.'})
            elif request.data['follow'] == "False":
                if user not in request.user.following.all():
                    request.user.following.remove(user)
                    return Response({"status":"unfollowed user {username}".format(username=user.username)})
                else:
                    raise ValidationError({'follow': 'You are not following user {username}'.format(username=user.username)})
            else:
                raise ParseError({'follow':'follow can only be either True or False.'})
        else:
            raise ParseError()

def index(request):
    return render(request, "network/index.html")


def login_view(request):
    if request.method == "POST":

        # Attempt to sign user in
        username = request.POST["username"]
        password = request.POST["password"]
        user = authenticate(request, username=username, password=password)

        # Check if authentication successful
        if user is not None:
            login(request, user)
            return HttpResponseRedirect(reverse("index"))
        else:
            return render(request, "network/login.html", {
                "message": "Invalid username and/or password."
            })
    else:
        return render(request, "network/login.html")


def logout_view(request):
    logout(request)
    return HttpResponseRedirect(reverse("index"))


def register(request):
    if request.method == "POST":
        username = request.POST["username"]
        email = request.POST["email"]

        # Ensure password matches confirmation
        password = request.POST["password"]
        confirmation = request.POST["confirmation"]
        if password != confirmation:
            return render(request, "network/register.html", {
                "message": "Passwords must match."
            })

        # Attempt to create new user
        try:
            user = User.objects.create_user(username, email, password)
            user.save()
        except IntegrityError:
            return render(request, "network/register.html", {
                "message": "Username already taken."
            })
        login(request, user)
        return HttpResponseRedirect(reverse("index"))
    else:
        return render(request, "network/register.html")
