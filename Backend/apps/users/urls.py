from django.urls import path
from apps.users.views.user import (
    CreateUserView,
    LoginView,
    VerifyOTPView,
    ResendOTPView,
    LogoutView,
)
from apps.users.views.password_reset import (
    PasswordResetVerifyAPIView,
    PasswordResetConfirmAPIView,
    PasswordResetRequestAPIView,
)
from apps.users.views.change_password import ChangePasswordAPIView
from rest_framework_simplejwt.views import TokenRefreshView

urlpatterns = [
    path("register/", CreateUserView.as_view(), name="create-user"),
    path("login/", LoginView.as_view(), name="login"),
    path("verify-otp/", VerifyOTPView.as_view(), name="verify-otp"),
    path("resend-otp/", ResendOTPView.as_view(), name="resend-otp"),
    path(
        "password-reset/request/",
        PasswordResetRequestAPIView.as_view(),
        name="password-reset-request",
    ),
    path(
        "password-reset/verify/",
        PasswordResetVerifyAPIView.as_view(),
        name="password-reset-verify",
    ),
    path(
        "password-reset/confirm/",
        PasswordResetConfirmAPIView.as_view(),
        name="password-reset-confirm",
    ),
    path("change-password/", ChangePasswordAPIView.as_view(), name="change-password"),
    path("token-refresh/", TokenRefreshView.as_view(), name="token-refresh"),
    path("logout/", LogoutView.as_view(), name="logout"),
]
