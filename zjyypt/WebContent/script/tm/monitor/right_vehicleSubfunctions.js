var countdownTimer = null;
//add by tangfeng start 添加视频厂商
//播放雅讯电视视频 add by tangfeng 2012-09-10
var videoCtrl,videoId, mobileId;
OnServerConnect =function	(){
	videoCtrl.SetVideoDescription( videoId, "视频:" + mobileId ) ;	
	videoCtrl.videoChannal0= true ;	
	videoCtrl.videoChannal1= true ;	
	videoCtrl.videoChannal2= true ;	
	videoCtrl.videoChannal3= true ;	
	videoCtrl.StartMediaMonitor(videoId,1);
};
//亿盟视频对象	
var viewCtrl;
//长江视频对象
var videoCJctrl;  
//播放贝尔视频 add by tangfeng 2012-10-30
var videoBEctrl,dvrID,VideoBE_i=0,oemcodeBE;
playVideoOne=function (s){
    if (s == "0#CMS登录成功" && VideoBE_i==1) {
    	videoBEctrl.RequestVideoOneClick(dvrID, "1","4", oemcodeBE, "SUB"); 
        VideoBE_i++;
    }
};
//add by tangfeng  end 添加视频厂商

var speedCurveData=null;//速度曲线:grid所需数据
var speedCurveXmlData=null;//速度曲线:chart所需xml数据

/**
 * @author fanxuean
 * @prameter o
 * o = { functionType : "" 子功能类型 appendToDiv : "" 挂到哪个层上 miniPopwindow : "" 迷你窗口层 dragableDiv : ""
 * 可以在哪个层上拖拽 popwindowId : "" 弹出窗id vehicle : {} 带过来的车辆属性 selectableFuns : []
 * 所有可选择的菜单 }
 */
var VehicleSubfunctions = function (o)
{
	this.options = {};
	this.popwindow = null;
	this.miniPopwindow = null;
	this.subContentDivs = {};
	this.mainFrameHtml = "model/monitor/vehicle_popwindows/vehicle_popwindowFrame.html";
	this.subLoadHtmls = {
		detailButton : "model/monitor/vehicle_popwindows/vehicleDetail.html",
		pathButton : "model/monitor/vehicle_popwindows/path.html",
		scheduleButton : "model/monitor/vehicle_popwindows/schedule.html",
		photoButton : "model/monitor/vehicle_popwindows/photo.html",
		cameraButton : "model/monitor/vehicle_popwindows/camera.html",
		searchAroundButton : "model/monitor/vehicle_popwindows/searchAround.html",
		normalMonitorButton : "model/monitor/vehicle_popwindows/normalMonitor.html",
		stressMonitorButton : "model/monitor/vehicle_popwindows/stressMonitor.html"
	};
	this.poplayer = {
		position : "absolute",
		width : 750,
		height : 'auto',
		left : 500,
		top : 120,
		zIndex : 3800
	};
	
	this.pathReplayHandler = null;
	this.searchAroundHandler = null;
	this.stressMonitorHandler = null;
	this.curTab = null;
	this.init(o);
};

VehicleSubfunctions.prototype = {
	loadParams : function (o)
	{
		if (o)
		{
			this.options = o;
			return true;
		} else {
			return false;
		}
	},
	init : function (o)
	{
		var loaded = this.loadParams(o);
		if (loaded)
		{
//			var popwin = $('<div>');
//			popwin.attr('id', this.options.popwindowId);
//			popwin.addClass("trend");
//			popwin.css({
//				"position" : this.poplayer.position,
//				"width" : this.poplayer.width,
//				"height" : this.poplayer.height,
//				"left" : this.poplayer.left,
//				"top" : this.poplayer.top,
//				"z-index" : this.poplayer.zIndex
//
//			});
//			$(popwin).appendTo(this.options.appendToDiv);
//			this.popwindow = popwin;
//			this.popwindow.draggable({
//				cursor : 'move',
//				containment : this.options.dragableDiv
//			});
			this.popwindow = this.options.appendToDiv;
			this.popwindow.show();
			this.miniPopwindow = this.options.miniPopwindow;
			this.loading();
		}
	},
	transButtonToTab : function (buttonType)
	{
		var tabOption = "";
		if (buttonType == "detailButton") {
			tabOption = '<li class="vehicle_details_function_1" actionType="' + buttonType + '">'
                	  +	'<a href="javascript:void(0);" title="车辆详情" onfocus="javascript:this.blur();">&nbsp;</a>'
                	  + '</li>';
		}else if(buttonType == "pathButton") {
			tabOption = '<li class="vehicle_details_function_2" actionType="' + buttonType + '">'
		          	  +	'<a href="javascript:void(0);" title="轨迹回放" onfocus="javascript:this.blur();">&nbsp;</a>'
		          	  + '</li>';
		}else if (buttonType == "photoButton") {
			tabOption = '<li class="vehicle_details_function_3" actionType="' + buttonType + '">'
		          	  +	'<a href="javascript:void(0);" title="拍照" onfocus="javascript:this.blur();">&nbsp;</a>'
		          	  + '</li>';
		}else if (buttonType == "cameraButton") {
			tabOption = '<li class="vehicle_details_function_4" actionType="' + buttonType + '">'
		          	  +	'<a href="javascript:void(0);" title="视频" onfocus="javascript:this.blur();">&nbsp;</a>'
		          	  + '</li>';
		}else if (buttonType == "searchAroundButton") {
			tabOption = '<li class="vehicle_details_function_5" actionType="' + buttonType + '">'
		          	  +	'<a href="javascript:void(0);" title="周边设施" onfocus="javascript:this.blur();">&nbsp;</a>'
		          	  + '</li>';
		}else if (buttonType == "stressMonitorButton") {
			tabOption = '<li class="vehicle_details_function_6" actionType="' + buttonType + '">'
		          	  +	'<a href="javascript:void(0);" title="跟踪" onfocus="javascript:this.blur();">&nbsp;</a>'
		          	  + '</li>';
		}else if (buttonType == "normalMonitorButton") {
			tabOption = '<li class="vehicle_details_function_7" actionType="' + buttonType + '">'
		          	  +	'<a href="javascript:void(0);" title="监听" onfocus="javascript:this.blur();">&nbsp;</a>'
		          	  + '</li>';
		}else if (buttonType == "scheduleButton") {
			tabOption = '<li class="vehicle_details_function_8" actionType="' + buttonType + '">'
		          	  +	'<a href="javascript:void(0);" title="调度" onfocus="javascript:this.blur();">&nbsp;</a>'
		          	  + '</li>';
		}
		return tabOption;
	},
	loading : function ()
	{
		var that = this, selectableOptions = [];
		$(this.options.selectableFuns).each(function (i)
		{
			selectableOptions.push(that.transButtonToTab(this));
		});
		this.popwindow.load(this.mainFrameHtml, {}, function ()
		{
			that.popwindow
			.find("div.vehicle_details_cp").html(that.options.vehicle.vehicleno).end()
			.find("div.vehicle_details_function > ul").append(selectableOptions.join("")).end()
			.find("div.vehicle_details_hidden").click(function ()
			{
				JAjax('monitor/destroyEventPositionsCache.action', null, 'json', function (data, err)
				{

				});
				that.closeWindow(true);
			});
			that.bindTabAction();
			that.changeTabs(that.options.functionType);
			that.popwindow
			.find("div.vehicle_details_function > ul > li[actionType=" + that.options.functionType + "]").trigger("click");

			that.miniPopwindow
			.find("div.vehicle_details_cp").html(that.options.vehicle.vehicleno).end()
			.find("div.vehicle_details_back").click(function(){
				that.miniPopwindow.hide();
				that.popwindow.show();
			}).end()
			.find("div.vehicle_details_close").click(function(){
				that.miniPopwindow.hide();
				that.closeWindow(false);
				this.curTab = "";
				vehicleSubfunctionObjId = "";
				if(videoCtrl!=null && videoId!=null  )//add by tangfeng 关闭雅讯视频
					videoCtrl.CloseVideo( videoId ) ;
				if(videoCJctrl!=null   )//add by tangfeng 关闭长江视频
				{					
					videoCJctrl = document.getElementById("VideoCJ1");
					videoCJctrl.EndVideo();
					videoCJctrl = document.getElementById("VideoCJ2");
					videoCJctrl.EndVideo();
					videoCJctrl = document.getElementById("VideoCJ3");
					videoCJctrl.EndVideo();
					videoCJctrl = document.getElementById("VideoCJ4");
					videoCJctrl.EndVideo();
					videoCJctrl=null;
				}
				if(null!=videoBEctrl)//add by tangfeng 关闭贝尔视频
				{
					videoBEctrl.CloseAllVideo();
					videoBEctrl.LogoutServer();
				}
				that.popwindow.html(""); //add by tangfeng 解决关闭后出现黑屏现象
			}).end();
			if(videoCtrl!=null && videoId!=null  )//add by tangfeng 关闭雅讯视频
				videoCtrl.CloseVideo( videoId ) ;
			if(videoCJctrl!=null   )//add by tangfeng 关闭长江视频
			{
				videoCJctrl = document.getElementById("VideoCJ1");
				videoCJctrl.EndVideo();
				videoCJctrl = document.getElementById("VideoCJ2");
				videoCJctrl.EndVideo();
				videoCJctrl = document.getElementById("VideoCJ3");
				videoCJctrl.EndVideo();
				videoCJctrl = document.getElementById("VideoCJ4");
				videoCJctrl.EndVideo();
				videoCJctrl=null;
			}
			if(null!=videoBEctrl)//add by tangfeng 关闭贝尔视频
			{
				videoBEctrl.CloseAllVideo();
				videoBEctrl.LogoutServer();
			}
		});
	},
	isInMiniStatus : function(){
		if(this.miniPopwindow.css("display") != "none")
			return true;
		else
			return false;
	},
	isInBigStatus : function(){
		if(this.popwindow.css("display") != "none")
			return true;
		else
			return false;
	},
	hideOtherTabs : function ()
	{
		$(this.popwindow.find("div.vehicle_pop_content_sub")).each(function ()
		{
			if ($(this).length) {
				$(this).hide();
			}
		});
	},
	bindTabAction: function(){
		var that = this,
		tabLis = this.popwindow.find("div.vehicle_details_function > ul > li"),
		tabDivs = this.popwindow.find("div.vehicle_pop_content_sub");
		tabLis.bind({
			click:function(){
				that.changeTabs($(this).attr("actionType"));
				$(tabLis).each(function(){
					$(this).removeAttr("selected");
					$(this).find("a").css({
						"background-position-x": "0",
						"background-position-y": "0"
					});
				});
				$(this).attr("selected",true);
				$(this).find("a").css({
					"background-position-x": "0",
					"background-position-y": "-120"
				});
			},
			mouseenter:function(){
					$(this).find("a").css({
						"background-position-x": "0",
						"background-position-y": "-40"
					});
			},
			mouseleave:function(){
				var _x,_y;
				if($(this).attr("selected")){
					_x="0px";_y="-120px";
				}else{
					_x=$(this).css("background-position-x");
					_y=$(this).css("background-position-y");
				}
				$(this).find("a").css({
					"background-position-x": _x,
					"background-position-y": _y
				});
			}
		});
	},
	changeTabs : function(functionType)
	{
		var that = this;
		this.hideOtherTabs();
		this.curTab = functionType;
		if (this.subContentDivs[functionType])
		{
			this.subContentDivs[functionType].show();
			return false;
		}
		var subContent = $('<div>');
		subContent.addClass("vehicle_pop_content_sub " + functionType + "Div");
		$(subContent).appendTo(this.popwindow.find("div.vehicle_pop_content"));
		this.subContentDivs[functionType] = subContent;
		this.loadSubContent(functionType);
	},
	loadSubContent : function(functionType)
	{
		var that = this, subDiv = this.subContentDivs[functionType];
		subDiv.load(this.subLoadHtmls[functionType], {}, function()
		{
			if(functionType == "detailButton")
			{
				var detailConfig = {
					container : subDiv,
					vid : that.options.popwindowId,
					vehicle : that.options.vehicle
				};
				setTimeout(function(){
					new Detailhandler(detailConfig);
				},200);
			}
			else if (functionType == "pathButton")
			{
				var pathReplayConfig = {
					mapContainer : "pathReplayMap",
					container : subDiv,
					vid : that.options.popwindowId,
					vno : that.options.vehicle.vehicleno
				};
				setTimeout(function(){
					that.pathReplayHandler = new PathReplay(pathReplayConfig);
				},200);
			} 
			else if (functionType == "scheduleButton")
			{
				var scheduleConfig = {
					mapContainer : "scheduleMap",
					container : subDiv,
					vid : that.options.popwindowId,
					vehicle : that.options.vehicle
				};
				setTimeout(function(){
					new ScheduleHandler(scheduleConfig);
				},200);
			} 
			else if (functionType == "photoButton")
			{
				var photoConfig = {
					container : subDiv,
					dragContainer : that.popwindow,
					dragableDiv : that.options.dragableDiv,
					vid : that.options.popwindowId,
					vno : that.options.vehicle.vehicleno
				};
				setTimeout(function(){
					new PhotoHandler(photoConfig);
				},200);
			} 
			else if (functionType == "cameraButton")
			{
				
				//modify by tangfeng 2012-09-10 start 添加视频厂商
				var cameraConfig = {
					container : subDiv,
					vid : that.options.popwindowId,
					vno : that.options.vehicle.vehicleno,
					commaddr:that.options.vehicle.commaddr,
					oemcode:that.options.vehicle.oemcode
				};
				setTimeout(function(){
					new CameraHandler(cameraConfig);
				},200);
			} 
			else if (functionType == "searchAroundButton")
			{
				var searchAroundConfig = {
					mapContainer : "searchAroundMap",
					container : subDiv,
					vid : that.options.popwindowId,
					vehicle : that.options.vehicle,
					map : that.options.cMap
				};
				setTimeout(function(){
					that.searchAroundHandler = new SearchAroundHandler(searchAroundConfig);
				},200);
			} 
			else if (functionType == "normalMonitorButton")
			{
				var normalMonitorConfig = {
					mapContainer : "normalMonitorMap",
					container : subDiv,
					vid : that.options.popwindowId,
					vehicle : that.options.vehicle
				};
				setTimeout(function(){
					new NormalMonitorHandler(normalMonitorConfig);
				},200);
			} 
			else if (functionType == "stressMonitorButton")
			{
				var stressMonitorConfig = {
					mapContainer : "stressMonitorMap",
					container : subDiv,
					dragContainer : that.popwindow,
					dragableDiv : that.options.dragableDiv,
					vid : that.options.popwindowId,
					vehicle : that.options.vehicle
				};
				setTimeout(function(){
					this.stressMonitorHandler = new StressMonitorHandler(stressMonitorConfig);
				},200);
			}
		});
	},

	closeWindow : function(isHide)
	{
//		if (this.curTab == "cameraButton")
//			$(this.subContentDivs["cameraButton"]).find("object").each(function()
//			{
//				if ($(this).hasClass("haikang"))
//					$(this).remove();
//			});
//		this.popwindow.html("");
		
		if(isHide){
			if(this.isInBigStatus())
				this.miniPopwindow.show();
		}else{
			this.miniPopwindow.hide();
			if(this.pathReplayHandler)
				this.pathReplayHandler.clear();
			if(this.searchAroundHandler)
				this.searchAroundHandler.clear();
			if(this.stressMonitorHandler)
				this.stressMonitorHandler.clear();
		}
		this.popwindow.hide();
//		vehicleSubfunctionObjId = "";
	}
};

