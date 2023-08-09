from rest_framework import serializers
from media.models import *


class ReportGetSerializer(serializers.ModelSerializer):
    author = serializers.SerializerMethodField()
    create_time = serializers.DateTimeField(format='%Y-%m-%d %H:%M:%S')

    class Meta:
        model = Report
        fields = "__all__"

    def get_author(self, obj):
        return "{} ({} {})".format(obj.author.user.username, obj.author.first_name, obj.author.last_name)
