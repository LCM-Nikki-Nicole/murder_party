from django.contrib.auth.models import User
from django.contrib.auth import login, authenticate
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth.decorators import login_required
import json

# server/accounts/views.py

from django.contrib.auth.models import User
from django.contrib.auth import login, authenticate
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json

@csrf_exempt
def create_account(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        username = data.get('username')
        password = data.get('password')
        first_name = data.get('first_name', username)

        if User.objects.filter(username=username).exists():
            return JsonResponse({'error': 'Account with this name already exists'}, status=400)

        user = User.objects.create_user(username=username, password=password, first_name=first_name)
        user.save()

        # Automatically log in the user
        user = authenticate(request, username=username, password=password)
        if user is not None:
            login(request, user)
            return JsonResponse({'success': 'Account created and user logged in successfully'}, status=201)
        else:
            return JsonResponse({'error': 'Failed to authenticate the user after account creation'}, status=400)

    return JsonResponse({'error': 'Invalid request method'}, status=405)



@csrf_exempt
def check_username_exists(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        username = data.get('username', '')
        exists = User.objects.filter(username=username).exists()
        return JsonResponse({'exists': exists})

@csrf_exempt
def login_view(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        username = data.get('username')
        password = data.get('password')
        user = authenticate(request, username=username, password=password)
        if user is not None:
            login(request, user)
            return JsonResponse({'success': True})
        else:
            return JsonResponse({'success': False, 'error': 'Invalid credentials'}, status=400)
    return JsonResponse({'error': 'Invalid request method'}, status=405)


@login_required
def check_auth(request):
    return JsonResponse({'authenticated': True})

@login_required
def user_data(request):
    user = request.user
    print(f"Authenticated user: {user.username}, First name: {user.first_name}")
    return JsonResponse({'first_name': user.first_name})
