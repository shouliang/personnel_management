/**
 * Created by shouliang on 2016/6/12.
 */

$(function () {

    // 列表初始化
    initDataTable("#view-table").init();

    // 设置日期时间控件
    $("#beginOccurDay").datetimepicker({
        format: "yyyy-MM-dd",
        showMeridian: true,
        autoclose: true,
        forceParse: true,
        todayBtn: true,
        minView: 'month',
        todayHighlight: true
    });

    $("#endOccurDay").datetimepicker({
        format: "yyyy-MM-dd",
        showMeridian: true,
        autoclose: true,
        forceParse: true,
        todayBtn: true,
        minView: 'month',
        todayHighlight: true
    });

    $("#occurDay").datetimepicker({
        format: "yyyy-MM-dd",
        showMeridian: true,
        autoclose: true,
        forceParse: true,
        minView: 'month',
        endDate: moment().subtract(1,'days').format("YYYY-MM-DD"),
        todayHighlight: true
    }).val(moment().subtract(1,'days').format("YYYY-MM-DD"));


    // 添加时清空文本框内容
    $(".addBtn").click(function () {
        $("#warehouseSalary").val("");
        $("#distributionSalary").val("");
        $("#logisticsSalary").val("");
        $("#entryNum").val("");
        $("#dismissionNum").val("");
        $("#attendenceNum").val("");
        $("#warehouseAttendenceNum").val("");
        $("#distributionAttendenceNum").val("");
        $("#trainHours").val("");
        $("#trainCost").val("");

        $("#sale").val("");
        $("#dailyOrderNum").val("");
        $("#dailyPieceNum").val("");
        $("#dailyDistributionNum").val("");
        $("#warehouseArea").val("");
        $("#remark").val("");

        $("#modal_form").modal("show");
    });

});

