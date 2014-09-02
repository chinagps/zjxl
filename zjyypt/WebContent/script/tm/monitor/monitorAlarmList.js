/**
 * 监控-报警列表类
 */
var monitorAlarmList = function(o) {
	this.htmlElements = o.htmlElements;
	this.monitorObj = o.monitorObj;
	this.alarmFlashMarker = "alarmFlashMarker";
	// 列表定时器
	this.alarmListInfoTimer = null;
	this.initMonitorAlarmList();
	window.monitor_bottom_AlarmList = this;
	// 定时查询告警列表间隔时间
	this.searchAlarmTimerDelay = 60 * 1000;
	this.actionDelay = null;// 切换标签延时器
	
	this.alarmMarkerIdCache = "";
};
monitorAlarmList.prototype = {
	initMonitorAlarmList : function() {
		this.initTabContext();
		this.initAlarmlevel();//报警级别
		this.initAlarmList();
		$("#monitor_bottom_searchBtn").click();//初始化时调用查询告警列表事件
//		this.initOverspeedAlarmList();
		this.initRealTimeAlarmList();
//		this.initTiredAlarmList();
//		this.initUrgencyAlarmList();
//		this.initYawAlarmList();
//		this.startTimer(0);
	},
	cache : {
		// 查看更多的alarmCode
		moreAlarmCode : "",
		// 查询更多车牌号
		moreVehicleNo : "",
		markerList : [],
		alarmListGridManager : null,
		alarmLevelList:[]
	},
	/**
	 * 初始化tab按钮
	 */
	initTabContext : function() {
		var _thisref = this, _str = '<div id="monitor_bottom_statements_top" class="monitor_bottom_statements_top">';
		_str += '<ul style="float:left;">';
		_str += '<li class="monitor_bottom_statements_top_tab"><a href="javascript:void(0);" >实时数据</a></li>';
		_str += '<li class="monitor_bottom_statements_top_tab_selected"><a href="javascript:void(0);" ><img src="images/monitorBottom/btn_laba.png">&nbsp;&nbsp;&nbsp;实时告警</a></li>';
		_str += '</ul>';
		//监控页告警列表搜索开始
		_str += '<div style="float:left;">';
		_str += '<table border="0" cellspacing="0" cellpadding="0" class="monirot_bottom_search_table">';
		_str += '<tbody><tr>';
		_str += '<td class="paddingLR5px">车牌号</td>';
		_str += '<td class=""><input class="width60px" id="monitor_bottom_vehicleNo_txt" name="like.vehicleNo" type="text"></td>';
		_str += '<td class="paddingLR5px">告警级别</td>';
		_str += '<td class="">';
		_str += '<select name="alarmLevel" id="alarmHandler_alarmLevelSel">';
		_str += '<option value="1">严重告警</option>';
		_str += '<option value="2">中度告警</option>';
		_str += '<option value="3">一般告警</option>';
		_str += '</select>';
		_str += '</td>';
		_str += '<td class="paddingLR5px">告警类型</td>';
		_str += '<td class="width100px">';
		_str += '<input type="hidden" id="monitor_bottom_alarmCode_txt"/><select name="alarmType" id="alarmHandler_alarmLevelType" style="width:135px;"></select>';
		_str += '</td>';
		_str += '<td class="paddingLR5px"><a href="javascript:void(0);"><img id="monitor_bottom_searchBtn" class="searchActiveVehicleList" width="20" src="images/monitorBottom/search.png"></a>&nbsp;<a href="javascript:void(0);"><img class="searchActiveVehicleList" width="20" id="monitor_bottom_clearBtn" src="images/monitorBottom/clear.png"></a></td>';
		_str += '<td style="width:30px;"></td>';
		_str += '<td ><input type="checkbox" name="autoRollFlag" style="border:none;"></td><td>自动刷新</td>';
		_str += '<td><select id="alarmHandler_refreshtimeSel"><option value="60">60秒</option><option value="120">120秒</option><option value="180">180秒</option><option value="240">240秒</option><option value="300">300秒</option></select>刷新频率</td>';
		_str += '</tr>';
		_str += '</tbody></table>';
		_str +=	'</div>';
		//监控页告警列表搜索结束
		_str += '<div id="monitor_bottom_more" style="float:right; margin-top:5px;" >';
		_str += '<input type="hidden" value="" id="monitor_batchAlarmBtn" class="btn_plcl" /><a class="btn_more"><img src="images/global/btn_more.png"/></a>&nbsp;&nbsp;</div>';// background-color:rgb(245,
																																// 247,
		_str += '</div>';

		_str += '<div id="monitor_bottom_statements_main" class="monitor_bottom_statements_main">';
		_str += '	<div id="monitor_bottom_realTimeAlarmList" class="hidden"></div>';// 实时数据
		_str += '	<div id="monitor_bottom_alarmList" style="600px"></div>';// 告警列表
		_str += '</div>';
		$("div." + this.htmlElements.bottomContainer).append(_str);
		var _lis = $(".monitor_bottom_statements_top").find("li");
		var _listDiv = $(".monitor_bottom_statements_main").find("div");
		var _refreshCk = $("#monitor_bottom_statements_top").find("input[name='autoRollFlag']");//获取自动刷新checkbox
		var index=1;
		_lis.each(function(i) {
			$(this).bind('click', function(i) {
				if ($(this).hasClass("monitor_bottom_statements_top_tab_selected")) {
					return false;
				}
				_lis.each(function(j) {
					if ($(this).hasClass("monitor_bottom_statements_top_tab_selected")) {
						$(this).removeClass("monitor_bottom_statements_top_tab_selected");
						$(this).addClass("monitor_bottom_statements_top_tab");
					}
				});
				_listDiv.hide();
				index = $(this).index();
				_listDiv.eq(index).show();
				// 实时数据隐藏更多,查询条件隐藏，  切换时刷新数据
				setTimeout(function() {
					if (index == 1) {
						$("#monitor_bottom_more").show();
						$(".monirot_bottom_search_table").show();
						_thisref.initAlarmList();
					} else {
						$("#monitor_bottom_more").hide();
						$(".monirot_bottom_search_table").hide();
						_thisref.monitorObj.getLatestPositions(_thisref.monitorObj.cache.vehiclesToBeRollPosition, false);
					}
				},100);
				$(this).removeClass("monitor_bottom_statements_top_tab");
				$(this).addClass("monitor_bottom_statements_top_tab_selected");
				
				// 当切换tab签时，重置当前选择的车牌号
				_thisref.cache.moreVehicleNo = "";
			});

		});
		
		$("#monitor_bottom_more").find("a").bind('click', function() {
			KCPT.monitorAlarmList_alarmCode = _thisref.cache.moreAlarmCode;
			KCPT.monitorAlarmList_VehicleNo = _thisref.cache.moreVehicleNo;
			$("#smoothmenu1").find("li[fun='FG_MEMU_SAFE_ALARM_FOLLOW']").click();
		});
		
		$("#monitor_batchAlarmBtn").bind('click',function(){
			initAlarmHandler(null,true,_thisref.cache.moreAlarmCode);
		});
		
		var _sel = $("#alarmHandler_alarmLevelSel");
		$("#monitor_bottom_clearBtn").bind('click',function(){
			$("#monitor_bottom_vehicleNo_txt").val("");
			_sel.find("option:eq(0)").attr("selected","selected");
			_sel.trigger('change');
		});
		_sel.bind('change', function() {
			var _levelId = _sel.find("option:selected").attr("value");
			_thisref.loadAlarmTypeList(_levelId);
		});
		
		var alarmType=$("#alarmHandler_alarmLevelType");
		alarmType.bind('change', function() {
			$("#monitor_bottom_alarmCode_txt").val(alarmType.find("option:selected").attr("value"));
		});
		
		//当entid不为1的时候，勾上自动刷新按钮
		if("1"!=KCPT.user.entId){
			_refreshCk.attr("checked","checked"); 
			_thisref.searchAlarmTimerDelay = 60000;
			_thisref.startTimer(1);//启动定时器
		}
		
		$("#monitor_bottom_searchBtn").bind('click',function(){
			_thisref.initAlarmList();
		});
		//定时刷新点击事件
		var _refreshTimesel = $("#alarmHandler_refreshtimeSel");
		_refreshCk.bind('click',function(){
			if(_refreshCk.attr("checked")=="checked"){
				var _levelId = _refreshTimesel.find("option:selected").attr("value");
				_thisref.searchAlarmTimerDelay = _levelId * 1000;
				_thisref.startTimer(index);//启动定时器
			}else{
				_thisref.stopTimer();//停止定时器
			}
		});
		
		//刷新事件切换
		_refreshTimesel.bind('change', function() {
			var _levelId = _refreshTimesel.find("option:selected").attr("value");
			_thisref.searchAlarmTimerDelay = _levelId * 1000;
			if(_refreshCk.attr("checked")=="checked"){
				_thisref.startTimer(index);//启动定时器
			}
		});
		
		
	},
	
	/**
	 * 初始化报警级别数据
	 */
	initAlarmlevel : function(handler) {
		var _thisref = this;
		if (_thisref.cache.alarmLevelList.length > 0) {
			return false;
		}
		for ( var i = 0; i < 4; i++) {
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
					_thisref.cache.alarmLevelList.push(_obj);
				});
				if(_thisAjax.data.split("=")[1]==3){
					//加载全部列表
					_thisref.loadAlarmTypeList("1");
					//handler.call(this);
				}
			}, function(data, err) {

			},false);
		}

	},
	
	/**
	 * 加载报警类型列表
	 */
	loadAlarmTypeList : function(levelId) {
		$("#monitor_bottom_alarmCode_txt").val("");
		var _levelType = $("#alarmHandler_alarmLevelType");
		_levelType.find("option").remove();
		var options = "";
		var _alarmCode = "";
		$(this.cache.alarmLevelList).each(function(i) {
			if (this.levelCode == levelId) {
				options += "<option value='" + this.alarmCode + "'>" + this.alarmName + "</option>";
				if (i > 0) {
					_alarmCode += ",";
				}
				_alarmCode += this.alarmCode;
			} 
			if("-1"==levelId){
				options += "<option value='" + this.alarmCode + "'>" + this.alarmName + "</option>";
			}
		});
		if(""==_alarmCode&&"-1"!=levelId){
			_alarmCode="-1";
		}
		var firstOption = "<option value='" + _alarmCode + "'>全部</option>";
		$("#monitor_bottom_alarmCode_txt").val(_alarmCode);
		_levelType.append(firstOption);
		_levelType.append(options);
	},
	
	getAllGridManager : function(){
		return [this.alarmListGridManager, this.realTimeAlarmListGridManager];
	},
	getCurGridTab: function(){
		var index = 0;
		$("div.monitor_bottom_statements_top > ul > li").each(function(i){
			if($(this).hasClass("monitor_bottom_statements_top_tab_selected"))
				index = i;
		});
		return index;
	},
	getCurGridManager : function(){
		var index = this.getCurGridTab(),
			_gridManager = null;
		$("div.monitor_bottom_statements_top > ul > li").each(function(i){
			if($(this).hasClass("monitor_bottom_statements_top_tab_selected"))
				index = i;
		});
		switch (index) {
		case 0:
			// 实时数据
			_gridManager = this.realTimeAlarmListGridManager;
			break;
		case 1:
			// 实时告警列表
			_gridManager = this.alarmListGridManager;
			break;
		default:
			_gridManager = this.alarmListGridManager;// 默认告警列表
		}
		return _gridManager;
	},
	stopTimer: function(){
		if (this.alarmListInfoTimer) {
			clearInterval(this.alarmListInfoTimer);
			this.alarmListInfoTimer = null;
		}
	},
	/**
	 * 启动定时器
	 */
	startTimer : function(index) {
		var _thisref = this;
		this.stopTimer();
		var _gridManager=null,_alarmCode = "";
		switch (index) {
		case 1:
			// 实时告警列表
			_gridManager = _thisref.alarmListGridManager;
			_alarmCode = "-1";
			break;
//		case 1:
//			// 实时数据
//			_gridManager = _thisref.realTimeAlarmListGridManager;
//			_alarmCode = "";
//			break;
		default:
			_gridManager = _thisref.alarmListGridManager;// 默认告警列表
		}
		// 查看更多调用此值
		_thisref.cache.moreAlarmCode = _alarmCode;
		var search = function() {
			if (KCPT.VehicleMonitorObj) {
				var param = [ {
					"name" : "requestParam.equal.alarmCode",
					"value" : $("#monitor_bottom_alarmCode_txt").val()
				},{
					"name" : "requestParam.like.vehicleNo",
					"value" : $("#monitor_bottom_vehicleNo_txt").val()
				},
				{
					"name" : "requestParam.like.entId",
					"value" : KCPT.user.entId
				} ];
				_thisref.alarmListGridManager.setOptions({
					parms : param
				});
				_thisref.alarmListGridManager.loadData(true);
			}
		};
		//search();
		this.alarmListInfoTimer = setInterval(function() {
			search();
			// 更新统计数量
		}, _thisref.searchAlarmTimerDelay);
	},
	onResize : function() {
//		var width = $(window).width() > 1200?$(window).width():1200;
//		var conterWeight = $("#monitorContent").find("div.left_c_monitor").css("display") == "none" ? width : width - 300;
//		var w = conterWeight - 2;
//		$("#monitor_bottom_alarmList").width(w);
//		$("#monitor_bottom_overspeedAlarmList").width(w);
//		$("#monitor_bottom_tiredAlarmList").width(w);
//		$("#monitor_bottom_yawAlarmList").width(w);
//		$("#monitor_bottom_urgencyAlarmList").width(w);
//		$("#monitor_bottom_realTimeAlarmList").width(w);
//		$(".monitor_bottom_statements_main").find("div.l-grid-body").height(114);
//		$("#monitor_bottom_realTimeAlarmList").find("div.l-grid-body").height(138);
//		$("#monitor_bottom_more").height(24);
	},
	showalarmFlash:function(vid){
		var _thisref = this;

		if( _thisref.alarmMarkerIdCache != vid ) {
			_thisref.alarmMarkerIdCache = vid;
			if(this.alarmMarkerPositionTimer) clearInterval(this.alarmMarkerPositionTimer);
		}else{
			return false;
		}

		var _params = {
			vid : _thisref.alarmMarkerIdCache,
			markerId: _thisref.alarmFlashMarker,
			map : _thisref.monitorObj.cMap,
			showTipWindow : function() {
				_thisref.monitorObj.showTipWindow(_thisref.alarmMarkerIdCache,_thisref.monitorObj.cMap.markerObj[_thisref.alarmFlashMarker].getLngLat(), [0.50,1.09], "alarmFlashMarker");
			},
			clearIdCache : function(){
				_thisref.alarmMarkerIdCache = "";
			}
		};
		
		this.alarmMarkerPositionTimer = setInterval(function(){
			_params.alarmMarkerPositionTimer = _thisref.alarmMarkerPositionTimer;
			markerAlarmFlash(_params);
		}, 12000);
		_params.alarmMarkerPositionTimer = _thisref.alarmMarkerPositionTimer;
		markerAlarmFlash(_params);
	},
	/**
	 * 设置当前报警行样式
	 * 
	 * @param alarmCode
	 */
	setCurrentAlarmRowStyle : function(rowText, alarmCode) {
		var _className = "",_thisref=this;
		if(this.cache.currentAlarmListRowClass[alarmCode]){
			_className=this.cache.currentAlarmListRowClass[alarmCode];
		}else{
			$(this.cache.alarmLevelList).each(function(i) {
				$(this).each(function(j) {
					if (this.alarmCode == alarmCode) {
						_className = "level" + this.levelCode;
						_thisref.cache.currentAlarmListRowClass[alarmCode]=_className;
						return false;
					}
				});
				if(""!=_className){
					return false;
				}
			});
		}
		return "<span class='" + _className + "'>" + rowText + "</span>";
	},
	/**
	 * 初始化告警列表
	 */
	initAlarmList : function() {
		var _thisref = this;
		var grid = $("#monitor_bottom_alarmList");
		var conterWeight = '99.8%';// KCPT.root.getCenterSize().width;
		
		var tmpAlarmCode=$("#monitor_bottom_alarmCode_txt").val();
		var tmpVehicleNo = $("#monitor_bottom_vehicleNo_txt").val();
		
		grid.ligerGrid({
			columns : [ {
				display : "车牌号",
				width : 100,
				name : "vehicleNo"
			}, {
				display : "车牌颜色",
				width : 100,
				name : "colorId",
				render : function(row) {
					return tocolor(row.colorId) ;
				}
			},{
				display : "告警类型",
				width : 170,
				name : "alarmCode",
				render : function(row) {
					var html = getAlarmTypeDesc(row.alarmCode);
					return html;
				}
			}, {
				display : "告警时间",
				width : 160,
				name : "utc",				
				render : function(row) {
					var html = utc2Date(row.utc);
					return html;
				}
			}, {
				display : "告警车速",
				width : 100,
				name : "gpsSpeed",
				type:'float',
				render : function(row) {
					var num = new Number(row.gpsSpeed / 10);
					return num.toFixed(2);
				}
			}, {
				display : "位置",
				minWidth : 300,
				name : "address",
				render : function(row) {
					var html = "<a type='button' onmouseover='getRealtimeAlarmPosition(this," + row.vid + ");'>获取位置<a/>";
					return html;
				}
			}, {
				display : "处理",
				width : 100,
				name : "",
				render : function(rowData) {
					var html = '<img src="images/global/Process.png" style="cursor:pointer;" handler=true onclick="initAlarmHandler(\'' + rowData.vid + '\',\'' + rowData.vinCode + '\',\'' + rowData.vehicleNo + '\',\'' + rowData.cropId + '\');" />';
					return html;
				}
			} ],
			width : conterWeight,
			height : 160,
			url : 'monitor/findAlarmListByType.action',
			parms : [ {
				"name" : "requestParam.equal.alarmCode",
				"value" : tmpAlarmCode
			},{
				"name" : "requestParam.like.vehicleNo",
				"value" : tmpVehicleNo
			} ,
			{
				"name" : "requestParam.like.entId",
				"value" : KCPT.user.entId
			} 
			]
			// , dataAction: 'local'
			// , data: testData
			,
			usePager : false,
			pageSize : 30,
			sortName : 'vid',
			allowUnSelectRow : true,
			onSelectRow : function(rowData, rowId, rowObj, obj) {
				if($(obj).attr("handler")) return false;
				_thisref.cache.moreVehicleNo = rowData.vehicleNo;
				_thisref.showalarmFlash(rowData.vid);
			},
			onUnSelectRow : function(rowData) {

			},
			onAfterShowData : function(){
//				_thisref.alarmListGridManager.setHeight($("div." + _thisref.htmlElements.bottomContainer).height() - 47);
			}
		});
		this.alarmListGridManager = grid.ligerGetGridManager();
		//this.alarmListGridManager.loadData(true);
	},
	/**
	 * 初始化实时数据
	 */
	initRealTimeAlarmList : function() {
		var _thisref = this;
		var grid = $("#monitor_bottom_realTimeAlarmList");
		var conterWeight = '99.8%';// KCPT.root.getCenterSize().width;
		grid.ligerGrid({
			columns : [{
				display : "车牌号",
				minWidth : 120,
				align : "center",
				name : "vehicleno"
			}, {
				display : "车牌颜色",
				minWidth : 120,
				align : "center",
				name : "plateColorId",
				render : function(row) {
					return tocolor(row.plateColorId) ;
				}
			}, {
				display : "所属企业",
				minWidth : 120,
				align : "center",
				name : "corpName"
			}, 
			{
				display : "车速(公里/小时)",
				minWidth : 110,
				align : "center",
				name : "speed",
				type:'float',
				render : function(row) {
					var num = new Number(row.speed / 10);
					return num.toFixed(2);
				}
			},
//			{
//				display : "方向",
//				minWidth : 80,
//				name : "head",
//				align : "center",
//				render : function(row) {
//					var html = getCarDirectionDesc(row.head);
//					return html;
//				}
//			}, {
//				display : "ACC状态",
//				minWidth : 70,
//				name : "K512_1_2",
//				render : function(row) {
//					var html = row.K512_1_2;
//					if (!html) {
//						html = "";
//					}
//					return html;
//
//				}

//			},
			{
				display : "车辆实时状态 ",
				minWidth : 400,
				name : "oilInstant",
				render : function(row) {
					// 瞬时油耗（接收时单位：1bit=0.05L/H 0=0L/H）
					var rs = "";
					if (!row.oilInstant || row.oilInstant.indexOf("-") != -1) {
						rs = "--";
					} else {
						rs = new Number(row.oilInstant * 0.05).toFixed(2);
					}
					var htmlacc = eval(row.lastBaseStatusMap);	
					var htmlaccs = htmlacc ? htmlacc.K512_1_2 : "--";
					var rss = "";
					if (!row.oilMeasure || row.oilMeasure.indexOf("-") != -1) {
						rss = "--";
					} else {
						rss = new Number(row.oilMeasure * 0.1).toFixed(2);
					}
					var html = getCarDirectionDesc(row.head);
					var num = new Number(row.speed / 10);
					return "方向:"+html+" ACC状态:"+htmlaccs+" 瞬时油耗:"+rs+" 当前油量(升):"+rss;
				}
			}, {
				display : "发动机转速",
				minWidth : 80,
				name : "engineRotateSpeed",
				render : function(row) {
					// 发动机转速（单位：1bit=0.125Rpm 0=0Rpm）
					var rs = "";
					if (!row.engineRotateSpeed || row.engineRotateSpeed.indexOf("-") != -1) {
						rs = "--";
					} else {
						rs = new Number(row.engineRotateSpeed / 8).toFixed(0).toString();
					}
					return rs;
				}
			},  
			//合规修改代码 by zhengzhong 20121207 start
//			{
//				display : "车门状态",
//				minWidth : 120,
//				name : "doorStatus",
//				render : function(row) {
//					debugger;
//					var htmldoor = row.lastBaseStatusMap;	
//					var htmlaccs = htmldoor.K502_25_26 ? htmldoor.K502_25_26 : "--";
//					return htmlaccs;
//				}
//			},{
//				display : "空调状态",
//				minWidth : 120,
//				name : "airConditioningStatus",
//				render : function(row) {
//					debugger;
//					var htmlairConditioningStatus = row.lastBaseStatusMap;	
//					var htmlaccs = htmlairConditioningStatus.K500_19_20 ? htmlairConditioningStatus.K500_19_20 : "--";
//					return htmlaccs;
//				}
//			}, {
//				display : "点火状态",
//				minWidth : 120,
//				name : "ignitionStatus",
//				render : function(row) {
//					debugger;
//					var htmlignitionStatus = row.lastBaseStatusMap;	
//					var htmlaccs = htmlignitionStatus.K500_29_30 ? htmlignitionStatus.K500_29_30 : "--";
//					return htmlaccs;
//				}
//			}, 
			////合规修改代码 by zhengzhong 20121207 end
			{
				display : "里程数(单位:公里)",
				minWidth : 110,
				name : "mileage",
				render : function(row) {
					var rs = "";
					if (!row.mileage || row.mileage.indexOf("-") != -1) {
						rs = "--";
					} else {
						rs = new Number(row.mileage / 10).toFixed(0).toString();
					}
					return rs;
				}
			}, 
//			{
//				display : "累计油耗(升)",
//				minWidth : 90,
//				name : "oilTotal",
//				render : function(row) {
//					// 累计油耗（单位：1bit=0.5L 0=0L）
//					var rs = "";
//					if (!row.oilTotal || row.oilTotal.indexOf("-") != -1) {
//						rs = "--";
//					} else {
//						rs = new Number(row.oilTotal * 0.5).toFixed(2);
//					}
//					return rs;
//				}
//			}, 
//			{
//				display : "当前油量(升)",
//				minWidth : 90,
//				name : "oilMeasure",
//				render : function(row) {
//					// 累计油耗（单位：1bit=0.5L 0=0L）
//					var rs = "";
//					if (!row.oilMeasure || row.oilMeasure.indexOf("-") != -1) {
//						rs = "--";
//					} else {
//						rs = new Number(row.oilMeasure * 0.1).toFixed(2);
//					}
//					return rs;
//				}
//			}, 
			{
				display : "告警状态",
				minWidth : 70,
				name : "alarmcode",
				render : function(row) {
				   var html ='';
					if (row.alarmcode) {
						html = '<img src="images/global/Process.png" style="cursor:pointer;" onclick="initAlarmHandler(\'' + row.vid + '\',\'' + row.vinCode + '\',\'' + row.vehicleno + '\',\'' + row.cropId + '\');" />'
						return "有报警" +" "+html;
					} else {
						return "无报警";
					}

				}
			},{
				display : "最后位置上报时间",
				minWidth : 200,
				name : "sysutc",
				render : function(row) {
					var html = utc2Date(row.utc);
					return html;
				}
			}, {
				display : "位置描述",
				minWidth : 100,
				name : "location",
				render : function(row) {
					var html = "<a type='button' onmouseover='getRealtimeAlarmPosition(this," + row.vid + ");'>获取位置<a/>";
					return html;
				}
			}
//			{
//				display : "处理",
//				minWidth : 40,
//				name : "",
//				render : function(rowData) {
//					var html = "";
//					if (rowData.alarmFlag) {
//						html = '<img src="images/global/Process.png" style="cursor:pointer;" onclick="initAlarmHandler(\'' + rowData.vid + '\',\'' + rowData.vinCode + '\',\'' + rowData.vehicleNo + '\',\'' + rowData.cropId + '\');" />';
//					}
//					return html;
//				}
//			} 
			],
			width : conterWeight,
			height : 160,
			autoLoad : true,
			//url : 'monitor/findMonitorVehiclesList.action',
			dataAction: 'local',
			data: {Rows:[]},
			usePager : false,
			// pageSize : 30,
			sortName : 'vid',
			allowUnSelectRow : true,
			onSelectRow : function(rowData) {
				if (rowData) {
					if (rowData.maplon && rowData.maplat) {
						KCPT.VehicleMonitorObj.cMap.panTo(rowData.maplon / 600000, rowData.maplat / 600000);
					}
				}
				// _thisref.showalarmFlash(rowData.vid);
			},
			onUnSelectRow : function(rowData) {

			},
			onAfterShowData : function(){
//				_thisref.realTimeAlarmListGridManager.setHeight($("div." + _thisref.htmlElements.bottomContainer).height() - 47);
			}
		});

		this.realTimeAlarmListGridManager = grid.ligerGetGridManager();
	}
};
