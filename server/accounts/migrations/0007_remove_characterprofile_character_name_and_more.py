# Generated by Django 4.2.13 on 2024-06-23 14:09

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("accounts", "0006_alter_characterprofile_player_name"),
    ]

    operations = [
        migrations.RemoveField(
            model_name="characterprofile",
            name="character_name",
        ),
        migrations.RemoveField(
            model_name="characterprofile",
            name="user",
        ),
        migrations.AddField(
            model_name="characterprofile",
            name="character_first_name",
            field=models.CharField(default="FakeChara", max_length=255),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name="characterprofile",
            name="character_last_name",
            field=models.CharField(default="FakeMyouji", max_length=255),
            preserve_default=False,
        ),
        migrations.AlterField(
            model_name="characterprofile",
            name="image",
            field=models.ImageField(upload_to="characters/images/"),
        ),
        migrations.AlterField(
            model_name="characterprofile",
            name="pdf",
            field=models.FileField(upload_to="characters/pdfs/"),
        ),
        migrations.AlterField(
            model_name="characterprofile",
            name="player_name",
            field=models.CharField(max_length=255),
        ),
        migrations.AlterField(
            model_name="characterprofile",
            name="profession",
            field=models.CharField(max_length=255),
        ),
    ]