var initDataTable = function (table) {
    var dataTableOptions = {
        "stateSave": false,//不存储页数状态
        "searching": true,
        "processing": true,
        "autoWidth": false,
        "ordering": true,
        "serverSide": true,//服务器分页
        "scrollX": true,
        "lengthMenu": [
            [30, 50, 100],
            [30, 50, 100]
        ],
        "ajax": {
            "url": "/personnelDailyData/list",
            "type": "POST",
            "data": function (d) {
                d.beginOccurDay = $("#beginOccurDay").val();
                d.endOccurDay = $("#endOccurDay").val();
            },
            "dataSrc": "data"
        },
        "order": [
            [0, 'desc']
        ],
        columns: [
            {
                title: "序号",
                data: "id",
                orderable: false,
                searchable: true
            },
            {
                title: "数据类型",
                data: "dataType",
                orderable: false,
                searchable: true,
                render: function (data) {
                    if (data == 10) {
                        return "普通数据";
                    }
                    else if (data == 20) {
                        return "调整数据";
                    } else {
                        return "";
                    }
                }
            },
            {
                title: "组织编号",
                data: "agencyCode",
                orderable: false,
                searchable: true
            },
            {
                title: "组织名称",
                data: "agencyName",
                orderable: false,
                searchable: true
            },
            {
                title: "发生日期",
                data: "occurDay",
                orderable: true,
                searchable: true,
                render: function (data) {
                    return moment(data).format("YYYY-MM-DD");
                }
            },
            {
                title: "仓库部工资",
                data: "warehouseSalary",
                orderable: false,
                searchable: true
            },
            {
                title: "物流部工资",
                data: "distributionSalary",
                orderable: false,
                searchable: true
            },
            {
                title: "后勤部工资",
                data: "logisticsSalary",
                orderable: false,
                searchable: true
            },
            {
                title: "当日入职人数",
                data: "entryNum",
                orderable: false,
                searchable: true
            }, {
                title: "当日离职人数",
                data: "dismissionNum",
                orderable: false,
                searchable: true
            }, {
                title: "当日出勤人数",
                data: "attendenceNum",
                orderable: false,
                searchable: true
            }, {
                title: "仓库出勤人数",
                data: "warehouseAttendenceNum",
                orderable: false,
                searchable: true
            }, {
                title: "物流出勤人数",
                data: "distributionAttendenceNum",
                orderable: false,
                searchable: true
            }, {
                title: "培训课时",
                data: "trainHours",
                orderable: false,
                searchable: true
            }, {
                title: "培训成本",
                data: "trainCost",
                orderable: false,
                searchable: true
            },
            {
                title: "备注",
                data: "remark",
                orderable: false,
                searchable: true
            },
            {
                title: "创建人编号",
                data: "createdCode",
                orderable: false,
                searchable: true
            },
            {
                title: "创建人",
                data: "createdName",
                orderable: false,
                searchable: true
            },
            {
                title: "创建时间",
                data: "createdAt",
                orderable: false,
                searchable: true,
                render: function (data) {
                    return moment(data).format("YYYY-MM-DD HH:mm:ss");
                }
            },
            {
                title: "修改人编号",
                data: "updatedCode",
                orderable: false,
                searchable: true
            },
            {
                title: "修改人",
                data: "updatedName",
                orderable: false,
                searchable: true
            },
            {
                title: "修改时间",
                data: "updatedAt",
                orderable: false,
                searchable: true,
                render: function (data) {
                    return moment(data).format("YYYY-MM-DD HH:mm:ss");
                }
            },
            {
                title: "操作",
                data: null,
                orderable: false,
                searchable: false,
                createdCell: function (cell, cellData, rowData) {
                    cell.innerHTML = "<a class= 'btn btn-primary' func=function-update data-toggle=modal href=#" +
                        ">" + "修改<" + "/a>&nbsp;";
                    cell.innerHTML += "<a class= 'btn btn-danger' href='#' onclick=del(" + rowData.id + ")" +
                        ">" + "刪除<" + "/a>&nbsp;";
                }
            }
        ],
        "sDom": "<'row-fluid'<'col-md-7 addBtn'><'col-md-3'><'col-md-2' l>r>t<'row-fluid'<'col-md-6'i><'col-md-6' p>>",
        initComplete: function () {
            $(".addBtn").html('<a class="btn btn-primary" data-toggle="modal" href="#"  ><span class="glyphicon glyphicon-plus-sign"></span> 新增</a>');
        }
    };

    var init = function () {
        setDataTable($(table), dataTableOptions, "");

        $(table).delegate("[func=function-update]", "click", function () {
            var data = $(table).DataTable().row($(this).parents("tr")).data();

            $("#id").val(data.id);
            $("#dataType").val(data.dataType);
            $("#occurDay").val(moment(data.occurDay).format("YYYY-MM-DD"));
            $("#warehouseSalary").val(data.warehouseSalary);
            $("#distributionSalary").val(data.distributionSalary);
            $("#logisticsSalary").val(data.logisticsSalary);
            $("#entryNum").val(data.entryNum);
            $("#dismissionNum").val(data.dismissionNum);
            $("#attendenceNum").val(data.attendenceNum);
            $("#warehouseAttendenceNum").val(data.warehouseAttendenceNum);
            $("#distributionAttendenceNum").val(data.distributionAttendenceNum);
            $("#trainHours").val(data.trainHours);
            $("#trainCost").val(data.trainCost);

            $("#sale").val(data.sale);
            $("#dailyOrderNum").val(data.dailyOrderNum);
            $("#dailyPieceNum").val(data.dailyPieceNum);
            $("#dailyDistributionNum").val(data.dailyDistributionNum);
            $("#warehouseArea").val(data.warehouseArea);
            $("#remark").val(data.remark);

            $("#modal_form").modal("show");
        });

    };

    return {
        dataTableOptions: dataTableOptions,
        init: init
    }
};

