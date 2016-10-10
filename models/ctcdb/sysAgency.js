/**
 * Created by shouliang on 2016/6/6.
 */

module.exports = function (sequelize, DataTypes) {
    var SysAgency = sequelize.define('SysAgency', {
        id: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },

        // 名称
        name:  DataTypes.STRING,

        // 编号
        code: DataTypes.STRING,

        // 上级组织id
        parentId: DataTypes.INTEGER,

        // 地址
        address: DataTypes.STRING,

        // 负责人
        owner: DataTypes.STRING,

        // 状态    删除：-99 ，失效：0 ， 有效：1
        state: DataTypes.INTEGER,

        // 创建人
        createdBy:DataTypes.STRING,

        // 更新人
        updatedBy:DataTypes.STRING,

        // 备注
        remark: DataTypes.STRING

    }, {
        freezeTableName: true,
        tableName: "sys_agency"
    });

    return SysAgency;
};