/*扩展优化 wms*/
var topwin;//临时变量存储
(function ($) {
    /*类自定义扩展*/
    $.extend({
        dateFormat: (function () {
            function strDay(value) {
                return daysInWeek[parseInt(value, 10)] || value;
            }

            function strMonth(value) {
                var monthArrayIndex = parseInt(value, 10) - 1;
                return shortMonthsInYear[monthArrayIndex] || value;
            }

            function strLongMonth(value) {
                var monthArrayIndex = parseInt(value, 10) - 1;
                return longMonthsInYear[monthArrayIndex] || value;
            }

            var parseMonth = function (value) {
                return shortMonthsToNumber[value] || value;
            };

            var parseTime = function (value) {
                var retValue = value;
                var millis = "";
                if (retValue.indexOf(".") !== -1) {
                    var delimited = retValue.split('.');
                    retValue = delimited[0];
                    millis = delimited[1];
                }

                var values3 = retValue.split(":");

                if (values3.length === 3) {
                    hour = values3[0];
                    minute = values3[1];
                    second = values3[2];

                    return {
                        time: retValue,
                        hour: hour,
                        minute: minute,
                        second: second,
                        millis: millis
                    };
                } else {
                    return {
                        time: "",
                        hour: "",
                        minute: "",
                        second: "",
                        millis: ""
                    };
                }
            };

            return {
                date: function (value, format) {
                    /* 
                    value = new java.util.Date()
                    2009-12-18 10:54:50.546 
                    */
                    try {
                        var date = null;
                        var year = null;
                        var month = null;
                        var dayOfMonth = null;
                        var dayOfWeek = null;
                        var time = null;
                        if (typeof value.getFullYear === "function") {
                            year = value.getFullYear();
                            month = value.getMonth() + 1;
                            dayOfMonth = value.getDate();
                            dayOfWeek = value.getDay();
                            time = parseTime(value.toTimeString());
                        } else if (value.search(/\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.?\d{0,3}[-+]?\d{2}:\d{2}/) != -1) { /* 2009-04-19T16:11:05+02:00 */
                            var values = value.split(/[T\+-]/);
                            year = values[0];
                            month = values[1];
                            dayOfMonth = values[2];
                            time = parseTime(values[3].split(".")[0]);
                            date = new Date(year, month - 1, dayOfMonth);
                            dayOfWeek = date.getDay();
                        } else {
                            value = $.trim(value);
                            var values = value.split(" ");
                            switch (values.length) {
                                case 6:
                                    /* Wed Jan 13 10:43:41 CET 2010 */
                                    year = values[5];
                                    month = parseMonth(values[1]);
                                    dayOfMonth = values[2];
                                    time = parseTime(values[3]);
                                    date = new Date(year, month - 1, dayOfMonth);
                                    dayOfWeek = date.getDay();
                                    break;
                                case 2:
                                    /* 2009-12-18 10:54:50.546 */
                                    var values2 = values[0].split("-");
                                    if (values[0].indexOf('/') != -1)
                                        values2 = values[0].split("/");
                                    year = values2[0];
                                    month = values2[1];
                                    dayOfMonth = values2[2];
                                    time = parseTime(values[1]);
                                    date = new Date(year, month - 1, dayOfMonth);
                                    dayOfWeek = date.getDay();
                                    break;
                                case 7:
                                /* Tue Mar 01 2011 12:01:42 GMT-0800 (PST) */
                                case 9:
                                /*added by Larry, for Fri Apr 08 2011 00:00:00 GMT+0800 (China Standard Time) */
                                case 10:
                                    /* added by Larry, for Fri Apr 08 2011 00:00:00 GMT+0200 (W. Europe Daylight Time) */
                                    year = values[3];
                                    month = parseMonth(values[1]);
                                    dayOfMonth = values[2];
                                    time = parseTime(values[4]);
                                    date = new Date(year, month - 1, dayOfMonth);
                                    dayOfWeek = date.getDay();
                                    break;
                                default:
                                    return value;
                            }
                        }

                        var pattern = "";
                        var retValue = "";
                        /*
                        Issue 1 - variable scope issue in format.date 
                        Thanks jakemonO
                        */
                        for (var i = 0; i < format.length; i++) {
                            var currentPattern = format.charAt(i);
                            pattern += currentPattern;
                            switch (pattern) {
                                case "ddd":
                                    retValue += strDay(dayOfWeek);
                                    pattern = "";
                                    break;
                                case "dd":
                                    if (format.charAt(i + 1) == "d") {
                                        break;
                                    }
                                    if (String(dayOfMonth).length === 1) {
                                        dayOfMonth = '0' + dayOfMonth;
                                    }
                                    retValue += dayOfMonth;
                                    pattern = "";
                                    break;
                                case "MMMM":
                                    retValue += strLongMonth(month);
                                    pattern = "";
                                    break;
                                case "MMM":
                                    if (format.charAt(i + 1) === "M") {
                                        break;
                                    }
                                    retValue += strMonth(month);
                                    pattern = "";
                                    break;
                                case "MM":
                                    if (format.charAt(i + 1) == "M") {
                                        break;
                                    }
                                    if (String(month).length === 1) {
                                        month = '0' + month;
                                    }
                                    retValue += month;
                                    pattern = "";
                                    break;
                                case "yyyy":
                                    retValue += year;
                                    pattern = "";
                                    break;
                                case "yy":
                                    if (format.charAt(i + 1) == "y" &&
                                        format.charAt(i + 2) == "y") {
                                        break;
                                    }
                                    retValue += String(year).slice(-2);
                                    pattern = "";
                                    break;
                                case "HH":
                                    retValue += time.hour;
                                    pattern = "";
                                    break;
                                case "hh":
                                    /* time.hour is "00" as string == is used instead of === */
                                    var hour = (time.hour == 0 ? 12 : time.hour < 13 ? time.hour : time.hour - 12);
                                    hour = String(hour).length == 1 ? '0' + hour : hour;
                                    retValue += hour;
                                    pattern = "";
                                    break;
                                case "h":
                                    if (format.charAt(i + 1) == "h") {
                                        break;
                                    }
                                    var hour = (time.hour == 0 ? 12 : time.hour < 13 ? time.hour : time.hour - 12);
                                    retValue += hour;
                                    pattern = "";
                                    break;
                                case "mm":
                                    retValue += time.minute;
                                    pattern = "";
                                    break;
                                case "ss":
                                    /* ensure only seconds are added to the return string */
                                    retValue += time.second.substring(0, 2);
                                    pattern = "";
                                    break;
                                case "SSS":
                                    retValue += time.millis.substring(0, 3);
                                    pattern = "";
                                    break;
                                case "a":
                                    retValue += time.hour >= 12 ? "PM" : "AM";
                                    pattern = "";
                                    break;
                                case " ":
                                    retValue += currentPattern;
                                    pattern = "";
                                    break;
                                case "/":
                                    retValue += currentPattern;
                                    pattern = "";
                                    break;
                                case ":":
                                    retValue += currentPattern;
                                    pattern = "";
                                    break;
                                default:
                                    if (pattern.length === 2 && pattern.indexOf("y") !== 0 && pattern != "SS") {
                                        retValue += pattern.substring(0, 1);
                                        pattern = pattern.substring(1, 2);
                                    } else if ((pattern.length === 3 && pattern.indexOf("yyy") === -1)) {
                                        pattern = "";
                                    }
                            }
                        }

                        if (retValue === '0001-01-01')
                            retValue = '';

                        return retValue;
                    } catch (e) {
                        //console.log(e);
                        return value;
                    }
                },
                AddDate: function addDate(date, days) {
                    var d = new Date(date);
                    d.setDate(d.getDate() + days);
                    var m = d.getMonth() + 1;
                    return d.getFullYear() + '-' + m + '-' + d.getDate();
                }
            };
        }()),
        getUrlParam: function (name) {
            var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
            var r = window.location.search.substr(1).match(reg);
            if (r != null) return decodeURI(r[2]);
            return null;
        },
        includeJs: function (scripts, callback) {
            var deferred = $.Deferred();
            function loadScript(scripts, callback, i) {
                $.ajax({
                    url: scripts[i],
                    dataType: "script",
                    cache: true,
                    success: function () {
                        if (i + 1 < scripts.length) {
                            loadScript(scripts, callback, i + 1);
                        } else {
                            if (callback) {
                                callback();
                            }
                            deferred.resolve();
                        }
                    },
                    error: function (error) {
                        console.log(error);
                    }
                });
            }
            loadScript(scripts, callback, 0);
            return deferred;
        },
        includeJsAsync: function (arr, path) {
            var _arr = $.map(arr, function (scr) {
                return $.getScript((path || "") + scr);
            });

            _arr.push($.Deferred(function (deferred) {
                $(deferred.resolve);
            }));

            return $.when.apply($, _arr);
        },
        includeCss: function (file) {
            var includePath = $.getTopWindow().baseUrl;
            var files = typeof file == "string" ? [file] : file;
            for (var i = 0; i < files.length; i++) {
                var name = files[i];
                var att = name.split('.');
                var ext = att[att.length - 1].toLowerCase();

                var isCss = ext === "css";
                var tag = "link";
                var attr = " type='text/css' rel='stylesheet' ";
                var link = "href" + "='" + includePath + name + "'";

                if ($(tag + "[" + link + "]").length === 0) {
                    var fileLocation = "<" + tag + attr + link + "></" + tag + ">";
                    if (isCss) {
                        $(fileLocation).appendTo("head");
                    }
                }
            }
        },
        /**
         * 获取最外层的window窗体
         * @returns {} 
         */
        getTopWindow: function () {
            if (topwin == undefined) {
                if (window == parent) {
                    return window;
                }
                var win = window;
                while (win.isSubSystem != true) {
                    win = win.parent;
                }
                topwin = win;
            }
            return topwin;
        },
        /**
         * 数组分页
         * @param {} pageIndex  当前页
         * @param {} pageSize   每页大小
         * @param {} array      要分页的数组
         * @returns {}          分页后的数组
         * @author              wms
         * @desc                对数组进行分页拆分
         * @time                2017-5-5 09:44:14
         */
        pagination: function (pageIndex, pageSize, array) {
            var offset = (pageIndex - 1) * pageSize;
            return (offset + pageSize >= array.length) ?
                array.slice(offset, array.length) : array.slice(offset, offset + pageSize);
        },
        /**
         * 金额类型转换
         * @param {} values 要转换的值
         * @param {} n      精确到多少分位
         * @returns {}      返回金额
         * @author          wms
         * @desc            金额类型转换
         * @time            2017-5-5 10:04:03
         */
        currencyFormat: function (values, n) {
            if (values === '' || values == undefined) {
                return null;
            }
            if (n == undefined) {
                n = 2;
            }
            var isPos = true;
            if (parseFloat(values) < 0) {
                values = Math.abs(values);
                isPos = false;
            }
            values = parseFloat((values + "").replace(/[^\d\.-]/g, "")).toFixed(n) + "";
            var l = values.split(".")[0].split("").reverse(),
                r = values.split(".")[1];
            var t = "";
            for (i = 0; i < l.length; i++) {
                t += l[i] + ((i + 1) % 3 == 0 && (i + 1) != l.length ? "," : "");
            }
            var res = t.split("").reverse().join("") + "." + r;
            if (isPos) {
                return res;
            } else {
                return "-" + res;
            }
        },
        /**
         * 浮点型转换
         * @param {} value 
         * @param {} n 
         * @returns {} 
         */
        floatFormat: function (value, n) {
            if (value == null) {
                return null;
            }
            if (n == undefined) {
                n = 2;
            }
            value = parseFloat(value);
            value = value.toFixed(n);
            return parseFloat(value);
        },
        /**
         * 用于焦点获取 ==》特殊
         * @param {} e 
         * @returns {} 
         */
        tagFocus: function (e) {
            var that = $(e.target);
            that.hide();
            var id = that.attr('id');
            $('input[name=' + id + ']').show();
            $('input[name=' + id + ']').focus();
        },
        /**
         * 数字取绝对值
         * @returns {} 
         */
        abs: function (val) {
            return Math.abs(val);
        },
        /**
         * 计算两个日期相隔天数
         * @param {} d1 开始
         * @param {} d2 结束
         * @returns {} 天数
         */
        dateDiff: function (d1, d2) {
            var day = 24 * 60 * 60 * 1000;
            try {
                var dateArr = d1.split("-");
                var checkDate = new Date();
                checkDate.setFullYear(dateArr[0], dateArr[1] - 1, dateArr[2]);
                var checkTime = checkDate.getTime();

                var dateArr2 = d2.split("-");
                var checkDate2 = new Date();
                checkDate2.setFullYear(dateArr2[0], dateArr2[1] - 1, dateArr2[2]);
                var checkTime2 = checkDate2.getTime();

                var cha = (checkTime - checkTime2) / day;
                return cha;
            } catch (e) {
                return false;
            }
        }
    });
    /*对象自定义扩展*/
    $.fn.extend({
        "setReadOnly": function () {           
             this.find(':text,select').each(function (i, item) {
                 
                 var domRead = $("<label style='font-size: 14px;'></label>"), val;
                 if ($(item).is('select')) {
                     val = $(item).find("option:selected").text();
                 } else {
                     val = $(item).val();
                 }
                 domRead.html(val);
                 $(item).parent('td').empty().append(domRead);
             });
        },
        "setinframeH": function (options) {
            var that = this;
            options = options || {};
            //var url = that[0].contentWindow.location.href.split("/");
            //url = url[url.length - 1];  
            var _send = setInterval(function () {
                that.setIframeHeight(that[0],options);
                if (options.method) {
                    window.clearInterval(_send);
                }
            }, 200);
        },
        "setIframeHeight": function (iframe, options) {
            options = options || {};
            if (iframe) {
                var iframeWin = iframe.contentWindow;
                if (iframeWin != null && iframeWin.document.body) {
                    var scollheight=iframeWin.document.body.scrollHeight;
                    var appheight=$(iframeWin.document.body).find('#v-app').height() + 70;
                    if ($(iframeWin.document.body).find('#v-app').length>0) {
                        $(iframe).css("height", appheight);
                    } else {
                        $(iframe).css("height", scollheight);
                    }                 
                    //if (options.type == 'modal') {
                    //    $(iframe).css("height", $(iframeWin.document.body).find('#v-app').height() + 70);
                    //} else {
                    //    $(iframe).css("height", iframeWin.document.body.scrollHeight);
                    //}
                }
            }
        },
        /**
         * 让文本框只允许输入小数
         * @returns {} 
         */
        "forceDecimal": function () {
            return this.each(function () {
                $(this).keydown(function (e) {
                    var key = e.which || e.keyCode;
                    var arrVal = $(this).val().split(".");
                    if (!e.shiftKey && !e.altKey && !e.ctrlKey &&
                        // numbers   
                        key >= 48 && key <= 57 ||
                        // Numeric keypad
                        key >= 96 && key <= 105 ||
                        // comma, period and minus, . on keypad
                        key == 188 || key == 109 ||
                        // Backspace and Tab and Enter
                        key == 8 || key == 9 || key == 13 ||
                        // Home and End
                        key == 35 || key == 36 ||
                        // left and right arrows
                        key == 37 || key == 39 ||
                        // Del and Ins
                        key == 46 || key == 45 || ((key == 190 || key == 110) && arrVal.length <= 1)) {
                        return true;
                    }
                    return false;
                }).focus(function () {
                    this.style.imeMode = 'disabled';
                });
            });
        },
        /**
         * 让文本框只允许输入数字
         * @returns {} 
         */
        "forceNumeric": function () {
            return this.each(function () {
                $(this).keydown(function (e) {
                    var key = e.which || e.keyCode;
                    var arrVal = $(this).val().split(".");
                    if (!e.shiftKey && !e.altKey && !e.ctrlKey &&
                        // numbers   
                        key >= 48 && key <= 57 ||
                        // Numeric keypad
                        key >= 96 && key <= 105 ||
                        // comma, period and minus, . on keypad
                        key == 188 || key == 109 ||
                        // Backspace and Tab and Enter
                        key == 8 || key == 9 || key == 13 ||
                        // Home and End
                        key == 35 || key == 36 ||
                        // left and right arrows
                        key == 37 || key == 39 ||
                        // Del and Ins
                        key == 46 || key == 45 || ((key == 190 || key == 110) && arrVal.length <= 1)) {
                        return true;
                    }
                    return false;
                }).focus(function () {
                    this.style.imeMode = 'disabled';
                });
            });
        },
        /**
         * 文本框不允许输入字符
         * @returns {} 
         */
        "forceReadOnly": function () {
            return this.each(function () {
                $(this).keydown(function (e) {
                    var key = e.which || e.keyCode;
                    if (key == 8 || key == 46) {
                        $(this).val("");
                    }
                    else
                        return false;

                });
            });
        },
        "forceDocumentDisabled": function () {
            $("span[class='red']").css("display", "none");
            $("span[class='input-group-addon']").css("display", "none");
            $("input[type='checkbox']").attr("disabled", "disabled");
            $("input[type='text']").each(function () {
                if ($(this).attr('v-model') != undefined) {
                    $(this).replaceWith("<p class='form-control-static'>{{" + $(this).attr('v-model') + "}}</p>");
                } else {
                    var textValue = $(this).val();
                    $(this).replaceWith("<p class='form-control-static' style='display:inline'>" + textValue + "</p>");
                }
            });
            $("input[type='file']").each(function () {
                $(this).remove();
            });
            $("textarea").each(function () {
                var textValue = $(this).val();
                $(this).replaceWith(
                    "<p class='form-control-static'>" + replaceAll(replaceAll(textValue, "\r\n", "<br/>"), "\n", "<br/>") + "</p>");
                //$(this).replaceWith(
                //    "<p class='form-control-static'>" + textValue.replaceAll("\r\n", "<br/>").replaceAll("\n", "<br/>") + "</p>");
            });
            $("select").each(function () {
                var selectValue = $(this).find("option:selected").text();
                if (selectValue == "-- 请选择 --")
                    selectValue = "";
                $(this).replaceWith("<p class='form-control-static'>" + selectValue + "</p>");
            });
            $("input[type='password']").each(function () {
                $(this).parent().html("<p class='form-control-static'>**********</p>");
            });
        },
        "replaceAll": function (reallyDo, replaceWith, ignoreCase) {
            if (!RegExp.prototype.isPrototypeOf(reallyDo)) {
                return this.replace(new RegExp(reallyDo, (ignoreCase ? "gi" : "g")), replaceWith);
            } else {
                return this.replace(reallyDo, replaceWith);
            }
        },
        //按钮禁止提交
        "btndisable": function () {
            $(this).html('<i class="fa fa-spinner fa-spin"></i><span class="ml5">提交中...</span>').attr('disabled', true);
        },
        //按钮取消禁止
        "btnavailable": function () {
            $(this).html('<i class="fa fa-save"></i><span class="ml5">保存</span>').attr('disabled', false);
        }
    });
})(jQuery);

