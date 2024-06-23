from django.urls import path
from .views import get_names
from .views import validate_code

urlpatterns = [
    path('get-names/', get_names, name='get-names'),
    path('validate-code/', validate_code, name='validate-code'),
]
