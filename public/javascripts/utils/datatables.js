function setDataTable(ele, option, searchOption, otherOptions) {
    if (!otherOptions) {
        otherOptions = {};
    }
    var language = {//国际化-语言设置
        "processing": "玩命加载中...",
        "lengthMenu": "每页显示 _MENU_ 项记录",
        "zeroRecords": "没有匹配记录",
        "info": "显示第 _START_ 至 _END_ 项记录，共 _TOTAL_ 项",
        "infoEmpty": "显示第 0 至 0 项记录，共 0 项",
        "infoFiltered": "",
        "infoPostFix": "", "search": "搜索:",
        "loadingRecords": "载入中...",
        "url": "",
        "paginate": {
            "first": "首页",
            "previous": "上页",
            "next": "下页",
            "last": "末页"
        }, "oAria": {
            "sSortAscending": ": 以升序排列此列",
            "sSortDescending": ": 以降序排列此列"
        }
    };
    var re;
    if (option && option.toString().length > 2) {
        if (option["lengthMenu"]) {
        } else {
            option["lengthMenu"] = [
                [10, 25, 50, 100, -1],
                [10, 25, 50, 100, "全部"]
            ];
        }
        option["language"] = language;
        option["pagingType"] = "full_numbers";
        re = ele.DataTable(option);
    } else {
        re = ele.DataTable({
            //搜索框设置
            //每页记录条数设置
            "language": language,
            "pagingType": "full_numbers"
        });
    }
    //搜索框设置
    var searchEle = $(document).find("div.dataTables_filter").find("input[type='search']");
    if (searchOption && searchOption.toString().length > 2) {
        searchEle.attr(searchOption.attr);
        searchEle.css(searchOption.css);
        searchEle.addClass("form-control inline");
    }
    searchEle.parent("label").css({"position": "relative", "right": "20px"});
    $(document).find(".dataTables_length select").addClass("form-control inline");
    return re;
}

function setJumpToPage(pages) {
    return '<span>共<span id="pageCount">' + (pages || 0) + '</span>页</span>' +
        ' 到第<input style="width: 3em;" type="text" id="jumpToPageValue" value="1"/>页' +
        ' <button class="btn btn-info btn-xs" id="jumpToPageButton">确定</button>';
}