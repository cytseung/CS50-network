import datetime

from django.contrib.auth import authenticate, login, logout, get_user_model
from django.db import IntegrityError
from django.http import HttpResponse, HttpResponseRedirect
from django.shortcuts import render
from django.urls import reverse

from rest_framework import generics
from rest_framework import permissions, viewsets, filters
from rest_framework.decorators import action, permission_classes
from rest_framework.response import Response
from rest_framework.exceptions import ParseError, ValidationError, NotFound
from rest_framework import status
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.authtoken.models import Token

from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.views import APIView

from .models import Post, Comment
from .serializers import PostSerializer, CommentSerializer, UserSerializer, PasswordSerializer, UserSerializerForUpdate
from .forms import PostFilter, CommentFilter
from .permissions import IsOwnerOrReadOnly, NotEditable, IsAdminUser, DisableOtherMethods, IsUserOrReadOnly

User = get_user_model()

class DefaultsMixin(object):
    """Default settings for permissions and filtering """
    permission_classes = (
        permissions.IsAuthenticatedOrReadOnly,
        # permissions.IsAuthenticated,
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

    permission_classes = [(DisableOtherMethods & IsOwnerOrReadOnly)|IsAdminUser]

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

    @action(detail=True, methods=['put'], permission_classes=[IsOwnerOrReadOnly|IsAdminUser])
    def delete(self, request, pk=None):
        post = self.get_object()
        print(post.deleted)
        if post.deleted != None:
            raise NotFound()
        if request.data['delete']:
            if request.data['delete'] == "True":
                serializer = PostSerializer(post, data={"deleted":datetime.datetime.now()}, partial=True)
                serializer.is_valid()
                print(serializer.validated_data.items())
                serializer.save()
                return Response({"status":"deleted post"})
            else:
                raise ParseError({'delete':'delete can only be True.'})
        else:
            raise ParseError()

        


    @action(detail=False, methods=['get'], permission_classes=[permissions.IsAuthenticated])
    def following(self, request):
        following_users = request.user.following.filter(deleted=None)
        posts = Post.objects.filter(user__in=following_users).filter(deleted=None).order_by('-createdOn')
        
        page = self.paginate_queryset(posts)

        if page is not None:
            serializer = self.get_serializer(page, many=True)
            return self.get_paginated_response(serializer.data)

        serializer = self.get_serializer(page, many=True)
        return Response(serializer.data)

            

class CommentViewSet(DefaultsMixin, viewsets.ModelViewSet):
    """API endpoint for listing and creating commments."""
    queryset = Comment.objects.filter(deleted=None).order_by('createdOn')
    serializer_class = CommentSerializer
    filter_class = CommentFilter
    # searchfields = ('post', )

    permission_classes=[(DisableOtherMethods&NotEditable)|IsAdminUser]

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

    def perform_update(self, serializer):
        post = self.get_object().post
        serializer.save(post=post)



class UserViewSet(DefaultsMixin, viewsets.ModelViewSet):
    queryset = User.objects.filter(deleted=None)
    serializer_class = UserSerializer
    # permission_classes=[(DisableOtherMethods&NotEditable)|IsAdminUser]
    permission_classes=[permissions.AllowAny]

    def get_permissions(self):
        if self.action == 'create':
            permission_classes = [permissions.AllowAny]
        elif self.action == 'destroy':
            permission_classes = [IsAdminUser]
        else:
            permission_classes  = [IsAdminUser|IsUserOrReadOnly]
        return [permission() for permission in permission_classes]
    
    def get_serializer_class(self):
        serializer_class = self.serializer_class

        if self.request.method == 'PUT':
            serializer_class = UserSerializerForUpdate

        return serializer_class

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
                    raise ValidationError({'follow': 'Cannot follow a user more than once.'})
            elif request.data['follow'] == "False":
                if user in request.user.following.all():
                    request.user.following.remove(user)
                    return Response({"status":"unfollowed user {username}".format(username=user.username)})
                else:
                    raise ValidationError({'follow': 'You are not following user {username}'.format(username=user.username)})
            else:
                raise ParseError({'follow':'follow can only be either True or False.'})
        else:
            raise ParseError()

    @action(detail=True, methods=['post'], permission_classes=[permissions.AllowAny])
    def set_password(self, request, pk=None):
        user = self.get_object()
        serializer = PasswordSerializer(data=request.data)
        if serializer.is_valid():
            user.set_password(serializer.validated_data['new_password'])
            user.save()
            return Response({'status': 'password set'})
        else:
            return Response(serializer.errors,
                            status=status.HTTP_400_BAD_REQUEST)



# class UserCreate(generics.CreateAPIView):
#     queryset = User.objects.filter(deleted=None)
#     serializer_class = UserSerializer


# def index(request):
#     return render(request, "network/index.html")

# class LoginView(APIView):
#     permissions_classes = []
#     def post(self, request,):
#         username = request.data.get("username")
#         password = request.data.get("password")
#         user = authenticate(username=username, password=password)
#         if user:
#             return Response({"token": user.auth_token.key})
#         else:
#             return Response({"error": "Wrong Credentials"}, status=status.HTTP_400_BAD_REQUEST)

# def login_view(request):
#     if request.method == "POST":

#         # Attempt to sign user in
#         username = request.POST["username"]
#         password = request.POST["password"]
#         user = authenticate(request, username=username, password=password)

#         # Check if authentication successful
#         if user is not None:
#             login(request, user)
#             return HttpResponseRedirect(reverse("index"))
#         else:
#             return render(request, "network/login.html", {
#                 "message": "Invalid username and/or password."
#             })
#     else:
#         return render(request, "network/login.html")

class LogoutView(APIView):
    # permissions_classes = [permissions.IsAuthenticated]
    def post(self,request,):
        try:
            request.user.auth_token.delete()
            return Response("User is logged out", status=status.HTTP_200_OK)
        except AttributeError:
            print("User is not logged in")
            return Response("User is not logged in", status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            return Response("An error occurred", status=status.HTTP_400_BAD_REQUEST )
            

class CustomAuthToken(ObtainAuthToken):

    def post(self, request, *args, **kwargs):
        serializer = self.serializer_class(data=request.data,
                                           context={'request': request})
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data['user']
        token, created = Token.objects.get_or_create(user=user)
        return Response({
            'token': token.key,
            'user_id': user.pk,
            'user_name': user.username,
            # 'email': user.email
        })

# def logout_view(request):
#     logout(request)
#     return HttpResponseRedirect(reverse("index"))


# def register(request):
#     if request.method == "POST":
#         username = request.POST["username"]
#         email = request.POST["email"]

#         # Ensure password matches confirmation
#         password = request.POST["password"]
#         confirmation = request.POST["confirmation"]
#         if password != confirmation:
#             return render(request, "network/register.html", {
#                 "message": "Passwords must match."
#             })

#         # Attempt to create new user
#         try:
#             user = User.objects.create_user(username, email, password)
#             user.save()
#         except IntegrityError:
#             return render(request, "network/register.html", {
#                 "message": "Username already taken."
#             })
#         login(request, user)
#         return HttpResponseRedirect(reverse("index"))
#     else:
#         return render(request, "network/register.html")
