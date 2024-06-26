from rest_framework import viewsets
from rest_framework.permissions import AllowAny

from .models import Organization
from .serializers import OrgSerializer

class OrgViewSet(viewsets.ModelViewSet):
    queryset = Organization.objects.all()
    serializer_class = OrgSerializer
    permission_classes = [AllowAny]