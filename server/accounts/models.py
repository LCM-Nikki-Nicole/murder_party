from django.db import models
from django.contrib.auth.models import User

class CharacterProfile(models.Model):
    player_name = models.CharField(max_length=255)
    character_first_name = models.CharField(max_length=255)
    character_last_name = models.CharField(max_length=255)
    profession = models.CharField(max_length=255)
    image = models.ImageField(upload_to='characters/images/')
    pdf = models.FileField(upload_to='characters/pdfs/')

    def __str__(self):
        return f"{self.character_first_name} {self.character_last_name} ({self.profession})"