//车辆详情
function Detailhandler(params){
	//debugger;
	var that = this;
	this.params = params;
	
	var tabLis = $(params.container).find("div.vehicle_details_main_1_list > ul > li"),
		contentDivs = $(params.container).find("div.vehicle_details_main_1_list_text");
	tabLis.click(function(){
		if($(this).hasClass("vehicle_details_main_1_tab_selected")){
			return false;
		}else{
			tabLis.each(function(i){
				$(this).attr("class","vehicle_details_main_1_tab");
			});
			$(this).attr("class","vehicle_details_main_1_tab_selected");
			tabLis.each(function(i){
				if($(this).hasClass("vehicle_details_main_1_tab_selected")){
					$(contentDivs[i]).removeClass("hidden");
				}else{
					$(contentDivs[i]).addClass("hidden");
				}
			});
		}
	});
	
	$(params.container).find("div.vehicle_details_main_1_information_box")
		.find("label:eq(0)").text(params.vehicle.vehicleno + " " + tocolor(params.vehicle.plateColorId)).end()
		.find("label:eq(1)").text(utc2Date(params.vehicle.utc)).end()
		.find("label:eq(2)").text((params.vehicle.isonline == "1" ? "在线" : "离线") + " " + (params.vehicle.lastBaseStatusMap.K512_3_4==undefined?'未定位':params.vehicle.lastBaseStatusMap.K512_3_4)).end()
		.find("label:eq(3)").text(params.vehicle.speed / 10).end()
		.find("label:eq(4)").text(null2blank(params.vehicle.cname)).end()//驾驶员
		.find("label:eq(5)").text(getAlarmTypeDesc(params.vehicle.alarmcode)).end()//当前告警描述
//		.find("label:eq(6)").text(utc2Date(params.vehicle.alarmstartutc)).end()//当前告警时间
		.find("label:eq(7)").text(params.vehicle.corpName).end()//所属组织
//		.find("label:eq(8)").text(params.vehicle.vehicleno).end()//线路名称
		.find("label:eq(9)").text(params.vehicle.isonline == "1" ? "当前位置：" : "最后位置：").end();//当前位置
	findClassLineByVid(params.vehicle.vid, $(params.container).find("div.vehicle_details_main_1_information_box").find("label:eq(8)"));
	findAddressByLngLat(params.vehicle.vid, {
		mapLon : params.vehicle.maplon/600000,
		mapLat : params.vehicle.maplat/600000
	}, $(params.container).find("div.vehicle_details_main_1_information_box").find("label:eq(10)"));
	
	if(params.vehicle.corpName && params.vehicle.corpName.length>15){//组织名称过长则省略，加title
		$(params.container).find("div.vehicle_details_main_1_information_box").find("label:eq(7)")
		.text(params.vehicle.corpName.substr(0,15)+"...").attr("title",params.vehicle.corpName);
	}
	//驾驶员信息
	JAjax("monitor/findEmployeeByVid.action", {"requestParam.equal.vid": params.vid}, 'json', 
			function(data, err)
			{
				if (data && data.error)
				{
					//$.ligerDialog.alert(data.error[0].errorMessage);
				} else if (data && !(data instanceof Array))
				{
					that.addDriverInfoList(data);
				}
			}, function(data, err)
			{
				//$.ligerDialog.alert("查询轨迹出错");
			},null,null,10000

	);
	this.addDriverInfoList = function(driver){
		$(contentDivs[0])
		            .find("label:eq(0)").text(driver.staffName).end()//姓名
		            .find("label:eq(1)").text(driver.sex == "1" ? "男性" : "女性").end()//性别
		            .find("label:eq(2)").text(driver.mobilephone).end()//手机
		            .find("label:eq(3)").text(driver.cardId).end()//身份证号
		            .find("label:eq(4)").text(params.vehicle.vehicleno).end()//车牌号
		            .find("label:eq(5)").text("").end()//档案号		    
		            .find("label:eq(6)").text(driver.bussinessId).end()//从业资格证号
		            .find("label:eq(7)").text(driver.drivercardDep).end()//驾驶证核发机关
					.find("label:eq(8)").text(driver.address).end();//联系地址
	};
	
	//组织信息
	JAjax("monitor/findCorpByVid.action", {"requestParam.equal.entId": params.vehicle.corpId}, 'json', 
			function(data, err)
			{
				if (data && data.error)
				{
					//$.ligerDialog.alert(data.error[0].errorMessage);
				} else if (data && !(data instanceof Array))
				{
					that.addCorpInfoList(data);
				}
			}, function(data, err)
			{
				//$.ligerDialog.alert("查询轨迹出错");
			},null,null,10000

	);
	this.addCorpInfoList = function(corp){
		$(contentDivs[1])
		            .find("label:eq(0)").text(corp.corpCode).end()//企业编码
		            .find("label:eq(1)").text(corp.entName).end()//企业名称
		            .find("label:eq(2)").text(corp.entType == "1" ? "企业" : "车队").end()//企业类型
		            .find("label:eq(3)").text(corp.orgShortname).end()//企业简称
		            .find("label:eq(4)").text(corp.corpProvince).end()//所属省
		            .find("label:eq(5)").text(corp.corpCity).end()//所属市
//		            .find("label:eq(7)").text(corp.corpQuale).end()//企业性质
		            .find("label:eq(6)").text(corp.corpLevel).end()//企业级别
		            .find("label:eq(8)").text(corp.orgCmail).end()//email
		            .find("label:eq(9)").text(corp.url).end()//网址
		            .find("label:eq(10)").text(corp.orgCname).end()//联系人
		            .find("label:eq(11)").text(corp.orgCphone).end()//联系电话
		            .find("label:eq(12)").text(corp.orgCfax).end()//传真
		            .find("label:eq(13)").text(corp.orgCzip).end()//邮编
		            .find("label:eq(14)").text(corp.orgAddress).end()//企业地址
		            .find("label:eq(15)").text(corp.orgMem).end();//企业简介
	};
	
	//线路信息
	JAjax("monitor/findLineByVid.action", {"requestParam.equal.vid": params.vid}, 'json', 
			function(data, err)
			{
				if (data && data.error)
				{
					//$.ligerDialog.alert(data.error[0].errorMessage);
				} else if (data && !(data instanceof Array))
				{
					that.addLineInfoList(data);
				}
			}, function(data, err)
			{
				//$.ligerDialog.alert("查询轨迹出错");
			},null,null,10000

	);
	this.addLineInfoList = function(line){
		$(contentDivs[2])
		            .find("label:eq(0)").text(line.lineName).end()//线路名称
		            .find("label:eq(1)").text(line.lineCode).end()//线路编码
		            .find("label:eq(2)").text(line.lineTypeId).end()//线路类型
		            .find("label:eq(3)").text(line.entName).end();//所属企业
	};
	
	//终端信息
	JAjax("monitor/getTerminalInfo.action", {"requestParam.equal.vid": params.vid}, 'json', 
			function(data, err)
			{
				if (data && data.error)
				{
					//$.ligerDialog.alert(data.error[0].errorMessage);
				} else if (data && !(data instanceof Array))
				{
					that.addTerminalInfoList(data);
				}
			}, function(data, err)
			{
				//$.ligerDialog.alert("查询终端信息出错");
			},null,null,10000

	);
	this.addTerminalInfoList = function(t){

		if(t!=null){
		$(contentDivs[3])
		            .find("label:eq(0)").text(null2blank(t.tmac)).end()//终端号
		            .find("label:eq(1)").text(null2blank( KCPT.CodeManager.getNameByCode("SYS_TERMINAL_MODEL", t.tmodelCode))).end()//终端型号
		            .find("label:eq(2)").text(null2blank( KCPT.CodeManager.getNameByCode("SYS_TERMINAL_OEM", t.oemCode))).end()//终端厂家
		            .find("label:eq(3)").text(null2blank(t.tprotocolName)).end()//通讯协议
		            .find("label:eq(4)").text(null2blank(t.terSoftver)).end()//软件版本
		            .find("label:eq(5)").text(null2blank(t.terHardver)).end()//硬件版本
		            .find("label:eq(6)").text(null2blank(t.deviceName)).end()//视频设备号
		            .find("label:eq(7)").text(null2blank(t.vidioOemCode == "1" ? "江苏威森" : (t.vidioOemCode == "2" ? "杭州海康" : (t.vidioOemCode == "3" ? "中科电" : "")))).end()//视频设备厂商
					.find("label:eq(8)").text(null2blank(t.configId)).end();//终端配置方案
		}else
		{
			return false;
		}
			
	};
};

var firstPointMiles = 0;//起始点里程数

