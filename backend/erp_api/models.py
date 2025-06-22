from django.db import models

class Customer(models.Model):
    name = models.CharField(max_length=255)
    email = models.EmailField(max_length=255)
    phone = models.CharField(max_length=50)
    address = models.TextField()
    total_orders = models.IntegerField(default=0)
    total_spent = models.DecimalField(max_digits=12, decimal_places=2, default=0.00)
    last_order_date = models.DateField(null=True, blank=True)
    preferences = models.TextField(null=True, blank=True)

    class Meta:
        db_table = 'customers'

    def __str__(self):
        return self.name

class Employee(models.Model):
    STATUS_CHOICES = [('active', 'Active'), ('inactive', 'Inactive')]
    name = models.CharField(max_length=255)
    position = models.CharField(max_length=255)
    department = models.CharField(max_length=255)
    email = models.EmailField(max_length=255)
    phone = models.CharField(max_length=50)
    hire_date = models.DateField()
    status = models.CharField(max_length=8, choices=STATUS_CHOICES)

    class Meta:
        db_table = 'employees'

    def __str__(self):
        return self.name

class Supplier(models.Model):
    name = models.CharField(max_length=255)
    contact_person = models.CharField(max_length=255)
    email = models.EmailField(max_length=255)
    phone = models.CharField(max_length=50)
    address = models.TextField()
    rating = models.DecimalField(max_digits=2, decimal_places=1)
    materials_supplied = models.TextField()

    class Meta:
        db_table = 'suppliers'

    def __str__(self):
        return self.name

class Material(models.Model):
    TYPE_CHOICES = [('wood', 'Wood'), ('fabric', 'Fabric'), ('hardware', 'Hardware'), ('component', 'Component'), ('other', 'Other')]
    name = models.CharField(max_length=255)
    type = models.CharField(max_length=10, choices=TYPE_CHOICES)
    stock_quantity = models.DecimalField(max_digits=10, decimal_places=2)
    unit = models.CharField(max_length=50)
    unit_cost = models.DecimalField(max_digits=10, decimal_places=2)
    supplier = models.ForeignKey(Supplier, on_delete=models.CASCADE, db_column='supplier_id')
    location = models.CharField(max_length=255)

    class Meta:
        db_table = 'materials'

    def __str__(self):
        return self.name

class Product(models.Model):
    STATUS_CHOICES = [('in-stock', 'In Stock'), ('low-stock', 'Low Stock'), ('out-of-stock', 'Out of Stock')]
    name = models.CharField(max_length=255)
    sku = models.CharField(max_length=255)
    category = models.CharField(max_length=255)
    stock_quantity = models.IntegerField()
    min_stock_level = models.IntegerField()
    unit_price = models.DecimalField(max_digits=10, decimal_places=2)
    location = models.CharField(max_length=255)
    status = models.CharField(max_length=12, choices=STATUS_CHOICES)

    class Meta:
        db_table = 'products'

    def __str__(self):
        return self.name

class Order(models.Model):
    STATUS_CHOICES = [('pending', 'Pending'), ('processing', 'Processing'), ('production', 'Production'), ('ready', 'Ready'), ('shipped', 'Shipped'), ('delivered', 'Delivered'), ('cancelled', 'Cancelled')]
    customer = models.ForeignKey(Customer, on_delete=models.CASCADE, db_column='customer_id')
    customer_name = models.CharField(max_length=255)
    order_date = models.DateField()
    delivery_date = models.DateField(null=True, blank=True)
    total_amount = models.DecimalField(max_digits=10, decimal_places=2)
    status = models.CharField(max_length=15, choices=STATUS_CHOICES)
    is_custom = models.BooleanField()

    class Meta:
        db_table = 'orders'

    def __str__(self):
        return f"Order #{self.pk} for {self.customer_name}"

class OrderItem(models.Model):
    order = models.ForeignKey(Order, related_name='items', on_delete=models.CASCADE, db_column='order_id')
    product = models.ForeignKey(Product, on_delete=models.CASCADE, db_column='product_id')
    product_name = models.CharField(max_length=255)
    quantity = models.IntegerField()
    unit_price = models.DecimalField(max_digits=10, decimal_places=2)
    specifications = models.TextField(null=True, blank=True)

    class Meta:
        db_table = 'order_items'

class WorkOrder(models.Model):
    STATUS_CHOICES = [('pending', 'Pending'), ('in-progress', 'In Progress'), ('completed', 'Completed'), ('on-hold', 'On Hold')]
    order = models.ForeignKey(Order, on_delete=models.CASCADE, db_column='order_id')
    product_name = models.CharField(max_length=255)
    quantity = models.IntegerField()
    status = models.CharField(max_length=15, choices=STATUS_CHOICES)
    start_date = models.DateField(null=True, blank=True)
    expected_completion = models.DateField(null=True, blank=True)
    progress = models.IntegerField()

    class Meta:
        db_table = 'work_orders'