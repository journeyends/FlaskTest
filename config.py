class Config(object):
    DEBUG = False
    SQLALCHEMY_DATABASE_URI = "mysql://root:123456@127.0.0.1:3306/gmerptest"
    SQLALCHEMY_ECHO = True
    MAX_CONTENT_LENGTH = 1024 * 1024 * 1024
    UPLOADED_IMAGES_DEST = '/upload/'
    UPLOAD_FOLDER = 'upload'
    UPLOAD_ALLOWED_EXTENSIONS = set(['txt', 'png', 'jpg', 'xls', 'JPG', 'PNG', 'xlsx', 'gif', 'GIF'])
    FILE_URL = 'http://127.0.0.1'
    FILE_PORT = '7777'
    SECRET_TOKEN = '3u)6^ar+2)2sc)krkci2j-$gobn&dr9hifv#@0oh*p%mk$1p_7'
