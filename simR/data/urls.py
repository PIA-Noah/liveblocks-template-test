from django.urls import path
from django.shortcuts import render

from . import views

app_name = "data"

urlpatterns = [
    path("", views.index, name="index"),
    path("<int:id>/", views.profile, name="profile"),
    #path("<int:id>/project/", views.proj, name="proj"),
    #path("<int:id>/exercise/", views.exer, name="exer"),
    #path("<int:id>/organization/", views.org, name="org"),
    
    #path("<int:id>/settings/", views.settings, name="settings"),
    #path("<int:id>/chats/", views.chats, name="chats"),
    #path("<int:id>/help/", views.help, name="help"),
]