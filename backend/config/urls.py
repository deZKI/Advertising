from django.contrib import admin
from django.urls import path, include

from drf_yasg import openapi
from drf_yasg.views import get_schema_view

from rest_framework import routers
from rest_framework import permissions

from advert.views import AdvertisementViewSet

schema_view = get_schema_view(
    openapi.Info(
        title="Swagger",
        default_version='v1',
        description="Документация к api",
    ),
    public=True,
    permission_classes=(permissions.AllowAny,),
)
router = routers.DefaultRouter()
router.register(r'advert', AdvertisementViewSet, basename='advertisement')
urlpatterns = [
    path('api/swagger<format>/', schema_view.without_ui(cache_timeout=0), name='schema-json'),
    path('api/swagger/', schema_view.with_ui('swagger', cache_timeout=0), name='schema-swagger-ui'),
    path('api/redoc/', schema_view.with_ui('redoc', cache_timeout=0), name='schema-redoc'),

    path('api/', include(router.urls)),
    path('admin/', admin.site.urls),
]
