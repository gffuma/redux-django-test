import json

from developers.redux_store import store
from django import template

register = template.Library()

@register.simple_tag
def redux_get_state_json():
    return json.dumps(store.get_state())

