var gridListForIllOperating = function() {
	this.version = "create by liujie in 2012.05.28";
	this.height = KCPT.root.getCenterSize().height;
	this.titleHeight = $("#searchFormForIllOperating").height();
	this.reportId = "illOperating";
	this.summaryChartTitleLeft ="告警分类统计（合计）";
	this.summaryChartTitleRight ="车辆告警统计次数排名(前5名-后5名)";
	this.totalChartTitleLeft = "告警分类统计(汇总)";
	this.totalChartTitleRight = "告警分类统计(汇总)";
	this.monthChartTitleLeft = "告警分类统计(合计)";
	this.monthChartTitleRight = "告警分类统计趋势(合计)";
	this.monthCharTitleOnlyLeft = "告警分类统计(月)";
	this.monthCharTitleOnlyRight = "告警分类统计趋势(月)";
	this.dayChartTitleLeft = "告警分类统计(合计)";
	this.dayChartTitleRight = "告警分类统计趋势(合计)";
	this.dayChartTitleOnlyLeft = "告警分类统计(日)";
	this.dayChartTitleOnlyRight = "告警分类统计趋势(日)";
	this.summaryDatasIo = {"Rows":[],"Total":"0"}; //当grid数据为空时，合计的json数据
	this.loadOne = 0;  //默认进页面参数
};

