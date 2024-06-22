# In mystery_party/views.py
from django.contrib.auth import authenticate
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json
from django.contrib.auth.decorators import login_required

@login_required
def check_auth_status(request):
    return JsonResponse({'authenticated': True})

    if request.method == 'POST':
        data = json.loads(request.body)
        username = data.get('firstname')
        password = data.get('password')
        user = authenticate(request, username=username, password=password)
        if user is not None:
            return JsonResponse({'success': True})
        else:
            return JsonResponse({'success': False, 'error': 'Invalid credentials'}, status=400)
    return JsonResponse({'error': 'Invalid request method'}, status=405)

@login_required
def user_data(request):
    user = request.user
    return JsonResponse({'first_name': user.first_name})
