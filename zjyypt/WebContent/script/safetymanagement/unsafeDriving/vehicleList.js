var gridListForUnsafeDriving = function() {
	this.version = "create by cuisong in 2012.5.14";
	this.height = getHeightAndWidth().height;
	this.titleHeight = $("#searchFormForUnsafeDriving").height();
	this.reportId = "safeDriver";
	this.summaryChartTitleLeft ="安全驾驶合计(比例图)";
	this.summaryChartTitleRight ="安全驾驶合计";
	this.totalChartTitleLeft = "安全驾驶比例(汇总)";
	this.totalChartTitleRight = "安全驾驶统计(汇总)";
	this.monthChartTitleLeft = "安全驾驶比例(月)";
	this.monthChartTitleRight = "安全驾驶趋势(月)";
	this.dayChartTitleLeft = "安全驾驶比例(日)";
	this.dayChartTitleRight = "安全驾驶统计(日)";
	this.chartsTitle = [
						[[this.totalChartTitleLeft],[this.totalChartTitleRight]],
						[[this.monthChartTitleLeft],[this.monthChartTitleRight]],
						[[this.dayChartTitleLeft],[this.dayChartTitleRight]],
	                    [[this.summaryChartTitleLeft],[this.summaryChartTitleRight]]
	                   ];
	this.summaryDatas={"Rows":[],"Total":"0"};
 };
