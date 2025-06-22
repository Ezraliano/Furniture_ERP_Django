from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    # Arahkan semua request ke /api/ ke aplikasi erp_api kita
    path('api/', include('erp_api.urls')),
]