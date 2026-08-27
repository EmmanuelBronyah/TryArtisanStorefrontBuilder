from rest_framework import generics
from apps.craft.models import Craft
from apps.craft.serializers import CraftSerializer


class ListCraftsAPIView(generics.ListAPIView):
    queryset = Craft.objects.all()
    serializer_class = CraftSerializer
