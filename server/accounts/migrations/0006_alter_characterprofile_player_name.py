# Generated by Django 4.2.13 on 2024-06-23 13:06

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("accounts", "0005_characterprofile_player_name"),
    ]

    operations = [
        migrations.AlterField(
            model_name="characterprofile",
            name="player_name",
            field=models.CharField(default="Kuuhaku", max_length=100),
        ),
    ]