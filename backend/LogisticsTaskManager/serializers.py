from rest_framework import serializers
from .models import ShipmentTask

class LogisticsTaskManagerSerializer(serializers.ModelSerializer):
    class Meta:
        model = ShipmentTask
        fields = ('id', 'file_number', 'shipper', 'consignee', 'transport_mode', 'mawb_mbl', 'hawb_hbl', 'etd', 'eta', 'customs_release', 'arrived', 'delivered', 'notes') # you can also use __all__ instead of listing out all the fields