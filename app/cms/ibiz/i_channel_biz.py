from app.cms.common.injection_helper import inject_instance


class IChannelBiz:
    def __call__(self, *args, **kwargs):
        return inject_instance(IChannelBiz, "biz", "",
                               "channel_biz", "ChannelBiz",
                               *args, **kwargs)
