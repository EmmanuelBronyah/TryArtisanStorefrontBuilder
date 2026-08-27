import uuid
from django.db import models
from apps.users.models import CustomUser
from apps.craft.models import Craft
from apps.region.models import Region


class ArtisanProfile(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    user = models.OneToOneField(
        CustomUser, on_delete=models.CASCADE, related_name="artisan_profile"
    )
    craft = models.ForeignKey(Craft, on_delete=models.PROTECT, related_name="artisans")
    region = models.ForeignKey(
        Region, on_delete=models.PROTECT, related_name="artisans"
    )
    location = models.CharField(max_length=125)

    class Meta:
        db_table = "artisan_profiles"
        verbose_name = "artisan profile"
        verbose_name_plural = "artisan profiles"

    def __str__(self):
        return (
            f"({self.user.name}) ({self.user.phone_number}) ({self.craft.craft_name})"
        )
