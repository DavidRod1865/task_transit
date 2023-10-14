from django.db import models

class ShipmentTask(models.Model):
    file_number = models.CharField(max_length=100)
    shipper = models.CharField(max_length=100)
    consignee = models.CharField(max_length=100)
    transport_mode = models.CharField(max_length=100)  # Air, Ocean, or Domestic
    mawb_mbl = models.CharField(max_length=100)  # Master Air Waybill / Master Bill of Lading
    hawb_hbl = models.CharField(max_length=100)  # House Air Waybill / House Bill of Lading
    etd = models.DateField()  # Estimated Time of Departure
    eta = models.DateField()  # Estimated Time of Arrival
    customs_release = models.BooleanField(default=False)  # Boolean: True/False
    arrived = models.BooleanField(default=False)  # Boolean: True/False
    delivered = models.BooleanField(default=False)  # Boolean: True/False
    notes = models.TextField(blank=True, default="")  # Notes: optional