from app.cms.common.injection_helper import inject_instance


class IContentDal:
    def __call__(self, *args, **kwargs):
        return inject_instance(IContentDal, "dal", "",
                               "content_dal", "ContentDal",
                               *args, **kwargs)
