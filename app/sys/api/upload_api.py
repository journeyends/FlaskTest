from app.sys.biz.attach_biz import AttachBiz
from app.sys.model.attach_model import AttachModel
from . import app_sys_api
import os
from startup import app
from flask import request
# from werkzeug.utils import secure_filename
import time
import json


def allowed_file(filename):
    # 判断文件的扩展名是否在配置项ALLOWED_EXTENSIONS中
    return '.' in filename and \
           filename.rsplit('.', 1)[1] in app.config['UPLOAD_ALLOWED_EXTENSIONS']


@app_sys_api.route("/upload", methods=['POST'])
def upload():
    abspath = os.getcwd()  # 获取当前路径
    basedir = os.path.abspath(os.path.dirname(__file__))
    file_dir = os.path.join(basedir, app.config['UPLOAD_FOLDER'])
    rootpath = file_dir.replace(abspath, '', 1)
    if not os.path.exists(file_dir):
        os.makedirs(file_dir)
    file_list = request.files.to_dict()
    file_value_list = file_list.values()
    key_id = request.form.get("keyId", "")
    key_name = request.form.get("keyName", "")
    attach_list = []
    for file in file_value_list:
        if file and allowed_file(file.filename):
            # secure_file_name = secure_filename(file.filename)
            filename = file.filename.rsplit('.', 1)[0]
            ext = file.filename.rsplit('.', 1)[1]
            unix_time = int(time.time())
            new_filename = filename + str(unix_time) + '.' + ext
            attach_path = os.path.join(file_dir, new_filename)
            file.save(attach_path)
            file_size = os.path.getsize(attach_path)
            root_attach_path = os.path.join(rootpath, new_filename)
            attach_model = AttachBiz() \
                .addAttach(AttachModel(key_id=key_id,
                                       key_name=key_name,
                                       attach_name=new_filename,
                                       attach_path=root_attach_path,
                                       attach_size=file_size,
                                       attach_type=ext))
            if attach_model.id <= 0:
                return json.dumps({"status": 0})
            attach_list.append({'id': attach_model.id, 'path': attach_model.attach_path})
        else:
            return json.dumps({"status": 0})

    return json.dumps({"status": 1, 'attach_list': attach_list})


@app_sys_api.route("/file/path/<int:attach_id>", methods=['GET'])
def get_file_path(attach_id):
    attach_model = AttachBiz().getAttach(attach_id)
    return app.config['FILE_URL'] + ':' + app.config['FILE_PORT'] + attach_model.attach_path
