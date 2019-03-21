from app.cms.common.injection_helper import inject_instance


class IChannelDal:
    def __call__(self, *args, **kwargs):
        return inject_instance(IChannelDal, "dal", "",
                               "channel_dal", "ChannelDal",
                               *args, **kwargs)
