/**
 * Created by shouliang on 2016/6/23.
 * introduction:    用户表
 */
module.exports = function (sequelize, DataTypes) {
    var SysUsers = sequelize.define('SysUsers', {
        //手机号
        phone: DataTypes.STRING,
        //员工id
        StaffId: DataTypes.INTEGER,
        //密码
        pwd: DataTypes.STRING,
        //rf密码
        rfPwd: DataTypes.STRING,
        // 用户级别  超级管理员   普通管理员   普通用户
        type: DataTypes.INTEGER,
        //电子邮箱
        email: DataTypes.STRING,
        //状态    删除：-99 ，失效：0 ， 有效：1
        state: DataTypes.INTEGER,
        //创建人
        createdBy: DataTypes.STRING,
        //更新人
        updatedBy: DataTypes.STRING,
        //备注
        remark: DataTypes.STRING,
        //    采销系统使用  商品一级目录
        extId: DataTypes.STRING
    }, {
        freezeTableName: true,
        tableName: "sys_user",
        classMethods: {}
    });
    return SysUsers;
};