//temp fun
function replaceAll(value, reallyDo, replaceWith, ignoreCase) {
    if (!RegExp.prototype.isPrototypeOf(reallyDo)) {
        return value.replace(new RegExp(reallyDo, (ignoreCase ? "gi" : "g")), replaceWith);
    } else {
        return value.replace(reallyDo, replaceWith);
    }
}

//very important!!!
//chenjd add(2017-5-23 16:24:04)：通过工作流待办过来的初始化处理。
//待办会传两个个参数 ：
//accessToken :当前用户过滤权限用
//fromOtherSystem:是否是从其他系统进入，默认true
/****************************************************************/

var access_token = $.getUrlParam("accessToken");
var fromOtherSystem = $.getUrlParam("fromOtherSystem");


if (access_token != undefined && fromOtherSystem == "true") {

    localStorage.setItem("accessToken", access_token);
    window.isSubSystem = true;
    window.baseUrl = "http://" + window.location.host;

    window.currentUser = $.getJSON(window.baseUrl + "/api/HomeApi/GetUserByToken?accessToken=" + access_token,
        function (result) {
            window.currentUser = result;
        });

    //initialize workflow flow picture
    $("body").append('<a class="fancyboxDigram" title="流程图"></a>');

    $.includeCss(["/Scripts/lib/fancybox/source/jquery.fancybox.css", "/Scripts/lib/fancybox/source/helpers/jquery.fancybox-buttons.css"]);
    $.includeJs(["/Scripts/lib/fancybox/source/jquery.fancybox.js", "/Scripts/lib/fancybox/source/helpers/jquery.fancybox-buttons.js?v=1.0.5"],
        function () {
            $(".fancyboxDigram").fancybox({
                loop: false,
                openEffect: 'elastic',
                openSpeed: 150,
                closeEffect: 'elastic',
                closeSpeed: 150,
                closeClick: true,
                helpers: {
                    title: {
                        type: 'inside'
                    },
                    buttons: {}
                }
            });
        });
}

/****************************************************************/

//设置input readOnly tile属性
extensionGM = {};
extensionGM.setInputTags = function () {
    //处理read disable text 标签
    $(":input[readonly=true]").addClass("gmread");
    $(":input[disabled=true]").addClass("gmread");
    $(":input[readonly='readonly']").addClass("gmread");
    $(":input[disabled='disabled']").addClass("gmread");
    $(".form-control.gmread").attr("readonly", "readonly").css("background-color", " #eeeeee");
    $(":input.gmread").css("background-color", " #eeeeee");
}

extensionGM.setInputTips = function () {
    var readInputTags = $(".form-control.gmread ");
    for (var i = 0; i < readInputTags.length; i++) {
        var inputVal = $(readInputTags[i]).val();
        $(readInputTags[i]).attr("title", inputVal);
    }
}