from rest_framework import serializers
from apps.region.models import Region


class RegionSerializer(serializers.ModelSerializer):

    class Meta:
        model = Region
        fields = "__all__"
