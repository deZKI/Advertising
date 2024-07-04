from rest_framework import serializers
from .models import Advertisement, Advantage, Contact


class AdvantageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Advantage
        fields = ['id', 'description']


class ContactSerializer(serializers.ModelSerializer):
    class Meta:
        model = Contact
        fields = ['id', 'name', 'description']


class AdvertisementSerializer(serializers.ModelSerializer):
    advantages = AdvantageSerializer(many=True)
    contacts = ContactSerializer(many=True)
    coordinate = serializers.SerializerMethodField()

    def get_coordinate(self, obj):
        return {'latitude': obj.latitude, 'longitude': obj.longitude}

    class Meta:
        model = Advertisement
        fields = ['id', 'type', 'address', 'coordinate', 'distance', 'coverage', 'description', 'advantages',
                  'contacts']
