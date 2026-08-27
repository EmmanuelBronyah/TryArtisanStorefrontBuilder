from django.urls import path
from apps.craft.views import ListCraftsAPIView

urlpatterns = [
    path("all/", ListCraftsAPIView.as_view(), name="all-crafts"),
]
