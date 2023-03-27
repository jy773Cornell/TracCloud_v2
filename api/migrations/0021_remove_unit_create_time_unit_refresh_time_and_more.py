# Generated by Django 4.1.6 on 2023-03-17 15:14

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0020_chemical_update_time_and_more'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='unit',
            name='create_time',
        ),
        migrations.AddField(
            model_name='unit',
            name='refresh_time',
            field=models.DateTimeField(auto_now=True, verbose_name='Refresh Time'),
        ),
        migrations.AlterField(
            model_name='unit',
            name='usage',
            field=models.CharField(max_length=32, unique=True, verbose_name='Usage'),
        ),
    ]