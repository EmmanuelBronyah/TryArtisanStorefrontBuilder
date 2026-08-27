from django.db import models


class Region(models.Model):
    region_name = models.CharField(unique=True, max_length=125)

    class Meta:
        db_table = "regions"
        verbose_name = "region"
        verbose_name_plural = "regions"

    def __str__(self):
        return self.region_name
