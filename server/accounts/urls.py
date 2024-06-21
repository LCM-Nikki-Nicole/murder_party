from django.urls import path
from .views import create_account, check_username_exists

urlpatterns = [
    path('create-account/', create_account, name='create-account'),
    path('check-username/', check_username_exists, name='check-username'),
]
