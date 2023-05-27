# Generated by Django 4.1.5 on 2023-05-26 00:53

from django.db import migrations, models
import django_fsm


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0007_alter_applicationrecord_crop_and_more'),
    ]

    operations = [
        migrations.CreateModel(
            name='Registration',
            fields=[
                ('rpid', models.CharField(max_length=48, primary_key=True, serialize=False, verbose_name='RPID')),
                ('state', django_fsm.FSMField(choices=[('pending', 'Pending'), ('approved', 'Approved'), ('rejected', 'Rejected'), ('archived', 'Archived')], default='pending', max_length=50)),
                ('username', models.CharField(max_length=150, unique=True)),
                ('password', models.CharField(max_length=128)),
                ('email', models.EmailField(max_length=254)),
            ],
        ),
    ]