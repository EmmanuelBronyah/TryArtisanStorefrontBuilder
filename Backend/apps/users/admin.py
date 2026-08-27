from django.contrib import admin
from apps.users.models import CustomerProfile, CustomUser, ArtisanProfile, Region, Craft

admin.site.register(CustomUser)
admin.site.register(ArtisanProfile)
admin.site.register(CustomerProfile)
admin.site.register(Region)
admin.site.register(Craft)
