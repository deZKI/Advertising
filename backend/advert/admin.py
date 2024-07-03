from django.contrib import admin
from .models import Advertisement, Advantage, Contact


class AdvertisementAdmin(admin.ModelAdmin):
    list_display = ('id', 'type', 'address', 'distance', 'coverage')
    search_fields = ('address', 'description')
    list_filter = ('type',)
    filter_horizontal = ('advantages', 'contacts')


class AdvantageAdmin(admin.ModelAdmin):
    list_display = ('id', 'description')
    search_fields = ('description',)


class ContactAdmin(admin.ModelAdmin):
    list_display = ('id', 'name', 'description')
    search_fields = ('name', 'description')


admin.site.register(Advertisement, AdvertisementAdmin)
admin.site.register(Advantage, AdvantageAdmin)
admin.site.register(Contact, ContactAdmin)
