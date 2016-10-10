module.exports = function (sequelize, DataTypes) {
    var PersonnelBasciInfo = sequelize.define('PersonnelBasciInfo', {
        // 组织ID
        AgencyId: {
            type: DataTypes.INTEGER(11),
            allowNull: true
        },
        // 组织编号
        agencyCode: {
            type: DataTypes.STRING,
            allowNull: true
        },
        // 组织编号
        agencyName: {
            type: DataTypes.STRING,
            allowNull: true
        },
        // 在职人数
        inServiceNum: {
            type: DataTypes.INTEGER(11),
            allowNull: true
        },
        // 编制人数
        aurhorizedNum: {
            type: DataTypes.INTEGER(11),
            allowNull: true
        },
        // 仓库面积
        warehouseArea: {
            type: DataTypes.DECIMAL,
            allowNull: true
        },
        // 备注
        remark: {
            type: DataTypes.STRING,
            allowNull: true
        },
        // 删除标志
        state: {
            type: DataTypes.INTEGER(11),
            allowNull: true
        },
        // 创建人编号
        createdCode: {
            type: DataTypes.STRING,
            allowNull: true
        },
        // 创建人
        createdName: {
            type: DataTypes.STRING,
            allowNull: true
        },
        // 修改人编号
        updatedCode: {
            type: DataTypes.STRING,
            allowNull: true
        },
        // 修改人
        updatedName: {
            type: DataTypes.STRING,
            allowNull: true
        },
        // 创建时间
        createdAt: {
            type: DataTypes.DATE,
            allowNull: true
        },
        // 修改时间
        updatedAt: {
            type: DataTypes.DATE,
            allowNull: true
        }
    }, {
        freezeTableName: true,
        tableName: 'personnel_basic_info'
    });

    return PersonnelBasciInfo;
};
