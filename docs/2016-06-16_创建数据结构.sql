-- ----------------------------
-- Table structure for personnel_basic_info 人事基础信息表
-- ----------------------------
DROP TABLE IF EXISTS `personnel_basic_info`;
CREATE TABLE `personnel_basic_info` (
  `id` int(11) NOT NULL AUTO_INCREMENT  COMMENT '主键',
  `AgencyId` int(11) DEFAULT NULL COMMENT '组织Id',
  `agencyCode` varchar(255) DEFAULT NULL COMMENT '组织编码',
  `agencyName` varchar(255) DEFAULT NULL COMMENT '组织名称',
  `inServiceNum` int(11) DEFAULT NULL COMMENT '在职人数',
  `aurhorizedNum` int(11) DEFAULT NULL COMMENT '编制人数',
  `warehouseArea` decimal(30,5) DEFAULT NULL COMMENT '仓库面积',
  `remark` varchar(255) DEFAULT NULL COMMENT '备注',
  `state` int(11) DEFAULT NULL COMMENT '删除标志',
  `createdCode` varchar(255) DEFAULT NULL COMMENT '创建人编号',
  `createdName` varchar(255) DEFAULT NULL COMMENT '创建人名称',
  `updatedCode` varchar(255) DEFAULT NULL COMMENT '修改人编号',
  `updatedName` varchar(255) DEFAULT NULL COMMENT '修改人名称',
  `createdAt` datetime DEFAULT NULL COMMENT '创建时间',
  `updatedAt` datetime DEFAULT NULL COMMENT '修改时间',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for personnel_daily_data 每日数据
-- ----------------------------
DROP TABLE IF EXISTS `personnel_daily_data`;
CREATE TABLE `personnel_daily_data` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '主键',

    -- 每次从组织机构中获取
  `AgencyId` int(11) DEFAULT NULL COMMENT '组织ID',
  `agencyCode` varchar(255) DEFAULT NULL COMMENT '组织编码',
  `agencyName` varchar(255) DEFAULT NULL COMMENT '组织名称',
  `inServiceNum` int(11) DEFAULT NULL COMMENT '在职人数',
  `aurhorizedNum` int(11) DEFAULT NULL COMMENT '编制人数',
  `warehouseArea` decimal(30,5) DEFAULT NULL COMMENT '仓库面积',

   -- 用户填写
  `dataType` int(11) DEFAULT NULL COMMENT '数据类型',
  `occurDay` date DEFAULT NULL COMMENT '发生日期',
  `warehouseSalary` decimal(30,5) DEFAULT NULL COMMENT '仓库部工资',
  `distributionSalary` decimal(30,5) DEFAULT NULL COMMENT '物流部工资',
  `logisticsSalary` decimal(30,5) DEFAULT NULL COMMENT '后勤部工资',
  `entryNum` int(11) DEFAULT NULL COMMENT '当日入职人数',
  `dismissionNum` int(11) DEFAULT NULL COMMENT '当日离职人数',
  `attendenceNum` int(11) DEFAULT NULL COMMENT '当日出勤人数',
  `warehouseAttendenceNum` int(11) DEFAULT NULL COMMENT '仓库出勤人数',
  `distributionAttendenceNum` int(11) DEFAULT NULL COMMENT '物流出勤人数',
  `trainHours` int(11) DEFAULT NULL COMMENT '培训课时',
  `trainCost` decimal(30,5) DEFAULT NULL COMMENT '培训成本',
  `remark` varchar(255) DEFAULT NULL COMMENT '备注',

  -- 其他业务表获取
  `sale` decimal(30,5) DEFAULT NULL COMMENT '销售额',
  `dailyOrderNum` int(11) DEFAULT NULL COMMENT '日配单量',
  `dailyPieceNum` int(11) DEFAULT NULL COMMENT '日配件量',
  `dailyDistributionNum` int(11) DEFAULT NULL COMMENT '日配送量',

    -- 公式计算
  `personnelCost` decimal(30,5) DEFAULT NULL COMMENT '当日人事费用',
  `personnelCostProportion` decimal(30,5) DEFAULT NULL COMMENT '人事费用占比',
  `perCapitaProductivity` decimal(30,5) DEFAULT NULL COMMENT '人均生产力',
  `oneBillDistributionCost` decimal(30,5) DEFAULT NULL COMMENT '单笔配货成本',
  `onePieceDistributionCost` decimal(30,5) DEFAULT NULL COMMENT '单件配货成本',
  `oneDistributionCost` decimal(30,5) DEFAULT NULL COMMENT '单件配送成本',
  `warehousePerCapitaProductivity` decimal(30,5) DEFAULT NULL COMMENT '仓库人均生产力',
  `distributionPerCapitalProductivity` decimal(30,5) DEFAULT NULL COMMENT '物流人均生产力',
  `logisticsPersonnelCostProportion` decimal(30,5) DEFAULT NULL COMMENT '后勤人事费用占比',
  `warehousePersonnelCostProportion` decimal(30,5) DEFAULT NULL COMMENT '仓库人事费用占比',
  `distributionPersonnelCostProportion` decimal(30,5) DEFAULT NULL COMMENT '物流人事费用占比',
  `personnelVacancyRate` decimal(30,5) DEFAULT NULL COMMENT '人员空缺率',
  `surfaceEffect` decimal(30,5) DEFAULT NULL COMMENT '面效',

    -- 记录信息
  `state` int(11) DEFAULT NULL COMMENT '删除标志',
  `createdCode` varchar(255) DEFAULT NULL COMMENT '创建人编号',
  `createdName` varchar(255) DEFAULT NULL COMMENT '创建人名称',
  `updatedCode` varchar(255) DEFAULT NULL COMMENT '修改人编号',
  `updatedName` varchar(255) DEFAULT NULL COMMENT '修改人名称',
  `createdAt` datetime DEFAULT NULL COMMENT '创建时间',
  `updatedAt` datetime DEFAULT NULL COMMENT '修改时间',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8;