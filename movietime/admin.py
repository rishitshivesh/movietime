from django.contrib import admin
from .models import User,Booking

# Register your models here.
class UserDisplay(admin.ModelAdmin):
    list_display = ("id","first_name","last_name","username","email")
class BookingDisplay(admin.ModelAdmin):
    list_display = ("id","movieid","user","BookingTime","SelectedTime","SelectedDate")
    list_filter = ("movieid","user","SelectedTime")
admin.site.register(User,UserDisplay)
admin.site.register(Booking,BookingDisplay)

