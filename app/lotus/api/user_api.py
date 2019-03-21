from . import app_lotus_api
from app.lotus.model.lotus_user_model import LotusUserModel
from app.lotus.biz.user_biz import UserBiz
from flask import request
from common.param_helper import get_model_by_param_dict
from common.serialize_helper import new_alchemy_encoder
from config import Config
import json


@app_lotus_api.route("/user/<int:user_id>", methods=['GET'])
def get_user(user_id):
    biz = UserBiz()
    model = biz.get_user_by_id(user_id)
    return json.dumps({'user': json.dumps(model,
                                          cls=new_alchemy_encoder(),
                                          check_circular=False),
                       'head_photo_url': Config.FILE_URL + ':' + Config.FILE_PORT + model.head_photo_path
                       })


@app_lotus_api.route("/user/save", methods=['POST'])
def save_user():
    user_model = get_model_by_param_dict(LotusUserModel,
                                         'user', eval(json.dumps(request.form)))
    biz = UserBiz()
    model = biz.addUser(user_model)
    if model.id > 0:
        return json.dumps({'status': 1})
    else:
        return json.dumps({'status': 0})

