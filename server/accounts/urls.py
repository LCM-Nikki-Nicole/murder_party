from django.urls import path
from .views import create_account, check_username_exists, login_view, check_auth, user_data

urlpatterns = [
    path('create-account/', create_account, name='create-account'),
    path('check-username/', check_username_exists, name='check-username'),
    path('login/', login_view, name='login'),
    path('check-auth/', check_auth, name='check-auth'),
    path('user-data/', user_data, name='user-data'),
]
