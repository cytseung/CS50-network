import django_filters

from django.contrib.auth import get_user, get_user_model

from .models import Post, Comment

User = get_user_model()

class PostFilter(django_filters.FilterSet):
    username = django_filters.CharFilter()
    class Meta:
        model = Post
        fields = ('user', )
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.filters['user'].extra.update(
            {'to_field_name':User.USERNAME_FIELD}
        )

class CommentFilter(django_filters.FilterSet):
    class Meta:
        model = Comment
        fields = ('post',  )