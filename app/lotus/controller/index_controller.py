from . import app_lotus
from flask import render_template


@app_lotus.route("/")
@app_lotus.route("/index")
def index():
    return render_template("lotus_index.html")


@app_lotus.route("/register")
def register():
    return render_template("lotus_register.html")
