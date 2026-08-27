from django.contrib import admin
from django.urls import path, include
import logging
from django.http import JsonResponse

logger = logging.getLogger(__name__)


urlpatterns = [
    path("admin/", admin.site.urls),
    path("users/", include("apps.users.urls")),
    path("craft/", include("apps.craft.urls")),
    path("region/", include("apps.region.urls")),
]


def custom_404_handler(request, exception):
    logger.warning(f"Endpoint not found: {request.method} {request.path}")

    return JsonResponse(
        {"detail": "The requested endpoint does not exist."},
        status=404,
    )


handler404 = "config.urls.custom_404_handler"
