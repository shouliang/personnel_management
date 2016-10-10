/**
 * Created by shouliang on 2016/6/7.
 */

var sysAgencyService = require('../services/sysAgency');
var Logger = require('../utils/logger').Logger('personnelBasicInfoController');
var _ = require('lodash');

exports.list = function (req, res) {
    var query = req.query.query;
    var options = {
        attributes: [['name', 'value'], ['code', 'data'], 'id'],
        where: {
            state: 1,
            parentId: 1,
            RankId:2,                            //只显示分公司
            name: {$like: '%' + query + '%'}
        },
        limit: 100,    // 分页大小
        offset: 0,     // 起始数据
        raw: true
    };

    sysAgencyService.list(options, function (err, result) {
        if (err) {
            Logger.error(JSON.stringify({message: '获取组织机构列表失败', error: err}));
            return res.json({suggestions: [{value: '', data: '', id: ''}]});
        }

        // 成功返回
        return res.json({suggestions: result});
    })


};


