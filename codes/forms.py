from django import forms

class CodeForm(forms.Form):
    code = forms.CharField(
        widget=forms.TextInput(attrs={
            'class': 'form-control',
            'placeholder': 'Enter 5 digit code'
        })
    )