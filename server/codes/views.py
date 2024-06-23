from config import PUZZLE_CODE
from django.contrib.auth.models import User
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json


@csrf_exempt
def get_names(request):
    names = ["Nicole", "Michelle", "Maria", "Naomi", "Lexi", "Ian", "Nick", "Kevin", "Nikki", "McK", "Jazz", "Peter", "Rob", "Max", "Simon"]
    return JsonResponse({"names": names})

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
