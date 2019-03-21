from . import app_lotus_api
from app.lotus.model.lotus_account_model import LotusAccountModel
from app.lotus.biz.register_biz import RegisterBiz
from flask import request
import json


@app_lotus_api.route("/register", methods=['POST'])
def register():
    param_dic = eval(json.dumps(request.form))
    register_model = LotusAccountModel(account=param_dic.get("account", ""),
                                       password=param_dic.get("password", ""),
                                       )
    biz = RegisterBiz()
    if biz.addRegister(register_model):
        return json.dumps({'status': 1})
    else:
        return json.dumps({'status': 0})
