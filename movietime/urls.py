
from django.urls import path
from django.conf.urls import url

from . import views

urlpatterns = [
    path("", views.index, name="index"),
    path("login", views.login_view, name="login"),
    path("logout", views.logout_view, name="logout"),
    path("register", views.register, name="register"),
    # path("create",views.create,name="create"),
    # path("<str:post_id>/delete", views.delete, name="delete"),
    # path("posts/<int:post_id>/edit", views.edit, name="edit"),
    # path("posts/like/<int:post_id>", views.like, name="like"),
    path("search",views.index,name="search"),
    path("movies/<int:movieid>",views.getmovie,name="getmovie"),
    path("movies/<int:movieid>/book",views.bookmovie,name="bookmovie"),
    path("mybookings",views.bookings,name="bookings"),
    path("mybookings/<int:bookingid>",views.getpost,name="getpost"),
    # path("users/<str:username>",views.profile,name="profile"),
    # path("users/<str:username>/followthisuser/follow/followorunfollow/redirect/followedbyme",views.follow,name="follow"),
    # path("following",views.following,name="following"),
    path("editprofile",views.editprofile,name="editprofile"),

]