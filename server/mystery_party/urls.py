from django.contrib import admin
from django.urls import path, include
from django.views.generic.base import TemplateView
from .views import login_view, check_auth_status

urlpatterns = [
    path("admin/", admin.site.urls),
    path("accounts/", include("accounts.urls")),
    path("accounts/", include("django.contrib.auth.urls")),
    path("codes/", include("codes.urls")),
    path("", TemplateView.as_view(template_name="home.html"), name="home"),
    path('api/', include('codes.urls')),
    path('api/login/', login_view, name='login'),
    path('api/check-auth/', check_auth_status, name='check_auth'),

    ]
