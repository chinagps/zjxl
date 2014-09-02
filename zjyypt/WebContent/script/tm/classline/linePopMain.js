var linePopMain = function() {
	this.initMap();//地图初始化
	this.initEvent();
	this.drawLineEvent();
	this.initTabMenu();
	this.loadBindVehiclesList();
	this.actionType = "add";// add,update
	this.isSubmiting=false;//是否处于提交状态
};

linePopMain.prototype = {
	cache : {
		lineUpdateId : 0,
		belongToCrop:0,//修改状态下所属企业id
		lineMap : {},
		slngLat:null,//当前点（前一条线路的结束点）
		idx:"line1",//线路的idx值
		lines:[],//最终的线路信息
		routeAll:[],//所有的沿路画线容器
		lineToolAll:[],//所有折线容器
		lineToolFinal:null,//最终的线路容器
		polyLineSel:null,//线段移入移出显示线
		qiMarker:null,//起标注点
		zhongMarker:null,//始标注点
		upShrinkhidden : 1,  //纵向收缩标志
		// 分段设置列表
		spanLineList : {
			grid : {},
			jsonObj : {
				Rows : []
			},
			// 默认参数
			config : {
				pid : 0,
				startStationId : 0,// 序号
				roadWight : "300",// 路段宽度
				roadTime : "0",// 路段时长
				speedThreshold : "100",// 最高速度
				speedTimeThreshold : "60"// 超速持续时间
			}
		},
		// 点击下一步按钮来执行tab 按钮切换index
		clickNextTabIndex : 0,
		// 绑定车辆列表
		bindVehicleNoList : {
			grid : {},
			jsonObj : {
				Rows : []
			},
			// vid
			vids : "",
			// 是否下发车机
			isdownTerminal : "0",
			// 是否紧急
			ispressing : "0",
			// 是否显示
			isview : "0",
			// 是否播报
			istts : "0",
			// 是否广告屏显示
			isad : "0",
			// 1平台判断，2车机判断
			judgment : "1",
			// 业务类型,1-限时(limitTime),2-限速(limitSpeed),4-进报警给平台(inAlarmToPlatform),
			// 3-进报警给终端(inAlarmToDriver),6-出报警给平台(outAlarmToPlatform),5-出报警给驾驶员(outAlarmToDriver)（多个以逗号分隔）
			usetype : "",
			// 下发内容
			message : "",
			// 线路生效开始时间点
			lineBeginTime : "",
			// 线路生效结束时间点
			lineEndTime : "",
			// 每天有效起始时间周期
			periodBeginTime : "",
			// 每天有效结束时间周期
			periodEndTime : "",
			// 每天有效起始时间周期(utc)
			begintimeUtc : "",
			// 每天有效结束时间周期(utc)
			endtimeUtc : ""
			
		}
	},
	/**
	 * 初始化地图
	 */
	initMap : function() {
		this.cache.lineMap = new CTFO_MAP("linePopMain_map");
		// this.cache.lineMap.setCenter(116.29376, 39.95776);
		this.cache.lineMap.setLevel(9);
		this.cache.lineMap.addMapControl(1);
		this.cache.lineMap.changeSize();
//		this.cache.lineMap.addMapCopyRight({right:10, bottom: 5});
	},
	/**
	 * 初始化tab
	 */
	initTabMenu : function() {
		var _thisPop = $("#classline_linePopMain");
		var _ul = _thisPop.find("ul");
		_ul.find("li").each(function(i) {
			$(this).bind('click', function() {
				if (i != 1) {//非分段设置，也即：详情、绑定车辆列表
				}
				if (i == 0) {//详情tab
					$("#linePopWin_addSplitLine").hide();//拆分线路按钮-隐藏
					$("#linePopWin_bindCars").hide();//绑定车辆按钮-隐藏
				}
				if (i == 1) {//分段设置tab
					$("#linePopWin_bindCars").hide();//绑定车辆按钮-隐藏
				}
				if (i == 2) {//绑定车辆列表tab
					$("#linePopWin_addSplitLine").hide();
					$("#linePopWin_bindCars").show();
				}
				_ul.find("li").each(function(i) {
					if ($(this).hasClass("fenceManagement_modifyLines_main_content_tab_selected")) {
						$(this).removeClass("fenceManagement_modifyLines_main_content_tab_selected");
					}
				});
				$(this).addClass("fenceManagement_modifyLines_main_content_tab_selected");
				var _tabs = _thisPop.find(".tabContent");
				_tabs.hide();
				_tabs.eq(i).show();
			});

		});

	},
	//提交前，数据验证
	checkInput : function() {
		var _pop = $("#classline_linePopMain");
		var _lineName = _pop.find(".xiugaiinput:eq(0)").val();// 线路名称
		var _lineCode = _pop.find(".xiugaiinput:eq(1)").val();
		var _startTime = date2utcsA($("#classline_startTime").val());
		var _endTime = date2utcsA($("#classline_endTime").val());
		var _remark = _pop.find(".xiugaitextarea").val();
		if ("" == _lineName) {
			$.ligerDialog.warn("线路名称不能为空!", "提示");
			return false;
		}
		if (validateCharLength(_lineName) > 20) {
			$.ligerDialog.warn("线路名称过长!", "提示");
			return false;
		}
		if ("" == _lineCode) {
			$.ligerDialog.warn("线路编码不能为空!", "提示");
			return false;
		}
		if (_lineCode.length > 15) {
			$.ligerDialog.warn("线路编码不能大于15位!", "提示");
			return false;
		}
		if ("" == _startTime) {
			$.ligerDialog.warn("开始时间不能为空!", "提示");
			return false;
		}
		if ("" == _endTime) {
			$.ligerDialog.warn("结束时间不能为空!", "提示");
			return false;
		}
		if (_startTime > _endTime) {
			$.ligerDialog.warn("开始时间必须小于结束时间!", "提示");
			return false;
		}
		if (validateCharLength(_remark) > 200) {
			$.ligerDialog.warn("备注过长!", "提示");
			return false;
		}
		var thisref=this;
		var length=thisref.cache.spanLineList.jsonObj.Rows.length;
		if(thisref.cache.slngLat==null && length==0){
			$.ligerDialog.warn("请在地图中绘制线路", "提示");
			return false;
		}
		if (length==0) {
			$.ligerDialog.warn("请点击“画线完成”确认线路", "提示");
			return false;
		}
		return true;
	},
	/**
	 * 提交所有的信息
	 */
	submitAll : function() {
		var thisref = this;
		var _pop = $("#classline_linePopMain");
		var _lineName = _pop.find(".xiugaiinput:eq(0)").val();// 线路名称
		var _lineCode = _pop.find(".xiugaiinput:eq(1)").val();
		var _startTime = date2utcsA($("#classline_startTime").val());
		var _endTime = date2utcsA($("#classline_endTime").val());
		var _remark = _pop.find(".xiugaitextarea").val().replace(/\r/ig, "").replace(/\n/ig, "");
		var param = {};
		// 详情
		if (thisref.actionType == "update") {
			param["tbClassLine.belongToCrop"] = thisref.cache.belongToCrop;//如果为修改，则不改变原有的所属企业
		}else{
			param["tbClassLine.belongToCrop"] = classline.getEntId(); // 如果为添加，则组织为选中的企业id
		}
		param["tbClassLine.lineName"] = _lineName;// 线路名称
		param["tbClassLine.lineCode"] = _lineCode;// 线路编码
		param["tbClassLine.startTime"] = _startTime;// 开始时间
		param["tbClassLine.endTime"] = _endTime;// 结束时间
		param["tbClassLine.lineTypeId"] = _pop.find(".xiugaiselect:eq(0) option:selected").attr("value");// 线路类型
		param["tbClassLine.lineStatus"] = _pop.find(".xiugaiselect:eq(1) option:selected").attr("value");// 线路运营状态
		param["tbClassLine.remark"] = _remark;// 备注
		try{
		/** 站点类型1.关键点 2.线路点 3.其他点 */
		var totalLineInfo=thisref.cache.lineToolFinal.getLinesById(thisref.cache.idx);
		var index=0;
		$(totalLineInfo.lines).each(function(i) {
			var lineMaxIndex=this.lnglats.length-1;
			$(this.lnglats).each(function(j) {
				if(index==0 && i==0 && j==0){//index=0,j第一个点记录为type=2的点，否则j的第一个点不记录
					param["tbStationList[" + index + "].stationType"] = 2;// 此处2为线路点
				}else if(j==0){
					return;
				}else if(lineMaxIndex==j){//如果是本条线段的最后一个点，则记录type==2
					param["tbStationList[" + index + "].stationType"] = 2;// 此处2为线路点或拆分点
				}else{//如果是本条线段的中间点，则记录type==3
					param["tbStationList[" + index + "].stationType"] = 3;// 此处3为普通点
				}
				param["tbStationList[" + index + "].stationNo"] = index;// 站点编号
				param["tbStationList[" + index + "].maplon"] = parseInt(this[0]*600000);// 经度
				param["tbStationList[" + index + "].maplat"] = parseInt(this[1]*600000);// 纬度
				index++;
			});
		});
		// 分段设置
		var curStartPointIndex=0;//前面线路的总长度
		$(thisref.cache.spanLineList.jsonObj.Rows).each(function(i) {
			//线路的开始、结束序号
			var curLineLength=totalLineInfo.lines[i].lnglats.length;
			param["tbLinePropList[" + i + "].startStationId"] = curStartPointIndex;// 开始点序号
			curStartPointIndex=curStartPointIndex+curLineLength-1;
			param["tbLinePropList[" + i + "].endStationId"] = curStartPointIndex;//结束点序号
			
			param["tbLinePropList[" + i + "].roadWight"] = this.roadWight;// 宽度
			param["tbLinePropList[" + i + "].roadTime"] = this.roadTime;// 时长
			param["tbLinePropList[" + i + "].speedThreshold"] = this.speedThreshold*10;// 速度 speedThreshold提交数据库时，需乘以10
			param["tbLinePropList[" + i + "].speedTimeThreshold"] = this.speedTimeThreshold;// 超速持续时间
		});
		
		// 绑定车辆列表
		param["vids"] = thisref.cache.bindVehicleNoList.vids; // vid
		param["tbClassLine.judgment"] = thisref.cache.bindVehicleNoList.judgment;// 1平台判断，2车机判断
		param["tbClassLine.usetype"] = thisref.cache.bindVehicleNoList.usetype;// 业务类型,1-限时,2-限速,3-进报警判断,4-进报警给终端,5-出报警判断,6-出报警给终端,7进报警给平台,8出报警给平台
		param["tbClassLine.lineBeginTime"] = thisref.cache.bindVehicleNoList.lineBeginTime;// 线路生效开始时间点
		param["tbClassLine.lineEndTime"] = thisref.cache.bindVehicleNoList.lineEndTime;// 线路生效结束时间点
		param["tbClassLine.periodBeginTime"] = thisref.cache.bindVehicleNoList.periodBeginTime;// 每天有效起始时间周期
		param["tbClassLine.periodEndTime"] = thisref.cache.bindVehicleNoList.periodEndTime;// 每天有效结束时间周期
		param["tbClassLine.begintimeUtc"] = thisref.cache.bindVehicleNoList.begintimeUtc;// 每天有效起始时间周期(utc)
		param["tbClassLine.endtimeUtc"] = thisref.cache.bindVehicleNoList.endtimeUtc;// 每天有效结束时间周期(utc)
		var _url = "operationmanagement/addTbClassLine.action";
		var _strSucessRs = "添加线路成功!";
		var _strErrorRs = "添加线路失败!";
		var _failOnlineRs = "部分车辆不在线，绑定失败";
		if (thisref.actionType == "update") {
			// 绑定车辆、线路操作 0为正常更新，1为只操作车辆、线路绑定
			param["tbClassLine.isLineVehicle"] = 0;
			param["tbClassLine.lineId"] = classline_linePopMain.cache.lineUpdateId;
			_url = "operationmanagement/modifyTbClassLine.action";
			_strSucessRs = "更新线路成功!";
			_strErrorRs = "更新线路失败!";
		}
		mask("mainWorkArea", "", true);
		JAjax(_url, param, 'json', function(data, erro) {
			//提交按钮变为可用状态
			thisref.isSubmiting=false;
			$("#linePopWin_submit").removeClass("btn_gray");
			$("#linePopWin_submit").addClass("btn_green");
			
			$("#mainWorkArea").close_ALL_Window("classline_linePopWin");
			mask("mainWorkArea", "", false);
			if (data) {
				if ("success" == data.responseText) {
					$.ligerDialog.success(_strSucessRs, "提示");
				} else if ("failOnline" == data.responseText) {
					$.ligerDialog.success(_failOnlineRs, "提示");
				} else {
					$.ligerDialog.success(_strErrorRs, "提示");
				}
				$("#searchClassLineForm").trigger("submit");
			}
		}, function(data, erro) {
			//提交按钮变为可用状态
			thisref.isSubmiting=false;
			$("#linePopWin_submit").removeClass("btn_gray");
			$("#linePopWin_submit").addClass("btn_green");
			
			mask("mainWorkArea", "", false);
			$("#mainWorkArea").close_ALL_Window("classline_linePopWin");
			if (data) {
				if ("success" == data.responseText) {
					$.ligerDialog.success(_strSucessRs, "提示");
				} else if ("failOnline" == data.responseText) {
					$.ligerDialog.success(_failOnlineRs, "提示");
				} else {
					$.ligerDialog.success(_strErrorRs, "提示");
				}
				$("#searchClassLineForm").trigger("submit");
			}
		}, null, null, 120000);
		}catch(e){
			//提交按钮变为可用状态
			thisref.isSubmiting=false;
			$("#linePopWin_submit").removeClass("btn_gray");
			$("#linePopWin_submit").addClass("btn_green");
		}
	},
	/**
	 * 初始化事件绑定
	 */
	initEvent : function() {
		var thisref = this;
		var _thisPop = $("#classline_linePopMain");
		// 详情tab项内容设置
		var setDetailTab = function() {
			// 关闭
			_thisPop.find(".fenceManagement_polygons_top_right").bind('click', function() {
				$("#mainWorkArea").close_A_Window({id:'classline_linePopWin'});
			});
		};

		// 线路分段tab内容
		var setSpanlineTab = function() {
			
		};
		//绑定车辆tab
		var setBindCarTab = function() {
			if (!classline.CLASSLINE_M) {
				$("#linePopWin_bindCars").remove();
			} else {
				// 绑定车辆按钮事件
				$("#linePopWin_bindCars").bind('click', function() {
					$("#mainWorkArea").A_Window({
						dragabId : 'classline_linePopMain',
						id:"linePopWinbindCars",
						width : 850,
						height : 430,
						unMask : true,
						load_fn : function() {
							$("#linePopWinbindCars").css("z-index","90011");
							classline_findVehicle.getVehicleGrid();
							if (thisref.actionType == "update") {
								classline_findVehicle.getBindVehicleGrid(classline_linePopMain.cache.lineUpdateId);
								classline_findVehicle.getLineAlarmSet(classline_linePopMain.cache.lineUpdateId, classline_linePopMain.cache.judgment, classline_linePopMain.cache.usetype);
							} else {
								// 避免出现编辑后在添加状态为update
								classline.cache.bindcarActionType = "add";
								var manager2 = $("#selectVehicleListGrid").ligerGetGridManager();
								manager2.setOptions({
									data : classline_linePopMain.cache.bindVehicleNoList.jsonObj
								});
								manager2.loadData();
								classline_findVehicle.setAddVehicleInfo();//添加时，多次操作绑定车辆，需要赋值过去
							}
						},
						url : "model/classline/findVehicle.jsp"
					});
					$("#mainWorkArea").show_A_Window();
				});
			}
		};
		// 确定按钮，完成添加、编辑
		$("#linePopWin_submit").bind('click', function() {
			if(thisref.isSubmiting){
				return;
			}else{
				//提交按钮变为不可用状态
				thisref.isSubmiting=true;
				$("#linePopWin_submit").removeClass("btn_green");
				$("#linePopWin_submit").addClass("btn_gray");
			}
			var _tipStr = "确认完成该线路的添加?";
			if (thisref.actionType != "add") {
				_tipStr = "确认完成该线路的修改?";
			}
			$.ligerDialog.confirm(_tipStr, function(yes) {
				if (yes&&thisref.checkInput()) {
					thisref.submitAll();
				}else{
					//提交按钮变为可用状态
					thisref.isSubmiting=false;
					$("#linePopWin_submit").removeClass("btn_gray");
					$("#linePopWin_submit").addClass("btn_green");
				}
			});
		});
		//拆分线路
		var setSplitLine = function() {
		};

		setDetailTab();//详情tab
		setSpanlineTab();//分段设置tab
		setBindCarTab();//绑定车辆tab
		setSplitLine();//拆分线路按钮
		thisref.findVehiclePostion();//车辆定位
	},
	//画线事件
	drawLineEvent:function(){
		var thisref = this;
		//折线绘制
		$("#btnDrawPolyline").bind('click', function() {
			var currentZoom=classline_linePopMain.cache.lineMap.getCurrentZoom();
			if(currentZoom<9){//地图级别共1-18，9:街道 8级就可以沿路画线但不好描述
				$.ligerDialog.success("地图放大到城市级别绘制线路", "提示");
				if(thisref.cache.slngLat){//有点则以其为开始点
					classline_linePopMain.cache.lineMap.map.setCenterAtLngLat(thisref.cache.slngLat);//以当前点为中心，放大到街道级别
				}
				classline_linePopMain.cache.lineMap.map.zoomTo(9);
			}
			TMEvent.addListener(thisref.cache.lineMap.map, "zoom",function(oldZoom,newZoom){
				try{
				if(newZoom<9){//地图级别共1-18，9:街道 8级就可以沿路画线但不好描述
					classline_linePopMain.cache.lineMap.map.zoomTo(9);
				}
				}catch(e){
					alert(e.message);
				}
			});
			//点击折线画线，则沿路暂时不可用，防止两种都点，两种画线同事执行
			$("#btnRouteLine").parent().hide();
			
			var option=new TMLineToolOptions();   //构造参数对象
			option.map=thisref.cache.lineMap.map;
			var lineTool=new TMSplitTool(option);
			lineTool.setSplit(false);
			if(thisref.cache.slngLat){//有点则以其为开始点
				var startlngLat = new TMLngLat(thisref.cache.slngLat[0],thisref.cache.slngLat[1]);
				lineTool.setStartPoint(startlngLat);
			}else{//开始画
				lineTool.open();
			}
			//画线结束
			TMEvent.bind(lineTool, "drawend",lineTool,function(a,idx){ 
				var d=this.getLinesById(idx);
				var linePoints = d.lines[0].lnglats;
				if(thisref.cache.lines.length > 0){
					thisref.cache.lines = thisref.cache.lines.concat(linePoints);
				}else{
					thisref.cache.lines=linePoints;
				}
				//结尾点经纬度
				thisref.cache.slngLat = linePoints[linePoints.length-1];
				//确定、清楚按钮可见
				$("#btnDrawPolyline").parent().show();
				$("#btnRouteLine").parent().show();
				$("#btnOk").parent().show();
				$("#btnClear").parent().show();
				TMEvent.clearListeners(thisref.cache.lineMap.map, "zoom");
			});
			thisref.cache.lineToolAll.push(lineTool);
		});
		
		//沿路绘线
		$("#btnRouteLine").bind('click', function() {
			var currentZoom=classline_linePopMain.cache.lineMap.getCurrentZoom();
			if(currentZoom<9){//地图级别共1-18，9:街道 8级就可以沿路画线但不好描述
				$.ligerDialog.success("地图放大到城市级别绘制", "提示");
				if(thisref.cache.slngLat){//有点则以其为开始点
					classline_linePopMain.cache.lineMap.map.setCenterAtLngLat(thisref.cache.slngLat);//以当前点为中心，放大到街道级别
				}
				classline_linePopMain.cache.lineMap.map.zoomTo(9);
			}
			TMEvent.addListener(thisref.cache.lineMap.map, "zoom",function(oldZoom,newZoom){
				if(newZoom<9){//地图级别共1-18，9:街道 8级就可以沿路画线但不好描述
					classline_linePopMain.cache.lineMap.map.zoomTo(9);
				}
			});
			//沿路画线、折线画线不可见
			$("#btnDrawPolyline").parent().hide();
			$("#btnRouteLine").parent().hide();
			var route=new TMRoute({map:thisref.cache.lineMap.map,editable:true,startIcon:null,endIcon:null});//创建沿线绘线接口
			route.editable = false;
			thisref.cache.routeAll.push(route);
			if(thisref.cache.slngLat){//已有点，则以其为开始点
				route.start(thisref.cache.slngLat);
				TMEvent.addListener(route,"drawend",getInfos);
			  	TMEvent.addListener(route,"delnode",function(obj){});
			}else{//没有点，则开始第一次画线
				var markTool=new TMMarkerTool({map:thisref.cache.lineMap.map,follow:true});//创建标注工具
				TMEvent.addListener(markTool, "drawend",function(obj){
					var lngLat = obj.getLngLat();
					route.start(lngLat);//开始绘制线--第二个参数为true时绘制闭合线路
					TMEvent.addListener(route,"drawend",getInfos);
		      		TMEvent.addListener(route,"delnode",function(obj){});
					markTool.clear();//移除标注添加的点
				});
				markTool.open();
			}
			TMEvent.bind(route,"error",route,function(message){
				if(message=='无导航路线'){
					return;//如果此错alert,而当前鼠标点在海里，会不停的弹出“无导航路线”
				}
				$.ligerDialog.warn(message, "提示");
				route.clear();
				$("#btnDrawPolyline").parent().show();
				$("#btnRouteLine").parent().show();
				TMEvent.clearListeners(classline_linePopMain.cache.lineMap.map, "zoom");
			});
		});
		//沿路画线结束，获取信息
		var getInfos=function(obj){
			TMEvent.clearListeners(thisref.cache.lineMap.map, "zoom");
			//沿路画线完成，则画线两种方式可见，可完成画线、清除画线
			$("#btnDrawPolyline").parent().show();
			$("#btnRouteLine").parent().show();
			$("#btnOk").parent().show();
			$("#btnClear").parent().show();
			
			var detail=obj.getDetail();
			var routelines=detail.lines;
			var routeLinesLngLats=[];
			for(var i=0;i<routelines.length;i++){
				if(thisref.cache.lines.length > 0){
					thisref.cache.lines = thisref.cache.lines.concat(routelines[i].lnglats);
				}else{
					thisref.cache.lines=routelines[i].lnglats;
				}
				if(i==0){
					routeLinesLngLats=routelines[i].lnglats;
				}else{
					routeLinesLngLats = routeLinesLngLats.concat(routelines[i].lnglats);
				}		
			} 
			obj.clear();
			var lnglatTmps=[];
			 for(var i=0;i<routeLinesLngLats.length;i++){
				 lnglatTmps.push(new TMLngLat(routeLinesLngLats[i][0],routeLinesLngLats[i][1]));
			 }
			var option = new TMLineOptions();
			option.lnglats = lnglatTmps;
			option.weight = 5;
			//根据点数组创建一条折线
			var polyLine = new TMLineOverlay(option);
			thisref.cache.lineMap.map.addOverLay(polyLine);
			polyLine.isRouteLine=true;//删除时候用，有此则需要地图删除线
			thisref.cache.routeAll.push(polyLine);
			var routeLnglats = routelines[routelines.length-1].lnglats;
			thisref.cache.slngLat = routeLnglats[routeLnglats.length-1];
		};
		//拆分线路
		$("#btnSplitRoute").bind('click', function() {
			try{
				//线路是否可拆分
				thisref.cache.lineToolFinal.setSplit(true); 
				// 添加拆分点
		    	TMEvent.bind(thisref.cache.lineToolFinal, "splitend",thisref.cache.lineToolFinal,function(a,idx){ 
		    		var totalLineInfo=this.getLinesById(idx);
		    		while(thisref.cache.spanLineList.jsonObj.Rows.length<totalLineInfo.lines.length){
			    		//生成一条线段属性列表
						var _item = {
							rowNum:thisref.cache.spanLineList.jsonObj.Rows.length+1,//序号
							pid : totalLineInfo.lines.length-1,
							startStationId : totalLineInfo.lines.length-1,// 线段开始点的序号
							roadWight : thisref.cache.spanLineList.config.roadWight,// 路段宽度
							roadTime : thisref.cache.spanLineList.config.roadTime,// 路段时长
							speedThreshold : thisref.cache.spanLineList.config.speedThreshold,// 最高速度
							speedTimeThreshold : thisref.cache.spanLineList.config.speedTimeThreshold// 超速持续时间
						};
						thisref.cache.spanLineList.jsonObj.Rows.push(_item);
						// 重新加载分段列表数据
						thisref.cache.spanLineList.grid.data = thisref.cache.spanLineList.jsonObj;
						thisref.cache.spanLineList.grid.loadData();
		    		}
		    		
		    	 });
			        
				// 删除拆分点
				TMEvent.bind(thisref.cache.lineToolFinal, "delnode",thisref.cache.lineToolFinal,function(a,idx){ 
					var totalLineInfo=this.getLinesById(idx);
					while(thisref.cache.spanLineList.jsonObj.Rows.length>totalLineInfo.lines.length){
						thisref.cache.spanLineList.jsonObj.Rows.splice(thisref.cache.spanLineList.jsonObj.Rows.length-1, 1);
						// 重新加载分段列表数据
						thisref.cache.spanLineList.grid.data = thisref.cache.spanLineList.jsonObj;
						thisref.cache.spanLineList.grid.loadData();
					}
				 });
				$("#btnSplitRoute").parent().hide();
				$("#btnQuitSplitRoute").parent().show();
			 }catch(e){
//				alert(e.message);
			}
		});

		//拆分禁用
		$("#btnQuitSplitRoute").bind('click', function() {
			thisref.cache.lineToolFinal.setSplit(false);
			$("#btnSplitRoute").parent().show();
			$("#btnQuitSplitRoute").parent().hide();
		});
		
		//确认线路
		$("#btnOk").bind('click', function() {
			for(var i=0;i<thisref.cache.routeAll.length;i++){
				if(thisref.cache.routeAll[i].isRouteLine){
					thisref.cache.lineMap.map.removeOverLay(thisref.cache.routeAll[i]);
				}else{
					thisref.cache.routeAll[i].clear();
				}
			}
			for(var j=0;j<thisref.cache.lineToolAll.length;j++){
				try{
					thisref.cache.lineToolAll[j].clear();//清除之后，再次确认或清除时会报错map为空
				}catch(e){
				}
			}
			try{
			var option=new TMLineToolOptions();   //构造参数对象
		  	option.map=thisref.cache.lineMap.map;
		  	thisref.cache.lineToolFinal =new TMSplitTool(option);
		  	thisref.cache.lineToolFinal.setSplit(false);
			var totalLineInfo={idx:thisref.cache.idx,lines:[{id:"line11",lnglats:thisref.cache.lines,nodeId:""}]};
			thisref.cache.lineToolFinal.toDrawLines([totalLineInfo],false);
		 	
		 	//确定线路时，只有一根线
			if(thisref.cache.lines.length>0){
				//第一个点：起点
				option = new TMMarkerOptions();
				option.lnglat = new TMLngLat( thisref.cache.lines[0][0] , thisref.cache.lines[0][1]);
				option.icon=new TMIcon(window._TM_map_saveImage_Url+"icon/qi.gif",[28,33]);
				thisref.cache.qiMarker= new TMMarkerOverlay( option );
				thisref.cache.lineMap.map.overlayManager.addOverLay(thisref.cache.qiMarker);
				//最后一个点：结束点
				option = new TMMarkerOptions();
				option.lnglat = new TMLngLat( thisref.cache.lines[thisref.cache.lines.length-1][0] , thisref.cache.lines[thisref.cache.lines.length-1][1]);
				option.icon=new TMIcon(window._TM_map_saveImage_Url+"icon/zhong.gif",[28,33]);
				thisref.cache.zhongMarker= new TMMarkerOverlay( option );
				thisref.cache.lineMap.map.overlayManager.addOverLay(thisref.cache.zhongMarker);
				
				//生成一条线段属性列表
				var _item = {
					rowNum : 1,//行号从1开始
					pid : 0,
					startStationId : 0,// 线段开始点的序号
					roadWight : thisref.cache.spanLineList.config.roadWight,// 路段宽度
					roadTime : thisref.cache.spanLineList.config.roadTime,// 路段时长
					speedThreshold : thisref.cache.spanLineList.config.speedThreshold,// 最高速度
					speedTimeThreshold : thisref.cache.spanLineList.config.speedTimeThreshold// 超速持续时间
				};
				thisref.cache.spanLineList.jsonObj.Rows.push(_item);

				// 加载分段列表数据
				thisref.loadSpanLine();
			}
			thisref.cache.lineToolAll=[];
			thisref.cache.routeAll=[];
			thisref.cache.slngLat=null;
			
			//不再可以画线
			$("#btnDrawPolyline").parent().hide();
			$("#btnRouteLine").parent().hide();
			$("#btnSplitRoute").parent().show();
			$("#btnQuitSplitRoute").parent().hide();
			$("#btnOk").parent().hide();
			$("#btnClear").parent().show();
		}catch(e){
//			alert(e.message);
		}
		});
		
		//清除所有信息
		$("#btnClear").bind('click', function() {
			try{
				//画线可见，其他不可见
				$("#btnDrawPolyline").parent().show();
				$("#btnRouteLine").parent().show();
				$("#btnSplitRoute").parent().hide();
				$("#btnQuitSplitRoute").parent().hide();
				$("#btnOk").parent().hide();
				$("#btnClear").parent().hide();
				if(thisref.cache.qiMarker){
					//删除点标注
					thisref.cache.lineMap.map.overlayManager.removeOverLayById(thisref.cache.qiMarker.getId());
					thisref.cache.qiMarker=null;
			    }
			    if(thisref.cache.zhongMarker){
					//删除点标注
			    	thisref.cache.lineMap.map.overlayManager.removeOverLayById(thisref.cache.zhongMarker.getId());
					thisref.cache.zhongMark=null;
			    }
				for(var i=0;i<thisref.cache.routeAll.length;i++){
					if(thisref.cache.routeAll[i].isRouteLine){
						thisref.cache.lineMap.map.removeOverLay(thisref.cache.routeAll[i]);
					}else{
						thisref.cache.routeAll[i].clear();
					}
				}
				for(var j=0;j<thisref.cache.lineToolAll.length;j++){
					thisref.cache.lineToolAll[j].clear();//清除之后，再次确认或清除时会报错map为空
				}
				if(thisref.cache.lineToolFinal){
					thisref.cache.lineToolFinal.clear();
				}else{
					thisref.cache.lineMap.map.clearOverLays();
				}
				//线段属性列表清空
				thisref.cache.spanLineList.jsonObj.Rows =[];
				thisref.cache.spanLineList.grid.data = thisref.cache.spanLineList.jsonObj;
				try{
					thisref.cache.spanLineList.grid.loadData();
				}catch(e){
					//如果未确定线路，就点击清楚线路则未执行loadSpanLine，会报错
				}
				//清空画线的容器、记录的线、当前点
				thisref.cache.lines =[];
				thisref.cache.routeAll=[];
				thisref.cache.lineToolAll=[];
				thisref.cache.slngLat=null;
			}catch(e){
//				alert(e.message);
			}
		});
	},
	/**
	 * 地图事件绑定
	 */
	mapEvent : function() {
		
	},
	//车辆定位
	findVehiclePostion : function() {
		var _thisref = this;
		$("#classline_linePopMain").find("input:eq(0)").bind('focus', function() {
			$(this).val("");
		});
		$("#btnLocation").bind('click', function() {//定位链接、图片
			var _params = {
				vehicleNo : $("#classline_linePopMain").find("input:eq(0)").val(),
				markerId : "lineFlashMarker",
				map : _thisref.cache.lineMap,
				showTipWindow : null,
				alarmFlashMarker : "lineFlashMarker"
			};
			markerVehicleFlash(_params);
		});
	},
	/**
	 * 加载分段线路数据
	 * 
	 * @param data
	 */
	loadSpanLine : function() {
		var _thisref = this;
		this.cache.spanLineList.grid = $("#classline_spanLineTable").ligerGrid({
			columns : [ {
				display : '序号',
				name : 'rowNum',
				width : 60
			}, {
				display : '路段宽度',
				name : 'roadWight',
				width : 90
//			}, {
//				display : '路段时长',
//				name : 'roadTime',
//				width : 120,
//				isSort : false
			}, {
				display : '最高速度',
				name : 'speedThreshold',
				width : 120,
				isSort : false
			}, {
				display : '超速持续时间',
				name : 'speedTimeThreshold',
				width : 120,
				isSort : false
			}, {
				display : '操作',
				width : 120,
				isAllowHide : false,
				render : function(row) {
					var html = '<a href="javascript:void(0);" onclick="classline_linePopMain.updateSpanLine(\'' + row.pid + '\')">编辑</a>&nbsp;'
						+'<a href="javascript:void(0);" onclick="classline_linePopMain.showSpanLine(\'' + row.rowNum + '\')">显示</a>&nbsp;';
					return html;
				}
			} ],
			width : '100%',
			pkName : 'id',
			pageSize : 5,
			usePager : true,
			dataType : 'local',
			dataAction : 'local',
			pageSizeOptions : [ 5, 10, 15, 20 ],
			height : 125,
			data : _thisref.cache.spanLineList.jsonObj,
			onSelectRow : function(rowdata, rowobj, index) {//单行点击时，对应地图上的线路显示
				classline_linePopMain.showSpanLine(rowdata.rowNum);
			}
		});
		var manager = $("#classline_spanLineTable").ligerGetGridManager();
		manager.loadData();
	},
	showSpanLine:function(_rowNum){//显示线段位置
		var _index=_rowNum-1;
		var thisref = this;
		//获取选中线段所包含的点
		var _tmpArray =new Array();
		
		var totalLineInfo=thisref.cache.lineToolFinal.getLinesById(thisref.cache.idx);
		var points=totalLineInfo.lines[_index].lnglats; 
		for(var i=0;i<points.length;i++){
			_tmpArray.push(new TMLngLat(points[i][0], points[i][1]));
		}
		//将所有点连接成线显示
		option = new TMLineOptions();
		option.lnglats = _tmpArray;
		
		//根据点数组创建一条折线
		var line = new TMLineOverlay(option);
		var yu=_index%3;
		switch(yu){
			case 0:line.setLineColor("green");break;
			case 1:line.setLineColor("blue");break;
			case 2:line.setLineColor("red");break;
		}
		line.setOpacity(0.8);
		line.setLineStroke(5);
		thisref.cache.lineMap.map.overlayManager.addOverLay(line);
		//线条在1.5秒后消失
		setTimeout(function(){
			thisref.cache.lineMap.map.overlayManager.removeOverLay(line);
		},1500);
	},
	/**
	 * 修改线路分段设置
	 * 
	 * @param _pid
	 * @param lon
	 * @param lat
	 */
	updateSpanLine : function(_pid) {
		var thisref = this;
		_thisPop = $("#classline_linePopMain");
		_thisPop.A_Window({
			// dragabId : 'classline_linePopMain',
			id:"spanlineSetPop",
			width : 420,
			height : 294,
			x : 405,
			y : 205,
			unMask : true,
			load_fn : function() {
				var _pop = $("#classline_spanLineSetPop");
				$("#classline_spanLineSetId").val(_pid);
				$(thisref.cache.spanLineList.jsonObj.Rows).each(function(i) {
					if (this.pid == _pid) {
						_pop.find(".pathInput:eq(0)").val(this.roadWight);
						_pop.find(".pathInput:eq(1)").val(this.roadTime);
						_pop.find(".pathInput:eq(2)").val(this.speedThreshold);
						_pop.find(".pathInput:eq(3)").val(this.speedTimeThreshold);
					}
				});
			},
			url : "model/classline/spanlineSet.html"
		});
		_thisPop.show_A_Window();
	},
	/**
	 * 设置更新线路数据
	 * 
	 * @param _lineId
	 */
	setUpdateLineData : function(_lineId) {
		var thisref = this;
		classline_linePopMain.actionTye = "update";
		classline_linePopMain.cache.lineUpdateId = _lineId;
		JAjax("operationmanagement/findTbClassLineById.action", {
			lineId : _lineId
		}, 'json', function(datas, erro) {
			var _tmp = datas,
				_pop = $("#classline_linePopMain"),
				_ar =[];
			// 线路基本信息
			_pop.find(".xiugaiinput:eq(0)").val(_tmp.lineName);// 线路名称
			_pop.find(".xiugaiinput:eq(1)").val(_tmp.lineCode);// 线路编码
			_pop.find(".xiugaiselect:eq(0) option[value='" + _tmp.lineTypeId + "']").attr("selected", "selected");// 线路类型
			_pop.find(".xiugaiselect:eq(1) option[value='" + _tmp.lineStatus + "']").attr("selected", "selected");// 线路运营状态
			_pop.find(".xiugaitextarea").val(_tmp.remark);// 备注
			$("#classline_startTime").val(utc2Date(_tmp.startTime));// 开始时间
			$("#classline_endTime").val(utc2Date(_tmp.endTime));// 结束时间
			classline_linePopMain.cache.usetype = _tmp.usetype;
			classline_linePopMain.cache.judgment = _tmp.judgment;
			classline_linePopMain.cache.belongToCrop=_tmp.belongToCrop;
			
			// 站点基本信息（线路点、关键点）stationType 1：关键点，2起始点或者拆分点，3：其他点
			//lines整合
			var lines=[];
			var index=0;
			var curLine={id:index+'',lnglats:[],nodeId:''};
			
			$(_tmp.tbStationList).each(function(i) {
				var tempPoint=[this.maplon/600000,this.maplat/600000];
				_ar.push(tempPoint[0]);
				_ar.push(tempPoint[1]);
				if(parseInt(this.stationType)==2){//2类型：起始点或者拆分点
					if(curLine.lnglats.length==0){//如果里面还没放点，则放入第一个点
						curLine.lnglats.push(tempPoint);
					}else{//如果之前已含有点，则说明当前点为结束点
						curLine.lnglats.push(tempPoint);//当前线路结束点放入
						//放入线中
						lines.push(curLine);//加入总线路中，完成本条线路数据
						index++;
						//新线路开始
						curLine={id:index+'',lnglats:[],nodeId:index+'node'};
						curLine.lnglats.push([this.maplon/600000,this.maplat/600000]);//当前线路结束点放入
					}
				}else{//3类型：普通点
					curLine.lnglats.push(tempPoint);
				}
			});
			
			// 路段信息
			$(_tmp.tbLinePropList).each(function(i){
				this.rowNum=i+1;//行号从1开始
				this.speedThreshold=this.speedThreshold/10;//最高速度speedThreshold编辑设置时，需除以10
				classline_linePopMain.cache.spanLineList.jsonObj.Rows.push(this);//保存线段信息
			});
			classline_linePopMain.cache.spanLineList.grid.setOptions({
				data : classline_linePopMain.cache.spanLineList.jsonObj//重新赋值线段grid的data属性
			});
			classline_linePopMain.cache.spanLineList.grid.loadData();//线段grid重新加载

			// 绑定车辆信息
			for ( var i = 0; i < _tmp.trLineVehicleList.length; i++) {
				classline_linePopMain.cache.bindVehicleNoList.jsonObj.Rows.push(_tmp.trLineVehicleList[i]);//所绑定车辆的基本信息
				classline_linePopMain.cache.bindVehicleNoList.vids += _tmp.trLineVehicleList[i].vid + ",";//记录绑定车辆的vids
			}
			var _vids = classline_linePopMain.cache.bindVehicleNoList.vids;
			classline_linePopMain.cache.bindVehicleNoList.vids = _vids.substring(0, _vids.length - 1);//去掉多余的逗号
			classline_linePopMain.cache.bindVehicleNoList.grid.setOptions({
				data : classline_linePopMain.cache.bindVehicleNoList.jsonObj
			}); // 设置车辆gird的data参数
			classline_linePopMain.cache.bindVehicleNoList.grid.loadData(); // 车辆grid重新加载
			
			if (_tmp.tbPlatAlarmProp) {//车辆绑定的属性
				classline_linePopMain.cache.bindVehicleNoList.isdownTerminal = _tmp.tbPlatAlarmProp.isdownTerminal;
				classline_linePopMain.cache.bindVehicleNoList.ispressing = _tmp.tbPlatAlarmProp.ispressing;
				classline_linePopMain.cache.bindVehicleNoList.isview = _tmp.tbPlatAlarmProp.isview;
				classline_linePopMain.cache.bindVehicleNoList.istts = _tmp.tbPlatAlarmProp.istts;
				classline_linePopMain.cache.bindVehicleNoList.isad = _tmp.tbPlatAlarmProp.isad;
				classline_linePopMain.cache.bindVehicleNoList.message = _tmp.tbPlatAlarmProp.message;
			}
			// 绘制线路(线、关键点)
			thisref.drawlineForUpdate(lines);//画线
			thisref.cache.lineMap.getBestMaps(_ar);//定位线路最佳视图位置
		});
	},
	/**
	 * 当为编辑时绘制线、拆分点
	 * @param lines
	 */
	drawlineForUpdate : function(lines) {
		var thisref=this;
		var option=new TMLineToolOptions();
	  	option.map=thisref.cache.lineMap.map;
	  	thisref.cache.lineToolFinal =new TMSplitTool(option);
	  	thisref.cache.lineToolFinal.setSplit(false);
		var totalLineInfo={idx:thisref.cache.idx,lines:lines};//线路信息
		thisref.cache.lineToolFinal.toDrawLines([totalLineInfo],false);//线路画线

	 	//为线路的起始点设置图标
		if(lines.length>0){
			//第一个点：起点
			var point=lines[0].lnglats[0];//第一条线的第一个点
			option = new TMMarkerOptions();
			option.lnglat = new TMLngLat( point[0] , point[1]);
			option.icon=new TMIcon(window._TM_map_saveImage_Url+"icon/qi.gif",[28,33]);
			thisref.cache.qiMarker= new TMMarkerOverlay( option );
			thisref.cache.lineMap.map.overlayManager.addOverLay(thisref.cache.qiMarker);
			//最后一个点：结束点
			var lastLine=lines[lines.length-1].lnglats;
			point=lastLine[lastLine.length-1];//最后一条线的最后一个点
			option = new TMMarkerOptions();
			option.lnglat = new TMLngLat( point[0] , point[1]);
			option.icon=new TMIcon(window._TM_map_saveImage_Url+"icon/zhong.gif",[28,33]);
			thisref.cache.zhongMarker= new TMMarkerOverlay( option );
			thisref.cache.lineMap.map.overlayManager.addOverLay(thisref.cache.zhongMarker);
		}
		thisref.cache.lineToolAll=[];
		thisref.cache.routeAll=[];
		thisref.cache.slngLat=null;
		
		//不再可以画线
		$("#btnDrawPolyline").parent().hide();
		$("#btnRouteLine").parent().hide();
		$("#btnSplitRoute").parent().show();
		$("#btnQuitSplitRoute").parent().hide();
		$("#btnOk").parent().hide();
		$("#btnClear").parent().show();
	},
	/**
	 * 加载绑定车辆列表
	 */
	loadBindVehiclesList : function() {
		var _columns = [ {
			display : '车牌号',
			name : 'vehicleNo',
			width : 150,
			type : 'int'
		}, {
			display : '所属企业',
			name : 'pentName',
			width : 300
		} ];
		if (classline.CLASSLINE_UnBind) {
			_columns.push({
				display : '操作',
				width : 120,
				isAllowHide : false,
				render : function(row) {
					var html = '<a href="javascript:void(0);" onclick="classline_linePopMain.delCacheBindVehicle(' + row.vid + ')">解除绑定</a>&nbsp;';
					return html;
				}
			});
		}
		this.cache.bindVehicleNoList.grid = $("#classline_bindVehiclesTable").ligerGrid({
			columns : _columns,
			width : '100%',
			pkName : 'id',
			pageSizeOptions : [ 5, 10, 15, 20 ],
			height : 125
		});
		this.cache.bindVehicleNoList.grid.setOptions({
			data : this.cache.bindVehicleNoList.jsonObj
		}); // 设置数据参数
		this.cache.bindVehicleNoList.grid.loadData(); // 加载数据
	},
	/**
	 * 删除缓存车辆绑定信息
	 * 
	 * @param _vid
	 */
	delCacheBindVehicle : function(_vid) {
		var thisref = this;
		$(thisref.cache.bindVehicleNoList.jsonObj.Rows).each(function(i) {
			if (this.vid == _vid) {
				thisref.cache.bindVehicleNoList.jsonObj.Rows.splice(i, 1);
			}
		});
		// vids重新赋值
		thisref.cache.bindVehicleNoList.vids = "";
		$(thisref.cache.bindVehicleNoList.jsonObj.Rows).each(function(i) {
			if (this.vid) {
				thisref.cache.bindVehicleNoList.vids += this.vid + ",";
			}
		});
		this.cache.bindVehicleNoList.grid.setOptions({
			data : this.cache.bindVehicleNoList.jsonObj
		});
		this.cache.bindVehicleNoList.grid.loadData();
	}

};
$(document).ready(function() {
	var _linePopMain = new linePopMain();
	window.classline_linePopMain = _linePopMain;
});