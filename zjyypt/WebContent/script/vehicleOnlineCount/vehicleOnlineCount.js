var VehilceOnlineCountObj = function() {
	//var runFlag = window.location.toString().split("?");
	//if(null != runFlag[1]) {
		//$.ligerDialog.warn("页面加载错误", "提示");
		//return false;
	//}
	//alert(runFlag[1]);
	this.VEHICLEONLINE_EMP = false;
	this.titleHeight = $("#vehicleOnlineCountSearchForm").height();
};
VehilceOnlineCountObj.prototype = {
	tvdiTree : function() {// 初始化组织结构Tree
		var obj = this;
//		obj.leftTree = KCPT.root.leftTree;
//		obj.leftTree.hideTabs();
//		obj.leftTree.hidengrid();
//		obj.leftTree.show();
//		obj.leftTree.triggerShowObj = obj;
		KCPT.root.triggerShowObj = obj;
	},
//	show : function(){
//		var  obj = this;
//		
//		obj.tvdiTree();
//	},
	getGridHeight : function(){
		var center = getHeightAndWidth();
		return center.height - this.titleHeight - 86;
	},
	showVehicleMonitor:function(){		
		$("div#CenterMaskDiv").find("li#monitorDiv").trigger("click");
	},
	tvdiGrid : function() {// 初始化列表页面Grid
		var obj = this;
		var tvdiHeight = obj.getGridHeight();
		var options = {
			columns : [ {
				display : '车牌号码',
				name : 'vehicleNo',
				width : 100,
				sortable : true,
				align : 'center'
				/*render : function(row) {
					var html = "";
					if (row.vehicleNo&&row.vid) {
						html = '<a href="javascript:vehilceOnlineCountObj.showVehicleMonitor('
								+ row.vid + ')">'+row.vehicleNo+'</a>';
					} else {
						html = "未知";
					}
					return  html;
				}*/
			}, {
				display : '所属企业',
				name : 'corpName',
				width : 100,
				sortable : true,
				align : 'center',
				render : function(row) {
					if(row.corpName){
						return row.corpName;
					}else {
						return "未知";
					}
				}
			}, {
				display : '所属车队',
				name : 'teamName',
				width : 100,
				sortable : true,
				align : 'center'
			}, {
				display : '是否在线',
				name : 'isOnline',
				width : 100,
				sortable : true,
				align : 'center',
				render : function(row) {
					if("1"==row.isOnline){
						return "在线";
					}else {
						return "不在线";
					}
				}
			},
			/** 由于在线统计查询缓慢暂屏蔽此列 modified at 20130121 BEGIN **/
			/*
			{
				display : '当前未处理报警数',
				name : 'unDealAlarmCount',
				width : 100,
				sortable : true,
				align : 'center',
				toggle : false
			}, 
			*/
			/** 由于在线统计查询缓慢暂屏蔽此列 modified at 20130121 END **/
			{
				display : '最后上报GPS时间',
				name : 'newUtc',
				width : 180,
				sortable : true,
				align : 'center',
				render : function(row) {
					if (null != row.newUtc && undefined != row.newUtc && "" != row.newUtc) {
						return utc2Date(row.newUtc);
					} else {
						return "--";
					}
				}
			}, /*{
				display : '驾驶员',
				name : 'driverName',
				width : 100,
				sortable : true,
				align : 'center'
			},*/{
				display : '车速(公里/小时)',
				name : 'gpsSpeed',
				width : 100,
				sortable : true,
				align : 'center',
				toggle : false,
				render : function(row) {
					if (null != row.gpsSpeed && undefined != row.gpsSpeed && "" != row.gpsSpeed) {
						return row.gpsSpeed / 10;
					} else {
						return "--";
					}
				}
			}, {
				display : '营运状态',
				name : 'vehicleOperationState',
				width : 100,
				sortable : true,
				align : 'center',
				render : function(row) {
					if("10" == row.vehicleOperationState){
						return "营运";
					} else if("21" == row.vehicleOperationState) {
						return "停运";
					} else if("22" == row.vehicleOperationState) {
						return "挂失";
					} else if("31" == row.vehicleOperationState) {
						return "迁出（过户）";
					} else if("32" == row.vehicleOperationState) {
						return "迁出（转籍）";
					} else if("33" == row.vehicleOperationState) {
						return "报废";
					} else if("34" == row.vehicleOperationState) {
						return "歇业";
					} else if("80" == row.vehicleOperationState) {
						return "注销";
					} else {
						return "其他";
					}
				}
			}],
			showCheckbox : false,
			sortName : 'vehicleNo',
			url : 'operationmanagement/queryVehicleOnlineCount.action',// 数据请求地址
			exportAction:'operationmanagement/exportExcelDataVehileOnlineCount.action',
//			data:{},
			showTitle : false,
			pageSize : 10,
			pageSizeOptions : [ 10, 20, 30, 40 ],
			height : tvdiHeight,
			width : "99.8%",
			autoLoad : false,
			gridDIV : "vehicleOnlineCountGrid",
			contentDiv : "vehicleOnlineCountcontent",
			// 填充数据的tableid
			tableId : 'vehicleOnlineCountGrid',
			// 查询条件formid
			searchFormId : 'vehicleOnlineCountSearchForm',
			mainContain : "vehicleOnlineCountcontent",
			gridBeforeSubmit : function() {
				var entId = KCPT.user.entId;
				if (!entId) {
					$.ligerDialog.warn("获取组织ID失败！", "提示");
					return false;
				}
				return true;
			},
			Buttons : [ {//导出
				id : "vehileOnlineExportExcel",
				fun : function()
				{
					obj.grid.exportExcel(1, 2);
				}
			}]
		};
		obj.grid = new ctfoFormWithGrid(options).getGrid();
		obj.gridManager = $("#vehicleOnlineCountGrid").ligerGetGridManager();
	},
	change : function(node, chlidrens, parent) {
		// 组织类型，1为企业，2为车队 node.data.entType
		// 父id 根节点为-1 node.data.parentId
		// 车队类型: 1:默认车队,0：不为默认车队 node.data.isdeteam
		// 父节点id parent.id 父节点名字 parent.name
		// 子节点id chlidrens[0].id 子节点名字 chlidrens[0].text
		var name = node.data.text;
		var opNodeName = $("#vehicleOnlineCountOrgName");
		var opEntId = $("#vehicleOnlineCountcontent").find("#vehicleinfoOrgId");
		opNodeName.empty();
		opEntId.empty();
		opEntId.val(node.data.id);
		opNodeName.append(name.length > 12 ? name.substring(0, 10) + "..." : name);
		opNodeName.attr("title", name);
		if(node.data.entType=="1"||node.data.entType==1){
			opEntId.attr("name","requestParam.equal.cId");
		}else{
			
			opEntId.attr("name","requestParam.equal.tId");
		}
		// this.operateLogSubmit(node.data.id);
	},
	// 增加的权限验证
	authentication : function() {
		this.VEHICLEONLINE_EMP = checkFunction("FG_MEMU_STATIC_SELECT_UPTIME_EMP");// 导出
		if (!this.VEHICLEONLINE_EMP) {
			$("#vehileOnlineExportExcel").remove();
		}
	},
	onResize : function() {
		var obj = this;
		if(obj.gridManager){
			obj.gridManager.setHeight(obj.getGridHeight());
		}
	},
	isOnlineChangeEvent : function() {
		// 车辆是否在线change事件绑定
		$("#isOnlineId").change(function() {
			if($("#isOnlineId").val() == 0){
				$("#isRunId").val("");
				$("#isRunId").attr("disabled","disabled");		
			} else {
				$("#isRunId").attr("disabled",false);
			}
		});
	}
	//首页在线车辆跳转调用此方法
	/*vehicleToOnline : function(){
		var obj = this;
		obj.grid.reload();
	}*/
};
$(function() {
	var vehilceOnlineCountObj = new VehilceOnlineCountObj();
	vehilceOnlineCountObj.authentication();
	vehilceOnlineCountObj.tvdiTree();
	vehilceOnlineCountObj.tvdiGrid();
	vehilceOnlineCountObj.isOnlineChangeEvent();
	//runManager.addChildList(vehilceOnlineCountObj);
	//runManager.showObj = vehilceOnlineCountObj;

	var name = (KCPT.root.leftTree.loadTreeSelectedData.data.text != null) ? KCPT.root.leftTree.loadTreeSelectedData.data.text : KCPT.user.entName;
	var opNodeName = $("#vehicleOnlineCountOrgName");
	var opEntId = $("#vehicleOnlineCountcontent").find("#vehicleinfoOrgId");
	opNodeName.empty();
	opEntId.empty();
	opNodeName.append(name.length > 12 ? name.substring(0, 10) + "..." : name);
	opNodeName.attr("title", name);
	opEntId.val(((KCPT.root.leftTree.loadTreeSelectedData.data.id != null) ? KCPT.root.leftTree.loadTreeSelectedData.data.id : KCPT.user.entId));
	opEntId.attr("name","requestParam.equal.cId");
	window.vehicleOnline = vehilceOnlineCountObj;
	if(KCPT.vehicleOnline){
		KCPT.vehicleOnline = false;
		$("#vehicleOnlineCountSearchForm").submit();
	}
	if(KCPT.vehicleRun){
		// 是否行驶复选框默认选择行驶
		$("#isRunId").val("1");
		KCPT.vehicleRun = false;
		$("#vehicleOnlineCountSearchForm").submit();
	}
	KCPT.onresizeObj = vehilceOnlineCountObj;
});
