# from django.shortcuts import render,get_object_or_404
from django.http import HttpResponse,Http404
from rest_framework import viewsets
from rest_framework.permissions import AllowAny

from .models import CustomUser,Organization,Contract,Exercise,File,Comment,Share
from .models import FileAccess,MailBell
from .models import OrgConRight,OrgExerRight,UserConRight,UserExerRight
from .serializers import UserSerializer,OrgSerializer,ConSerializer,ExerSerializer,FileSerializer,CommentSerializer,ShareSerializer
from .serializers import MailBellSerializer,FileAccessSerializer
from .serializers import OrgConRightSerializer,UserConRightSerializer,OrgExerRightSerializer,UserExerRightSerializer
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
    filterset_fileds = []
class OrgViewSet(viewsets.ModelViewSet):
    queryset = Organization.objects.all()
    serializer_class = OrgSerializer
    permission_classes = [AllowAny]
class ConViewSet(viewsets.ModelViewSet):
    queryset = Contract.objects.all()
    serializer_class = ConSerializer
    permission_classes = [AllowAny]
class ExerViewSet(viewsets.ModelViewSet):
    queryset = Exercise.objects.all()
    serializer_class = ExerSerializer
    permission_classes = [AllowAny]
class FileViewSet(viewsets.ModelViewSet):
    queryset = File.objects.all()
    serializer_class = FileSerializer
    permission_classes = [AllowAny]
class CommentViewSet(viewsets.ModelViewSet):
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer
    permission_classes = [AllowAny]
class ShareViewSet(viewsets.ModelViewSet):
    queryset = Share.objects.all()
    serializer_class = ShareSerializer
    permission_classes = [AllowAny]

class MailBellViewSet(viewsets.ModelViewSet):
    queryset = MailBell.objects.all()
    serializer_class = MailBellSerializer
    permission_classes = [AllowAny]
class FileAccessViewSet(viewsets.ModelViewSet):
    queryset = FileAccess.objects.all()
    serializer_class = FileAccessSerializer
    permission_classes = [AllowAny]
class OrgConRightViewSet(viewsets.ModelViewSet):
    queryset = OrgConRight.objects.all()
    serializer_class = OrgConRightSerializer
    permission_classes = [AllowAny]
class UserConRightViewSet(viewsets.ModelViewSet):
    queryset = UserConRight.objects.all()
    serializer_class = UserConRightSerializer
    permission_classes = [AllowAny]
class OrgExerRightViewSet(viewsets.ModelViewSet):
    queryset = OrgExerRight.objects.all()
    serializer_class = OrgExerRightSerializer
    permission_classes = [AllowAny]
class UserExerRightViewSet(viewsets.ModelViewSet):
    queryset = UserExerRight.objects.all()
    serializer_class = UserExerRightSerializer
    permission_classes = [AllowAny]