from config import PUZZLE_CODE
from django.views.generic.edit import FormView
from django.http import HttpResponse
from .forms import CodeForm
# Nicole doesnt know what she's doing but she'S TRYING
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json

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

# AM I DOING IT NOW MR.KRABS
@csrf_exempt
def validate_code(request):
    if request.method == "POST":
        data = json.loads(request.body)
        code = data.get("code")
        if code == PUZZLE_CODE:
            return JsonResponse({"valid": True})
        return JsonResponse({"valid": False})
    return JsonResponse({"valid": False})
