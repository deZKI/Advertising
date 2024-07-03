from django.db import models


class Advantage(models.Model):
    description = models.TextField()

    def __str__(self):
        return self.description


class Contact(models.Model):
    name = models.CharField(max_length=255)
    description = models.TextField()

    def __str__(self):
        return self.name


class Advertisement(models.Model):
    TYPE_CHOICES = [
        ('high', 'High'),
        ('middle', 'Middle'),
        ('low', 'Low'),
    ]

    type = models.CharField(max_length=6, choices=TYPE_CHOICES)
    address = models.CharField(max_length=255)
    longitude = models.CharField(max_length=50)
    latitude = models.CharField(max_length=50)
    distance = models.FloatField()
    coverage = models.FloatField()
    description = models.TextField()
    advantages = models.ManyToManyField(Advantage, related_name='items')
    contacts = models.ManyToManyField(Contact, related_name='items')

    def __str__(self):
        return self.address