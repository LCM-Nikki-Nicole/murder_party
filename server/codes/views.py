from config import PUZZLE_CODE
from django.contrib.auth.models import User
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json


@csrf_exempt
def get_names(request):
    names = ["NICOLE", "NIKKI", "NICK", "ROB", "MAX", "SIMON", "KEVIN", "IAN", "MARIA", "NAOMI", "JAZZ"]
    return JsonResponse({"names": names})

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


@csrf_exempt
def validate_code(request):
    if request.method == "POST":
        data = json.loads(request.body)
        code = data.get("code")
        if code == PUZZLE_CODE:
            return JsonResponse({"valid": True})
        return JsonResponse({"valid": False})
    return JsonResponse({"valid": False})
