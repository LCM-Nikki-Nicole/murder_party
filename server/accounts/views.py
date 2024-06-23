from django.contrib.auth.models import User
from django.contrib.auth import login, authenticate
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth.decorators import login_required
import json
from .forms import CreateAccountForm
from django.shortcuts import render, redirect
from .models import CharacterProfile

def get_characters(request):
    characters = CharacterProfile.objects.filter(user__isnull=True).values('id', 'character_name')
    return JsonResponse({'characters': list(characters)})

@csrf_exempt
def create_account(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        player_name = data.get('player_name')
        password = data.get('password')

        if not player_name:
            return JsonResponse({'error': 'Player name is required'}, status=400)

        if User.objects.filter(username=player_name).exists():
            return JsonResponse({'error': 'Account with this name already exists'}, status=400)

        try:
            # Get the character profile for the given player name
            character_profile = CharacterProfile.objects.get(player_name=player_name)
        except CharacterProfile.DoesNotExist:
            return JsonResponse({'error': 'Character profile not found for the given player name'}, status=400)

        # Create the user
        user = User.objects.create_user(username=player_name, password=password, first_name=player_name)
        user.save()

        # Automatically log in the user
        user = authenticate(request, username=player_name, password=password)
        if user is not None:
            login(request, user)
            return JsonResponse({'success': 'Account created and user logged in successfully'}, status=201)
        else:
            return JsonResponse({'error': 'Failed to authenticate the user after account creation'}, status=400)

    return JsonResponse({'error': 'Invalid request method'}, status=405)
@login_required
def get_user_character(request):
    user = request.user
    character = CharacterProfile.objects.filter(user=user).first()
    if character:
        return JsonResponse({
            'first_name': character.player_name,  # Use player_name for first_name
            'character_name': character.character_name,
            'profession': character.profession,
            'image': character.image,
            'pdf': character.pdf
        })
    else:
        return JsonResponse({'error': 'Character not found for user'}, status=404)

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
def user_data(request):
    user = request.user
    try:
        character_profile = CharacterProfile.objects.get(player_name=user.username)
        data = {
            'first_name': user.first_name,
            'character_first_name': character_profile.character_first_name,
            'character_last_name': character_profile.character_last_name,
            'profession': character_profile.profession,
            'image': character_profile.image.url,
            'pdf': character_profile.pdf.url
        }
        return JsonResponse(data)
    except CharacterProfile.DoesNotExist:
        return JsonResponse({'error': 'Character profile not found'}, status=404)

@login_required
def check_auth(request):
    return JsonResponse({'authenticated': True})

def get_names(request):
    players = CharacterProfile.objects.filter(user__isnull=True).values_list('player_name', flat=True)
    return JsonResponse({'names': list(players)})