gridListForUnsafeDriving.prototype = {
	onResize : function(value) {
		var obj = this;
		var center = getHeightAndWidth();
		var height1 = center.height;
		if (obj.gridManager) {
			if(value){
				obj.gridManager.setHeight(height1-165);
			}else{
				var h = height1-476;
				if(h < 300){
					obj.gridManager.setHeight(300);
				}else{
					obj.gridManager.setHeight(height1-476);
				}
				
			}
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
//		if(obj.gridHeight==200 && obj.height - 383 < 200){
//			obj.gridHeight=200;
//		}
//                if(obj.gridHeight < obj.height - 383 ){
//		   obj.gridHeight =obj.height - 383;
//		}
		var h = obj.height-476;
		if(h < 300){
			h = 300;
		}
		var options = {
			columns : [
					{
						display : '组织',
						name : 'corpName',
						order : '1',
						width : 100,
						align : 'center',
						resizable:false,
						frozen : true,
						render : function(row) {
							return "<div title=\""+row.corpName+"\">"+row.corpName+"</div>";
						},
						totalSummary : {
							render : function(column, cell) {
								return '<a   href=\"javascript:void(0)\" onclick=\"javascript:gridListForUnsafeDriving.loadSummayDataToChart()\" > <div class="sumAllFromDatabaseStyle">合计</div></a>';
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
								return '<a   href=\"javascript:void(0)\" onclick=\"javascript:gridListForUnsafeDriving.loadSummayDataToChart()\" > <div class="sumAllFromDatabaseStyle">'+FilterData2(gridListForUnsafeDriving.summaryDatas.Rows[0].countVehicle,false)+'</div></a>';
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
								return '<a   href=\"javascript:void(0)\" onclick=\"javascript:gridListForUnsafeDriving.loadSummayDataToChart()\" > <div class="sumAllFromDatabaseStyle">--</div></a>';
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
								return '<a   href=\"javascript:void(0)\" onclick=\"javascript:gridListForUnsafeDriving.loadSummayDataToChart()\" > <div class="sumAllFromDatabaseStyle">--</div></a>';
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
						totalSummary : {
							render : function(column, cell) {
								return '<a   href=\"javascript:void(0)\" onclick=\"javascript:gridListForUnsafeDriving.loadSummayDataToChart()\" > <div class="sumAllFromDatabaseStyle">--</div></a>';
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
								return '<a   href=\"javascript:void(0)\" onclick=\"javascript:gridListForUnsafeDriving.loadSummayDataToChart()\" > <div class="sumAllFromDatabaseStyle">--</div></a>';
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
								return '<a   href=\"javascript:void(0)\" onclick=\"javascript:gridListForUnsafeDriving.loadSummayDataToChart()\" > <div class="sumAllFromDatabaseStyle">--</div></a>';
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
						resizable:false,
						totalSummary : {
							render : function(column, cell) {
								return '<a   href=\"javascript:void(0)\" onclick=\"javascript:gridListForUnsafeDriving.loadSummayDataToChart()\" > <div class="sumAllFromDatabaseStyle">--</div></a>';
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
								return '<a   href=\"javascript:void(0)\" onclick=\"javascript:gridListForUnsafeDriving.loadSummayDataToChart()\" > <div class="sumAllFromDatabaseStyle">--</div></a>';
							},
							align : 'center'
						}
					},{
						display : '超速',
						name : 'sumOverspeedAlarm',
						resizable:false,
						columns : [
								{
									display : '次数',
									name : 'sumOverspeedAlarm',
									width : 50,
									align : 'center',
									resizable:false,
									render : function(row) {
										return "<a title=\"点击查看详细信息 \"  href=\"javascript:void(0)\" onclick=\"javascript:gridListForUnsafeDriving.showAlarmDetailPop('"
												+ row.sumOverspeedAlarm
												+ "','超速','1','"
												+ row.corpId+"','"+ row.vid+"','"+ row.teamId+"','"+row.lineId+"','"+ row.statYear+"','"+ row.statMonth+"','"+ row.statDateStr
												+ "')\">"
												+ "<span>"
												+ FilterData2(row.sumOverspeedAlarm,false) + "</span>";
										+"</a>";
									},
									totalSummary : {
										render : function(column, cell) {
											return '<a   href=\"javascript:void(0)\" onclick=\"javascript:gridListForUnsafeDriving.loadSummayDataToChart()\" > <div class="sumAllFromDatabaseStyle">'+FilterData2(gridListForUnsafeDriving.summaryDatas.Rows[0].sumOverspeedAlarm,false)+'</div></a>';
										},
										align : 'center'
									}
								},
								{
									display : '时长',
									name : 'sumOverspeedTimestr',
									width : 100,
									align : 'center',
									resizable:false,
									render : function(row) {
										return "<span>"+ FilterData2(row.sumOverspeedTime,true) + "</span>";
									},
									totalSummary : {
										render : function(column, cell) {
											return '<a   href=\"javascript:void(0)\" onclick=\"javascript:gridListForUnsafeDriving.loadSummayDataToChart()\" > <div class="sumAllFromDatabaseStyle">'+
											FilterData2(gridListForUnsafeDriving.summaryDatas.Rows[0].sumOverspeedTime,true)
											+'</div></a>';
										},
										align : 'center'
									}
								} ]
					},{
						display : '超转',
						name : 'sumOverrpmAlarm',
						resizable:false,
						columns : [
								{
									display : '次数',
									name : 'sumOverrpmAlarm',
									width : 50,
									resizable:false,
									align : 'center',
									render : function(row) {
										return "<a title=\"点击查看详细信息 \"  href=\"javascript:void(0)\" onclick=\"javascript:gridListForUnsafeDriving.showAlarmDetailPop('"
												+ row.sumOverrpmAlarm
												+ "','超转','47','"
												+ row.corpId+"','"+ row.vid+"','"+ row.teamId+"','"+row.lineId+"','"+ row.statYear+"','"+ row.statMonth+"','"+ row.statDateStr
												+ "')\">"
												+ "<span>"
												+ FilterData2(
														row.sumOverrpmAlarm,
														false) + "</span>";
										+"</a>";
									},
									totalSummary : {
										render : function(column, cell) {
											return '<a   href=\"javascript:void(0)\" onclick=\"javascript:gridListForUnsafeDriving.loadSummayDataToChart()\" > <a   href=\"javascript:void(0)\" onclick=\"javascript:gridListForUnsafeDriving.loadSummayDataToChart()\" > <div class="sumAllFromDatabaseStyle">'+FilterData2(gridListForUnsafeDriving.summaryDatas.Rows[0].sumOverrpmAlarm,false)
											+'</div></a>';
										},
										align : 'center'
									}
								},
								{
									display : '时长',
									name : 'sumOverrpmTimestr',
									width : 100,
									align : 'center',
									resizable:false,
									render : function(row) {
										return "<span>"+ FilterData2(
														row.sumOverrpmTime,
														true) + "</span>";
									},
									totalSummary : {
										render : function(column, cell) {
											return '<a   href=\"javascript:void(0)\" onclick=\"javascript:gridListForUnsafeDriving.loadSummayDataToChart()\" > <div class="sumAllFromDatabaseStyle">'+FilterData2(gridListForUnsafeDriving.summaryDatas.Rows[0].sumOverrpmTime,true)
											+'</div></a>';
										},
										align : 'center'
									}
								} ]
					},
					{
						display : '急加速',
						name : 'sumUrgentSpeedNum',
						resizable:false,
						columns : [
								{
									display : '次数',
									name : 'sumUrgentSpeedNum',
									resizable:false,
									width : 50,
									align : 'center',
									render : function(row) {
										return "<a title=\"点击查看详细信息 \"  href=\"javascript:void(0)\" onclick=\"javascript:gridListForUnsafeDriving.showAlarmDetailPop('"
												+ row.sumUrgentSpeedNum
												+ "','急加速','48','"
												+ row.corpId+"','"+ row.vid+"','"+ row.teamId+"','"+row.lineId+"','"+ row.statYear+"','"+ row.statMonth+"','"+ row.statDateStr
												+ "')\">"
												+ "<span>"
												+ FilterData2(
														row.sumUrgentSpeedNum,
														false) + "</span>";
										+"</a>";
									},
									totalSummary : {
										render : function(column, cell) {
											return '<a   href=\"javascript:void(0)\" onclick=\"javascript:gridListForUnsafeDriving.loadSummayDataToChart()\" > <div class="sumAllFromDatabaseStyle">'+
											FilterData2(gridListForUnsafeDriving.summaryDatas.Rows[0].sumUrgentSpeedNum,false)
											+'</div></a>';
										},
										align : 'center'
									}
								},
								{
									display : '时长',
									name : 'sumUrgentSpeedTimestr',
									width : 100,
									align : 'center',
									resizable:false,
									render : function(row) {
										return "<span>"
												+ FilterData2(
														row.sumUrgentSpeedTime,
														true) + "</span>";
									},
									totalSummary : {
										render : function(column, cell) {
											return '<a   href=\"javascript:void(0)\" onclick=\"javascript:gridListForUnsafeDriving.loadSummayDataToChart()\" > <div class="sumAllFromDatabaseStyle">'+
											FilterData2(gridListForUnsafeDriving.summaryDatas.Rows[0].sumUrgentSpeedTime,true)
											+'</div></a>';
										},
										align : 'center'
									}
								} ]
					},
					{
						display : '急减速',
						name : 'sumUrgentLowdownNum',
						resizable:false,
						columns : [
								{
									display : '次数',
									name : 'sumUrgentLowdownNum',
									width : 50,
									align : 'center',
									resizable:false,
									render : function(row) {
										return "<a title=\"点击查看详细信息 \"  href=\"javascript:void(0)\" onclick=\"javascript:gridListForUnsafeDriving.showAlarmDetailPop('"
												+ row.sumUrgentLowdownNum
												+ "','急减速','49','"
												+ row.corpId+"','"+ row.vid+"','"+ row.teamId+"','"+row.lineId+"','"+ row.statYear+"','"+ row.statMonth+"','"+ row.statDateStr
												+ "')\">"
												+ "<span>"
												+ FilterData2(
														row.sumUrgentLowdownNum,
														false) + "</span>";
										+"</a>";
									},
									totalSummary : {
										render : function(column, cell) {
											return '<a   href=\"javascript:void(0)\" onclick=\"javascript:gridListForUnsafeDriving.loadSummayDataToChart()\" > <div class="sumAllFromDatabaseStyle">'+
											FilterData2(gridListForUnsafeDriving.summaryDatas.Rows[0].sumUrgentLowdownNum,false)
											+'</div></a>';
										},
										align : 'center'
									}
								},
								{
									display : '时长',
									name : 'sumUrgentLowdownTimestr',
									width : 100,
									align : 'center',
									resizable:false,
									render : function(row) {
										return "<span>"
												+ FilterData2(
														row.sumUrgentLowdownTime,
														true) + "</span>";
									},
									totalSummary : {
										render : function(column, cell) {
											return '<a   href=\"javascript:void(0)\" onclick=\"javascript:gridListForUnsafeDriving.loadSummayDataToChart()\" > <div class="sumAllFromDatabaseStyle">'+
											FilterData2(gridListForUnsafeDriving.summaryDatas.Rows[0].sumUrgentLowdownTime,true)
											+'</div></a>';
										},
										align : 'center'
									}
								} ]
					},
					{
						display : '疲劳驾驶',
						name : 'sumFatigueAlarm',
						columns : [
								{
									display : '次数',
									name : 'sumFatigueAlarm',
									width : 50,
									align : 'center',
									resizable:false,
									render : function(row) {
										return "<a title=\"点击查看详细信息 \"  href=\"javascript:void(0)\" onclick=\"javascript:gridListForUnsafeDriving.showAlarmDetailPop('"
												+ row.sumFatigueAlarm
												+ "','疲劳驾驶','2','"
												+ row.corpId+"','"+ row.vid+"','"+ row.teamId+"','"+row.lineId+"','"+ row.statYear+"','"+ row.statMonth+"','"+ row.statDateStr
												+ "')\">"
												+ "<span>"
												+ FilterData2(
														row.sumFatigueAlarm,
														false) + "</span>";
										+"</a>";
									},
									totalSummary : {
										render : function(column, cell) {
											return '<a   href=\"javascript:void(0)\" onclick=\"javascript:gridListForUnsafeDriving.loadSummayDataToChart()\" > <div class="sumAllFromDatabaseStyle">'+
											FilterData2(gridListForUnsafeDriving.summaryDatas.Rows[0].sumFatigueAlarm,false)
											+'</div></a>';
										},
										align : 'center'
									}
								},
								{
									display : '时长',
									name : 'sumFatigueTimestr',
									width : 100,
									align : 'center',
									resizable:false,
									render : function(row) {
										return "<span>"
												+ FilterData2(
														row.sumFatigueTime,
														true) + "</span>";
									},
									totalSummary : {
										render : function(column, cell) {
											return '<a   href=\"javascript:void(0)\" onclick=\"javascript:gridListForUnsafeDriving.loadSummayDataToChart()\" ><div class="sumAllFromDatabaseStyle">'+
											FilterData2(gridListForUnsafeDriving.summaryDatas.Rows[0].sumFatigueTime,true)
											+'</div></a>';
										},
										align : 'center'
									}
								} ]
					},
					{
						display : '空挡滑行',
						name : 'sumGearGlideNum',
						columns : [
								{
									display : '次数',
									name : 'sumGearGlideNum',
									align : 'left',
									width : 50,
									align : 'center',
									resizable:false,
									render : function(row) {
										return "<a title=\"点击查看详细信息 \"  href=\"javascript:void(0)\" onclick=\"javascript:gridListForUnsafeDriving.showAlarmDetailPop('"
												+ row.sumGearGlideNum
												+ "','空挡滑行','44','"
												+ row.corpId+"','"+ row.vid+"','"+ row.teamId+"','"+row.lineId+"','"+ row.statYear+"','"+ row.statMonth+"','"+ row.statDateStr
												+ "')\">"
												+ "<span>"
												+ FilterData2(
														row.sumGearGlideNum,
														false) + "</span>";
										+"</a>";
									},
									totalSummary : {
										render : function(column, cell) {
											return '<a   href=\"javascript:void(0)\" onclick=\"javascript:gridListForUnsafeDriving.loadSummayDataToChart()\" > <div class="sumAllFromDatabaseStyle">'+
											FilterData2(gridListForUnsafeDriving.summaryDatas.Rows[0].sumGearGlideNum,false)
											+'</div></a>';
										},
										align : 'center'
									}
								},
								{
									display : '时长',
									name : 'sumGearGlideTimestr',
									width : 100,
									align : 'center',
									resizable:false,
									render : function(row) {
										return "<span>"+ FilterData2(row.sumGearGlideTime,true) + "</span>";
									},
									totalSummary : {
										render : function(column, cell) {
 											return '<a   href=\"javascript:void(0)\" onclick=\"javascript:gridListForUnsafeDriving.loadSummayDataToChart()\" > <div class="sumAllFromDatabaseStyle">'+
 											FilterData2(gridListForUnsafeDriving.summaryDatas.Rows[0].sumGearGlideTime,true)
 											+'</div></a>';
										},
										align : 'center'
									}
								} ]
					},{
						display : '总油耗(L)',
						name : 'sumOilWear',
						order : '1',
						width : 130,
						align : 'center',
						resizable:false,
 						totalSummary : {
							render : function(column, cell) {
								return '<a   href=\"javascript:void(0)\" onclick=\"javascript:gridListForUnsafeDriving.loadSummayDataToChart()\" > <div class="sumAllFromDatabaseStyle">'+FilterData2(gridListForUnsafeDriving.summaryDatas.Rows[0].sumOilWear,false)+'</div></a>';
							},
							align : 'center'
						}
					},{
						display : '总里程(Km)',
						name : 'sumMileage',
						order : '1',
						width : 130,
						align : 'center',
						resizable:false,
 						totalSummary : {
							render : function(column, cell) {
								return '<a   href=\"javascript:void(0)\" onclick=\"javascript:gridListForUnsafeDriving.loadSummayDataToChart()\" > <div class="sumAllFromDatabaseStyle">'+FilterData2(gridListForUnsafeDriving.summaryDatas.Rows[0].sumMileage,false)+'</div></a>';
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
								return '<a  href=\"javascript:void(0)\" onclick=\"javascript:gridListForUnsafeDriving.loadSummayDataToChart()\" > <div class="sumAllFromDatabaseStyle">'+FilterData2(gridListForUnsafeDriving.summaryDatas.Rows[0].sumOilwearMileage,false)+'</div></a>';
							},
							align : 'center'
						}
					}],
			mainContain : "unsafeDrivingListGridArea",
			exportAction : "dangerousDrivingStat/exportStatInfo.action",
			showCheckbox : false,
			showTableToggleBtn : false,
			title : '',
			url : 'dangerousDrivingStat/queryStatInfo.action',
			showTitle : false,
			pageSize : 30,
			width : '99.8%',
 			reportId : "safeDriver",
			height : h,
			autoLoad : false,
			rownumbers : true,
			tableId : 'resultTableDivForUnsafeDriving',
			searchFormId : 'searchFormForUnsafeDriving',
			allowHideColumn: false,
			allowAdjustColWidth:false,
			onSelectRow : function(rowdata, rowindex, rowDomElement) {
				leftPanel.getCurrentGridRow(rowdata, rowindex, rowDomElement,obj.chartsTitle, obj);
			},
			onAfterShowData : function() {
 					var statType =$("#statTypeForUnsafeDriving").val();
					if(statType ==2 ){
						$("#resultTableDivForUnsafeDriving").find("tr[id*=r1001]").click();
					}else{
						gridListForUnsafeDriving.loadSummayDataToChart();
					}
					setGridRowSpan("resultTableDivForUnsafeDriving", 2);
				    gridListForUnsafeDriving.searchBottonEnable();
 			},
			gridBeforeSubmit : function() {
				if($("#corpIds").val()=="" && $("#teamIds").val()=="" &&$("#vids").val()=="" &&$("#lineIds").val()==""){
					$.ligerDialog.alert("请选择查询维度", "信息提示", 'warn');
					gridListForUnsafeDriving.searchBottonEnable();
					return false;
				}
				var longitude = $("#statTypeForUnsafeDriving").val();
				var dayDateStart =  $("#startDateForUnSafeDrivingTotal").val();
				var dayDateEnd   =  $("#endDateForUnSafeDrivingTotal").val();
				var monthDateStart= $("#startDateForUnSafeDrivingMonth").val();
				var monthDateEnd =  $("#endDateForUnSafeDrivingMonth").val();
				if((dayDateStart =="" || dayDateEnd =="") && (monthDateStart =="" || monthDateEnd =="")){
					$.ligerDialog.alert("请选择查询时间", "信息提示", 'warn');
					gridListForUnsafeDriving.searchBottonEnable();
					return false;
				}
				var isToday=daysBetween(new Date().Format("yyyy-MM-dd"),dayDateEnd);
				var DayNumber=daysBetween(dayDateStart,dayDateEnd);
                if(longitude==1 && dayDateStart !=null && dayDateEnd !=null  ){
 					if(compareDays(dayDateStart,dayDateEnd)){
						$.ligerDialog.alert("结束时间不能少于开始时间", "信息提示",'warn');
						gridListForUnsafeDriving.searchBottonEnable();
						return false;
					  }else{
						if((DayNumber > 99 && isToday!=0) || (isToday ==0 && DayNumber>100)){
							$.ligerDialog.alert("可选时间范围不能超过100天", "信息提示",'warn');
							gridListForUnsafeDriving.searchBottonEnable();
							return false;
					   };
				  };
                }
                if(longitude==3 && dayDateStart !=null && dayDateEnd !=null  ){
					if(compareDays(dayDateStart,dayDateEnd)){
							$.ligerDialog.alert("结束时间不能少于开始时间", "信息提示",'warn');
							gridListForUnsafeDriving.searchBottonEnable();
							return false;
					}else{
 						if((DayNumber > 49 && isToday!=0) || (isToday ==0 && DayNumber>50)){
							$.ligerDialog.alert("可选时间范围不能超过50天", "信息提示",'warn');
							gridListForUnsafeDriving.searchBottonEnable();
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
						gridListForUnsafeDriving.searchBottonEnable();
						return false;
					}else{
					 if(MonthNumber > 365){
						$.ligerDialog.alert("可选时间范围不能超过12个月", "信息提示",'warn');
						gridListForUnsafeDriving.searchBottonEnable();
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
 		if(gridListForUnsafeDriving.grid == undefined || gridListForUnsafeDriving.grid == null){
 			obj.grid = new ctfoGrid(new customReport(options).options);
 		}else{
			if(KCPT.customColumns==null){
				customReport.prototype.getFreshCustomColumn(options);
			}
			gridListForUnsafeDriving.grid.getGridManager().set("columns",customReport.prototype.changeColumnForGrid(options));
  		}
// 		obj.ctfoFormWithGrid = new ctfoFormWithGrid(options);
//
//		obj.grid = obj.ctfoFormWithGrid.getGrid();
//
		obj.gridManager = $("#resultTableDivForUnsafeDriving").ligerGetGridManager();
// 		
 	},
	// 改变grid
	changeGrid : function(latitude, longitude) {
		var obj = this;
//		obj.onResize(false);
		obj.init(latitude, longitude);
 	},
	bindButtonEvent : function() {
	  var obj=this;
	  $("#customColumn").click(function() {
			$("#mainWorkArea").A_Window({
				dragabId : 'mainWorkArea', // 可拖动的范围
				id : 'customColumnDiv',
				width : 450, // 宽度
				height : 363,// 高度
				load_fn : function() {
					$("#closeCustomColumnDiv").click(function() {
						$("#mainWorkArea").close_ALL_Window();
						KCPT.customColumns=null;
 					 	 gridListForUnsafeDriving.changeGrid($("#latitudeForUnsafeDriving").val(),$("#statTypeForUnsafeDriving").val());
					 	$("#searchForButton").trigger('click');
					});
					$("#closeCustomColumnDiv2").click(function() {
						$("#mainWorkArea").close_ALL_Window();
					});
				},
				url : 'customReportColumn/findReportColumn.action?reportId='+gridListForUnsafeDriving.reportId
	       });
		});
	  $("#gridExport").click(function(){
			obj.grid.exportExcel(1, 2);
		});
		//获取汇总数据
		   $("#searchForButton").click(function(){
 			   obj.searchBottonDisabled();
 			   obj.bindSubmitEvent();
				if($("#corpIds").val()=="" && $("#teamIds").val()=="" &&$("#vids").val()=="" &&$("#lineIds").val()==""){
					obj.grid.gridManager.data="";
					if(obj.grid.gridManager.currentdata != undefined) {
						obj.grid.gridManager.remove();
					}
					obj.searchBottonEnable();
					$.ligerDialog.alert("请选择查询维度", "信息提示", 'warn');
					return false;
				}
			   $.getJSON("dangerousDrivingStat/queryStatInfo.action", {
					"requestParam.equal.statType": $("#statType").val(),
					"requestParam.equal.latitude": $("#latitudeForUnsafeDriving").val(),
					"requestParam.equal.startDate" : $("#startDateForUnSafeDrivingTotal").val(),
					"requestParam.equal.startDateMonth" : $("#startDateForUnSafeDrivingMonth").val(),
					"requestParam.equal.endDate" : $("#endDateForUnSafeDrivingTotal").val(),
					"requestParam.equal.endDateMonth" : $("#endDateForUnSafeDrivingMonth").val(),
					"requestParam.equal.corpIds" : $("#corpIds").val(),
					"requestParam.equal.teamIds" : $("#teamIds").val(),
					"requestParam.equal.vids" : $("#vids").val(),
					"requestParam.equal.lineIds" : $("#lineIds").val(),
					"requestParam.equal.rows" : 0
				}, function(data) {
					if( obj.grid != null && obj.grid.realGrid.options.sortName){
						obj.grid.realGrid.options.sortName="";
					}
					gridListForUnsafeDriving.summaryDatas=data;
					$("#searchFormForUnsafeDriving").submit();
				});
		 	   gridListForUnsafeDriving.changeGrid($("#latitudeForUnsafeDriving").val(),$("#statTypeForUnsafeDriving").val());
			});
	},
	bindSubmitEvent : function() {
 			$("#corpIds").val(leftPanel.getGroupId("1"));
			$("#teamIds").val(leftPanel.getFleetId("1"));
 			$("#vids").val(leftPanel.getVehicleId("1"));
			$("#lineIds").val(leftPanel.getWayLineId("1"));
   },
	//装入汇总数据
	 loadSummayDataToChart : function(){
 	     var statType =$("#statTypeForUnsafeDriving").val();
   	  		if(statType !=2){
		 	if(gridListForUnsafeDriving.summaryDatas.Rows){
		 			leftPanel.createFirstChart(gridListForUnsafeDriving.summaryDatas.Rows[0],this.chartsTitle);
		       }
		 	}
		 },
	//弹出告警明细窗口
	showAlarmDetailPop : function(times, alarmTypename, alarmType, corpId, vid, teamId, lineId, statYear, statMonth, statDateStr ){
		event.cancelBubble=true;
		 var time = Number(times);
		 if (time == 999999999) {
				$.ligerDialog.alert("告警无效，无法查看", "信息提示", 'warn');
				return;
		 }
		 if (time == 0) {
					$.ligerDialog.alert("告警次数为0，没有详情信息", "信息提示", 'warn');
		  } else {
					var startDate='',
					endDate='';
					var dayDateStart =  $("#startDateForUnSafeDrivingTotal").val();
					var dayDateEnd   =  $("#endDateForUnSafeDrivingTotal").val();
		 				var statType =$("#statTypeForUnsafeDriving").val();
					 	if(statType ==1){
				          if(dayDateStart !="" && dayDateEnd !="" ){
				 				startDate=dayDateStart;
								endDate  =dayDateEnd;
						  }
					 	}
					 	if(statType ==2){
				 				startDate=statYear+"-"+statMonth+"-01";
 								endDate=getMonthLastDay(statYear+"-"+statMonth);
					 	}
 						if(statType ==3){
 				 				startDate=statDateStr;
 								endDate=statDateStr;
  						}
					var pvid='entId:'+corpId+ ',alarmCode:\''+ alarmType+ '\',startDate:\''+startDate+'\',endDate:\''+endDate+'\'';
					if(vid != ""){
						pvid=pvid+',vid:'+vid;
					}
		             if(teamId!=""){
		 				pvid=pvid+',teamId:'+teamId	;
					}
		             if(lineId!=""){
		  				pvid=pvid+',lineId:'+lineId	;
		 			}
  		 			$("#mainWorkArea").MapAndGrid_Window(
									{
										dragabId : 'mainWorkArea', // 可拖动的范围
										id : 'vheicelStatDetailPopDiv',
										width : 800, // 宽度
										height : 525,// 高度
										mapHeight :290,
										priv : pvid,
										load_fn : function() {
											$("#showAlarmName").html(alarmTypename);
											$("#showAlarmDetailsDivClose").click(
													function() {
														$("#mainWorkArea").close_ALL_Window();
													});
										},
										url : 'model/safetymanagement/unsafeDriving/showAlarmDetails.jsp'
					});
				}
			},
	searchBottonDisabled: function(){
		 $('#searchForButton').attr('disabled',"true");
	     $("#searchForButton").addClass('btn_inquires_disable');
		 $("#searchForButton").removeClass('btn_inquires');
	},
	searchBottonEnable:function(){
	    $('#searchForButton').removeAttr("disabled");
		$("#searchForButton").removeClass('btn_inquires_disable');
    	$("#searchForButton").addClass('btn_inquires');
	}
};
var gridListForUnsafeDriving = new gridListForUnsafeDriving();
$(document).ready(function() {
	gridListForUnsafeDriving.bindButtonEvent();
	gridListForUnsafeDriving.grid = null;
 	gridListForUnsafeDriving.changeGrid($("#latitudeForUnsafeDriving").val(),$("#statTypeForUnsafeDriving").val());//grid加载
 	unsafeDrivingMainFrame.gridShowObj = gridListForUnsafeDriving;
});
