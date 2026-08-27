from rest_framework.test import APITestCase
from apps.region.models import Region
from apps.craft.models import Craft


class BaseAPITestCase(APITestCase):

    @classmethod
    def setUpTestData(cls):
        cls.craft = Craft.objects.create(craft_name="Plumber")
        cls.region = Region.objects.create(region_name="Greater Accra Region")

        cls.artisan_data = {
            "name": "test artisan",
            "phone_number": "+233554089218",
            "password": "lovesogreat",
            "craft": cls.craft.id,
            "region": cls.region.id,
            "location": "Amasaman",
            "role": "artisan",
        }

        cls.customer_data = {
            "name": "test customer",
            "phone_number": "+233554089218",
            "password": "lovesogreat",
            "role": "customer",
        }
