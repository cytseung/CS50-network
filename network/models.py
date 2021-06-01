from django.conf import settings
from django.contrib.auth.models import AbstractUser
from django.db import models


class CustomUser(AbstractUser):
    following = models.ManyToManyField(settings.AUTH_USER_MODEL, blank=True, related_name="followers")
    deleted=models.DateTimeField(null=True, blank=True)
    def __str__(self):
        return f"{self.id} - {self.username} {self.email}"

class Post(models.Model):
    text = models.CharField(max_length=150)
    createdOn = models.DateTimeField(auto_now_add=True)
    updated= models.DateTimeField(auto_now= True)
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="posts")
    likedUsers = models.ManyToManyField(settings.AUTH_USER_MODEL, blank=True, related_name="likedposts")
    deleted=models.DateTimeField(null=True, blank=True)
    def __str__(self):
        return f"post {self.id} -  by {self.user} '{self.text}'"

class Comment(models.Model):
    text = models.CharField(max_length=150)
    createdOn = models.DateTimeField(auto_now_add=True)
    updated= models.DateTimeField(auto_now= True)
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="comments")
    post = models.ForeignKey(Post, on_delete=models.CASCADE, related_name="comments")
    deleted=models.DateTimeField(null=True, blank=True)
    def __str__(self):
        return f"comment {self.id} to post {self.post} by {self.user} '{self.text}'"