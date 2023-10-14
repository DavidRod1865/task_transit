from django.contrib import admin
from .models import ShipmentTask

class TaskAdmin(admin.ModelAdmin):
    list_display = ('file_number', 'shipper', 'consignee', 'transport_mode', 'mawb_mbl', 'hawb_hbl', 'etd', 'eta', 'customs_release', 'arrived', 'delivered', 'notes',)
    list_filter = ('eta',)
    ordering = ('-eta',)

admin.site.register(ShipmentTask, TaskAdmin)
