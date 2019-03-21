//------vue 全局扩展方法- add by lukes--------2017-06-01----------------------------------------------------------------------------

//1.审核状态全局设置
Vue.prototype.CheckStatusFormat = function (poststatus, checkstatus) {
   
    if (poststatus == 0 && checkstatus == 0) {
        return '<div class="check-icon" title="未审批" style="background-image: url(/scripts/src/images/checkstatus_03.png);background-repeat:no-repeat;background-position-y:10px;width:20px;margin-left:33px;height:40px;line-height:40px;"> </div>';
    } else if (poststatus == 0 && checkstatus == 1) {
        return '<div class="check-icon" title="审批中" style="background-image: url(/scripts/src/images/checkstatus_02.png);background-repeat:no-repeat;background-position-y:10px; width:20px;margin-left:33px;height:40px;line-height:40px;"> </div>';
    } else if (poststatus == 0 && checkstatus == 2) {
        return '<div class="check-icon" title="审批通过" style="background-image: url(/scripts/src/images/checkstatus_04.png);background-repeat:no-repeat;background-position-y:10px;width:20px;margin-left:33px;height:40px;line-height:40px;"> </div>';
    } else if (poststatus == 1 && checkstatus == 2) {
        return '<div class="check-icon" title="已审核" style="background-image: url(/scripts/src/images/checkstatus_04.png);background-repeat:no-repeat;background-position-y:10px;width:20px;margin-left:33px;height:40px;line-height:40px; "> </div>';
    } else if (checkstatus == 3) {
        return '<div class="check-icon" title="审批不通过" style="background-image: url(/scripts/src/images/checkstatus_01.png);background-repeat:no-repeat;background-position-y:10px;width:20px;height:40px; margin-left:33px;line-height:40px; "> </div>';
    } else {
        return '<div class="check-icon" title="新增" style="background-image: url(/scripts/src/images/checkstatus_05.png);background-repeat:no-repeat;background-position-y:10px;width:20px;height:40px;margin-left:33px;line-height:40px;"> </div>';
    }
};



//1.审核状态全局设置
Vue.prototype.IconStatusFormat = function (checkstatus) {

    if (checkstatus == 0) {
        return '<i class="el-icon-warning el-icon--right"></i>';
    } else if (checkstatus == 1) {
        return '<i class="el-icon-time el-icon--right"></i>';
    } else if (checkstatus == 2) {
        return '<i class="el-icon-circle-check el-icon--right"></i>';
    } else if (checkstatus == 3) {
        return '<i class="el-icon-circle-cross el-icon--right"></i>';
    } else if (checkstatus == -1) {
        return '<i class="el-icon-plus el-icon--right"></i>';
    } else {
        return '';
    }
};
Vue.prototype.IconStatus2 = function (checkstatus, type) {
    if (checkstatus == -1) {
        return '<img src="/scripts/src/images/icons/Group56.png" alt="2080跟踪" title="2080跟踪" /> ';
    } else if (checkstatus == 0) {
        return '<img src="/scripts/src/images/icons/Group57.png" alt="2080跟踪" title="2080跟踪" /> ';
    } else if (checkstatus == 1) {
        return '<img src="/scripts/src/images/icons/Group57.png" alt="2080跟踪" title="2080跟踪" /> ';
    } else {
        return '<img src="/scripts/src/images/icons/Group57.png" alt="2080跟踪" title="2080跟踪" /> ';
    }
}

