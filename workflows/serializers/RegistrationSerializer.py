from rest_framework import serializers
from workflows.models import Registration
from django.contrib.auth.models import User
from api.models import UserType


class RegistrationRequestSerializer(serializers.ModelSerializer):
    password = serializers.CharField(max_length=128, style={'input_type': 'password'})
    type_id = serializers.PrimaryKeyRelatedField(source='type', queryset=UserType.objects.filter(
        relation_type__name__in=['Owner', 'Client']))

    class Meta:
        model = Registration
        fields = ("username", "password", "email", "type_id")

    def validate_username(self, value):
        """
        Check that the username is not already in use.
        """
        if User.objects.filter(username=value).exists():
            raise serializers.ValidationError("Username is already in use.")
        return value

    def validate(self, attrs):
        for field in self.fields:
            if not attrs.get(field):
                raise serializers.ValidationError(f"{field} must not be empty.")
        return attrs
