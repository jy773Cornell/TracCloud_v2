# Generated by Django 4.1.5 on 2023-05-26 15:39

from django.db import migrations
import django_fsm


class Migration(migrations.Migration):

    dependencies = [
        ('workflows', '0004_alter_registration_state'),
    ]

    operations = [
        migrations.AlterField(
            model_name='registration',
            name='state',
            field=django_fsm.FSMField(choices=[('pending', 'Pending'), ('approved', 'Approved'), ('rejected', 'Rejected')], default='pending', max_length=50),
        ),
    ]