Vue.prototype.IconStatus = function (checkstatus,type) {
    if (type == '投标立项') {
        return '<img src="/scripts/src/images/icons/Group2.png"  alt="投标立项" title="投标立项" /> ';
    }
    else if (type == '招标评审') {
        if (checkstatus == -1) {
            return '<img src="/scripts/src/images/icons/Group3.png" alt="招标评审"  title="招标评审" /> ';
        } else if (checkstatus == 0) {
            return '<img src="/scripts/src/images/icons/Group36.png" alt="招标评审" title="招标评审" /> ';
        } else if (checkstatus == 1) {
            return '<img src="/scripts/src/images/icons/Group54.png" alt="招标评审" title="招标评审" /> ';
        }
    } else if (type == '样板间项目') {
        if (checkstatus == -1) {
            return '<img src="/scripts/src/images/icons/Group16.png" alt="样板间项目" title="样板间项目" /> ';
        } else if (checkstatus == 0) {
            return '<img src="/scripts/src/images/icons/Group23.png" alt="样板间项目" title="样板间项目"   /> ';
        } else if (checkstatus == 1) {
            return '<img src="/scripts/src/images/icons/Group41.png"  alt="样板间项目" title="样板间项目"  /> ';
        }
    } else if (type == '增补项目') {
        if (checkstatus == -1) {
            return '<img src="/scripts/src/images/icons/Group15.png" alt="增补项目" title="增补项目"   /> ';
        } else if (checkstatus == 0) {
            return '<img src="/scripts/src/images/icons/Group24.png" alt="增补项目" title="增补项目"   /> ';
        } else if (checkstatus == 1) {
            return '<img src="/scripts/src/images/icons/Group42.png" alt="增补项目" title="增补项目"   /> ';
        }
    } else if (type == '方案策划') {
        if (checkstatus == -1) {
            return '<img src="/scripts/src/images/icons/Group4.png" alt="方案策划" title="方案策划"  /> ';
        } else if (checkstatus == 0) {
            return '<img src="/scripts/src/images/icons/Group35.png" alt="方案策划" title="方案策划" /> ';
        } else if (checkstatus == 1) {
            return '<img src="/scripts/src/images/icons/Group53.png" alt="方案策划" title="方案策划" /> ';
        }
    } else if (type == '2080跟踪') {
        if (checkstatus == -1) {
            return '<img src="/scripts/src/images/icons/Group5.png" alt="2080跟踪" title="2080跟踪" /> ';
        } else if (checkstatus == 0) {
            return '<img src="/scripts/src/images/icons/Group34.png" alt="2080跟踪" title="2080跟踪" /> ';
        } else if (checkstatus == 1) {
            return '<img src="/scripts/src/images/icons/Group52.png" alt="2080跟踪" title="2080跟踪" /> ';
        } else {
            return '<img src="/scripts/src/images/icons/Group34.png" alt="2080跟踪" title="2080跟踪" /> ';
        }
    } else if (type == '现场踏勘') {
        if (checkstatus == -1) {
            return '<img src="/scripts/src/images/icons/Group6.png" alt="现场踏勘"  title="现场踏勘" /> ';
        } else if (checkstatus == 0) {
            return '<img src="/scripts/src/images/icons/Group33.png" alt="现场踏勘" title="现场踏勘"  /> ';
        } else if (checkstatus == 1) {
            return '<img src="/scripts/src/images/icons/Group51.png" alt="现场踏勘" title="现场踏勘"  /> ';
        }
    } else if (type == '决策定案') {
        if (checkstatus == -1) {
            return '<img src="/scripts/src/images/icons/Group7.png"  alt="决策定案" title="决策定案" /> ';
        } else if (checkstatus == 0) {
            return '<img src="/scripts/src/images/icons/Group32.png" alt="决策定案"  title="决策定案"/> ';
        } else if (checkstatus == 1) {
            return '<img src="/scripts/src/images/icons/Group50.png" alt="决策定案" title="决策定案" /> ';
        }
    } else if (type == '开标评审') {
        if (checkstatus == 0) {
            return '<img src="/scripts/src/images/icons/Group8.png"  alt="开标评审"  title="开标评审"/> ';
        }  
    } else if (type == '新增开标') {
        if (checkstatus == -1) {
            return '<img src="/scripts/src/images/icons/Group9.png"  alt="新增开标"  title="新增开标"/> ';
        } else if (checkstatus == 0) {
            return '<img src="/scripts/src/images/icons/Group9.png" alt="新增开标" title="新增开标" /> ';
        } else if (checkstatus == 1) {
            return '<img src="/scripts/src/images/icons/Group9.png"  alt="新增开标" title="新增开标"/> ';
        }
    } else if (type == '新增回标') {
        if (checkstatus >= 0) {
            return '<img src="/scripts/src/images/icons/Group10.png" alt="新增回标" title="新增回标" /> ';
        }  
    } else if (type == '产值统计') {
        if (checkstatus == -1) {
            return '<img src="/scripts/src/images/icons/Group11.png" alt="产值统计" title="产值统计" /> ';
        } else if (checkstatus == 0) {
            return '<img src="/scripts/src/images/icons/Group28.png" alt="产值统计" title="产值统计"  /> ';
        } else if (checkstatus == 1) {
            return '<img src="/scripts/src/images/icons/Group46.png" alt="产值统计" title="产值统计"  /> ';
        }
    } else if (type == '中标交底') {
        if (checkstatus == -1) {
            return '<img src="/scripts/src/images/icons/Group13.png" alt="中标交底"  title="中标交底"  /> ';
        } else if (checkstatus == 0) {
            return '<img src="/scripts/src/images/icons/Group26.png" alt="中标交底"  title="中标交底" /> ';
        } else if (checkstatus == 1) {
            return '<img src="/scripts/src/images/icons/Group44.png" alt="中标交底"  title="中标交底" /> ';
        }
    } else if (type == '中标发文') {
        if (checkstatus == -1) {
            return '<img src="/scripts/src/images/icons/Group12.png"  alt="中标发文"  title="中标发文"/> ';
        } else if (checkstatus == 0) {
            return '<img src="/scripts/src/images/icons/Group27.png" alt="中标发文" title="中标发文" /> ';
        } else if (checkstatus == 1) {
            return '<img src="/scripts/src/images/icons/Group45.png" alt="中标发文" title="中标发文" /> ';
        }
    } else if (type == '标后总结') {
        if (checkstatus == -1) {
            return '<img src="/scripts/src/images/icons/Group17.png" alt="标后总结" title="标后总结" /> ';
        } else if (checkstatus == 0) {
            return '<img src="/scripts/src/images/icons/Group22.png" alt="标后总结" title="标后总结" /> ';
        } else if (checkstatus == 1) {
            return '<img src="/scripts/src/images/icons/Group40.png" alt="标后总结" title="标后总结" /> ';
        }
    } else if (type == '项目评价') {
        if (checkstatus == -1) {
            return '<img src="/scripts/src/images/icons/Group18.png"  alt="项目评价" title="项目评价"/> ';
        } else if (checkstatus == 0) {
            return '<img src="/scripts/src/images/icons/Group21.png"  alt="项目评价" title="项目评价"/> ';
        } else if (checkstatus == 1) {
            return '<img src="/scripts/src/images/icons/Group39.png"  alt="项目评价" title="项目评价"/> ';
        }
    } else if (type == '资料归档') {
        if (checkstatus == -1) {
            return '<img src="/scripts/src/images/icons/Group19.png"  alt="资料归档" title="资料归档"/> ';
        } else if (checkstatus == 0) {
            return '<img src="/scripts/src/images/icons/Group20.png" alt="资料归档" title="资料归档" /> ';
        } else if (checkstatus == 1) {
            return '<img src="/scripts/src/images/icons/Group38.png" alt="资料归档" title="资料归档" /> ';
        }
    } else if (type == '未中标分析') {
        if (checkstatus == -1) {
            return '<img src="/scripts/src/images/icons/Group14.png" alt="未中标分析" title="未中标分析" /> ';
        } else if (checkstatus == 0) {
            return '<img src="/scripts/src/images/icons/Group25.png" alt="未中标分析"  title="未中标分析" /> ';
        } else if (checkstatus == 1) {
            return '<img src="/scripts/src/images/icons/Group43.png" alt="未中标分析" title="未中标分析"  /> ';
        }
    } else if (type == '开标结果样板房') {
        return '<img src="/scripts/src/images/icons/Group58.png" alt="开标结果" title="开标结果"  /> ';
    } else if (type == '开标结果增补') {
        return '<img src="/scripts/src/images/icons/Group59.png" alt="开标结果" title="开标结果"  /> ';
    }


    
    
};




