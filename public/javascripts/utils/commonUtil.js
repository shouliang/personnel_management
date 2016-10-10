/**
 * Created by clear9257 on 2016/4/6.
 */
var CommonUtil = (function () {
    /**
     * 整型输入框格式化
     */
    var intFormat = function () {
        $(document).delegate("input[func='int']", "keyup", function (event) {
            event.preventDefault();
            //响应鼠标事件，允许左右方向键移动
            event = window.event || event;//全局变量
            if (event.keyCode == 37 | event.keyCode == 39) {
                return;
            }
            //先把非数字的都替换掉，除了数字和.
            $(this).val($(this).val().replace(/[^\d]/g, "").
                //去掉开始的且后面不是小数点的0
                replace(/^0(\d+)/, '$1'));
        });
    };
    /**
     * 浮点型输入框格式化
     */
    var floatFormat = function () {
        $(document).delegate("input[func='float']", "keyup", function (event) {
            event.preventDefault();
            //响应鼠标事件，允许左右方向键移动
            event = window.event || event;//全局变量
            if (event.keyCode == 37 | event.keyCode == 39) {
                return;
            }
            //先把非数字的都替换掉，除了数字和.
            $(this).val($(this).val().replace(/[^\d.]/g, "").
                //去掉开始的且后面不是小数点的0
                replace(/^0(\d+)/, '$1').
                //只允许一个小数点
                replace(/^\./g, "").replace(/\.{2,}/g, ".").
                //只能输入小数点后两位
                replace(".", "$#$").replace(/\./g, "").replace("$#$", ".").replace(/^(\-)*(\d+)\.(\d\d).*$/, '$1$2.$3'));
        });
        $(document).delegate("input[func='float']", "blur", function (event) {
            event.preventDefault();
            //最后一位是小数点的话，移除
            $(this).val(($(this).val().replace(/\.$/g, "")));
            if (parseInt($(this).val() || 0) > 99999999) {
                return CommonUtil.openTips($(this), "数值过大，不能超过99999999", true);
            }
        });
    };
    /**
     * 焦点提醒信息
     * @param ele
     * @param msg
     */
    var openTips = function (ele, msg, flag) {
        ele.tips({
            side: 3,
            msg: msg,
            bg: "#AE81FF",
            time: 2
        });
        if (flag)ele.focus();
    };
    /**
     * TODO ajax获取数据,提交表单
     * @param options
     * @param callback
     * @returns {*}
     */
    var ajaxSubmit = function (options, callback) {
        if (!options || !options.url) {
            return callback({
                tag: "error",
                status: -99,
                message: "参数错误"
            });
        }
        var reJson = "";
        $.ajax({
            type: options.type || "post",
            timeout: options.timeout || 60000,
            url: options.url,
            dataType: options.dataType || "json",
            data: options.data,
            async: typeof options.async === 'boolean' ? options.async : true,
            success: function (json) {
                reJson = json;
            },
            error: function (XMLHttpRequest) {
                reJson = {
                    status: -99,
                    tag: "error",
                    message: "网络错误"
                }
            },
            complete: function (XMLHttpRequest) {//无论成功失败均会执行此方法
                if (typeof callback === 'function')callback(reJson);
            }
        });
    };
    /**
     * 构造select下拉列表
     * @param ele select对象
     * @param url 数据地址：base:基本分类列表 city:本城市分类列表
     * @param options 选项：isChoseFirstCatalog===false时一级分类不可被选中
     * @param callback 回调
     */

    var setCatalogSelectOptions = function (options, callback) {
        ajaxSubmit({
            url: options.url,
            data: options.data,
            type: options.type
        }, function (result) {
            if (result && result.status == 1) {
                var key = options.key || "key";
                var value = options.value || "value";
                addOptions(options.ele, formatDatas(result.data, key, value, options.name), options.noTop);
            }
        });
    };
    var formatDatas = function (datas, key, value, name) {
        var newDatas = [];
        for (var i in datas) {
            var newData = {};
            newData["key"] = datas[i][key];
            if (name) {
                newData["name"] = datas[i][name];
            }
            newData["value"] = datas[i][value];
            newDatas.push(newData);
        }
        return newDatas;
    };
    var addOptions = function addOptions(item, datas, noTop) {
        if (!noTop) {
            item.html("<option value = ''>" + item.find("option:first").html() + "</option>");
        }
        for (var i in datas) {
            if (datas[i].name) {
                item.append('<option value="' + datas[i].key + '">[' + datas[i].name + ']' + datas[i].value + '</option>');
            } else {
                item.append('<option value="' + datas[i].key + '">' + datas[i].value + '</option>');
            }
        }
    };
    return {
        intFormat: intFormat,
        floatFormat: floatFormat,
        ajaxSubmit: ajaxSubmit,
        openTips: openTips,
        setCatalogSelectOptions: setCatalogSelectOptions
    }
}());
