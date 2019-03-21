/*
组件
*/ 
Vue.component('download-component', {
    template: '<div><div class="table-hover-gm">' +
    '  <table class="table">' +
    '    <thead>' +
    '        <tr>' +
    '            <th class="text-center w50"></th>' +
    '            <th class="text-center">NO.</th>' +
    '            <th class="text-center">文件名</th>' +
    '            <th class="text-center">文件类型</th>' +
    '            <th class="text-center">文件大小</th>' +
    '            <th class="text-center">查看</th>' +
    '            <th class="text-center" style="width:50px"></th>' +
    '        </tr>' +
    '    </thead>' +
    '    <tbody>' +
    '        <tr v-for="(item,index) in attachment">' +
    '            <td class="text-center"><input v-if="item.Id > 0" type="checkbox" name="filechk" v-bind:value="item.Id" /></td>' +
    '            <td class="text-center">{{ index+1 }}</td>' +
    '            <td class="text-center">{{ item.Doc_Name }}</td>' +
    '            <td class="text-center">{{ item.Doc_Name | fileType }}</td>' +
    '            <td class="text-center">{{ item.Doc_Size | byteFormat }}</td>' +
    '            <td class="text-center"><a style="cursor:pointer" target="_blank" v-bind:href="toServerPath(item.Doc_Path,item.Doc_Name)"><i class="fa fa-picture-o"></i></a></td>' +
    '            <td class="text-center"><a class="cls_component classremove" style="cursor:pointer" v-on:click="delApplyFile(index)"><i class="fa fa-close"></i></a></td>' +
    '         </tr>' +
    '      </tbody>' +
    '   </table>' +
    '  </div>' +
    '  <div class="row p12 pl25 text-left">' +
    '<button  type="button" class="btndefault cls_component" v-on:click="applyFileUpload(this)"  v-bind:data-undisabled="myisundisabled"><i class="fa fa-cloud-upload"></i>上传</button>' +
    '<button type="button" name="batchdownload" class="btndefault cls_component alldown" v-on:click="batchDownload" v-bind:data-undisabled="myisundisabled"><i class="fa fa-cloud-download"></i>批量下载</button>' +
    '  </div>' +
    '</div>',
    props: ['attachment', 'id', 'tablename', 'isundisabled'],
    data: function () {
        return {
            myattachment: [],
            myisundisabled: 'false'
        };
    },
    created: function () {
        this.myattachment = this.attachment;

        if (this.isundisabled) {
            this.myisundisabled = this.isundisabled;
        }
    },
    methods: {
        applyFileUpload: function () {
            var _this = this;
            $.getTopWindow().bootstrapGM.dialog({
                url: $.getTopWindow().baseUrl + '/SystemManage/File/Index',
                title: '附件',
                width: 800,
                height:500
            }, function (data) {
                $.each(data, function (i, item) {
                    _this.myattachment.push({
                        Bill_Id: item.Bill_Id,
                        Doc_Size: item.Doc_Size,
                        Id: item.Id,
                        Doc_Name: item.Doc_Name,
                        Doc_Path: item.Doc_Path,
                        Table_Name: item.Table_Name
                    });
                });
                _this.$nextTick(function () {
                    _this.$emit('update:attachment', _this.myattachment);
                });
            });
        },
        delApplyFile: function (index) {
            this.myattachment.splice(index, 1);
            this.$emit('update:attachment', this.myattachment);
        },
        batchDownload: function () {
            var id = this.id;
            if (id > 0) {
                var ids = [];
                $("input[name='filechk']:checked").each(function (i, item) {
                    var cid = $(item).val();
                    ids.push(cid);
                });
                if (ids.length > 0) {
                    var param = {
                        ids: ids,
                        billid: id,
                        tablename: this.tablename
                    };
                    this.$http.post('/FileUpload/FileUpload/BatchDownload', param)
                        .then(function (response) {
                            var json = JSON.parse(response.data);
                            if (json.IsError) {
                                this.topmenu().bootstrapGM.alert('下载失败。错误提示：' + json.Message);
                            } else {
                                location.href = "/" + json.Data;
                            }
                        });
                } else {
                    this.topmenu().bootstrapGM.alert('请至少选择一条附件下载！');
                }
            }
        }
    },
    watch: {
        'attachment': {
            handler: function (val, oldval) {
                this.myattachment = val;
            },
            deep: true
        },
        'isundisabled': {
            handler: function (val, oldval) {
                if (val) {
                    this.myisundisabled = val;
                }
            },
            deep: true
        }
    }
});

 