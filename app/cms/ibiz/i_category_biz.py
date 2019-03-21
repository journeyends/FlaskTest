from app.cms.common.injection_helper import inject_instance


class ICategoryBiz:
    def __call__(self, *args, **kwargs):
        return inject_instance(ICategoryBiz, "biz", "",
                               "category_biz", "CategoryBiz",
                               *args, **kwargs)
