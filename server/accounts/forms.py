from django import forms
from django.contrib.auth.forms import UserCreationForm, UserChangeForm
from django.contrib.auth.models import User
from .models import CharacterProfile

class CustomUserCreationForm(UserCreationForm):
    class Meta(UserCreationForm.Meta):
        model = User
        fields = UserCreationForm.Meta.fields + ('email',)

class CustomUserChangeForm(UserChangeForm):
    class Meta(UserChangeForm.Meta):
        model = User
        fields = UserChangeForm.Meta.fields


class CreateAccountForm(forms.ModelForm):
    password = forms.CharField(widget=forms.PasswordInput)
    player_name = forms.ModelChoiceField(queryset=CharacterProfile.objects.values_list('player_name', flat=True).distinct(), empty_label="Select Player Name")

    class Meta:
        model = CharacterProfile
        fields = ['player_name', 'password']

    def save(self, commit=True):
        player_name = self.cleaned_data['player_name']
        password = self.cleaned_data['password']

        # Get the CharacterProfile instance for the player_name
        character = CharacterProfile.objects.get(player_name=player_name)

        # Create the User instance
        user = User.objects.create_user(username=player_name, password=password)

        # Save the character profile
        if commit:
            character.save()

        return user
