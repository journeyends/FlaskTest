import time


def getTimeSpan():
    return time.time()


def getDateTime():
    return time.strftime('%Y-%m-%d %H:%M:%S', time.localtime(getTimeSpan()))


if __name__ == "__main__":
    print(getTimeSpan())
    print(getDateTime())
