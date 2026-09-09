from rest_framework.throttling import AnonRateThrottle, UserRateThrottle
from apps.common.throttles.base import FormattedThrottleMixin


class RegistrationThrottle(FormattedThrottleMixin, AnonRateThrottle):
    scope = "registration"


class OTPThrottle(FormattedThrottleMixin, AnonRateThrottle):
    scope = "otp"


class LoginThrottle(FormattedThrottleMixin, AnonRateThrottle):
    scope = "login"


class PasswordResetThrottle(FormattedThrottleMixin, AnonRateThrottle):
    scope = "password_reset"


class ChangePasswordThrottle(FormattedThrottleMixin, UserRateThrottle):
    scope = "change_password"


class LogoutThrottle(FormattedThrottleMixin, UserRateThrottle):
    scope = "logout"
