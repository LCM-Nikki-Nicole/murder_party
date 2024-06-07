from django.urls import path
from .views import SignUpView, CustomLoginView

urlpatterns = [
    path("", SignUpView.as_view(), name="signup"),
    path("login/", CustomLoginView.as_view(), name="login"),
]