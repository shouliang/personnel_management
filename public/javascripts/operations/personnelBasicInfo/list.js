/**
 * Created by shouliang on 2016/6/12.
 */

$(function () {
    initDataTable("#view-table").init();
});

var initDataTable = function (table) {
    var dataTableOptions = {
        "stateSave": false,//不存储页数状态
        "searching": true,
        "processing": true,
        "autoWidth": false,
        "ordering": true,
        "serverSide": true,//服务器分页
        "lengthMenu": [
            [30, 50, 100],
            [30, 50, 100]
        ],
        "ajax": {
            "url": "/personnelBasicInfo/list",
            "type": "POST",
            "data": function (d) {
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
                width: "4%",
                orderable: false,
                searchable: true
            },
            {
                title: "组织编号",
                data: "agencyCode",
                width: "7%",
                orderable: false,
                searchable: true
            },
            {
                title: "组织名称",
                data: "agencyName",
                width: "9%",
                orderable: false,
                searchable: true
            },
            {
                title: "在职人数",
                data: "inServiceNum",
                width: "5%",
                orderable: false,
                searchable: true
            },
            {
                title: "编制人数",
                data: "aurhorizedNum",
                width: "5%",
                orderable: false,
                searchable: true
            },
            {
                title: "仓库面积",
                data: "warehouseArea",
                width: "5%",
                orderable: false,
                searchable: true
            },
            {
                title: "备注",
                data: "remark",
                width: "8%",
                orderable: false,
                searchable: true
            },
            {
                title: "创建人编号",
                data: "createdCode",
                width: "6%",
                orderable: false,
                searchable: true
            },
            {
                title: "创建人",
                data: "createdName",
                width: "6%",
                orderable: false,
                searchable: true
            },
            {
                title: "创建时间",
                data: "createdAt",
                width: "10%",
                orderable: false,
                searchable: true,
                render: function (data) {
                    return moment(data).format("YYYY-MM-DD HH:mm:ss");
                }
            },
            {
                title: "修改人编号",
                data: "updatedCode",
                width: "7%",
                orderable: false,
                searchable: true
            },
            {
                title: "修改人",
                data: "updatedName",
                width: "7%",
                orderable: false,
                searchable: true
            },
            {
                title: "修改时间",
                data: "updatedAt",
                width: "10%",
                orderable: false,
                searchable: true,
                render: function (data) {
                    return moment(data).format("YYYY-MM-DD HH:mm:ss");
                }
            },
            {
                title: "操作",
                data: null,
                width: "11%",
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
            $(".addBtn").html('<a class="btn btn-primary" data-toggle="modal" href="#modal_add"  ><span class="glyphicon glyphicon-plus-sign"></span> 新增</a>');
        }
    };

    var init = function () {
        setDataTable($(table), dataTableOptions, "");

        $(table).delegate("[func=function-update]", "click", function () {
            var data = $(table).DataTable().row($(this).parents("tr")).data();
            $("#id").val(data.id);
            $("#updateAgencyId").val(data.AgencyId);              // 组织Id
            $("#updateAgencyCode").val(data.agencyCode);          // 组织编号
            $("#updateAgencyName").val(data.agencyName);          // 组织名称
            $("#updateInServiceNum").val(data.inServiceNum);      // 在职人数
            $("#updateAurhorizedNum").val(data.aurhorizedNum);    // 编制人数
            $("#updateWarehouseArea").val(data.warehouseArea);    // 仓库面积
            $("#updateRemark").val(data.remark);                  // 备注

            $("#modal_update").modal("show");
        });

    };

    return {
        dataTableOptions: dataTableOptions,
        init: init
    }
};

/**
 * 添加
 */
$("#submitAdd").click(function () {
    if (!$.trim($("#agencyName").val())) {
        setAlertModal("组织名称不能为空");
        return false;
    }

    if (!$.trim($("#inServiceNum").val())) {
        setAlertModal("在职人数不能为空");
        return false;
    }

    if (!$.trim($("#aurhorizedNum").val())) {
        setAlertModal("编制人数不能为空");
        return false;
    }

    if (!$.trim($("#warehouseArea").val())) {
        setAlertModal("仓库面积不能为空");
        return false;
    }

    $.ajax({
        url: "/personnelBasicInfo/add",
        data: {
            AgencyId: $.trim($("#AgencyId").val()),              // 组织Id
            agencyCode: $.trim($("#agencyCode").val()),          // 组织编号
            agencyName: $.trim($("#agencyName").val()),          // 组织名称
            inServiceNum: $.trim($("#inServiceNum").val()),      // 在职人数
            aurhorizedNum: $.trim($("#aurhorizedNum").val()),    // 编制人数
            warehouseArea: $.trim($("#warehouseArea").val()),    // 仓库面积
            remark: $.trim($("#remark").val())                   // 备注
        },
        type: "post",
        success: function (result) {
            if (result && result.tag == "success") {
                alert(result.message || "操作成功！");
                window.location.reload();
            } else {
                alert(result.message || "操作失败！");
            }
        }
    });
});

/**
 * 修改
 */
$("#submitUpdate").click(function () {
    if (!$.trim($("#updateAgencyName").val())) {
        setAlertModal("组织名称不能为空");
        return false;
    }

    if (!$.trim($("#updateInServiceNum").val())) {
        setAlertModal("在职人数不能为空");
        return false;
    }

    if (!$.trim($("#updateAurhorizedNum").val())) {
        setAlertModal("编制人数不能为空");
        return false;
    }

    if (!$.trim($("#updateWarehouseArea").val())) {
        setAlertModal("仓库面积不能为空");
        return false;
    }

    $.ajax({
        url: "/personnelBasicInfo/update",
        data: {
            id: $.trim($("#id").val()),
            AgencyId: $.trim($("#updateAgencyId").val()),              // 组织Id
            agencyCode: $.trim($("#updateAgencyCode").val()),          // 组织编号
            agencyName: $.trim($("#updateAgencyName").val()),          // 组织名称
            inServiceNum: $.trim($("#updateInServiceNum").val()),      // 在职人数
            aurhorizedNum: $.trim($("#updateAurhorizedNum").val()),    // 编制人数
            warehouseArea: $.trim($("#updateWarehouseArea").val()),    // 仓库面积
            remark: $.trim($("#updateRemark").val())                   // 备注
        },
        type: "post",
        success: function (result) {
            if (result && result.tag == "success") {
                alert(result.message || "操作成功！");
                window.location.reload();
            } else {
                alert(result.message || "操作失败！");
            }
        }
    });
});

/**
 * 删除
 * @param id
 */
function del(id) {
    if (confirm("确定要删除吗？")) {
        $.ajax({
            url: "/personnelBasicInfo/delete",
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

// 添加时选择组织机构
$('#agencyName').autocomplete({
    serviceUrl: '/sysAgency/list',
    onSelect: function (suggestion) {
        $("#AgencyId").val(suggestion.id);
        $("#agencyCode").val(suggestion.data);
    }
});

// 修改时选择组织机构
$('#updateAgencyName').autocomplete({
    serviceUrl: '/sysAgency/list',
    onSelect: function (suggestion) {
        $("#updateAgencyId").val(suggestion.id);
        $("#updateAgencyCode").val(suggestion.data);
    }
});