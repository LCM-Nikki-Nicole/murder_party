from django.urls import path
from .views import CodeInputView, get_names

urlpatterns = [
    path('enter-code/', CodeInputView.as_view(), name='code'),
    path('get-names/', get_names, name='get-names'),
]
