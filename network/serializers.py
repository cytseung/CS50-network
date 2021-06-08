from rest_framework import serializers
from .models import Post, Comment
from django.contrib.auth import get_user_model

User = get_user_model()

class PostSerializer(serializers.HyperlinkedModelSerializer):
    username = serializers.SerializerMethodField()
    class Meta:
        model = Post
        fields = ('id', 'text', 'createdOn', 'updated', 'user', 'username', 'comments', 'likedUsers', 'url', )
        read_only_fields = ['comments', 'likedUsers', 'user']
    def get_username(self, obj):
        return obj.user.username


class CommentSerializer(serializers.HyperlinkedModelSerializer):
    username = serializers.SerializerMethodField()
    class Meta:
        model = Comment
        fields = ('id', 'text', 'createdOn', 'updated', 'user', 'username', 'post', )
        read_only_fields = ['user']
    def get_username(self, obj):
        return obj.user.username

class UserSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'following', 'followers', 'url', )