// 表单验证
function validateForm() {
    return $("#base-add-form").validate({
        rules: {
            "warehouseSalary": {
                required: true,
                number: true
            },
            "distributionSalary": {
                required: true,
                number: true
            },
            "logisticsSalary": {
                required: true,
                number: true
            },
            "entryNum": {
                required: true,
                number: true
            },
            "dismissionNum": {
                required: true,
                number: true
            },
            "attendenceNum": {
                required: true,
                number: true
            },
            "warehouseAttendenceNum": {
                required: true,
                number: true
            },
            "distributionAttendenceNum": {
                required: true,
                number: true
            }, "trainHours": {
                required: true,
                number: true
            },
            "trainCost": {
                required: true,
                number: true
            },
            "sale": {
                required: true,
                number: true
            },
            "dailyOrderNum": {
                required: true,
                number: true
            },
            "dailyPieceNum": {
                required: true,
                number: true
            },
            "dailyDistributionNum": {
                required: true,
                number: true
            },
            "warehouseArea": {
                required: true,
                number: true
            }
        },
        messages: {
            "warehouseSalary": {
                required: "仓库部工资不能为空",
                number: "仓库部工资必须为数字"
            },
            "distributionSalary": {
                required: "物流部工资不能为空",
                number: "物流部工资必须为数字"
            },
            "logisticsSalary": {
                required: "后勤部工资不能为空",
                number: "后勤部工资必须为数字"
            },
            "entryNum": {
                required: "当日入职人数工资不能为空",
                number: "当日入职人数必须为数字"
            },
            "dismissionNum": {
                required: "当日离职人数不能为空",
                number: "当日离职人数必须为数字"
            },
            "attendenceNum": {
                required: "当日出勤人数不能为空",
                number: "当日出勤人数必须为数字"
            },
            "warehouseAttendenceNum": {
                required: "仓库出勤人数不能为空",
                number: "仓库出勤人数必须为数字"
            },
            "distributionAttendenceNum": {
                required: "物流出勤人数不能为空",
                number: "物流出勤人数必须为数字"
            }, "trainHours": {
                required: "培训课时不能为空",
                number: "培训课时必须为数字"
            },
            "trainCost": {
                required: "培训成本不能为空",
                number: "培训成本必须为数字"
            },
            "sale": {
                required: "销售额不能为空",
                number: "销售额必须为数字"
            },
            "dailyOrderNum": {

                required: "日配单量不能为空",
                number: "日配单量必须为数字"
            },
            "dailyPieceNum": {
                required: "日配件量不能为空",
                number: "日配件量必须为数字"
            },
            "dailyDistributionNum": {
                required: "日配送量不能为空",
                number: "日配送量必须为数字"
            },
            "warehouseArea": {
                required: "仓库面积不能为空",
                number: "仓库面积必须为数字"
            }
        },
        showErrors: function (errorMap, errorList) {
            if (errorList && errorList.length > 0) {
                var flag = true;
                if ($(errorList[0].element).hasClass("time")) {
                    flag = false;
                }
                return CommonUtil.openTips($(errorList[0].element), errorList[0].message, flag);
            }
        }
    }).form();
}

/**
 * 搜索
 */
$("#searchBtn").click(function () {
    $("#view-table").DataTable()
        .draw();
});

/**
 * 重置
 */
$("#resetBtn").click(function () {
    $("#beginOccurDay").val("");
    $("#endOccurDay").val("");
});

// 添加 or 修改
$("#submit").click(function () {
    if (validateForm()) {

        var id = $("#id").val();
        var url = "/personnelDailyData/add";
        var data = {
            dataType: $.trim($("#dataType").val()),
            occurDay: $.trim($("#occurDay").val()),
            warehouseSalary: $.trim($("#warehouseSalary").val()),
            distributionSalary: $.trim($("#distributionSalary").val()),
            logisticsSalary: $.trim($("#logisticsSalary").val()),
            entryNum: $.trim($("#entryNum").val()),
            dismissionNum: $.trim($("#dismissionNum").val()),
            attendenceNum: $.trim($("#attendenceNum").val()),
            warehouseAttendenceNum: $.trim($("#warehouseAttendenceNum").val()),
            distributionAttendenceNum: $.trim($("#distributionAttendenceNum").val()),
            trainHours: $.trim($("#trainHours").val()),
            trainCost: $.trim($("#trainCost").val()),

            sale: $.trim($("#sale").val()),
            dailyOrderNum: $.trim($("#dailyOrderNum").val()),
            dailyPieceNum: $.trim($("#dailyPieceNum").val()),
            dailyDistributionNum: $.trim($("#dailyDistributionNum").val()),
            warehouseArea: $.trim($("#warehouseArea").val()),

            remark: $.trim($("#remark").val())
        }

        // 修改时添加id和修改url
        if (id) {
            data.id = id;
            url = "/personnelDailyData/update";
        }

        var ajaxOption = {
            url: url,
            data: data,
            type: "post",
            success: function (result) {
                if (result && result.tag == "success") {
                    alert(result.message || "操作成功！");
                    window.location.reload();
                } else {
                    alert(result.message || "操作失败！");
                }
            }
        }

        $.ajax(ajaxOption);
    }
});

/**
 * 删除
 * @param id
 */
function del(id) {
    if (confirm("确定要删除吗？")) {
        $.ajax({
            url: "/personnelDailyData/delete",
            data: {id: id},
            type: "post",
            success: function (result) {
                if (result && result.tag == "success") {
                    alert(result.message || "操作成功！");
                    window.location.reload();
                } else {
                    alert(result.message || "操作失败！");
                }
            },
            error: function () {
                alert("系统错误，请联系管理员！");
            }
        });
    }
};