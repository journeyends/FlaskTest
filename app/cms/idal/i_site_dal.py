from app.cms.common.injection_helper import inject_instance


class ISiteDal:
    def __call__(self, *args, **kwargs):
        return inject_instance(ISiteDal, "dal", "",
                               "site_dal", "SiteDal",
                               *args, **kwargs)
