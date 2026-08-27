from django.contrib import admin
from apps.users.models import CustomerProfile, CustomUser, ArtisanProfile

admin.site.register(CustomUser)
admin.site.register(ArtisanProfile)
admin.site.register(CustomerProfile)
