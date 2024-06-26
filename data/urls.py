from django.urls import path,include
from django.shortcuts import render

from . import views
from .routers import router

app_name = "data"

urlpatterns = [
    path("", views.index, name="index"),
    # path("<int:id>/", views.profile, name="profile"),
    path('api/', include(router.urls)),
]