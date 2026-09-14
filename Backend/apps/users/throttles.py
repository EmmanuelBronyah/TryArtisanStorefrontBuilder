from rest_framework.throttling import AnonRateThrottle, UserRateThrottle
from apps.common.throttles.base import FormattedThrottleMixin


class RegistrationThrottle(FormattedThrottleMixin, AnonRateThrottle):
    scope = "registration"


class OTPThrottle(FormattedThrottleMixin, AnonRateThrottle):
    scope = "otp"


class LoginThrottle(FormattedThrottleMixin, AnonRateThrottle):
    scope = "login"


class PasswordResetRequestThrottle(FormattedThrottleMixin, AnonRateThrottle):
    scope = "password_reset_request"


class PasswordResetVerifyThrottle(FormattedThrottleMixin, AnonRateThrottle):
    scope = "password_reset_verify"


class PasswordResetConfirmThrottle(FormattedThrottleMixin, AnonRateThrottle):
    scope = "password_reset_confirm"


class ChangePasswordThrottle(FormattedThrottleMixin, UserRateThrottle):
    scope = "change_password"


class LogoutThrottle(FormattedThrottleMixin, UserRateThrottle):
    scope = "logout"
