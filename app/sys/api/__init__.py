from flask import Blueprint

app_sys_api = Blueprint("sys_api", __name__,
                        template_folder="templates",
                        static_folder="static")

from .upload_api import upload, get_file_path


@app_sys_api.before_request
def handle_before_request():
    print("app_lotus_api.before_request")
