from rest_framework import serializers
from workflows.models import PasswordReset
from django.contrib.auth.models import User


class PasswordResetRequestSerializer(serializers.ModelSerializer):
    username = serializers.CharField(required=True)
    email = serializers.EmailField(write_only=True)

    class Meta:
        model = PasswordReset
        fields = ('username', 'email',)

    def validate(self, data):
        username = data.get('username')
        email = data.get('email')

        try:
            user = User.objects.get(username=username)
            if user.email != email:
                raise serializers.ValidationError("The email does not match the user's email.")

        except User.DoesNotExist:
            raise serializers.ValidationError("The user does not exist.")

        return {'user': user}


class PasswordResetConfirmSerializer(serializers.Serializer):
    new_password = serializers.CharField(max_length=128, style={'input_type': 'password'})

    class Meta:
        model = PasswordReset
        fields = ('new_password',)

    def __init__(self, *args, token=None, **kwargs):
        super().__init__(*args, **kwargs)
        self.token = token

    def validate(self, data):
        prpid = self.token
        new_password = data.get('new_password')

        try:
            pwd_reset_process = PasswordReset.objects.get(prpid=prpid)
        except PasswordReset.DoesNotExist:
            raise serializers.ValidationError("Invalid password reset token.")

        if pwd_reset_process.state != 'email_sent':
            raise serializers.ValidationError("Cannot reset password in the current state.")

        return {'pwd_reset_process': pwd_reset_process, 'new_password': new_password}