//2.审核状态图片
Vue.prototype.CheckStatusPic = function (checkstatus) {
    var tmpstr = '<div class="check-status">';
    if (checkstatus == 0) {
        tmpstr += '<div  class="uncheck"></div>';
    } else if (checkstatus == 1) {
        tmpstr += '<div  class="checking"></div>';
    } else if (checkstatus == 2) {
        tmpstr += '<div  class="hascheck"></div>';
    } else if (checkstatus == 3) {
        tmpstr += '<div  class="nocheck"></div>';
    }
    tmpstr += '</div>';
    return tmpstr;
};
//3.审核状态盖章图片效果图
Vue.prototype.CheckStatusPicAction = function (checkstatus) {
    var tmpstr = '/Scripts/src/images/checkstatus03.png';
    if (checkstatus == 0) {
        tmpstr = '/Scripts/src/images/checkstatus03.png';
    } else if (checkstatus == 1) {
        tmpstr = '/Scripts/src/images/checkstatus01.png';
    } else if (checkstatus == 2) {
        tmpstr = '/Scripts/src/images/checkstatus02.png';
    } else if (checkstatus == 3) {
        tmpstr = '/Scripts/src/images/checkstatus04.png';
    }
    return tmpstr;
};

//投标系统 已中标、已完成、未中标
Vue.prototype.CheckStatusPicAction2 = function (checkstatus) {
    var tmpstr = '';
    if (checkstatus == 1) {
        tmpstr = '/Scripts/src/images/checkstatus05.png';
    } else if (checkstatus == 2) {
        tmpstr = '/Scripts/src/images/checkstatus06.png';
    } else if (checkstatus == 3) {
        tmpstr = '/Scripts/src/images/checkstatus7.png';
    }  
    return tmpstr;
     
};

