
from django.urls import path, include

from rest_framework.routers import DefaultRouter
from rest_framework.authtoken.views import obtain_auth_token

from . import views

router = DefaultRouter()
router.register('post', views.PostViewSet)
router.register('comment', views.CommentViewSet)
router.register('user', views.UserViewSet)
urlpatterns = [
    path('', include(router.urls)),
    path("token/", views.CustomAuthToken.as_view(), name='api-token'),
    path("logout/", views.LogoutView.as_view(), name="logout"),

]