// 轨迹回放
function PathReplay(params)
{
	var that = this;
	this.params = params;
	this.pathPoints = [];
	this.eventPointIdsCache = [];
	this.pathReplayTimer = null;
	this.pathReplayDelayTime = 601;
	this.pathReplayCount = -1;
	this.replayStep = 0;
	this.replaySpeedStep = 10;
	this.cMap = new CTFO_MAP(params.mapContainer);
	this.cMap.setCenter(116.29376, 39.95776);
	this.cMap.setLevel(4);
	this.cMap.addMapControl(1);
	this.cMap.changeSize();
	this.checkedAlarmRecords = [];
	this.playStatus = false;
	var tracingPoint = 0;//记录轨迹点实际总数
	
	var exceptionFlag = false;//里程数异常标识
	
	this.pointBefore = [0, 0];//缓存轨迹播放时前面一个点的坐标
	
	this.pathGrid = null;

	this.vehicleAddress = "";
	
	/* add by tangfeng 2012-08-30  start 添加轨迹位置信息*/
	this.pathFindAddressTimes=20;//20个点查一次地址信息
	this.pathFindAddressTimesAdd=0;//轨迹点累加
	this.label5="";//位置信息变量 
	/* add by tangfeng 2012-08-30  end 添加轨迹位置信息*/
	var curDate = dateFormat(new Date(), "yyyy-MM-dd hh:mm");
	var preCurDate = dateFormat((new Date((new Date()).getTime() - 86400000)), "yyyy-MM-dd hh:mm");
	
	$("#pathSlider").slider({
		range : "min",
		value : 0,
		min : 0,
		max : 255,
		disabled: true,
		slide : function(event, ui)
		{
			that.pathReplayCount = ui.value;
		}
	});
	$("#pathSlider").height(10);
	$(params.container)
		.find("input[name='pathStartTime']").val(preCurDate).end()
		.find("input[name='pathEndTime']").val(curDate).end()
		.find("div.udShrinkForPath > img:eq(0)").click(function(){
			$(params.container).find("div.pathEventsDivOuter").css("top", "234px").find("div.pathEventsDiv").removeClass("hidden");
		}).end()
		.find("div.udShrinkForPath > img:eq(1)").click(function(){
			$(params.container).find("div.pathEventsDivOuter").css("top", "354px").find("div.pathEventsDiv").addClass("hidden");
		}).end()
		.find("select[name=preDays]").change(function(){
			var t = parseInt($(this).val());
			var curDate = dateFormat(new Date(), "yyyy-MM-dd hh:mm");
			var preCurDate = dateFormat((new Date((new Date()).getTime() - 86400000 * t)), "yyyy-MM-dd hh:mm");
			
			$(params.container)
				.find("input[name='pathStartTime']").val(preCurDate).end()
				.find("input[name='pathEndTime']").val(curDate);
		}).end()
		.find("div.queryPath").click(function()
				{// 查询轨迹
			var startTime = $(that.params.container).find("input[name='pathStartTime']").val(), 
			endTime = $(that.params.container).find("input[name='pathEndTime']").val();
			//			alertMessage = $(that.params.container).find("h2.alertMessageForPathQuery");
			if(startTime == "开始时间" || endTime == "结束时间"){
				$.ligerDialog.alert("请输入起止时间", "提示", "error");
				return false;
			}
			if (daysBetween(startTime, endTime) > 3)
			{
				//			alertMessage.text("时间间隔不能超过24小时");
				$.ligerDialog.alert("时间间隔不能超过3天", "提示", "error");
				return false;
			}
			//		alertMessage.text("");
			that.queryParam = {
					startTime : startTime,
					endTime : endTime,
					queryType : "path"
			};
			that.clear();
			$(this).attr("disabled", true);
			that.queryPathAndEvents();
			that.pathReplayDelayTime = 600;
				}).end()
		.find("div.exportExcelPath").click(function()
		{// 导出轨迹
			//添加权限验证  update by WangMeng
			if(!checkFunction("FG_MEMU_MONITOR_LOCUS_EXPORT")){
				$.ligerDialog.error("您没有该操作权限！", "提示");
				return;
			}
			var startTime = $(that.params.container).find("input[name='pathStartTime']").val(), 
				endTime = $(that.params.container).find("input[name='pathEndTime']").val();
			if(startTime == "开始时间" || endTime == "结束时间"){
				$.ligerDialog.error("请输入起止时间", "提示");
				return false;
			}
			if (daysBetween(startTime, endTime) > 3)
			{
				$.ligerDialog.error("时间间隔不能超过3天", "提示");
				return false;
			}
			that.queryParam = {
				startTime : startTime,
				endTime : endTime,
				queryType : "path"
			};
			//$(this).attr("disabled", true);
			that.exportPathAndEvents();
		}).end()
		
		.find("#btnSpeedCurve").click(function()
		{// 速度曲线
			//添加权限验证  update by WangMeng
			if(!checkFunction("FG_MEMU_MONITOR_LOCUS_SPEEDLINE")){
				$.ligerDialog.alert("您没有该操作权限！", "提示", "error");
				return;
			}			
			if(tracingPoint>30000){
				alert("请缩小查询范围查询后，再进行导出操作。");
				return;
			}else
			if(tracingPoint==0){
				alert("没有轨迹数据，请按时间段查询后再试。");
				return;
			}
			$("#mainWorkArea").A_Window({
				dragabId : 'mainWorkArea', // 可拖动的范围
				id : 'speedCurveChart',
				width : 800, // 宽度
				height : 500,// 高度
				load_fn : function() {
					$("#closeSpeedCurveChartCustomColumnDiv").click(function() {
						$("#mainWorkArea").close_A_Window({id:'speedCurveChart'});
					});
				},
				url : 'model/monitor/vehicle_popwindows/speedCurveChart.jsp'
			});
		}).end();
	/**start*******轨迹播放逻辑代码*/
	that.curspeed = 1;
	var tempPlayBtn = $(params.container).find("div.pathStatistics table.pathReplayAction a");
	//播放或暂停按钮点击事件
	tempPlayBtn.eq(0).click(function(){
		if($(this).hasClass("startReplay") || $(this).hasClass("startReplayGray")) {// 播放
			if(that.pathReplayStart()){
				$(this).attr("class", "pauseReplay");
				$(this).find("img").attr("src","images/vehicle_popwindows/newPathReplay/pauseGray.png");
			}
		}else if($(this).hasClass("pauseReplay") || $(this).hasClass("pauseReplayGray")) {// 暂停
			$(this).attr("class", "startReplay");
			that.pathReplayPause();
			$(this).find("img").attr("src","images/vehicle_popwindows/newPathReplay/playGray.png");
			
			var vehicleInfos = that.pathPoints[that.pathReplayCount];
			var p = vehicleInfos.split("|");
			var lnglat = {
				mapLon : (p[0] / 600000),
				mapLat : (p[1] / 600000)
			};
			var locationObj = that.params.container.find("div.pathInfo div:eq(0)");
			findAddressByLngLat(that.params.vid, lnglat, locationObj);
		}
	});
	//停止按钮点击事件
	tempPlayBtn.eq(1).click(function(){// 停止
		that.stopPath();
	}).hover(//鼠标是否选中效果
		function(){
			$(this).attr("class", "stopReplay");
		},
		function(){
			$(this).attr("class", "stopReplayGray");
		}
	);
	//减速按钮点击事件
	tempPlayBtn.eq(2).hover(//鼠标是否选中效果
		function(){
			$(this).attr("class", "slowDown");
		},
		function(){
			$(this).attr("class", "slowDownGray");
		}
	).click(function()// 减速
	{
		if(that.curspeed == 1){
			return false;
		}else if(that.curspeed == 5){
			step = 1;
			that.curspeed = 1;
		}else if(that.curspeed == 10){
			step = 5;
			that.curspeed = 5;
		}else if(that.curspeed == 20){
			step = 10;
			that.curspeed = 10;
		}else if(that.curspeed == 50){
			step = 20;
			that.curspeed = 20;
		}
		that.toggleFunction({speed: that.curspeed, step: step});
	});
	//加速按钮点击事件
	tempPlayBtn.eq(3).hover(//鼠标是否选中效果
		function(){
			$(this).attr("class", "hurryUp");
		},
		function(){
			$(this).attr("class", "hurryUpGray");
		}
	).click(function(){// 加速
		if(that.curspeed == 1){
			step = 5;
			that.curspeed = 5;
		}else if(that.curspeed == 5){
			step = 10;
			that.curspeed = 10;
		}else if(that.curspeed == 10){
			step = 20;
			that.curspeed = 20;
		}else if(that.curspeed == 20){
			step = 50;
			that.curspeed = 50;
		}else if(that.curspeed == 50){
			return false;
		}
		that.toggleFunction({speed: that.curspeed, step: step});
	});
	this.toggleFunction = function(p){
		if (that.playStatus)
		{
			that.curspeed = p.speed;
			that.pathReplayDelayTime = 600;
			that.params.container
				.find("div.pathStatistics table.pathReplayAction img.replaySpeed")
					.attr("src", "images/vehicle_popwindows/newPathReplay/speed_"+p.speed+".png");
			if(that.pathReplayTimer){
				clearInterval(that.pathReplayTimer);
				that.startPathReplayTimer(p.step);
			}
		}
	};
	
	this.pathReplayStart = function()
	{
		if (!this.pathPoints || this.pathPoints.length <= 1)
		{
			$.ligerDialog.alert("没有数据可播放");
			$(that.params.container).find("div.pathStatistics table.pathReplayAction a:eq(0)").attr("class", "startReplay");
			this.playStatus = false;
			return false;
		}
		//add by tangfeng 2012-08-30   添加轨迹位置信息
		if (this.pathPoints.length <= 50)
		{
			that.pathFindAddressTimes=1;
		}
		this.playStatus = true;
		$("#pathSlider").slider({ disabled: false });
		this.startPathReplayTimer(1);
		return true;
	};
	this.startPathReplayTimer = function(step){
		var that = this;
		var len = that.pathPoints.length - 1;
		this.pathReplayTimer = setInterval(function()
		{
			if (that.pathReplayCount < len)
			{
				that.pathReplayCount = that.pathReplayCount + step;
				$("#pathSlider").slider(
						"value", that.pathReplayCount
					);
					if(that.pathReplayCount > len)
						that.pathReplayCount = len;
					that.pathFindAddressTimesAdd++;/* add by tangfeng 2012-08-30   添加轨迹位置信息*/
					that.addOrMoveMarker(that.pathReplayCount);
					that.showMarkerInfos(that.pathReplayCount);
					that.showMarkerMiles(that.pathReplayCount);//不断循环更新里程数
			} else
			{
				that.stopPath();
			}
		}, that.pathReplayDelayTime);
	};
	this.stopPath = function(){
		that.pathReplayDelayTime = 600;
		that.cMap.removePointMarker("pathMoveMarker");
		that.params.container
		.find("div.pathStatistics table.pathReplayAction img.replaySpeed").attr("src", "images/vehicle_popwindows/newPathReplay/speed_1.png").end()
		.find("div.pathStatistics table.pathReplayAction a:eq(0)").attr("class", "startReplayGray").end()
		.find("div.pathInfo label").text("");
		
		that.pathReplayPause();
		that.pathReplayCount = -1;
		that.curspeed = 1;
		$("#pathSlider").slider("value", 0);
		$("#pathSlider").slider({ disabled: true });
		tempPlayBtn.eq(0).attr("class", "startReplay");
		tempPlayBtn.eq(0).find("img").attr("src","images/vehicle_popwindows/newPathReplay/playGray.png");
	};
	/**end*******轨迹播放逻辑代码*/
	
	this.f_isChecked = function(alarmId)
	{
		if (that.findCheckedCustomer(alarmId) == -1)
			return false;
		return true;
	};
	this.findCheckedCustomer = function(alarmId)
	{
		for ( var i = 0; i < that.checkedAlarmRecords.length; i++)
		{
			if (that.checkedAlarmRecords[i] == alarmId)
				return i;
		}
		return -1;
	};

	this.showMarkerMiles = function(count){
		var vehicleInfos = that.pathPoints[count];
		var p = vehicleInfos.split("|");
		var miles = 0;
//		alert(firstPointMiles+"========parseInt(p[7]>>"+p[7]);
		
		if(exceptionFlag==false){
			if(p[7]){
				if(parseInt(p[7])<firstPointMiles){
					exceptionFlag = true;//标识异常
					that.params.container.find("div.pathStatistics label.pathCountsMiles").text("异常");
				}else{
					miles = (parseInt(p[7]) - firstPointMiles)/10;	
				}
			}
			if(miles > 0)
				that.params.container.find("div.pathStatistics label.pathCountsMiles").text(miles.toFixed(2));
		}else{
			that.params.container.find("div.pathStatistics label.pathCountsMiles").text("异常");
		}
	};
	this.showMarkerInfos = function(count)
	{
		var vehicleInfos = that.pathPoints[count];
		var p = vehicleInfos.split("|");
		var speed = "--";
		if(p[3] && p[3] > 0){
			speed = ((p[3] ? p[3] : 0) / 10) + "";
			if(speed.indexOf(".") > 0)
				speed = speed.substring(0, speed.indexOf(".") + 3) + "公里/小时";
			else
				speed += "公里/小时";
		}
		var engineRotateSpeed = "--";
		if(p[6] && p[6] > 0){
			engineRotateSpeed = ((p[6] ? p[6] : 0) * 0.125) + "";
			if(engineRotateSpeed.indexOf(".") > 0)
				engineRotateSpeed = engineRotateSpeed.substring(0, engineRotateSpeed.indexOf(".") + 3) + "转/分钟";
			else
				engineRotateSpeed += "转/分钟";
		}
		var oilInstant = "--";
		if(p[4] && p[4] > 0){
			oilInstant = (p[4] ? p[4] : 0) * 0.05 + "";
			if(oilInstant.indexOf(".") > 0)
				oilInstant = oilInstant.substring(0, oilInstant.indexOf(".") + 3) + "升/小时";
			else
				oilInstant += "升/小时";
		}
		//每隔**个轨迹点查询一次位置信息   add by tangfeng 添加轨迹位置信息
		if(that.pathFindAddressTimesAdd%that.pathFindAddressTimes==0 || that.pathFindAddressTimes==1)
		{
			var lnglat = {
			mapLon : p[0] / 600000,
			mapLat : p[1] / 600000
			};
			var locationObj = that.params.container.find("div.pathInfo div:eq(0)");
			findAddressByLngLat(that.params.vid, lnglat, locationObj);							
		}
		//当位置信息不为空时，赋给label5  add by tangfeng 添加轨迹位置信息
		if(that.params.container.find("div.pathInfo div:eq(0)").text()!="")			
		{
			that.label5=that.params.container.find("div.pathInfo div:eq(0)").text();
		}
		this.params.container.find("div.pathInfo label:eq(0)").text(p[2]).end()// 时间
		.find("div.pathInfo label:eq(3)").text(p[8]).end()// 方向
		.find("div.pathInfo label:eq(1)").text(speed).end()// 车速
		.find("div.pathInfo label:eq(4)").text(engineRotateSpeed).end()// 转速
		.find("div.pathInfo label:eq(2)").text(oilInstant).end()// 瞬时油耗
		.find("div.pathInfo div:eq(0)").text(that.label5).end();// 位置
	};
	this.addOrMoveMarker = function(count)
	{
		var vehicleInfos = that.pathPoints[count], 
			p = vehicleInfos.split("|"),
			carImgUrl = getCarDirectionIconByLngLat([that.pointBefore[0], that.pointBefore[1], p[0], p[1]], p[5], "true"), // vehicleInfos.online
			moveMarkerLon = p[0] / 600000, 
			moveMarkerLat = p[1] / 600000, 
			markerParams = {
				id : "pathMoveMarker",
				lng : moveMarkerLon,
				lat : moveMarkerLat,
				iconUrl : carImgUrl,
				iconW : 20,
				iconH : 20,
				tip : "",
				label : "",
				handler : null,
				isDefaultTip : false,
				isOpen : false,
				isMultipleTip : false,
				anchor : [0.5, 0.5]//new SE.Point(-15,5)
			}, 
			pathPointsLen = that.pathPoints.length;
		that.pointBefore = [p[0], p[1]];
		if (count == 0)
		{
			that.cMap.removePointMarker("pathMoveMarker");
			that.cMap.addPointMarker(markerParams);
		} else if (count > 0 && count < pathPointsLen)
			that.cMap.movePointMarker(markerParams);
		if (!that.cMap.containsPoint(new TMLngLat(moveMarkerLon, moveMarkerLat)))
			that.cMap.panTo(moveMarkerLon, moveMarkerLat);
	};
	this.pathReplayPause = function()
	{
		if(this.pathReplayTimer) clearInterval(this.pathReplayTimer);
		this.pathReplayTimer = null;
		this.playStatus = false;
	};
	// 导出轨迹
	this.exportPathAndEvents = function()
	{
//		this.params.vid = 825;//10035;//6725;//10170
		var vname = $(".vehicle_details_cp").html();
//		alert(encodeURI(encodeURI(vname))+"--------------------"+vname);
		var url = "monitor/exportExcelTrajectoryData.action?vid="+this.params.vid+"&vname="+encodeURI(encodeURI(vname))+"&startTime="+that.queryParam.startTime+":00&endTime="+that.queryParam.endTime+":00";
		if (!that.queryParam.startTime || !that.queryParam.endTime)
		{
			$.ligerDialog.error("请选择起止时间", "提示");
			return false;
		}
		if(tracingPoint>30000){
			$.ligerDialog.success("请缩小查询范围查询后，再进行导出操作。","提示");
		}else
		if(tracingPoint==0){
			$.ligerDialog.success("没有轨迹数据，请按时间段查询后再试。","提示");
		}else{
			$.ligerDialog.success("正在导出，请稍后。","提示");
			setTimeout(function(){
				location.href=url;
			}, 1);    //setTimeout防止阻断流程
		}
	}
	
	// 查询轨迹点和事件点
	this.queryPathAndEvents = function()
	{
//		this.params.vid = 825;//10035;//6725;//10170
		var url = "monitor/findTrack.action", 
			p = {
				"requestParam.equal.id" : this.params.vid,
				"requestParam.equal.startTime" : that.queryParam.startTime + ":00"//"2011-11-25 00:00:00"//that.queryParam.startTime + ":00"// "2011-10-08
				// 19:09:00"
				,
				"requestParam.equal.endTime" : that.queryParam.endTime + ":00"//"2011-11-25 59:59:59"//that.queryParam.endTime + ":00"// "2011-10-08
				// 19:30:00"
			}; 
//			alertMessage = $(that.params.container).find("h2.alertMessageForPathQuery");
		p["requestParam.equal.queryId"] = this.params.vid + "_" + Math.floor(Math.random()) * 10000 + "_" + (new Date()).getTime();
		p["requestParam.equal.init"] = 1;
		if (!that.queryParam.startTime || !that.queryParam.endTime)
		{
			// alert("请选择起止时间");
//			alertMessage.text("请选择起止时间");
			$.ligerDialog.alert("请选择起止时间", "提示", "error");
			return false;
		}
//		alertMessage.text("");
		that.params.container.loadMask("");
		JAjax(url, p, 'json', function(data, err)
		{
//			var data = {Rows:
//["69811343|23986702|2011-11-25 15:16:54|0||230|","69811472|23986762|2011-11-25 15:17:44|0||230|","69811494|23986902|2011-11-25 15:18:34|0||230|","69811464|23986942|2011-11-25 15:19:24|0||230|","69811373|23986852|2011-11-25 15:24:01|0||14|","69811674|23986482|2011-11-25 15:24:51|0||20|",
// "69811343|23986702|2011-11-25 15:16:54|0||230|","69811472|23986762|2011-11-25 15:17:44|0||230|","69811494|23986902|2011-11-25 15:18:34|0||230|","69811464|23986942|2011-11-25 15:19:24|0||230|","69811373|23986852|2011-11-25 15:24:01|0||14|","69811674|23986482|2011-11-25 15:24:51|0||20|",
// "69811343|23986702|2011-11-25 15:16:54|0||230|","69811472|23986762|2011-11-25 15:17:44|0||230|","69811494|23986902|2011-11-25 15:18:34|0||230|","69811464|23986942|2011-11-25 15:19:24|0||230|","69811373|23986852|2011-11-25 15:24:01|0||14|","69811674|23986482|2011-11-25 15:24:51|0||20|",
// "69811343|23986702|2011-11-25 15:16:54|0||230|","69811472|23986762|2011-11-25 15:17:44|0||230|","69811494|23986902|2011-11-25 15:18:34|0||230|","69811464|23986942|2011-11-25 15:19:24|0||230|","69811373|23986852|2011-11-25 15:24:01|0||14|","69811674|23986482|2011-11-25 15:24:51|0||20|",
// "69811343|23986702|2011-11-25 15:16:54|0||230|","69811472|23986762|2011-11-25 15:17:44|0||230|","69811494|23986902|2011-11-25 15:18:34|0||230|","69811464|23986942|2011-11-25 15:19:24|0||230|","69811373|23986852|2011-11-25 15:24:01|0||14|","69811674|23986482|2011-11-25 15:24:51|0||20|",
// "69811343|23986702|2011-11-25 15:16:54|0||230|","69811472|23986762|2011-11-25 15:17:44|0||230|","69811494|23986902|2011-11-25 15:18:34|0||230|","69811464|23986942|2011-11-25 15:19:24|0||230|","69811373|23986852|2011-11-25 15:24:01|0||14|","69811674|23986482|2011-11-25 15:24:51|0||20|",
// "69811343|23986702|2011-11-25 15:16:54|0||230|","69811472|23986762|2011-11-25 15:17:44|0||230|","69811494|23986902|2011-11-25 15:18:34|0||230|","69811464|23986942|2011-11-25 15:19:24|0||230|","69811373|23986852|2011-11-25 15:24:01|0||14|","69811674|23986482|2011-11-25 15:24:51|0||20|",
// "69811343|23986702|2011-11-25 15:16:54|0||230|","69811472|23986762|2011-11-25 15:17:44|0||230|","69811494|23986902|2011-11-25 15:18:34|0||230|","69811464|23986942|2011-11-25 15:19:24|0||230|","69811373|23986852|2011-11-25 15:24:01|0||14|","69811674|23986482|2011-11-25 15:24:51|0||20|",
// "69811343|23986702|2011-11-25 15:16:54|0||230|","69811472|23986762|2011-11-25 15:17:44|0||230|","69811494|23986902|2011-11-25 15:18:34|0||230|","69811464|23986942|2011-11-25 15:19:24|0||230|","69811373|23986852|2011-11-25 15:24:01|0||14|","69811674|23986482|2011-11-25 15:24:51|0||20|",
// "69811343|23986702|2011-11-25 15:16:54|0||230|","69811472|23986762|2011-11-25 15:17:44|0||230|","69811494|23986902|2011-11-25 15:18:34|0||230|","69811464|23986942|2011-11-25 15:19:24|0||230|","69811373|23986852|2011-11-25 15:24:01|0||14|","69811674|23986482|2011-11-25 15:24:51|0||20|",
// "69811343|23986702|2011-11-25 15:16:54|0||230|","69811472|23986762|2011-11-25 15:17:44|0||230|","69811494|23986902|2011-11-25 15:18:34|0||230|","69811464|23986942|2011-11-25 15:19:24|0||230|","69811373|23986852|2011-11-25 15:24:01|0||14|","69811674|23986482|2011-11-25 15:24:51|0||20|",
// "69811343|23986702|2011-11-25 15:16:54|0||230|","69811472|23986762|2011-11-25 15:17:44|0||230|","69811494|23986902|2011-11-25 15:18:34|0||230|","69811464|23986942|2011-11-25 15:19:24|0||230|","69811373|23986852|2011-11-25 15:24:01|0||14|","69811674|23986482|2011-11-25 15:24:51|0||20|",
// "69811343|23986702|2011-11-25 15:16:54|0||230|","69811472|23986762|2011-11-25 15:17:44|0||230|","69811494|23986902|2011-11-25 15:18:34|0||230|","69811464|23986942|2011-11-25 15:19:24|0||230|","69811373|23986852|2011-11-25 15:24:01|0||14|","69811674|23986482|2011-11-25 15:24:51|0||20|",
// "69811343|23986702|2011-11-25 15:16:54|0||230|","69811472|23986762|2011-11-25 15:17:44|0||230|","69811494|23986902|2011-11-25 15:18:34|0||230|","69811464|23986942|2011-11-25 15:19:24|0||230|","69811373|23986852|2011-11-25 15:24:01|0||14|","69811674|23986482|2011-11-25 15:24:51|0||20|",
// "69811343|23986702|2011-11-25 15:16:54|0||230|","69811472|23986762|2011-11-25 15:17:44|0||230|","69811494|23986902|2011-11-25 15:18:34|0||230|","69811464|23986942|2011-11-25 15:19:24|0||230|","69811373|23986852|2011-11-25 15:24:01|0||14|","69811674|23986482|2011-11-25 15:24:51|0||20|",
// "69811343|23986702|2011-11-25 15:16:54|0||230|","69811472|23986762|2011-11-25 15:17:44|0||230|","69811494|23986902|2011-11-25 15:18:34|0||230|","69811464|23986942|2011-11-25 15:19:24|0||230|","69811373|23986852|2011-11-25 15:24:01|0||14|","69811674|23986482|2011-11-25 15:24:51|0||20|"]
//         	, Total:96 ,TotalFull:35212};
			if (data && data.error)
			{
				that.params.container.find("div.pathStatistics  label.pathCounts").text("轨迹点: 0个").end()
				.find("div.queryPath").attr("disabled", false);
				$.ligerDialog.alert(data.error[0].errorMessage,"提示","error");
				tracingPoint = 0;
			} else if (data && data.Rows.length > 0)
			{
				tracingPoint = data.TotalFull;//将实际轨迹点赋值给变量。
				that.addPathLine(data);
				that.params.container.find("div.queryPath").attr("disabled", false);
//				.find("h2.alertMessageForPathQuery").text("").end()
//				.find("input[name='queryPath']").attr("disabled", false);
//				
				var param = [];

				var ddt = {
					name : 'requestParam.equal.startTime',
					value : that.queryParam.startTime + ":00"
				};
				param.push(ddt);
				var dda = {
					name : 'requestParam.equal.endTime',
					value : that.queryParam.endTime + ":00"
				};
				param.push(dda);
				var ddb = {
					name : 'requestParam.equal.id',
					value : that.params.vid
				};
				param.push(ddb);
				var ddd = {
					name : 'requestParam.equal.queryId',
					value : p["requestParam.equal.queryId"]
				};
				param.push(ddd);

				that.addPathEvents(param);
			}
			that.params.container.unLoadMask();
		}, function(data, err)
		{
			$(that.params.container).find("div.queryPath").attr("disabled", false);
//			.find("h2.alertMessageForPathQuery").text("查询轨迹出错").end()
//			.find("input[name='queryPath']").attr("disabled", false);
			$.ligerDialog.alert("查询轨迹出错", "提示", "error");
			that.params.container.unLoadMask();
		},null,null,60000

		);

	};
	this.addPathLine = function(pathPoints)
	{
		var pathLonLats = [];
		that.params.container.find("div.pathStatistics label.pathCounts").text("轨迹点: " + pathPoints.Total + "个");
		$("#pathSlider").slider("option", "max", pathPoints.Total);
		speedCurveData={Rows:[],Total:pathPoints.Rows.length};
		var speedCurveXmlDataCategories="<categories>";
		var speedCurveXmlDataDataset="<dataset seriesName='速度' color='00b7da' anchorBorderColor='00b7da' anchorBgColor='00b7da'>";
		$(pathPoints.Rows).each(function(i)
		{
			var p = this.split("|");
			if(i==0){
				firstPointMiles = p[7]?p[7]:0;
			}
			pathLonLats.push(p[0] / 600000);
			pathLonLats.push(p[1] / 600000);
			var subDateStr=p[2].split(" ")[1];
			var speedVal=p[3]/10;
			var temp={speed:speedVal,date:p[2],subDate:subDateStr};
			speedCurveData.Rows.push(temp);
			speedCurveXmlDataCategories+="<category name='"+subDateStr+"' />";
			speedCurveXmlDataDataset+="<set value='"+speedVal+"' toolText='"+p[2]+"速度:"+speedVal+"km/h'/>";
		});
		speedCurveXmlDataDataset+="</dataset>";
		speedCurveXmlDataCategories+="</categories>";
		speedCurveXmlData=speedCurveXmlDataCategories+speedCurveXmlDataDataset;
		speedCurveXmlDataDataset=null;
		speedCurveXmlDataCategories=null;
		
		var lineId = "singlePath", 
			pathLineParams = {
				id : lineId,
				arrLngLat : pathLonLats,
				strColor : "blue",
				numWidth : "3",
				numOpacity : "0.5"
			}, 
			startPoint = {
					id : "pathMoveStartMarker",
					lng : pathLonLats[0],
					lat : pathLonLats[1],
					iconUrl : "images/addressMarker/startPoint.png",
					iconW : 20,
					iconH : 20,
					tip : "",
					label : "",
					handler : null,
					isDefaultTip : false,
					isOpen : false,
					isMultipleTip : false
			}, 
			endPoint = {
				id : "pathMoveEndMarker",
				lng : pathLonLats[pathLonLats.length - 2],
				lat : pathLonLats[pathLonLats.length - 1],
				iconUrl : "images/addressMarker/endPoint.png",
				iconW : 20,
				iconH : 20,
				tip : "",
				label : "",
				handler : null,
				isDefaultTip : false,
				isOpen : false,
				isMultipleTip : false
			};
		this.cMap.removeMarker("pathMoveStartMarker");
		this.cMap.removeMarker("pathMoveEndMarker");
		this.cMap.addMarker(startPoint);
		this.cMap.addMarker(endPoint);

		this.cMap.getBestMaps(pathLonLats.slice());
		this.cMap.removePolyLine(lineId);
		this.cMap.addPolyLine(pathLineParams);
		this.pathPoints = pathPoints.Rows;
		this.replayStep = 100 / this.pathPoints.length;

	};
	this.addPathEvents = function(param)
	{

		var that = this;
		if (this.pathGrid)
		{
			this.pathGrid.setOptions({
				parms : param
			});
			this.pathGrid.loadDataOut(true);
		} else
		{
			this.params.container.find("div.pathEventsDiv").ligerGrid({
				pageParmName : 'requestParam.page', // 页索引参数名，(提交给服务器)
				pagesizeParmName : 'requestParam.rows',
				columns : [ {
					display : "",
					width : 40,
					name : "",
					render : function(row)
					{
						var html = "<img src='" + getAlarmTypeImg(row.level) + "' />";
						return html;
					}
				}, {
					display : "事件类型",
					width : 140,
					name : "typeName"
				}, 
//				{
//					display : "事件描述",
//					width : 100,
//					name : "typeDesc"
//				}, 
				{
					display : "速度",
					width : 40,
					name : "speed",
					render : function(row)
					{
						return parseInt(row.speed) > 0 ? parseInt(row.speed) / 10 : 0;
					}

				}, {
					display : "事件时间",
					width : 240,
					name : "time",
					render : function(row)
					{
						var html = "<label>" + row.time + "</label>";
						return html;
					}
				} ],
				width : "100%",
				parms : param,
				height : 126,
				dataAction : 'server',
				usePager : true,
				url : 'monitor/findEventPositions.action',
				autoLoad : true,
				sourceObj : $(that.params.container),
				isChecked : function(rowData)
				{
					return that.f_isChecked(rowData.alarmId);
				},
				pageSize : 10,
				sortName : 'alarmTime',
				allowUnSelectRow : true,
				onAfterShowData : function(grid, data, sourceObj)
				{
					// sourceObj.find("h2.alertMessageForPathQuery").text("");
				},
				onSuccess : function(data, sourceObj)
				{
					// sourceObj.find("input[name='queryPath']").attr("disabled",
					// false);
				},
				onError : function(XMLHttpRequest, textStatus, errorThrown, sourceObj)
				{
					// sourceObj.find("h2.alertMessageForPathQuery").text("查询事件点出错");
				},
				onSelectRow : function(rowData)
				{
					var markerId = "event_" + "_" + Math.floor(Math.random()) * 10000 + "_" + (new Date()).getTime();
					if (inArray(markerId, that.eventPointIdsCache) > -1)
						return false;
					that.eventPointIdsCache.push(markerId);
					var alarmMarkerParam = {
						id : markerId,
						lng : rowData.longitude / 600000,
						lat : rowData.latitude / 600000,
						iconUrl : getAlarmTypeImg(rowData.level),
						iconW : 20,
						iconH : 20,
						tip : "",
						label : "",
						handler : null,
						isDefaultTip : false,
						isOpen : false,
						isMultipleTip : false
					};
					that.cMap.addMarker(alarmMarkerParam);
					that.cMap.panTo(alarmMarkerParam.lng, alarmMarkerParam.lat);
				},
				onUnSelectRow : function(rowData)
				{
					var markerId = "event_" + rowData.recordId, index = inArray(markerId, that.eventPointIdsCache);
					if (index > -1)
					{
						that.cMap.removeMarker(markerId);
						that.eventPointIdsCache.splice(index, 1);
					}
				},
				timeout: 60000
			});
			this.pathGrid = this.params.container.find("div.pathEventsDiv").ligerGetGridManager();
		}
	};
	this.clear = function()
	{
		this.cMap.removeAllMarkers();
		this.cMap.removeAllPolyLines();
		this.pathPoints = [];
		this.eventPointIdsCache = [];
		this.pathReplayDelayTime = 600;
		this.params.container
		.find("div.pathStatistics table.pathReplayAction img.replaySpeed").attr("src", "images/vehicle_popwindows/newPathReplay/speed_1.png").end()
		.find("div.pathStatistics table.pathReplayAction a:eq(0)").attr("class", "startReplayGray").end()
		.find("div.pathInfo label").text("");
		
		this.pathReplayPause();
		this.pathReplayCount = -1;
		this.curspeed = 1;
//		$("#pathSlider").progressbar({
//			value : 0
//		});
		$("#pathSlider").slider("value", 0);
		$("#pathSlider").slider({ disabled: true });
		if (this.pathGrid)
		{
			this.pathGrid._showData({Rows: []});
		}
	};

};

