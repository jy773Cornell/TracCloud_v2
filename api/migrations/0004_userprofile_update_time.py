# Generated by Django 4.1.5 on 2023-05-24 21:02

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0003_userprofile'),
    ]

    operations = [
        migrations.AddField(
            model_name='userprofile',
            name='update_time',
            field=models.DateTimeField(auto_now=True, verbose_name='Update Time'),
        ),
    ]