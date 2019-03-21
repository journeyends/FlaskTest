from . import app_cms_api


@app_cms_api.route("/site/list")
def site_list():
    return "site_list"
