// bool类型格式化
Vue.filter('booleanFormat', function (boolean, trueText, falseText) {
    var result;

    trueText = trueText || 'Yes';
    falseText = falseText || 'No';

    if (boolean === null || boolean === undefined || boolean === '') {
        result = '-';
    } else {
        result = boolean ? trueText : falseText;
    }

    return result;
});
//百分比格式化
Vue.filter('percentageFormat', function (number, digits) {
    var result;

    if (digits === null || digits === undefined) {
        digits = 2;
    }

    digits = parseInt(digits);

    if (number === null || number === '' || isNaN(number)) {
        result = '-';
    } else {
        result = Math.round(number * Math.pow(10, digits) * 100) / Math.pow(10, digits) + '%';
    };

    return result;
});

// 字节格式化
Vue.filter('byteFormat', function (size) {
    var result;

    switch (true) {
        case (size === null || size === '' || isNaN(size)):
            result = '-';
            break;

        case (size >= 0 && size < 1024):
            result = size + ' B';
            break;

        case (size >= 1024 && size < Math.pow(1024, 2)):
            result = Math.round(size / 1024 * 100) / 100 + ' K';
            break;

        case (size >= Math.pow(1024, 2) && size < Math.pow(1024, 3)):
            result = Math.round(size / Math.pow(1024, 2) * 100) / 100 + ' M';
            break;

        case (size >= Math.pow(1024, 3) && size < Math.pow(1024, 4)):
            result = Math.round(size / Math.pow(1024, 3) * 100) / 100 + ' G';
            break;

        default:
            result = Math.round(size / Math.pow(1024, 4) * 100) / 100 + ' T';
    }

    return result;
});

// 日期(带时间)格式化
Vue.filter('datetimeFormat', function (value, format) {
    if (format == undefined) {
        return $.dateFormat.date(value, "yyyy-MM-dd HH:mm:ss");
    } else {
        return $.dateFormat.date(value, format);
    }
});

// 日期格式化
Vue.filter('dateFormat', function (value) {
    if (value != null && value.indexOf('T') > -1) {
        var date = new Date(+new Date(value) + 8 * 3600 * 1000).toISOString().replace(/T/g, ' ').replace(/\.[\d]{3}Z/, '');
        return $.dateFormat.date(date, "yyyy-MM-dd");
    } else if (value != null && value != '0001-01-01 00:00:00') {
        return $.dateFormat.date(value.replace('/\T/', ' '), "yyyy-MM-dd");
    } else {
        return '';
    }
});

Vue.filter('moneyFormat', function (values) {    
    if ((values+'').indexOf('产值调整') > -1) {
        return values;
    } else {
        if (values > 0 || values < 0) {
            var n = 2;
            values = parseFloat((values + "").replace(/[^\d\.-]/g, "")).toFixed(n) + "";
            var l = values.split(".")[0].split("").reverse(),
                r = values.split(".")[1];
            var t = "";
            for (i = 0; i < l.length; i++) {
                t += l[i] + ((i + 1) % 3 == 0 && (i + 1) != l.length ? "," : "");
            }
            return t.split("").reverse().join("") + "." + r;
        } else {
            return 0;
        }
    }
    
});

Vue.filter('moneyFormat2', function (values) {

    if (values > 0) {
        var n = 2;
        values = Math.round(parseFloat((values + "").replace(/[^\d\.-]/g, "")).toFixed(n)) + "";
        var l = values.split(".")[0].split("").reverse(),
            r = values.split(".")[1];
        var t = "";
        for (i = 0; i < l.length; i++) {
            t += l[i] + ((i + 1) % 3 == 0 && (i + 1) != l.length ? "," : "");
        }
        return t.split("").reverse().join("");
    } else {
        return 0;
    }
});

Vue.filter('moneyToInt', function (values) {
    if (values > 0) {
        var n = 0;
        values = parseFloat((values + "").replace(/[^\d\.-]/g, "")).toFixed(n) + "";
        return values;
    } else {
        return 0;
    }
});

Vue.filter('formatnumber', function (values) {
    if (values > 0) {
        values = values.toFixed(2);
        return values;
    }

});


//金额格式化 万转成亿
Vue.filter('moneyUnit', function (values) {
    if (values > 0) {
        var n = 2;
        var unit = '万';
        if (values > 10000) {
            values = values / 10000;
            unit = '亿'
        }
        values = parseFloat((values + "").replace(/[^\d\.-]/g, "")).toFixed(n) + "";
        var l = values.split(".")[0].split("").reverse(),
            r = values.split(".")[1];
        var t = "";
        for (i = 0; i < l.length; i++) {
            t += l[i] + ((i + 1) % 3 == 0 && (i + 1) != l.length ? "," : "");
        }
        return t.split("").reverse().join("") + "." + r + unit;
    } else {
        return 0;
    }
});


// 客户类型
Vue.filter('customerFormat', function (value) {
    if (value == 2192) {
        return '民营企业';
    } else if (value == 2187) {
        return '国有企业';
    } else if (value == 2188) {
        return '外资企业';
    } else if (value == 2191) {
        return '事业单位';
    } else if (value == 2190) {
        return '政府部门';
    } else if (value == 2795) {
        return '个人业主';
    } else {
        return null;
    }
});

