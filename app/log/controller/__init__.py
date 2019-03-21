from flask import Blueprint, request

app_log = Blueprint("log", __name__,
                    template_folder="templates",
                    static_folder="static")

from .attendance_controller import attendance_list