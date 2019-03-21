from flask import Blueprint, request

app_log_api = Blueprint("log_api", __name__)

from .attendance_api import list
