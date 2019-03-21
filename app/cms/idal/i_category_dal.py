from app.cms.common.injection_helper import inject_instance


class ICategoryDal:
    def __call__(self, *args, **kwargs):
        return inject_instance(ICategoryDal, "dal", "",
                               "category_dal", "CategoryDal",
                               *args, **kwargs)

