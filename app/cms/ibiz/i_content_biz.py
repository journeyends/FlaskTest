from app.cms.common.injection_helper import inject_instance


class IContentBiz:
    def __call__(self, *args, **kwargs):
        return inject_instance(IContentBiz, "biz", "",
                               "content_biz", "ContentBiz",
                               *args, **kwargs)
