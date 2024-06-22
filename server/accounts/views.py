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

        if User.objects.filter(username=username).exists():
            return JsonResponse({'error': 'Account with this name already exists'}, status=400)

        user = User.objects.create_user(username=username, password=password)
        user.save()
        return JsonResponse({'success': 'Account created successfully'}, status=201)

    return JsonResponse({'error': 'Invalid request method'}, status=405)

@csrf_exempt
def check_username_exists(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        username = data.get('username', '')
        exists = User.objects.filter(username=username).exists()
        return JsonResponse({'exists': exists})
