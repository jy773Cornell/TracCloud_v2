# Generated by Django 4.1.5 on 2023-03-30 03:31

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0034_alter_site_size'),
    ]

    operations = [
        migrations.AddField(
            model_name='site',
            name='update_time',
            field=models.DateTimeField(auto_now=True, verbose_name='Update Time'),
        ),
    ]
