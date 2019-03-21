from flask import Flask, request, abort, Response
from app.cms.api import app_cms_api
from app.lotus.controller import app_lotus
from app.lotus.api import app_lotus_api
from app.sys.api import app_sys_api
from app.log.controller import app_log
from app.log.api import app_log_api
from common.log_helper import log
import threading
from common.redis_helper import get_redis_link
import jwt
import time


app = Flask(__name__,
            static_url_path='/static',
            static_folder="static",
            template_folder="templates",
            )

# app.config.from_pyfile("config.cfg")
app.config.from_object("config.Config")

app.register_blueprint(app_cms_api, url_prefix="/api/cms")
app.register_blueprint(app_lotus, url_prefix="/lotus")
app.register_blueprint(app_lotus_api, url_prefix="/api/lotus")
app.register_blueprint(app_sys_api, url_prefix="/api/sys")
app.register_blueprint(app_log, url_prefix="/log")
app.register_blueprint(app_log_api, url_prefix="/api/log")

# db = SQLAlchemy(app)

app.jinja_env.variable_start_string = '{['
app.jinja_env.variable_end_string = ']}'


@app.route("/", methods=["GET"])
def index():

    return "index"


@app.before_first_request
def handle_before_first_request():
    pass

#
# @app.before_request
# def handle_before_request():
#     if check_is_api(request):
#         http_authorization = request.headers.get('Authorization')
#         if http_authorization is None:
#             abort(Response(response='no token', status=401))
#         auth = http_authorization.split()
#         if len(auth) < 2:
#             abort(Response(response='wrong token', status=401))
#         if auth[0] != 'Basic' and auth[0] != 'Jwt':
#             abort(Response(response='defined token', status=401))
#         token = auth[1]
#         payload = jwt.decode(token, app.config['SECRET_TOKEN'], verify=False, algorithm=['HS256'])
#         if 'exp' in payload.keys() is False:
#             abort(Response(response='no exp token', status=401))
#         timestamp_now = time.time()
#         if timestamp_now > payload['exp']:
#             abort(Response(response='expired token', status=401))
#         redis_helper = get_redis_link()
#         token_info = redis_helper.get(token)
#         if token_info is None:
#             abort(Response(response='error token', status=401))
#         user_info = eval(token_info.decode("utf-8"))
#         request.session_manager = user_info
#         request.current_user_id = user_info["USERID"]
#         request.current_user_name = user_info["FULLNAME"]
#         request.current_org_id = user_info["ORGID"]
#         request.current_org_name = user_info["ORGNAME"]
#     else:
#         pass


@app.after_request
def handle_after_request(response):
    return response


@app.teardown_request
def handle_teardown_request(response):
    return response


@app.errorhandler(401)
def handle_401_error(e, message):
    return e


@app.errorhandler(404)
def handle_404_error(e):
    return e


@app.errorhandler(500)
def handle_500_error(e):
    s = str(e)
    t = threading.Thread(target=log.logError, args=(s,))
    t.start()
    return s, 500


def check_is_api(req):
    return req.full_path.startswith('/api')


if __name__ == "__main__":
    print(app.url_map)
    # app.run(host="0.0.0.0", port=8888)
    app.run(host="127.0.0.1", port=8888)
    # import commands
    # (status, output) = commands.getstatusoutput('python -m http.server 7777')
