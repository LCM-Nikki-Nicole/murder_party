# server/accounts/urls.py
from django.urls import path
from .views import create_account, check_username_exists, login_view, check_auth, user_data, get_characters, get_names, get_user_character

urlpatterns = [
    path('create-account/', create_account, name='create-account'),
    path('check-username/', check_username_exists, name='check-username'),
    path('login/', login_view, name='login'),
    path('check-auth/', check_auth, name='check-auth'),
    path('user-data/', user_data, name='user-data'),
    path('get-names/', get_names, name='get-names'),
    path('get-characters/', get_characters, name='get-characters'),
    path('get-user-character/', get_user_character, name='get-user-character'),
    path('user-data/', user_data, name='user-data'),
]
