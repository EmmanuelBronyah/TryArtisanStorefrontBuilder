from rest_framework import serializers
from apps.users.models import CustomUser
import logging
from apps.region.models import Region
from apps.craft.models import Craft

logger = logging.getLogger(__name__)


class CreateUserSerializer(serializers.ModelSerializer):
    role = serializers.ChoiceField(choices=["customer", "artisan"], write_only=True)
    craft = serializers.PrimaryKeyRelatedField(
        queryset=Craft.objects.all(), required=False, write_only=True
    )
    region = serializers.PrimaryKeyRelatedField(
        queryset=Region.objects.all(), required=False, write_only=True
    )
    location = serializers.CharField(max_length=125, required=False, write_only=True)

    class Meta:
        model = CustomUser
        fields = [
            "phone_number",
            "name",
            "password",
            "role",
            "craft",
            "region",
            "location",
        ]
        extra_kwargs = {"password": {"write_only": True}}

    def validate(self, attrs):
        if attrs["role"] == "artisan":
            for field in ["craft", "region", "location"]:
                if not attrs.get(field):
                    logger.error(f"{field} is required for artisans.")
                    raise serializers.ValidationError(
                        {field: f"{field} is required for artisans."}
                    )

        return attrs


class ReadUserSerializer(serializers.ModelSerializer):
    role = serializers.SerializerMethodField()

    class Meta:
        model = CustomUser
        fields = ["phone_number", "name", "role"]

    def get_role(self, obj):
        if hasattr(obj, "artisan_profile"):
            logger.info("User is an artisan.")
            return "artisan"

        if hasattr(obj, "customer_profile"):
            logger.info("User is a customer.")
            return "customer"

        logger.info("User does not have a profile(customer/artisan).")
        return None
