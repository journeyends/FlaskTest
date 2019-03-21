from flask import Blueprint, request

app_lotus = Blueprint("lotus", __name__,
                      template_folder="templates",
                      static_folder="static")

from .index_controller import index, register
from .user_controller import user
from .message_controller import message


@app_lotus.before_request
def handle_before_request():
    print("app_lotus.before_request")
