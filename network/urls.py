
from django.urls import path
from rest_framework.routers import DefaultRouter

from . import views

urlpatterns = [
    path("", views.index, name="index"),
    path("login", views.login_view, name="login"),
    path("logout", views.logout_view, name="logout"),
    path("register", views.register, name="register")
]

router = DefaultRouter()
router.register('post', views.PostViewSet)
router.register('comment', views.CommentViewSet)
