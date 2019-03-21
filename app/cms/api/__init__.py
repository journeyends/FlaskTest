from flask import Blueprint


app_cms_api = Blueprint("cms_api", __name__)


from .site_api import site_list
