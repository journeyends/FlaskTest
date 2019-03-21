from app.cms.common.injection_helper import inject_instance


class ISiteBiz:
    def __call__(self, *args, **kwargs):
        return inject_instance(ISiteBiz, "biz", "",
                               "site_biz", "SiteBiz",
                               *args, **kwargs)
