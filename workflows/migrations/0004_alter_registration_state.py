# Generated by Django 4.1.5 on 2023-05-26 15:33

from django.db import migrations
import django_fsm


class Migration(migrations.Migration):

    dependencies = [
        ('workflows', '0003_registration_is_active_alter_registration_state_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='registration',
            name='state',
            field=django_fsm.FSMField(choices=[('pending', 'Pending'), ('completed', 'Completed')], default='pending', max_length=50),
        ),
    ]
