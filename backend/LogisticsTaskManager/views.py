from django.shortcuts import render
from rest_framework import viewsets
from .serializers import LogisticsTaskManagerSerializer
from .models import ShipmentTask

class LogisticsTaskManagerView(viewsets.ModelViewSet):
    serializer_class = LogisticsTaskManagerSerializer
    queryset = ShipmentTask.objects.all()