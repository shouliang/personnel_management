/**
 * 通用js方法，用于页面快速调用的常用方法
 * Introduction:方法按照A-Z顺序排列，get和set方法分离
 * @version 1.1.0 Created by zrz on 2014年11月27日22:31:09 新建
 * @version 1.2.1 Updated by zrz on 2014年12月30日09:50:10 更新时间格式化函数、新增获取元素位置信息函数、新增延时函数
 */

//——————————【ajax】方法集合—————————————————

/**
 * ajax标准方法
 * @param method
 * @param url
 * @param data
 * @param loadingEleId
 * @param callback
 */
function ajax_load(method, url, data, loadingEleId, callback) {
    if(typeof loadingEleId=="function"){
        callback=loadingEleId;
        loadingEleId=null;
    }
    var loadingEle = $("#" + loadingEleId);
    if (loadingEleId && loadingEleId.length > 0) {
        onloading(loadingEle);
    }
    var reJson = "";
    $.ajax({
        type: method,
        timeout: 10000,
        url: url,
        dataType: "json",
        data: data,
        success: function (json) {
            var tag = json.tag;
            if (tag) {
                reJson = json;
            } else {
                reJson = "";
            }
        },
        error: function (XMLHttpRequest) {
//            alert("获取数据失败，原因：" + XMLHttpRequest.status);
        },
        complete: function (XMLHttpRequest, status) {
            if (loadingEleId && loadingEleId.length > 0) {
                loaded(loadingEle);
            }
            callback(status, reJson);
        }
    });
}

function onloading(loadingEle) {
    if (loadingEle) {
        loadingEle.fadeIn();
    }
}

function loaded(loadingEle) {
    loadingEle.fadeOut();
}

/**
 * 以ajax方式提交form
 * @param ele
 * @param url
 * @param dataPara
 * @param callback
 */
function ajax_form(ele, url, dataPara, callback) {
    var method;
    var reJson = "";
    if (!url) {
        url = ele.attr("action");
    }
    if (!dataPara) {
        //获取form数据
        ajax_form2Json(ele, function (json) {
            dataPara = json;
        });
    }
    if (ele.attr("method") && ele.attr("method").length > 0) {
        method = ele.attr("method");
    } else {
        method = "post";
    }
    //提交form数据
    $.ajax({
        url: url,
        type: method,
        data: dataPara,
        success: function (json) {
            var tag = json.tag;
            if (tag) {
                reJson = json;
            } else {
                reJson = "";
            }
        },
        error: function (XMLHttpRequest) {
            alert("获取数据失败，原因：" + XMLHttpRequest.status);//TODO 需要重写
        },
        complete: function (XMLHttpRequest, status) {
            callback(status, reJson, dataPara);
        }
    });
}

/**
 * 将from数据序列化为json
 * @param ele
 * @param callback
 */
function ajax_form2Json(ele, callback) {
    var json = {};
    var form = ele.serializeArray();
    $.each(form, function () {
        if (json[this.name] != undefined) {
            if (!json[this.name].push) {
                json[this.name] = [json[this.name]];
            }
            json[this.name].push(this.value || '');
        } else {
            json[this.name] = this.value || '';
        }
    });
    if (callback) {
        callback(json);
    }
    return json;
}




//——————————【get】方法集合——————————————————

/**
 * 获取网页可见区域的高和宽
 * @returns {{width: number, height: number}}
 */
function getBodyWH() {
    return {
        width: document.body.clientWidth        //网页可见区域宽
        , height: document.body.clientHeight    //网页可见区域高
    };
}

/**
 * 获取元素的设置信息（height、width等）
 * @param ele
 */
function getEleLocation(ele) {
    var location = {};
    location['positionTop'] = ele.position().top || 0;//获取网页元素基于父元素的相对位置
    location['positionLeft'] = ele.position().left || 0;//获取网页元素基于父元素的相对位置
    location['offsetTop'] = ele.offset().top || 0;//获取网页元素绝对位置
    location['offsetLeft'] = ele.offset().left || 0;//获取网页元素绝对位置
    location['width'] = ele.outerWidth() || 0;
    location['height'] = ele.outerHeight() || 0;
    return location;
}

/**
 * 验证url是否可访问
 * @param url
 * @returns {boolean}
 */
function getURL(url) {
    var xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    xmlhttp.open("GET", url, false);
    xmlhttp.send();
    if (xmlhttp.readyState == 4) {
        if (xmlhttp.Status != 200)
            return xmlhttp.Status == 200;
    }
    return false;
}

