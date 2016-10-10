module.exports = function (sequelize, DataTypes) {
    var ReportStoreGoodsOrderAllDaily = sequelize.define('ReportStoreGoodsOrderAllDaily', {
        day: DataTypes.DATE,
        todayOrderCount: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
            comment: "订单数量"
        },
        todayStoreCount: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
            comment: "今日下单店数"
        },
        todaySum: {
            type: DataTypes.DECIMAL(15, 5),
            defaultValue: 0,
            comment: "今日下单金额"
        },
        sum: {
            type: DataTypes.DECIMAL(15, 5),
            defaultValue: 0,
            comment: "实收金额"
        },
        netSum: {
            type: DataTypes.DECIMAL(15, 5),
            defaultValue: 0,
            comment: "成本金额"
        },
        detailSum: {
            type: DataTypes.DECIMAL(15, 5),
            defaultValue: 0,
            comment: "商品金额"
        },
        off: {
            type: DataTypes.DECIMAL(15, 5),
            defaultValue: 0,
            comment: "优惠金额"
        },
        sumWithOff: {
            type: DataTypes.DECIMAL(15, 5),
            defaultValue: 0,
            comment: "订单金额"
        },
        storeCount: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
            comment: "下单店数"
        },
        orderCount: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
            comment: "订单数量"
        },
        pcOrderDetails: {
            type: DataTypes.TEXT,
            comment: "PC订单明细"
        },
        wechatOrderDetails: {
            type: DataTypes.TEXT,
            comment: "微信订单明细"
        },
        appOrderDetails: {
            type: DataTypes.TEXT,
            comment: "APP订单明细"
        },
        iosOrderDetails: {
            type: DataTypes.TEXT,
            comment: "IOS订单明细"
        },
        androidOrderDetails: {
            type: DataTypes.TEXT,
            comment: "android订单明细"
        },
        sumAvg: {
            type: DataTypes.DECIMAL(15, 5),
            defaultValue: 0,
            comment: "订单均价"
        },
        storeSumAvg: {
            type: DataTypes.DECIMAL(15, 5),
            defaultValue: 0,
            comment: "便利店均额"
        },
        gtStoreSumAvgCount: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
            comment: "大于便利店均额"
        },
        gtOneKStoreSumCount: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
            comment: "大于1K店数"
        },
        //amount取个和  grossProfitDaily
        goodsDetailAmount: {
            type:  DataTypes.INTEGER,
            defaultValue: 0,
            comment: "订单(包含库存)商品数量"
        },
        deliveryOnePlus: {
            type: DataTypes.TEXT,
            comment: "T+1未配送"
        },
        deliveryTwoPlus: {
            type: DataTypes.TEXT,
            comment: "T+2未配送"
        },
        cityId: DataTypes.INTEGER
    }, {
        freezeTableName: true,
        tableName: "report_store_goods_order_all_dailies"
    });
    return ReportStoreGoodsOrderAllDaily;
};