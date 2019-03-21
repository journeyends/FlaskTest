import time


def timeFormat(strs):
    now = int(time.time())
    timeStruct = time.localtime(now)
    return time.strftime(strs, timeStruct)


def strFormat(strs):
    return strs.replace('false', 'False')\
        .replace('true', 'True')\
        .replace('null', 'None')
