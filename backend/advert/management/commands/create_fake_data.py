import random
from django.core.management.base import BaseCommand
from faker import Faker
from geopy.geocoders import Nominatim
from advert.models import Advertisement, Advantage, Contact


class Command(BaseCommand):
    help = 'Generate fake data for testing in Moscow'

    def handle(self, *args, **kwargs):
        fake = Faker()
        geolocator = Nominatim(user_agent="your_app")

        # Predefined coordinates for Moscow
        moscow_coordinates = (55.751244, 37.618423)

        # Create some advantages
        advantages = []
        for _ in range(10):
            advantage = Advantage.objects.create(description=fake.sentence())
            advantages.append(advantage)

        # Create some contacts
        contacts = []
        for _ in range(10):
            contact = Contact.objects.create(name=fake.name(), description=fake.sentence())
            contacts.append(contact)

        # Create some items
        for _ in range(50):
            longitude, latitude = self._get_random_coordinates_in_moscow()
            location = geolocator.reverse((latitude, longitude), exactly_one=True)
            address = location.address if location else "Unknown address, Moscow"

            item = Advertisement.objects.create(
                type=random.choice(['high', 'middle', 'low']),
                address=address,
                longitude=str(longitude),
                latitude=str(latitude),
                distance=fake.random_number(digits=2),
                coverage=fake.random_number(digits=3),
                description=fake.text()
            )

            # Add advantages and contacts to the item
            item.advantages.set(random.sample(advantages, k=random.randint(1, 5)))
            item.contacts.set(random.sample(contacts, k=random.randint(1, 5)))
            item.save()

        self.stdout.write(self.style.SUCCESS('Successfully generated fake data for Moscow'))

    def _get_random_coordinates_in_moscow(self):
        # Random point in Moscow bounding box
        min_lat, max_lat = 55.489926, 55.92993
        min_lng, max_lng = 37.319328, 37.945661
        return (
            random.uniform(min_lng, max_lng),
            random.uniform(min_lat, max_lat)
        )
