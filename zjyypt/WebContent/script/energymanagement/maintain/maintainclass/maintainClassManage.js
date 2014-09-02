var maintainClassMngPage = function(){
	this.name = "维保类别管理";
	this.grid;
	this.gridCurPageObj;
	this.gridTotalPageObj;
	this.ctfoFormWithGri;
	this.leftTree;
//	this.centerHeight = KCPT.root.getCenterSize().height;
	this.titleHeight = $("#maintainClassManageForm").height();
};

maintainClassMngPage.prototype = {
	//显示左侧树
	show : function() {
//		var obj = this;
//		obj.leftTree = KCPT.root.leftTree;
//		obj.leftTree.setCheckDataName("vid");
//		obj.leftTree.showTabs();
//		obj.leftTree.showGrid();
//		obj.leftTree.show();
	},
	//隐藏左侧树
	hide : function() {
		// 初始化组织结构Tree
		
		
	},
    init : function(){
        //初始化grid
        this.initInfoGrid();
        //初始化分页信息jquery对象
        var gridTableDiv = $("#maintainClassGrid");
        var gridToolBar = gridTableDiv.find(".l-panel-bar:first");
        this.gridCurPageObj = gridToolBar.find(".pcontrol input");
        this.gridTotalPageObj = gridToolBar.find(".pcontrol span");
    },
    onResize : function() {
    	var obj = this;
		if (obj.gridManager) {
			obj.gridManager.setHeight(obj.getGridHeight());
		}
    },
    initAddMaintainClassHeight : function() {
//		var nowHeight = KCPT.root.getCenterSize().height;
		//$("#maintainClassAddForm").find("#maintainClassAddDiv").height(nowHeight - 42 - 76);
	},
	getGridHeight : function(){
		var center = getHeightAndWidth();
		return center.height - this.titleHeight - 78;
	},
    initInfoGrid : function(){
        var pageObj = this;
        //隐藏左侧树
        pageObj.hide();
        var height = pageObj.getGridHeight();
        var options = {/*用于构造查询结果框架的参数*/
            columns: [
                {
                    display : '序号',
                    name : 'maintainId',
                    width : 100,
                    sortable : false,
                    align : 'center',
                    render : function (row,index){
                        return index + 1;
                    }
                },
                {
                    display : '维保项目',
                    name : 'maintainName',
                    width : 100,
                    sortable : false,
                    align : 'center'
                },
                {
                    display : '维保代号',
                    name : 'maintainAbbreviationName',
                    width : 100,
                    sortable : false,
                    align : 'center'
                },
                {
                    display : '维保内容',
                    name : 'maintainContent',
                    width : 400,
                    sortable : false,
                    align : 'center',
                    render : function(row,index){
                        return "<label title=\"" + row.maintainContentTitle + "\">"
                        + row. maintainContent
                        + "</label>";
                    }
                },
                {
                    display : '创建人',
                    name : 'createByName',
                    width : 100,
                    sortable : false,
                    align : 'center'
                },
                {
                    display : '创建时间',
                    name : 'createTime',
                    width : 140,
                    sortable : false,
                    align : 'center',
                    render : function (row,index) {
                        return pageObj.cleanDateStr(row.createTime);
                    }
                },
                {
                    display : '最后修改人',
                    name : 'modifyByName',
                    width : 100,
                    sortable : false,
                    align : 'center'
                },
                {
                    display : '最后修改时间',
                    name : 'modifyTime',
                    width : 140,
                    sortable : false,
                    align : 'center',
                    render : function (row,index) {
                        return pageObj.cleanDateStr(row.modifyTime);
                    }
                },
                {
                    display : '操作',
                    name : '',
                    width : 100,
                    sortable : false,
                    align : 'center',
                    render : function(row){
                    	var functionChecked ="";
						if(checkFunction("FG_MEMU_MAINTENANCE_MAINTENANCE_U")){
							functionChecked = "<a href=\"javascript:window.pageObj.editMaintainClass(" + row.maintainId + ")\">修改</a>";
						}
					   if(checkFunction("FG_MEMU_MAINTENANCE_MAINTENANCE_D")){
						   functionChecked = functionChecked+"&nbsp;<a href=\"javascript:window.pageObj.delMaintainClass(" + row.maintainId + ")\">删除</a>";
					   }
					   return functionChecked;
                    }
                }
            ],
            mainContain : "maintainClassManageDiv",
            gridDIV: "maintainClassContentDiv",
            showCheckbox : false,
            sortName : "maintainId",
            url : "maintain/findMaintainClassList.action",
            showTitle : false,
            pageSize : 30,
            height : height,
            width:'99.8%',
            autoload : false,
            tableId : "maintainClassGrid",
            searchFormId : "maintainClassManageForm",
            onBeforeShowData : function (grid,data) {
                var pageObj = window.pageObj;
                checkData(data);
                //如果当前页不是第一页并且返回数据为空，则重新查询上一页（当编辑删除后的load数据时可能发生该情况）
                var curPage = pageObj.gridCurPageObj.val();
                if (curPage > 1 && data.Rows.length == 0){
                    var gridManager = pageObj.grid.gridManager;
                    gridManager.setOptions({"newPage" : curPage - 1});
                    gridManager.loadData(true);
                    return false;
                }
                return true;
            },

            container : "maintainClassAddContainerDiv", /*指定哪个div放置载入的add/edit/detail页面*/
            loadHtml : 'model/energymanagement/maintain/maintainclass/maintainClassAdd.jsp',/*add/edit/detail页面url*/
            formId : 'maintainClassAddForm',/*add/edit/detail页面使用的formid*/
            submitId : 'maintainClassAddSubmit',/*add/edit/detail页面提交按钮的ID*/
            closeId : 'close',/*add/edit/detail页面取消按钮的ID*/
            addURL : "maintain/createMaintainClass.action",
            updateURL : "maintain/editMaintainClass.action",
            detailURL : "maintain/findMaintainClassById.action",
            editModel : "maintainClassInfo",/*edit/detail页面表单提交项对应的frombean的名字，在edit/detail页面初始化时使用*/
            success : function(){
            	pageObj.hide();
                var obj = window.pageObj.ctfoFormWithGrid;
                var actionTypeBefore = obj.form.actionType;
                obj.status = "list";
                obj.form.hide();
                obj.form.reset();
                obj.grid.show();
                $.ligerDialog.success("数据保存成功！");
                if (actionTypeBefore == "add"){
                    obj.grid.search();
                    pageObj.findMainTainClass();
                }else {
                    obj.grid.gridManager.loadData(true);
                }
            },/*add/edit页面回调函数*/

            detailEndFun : function(obj){
                var maintainIdWhenEditLoaded = $("input[name='maintainClassInfo.maintainId']").val();
                if (!maintainIdWhenEditLoaded || maintainIdWhenEditLoaded == ""){
                    $.ligerDialog.error(
                            "没有详细信息，该维保类别可能已被删除，请重新查询",
                            "错误",
                            function(){
                                $("#close").click();
                            });
                }
            },/*转向edit页面前的操作，若获取详细信息失败则提示然后回到grid页面*/

            Buttons : [ {
                id : "showAdd",
                fun : function() {
                    pageObj.ctfoFormWithGrid.add();
                }
            } ],
//			initReady : function(){
//				pageObj.initAddMaintainClassHeight();
//			},
            beforeSubmit : function(){
                return true;
            },
            gridBeforeSubmit : function(){
                var createTimeFrom = $("#createTimeFrom").val();
                var createTimeTo = $("#createTimeTo").val();
                if ((createTimeFrom != null && createTimeFrom != "")
                        && (createTimeTo != null && createTimeTo != "")){
                    if (createTimeFrom > createTimeTo){
                        $.ligerDialog.alert("起始时间不能大于结束时间");
                        return false;
                    }
                }
                return true;
            }
        };
        /*使用参数构造formWithGrid*/
        pageObj.ctfoFormWithGrid = new ctfoFormWithGrid(options);
        pageObj.grid = pageObj.ctfoFormWithGrid.getGrid();
        pageObj.gridManager = $("#maintainClassGrid").ligerGetGridManager();
    },
    cleanDateStr : function(dateStr){/*清理时间字符串尾部的小数点部分*/
        var result = dateStr;
        var index = dateStr.indexOf(".");
        if (index >= 0){
            result = dateStr.substring(0,index);
        }
        return result;
    },
    delMaintainClass : function(id){
        var obj = this;
        $.ligerDialog.confirm('是否删除维保类别！', function(yes) {
            if (yes) {
                JAjax("maintain/deleteMaintainClass.action?maintainId=" + id,
                        "", "json", obj.delMaintainClassSuccess, obj.delMaintainClassError, true);
            }
        });
    },
    delMaintainClassSuccess : function(data){
        var obj = window.pageObj;
        $.ligerDialog.success(data.displayMessage);
        obj.ctfoFormWithGrid.grid.gridManager.loadData(true);
    },
    delMaintainClassError : function(data){
        $.ligerDialog.error("删除失败");
    },
    editMaintainClass : function(id){
        var obj = this;
        var maintainId = {
            "maintainId" : id
        };
        obj.ctfoFormWithGrid.update(maintainId);
    },
    // 左侧树的列表
	orgTree : function() {
		// 初始化组织结构Tree
//		var obj = this;
//		obj.leftTree = KCPT.root.leftTree;
//		obj.leftTree.hideTabs();
//		obj.leftTree.hidengrid();
//		obj.leftTree.hide();
	},
	// 查询维保管理类别
	findMainTainClass : function() {
		var obj = this;
		JAjax("maintain/findAllClassByEntId.action", "", "json",
				pageObj.createSelectMainTainClass, null, true);
	},
	// 创建维保类别下拉菜单
	createSelectMainTainClass : function(data) {
		var obj = this;
		obj.planClassArray = new Array();
		var mainTainClassSelect = $("#queryMainTainId");
		var options = "";
		mainTainClassSelect.empty();
		if (data != null && data != "" && data != undefined) {
			var objArray = eval(data);
			options += "<option value='' >请选择</option>";
			for ( var j = 0; j < objArray.length; j++) {
				var oArray = objArray[j];
				options += "<option value='" + oArray.maintainId + "' >"
						+ oArray.maintainName + "</option>";
			}
			try {
				mainTainClassSelect.append(options);
			} catch (ex) {
			}
		}
	},
	//添加权限
	checkButtonFunction : function(){
		if(!checkFunction("FG_MEMU_MAINTENANCE_MAINTENANCE_C")){
			$("#maintainClassAddButton").html("");
		}
	}
};
var pageObj = new maintainClassMngPage();
$(document).ready(function (){
//    pageObj.orgTree();
    pageObj.findMainTainClass();
	pageObj.init();
    pageObj.ctfoFormWithGrid.grid.search();
    window.pageObj = pageObj;
    pageObj.onResize();
    pageObj.checkButtonFunction();
    maintainClassFream.maintainShowObj = pageObj;
});