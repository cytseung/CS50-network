import django_filters


from .models import Post, Comment

class PostFilter(django_filters.FilterSet):
    class Meta:
        model = Post
        fields = ('user', )

class CommentFilter(django_filters.FilterSet):
    class Meta:
        model = Comment
        fields = ('post', )