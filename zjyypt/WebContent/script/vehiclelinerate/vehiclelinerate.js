var VehicleOnlineCountObj = function() {
	this.EMP_BTN = false;
	this.titleHeight = $("#vehicleOnlineCountSearchForm").height();
};
VehicleOnlineCountObj.prototype = {
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
		var tvdiHeight = obj.getGridHeight();
		var options = {
			columns : [{
				display : '车牌号',
				name : 'vehicleNo',
				width : 100,
				sortable : true,
				align : 'center'
			},{
				display : 'VIN码',
				name : 'vehicleVin',
				width : 120,
				sortable : true,
				align : 'center',
				toggle : false
			},  {
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
				width : 150,
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
				width : 150,
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
				display : '车辆来源',
				name : 'originCode',
				width : 100,
				sortable : true,
				align : 'center'
			},{
				display : '首次注册时间',
				name : 'regUtc',
				width : 100,
				sortable : true,
				align : 'center',
				render : function(row) {
					if (null != row.regUtc && undefined != row.regUtc && "" != row.regUtc) {
						return utc2Date(row.regUtc);
					} else {
						return "--";
					}
				}
			},{
				display : '时间段内上线率',
				name : 'onlineRate',
				width : 100,
				sortable : true,
				align : 'center',
				render : function(row) {
					if (row.onlineRate) {
						return row.onlineRate;
						//var floatValue = parseFloat(row.onlineRate)*100;
						//return floatValue.toFixed(2)+"%"; 改为后台处理
					} else {
						return "无";
					}
				}
			}
			/*}, {
				display : '操作日期',
				name : '',
				width : 100,
				sortable : true,
				align : 'center'
				render : function(row) {
					if (null != row.logUtc && undefined != row.logUtc && "" != row.logUtc) {
						return utcToDate(row.logUtc);
					} else {
						return "未知";
					}
				}*/
			 ],
			showCheckbox : false,
			sortName : 'vehicleNo',
			url : 'operationmanagement/queryVehicleLineRateCount.action',// 数据请求地址
			exportAction:'operationmanagement/exportExcelDataVehiclelinerate.action',
			data:{},
			showTitle : false,
			pageSize : 10,
			pageSizeOptions : [ 10, 20, 30, 40 ],
			height : tvdiHeight,
			width : "99.8%",
			autoLoad : true,
			gridDIV : "vehicleOnlineCountGrid",
			contentDiv : "vehicleOnlineCountContent",
			// 填充数据的tableid
			tableId : 'vehicleOnlineCountGrid',
			// 查询条件formid
			searchFormId : 'vehicleOnlineCountSearchForm',
			mainContain : "vehicleOnlineCountContent",

			container : "", // 包含这个form的对象用来loadhtml
			loadHtml : "",// 增加页面使用的html
			formId : '',// 页面中使用的form的ID 用来在新增和修改的时候 submitId : ''
			closeId : '',// 重置按钮的id,
			addURL : '', // 添加的时候使用的url
			detailURL : '',// 获得详情方法 在修改前要调用
			updateURL : '',// 修改的时候使用的url
			editModel : "",
			Buttons : [ {//导出
				id : "vehiclelinerateExportExcel",
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
				var dmsgSrtimeStart = $("#vehicleOnlineCountSearchForm").find("input[name='startTime']").val();
				
				var dmsgSrtimeEnd = $("#vehicleOnlineCountSearchForm").find("input[name='endTime']").val();
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
				}
				var nowDate = getnowTime();
				if (dmsgSrtimeStart > nowDate) {
					$.ligerDialog.warn("开始时间不能大于当前时间！", "提示");
					return false;
				}
				
				$("#tvdiSelectParams").empty();
				$("#tvdiSelectParams").append(selectParams);
				return true;
			}
		};
		obj.grid = new ctfoGrid(options);
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
		var opEntId = $("#vehicleOnlineCountOrgId");
		opNodeName.empty();
		opEntId.empty();
		opEntId.val(node.data.id);
		opNodeName.append(name.length > 12 ? name.substring(0, 10) + "..." : name);
		opNodeName.attr("title", name);
		// this.operateLogSubmit(node.data.id);
		if(node.data.t=="1"){
			opEntId.attr("name","requestParam.equal.cId");
		}else{
			opEntId.attr("name","requestParam.equal.tId");
		}
	},
	setToday:function(){
		var obj = this;
		
		var nowDate = getnowTime();
		
		// 时间
		 $("#vehicleOnlineCountSearchForm").find("input[name='startTime']").val(nowDate);
		
		$("#vehicleOnlineCountSearchForm").find("input[name='endTime']").val(nowDate);
	},
	onResize : function() {
		var obj = this;
		if(obj.gridManager){
			obj.gridManager.setHeight(obj.getGridHeight());
		}
	},
	// 增加的权限验证
	authentication : function() {
		this.EMP_BTN = checkFunction("FG_MEMU_STATIC_STATIC_UPTIME_EMP");// 导出
		if (!this.EMP_BTN) {
			$("#vehiclelinerateExportExcel").remove();
		}
	},
	changeQueryType: function(strFlag){
		var obj = this;
 		//清空列表页面
 		switch (strFlag) {
 		//单车查询
 	    case '1':
 	    	$("#tab1").attr("class","h");
 	    	$("#tab2").attr("class","");
            $("#vehicleNoDiv").show();
            $("#vehicleVinDiv").show();
            $("#searchTypeId").val("1");
            
            //单车查询的列
            var sigleVehicleColumn = [{
				display : '车牌号',
				name : 'vehicleNo',
				width : 100,
				sortable : true,
				align : 'center'
			},{
				display : 'VIN码',
				name : 'vehicleVin',
				width : 120,
				sortable : true,
				align : 'center',
				toggle : false
			},  {
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
				width : 150,
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
				width : 150,
				sortable : true,
				align : 'center',
				render : function(row) {
					if (null != row.endTime && undefined != row.endTime && "" != row.endTime) {
						return utc2Date(row.endTime);
					} else {
						return "--";
					}
				}
			},{
				display : '车辆来源',
				name : 'originCode',
				width : 150,
				sortable : true,
				align : 'center'
			},{
				display : '首次注册时间',
				name : 'regUtc',
				width : 100,
				sortable : true,
				align : 'center',
				render : function(row) {
					if (null != row.regUtc && undefined != row.regUtc && "" != row.regUtc) {
						return utc2Date(row.regUtc);
					} else {
						return "--";
					}
				}
			}, {
				display : '时间段内上线率',
				name : 'onlineRate',
				width : 100,
				sortable : true,
				align : 'center',
				render : function(row) {
					if (row.onlineRate) {
						return row.onlineRate;
					} else {
						return "无";
					}
				}
			} ];

            
           //重新加载列
           //obj.grid.realGrid.reloadColumn(sigleVehicleColumn);
           obj.grid.gridManager.setOptions({'columns' : sigleVehicleColumn});
            
            
            
            //清除数据
            $("#vehicleOnlineCountGrid").find(".l-grid-row,.l-grid-detailpanel,.l-grid-totalsummary").remove();
			var panelBar= $("#vehicleOnlineCountGrid").find(".l-panel-bar:eq(0)");
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
 	    	$("#tab1").attr("class","");
 	    	$("#tab2").attr("class","h");
 	    	$("#vehicleNoDiv").hide();
            $("#vehicleVinDiv").hide();
            $("#searchTypeId").val("2");
            
          //分组查询的列
            //modify by tangfeng 修改车队名称的name:entNamep改为corpName 2012-09-15
            var groupVehicleColumn = [{
				display : '企业名称',
				name : 'corpName',
				width : 180,
				sortable : true,
				align : 'center'
			},{
				display : '车队名称',
				name : 'teamName',
				width : 180,
				sortable : true,
				align : 'center'
			},{
				display : '分组上线车辆数',
				name : 'onlineVehicleCount',
				type:'int',
				width : 100,
				sortable : true,
				align : 'center'
			},{
				display : '分组车辆总数',
				name : 'totalVehicleCount',
				type:'int',
				width : 100,
				sortable : true,
				align : 'center'
			},{
				display : '开始时间',
				name : 'startTime',
				width : 150,
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
				width : 150,
				sortable : true,
				align : 'center',
				render : function(row) {
					if (null != row.endTime && undefined != row.endTime && "" != row.endTime) {
						return utc2Date(row.endTime);
					} else {
						return "--";
					}
				}
			},
//delete by tangfeng 	车辆来源没有意义,去掉	  2012-11-20			
//			{
//				display : '车辆来源',
//				name : 'originCode',
//				width : 100,
//				sortable : true,
//				align : 'center'
//			},
//delete by tangfeng 	首次注册时间没有意义,去掉	  2012-11-09
//			{
//				display : '首次注册时间',
//				name : 'regUtc',
//				width : 100,
//				sortable : true,
//				align : 'center',
//				render : function(row) {
//					if (null != row.regUtc && undefined != row.regUtc && "" != row.regUtc) {
//						return utc2Date(row.regUtc);
//					} else {
//						return "--";
//					}
//				}
//			},
			{
				display : '上线率',
				name : 'onlineRate',
				width : 100,
				sortable : true,
				align : 'center',
				render : function(row) {
					if (row.onlineRate) {
						return row.onlineRate;
					} else {
						return "无";
					}
				}
			} ];

            
            //重新加载列
            //obj.grid.realGrid.reloadColumn(groupVehicleColumn);
            obj.grid.gridManager.setOptions({'columns' : groupVehicleColumn});
            
            
            //清除数据
            $("#vehicleOnlineCountGrid").find(".l-grid-row,.l-grid-detailpanel,.l-grid-totalsummary").remove();
			var panelBar= $("#vehicleOnlineCountGrid").find(".l-panel-bar:eq(0)");
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
var vehicleOnlineCountObj = new VehicleOnlineCountObj();
$(function() {
	vehicleOnlineCountObj.tvdiTree();
	vehicleOnlineCountObj.tvdiGrid();
	vehicleOnlineCountObj.setToday();
	vehicleOnlineCountObj.authentication();
	//vehicleOnlineCountObj.changeQueryType(vehicleOnlineCountObj);
	
	//runManager.addChildList(vehicleOnlineCountObj);
	//runManager.showObj = vehicleOnlineCountObj;
	KCPT.onresizeObj = vehicleOnlineCountObj;

	var name = (KCPT.root.leftTree.loadTreeSelectedData.data.text != null) ? KCPT.root.leftTree.loadTreeSelectedData.data.text : KCPT.user.entName;
	var opNodeName = $("#vehicleOnlineCountOrgName");
	var opEntId = $("#vehicleOnlineCountOrgId");
	opNodeName.empty();
	opEntId.empty();
	opNodeName.append(name.length > 12 ? name.substring(0, 10) + "..." : name);
	opNodeName.attr("title", name);
	opEntId.val(((KCPT.root.leftTree.loadTreeSelectedData.data.id != null) ? KCPT.root.leftTree.loadTreeSelectedData.data.id : KCPT.user.entId));
	opEntId.attr("name","requestParam.equal.cId");
});