// 车辆调度
function ScheduleHandler(params)
{
	var that = this;
	this.params = params;
//	this.scheduleHistoryGrid = null;
//	this.scheduleTimer = null;
//	this.timerDelay = 30011;

//	this.cMap = new CTFO_MAP(params.mapContainer);
//	this.cMap.addMapControl(1);
	this.textContainer = $(params.container).find("textarea");
	
	if (KCPT.schedulePreMessage && KCPT.schedulePreMessage.length > 0)
	{
		$(KCPT.schedulePreMessage).each(function(){
			var option = "<option value='" + this.msgBody + "' >" + this.msgIdx + "</option>";
			$(params.container).find("select[name='preinstallSelect']").append(option);
		});
	}
	this.queryMessageSendList = function(){
		var p = {
				vid: this.params.vid
			,	panel: $(this.params.container).find("div.vehicle_details_main_7_message_2 ul")
		};
		getAlarmHandleMessage(p);
	};
	this.queryMessageSendList();
//	var scheduleVehicle = {
//		id : "scheduleVehicleMarker",
//		lng : params.vehicle.maplon / 600000,
//		lat : params.vehicle.maplat / 600000,
//		iconUrl : getCarDirectionIcon(params.vehicle.head, params.vehicle.isonline),
//		iconW : 26,
//		iconH : 26,
//		tip : "",
//		label : params.vehicle.vehicleno,
//		labelFontSize : 12,
//		labelFontColor : "#000000",
//		labelBgColor : "#F2EFE9",
//		handler : null,
//		isDefaultTip : false,
//		isOpen : false,
//		isMultipleTip : false
//	};
//	this.cMap.addMarker(scheduleVehicle);
//	this.cMap.getBestMap(scheduleVehicle.lng, scheduleVehicle.lat);

	$(params.container).find("select[name='preinstallSelect']").change(function()
	{
		that.textContainer.text($(this).find("option:selected").val());
	}).end()
	.find("textarea[name='textContent']").bind("propertychange", function()
	{
		$(this).removeClass("grayText");
	}).end()
	.find("textarea[name='textContent']").one("keydown", function()
	{
		$(this).text("");
	}).bind("keydown", function(e)
	{
		var et = e || window.event;
		var keycode = et.charCode || et.keyCode;
		if (keycode == 13)
		{
			if (window.event)
				window.event.returnValue = false;
			else
				e.preventDefault();// for firefox
		}
	}).end()
	.find("input[name=msgSendType]").eq(0).click(function(){
		var ui = this;
		$(params.container).find("input[name=msgSendType]:gt(0)").each(function(){
			$(this).attr("checked", $(ui).attr("checked"));
		});
	});
	$(params.container).find("div.sendMessageCommand").click(function()
	{
		var text = (that.textContainer.text() == "请输入消息内容" ? "" : that.textContainer.text()), 
			alertMessage = $(that.params.container).find("div.vehicle_details_main_tip");
		if (!validateText(text))
		{
			$.ligerDialog.alert("调度信息不可为空","提示","error");
			return false;
		}
		if (validateCharLength(text) > 200)
		{
			$.ligerDialog.alert("调度信息字符不可超过200字符","提示","error");
			return false;
		}
		if (!filtrates(text))
		{
			$.ligerDialog.alert("调度信息有特殊字符","提示","error");
			return false;
		}
		var	_emergencyAttValue, 
			_screenAttValue,
			_ttsAttValue, 
			_advertisingAttValue;
		$(that.params.container).find("input[name=msgSendType]").each(function(i){
			if(i==0)
				_emergencyAttValue = ($(this).attr("checked") ? 1 : 0);
			if(i==1)
				_screenAttValue = ($(this).attr("checked") ? 1 : 0);
			if(i==2)
				_ttsAttValue = ($(this).attr("checked") ? 1 : 0);
			if(i==3)
				_advertisingAttValue = ($(this).attr("checked") ? 1 : 0);
		});
		var param = {
			"requestParam.equal.emergencyAttValue" : _emergencyAttValue,
			"requestParam.equal.screenAttValue" : _screenAttValue,
			"requestParam.equal.ttsAttValue" : _ttsAttValue,
			"requestParam.equal.advertisingAttValue" : _advertisingAttValue,
			"requestParam.equal.idArrayStr" : [ that.params.vid ].join(","),
			"requestParam.equal.message" : text,
			"requestParam.equal.memo" : ""
		};
		sendMessageCommand(param, "vehicle", alertMessage, function(){
			that.queryMessageSendList();
		});
//		alertMessage.text("");
		
	});

//	$(params.container).find("div.maptptab").ligerGrid({
//		pageParmName : 'requestParam.page', // 页索引参数名，(提交给服务器)
//		pagesizeParmName : 'requestParam.rows',
//		columns : [ {
//			display : "",
//			width : 40,
//			name : "",
//			render : function(row)
//			{
//				var html = "<img src='" + getScheduleStatusImg(row.coStatus) + "' title='" + getScheduleStatusDesc(row.coStatus) + "' />";
//				return html;
//			}
//		}, {
//			display : "发送人",
//			width : 60,
//			name : "opName"
//		}, {
//			display : "消息内容",
//			width : 160,
//			name : "coText"
//		}, {
//			display : "状态",
//			width : 100,
//			name : "coStatus",
//			render : function(row)
//			{
//				var html = getScheduleStatusDesc(row.coStatus);
//				return html;
//			}
//		}, {
//			display : "发送时间",
//			width : 140,
//			name : "coSutc",
//			render : function(row)
//			{
//				var html = utc2Date(row.coSutc);
//				return html;
//			}
//		} ],
//		width : "100%",
//		height : 126,
//		dataAction : 'server',
//		autoLoad : true,
//		url : 'monitor/findMessageList.action',
//		parms : [ {
//			"name" : "requestParam.equal.vid",
//			"value" : that.params.vid
//		} ],
//		pageSize : 10,
//		sortName : 'coSutc'
//
//	});
//	this.scheduleHistoryGrid = $(params.container).find("div.maptptab").ligerGetGridManager();
//
//	this.scheduleTimer = setInterval(function()
//	{
//		that.reloadGrid();
//	}, that.timerDelay);
//
//	this.reloadGrid = function()
//	{
//		that.scheduleHistoryGrid.loadData(true);
//	};

};

