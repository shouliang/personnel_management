var _ = require("lodash");
var validator = require("validator");
var Logger = require("./logger").Logger("utils-utils");
var path = require("path");
var spawn = require('child_process').spawn;
var config = require("../config/config.json");
var COMPRESS_IMAGE_CONFIG = config.compressImage;

/**
 * 将从DataTable获取的查询参数转换为数据库查询参数，仅支持单表查询
 * @param dtData 从DataTable获取的查询参数
 * @param tableMap 表与DataTable的关系
 * {"DT数据项名称":"数据库表项名称"}
 * @returns 返回值
 * {
 *      orders:排序方式，数组,
 *      queries:查询参数，数组,
 *      offset:偏移量,
 *      limit:数量,
 *      otherQueries:表关系中未显示的列
 *      otherOrders:表关系中未显示的排序列
 *      anotherQueries:在DataTable中使用Name定义的列
 * }
 */
module.exports.dtFormatDatabase = function (dtData, tableMap) {
    var result = {};
    if (!tableMap) {
        tableMap = {};
    }
    if (!dtData) {
        return result.error = "数据错误";
    }
    var orders = [];
    var queries = {};
    var queriesOriginal = {};
    var otherQueries = {};
    var otherOrders = [];
    var dtColumns = dtData.columns;
    var dtOrder = dtData.order;
    var anotherQueries = {};
    if (!_.isArray(dtColumns) || dtColumns.length == 0) {
        return result.error = "数据错误";
    }
    if (_.isArray(dtOrder)) {
        for (var i in dtOrder) {
            var dbColumn = tableMap[dtColumns[dtOrder[i].column].data];
            if (_.includes(["asc", "desc"], dtOrder[i].dir)) {
                if (dbColumn) {
                    orders.push([dbColumn, dtOrder[i].dir])
                } else {
                    otherOrders.push([dtColumns[dtOrder[i].column].data || dtColumns[dtOrder[i].column].name, dtOrder[i].dir]);
                }
            }
        }
    }
    for (i in dtColumns) {
        if (dtColumns[i].data && dtColumns[i].searchable && dtColumns[i].search && dtColumns[i].search.value && _.isString(dtColumns[i].search.value)) {
            if (tableMap[dtColumns[i].data]) {
                queries[tableMap[dtColumns[i].data]] = {like: "%" + dtColumns[i].search.value + "%"};
                queriesOriginal[tableMap[dtColumns[i].data]] = dtColumns[i].search.value;
            } else {
                otherQueries[dtColumns[i].data] = dtColumns[i].search.value
            }
        } else if (dtColumns[i].searchable && dtColumns[i].search && dtColumns[i].search.value && _.isString(dtColumns[i].search.value)) {
            anotherQueries[dtColumns[i].name] = dtColumns[i].search.value; //需要自己拼条件
        }
    }
    if (orders.length > 0) {
        result.orders = orders;
    }
    if (queries) {
        result.queries = queries;
        result.queriesOriginal = queriesOriginal;
    }
    if (otherOrders.length > 0) {
        result.otherOrders = otherOrders;
    }
    result.otherQueries = otherQueries;
    result.anotherQueries = anotherQueries;
    if (validator.isNumeric(dtData.start) && dtData.start > 0) {
        result.offset = validator.toInt(dtData.start);
    }
    if (validator.isNumeric(dtData.length) && dtData.length > 0) {
        result.limit = validator.toInt(dtData.length);
    }
    return result;
};

/**
 * 使用此方法通用返回处理的结果
 * @param res express的res参数
 * @param baseOptions DataTable必须的参数
 * {
 *      draw:收到的draw参数默认返回
 *      recordsTotal: 条目总数
 *      recordsFiltered:过滤后条目总数,
 *      length:返回结果的长度
 *      error:错误显示内容
 * }
 * @param data 返回数据
 * {
 *      data:固定返回的数组数据，
 *      其它参数参数名：参数值
 *      比如：type:"酒水"
 * }
 * @param error
 */
module.exports.dtResponseData = function (res, baseOptions, data, error) {
    if (!res) {
        throw {message: "需要RES"}
    }
    if (!baseOptions) {
        baseOptions = {};
    }
    if (!data) {
        data = {};
    }
    var tag;
    var result;
    result = {
        tag: tag,
        error: error || baseOptions.error || "",
        draw: baseOptions.draw || 0,
        row: baseOptions.row || 0,
        data: data.array || [],
        recordsTotal: baseOptions.recordsTotal || 0,
        recordsFiltered: baseOptions.recordsFiltered || 0,
        length: baseOptions.length || 100
    };
    for (var key in data) {
        if (data.hasOwnProperty(key) && !_.includes(["array", "recordsTotal", "recordsFiltered", "length"], key)) {
            result[key] = data[key];
        }
    }
    res.json(result);
};

/**
 * 压缩图片，调用JAVA压缩图片工具
 * @param filePath 文件路径
 * @param callback
 */
module.exports.compressImage = function (filePath, callback) {
    if (typeof filePath != "string") {
        throw ({message: "类型错误"});
    }
    var compress = spawn(COMPRESS_IMAGE_CONFIG.command, [COMPRESS_IMAGE_CONFIG.file, filePath], {cwd: path.join(__dirname, COMPRESS_IMAGE_CONFIG.path)});
    compress.stderr.on("data", function (data) {
        Logger.info(data);
    });
    compress.stderr.on("error", function (data) {
        Logger.error(data);
    });
    compress.on('close', function (code) {
        if (callback) {
            callback();
        }
    });
};
