var vehicleAlarmList = function () {
	this.leftTree;
	this.height = KCPT.root.getCenterSize().height;
	this.titleHeight = $("#vehicleAlarmForm").height();
	this.getAlarmType();
	this.init();
};

vehicleAlarmList.prototype = {
	show : function(){
		var obj = this;
		obj.leftTree = KCPT.root.leftTree;
		obj.leftTree.setCheckDataName("vid");
		obj.leftTree.showTabs();
		obj.leftTree.showGrid();
		obj.leftTree.show();
	},

	//页面大小调整需要增加的方法
	onResize : function() {
		var obj = this;
		if (obj.gridA) {
			obj.gridA.onReSize();
		}
		if (obj.gridB) {
			obj.gridB.onReSize();
		}
		if (obj.gridC) {
			obj.gridC.onReSize();
		}
		if (obj.gridD) {
			obj.gridD.onReSize();
		}
		if (obj.gridE) {
			obj.gridE.onReSize();
		}
		if (obj.gridF) {
			obj.gridF.onReSize();
		}
	},
	getAlarmType: function() {
		JAjax("vehiclestat/listTypeData.action",null,"json",function(result){
		    var data = eval(result);
		    var opt = '<OPTION value="A000">全部</OPTION>';
		    $.each(data, function(i, n){
		    	opt += '<OPTION value="'+n.alarmCode+'">'+n.alarmName+'</OPTION>' ;
		    });
		    $("#alarmType").html(opt);
		  },null,null);
	},

	init : function () {
		var that = this;
		that.show();
		var startdate;
		var enddate;

		var options = {
				columns:[
				   	        {display: '所属企业', name : 'pentName', width : 80},
							{display: '车队', name : 'teamName', width : 80},
							{display: '车牌号', name : 'vehicleNo', width : 80},
							{display: '车辆VIN', name : 'vinCode', width : 110},
							{display: '违规驾驶(次)', name : 'A001', width : 80,
								render : function(row) {
									return "<span>"+FilterData(row.A001,false)+"</span>";
								}},
							{display: '电子围栏(次)', name : 'A002', width : 80,
								render : function(row) {
									return "<span>"+FilterData(row.A002,false)+"</span>";
								}},
							{display: '总线告警(次)', name : 'A003', width : 80,
								render : function(row) {
									return "<span>"+FilterData(row.A003,false)+"</span>";
								}},
							{display: '设备故障(次)', name : 'A004', width : 80,
								render : function(row) {
									return "<span>"+FilterData(row.A004,false)+"</span>";
								}},
							{display: '其他告警(次)', name : 'A005', width : 80,
								render : function(row) {
									return "<span>"+FilterData(row.A005,false)+"</span>";
								}

							},
							{display: '告警时间', name : 'alarmTimeNoUtc', width : 80,
								render : function(row) {
									return "<span>"+FilterData(row.alarmTimeNoUtc,false)+"</span>";
							  }},
							{display : '操作',render: function (row) {
								var alarmTab = $("#timeType").val();
								var queryPattern = $('input[id=queryPatternAlarm][checked]').val();
								if(queryPattern==1) {
									startdate = $("#startDatevehiclealarm").val();
									enddate = $("#endDatevehiclealarm").val();
								} else {
									startdate = 'null';
									enddate = 'null';
								};
								return "<a title=\"统计图\" style=\"cursor: pointer;\" onclick=\"vehicleAlarmObj.vehicleAlarmopenW('"+row.vid+"','"+alarmTab+"','"+queryPattern+"','"+startdate+"','"+enddate+"','"+row.vinCode+"','"+row.vehicleNo+"')\" ><img src='images/global/bingtu.gif' border='0'/> </a>";
						      } , width : 60}
				    		],
	    		showCheckbox:false,
	    		sortName:'vehicleNo',
	    		url:'vehiclestat/findAlarmStatList.action?alarmTypeTab=A000',
	    		exportAction : "vehiclestat/exportGridForVehicleAlarm.action?alarmTypeTab=A000",
	    		showTitle:false,
	    		pageSize:30,
	    		/*pageSizeOptions:[10,20,30,40],*/
	    		height: that.height - that.titleHeight-70,
	    		autoLoad:false,
	    		//填充数据的tableid
	            tableId: 'vehicleAlarmgrid',
	            //查询条件formid
	            searchFormId :'vehicleAlarmForm',
	            gridBeforeSubmit: function () {
	            	var treeStr = that.leftTree.getGridSelectRowID().toString();

					$("#vehicleAlarmvidInStr").val(treeStr);
					if (treeStr == "") {
						$.ligerDialog.alert("请选择车辆！", "提示");
						return false;
					}

					if($("input:radio[id='queryPatternAlarm']:checked").val()=='1') {
						that.curStartDate = $("#startDatevehiclealarm").val();
						that.curEndDate = $("#endDatevehiclealarm").val();
						if(that.curStartDate==""){
							$.ligerDialog.alert("开始时间不能为空", "信息提示");
							return false;
						}
						if(that.curEndDate==""){
							$.ligerDialog.alert("结束时间不能为空", "信息提示");
							return false;
						}
						var startdate=Number((that.curStartDate.replace('-','')).replace('-',''));
						var enddate  =Number((that.curEndDate.replace('-','')).replace('-',''));
						if(startdate > enddate){
							$.ligerDialog.alert("结束时间不能少于开始时间", "信息提示");
							return false;
						}
	        		}

	            	return true;
	            }

		};
		that.gridA = new ctfoGrid(options);
		var options1 = {
				columns:[
				{display: '所属企业', name : 'pentName', width : 80},
				{display: '车队', name : 'teamName', width : 60},
				{display: '车牌号', name : 'vehicleNo', width : 80},
				{display: '车辆VIN', name : 'vinCode', width : 110},
				{display: '超速行驶(次)', name : 'A001CSBJ', width : 80,
				    render : function(row) {
				        return "<span>"+FilterData(row.A001CSBJ,false)+"</span>";
				}},
				{display: '疲劳驾驶(次)', name : 'A001PLBJ', width : 80,
				    render : function(row) {
				        return "<span>"+FilterData(row.A001PLBJ,false)+"</span>";
				}},
				{display: '当天驾驶超时(次)', name : 'A001DTJSCS', width : 100,
                    render : function(row) {
                        return "<span>"+FilterData(row.A001DTJSCS,false)+"</span>";
                }},
				{display: '空档滑行(次)', name : 'A001KDHXGJ', width : 80,
				    render : function(row) {
				        return "<span>"+FilterData(row.A001KDHXGJ,false)+"</span>";
				}},
				{display: '超长怠速(次)', name : 'A001CCDSGJ', width : 80,
					render : function(row) {
						return "<span>"+FilterData(row.A001CCDSGJ,false)+"</span>";
					}},
				{display: '怠速空调(次)', name : 'A001DSKTGJ', width : 80,
						render : function(row) {
					return "<span>"+FilterData(row.A001DSKTGJ,false)+"</span>";
				}},
				{display: '发动机超转(次)', name : 'A001FDJCZGJ', width : 90,
					render : function(row) {
						return "<span>"+FilterData(row.A001FDJCZGJ,false)+"</span>";
					}},
				{display: '急加速(次)', name : 'A001JJIASBJ', width : 80,
					render : function(row) {
						return "<span>"+FilterData(row.A001JJIASBJ,false)+"</span>";
					}},
				{display: '急减速(次)', name : 'A001JJIANSBJ', width : 80,
						render : function(row) {
					return "<span>"+FilterData(row.A001JJIANSBJ,false)+"</span>";
				}},
				{display: '告警时间', name : 'alarmTimeNoUtc', width : 80,
						render : function(row) {
							return "<span>"+FilterData(row.alarmTimeNoUtc,false)+"</span>";
						}},
				{display : '操作',render: function (row) {
					var alarmTab = $("#timeType").val();
					var queryPattern = $('input[id=queryPatternAlarm][checked]').val();
					if(queryPattern==1) {
						startdate = $("#startDatevehiclealarm").val();
						enddate = $("#endDatevehiclealarm").val();
					} else {
						startdate = 'null';
						enddate = 'null';
					};
					return "<a title=\"统计图\" style=\"cursor: pointer;\" onclick=\"vehicleAlarmObj.vehicleAlarmopenW('"+row.vid+"','"+alarmTab+"','"+queryPattern+"','"+startdate+"','"+enddate+"','"+row.vinCode+"')\" ><img src='images/global/bingtu.gif' border='0'/> </a>";
			      } , width : 60}
	    		],
	    		showCheckbox:false,
	    		sortName:'vehicleNo',
	    		url:'vehiclestat/findAlarmStatList.action?alarmTypeTab=A001',
	    		exportAction : "vehiclestat/exportGridForVehicleAlarm.action?alarmTypeTab=A001",
	    		showTitle:false,
	    		pageSize:30,
	    		/*pageSizeOptions:[10,20,30,40],*/
	    		height: that.height - that.titleHeight-70,
	    		autoLoad:false,
	    		//填充数据的tableid
	            tableId: 'vehicleAlarmgrid1',
	            //查询条件formid
	            searchFormId :'vehicleAlarmForm',
	            gridBeforeSubmit: function () {
	            	var treeStr = that.leftTree.getGridSelectRowID().toString();
					$("#vehicleAlarmvidInStr").val(treeStr);
					if (treeStr == "") {
						$.ligerDialog.alert("请选择车辆！", "提示");
						return false;
					}

					if($("input:radio[id='queryPatternAlarm']:checked").val()=='1') {
						that.curStartDate = $("#startDatevehiclealarm").val();
						that.curEndDate = $("#endDatevehiclealarm").val();
						if(that.curStartDate==""){
							$.ligerDialog.alert("开始时间不能为空", "信息提示");
							return false;
						}
						if(that.curEndDate==""){
							$.ligerDialog.alert("结束时间不能为空", "信息提示");
							return false;
						}
						var startdate=Number((that.curStartDate.replace('-','')).replace('-',''));
						var enddate  =Number((that.curEndDate.replace('-','')).replace('-',''));
						if(startdate > enddate){
							$.ligerDialog.alert("结束时间不能少于开始时间", "信息提示");
							return false;
						}
	        		}
	            	return true;
	            }

		};
		that.gridB = new ctfoGrid(options1);
		var options2 = {
				columns:[
				{display: '所属企业', name : 'pentName', width : 80},
				{display: '车队', name : 'teamName', width : 60},
				{display: '车牌号', name : 'vehicleNo', width : 80},
				{display: '车辆VIN', name : 'vinCode', width : 110},
				{display: '超时停车(次)', name : 'A002CSTC', width : 100,
					render : function(row) {
						return "<span>"+FilterData(row.A002CSTC,false)+"</span>";
					}},
				{display: '进出区域(次)', name : 'A002JCQY', width : 100,
					render : function(row) {
						return "<span>"+FilterData(row.A002JCQY,false)+"</span>";
					}},
				{display: '路线偏移(次)', name : 'A002LXPY', width : 100,
					render : function(row) {
						return "<span>"+FilterData(row.A002LXPY,false)+"</span>";
				}},
				/*关键点报警不显示
				 *{display: '关键点报警(次)', name : 'A002GJD', width : 90,
					render : function(row) {
						return "<span>"+FilterData(row.A002GJD,false)+"</span>";
					}},*/
				{display: '告警时间', name : 'alarmTimeNoUtc', width : 80,
					render : function(row) {
						if(row.alarmTime<0)
							return "--";
						else
							return "<span>"+FilterData(row.alarmTimeNoUtc,false)+"</span>";
				}},
				{display : '操作',render: function (row) {
					var alarmTab = $("#timeType").val();
					var queryPattern = $('input[id=queryPatternAlarm][checked]').val();
					if(queryPattern==1) {
						startdate = $("#startDatevehiclealarm").val();
						enddate = $("#endDatevehiclealarm").val();
					} else {
						startdate = 'null';
						enddate = 'null';
					};
					return "<a title=\"统计图\" style=\"cursor: pointer;\" onclick=\"vehicleAlarmObj.vehicleAlarmopenW('"+row.vid+"','"+alarmTab+"','"+queryPattern+"','"+startdate+"','"+enddate+"','"+row.vinCode+"')\" ><img src='images/global/bingtu.gif' border='0'/> </a>";
			      } , width : 60}
	    		],
	    		showCheckbox:false,
	    		sortName:'vehicleNo',
	    		url:'vehiclestat/findAlarmStatList.action?alarmTypeTab=A002',
	    		exportAction : "vehiclestat/exportGridForVehicleAlarm.action?alarmTypeTab=A002",
	    		showTitle:false,
	    		pageSize:30,
	    		/*pageSizeOptions:[10,20,30,40],*/
	    		height: that.height - that.titleHeight-70,
	    		autoLoad:false,
	    		//填充数据的tableid
	            tableId: 'vehicleAlarmgrid2',
	            //查询条件formid
	            searchFormId :'vehicleAlarmForm',
	            gridBeforeSubmit: function () {
	            	var treeStr = that.leftTree.getGridSelectRowID().toString();

					$("#vehicleAlarmvidInStr").val(treeStr);
					if (treeStr == "") {
						$.ligerDialog.alert("请选择车辆！", "提示");
						return false;
					}

					if($("input:radio[id='queryPatternAlarm']:checked").val()=='1') {
						that.curStartDate = $("#startDatevehiclealarm").val();
						that.curEndDate = $("#endDatevehiclealarm").val();
						if(that.curStartDate==""){
							$.ligerDialog.alert("开始时间不能为空", "信息提示");
							return false;
						}
						if(that.curEndDate==""){
							$.ligerDialog.alert("结束时间不能为空", "信息提示");
							return false;
						}
						var startdate=Number((that.curStartDate.replace('-','')).replace('-',''));
						var enddate  =Number((that.curEndDate.replace('-','')).replace('-',''));
						if(startdate > enddate){
							$.ligerDialog.alert("结束时间不能少于开始时间", "信息提示");
							return false;
						}
	        		}

	            	return true;
	            }

		};
		that.gridC = new ctfoGrid(options2);
		var options3 = {
				columns:[
				{display: '所属企业', name : 'pentName', width : 80},
				{display: '车队', name : 'teamName', width : 60},
				{display: '车牌号', name : 'vehicleNo', width : 80},
				{display: '车辆VIN', name : 'vinCode', width : 110},
				{display: '水位低告警(次)', name : 'A003SWDBJ', width : 90,
					render : function(row) {
						return "<span>"+FilterData(row.A003SWDBJ,false)+"</span>";
					}},
				{display: '机滤堵塞告警(次)', name : 'A003JLDSXH', width : 100,
					render : function(row) {
						return "<span>"+FilterData(row.A003JLDSXH,false)+"</span>";
					}},
				{display: '发动机仓温告警(次)', name : 'A003CWBJXH', width : 110,
					render : function(row) {
						return "<span>"+FilterData(row.A003CWBJXH,false)+"</span>";
					}},
				{display: '制动蹄片磨损(次)', name : 'A003ZDTPMSBJ', width : 100,
					render : function(row) {
						return "<span>"+FilterData(row.A003ZDTPMSBJ,false)+"</span>";
					}},
				{display: '燃油不足告警(次)', name : 'A003RYGJ', width : 100,
						render : function(row) {
					return "<span>"+FilterData(row.A003RYGJ,false)+"</span>";
				}},
				{display: '制动气压告警(次)', name : 'A003ZDQYBJ', width : 100,
					render : function(row) {
						return "<span>"+FilterData(row.A003ZDQYBJ,false)+"</span>";
					}},
				{display: '机油压力告警(次)', name : 'A003YYBJ', width : 100,
					render : function(row) {
						return "<span>"+FilterData(row.A003YYBJ,false)+"</span>";
					}},
				{display: '燃油堵塞告警(次)', name : 'A003RYDSXH', width : 100,
					render : function(row) {
						return "<span>"+FilterData(row.A003RYDSXH,false)+"</span>";
					}},
				{display: '缓速器高温告警(次)', name : 'A003HSQGWBJXH', width : 110,
					render : function(row) {
						return "<span>"+FilterData(row.A003HSQGWBJXH,false)+"</span>";
					}},
				{display: '机油温度告警(次)', name : 'A003JYWDBJXH', width : 100,
					render : function(row) {
						return "<span>"+FilterData(row.A003JYWDBJXH,false)+"</span>";
					}},
				{display: '空滤堵塞告警(次)', name : 'A003KLDSBJ', width : 100,
					render : function(row) {
						return "<span>"+FilterData(row.A003KLDSBJ,false)+"</span>";
					}},
				{display: '冷却液温度告警(次)', name : 'A003LQYWDBJ', width : 110,
					render : function(row) {
						return "<span>"+FilterData(row.A003LQYWDBJ,false)+"</span>";
					}},
				{display: '蓄电池电压告警(次)', name : 'A003XDCDYBJ', width : 110,
					render : function(row) {
						return "<span>"+FilterData(row.A003XDCDYBJ,false)+"</span>";
					}},
				{display: 'ABS故障告警(次)', name : 'A003ABSGZBJ', width : 100,
					render : function(row) {
						return "<span>"+FilterData(row.A003ABSGZBJ,false)+"</span>";
					}},
				{display: '告警时间', name : 'alarmTimeNoUtc', width : 80,
					render : function(row) {
						if(row.alarmTime<0)
							return "--";
						else
							return "<span>"+FilterData(row.alarmTimeNoUtc,false)+"</span>";
				}},
				{display : '操作',render: function (row) {
					var alarmTab = $("#timeType").val();
					var queryPattern = $('input[id=queryPatternAlarm][checked]').val();
					if(queryPattern==1) {
						startdate = $("#startDatevehiclealarm").val();
						enddate = $("#endDatevehiclealarm").val();
					} else {
						startdate = 'null';
						enddate = 'null';
					};
					return "<a title=\"统计图\" style=\"cursor: pointer;\" onclick=\"vehicleAlarmObj.vehicleAlarmopenW('"+row.vid+"','"+alarmTab+"','"+queryPattern+"','"+startdate+"','"+enddate+"','"+row.vinCode+"')\" ><img src='images/global/bingtu.gif' border='0'/> </a>";
			      } , width : 60}
	    		],
	    		showCheckbox:false,
	    		sortName:'vehicleNo',
	    		url:'vehiclestat/findAlarmStatList.action?alarmTypeTab=A003',
	    		exportAction : "vehiclestat/exportGridForVehicleAlarm.action?alarmTypeTab=A003",
	    		showTitle:false,
	    		pageSize:30,
	    		/*pageSizeOptions:[10,20,30,40],*/
	    		height: that.height - that.titleHeight-70,
	    		autoLoad:false,
	    		//填充数据的tableid
	            tableId: 'vehicleAlarmgrid3',
	            //查询条件formid
	            searchFormId :'vehicleAlarmForm',
	            gridBeforeSubmit: function () {
	            	var treeStr = that.leftTree.getGridSelectRowID().toString();

					$("#vehicleAlarmvidInStr").val(treeStr);
					if (treeStr == "") {
						$.ligerDialog.alert("请选择车辆！", "提示");
						return false;
					}

					if($("input:radio[id='queryPatternAlarm']:checked").val()=='1') {
						that.curStartDate = $("#startDatevehiclealarm").val();
						that.curEndDate = $("#endDatevehiclealarm").val();
						if(that.curStartDate==""){
							$.ligerDialog.alert("开始时间不能为空", "信息提示");
							return false;
						}
						if(that.curEndDate==""){
							$.ligerDialog.alert("结束时间不能为空", "信息提示");
							return false;
						}
						var startdate=Number((that.curStartDate.replace('-','')).replace('-',''));
						var enddate  =Number((that.curEndDate.replace('-','')).replace('-',''));
						if(startdate > enddate){
							$.ligerDialog.alert("结束时间不能少于开始时间", "信息提示");
							return false;
						}
	        		}

	            	return true;
	            }

		};
		that.gridD = new ctfoGrid(options3);
		var options4 = {
				columns:[
				{display: '所属企业', name : 'pentName', width : 80},
				{display: '车队', name : 'teamName', width : 60},
				{display: '车牌号', name : 'vehicleNo', width : 80},
				{display: '车辆VIN', name : 'vinCode', width : 110},
				{display: '导航模块故障(次)', name : 'A004GNSSMKGZBJ', width : 100,
				    render : function(row) {
				        return "<span>"+FilterData(row.A004GNSSMKGZBJ,false)+"</span>";
				}},
				{display: '导航天线未接(次)', name : 'A004GNSSTXWJHBJDBJ', width : 100,
					render : function(row) {
						return "<span>"+FilterData(row.A004GNSSTXWJHBJDBJ,false)+"</span>";
				}},
				{display: '导航天线短路(次)', name : 'A004DHTXDL', width : 100,
                    render : function(row) {
                        return "<span>"+FilterData(row.A004DHTXDL,false)+"</span>";
                }},
				{display: '终端主电源欠压(次)', name : 'A004ZDZDYQYBJ', width : 110,
				    render : function(row) {
				        return "<span>"+FilterData(row.A004ZDZDYQYBJ,false)+"</span>";
				}},
				{display: '终端主电源掉电(次)', name : 'A004ZDZDYDDBJ', width : 110,
				    render : function(row) {
				        return "<span>"+FilterData(row.A004ZDZDYDDBJ,false)+"</span>";
				}},
				{display: '终端显示屏故障(次)', name : 'A004ZDXSPGZ', width : 110,
                    render : function(row) {
                        return "<span>"+FilterData(row.A004ZDXSPGZ,false)+"</span>";
                }},
                {display: '语音模块故障(次)', name : 'A004YYMKGZ', width : 100,
                    render : function(row) {
                        return "<span>"+FilterData(row.A004YYMKGZ,false)+"</span>";
                }},
				{display: '摄像头故障(次)', name : 'A004SXTGZBJ', width : 100,
					render : function(row) {
						return "<span>"+FilterData(row.A004SXTGZBJ,false)+"</span>";
				}},
				{display: '速度传感器故障(次)', name : 'A004GNSSTXDLBJ', width : 110,
					render : function(row) {
						return "<span>"+FilterData(row.A004GNSSTXDLBJ,false)+"</span>";
				}},
				{display: '车辆严重故障(次)', name : 'A004YZGZ', width : 100,
				    render : function(row) {
				        return "<span>"+FilterData(row.A004YZGZ,false)+"</span>";
				}},
				{display: '告警时间', name : 'alarmTimeNoUtc', width : 80,
					render : function(row) {
						if(row.alarmTime<0)
							return "--";
						else
							return "<span>"+FilterData(row.alarmTimeNoUtc,false)+"</span>";
				}},
				{display : '操作',render: function (row) {
					var alarmTab = $("#timeType").val();
					var queryPattern = $('input[id=queryPatternAlarm][checked]').val();
					if(queryPattern==1) {
						startdate = $("#startDatevehiclealarm").val();
						enddate = $("#endDatevehiclealarm").val();
					} else {
						startdate = 'null';
						enddate = 'null';
					};
					return "<a title=\"统计图\" style=\"cursor: pointer;\" onclick=\"vehicleAlarmObj.vehicleAlarmopenW('"+row.vid+"','"+alarmTab+"','"+queryPattern+"','"+startdate+"','"+enddate+"','"+row.vinCode+"')\" ><img src='images/global/bingtu.gif' border='0'/> </a>";
			      } , width : 60}
	    		],
	    		showCheckbox:false,
	    		sortName:'vehicleNo',
	    		url:'vehiclestat/findAlarmStatList.action?alarmTypeTab=A004',
	    		exportAction : "vehiclestat/exportGridForVehicleAlarm.action?alarmTypeTab=A004",
	    		showTitle:false,
	    		pageSize:30,
	    		/*pageSizeOptions:[10,20,30,40],*/
	    		height: that.height - that.titleHeight-70,
	    		autoLoad:false,
	    		//填充数据的tableid
	            tableId: 'vehicleAlarmgrid4',
	            //查询条件formid
	            searchFormId :'vehicleAlarmForm',
	            gridBeforeSubmit: function () {
	            	var treeStr = that.leftTree.getGridSelectRowID().toString();

					$("#vehicleAlarmvidInStr").val(treeStr);
					if (treeStr == "") {
						$.ligerDialog.alert("请选择车辆！", "提示");
						return false;
					}

					if($("input:radio[id='queryPatternAlarm']:checked").val()=='1') {
						that.curStartDate = $("#startDatevehiclealarm").val();
						that.curEndDate = $("#endDatevehiclealarm").val();
						if(that.curStartDate==""){
							$.ligerDialog.alert("开始时间不能为空", "信息提示");
							return false;
						}
						if(that.curEndDate==""){
							$.ligerDialog.alert("结束时间不能为空", "信息提示");
							return false;
						}
						var startdate=Number((that.curStartDate.replace('-','')).replace('-',''));
						var enddate  =Number((that.curEndDate.replace('-','')).replace('-',''));
						if(startdate > enddate){
							$.ligerDialog.alert("结束时间不能少于开始时间", "信息提示");
							return false;
						}
	        		}

	            	return true;
	            }

		};
		that.gridE = new ctfoGrid(options4);
		var options5 = {
				columns:[
				{display: '所属企业', name : 'pentName', width : 80},
				{display: '车队', name : 'teamName', width : 60},
				{display: '车牌号', name : 'vehicleNo', width : 80},
				{display: '车辆VIN', name : 'vinCode', width : 110},
				{display: 'SOS告警(次)', name : 'A005JJBJ', width : 80,
					render : function(row) {
						return "<span>"+FilterData(row.A005JJBJ,false)+"</span>";
				}},
				/*隐藏不显示
				{display: '预警(次)', name : 'A005YJ', width : 80,
                    render : function(row) {
                        return "<span>"+FilterData(row.A005YJ,false)+"</span>";
                }},*/
                {display: '进出路线(次)', name : 'A005JCLX', width : 80,
                    render : function(row) {
                        return "<span>"+FilterData(row.A005JCLX,false)+"</span>";
                }},
                {display: '路线行驶时间不足/过长(次)', name : 'A005LXXSSJBZGC', width : 160,
                    render : function(row) {
                        return "<span>"+FilterData(row.A005LXXSSJBZGC,false)+"</span>";
                }},
                /*隐藏不显示
                {display: '车辆油量异常(次)', name : 'A005CLYHYC', width : 110,
                    render : function(row) {
                        return "<span>"+FilterData(row.A005CLYHYC,false)+"</span>";
                }},
                {display: '车辆被盗(次)', name : 'A005CLBD', width : 80,
                    render : function(row) {
                        return "<span>"+FilterData(row.A005CLBD,false)+"</span>";
                }},*/
				{display: '车辆非法点火(次)', name : 'A005FFDHBJ', width : 110,
					render : function(row) {
						return "<span>"+FilterData(row.A005FFDHBJ,false)+"</span>";
				}},
				/*隐藏不显示
				{display: '车辆非法位移(次)', name : 'A005CLFFWY', width : 110,
                    render : function(row) {
                        return "<span>"+FilterData(row.A005CLFFWY,false)+"</span>";
                }},
                {display: '碰撞侧翻报警(次)', name : 'A005PZCFBJ', width : 110,
                    render : function(row) {
                        return "<span>"+FilterData(row.A005PZCFBJ,false)+"</span>";
                }},*/
				{display: '开门告警(次)', name : 'A005KMBJ', width : 80,
					render : function(row) {
						return "<span>"+FilterData(row.A005KMBJ,false)+"</span>";
				}},
				{display : '操作',render: function (row) {
					var alarmTab = $("#timeType").val();
					var queryPattern = $('input[id=queryPatternAlarm][checked]').val();
					if(queryPattern==1) {
						startdate = $("#startDatevehiclealarm").val();
						enddate = $("#endDatevehiclealarm").val();
					} else {
						startdate = 'null';
						enddate = 'null';
					};
					return "<a title=\"统计图\" style=\"cursor: pointer;\" onclick=\"vehicleAlarmObj.vehicleAlarmopenW('"+row.vid+"','"+alarmTab+"','"+queryPattern+"','"+startdate+"','"+enddate+"','"+row.vinCode+"')\" ><img src='images/global/bingtu.gif' border='0'/> </a>";
			      } , width : 60}
	    		],
	    		showCheckbox:false,
	    		sortName:'vehicleNo',
	    		url:'vehiclestat/findAlarmStatList.action?alarmTypeTab=A005',
	    		exportAction : "vehiclestat/exportGridForVehicleAlarm.action?alarmTypeTab=A005",
	    		showTitle:false,
	    		pageSize:30,
	    		/*pageSizeOptions:[10,20,30,40],*/
	    		height: that.height - that.titleHeight-70,
	    		autoLoad:false,
	    		//填充数据的tableid
	            tableId: 'vehicleAlarmgrid5',
	            //查询条件formid
	            searchFormId :'vehicleAlarmForm',
	            gridBeforeSubmit: function () {
	            	var treeStr = that.leftTree.getGridSelectRowID().toString();

					$("#vehicleAlarmvidInStr").val(treeStr);
					if (treeStr == "") {
						$.ligerDialog.alert("请选择车辆！", "提示");
						return false;
					}

					if($("input:radio[id='queryPatternAlarm']:checked").val()=='1') {
						that.curStartDate = $("#startDatevehiclealarm").val();
						that.curEndDate = $("#endDatevehiclealarm").val();
						if(that.curStartDate==""){
							$.ligerDialog.alert("开始时间不能为空", "信息提示");
							return false;
						}
						if(that.curEndDate==""){
							$.ligerDialog.alert("结束时间不能为空", "信息提示");
							return false;
						}
						var startdate=Number((that.curStartDate.replace('-','')).replace('-',''));
						var enddate  =Number((that.curEndDate.replace('-','')).replace('-',''));
						if(startdate > enddate){
							$.ligerDialog.alert("结束时间不能少于开始时间", "信息提示");
							return false;
						}
	        		}

	            	return true;
	            }

		};
		that.gridF = new ctfoGrid(options5);

		//$("#startDate").ligerDateEditor();
		//$("#endDate").ligerDateEditor();
	},

	vehicleAlarmopenW : function(vid,alarmTab,queryPattern,startdate,enddate,vinCode,vehicleNo) {
		var vinCodeU = encodeURI(encodeURI(vinCode));
		var vno = encodeURI(encodeURI(vehicleNo));
		$("#mainWorkArea").A_Window({
			dragabId: 'mainWorkArea', //可拖动的范围
			width : 600, // 宽度
			height : 500,// 高度
			load_fn:function(){
                 	 //加载完成之后回调的函数 可以用来注册关闭方法
                      $("#alarmClose").click(function(){$("#mainWorkArea").close_ALL_Window(); //或者是$("#contentvehicleOllManagerContent").close_A_Window({id:'这个窗口的ID'})})
                 })},
			url: "model/energymanagement/alarmchart.jsp?vid="+vid+"&alarmTab="+alarmTab+"&alarmType="+$("#alarmType").val()+"&queryPattern="+queryPattern+"&startdate="+startdate+"&enddate="+enddate+"&vin="+vinCodeU+"&vehicleNo="+vno //目标页面或action的地址
		},"text");
	},

	changeRedioaa : function(value) {
		$("input[id='queryPatternAlarm']:eq("+value+")").attr("checked", 'checked');

	},
	vehicleAlarmt:function() {
		if($("#alarmType").val()=='A000') {
			$("#vehicleAlarmgrid").show();
			$("#vehicleAlarmgrid1").hide();
			$("#vehicleAlarmgrid2").hide();
			$("#vehicleAlarmgrid3").hide();
			$("#vehicleAlarmgrid4").hide();
			$("#vehicleAlarmgrid5").hide();
		} else if($("#alarmType").val()=='A001') {
			$("#vehicleAlarmgrid1").show();
 			$("#vehicleAlarmgrid").hide();
			$("#vehicleAlarmgrid2").hide();
			$("#vehicleAlarmgrid3").hide();
			$("#vehicleAlarmgrid4").hide();
			$("#vehicleAlarmgrid5").hide();
		}  else if($("#alarmType").val()=='A002') {
			$("#vehicleAlarmgrid2").show();
 			$("#vehicleAlarmgrid").hide();
			$("#vehicleAlarmgrid1").hide();
			$("#vehicleAlarmgrid3").hide();
			$("#vehicleAlarmgrid4").hide();
			$("#vehicleAlarmgrid5").hide();
		}  else if($("#alarmType").val()=='A003') {
			$("#vehicleAlarmgrid3").show();
 			$("#vehicleAlarmgrid").hide();
			$("#vehicleAlarmgrid1").hide();
			$("#vehicleAlarmgrid2").hide();
			$("#vehicleAlarmgrid4").hide();
			$("#vehicleAlarmgrid5").hide();
		}  else if($("#alarmType").val()=='A004') {
			$("#vehicleAlarmgrid4").show();
			$("#vehicleAlarmgrid").hide();
			$("#vehicleAlarmgrid1").hide();
			$("#vehicleAlarmgrid2").hide();
			$("#vehicleAlarmgrid3").hide();
			$("#vehicleAlarmgrid5").hide();
		} else if($("#alarmType").val()=='A005') {
			$("#vehicleAlarmgrid5").show();
  			$("#vehicleAlarmgrid").hide();
 			$("#vehicleAlarmgrid1").hide();
			$("#vehicleAlarmgrid2").hide();
			$("#vehicleAlarmgrid3").hide();
			$("#vehicleAlarmgrid4").hide();
		}
        //清空所有隐藏grid的原有查询结果，避免在查询后更改类型再改回来时造“成这次查询已经生成的假象”。参见TD bugid 618
		var obj = safeManager.showObj;
		obj.clearGridThatIsHidden(obj.gridA);
		obj.clearGridThatIsHidden(obj.gridB);
		obj.clearGridThatIsHidden(obj.gridC);
		obj.clearGridThatIsHidden(obj.gridD);
		obj.clearGridThatIsHidden(obj.gridE);
		obj.clearGridThatIsHidden(obj.gridF);

	},
	clearGridThatIsHidden : function(grid) {
	    //因为liger grid没有清空grid的方法，故采用本地刷入空数据的方法进行清空
        var obj = safeManager.showObj;
        if (grid != obj.getCurGrid()) {
            var manager = grid.gridManager;
            manager.setOptions({
                dataType : 'local',
                dataAction : 'local',
                data:{"Rows":[],"Total":"0"}
            });
            manager.loadDataOut();
            manager.setOptions({
                dataType : 'server',
                dataAction : 'server',
                record : 'Total'//此为保证再次查询时不影响分页
            });
        }
    },
	bindSubmit : function(){
	    var obj = this;
	    var form = $("#vehicleAlarmForm");
	    //屏蔽之前的自动处理
	    form.unbind("submit");
	    //重新进行绑定,仅提交当前显示Grid的查询请求，其他与ctfoGrid类的处理一致。
	    form.submit(function() {
	        var curGrid = safeManager.showObj.getCurGrid();
            var su = true;
            if (curGrid.active) {
                if (curGrid.options.gridBeforeSubmit) {
                    su = curGrid.options.gridBeforeSubmit(curGrid.options.beforeSubmitScope||curGrid);
                }
            }
            if (su) {
                if (curGrid.active) {
                    curGrid.search();
                }
                return false;
            }
            return false;
        });
	},
	bindExportBtnClick : function(){
	    $("#gridExport").bind("click",function(){safeManager.showObj.exportGridToExcel();});
	},
	exportGridToExcel : function(){
	    var obj = this;
	    obj.getCurGrid().exportExcel(1, 2);
	},
	getCurGrid : function(){
	    var curGrid = null;
	    var alarmType = $("#alarmType").val();
        if (alarmType == "A001"){
            curGrid = safeManager.showObj.gridB;
        } else if (alarmType == "A002"){
            curGrid = safeManager.showObj.gridC;
        } else if (alarmType == "A003"){
            curGrid = safeManager.showObj.gridD;
        } else if (alarmType == "A004"){
            curGrid = safeManager.showObj.gridE;
        } else if (alarmType == "A005"){
            curGrid = safeManager.showObj.gridF;
        } else {//默认类型为全部
            curGrid = safeManager.showObj.gridA;
        }
        return curGrid;
	}
};


$(document).ready(function() {
	var vehicleAlarmObj = new vehicleAlarmList();
	window.vehicleAlarmObj=vehicleAlarmObj;
	safeManager.addChildList(vehicleAlarmObj);
	safeManager.showObj = vehicleAlarmObj;
	//因6个grid共用一个form，需手动对form的onSubmit进行处理和绑定其他按钮
	vehicleAlarmObj.bindSubmit();
	vehicleAlarmObj.bindExportBtnClick();
});
