# from django.shortcuts import render,get_object_or_404
from django.http import HttpResponse,Http404
from rest_framework import viewsets,views
from rest_framework.permissions import AllowAny
from rest_framework.response import Response

from .models import CustomUser,Organization,Contract,Exercise,File,Comment
from .models import FileAccess,MailBell,Share
from .models import OrgConRight,OrgExerRight,UserConRight,UserExerRight
from .serializers import UserSerializer,OrgSerializer,ConSerializer,ExerSerializer,FileSerializer,CommentSerializer,ShareSerializer
from .serializers import MailBellSerializer,FileAccessSerializer
from .serializers import OrgConRightSerializer,UserConRightSerializer,OrgExerRightSerializer,UserExerRightSerializer
from .serializers import MySpaceShareSerializer,MySpaceAllSerializer,OrgSpaceSerializer
# from .serializers import TestSerializer
from .filters import UserFilter,OrgFilter,ConFilter,ExerFilter,FileFilter,CommentFilter
# from django.template import loader

#from .models import CustomUser

def index(request):
    return HttpResponse("Here drops the principal homepage.")

# def profile(request,id):
#     name = CustomUser.__str__(CustomUser.getter(id))
#     return HttpResponse("Here drops the homepage of %s." % name)

class UserViewSet(viewsets.ModelViewSet):
    queryset = CustomUser.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny]
    filterset_class = UserFilter
    ordering_fields = ["id",]
    # Open this method in the product environment
    # def create(self,request,*args,**kwargs): 
    #     return Response({"detail":"Creating users via this API is not allowed."})
class OrgViewSet(viewsets.ModelViewSet):
    queryset = Organization.objects.all()
    serializer_class = OrgSerializer
    permission_classes = [AllowAny]
    filterset_class = OrgFilter
    ordering_fields = ["id",]
class ConViewSet(viewsets.ModelViewSet):
    queryset = Contract.objects.all()
    serializer_class = ConSerializer
    permission_classes = [AllowAny]
    filterset_class = ConFilter
    ordering_fields = ["id",]
class ExerViewSet(viewsets.ModelViewSet):
    queryset = Exercise.objects.all()
    serializer_class = ExerSerializer
    permission_classes = [AllowAny]
    filterset_class = ExerFilter
    ordering_fields = ["id","date_i","date_f"]
class FileViewSet(viewsets.ModelViewSet):
    queryset = File.objects.all()
    serializer_class = FileSerializer
    permission_classes = [AllowAny]
    filterset_class = FileFilter
    ordering_fields = ["id","last_update",]
class CommentViewSet(viewsets.ModelViewSet):
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer
    permission_classes = [AllowAny]
    filterset_class = CommentFilter
    ordering_fields = ["id",]

class MailBellViewSet(viewsets.ModelViewSet):
    queryset = MailBell.objects.all()
    serializer_class = MailBellSerializer
    permission_classes = [AllowAny]
class FileAccessViewSet(viewsets.ModelViewSet):
    queryset = FileAccess.objects.all()
    serializer_class = FileAccessSerializer
    permission_classes = [AllowAny]
class ShareViewSet(viewsets.ModelViewSet):
    queryset = Share.objects.all()
    serializer_class = ShareSerializer
    permission_classes = [AllowAny]

class OrgConRightViewSet(viewsets.ModelViewSet):
    queryset = OrgConRight.objects.all()
    serializer_class = OrgConRightSerializer
    permission_classes = [AllowAny]
    def get_queryset(self):
        queryset= super().get_queryset()
        org = self.request.query_params.get("org")
        con = self.request.query_params.get("con")
        if org and con:
            queryset =  queryset.filter(org=org,con=con)
        elif org or con:
            return Response({"message":"org and con parameters are both required"})
        return queryset
class UserConRightViewSet(viewsets.ModelViewSet):
    queryset = UserConRight.objects.all()
    serializer_class = UserConRightSerializer
    permission_classes = [AllowAny]
    def get_queryset(self):
        queryset= super().get_queryset()
        user = self.request.query_params.get("user")
        con = self.request.query_params.get("con")
        if user and con:
            queryset =  queryset.filter(user=user,con=con)
        elif user or con:
            return Response({"message":"user and con parameters are both required"})
        return queryset
