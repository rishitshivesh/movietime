from django.contrib.auth.models import AbstractUser
from django.db import models
from django.utils.timezone import localtime
import pytz
from django.utils import timezone


# Create your models here.

class User(AbstractUser):
    manager = models.BooleanField(default=False,verbose_name = "Manager Status")
    image = models.CharField(max_length=1000,default="https://i.pinimg.com/originals/0c/3b/3a/0c3b3adb1a7530892e55ef36d3be6cb8.png",blank=False)
    phonenumber = models.BigIntegerField(blank=True,verbose_name = "Phone Number",default='0')
    countrycode = models.CharField(max_length=20,blank=False,verbose_name = "Country Code",default='0')
    BookingQuota = models.IntegerField(verbose_name = "Booking Quota",blank=False,default=5)
class Booking(models.Model):
    user = models.ForeignKey(User,related_name="seat_user",on_delete=models.CASCADE)
    movieid = models.IntegerField(verbose_name = "Movie ID")
    moviename = models.CharField(max_length=100,default="Movie")
    BookingTime = models.DateTimeField(auto_now_add=True)
    SelectedDate = models.DateField(auto_now_add=False)
    SelectedTime = models.TimeField(auto_now_add=False)
    cancelled = models.BooleanField(default=False)

    def serialize(self):
        return {
            "id": self.id,
            "user": self.user.username,
            "movieid": self.movieid,
            "moviename":self.moviename,
            "BookingTime": self.BookingTime,
            "SelectedDate": self.SelectedDate,
            "SelectedTime": self.SelectedTime,
            "cancelled": self.cancelled
        }
