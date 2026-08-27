from rest_framework.throttling import AnonRateThrottle, UserRateThrottle
from apps.users.utils import format_wait_time
from rest_framework.exceptions import Throttled


class FormattedThrottleMixin:
    def throttle_failure(self):
        wait = self.wait()

        if wait is not None:
            message = (
                "Too many requests. " f"Please try again in {format_wait_time(wait)}."
            )
        else:
            message = "Too many requests. Please try again later."

        raise Throttled(
            wait=wait,
            detail=message,
        )


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
