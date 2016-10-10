/**
 * Created by shouliang on 2016/6/15.
 */

module.exports = function(sequelize, DataTypes) {
    var PersonnelDailyData = sequelize.define('PersonnelDailyData', {
        AgencyId: {
            type: DataTypes.INTEGER(11),
            allowNull: true
        },
        agencyCode: {
            type: DataTypes.STRING,
            allowNull: true
        },
        agencyName: {
            type: DataTypes.STRING,
            allowNull: true
        },
        inServiceNum: {
            type: DataTypes.INTEGER(11),
            allowNull: true
        },
        aurhorizedNum: {
            type: DataTypes.INTEGER(11),
            allowNull: true
        },
        warehouseArea: {
            type: DataTypes.DECIMAL,
            allowNull: true
        },
        dataType: {
            type: DataTypes.INTEGER(11),
            allowNull: true
        },
        occurDay: {
            type: DataTypes.DATE,
            allowNull: true
        },
        warehouseSalary: {
            type: DataTypes.DECIMAL,
            allowNull: true
        },
        distributionSalary: {
            type: DataTypes.DECIMAL,
            allowNull: true
        },
        logisticsSalary: {
            type: DataTypes.DECIMAL,
            allowNull: true
        },
        entryNum: {
            type: DataTypes.INTEGER(11),
            allowNull: true
        },
        dismissionNum: {
            type: DataTypes.INTEGER(11),
            allowNull: true
        },
        attendenceNum: {
            type: DataTypes.INTEGER(11),
            allowNull: true
        },
        warehouseAttendenceNum: {
            type: DataTypes.INTEGER(11),
            allowNull: true
        },
        distributionAttendenceNum: {
            type: DataTypes.INTEGER(11),
            allowNull: true
        },
        trainHours: {
            type: DataTypes.INTEGER(11),
            allowNull: true
        },
        trainCost: {
            type: DataTypes.DECIMAL,
            allowNull: true
        },
        remark: {
            type: DataTypes.STRING,
            allowNull: true
        },
        sale: {
            type: DataTypes.DECIMAL,
            allowNull: true
        },
        dailyOrderNum: {
            type: DataTypes.INTEGER(11),
            allowNull: true
        },
        dailyPieceNum: {
            type: DataTypes.INTEGER(11),
            allowNull: true
        },
        dailyDistributionNum: {
            type: DataTypes.INTEGER(11),
            allowNull: true
        },
        personnelCost: {
            type: DataTypes.DECIMAL,
            allowNull: true
        },
        personnelCostProportion: {
            type: DataTypes.DECIMAL,
            allowNull: true
        },
        perCapitaProductivity: {
            type: DataTypes.DECIMAL,
            allowNull: true
        },
        oneBillDistributionCost: {
            type: DataTypes.DECIMAL,
            allowNull: true
        },
        onePieceDistributionCost: {
            type: DataTypes.DECIMAL,
            allowNull: true
        },
        oneDistributionCost: {
            type: DataTypes.DECIMAL,
            allowNull: true
        },
        warehousePerCapitaProductivity: {
            type: DataTypes.DECIMAL,
            allowNull: true
        },
        distributionPerCapitalProductivity: {
            type: DataTypes.DECIMAL,
            allowNull: true
        },
        logisticsPersonnelCostProportion: {
            type: DataTypes.DECIMAL,
            allowNull: true
        },
        warehousePersonnelCostProportion: {
            type: DataTypes.DECIMAL,
            allowNull: true
        },
        distributionPersonnelCostProportion: {
            type: DataTypes.DECIMAL,
            allowNull: true
        },
        personnelVacancyRate: {
            type: DataTypes.DECIMAL,
            allowNull: true
        },
        surfaceEffect: {
            type: DataTypes.DECIMAL,
            allowNull: true
        },
        state: {
            type: DataTypes.INTEGER(11),
            allowNull: true
        },
        createdCode: {
            type: DataTypes.STRING,
            allowNull: true
        },
        createdName: {
            type: DataTypes.STRING,
            allowNull: true
        },
        updatedCode: {
            type: DataTypes.STRING,
            allowNull: true
        },
        updatedName: {
            type: DataTypes.STRING,
            allowNull: true
        },
        createdAt: {
            type: DataTypes.DATE,
            allowNull: true
        },
        updatedAt: {
            type: DataTypes.DATE,
            allowNull: true
        }
    }, {
        tableName: 'personnel_daily_data'
    });

    return PersonnelDailyData;
};

