from django.conf import settings
from twilio.rest import Client


def send_otp(phone_number):
    client = Client(settings.TWILIO_ACCOUNT_SID, settings.TWILIO_AUTH_TOKEN)

    verification = client.verify.v2.services(
        settings.TWILIO_VERIFY_SERVICE_SID
    ).verifications.create(to="+233554089218", channel="sms")

    return verification.status


def verify_otp(*, phone_number, code):
    client = Client(settings.TWILIO_ACCOUNT_SID, settings.TWILIO_AUTH_TOKEN)

    verification_check = client.verify.v2.services(
        settings.TWILIO_VERIFY_SERVICE_SID
    ).verification_checks.create(to=str(phone_number), code=code)

    return verification_check.status == "approved"
