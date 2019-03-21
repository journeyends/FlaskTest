from flask import Blueprint, request

app_lotus_api = Blueprint("lotus_api", __name__,
                          template_folder="templates",
                          static_folder="static")

from .register_api import register
from .user_api import save_user


@app_lotus_api.before_request
def handle_before_request():
    print("app_lotus_api.before_request")
