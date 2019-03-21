def inject_instance(interface, interfaceType,
                    package_name, file_name, class_name,
                    *args, **kwargs):
    if interfaceType == 'biz':
        inject_class = inject_biz(interface,
                                  package_name=package_name,
                                  file_name=file_name,
                                  class_name=class_name)
    elif interfaceType == 'dal':
        inject_class = inject_dal(interface,
                                  package_name=package_name,
                                  file_name=file_name,
                                  class_name=class_name)
    obj = inject_class.__new__(inject_class, *args, **kwargs)
    obj.__init__(*args, **kwargs)
    return obj


def inject_biz(ibiz, package_name="", file_name="", class_name=""):
    if package_name == "":
        package_name = "cms.biz"
    if file_name == "":
        file_name = ibiz.__name__
        if file_name.find('I') == 0:
            file_name = file_name[1:]
    if class_name == "":
        class_name = ibiz.__name__[1:].capitalize()

    return getClass(package_name, file_name, class_name)


def inject_dal(idal, package_name="", file_name="", class_name=""):
    if package_name == "":
        package_name = "cms.dal"
    if file_name == "":
        file_name = idal.__name__
        if file_name.find('I') == 0:
            file_name = file_name[1:]
    if class_name == "":
        class_name = idal.__name__[1:].capitalize()

    return getClass(package_name, file_name, class_name)


def getClass(package_name, file_name, class_name):
    import importlib
    module = importlib.import_module(package_name + '.' + file_name)
    result = getattr(module, class_name)
    return result
