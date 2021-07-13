from django.contrib.auth import get_user_model
from django.db.models import query

from rest_framework import serializers
from rest_framework.authtoken.models import Token
from rest_framework.relations import PrimaryKeyRelatedField

from .models import Post, Comment


User = get_user_model()

class CommentSerializer(serializers.ModelSerializer):
    username = serializers.SerializerMethodField()
    user_id = serializers.SerializerMethodField()
    post = PrimaryKeyRelatedField(many=False, queryset = Post.objects.filter(deleted=None))
    class Meta:
        model = Comment
        fields = ('id', 'text', 'createdOn', 'updated', 'user', 'user_id', 'username', 'post', )
        read_only_fields = ['user']
    def get_username(self, obj):
        return obj.user.username
    def get_user_id(self,obj):
        return obj.user.id


class UserSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'password', 'following', 'followers',  )
        extra_kwargs={
            'password':{'write_only':True}, 
            'following':{'read_only':True},
            'followers':{'read_only':True},
            'url': {"lookup_url_kwarg": User.USERNAME_FIELD, "lookup_field":User.USERNAME_FIELD},
            }

    def create(self, validated_data):
        user = User(
            email=validated_data['email'],
            username = validated_data['username']
        )
        user.set_password(validated_data['password'])
        user.save()
        Token.objects.create(user=user)
        return user

class UserSerializerForUpdate(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('username', 'email', )

class PasswordSerializer(serializers.Serializer):
    new_password = serializers.CharField(required=True)

class PostSerializer(serializers.ModelSerializer):
    username = serializers.SerializerMethodField()
    user_id = serializers.SerializerMethodField()
    comments = CommentSerializer(many=True, read_only=True)
    likedUsers = PrimaryKeyRelatedField(many=True, read_only=True)
    likedUsersinfo = UserSerializer(many=True, read_only=True)
    class Meta:
        model = Post
        fields = ('id', 'text', 'createdOn', 'updated', 'user', 'user_id', 'username', 'comments', 'likedUsers','likedUsersinfo', 'url', 'deleted', )
        read_only_fields = ['comments', 'likedUsers', 'user']
        extra_kwargs={'deleted':{'write_only':True}}
    def get_username(self, obj):
        return obj.user.username
    def get_user_id(self,obj):
        return obj.user.id