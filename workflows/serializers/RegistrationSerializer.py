from rest_framework import serializers
from workflows.models import Registration
from django.contrib.auth.models import User


class RegistrationRequestSerializer(serializers.ModelSerializer):
    password = serializers.CharField(max_length=128, style={'input_type': 'password'})

    class Meta:
        model = Registration
        fields = ("username", "password", "email",)

    def validate_username(self, value):
        """
        Check that the username is not already in use.
        """
        if User.objects.filter(username=value).exists():
            raise serializers.ValidationError("Username is already in use.")
        return value
