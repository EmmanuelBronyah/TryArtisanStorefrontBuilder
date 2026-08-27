from rest_framework import generics
from apps.region.models import Region
from apps.region.serializers import RegionSerializer


class ListRegionsAPIView(generics.ListAPIView):
    queryset = Region.objects.all()
    serializer_class = RegionSerializer
