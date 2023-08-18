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


class ReportsSendSerializer(serializers.ModelSerializer):
    author_id = serializers.CharField(required=True)
    recipient_id = serializers.CharField(required=True)
    selected_reports = serializers.ListField(child=serializers.CharField(), required=True)
    subject = serializers.CharField(required=True)

    class Meta:
        model = Report
        fields = ('author_id', 'recipient_id', 'selected_reports', 'subject')

    def validate(self, data):
        author_id = data.get('author_id')
        recipient_id = data.get('recipient_id')
        selected_reports = data.get('selected_reports')
        subject = data.get('subject')

        try:
            author = UserProfile.objects.get(uid=author_id, is_active=True)
        except UserProfile.DoesNotExist:
            raise serializers.ValidationError("The author does not exist.")

        try:
            recipient = UserProfile.objects.get(uid=recipient_id, is_active=True)
        except UserProfile.DoesNotExist:
            raise serializers.ValidationError("The recipient does not exist.")

        reports = []
        try:
            for report in selected_reports:
                reports.append(Report.objects.get(rid=report, user=author, is_active=True))
        except Report.DoesNotExist:
            raise serializers.ValidationError("The report does not exist.")

        return {'author': author, 'recipient': recipient, "reports": reports, "subject": subject}