// 视频
function CameraHandler(params)
{
	var that = this;
	this.params = params;
	var m_vidiconId = "20110824001", iStreamType = "1", iPuGetStreamMode = "1";

	// 注册服务器IP、端口
	var m_szRegIP = "58.83.236.27";// "221.12.122.194";
	var m_iRegPort = "7660";
	// 流媒体服务器IP、端口、使用方式(3种～2种，参数不详细，默认1就ok)
	var m_szRsmIP = "58.83.236.27";
	var m_iRsmPort = "7554";

	var m_iRsmUseType = "1";
	// 系统视频登录的用户名和密码
	var m_user = "root";
	var m_password = "12345";
	// 中科视频使用的
	this._videoActivex;
	this.videoNameList = new Array();
	this.videoIdList = new Array();

//	$('a[rel*=downloadr]').downloadr();

	this.getVideoSource = function()
	{
		JAjax("monitor/sendVidioCommand.action", {
			"requestParam.equal.vid" : that.params.vid
		}, 'json', function(data, err)
		{
			if (data && data.error)
				return false;
			else
				that.compileVideo(data);
		}, function(data, err)
		{
			// alert("获取车辆视频源错误");
		});
	};

	this.compileVideoForWeiSen = function(videoUrl, i)
	{
		$("#videoDivTableYX").hide();
		$("#videoDivTable").show();
		if (videoUrl)
			that.params.container.find("div.videoDiv:eq(" + (i - 1) + ")").append(
					'<OBJECT classid="clsid:E23FE9C6-778E-49D4-B537-38FCDE4887D8"' + 'codebase="http://downloads.videolan.org/pub/videolan/vlc/latest/win32/axvlc.cab"' + 'width="240" height="180" name="video' + i + '" events="True">' + '<param name="Src" value="' + videoUrl + '" />'
							+ '<param name="ShowDisplay" value="True" />' + '<param name="AutoLoop" value="True" />' + '<param name="AutoPlay" value="False" />' + '<param name="Volume" value="100" />' + '</OBJECT>');
	};

	this.playWeiSenVideo = function()
	{
		if (document.video1)
		{
			try
			{
				document.video1.play();
			} catch (e)
			{
			}
			that.params.container.find("object[name='video1']").attr({
				"width" : 240,
				"height" : 180
			}).css({
				"width" : 240,
				"height" : 180
			}).end();
		} else
			that.params.container.find("div.videoDiv:eq(0)").html("无法连接该路视频");

		setTimeout(function()
		{
			if (document.video2)
			{
				try
				{
					document.video2.play();
				} catch (e)
				{
				}
				that.params.container.find("object[name='video2']").attr({
					"width" : 240,
					"height" : 180
				}).css({
					"width" : 240,
					"height" : 180
				}).end();
			} else
				that.params.container.find("div.videoDiv:eq(1)").html("无法连接该路视频");
		}, 8000);
		setTimeout(function()
		{
			if (document.video3)
			{
				try
				{
					document.video3.play();
				} catch (e)
				{
				}
				that.params.container.find("object[name='video3']").attr({
					"width" : 240,
					"height" : 180
				}).css({
					"width" : 240,
					"height" : 180
				}).end();
			} else
				that.params.container.find("div.videoDiv:eq(2)").html("无法连接该路视频");
		}, 16000);
		setTimeout(function()
		{
			if (document.video4)
			{
				try
				{
					document.video4.play();
				} catch (e)
				{
				}
				that.params.container.find("object[name='video4']").attr({
					"width" : 240,
					"height" : 180
				}).css({
					"width" : 240,
					"height" : 180
				}).end();
			} else
				that.params.container.find("div.videoDiv:eq(3)").html("无法连接该路视频");
		}, 24000);
	};

	this.RunPlay = function(videoParams, num)
	{
		var PlayOCX = document.getElementById("PPVS" + num);
		var videoChanel = videoParams.caNum;
		var lConDevice = PlayOCX.ConnectDeviceByACS(videoParams.deviceName, videoParams.regServerIp, videoParams.regServerPort, videoParams.username, videoParams.userpass);
		if (0 > lConDevice)
		{
			$.ligerDialog.alert("连接设备失败！","提示","error");
			return;
		}
		PlayOCX.SetDeviceInfoForShow('视频通道:' + videoChanel);
		PlayOCX.StreamPlayStartByTCP(videoParams.serverIp, videoParams.serverPort, videoParams.deviceName, videoChanel, iStreamType, iPuGetStreamMode);
	};

	this.StopPlay = function(num)
	{
		var PlayOCX = document.getElementById("PPVS" + num);
		PlayOCX.StreamPlayStop();
	};

	this.compileVideoForHaiKang = function(videoParams, i)
	{
		$("#videoDivTableYX").hide();
		$("#videoDivTable").show();

		if (videoParams)
		{
			that.params.container.find("div.videoDiv:eq(" + (i - 1) + ")").append('<OBJECT classid="clsid:EE4EA829-B8DA-4229-AC72-585AF45AD778"' + 'codebase=""' + 'width="240" height="180" name="video' + i + '" id="PPVS' + i + '" class="haikang">' + '</OBJECT>');
			that.RunPlay(videoParams, i);
		}
	};
	//add by tangfeng 2012-09-10 start 添加视频厂商
	// 雅讯电视视频接入	
	this.compileVideoForYaxun = function(videoParams, i)
	{
		if (videoParams)
		{
			$("#videoDivTableYX").show();
			$("#videoDivTable").hide();
			that.params.container.find("div.videoDivYX:eq(" + (i - 1) + ")").append('<OBJECT classid="clsid:26F28F1D-B113-412E-8990-02044001D91F"' + 'codebase="YxVideoCtrl.ocx"' + 'width="490" height="400"   id="VideoControl' + i + '" >' + '</OBJECT>');
			
			var n = setTimeout(function()                                                 
			{
				that.playVideoControl(videoParams, i);
			}, 1000);
		}
	};	
	// 播放雅讯电视视频	
	this.playVideoControl=function(Params,i)
	{	
			mobileId = that.params.commaddr;	
			videoCtrl = document.getElementById("VideoControl"+i);
			videoCtrl.RemoteIP =  Params.serverIp;
			videoCtrl.RemotePort =Params.serverPort;	
			videoCtrl.VideoDescriptionVisible = true; //是否显示视频描述信息
			videoCtrl.BackColor = 0xececec;			
			videoCtrl.VideoMonitorTime= parseInt("600") ;
			videoCtrl.PlatformType = 2;//平台类型 1：千里眼、2：GPSKing
			videoId=videoCtrl.CreateVideo( mobileId,1);
			videoCtrl.StartMediaMonitor(videoId,1);			
		
	};
	
	// 亿盟视频接入	
	this.compileVideoForYimeng = function(videoParams, i)
	{
		if (videoParams)
		{
			$("#videoDivTableYX").hide();
			$("#videoDivTable").show();
			that.params.container.find("div.videoDiv:eq(" + (i - 1) + ")").append('<OBJECT classid="CLSID:A7C417D0-1B9F-4E7E-A0F9-09D6DE11D6BF" '+ 'width="240" height="180" name="video' + i + '"  id="ViewControl' + i + '" >' + '</OBJECT>');
			
			var n = setTimeout(function()                                                 
			{
				that.playVideoViewControl(videoParams, i);
			}, 1000);
		}
	};	
	// 播放亿盟视频	
	this.playVideoViewControl=function(Params,i)
	{			   	    	
		    viewCtrl = document.getElementById("ViewControl"+i);
		    var serverIp =  Params.serverIp;
		    var port =Params.serverPort;	
		    var phoneNum ="0"+ that.params.commaddr;
		    var channel="0"+i;
		    var user=Params.username;
		    var pwd=Params.userpass;
		    viewCtrl.attachEvent("OnPlayerReady", function (n) { viewCtrl.Play(); });           
		    viewCtrl.SetConnectMode(1);
            viewCtrl.SetPlayMode(0);
		    viewCtrl.SetMuteMode(0);
		    viewCtrl.SetViewMode(1);
			viewCtrl.SetHttpServer(serverIp, port, channel, phoneNum + "", user, pwd);
			viewCtrl.SetTitle(phoneNum);
			viewCtrl.InitPlayer();		
	};
	//锐明视屏接入
	this.compileVedeForRuiMing=function(videoParams, i){
		if (videoParams)
		{
			$("#videoDivTableYX").hide();
			$("#videoDivTable").show();
			var html=[];
			html.push('<object style="width: 240px; height: 180px;"  name="video' + i + '"   id="VideoRM' + i + '"  classid="clsid:E24D8362-0622-4D15-94AA-2E83A6616EAC">');
			html.push('<PARAM NAME="_Version" VALUE="65536">');
			html.push('<PARAM NAME="_ExtentX" VALUE="10583">');
			html.push('<PARAM NAME="_ExtentY" VALUE="9260">');
			html.push('<PARAM NAME="_StockProps" VALUE="0">');
			html.push('<param name="_Version" value="65536">');
			html.push('<param name="_ExtentX" value="10583">');
			html.push('<param name="_ExtentY" value="9260">');
			html.push('<param name="_StockProps" value="0">');
			html.push('</object>');
			that.params.container.find("div.videoDiv:eq(" + (i - 1) + ")").append(html.join(''));
			var play=function(videoParams,i){
			    var tranip=videoParams.serverIp;
			    var deviceID=videoParams.deviceName;
			    var port=videoParams.serverPort;
			    var obj=document.getElementById("VideoRM"+i);
			    obj.SetDeviceInfo2(121,deviceID,tranip);
			    obj.SetReconnect(3);//设置重连次数
			    obj.OpenVideo(i);
			};
			var t = setTimeout(function()                                                 
			{
				play(videoParams,i);
				play=null;
				clearTimeout(t);
			}, 1000);
		}
		
	};
	// 长江电视视频接入	
	this.compileVideoForChangJiang = function(videoParams, i)
	{
		if (videoParams)
		{
			$("#videoDivTableYX").hide();
			$("#videoDivTable").show();
			that.params.container.find("div.videoDiv:eq(" + (i - 1) + ")").append('<OBJECT classid="clsid:18ACA9B9-DC88-4A39-8C8E-E1B5D8471446"' + 'codebase="YGPreviewOcx.cab#version=2,2,2,0"' + 'width="240" height="180" name="video' + i + '"   id="VideoCJ' + i + '" >' + '</OBJECT>');
			
			var n = setTimeout(function()                                                 
			{
				that.playVideoCJ(videoParams, i);
			}, 1000);
		}
	};	
	// 播放长江电视视频	
	this.playVideoCJ=function(Params,i)
	{	
			mobileId = that.params.commaddr;	//18951211362
			videoCJctrl = document.getElementById("VideoCJ"+i);			
			videoCJctrl.CenterIP=Params.serverIp;	
			videoCJctrl.CenterPort=Params.serverPort;	
			videoCJctrl.UserName=Params.username;	
			videoCJctrl.UserPWd=Params.userpass;				
			videoCJctrl.BeginVideo(mobileId,i-1);
		
	};
	
	//贝尔视频接入	
	this.compileVideoForBeiEr = function(videoParams)
	{
		if (videoParams)
		{
			$("#videoDivTable").hide();
			$("#videoDivTableYX").show();
			that.params.container.find("div.videoDivYX:eq(0)").append('<OBJECT classid="clsid:E5E0446C-8680-4444-9FC2-F837BC617ED9"' + 'codebase="3GClient.rar"' + 'width="490" height="400"     id="VideoBE" ></OBJECT>');			
			dvrID = videoParams.deviceName;	//18075524863
			videoBEctrl = document.getElementById("VideoBE");			
			var serverIP=videoParams.serverIp;	
			var serverPort=videoParams.serverPort;
			var userName=videoParams.username;	
			var psd=videoParams.userpass;
			VideoBE_i=1;
			oemcodeBE=videoParams.tmodelCode;
			videoBEctrl.LoginServer(serverIP, serverPort, userName, psd);
		}
	};	
	
	//add by tangfeng 2012-09-10 end 添加视频厂商
	// 中科电视视频接入
	this.compileVideoForZhongKe = function(videoParams, i)
	{
		$("#videoDivTableYX").hide();
		$("#videoDivTable").show();

		if (videoParams)
		{
			that.params.container.find("div.videoDiv:eq(" + (i - 1) + ")").append('<OBJECT classid="clsid:04F60EAE-29E7-4617-A2BC-D0D44CCF8CF8"' + 'codebase="ocx/SV_Video.ocx"' + 'width="240" height="180" name="video' + i + '"   id="video' + i + '"  class="haikang">' + '</OBJECT>');
			var n = setTimeout(function()
			{
				that.playVideo(videoParams, i);
			}, 1000);

		}
	};
	// 播放中科电视频
	var z_IsReadConfigFiles = false;
	var z_LoginUser = "admin";
	var z_LoginPassword = "1234";
	var z_LoginPasswd = "1234";
	var z_GroupId = "administrators";
	var z_ServerIP = "124.16.134.60";//124.16.135.34
	var z_ServerPort = "9900";
	var z_AlarmOpenVideo = true;
	var z_ShowDetailInfo = true;
	var z_USETCPTransData = 1;
	var z_IsLDblClkFullScreen = 1;
	var z_DecodeBussSize = 600;
	var z_deviceName=7001213;//设备号

	var z_RTPReceiveBufferSize = 1500;

	this.playVideo = function(Params, i)
	{// 播放视频

		if (Params.IsReadConfigFiles)
		{
			z_IsReadConfigFiles = Params.IsReadConfigFiles;
		}
		if (Params.username)
		{
			z_LoginUser = Params.username;
		}
		if (Params.password)
		{
			z_LoginPassword = Params.password;
		}
		if (Params.password)
		{
			z_LoginPasswd = Params.password;
		}
		if (Params.GroupId)
		{
			z_GroupId = Params.GroupId;
		}
		if (Params.serverPort)
		{
			z_ServerPort = Params.serverPort;
		}
		if (Params.AlarmOpenVideo)
		{
			z_AlarmOpenVideo = Params.AlarmOpenVideo;
		}
		if (Params.ShowDetailInfo)
		{
			z_ShowDetailInfo = Params.ShowDetailInfo;
		}
		if (Params.USETCPTransData)
		{
			z_USETCPTransData = Params.USETCPTransData;
		}
		if (Params.IsLDblClkFullScreen)
		{
			z_IsLDblClkFullScreen = Params.IsLDblClkFullScreen;
		}
		if (Params.DecodeBussSize)
		{
			z_DecodeBussSize = Params.DecodeBussSize;
		}
		if (Params.serverIp)
		{
			z_ServerIP = Params.serverIp;
		}
		if (Params.deviceName)
		{
			z_deviceName = Params.deviceName;
		}
		// 设置参数
		var videoActivex = document.getElementById("video" + i + "");
		// if(videoActivex.readyState == 4) {
		videoActivex = videoActivex;
		videoActivex.IsReadConfigFiles = z_IsReadConfigFiles;
		videoActivex.LoginUser = z_LoginUser;
		videoActivex.LoginPasswd = z_LoginPasswd;
		videoActivex.GroupId = z_GroupId;
		videoActivex.ServerIP = z_ServerIP;
		videoActivex.ServerPort = z_ServerPort;
		videoActivex.AlarmOpenVideo = z_AlarmOpenVideo;
		videoActivex.IsLDblClkFullScreen = z_ShowDetailInfo;
		videoActivex.ClientName = "test" + i;
		videoActivex.ShowDetailInfo = z_ShowDetailInfo;
		videoActivex.USETCPTransData = z_USETCPTransData;
		videoActivex.DecodeBussSize = z_DecodeBussSize;
		videoActivex.RTPReceiveBufferSize = z_RTPReceiveBufferSize;
		// this._videoActivex.IsSaveVideoFlg = true;
		// this._videoActivex.SaveFilePath("C:\videoRec");
		videoActivex.attachEvent('VS_CONNECTSERVER',function(){
			videoActivex.StartPlay(z_deviceName, i);
			});
		videoActivex.Init();
		videoActivex.SetVideoWndNum(1);
		//VS_CONNECTSERVER 当控件与Server连接成功或失败后，触发该事件

		/*
		 * }else{ alert("没有安装视频设备!"); }
		 */

	},

	this.compileVideo = function(data)
	{
		//視頻控件下載
		var _code=data[0]["vidioOemCode"],_down=$(params.container).find(".vehicle_details_main_4_down");
		//modify by tangfeng 2012-09-10 start 添加视频厂商
		if(_code=="1"||_code=="2"||_code=="4"||_code=="6"){
			_down.attr("href","monitor/downloadVideo.action?videoType=1");
		}else if(_code=="3"){
			_down.attr("href","monitor/downloadVideo.action?videoType=2");
		}else if (_code=="5")
		{
			_down.attr("href","monitor/downloadVideo.action?videoType=3");
		}else if (_code=="7"||_code=="70")
		{
			_down.attr("href","monitor/downloadVideo.action?videoType=7");
		}else if(_code=="8"){
			_down.attr("href","monitor/downloadVideo.action?videoType=8");
		}
		$(data).each(function(i)
		{
			var vidioOemCode = this.vidioOemCode;
			if (vidioOemCode == "1")
			{
				that.compileVideoForWeiSen(this.vidioUrl, i + 1);
			} else if (vidioOemCode == "2")
			{
				that.compileVideoForHaiKang(this, i + 1);
			} else if(vidioOemCode=="3")
			{
				that.compileVideoForZhongKe(this, i + 1);
			}else if(vidioOemCode=="5")
			{
				that.compileVideoForYimeng(this,i + 1);
			}else if(vidioOemCode=="6"){
				that.compileVideoForChangJiang(this, i + 1);
			}else if(vidioOemCode=="8"){
				that.compileVedeForRuiMing(this, i + 1);
			}
			else
				return false;
				
		});
		if(data[0]["vidioOemCode"] == "4" || data[0]["vidioOemCode"] == "44"|| data[0]["vidioOemCode"] == "444"|| data[0]["vidioOemCode"] == "40"){
			that.compileVideoForYaxun(data[0],1);
		}
		if(data[0]["vidioOemCode"] == "7"||data[0]["vidioOemCode"] == "70"){			
			that.compileVideoForBeiEr(data[0]);
		}
		//modify by tangfeng 2012-09-10 end 添加视频厂商
		if (_code == "1")
			that.playWeiSenVideo();
		
	};

	this.getVideoSource();

	$(params.container).find("div.saveOverloadInfo").click(function(){
		var remark = $(params.container).find("textarea[name=vidioOverloadInfo]").text(), 
			flag = $(params.container).find("input[name=vidioOverloadFlag]").attr("checked"), 
			param = {
				"requestParam.equal.vid" : params.vid,
				"requestParam.equal.isOverload" : (flag ? 1 : 0),
				"requestParam.equal.memo" : remark
			};
		if (!checkFunction("FG_MEMU_MONITOR_PHOTOGRAPH_OVERLOAD"))
		{
			$.ligerDialog.alert("该用户没有权限","提示","error");
			return false;
		}
		if (flag)
		{
			that.saveVidioOverload(param);
		} else
		{
			$.ligerDialog.alert("请勾选超载标识","提示","error");
			return false;
		}
	});
	
	this.saveVidioOverload = function(param){
		JAjax("monitor/saveVidioOverload.action", param, 'json', function(data, err)
		{
			$.ligerDialog.alert("保存视频超载备注成功","提示","success");
			
		}, function(data, err)
		{
			$.ligerDialog.alert("保存视频超载备注失败","提示","error");
		});
	};
};