Vue.prototype.CheckStatusPicAction3 = function (checkstatus) {
    var tmpstr = '';
    if (checkstatus ==0) {
        tmpstr = '/Scripts/src/images/BidStatus01.png';
    } else if (checkstatus == 3) {
        tmpstr = '/Scripts/src/images/BidStatus02.png';
    } else if (checkstatus == 4) {
        tmpstr = '/Scripts/src/images/BidStatus03.png';
    } else if (checkstatus == 5) {
        tmpstr = '/Scripts/src/images/BidStatus04.png';
    } else if (checkstatus == 6) {
        tmpstr = '/Scripts/src/images/BidStatus05.png';
    } else if (checkstatus == 2) {
        tmpstr = '/Scripts/src/images/BidStatus06.png';
    } else if (checkstatus == 1) {
        tmpstr = '/Scripts/src/images/BidStatus07.png';
    } else if (checkstatus == 7) {
        tmpstr = '/Scripts/src/images/BidStatus08.png';
    } else {
        tmpstr = '';
    }
    return tmpstr;

};

Vue.prototype.OpenResultPicAction = function (openResult,checkstatus) {
    var tmpstr = '/Scripts/src/images/bided.png';
    if (openResult.Open_Bid_Result == 2) {
        tmpstr = '/Scripts/src/images/bided.png';
    } else if (openResult.Open_Bid_Result == 1) {
        tmpstr = '/Scripts/src/images/unbided.png';
    } else if (openResult.Open_Bid_Result == 0) {
        tmpstr = '/Scripts/src/images/bidfinished.png';
    } else {
        if (checkstatus == 0) {
            tmpstr = '/Scripts/src/images/checkstatus03.png';
        } else if (checkstatus == 1) {
            tmpstr = '/Scripts/src/images/checkstatus01.png';
        } else if (checkstatus == 2) {
            tmpstr = '/Scripts/src/images/checkstatus02.png';
        } else if (checkstatus == 3) {
            tmpstr = '/Scripts/src/images/checkstatus04.png';
        }
    }
    return tmpstr;
};

