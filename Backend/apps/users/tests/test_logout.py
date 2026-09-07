from apps.users.tests.base import BaseAPITestCase
from django.urls import reverse
from apps.users.models.user import CustomUser
from rest_framework import status
from rest_framework_simplejwt.tokens import RefreshToken


class LogoutAPITest(BaseAPITestCase):

    def setUp(self):
        self.create_user_url = reverse("create-user")
        self.logout_url = reverse("logout")
        self.logout_data = {"refresh_token": ""}

    def authenticate_user(self, user):
        self.client.force_authenticate(user=user)

    def test_logout(self):
        # create user
        self.client.post(self.create_user_url, self.artisan_data, format="json")

        # create refresh token
        user = CustomUser.objects.get(phone_number="+233554089218")
        refresh_token = RefreshToken.for_user(user)

        # authenticate user
        self.authenticate_user(user)

        # logout
        self.logout_data["refresh_token"] = str(refresh_token)
        response = self.client.post(self.logout_url, self.logout_data, format="json")

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn("Logout successful.", response.data["detail"])

    def test_omit_required_field(self):
        # create user
        self.client.post(self.create_user_url, self.artisan_data, format="json")

        # create refresh token
        user = CustomUser.objects.get(phone_number="+233554089218")
        refresh_token = RefreshToken.for_user(user)

        # authenticate user
        self.authenticate_user(user)

        # logout
        response = self.client.post(self.logout_url, self.logout_data, format="json")

        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertIn("refresh_token", response.data)
        self.assertIn("This field may not be blank.", response.data["refresh_token"])

    def test_invalid_credentials(self):
        # create user
        self.client.post(self.create_user_url, self.artisan_data, format="json")
        user = CustomUser.objects.get(phone_number="+233554089218")

        # authenticate user
        self.authenticate_user(user)

        # logout
        self.logout_data["refresh_token"] = "etyngddhdjsl"
        response = self.client.post(self.logout_url, self.logout_data, format="json")

        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertIn("Invalid or expired token.", response.data["detail"])

    def test_throttling(self):
        # create user
        self.client.post(self.create_user_url, self.artisan_data, format="json")

        for _ in range(6):
            # create refresh token
            user = CustomUser.objects.get(phone_number="+233554089218")
            refresh_token = RefreshToken.for_user(user)

            # authenticate user
            self.authenticate_user(user)

            self.logout_data["refresh_token"] = str(refresh_token)
            response = self.client.post(
                self.logout_url, self.logout_data, format="json"
            )

        self.assertEqual(response.status_code, status.HTTP_429_TOO_MANY_REQUESTS)
