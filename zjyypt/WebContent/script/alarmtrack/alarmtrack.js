var AlarmTrackObj = function() {
	this.ALARMTRACK_EMP = false;// 导出
	this.titleHeight = $("#alarmtrackSearchForm").height();
};
AlarmTrackObj.prototype = {
	cache : {
		alarmLevelList : []

	},
	tvdiTree : function() {// 初始化组织结构Tree
		var obj = this;
//		obj.leftTree = KCPT.root.leftTree;
//		obj.leftTree.hideTabs();
//		obj.leftTree.hidengrid();
//		obj.leftTree.show();
//		obj.leftTree.triggerShowObj = obj;
		KCPT.root.triggerShowObj = obj;
	},
//	show : function() {
//		var obj = this;
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
				sortable : true,
				align : 'center',
				render : function(row) {
					var html = "";
					if (row.vehicleNo && row.vid) {
						html = '<a href="javascript:alarmTrackObj.showVehicle(' + row.vid + ')">' + row.vehicleNo + '</a>';
					} else {
						html = "--";
					}
					return html;
				}
			},{
				display : '报警类型',
				name : 'alarmTypeName',
				width : 150,
				sortable : true,
				type: 'string',
				isSort:true,
				align : 'center',
				render : function(row) {
					var html = "";
					if (row.alarmTypeName && row.alarmId) {
						var alarmId = row.alarmId;
						html = '<a onclick=alarmTrackObj.showDealStat(\'' + alarmId + '\') href=\'javascript:void(0)\' >' + row.alarmTypeName + ' </a>';

					} else {
						html = "--";
					}
					return html;
				}
			}, {
				display : '报警级别',
				name : 'alarmLevel',
				width : 80,
				sortable : true,
				type: 'string',
				isSort:true,
				align : 'center',
				render : function(row) {
					if ("" != row.alarmLevel) {
						return row.alarmLevel;
					} else {
						return "--";
					}
				}
			}, {
				display : '报警来源',
				name : 'alarmSource',
				width : 100,
				sortable : true,
				align : 'center',
				render : function(row) {
					var returnVal = "--";
					if (parseInt(row.alarmSource) == 1) {
						returnVal = "车载终端";
					} else if (parseInt(row.alarmSource) == 2) {
						returnVal = "企业监控平台";
					} else if (parseInt(row.alarmSource) == 3) {
						returnVal = "政府监管平台";
					} else if (parseInt(row.alarmSource) == 9) {
						returnVal = "其他";
					}
					return returnVal;
				}
			},{
				display : '处理状态',
				name : 'alarmHandlerStatusType',
				width : 100,
				sortable : true,
				align : 'center',
				render : function(row) {
					if ("0" == row.alarmHandlerStatusType) {
						return "不作处理";
					} else if ("-1" == row.alarmHandlerStatusType) {
						return "<div class=\"monitor_bottom_statements_processing\" onclick=alarmTrackObj.alarmProcess('"+ row.vid + "','"+ row.vehicleNo + "');><a href=\"javascript:void(0);\" onfocus=\"javascript:this.blur();\">&nbsp;</a></div>";
					} else if ("1" == row.alarmHandlerStatusType) {
						return "将来处理";
					} else if ("2" == row.alarmHandlerStatusType) {
						return "处理完毕 ";
					} else {
						return "--";
					}
				}
			}, {
				display : '报警车速(Km/h)',
				name : 'alarmSpeed',
				width : 100,
				sortable : true,
				align : 'center',
				render : function(row) {
					if (row.alarmSpeed) {
						return row.alarmSpeed;
					} else {
						return "--";
					}
				}
			}, {
				display : '报警时间',
				name : 'sysUtc',
				width : 160,
				sortable : true,
				align : 'center',
				render : function(row) {
					if (null != row.sysUtc && undefined != row.sysUtc && "" != row.sysUtc) {
						return utc2Date(row.sysUtc);
					} else {
						return "--";
					}
				}
			}, {
				display : '开始时间',
				name : 'statrTime',
				width : 180,
				sortable : true,
				align : 'center',
				render : function(row) {
					if (null != row.statrTime && undefined != row.statrTime && "" != row.statrTime) {
						return utc2Date(row.statrTime);
					} else {
						return "--";
					}
				}
			}, {
				display : '结束时间',
				name : 'endTime',
				width : 160,
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
				display : '报警具体描述',
				name : 'alarmAddInfo',
				width : 150,
				sortable : true,
				type: 'string',
				isSort:true,
				align : 'center',
				render : function(row) {
					if ("" != row.alarmAddInfo) {
						return "<div title='"+row.alarmAddInfo+"'>"+row.alarmAddInfo+"</div>";
					} else {
						return "--";
					}
				}
			}, {
				display : '所属车队',
				name : 'teamName',
				width : 100,
				sortable : true,
				type: 'string',
				isSort:true,
				align : 'center',
				render : function(row) {
					if ("" != row.teamName) {
						return row.teamName;
					} else {
						return "--";
					}
				}
			},{
				display : '所属企业',
				name : 'corpName',
				width : 150,
				sortable : true,
				type: 'string',
				isSort:true,
				align : 'center',
				render : function(row) {
					if ("" != row.corpName) {
						return row.corpName;
					} else {
						return "--";
					}
				}
			}, {
				display : '报警位置',
				name : 'alarmPlace',
				width : 250,
				sortable : true,
				align : 'center',
				render : function(row) {
					if (row.lat && row.lon){
						return '<div onmouseover="javascript:alarmTrackObj.findAlarmAddress('+row.lat+','+row.lon+',this)"><a>获取位置<a></div>';
					}else{
						return "--";
					}
				}
			}
			],
			timeout : 60000,
			showCheckbox : false,
			sortName : 'vehicleNo',
			url : 'operationmanagement/queryAlarmTrackCount.action',// 数据请求地址
			exportAction : 'operationmanagement/exportExcelDataQueryAlarmTrack.action',
			// data:{},
			showTitle : false,
			pageSize : 20,
			/*pageSizeOptions : [ 10, 20, 30, 40 ],*/
			height : tvdiHeight,
			width:"99.8%",
			autoLoad : false,
			gridDIV : "alarmtrackGrid",
			contentDiv : "alarmtrack",
			// 填充数据的tableid
			tableId : 'alarmtrackGrid',
			// 查询条件formid
			searchFormId : 'alarmtrackSearchForm',
			mainContain : "alarmtrack",
			Buttons : [ {// 导出
				id : "alarmtrackExportExcel",
				fun : function() {
					obj.grid.exportExcel(1, 2);
				}
			} ],
			onAfterShowData:function(){
				 $("#alarmtrackGrid").find(".pcontrol").parent().css({"width":"120"});
				 //$("#alarmtrackGrid").find(".l-grid-body-inner").removeAttr("style"); 2012-12-21 11:50 lidongxia 注释是为了当表格宽度宽于最大宽度时上下表格对不齐，注释之后就能对齐了
				 
				 $("#alarmtrackGrid").find(".l-panel-bbar-inner").attr('style','width:auto');
				
			},		
			gridBeforeSubmit : function() {
				obj.backToTrack();
				var entId = KCPT.user.entId;
				if (!entId) {
					$.ligerDialog.warn("获取组织ID失败！", "提示");
					return false;
				}
				var selectParams = "";

				// 时间
				var dmsgSrtimeStart = $("#aaccee").val();
				var dmsgSrtimeEnd = $("#alarmtrackSearchForm").find("input[name='endTime']").val();
				if (!dmsgSrtimeStart || !dmsgSrtimeEnd) {
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
					if ( date2utc(dmsgSrtimeEnd)-date2utc(dmsgSrtimeStart)>604800000) {
						$.ligerDialog.warn("时间跨度不能超过一周！", "提示");
						return false;
					}
					var nowDate = getnowTime();
					if (dmsgSrtimeStart > nowDate) {
						$.ligerDialog.warn("开始时间不能大于当前时间！", "提示");
						return false;
					}
					if (dmsgSrtimeEnd > nowDate) {
						$.ligerDialog.warn("结束时间不能大于当前时间！", "提示");
						return false;
					}
				}
				$("#tvdiSelectParams").empty();
				$("#tvdiSelectParams").append(selectParams);

				// 这里就要调用另外一个接口用来查询前面的统计数据
				obj.loadCountData();
				obj.alarmCodeChange();//查询之前根据当前的报警类型，改变gird列
				return true;
			}
		};
		obj.grid = new ctfoFormWithGrid(options).getGrid();
		obj.gridManager = $("#alarmtrackGrid").ligerGetGridManager();
	},
	alarmProcess : function(vid,vehicleNo) {
		window.open("model/alarmHandler/alarmHandler.html?v=" + vid+"?flag=1", "alarmHandler", 'location=no,menubar=no,resizable=no,status=no,titlebar=no,top=0,left=0,height=' + $(window).height() + ',width=' + $(window).width() + ',menubar=0');
		vehicleNoValue = vehicleNo;//将车牌号码赋值给弹出框。
	},
	getAlarmType : function() {

		// var obj = this;
		// obj.alarmCode1 = [];
		// obj.alarmCode2 = [];
		// obj.alarmCode3 = [];
		// obj.alarmCode4 = [];
		// obj.alarmCode5 = [];
		// JAjax("operationmanagement/getAlarmType.action",{},'json',function(x){
		// if(x&&x.Rows.length>0){
		// var data = x.Rows;
		// for(var i = 0; i < data.length; i++){
		// var datai = data[i];
		//					
		// var parentAlarmCode = datai.parentAlarmCode;
		// //var levelName = datai.levelName;
		// //var alarmCode = datai.alarmCode;
		// //var alarmName = datai.alarmName;
		//					
		// if(parentAlarmCode=="A001"){
		// obj.alarmCode1.push(datai);
		// }else if(parentAlarmCode=="A002"){
		// obj.alarmCode2.push(datai);
		// }else if(parentAlarmCode=="A003"){
		// obj.alarmCode3.push(datai);
		// }else if(parentAlarmCode=="A004"){
		// obj.alarmCode4.push(datai);
		// }else if(parentAlarmCode=="A005"){
		// obj.alarmCode5.push(datai);
		// }
		// }
		// }
		// });

	},
	/**
	 * 初始化报警级别数据
	 */
	initAlarmlevel : function() {
		var setSel = function() {
			if (null != KCPT.monitorAlarmList_alarmCode) {
				// -1：全部报警列表 更多
				if ("-1" != KCPT.monitorAlarmList_alarmCode) {
					var _levelId = "";
					$(KCPT.cache.alarmLevelList).each(function(i) {
						if (this.alarmCode == KCPT.monitorAlarmList_alarmCode) {
							_levelId = this.levelCode;
						}
					});
					var alarmCodeSel = $("#parentAlarmCode");
					alarmCodeSel.find("option[value='" + _levelId + "']").attr("selected", "selected");
					_thisref.loadAlarmTypeList(_levelId);
					$("#alarmCode").find("option[value='" + KCPT.monitorAlarmList_alarmCode + "']").attr("selected", "selected");
					if(null!=KCPT.monitorAlarmList_VehicleNo){
						$("#alarmTrack_vehicleNoText").val(KCPT.monitorAlarmList_VehicleNo);
					}
				}
				KCPT.monitorAlarmList_alarmCode = null;
				$("#alarmtrackSearchForm").submit();
			}
		};

		var _thisref = this;
		if (KCPT.cache.alarmLevelList.length > 0) {
			setSel();
			return false;
		}
		for ( var i = 0; i < 5; i++) {
			JAjax("monitor/findAlarmLevel.action", {
				"requestParam.equal.levelId" : i
			}, 'json', function(data, err) {
				var _thisAjax = this;
				$(data).each(function(j) {
					var _obj = {
						alarmCode : this.alarmCode,
						alarmName : this.alarmName,
						levelCode : _thisAjax.data.split("=")[1]
					};
					KCPT.cache.alarmLevelList.push(_obj);
				});
				//if (2 == _thisAjax.data.split("=")[1]) {
					//setSel();
				//}
			}, function(data, err) {

			});
		}

	},
	bindChange : function() {
		var obj = this;
		$("#alarmtrackcontent").find("#parentAlarmCode").change(function() {
			// var value = $(this).val();
			// if(!value){
			// return;
			// }
			// var html = "<option value=''>请选择</option>";
			// var dataArry=null;
			// if(value=="A001"){
			// dataArry = obj.alarmCode1;
			// }else if(value=="A002"){
			// dataArry = obj.alarmCode2;
			// }else if(value=="A003"){
			// dataArry = obj.alarmCode3;
			// }else if(value=="A004"){
			// dataArry = obj.alarmCode4;
			// }
			// else if(value=="A005"){
			// dataArry = obj.alarmCode5;
			// }
			//			 
			// for(var i = 0; i < dataArry.length; i++){
			//				 
			// var datai = dataArry[i];
			// var value = datai.alarmCode;
			// var name = datai.alarmName;
			//
			// html += "<option value='" + value + "'>" + name + "</option>";
			// }
			//			 
			// $("#alarmtrackcontent").find("#alarmCode").find("option").remove();
			// $("#alarmtrackcontent").find("#alarmCode").append(html);
			$("#alarmCode").find("option").remove();
			$("#alarmTrack_alarmCodeArray").val("");
			var _levelId = $(this).find("option:selected").attr("value");
			obj.loadAlarmTypeList(_levelId);

			
		});
	},
	/**
	 * 加载报警类型列表
	 */
	loadAlarmTypeList : function(levelId) {
		var _thisref = this;
		var _levelType = $("#alarmCode");
		_levelType.find("option").remove();
		var options = "<option value='' selected>全部</option>";
		if (!levelId || "" == levelId) {
			_levelType.append(options);
			return false;
		}
		var _alarmCode = "";
		$(KCPT.cache.alarmLevelList).each(function(i) {
			if (this.levelCode == levelId) {
				if ("<option value='' selected>全部</option>" != options) {
					_alarmCode += ",";
				}
				options += "<option value='" + this.alarmCode + "'>" + this.alarmName + "</option>";
				_alarmCode += this.alarmCode;
			}
		});
		$("#alarmTrack_alarmCodeArray").val(_alarmCode);
		_levelType.append(options);
	},
	alarmCodeChange : function() {// 选择开门以及超速报警时，改变列
		var obj = this;
		// 原始列
		var defaultColumns = [ {
			display : '车牌号码',
			name : 'vehicleNo',
			width : 100,
			sortable : true,
			align : 'center',
			render : function(row) {
				var html = "";
				if (row.vehicleNo && row.vid) {
					html = '<a href="javascript:alarmTrackObj.showVehicle(' + row.vid + ')">' + row.vehicleNo + '</a>';
				} else {
					html = "--";
				}
				return html;
			}
		},{
			display : '报警类型',
			name : 'alarmTypeName',
			width : 150,
			sortable : true,
			align : 'center',
			render : function(row) {
				var html = "";
				if (row.alarmTypeName && row.alarmId) {
					var alarmId = row.alarmId;
					html = '<a onclick=alarmTrackObj.showDealStat(\'' + alarmId + '\') href=\'javascript:void(0)\' >' + row.alarmTypeName + ' </a>';
				} else {
					html = "--";
				}
				return html;
			}
		}, {
			display : '报警级别',
			name : 'alarmLevel',
			width : 100,
			sortable : true,
			align : 'center',
			render : function(row) {
				if ("" != row.alarmLevel) {
					return row.alarmLevel;
				} else {
					return "--";
				}
			}
		}, {
			display : '报警来源',
			name : 'alarmSource',
			width : 100,
			sortable : true,
			align : 'center',
			render : function(row) {
				var returnVal = "--";
				if (parseInt(row.alarmSource) == 1) {
					returnVal = "车载终端";
				} else if (parseInt(row.alarmSource) == 2) {
					returnVal = "企业监控平台";
				} else if (parseInt(row.alarmSource) == 3) {
					returnVal = "政府监管平台";
				} else if (parseInt(row.alarmSource) == 9) {
					returnVal = "其他";
				}
				return returnVal;
			}
		},{
			display : '处理状态',
			name : 'alarmHandlerStatusType',
			width : 100,
			sortable : true,
			align : 'center',
			render : function(row) {
				if ("0" == row.alarmHandlerStatusType) {
					return "不作处理";
				} else if ("-1" == row.alarmHandlerStatusType) {
					return "<div class=\"monitor_bottom_statements_processing\" onclick=alarmTrackObj.alarmProcess('" + row.vid + "','"+row.vehicleNo+"');><a href=\"javascript:void(0);\" onfocus=\"javascript:this.blur();\">&nbsp;</a></div>";
				} else if ("1" == row.alarmHandlerStatusType) {
					return "将来处理";
				} else if ("2" == row.alarmHandlerStatusType) {
					return "处理完毕 ";
				} else {
					return "--";
				}
			}
		}, {
			display : '报警车速(Km/h)',
			name : 'alarmSpeed',
			width : 100,
			sortable : true,
			align : 'center',
			render : function(row) {
				if (row.alarmSpeed) {
					return row.alarmSpeed;
				} else {
					return "--";
				}
			}
		}, {
			display : '报警时间',
			name : 'sysUtc',
			width : 160,
			sortable : true,
			align : 'center',
			render : function(row) {
				if (null != row.sysUtc && undefined != row.sysUtc && "" != row.sysUtc) {
					return utc2Date(row.sysUtc);
				} else {
					return "--";
				}
			}
		}, {
			display : '开始时间',
			name : 'statrTime',
			width : 180,
			sortable : true,
			align : 'center',
			render : function(row) {
				if (null != row.statrTime && undefined != row.statrTime && "" != row.statrTime) {
					return utc2Date(row.statrTime);
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
		},{
			display : '报警具体描述',
			name : 'alarmAddInfo',
			width : 150,
			sortable : true,
			type: 'string',
			isSort:true,
			align : 'center',
			render : function(row) {
				if ("" != row.alarmAddInfo) {
					return "<div title='"+row.alarmAddInfo+"'>"+row.alarmAddInfo+"</div>";
				} else {
					return "--";
				}
			}
		}, {
			display : '所属车队',
			name : 'teamName',
			width : 100,
			sortable : true,
			type: 'string',
			isSort:true,
			align : 'center',
			render : function(row) {
				if ("" != row.teamName) {
					return row.teamName;
				} else {
					return "--";
				}
			}
		},{
			display : '所属企业',
			name : 'corpName',
			width : 150,
			sortable : true,
			type: 'string',
			isSort:true,
			align : 'center',
			render : function(row) {
				if ("" != row.corpName) {
					return row.corpName;
				} else {
					return "--";
				}
			}
		}, {
			display : '报警位置',
			name : 'alarmPlace',
			width : 250,
			sortable : true,
			align : 'center',
			render : function(row) {
				if (row.lat && row.lon){
					return '<div onmouseover="javascript:alarmTrackObj.findAlarmAddress('+row.lat+','+row.lon+',this)"><a>获取位置<a></div>';
				}else{
					return "--";
				}
			}
		} ];

		// 超速报警的列
		var overSpeed = [ {
			display : '车牌号码',
			name : 'vehicleNo',
			width : 100,
			sortable : true,
			align : 'center',
			render : function(row) {
				var html = "";
				if (row.vehicleNo && row.vid) {
					html = '<a href="javascript:alarmTrackObj.showVehicle(' + row.vid + ')">' + row.vehicleNo + '</a>';
				} else {
					html = "--";
				}
				return html;
			}
		},{
			display : '报警类型',
			name : 'alarmTypeName',
			width : 150,
			sortable : true,
			align : 'center',
			render : function(row) {
				var html = "";
				if (row.alarmTypeName && row.alarmId) {
					var alarmId = row.alarmId;
					html = '<a onclick=alarmTrackObj.showDealStat(\'' + alarmId + '\') href=\'javascript:void(0)\' >' + row.alarmTypeName + ' </a>';
				} else {
					html = "--";
				}
				return html;
			}
		}, {
			display : '当班驾驶员',
			name : 'driverName',
			width : 100,
			sortable : true,
			align : 'center'
		},{
			display : '处理状态',
			name : 'alarmHandlerStatusType',
			width : 100,
			sortable : true,
			align : 'center',
			render : function(row) {
				if ("0" == row.alarmHandlerStatusType) {
					return "不作处理";
				} else if ("-1" == row.alarmHandlerStatusType) {
					return "<div class=\"monitor_bottom_statements_processing\" onclick=alarmTrackObj.alarmProcess('" + row.vid + "','"+row.vehicleNo+"');><a href=\"javascript:void(0);\" onfocus=\"javascript:this.blur();\">&nbsp;</a></div>";
				} else if ("1" == row.alarmHandlerStatusType) {
					return "将来处理";
				} else if ("2" == row.alarmHandlerStatusType) {
					return "处理完毕 ";
				} else {
					return "--";
				}
			}
		},  {
			display : '持续时间(秒)',
			name : 'holdTime',
			width : 100,
			sortable : true,
			align : 'center',
			render : function(row) {
				if (null != row.holdTime && "" != row.holdTime) {
					return row.holdTime;
				} else {
					return "--";
				}
			}
		}, {
			display : '最高车速(Km/h)',
			name : 'alarmSpeed',
			width : 100,
			sortable : true,
			align : 'center',
			render : function(row) {
				if (row.alarmSpeed) {
					return row.alarmSpeed;
				} else {
					return "--";
				}
			}
		}, {
			display : '报警时间',
			name : 'sysUtc',
			width : 160,
			sortable : true,
			align : 'center',
			render : function(row) {
				if (null != row.sysUtc && undefined != row.sysUtc && "" != row.sysUtc) {
					return utc2Date(row.sysUtc);
				} else {
					return "--";
				}
			}
		}, {
			display : '开始时间',
			name : 'statrTime',
			width : 150,
			sortable : true,
			align : 'center',
			render : function(row) {
				if (null != row.statrTime && undefined != row.statrTime && "" != row.statrTime) {
					return utc2Date(row.statrTime);
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
			display : '报警具体描述',
			name : 'alarmAddInfo',
			width : 150,
			sortable : true,
			type: 'string',
			isSort:true,
			align : 'center',
			render : function(row) {
				if ("" != row.alarmAddInfo) {
					return "<div title='"+row.alarmAddInfo+"'>"+row.alarmAddInfo+"</div>";
				} else {
					return "--";
				}
			}
		}, {
			display : '所属车队',
			name : 'teamName',
			width : 100,
			sortable : true,
			type: 'string',
			isSort:true,
			align : 'center',
			render : function(row) {
				if ("" != row.teamName) {
					return row.teamName;
				} else {
					return "--";
				}
			}
		},{
			display : '所属企业',
			name : 'corpName',
			width : 150,
			sortable : true,
			type: 'string',
			isSort:true,
			align : 'center',
			render : function(row) {
				if ("" != row.corpName) {
					return row.corpName;
				} else {
					return "--";
				}
			}
		}, {
			display : '超速地点',
			name : 'alarmPlace',
			width : 250,
			sortable : true,
			align : 'center',
			render : function(row) {
				if (row.lat && row.lon)
				{
					return '<div onmouseover="javascript:alarmTrackObj.findAlarmAddress('+row.lat+','+row.lon+',this)"><a>获取位置<a></div>';
				}else{
					return "--";
				}
			}
		} ];
		// 开门报警的列
		var openDoor = [ {
			display : '车牌号码',
			name : 'vehicleNo',
			width : 100,
			sortable : true,
			align : 'center',
			render : function(row) {
				var html = "";
				if (row.vehicleNo && row.vid) {
					html = '<a href="javascript:alarmTrackObj.showVehicle(' + row.vid + ')">' + row.vehicleNo + '</a>';
				} else {
					html = "--";
				}
				return html;
			}
		},{
			display : '报警类型',
			name : 'alarmTypeName',
			width : 150,
			sortable : true,
			align : 'center',
			render : function(row) {
				var html = "";
				if (row.alarmTypeName && row.alarmId) {
					var alarmId = row.alarmId;
					html = '<a onclick=alarmTrackObj.showDealStat(\'' + alarmId + '\') href=\'javascript:void(0)\' >' + row.alarmTypeName + ' </a>';
				} else {
					html = "--";
				}
				return html;
			}
		}, {
			display : '车辆编号',
			name : 'vehicleInnerNo',
			width : 100,
			sortable : true,
			align : 'center'
		}, {
			display : '开门类型',
			name : 'openDoorType',
			width : 150,
			sortable : true,
			align : 'center'
		}, {
			display : '开门时间',
			name : 'statrTime',
			width : 150,
			sortable : true,
			align : 'center',
			render : function(row) {
				if (null != row.statrTime && undefined != row.statrTime && "" != row.statrTime) {
					return utc2Date(row.statrTime);
				} else {
					return "--";
				}
			}
		}, {
			display : '开门车速(Km/h)',
			name : 'alarmSpeed',
			width : 100,
			sortable : true,
			align : 'center',
			render : function(row) {
				if (row.alarmSpeed) {
					return row.alarmSpeed;
				} else {
					return "--";
				}
			}
		}, {
			display : '开门地点',
			name : 'alarmPlace',
			width : 250,
			sortable : true,
			align : 'center',
			render : function(row) {
				if (row.lat && row.lon)
				{
					return '<div onmouseover="javascript:alarmTrackObj.findAlarmAddress('+row.lat+','+row.lon+',this)"><a>获取位置<a></div>';
				}else{
					return "--";
				}
			}
		}, {
			display : '报警时间',
			name : 'sysUtc',
			width : 160,
			sortable : true,
			align : 'center',
			render : function(row) {
				if (null != row.sysUtc && undefined != row.sysUtc && "" != row.sysUtc) {
					return utc2Date(row.sysUtc);
				} else {
					return "--";
				}
			}
		}, {
			display : '所属车队',
			name : 'teamName',
			width : 100,
			sortable : true,
			type: 'string',
			isSort:true,
			align : 'center',
			render : function(row) {
				if ("" != row.teamName) {
					return row.teamName;
				} else {
					return "--";
				}
			}
		},{
			display : '所属企业',
			name : 'corpName',
			width : 150,
			sortable : true,
			type: 'string',
			isSort:true,
			align : 'center',
			render : function(row) {
				if ("" != row.corpName) {
					return row.corpName;
				} else {
					return "--";
				}
			}
		} ];

		var value = $("#alarmtrackcontent").find("#alarmCode").val();
		if ("1" == value) {
			//obj.gridManager.reloadColumn(overSpeed);
			 obj.gridManager.setOptions({'columns' : overSpeed});
		} else if ("50" == value) {
			//obj.gridManager.reloadColumn(openDoor);
			 obj.gridManager.setOptions({'columns' : openDoor});
		} else {
			//obj.gridManager.reloadColumn(defaultColumns);
			obj.gridManager.setOptions({'columns' : defaultColumns});
		}
		//清空数据
		 $("#alarmtrackGrid").find(".l-grid-row,.l-grid-detailpanel,.l-grid-totalsummary").remove();
		var panelBar= $("#alarmtrackGrid").find(".l-panel-bar:eq(0)");
		panelBar.find(".l-bar-text").text("从0到0，总数0 条");
		panelBar.find(".pcontrol").find("input").val("1");
		panelBar.find(".pcontrol").find("input").unbind("keydown");
		panelBar.find(".pcontrol").find("span").text("1");
		panelBar.find(".l-bar-btnfirst").find("span").addClass("l-disabled");
		panelBar.find(".l-bar-btnprev").find("span").addClass("l-disabled");
		panelBar.find(".l-bar-btnnext").find("span").addClass("l-disabled");
		panelBar.find(".l-bar-btnlast").find("span").addClass("l-disabled");
		$("#alarmtrackfirsttable").find("table:eq(0)").find("tr").find("td").each(function(i) {
				$(this).html("");
		});
	},
	//获取个报警等级的报警数
	loadCountData : function() {
		/* 注销说明： 暂时不显示
		var obj = this;

		var data = $('#alarmtrackSearchForm').serializeArray();
		var d = {};
		var dmsgSrtimeStart = $("#aaccee").val();
		var dmsgSrtimeEnd = $("#alarmtrackSearchForm").find("input[name='endTime']").val();
		for ( var i = 0; i < data.length; i++) {
			var datai = data[i];
			if (datai.value) {
				d[datai.name] = $.trim(datai.value);
			}
		}
		d["requestParam.equal.startTime"] = date2utc(dmsgSrtimeStart);
		d["requestParam.equal.endTime"] = date2utcEnd(dmsgSrtimeEnd);
		JAjax("operationmanagement/getAlarmLeveNum.action", d, "json", function(x) {
			// 成功调用返回后解析数据
			x = eval(x);
			var data = x.Rows;
			if(data){
				$("#alarmtrackfirsttable").find("table").find("tr").find("td").each(function(i) {
					var datai = data[i];

					var levelName = "--";
					if (datai) {
						if (datai.levelName) {
							levelName = datai.levelName;
						}

						var levelAlarmCount = datai.levelAlarmCount;

						$(this).html(levelName + " : " + levelAlarmCount);
					}
				});
			}
	
			
		});*/
	},
	loadSecondCountData : function(alarmId) {
		var obj = this;
		var d = {};

		d["requestParam.equal.alarmId"] = alarmId;
		JAjax("operationmanagement/getAlarmDealNum.action", d, "json", function(x) {
			// 成功调用返回后解析数据
			x = eval(x);
			var data = x.Rows;
			$("#alarmtracksecondtable").find("table").eq(0).find("tr").find("td").each(function(i) {
				var name = $(this).find("span").attr("name");
				var value = data[0][name];

				if (name == "alarmSrc") {
					if (value == "1") {
						value = "车载终端"
					} else if (value == "2") {
						value = "车载终端"
					} else if (value == "3") {
						value = "车载终端"
					} else if (value == "9") {
						value = "车载终端"
					} else {
						value = "--";
					}
				} else if (name == "alarmHandlerStatus") {
					if (!value || value == "null") {
						value = "未处理";
					} else if (value == "0") {
						value = "未处理";
					} else if (value == "1") {
						value = "正在处理";
					} else if (value == "2") {
						value = "处理成功";
					} else if (value == "3") {
						value = "处理失败";
					}
				}
				if (!value || value == "null") {
					value = "--";
				}
				if (name || value) {
					$(this).find("span").html(value);
				}
			});
		});
	},
	// 点击车牌号码获得弹出的车辆详情方法
	showVehicle : function(vid) {
		var obj = this;
		VehilceDetailId = vid;
		$("#mainWorkArea").A_Window({ // 弹出层的父类的iD
			dragabId : 'mainWorkArea', // 可拖动的范围
			width : 800, // 宽度
			height : 555,// 高度
			load_fn : function() {
				$("#vehicleInfoClose").click(function() {
					$("#mainWorkArea").close_ALL_Window();
				});
				$("#vehicleInfoCloseRightTop").click(function() {
					$("#mainWorkArea").close_ALL_Window();
				});
			},
			url : "model/vehicleinfo/vehicleinfodetail.jsp" // "devicestatus/viewDevicestatus.action?vid=" + vid //目标页面或action的地址
		});
	},
	showDealStat : function(alarmId) { // 点击显示报警的处理明细
		var obj = this;
		// alarmId = alarmId.replaceAll("#","_");
		$("#alarmtrackcontent").find("#alarmtrackfirsttable").hide();

		$("#alarmtrackcontent").find("#alarmtracksecondtable").show();

		obj.loadSecondCountData(alarmId);
		obj.loadSecondGrid(alarmId);
	},
	backToTrack : function() {

		$("#alarmtrackcontent").find("#alarmtrackfirsttable").show();

		$("#alarmtrackcontent").find("#alarmtracksecondtable").hide();
	},
	bindEvent : function() {
		var obj = this;

		$("#alarmtrackcontent").find("#alarmtracksecondtable").find("#returntoalarmtrick").click(function() {
			obj.backToTrack();
		});
	},
	loadSecondGrid : function(alarmId) {
		var obj = this;

		var pp = {};
		var data = [];
		var dd = {};

		dd["name"] = "requestParam.equal.alarmId";
		dd["value"] = alarmId;

		data.push(dd);
		pp["parms"] = data;

		obj.secondgridManager.setOptions(pp);
		obj.secondgridManager.loadDataOut(true);
	},
	change : function(node, chlidrens, parent) {
		// 组织类型，1为企业，2为车队 node.data.entType
		// 父id 根节点为-1 node.data.parentId
		// 车队类型: 1:默认车队,0：不为默认车队 node.data.isdeteam
		// 父节点id parent.id 父节点名字 parent.name
		// 子节点id chlidrens[0].id 子节点名字 chlidrens[0].text
		var name = node.data.text;
		var opNodeName = $("#alarmtrackOrgName");
		var opEntId = $("#vehicleinfoOrgId");
		opNodeName.empty();
		opEntId.empty();
		opEntId.val(node.data.id);
		opNodeName.append(name.length > 12 ? name.substring(0, 10) + "..." : name);
		opNodeName.attr("title", name);
		if (node.data.entType == "1") {
			opEntId.attr("name", "requestParam.equal.corpId");
		} else {
			opEntId.attr("name", "requestParam.equal.corpId");
		}
		// this.operateLogSubmit(node.data.id);
		this.getAlarmType();
	},
	onResize : function() {//heightDiff 
		var obj = this;
		if(obj.gridManager){
			obj.gridManager.setHeight(obj.getGridHeight());
		}
	},
	// 增加的权限验证
	authentication : function() {
		this.ALARMTRACK_EMP = checkFunction("FG_MEMU_SAFE_ALARM_FOLLOW_EXPORT");// 导出
		if (!this.ALARMTRACK_EMP) {
			$("#alarmtrackExportExcel").remove();
		}
	},
	secondGrid : function() {
		// 初始化列表页面Grid
		var obj = this;
		var tvdiHeight = KCPT.root.getCenterSize().height;
		var titleHeight = $("#alarmtrackSearchForm").height();
		var options = {
			columns : [ {
				display : '车牌号码',
				name : 'vehicleNo',
				width : 100,
				sortable : true,
				align : 'center',
				toggle : false
			}, {
				display : '处理人',
				name : 'opName',
				width : 100,
				sortable : true,
				align : 'center',
				toggle : false
			}, {
				display : '处理方式',
				name : 'opType',
				width : 100,
				sortable : true,
				align : 'center',
				render : function(row) {
					var rv = "--";
					if (row.opType) {
						if (row.opType == "1") {
							rv = "下发消息";
						} else if (row.opType == "2") {
							rv = "拍照";
						} else if (row.opType == "3") {
							rv = "监听";
						}
					}
					return rv;
				}
			/*
			 * }, { display : '处理结果', name : '', width : 100, sortable : true, align : 'center'
			 */
			}, {
				display : '处理状态',
				name : 'opStatus',
				width : 100,
				sortable : true,
				align : 'center',
				render : function(row) {
					var rv = "--";
					if (row.opStatus) {
						if (row.opStatus == "-1") {
							rv = "等待回应";
						} else if (row.opStatus == "0") {
							rv = "成功";
						} else if (row.opStatus == "1") {
							rv = "设备返回失败";
						} else if (row.opStatus == "2") {
							rv = "发送失败";
						} else if (row.opStatus == "3") {
							rv = "设备不支持此功能";
						} else if (row.opStatus == "4") {
							rv = "设备不在线";
						}
					}
					return rv;
				}
			}, {
				display : '消息内容/图片/监听号码',
				name : 'opContent',
				width : 250,
				align : 'center',
				render : function(row) {
					var rv = "--";
					if (row.opContent) {
						// 判断类型是不是图片 如果是图片则使用图片
						rv = row.opContent;
						if (row.opType == "2") {
							var v = rv;
							rv = '<a href="' + v + '">' + '<img style="height:20px;" src="' + v + '"></img>' + '</a>';
						}
					}
					return rv;
				}
			}, {
				display : '备注',
				name : 'remark',
				width : 200,
				sortable : true,
				align : 'center'
			}, {
				display : '处理时间',
				name : 'opTime',
				width : 150,
				sortable : true,
				align : 'center',
				render : function(row) {
					if (null != row.opTime && undefined != row.opTime && "" != row.opTime) {
						return utc2Date(row.opTime);
					} else {
						return "--";
					}
				}
			} ],
			onAfterShowData : function() {
				setupZoom();
			},
		
			showCheckbox : false,
			sortName : 'vehicleNo',
			url : 'operationmanagement/queryAlarmDetailCount.action',// 数据请求地址
			exportAction : '',
			// data:{},
			showTitle : false,
			pageSize : 20,
			/*pageSizeOptions : [ 10, 20, 30, 40 ],*/
			height : "100%",//tvdiHeight - titleHeight - 165,
			autoLoad : false,
			gridDIV : "alaramDealGrid",
			contentDiv : "alarmtrack",
			// 填充数据的tableid
			tableId : 'alaramDealGrid',
			// 查询条件formid
			mainContain : "alarmtrack"
		};
		obj.secondgrid = new ctfoFormWithGrid(options);
		obj.secondgridManager = $("#alaramDealGrid").ligerGetGridManager();

	},
	setToday : function() {
		var nowDate = getnowTime();
		// 时间
		$("#alarmtrackSearchForm").find("input[name='startTime']").val(nowDate);

		$("#alarmtrackSearchForm").find("input[name='endTime']").val(nowDate);
	},
	// 用于首页跳转的方法
	indexToTracking : function() {
		$("#aaccee").val(dateFormat(new Date(), "yyyy-MM-dd"));
		$("input[name='endTime']").val(dateFormat(new Date(), "yyyy-MM-dd"));
		$("#alarmtrackSearchFormSubmit").trigger("submit");
		KCPT.indexToAlarmTracking = false;
	},
	//获取车辆的报警位置
	findAlarmAddress: function(lat,lon,textObj)
	{
		
		var param={'mapLat':lat/600000,'mapLon':lon/600000};//600000
		JAjax("monitor/findAddress.action", param, 'json', function(data, err)
		{
			if (textObj && data && data.length > 0)
			{
				var ad = null2blank(data[0].address);
				$(textObj).attr("title", ad).text(ad);
			}
			}, function(err)
			{
				return "";
			});
	}
};
$(function() {
	var name = (KCPT.root.leftTree.loadTreeSelectedData.data.text != null) ? KCPT.root.leftTree.loadTreeSelectedData.data.text : KCPT.user.entName;
	var opNodeName = $("#alarmtrackOrgName");
	var opEntId = $("#vehicleinfoOrgId");
	opNodeName.empty();
	opEntId.empty();
	opNodeName.append(name.length > 12 ? name.substring(0, 10) + "..." : name);
	opNodeName.attr("title", name);
	opEntId.val(((KCPT.root.leftTree.loadTreeSelectedData.data.id != null) ? KCPT.root.leftTree.loadTreeSelectedData.data.id : KCPT.user.entId));
	opEntId.attr("name", "requestParam.equal.corpId");
	
	var alarmTrackObj = new AlarmTrackObj();
	alarmTrackObj.tvdiTree();
	alarmTrackObj.tvdiGrid();
	alarmTrackObj.authentication();
	alarmTrackObj.getAlarmType();
	alarmTrackObj.secondGrid();
	alarmTrackObj.setToday();
	alarmTrackObj.bindEvent();
	alarmTrackObj.bindChange();
	alarmTrackObj.initAlarmlevel();
	KCPT.onresizeObj = alarmTrackObj;
	window.alarmTrackObj = alarmTrackObj;
	//safeManager.addChildList(alarmTrackObj);
	//safeManager.showObj = alarmTrackObj;


	if (KCPT.indexToAlarmTracking) {
		alarmTrackObj.indexToTracking();
	}
});
