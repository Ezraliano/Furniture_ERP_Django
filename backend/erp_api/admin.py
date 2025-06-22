from django.contrib import admin
from .models import Customer, Product, Order, OrderItem, Material, Supplier, Employee, WorkOrder

admin.site.register(Customer)
admin.site.register(Product)
admin.site.register(Order)
admin.site.register(OrderItem)
admin.site.register(Material)
admin.site.register(Supplier)
admin.site.register(Employee)
admin.site.register(WorkOrder)