from django.contrib import admin
from django.urls import path, include
from django.views.generic.base import TemplateView
from accounts.views import login_view, check_auth, user_data  # Import from accounts

urlpatterns = [
    path("admin/", admin.site.urls),
    path("accounts/", include("accounts.urls")),
    path("accounts/", include("django.contrib.auth.urls")),  # Include Django's auth URLs
    path("codes/", include("codes.urls")),
    path("", TemplateView.as_view(template_name="home.html"), name="home"),
    path('api/login/', login_view, name='login'),
    path('api/check-auth/', check_auth, name='check_auth'),
    path('api/user-data/', user_data, name='user-data'),
    path('api/', include('codes.urls')),  # Keep other API paths after specific ones
]