// 拍照
function PhotoHandler(params)
{
	var that = this;
	this.params = params;
	this.curPage = 1;
	this.page = 1;
	this.pageRows = 4;
	this.queryPhotoTimer = null;
	this.timerDelay = 30011;

	$(params.container).find("div.sendPhotoCommand").click(function(){
		var cameraLocation = [], 
			photoQuality = 5,//$(params.container).find("input[name='photoQuality']").val(), 
			photoBrightness = 126,//$(params.container).find("input[name='photoBrightness']").val(), 
			photoChroma = 126,//$(params.container).find("input[name='photoChroma']").val(), 
			photoContrast = 65,//$(params.container).find("input[name='photoContrast']").val(), 
			photoSaturation = 65,//$(params.container).find("input[name='photoSaturation']").val(), 
			photoSense = "320*240",//$(params.container).find("select[name='photoSense'] option:selected").val();
			photoSharpness = $(params.container).find("input[name='photoSharpness']:checked").val(),
			alertMessage = $(that.params.container).find("div.vehicle_details_main_tip_3");
		$(params.container).find("input[name='cameraPosition']").each(function()
		{
			if ($(this).attr("checked"))
				cameraLocation.push($(this).val());
		});
		switch(photoSharpness){
			case "1":
				photoQuality = 10;
				photoSense = "1024*768";
				break;
			case "2":
				photoQuality = 8;
				photoSense = "800*600";
				break;
			case "3":
				photoQuality = 5;
				photoSense = "320*240";
				break;
		}
		var param = {
			"requestParam.equal.idArrayStr" : ([ that.params.vid ].join(",")),
			"photoParameter.locationArray" : (cameraLocation.join(",")),// 摄像头位置
			"photoParameter.quality " : photoQuality,// 图像质量 0-10的数字
			"photoParameter.light" : photoBrightness,// 亮度 0-255的数字
			"photoParameter.contrast" : photoContrast, // 对比度 0-127的数字
			"photoParameter.saturation" : photoSaturation,// 饱和度
			// 0-127的数字
			"photoParameter.color" : photoChroma,// 色度 0-255的数字
			"photoParameter.resolution" : photoSense
		// 分辨率
		};
		sendPhotoCommand(param, "vehicle", alertMessage, this);
	}).end()
	.find("div.savePhotoRemark").click(function(){
		var remark = $(that.params.container).find("textarea[name=overloadFlag]").text(), 
			flag = $(params.container).find("input[name='overloadFlag']").attr("checked"), 
			photoId = $(that.params.container).find("div.curShowPhoto img:eq(0)").attr("photoId"), 
			param = {
				"requestParam.equal.mediaId" : photoId,
				"requestParam.equal.isOverload" : (flag ? 1 : 0),
				"requestParam.equal.memo" : remark
			};
//			alertMessage = $(that.params.container).find("h2.alertMessageForOverload");

		if (!checkFunction("FG_MEMU_MONITOR_PHOTOGRAPH_OVERLOAD"))
		{
			$.ligerDialog.alert("该用户没有权限","提示","error");
			return false;
		}
		if(!photoId){
			$.ligerDialog.alert("请选择多媒体照片","提示","error");
			return false;
		}
		if (flag)
		{
			that.savePhotoRemark(param);
		} else
		{
			// alert("请勾选超载标识");
			$.ligerDialog.alert("请勾选超载标识","提示","error");
			return false;
		}
	}).end()
	.find("div.setDefaultPhotoParam").click(function(){
		$(that.params.container).find("input.ptext3").each(function(i)
		{
			var v = 5;
			if (i == 2 || i == 4)
				v = 126;
			if (i == 1 || i == 3)
				v = 65;
			$(this).val(v);
			$(that.params.container).find("div.photoParamSlider").eq(i).slider("value", v);
		});
	}).end()
	.find("div.refreshPhotoList").click(function(){
		//$(params.container).find("div.refreshPhotoList").attr("disabled",true);
		that.queryLatestPhotos2(1);
	}).end()
	.find("input[name='photoQuality']").change(function(){
		var v = $(this).val(), 
			alertMessage = $(that.params.container).find("label.alertMessageForPhotoQuality");
		if (isNaN(v) || v < 1 || v > 10)
		{
			$.ligerDialog.alert("请填入1-10整数","提示","error");
			return;
		}
		$("#photoQualitySlider").slider("value", v);
	}).end()
	.find("input[name='photoBrightness']").change(function(){
		var v = $(this).val(), alertMessage = $(that.params.container).find("label.alertMessageForPhotoBrightness");
		if (isNaN(v) || v < 0 || v > 255)
		{
			$.ligerDialog.alert("请填入0-255的整数","提示","error");
			return;
		}
		$("#photoBrightnessSlider").slider("value", v);
	}).end()
	.find("input[name='photoChroma']").change(function(){
		var v = $(this).val(), alertMessage = $(that.params.container).find("label.alertMessageForPhotoChroma");
		if (isNaN(v) || v < 0 || v > 255)
		{
			$.ligerDialog.alert("请填入0-255的整数","提示","error");
			return;
		}
		alertMessage.text("");
		$("#photoChromaSlider").slider("value", v);
	}).end()
	.find("input[name='photoContrast']").change(function(){
		var v = $(this).val(), alertMessage = $(that.params.container).find("label.alertMessageForPhotoContrast");
		if (isNaN(v) || v < 0 || v > 127)
		{
			$.ligerDialog.alert("请填入0-127的整数","提示","error");
			return;
		}
		$("#photoContrastSlider").slider("value", v);
	}).end()
	.find("input[name='photoSaturation']").change(function(){
		var v = $(this).val(), alertMessage = $(that.params.container).find("label.alertMessageForPhotoSaturation");
		if (isNaN(v) || v < 0 || v > 127)
		{
			$.ligerDialog.alert("请填入0-127的整数");
			return;
		}
		$("#photoSaturationSlider").slider("value", v);
	}).end()
	.find("div.scrollPreButton").click(function(){
		if(that.curPage < 2){
			$(this).find("img").attr("src", "images/map/new/scrollPreButtonGray.png");
			return false;
		}else{
			$(this).find("img").attr("src", "images/map/new/scrollPreButton.png");
		}
		that.curPage--;
		that.queryLatestPhotos(that.curPage);
	}).end()
	.find("div.scrollNextButton").click(function(){
		if(that.curPage > that.page-1){
			$(this).find("img").attr("src", "images/map/new/scrollNextButtonGray.png");
			return false;
		}else{
			$(this).find("img").attr("src", "images/map/new/scrollNextButton.png");
		}
		that.curPage++;
		that.queryLatestPhotos(that.curPage);
	}).end()
	.find("div.scrollPhotosDiv img").click(function(){
		var pic = $(this).attr("src"), 
			sendUserName = $(this).attr("sendUserName"), 
			utc = $(this).attr("utc"), 
			photoId = $(this).attr("photoId"), 
			flag = ($(this).attr("isOverload") == 1) ? true : false, 
			remark = $(this).attr("remark");
		$(params.container).find("div.curShowPhoto img:eq(0)").attr({
			"src" : pic,
			"photoId" : (photoId ? photoId : "")
		}).end()
//		.find("div.photoRemarkDiv ul:eq(0) > li:eq(0) label").text((sendUserName ? sendUserName : "")).end()
//		.find("div.photoRemarkDiv ul:eq(0) > li:eq(1) label").text((utc ? utc : "")).end()
		.find("div.photoRemarkDiv input[name='overloadFlag']").attr("checked", flag ? flag : false).end()
		.find("div.photoRemarkDiv textarea[name='overloadRemark']").text(remark);
	});

	$("#photoQualitySlider").slider({// 图像质量,1-10数字
		range : "min",
		value : 2,
		min : 1,
		max : 10,
		slide : function(event, ui)
		{
			$(params.container).find("ul.vehicle_details_main_3_photography input[name='photoQuality']").val(ui.value);
		}
	});

	$("#photoBrightnessSlider").slider({// 亮度
		range : "min",
		value : 126,
		min : 0,
		max : 255,
		slide : function(event, ui)
		{
			$(params.container).find("ul.vehicle_details_main_3_photography input[name='photoBrightness']").val(ui.value);
		}
	});
	$("#photoChromaSlider").slider({// 色度
		range : "min",
		value : 126,
		min : 0,
		max : 255,
		slide : function(event, ui)
		{
			$(params.container).find("ul.vehicle_details_main_3_photography input[name='photoChroma']").val(ui.value);
		}
	});
	$("#photoContrastSlider").slider({// 对比度
		range : "min",
		value : 65,
		min : 0,
		max : 127,
		slide : function(event, ui)
		{
			$(params.container).find("ul.vehicle_details_main_3_photography input[name='photoContrast']").val(ui.value);
		}
	});
	$("#photoSaturationSlider").slider({// 饱和度
		range : "min",
		value : 65,
		min : 0,
		max : 127,
		slide : function(event, ui)
		{
			$(params.container).find("ul.vehicle_details_main_3_photography input[name='photoSaturation']").val(ui.value);
		}
	});

//	$(params.container).find("ul.vehicle_details_main_3_photography > li.gray a").css("display", "none");

	this.savePhotoRemark = function(param)
	{// 保存图片超载备注
		JAjax("monitor/saveOverload.action", param, 'json', function(data, err)
		{
//			$(that.params.container).find("h2.alertMessageForOverload").text("保存图片超载备注成功");
			$.ligerDialog.alert("保存图片超载备注成功","提示","success");
			// 这里要把更新的备注信息及时的更新到保存的图片上这样就能展现出实时更新的效果
			var remark = param["requestParam.equal.memo"];
			var photoId = param["requestParam.equal.mediaId"];
			$(params.container).find("div.scrollPhotosDiv img").each(function(i)
			{
				if ($(this).attr("photoId") == photoId)
				{
					$(this).attr("remark", remark);
				}
			});
		}, function(data, err)
		{
			//$(that.params.container).find("h2.alertMessageForOverload").text("保存图片超载备注失败");
			$.ligerDialog.alert("保存图片超载备注失败","提示","error");
		});
	};

	this.queryLatestPhotos = function(curPage)
	{
		JAjax("monitor/findPictures.action", {
				"requestParam.equal.vid" : that.params.vid
			,	"requestParam.page" : curPage
			,	"requestParam.rows" : that.pageRows
		}
		, 'json', function(data, err)
		{
			if(data && data.Rows.length > 0)
				that.compileLatestPhotosResult(data);
			//$(that.params.container).find("h2.alertMessageForPhoto").text("刷新成功！");
			//$.ligerDialog.alert("刷新成功！");
		}, function(data, err)
		{
			//$(that.params.container).find("h2.alertMessageForPhoto").text("刷新失败！");
			//$.ligerDialog.alert("刷新失败！");
		});
	};
	
	this.queryLatestPhotos2 = function(curPage)
	{
		JAjax("monitor/findPictures.action", {
				"requestParam.equal.vid" : that.params.vid
			,	"requestParam.page" : curPage
			,	"requestParam.rows" : that.pageRows
		}
		, 'json', function(data, err)
		{
			if(data && data.Rows.length > 0){
				that.compileLatestPhotosResult(data);
			}else{
				var tipObj = $(that.params.container).find("div.vehicle_details_main_tip_4");
				tipObj.css({
					"background-position": "0 0"
				});
				tipObj.show();
				var s =	setTimeout(function(){
					tipObj.hide();
					clearTimeout(s);
				}, 2001);
				//$(params.container).find("div.refreshPhotoList").attr("disabled",false);
			}
		}, function(data, err)
		{
			
				var tipObj = $(that.params.container).find("div.vehicle_details_main_tip_4");
				tipObj.css({
					"background-position": "0 -30"
				});
				tipObj.show();
				var s =	setTimeout(function(){
					tipObj.hide();
					clearTimeout(s);
				}, 2001);
				//$(params.container).find("div.refreshPhotoList").attr("disabled",false);
		});
	};

	this.queryLatestPhotos(1);
	this.queryPhotoTimer = setInterval(function()
	{
		that.queryLatestPhotos(1);
	}, that.timerDelay);

	this.compileLatestPhotosResult = function(data)
	{
		var imgObjs = $(that.params.container).find("div.scrollPhotosDiv img"), rows = data ? data.Rows : null;
		if (!rows || rows.length < 1)
			return false;
		that.page = parseInt(data.Total / that.pageRows);
		that.page = (data.Total % that.pageRows == 0) ? that.page : that.page + 1;
		imgObjs.each(function(i)
		{
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
//		if(that.curPage < 1){
//			
//		}else if(that.curPage > data.Total){
//			
//		}
			
	};
};

// 周边查询
function SearchAroundHandler(params)
{
	var that = this;
	this.params = params;
	this.localObjectMarkerIdCache = [];
	this.queryParam = null;
	this.cMap = params.map;
//	this.cMap = new CTFO_MAP(params.mapContainer);
//	this.cMap.addMapControl(1);
	var vlon = params.vehicle.maplon / 600000, vlat = params.vehicle.maplat / 600000;
//	var searchAroundVehicle = {
//		id : "searchAroundVehicleMarker",
//		lng : vlon,
//		lat : vlat,
//		iconUrl : getCarDirectionIcon(params.vehicle.head, params.vehicle.isonline),
//		iconW : 26,
//		iconH : 26,
//		tip : "",
//		label : params.vehicle.vehicleno,
//		labelFontSize : 10,
//		labelFontColor : "#FFFFFF",
//		labelBgColor : "#545454",
//		handler : null,
//		isDefaultTip : false,
//		isOpen : false,
//		isMultipleTip : false
//	};
//	this.cMap.addMarker(searchAroundVehicle);
//	this.cMap.getBestMap(searchAroundVehicle.lng, searchAroundVehicle.lat);
	
	/**输入框input上的回车事件 -- modify by t_f 2012-05-22**/
	$(params.container).find("input[name='searchAroundKeyword']").keydown(function(){ 
		 if (event.keyCode == 13) 
		 {      
			 $(params.container).find("div.searchAround").trigger('click');	   
			 return false;
		 }
	});
	
	$(params.container).find("div.searchAround").click(function()
	{
		var conditionDiv = $(that.params.container).find("div.vehicle_details_main_5_inquires"), 
			words = conditionDiv.find("input[name='searchAroundKeyword']").val();
//			alertMessage = $(that.params.container).find("h2.alertMessageForSearchAround");
		if (!validateText(words)){
			$.ligerDialog.alert("输入的关键字有误");
//			alertMessage.text("输入的关键字有误");
			return false;
		}
		if((!vlon || vlon == 0) && (!vlat || vlat == 0)){
//			alertMessage.text("该车坐标有误");
			$.ligerDialog.alert("该车坐标有误","提示","error");
			return false;
		}
//		alertMessage.text("");
		words = (words == "请输入查询条件") ? "" : words;
		SE_Rego.getCity(new TMLngLat(vlon, vlat), function(city){
		//vlon="116.31492";vlat="39.95842;
		that.queryParam = {
				"city" : (city ? city : "北京"),
				"keyword" : words,
				"surround.queryType" : "1",
				"pageNo" : 1,
				"pageSize" : 10,
				"radius" : conditionDiv.find("select[name='searchAroundRadius']").val(),
				"centerxy" : vlon+" "+vlat
			};
			var lss = new TMServiceLS(that.queryParam);
			lss.doSearch(that.queryParam,function(result){
				that.compileSearchAroundResult(result,lss.request.pageNo,lss.request.pageSize);
			});
		});
		
	}).end()
	.find("div.vehicle_details_main_5_left > ul > li").hover(function(){
		if($(this).hasClass("liHoverIn")){
			return false;
		}else{
			$(this).addClass("liHoverIn");
		}
	},function(){
		if($(this).hasClass("liHoverIn")){
			$(this).removeClass("liHoverIn");
		}else{
			return false;
		}
	}).click(function(){
		$(params.container).find("div.vehicle_details_main_5_left > ul > li").each(function(){
			if($(this).hasClass("liVisitedIn")){
				$(this).removeClass("liVisitedIn");
			}
		});
		$(this).addClass("liVisitedIn");
		var words = $(this).find("label").text();
		if(words == "全部")
			words = "";
		SE_Rego.getCity(new TMLngLat(vlon, vlat), function(city){
that.queryParam = {
					"city" : (city ? city : "北京"),// 测试默认值"北京"//
					"keyword" : words,
					"pageNo" : 1,
					"pageSize" : 10,
					"radius" : $(that.params.container).find("select[name='searchAroundRadius']").val(),
					"centerxy" : vlon+" "+vlat
				};
			if(""!=words){
				var kind="";
				switch(words){
				case "餐饮":
					kind=32;
					break;
				case "电影院":
					kind=2060301;
					break;
				case "超市":
					kind=2070201;
					break;
				case "银行":
					kind=2110201;
					break;	
				case "学校":
					kind=81;
					break;
				case "酒店":
					kind=31;
					break;
				case "医院":
					kind=91;
					break;
				case "火车站":
					kind=2080102;
					break;
				case "景点":
					kind=41;
					break;
				case "加油站":
					kind=75;
					break;
				}
				that.queryParam["kind"]=kind;
				that.queryParam["keyword"]="";
			}
			that.searchAround(that.queryParam);
		});
	}).end()
	.find("input[name='searchAroundKeyword']").bind("propertychange", function()
	{
		$(this).removeClass("grayText");
	}).end()
	.find("input[name='searchAroundKeyword']").one("keydown", function()
	{
		$(this).val("");
	}).end();
	this.searchAround = function(param)
	{
		var lss = new TMServiceLS(param);
		lss.doSearch(that.queryParam,function(result){
			that.compileSearchAroundResult(result,lss.request.pageNo,lss.request.pageSize);
		});
	};
	this.compileSearchAroundResult = function(data,curPageNo,PageSize)
	{
		var map = that.cMap, 
			resultContainerObj = $(that.params.container).find("div.vehicle_details_main_5_right"), 
			points = [], 
			totalRecords = +data.resultCount, 
			page = (parseInt(data.resultCount/PageSize))+(data.resultCount%PageSize>0?1:0), 
			curPage = curPageNo, 
			records = data.resultInfo;
		var errorText = "查询没有结果";
		if ($(data).find("Error").text())
		{
			errorText = $(data).find("Error").text();
			totalRecords = 0;
			page = 0;
			curPage = 0;
		}

		resultContainerObj.find("div.meneame  span:eq(0)").text(curPage).end()
		.find("div.meneame  span:eq(1)").text(page).end()
		.find("label.resultCount").text(totalRecords).end()
		.find("div.meneame > a:eq(0)").unbind("click").click(function()
		{
			that.queryParam["pageNo"] = 1;
			that.searchAround(that.queryParam);
		}).end()
		.find("div.meneame > a:eq(1)").unbind("click").click(function()
		{
			if (curPage - 1 > 0)
			{
				that.queryParam["pageNo"] = curPage - 1;
				that.searchAround(that.queryParam);
			}
		}).end()
		.find("div.meneame > a:eq(2)").unbind("click").click(function()
		{
			if (curPage < page)
			{
				that.queryParam["pageNo"] = curPage + 1;
				that.searchAround(that.queryParam);
			}
		}).end()
		.find("div.meneame > a:eq(3)").unbind("click").click(function()
		{
			that.queryParam["pageNo"] = page;
			that.searchAround(that.queryParam);
		});
		that.clear();
		if (records.length > 0)
		{
			resultContainerObj.find("div.searchAroundResultList").html("");
			$(records).each(function(i)
			{
				var name = this.name, 
					address = this.address, 
					telphone =this.tel, 
					lon = this.x, 
					lat = this.y;
				that.addRecord(i, (name ? name : ""), (address ? address : ""), (telphone ? telphone : ""), lon, lat);
				points.push(lon);
				points.push(lat);
			});
			// 放大到点数组范围
			map.getBestMaps(points);
		} else
		{
			resultContainerObj.find("div.searchAroundResultList").html(errorText);
		}
	};

	this.addRecord = function(num, name, address, telphone, lon, lat)
	{
		var map = that.cMap, 
			resultContainerObj = $(that.params.container).find("div.searchAroundResultList"), 
			imgurl = "images/addressMarker/character/char_" + num + ".png", 
			blue_imgurl = "images/addressMarker/blueCharacter/blueChar_" + num + ".png";
		var div0 = $("<div>"), 
			img = $("<img>"), 
			div1 = $("<div>"), 
			content = "<span title='" + name + "'>名称:" + name 
					+ "</span><span title='" + (telphone ? telphone : "") + "'>电话:" + (telphone ? telphone : "") 
					+ "</span><span title='" + address + "'>地址:" + address + "</span>", addition = "";
		content = content + addition;
//		if (num % 2 != 0)
//			div0.addClass("lresBoxover");
		div0.addClass("searchAroundListRecord");
		div0.click(function()
		{
			// 地图镜头聚焦画面
			map.panTo(lon, lat);
		}).mouseover(function()
		{
			var markerParam = {
				id : "highLight",
				lng : lon,
				lat : lat,
				iconUrl : blue_imgurl,
				iconW : 32,
				iconH : 32,
				tip : "",
				label : "",
				handler : null,
				isDefaultTip : false,
				isOpen : false,
				isMultipleTip : false
			};
			map.addMarker(markerParam);
		}).mouseout(function()
		{
			map.removeMarker("highLight");
		});
		img.attr("src", imgurl);
		img.appendTo(div0);
		div1.append(content);
		div1.appendTo(div0);
		div0.appendTo(resultContainerObj);

		that.addPoint(name, address, lon, lat, imgurl, telphone);
	};
	this.addPoint = function(name, address, lon, lat, imgurl, telphone)
	{
		var map = that.cMap, id = new Date().valueOf() + "_" + Math.random() * 1000, tip = "<div >" + "<table width='100%' cellspacing='0' align='center'  cellpadding='0'>" + "<tr> <td><h5>名称:" + name + "</h5></td> </tr>" + "<tr> <td><h5>地址:" + address + "</h5></td> </tr>" + "<tr> <td><h5>电话:"
				+ telphone + "</h5></td> </tr>" + "</table></div>";

		markerParam = {
			id : id,
			lng : lon,
			lat : lat,
			iconUrl : imgurl,
			iconW : 32,
			iconH : 32,
			isDefaultTip : true,
			tip : tip,
			title : "地物名称",
			handler : null,
			openflag : false,
			onlyOneTip : false
			
		};
		map.addMarker(markerParam);
		that.localObjectMarkerIdCache.push(id);
	};
	
	this.clear = function(){
		$(that.localObjectMarkerIdCache).each(function()
		{
			that.cMap.removeMarker(this);
		});
	};
};

// 监听
function NormalMonitorHandler(params)
{
	var that = this;
	this.params = params;
//	this.cMap = param.map;
	this.normalMonitorTimer = null;
	this.timerDelay = 10011;
	this.tapeTime = 0;
//	this.cMap = new CTFO_MAP(params.mapContainer);
//	this.cMap.addMapControl(1);

//	var normalMonitorVehicle = {
//		id : "normalMonitorVehicleMarker",
//		lng : params.vehicle.maplon / 600000,
//		lat : params.vehicle.maplat / 600000,
//		iconUrl : getCarDirectionIcon(params.vehicle.head, params.vehicle.isonline),
//		iconW : 26,
//		iconH : 26,
//		selfDefineTip : "",
//		tip : "",
//		label : params.vehicle.vehicleno,
//		labelFontSize : 10,
//		labelFontColor : "#FFFFFF",
//		labelBgColor : "#545454",
//		handler : null,
//		isDefaultTip : false,
//		isOpen : false,
//		isMultipleTip : false
//	};
//	this.cMap.addMarker(normalMonitorVehicle);
//	this.cMap.getBestMap(normalMonitorVehicle.lng, normalMonitorVehicle.lat);
	
	var tabChecks = $(params.container).find("input[name=vehicle_details_main_7_left_radio]"),
		tabDivs = $(params.container).find("div.vehicle_details_main_7_right");
	tabChecks.click(function(){
		if($(this).attr("checked")){
			var eq = $(this).val();
			tabDivs.hide();
			tabDivs.eq(eq).show();
		}
	});
	
	// 监听部分
	$(params.container).find("div.sendMonitorCommand").click(function()
	{
		var phone = $(that.params.container).find("input[name=monitorNumber]").val(), 
			converseType = $(that.params.container).find("input[name=converseType]:checked").val(), 
			param = {
				"requestParam.equal.idArrayStr" : [ that.params.vid ].join(","),
				"requestParam.equal.phoneNum" : phone, // 回拨号码
				"requestParam.equal.memo" : "", // 备注
				"requestParam.equal.type" : converseType// 通话类型
			}, 
			alertMessage = $(that.params.container).find("div.vehicle_details_main_tip:eq(0)");
		if (!isTelphone(phone))
		{
			$.ligerDialog.alert("请输入手机号","提示","error");
			// alert("请输入手机号");
			return false;
		}
//		alertMessage.text("");
		sendMonitorCommand(param, "vehicle", alertMessage, function(){
//			that.reloadGrid();
		});
		setTimeout(function()
		{
			var param = {
				"requestParam.equal.coSeq" : KCPT.VehicleMonitorCommandSuccessStatus
			}, obj = $(that.params.container).find("div.vehicle_details_main_tip:eq(0)");
			getCommandStatus(param, obj);
		}, 3000);
	}).end().find("input[name='monitorNumber']").bind("propertychange", function()
	{
		$(this).removeClass("grayText");
	}).end().find("input[name='monitorNumber']").one("keydown", function()
	{
		$(this).val("");
	}).end()
	// 录音部分
	.find("div.startTaping").click(function()
	{
		$(this).css("display", "none").siblings("div.stopTaping").css("display", "block");
		//$(this).addClass("hidden").siblings("div.stopTaping").removeClass("hidden");
		that.tapeTime = $(that.params.container).find("select[name=tapeTime]").val();
		var	countdown = $(that.params.container).find("span.countdown"), 
			param = {
				"requestParam.equal.idArrayStr" : [ that.params.vid ].join(","),
				"requestParam.equal.time" : that.tapeTime, // 录音时长
				"requestParam.equal.memo" : "", // 备注
				"requestParam.equal.recordStatus" : 1
			// 录音类型,1开始,0结束
			}, 
			alertMessage = $(that.params.container).find("div.vehicle_details_main_tip:eq(1)");
		countdown.text(that.tapeTime);
		sendRecordCommand(param, "vehicle", alertMessage, this, countdown, that.tapeTime, function(){
//			that.reloadGrid();
		});
	}).end().find("div.stopTaping").click(function()
	{
		$(this).css("display", "none").siblings("div.startTaping").css("display", "block");
		//$(this).addClass("hidden").siblings("div.startTaping").removeClass("hidden");
		var countdown = $(that.params.container).find("span.countdown"), 
			param = {
				"requestParam.equal.idArrayStr" : [ that.params.vid ].join(","),
				"requestParam.equal.time" : that.tapeTime, // 录音时长
				"requestParam.equal.memo" : "", // 备注
				"requestParam.equal.recordStatus" : 0
			// 录音类型,1开始,0结束
			}, 
		alertMessage = $(that.params.container).find("div.vehicle_details_main_tip:eq(1)");
		clearInterval(countdownTimer);
		var realTapeTime = parseInt(that.tapeTime) - parseInt(countdown.text());
		countdown.text("");
		sendRecordCommand(param, "vehicle", alertMessage, null, null, null, function(){
			if('NaN'==realTapeTime+""){
				realTapeTime = 0;
			}
			$(that.params.container).find("div.tapeTimeRecord").html("共录音" + realTapeTime + "秒");
//			that.reloadGrid();
		});
	}).end();

//	$(params.container).find("div.maptptab").ligerGrid({
//		pageParmName : 'requestParam.page', // 页索引参数名，(提交给服务器)
//		pagesizeParmName : 'requestParam.rows',
//		columns : [ {
//			display : "",
//			width : 40,
//			name : "",
//			render : function(row)
//			{
//				var html = "<img src='" + getScheduleStatusImg(row.coStatus) + "' title='" + getScheduleStatusDesc(row.coStatus) + "' />";
//				return html;
//			}
//		}, {
//			display : "发送人",
//			width : 60,
//			name : "opName"
//		}, {
//			display : "消息内容",
//			width : 160,
//			name : "coText"
//		}, {
//			display : "状态",
//			width : 100,
//			name : "coStatus",
//			render : function(row)
//			{
//				var html = getScheduleStatusDesc(row.coStatus);
//				return html;
//			}
//		}, {
//			display : "发送时间",
//			width : 140,
//			name : "coSutc",
//			render : function(row)
//			{
//				var html = utc2Date(row.coSutc);
//				return html;
//			}
//		} ],
//		width : "100%",
//		height : 126,
//		dataAction : 'server',
//		autoLoad : true,
//		url : 'monitor/findCommandList.action',
//		parms : [ {
//			"name" : "requestParam.equal.vid",
//			"value" : that.params.vid
//		}, {
//			"name" : "requestParam.equal.type",
//			"value" : "D_CTLM,D_CTLM,D_CTLM"
//		}, {
//			"name" : "requestParam.equal.subType",
//			"value" : "9,11,16"
//		} ],
//		pageSize : 10,
//		sortName : 'coSutc'
//
//	});
//	this.normalMonitorHistoryGrid = $(params.container).find("div.maptptab").ligerGetGridManager();
//
//	this.normalMonitorTimer = setInterval(function()
//	{
//		that.reloadGrid();
//	}, that.timerDelay);
//
//	this.reloadGrid = function()
//	{
//		that.normalMonitorHistoryGrid.loadData(true);
//	};
};

// 重点监控
function StressMonitorHandler(params)
{
	var that = this;
	this.params = params;
	this.stressMonitorTimer = null;
	this.lineId = "stressMonitorPath";
	this.pathPoints = [];
	this.stressMonitorTimerDelay = 20011;
	this.cMap = new CTFO_MAP(params.mapContainer, [params.vehicle.maplon / 600000, params.vehicle.maplat / 600000]);
	this.cMap.addMapControl(1);
	var stressMonitorVehicle = {
		id : "stressMonitorVehicleMarker",
		lng : params.vehicle.maplon / 600000,
		lat : params.vehicle.maplat / 600000,
		iconUrl : getCarDirectionIcon(params.vehicle.head, params.vehicle.isonline,params.vehicle.speed),
		iconW : 24,
		iconH : 24,
		selfDefineTip : "",
		tip : "",
		label : params.vehicle.vehicleno,
		labelFontSize : 10,
		labelFontColor : "#FFFFFF",
		labelBgColor : "#545454",
		handler : null,
		isDefaultTip : false,
		isOpen : false,
		isMultipleTip : false
	};

	this.cMap.addMarker(stressMonitorVehicle);
	this.cMap.getBestMap(stressMonitorVehicle.lng, stressMonitorVehicle.lat);

	this.clear = function(){
		if(this.stressMonitorTimer){
			clearInterval(this.stressMonitorTimer);
			this.stressMonitorTimer = null;
		}
	};
	
	this.emphasisCommandReturn = function()
	{
//		if (KCPT.EmphasisMonitorSuccessStatus)
//		{
			that.stressMonitorTimer = setInterval(function()
			{
				that.getLatestPositions();
			}, that.stressMonitorTimerDelay);
			var param = {
				"requestParam.equal.coSeq" : KCPT.EmphasisMonitorSuccessStatus
			}, obj = $(that.params.container).find("div.vehicle_details_main_tip");
			getCommandStatus(param, obj);
//		}
	};
	this.compileVehicleStatus = function(vehicle)
	{
		var speed = "--";
		if(vehicle.speed && vehicle.speed > 0){
			speed = ((vehicle.speed ? vehicle.speed : 0) / 10) + "";
			if(speed.indexOf(".") > 0)
				speed = speed.substring(0, speed.indexOf(".") + 3) + "公里/小时";
			else
				speed += "公里/小时";
		}
		var engineRotateSpeed = "--";
		if(vehicle.engineRotateSpeed && vehicle.engineRotateSpeed > 0){
			engineRotateSpeed = ((vehicle.engineRotateSpeed ? vehicle.engineRotateSpeed : 0) * 0.125) + "";
			if(engineRotateSpeed.indexOf(".") > 0)
				engineRotateSpeed = engineRotateSpeed.substring(0, engineRotateSpeed.indexOf(".") + 3) + "转/分钟";
			else
				engineRotateSpeed += "转/分钟";
		}
		var oilInstant = "--";
		if(vehicle.oilInstant && vehicle.oilInstant > 0){
			oilInstant = (vehicle.oilInstant ? vehicle.oilInstant : 0) * 0.05 + "";
			if(oilInstant.indexOf(".") > 0)
				oilInstant = oilInstant.substring(0, oilInstant.indexOf(".") + 3) + "升/小时";
			else
				oilInstant += "升/小时";
		}
		
		$(that.params.container).find("div.vehicle_details_main_6_window").find("label:eq(0)").text(utc2Date(vehicle.utc)).end()// 上报时间
		.find("label:eq(1)").text(getCarDirectionDesc(vehicle.head)).end()// 方向
		.find("label:eq(2)").text(speed).end()// 车速
		.find("label:eq(3)").text(engineRotateSpeed).end()// 转速
		.find("label:eq(4)").text(oilInstant).end();// 瞬时油耗
//		.find("label:eq(5)").text(vehicle.location).end();// 位置
		findAddressByLngLat(vehicle.vid, {
			mapLon : vehicle.maplon/600000,
			mapLat : vehicle.maplat/600000
		}, $(that.params.container).find("div.vehicle_details_main_6_window").find("label:eq(5)"));
		var markerParam = {
			id : "stressMonitorVehicleMarker",
			lng : vehicle.maplon / 600000,
			lat : vehicle.maplat / 600000,
			iconUrl : getCarDirectionIcon(vehicle.head, vehicle.isonline,vehicle.speed)
		};
		that.pathPoints.push(markerParam.lng);
		that.pathPoints.push(markerParam.lat);
		var pathLineParams = {
				id : that.lineId,
				arrLngLat : that.pathPoints.slice(0),
				strColor : "gray",
				numWidth : "3",
				numOpacity : "0.5"
			};
		that.cMap.removePolyLine(that.lineId);
		if(that.pathPoints.length > 2)
			that.cMap.addPolyLine(pathLineParams);
		that.cMap.moveMarker(markerParam);
		that.cMap.panTo(markerParam.lng, markerParam.lat);
	};
	// 获取车辆数组的实时信息
	this.getLatestPositions = function()
	{
		var that = this;
		JAjax("monitor/findPositions.action", {
			idArrayStr : [ that.params.vid ].join(",")
		}, 'json', function(data, err)
		{
			$(data).each(function()
			{
				if (this)
					that.compileVehicleStatus(this);
			});
		}, function(data, err)
		{
			// alert("查询车辆实时信息错误");
		});
	};
	this.compileVehicleStatus(params.vehicle);
	$(params.container).find("div.sendEmphasisCommand").click(function()
	{
		var conditionsDiv = $(that.params.container).find("div.vehicle_details_main_6_monitor_1"), 
			reportGap = parseInt(conditionsDiv.find("input[name='reportGap']").val()), 
			reportTimes = parseInt(conditionsDiv.find("input[name='reportTimes']").val()), 
			refreshGap = parseInt(conditionsDiv.find("input[name='refreshGap']").val()), 
			alertMessage = $(that.params.container).find("div.vehicle_details_main_tip"), 
			param = {
				"requestParam.equal.idArrayStr" : [ that.params.vid ].join(","),
				"requestParam.equal.memo" : "", // 备注
				"emphasisParameter.upload" : reportGap, // 上报间隔2-60的数字
				"emphasisParameter.time " : reportTimes, // 上报次数1-100的数字
				"emphasisParameter.refresh" : refreshGap // 刷新间隔 2-60的数字
			};
		if(reportGap < 2 || reportGap > 60 || reportTimes < 1 || reportTimes > 100 || refreshGap < 2 || refreshGap > 60){
			$.ligerDialog.alert("监控属性超出范围", "提示", "error");
			return false;
		}
		that.stressMonitorTimerDelay = refreshGap * 1000;
		that.pathPoints = [];
		sendEmphasisCommand(param, alertMessage, function(){
			that.emphasisCommandReturn();
		});
	}).end()
	.find("input[name='reportGap']").change(function()
	{
		var v = $(this).val(), alertMessage = $(that.params.container).find("div.vehicle_details_main_tip");
		if (isNaN(v) || v < 2 || v > 60)
		{
			// alert("请填入2-60的整数");
			alertMessage.text("请填入2-60的整数");
			return false;
		}
		setTimeout(function(){
			alertMessage.text("");
		},2000);
		$("#reportGapSlider").slider("value", v);
	}).end()
	.find("input[name='reportTimes']").change(function()
	{
		var v = $(this).val(), alertMessage = $(that.params.container).find("div.vehicle_details_main_tip");
		if (isNaN(v) || v < 1 || v > 100)
		{
			// alert("请填入1-100的整数");
			alertMessage.text("请填入1-100的整数");
			return false;
		}
		setTimeout(function(){
			alertMessage.text("");
		},2000);
		$("#reportTimesSlider").slider("value", v);
	}).end()
	.find("input[name='refreshGap']").change(function()
	{
		var v = $(this).val(), alertMessage = $(that.params.container).find("div.vehicle_details_main_tip");
		if (isNaN(v) || v < 2 || v > 60)
		{
			// alert("请填入2-60的整数");
			alertMessage.text("请填入2-60的整数");
			return false;
		}
		setTimeout(function(){
			alertMessage.text("");
		},2000);
		$("#refreshGapSlider").slider("value", v);
	}).end();

	$("#reportGapSlider").slider({// 上报间隔(秒),2-60数字
		range : "min",
		value : 30,
		min : 2,
		max : 60,
		slide : function(event, ui)
		{
			$(params.container).find("input[name='reportGap']").val(ui.value);
		}
	});
	$("#reportTimesSlider").slider({// 上报次数(次),1-100数字
		range : "min",
		value : 50,
		min : 1,
		max : 100,
		slide : function(event, ui)
		{
			$(params.container).find("input[name='reportTimes']").val(ui.value);
		}
	});
	$("#refreshGapSlider").slider({// 刷新间隔(秒),2-60数字
		range : "min",
		value : 30,
		min : 2,
		max : 60,
		slide : function(event, ui)
		{
			$(params.container).find("input[name='refreshGap']").val(ui.value);
		}
	});
};


