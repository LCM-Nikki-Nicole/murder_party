from config import PUZZLE_CODE
from django.views.generic.edit import FormView
from django.http import HttpResponse
from .forms import CodeForm
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt

@csrf_exempt
def get_names(request):
    names = ["NICOLE", "NIKKI", "NICK", "ROB", "MAX", "SIMON", "KEVIN", "IAN", "MARIA", "NAOMI", "JAZZ"]
    return JsonResponse({"names": names})
class CodeInputView(FormView):
    template_name = 'code.html'
    form_class = CodeForm
    success_url = '/success/'  # URL to redirect to on success

    puzzle_code = PUZZLE_CODE

    def form_valid(self, form):
        code = form.cleaned_data['code']
        if code == self.puzzle_code:
            return HttpResponse("Code is correct!")
        else:
            form.add_error('code', 'The code is incorrect.')
            return self.form_invalid(form)
