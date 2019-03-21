from . import app_log_api
from app.log.biz.attendance_biz import AttendanceBiz
from common.serialize_helper import DateEncoder
from flask import request
import json


@app_log_api.route("/attendance/list")
def list():
    biz = AttendanceBiz()
    attendance_list = biz.get_list()
    return json.dumps(attendance_list, cls=DateEncoder)


@app_log_api.route("/attendance/update")
def update():
    param_dic = eval(json.dumps(request.form))
    aid = param_dic.get("id", 0)
    if aid <= 0:
        return json.dumps({'status': 0})
    biz = AttendanceBiz()
    entry_dt = param_dic.get("entry_dt", None)
    if entry_dt is not None:
        result = biz.update_entry_dt()
    add_dt = param_dic.get("add_dt", None)
    if add_dt is not None:
        result = biz.update_add_dt()
    return json.dumps({'status': result})
