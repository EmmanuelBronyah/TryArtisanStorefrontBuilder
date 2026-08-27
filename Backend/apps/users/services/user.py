from django.db import transaction
from apps.users.models import ArtisanProfile, CustomerProfile, CustomUser
import logging

logger = logging.getLogger(__name__)


@transaction.atomic
def create_user(
    *, phone_number, name, password, role, craft=None, region=None, location=None
):
    user = CustomUser.objects.create_user(
        phone_number=phone_number,
        name=name,
        password=password,
    )

    if role == "artisan":
        ArtisanProfile.objects.create(
            user=user,
            craft=craft,
            region=region,
            location=location,
        )
        logger.info(
            f"Artisan profile has been created for user with phone number: {phone_number}"
        )
    else:
        CustomerProfile.objects.create(
            user=user,
        )
        logger.info(
            f"Customer profile has been created for user with phone number: {phone_number}"
        )

    return user
