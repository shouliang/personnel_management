/**
 * Created by shouliang on 2016/6/7.
 */

var personnelBasicInfoService = require('../services/personnelBasicInfo');
var Utils = require('../utils/utils');
var Logger = require('../utils/logger').Logger('personnelBasicInfoController');
var _ = require('lodash');
var async = require('async');
var sequelize = require('sequelize');

exports.view = function (req, res) {
    res.render('./personnelBasicInfo/view',
        {
            title: "基础信息管理"
        }
    );
};

exports.list = function (req, res) {

    // 格式化数据
    var dtParams = Utils.dtFormatDatabase(req.body, {
        id: "id"
    });

    var options = {
        where: {
            state: 1
        },
        orders: dtParams.orders,         // 排序
        limit: dtParams.limit || 100,    // 分页大小
        offset: dtParams.offset || 0,    // 起始数据
        raw: true
    };

    personnelBasicInfoService.list(options, function (err, result) {
        if (err) {
            Logger.error(JSON.stringify({message: "获取人事基础信息列表失败", error: err}));
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

exports.add = function (req, res) {
    async.auto({
        getOnlyOne: function (callback, results) {
            var onlyOneOptions = {
                where: sequelize.and(
                    {state: 1},
                    {AgencyId: req.body.AgencyId}
                ),
                raw: true
            };

            personnelBasicInfoService.count(onlyOneOptions, function (err, count) {
                if (err) {
                    Logger.error(JSON.stringify({message: "查询基础信息条数失败", error: err}));
                    callback(err, {tag: "error", message: "查询基础信息条数失败"});
                }
                callback(null, count);
            });
        },

        add: ["getOnlyOne", function (callback, results) {
            if (results.getOnlyOne) {
                return res.json({
                    tag: "error",
                    message: "该组织机构信息已添加！"
                })
            }

            var AgencyId = req.body.AgencyId;              // 组织Id
            var agencyCode = req.body.agencyCode;          // 组织编号
            var agencyName = req.body.agencyName;          // 组织名称
            var inServiceNum = req.body.inServiceNum;      // 在职人数
            var aurhorizedNum = req.body.aurhorizedNum;    // 编制人数
            var warehouseArea = req.body.warehouseArea;    // 仓库面积
            var remark = req.body.remark;                  // 备注
            var state = 1;                                 // 默认值1表示有效

            var createdCode = req.session.staffCode;                 // 创建人编号
            var createdName = req.session.staffName;                 // 创建人

            if (!AgencyId || !agencyCode || !agencyName) {
                return res.json({
                    tag: "error",
                    message: "组织机构名称不存在！"
                })
            }

            var obj = {
                AgencyId: AgencyId,
                agencyCode: agencyCode,
                agencyName: agencyName,
                inServiceNum: inServiceNum,
                aurhorizedNum: aurhorizedNum,
                warehouseArea:warehouseArea,
                remark: remark,
                state: state,
                createdCode: createdCode,
                createdName: createdName
            };

            personnelBasicInfoService.add(obj, function (err, result) {
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

        }]
    });
};

exports.update = function (req, res) {
    var id = req.body.id;                          // 主键Id
    async.auto({
        getOnlyOne: function (callback, results) {
            var onlyOneOptions = {
                where: sequelize.and(
                    {state: 1},
                    {AgencyId: req.body.AgencyId},
                    {id: {$ne: id}}
                ),
                raw: true
            };

            personnelBasicInfoService.count(onlyOneOptions, function (err, count) {
                if (err) {
                    Logger.error(JSON.stringify({message: "查询基础信息条数失败", error: err}));
                    callback(err, {tag: "error", message: "查询基础信息条数失败"});
                }
                callback(null, count);
            });
        },

        update: ["getOnlyOne", function (callback, results) {
            if (results.getOnlyOne) {
                return res.json({
                    tag: "error",
                    message: "该组织机构信息已添加！"
                })
            }

            var AgencyId = req.body.AgencyId;              // 组织Id
            var agencyCode = req.body.agencyCode;          // 组织编号
            var agencyName = req.body.agencyName;          // 组织名称
            var inServiceNum = req.body.inServiceNum;      // 在职人数
            var aurhorizedNum = req.body.aurhorizedNum;    // 编制人数
            var warehouseArea = req.body.warehouseArea;    // 仓库面积
            var remark = req.body.remark;                  // 备注

            var updatedCode = req.session.staffCode;                // 修改人编号
            var updatedName = req.session.staffName;                // 修改人

            if (!id || !_.isNumber(_.parseInt(id))) {
                return res.json({
                    tag: "error",
                    message: "参数错误！"
                })
            }

            if (!AgencyId || !agencyCode || !agencyName) {
                return res.json({
                    tag: "error",
                    message: "组织机构名称不存在！"
                })
            }

            var obj = {
                AgencyId: AgencyId,
                agencyCode: agencyCode,
                agencyName: agencyName,
                inServiceNum: inServiceNum,
                aurhorizedNum: aurhorizedNum,
                warehouseArea :warehouseArea,
                remark: remark,
                updatedCode: updatedCode,
                updatedName: updatedName
            };

            var options = {
                obj: obj,
                where: {id: id}
            }

            personnelBasicInfoService.update(options, function (err, result) {
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
    }

    personnelBasicInfoService.delete(options, function (err, result) {
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

exports.getList = function (req, res) {
    var options = {
        where: {
            state: 1,
            AgencyId: req.session.agencyId
        },
        raw: true
    };

    personnelBasicInfoService.list(options, function (err, result) {
        if (err) {
            Logger.error(JSON.stringify({message: "获取人事基础信息列表失败", error: err}));
            return res.send([]);
        }

        // 成功返回
        return res.send(result);
    })
};