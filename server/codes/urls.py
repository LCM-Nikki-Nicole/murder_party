from django.urls import path
from .views import CodeInputView
from .views import validate_code

urlpatterns = [
    path('enter-code/', CodeInputView.as_view(), name='code'),
    path('validate-code/', validate_code, name='validate-code'),

]
