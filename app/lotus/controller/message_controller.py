from . import app_lotus
from flask import render_template


@app_lotus.route("/message")
def message():
    return render_template("lotus_message.html")