//4.排名图片效果图
Vue.prototype.SortNoPicFormat = function (sortno) {
    var tmpstr = sortno;
    if (sortno == 1) {
        tmpstr = '<div  class="trophy golden"></div>';
    } else if (sortno == 2) {
        tmpstr = '<div  class="trophy silver"></div>';
    } else if (sortno == 3) {
        tmpstr = '<div  class="trophy coppery"></div>';
    }
    return tmpstr;
};
Vue.prototype.GetAreaPathNameByAreaId = function (areaId) {
    var name;
    if (areaId != undefined) {
        $.ajax({
            type: "GET",
            url: $.getTopWindow().baseUrl + '/api/AreaMapApi' + "/GetAreaPathNameByAreaId?areaId=" + areaId,
            dataType: "Json",
            async: false,
            cache: true,
            success: function(data) {
                name = data;
            }
        });
    }
    return name;
};


Vue.prototype.project_scope_name = function (value,type_id) { 
    var res;
    $.ajax({
        type: "GET",
        url: $.getTopWindow().baseUrl + '/api/BidReviewApi/ListType_Name?parent_id=' + type_id,
        dataType: "Json",
        async: false,
        cache: true,
        success: function (data) {
             
            for (var bean in data) {
                if (data[bean].Type_Id == value) {
                    res = data[bean].Type_Name;
                }
            }
        }
    });
    return res;  
};


Vue.prototype.project_type_name = function (value) {
    var res;
    $.ajax({
        type: "GET",
        url: $.getTopWindow().baseUrl + '/api/BidReviewApi/ListProjectType_Name?type_id=' + value,
        dataType: "Json",
        async: false,
        cache: true,
        success: function (data) { 
            res = data.Type_Name;
        }
    });
    return res;
};


Vue.prototype.dept_name = function(value) {
    var res;
    if (value != null) {
        $.ajax({
            type: "GET",
            url: $.getTopWindow().baseUrl + '/api/BidReviewApi/dept_name?dept_id=' + value,
            dataType: "Json",
            async: false,
            cache: true,
            success: function(data) {
                res = data;
            }
        });
    } else {
        res = '';
    }

    return res;

};

Vue.prototype.user_name = function (value) {
    var res;
    if (value != null) {
        $.ajax({
            type: "GET",
            url: $.getTopWindow().baseUrl + '/api/BidReviewApi/user_name?user_id=' + value,
            dataType: "Json",
            async: false,
            cache: true,
            success: function(data) {
                res = data;
            }
        });
    } else {
        res = '';
    }

    return res;

};
/**
 * 用户信息查看
 * @returns {} 
 */
Vue.prototype.showUserInfo = function (userid) {
    if (userid > 0) {
        $.getTopWindow().menu.addTabs('用户信息查看',
            $.getTopWindow().baseUrl + '/SystemManage/SysUser/ViewInfo?id=' + userid,
            true,
            function () { }
        );
    }
}


Vue.prototype.toServerPath = function (path, name) {
    return 'http://erp.goldmantis.com/OA/WorkSpace/DownloadFile.aspx?Path=' + path + '&Name=' + name;
};

Vue.prototype.toFloat = function (num) {
    return Math.round(parseFloat((num == null || num == undefined) ? 0 : isNaN(parseFloat(num)) ? 0 : num) * Math.pow(10, 2)) / Math.pow(10, 2);
};

Vue.prototype.toInt = function (num) {
    return Math.round(parseFloat((num == null || num == undefined) ? 0 : isNaN(parseFloat(num)) ? 0 : num));
};