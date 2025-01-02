"""
URL configuration for backend project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from api.views import CreateUserView
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

urlpatterns = [
    # for admin
    path("admin/", admin.site.urls),
    # create user
    path("api/user/register/", CreateUserView.as_view(), name="register"),
    # get the token
    path("api/token/", TokenObtainPairView.as_view(), name="get_token"),
    # refresh token
    path("api/token/refresh/", TokenRefreshView.as_view(), name="refresh"),
    # linked all urls needed from rest framework
    path("api-auth/", include("rest_framework.urls")),
    # for the urls.py in app(api)
    path("api/", include("api.urls")),
]