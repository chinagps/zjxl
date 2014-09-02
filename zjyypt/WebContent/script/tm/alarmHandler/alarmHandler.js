/**
 * 报警处理类
 * 
 * @returns
 */
var alarmHandler = function() {
	var params = window.location.toString().split('?');
	var _thisref=this;
	this.initAlarmlevel(function(){
		if (params[1]) {
			// 单车报警处理
			if (params[1].indexOf("v") > -1) {
				//是否为批量处理调用
				if(params[1].indexOf("batch")>-1){
					$("#returnBatchAlarmBtn").show();
					_thisref.cache.vid = params[1].split('&')[0].split('=')[1];
					//alarmHandler.html?v=123&level=1&batch
					if(params[1].indexOf("level")>-1){
						var _level=params[1].split('&')[1].split('=')[1];
						$("#alarmHandler_alarmLevelSel").find("option[value='"+_level+"']").attr("selected","selected");
						setTimeout(function(){
							_thisref.loadAlarmTypeList(_level);
							_thisref.loadCurrentAlarmListGrid();
							$("#currentAlarmHandler_form").submit();
						},500);
					}
					if(params[1].indexOf("alarmCode")>-1){
						var _alarmCode=params[1].split('&')[1].split('=')[1];
						 $("#alarmHandler_alarmLevelType").find("option[value='"+_alarmCode+"']").attr("selected","selected");
						 setTimeout(function(){
								_thisref.loadCurrentAlarmListGrid();
								$("#currentAlarmHandler_form").submit();
							},500);
					}
				}else{
					$("#returnBatchAlarmBtn").hide();
					_thisref.cache.vid = params[1].split('=')[1];
				}
			}
			
			// 报警批量处理
			if (params[1].indexOf("isAlarmLevel") > -1) {
				_thisref.cache.batch.alarmCode = params[1].split('=')[2].replace('#', '');
				_thisref.cache.batch.isBatch = true;
				// 如果为告警列表，则显示级别，否则隐藏
				if (_thisref.cache.batch.alarmCode != "-1") {
					var _tr = $("#batchCurrentAlarmHandler_form").find("table:eq(0)").find("tr:eq(0)");
					_tr.find("td:eq(2)").empty();
					_tr.find("td:eq(3)").empty();
				}
			}
		}
		if(params[2]){
			if (params[2].indexOf("flag") > -1) {
				_thisref.cache.flag = params[2].split('=')[1];
			}
		}else{
			_thisref.cache.flag = 0;
		}
		_thisref.init();
	});
	
};
alarmHandler.prototype = {
	cache : {
		vid : "",// 551,5，273,1000060,1000140
		vehicleNo : "",
		flag : 0 ,//值为1为从告警列表跳转过来的，初始化时赋值，默认为0
		// 当前报警列表
		alarmListGridManager : null,
		// 历史报警列表
		alarmHisListGridManager : null,
		map : {},
		// 报警码值
		alarmCodeLis : {},
		// 当前报警标注
		currentAlarmMarkerId : {},
		// 历史报警标注
		hisAlarmMarkerId : [],
		hisAlarmLine :[],
		// 报警级别，0严重，1紧急，2一般,历史报警标注时用到（严重，紧急需要标注）
		alarmLevelList : new Array(),
		//当前报警列表行颜色hash缓存，
		currentAlarmListRowClass:{},
		// 拍照相关参数
		photo : {
			curPage : 1,
			page : 1,
			pageRows : 4,
			//第一次切换tab签时，查询拍照照片
			isLoaded:false
		},
		// 开始录音时间
		startRecordTime : 0,
		startRecordTimer : null,
		//录音终止时间
		recordTimeMinute : 0,
		recordTimeSecond : 0,
		// 批量告警处理
		batch : {
			// 是否为批量处理
			isBatch : false,
			// 批量告警处理，告警类型
			alarmCode : "",
			batchListGrid : null,
			//以下处理报警时需要用到
			startTime:"",
			endTime:"",
			leveCode:""
		},
		handlerFlag:0//历史报警处理多选框中如果存在处理完毕，则值为1
	},
	init : function() {
		var _thisref = this;
		getAlarmTypeDesc("");
		this.getVehicleInfo();
		this.setTody();
		this.initEvent();
		this.initTabMenu();
		this.initMap();
		//历史报警类型
		this.loadAllAlarmTypeList();
		this.getSchedulePreInstallMessage();
		this.onResize();
		if (this.cache.batch.isBatch) {
			this.loadBatchCurrentAlarmListGrid();
			$("#batchCurrentAlarmHandler_form").submit();
		} else if(window.location.toString().indexOf('batch')==-1) {
			this.loadCurrentAlarmListGrid();
			if(_thisref.cache.flag==0){
				$("#currentAlarmHandler_form").submit();
			}
		}
		this.loadHistoryAlarmListGrid();
		if(_thisref.cache.flag==1){
			$("#tabPanel2").find("ul").find("li").eq(1).trigger('click');
			$("#alarmHandler_hisform").submit();
		}
		
	},
	/**
	 * 设置历史报警查询默认时间
	 */
	setTody : function() {
		var clac = 24 * 3600 * 1000;
		var now = dateFormat(new Date(), "yyyy-MM-dd hh:mm:ss");
		var _startTime = utc2Date(date2utcsA(now) - clac);
		$("#alarmHandlerHis_startTime").val(_startTime);
		$("#alarmHandlerHis_endTime").val(now);
		var clac4 = 4 * 3600 * 1000;
		$("#alarmHandler_curAlarmStartTime").val(date2utcsA(now) - clac4);
		$("#alarmHandler_curAlarmEndTime").val(date2utcsA(now));
	},
	/**
	 * 加载报警类型列表
	 */
	loadAlarmTypeList : function(levelId) {
		$("#alarmHandler_curAlarmLevelId").val("");
		var _levelType = $("#alarmHandler_alarmLevelType");
		_levelType.find("option").remove();
		var options = "<option value=''>全部</option>";
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
		$("#alarmHandler_curAlarmLevelId").val(_alarmCode);
		_levelType.append(options);
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
			JAjax("../../monitor/findAlarmLevel.action", {
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
					_thisref.loadAlarmTypeList("-1");
					handler.call(this);
				}
			}, function(data, err) {

			});
		}

	},
	/**
	 * 加载报警类型列表
	 */
	loadAllAlarmTypeList : function() {
		JAjax("../../entbusiness/findAllSysAlarmType.action", {}, 'json', function(data, err) {
			var options = "";
			$(data).each(function(i) {
				options += "<option value='" + this.alarmCode + "'>" + this.alarmName + "</option>";
			});
			$("#alarmHandler_alarmType").append(options);
		}, function(data, err) {

		});
	},
	initEvent : function() {
		var _thisref = this;
		this.alarmProcess();
		var _sel = $("#alarmHandler_alarmLevelSel");
		_sel.bind('change', function() {
			var _levelId = _sel.find("option:selected").attr("value");
			_thisref.loadAlarmTypeList(_levelId);
		});
		// 恢复默认
		//$(".busDefault:eq(0)").bind('click', function() {
		//			_thisref.setPhotoNormalParams();
		//});
		//单车报警处理返回到批量报警处理
		$("#returnBatchAlarmBtn").bind('click',function(){
			history.go(-1);
		});
		//拍照刷新
		$("#alarmHandler_refershShowPhotoBtn").bind('click',function(){
			_thisref.showPhoto();
		});
		
		
		
	},
	onResize : function() {
		this.pageWidth = $(window).width();
		this.pageHeight = $(window).height();
		if (this.pageWidth < 1000) {
			this.pageWidth = 1000;
		}
		$(".busThreebj").css({
			width : this.pageWidth
		});
		if (this.pageHeight < 650) {
			this.pageHeight = 650;
		}
		$(".busThreebj").css({
			height : this.pageHeight
		});
		var busThreeRightWidth = $(".busThreeRight").width();
		var topHeight = $("#busThreeTop").height();

		$(".busThreeLeft").css({
			width : this.pageWidth - busThreeRightWidth - 5
		});

		$(".historyLeft").css({
			width : this.pageWidth - 495 - 5
		});

		$("#alarmHandler_map").css({
			height : this.pageHeight - 473,
			width : busThreeRightWidth,
			top : topHeight + 439-2,
			left : this.pageWidth - busThreeRightWidth - 3
		});
		$("#busThreeRight").css({
			height : 473,
			width : 495,
			top : topHeight+40,
			left : this.pageWidth - 495 - 3
		});
		$(".busThreebj").css({
			height : this.pageHeight - 35
		});
		if(this.cache.alarmHisListGridManager){
			this.cache.alarmHisListGridManager.gridManager.setHeight(this.pageHeight - 330);
		}
		if(this.cache.alarmListGridManager){
			this.cache.alarmListGridManager.gridManager.setHeight(this.pageHeight - 295);
		}
		if(this.cache.batch.batchListGrid){
			this.cache.batch.batchListGrid.gridManager.setHeight(this.pageHeight - 300);
		}
		if(this.cache.map){
			this.cache.map.changeSize();
		}
	},
	/**
	 * 初始化地图
	 */
	initMap : function() {
		this.cache.map = new CTFO_MAP("alarmHandler_map");
		this.cache.map.setCenter(116.29376, 39.95776);
		this.cache.map.setLevel(10);
//		this.cache.map.addMapControl();
		this.cache.map.changeSize();
//		this.cache.map.addMapCopyRight({right:10, bottom: 5});
	},
	/**
	 * 初始化tab菜单
	 */
	initTabMenu : function() {
		var _thisref = this;
		if (_thisref.cache.batch.isBatch) {
			$("#batchCurrentAlarmHandler_form").show();
			$("#alarmHandler_batchCurrentAlarmListGrid").show();
			$("#currentAlarmHandler_form").hide();
			$("#alarmHandler_currentAlarmListGrid").hide();
		} else {
			$("#batchCurrentAlarmHandler_form").hide();
			$("#alarmHandler_batchCurrentAlarmListGrid").hide();
			$("#currentAlarmHandler_form").show();
			$("#alarmHandler_currentAlarmListGrid").show();
		}
		var _li = $(".tabGroup").eq(0).find("li");
		var _li1 = $("#alarmHandler_processTab").find("li");
		// 当前报警列表，历史报警列表tab
		_li.each(function(i, obj) {
			$(this).bind('click', function() {
				_li.each(function(j) {
					if ($(this).hasClass("tabSelected")) {
						$(this).removeClass("tabSelected");
						$(this).addClass("tab");
					}
				});
				$(this).removeClass("tab");
				$(this).addClass("tabSelected");
				var _context = $("#tabPanel2").find(".mainTab");
				_context.hide();
				_context.eq(i).show();
				if (1 == i && !_li1.eq(0).hasClass("tabSelected")) {
					$("#alarmHandler_map").show();
					_thisref.loadCurrentVehiclePosition();
				}
				if (0 == i && _li1.eq(1).hasClass("tabSelected")) {
					$("#alarmHandler_map").hide();
				}
				
				if(i==1){
					$("#tabPanel3").find("ul").find("li").eq(4).css("display","block");
				}else{
					$("#tabPanel3").find("ul").find("li").eq(4).css("display","none");
					_li1.eq(0).trigger('click');
				}
			});

		});

		// 监听，拍照，消息，视频tab
		_li1.each(function(i, obj) {
			//如果为批量处理，监听和视频禁用
			if(_thisref.cache.batch.isBatch&&i>1){
				$(this).attr("style"," background-image:url(../../images/alarmHandler/tab_bg12_0.png);cursor:default;");
				$(this).find("a").attr("style"," background-image:url(../../images/alarmHandler/tab_bg2_0.png);cursor:default;");
			}
			$(this).bind('click', function() {
				if(_thisref.cache.batch.isBatch&&i>1){
					return false;
				}
				_li1.each(function(j) {
					if ($(this).hasClass("tabSelected")) {
						$(this).removeClass("tabSelected");
						$(this).addClass("tab");
					}
				});
				// 显示消息
				if (i == 0) {
					_thisref.loadAlarmSendMsgList();
				}
				// 隐藏地图
				if (i ==1) {
					$("#alarmHandler_map").hide();
				} else {
					$("#alarmHandler_map").show();
				}
				// 显示图片
				if (i == 1) {
					if(!_thisref.cache.photo.isLoaded){
						_thisref.showPhoto();
						_thisref.cache.photo.isLoaded=true;
					}
				}
				// 显示视频
				if (i == 3) {
					$("#alarmHandler_map").show();
					_thisref.showVedio();
				}

				$(this).removeClass("tab");
				$(this).addClass("tabSelected");
				$("#tabPanel3").find(".tabContent").hide();
				$("#tabPanel3").find(".tabContent").eq(i).show();
			});

		});
		//默认显示消息
		_li1.eq(0).trigger('click');
		// 设置监听和录音切换
		$("input[name='jianting']").each(function() {

			$(this).bind('click', function() {
				// 监听
				if ($(this).attr("value") == "1") {
					$(".jiantingTab").eq(0).show();
					$(".jiantingTab").eq(1).hide();
					// 录音
				} else {
					$(".jiantingTab").eq(1).show();
					$(".jiantingTab").eq(0).hide();
				}
			});

		});

	},
	//
	calcTime : function(alarmEndUtc, alarmStartUtc) {
		var html = "--";
		if ("" != alarmEndUtc && alarmStartUtc) {
			html = alarmEndUtc - alarmStartUtc;
			var hour = "00";
			var minutes = "00";
			var seconds = "00";
			if (html != 0) {
				hour = parseInt(html / 3600000);
				minutes = parseInt((html - (hour * 3600000)) / 60000);
				seconds = parseInt((html - (hour * 3600000) - (minutes * 60000)) / 1000);
			}
			html = hour + ":" + minutes + ":" + seconds;
		}
		return html;
	},
	/**
	 * 单车当前告警列表
	 */
	loadCurrentAlarmListGrid : function() {
		var _thisref = this;
		var _addMarker = function(checked, data) {
			if (checked) {
				var _alarmDesc = getAlarmTypeDesc(data.alarmCode);
				var _lng = data.maplon / 600000;
				var _lat = data.maplat / 600000;
				var _parm = {
					id : data.alarmId,
					lng : _lng,
					lat : _lat,
					title : _alarmDesc,
					tip : "开始时间：" + _thisref.parseTimeString(utc2Date(data.alarmStartUtc)) + "" + "</br>结束时间：" + _thisref.parseTimeString(utc2Date(data.alarmEndUtc)) + "" + "</br>持续时间：" + _thisref.calcTime(data.alarmEndUtc, data.alarmStartUtc),
					isDefaultTip : true,
					iconUrl : "../../images/addressMarker/marker.png"
				};
				var _marker = _thisref.cache.map.addMarker(_parm);
				_marker.lng = _lng;
				_marker.lat = _lat;
				_thisref.cache.currentAlarmMarkerId[data.alarmId] = _marker;
			} else {
				_thisref.cache.map.removeMarker(data.alarmId);
				delete _thisref.cache.currentAlarmMarkerId[data.alarmId];
			}
			_ar = new Array();
			for ( var obj in _thisref.cache.currentAlarmMarkerId) {
				_ar.push(_thisref.cache.currentAlarmMarkerId[obj].lng);
				_ar.push(_thisref.cache.currentAlarmMarkerId[obj].lat);
			}
			_thisref.cache.map.getBestMaps(_ar);
		};
		var _checkAlladdMarker = function(checked, data) {
			var _ar = new Array();
			if (checked) {
				$(_thisref.cache.alarmListGridManager.gridManager.currentData.Rows).each(function(i) {
					var _alarmDesc = getAlarmTypeDesc(this.alarmCode);
					var _lng = this.maplon / 600000;
					var _lat = this.maplat / 600000;
					var _parm = {
						id : this.alarmId,
						lng : _lng,
						lat : _lat,
						title : _alarmDesc,
						tip : "开始时间：" + utc2Date(this.alarmStartUtc) + "" + "" + "</br>结束时间：" + utc2Date(this.alarmEndUtc) + "" + "" + "</br>持续时间：" + _thisref.calcTime(this.alarmEndUtc, this.alarmStartUtc),
						isDefaultTip : true,
						iconUrl : "../../images/addressMarker/marker.png"
					};
					var _marker = _thisref.cache.map.addMarker(_parm);
					_marker.lng = _lng;
					_marker.lat = _lat;
					_thisref.cache.currentAlarmMarkerId[this.alarmId] = _marker;
				});
			} else {
				$(_thisref.cache.alarmListGridManager.gridManager.currentData.Rows).each(function(i) {
					_thisref.cache.map.removeMarker(this.alarmId);
					delete _thisref.cache.currentAlarmMarkerId[this.alarmId];
				});
			}
			for ( var obj in _thisref.cache.currentAlarmMarkerId) {
				_ar.push(_thisref.cache.currentAlarmMarkerId[obj].lng);
				_ar.push(_thisref.cache.currentAlarmMarkerId[obj].lat);
			}
			_thisref.cache.map.getBestMaps(_ar);
		};
		var opions = {
			pageParmName : 'requestParam.page' // 页索引参数名，(提交给服务器)
			,
			pagesizeParmName : 'requestParam.rows',
			columns : [ {
				display : "告警类型",
				width : 120,
				name : "alarmName",
				type: 'string',
				isSort:true,
				render : function(row) {
					var html = _thisref.setCurrentAlarmRowStyle(getAlarmTypeDesc(row.alarmCode), row.alarmCode);
					return html;
				}
			}, 
//			{
//				display : "告警时间",
//				width : 150,
//				name : "utc",
//				render : function(row) {
//
//					var html = _thisref.setCurrentAlarmRowStyle("<label>" + utc2Date(row.utc) + "</label>", row.alarmCode);
//					return html;
//				}
//			},
			/*add by tangfeng 2012-08-30  start添加系统时间*/
			{
				display : '告警时间',
				width : 150,
				name : "sysutc",
				type: 'string',
				isSort:true,
				render : function(row) {
					var html = "--";
					if ("" != row.sysutc) {
						html = _thisref.setCurrentAlarmRowStyle("<label>" + utc2Date(row.sysutc) + "</label>", row.alarmCode);
					}
					return html;
				}
			},
			/*add by tangfeng 2012-08-30  end添加系统时间*/
			{
				display : "告警开始时间",
				width : 150,
				name : "alarmStartUtc",
				type: 'string',
				isSort:true,
				render : function(row) {
					var html = "--";
					if ("" != row.alarmStartUtc) {
						html = _thisref.setCurrentAlarmRowStyle("<label>" + utc2Date(row.alarmStartUtc) + "</label>", row.alarmCode);
					}
					return html;
				}
			}
			, {
				display : "告警结束时间",
				type: 'string',
				width : 150,
				name : "alarmEndUtc",
				isSort:true,
				render : function(row) {
					var html = "--";
					if ("" != row.alarmEndUtc) {
						html = _thisref.setCurrentAlarmRowStyle("<label>" + utc2Date(row.alarmEndUtc) + "</label>", row.alarmCode);
					}
					return html;
				}
			}, {
				display : "持续时间",
				width : 80,
				name : "alarmEndUtc",
				type: 'string',
				isSort:true,
				render : function(row) {
					return _thisref.setCurrentAlarmRowStyle(_thisref.calcTime(row.alarmEndUtc, row.alarmStartUtc),row.alarmCode);
				}
			}, {
				display : "告警车速(公里/小时)",
				width : 150,
				name : "gpsSpeed",
				isSort:true,
				render : function(row) {
					if ("" != row.gpsSpeed) {
						var html = _thisref.setCurrentAlarmRowStyle(row.gpsSpeed / 10, row.alarmCode);
						return html;
					}
					return "";
				}
			}
			
			// ,
			// {
			// display : "操作",
			// width : 40,
			// name : "",
			// render : function(row) {
			// var html = "";
			// if (row.levelCode == "2" && row.alarmStatus == "0") {
			// html = '<a onclick="alarmHandler.processAlarm(\'' + row.alarmId +
			// '\');">解除报警</a>';
			// }
			// return html;
			// }
			// }
			],
			width : "100%",
			// height : 220,
			url : '../../monitor/findAlarmListByVidList.action',
			parms : [ {
				"name" : "requestParam.equal.vid",
				"value" : _thisref.cache.vid
			} ]
			// , dataAction: 'local'
			// , data: testData
			,
			showCheckbox : true,
			autoLoad : false,
			onCheckRow : function(checked, data) {
				_addMarker(checked, data);
			},
			onCheckAllRow : function(checked, data) {
				_checkAlladdMarker(checked, data);
			},
			// pageSize : 30,
			allowUnSelectRow : true,
			submitId : "alarmHandler_currentBtn",
			usePager : true,
			mainContain : "currentAlarmHandler_form",
			container : "currentAlarmHandler_form",
			tableId : 'alarmHandler_currentAlarmListGrid',
			page : 1,
			height : _thisref.pageHeight - 295,
			sortable : true,
			enabledSort : true,
			sortName : 'speed',
			searchFormId : 'currentAlarmHandler_form',
			pageSize:30,
			pageSizeOptions : [ 5, 10, 20, 30 ],
			gridBeforeSubmit : function() {
				_thisref.cache.map.removeAllMarkers();
				$(_thisref.cache.hisAlarmLine).each(function(i){
					_thisref.cache.map.map.removeOverLay(this);
				});
				var _form = $("#currentAlarmHandler_form");
				_form.find("input[name='timeLimit']").each(function() {
					if ($(this).attr("checked")) {
						var clac = $(this).attr("value") * 3600 * 1000;
						var now = dateFormat(new Date(), "yyyy-MM-dd hh:mm:ss");
						$("#alarmHandler_curAlarmStartTime").val(date2utcsA(now) - clac);
						$("#alarmHandler_curAlarmEndTime").val(date2utcsA(now));
					}
				});
				return true;
			},
			onAfterShowData : function() {
				_thisref.setPageTitle();
				var _s=setTimeout(function(){
					_thisref.drawLineByHisData();
					//begin modify wangmeng 去掉查询后触发全选的操作
					$("#alarmHandler_currentAlarmListGrid").find("div.l-grid-header-inner").eq(0).find("tr").removeClass("l-checked");
					clearTimeout(_s);
				},200);
				// 实时报警列表高度
			}
		};
		_thisref.cache.alarmListGridManager = new ctfoGrid(opions);
	},

	/**
	 * 报警处理批量-当前告警列表
	 */
	loadBatchCurrentAlarmListGrid : function() {
		var _thisref = this;
		var opions = {
			pageParmName : 'requestParam.page' // 页索引参数名，(提交给服务器)
			,
			pagesizeParmName : 'requestParam.rows',
			columns : [{
				display : "车牌号",
				width : 100,
				name : "vehicleNo"
			}],
			width : "100%",
			url : '../../monitor/findBatchAlarmList.action',
			parms : [
				{
					"name" : "requestParam.equal.alarmCode",
					"value" : _thisref.cache.batch.alarmCode
				} ,
				{
					"name" : "requestParam.equal.alarmHandlerStatusType",
					"value" : "-1"
				} 
			]
			,
			showCheckbox : true,
			autoLoad : false,
			onCheckRow : function(checked, data) {

			},
			onCheckAllRow : function(checked, data) {
			},
			// pageSize : 30,
			allowUnSelectRow : true,
			submitId : "alarmHandler_batchCurrentBtn",
			usePager : false,
			mainContain : "batchCurrentAlarmHandler_form",
			container : "batchCurrentAlarmHandler_form",
			tableId : 'alarmHandler_batchCurrentAlarmListGrid',
			page : 1,
			height : _thisref.pageHeight - 310,
			sortable : true,
			enabledSort : true,
			sortName : 'speed',
			searchFormId : 'batchCurrentAlarmHandler_form',
			gridBeforeSubmit : function() {
				var _form = $("#batchCurrentAlarmHandler_form");
				_form.find("input[name='timeLimit']").each(function() {
					if ($(this).attr("checked")) {
						var clac = $(this).attr("value") * 3600 * 1000;
						var now = dateFormat(new Date(), "yyyy-MM-dd hh:mm:ss");	
						var endTime=date2utcsA(now);
						var startTime=endTime - clac;
						$("#alarmHandler_curBatchAlarmStartTime").val(startTime);
						$("#alarmHandler_curBarchAlarmEndTime").val(endTime);
						_thisref.cache.batch.startTime=startTime;
						_thisref.cache.batch.endTime=endTime;
						_thisref.cache.batch.leveCode=$("#alarmHandler_alarmBatchLevelSel").find("option:selected").attr("value");
					}
				});
				return true;
			},
			onAfterShowData : function() {
				_thisref.setPageTitle();
			}
		};
		// 全部报警 紧急报警，严重，一般列
		if (_thisref.cache.batch.alarmCode == "-1") {
			opions.columns.push({
				display : "严重告警",
				width : 110,
				name : "emergentAlarmCount",
				render : function(row) {
					if ("0" != row.emergentAlarmCount) {
						var html = "<a href='alarmHandler.html?v=" + row.vid + "&level=1&batch'>" + row.emergentAlarmCount + "</a>";
						return html;
					}
					return "0";
				}
			});
			opions.columns.push({
				display : "中度告警",
				width : 110,
				name : "importantAlarmCount",
				render : function(row) {
					if ("0" != row.importantAlarmCount) {
						var html = "<a href='alarmHandler.html?v=" + row.vid + "&level=0&batch'>" + row.importantAlarmCount + "</a>";
						return html;
					}
					return "0";
				}
			}

			);
			opions.columns.push({
				display : "一般告警",
				width : 110,
				name : "generallyAlarmCount",
				render : function(row) {
					if ("0" != row.generallyAlarmCount) {
						var html = "<a href='alarmHandler.html?v=" + row.vid + "&level=2&batch'>" + row.generallyAlarmCount + "</a>";
						return html;
					}
					return "0";
				}
			});
		}
		// 紧急报警列
		if (_thisref.cache.batch.alarmCode == "0") {
			opions.columns.push({
				display : "严重告警",
				width : 110,
				name : "emergentAlarmCount",
				render : function(row) {
					if ("0" != row.emergentAlarmCount) {
						var html = "<a href='alarmHandler.html?v=" + row.vid + "&alarmCode=0&batch'>" + row.emergentAlarmCount + "</a>";
						return html;
					}
					return "0";
				}
			});
		}
		// 超速报警列
		if (_thisref.cache.batch.alarmCode == "1") {
			opions.columns.push({
				display : "超速告警",
				width : 110,
				name : "alarmcodeCount",
				render : function(row) {
					if ("0" != row.alarmcodeCount) {
						var html = "<a href='alarmHandler.html?v=" + row.vid + "&alarmCode=1&batch'>" + row.alarmcodeCount + "</a>";
						return html;
					}
					return "0";
				}
			});
		}
		// 疲劳报警
		if (_thisref.cache.batch.alarmCode == "2") {
			opions.columns.push({
				display : "疲劳告警",
				width : 110,
				name : "alarmcodeCount",
				render : function(row) {
					if ("0" != row.alarmcodeCount) {
						var html = "<a href='alarmHandler.html?v=" + row.vid + "&alarmCode=2&batch'>" + row.alarmcodeCount + "</a>";
						return html;
					}
					return "0";
				}
			});
		}
		// 偏航报警
		if (_thisref.cache.batch.alarmCode == "23") {
			opions.columns.push({
				display : "偏航告警",
				width : 110,
				name : "alarmcodeCount",
				render : function(row) {
					if ("0" != row.alarmcodeCount) {
						var html = "<a href='alarmHandler.html?v=" + row.vid + "&alarmCode=23&batch'>" + row.alarmcodeCount + "</a>";
						return html;
					}
					return "0";
				}
			});
		}
//		 操作列
		opions.columns.push({
			display : "最新位置",
			width : 85,
			name : "",
			render : function(row) {
				return "<a style='cursor:pointer;' onclick=alarmHandler.showCurrentPosition("+row.vid+")>查看</a>";
			}});
// 操作列
//		opions.columns.push({
//			display : "操作",
//			width : 85,
//			name : "",
//			render : function(row) {
//				var thisRow = this;
//				// 需要解除的七类报警编码
//				var html = "--";
//				var _removeAlarmCode = {
//					"0" : true,
//					"3" : true,
//					"20" : true,
//					"21" : true,
//					"22" : true,
//					"27" : true,
//					"28" : true
//				};
//				var _isShowUnlockedAlarm = false;
//				var _alarmCodes = row.alarmCodes.split(',');
//				$(_alarmCodes).each(function() {
//					if (_removeAlarmCode[this]) {
//						_isShowUnlockedAlarm = true;
//						return false;
//					}
//				});
//				if (_isShowUnlockedAlarm) {
//					html = '<a class="hand" onclick="alarmHandler.processBatchAlarm(\'' + row.vid + '\');">解除报警</a>';
//				}
//				return html;
//			}
//		});
		_thisref.cache.batch.batchListGrid = new ctfoGrid(opions);
	},
	showCurrentPosition:function(vid){
		var _thisref=this;
		JAjax("../../monitor/findMarkers.action"
				,	{idArrayStr : vid}
				,	"json"
				,	function(data){
						if(data[0]){
							$(data).each(function(){						
							var _lon = new Number(this.maplon / 600000).toFixed(5),
								_lat = new Number(this.maplat / 600000).toFixed(5);
							var _ar1=new Array();
								_ar1.push(_lon);
								_ar1.push(_lat);
							var _parm = {
									id : vid,
									lng : _lon,
									lat : _lat,
									iconW:30,
									iconH:30, 
									title : data.vehicleNo,
									iconUrl : getCarDirectionIcon(this.head, this.isonline,this.speed, "alarm"),
									tip : "",
									isDefaultTip : true
								};
								var _marker = _thisref.cache.map.addMarker(_parm);
								_marker.lng = _lon;
								_marker.lat = _lat;
								_thisref.cache.currentAlarmMarkerId[vid] = _marker;
								_thisref.cache.map.getBestMaps(_ar1);
							});
						}else{
							$.ligerDialog.alert("未查询到符合条件的数据", "提示", "error");
						}
					}
				,	function(err){
						$.ligerDialog.alert("查询报警车辆位置信息错误", "提示", "error");
				});
	},
	/**
	 * 单车解除报警
	 */
	processAlarm : function(alarmId) {
		JAjax("../../monitor/vehicleAlarmManage!modifyByAlarmHandlerStatus.action", {
			"alarmId" : alarmId
		}, 'json', function(data, err) {
			$.ligerDialog.success(data, "提示信息");
		}, function(data, err) {
			$.ligerDialog.error(data, "提示信息");
		});
	},
	/**
	 * 批量解除报警
	 */
	processBatchAlarm : function(vid) {
		// requestParam.equal.idarrayStr=1,1,2,3
		// &requestParam.equal.memo=&
		// requestParam.equal.alarmHandlerStatusType=1
		// &requestParam.equal.vid_AlarmStr=123#1,2,3||122#4,5,6
		$("#busThree").loadMask("");
		var row;
		$(this.cache.batch.batchListGrid.gridManager.data.Rows).each(function() {
			if (this.vid == vid) {
				row = this;
				return false;
			}
		});
		var _params = {
			"requestParam.equal.idarrayStr" : row.alarmIds,
			"requestParam.equal.alarmHandlerStatusType" : 1,
			"requestParam.equal.vid_AlarmStr" : row.vid + "#" + row.alarmCodes
		};
		JAjax("../../monitor/removeBatchAlarms.action", _params, 'json', function(data, err) {
			$("#busThree").unLoadMask("");
			$.ligerDialog.success(data, "提示信息");
		}, function(data, err) {
			$("#busThree").unLoadMask("");
			$.ligerDialog.error(data, "提示信息");
		}, null, null, 60000);
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
	 * 历史告警列表
	 */
	loadHistoryAlarmListGrid : function() {
		var _thisref = this;
		var _addMarker = function(checked, data) {
			if (checked) {
				var _alarmDesc = getAlarmTypeDesc(data.alarmCode);
				var _lng = data.maplon / 600000;
				var _lat = data.maplat / 600000;
				var _parm = {
					id : data.alarmId,
					lng : _lng,
					lat : _lat,
					title : _alarmDesc,
					tip : "开始时间：" + _thisref.parseTimeString(utc2Date(data.alarmStartUtc)) + "" + "</br>结束时间：" + _thisref.parseTimeString(utc2Date(data.alarmEndUtc)) + "" + "</br>持续时间：" + _thisref.calcTime(data.alarmEndUtc, data.alarmStartUtc),
					isDefaultTip : true,
					iconUrl : "../../images/addressMarker/marker.png"
				};
				var _marker = _thisref.cache.map.addMarker(_parm);
				_marker.lng = _lng;
				_marker.lat = _lat;
				_thisref.cache.currentAlarmMarkerId[data.alarmId] = _marker;
				
			} else {
				_thisref.cache.map.removeMarker(data.alarmId);
				delete _thisref.cache.currentAlarmMarkerId[data.alarmId];
			}
			_ar = new Array();
			for ( var obj in _thisref.cache.currentAlarmMarkerId) {
				_ar.push(_thisref.cache.currentAlarmMarkerId[obj].lng);
				_ar.push(_thisref.cache.currentAlarmMarkerId[obj].lat);
			}
			_thisref.cache.map.getBestMaps(_ar);
			
			var selectedRows = _thisref.cache.alarmHisListGridManager.realGrid.getCheckedRows();
			_thisref.cache.handlerFlag = 0;
			$(selectedRows).each(function() {
				if (this) {
					if(this.alarmHandlerStatusType=="2"){
						_thisref.cache.handlerFlag = 1;
						return false;
					}
				}
			});
		};
		var _checkAlladdMarker = function(checked, data) {
			var _ar = new Array();
			if (checked) {
				$(_thisref.cache.alarmListGridManager.gridManager.currentData.Rows).each(function(i) {
					var _alarmDesc = getAlarmTypeDesc(this.alarmCode);
					var _lng = this.maplon / 600000;
					var _lat = this.maplat / 600000;
					var _parm = {
						id : this.alarmId,
						lng : _lng,
						lat : _lat,
						title : _alarmDesc,
						tip : "开始时间：" + utc2Date(this.alarmStartUtc) + "" + "" + "</br>结束时间：" + utc2Date(this.alarmEndUtc) + "" + "" + "</br>持续时间：" + _thisref.calcTime(this.alarmEndUtc, this.alarmStartUtc),
						isDefaultTip : true,
						iconUrl : "../../images/addressMarker/marker.png"
					};
					var _marker = _thisref.cache.map.addMarker(_parm);
					_marker.lng = _lng;
					_marker.lat = _lat;
					_thisref.cache.currentAlarmMarkerId[this.alarmId] = _marker;
				});
			} else {
				$(_thisref.cache.alarmListGridManager.gridManager.currentData.Rows).each(function(i) {
					_thisref.cache.map.removeMarker(this.alarmId);
					delete _thisref.cache.currentAlarmMarkerId[this.alarmId];
				});
			}
			for ( var obj in _thisref.cache.currentAlarmMarkerId) {
				_ar.push(_thisref.cache.currentAlarmMarkerId[obj].lng);
				_ar.push(_thisref.cache.currentAlarmMarkerId[obj].lat);
			}
			_thisref.cache.map.getBestMaps(_ar);
		};
		var parms=[],_columns=[];
		if(this.cache.batch.isBatch){
			if(this.cache.batch.alarmCode!=-1){
				parms.push({
					"name" : "requestParam.equal.alarmCode",
					"value" : this.cache.batch.alarmCode
				});
			}
			_columns.push({
					display : "车牌号",
					width : 100,
					name : "vehicleNo"
			});
		}else{
			parms.push({
				"name" : "requestParam.equal.vid",
				"value" : _thisref.cache.vid
			});
		}
		var options = {
			columns :_columns.concat([{
				display : "状态",// 0：未处理 1：已处理 */
				width : 80,
				name : "alarmStatus",
				render : function(row) {
					var html = "";
					if (row.alarmHandlerStatus == "2") {
						switch (row.alarmHandlerStatusType) {
						case "0":
							html = "不做处理";
							break;
						case "1":
							html = "将来处理";
							break;
						case "2":
							html = "处理完毕";
							break;
						}
					}
					switch (row.alarmHandlerStatus) {
					case "0":
						html = "未处理";
						break;
					case "1":
						html = "处理中";
						break;
					}
					return html;
				}
			}, {
				display : "告警类型",
				width : 80,
				name : "alarmCode",
				render : function(row) {
					var html = getAlarmTypeDesc(row.alarmCode);
					return html;
				}
			}, {
				display : "告警级别",
				width : 100,
				name : "levelId",
				render : function(row) {
					var html = "";
					switch (row.levelId) {
					case "1":
						html = "严重";
						break;
					case "2":
						html = "中度";
						break;
					case "3":
						html = "一般";
						break;
					case "4":
						html = "提醒";
						break;
					}
					return html;
				}
			}
			/*add by tangfeng 2012-08-30  start添加系统时间*/
			, {
				display : "告警时间", 
				width : 150,
				name : "sysutc",
				type: 'string',
				isSort:true,
				render : function(row) {
					var html = "<label>" + utc2Date(row.sysutc) + "</label>";
					return html;
				}
			}
			/*add by tangfeng 2012-08-30  start添加系统时间*/
			, {
				display : "告警开始时间", 
				width : 150,
				name : "alarmStartUtc",
				type: 'string',
				isSort:true,
				render : function(row) {
					var html = "<label>" + utc2Date(row.alarmStartUtc) + "</label>";
					return html;
				}
			}, {
				display : "告警结束时间", 
				width : 150,
				name : "alarmEndUtc",
				render : function(row) {
					var html = "<label>" + utc2Date(row.alarmEndUtc) + "</label>";
					return html;
				}
			}

			, {
				display : "告警车速(公里/小时)",
				width : 120,
				name : "endGpsSpeed",
				render : function(row) {
					if ("" != row.gpsSpeed) {
						var html = row.gpsSpeed / 10;
						return html;
					}
					return "";
				}
			}, {
				display : "告警位置",
				width : 210,
				render : function(row) {
					var html = "<a style='color:#336699;' type='button' onmouseover='getAddress(this," + row.maplat/600000 + "," + row.maplon/600000 + ");'>获取位置<a/>";
					return html;
				}
			}

			, {
				display : "处理时间",
				width : 150,
				name : "alarmHtime",
				render : function(row) {
					var html = utc2Date(row.alarmHtime);
					return html;
				}
			}, {
				display : "处理人",
				width : 80,
				name : "opName"
			} 
//			, {
//				display : "操作",
//				width : 40,
//				name : "",
//				render : function(row) {
//					var html = '<a href="javascript:void(0);" onclick="alarmHandler.showHisAlarmDetailWin(\'' + row.alarmId + '\',\'' + row.vid + '\',\'' + row.staffName + '\',\'' + row.pentName + '\',\'' + row.entName + '\',\'' + row.utc + '\',\'' + row.alarmCode + '\',\'' + row.alarmPlace + '\',\'' + row.gpsSpeed + '\',\'' + row.lon + '\',\'' + row.lat + '\',\'' + row.alarmMem + '\');">详情</a>';
//					return html;
//				}
//			}
			]),
			showCheckbox : true,
			onCheckRow : function(checked, data) {
				_addMarker(checked, data);
			},
			onCheckAllRow : function(checked, data) {
				_checkAlladdMarker(checked, data);
			},
			url : '../../monitor/vehicleAlarmManage!findByParamPage.action',// 数据请求地址
			parms : parms,
			showTitle : false,
			// dataAction: 'local',
			// data: testData,
			pageSize : 30,
			gridBeforeSubmit : function() {
				_thisref.cache.map.removeAllMarkers();
				var _startTime = date2utcsA($("#alarmHandlerHis_startTime").val());
				var _endTime = date2utcsA($("#alarmHandlerHis_endTime").val());
				if ("" == _startTime) {
					$.ligerDialog.warn("开始时间不能为空", "提示");
					_thisref.onResize();
					_thisref.onResize();
					return false;
				}
				if ("" == _endTime) {
					$.ligerDialog.warn("结束时间不能为空", "提示");
					_thisref.onResize();
					_thisref.onResize();
					return false;
				}
				if (_startTime > _endTime) {
					$.ligerDialog.warn("开始时间不能大于结束时间", "提示");
					_thisref.onResize();
					_thisref.onResize();
					return false;
				}
				if (parseInt(_endTime - _startTime) > 86400000) {
					$.ligerDialog.warn("查询时间最大为一天", "提示");
					_thisref.onResize();
					_thisref.onResize();
					return false;
				}
				$("#alarmHandlerHis_startTimeH").val(_startTime);
				$("#alarmHandlerHis_endTimeH").val(_endTime);
				var _val = $("#classline_alarmStatus option:selected");
				if (_val.attr("value") == "2") {
					$("#alarmHandler_StatusType").attr("name", "requestParam.equal.alarmHandlerStatusType");
					$("#alarmHandler_StatusType").attr("value", _val.attr("avalue"));
				} else {
					$("#alarmHandler_StatusType").attr("name", "requestParam.equal.alarmHandlerStatusType");
					$("#alarmHandler_StatusType").attr("value", _val.attr("value"));
				}
				return true;
			},
			onSelectRow : function(rowdata, rowindex, rowDomElement){
				alarmHandler.showHisAlarmDetailWin(rowdata);
			},
			pageSizeOptions : [ 5, 10, 20, 30 ],
			onAfterShowData : function() {
				_thisref.setPageTitle();
				var _s=setTimeout(function(){
					_thisref.drawLineByHisData();
					//begin modify wangmeng 去掉查询后触发全选的操作
					$("#alarmHandler_hisAlarmList").find("div.l-grid-header-inner").eq(0).find("tr").removeClass("l-checked");
					clearTimeout(_s);
				},200);

			},
			height : _thisref.pageHeight - 320,
			width : "100%",
			autoLoad : false,
			submitId : "alarmHandler_hisBtn",
			usePager : true,
			mainContain : "alarmHandler_hisform",
			container : "alarmHandler_hisform",
			tableId : 'alarmHandler_hisAlarmList',
			page : 1,
			searchFormId : 'alarmHandler_hisform'
		};
		_thisref.cache.alarmHisListGridManager = new ctfoGrid(options);
	},
	/**
	 * 获取车辆基本信息
	 */
	getVehicleInfo : function() {
		var _thisref = this;
		JAjax("../../monitor/findVehicleInfo.action", {
			"requestParam.equal.vid" : _thisref.cache.vid
		}, 'json', function(data, err) {
			if (null != data && undefined != data && null == data.error) {
				if(typeof data.length!='undefined' && data.length>0){
					data=data[0];
				}
				var _p = $(".busThreeInformation").find("p");
				var _vehicleNo = data.vehicleno ? data.vehicleno : "";
				$("#alarmHandler_picTitle").html("报警处理【" + _vehicleNo + "】");
				_thisref.cache.vehicleNo = _vehicleNo;				
				_p.eq(0).text("车牌号: " + _vehicleNo);
				_p.eq(1).html("颜色: " + (data.plateColorId ? getPlateColor(data.plateColorId) : ""));
				_p.eq(2).html("线路: " + (data.lineName ? data.lineName : ""));
				_p.eq(3).html("驾驶员: " + data.cname);
				_p.eq(4).html("所属企业: " + (data.corpName ? data.corpName : ""));
				_p.eq(5).html("所属车队: " + (data.teamName ? data.teamName : ""));
				_p = $(".busThreeInformation").eq(1).find("p");
				_p.eq(0).text("车牌号: " + _vehicleNo);
				_p.eq(1).html("颜色: " + (data.plateColorId ? getPlateColor(data.plateColorId) : ""));
				_p.eq(2).html("线路: " + (data.lineName ? data.lineName : ""));
				_p.eq(3).html("驾驶员: " + data.cname);
				_p.eq(4).html("所属企业: " + (data.corpName ? data.corpName : ""));
				_p.eq(5).html("所属车队: " + (data.teamName ? data.teamName : ""));
			}
		}, function(data, err) {

		});
	},
	/**
	 * 判断选中标签是当前告警/历史报警，返回选中的列表
	 * @returns
	 */
	getSelectedGrid:function(){
		var _thisref=this;
		if($("#tabPanel2").find("ul").find("li").eq(0).hasClass("tabSelected")){
			return  _thisref.cache.alarmListGridManager;
		}else{
			return _thisref.cache.alarmHisListGridManager;
		}
	},
	/**
	 * 报警处理
	 */
	alarmProcess : function() {
		var _thisref = this;
		// 不做处理
		$("div.busOrange").click(function() {
			if (!_thisref.cache.batch.isBatch) {
				// 单车
				relieveAlarm(0);
			} else {
				// 批量
				relieveBatchAlarm(0);
			}
		});
		// 将来处理
		$("div.busBlue").click(function() {
			if (!_thisref.cache.batch.isBatch) {
				relieveAlarm(1);
			} else {
				relieveBatchAlarm(1);
			}

		});
		// 处理完毕
		$("div.busGreen").click(function() {
			if (!_thisref.cache.batch.isBatch) {
				if($("#tabPanel2").find("ul").find("li").eq(1).hasClass("tabSelected")){
					if(_thisref.cache.handlerFlag==0){
						relieveAlarm(2);
					}else{
						$.ligerDialog.warn("包含处理完毕的报警，请重新选择", "提示");
					}
				}else{
					relieveAlarm(2);
				}
				
			} else {
				relieveBatchAlarm(2);
			}
		});
	
		
		// 单车报警处理action调用
		var relieveAlarm = function(alarmHandlerStatusType) {
			var selectedRows = null, selectedAlarmIdArr = [], selectedAlarmCodeArr = [];
			var relieveRemarkObj = $("textarea[name='relieveAlarmRemark']");
			var curSelectedGrid=_thisref.getSelectedGrid();
			if (curSelectedGrid) {
				selectedRows = null;
				selectedAlarmIdArr = [];
				selectedAlarmCodeArr = [];
				selectedRows = curSelectedGrid.realGrid.getCheckedRows();
				if (!selectedRows || selectedRows.length < 1) {
					$.ligerDialog.warn("没有选择任何记录", "提示");
					_thisref.onResize();
					_thisref.onResize();
					return false;
				}
				$(selectedRows).each(function() {
					selectedAlarmIdArr.push(this.alarmId);
					selectedAlarmCodeArr.push(this.alarmCode);
				});
			}
			var _param = {
				"requestParam.equal.memo" : relieveRemarkObj.val(),
				"requestParam.equal.vid" : _thisref.cache.vid,
				"requestParam.equal.idarrayStr" : selectedAlarmIdArr.join(","),
				"requestParam.equal.alarmCode" : selectedAlarmCodeArr.join(","),
				"requestParam.equal.alarmHandlerStatusType" : alarmHandlerStatusType
			};
			$("#busThree").loadMask("");
			JAjax("../../monitor/removeAlarms.action", _param, 'json', function(data, err) {
				curSelectedGrid.realGrid.deleteSelectedRow();
				curSelectedGrid.realGrid.loadData(true);
				relieveRemarkObj.val("");
				if (null != data.displayMessage) {
					$.ligerDialog.success(data.displayMessage);
					_thisref.onResize();
					_thisref.onResize();
				}
				$("#busThree").unLoadMask("");
			}, function(data, err) {
				relieveRemarkObj.val("");
				if (null != data.displayMessage) {
					$.ligerDialog.success(data.displayMessage);
					_thisref.onResize();
					_thisref.onResize();
				}
				$("#busThree").unLoadMask("");
			}

			);
		};
		// 批量报警处理action调用
		var relieveBatchAlarm = function(alarmHandlerStatusType) {
			var _row = alarmHandler.cache.batch.batchListGrid.realGrid.getCheckedRows();
			if (_row.length < 1) {
				$.ligerDialog.warn("没有选择任何记录", "提示");
				_thisref.onResize();
				_thisref.onResize();
				return false;
			}
			var relieveRemarkObj = $("textarea[name='relieveAlarmRemark']");
			var _param = {"requestParam.equal.vids":""};
			_param["requestParam.equal.vids"] = getVids(_row);
			_param["requestParam.equal.vid_AlarmStr"]=getVid_AlarmStr(_row);
			_param["requestParam.equal.startTime"]=_thisref.cache.batch.startTime;
			_param["requestParam.equal.endTime"]=_thisref.cache.batch.endTime;
			if("-1"!=_thisref.cache.batch.alarmCode){
				_param["requestParam.equal.alarmCode"]=_thisref.cache.batch.alarmCode;
				_param["requestParam.equal.alarmLevel"]="-2";
			}
			else{
				_param["requestParam.equal.alarmLevel"]=_thisref.cache.batch.leveCode;
			}
			_param["requestParam.equal.memo"] = relieveRemarkObj.val();
			_param["requestParam.equal.alarmHandlerStatusType"] = alarmHandlerStatusType;
			$("#busThree").loadMask("");
			JAjax("../../monitor/removeBatchAlarms.action", _param, 'json',
				function(data, err) {
						_thisref.cache.batch.batchListGrid.realGrid.deleteSelectedRow();
						_thisref.cache.batch.batchListGrid.realGrid.loadData(true);
						relieveRemarkObj.val("");
						if (null != data.displayMessage) {
							$.ligerDialog.success(data.displayMessage);
							_thisref.onResize();
							_thisref.onResize();
						}
						$("#busThree").unLoadMask("");
				}, 
				function(data, err) {
					relieveRemarkObj.val("");
					if (null != data.displayMessage) {
						$.ligerDialog.success(data.displayMessage);
						_thisref.onResize();
						_thisref.onResize();
					}
					$("#busThree").unLoadMask("");
				},null,null,60000);
		};
		// 监听
		$("#alarmHandler_jianTingBtn").bind('click', function() {
			var curSelectedGrid=_thisref.getSelectedGrid();
			var phone = $("input[name='jiantingNumber']").val(),
				remark = $("textarea[name='jiantingRemark']").text();
			if (!isTelphone(phone)) {
				$.ligerDialog.warn('手机号码格式不正确！');
				_thisref.onResize();
				_thisref.onResize();
				return false;
			}
			var alarmIdArr = [];
			selectedRows = curSelectedGrid.realGrid.getCheckedRows();
			if (selectedRows.length < 1) {
				$.ligerDialog.warn("没有选择任何记录", "提示");
				_thisref.onResize();
				_thisref.onResize();
				return false;
			}
			$(selectedRows).each(function() {
				if (this) {
					alarmIdArr.push(this.alarmId + ";" + this.alarmName);// getAlarmTypeDesc(this.alarmcode)
				}
			});
			var converseType = "";
			$("input[name=jiantingType]").each(function(i) {
				if ($(this).attr("checked")) {
					converseType = $(this).val();
				}
			});
			var param = {
				"requestParam.equal.alarmIdArrayStr" : alarmIdArr.join(","),
				"requestParam.equal.vid" : _thisref.cache.vid,
				"requestParam.equal.phoneNum" : phone,// 回拨号码
				"requestParam.equal.memo" : remark,
				"requestParam.equal.type" : converseType
			};

			JAjax("../../monitor/sendMonitorCommand.action", param, 'json', function(data, err) {
				if (data && data.error) {
					$("#alarmHandler_sendJianTingFail").show();
					setTimeout(function() {
						$("#alarmHandler_sendJianTingFail").hide();
					}, 2000);
				} else {
					$("#alarmHandler_sendJianTingSuccess").show();
					$("#alarmHandler_sendJianTingFail").hide();
					setTimeout(function() {
						// 重置输入的数据
						$("input[name='jiantingNumber']").val("");
						$("textarea[name='jiantingRemark']").text("");
						$("input[name=jiantingType]").eq(0).attr("checked", "checked");
						$("#alarmHandler_sendJianTingSuccess").hide();
					}, 2000);
				}
			}, function(data, err) {
				$("#alarmHandler_sendJianTingFail").show();
				$("#alarmHandler_sendJianTingSuccess").hide();
			});
		});

		var sendRecordCommond = function(param) {
			JAjax("../../monitor/sendRecordCommand.action", param, 'json', function(data, err) {
				if (data && data.error) {
					$("#alarmHandler_startRecordFail").show();
					setTimeout(function() {
						$("#alarmHandler_startRecordFail").hide();
					}, 2000);
				} else {
					if (data.length > 0) {
						$("#alarmHandler_startRecordSuccess").show();
						setTimeout(function() {
							// 重置
							// $("#alarmHandler_recordTime").find(
							// "option:eq(0)").attr("selected",
							// "selected");
							$("#alarmHandler_recordRemark").val("");
							$("#alarmHandler_startRecordSuccess").hide();
						}, 2000);
					}
				}
			}, function(data, err) {
				$("#alarmHandler_startRecordFail").show();
				setTimeout(function() {
					$("#alarmHandler_startRecordFail").hide();
				}, 2000);
			});
		};
		// 开始录音
		$("#alarmHandler_startRecordBtn").bind('click', function() {
			var curSelectedGrid=_thisref.getSelectedGrid();
			var _time = $("#alarmHandler_recordTime").find("option:selected").attr("value");
			var _remark = $("#alarmHandler_recordRemark").val();
			var alarmIdArr = [];
			selectedRows = curSelectedGrid.realGrid.getCheckedRows();
			if (selectedRows.length < 1) {
				$.ligerDialog.warn("没有选择任何记录", "提示");
				_thisref.onResize();
				_thisref.onResize();
				return false;
			}
			$(selectedRows).each(function() {
				if (this) {
					alarmIdArr.push(this.alarmId + ";" + this.alarmName);// getAlarmTypeDesc(this.alarmcode)
				}
			});
			var _param = {
				"requestParam.equal.alarmIdArrayStr" : alarmIdArr.join(","),
				"requestParam.equal.vid" : _thisref.cache.vid,
				"requestParam.equal.time" : _time, // 录音时长
				"requestParam.equal.memo" : _remark, // 备注
				"requestParam.equal.recordStatus" : 1
			// 录音类型,1开始,0结束
			};
			_thisref.cache.startRecordTime = date2utcs(dateFormat(new Date(), "yyyy-MM-dd hh:mm:ss"));
			sendRecordCommond(_param);
			$(this).css("display", "none");//开始按钮不可见
			$("#alarmHandler_endRecordBtn").css("display", "block");//结束录音按钮可见
			_thisref.cache.startRecordTimer = setInterval(function() {
				var time = date2utcs(dateFormat(new Date(), "yyyy-MM-dd hh:mm:ss")) - _thisref.cache.startRecordTime;
				_thisref.cache.recordTimeMinute = parseInt(time / 60);
				_thisref.cache.recordTimeSecond = time % 60;
				$("#alarmHandler_recordTimeText").html("本次录音时长：" + parseInt(time / 60) + "分" + time % 60 + "秒");
				if (_time == time % 60) {
					clearInterval(_thisref.cache.startRecordTimer);
					var t = setTimeout(function() {
						$("#alarmHandler_recordTimeText").empty();
						clearTimeout(t);
					}, 2000);
				}
			}, 1000);

		});
		
		// 结束录音
		$("#alarmHandler_endRecordBtn").bind('click', function() {
			var curSelectedGrid=_thisref.getSelectedGrid();
			if (null == _thisref.cache.startRecordTimer) {
				$("#alarmHandler_recordTimeText").html("未开始录音");
				var s = setTimeout(function() {
					$("#alarmHandler_recordTimeText").empty();
					clearTimeout(s);
				}, 2000);
				return false;
			}
			var alarmIdArr = [];
			var _remark = $("#alarmHandler_recordRemark").val();
			var _time = $("#alarmHandler_recordTime").find("option:selected").attr("value");
			selectedRows = curSelectedGrid.realGrid.getCheckedRows();
			$(selectedRows).each(function() {
				if (this) {
					alarmIdArr.push(this.alarmId + ";" + this.alarmName);// getAlarmTypeDesc(this.alarmcode)
				}
			});
			var _param = {
				"requestParam.equal.alarmIdArrayStr" : alarmIdArr.join(","),
				"requestParam.equal.vid" : _thisref.cache.vid,
				"requestParam.equal.time" : _time, // 录音时长
				"requestParam.equal.memo" : _remark, // 备注
				"requestParam.equal.recordStatus" : 0
			// 录音类型,1开始,0结束
			};
			sendRecordCommond(_param);
			$(this).css("display", "none");//结束按钮不可见
			$("#alarmHandler_startRecordBtn").css("display", "block");//开始录音按钮可见
			$("#alarmHandler_recordTimeText").html("本次录音时长：" + _thisref.cache.recordTimeMinute + "分" + _thisref.cache.recordTimeSecond + "秒");
			_thisref.cache.startRecordTime = 0;
			var t = setTimeout(function() {
				$("#alarmHandler_recordTimeText").empty();
				clearTimeout(t);
				_thisref.cache.startRecordTimer = null;
			}, 2000);
			clearInterval(_thisref.cache.startRecordTimer);
		});

		// 拍照
		$("#photoQualitySlider").slider({// 图像质量,1-10数字
			range : "min",
			value : 2,
			min : 1,
			max : 10,
			slide : function(event, ui) {
				$("#alarmHandelr_setPhoto").find("input[name='photoQuality']").val(ui.value);
			}
		});

		$("#photoBrightnessSlider").slider({// 亮度
			range : "min",
			value : 126,
			min : 0,
			max : 255,
			slide : function(event, ui) {
				$("#alarmHandelr_setPhoto").find("input[name='photoBrightness']").val(ui.value);
			}
		});
		$("#photoChromaSlider").slider({// 色度
			range : "min",
			value : 126,
			min : 0,
			max : 255,
			slide : function(event, ui) {
				$("#alarmHandelr_setPhoto").find("input[name='photoChroma']").val(ui.value);
			}
		});
		$("#photoContrastSlider").slider({// 对比度
			range : "min",
			value : 65,
			min : 0,
			max : 127,
			slide : function(event, ui) {
				$("#alarmHandelr_setPhoto").find("input[name='photoContrast']").val(ui.value);
			}
		});
		$("#photoSaturationSlider").slider({// 饱和度
			range : "min",
			value : 65,
			min : 0,
			max : 127,
			slide : function(event, ui) {
				$("#alarmHandelr_setPhoto").find("input[name='photoSaturation']").val(ui.value);
			}
		});
		//拍照
		$("#alarmHandler_sendPhotoCommand").bind('click', function() {
			sendPhotoCommond();
		});
		// 消息
		$("#alarmHandler_messageBtn").bind('click', function() {
			sendMessage();
		});
		/**
		 * 消息发送
		 * 
		 * @returns {Boolean}
		 */
		var sendMessage = function() {
			var curSelectedGrid=_thisref.getSelectedGrid();
			var actionUrl="";
			
			if (_thisref.cache.batch.isBatch) {
				actionUrl = "../../monitor/sendBatchMessageCommand.action";
				selectedRows = _thisref.cache.batch.batchListGrid.realGrid.getCheckedRows();
			} else {
				actionUrl = "../../monitor/sendMessageCommand.action";
				selectedRows = curSelectedGrid.realGrid.getCheckedRows();
			}
			var text = $("textarea[name='messageContext']").text();
			var remark = $("textarea[name='messageRemark']").text();
			if (!selectedRows || selectedRows.length < 1) {
				$.ligerDialog.warn('没有选择任何报警记录！');
				_thisref.onResize();
				_thisref.onResize();
				return false;
			}
			if (validateCharLength(text) < 1) {			
				$.ligerDialog.warn('提示调度消息不能为空 ！');
				_thisref.onResize();
				_thisref.onResize();
				return false;
			}
			if (validateCharLength(text) > 200) {
				$.ligerDialog.warn('调度信息字符不可超过200字符！');
				_thisref.onResize();
				_thisref.onResize();
				return false;
			}
			var _emergencyAttValue = 0, _screenAttValue = 0, _ttsAttValue = 0, _advertisingAttValue = 0;
			$("input[name='msgSendType']").each(function(i, obj) {
				if (i == 0) {
					if ($(this).attr("checked")) {
						_emergencyAttValue = 1;
					}
				}
				if (i == 1) {
					if ($(this).attr("checked")) {
						_screenAttValue = 1;
					}
				}
				if (i == 2) {
					if ($(this).attr("checked")) {
						_ttsAttValue = 1;
					}
				}
				if (i == 3) {
					if ($(this).attr("checked")) {
						_advertisingAttValue = 1;
					}
				}
			});
			var param = {
				"requestParam.equal.emergencyAttValue" : _emergencyAttValue,
				"requestParam.equal.screenAttValue" : _screenAttValue,
				"requestParam.equal.ttsAttValue" : _ttsAttValue,
				"requestParam.equal.advertisingAttValue" : _advertisingAttValue,
				"requestParam.equal.message" : text,
				"requestParam.equal.memo" : remark
			};
			if (_thisref.cache.batch.isBatch) {
				param["requestParam.equal.startTime"]=_thisref.cache.batch.startTime;
				param["requestParam.equal.endTime"]=_thisref.cache.batch.endTime;
				param["requestParam.equal.vids"] = getVids(selectedRows);
				
				
				if("-1"!=_thisref.cache.batch.alarmCode){
					param["requestParam.equal.alarmCode"]=_thisref.cache.batch.alarmCode;
					param["requestParam.equal.alarmLevel"]="-2";
				}
				else{
					param["requestParam.equal.alarmLevel"]=_thisref.cache.batch.leveCode;
				}
			} else {
				var alarmIdArr = [];
				$(selectedRows).each(function() {
					if (this) {
						alarmIdArr.push(this.alarmId + ";" + this.alarmName);// getAlarmTypeDesc(this.alarmcode)
					}
				});
				param["requestParam.equal.alarmIdArrayStr"] = alarmIdArr.join(",");
				param["requestParam.equal.vid"] =_thisref.cache.vid;
			}
			$(".busThreeRight").loadMask("");
			JAjax(actionUrl, param, 'json', function(data, err) {
				$(".busThreeRight").unLoadMask("");
				
				var result = eval(data);
//				if (data && data.error) {
				if(result[0].sendOk == "true"){
					$("#alarmHandler_sendMsgSuccess").show();
					$("#alarmHandler_sendMsgFail").hide();
					setTimeout(function() {
						// 重置
						$("textarea[name='messageContext']").text("");
						$("textarea[name='messageRemark']").text("");
						$("input[name='msgSendType']").each(function(i, obj) {
							$(this).attr("checked", "");
						});
						$("select[name='preinstallSelect']").find("option:eq(0)").attr("selected", "selected");
						$("#alarmHandler_sendMsgSuccess").hide();
						_thisref.loadAlarmSendMsgList();
						
					}, 2000);
				} else {
					$("#alarmHandler_sendMsgSuccess").hide();
					$("#alarmHandler_sendMsgFail").show();
					setTimeout(function() {
						$("#alarmHandler_sendMsgFail").hide();
						_thisref.loadAlarmSendMsgList();
					}, 2000);
				}
				
			}, function(data, err) {
				$(".busThreeRight").unLoadMask("");
				$("#alarmHandler_sendMsgSuccess").hide();
				$("#alarmHandler_sendMsgFail").show();
				setTimeout(function() {
					$("#alarmHandler_sendMsgFail").hide();
				}, 2000);

			},null,null,60000);
		};
		//获取批量报警处理的vid+alarmids拼接字符串
		var getVids = function(selRows) {
			var _vids = "";
			$(selRows).each(function(i) {
				if(i>0){
					_vids+= "," ;
				}
				_vids+= this.vid ;
				
			});
			return _vids;
		};
		//获取批量报警处理的vid+alarmids拼接字符串
		var getVid_AlarmStr = function(selRows) {
			var _vid_AlarmStr = "";
			$(selRows).each(function(i) {
				if (this) {
					if (i > 0) {
						_vid_AlarmStr += "$";
					}
					_vid_AlarmStr += this.vid + "#" + this.alarmCodes;// getAlarmTypeDesc(this.alarmcode)
				}
			});
			return _vid_AlarmStr;
		};
		
		/**
		 * 发送拍照指令
		 */
		var sendPhotoCommond = function() {
			var curSelectedGrid=_thisref.getSelectedGrid();
			var caremaLocation = [], alarmIdArr = [], actionUrl = "";
			if (_thisref.cache.batch.isBatch) {
				actionUrl = "../../monitor/sendBatchPhotoCommand.action";
				selectedRows = _thisref.cache.batch.batchListGrid.realGrid.getCheckedRows();
			} else {
				actionUrl = "../../monitor/sendPhotoCommand.action";
				selectedRows = curSelectedGrid.realGrid.getCheckedRows();
			}
			if (!selectedRows || selectedRows.length < 1) {
				$.ligerDialog.warn('没有选择任何报警记录！');
				_thisref.onResize();
				_thisref.onResize();
				return false;
			}
			$("#alarmHandler_caremaPosition").find("input[name='caremaPosition']").each(function() {
				if ($(this).attr("checked"))
					caremaLocation.push($(this).val());
			});
			if (caremaLocation.length < 1) {
				$.ligerDialog.warn('未选择任何摄像头！');
				return false;
			}
			$(selectedRows).each(function() {
				if (this) {
					alarmIdArr.push(this.alarmId + ";" + this.alarmName);// getAlarmTypeDesc(this.alarmcode)
				}
			});
			var _photo = $("#alarmHandelr_setPhoto");
			var photoQuality = _photo.find("input[name='photoQuality']").val(),
				photoBrightness = _photo.find("input[name='photoBrightness']").val(), 
				photoChroma = _photo.find("input[name='photoChroma']").val(), 
				photoContrast = _photo.find("input[name='photoContrast']").val(),
				photoSaturation = _photo.find("input[name='photoSaturation']").val(),
				photoSense = _photo.find("select[name='photoSense'] option:selected").val(),
				photoSharpness = $("#alarmHandler_photoSharpness").find("input[name='photoSharpness']:checked").val(),
				momo = _photo.find("textarea[name='textarea4']").val();
			switch(photoSharpness){
			case "1":
				photoQuality = 10;
				photoSense =3;
				break;
			case "2":
				photoQuality = 8;
				photoSense = 2;
				break;
			case "3":
				photoQuality = 5;
				photoSense = 0;
				break;
			}
			var param = {
				"photoParameter.locationArray" : (caremaLocation.join(",")),// 摄像头位置
				"photoParameter.quality " : photoQuality,// 图像质量
				"photoParameter.light" : photoBrightness,// 亮度 0-255的数字
				"photoParameter.contrast" : photoContrast, // 对比度0-255的数字
				"photoParameter.saturation" : photoSaturation,// 饱和度0-127的数字
				"photoParameter.color" : photoChroma,// 色度// 0-127的数字
				"photoParameter.resolution" : photoSense,// 分辨率
				"requestParam.equal.memo" : momo// 备注 
			};
			if (_thisref.cache.batch.isBatch) {
				param["requestParam.equal.startTime"]=_thisref.cache.batch.startTime;
				param["requestParam.equal.endTime"]=_thisref.cache.batch.endTime;
				param["requestParam.equal.vids"] = getVids(selectedRows);
				if("-1"!=_thisref.cache.batch.alarmCode){
					param["requestParam.equal.alarmCode"]=_thisref.cache.batch.alarmCode;
					param["requestParam.equal.alarmLevel"]="-2";
				}
				else{
					param["requestParam.equal.alarmLevel"]=_thisref.cache.batch.leveCode;
				}
			} else {
				param["requestParam.equal.alarmIdArrayStr"] = alarmIdArr.join(",");
				param["requestParam.equal.vid"] = _thisref.cache.vid;
			}
			JAjax(actionUrl, param, 'json', function(data, err) {
				if (data && data.error) {
					$("#alarmHandler_sendPhotoFail").show();
					setTimeout(function() {
						$("#alarmHandler_sendPhotoFail").hide();
					}, 2000);
				} else {
					$("#alarmHandler_sendPhoroSuccess").show();
					$("#alarmHandler_sendPhotoFail").hide();
					setTimeout(function() {
						$("#alarmHandler_sendPhoroSuccess").hide();
					}, 2000);
				}
			}, function(data, err) {
				$("#alarmHandler_sendPhotoFail").show();
				setTimeout(function() {
					$("#alarmHandler_sendPhotoFail").hide();
				}, 2000);
			});

		};
	},
	/**
	 * 显示拍照下方的图片
	 */
	showPhoto : function() {
		var _thisref = this;
		$("#alarmHandler_photoDiv").loadMask("");
		var queryLatestPhotos = function(curPage) {
			JAjax("../../monitor/findPictures.action", {
				"requestParam.equal.vid" : _thisref.cache.vid,
				"requestParam.page" : curPage,
				"requestParam.rows" : _thisref.cache.photo.pageRows
			}, 'json', function(data, err) {
				compileLatestPhotosResult(data);
				$("#alarmHandler_photoDiv").unLoadMask("");
			}, function(data, err) {
				$.ligerDialog.warn('查询该车最近抓拍照片错误！');
				$("#alarmHandler_photoDiv").unLoadMask("");
			});
		};
		var compileLatestPhotosResult = function(data) {
			var imgObjs = $("div.scrollPhotosDiv img"), rows = data ? data.Rows : null;
			if (!rows || rows.length < 1)
				return false;
			_thisref.cache.photo.page = parseInt(data.Total / _thisref.cache.photo.pageRows);
			_thisref.cache.photo.page = (data.Total % _thisref.cache.photo.pageRows == 0) ? _thisref.cache.photo.page : _thisref.cache.photo.page + 1;
			imgObjs.each(function(i) {
				var row = rows[i];
				if (row)
					$(this).attr({
						"src" : (row['mediaUri'] ? row['mediaUri'] : "images/map/noPic_big.gif"),
						"sendUserName" : row['sendUserName'],
						"utc" : utc2Date(row['utc']),
						"photoId" : row['mediaId'],
						"isOverload" : (row['isOverload'] ? row['isOverload'] : ""),
						"remark" : row['memo']
					});
			});
			if (rows.length > 0) {
				$("div.bigShowPhoto img:eq(0)").attr({
					"src" : rows[0]['mediaUri'],
					"photoId" : rows[0]['mediaId']
				});
			}

		};
		$("div.scrollPreButton").click(function() {
			if (_thisref.cache.photo.curPage < 2) {
				$(this).find("img").attr("src", "../../images/map/new/scrollPreButtonGray.png");
				return false;
			} else {
				$(this).find("img").attr("src", "../../images/map/new/scrollPreButton.png");
			}
			_thisref.cache.photo.curPage--;
			queryLatestPhotos(_thisref.cache.photo.curPage);
		}).end().find("div.scrollNextButton").click(function() {
			if (_thisref.cache.photo.curPage > _thisref.cache.photo.page - 1) {
				$(this).find("img").attr("src", "../../images/map/new/scrollNextButtonGray.png");
				return false;
			} else {
				$(this).find("img").attr("src", "../../images/map/new/scrollNextButton.png");
			}
			_thisref.cache.photo.curPage++;
			queryLatestPhotos(_thisref.cache.photo.curPage);
		}).end().find("div.scrollPhotosDiv img").click(function() {
			var pic = $(this).attr("src"), sendUserName = $(this).attr("sendUserName"), utc = $(this).attr("utc"), photoId = $(this).attr("photoId"), flag = ($(this).attr("isOverload") == 1) ? true : false, remark = $(this).attr("remark");
			$("div.bigShowPhoto img:eq(0)").attr({
				"src" : pic,
				"photoId" : (photoId ? photoId : "")
			}).end().find("div.map3 ul:eq(0) > li:eq(0) label").text((sendUserName ? sendUserName : "")).end().find("div.map3 ul:eq(0) > li:eq(1) label").text((utc ? utc : "")).end().find("div.map3 input[name='overloadFlag']").attr("checked", flag ? flag : false).end().find("div.map3 textarea[name='overloadRemark']").text(remark);
		});

		queryLatestPhotos(1);

	},
	/**
	 * 显示视频
	 */
	showVedio : function() {
		var _param = {
			container : $("#tabPanel3").find(".tabContent").eq(3),
			vid : this.cache.vid,
			vehicleNo : this.cache.vehicleNo
		};
		if ("" == _param.container.html()) {
			new alarmHandlerVedio(_param);
		}
	},
	/**
	 * 设置拍照默认参数
	 */
	setPhotoNormalParams : function() {
		$("#alarmHandelr_setPhoto").find("input[name='photoQuality']").val(5);
		$("#alarmHandelr_setPhoto").find("input[name='photoBrightness']").val(126);
		$("#alarmHandelr_setPhoto").find("input[name='photoChroma']").val(126);
		$("#alarmHandelr_setPhoto").find("input[name='photoSaturation']").val(65);
		$("#alarmHandelr_setPhoto").find("input[name='photoContrast']").val(65);
		$("#alarmHandler_caremaPosition").find("input[name='caremaPosition']").each(function() {
			$(this).attr("checked", "");
		});
		$("select[name='photoSense']").attr("value", "0").attr("selected", "selected");
	},
	/**
	 * 加载发送消息列表
	 */
	loadAlarmSendMsgList : function() {
		var p = {
			vid : this.cache.vid,
			panel : $("#alarmHandler_context ul")
		};
		// if ("" == p.panel.text()) {
			getAlarmHandleMessage(p);
		// }
	},
	/**
	 * 依据当前报警数据绘制线
	 */
	drawLineByHisData : function() {
		var _thisref = this;
		try {
			var _ar1 = new Array();
			var _alarmCodeArray = this.cache.alarmLevelList;
			var isShowMarker = function(alarmCode) {
				var _rs=false;
				$(_alarmCodeArray).each(function() {
					// 只显示严重告警0 及紧急告警1 级别的告警点
					if (this.alarmCode == alarmCode && (0 == this.levelCode || 1 == this.levelCode)) {
						_rs=true;
						return false;
					}
				});
				return _rs;
			};
//			$(this.cache.alarmListGridManager.gridManager.currentData.Rows).each(function() {
//				if (this.maplon != 0 && this.maplat != 0) {
//					var _lon = new Number(this.maplon / 600000).toFixed(5),
//						_lat = new Number(this.maplat / 600000).toFixed(5);
//					// （当选择查询条件进行查询时 只显示严重告警及紧急告警级别的告警点
//					if (isShowMarker(this.alarmCode)) {
//						var _alarmDesc = getAlarmTypeDesc(this.alarmCode);
//						var _parm = {
//							id : this.alarmId,
//							lng : _lon,
//							lat : _lat,
//							title : _alarmDesc,
//							tip : "开始时间：" +_thisref.parseTimeString(utc2Date(this.alarmStartUtc)) + "" + "" +
//									"" + "</br>结束时间：" + _thisref.parseTimeString(utc2Date(this.alarmEndUtc)) + "" + "" +
//									"" + "</br>持续时间：" + _thisref.calcTime(this.alarmEndUtc, this.alarmStartUtc),
//							isDefaultTip : true,
//							iconUrl : "../../images/addressMarker/marker.png"
//						};
//						var _marker = _thisref.cache.map.addMarker(_parm);
//						_marker.lng = _lon;
//						_marker.lat = _lat;
//						_thisref.cache.currentAlarmMarkerId[this.alarmId] = _marker;
//					}
//				}
//			});
			//alert("start:"+_startTime+"   end:"+new Date());
			if(this.cache.alarmListGridManager.gridManager.currentData.Rows.length<1){
				return ;
			}
			//查询轨迹
			var _params={
					"requestParam.equal.id": _thisref.cache.vid,
					"requestParam.equal.startTime":utcToDate($("#alarmHandler_curAlarmStartTime").val()),
					"requestParam.equal.endTime":utcToDate($("#alarmHandler_curAlarmEndTime").val())
			};
			JAjax("../../monitor/findTrack.action", _params, 'json', 
					function(data, err)
					{
						if (data && data.error)
						{
						} else if (data && data.Rows.length > 0)
						{
							var path=data.Rows;
								var _ar=new Array();
								$(path).each(function(){
									var p = this.split("|");
									_ar.push(new TMLngLat(p[0] / 600000,p[1] / 600000));
									_ar1.push(p[0] / 600000);
									_ar1.push(p[1] / 600000);
								});
//								var _lineBufferMarker = new TMPolyline(_ar,"#ff0000");
								var option = new TMLineOptions();   
								option.lnglats = _ar;//生成折线的点数组
								var _lineBufferMarker = new TMLineOverlay(option);
								_lineBufferMarker.setLineColor("#ff0000");
								_thisref.cache.hisAlarmLine[_thisref.cache.hisAlarmLine.length++]=_lineBufferMarker;
								_thisref.cache.map.map.addOverLay(_lineBufferMarker)
								_thisref.cache.map.getBestMaps(_ar1);
						}						
					},
					function(data, err)
					{
						// alert("查询车辆实时信息错误");
					},null,null,60000);
			
		} catch (exception) {
//			alert(exception);
		}
	},
	parseTimeString:function(timeString){
		return timeString==""?"--":timeString;
	},
	setPageTitle : function() {
		var _pageTop = $("#alarmHandler_pageTop");
		if (this.cache.batch.isBatch) {
			var _rows = this.cache.batch.batchListGrid.gridManager.data.Rows;
			var _total = 0;
			//告警列表统计
			if (this.cache.batch.alarmCode == -1) {
				$(_rows).each(function() {
					_total += parseInt(this.emergentAlarmCount) + parseInt(this.importantAlarmCount) + parseInt(this.generallyAlarmCount);
				});
			}else{
				$(_rows).each(function() {
				_total += parseInt(this.alarmcodeCount);
				});
			}
			var _len = _rows.length;
			_pageTop.find("td:eq(1)").html("<b>批量车辆处理 </b>");
			_pageTop.find("td:eq(3)").html("<b>截止到&nbsp;" + dateFormat(new Date(), 'yyyy-MM-dd hh:mm:ss') + " " + "&nbsp;车辆数 ： <span style='color:#B41203;'>" + _len + "</span>" + "  &nbsp;</b>辆，未处理告警总数：<b style='color:#B41203;'>" + _total + "</b>");
		} else {
			_pageTop.find("td:eq(2)").html("<b>" + window.opener.window.vehicleNoValue + "</b>");
			var _len=0;
			if($("#tabPanel2").find("ul").find("li").eq(0).hasClass("tabSelected")){
				_len = this.cache.alarmListGridManager.gridManager.currentData.Total;
			}else{
				_len = this.cache.alarmHisListGridManager.gridManager.currentData.Total;
			}
			_pageTop.find("td:eq(3)").html("<b>截止到&nbsp;" + dateFormat(new Date(), 'yyyy-MM-dd hh:mm:ss') + " &nbsp;共 <span style='color:#B41203;'>" + _len + "</span> &nbsp;条未处理的告警结果</b>");
		}
	},
	/**
	 * 显示历史报警详细
	 */
	showHisAlarmDetailWin : function(p) {
		$("#alarmHandler_processTab").find("li").eq(4).trigger('click');//弹出历史详情标签
		var vehicleNoValue_this = window.opener.window.vehicleNoValue;
		var _thisref = this;
		var _thisPop = $(".historyFont");
		var url = "alarmDetail.html";
		var gpsSpeed = 0;
		var render = function(p){
			//显示基本文本信息
			if (p.gpsSpeed) {
				gpsSpeed = p.gpsSpeed / 10;
			}
			var _alarmPlace = "<a style='color:#336699;' type='button' onmouseover='getAddress(this," + p.maplat/600000 + "," + p.maplon/600000 + ");'>获取位置<a/>";
//			var _alarmPlace = "";
//			if (p.alarmPlace.length > 15) {
//				_alarmPlace = p.alarmPlace.substring(0, 15);
//				_alarmPlace += "...";
//			} else {
//				_alarmPlace = p.alarmPlace;
//			}
			$("#alarmHandlerWin_hisPop")
			.find("label:eq(0)").text(vehicleNoValue_this).end()// "车号"+
			.find("label:eq(1)").text(p.pentName).end()// "所属企业"+
			.find("label:eq(2)").text(p.staffName).end()// "驾驶员"+
			.find("label:eq(3)").text(p.entName).end()// "所属车队"+
			.find("label:eq(4)").text(utc2Date(p.alarmStartUtc)).end()// "报警时间"+
			.find("label:eq(5)").text(getAlarmTypeDesc(p.alarmCode)).end()// "报警类型"+
			.find("label:eq(6)").text(gpsSpeed + "km/h").end()// "报警时车速"+
			.find("label:eq(7)").html(_alarmPlace).end()// "当前位置"+
//			.find("tr:eq(4) td:eq(1)").append(p.alarmMem).end();
			.find("label:eq(8)").text(p.alarmMem).end();
			//查询历史报警详情
			alarmHandler.getHisAlarmDetail(p.alarmId);
		};
		if($("#alarmHandlerWin_hisPop").length > 0){
			render(p);
		}else {
			$(_thisPop).load(url, {}, function() {
				render(p);
			});
		}
	},
	/**
	 * 查询历史报警详情
	 */
	getHisAlarmDetail : function(alarmId) {
		var _panel = $("#alarmProcessPopAlarmDetailDiv");
		JAjax("../../monitor/vehicleAlarmLogManage!findByThVehicleAlarmLogManage.action", {
			"requestParam.equal.alarmId" : alarmId
		}, 'json', function(data, err) {
			if(data && data.Rows.length > 0){
				_panel.find("table:gt(0)").remove();//大于0的table删除，删除之前的table内容
				$(data.Rows).each(function(i) {
					// /** 报警操作方式 operTypeInt ,1:短信 2：监听
					// 3：拍照 4：双向监听
					// /** 发送状态-1等待回应 0:成功 1:设备返回失败 2:发送失败
					// 3:设备不支持此功能 4:设备不在线 */
					var _typeText = "",
						_crResult = "",
						_crResult0 = null;
					if (this.operTypeInt == "1") {
						_typeText = "短信";
					} else if (this.operTypeInt == "2") {
						_typeText = "单向监听";
					} else if (this.operTypeInt == "3") {
						_typeText = "拍照";
					} else if (this.operTypeInt == "4") {
						_typeText = "双向通话";
					} else if (this.operTypeInt == "5") {
						_typeText = "录音";
					}
					_typeText += ";  " + this.operHandleText;
					
					if ("0" == this.coStatus) {
						_crResult = "<img src='../../images/alarmHandler/sucess.png'/>";
						if (this.operTypeInt == "3") {
							_crResult0 = $("<img>");
							if (this.mediaUri) {
								_crResult0.attr({
									"src": this.mediaUri,
									"width": 30,
									"height": 30
								}).addClass("hand");
								var _thisMediaUri = this.mediaUri;
								_crResult0.bind('click', function() {
									var mainDiv = $("#busThree");
									var popwin = $("<div>");
									popwin.attr('id', "alarmHandlerWin_photoDetail");
									$(popwin).appendTo($(mainDiv));
									var url = "../../model/alarmHandler/photoDetail.html";
									$(popwin).css({
										"width" : 600,
										"height" : 500,
										"position" : "absolute",
										"top" : ($(window).height() - 500) / 2,
										"left" : ($(window).width() - 600) / 2,
										"z-index" : 10000
									});
									$(popwin).load(url, {}, function() {
										var _thisPop = $("#alarmHandlerWin_photoDetail");
										_thisPop.find("div.seventitle img").click(function() {
											$("#alarmHandlerWin_photoDetail").remove();
										});
										$("#alarmHandlerWin_photoDetailWin").find("img:eq(0)").attr("src", _thisMediaUri);
										$("#alarmHandlerWin_hisPop").find("table:eq(0)").clone().appendTo($("#alarmHandlerWin_photoDetailWin").find("div"));
									});
								});
							}else{
								_crResult0 = "<img src='../../images/alarmHandler/Pictures.png' width=30 height=30 title='未返回图像'/>";
							}
						}
					} else {
						_crResult = "<img src='../../images/alarmHandler/failure.png' />";
					}
					var newTable = _panel.find("table:eq(0)").clone().appendTo(_panel).show()
					.find("label:eq(0)").text(_typeText).end()// 报警处理方式：
					.find("label:eq(1)").text(utc2Date(this.operHtime)).end()// 报警处理时间：
					.find("label:eq(2)").text(this.operMem).end()// 备注：
					.find("label:eq(3)").html(_crResult).end()// 处理结果：
					.find("label:eq(4)").text(this.opName).end();// 处理人
					
					if(this.operTypeInt == "3" && _crResult0){
						newTable.find("label:eq(3)").append(_crResult0);
					}
				});
			}else{
				_panel.find("table:gt(0)").remove();//大于0的table删除
			}
		}, function(data, err) {
			
		});

	},
	loadCurrentVehiclePosition : function() {
		var _thisref = this;
		if(_thisref.cache.batch.isBatch){
			return false;
		}
		JAjax("../../monitor/findRealAlarmTrack.action", {
			"requestParam.equal.vid" : _thisref.cache.vid
		}, "json", function(data) {
			var _lng = data.maplon / 600000;
			var _lat = data.maplat / 600000;
			var _parm = {
				id : _thisref.cache.vid,
				lng : _lng,
				lat : _lat,
				iconUrl : "../../images/addressMarker/marker.png"
			};
			var _marker = _thisref.cache.map.addMarker(_parm);
			_thisref.cache.currentAlarmMarkerId[_thisref.cache.vid] = _marker;
			var _ar = new Array();
			_ar.push(_lng);
			_ar.push(_lat);
			_thisref.cache.map.getBestMaps(_ar);
		}, function(err) {
			$.ligerDialog.alert("查询报警车辆位置信息错误");
		});
	},
	// 获取调度信息预设信息
	getSchedulePreInstallMessage : function() {
		JAjax("../../systemmng/findPredefinedMsgByParam.action", "", "json", function(data) {
			var option = "";
			$(data).each(function() {
				option += "<option value='" + this.msgBody + "' >" + this.msgIdx + "</option>";
			});
			var _preinstallSelect = $("select[name='preinstallSelect']");
			_preinstallSelect.append(option);
			_preinstallSelect.change(function() {
				$("textarea[name='messageContext']").text($(this).find("option:selected").val());
			});

		}, null);
	}

};

$(document).ready(function() {
	var _alarmHandler = new alarmHandler();
	window.alarmHandler = _alarmHandler;
//	$(window).resize(function() {
//		//执行一次，获取的document的height 值不正确 
//		_alarmHandler.onResize();
//		_alarmHandler.onResize();
//	});
});



