var gridListForAlarmStatistics = function() {
	this.version = "create by cuisong in 2011.10.14";
	this.height = getHeightAndWidth().height;
	this.titleHeight = $("#searchFormForAlarmStatistics").height();
	this.reportId = "alarmStatistic";
	this.summaryChartTitleLeft ="告警统计合计(比例图)";
	this.summaryChartTitleRight ="告警统计合计";
	this.totalChartTitleLeft = "告警统计比例(汇总)";
	this.totalChartTitleRight = "告警统计(汇总)";
	this.monthChartTitleLeft = "告警统计比例(月)";
	this.monthChartTitleRight = "告警统计趋势(月)";
	this.dayChartTitleLeft = "告警统计比例(日)";
	this.dayChartTitleRight = "告警统计(日)";
	this.chartsTitle = [[[this.totalChartTitleLeft],[this.totalChartTitleRight]],
						[[this.monthChartTitleLeft],[this.monthChartTitleRight]],
						[[this.dayChartTitleLeft],[this.dayChartTitleRight]],
	                    [[this.summaryChartTitleLeft],[this.summaryChartTitleRight]]];
	this.isFullChart=true;
	this.summaryDatas={"Rows":[],"Total":"0"};
};
gridListForAlarmStatistics.prototype = {
	onResize : function() {
		var obj = this;
		var height1 = getHeightAndWidth().height;
		if (obj.gridManager) {
 			obj.gridManager.setHeight(height1-this.titleHeight-460);
 		}
	},

	init : function(latitude, longitude) {
		var obj = this;
		if (latitude == undefined) {
			latitude = 1;
		}
		;
		if (longitude == undefined) {
			longitude = 1;
		}
		var h = obj.height-this.titleHeight-460;
		if(h < 300){
			h = 300;
		}
		var options = {
			columns : [
					{
						display : '组织',
						name : 'corpName',
						order : '1',
						width : 140,
						align : 'center',
						resizable:false,
						frozen : true,
						render : function(row) {
							return "<div title=\""+row.corpName+"\">"+row.corpName+"</div>";
						},
						totalSummary : {
							render : function(column, cell) {
								return '<div class="sumAllFromDatabaseStyle"><a  href=\"javascript:void(0)\" onclick=\"javascript:gridListForAlarmStatistics.loadSummayDataToChart()\" >合计</a></div>';
							},
							align : 'center'
						}
					},
					{
						display : '车辆数',
						name : 'countVehicle',
						order : '1',
						width : 70,
						align : 'center',
						frozen : true,
						resizable:false,
						totalSummary : {
							render : function(column, cell) {
								return '<div class="sumAllFromDatabaseStyle"><a  href=\"javascript:void(0)\" onclick=\"javascript:gridListForAlarmStatistics.loadSummayDataToChart()\" >'+FilterData2(gridListForAlarmStatistics.summaryDatas.Rows[0].countVehicle,false)+'</a></div>';
							},
							align : 'center'
						}
					},
					{
						display : '年份',
						name : 'statYear',
						order : '1',
						width : 70,
						align : 'center',
						frozen : true,
						resizable:false,
						totalSummary : {
							render : function(column, cell) {
								return '<div class="sumAllFromDatabaseStyle"><a  href=\"javascript:void(0)\" onclick=\"javascript:gridListForAlarmStatistics.loadSummayDataToChart()\" >--</a></div>';
							},
							align : 'center'
						}
					},
					{
						display : '月份',
						name : 'statMonth',
						order : '1',
						width : 70,
						align : 'center',
						frozen : true,
						resizable:false,
						totalSummary : {
							render : function(column, cell) {
								return '<div class="sumAllFromDatabaseStyle"><a  href=\"javascript:void(0)\" onclick=\"javascript:gridListForAlarmStatistics.loadSummayDataToChart()\" >--</a></div>';
							},
							align : 'center'
						}
					},
					{
						display : '车队',
						name : 'teamName',
						order : '1',
						width : 70,
						align : 'center',
						frozen : true,
						resizable:false,
						render : function(row) {
							return "<div title=\""+row.teamName+"\">"+row.teamName+"</div>";
						},
						totalSummary : {
							render : function(column, cell) {
								return '<div class="sumAllFromDatabaseStyle"><a  href=\"javascript:void(0)\" onclick=\"javascript:gridListForAlarmStatistics.loadSummayDataToChart()\" >--</a></div>';
							},
							align : 'center'
						}
					},
					{
						display : '线路',
						name : 'lineName',
						order : '1',
						width : 70,
						align : 'center',
						frozen : true,
						resizable:false,
						render : function(row) {
							return "<div title=\""+row.lineName+"\">"+row.lineName+"</div>";
						},
						totalSummary : {
							render : function(column, cell) {
								return '<div class="sumAllFromDatabaseStyle"><a  href=\"javascript:void(0)\" onclick=\"javascript:gridListForAlarmStatistics.loadSummayDataToChart()\" >--</a></div>';
							},
							align : 'center'
						}
					},
					{
						display : '车牌号',
						name : 'vehicleNo',
						order : '1',
						width : 70,
						frozen : true,
						resizable:false,
						totalSummary : {
							render : function(column, cell) {
								return '<div class="sumAllFromDatabaseStyle"><a  href=\"javascript:void(0)\" onclick=\"javascript:gridListForAlarmStatistics.loadSummayDataToChart()\" >--</a></div>';
							},
							align : 'center'
						}
					},
					{
						display : 'VIN码',
						name : 'vinCode',
						order : '1',
						width : 130,
						align : 'center',
						frozen : true,
						totalSummary : {
							render : function(column, cell) {
								return '<div class="sumAllFromDatabaseStyle"><a  href=\"javascript:void(0)\" onclick=\"javascript:gridListForAlarmStatistics.loadSummayDataToChart()\" >--</a></div>';
							},
							align : 'center'
						}
					},{
						display : '日期',
						name : 'statDateStr',
						order : '1',
						width : 70,
						align : 'center',
						frozen : true,
						resizable:false,
						totalSummary : {
							render : function(column, cell) {
								return '<div class="sumAllFromDatabaseStyle"><a  href=\"javascript:void(0)\" onclick=\"javascript:gridListForAlarmStatistics.loadSummayDataToChart()\" >--</a></div>';
							},
							align : 'center'
						}
					},{
						display : '违规驾驶',
						name : 'a001Num',
						columns : [
								{
									display : '次数',
									name : 'a001Num',
									resizable:false,
									width : 70,
									align : 'center',
									render : function(row) {
										return "<a title=\"点击查看详细信息 \" href=\"javascript:void(0)\" onclick=\"javascript:gridListForAlarmStatistics.showAlarmDetailPop('"
												+ row.a001Num
												+ "','违规驾驶','A001','"
												+ row.corpId+"','"+row.vid+"','"+ row.lineId+"','"+row.teamId+"','"+ row.statYear+"','"+ row.statMonth+"','"+ row.statDateStr

												+ "')\">"
												+ "<span>"
												+ FilterData2(
														row.a001Num,
														false) + "</span>";
										+"</a>";
									},
									totalSummary : {
										render : function(column, cell) {
											return '<div class="sumAllFromDatabaseStyle"><a  href=\"javascript:void(0)\" onclick=\"javascript:gridListForAlarmStatistics.loadSummayDataToChart()\" >'+FilterData2(gridListForAlarmStatistics.summaryDatas.Rows[0].a001Num,false)+'</a></div>';
										},
										align : 'center'
									}
								},
								{
									display : '时长',
									name : 'a001Time',
									width : 120,
									align : 'center',
									resizable:false,
									render : function(row) {
										return "<span>"+ FilterData2(row.a001Time,true) + "</span>";
									},
									totalSummary : {
										render : function(column, cell) {
											return '<div class="sumAllFromDatabaseStyle"><a  href=\"javascript:void(0)\" onclick=\"javascript:gridListForAlarmStatistics.loadSummayDataToChart()\" >'+
											FilterData2(gridListForAlarmStatistics.summaryDatas.Rows[0].a001Time,true)
											+'</a></div>';
										},
										align : 'center'
									}
								} ]
					},{
						display : '电子围栏',
						name : 'a002Num',
						columns : [
								{
									display : '次数',
									name : 'a002Num',
									resizable:false,
									width : 70,
									align : 'center',
									render : function(row) {
										return "<a title=\"点击查看详细信息 \" href=\"javascript:void(0)\" onclick=\"javascript:gridListForAlarmStatistics.showAlarmDetailPop('"
												+ row.a002Num
												+ "','电子围栏','A002','"
												+ row.corpId+"','"+row.vid+"','"+ row.lineId+"','"+row.teamId+"','"+ row.statYear+"','"+ row.statMonth+"','"+ row.statDateStr
												+ "')\">"
												+ "<span>"
												+ FilterData2(
														row.a002Num,
														false) + "</span>";
										+"</a>";
									},
									totalSummary : {
										render : function(column, cell) {
											return '<div class="sumAllFromDatabaseStyle"><a  href=\"javascript:void(0)\" onclick=\"javascript:gridListForAlarmStatistics.loadSummayDataToChart()\" >'+FilterData2(gridListForAlarmStatistics.summaryDatas.Rows[0].a002Num,false)
											+'</a></div>';
										},
										align : 'center'
									}
								},
								{
									display : '时长',
									name : 'a002Time',
									width : 120,
									align : 'center',
									resizable:false,
									render : function(row) {
										return "<span>"+ FilterData2(
														row.a002Time,
														true) + "</span>";
									},
									totalSummary : {
										render : function(column, cell) {
											return '<div class="sumAllFromDatabaseStyle"><a  href=\"javascript:void(0)\" onclick=\"javascript:gridListForAlarmStatistics.loadSummayDataToChart()\" >'+FilterData2(gridListForAlarmStatistics.summaryDatas.Rows[0].a002Time,true)
											+'</a></div>';
										},
										align : 'center'
									}
								} ]
					},
					{
						display : '总线告警',
						name : 'a003Num',
						columns : [
								{
									display : '次数',
									name : 'a003Num',
									resizable:false,
									width : 70,
									align : 'center',
									render : function(row) {
										return "<a title=\"点击查看详细信息 \" href=\"javascript:void(0)\" onclick=\"javascript:gridListForAlarmStatistics.showAlarmDetailPop('"
												+ row.a003Num
												+ "','总线告警','A003','"
												+ row.corpId+"','"+row.vid+"','"+ row.lineId+"','"+row.teamId+"','"+ row.statYear+"','"+ row.statMonth+"','"+ row.statDateStr
												+ "')\">"
												+ "<span>"
												+ FilterData2(
														row.a003Num,
														false) + "</span>";
										+"</a>";
									},
									totalSummary : {
										render : function(column, cell) {
											return '<div class="sumAllFromDatabaseStyle"><a  href=\"javascript:void(0)\" onclick=\"javascript:gridListForAlarmStatistics.loadSummayDataToChart()\" >'+
											FilterData2(gridListForAlarmStatistics.summaryDatas.Rows[0].a003Num,false)
											+'</a></div>';
										},
										align : 'center'
									}
								},
								{
									display : '时长',
									name : 'a003Time',
									width : 120,
									align : 'center',
									render : function(row) {
										return "<span>"
												+ FilterData2(
														row.a003Time,
														true) + "</span>";
									},
									totalSummary : {
										render : function(column, cell) {
											return '<div class="sumAllFromDatabaseStyle"><a  href=\"javascript:void(0)\" onclick=\"javascript:gridListForAlarmStatistics.loadSummayDataToChart()\" >'+
											FilterData2(gridListForAlarmStatistics.summaryDatas.Rows[0].a003Time,true)
											+'</a></div>';
										},
										align : 'center'
									}
								} ]
					},
					{
						display : '设备故障',
						name : 'a004Num',
						columns : [
								{
									display : '次数',
									name : 'a004Num',
									width : 70,
									align : 'center',
									resizable:false,
									render : function(row) {
										return "<a title=\"点击查看详细信息 \" href=\"javascript:void(0)\" onclick=\"javascript:gridListForAlarmStatistics.showAlarmDetailPop('"
												+ row.a004Num
												+ "','设备故障','A004','"
												+ row.corpId+"','"+row.vid+"','"+ row.lineId+"','"+row.teamId+"','"+ row.statYear+"','"+ row.statMonth+"','"+ row.statDateStr
												+ "')\">"
												+ "<span>"
												+ FilterData2(
														row.a004Num,
														false) + "</span>";
										+"</a>";
									},
									totalSummary : {
										render : function(column, cell) {
											return '<div class="sumAllFromDatabaseStyle"><a  href=\"javascript:void(0)\" onclick=\"javascript:gridListForAlarmStatistics.loadSummayDataToChart()\" >'+
											FilterData2(gridListForAlarmStatistics.summaryDatas.Rows[0].a004Num,false)
											+'</a></div>';
										},
										align : 'center'
									}
								},
								{
									display : '时长',
									name : 'a004Time',
									width : 120,
									align : 'center',
									resizable:false,
									render : function(row) {
										return "<span>"
												+ FilterData2(
														row.a004Time,
														true) + "</span>";
									},
									totalSummary : {
										render : function(column, cell) {
											return '<div class="sumAllFromDatabaseStyle"><a  href=\"javascript:void(0)\" onclick=\"javascript:gridListForAlarmStatistics.loadSummayDataToChart()\" >'+
											FilterData2(gridListForAlarmStatistics.summaryDatas.Rows[0].a004Time,true)
											+'</a></div>';
										},
										align : 'center'
									}
								} ]
					},
					{
						display : '其他告警',
						name : 'a005Num',
						columns : [
								{
									display : '次数',
									name : 'a005Num',
									width : 70,
									resizable:false,
									align : 'center',
									render : function(row) {
										return "<a title=\"点击查看详细信息 \"  href=\"javascript:void(0)\" onclick=\"javascript:gridListForAlarmStatistics.showAlarmDetailPop('"
												+ row.a005Num
												+ "','其他告警','A005','"
												+ row.corpId+"','"+row.vid+"','"+ row.lineId+"','"+row.teamId+"','"+ row.statYear+"','"+ row.statMonth+"','"+ row.statDateStr
												+ "')\">"
												+ "<span>"
												+ FilterData2(
														row.a005Num,
														false) + "</span>";
										+"</a>";
									},
									totalSummary : {
										render : function(column, cell) {
											return '<div class="sumAllFromDatabaseStyle"><a  href=\"javascript:void(0)\" onclick=\"javascript:gridListForAlarmStatistics.loadSummayDataToChart()\" >'+
											FilterData2(gridListForAlarmStatistics.summaryDatas.Rows[0].a005Num,false)
											+'</a></div>';
										},
										align : 'center'
									}
								},
								{
									display : '时长',
									name : 'a005Time',
									width : 120,
									resizable:false,
									align : 'center',
									render : function(row) {
										return "<span>"
												+ FilterData2(
														row.a005Time,
														true) + "</span>";
									},
									totalSummary : {
										render : function(column, cell) {
											return '<div class="sumAllFromDatabaseStyle"><a  href=\"javascript:void(0)\" onclick=\"javascript:gridListForAlarmStatistics.loadSummayDataToChart()\" >'+
											FilterData2(gridListForAlarmStatistics.summaryDatas.Rows[0].a005Time,true)
											+'</a></div>';
										},
										align : 'center'
									}
								} ]
					},{
						display : '总油耗(L)',
						name : 'sumOilWear',
						order : '1',
						width : 130,
						resizable:false,
						align : 'center',
 						totalSummary : {
							render : function(column, cell) {
								return '<a  href=\"javascript:void(0)\" onclick=\"javascript:gridListForAlarmStatistics.loadSummayDataToChart()\" > <div class="sumAllFromDatabaseStyle">'+FilterData2(gridListForAlarmStatistics.summaryDatas.Rows[0].sumOilWear,false)+'</div></a>';
							},
							align : 'center'
						}
					},{
						display : '总里程(Km)',
						name : 'sumMileage',
						order : '1',
						width : 130,
						resizable:false,
						align : 'center',
 						totalSummary : {
							render : function(column, cell) {
								return '<a  href=\"javascript:void(0)\" onclick=\"javascript:gridListForAlarmStatistics.loadSummayDataToChart()\" > <div class="sumAllFromDatabaseStyle">'+FilterData2(gridListForAlarmStatistics.summaryDatas.Rows[0].sumMileage,false)+'</div></a>';
							},
							align : 'center'
						}
					},{
						display : '百公里油耗(L/100Km)',
						name : 'sumOilwearMileage',
						order : '1',
						width : 130,
						resizable:false,
						align : 'center',
 						totalSummary : {
							render : function(column, cell) {
								return '<a  href=\"javascript:void(0)\" onclick=\"javascript:gridListForAlarmStatistics.loadSummayDataToChart()\" > <div class="sumAllFromDatabaseStyle">'+FilterData2(gridListForAlarmStatistics.summaryDatas.Rows[0].sumOilwearMileage,false)+'</div></a>';
							},
							align : 'center'
						}
					}],
			mainContain : "alarmStatisticsListGridArea",
			exportAction : "alarmStatistics/exportStatInfo.action",
			showCheckbox : false,
			showTableToggleBtn : false,
			allowAdjustColWidth :true, 
			title : '',
			url : 'alarmStatistics/queryStatInfo.action',
			showTitle : false,
			pageSize : 30,
			width : '99%',
 			height : h,
			autoLoad : false,
			rownumbers : true,
			allowHideColumn: false,
			allowAdjustColWidth: false,
 			reportId : "alarmStatistic",
			tableId : 'resultTableDivForAlarmStatistics',
			searchFormId : 'searchFormForAlarmStatistics',
			onSelectRow : function(rowdata, rowindex, rowDomElement) {
				var titleArrTotal = [ obj.totalChartTitleLeft,
						obj.totalChartTitleRight ];
				var titleArrMonth = [ obj.monthChartTitleLeft,
						obj.monthChartTitleRight ];
				var titleArrDay = [ obj.dayChartTitleLeft,
						obj.dayChartTitleRight ];
				var chartsTitle = [];
				chartsTitle.push(titleArrTotal);
				chartsTitle.push(titleArrMonth);
				chartsTitle.push(titleArrDay);
				leftPanelForAlarm.getCurrentGridRow(rowdata, rowindex, rowDomElement,chartsTitle, obj);
			},
			onAfterShowData : function() {
				var statType =$("#statTypeForAlarmStatistics").val();
					if(statType ==2 ){
						var leng = $("#resultTableDivForAlarmStatistics").find("tr[id*=r1001]").length;
						$("#resultTableDivForAlarmStatistics").find("tr[id*=r1001]").click();
						if(leng == 0){
							var chartsTitle = [[[gridListForAlarmStatistics.summaryChartTitleLeft],[gridListForAlarmStatistics.summaryChartTitleRight]]];
					 		if(gridListForAlarmStatistics.summaryDatas.Rows)
					 			leftPanelForAlarm.createFirstChart(gridListForAlarmStatistics.summaryDatas.Rows[0],chartsTitle);
						}
					};
					if(statType !=1 ){
 						setGridRowSpan("resultTableDivForAlarmStatistics", 2);
					};
					if(statType !=2){
						gridListForAlarmStatistics.loadSummayDataToChart();
					}
 				gridListForAlarmStatistics.searchBottonEnable();
 			},

			gridBeforeSubmit : function() {
				if($("#corpIds").val()=="" && $("#teamIds").val()=="" &&$("#vids").val()=="" &&$("#lineIds").val()==""){
					$.ligerDialog.alert("请选择查询维度", "信息提示", 'warn');
					return false;
				}
				var longitude = $("#statTypeForAlarmStatistics").val();
				var dayDateStart =  $("#startDateForAlarmStatisticsTotal").val();
				var dayDateEnd   =  $("#endDateForAlarmStatisticsTotal").val();
				var monthDateStart= $("#startDateForAlarmStatisticsMonth").val();
				var monthDateEnd =  $("#endDateForAlarmStatisticsMonth").val();
				if((dayDateStart =="" || dayDateEnd =="") && (monthDateStart =="" || monthDateEnd =="")){
					$.ligerDialog.alert("请选择查询时间", "信息提示", 'warn');
					gridListForAlarmStatistics.searchBottonEnable();
					return false;
				}
				var isToday=daysBetween(new Date().Format("yyyy-MM-dd"),dayDateEnd);
				var DayNumber=daysBetween(dayDateStart,dayDateEnd);
                if(longitude==1 && dayDateStart !="" && dayDateEnd !=""  ){
 					if(compareDays(dayDateStart,dayDateEnd)){
						$.ligerDialog.alert("结束时间不能少于开始时间", "信息提示",'warn');
						gridListForAlarmStatistics.searchBottonEnable();
						return false;
					  }else{
						if((DayNumber > 99 && isToday!=0) || (isToday ==0 && DayNumber>100)){
							$.ligerDialog.alert("可选时间范围不能超过100天", "信息提示",'warn');
							gridListForAlarmStatistics.searchBottonEnable();
							return false;
					   };
				  };
                }
                if(longitude==3 && dayDateStart !="" && dayDateEnd !=""  ){
					if(compareDays(dayDateStart,dayDateEnd)){
							$.ligerDialog.alert("结束时间不能少于开始时间", "信息提示",'warn');
							gridListForAlarmStatistics.searchBottonEnable();
							return false;
					}else{
 						if((DayNumber > 49 && isToday!=0) || (isToday ==0 && DayNumber>50)){
							$.ligerDialog.alert("可选时间范围不能超过50天", "信息提示",'warn');
							gridListForAlarmStatistics.searchBottonEnable();
							return false;
						   };
				   };
                };
            	if(monthDateStart !="" && monthDateEnd !="" ){
            		monthDateStart +="-01";
            		monthDateEnd +="-01";
     				var MonthNumber=daysBetween(monthDateStart,monthDateEnd);
					if(compareDays(monthDateStart,monthDateEnd)){
						$.ligerDialog.alert("结束月份不能少于开始月份", "信息提示",'warn');
						gridListForAlarmStatistics.searchBottonEnable();
						return false;
					}else{
					 if(MonthNumber > 365){
						$.ligerDialog.alert("可选时间范围不能超过12个月", "信息提示",'warn');
						gridListForAlarmStatistics.searchBottonEnable();
						return false;
					   };
				   };
            	 };
				return true;
			}
		};
		// 按组织
		if (latitude == 1 && longitude == 1) {
			options.columns.splice(2, 7);
		}
		if (latitude == 1 && longitude == 2) {
			options.columns.splice(1, 1);
			options.columns.splice(3, 5);
		}
		if (latitude == 1 && longitude == 3) {
			options.columns.splice(1, 7);
		}
		// 按车队
		if (latitude == 2 && longitude == 1) {
			options.columns.splice(2, 2);
			options.columns.splice(3, 4);
		}
		if (latitude == 2 && longitude == 2) {
			options.columns.splice(1, 1);
			options.columns.splice(4, 4);
		}
		if (latitude == 2 && longitude == 3) {
			options.columns.splice(1, 3);
			options.columns.splice(2, 3);
		}
		// 按车辆
		if (latitude == 3 && longitude == 1) {
			options.columns.splice(1, 3);
			options.columns.splice(2, 1);
			options.columns.splice(3, 2);
		}
		if (latitude == 3 && longitude == 2) {
			options.columns.splice(1, 1);
			options.columns.splice(4, 1);
			options.columns.splice(5, 2);
		}
		if (latitude == 3 && longitude == 3) {
			options.columns.splice(1, 3);
			options.columns.splice(2, 1);
			options.columns.splice(3, 1);
		}
		// 按线路
		if (latitude == 4 && longitude == 1) {
			options.columns.splice(1, 4);
			options.columns.splice(2, 3);
		}
		if (latitude == 4 && longitude == 2) {
			options.columns.splice(1, 1);
			options.columns.splice(3, 1);
			options.columns.splice(4, 3);
		}
		if (latitude == 4 && longitude == 3) {
			options.columns.splice(1, 4);
			options.columns.splice(2, 2);
		}
		if(obj.grid == undefined || obj.grid == null){
 			obj.grid = new ctfoGrid(new customReport(options).options);
 		}else{
			if(KCPT.customColumns==null){
				customReport.prototype.getFreshCustomColumn(options);
			}
  		  obj.grid.getGridManager().set("columns",customReport.prototype.changeColumnForGrid(options));
  		};
  		obj.gridManager = $("#resultTableDivForAlarmStatistics").ligerGetGridManager();
 	},
	// 改变grid
	changeGrid : function(latitude, longitude) {
		var obj = this;
		obj.init(latitude, longitude);
 	},

	bindButtonEvent : function() {
	  var obj=this;
	  $("#customColumn").click(
		function() {
			$("#mainWorkArea").A_Window({
				dragabId : 'mainWorkArea', // 可拖动的范围
				id : 'customColumnDiv',
				width : 450, // 宽度
				height : 363,// 高度
				load_fn : function() {
					$("#closeCustomColumnDiv").click(function() {
						$("#mainWorkArea").close_ALL_Window();
						KCPT.customColumns=null;
						gridListForAlarmStatistics.changeGrid($("#latitudeForAlarmStatistics").val(),$("#statTypeForAlarmStatistics").val());
					 	$("#searchForButtonForAlarmStatistics").trigger('click');
 					});
					$("#closeCustomColumnDiv2").click(function() {
						$("#mainWorkArea").close_ALL_Window();
					});
				},
				url : 'customReportColumn/findReportColumn.action?reportId='+gridListForAlarmStatistics.reportId
	       });
		});
	    //导出
	    $("#gridExport").click(function(){
	    	obj.grid.exportExcel(1, 2);
		});
		//获取汇总数据
		   $("#searchForButtonForAlarmStatistics").click(function(){
			   obj.searchBottonDisabled();
			   obj.bindSubmitEvent();
		 		if($("#corpIds").val()=="" && $("#teamIds").val()=="" &&$("#vids").val()=="" &&$("#lineIds").val()==""){
		 			obj.grid.gridManager.data="";
		 			if(obj.grid.gridManager.currentdata != undefined) {
		 				obj.grid.gridManager.remove();
		 			}
    				obj.changeGrid($("#latitudeForAlarmStatistics").val(),$("#statTypeForAlarmStatistics").val());
					obj.searchBottonEnable();
					$.ligerDialog.alert("请选择查询维度", "信息提示", 'warn');
					return false;
				}
		 	   $.getJSON("alarmStatistics/queryStatInfo.action", {
					"requestParam.equal.statType": $("#statTypeForAlarm").val(),
					"requestParam.equal.latitude": $("#latitudeForAlarmStatistics").val(),
					"requestParam.equal.startDate" : $("#startDateForAlarmStatisticsTotal").val(),
					"requestParam.equal.startDateMonth" : $("#startDateForAlarmStatisticsMonth").val(),
					"requestParam.equal.endDate" : $("#endDateForAlarmStatisticsTotal").val(),
					"requestParam.equal.endDateMonth" : $("#endDateForAlarmStatisticsMonth").val(),
					"requestParam.equal.corpIds" : $("#corpIds").val(),
					"requestParam.equal.teamIds" : $("#teamIds").val(),
					"requestParam.equal.vids" : $("#vids").val(),
					"requestParam.equal.lineIds" : $("#lineIds").val(),
					"requestParam.rows" : 0
				}, function(data) {
					if( obj.grid != null && obj.grid.realGrid.options.sortName){
						obj.grid.realGrid.options.sortName="";
					}
		 			gridListForAlarmStatistics.summaryDatas=data;
					$("#searchFormForAlarmStatistics").submit();
				}); 
		 	   gridListForAlarmStatistics.changeGrid($("#latitudeForAlarmStatistics").val(),$("#statTypeForAlarmStatistics").val());
			});
	},
	searchBottonDisabled: function(){
		 $('#searchForButtonForAlarmStatistics').attr('disabled',"true");
	     $("#searchForButtonForAlarmStatistics").addClass('btn_inquires_disable');
		 $("#searchForButtonForAlarmStatistics").removeClass('btn_inquires');
	},
	searchBottonEnable:function(){
	    $('#searchForButtonForAlarmStatistics').removeAttr("disabled");
		$("#searchForButtonForAlarmStatistics").removeClass('btn_inquires_disable');
     	$("#searchForButtonForAlarmStatistics").addClass('btn_inquires');	
	},
	bindSubmitEvent : function() {
			$("#corpIds").val(leftPanelForAlarm.getGroupId("1"));
			$("#teamIds").val(leftPanelForAlarm.getFleetId("1"));
			$("#vids").val(leftPanelForAlarm.getVehicleId("1"));
			$("#lineIds").val(leftPanelForAlarm.getWayLineId("1"));
   },
   loadSummayDataToChart : function(){
 		   var statType =$("#statTypeForAlarmStatistics").val();
 		 	if(statType !=2){
		 		var chartsTitle = [[[gridListForAlarmStatistics.summaryChartTitleLeft],[gridListForAlarmStatistics.summaryChartTitleRight]]];
		 		if(gridListForAlarmStatistics.summaryDatas.Rows)
		 		 leftPanelForAlarm.createFirstChart(gridListForAlarmStatistics.summaryDatas.Rows[0],chartsTitle);
		 	}
		 },
	// 显示告警列表
	showAlarmDetailPop : function(times, alarmTypename, alarmType, corpId, vid, lineId, teamId,statYear, statMonth, statDateStr) {
		event.cancelBubble=true;
		var time = Number(times);
		 if (time == 999999999) {
				$.ligerDialog.alert("告警无效，无法查看", "信息提示", 'warn');
		 }
		if (time == 0) {
			$.ligerDialog.alert("告警次数为0，没有详情信息", "信息提示", 'warn');
		} else {
			var startDate='',
			endDate='';
			var dayDateStart =  $("#startDateForAlarmStatisticsTotal").val();
			var dayDateEnd   =  $("#endDateForAlarmStatisticsTotal").val();
 				var statType =$("#statTypeForAlarmStatistics").val();
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
			 				startDate=statDateStr;
							endDate=statDateStr;
					}
			var pvid='entId:'+corpId+ ',alarmClass:\''+ alarmType+ '\',startDate:\''+startDate+'\',endDate:\''+endDate+'\'';
			if(vid != ""){
				pvid=pvid+',vid:'+vid;
			}
             if(teamId!=""){
 				pvid=pvid+',teamId:'+teamId	;
			}
             if(lineId!=""){
  				pvid=pvid+',lineId:'+lineId	;
 			}
  			$("#mainWorkArea").MapAndGrid_Window({
				 dragabId : 'mainWorkArea', // 可拖动的范围
				 id : 'showAlarmDetailsMainDiv',
				 width : 800, // 宽度
				 height : 525,// 高度
				 priv : pvid,
				 load_fn : function() {
					 $("#showAlarmTypeName").html(alarmTypename);
					 $("#showAlarmDetailsDivClose").click(function() {
					 $("#mainWorkArea").close_ALL_Window();
				 });
				 },
				 url : 'model/safetymanagement/alarmStatistics/showAlarmEventDetails.jsp'
			 });
		}
	}
};

var gridListForAlarmStatistics = new gridListForAlarmStatistics();
$(document).ready(function() {
 	gridListForAlarmStatistics.bindButtonEvent();
	gridListForAlarmStatistics.grid =null;
	gridListForAlarmStatistics.changeGrid($("#latitudeForAlarmStatistics").val(),$("#statTypeForAlarmStatistics").val());//初始加载空grid
	alarmStatisticsMainFrame.gridShowObj = gridListForAlarmStatistics;
});
