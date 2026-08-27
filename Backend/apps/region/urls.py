from django.urls import path
from apps.region.views import ListRegionsAPIView

urlpatterns = [
    path("all/", ListRegionsAPIView.as_view(), name="all-crafts"),
]