//立项类型
Vue.filter('Section_TypeName', function (value) {
    if (value == 1) {
        return '大标';
    } else if (value == 2) {
        return '样板房';
    } else if (value == 3) {
        return '增补';
    } else {
        return value;
    }
});

//客户类别 
Vue.filter('customerTypeFormat', function (value) {
    if (value == 1) {
        return 'B类';
    } else if (value == 0) {
        return 'A类';
    } else if (value == 2) {
        return 'C类';
    } else if (value == 3) {
        return '已退出';
    } else {
        return '';
    }
});

//营销保证金 类型
Vue.filter('DepositTypeFormat', function (value) {
    if (value == 2168) {
        return '投标保证金';
    } else if (value == 2169) {
        return '图纸押金';
    } else {
        return '其他保证金';
    }
});

Vue.filter('BuildBidTypeFormat', function (value) {
    if (value == 1) {
        return '投标';
    } else if (value == 2) {
        return '议标';
    } else if (value == 3) {
        return '费率';
    } else {
        return '';
    }
});

// bool类型格式化
Vue.filter('boolFormat', function (value) {
    var result;

    if (value === null || value === undefined || value === '') {
        result = '否';
    } else {
        if (value == 0) {
            result = '否';
        } else if (value == 1) {
            result = '是';
        } else {
            result = '否';
        }
    }

    return result;
});



Vue.filter('boolReceipt', function (value) {
    var result;

    if (value === null || value === undefined || value === '') {
        result = '否';
    } else {
        if (value == '已收到') {
            result = '是';
        } else if (value == '未收到') {
            result = '否';
        } else {
            result = '否';
        }
    }

    return result;
});

Vue.filter('bidstatus', function (value) {

    if (value == 1) {
        return '招标文件评审';
    } else if (value == 2) {
        return '方案策划';
    } else if (value == 3) {
        return '2080跟踪';
    } else if (value == 4) {
        return '现场踏勘';
    } else if (value == 5) {
        return '决策定案';
    } else if (value == 6) {
        return '开标评审';
    } else if (value == 7) {
        return '产值统计';
    } else if (value == 8) {
        return '中标发文';
    } else if (value == 9) {
        return '中标交底';
    } else if (value == 10) {
        return '未中标分析';
    } else if (value == 11) {
        return '增补项目';
    } else if (value == 12) {
        return '样板房';
    } else if (value == 13) {
        return '表后总结';
    } else if (value == 14) {
        return '资料归档';
    } else {
        return '';
    }
});




Vue.filter('section_status', function (value) {

    if (value == 0) {
        return '正常';
    } else if (value == 1) {
        return '暂停';
    } else if (value == 2) {
        return '放弃';
    } else if (value == 3) {
        return '正在进行';
    } else if (value == 4) {
        return '待定';
    } else if (value == 5) {
        return '已中标';
    } else if (value == 6) {
        return '未中标';
    } else if (value == 7) {
        return '已完成';
    } else {
        return '';
    }
});


Vue.filter('Bid_Status', function (value) {

    if (value == 0) {
        return '草稿';
    } else if (value == 1) {
        return '审批中';
    } else if (value == 2) {
        return '审批通过';
    } else if (value == 3) {
        return '审批不通过';
    } else if (value == -1) {
        return '待发起';
    } else {
        return '';
    }
});

Vue.filter('Bid_StatusIcon', function (value) {

    if (value == 0) {
        return 'el-icon-upload el-icon--right';
    } else if (value == 1) {
        return 'el-icon-upload el-icon--right';
    } else if (value == 2) {
        return 'el-icon-upload el-icon--right';
    } else if (value == 3) {
        return 'el-icon-upload el-icon--right';
    } else if (value == -1) {
        return 'el-icon-upload el-icon--right';
    } else {
        return '';
    }
});


Vue.filter('Bid_Status2', function (value) {

    if (value == 0) {
        return '待发起';
    } else if (value == 2) {
        return '保存';
    } else {
        return '';
    }
});


Vue.filter('numberFormatRate', function (value) {
    if (value == undefined) {
        return '0.00%';
    }
    if (value.toString() == "NaN") {
        return '0.00%';
    }
    if (value.toString() == "0") {
        return '0.00%';
    } else {
        return value.toFixed(2) + "%";
    }
})


Vue.filter('numberFormat', function (value) {

    if (value == undefined) {
        return '0.00';
    }
    if (value == Infinity) {
        return '0.00';
    }
    if (value.toString() == "NaN") {
        return '0.00';
    }
    if (value.toString() == "0") {
        return '0.00';
    }
    else {
        return value.toFixed(2);
    }
})


Vue.filter('deptnamesub', function (value) {

    if (value) {
        if (value.substr(0, 2) == '投标') {
            return value.substr(2, 2);
        } else {
            return value.substr(0, 2);
        }
    } else {
        return '';
    }
});

Vue.filter('formateDateIos', function (value) {
    if (value != null) {
        return $.dateFormat.date(value, "yyyy-MM-dd")
    }
});


Vue.filter('fileType', function (file) {
    try {
        var array = file.split('.');
        var leg = array.length;
        return array[leg - 1];
    } catch (e) {
        return null;
    }
});