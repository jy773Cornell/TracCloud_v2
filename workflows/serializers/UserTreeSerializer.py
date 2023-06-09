from rest_framework import serializers
from api.models import UserProfile


class UserTreeSerializer(serializers.ModelSerializer):
    user_id = serializers.CharField(required=True)

    class Meta:
        model = UserProfile
        fields = ('user_id',)
