var MealCountObj = function() {
	this.EMP_BTN = false;
	this.titleHeight = $("#mealCountSearchForm").height();
};
MealCountObj.prototype = {
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
		return center.height - this.titleHeight - 128;
	},
	tvdiGrid : function() {// 初始化列表页面Grid
		var obj = this;
		var tvdiHeight =obj.getGridHeight();
		var options = {
			columns : [ {
				display : '车辆VIN',
				name : 'vehicleVin',
				width : 100,
				sortable : true,
				align : 'center',
				toggle : false
			}, {
				display : '车牌号码',
				name : 'vehicleNo',
				width : 100,
				sortable : true,
				align : 'center'
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
				display : '开始时间',
				name : 'startTime',
				width : 180,
				sortable : true,
				align : 'center',
				render : function(row) {
					if (null != row.startTime && undefined != row.startTime && "" != row.startTime) {
						return utc2Date(row.startTime);
					} else {
						return "--";
					}
				}
			}, {
				display : '结束时间',
				name : 'endTime',
				width : 180,
				sortable : true,
				align : 'center',
				render : function(row) {
					if (null != row.endTime && undefined != row.endTime && "" != row.endTime) {
						return utc2Date(row.endTime);
					} else {
						return "--";
					}
				}
			}, {
				display : '车辆上报里程',
				name : 'totalMarker',
				width : 100,
				sortable : true,
				align : 'center',
				render : function(row) {
					if (row.totalMarker)
					{
					   return row.totalMarker;
					   
					} else {
						return "0";
					}
				}
			}, {
				display : '平台计算里程',
				name : 'totalGisMarker',
				width : 100,
				sortable : true,
				align : 'center',
				render : function(row) {
					if (row.totalGisMarker)
					{
					   return row.totalGisMarker;
					   
					} else {
						return "0";
					}
				}
			} ],
			showCheckbox : false,
			sortName : 'vehicleNo',
			url : 'operationmanagement/queryMealCount.action',// 数据请求地址
			exportAction:'operationmanagement/exportExcelDataMealCount.action',
//			data:{},
			showTitle : false,
			pageSize : 10,
			pageSizeOptions : [ 10, 20, 30, 40 ],
			height : tvdiHeight,
			width : "99.8%",
			autoLoad : false,
			gridDIV : "mealCountGrid",
			contentDiv : "mealCount",
			// 填充数据的tableid
			tableId : 'mealCountGrid',
			// 查询条件formid
			searchFormId : 'mealCountSearchForm',
			mainContain : "mealCount",
			Buttons : [ {//导出
				id : "mealCountExportExcel",
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
				var dmsgSrtimeStart = $("#mealCountSearchForm").find("input[name='startTime']").val();
				
				var dmsgSrtimeEnd = $("#mealCountSearchForm").find("input[name='endTime']").val();
				if(!dmsgSrtimeStart&&!dmsgSrtimeEnd){
					$.ligerDialog.warn("请选择时间", "提示");
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
		obj.gridManager = $("#mealCountGrid").ligerGetGridManager();
	},
	setToday:function(){
		var obj = this;
		
		var nowDate = getnowTime();
		
		// 时间
		 $("#mealCountSearchForm").find("input[name='startTime']").val(nowDate);
		
		$("#mealCountSearchForm").find("input[name='endTime']").val(nowDate);
	},
	change : function(node, chlidrens, parent) {
		// 组织类型，1为企业，2为车队 node.data.entType
		// 父id 根节点为-1 node.data.parentId
		// 车队类型: 1:默认车队,0：不为默认车队 node.data.isdeteam
		// 父节点id parent.id 父节点名字 parent.name
		// 子节点id chlidrens[0].id 子节点名字 chlidrens[0].text
		var name = node.data.text;
		var opNodeName = $("#mealCountOrgName");
		var opEntId = $("#vehicleinfoOrgId");
		opNodeName.empty();
		opEntId.empty();
		opEntId.val(node.data.id);
		opNodeName.append(name.length > 12 ? name.substring(0, 10) + "..." : name);
		opNodeName.attr("title", name);
		if(node.data.t=="1"){
			opEntId.attr("name","requestParam.equal.cId");
		}else{
			opEntId.attr("name","requestParam.equal.tId");
		}
		// this.operateLogSubmit(node.data.id);
	},
	// 增加的权限验证
	authentication : function() {
		this.EMP_BTN = checkFunction("FG_MEMU_STATIC_STATIC_MILEAGE_EMP");// 导出
		if (!this.EMP_BTN) {
			$("#mealCountExportExcel").remove();
		}
	},
	onResize : function() {
		var obj = this;
		if(obj.gridManager){
			obj.gridManager.setHeight(obj.getGridHeight());
		} 
	},
	changeQueryType: function(strFlag){
		var obj = this;
 		//清空列表页面
 		switch (strFlag) {
 		
 		
 		//单车查询
 	    case '1':
 	    	$("#mealTab1").attr("class","h");
 	    	$("#mealTab2").attr("class","");
            $("#vehicleNoDiv").show();
            $("#vehicleVinDiv").show();
            $("#searchTypeId").val("1");
            
            //单车查询的列
            var sigleVehicleColumn=[ {
				display : '车辆VIN',
				name : 'vehicleVin',
				width : 100,
				sortable : true,
				align : 'center',
				toggle : false
			}, {
				display : '车牌号码',
				name : 'vehicleNo',
				width : 100,
				sortable : true,
				align : 'center'
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
				display : '开始时间',
				name : 'startTime',
				width : 180,
				sortable : true,
				align : 'center',
				render : function(row) {
					if (null != row.startTime && undefined != row.startTime && "" != row.startTime) {
						return utc2Date(row.startTime);
					} else {
						return "--";
					}
				}
			}, {
				display : '结束时间',
				name : 'endTime',
				width : 180,
				sortable : true,
				align : 'center',
				render : function(row) {
					if (null != row.endTime && undefined != row.endTime && "" != row.endTime) {
						return utc2Date(row.endTime);
					} else {
						return "--";
					}
				}
			}, {
				display : '车辆上报里程',
				name : 'totalMarker',
				width : 100,
				sortable : true,
				align : 'center',
				render : function(row) {
					if (row.totalMarker)
					{
					   return row.totalMarker;
					   
					} else {
						return "0";
					}
				}
			}, {
				display : '平台计算里程',
				name : 'totalGisMarker',
				width : 100,
				sortable : true,
				align : 'center',
				render : function(row) {
					if (row.totalGisMarker)
					{
					   return row.totalGisMarker;
					   
					} else {
						return "0";
					}
				}
			} ];

            //重新改变表格的列
            //obj.grid.realGrid.reloadColumn(sigleVehicleColumn);
            obj.grid.gridManager.setOptions({'columns' : sigleVehicleColumn});
            
            
            //清除数据
            $("#mealCountGrid").find(".l-grid-row,.l-grid-detailpanel,.l-grid-totalsummary").remove();
			var panelBar= $("#mealCountGrid").find(".l-panel-bar:eq(0)");
			panelBar.find(".l-bar-text").text("从0到0，总数0 条");
			panelBar.find(".pcontrol").find("input").val("1");
			panelBar.find(".pcontrol").find("input").unbind("keydown");
			panelBar.find(".pcontrol").find("span").text("1");
			panelBar.find(".l-bar-btnfirst").find("span").addClass("l-disabled");
			panelBar.find(".l-bar-btnprev").find("span").addClass("l-disabled");
			panelBar.find(".l-bar-btnnext").find("span").addClass("l-disabled");
			panelBar.find(".l-bar-btnlast").find("span").addClass("l-disabled");
 	        break;
 	        
 	        
 	    //分组查询
 	    case '2':
 	   
 	    	$("#mealTab1").attr("class","");
 	    	$("#mealTab2").attr("class","h");
 	    	$("#vehicleNoDiv").hide();
            $("#vehicleVinDiv").hide();
            $("#searchTypeId").val("2");
            
          //分组查询的列
            var groupVehicleColumn=[{
				display : '车队名称',
				name : 'entName',
				width : 100,
				sortable : true,
				align : 'center'
			}, {
				display : '开始时间',
				name : 'startTime',
				width : 180,
				sortable : true,
				align : 'center',
				render : function(row) {
					if (null != row.startTime && undefined != row.startTime && "" != row.startTime) {
						return utc2Date(row.startTime);
					} else {
						return "--";
					}
				}
			}, {
				display : '结束时间',
				name : 'endTime',
				width : 180,
				sortable : true,
				align : 'center',
				render : function(row) {
					if (null != row.endTime && undefined != row.endTime && "" != row.endTime) {
						return utc2Date(row.endTime);
					} else {
						return "--";
					}
				}
			}, {
				display : '车辆上报里程',
				name : 'totalMarker',
				width : 100,
				sortable : true,
				align : 'center',
				render : function(row) {
					if (row.totalMarker)
					{
					   return row.totalMarker;
					   
					} else {
						return "0";
					}
				}
			}, {
				display : '平台计算里程',
				name : 'totalGisMarker',
				width : 100,
				sortable : true,
				align : 'center',
				render : function(row) {
					if (row.totalGisMarker)
					{
					   return row.totalGisMarker;
					   
					} else {
						return "0";
					}
				}
			} ];

            
            //重新改变表格的列
            //obj.grid.gridManager.reloadColumn(groupVehicleColumn);
            obj.grid.gridManager.setOptions({'columns' : groupVehicleColumn});
            
            //清除数据
            $("#mealCountGrid").find(".l-grid-row,.l-grid-detailpanel,.l-grid-totalsummary").remove();
			var panelBar= $("#mealCountGrid").find(".l-panel-bar:eq(0)");
			panelBar.find(".l-bar-text").text("从0到0，总数0 条");
			panelBar.find(".pcontrol").find("input").val("1");
			panelBar.find(".pcontrol").find("input").unbind("keydown");
			panelBar.find(".pcontrol").find("span").text("1");
			panelBar.find(".l-bar-btnfirst").find("span").addClass("l-disabled");
			panelBar.find(".l-bar-btnprev").find("span").addClass("l-disabled");
			panelBar.find(".l-bar-btnnext").find("span").addClass("l-disabled");
			panelBar.find(".l-bar-btnlast").find("span").addClass("l-disabled");
 	    	
 	        break;
 	    }
		
	}
};

var mealCountObj = new MealCountObj();
$(function() {
	mealCountObj.authentication();
	mealCountObj.tvdiTree();
	mealCountObj.tvdiGrid();
	mealCountObj.setToday();
	//runManager.addChildList(mealCountObj);
	//runManager.showObj = mealCountObj;

	var name = (KCPT.root.leftTree.loadTreeSelectedData.data.text != null) ? KCPT.root.leftTree.loadTreeSelectedData.data.text : KCPT.user.entName;
	var opNodeName = $("#mealCountOrgName");
	var opEntId = $("#vehicleinfoOrgId");
	opNodeName.empty();
	opEntId.empty();
	opNodeName.append(name.length > 12 ? name.substring(0, 10) + "..." : name);
	opNodeName.attr("title", name);
	opEntId.val(((KCPT.root.leftTree.loadTreeSelectedData.data.id != null) ? KCPT.root.leftTree.loadTreeSelectedData.data.id : KCPT.user.entId));
	
	opEntId.attr("name","requestParam.equal.cId");
	KCPT.onresizeObj = mealCountObj;
});
