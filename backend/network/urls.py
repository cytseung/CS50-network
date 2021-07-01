
from django.urls import path, include
from rest_framework.routers import DefaultRouter

from . import views

router = DefaultRouter()
router.register('post', views.PostViewSet)
router.register('comment', views.CommentViewSet)
router.register('user', views.UserViewSet)
urlpatterns = [
    # path("", views.index, name="index"),
    # path("login", views.login_view, name="login"),
    # path("logout", views.logout_view, name="logout"),
    # path("register", views.register, name="register"),
    path('', include(router.urls)),
    # path("users/", views.UserCreate.as_view(), name="user_create"),

]


