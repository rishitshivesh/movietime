from django.contrib.auth import authenticate, login, logout
from django.db import IntegrityError
from django.http import HttpResponse, HttpResponseRedirect, JsonResponse
from django.shortcuts import render, get_object_or_404, redirect
from django.shortcuts import render
from django.urls import reverse
from django.contrib.auth.decorators import login_required
from django.core.paginator import Paginator
from django.views.decorators.csrf import csrf_exempt
import json
from datetime import datetime,date,timedelta


from .models import User,Booking


# Create your views here.

def index(request):
    return render(request,"movietime/index.html")

def login_view(request):
    if request.method == "POST":

        # Attempt to sign user in
        uname = request.POST["username"]
        username = uname.lower()
        password = request.POST["password"]
        user = authenticate(request, username=username, password=password)

        # Check if authentication successful
        if user is not None:
            login(request, user)
            return HttpResponseRedirect(reverse("index"))
        else:
            return render(request, "movietime/login.html", {
                "message": "Invalid username and/or password."
            })
    else:
        return render(request, "movietime/login.html")


def logout_view(request):
    logout(request)
    return HttpResponseRedirect(reverse("index"))


def register(request):
    if request.method == "POST":
        uname = request.POST["username"]
        username = uname.lower()
        email = request.POST["email"]
        first_name = request.POST["firstname"]
        last_name = request.POST["lastname"]
        image = request.POST["image"]
        countrycode = request.POST["code"]
        number = request.POST["phone"]
        # Ensure password matches confirmation
        password = request.POST["password"]
        confirmation = request.POST["confirmation"]
        if password != confirmation:
            return render(request, "movietime/register.html", {
                "message": "Passwords must match."
            })

        check = User.objects.filter(email=email)
        check2 = User.objects.filter(username=username)
        check3 = User.objects.filter(phonenumber=number)
        if check:
            return render(request, "movietime/register.html", {
                "message": "Email Id Exists. Please Login!"
            })
        elif check2:
            return render(request, "movietime/register.html", {
                "message": "Username Exists. Please Login!"
            })
        elif check3:
            return render(request, "movietime/register.html", {
                "message": "Phone Number Exists. Please Login!"
            })
        # Attempt to create new user
        else:
            user = User.objects.create_user(username, email, password)
            user.first_name = first_name
            user.last_name = last_name
            user.countrycode = countrycode
            user.phonenumber = number
            if(image):
                user.image = image
            else:
                user.image = "https://i.pinimg.com/originals/0c/3b/3a/0c3b3adb1a7530892e55ef36d3be6cb8.png"
            user.save()
            login(request, user)
            return HttpResponseRedirect(reverse("index"))
    else:
        return render(request, "movietime/register.html")
def getmovie(request,movieid):
    return render(request, "movietime/moviepage.html",{
        "movieid" : movieid
    })

@login_required(login_url='login')
def bookmovie(request,movieid):
    now = date.today() + timedelta(days=1)
    print(now)
    message = None
    booked = 50 - Booking.objects.filter(SelectedDate=now,cancelled=False).count()
    option1 = 10 - Booking.objects.filter(SelectedTime="09:00:00",cancelled=False,SelectedDate=now).count()
    option2 = 10 - Booking.objects.filter(SelectedTime="12:00:00",cancelled=False,SelectedDate=now).count()
    option3 = 10 - Booking.objects.filter(SelectedTime="15:00:00",cancelled=False,SelectedDate=now).count()
    option4 = 10 - Booking.objects.filter(SelectedTime="18:00:00",cancelled=False,SelectedDate=now).count()
    option5 = 10 - Booking.objects.filter(SelectedTime="21:00:00",cancelled=False,SelectedDate=now).count()

    if request.method == "POST":
        moviedate = request.POST["moviedate"]
        time = request.POST["timeslot"]
        moviename = request.POST["moviename"]
        users = request.POST["username"]
        bookuser = User.objects.get(username=users)
        check = Booking.objects.filter(SelectedDate=moviedate,SelectedTime=time,moviename=moviename,cancelled=False)
        check2 = Booking.objects.filter(movieid=movieid,user=bookuser,cancelled=False,SelectedDate=moviedate).count()
        check3 = request.user.BookingQuota - Booking.objects.filter(user=bookuser,SelectedDate=moviedate,cancelled=False).count()
        if check:
            return render(request, "movietime/bookmovie.html",{
                "movieid" : movieid,
                "booked" : booked,
                "option1" : option1,
                "option2" : option2,
                "option3" : option3,
                "option4" : option4,
                "option5" : option5,
                "message" : "You have booked this movie already! Let Others Enjoy too!!",
            })
        elif check2:
            return render(request, "movietime/bookmovie.html",{
                "movieid" : movieid,
                "booked" : booked,
                "option1" : option1,
                "option2" : option2,
                "option3" : option3,
                "option4" : option4,
                "option5" : option5,
                "message" : "You have already booked this movie for a different slot. Thank you!",
            })
        elif check3 == 0:
            return render(request, "movietime/bookmovie.html",{
                "movieid" : movieid,
                "booked" : booked,
                "option1" : option1,
                "option2" : option2,
                "option3" : option3,
                "option4" : option4,
                "option5" : option5,
                "message" : "You have exceeded your Booking Quota for the Day. Please visit us tomorrow!",
            })
        else:
            Book = Booking(SelectedDate=moviedate,SelectedTime=time,moviename=moviename,movieid=movieid,user=bookuser)
            Book.save()
            return HttpResponseRedirect(reverse(bookings))


    return render(request, "movietime/bookmovie.html",{
        "movieid" : movieid,
        "booked" : booked,
        "option1" : option1,
        "option2" : option2,
        "option3" : option3,
        "option4" : option4,
        "option5" : option5,
        "message" : message,

    })
@login_required(login_url='login')
def bookings(request):
    books = Booking.objects.filter(user=request.user).order_by('id').reverse()
    paginator = Paginator(books, 10)
    page_number = request.GET.get('page')
    page = paginator.get_page(page_number)


    print(books)
    return render(request, "movietime/profile.html",{
        "user" : request.user,
        #"bookings" : books,
        "page" : page
    })
@csrf_exempt
@login_required(login_url='login')
def getpost(request,bookingid):
    book = Booking.objects.get(id=bookingid)
    if book:
        if request.method == "GET" and request.user==book.user:
            return JsonResponse(book.serialize())
        if request.method == "PUT":
            if(request.user==book.user):
                data = json.loads(request.body)
                if data.get("delete") is not None:
                    book.cancelled = True
                    book.save()
                    return JsonResponse({"Sucess": "Movie Booking Cancelled"},status=200)
    else:
            return JsonResponse({"error": "Not Found"},status=404)

@login_required(login_url='login')
def editprofile(request):
    user = User.objects.get(username=request.user.username)
    if (request.method == "POST"):
        first_name = request.POST["firstname"]
        last_name = request.POST["lastname"]
        image = request.POST["image"]
        user.first_name = first_name
        user.last_name = last_name
        user.image = image
        user.save()
        return HttpResponseRedirect(reverse(bookings))
    return render(request,"movietime/editprofile.html")
