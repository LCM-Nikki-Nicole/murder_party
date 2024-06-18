from django.urls import path
from .views import CodeInputView

urlpatterns = [
    path('enter-code/', CodeInputView.as_view(), name='code'),
]