class OrgExerRightViewSet(viewsets.ModelViewSet):
    queryset = OrgExerRight.objects.all()
    serializer_class = OrgExerRightSerializer
    permission_classes = [AllowAny]
    def get_queryset(self):
        queryset= super().get_queryset()
        org = self.request.query_params.get("org")
        exer = self.request.query_params.get("exer")
        if org and exer:
            queryset =  queryset.filter(org=org,exer=exer)
        elif org or exer:
            return Response({"message":"org and exer parameters are both required"})
        return queryset
class UserExerRightViewSet(viewsets.ModelViewSet):
    queryset = UserExerRight.objects.all()
    serializer_class = UserExerRightSerializer
    permission_classes = [AllowAny]
    def get_queryset(self):
        queryset= super().get_queryset()
        user = self.request.query_params.get("user")
        exer = self.request.query_params.get("exer")
        if user and exer:
            queryset =  queryset.filter(user=user,exer=exer)
        elif user or exer:
            return Response({"message":"user and exer parameters are both required"})
        return queryset


# Spaces
class MySpaceShareView(views.APIView):
    permission_classes = [AllowAny]
    def get(self,request,*args,**kwargs):
        exer = request.query_params.get('exer')
        to_user = request.query_params.get('to_user')
        from_user = request.query_params.get('from_user')
        if exer:
            if to_user and from_user:
                return Response({"message":"Only one parameter is permitted."})
            elif not (to_user or from_user):
                return Response({"message":"Parameter to_user XOR from_user is required."})
            else:
                if to_user:
                    share = Share.objects.filter(to_user=to_user,file__exer=exer)
                else:
                    share = Share.objects.filter(from_user=from_user,file__exer=exer)
                serializer = MySpaceShareSerializer(share,many=True)
            return Response(serializer.data)
        else:
            return Response({"message":"Parameter exer is required."})

class MySpaceAllView(views.APIView):
    permission_classes = [AllowAny]
    def get(self,request,*args,**kwargs):
        exer = request.query_params.get('exer')
        user = request.query_params.get('user')
        if user and exer:
            file = FileAccess.objects.filter(user=user,file__exer=exer)
            serializer = MySpaceAllSerializer(file,many=True)
            return Response(serializer.data)
        elif user:
            return Response({"message":"Parameter exer is required."})
        elif exer:
            return Response({"message":"Parameter user is required."})
        else:
            return Response({"message":"Parameters exer, user are required."})

class OrgSpaceView(views.APIView):
    permission_classes = [AllowAny]
    def get(self,request,*args,**kwargs):
        exer = request.query_params.get('exer')
        org = request.query_params.get('org')
        is_template = request.query_params.get('is_template')
        if org and exer:
            if is_template:
                file = FileAccess.objects.filter(file__is_template=True,org=org)
            else:
                file = FileAccess.objects.filter(org=org)
            serializer = OrgSpaceSerializer(file,many=True)
            return Response(serializer.data)
        elif org:
            return Response({"message":"Parameter exer is required."})
        elif exer:
            return Response({"message":"Parameter org is required."})
        else:
            return Response({"message":"Parameters exer, org are required."})

# class PublicSpaceView(views.APIView):
#     permission_classes = [AllowAny]
#     def get(self,request,*args,**kwargs):
#         exer = request.query_params.get('exer')
#         org = request.query_params.get('org')
#         is_template = request.query_params.get('is_template')
#         if org and exer:
#             if is_template:
#                 file = FileAccess.objects.filter(file__is_public=True,file__exer=exer)
#             else:
#                 file = FileAccess.objects.filter(org=org)
#             serializer = OrgSpaceSerializer(file,many=True)
#             return Response(serializer.data)
#         elif org:
#             return Response({"message":"Parameter exer is required."})
#         elif exer:
#             return Response({"message":"Parameter org is required."})
#         else:
#             return Response({"message":"Parameters exer, org are required."})


# class TestView(views.APIView):
#     permission_classes = [AllowAny]
#     def get(self,request,*args,**kwargs):
#         con = request.query_params.get('con')
#         if con:
#             org = Organization.objects.filter(cons=con)
#             serializer = TestSerializer(org,many=True)
#             return Response(serializer.data)
#         else:
#             return Response({"message":"con parameter is required."})
