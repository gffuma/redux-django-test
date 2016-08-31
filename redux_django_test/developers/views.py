from django.shortcuts import render
from django.http import HttpResponse
from developers.redux_store import store

def index(request):
    store.set_state({
        'developers': [
            {
                'name': 'Mauro'
            },
            {
                'name': 'Giovanni'
            },
            {
                'name': 'Lorenzo'
            }
        ]
    })
    store.set_state({
        'coolest': 'Lorenzo'
    })
    context = {
    }
    return render(request, 'developers.html', context)
