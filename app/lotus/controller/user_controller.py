from . import app_lotus
from flask import render_template, request


@app_lotus.route("/user")
def user():
    a=1/0
    return render_template("lotus_user.html")
