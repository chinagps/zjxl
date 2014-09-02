var VehicleoffonlineCountObj = function() {
	this.VEHICLEOFFON_EXP = false;
	this.titleHeight = $("#vehicleoffonlineCountSearchForm").height();
};
VehicleoffonlineCountObj.prototype = {
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
	tvdiGrid : function() {// 初始化列表页面Grid
		var obj = this;
		var tvdiHeight = obj.getGridHeight();
		var options = {
			columns : [ {
				display : '车牌号码',
				name : 'vehicleNo',
				width : 100,
				align : 'center'
			}, {
				display : '车队名称',
				name : 'teamName',
				width : 100,
				sortable : true,
				align : 'center'
			}, {
				display : '企业名称',
				name : 'corpName',
				width : 100,
				sortable : true,
				align : 'center'
			},{
				display : '上线/下线',
				name : 'onOffline',
				width : 100,
				sortable : true,
				align : 'center',
				render : function(row) {
					if (row.onOffline) {
						if(row.onOffline=="1"){
							return "上线";
						}else if(row.onOffline=="0"){
							return "下线";
						}
					} else {
						return "未知";
					}
				}
			}, {
				display : '上线/下线时间',
				name : 'utc',
				width : 200,
				sortable : true,
				align : 'center',
				render : function(row) 
				{
					if (null != row.utc && undefined != row.utc && "" != row.utc) 
					{
						return utc2Date(row.utc);
					} else {
						return "--";
					}
				}
			}],
			showCheckbox : false,
			sortName : 'utc',
			url : 'operationmanagement/findVehicleOnOffLine.action',// 数据请求地址
			exportAction:'operationmanagement/exportExcelDataVehicleoffonline.action',
//			data:{},
			showTitle : false,
			pageSize : 10,
			pageSizeOptions : [ 10, 20, 30, 40 ],
			height : tvdiHeight,
			width : "99.8%",
			autoLoad : false,
			gridDIV : "vehicleoffonlineCountGrid",
			contentDiv : "vehicleoffonlineCount",
			// 填充数据的tableid
			tableId : 'vehicleoffonlineCountGrid',
			// 查询条件formid
			searchFormId : 'vehicleoffonlineCountSearchForm',
			mainContain : "vehicleoffonlineCount",
			Buttons : [ {//导出
				id : "vehicleoffonlineExportExcel",
				fun : function()
				{
					obj.grid.exportExcel(1, 2);
				}
			}],
			gridBeforeSubmit : function() {
				var entId = KCPT.user.entId;
				if (!entId) {
					$.ligerDialog.warn("获取组织ID失败！", "提示");
					return false;
				}
				var selectParams = "";
				
				// 时间
				var dmsgSrtimeStart = $("#vehicleoffonlineCountSearchForm").find("input[name='startTime']").val();
				
				var dmsgSrtimeEnd = $("#vehicleoffonlineCountSearchForm").find("input[name='endTime']").val();
				if(!dmsgSrtimeStart || !dmsgSrtimeEnd){
					$.ligerDialog.warn("请选择开始时间以及结束时间", "提示");
					return false;
				}
				if ($.trim(dmsgSrtimeStart).length > 0) {
					selectParams += "<input type='hidden' name='requestParam.equal.startTime' value='" + date2utc(dmsgSrtimeStart) + "' />";
				}
				if ($.trim(dmsgSrtimeEnd).length > 0) {
					selectParams += "<input type='hidden' name='requestParam.equal.endTime' value='" + date2utcEnd(dmsgSrtimeEnd) + "' />";
				}
				if ($.trim(dmsgSrtimeStart).length > 0 && $.trim(dmsgSrtimeEnd).length > 0) {
					if (dmsgSrtimeStart > dmsgSrtimeEnd) {
						$.ligerDialog.warn("开始时间不能大于结束时间！", "提示");
						return false;
					}
					var nowDate = getnowTime();
					if (dmsgSrtimeStart > nowDate) {
						$.ligerDialog.warn("开始时间不能大于当前时间！", "提示");
						return false;
					}
				}
				$("#tvdiSelectParams").empty();
				$("#tvdiSelectParams").append(selectParams);
				return true;
			}
		};
		obj.grid = new ctfoFormWithGrid(options).getGrid();
		obj.gridManager = $("#vehicleoffonlineCountGrid").ligerGetGridManager();
	},
	change : function(node, chlidrens, parent) {
		// 组织类型，1为企业，2为车队 node.data.entType
		// 父id 根节点为-1 node.data.parentId
		// 车队类型: 1:默认车队,0：不为默认车队 node.data.isdeteam
		// 父节点id parent.id 父节点名字 parent.name
		// 子节点id chlidrens[0].id 子节点名字 chlidrens[0].text
		var name = node.data.text;
		var opNodeName = $("#vehicleoffonlineCountOrgName");
		var opEntId = $("#vehicleinfoOrgId");
		opNodeName.empty();
		opEntId.empty();
		opEntId.val(node.data.id);
		opNodeName.append(name.length > 12 ? name.substring(0, 10) + "..." : name);
		opNodeName.attr("title", name);
		if(node.data.entType=="1"){
			opEntId.attr("name","requestParam.equal.cId");
		}else{
			opEntId.attr("name","requestParam.equal.cId");
		}
		// this.operateLogSubmit(node.data.id);
	},
	setToday:function(){
		var obj = this;
		
		var nowDate = getnowTime();
		
		// 时间
		 $("#vehicleoffonlineCountSearchForm").find("input[name='startTime']").val(nowDate);
		
		$("#vehicleoffonlineCountSearchForm").find("input[name='endTime']").val(nowDate);
	},
	// 增加的权限验证
	authentication : function() {
		this.VEHICLEOFFON_EXP = checkFunction("FG_MEMU_STATIC_SELECT_UPDOWN_EMP");// 导出
		if (!this.VEHICLEOFFON_EXP) {
			$("#vehicleoffonlineExportExcel").remove();
		}
	},
	onResize : function() {
		var obj = this;
		if(obj.gridManager){
			obj.gridManager.setHeight(obj.getGridHeight());
		}
	}
};
$(function() {
	var vehicleoffonlineCountObj = new VehicleoffonlineCountObj();
	vehicleoffonlineCountObj.tvdiTree();
	vehicleoffonlineCountObj.authentication();
	vehicleoffonlineCountObj.tvdiGrid();
	vehicleoffonlineCountObj.setToday();
	//runManager.addChildList(vehicleoffonlineCountObj);
	//runManager.showObj = vehicleoffonlineCountObj;
	KCPT.onresizeObj = vehicleoffonlineCountObj;
	KCPT.CodeManager.getProvinceList("tbLinkProvince");// 发卡省
	
	var name = (KCPT.root.leftTree.loadTreeSelectedData.data.text != null) ? KCPT.root.leftTree.loadTreeSelectedData.data.text : KCPT.user.entName;
	var opNodeName = $("#vehicleoffonlineCountOrgName");
	var opEntId = $("#vehicleinfoOrgId");
	opNodeName.empty();
	opEntId.empty();
	opNodeName.append(name.length > 12 ? name.substring(0, 10) + "..." : name);
	opNodeName.attr("title", name);
	opEntId.val(((KCPT.root.leftTree.loadTreeSelectedData.data.id != null) ? KCPT.root.leftTree.loadTreeSelectedData.data.id : KCPT.user.entId));
	
	opEntId.attr("name","requestParam.equal.cId");
	
});
