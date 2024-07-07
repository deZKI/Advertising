from rest_framework import serializers


class CSVUploadSerializer(serializers.Serializer):
    file = serializers.FileField()
    connect_gigachat = serializers.BooleanField()


class OptimizationRequestSerializer(serializers.Serializer):
    age_from = serializers.IntegerField()
    age_to = serializers.IntegerField()
    name = serializers.CharField(max_length=100)
    income = serializers.CharField(max_length=100)
    gender = serializers.CharField(max_length=10)
    iterations = serializers.IntegerField(default=100)
    number_dots = serializers.IntegerField(default=100)
