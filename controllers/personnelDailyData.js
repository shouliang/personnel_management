/**
 * Created by shouliang on 2016/6/7.
 */

var personnelDailyDataService = require('../services/personnelDailyData');
var personnelBasicInfoService = require('../services/personnelBasicInfo');
var ReportStoreGoodsOrderAllDailyService = require('../services/reportStoreGoodsOrderAllDailies');
var Utils = require('../utils/utils');
var Logger = require('../utils/logger').Logger('personnelDailyDataController');
var _ = require('lodash');
var sequelize = require('sequelize');
var moment = require('moment');
var async = require('async');

exports.view = function (req, res) {
    res.render('./personnelDailyData/view',
        {
            title: "每日数据管理"
        }
    );
};

exports.list = function (req, res) {

    // 格式化数据
    var dtParams = Utils.dtFormatDatabase(req.body, {
        id: 'id',
        occurDay: 'occurDay'
    });


    var beginDateSql = '';
    var endDateSql = '';
    if (req.body.beginOccurDay) {
        beginDateSql += "date_format(occurDay,'%Y-%m-%d') >= '" + moment(req.body.beginOccurDay).format('YYYY-MM-DD') + "'"
    }

    if (req.body.endOccurDay) {
        endDateSql += "date_format(occurDay,'%Y-%m-%d') <= '" + moment(req.body.endOccurDay).format('YYYY-MM-DD') + "'"
    }

    var options = {
        where: sequelize.and(
            {state: 1},
            sequelize.literal(beginDateSql),
            sequelize.literal(endDateSql)
        ),

        order: dtParams.orders,          // 排序
        limit: dtParams.limit || 100,    // 分页大小
        offset: dtParams.offset || 0,    // 起始数据
        raw: true
    };
    // 过滤当前登录人员的数据
    if (req.session.agencyId) {
        options.where.AgencyId = req.session.agencyId;
    }

    personnelDailyDataService.list(options, function (err, result) {
        if (err) {
            Logger.error(JSON.stringify({message: "获取每日数据列表失败", error: err}));
            return Utils.dtResponseData(res, {
                draw: req.body.draw,
                recordsTotal: 0,
                recordsFiltered: 0,
                length: 0
            }, {
                data: []
            })
        }

        // 成功返回
        Utils.dtResponseData(res, {
            draw: req.body.draw,
            recordsTotal: result.count,
            recordsFiltered: result.count,
            length: req.body.length
        }, {
            data: result.rows
        })
    })
};

