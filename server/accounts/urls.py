from django.urls import path
from .views import create_account, check_username_exists
from .views import login_view
from .views import check_auth

urlpatterns = [
    path('create-account/', create_account, name='create-account'),
    path('check-username/', check_username_exists, name='check-username'),
    path('api/login/', login_view, name='login'),
    path('api/check-auth/', check_auth, name='check-auth'),
]
