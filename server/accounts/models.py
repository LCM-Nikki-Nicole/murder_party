from django.contrib.auth.models import User
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json

@csrf_exempt
def create_account(request):
    if request.method == "POST":
        data = json.loads(request.body)
        username = data.get("username")
        password = data.get("password")
        if User.objects.filter(username=username).exists():
            return JsonResponse({"error": "An account with that name already exists."}, status=400)
        user = User.objects.create_user(username=username, password=password)
        return JsonResponse({"success": "Account created successfully."})
    return JsonResponse({"error": "Invalid request method."}, status=405)
