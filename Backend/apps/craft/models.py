from django.db import models


class Craft(models.Model):
    craft_name = models.CharField(unique=True, max_length=125)

    class Meta:
        db_table = "crafts"
        verbose_name = "craft"
        verbose_name_plural = "crafts"

    def __str__(self):
        return self.craft_name
