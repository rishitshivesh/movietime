from django.contrib import admin
from .models import User,Booking
from rangefilter.filter import DateTimeRangeFilter

# Register your models here.
class UserDisplay(admin.ModelAdmin):
    list_display = ("id","first_name","last_name","username","email")
class BookingDisplay(admin.ModelAdmin):
    list_display = ("id","movieid","user","BookingTime","SelectedTime","SelectedDate","cancelled")
    list_filter = ("SelectedTime",('BookingTime', DateTimeRangeFilter),"cancelled")
    search_fields = ("movieid","user__username","user__first_name","user__last_name","user__phonenumber","us    er__email","user__username","BookingTime","SelectedTime","SelectedDate")
    filter_horizontal = ()
    fieldsets = ()
admin.site.register(User,UserDisplay)
admin.site.register(Booking,BookingDisplay)

