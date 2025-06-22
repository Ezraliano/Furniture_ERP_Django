from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    CustomerViewSet, ProductViewSet, OrderViewSet, MaterialViewSet,
    SupplierViewSet, EmployeeViewSet, WorkOrderViewSet
)

router = DefaultRouter()
router.register(r'customers', CustomerViewSet)
router.register(r'products', ProductViewSet)
router.register(r'orders', OrderViewSet)
router.register(r'materials', MaterialViewSet)
router.register(r'suppliers', SupplierViewSet)
router.register(r'employees', EmployeeViewSet)
router.register(r'work-orders', WorkOrderViewSet)


urlpatterns = [
    path('', include(router.urls)),
]