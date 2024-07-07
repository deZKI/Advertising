from rest_framework import serializers


class CSVUploadSerializer(serializers.Serializer):
    file = serializers.FileField()
    connect_gigachat = serializers.BooleanField()
