from django.urls import path
from .views import get_names, create_account

urlpatterns = [
    path('get-names/', get_names, name='get-names'),
    path('create-account/', create_account, name='create-account'),
]
