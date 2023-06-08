# Generated by Django 4.1.5 on 2023-05-31 23:29

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion
import django_fsm


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0011_remove_applicationrecord_assign_to'),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('workflows', '0011_alter_passwordreset_create_time_and_more'),
    ]

    operations = [
        migrations.CreateModel(
            name='SprayCard',
            fields=[
                ('scpid', models.CharField(max_length=48, primary_key=True, serialize=False, verbose_name='SCPID')),
                ('state', django_fsm.FSMField(choices=[('initiated', 'Initiated'), ('assigned', 'Assigned'), ('completed', 'Completed'), ('withdrew', 'Withdrew')], default='initiated', max_length=50)),
                ('is_active', models.BooleanField(default=True, verbose_name='Is Active')),
                ('update_time', models.DateTimeField(auto_now=True, verbose_name='Update Time')),
                ('create_time', models.DateTimeField(auto_now_add=True, verbose_name='Create Time')),
                ('application_record', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='api.applicationrecord', verbose_name='Application Record')),
                ('holder', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='holder_spraycard', to=settings.AUTH_USER_MODEL, verbose_name='Holder')),
                ('owner', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL, verbose_name='Owner')),
            ],
        ),
        migrations.CreateModel(
            name='SprayCardAssignment',
            fields=[
                ('scaid', models.CharField(max_length=48, primary_key=True, serialize=False, verbose_name='SCAID')),
                ('order', models.PositiveIntegerField()),
                ('is_active', models.BooleanField(default=True, verbose_name='Is Active')),
                ('assign_time', models.DateTimeField(auto_now_add=True)),
                ('assign_to', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
                ('spray_card', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='assignments', to='workflows.spraycard')),
            ],
            options={
                'ordering': ['order'],
            },
        ),
    ]
