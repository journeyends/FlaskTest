from . import app_log
from flask import render_template, request


@app_log.route("/attendance/list")
def attendance_list():
    return render_template("attendance_list.html")
