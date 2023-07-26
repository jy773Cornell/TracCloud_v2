from rest_framework import serializers
from django.contrib.auth.models import User


class UsernameChangeSerializer(serializers.ModelSerializer):
    username = serializers.CharField(required=True)
    new_username = serializers.CharField(required=True)
    password = serializers.CharField(max_length=128, style={'input_type': 'password'})

    class Meta:
        model = User
        fields = ('username', 'new_username', "password")

    def validate(self, data):
        username = data.get('username')
        new_username = data.get('new_username')
        password = data.get('password')

        try:
            user = User.objects.get(username=username)
            if user.check_password(password):
                return {'user': user, "new_username": new_username}
            else:
                raise serializers.ValidationError("The password does not match.")
        except User.DoesNotExist:
            raise serializers.ValidationError("The user does not exist.")


class PasswordChangeSerializer(serializers.ModelSerializer):
    username = serializers.CharField(required=True)
    password = serializers.CharField(max_length=128, style={'input_type': 'password'})
    new_password = serializers.CharField(max_length=128, style={'input_type': 'password'})

    class Meta:
        model = User
        fields = ('username', 'password', 'new_password')

    def validate(self, data):
        username = data.get('username')
        password = data.get('password')
        new_password = data.get('new_password')

        try:
            user = User.objects.get(username=username)
            if user.check_password(password):
                return {'user': user, "new_password": new_password}
            else:
                raise serializers.ValidationError("The password does not match.")
        except User.DoesNotExist:
            raise serializers.ValidationError("The user does not exist.")
