from django.shortcuts import render,get_object_or_404
from django.http import HttpResponse,Http404
from django.template import loader

from .models import CustomUser

def index(request):
    return HttpResponse("Here drops the principal homepage.")

def profile(request,id):
    name = CustomUser.__str__(CustomUser.get_user(id))
    return HttpResponse("Here drops the homepage of %s." % name)
