from rest_framework import permissions


class IsOwnerOrReadOnly(permissions.BasePermission):
    """
    Object-level permission to only allow owners of an object to edit it.
    """
    def has_permission(self, request, view):
        if request.user.is_authenticated or request.method in permissions.SAFE_METHODS:
            return True
        return False

    def has_object_permission(self, request, view, obj):
        if request.method in permissions.SAFE_METHODS:
            return True
        return obj.user == request.user

class NotEditable(permissions.BasePermission):
    def has_permission(self, request, view):
        if request.method in permissions.SAFE_METHODS or (request.user.is_authenticated and request.method == "POST"):
            return True
        return False
    
    def has_object_permission(self, request, view, obj):
        if request.method in permissions.SAFE_METHODS:
            return True
        return False

class DisableOtherMethods(permissions.BasePermission):
    AllowedMethods = ["GET", "PUT", "POST", "HEAD"]
    def has_permission(self, request, view):
        if request.method not in self.AllowedMethods:
            print(request.method + "not allowed")
            return False
        return True
    
    def has_object_permission(self, request, view, obj):
        if request.method not in self.AllowedMethods:
            print(request.method + "not allowed")
            return False
        return True

class IsAdminUser(permissions.IsAdminUser):
    def has_object_permission(self, request, view, obj):
        return bool(request.user and request.user.is_staff)

class IsUserOrReadOnly(permissions.BasePermission):
    def has_permission(self, request, view):
        if request.user.is_authenticated or request.method in permissions.SAFE_METHODS:
            return True
        return False

    def has_object_permission(self, request, view, obj):
        if request.method in permissions.SAFE_METHODS:
            return True
        return obj == request.user