exports.addOrUpdate = function (req, res) {
    var id = req.body.id;                          // 主键Id

    async.auto({

        // 获得调整数据 某月的调整数据 只能有一条
        getOnlyOfMonth: function (callback) {
            var expectSelf = "";
            if (id) {
                expectSelf = "id!='" + id + "'";
            }
            var occurMonth = moment().format('YYYY-MM');
            if (req.body.occurDay) {
                occurMonth = moment(req.body.occurDay).format('YYYY-MM');
            }
            var countOptions = {
                where: sequelize.and(
                    {state: 1},
                    {dataType: 20},
                    {AgencyId: req.session.agencyId},
                    sequelize.literal("date_format(occurDay,'%Y-%m') = '" + occurMonth + "'"),
                    sequelize.literal(expectSelf)
                ),
                raw: true
            };

            personnelDailyDataService.count(countOptions, function (err, count) {
                if (err) {
                    Logger.error(JSON.stringify({message: "查询基础信息条数失败", error: err}));
                    callback(err, {tag: "error", message: "查询基础信息条数失败"});
                }
                callback(null, count);
            });

        },

        // 每天只能新增一天记录
        getOnlyOfDay: function (callback) {
            var expectSelf = "";
            if (id) {
                expectSelf = "id!='" + id + "'";
            }

            var onlyOneOptions = {
                where: sequelize.and(
                    {state: 1},
                    {AgencyId: req.session.agencyId},
                    sequelize.literal("date_format(occurDay,'%Y-%m-%d') = '" + req.body.occurDay + "'"),
                    sequelize.literal(expectSelf)
                ),
                raw: true
            };

            personnelDailyDataService.count(onlyOneOptions, function (err, count) {
                if (err) {
                    Logger.error(JSON.stringify({message: "查询每日数据条数失败", error: err}));
                    callback(err, {tag: "error", message: "查询每日数据条数失败"});
                }
                callback(null, count);
            });
        },

        // 查询当前操作者组织机构中的在职人数和编制人数 和仓库面积
        getPersonNum: function (callback) {
            var options = {
                where: {
                    state: 1,
                    AgencyId: req.session.agencyId
                },
                raw: true
            };

            personnelBasicInfoService.find(options, function (err, result) {
                if (err) {
                    Logger.error(JSON.stringify({message: "获取登录人基础信息失败", error: err}));

                    callback(err, {tag: "error", message: "新增基础信息失败"});
                }
                callback(null, result);
            });
        },

        // 查询今日的配单量和配件数
        getOrder: function (callback) {
            var options = {
                where: sequelize.and(
                    {cityId: req.session.cityId},
                    sequelize.literal("date_format(`day`,'%Y-%m-%d') = '" + moment(req.body.occurDay).format('YYYY-MM-DD') + "'")
                ),
                raw: true
            };

            ReportStoreGoodsOrderAllDailyService.find(options, function (err, result) {
                if (err) {
                    Logger.error(JSON.stringify({message: "获取登录人基础信息失败", error: err}));

                    callback(err, {tag: "error", message: "新增基础信息失败"});
                }
                callback(null, result);
            });
        },

        add: ["getOnlyOfMonth", "getOnlyOfDay", "getPersonNum", "getOrder", function (callback, results) {
            var dataType = req.body.dataType;

            if (dataType == '20' && results.getOnlyOfMonth) {
                return res.json({
                    tag: "error",
                    message: "每月只能新增一条调整信息"
                })
            }

            if (dataType == '10' && results.getOnlyOfDay) {
                return res.json({
                    tag: "error",
                    message: "每天只能新增一条信息"
                })
            }

            // 新增日常信息
            var occurDay = req.body.occurDay || moment();
            var warehouseSalary = req.body.warehouseSalary || 1;
            var distributionSalary = req.body.distributionSalary || 1;
            var logisticsSalary = req.body.logisticsSalary || 1;
            var entryNum = req.body.entryNum || 1;
            var dismissionNum = req.body.dismissionNum;
            var attendenceNum = req.body.attendenceNum || 1;
            var warehouseAttendenceNum = req.body.warehouseAttendenceNum || 1;
            var distributionAttendenceNum = req.body.distributionAttendenceNum || 1;
            var trainHours = req.body.trainHours || 0;
            var trainCost = req.body.trainCost || 0;
            var dailyDistributionNum = req.body.dailyDistributionNum || 1;

            var remark = req.body.remark;                  // 备注
            var state = 1;                                 // 默认值1表示有效

            var createdCode = req.session.staffCode;      // 创建人编号
            var createdName = req.session.staffName;      // 创建人
            var AgencyId = req.session.agencyId;          // 组织机构Id
            var agencyCode = req.session.agencyCode;
            var agencyName = req.session.agencyName;

            // 计算公式获得的值    调整列通过计算获得的值均设置为0 但是当日人事费用为填写值的相加之和，不可设置为0
            if (dataType == '20') {
                var sale = 0;
                var dailyOrderNum = 0;
                var dailyPieceNum = 0;

                var personnelCost = new Number(new Number(warehouseSalary) + new Number(distributionSalary) + new Number(logisticsSalary)).toFixed(2);
                var personnelCostProportion = 0;
                var perCapitaProductivity =  0;
                var oneBillDistributionCost =  0;
                var onePieceDistributionCost =  0;
                var oneDistributionCost = 0;
                var warehousePerCapitaProductivity =  0;
                var distributionPerCapitalProductivity =  0;
                var logisticsPersonnelCostProportion =  0;
                var warehousePersonnelCostProportion =  0;
                var distributionPersonnelCostProportion =  0;
            }
            else {
                var sale = 0;
                var dailyOrderNum = 1;
                var dailyPieceNum = 1;
                if (results && results.getOrder) {
                    sale = results.getOrder.sumWithOff;
                    dailyOrderNum = results.getOrder.orderCount;
                    dailyPieceNum = results.getOrder.goodsDetailAmount;
                }

                var personnelCost = new Number(new Number(warehouseSalary) + new Number(distributionSalary) + new Number(logisticsSalary)).toFixed(2);
                var personnelCostProportion = new Number(sale / personnelCost).toFixed(2);
                var perCapitaProductivity = new Number(sale / attendenceNum).toFixed(2);
                var oneBillDistributionCost = new Number(warehouseSalary / dailyOrderNum).toFixed(2);
                var onePieceDistributionCost = new Number(warehouseSalary / dailyPieceNum).toFixed(2);
                var oneDistributionCost = new Number(distributionSalary / dailyDistributionNum).toFixed(2);
                var warehousePerCapitaProductivity = new Number(warehouseSalary / warehouseAttendenceNum).toFixed(2);
                var distributionPerCapitalProductivity = new Number(distributionSalary / distributionAttendenceNum).toFixed(2);
                var logisticsPersonnelCostProportion = new Number(sale / logisticsSalary).toFixed(2);
                var warehousePersonnelCostProportion = new Number(sale / warehouseSalary).toFixed(2);
                var distributionPersonnelCostProportion = new Number(sale / distributionSalary).toFixed(2);
            }

            var obj = {
                AgencyId: AgencyId,
                agencyCode: agencyCode,
                agencyName: agencyName,
                dataType: dataType,
                occurDay: occurDay,
                warehouseSalary: warehouseSalary,
                distributionSalary: distributionSalary,
                logisticsSalary: logisticsSalary,
                entryNum: entryNum,
                dismissionNum: dismissionNum,
                attendenceNum: attendenceNum,
                warehouseAttendenceNum: warehouseAttendenceNum,
                distributionAttendenceNum: distributionAttendenceNum,
                trainHours: trainHours,
                trainCost: trainCost,
                sale: sale,
                dailyOrderNum: dailyOrderNum,
                dailyPieceNum: dailyPieceNum,
                dailyDistributionNum: dailyDistributionNum,

                personnelCost: personnelCost,
                personnelCostProportion: personnelCostProportion,
                perCapitaProductivity: perCapitaProductivity,
                oneBillDistributionCost: oneBillDistributionCost,
                onePieceDistributionCost: onePieceDistributionCost,
                oneDistributionCost: oneDistributionCost,
                warehousePerCapitaProductivity: warehousePerCapitaProductivity,
                distributionPerCapitalProductivity: distributionPerCapitalProductivity,
                logisticsPersonnelCostProportion: logisticsPersonnelCostProportion,
                warehousePersonnelCostProportion: warehousePersonnelCostProportion,
                distributionPersonnelCostProportion: distributionPersonnelCostProportion,

                remark: remark,
                state: state
            };


            if (results.getPersonNum) {
                obj.inServiceNum = results.getPersonNum.inServiceNum || 0;
                obj.aurhorizedNum = results.getPersonNum.aurhorizedNum || 0;
                obj.warehouseArea = results.getPersonNum.warehouseArea || 0;
                obj.personnelVacancyRate = new Number(obj.inServiceNum / obj.aurhorizedNum).toFixed(2) || 0;
                obj.surfaceEffect = new Number(sale / results.getPersonNum.warehouseArea).toFixed(2);
            } else {
                obj.inServiceNum = 0;
                obj.aurhorizedNum = 0;
                obj.warehouseArea = 0;
                obj.personnelVacancyRate = 0;
                obj.surfaceEffect = 1;
            }

            // 调整列从其他数据源获取的值也设置为0
            if (dataType == '20') {
                obj.inServiceNum = 0;
                obj.aurhorizedNum = 0;
                obj.warehouseArea = 0;
                obj.personnelVacancyRate = 0;
                obj.surfaceEffect = 0;
            }

            // 修改
            if (id) {
                obj.updatedCode = req.session.staffCode;    // 修改人编号
                obj.updatedName = req.session.staffName;    // 修改人

                var options = {
                    obj: obj,
                    where: {id: id}
                }
                personnelDailyDataService.update(options, function (err, result) {
                    if (err) {
                        Logger.error(JSON.stringify({message: "修改基础信息失败", error: err}));
                        return res.json({
                            tag: "error",
                            message: "修改失败！"
                        })
                    }
                    return res.json({
                        tag: "success",
                        message: "修改成功！"
                    })
                })
            } else {
                obj.createdCode = createdCode;
                obj.createdName = createdName;
                personnelDailyDataService.add(obj, function (err, result) {
                    if (err) {
                        Logger.error(JSON.stringify({message: "新增基础信息失败", error: err}));
                        return res.json({
                            tag: "error",
                            message: "新增基础信息失败"
                        })
                    }
                    return res.json({
                        tag: "success",
                        message: "添加成功！"
                    })
                })
            }
        }]
    });

};

exports.delete = function (req, res) {
    var id = req.body.id;                          // 主键Id

    if (!id || !_.isNumber(_.parseInt(id))) {
        return res.json({
            tag: "error",
            message: "参数错误！"
        })
    }

    var obj = {
        state: 0
    };

    var options = {
        obj: obj,
        where: {id: id}
    };

    personnelDailyDataService.delete(options, function (err, result) {
        if (err) {
            Logger.error(JSON.stringify({message: "删除基础信息失败", error: err}));
            return res.json({
                tag: "error",
                message: "删除失败！"
            })
        }
        return res.json({
            tag: "success",
            message: "删除成功！"
        })
    })
};