function getFormatDataTime(format) {
    var date = new Date();
    var yyyy = date.getFullYear(); //截取年，
    var MM = date.getMonth() + 1; //截取月，
    var dd = date.getDate(); //截取日，
    var Hour = date.getHours();
    var Minute = date.getMinutes();
    if (Minute < 10) {
        Minute = "0" + Minute;
    }
    if (Second < 10) {
        Second = "0" + Second;
    }
    var Second = date.getSeconds();
    if (format.toLocaleLowerCase() == "yyyy-MM-dd".toLocaleLowerCase()) {
        return date = yyyy + "-" + MM + "-" + dd;
    } else if (format.toLocaleLowerCase() == "yyyy-MM-dd HH:MM:SS".toLocaleLowerCase()) {
        return date = yyyy + "-" + MM + "-" + dd + " " + Hour + ":" + Minute + ":" + Second;
    }
}

//js获取当前时间并格式化
function getFormatDate() {
    var day = new Date();
    var Year = 0;
    var Month = 0;
    var Day = 0;
    var Hour = 0;
    var Minute = 0;
    var Second = 0;
    var CurrentDate = "";
    //初始化时间
    Year = day.getFullYear();
    Month = day.getMonth() + 1;
    Day = day.getDate();
    Hour = day.getHours();
    Minute = day.getMinutes();
    Second = day.getSeconds();
    CurrentDate = Year + "-";
    if (Month >= 10) {
        CurrentDate = CurrentDate + Month + "-";
    }
    else {
        CurrentDate = CurrentDate + "0" + Month + "-";
    }
    if (Day >= 10) {
        CurrentDate = CurrentDate + Day;
    }
    else {
        CurrentDate = CurrentDate + "0" + Day;
    }

    if (Hour >= 10) {
        CurrentDate = CurrentDate + " " + Hour;
    }
    else {
        CurrentDate = "0" + Hour;
    }
    if (Minute >= 10) {
        CurrentDate = CurrentDate + ":" + Minute;
    }
    else {
        CurrentDate = CurrentDate + ":0" + Minute;
    }
    if (Second >= 10) {
        CurrentDate = CurrentDate + ":" + Second;
    }
    else {
        CurrentDate = CurrentDate + ":0" + Second;
    }
    return CurrentDate;
}

/**
 * 从url中获取name对应的参数值
 * @param name
 * @returns {*}
 */
function getUrlParamValue(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return decodeURI(r[2]);
    return null;
}

/**
 * 参数值val是否为空，若空，alert(str)
 * @param val
 * @param str
 */
function checkValueIsNull(val, str) {
    if (val && val.length > 0) {
        return true;
    } else {
        alert(str);
        return false;
    }
}

/**
 * 参数值val是否等于str，若不等于，alert(str)
 * @param val0
 * @param val1
 */
function valueEqualVal(val0, val1) {
    return !(val0 && val1 && val0 == val1);
}




//——————————【set】方法集合——————————————————

/**
 * 设置某个值，若该值存在且不为空，则赋值，否则取消赋值
 * @param ele
 * @param val
 */
function setEleValue(ele, val) {
    if (val && val.length > 0) {
        ele = val;
    } else {
        return false;
    }
}

/**
 * 拼装页面时设置值
 * @param val
 * @param defaultVal
 */
function setValue(val, defaultVal) {
    if (val) {
        return val;
    } else if (val == 0) {
        return val;
    } else if (defaultVal || defaultVal == 0) {
        return defaultVal;
    } else {
        return "无";
    }
}

/**
 * 设置基于父元素相对定位的x/y居中
 * @param parent
 * @param ele
 * @returns {boolean}
 */
function setEleCenter(parent, ele) {
    //只有当子元素的高宽小于父元素，居中才有意义
    if (ele.height() < parent.height() && ele.height() < parent.height()) {
        var top = parent.position().top + (parent.height() - ele.height()) / 2;
        var left = parent.position().left + (parent.width() - ele.width()) / 2;
        ele.css(
            {
                "position": "relative", "top": top, "left": left
            }
        );
        return true;
    } else {
        return false;
    }
}

/**
 * 延时函数，等待ms毫秒
 * @param ms
 */
function sleep(ms) {
    setTimeout("", ms);
}




//——————————格式化函数——————————————————

//重写日期时间format构造函数
Date.prototype.format = function (format) {
    var o = {
        "M+": this.getMonth() + 1, //month
        "d+": this.getDate(), //day
        "h+": this.getHours(), //hour
        "m+": this.getMinutes(), //minute
        "s+": this.getSeconds(), //second
        "q+": Math.floor((this.getMonth() + 3) / 3), //quarter
        "S": this.getMilliseconds() //millisecond
    };
    if (/(y+)/.test(format)) {
        format = format.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    }
    for (var k in o) {
        if (new RegExp("(" + k + ")").test(format)) {
            format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));
        }
    }
    return format;
};

/**
 * 格式化一个浮点数
 * @param float     浮点数本身
 * @param max       浮点数最多小数位数
 * @param toFixed   浮点数格式化后最多小数位数
 * @returns {*}
 */
