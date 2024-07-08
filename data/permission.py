from rest_framework import permissions

from .models import CustomUser,Organization,Contract,Exercise,File,Comment
from .models import FileAccess,MailBell,Share
from .models import OrgConRight,OrgExerRight,UserConRight,UserExerRight

class IsAdmin(permissions.BasePermission):#control Organization anf delete Contract
    def has_object_permission(self, request, view, obj):
        # if request.method in permissions.SAFE_METHODS:
        #     return True
        obj_type_name = type(obj).__name__
        if obj_type_name == "Organization":
             return request.user.is_staff
        if obj_type_name == "Contract":
             if request.method == 'delete':
                 return request.user.is_staff
             return True
        # if obj_type_name == "CustomUser":
        #     if request.data.get('is_active',None):
        #         return request.user.is_staff
        #     if request.data.get('is_staff',None):
        #         return request.user.is_staff
        #     if request.data.get('is_superuser',None):
        #         return request.user.is_staff
        #     else:
        #         return True
        return True

class IsInvited(permissions.BasePermission):#A modifier
    def has_object_permission(self, request, view, obj):
        return True

class IsPrincipalAndChief(permissions.BasePermission):#for updating Contrat and OrgConRight
    def has_object_permission(self, request, view, obj):
        if request.method != 'PUT' and request.method != 'PATCH':
            return True
        obj_type_name = type(obj).__name__
        if obj_type_name == "Contract":
            chief = OrgConRight.objects.get(con=obj,is_principal=True).chief
        if obj_type_name == "OrgExerRight":
            chief = OrgConRight.objects.get(con=obj.con,is_principal=True).chief
        return request.user == chief

class IsChief(permissions.BasePermission):#control Exercise and update UserExerRight
    def has_object_permission(self, request, view, obj):
        obj_type_name = type(obj).__name__
        if obj_type_name == "Exercise":
            chief = OrgConRight.objects.get(con=obj.con,org=obj.org).chief
        if obj_type_name == "UserExerRight":
            chief = OrgConRight.objects.get(con=obj.exer.con,org=obj.user.org).chief
        return chief == request.user 

class IsSelf(permissions.BasePermission):#for updating MailBell and Share
    def has_object_permission(self, request, view, obj):
        if request.method != 'PUT' and request.method != 'PATCH':
            return True
        obj_type_name = type(obj).__name__
        if obj_type_name == "MailBell":
            user = obj.user
        if obj_type_name == "Share":
            user = obj.from_user
        return request.user == user
    

class CanShare(permissions.BasePermission):#for creating share
    def has_obj_permission(self, request, view, obj):
        if request.method != 'POST':
            return True
        exer = obj.file.exer
        right = UserExerRight.objects.filter(user=request.user,exer=exer)
        if not right:
            return False
        access = FileAccess.objects.filter(user=request.user,file=obj.file)
        if not access:
            return False
        return right.share
class OrgConPermission(permissions.BasePermission):#for updating OrgConRight, a modifier
    def has_object_permission(self, request, view, obj):
        if request.method != 'POST':
            return True
        
        return True