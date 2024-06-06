from django import forms

class CodeForm(forms.Form):
    code = forms.CharField(
        max_length=5,
        min_length=5,
        widget=forms.TextInput(attrs={
            'class': 'form-control',
            'placeholder': 'Enter 5 digit code'
        })
    )