function floatToFixed(float, max, toFixed) {
    if (!(toFixed && toFixed > 0)) {
        toFixed = 2;
    }
    if (max && max > 0) {
        toFixed = max;
    } else {
        max = 2;
    }
    //判断是否有小数点，即是否为浮点数
    if (float.toString().split(".").length > 1) {
        //判断小数点后位数
        if (float.toString().split(".")[1] >= Math.pow(10, max)) {
            return parseFloat(float).toFixed(toFixed);
        } else {
            return float;
        }
    } else {
        return float;
    }
}




//——————————有关【json】的常用方法集合——————————————————
{
//格式化Json为String
    function j2s(json) {
        if (isJson(json)) {
            return JSON.stringify(json);
        } else {
            return json;
        }
    }

//格式化String为Json
    function s2j(str) {
        if (isStr(str)) {
            return eval("(" + str + ")");
        } else {
            return str;
        }
    }

//检查数据类型是否为object/json
    function isJson(value) {
        return typeof value == "object";
    }

//检查数据类型是否为string
    function isStr(value) {
        return typeof value == "string";
    }

//返回json
    function reJson(value) {
        if (!isJson(value)) {
            return s2j(value);
        }
        return value;
    }

//返回string
    function reString(value) {
        if (!isStr(value)) {
            return j2s(value);
        }
        return value;
    }

//计算json的object
    function getSize(json) {
        var size = 0;
        json = reJson(json);
        if (json && json != null) {
            for (var key in json) {
                size++;
            }
        }
        return size;
    }
}

//获取元素checked值
function getEleCheckedValue(ele) {
    return ele.is(":checked");
}

//从数列中获取key
function getKeyFormStoresOrder(storesOrder) {
    var re = "";
    for (var key in storesOrder) {
        re = key;
    }
    return key;
}

/**
 * 拼装时间显示
 * @param time
 * @param str
 * @returns {string}
 */
function assemblyTime(time, str) {
    if (timeIsNull(time)) {
        return str + "<i style='margin-right: 20px;'></i>" + time + "<br>";
    } else {
        return "";
    }
}

function timeIsNull(time) {
    return !!(time && time.length > 0);
}

function valueIsNull(value) {
    if (value && value.length > 0) {
        return value;
    } else {
        return "暂无";
    }
}




//——————————【模态框】————————————————————
/**
 * 设置弹出信息提示框
 * @param info 提示信息
 * @param timeOut 延迟日期
 * @param options 设置参数
 *        isNeedConfirm:true 显示确定取消按钮，当确定时回调函数中参数为true
 * @param callback 回调函数，当模态框关闭后调用此函数。当options.isNeedConfirm=true时，点击确定按钮将callback(true);否则将回调callback(false)
 */
var setAlertModalT = -1;
function setAlertModal(info, timeOut, options, callback) {
//    $("#alert-modal-cancel").click();//FIXME 处，加入此句后，同一页面不刷新，第二次弹窗会自动关闭
    var confirm = false;
    if (typeof options == "function" && !callback) {
        callback = options;
    }
    if (typeof timeOut == "function" && !callback) {
        callback = timeOut;
        timeOut = null;
    }
    if (typeof timeOut == "object" && !options) {
        options = timeOut;
        timeOut = null;
    }
    if (!options) {
        options = {};
    }
    $("#alert-modal-info").html(info);
    if (options.isNeedConfirm) {
        $("#alert-modal .chose-buttons").show();
    }
    $("#alert-modal").modal("show");
    $("#alert-modal .chose-buttons [func=btn-confrim]").off("click");
    $("#alert-modal .chose-buttons [func=btn-confrim]").one("click", function () {
        confirm = true;
        $("#alert-modal").modal("hide");
    })
    $("#alert-modal .chose-buttons [func=btn-cancel]").off("click");
    $("#alert-modal .chose-buttons [func=btn-cancel]").one("click", function () {
        $("#alert-modal").modal("hide");
    })
    $("#alert-modal").one("hidden.bs.modal", function () {
        $("#alert-modal .chose-buttons").hide();
        $("#alert-modal #alert-modal-time").hide();
        if (typeof callback == "function") {
            callback(confirm);
        }
    });
    if (timeOut) {
        $("#alert-modal-time").show().find("label").text(timeOut);
        if (setAlertModalT > 0) {
            clearTimeout(setAlertModalT);
        }
        function countDown() {
            var second = $("#alert-modal-time").find("label");
            setAlertModalT = setTimeout(function () {
                if (second.text() > 1) {
                    second.text(second.text() - 1);
                    countDown();
                } else {
                    $("#alert-modal-time").hide();
                    $("#alert-modal").modal("hide");
                }
            }, 1000);
        }

        countDown();
    }
    $("#alert-modal").modal("show");
    return !info;
}