gridListForIllOperating.prototype = {
		ivdiTree : function() {// 初始化组织结构Tree
			var obj = this;
			obj.leftTree = KCPT.root.leftTree;
		},
	//初始化页面
	onResize : function() {
		var obj = this;

		var center = getHeightAndWidth();
		if (obj.gridManager) {
 			obj.gridManager.setHeight(center.height - 271);
 			$("#resultTableDivForIllOperating div.l-grid2").width(center.width - 50);
		}
	},
	getGridHeight : function(){
		var center = getHeightAndWidth();
		return center.height-471;
	},
	//初始grid列表
	init : function(longitude) {   //longitude:主页面中tab面签层级
		var obj = this;
		//计算gird所需要的高度
		var gridHeight=obj.getGridHeight();
		if(gridHeight < 300){
			gridHeight = 300;
		}
		var options = {
				columns : [
				 {
					display : '组织',
					name : 'corpName',
					order : '1',
					width : 130,
					align : 'center',
					resizable:false,
					frozen : true,
					render : function(row) {
						return "<a title=\""+row.corpName+"\">"+row.corpName+"</a>";
					},
					totalSummary : {
						render : function(column, cell) {
							return '<a href=\"javascript:void(0)\" onclick=\"javascript:gridListForIllOperating.loadSummayDataToChart()\" > <div class="sumAllFromDatabaseStyle">合计</div></a>';
						},
						align : 'center'
					}
				},{
					display : '车队',
					name : 'teamName',
					order : '1',
					width : 80,
					align : 'center',
					resizable:false,
					frozen : true,
					totalSummary : {
						render : function(column, cell) {
							return '<a href=\"javascript:void(0)\" onclick=\"javascript:gridListForIllOperating.loadSummayDataToChart()\" ><div class="sumAllFromDatabaseStyle">--</div></a>';
						},
						align : 'center'
					}
				},{
					display : '车牌号',
					name : 'vehicleNo',
					order : '1',
					width : 70,
					align : 'center',
					resizable:false,
					frozen : true,
					totalSummary : {
						render : function(column, cell) {
							return '<a href=\"javascript:void(0)\" onclick=\"javascript:gridListForIllOperating.loadSummayDataToChart()\" ><div class="sumAllFromDatabaseStyle">--</div></a>';
						},
						align : 'center'
					}
				},{
					display : '日期',
					name : 'statDateStr',
					order : '1',
					width : 70,
					align : 'center',
					resizable:false,
					frozen : true,
					totalSummary : {
						render : function(column, cell) {
							return '<a href=\"javascript:void(0)\" onclick=\"javascript:gridListForIllOperating.loadSummayDataToChart()\" ><div class="sumAllFromDatabaseStyle">--</div></a>';
						},
						align : 'center'
					}
				},{
					display : '月份',
					name : 'statDate',
					order : '1',
					width : 70,
					align : 'center',
					resizable:false,
					frozen : true,
					render : function(row) {
						return row.statYear + "-" + row.statMonth;
					},
					totalSummary : {
						render : function(column, cell) {
							return '<a href=\"javascript:void(0)\" onclick=\"javascript:gridListForIllOperating.loadSummayDataToChart()\" ><div class="sumAllFromDatabaseStyle">--</div></a>';
						},
						align : 'center'
					}
				},{
					display : '自编号',
					name : 'vid',
					width : 70,
					showType :'hidden',
					align : 'center',
					resizable:false,
					totalSummary : {
						render : function(column, cell) {
							return '<div class="sumAllFromDatabaseStyle">--</div>';
						},
						align : 'center'
					}
				},{
					display : 'VIN码',
					name : 'vinCode',
					width : 120,
					showType :'hidden',
					align : 'center',
					resizable:false,
					totalSummary : {
						render : function(column, cell) {
							return '<div class="sumAllFromDatabaseStyle">--</div>';
						},
						align : 'center'
					}
				}
				/*,{
					display : '车型',
					name : 'vehicleType',
					width : 120,
					showType :'hidden',
					align : 'center',
					resizable:false,
					totalSummary : {
						render : function(column, cell) {
							return '<div class="sumAllFromDatabaseStyle">--</div>';
						},
						align : 'center'
					},
					render : function(row) {
						if(row.vehicleType == "") {
							return "--";
						}else {
							return row.vehicleType;
						}
					}
				}*/
				,{
					display : '夜间非法运营',
					name : 'illegalRunSum',
					width : 120,
					align : 'center',
					resizable:false,
					totalSummary : {
						render : function(column, cell) {
							return '<a href=\"javascript:void(0)\" onclick=\"javascript:gridListForIllOperating.loadSummayDataToChart()\" > <div class="sumAllFromDatabaseStyle">'+FilterData2(gridListForIllOperating.summaryDatasIo.Rows[0].illegalRunSum,false)+'</div></a>';
						},
						align : 'center'
					},
					render : function(row) {
						return "<a title=\"点击查看详细信息 \" href=\"javascript:void(0)\" onclick=\"javascript:gridListForIllOperating.showAlarmDetailPop('"
								+ row.illegalRunSum
								+ "','夜间非法运营','230','"+row.corpId+"','"+row.vid+"','"+row.teamId+"','"+ row.statYear+"','"+ row.statMonth+"','"+ row.statDate
								+ "')\">"
								+ "<span>"
								+ FilterData2(
										row.illegalRunSum,
										false) + "</span>";
						+"</a>";
					}
				},{
					display : '非法点火',
					name : 'illegalAccOnSum',
					width : 100,
					align : 'center',
					resizable:false,
					totalSummary : {
						render : function(column, cell) {
							return '<a href=\"javascript:void(0)\" onclick=\"javascript:gridListForIllOperating.loadSummayDataToChart()\" > <div class="sumAllFromDatabaseStyle">'+FilterData2(gridListForIllOperating.summaryDatasIo.Rows[0].illegalAccOnSum,false)+'</div></a>';
						},
						align : 'center'
					},
					render : function(row) {
						return "<a title=\"点击查看详细信息 \" href=\"javascript:void(0)\" onclick=\"javascript:gridListForIllOperating.showAlarmDetailPop('"
								+ row.illegalAccOnSum
								+ "','非法点火','27','"+row.corpId+"','"+row.vid+"','"+row.teamId+"','"+ row.statYear+"','"+ row.statMonth+"','"+ row.statDate
								+ "')\">"
								+ "<span>"
								+ FilterData2(
										row.illegalAccOnSum,
										false) + "</span>";
						+"</a>";
					}
				},{
					display : '进出区域',
					name : 'inoutAreaSum',
					width : 100,
					align : 'center',
					resizable:false,
					totalSummary : {
						render : function(column, cell) {
							return '<a href=\"javascript:void(0)\" onclick=\"javascript:gridListForIllOperating.loadSummayDataToChart()\" > <div class="sumAllFromDatabaseStyle">'+FilterData2(gridListForIllOperating.summaryDatasIo.Rows[0].inoutAreaSum,false)+'</div></a>';
						},
						align : 'center'
					},
					render : function(row) {
						return "<a title=\"点击查看详细信息 \" href=\"javascript:void(0)\" onclick=\"javascript:gridListForIllOperating.showAlarmDetailPop('"
								+ row.inoutAreaSum
								+ "','进出区域','20','"+row.corpId+"','"+row.vid+"','"+row.teamId+"','"+ row.statYear+"','"+ row.statMonth+"','"+ row.statDate
								+ "')\">"
								+ "<span>"
								+ FilterData2(
										row.inoutAreaSum,
										false) + "</span>";
						+"</a>";
					}
				},{
					display : '进出线路',
					name : 'inoutLineSum',
					width : 100,
					align : 'center',
					resizable:false,
					totalSummary : {
						render : function(column, cell) {
							return '<a href=\"javascript:void(0)\" onclick=\"javascript:gridListForIllOperating.loadSummayDataToChart()\" > <div class="sumAllFromDatabaseStyle">'+FilterData2(gridListForIllOperating.summaryDatasIo.Rows[0].inoutLineSum,false)+'</div></a>';
						},
						align : 'center'
					},
					render : function(row) {
						return "<a title=\"点击查看详细信息 \" href=\"javascript:void(0)\" onclick=\"javascript:gridListForIllOperating.showAlarmDetailPop('"
								+ row.inoutLineSum
								+ "','进出线路','21','"+row.corpId+"','"+row.vid+"','"+row.teamId+"','"+ row.statYear+"','"+ row.statMonth+"','"+ row.statDate
								+ "')\">"
								+ "<span>"
								+ FilterData2(
										row.inoutLineSum,
										false) + "</span>";
						+"</a>";
					}
				},{
					display : '违规开门',
					name : 'routeRunSum',
					width : 105,
					align : 'center',
					resizable:false,
					totalSummary : {
						render : function(column, cell) {
							return '<a href=\"javascript:void(0)\" onclick=\"javascript:gridListForIllOperating.loadSummayDataToChart()\" > <div class="sumAllFromDatabaseStyle">'+FilterData2(gridListForIllOperating.summaryDatasIo.Rows[0].routeRunSum,false)+'</div></a>';
						},
						align : 'center'
					},
					render : function(row) {
						return "<a title=\"点击查看详细信息 \" href=\"javascript:void(0)\" onclick=\"javascript:gridListForIllOperating.showAlarmDetailPop('"
								+ row.routeRunSum
								+ "','违规开门','234','"+row.corpId+"','"+row.vid+"','"+row.teamId+"','"+ row.statYear+"','"+ row.statMonth+"','"+ row.statDate
								+ "')\">"
								+ "<span>"
								+ FilterData2(
										row.routeRunSum,
										false) + "</span>";
						+"</a>";
					}
				},{
					display : '偏航',
					name : 'offLineSum',
					width : 60,
					align : 'center',
					resizable:false,
					totalSummary : {
						render : function(column, cell) {
							return '<a href=\"javascript:void(0)\" onclick=\"javascript:gridListForIllOperating.loadSummayDataToChart()\" > <div class="sumAllFromDatabaseStyle">'+FilterData2(gridListForIllOperating.summaryDatasIo.Rows[0].offLineSum,false)+'</div></a>';
						},
						align : 'center'
					},
					render : function(row) {
						return "<a title=\"点击查看详细信息 \" href=\"javascript:void(0)\" onclick=\"javascript:gridListForIllOperating.showAlarmDetailPop('"
								+ row.offLineSum
								+ "','偏航','23','"+row.corpId+"','"+row.vid+"','"+row.teamId+"','"+ row.statYear+"','"+ row.statMonth+"','"+ row.statDate
								+ "')\">"
								+ "<span>"
								+ FilterData2(
										row.offLineSum,
										false) + "</span>";
						+"</a>";
					}
				},
//				{
//					display : '路段行驶时间过长',
//					name : 'areaOpendoorSum',
//					width : 130,
//					align : 'center',
//					resizable:false,
//					totalSummary : {
//						render : function(column, cell) {
//							return '<a href=\"javascript:void(0)\" onclick=\"javascript:gridListForIllOperating.loadSummayDataToChart()\" > <div class="sumAllFromDatabaseStyle">'+FilterData2(gridListForIllOperating.summaryDatasIo.Rows[0].areaOpendoorSum,false)+'</div></a>';
//						},
//						align : 'center'
//					},
//					render : function(row) {
//						return "<a title=\"点击查看详细信息 \" href=\"javascript:void(0)\" onclick=\"javascript:gridListForIllOperating.showAlarmDetailPop('"
//								+ row.areaOpendoorSum
//								+ "','路段行驶时间过长','233','"+row.corpId+"','"+row.vid+"','"+row.teamId+"','"+ row.statYear+"','"+ row.statMonth+"','"+ row.statDate
//								+ "')\">"
//								+ "<span>"
//								+ FilterData2(
//										row.areaOpendoorSum,
//										false) + "</span>";
//						+"</a>";
//					}
//				},
				{
					display : '超速',
					name : 'overspeedAlarmSum',
					width : 72,
					align : 'center',
					resizable:false,
					totalSummary : {
						render : function(column, cell) {
							return '<a href=\"javascript:void(0)\" onclick=\"javascript:gridListForIllOperating.loadSummayDataToChart()\" > <div class="sumAllFromDatabaseStyle">'+FilterData2(gridListForIllOperating.summaryDatasIo.Rows[0].overspeedAlarmSum,false)+'</div></a>';
						},
						align : 'center'
					},
					render : function(row) {
						return "<a title=\"点击查看详细信息 \" href=\"javascript:void(0)\" onclick=\"javascript:gridListForIllOperating.showAlarmDetailPop('"
								+ row.overspeedAlarmSum
								+ "','超速','1','"+row.corpId+"','"+row.vid+"','"+row.teamId+"','"+ row.statYear+"','"+ row.statMonth+"','"+ row.statDate
								+ "')\">"
								+ "<span>"
								+ FilterData2(
										row.overspeedAlarmSum,
										false) + "</span>";
						+"</a>";
					}
				},
//				{
//					display : '超员',
//					name : 'overmanSum',
//					width : 72,
//					align : 'center',
//					resizable:false,
//					totalSummary : {
//						render : function(column, cell) {
//							return '<a href=\"javascript:void(0)\" onclick=\"javascript:gridListForIllOperating.loadSummayDataToChart()\" > <div class="sumAllFromDatabaseStyle">'+FilterData2(gridListForIllOperating.summaryDatasIo.Rows[0].overmanSum,false)+'</div></a>';
//						},
//						align : 'center'
//					},
//					render : function(row) {
//						return "<a title=\"点击查看详细信息 \" href=\"javascript:void(0)\" onclick=\"javascript:gridListForIllOperating.showAlarmDetailPop('"
//								+ row.overmanSum
//								+ "','超员','231','"+row.corpId+"','"+row.vid+"','"+row.teamId+"','"+ row.statYear+"','"+ row.statMonth+"','"+ row.statDate
//								+ "')\">"
//								+ "<span>"
//								+ FilterData2(
//										row.overmanSum,
//										false) + "</span>";
//						+"</a>";
//					}
//				},
				{
					display : '疲劳驾驶',
					name : 'fatigueAlarmSum',
					width : 100,
					align : 'center',
					resizable:false,
					totalSummary : {
						render : function(column, cell) {
							return '<a  href=\"javascript:void(0)\" onclick=\"javascript:gridListForIllOperating.loadSummayDataToChart()\" > <div class="sumAllFromDatabaseStyle">'+FilterData2(gridListForIllOperating.summaryDatasIo.Rows[0].fatigueAlarmSum,false)+'</div></a>';
						},
						align : 'center'
					},
					render : function(row) {
						return "<a title=\"点击查看详细信息 \" href=\"javascript:void(0)\" onclick=\"javascript:gridListForIllOperating.showAlarmDetailPop('"
								+ row.fatigueAlarmSum
								+ "','疲劳驾驶','2','"+row.corpId+"','"+row.vid+"','"+row.teamId+"','"+ row.statYear+"','"+ row.statMonth+"','"+ row.statDate
								+ "')\">"
								+ "<span>"
								+ FilterData2(
										row.fatigueAlarmSum,
										false) + "</span>";
						+"</a>";
					}
				},{
					display : '合计',
					name : 'total',
					width : 60,
					align : 'center',
					frozen : false,
					resizable:false,
					totalSummary : {
						render : function(column, cell) {
							return '<div class="sumAllFromDatabaseStyle">--</div>';
						},
						align : 'center'
					}
				},{
					display : '排名',
					name : 'rank',
					width : 60,
					align : 'center',
					frozen : false,
					resizable:false,
					totalSummary : {
						render : function(column, cell) {
							return '<div class="sumAllFromDatabaseStyle">--</div>';
						},
						align : 'center'
					}
				}],
				mainContain : "illOperatingListGridArea",
				exportAction : "illOperating/exportStatInfo.action",
				showCheckbox : false,
				showTableToggleBtn : false,
				title : '',
				url : 'illOperating/queryDataInfo.action',
				showTitle : false,
				pageSize : 30,
				width : '99.8%',
				height : gridHeight,
				reportId : "illOperating",
				autoLoad : false,
				allowHideColumn: false,
				rownumbers : true,
				tableId : 'resultTableDivForIllOperating',
				searchFormId : 'searchFormForIllOperating',
				onSelectRow : function(rowdata, rowindex, rowDomElement) {
					var titleArrTotal = [ obj.totalChartTitleLeft,
							obj.totalChartTitleRight ];
					var titleArrMonth = [ obj.monthCharTitleOnlyLeft,
							obj.monthCharTitleOnlyRight ];
					var titleArrDay = [ obj.dayChartTitleOnlyLeft,
							obj.dayChartTitleOnlyRight ];
					var chartsTitle = [];
					chartsTitle.push(titleArrTotal);
					chartsTitle.push(titleArrMonth);
					chartsTitle.push(titleArrDay);
					var statType =$("#statTypeForIllOperating").val();
					if(statType == 1) {
						ioReportChartHandle.getCurrentGridRow(rowdata, rowindex, rowDomElement);
					}else if(statType == 2) {
						gridListForIllOperating.loadDataToChart(rowdata, rowindex, rowDomElement);
					}else if(statType == 3) {
						gridListForIllOperating.loadDataToChart(rowdata, rowindex, rowDomElement);
					}
				},
				onAfterShowData : function() {
					var statType =$("#statTypeForIllOperating").val();
					if(statType !=1 ){
						setGridRowSpan("resultTableDivForIllOperating",2);
					 };
					 gridListForIllOperating.loadSummayDataToChart();
					 gridListForIllOperating.searchBottonEnable();
				},
				gridBeforeSubmit : function() {
					if($("#iOVids").val() == "" && $("#iOTeamIds").val()==""){
						$.ligerDialog.alert("请在左侧树中选择查询条件", "信息提示", 'warn');
						return false;
					}
					var vidarry = $("#iOVids").val().split(",");
					var teamarry = $("#iOTeamIds").val().split(",");
					if(teamarry.length>1000){
						$.ligerDialog.alert("左侧选中车队数不能大于1000", "信息提示", 'warn');
						return false;
					}
					if(vidarry.length>1000){
						$.ligerDialog.alert("左侧选中车牌号不能大于1000", "信息提示", 'warn');
						return false;
					}
					var ltude = $("#statTypeForIllOperating").val();
					var dayDateStart =  $("#startDateForIllOperatingTotal").val();
					var dayDateEnd   =  $("#endDateForIllOperatingTotal").val();
					var monthDateStart= $("#startDateForIllOperatingMonth").val();
					var monthDateEnd =  $("#endDateForIllOperatingMonth").val();
					if(dayDateStart ==null && dayDateEnd ==null && monthDateStart ==null && monthDateEnd ==null ){
						$.ligerDialog.alert("请选择查询时间", "信息提示", 'warn');
						return false;
					}
					var isToday=daysBetween(new Date().Format("yyyy-MM-dd"),dayDateEnd);
					var DayNumber=daysBetween(dayDateStart,dayDateEnd);
	                if(ltude==1 && dayDateStart !=null && dayDateEnd !=null  ){
	                	if(compareDays(dayDateStart,dayDateEnd)){
							$.ligerDialog.alert("结束时间不能少于开始时间", "信息提示",'warn');
							gridListForIllOperating.searchBottonEnable();
							return false;
						  }else{
							if((DayNumber > 99 && isToday!=0) || (isToday ==0 && DayNumber>100)){
								$.ligerDialog.alert("可选时间范围不能超过100天", "信息提示",'warn');
								gridListForIllOperating.searchBottonEnable();
								return false;
						   };
					  };
	                }
	                if(ltude==3 && dayDateStart !=null && dayDateEnd !=null  ){
	                	if(compareDays(dayDateStart,dayDateEnd)){
							$.ligerDialog.alert("结束时间不能少于开始时间", "信息提示",'warn');
							gridListForIllOperating.searchBottonEnable();
							return false;
						}else{
	 						if((DayNumber > 49 && isToday!=0) || (isToday ==0 && DayNumber>50)){
								$.ligerDialog.alert("可选时间范围不能超过50天", "信息提示",'warn');
								gridListForIllOperating.searchBottonEnable();
								return false;
							   };
					   };
	                };
	            	if(monthDateStart != "" && monthDateEnd != "" ){
	            		monthDateStart +="-01";
	            		monthDateEnd +="-01";
	     				var MonthNumber=daysBetween(monthDateStart,monthDateEnd);
						if(compareDays(monthDateStart,monthDateEnd)){
							$.ligerDialog.alert("结束月份不能少于开始月份", "信息提示",'warn');
							gridListForIllOperating.searchBottonEnable();
							return false;
						}else{
						 if(MonthNumber > 365){
							$.ligerDialog.alert("可选时间范围不能超过12个月", "信息提示",'warn');
							gridListForIllOperating.searchBottonEnable();
							return false;
						   };
					   };
	            	 };
					return true;
				}
		};
		//当是汇总表，月报表，日报表的时候的grid列情况
		if(longitude == 1) {
			options.columns.splice(3,2);
		}
		if(longitude == 2) {
			options.columns.splice(3,1);
			options.columns.splice(17,2);//隐藏合计，排名两列
		}
		if(longitude == 3) {
			options.columns.splice(4,1);  
			options.columns.splice(17,2);//隐藏合计，排名两列
		}
		
		if(KCPT.gridListForIllOperatingGrid == undefined || KCPT.gridListForIllOperatingGrid == null){
			obj.grid = new ctfoGrid(new customReport(options).options);
			KCPT.gridListForIllOperatingGrid = obj.grid;
		}else{
			if(KCPT.customColumns==null){
				customReport.prototype.getFreshCustomColumn(options);
			}
			KCPT.gridListForIllOperatingGrid.getGridManager().set("columns",customReport.prototype.changeColumnForGrid(options));
  		}
		obj.gridManager = $("#resultTableDivForIllOperating").ligerGetGridManager();
	},
	// 改变grid
	changeGrid : function(longitude) {
		var obj = this;
		obj.init(longitude);
 	},
 	// 点击自定义列按钮的相关操作
 	bindButtonEvent : function() {
 		  $("#customColumnIo").click(
 			function() {
 				$("#mainWorkArea").A_Window({
 					dragabId : 'mainWorkArea', // 可拖动的范围
 					id : 'customIoColumnDiv',
 					width : 450, // 宽度
 					height : 363,// 高度
 					load_fn : function() {
 						$("#closeCustomColumnDiv").click(function() {  //绑定关闭弹窗按钮的操作
 							$("#mainWorkArea").close_ALL_Window();
 							KCPT.customColumns=null;
 							gridListForIllOperating.changeGrid($("#statTypeForIllOperating").val());
 						 	$("#iOsearchForButton").trigger('click');   //刷新gird列表
 						});
 						$("#closeCustomColumnDiv2").click(function() {
 							$("#mainWorkArea").close_ALL_Window();
 						});
 					},
 					url : 'customReportColumn/findReportColumn.action?reportId='+gridListForIllOperating.reportId
 		       });
 			});
 	},
 	//获得选中树的节点信息，并赋值隐藏域
 	bindSubmitEvent : function() {
		var obj=this;
		var rows = obj.leftTree.GridManager.getCheckedRows();
		for( var i = 0; i < rows.length; i++){
			$("#iOTeamIds").val(rows[i].entId);
			$("#iOVids").val(rows[i].vid);
		}		
	},
	getIdxStr : function(idxs, increment) {
		var idx = Number(idxs);
		var iStr = "";
		if (idx < 9) {
			iStr = "0" + (idxs + increment);
		} else {
			iStr = "" + (idxs + increment);
		}
		return iStr;
	},
	//显示普通列图形
	loadDataToChart : function(rowdata, rowindex, rowDomElement){
		//月报和日报图形数据请求后台获取
		JAjax("illOperating/getXmlData.action",{
			"requestParam.equal.statType": $("#iOStatType").val(),
			"requestParam.equal.startDate" : $("#startDateForIllOperatingTotal").val(),
			"requestParam.equal.startDateMonth" : $("#startDateForIllOperatingMonth").val(),
			"requestParam.equal.endDate" : $("#endDateForIllOperatingTotal").val(),
			"requestParam.equal.endDateMonth" : $("#endDateForIllOperatingMonth").val(),
			"requestParam.equal.vids" : rowdata.vid,
			"requestParam.equal.rows" : 0
			}, "json",
			function(data) {
				ioReportChartHandle.getCurrentGridRow(rowdata, rowindex, rowDomElement,data.rightChartXml);
			}, null, true);
	},
	//根据相关数据，生成图表
	loadSummayDataToChart : function(){
		//清除选中行的样式
		var row = gridListForIllOperating.grid.gridManager.getSelectedRowObj();
		if(row != null) {
			var g = gridListForIllOperating.grid.gridManager;
			if($(row).hasClass("l-selected")) {
				g.unselect(g.getSelected());
			}
		}
		//获得选中的页签标示
	    var statType =$("#statTypeForIllOperating").val();
	 	if(statType == 1){
	 		if(gridListForIllOperating.summaryDatasIo.Rows[0]!= undefined){
	 			//生成饼图
	 			ioReportChartHandle.showTotleLeftChart(gridListForIllOperating.summaryDatasIo.Rows[0],"11");
	 			//生成柱图
	 			ioReportChartHandle.showTotleRightChart(gridListForIllOperating.summaryDatasIo.Rows,"11");
	 		}else {
	 			gridListForIllOperating.changeHtmlCss();  //处理没有数据时的图表显示
	 		}
	 	}else if(statType == 2) {
	 		if(gridListForIllOperating.summaryDatasIo.Rows[0]!= undefined){
	 			//生成饼图
	 			ioReportChartHandle.showTotleLeftChart(gridListForIllOperating.summaryDatasIo.Rows[0],"21");
	 			//生成线图
	 			ioReportChartHandle.showAllMonthAndDayRightChart(gridListForIllOperating.summaryDatasIo.Rows,"20");
	 		}else {
	 			gridListForIllOperating.changeHtmlCss();  //处理没有数据时的图表显示
	 		}
	 	}else if(statType == 3) {
	 		if(gridListForIllOperating.summaryDatasIo.Rows[0]!= undefined){
	 			//生成饼图
	 			ioReportChartHandle.showTotleLeftChart(gridListForIllOperating.summaryDatasIo.Rows[0],"21");
	 			//生成线图
	 			ioReportChartHandle.showAllMonthAndDayRightChart(gridListForIllOperating.summaryDatasIo.Rows,"30");
	 		}else {
	 			gridListForIllOperating.changeHtmlCss();  //处理没有数据时的图表显示
	 		}
	 	}
	},
	// 显示告警列表
	showAlarmDetailPop : function(times, alarmTypename, alarmType, corpId, vid, teamId , statYear, statMonth, statDate) {
		//阻止事件冒泡
		event.cancelBubble=true;
		var time = Number(times);
		if (time == 0) {
			$.ligerDialog.alert("告警次数为0，没有详情信息", "信息提示", 'warn');
		} else {
			var startDate='',
			endDate='';
			var dayDateStart =  $("#startDateForIllOperatingTotal").val();
			var dayDateEnd   =  $("#endDateForIllOperatingTotal").val();
			var statType =$("#statTypeForIllOperating").val();
			
			if(statType ==1){
				 if(dayDateStart !="" && dayDateEnd !="" ){
		 				startDate=dayDateStart;
						endDate  =dayDateEnd;
				  } 
			}
			if(statType ==2){
 				startDate=statYear+"-"+statMonth+"-01";;
				endDate=getMonthLastDay(statYear+"-"+statMonth); 
			}
			if(statType ==3){
	 			startDate=utcToDate(statDate);
				endDate=startDate;
			}
			
			var pvid='vid:'
				+vid
				+',entId:'
				+corpId
				+ ',alarmCode:'
				+ alarmType
				+ ',startDate:\''+startDate+'\',endDate:\''+endDate+'\'';
			
			if(teamId!=""){
 				pvid=pvid+',teamId:'+teamId	;
			}
			
			$("#mainWorkArea").A_Window(
					{
						dragabId : 'mainWorkArea', // 可拖动的范围
						id : 'illOperatingDetailPopDiv',
						width : 800, // 宽度
						height : 525,// 高度
						priv : pvid,
						load_fn : function() {
							$("#showIllOpAlarmName").html(alarmTypename);
							$("#showIllOpAlarmDetailsDivClose").click(
									function() {
										$("#mainWorkArea").close_ALL_Window();
									});
						},
						url : 'model/illoperating/showIllOpAlarmDetails.jsp'
			});
		}
	},
	//图表没有数据时，对图表显示区域的处理 
	changeHtmlCss : function() {
		$("#iOLeftChart").html('');
		$("#iOLeftChart").attr('style','background:url(images/global/no_data2.png) no-repeat; border:#aaccee 1px solid; width:450px; height:290px;');
		$("#iOLeftImg").removeClass("btnDisplay");
		$("#iOLeftImg").addClass("btnNone");
		$("#iORightChart").html('');
		$("#iORightChart").attr('style','background:url(images/global/no_data2.png) no-repeat; border:#aaccee 1px solid; width:450px; height:290px;');
		$("#iORightImg").removeClass("btnDisplay");
		$("#iORightImg").addClass("btnNone");
	},
	//隐藏搜索按钮
	searchBottonDisabled: function(){
		 $('#iOsearchForButton').attr('disabled',"true");
	     $("#iOsearchForButton").addClass('btn_inquires_disable');
		 $("#iOsearchForButton").removeClass('btn_inquires');
	},
	//搜索按钮可见
	searchBottonEnable:function(){
	    $('#iOsearchForButton').removeAttr("disabled");
		$("#iOsearchForButton").removeClass('btn_inquires_disable');
		$("#iOsearchForButton").addClass('btn_inquires');	
	},
	//默认进入页面时候的操作
	defaultEvent : function() {
		gridListForIllOperating.searchBottonEnable();
		//从后台获取统计信息
//		$.getJSON(
//				"illOperating/querySumDataInfo.action", 
//				{
//			"requestParam.equal.statType": $("#iOStatType").val(),
//			"requestParam.equal.startDate" : $("#startDateForIllOperatingTotal").val(),
//			"requestParam.equal.startDateMonth" : $("#startDateForIllOperatingMonth").val(),
//			"requestParam.equal.endDate" : $("#endDateForIllOperatingTotal").val(),
//			"requestParam.equal.endDateMonth" : $("#endDateForIllOperatingMonth").val(),
//			"requestParam.equal.vids" : $("#iOVids").val(),
//			"requestParam.equal.teamIds" : $("#iOTeamIds").val(),
//			"requestParam.equal.rows" : 0
//		}, function(data) {
//			gridListForIllOperating.summaryDatasIo=data;
//			$("#searchFormForIllOperating").submit();
//		});
//		gridListForIllOperating.changeGrid($("#iOStatType").val());
	}
};
//导出按钮的操作
$("#ioGridExport").click(function(){
	gridListForIllOperating.grid.exportExcel(1, 2);
});

