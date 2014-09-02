var DriverMessageRecordCountObj = function() {
	this.titleHeight = $("#driverMessageRecordCountSearchForm").height();
};
DriverMessageRecordCountObj.prototype = {
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
				display : '驾驶员姓名',
				name : 'driverName',
				width : 100,
				align : 'center'
			}, {
				display : '车牌号码',
				name : 'vehicleNo',
				width : 100,
				sortable : true,
				align : 'center'
			}, {
				display : '车牌颜色',
				name : 'plateColor',
				width : 100,
				sortable : true,
				align : 'center',
				render : function(row) {
					var vehicleColor = "";
					if (null != row.plateColor && undefined != row.plateColor && "" != row.plateColor) 
					{
						vehicleColor = KCPT.CodeManager.getNameByCode("SYS_VCL_PLATECOLOR", row.plateColor);
						if (undefined == vehicleColor) {
							vehicleColor = "";
						}
					}
					return vehicleColor;
				}
			}, {
				display : '所属企业',
				name : 'corpName',
				width : 100,
				sortable : true,
				align : 'center'
			}, {
				display : '所属车队',
				name : 'teamName',
				width : 100,
				sortable : true,
				align : 'center'
			}, {
				display : '驾驶员身份证号',
				name : 'driverNo',
				width : 100,
				sortable : true,
				align : 'center'
			}, {
				display : '驾驶员从业资格证号',
				name : 'driverCertificate',
				width : 200,
				sortable : true,
				align : 'center'
			}, {
				display : '发证机构',
				name : 'certificateAgency',
				width : 100,
				sortable : true,
				align : 'center'
			}, {
				display : '接收时间',
				name : 'utc',
				width : 180,
				sortable : true,
				align : 'center',
				render : function(row) {
					if (null != row.utc && undefined != row.utc && "" != row.utc) {
						return utc2Date(row.utc);
					} else {
						return "--";
					}
				}
			}, {
				display : '消息有效性',
				name : 'status',
				width : 180,
				sortable : true,
				align : 'center',
				render : function(row) {
					if ("0"==row.status) 
					{
						return "识别成功";
					}else if ("1" ==row.status) 
					{
						return "识别失败";
					} else {
						return "--";
					}
				}
			} ],
			showCheckbox : false,
			sortName : 'vehicleNo',
			url : 'operationmanagement/queryDriverMessageRecordCount.action',// 数据请求地址
//			data:{},
			showTitle : false,
			pageSize : 10,
			pageSizeOptions : [ 10, 20, 30, 40 ],
			height : tvdiHeight,
			width : "99.8%",
			autoLoad : false,
			gridDIV : "driverMessageRecordCountGrid",
			contentDiv : "driverMessageRecordCount",
			// 填充数据的tableid
			tableId : 'driverMessageRecordCountGrid',
			// 查询条件formid
			searchFormId : 'driverMessageRecordCountSearchForm',
			mainContain : "driverMessageRecordCount",
			gridBeforeSubmit : function() {
				var entId = KCPT.user.entId;
				if (!entId) {
					$.ligerDialog.warn("获取组织ID失败！", "提示");
					return false;
				}
				var selectParams = "";
				
				// 时间
				var dmsgSrtimeStart = $("#driverMessageRecordCountSearchForm").find("input[name='startTime']").val();
				
				var dmsgSrtimeEnd = $("#driverMessageRecordCountSearchForm").find("input[name='endTime']").val();
				
				if(!dmsgSrtimeStart || !dmsgSrtimeEnd){
					$.ligerDialog.warn("开始时间和结束时间都不能为空！", "提示");
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
		obj.grid = new ctfoFormWithGrid(options);
		obj.gridManager = $("#driverMessageRecordCountGrid").ligerGetGridManager();
	},
	change : function(node, chlidrens, parent) {
		// 组织类型，1为企业，2为车队 node.data.entType
		// 父id 根节点为-1 node.data.parentId
		// 车队类型: 1:默认车队,0：不为默认车队 node.data.isdeteam
		// 父节点id parent.id 父节点名字 parent.name
		// 子节点id chlidrens[0].id 子节点名字 chlidrens[0].text
		var name = node.data.text;
		var opNodeName = $("#driverMessageRecordCountOrgName");
		var opEntId = $("#vehicleinfoOrgId");
		opNodeName.empty();
		opEntId.empty();
		opEntId.val(node.data.id);
		opNodeName.append(name.length > 12 ? name.substring(0, 10) + "..." : name);
		opNodeName.attr("title", name);
		if(node.data.entType=="1"){
			opEntId.attr("name","requestParam.equal.cId");
		}else{
			opEntId.attr("name","requestParam.equal.Id");
		}
		// this.operateLogSubmit(node.data.id);
	},
	onResize : function() {
		var obj = this;
		if (obj.gridManager) {
			obj.gridManager.setHeight(obj.getGridHeight());
		}
	},
	setToday : function() {
		var nowDate = getnowTime();
		// 时间
		$("#driverMessageRecordCountSearchForm").find("input[name='startTime']").val(nowDate);

		$("#driverMessageRecordCountSearchForm").find("input[name='endTime']").val(nowDate);
	}
};
$(function() {
	var driverMessageRecordCountObj = new DriverMessageRecordCountObj();
	driverMessageRecordCountObj.tvdiTree();
	driverMessageRecordCountObj.tvdiGrid();
	driverMessageRecordCountObj.setToday();
	//runManager.addChildList(driverMessageRecordCountObj);
	//runManager.showObj = driverMessageRecordCountObj;
	KCPT.onresizeObj = driverMessageRecordCountObj;
	
	var name = (KCPT.root.leftTree.loadTreeSelectedData.data.text != null) ? KCPT.root.leftTree.loadTreeSelectedData.data.text : KCPT.user.entName;
	var opNodeName = $("#alarmCountOrgName");
	var opEntId = $("#vehicleinfoOrgId");
	opNodeName.empty();
	opEntId.empty();
	opNodeName.append(name.length > 12 ? name.substring(0, 10) + "..." : name);
	opNodeName.attr("title", name);
	opEntId.val(((KCPT.root.leftTree.loadTreeSelectedData.data.id != null) ? KCPT.root.leftTree.loadTreeSelectedData.data.id : KCPT.user.entId));
	
	opEntId.attr("name","requestParam.equal.cId");
	
	
});