//获取汇总数据
$("#iOsearchForButton").click(function(){
	gridListForIllOperating.searchBottonDisabled();
	//获得左侧树选中的车辆信息
	gridListForIllOperating.bindSubmitEvent();
	var vidarry = $("#iOVids").val().split(",");
	var teamarry = $("#iOTeamIds").val().split(",");
	if(teamarry.length>1000){
		KCPT.gridListForIllOperatingGrid.getGridManager().data="";
		if(KCPT.gridListForIllOperatingGrid.getGridManager().currentdata != undefined) {
			KCPT.gridListForIllOperatingGrid.getGridManager().remove();
		}
		gridListForIllOperating.changeGrid($("#statTypeForIllOperating").val());
		gridListForIllOperating.searchBottonEnable();
		$.ligerDialog.alert("左侧选中车队数不能大于1000", "信息提示", 'warn');
		return ;
	}
	if(vidarry.length>1000){
		KCPT.gridListForIllOperatingGrid.getGridManager().data="";
		if(KCPT.gridListForIllOperatingGrid.getGridManager().currentdata != undefined) {
			KCPT.gridListForIllOperatingGrid.getGridManager().remove();
		}
		gridListForIllOperating.changeGrid($("#statTypeForIllOperating").val());
		gridListForIllOperating.searchBottonEnable();
		$.ligerDialog.alert("左侧选中车牌号不能大于1000", "信息提示", 'warn');
		return ;
	}
	if($("#iOVids").val() == "" && $("#iOTeamIds").val()=="") {
		KCPT.gridListForIllOperatingGrid.getGridManager().data="";
		if(KCPT.gridListForIllOperatingGrid.getGridManager().currentdata != undefined) {
			KCPT.gridListForIllOperatingGrid.getGridManager().remove();
		}
		gridListForIllOperating.changeGrid($("#statTypeForIllOperating").val());
		gridListForIllOperating.searchBottonEnable();
		$.ligerDialog.alert("请在左侧树中选择查询条件", "信息提示", 'warn');
		return ;
	}
	//从后台获取统计信息
	$.getJSON("illOperating/querySumDataInfo.action", {
		"requestParam.equal.statType": $("#iOStatType").val(),
		"requestParam.equal.startDate" : $("#startDateForIllOperatingTotal").val(),
		"requestParam.equal.startDateMonth" : $("#startDateForIllOperatingMonth").val(),
		"requestParam.equal.endDate" : $("#endDateForIllOperatingTotal").val(),
		"requestParam.equal.endDateMonth" : $("#endDateForIllOperatingMonth").val(),
		"requestParam.equal.vids" : $("#iOVids").val(),
		"requestParam.equal.teamIds" : $("#iOTeamIds").val(),
		"requestParam.equal.rows" : 0
	}, function(data) {
		gridListForIllOperating.summaryDatasIo=data;
		$("#searchFormForIllOperating").submit();
	});
	gridListForIllOperating.changeGrid($("#iOStatType").val());
	
});

var gridListForIllOperating = new gridListForIllOperating();
$(document).ready(function() {
	gridListForIllOperating.ivdiTree();
	gridListForIllOperating.bindButtonEvent();
	KCPT.gridListForIllOperatingGrid = null;
//	runManager.addChildList(gridListForIllOperating);
//	runManager.showObj = gridListForIllOperating;
	gridListForIllOperating.changeGrid($("#statTypeForIllOperating").val());//grid加载
	gridListForIllOperating.defaultEvent();
});

