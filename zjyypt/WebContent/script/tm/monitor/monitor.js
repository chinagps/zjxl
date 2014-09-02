var vehicleNoValue = "";//车牌号，为弹出窗口取值提供。
// VehicleMonitor对象管理器
var batchMonitorWinIdCache = [];
var batchMonitorDataCache = [];
var lastKeyWord="";
var VehicleMonitorOfModels = {};
var vehicleSubfunctionObjId = "";
var vehicleMonitorConfigs = {
	htmlElements : {
		addopenDiv : "monitorContent",
		mainDiv : "mainDiv",
		frame_tabs_content : "frame_tabs_content",
		mainContainer : "monitorContent",
		northContainer : "kcpt_top",
		footContainer : "footer",
		mapContainer : "monitorMap",
		mapToolContainer : "monitorMapTool",
		rightContainer : "monitor_right_c",
		leftContainer : "left_c_monitor",
		toSelectVehicleListGrid : "vehicleListGrid",
		selectedVehicleListGrid : "selectedVehicleListGrid",
		bottomContainer : "monitor_bottom_c",
		vehiclePopWindow : "vehiclePopWindow",
		monitor_bottom_statements_top : "monitor_bottom_statements_top",
		monitor_bottom_statements_main : "monitor_bottom_statements_main"
	}
};

var vehiclesInMapLimit = 200;

/**
 * 车辆监控模块对象
 */
var VehicleMonitor = function(o)
{
	this.cMap = null;
	this.options = {};
	this.htmlObj = {};
	this.vehicleSubfunctionObj = null;
	this.cache = {
		toSelectVehicles : {}// 待选车辆列表缓存
		,
		selectedVehicles : {}// 已选车辆列表缓存
		,
		vehiclesToBeRollPosition : []// 轮询用户已勾选车辆的vid
		,
		boundMarkersId : []// 聚合第三级marker vid缓存
		,
		boundMarkerCache : {}// 聚合第三级vehicle对象缓存
		,
		clusterVehicleList : null
	// 聚合第二级叠加车辆列表缓存
	};
	this.toSelectSearchParams = null;
	this.selectedSearchParams = null;
	this.pageSize = 50;
	this.selfTipLoadHtml = "model/monitor/marker.html";
	this.loginVehicleList = [];// 上下线车辆列表队列
	this.loginVehicleListCounter = 0;// 上下线车辆列表滚动播放计数器
	this.loginVehicleListTimer = null;// 上下线车辆列表查询定时器
	this.loginVehicleListLoopInterval = 120011;// 上下线车辆列表查询定时器间隔120秒
	this.rollVehicleListTimer = null;// 上下线车辆列表滚动播放定时器
	this.rollVehicleListTimerDelay = 1999;// 上下线车辆列表滚动播放定时器间隔2秒

	this.clusterTimer = null;// 聚合轮询定时器
	this.clusterTimerDelay = 600011;

	this.rollBatchMonitorTimer = null;// 批量监控定时器
	this.rollBatchMonitorTimerDelay = 10011;

	this.rollVehiclesSelectedTimer = null;// 已勾选车辆轮询定时器
	this.rollVehiclesSelectedTimerDelay = 60000;// 已勾选车辆轮询定时器间隔
	
	this.innerCodeCache = {};// 车辆vin缓存

	this.hadQueryParam = false;// 是否已有查询条件缓存标记

	this.batchRollTimer = null;// 批量点名定时器
	this.batchRollTimerDelay = 10011;// 批量点名定时器间隔10秒

	this.currentTipId = "";// 当前tip窗口id，自定义handler中打开tip时使用该属性
	this.currentTip = null;
	this.tipMarker = null;
	this.clusterList = null;
//	this.firstClusterLevel = {
//		min : 1,
//		max : 10
//	};
	this.secondClusterLevel = {
		min : 1,
		max : 15
	};
	this.hasThirdClusterLevel = false;//聚合第三级是否打开
	this.isLegendShow = false;
	this.clusterObj = null;
	this.richLayerObj = null;
	this.regionSearchRectAcreageLimit = 100;//100平方千米
	this.rectCache = null;
	this.rectInfoWinCache = null;
	this.actionFeedback = false;
	this.poiSearchParamsCache = null;
	this.poiMarkerIdCache = [];
	this.poiSearchCurPage = 1;
	this.poiSearchPage = 1;
	this.poiSearchPageSize = 10;
	this.poiSearchDiv = null;
	this.markerTime = null;
	
	this.user_show_markers = {}; //poi显示的点
	
	this.user_show_markers_bak = {};
	
	this.user_data = {};  //poi点全部数据
	
	this.traffic_event = null; //实时交通

	this.monitorTree = null;
	
	this.addRealTimeInfoTimer = null;
	
	this.vehicleLabelTip = null;
//	this.counterTest = 0;
	
	this.init(o);
};
VehicleMonitor.prototype = {
	// 加载对象初始化配置参数
	loadParams : function(o)
	{
		if (o)
		{
			this.options = o;
			return true;
		} else
			return false;
	},
	showOut : function()
	{
		if (this.rollVehiclesSelectedTimer)
			this.startRollSelectedVehicles();
		if (this.rollBatchMonitorTimer)
			this.startRollBatchMonitor();
		if (this.bottom_AlarmList) {
			//this.bottom_AlarmList.startTimer();
		}
		this.onResize();
	},
	// 退出对象时的清理
	clearOut : function()
	{
		this.stopQueryVehicleListTimer();
		this.stopRollSelectedVehicles();
		this.stopRollBatchMonitor();
		if(this.bottom_AlarmList){
			this.bottom_AlarmList.stopTimer(); 
		}
	},
	// 对象初始化
	init : function(o)
	{
		var that = this, loaded = this.loadParams(o);
		if (loaded)
		{
			if (!VehicleMonitorOfModels[this.options.htmlElements.rightContainer])
				VehicleMonitorOfModels[this.options.htmlElements.rightContainer] = this;
			else
				return false;
			this.htmlObj = {
				addopenDiv : $("#" + this.options.htmlElements.addopenDiv),
				mainContainer : $("#" + this.options.htmlElements.mainContainer),
				northContainer : $("div." + this.options.htmlElements.northContainer),
				footContainer : $("#" + this.options.htmlElements.footContainer),
				mapContainer : $("#" + this.options.htmlElements.mapContainer),
				mapToolContainer : $("#" + this.options.htmlElements.mapToolContainer),
				rightContainer : $("#" + this.options.htmlElements.mainContainer).find("div." + this.options.htmlElements.rightContainer),
				leftContainer : $("#" + this.options.htmlElements.mainContainer).find("div." + this.options.htmlElements.leftContainer),
				bottomContainer : $("#" + this.options.htmlElements.mainContainer).find("div." + this.options.htmlElements.bottomContainer),
				toSelectVehicleListGrid : $("#" + this.options.htmlElements.toSelectVehicleListGrid),
				selectedVehicleListGrid : $("#" + this.options.htmlElements.selectedVehicleListGrid),
				vehiclePopWindow : $("#" + this.options.htmlElements.mainContainer).find("div." + this.options.htmlElements.vehiclePopWindow)
			};
			getSchedulePreInstallMessage();
			this.onResize();
			this.initMap();
			this.initUniversallyTool();
			this.initTree();
			//页面底部报警列表
			o.monitorObj = this;
			this.bottom_AlarmList = new monitorAlarmList(o);
			
			this.bindEvent();
			this.fullScreen();
			this.startRollSelectedVehicles();
			this.startRollBatchMonitor();
			$(window).resize(function() {
				that.onResize();
				that.monitorTree.onReSize();
			});
		}
	},
	// 地图初始化
	initMap : function()
	{
		var that = this,
			c = null,
			l = null;
		if($.cookie("monitorMapCenter")){
			c = $.cookie("monitorMapCenter").split(",");
		}else
			c = [116.29376, 39.95776];
		if($.cookie("monitorMapLevel"))
			l = $.cookie("monitorMapLevel");
		this.cMap = new CTFO_MAP(this.options.htmlElements.mapContainer, c, 4);
		SE_MapTool.addMapTool(this.cMap.map, this.options.htmlElements.mapToolContainer);
		
		this.cMap.addMapControl();
		this.cMap.addScaleControl();
		this.cMap.addOverviewMapControl(false);
		
		TMEvent.addListener(this.cMap.map, "zoom",function(oldZoom,newZoom){
			if(null!=that.markerTime){
				clearTimeout(that.markerTime);
			}
			that.markerTime = setTimeout(function(){
				if(newZoom>=17){
					that.updatepoiMarker();
				}else{
					that.hide_showPoiMarker();
				}
			}, 2000);
		});
		
		TMEvent.addListener(this.cMap.map, "moveend",function(centerPoint){
			var zoom = that.cMap.map.zoom;
			if(null!=that.markerTime){
				clearTimeout(that.markerTime);
			}
			that.markerTime = setTimeout(function(){
				if(zoom>=17){
					that.updatepoiMarker();
				}
			},2000);
		});

		if(MAP_ENGINE_TYPE == 1){
			this.initClusterParams();
		}else if(MAP_ENGINE_TYPE == 2){
			this.startCluster();
		}
		//图例
		this.onZoomChange(this);
		// 绑定地图移动事件
		this.cMap.changeSize();
	},
	initpoiMarker : function(MaxLon,MinLon,MaxLat,MinLat){
		var that = this;
		that.user_show_markers_bak = that.user_show_markers;
		that.user_show_markers = {};
		that.user_data = {};
		JAjax("poi/tbOrgPoiAction!findTbOrgPoiByMove.action", {
			"requestParam.equal.entId" : KCPT.user.entId,
			"requestParam.equal.MaxLon" : MaxLon*6000000,
			"requestParam.equal.MinLon" : MinLon*6000000,
			"requestParam.equal.MaxLat" : MaxLat*6000000,
			"requestParam.equal.MinLat" : MinLat*6000000
		}, "json", function(data){
			if(data&&data.list&&data.list.length>0){
				$(data.list).each(function(index){
					var row = data.list[index];
					that.user_data[row.pid] = row;
				});
				
				for ( var value in that.user_data) {
					var row = that.user_data[value];
					if(null!=row){
						if(that.user_show_markers_bak[row.pid]){
							that.user_show_markers[row.pid] = that.user_show_markers_bak[row.pid];
							that.user_show_markers_bak[row.pid]=null;
						}else{
							that.addpoiMarker(row.pid,row.lon, row.lat, row.photoName,row.poiname);
						}
					}
				}
				
				that.hidepoiMarker();
			}else{
				that.hidepoiMarker();
			}
		}, function(){
//			$.ligerDialog.error("获取marker点失败！");
		}, true);
	},
	addpoiMarker : function(pid,lon,lat,photoName,poiname){
		var that = this;
		lon = lon/6000000;
		lat = lat/6000000;
		var lngLat = new TMLngLat(lon,lat);
		var option = new TMMarkerOptions();
		//设置坐标
		option.lnglat = lngLat;
		var poinameShort = poiname;
		if(poinameShort.length>9){
			poinameShort = poiname.substring(0,8)+"...";
		}
		option.content = "<span onclick='javascript:KCPT.VehicleMonitorObj.show_poi_detail_marker(\""+pid+"\")'><img style='width:15px;height:15px;' src='images/poimanage/"+photoName+"' /><span title='"+poiname+"' style='background-color:#fff;'>"+poinameShort+"</span></span>";
		//创建点覆盖物
		var marker= new TMHtmlOverlay( option );
//		if(lon >= bounds.Xmin && lon <= bounds.Xmax && lat >= bounds.Ymin && lat <= bounds.Ymax){
			that.user_show_markers[pid] = marker;
			that.cMap.map.overlayManager.addOverLay(marker);
//		}
	},
	show_poi_detail_marker : function(pid){
		var that = this;
		var row = that.user_data[pid];
		if(null!=row){
			var lngLat = new TMLngLat(row.lon/6000000,row.lat/6000000);
			// 放大到点数组范围
			that.cMap.map.getBestMap([lngLat]);
			
			if(that.detailPoi){
				that.htmlObj.addopenDiv.alarmstrategy_close_A_Window({id:'monitordetailPoiPop'});
        		that.detailPoi = null;
			}
			
			that.showdetailpoi(row);
		}else{
			$.ligerDialog.success("获取数据失败！");
		}
	},
	showdetailpoi : function(row){
		var that = this;
		that.detailPoi = that.htmlObj.addopenDiv.A_Window({ //弹出层的父类的iD
			id:'monitordetailPoiPop',
			dragabId: 'monitorDiv', //可拖动的范围
	        width: 258, //宽度
	        height: 291,//高度
	        load_fn: function()
	        {
	        	$(this).find("#poiAddclose").click(function(){
	        		that.htmlObj.addopenDiv.alarmstrategy_close_A_Window({id:'monitordetailPoiPop'});
	        		that.detailPoi = null;
	        	});
	        	$(this).find("#icon_img").attr("src","images/poimanage/"+row.photoName);
	    		$(this).find("#poitypeId").html(row.poitypeName);
	    		$(this).find("#poilon").html(row.lon/6000000);
	    		$(this).find("#poilat").html(row.lat/6000000);
	    		$(this).find("#poicontent").val(row.content);
	    		var poinameShort = row.poiname;
	    		if(poinameShort.length>9){
	    			poinameShort = row.poiname.substring(0,8)+"...";
	    		}
	    		$(this).find("#poiname").attr('title',row.poiname);
	    		$(this).find("#poiname").html(poinameShort);
	    		if(row.flag == "1"){
	    			$(this).find("#poiflag").attr("checked",true);
	    		}
	    		$(this).find("#poiflag").attr("disabled",true);
	        },
	        url: 'model/poimanage/detailPoi.jsp'  
		});
		
		that.htmlObj.addopenDiv.show_A_Window();
	},
	hidepoiMarker : function(){
		var that = this;
		for ( var value in that.user_show_markers_bak) {
			var markerObj = that.user_show_markers_bak[value];
			if(null!=markerObj){
				that.cMap.map.overlayManager.removeOverLay(markerObj);
				that.user_show_markers_bak[value]=null;
			}
		}
	},
	hide_showPoiMarker : function(){
		var that = this;
		for ( var value in that.user_show_markers) {
			var markerObj = that.user_show_markers[value];
			if(null!=markerObj){
				that.cMap.map.overlayManager.removeOverLay(markerObj);
			}
		}
		that.user_show_markers = {};
	},
	updatepoiMarker : function () {
		var that = this;
		var bounds = that.cMap.map.getLngLatBounds();
		that.initpoiMarker(bounds.Xmax,bounds.Xmin,bounds.Ymax,bounds.Ymin);
	},
	// 增加新的地图工具按钮
	addNewMapTool : function(button)
	{
		this.htmlObj.mapToolContainer.find("div.tool_panel").prepend(button.join(""));
	},
	initUniversallyTool : function()
	{
		var that = this, 
			clusterButton = [ '<span class="clusterButton" title="全部隐藏">'
			                , '<img src="images/map/universallyTool/jh1.png" /><a href="javascript:void(0);">全部隐藏</a></span>'
			                , '<span class="mapbtn_split">&nbsp;</span>' 
			                ], 
			rectButton = [ '<span class="rectButton" title="点击后请在地图上拉框">'
			             , '<img src="images/map/universallyTool/snap1.png" /><a href="javascript:void(0);">区域查车</a></span>'
			             , '<span class="mapbtn_split">&nbsp;</span>' 
			             ], 
			poiButton = [ '<span class="poiButton" title="查询当前地图视野范围内的地物">'
			            , '<img style="margin-top: 1px;" src="images/map/universallyTool/snap.png" /><a href="javascript:void(0);">地物搜索</a></span>'
			            , '<span class="mapbtn_split">&nbsp;</span>' 
			            ],
			saveHorizonButton = [ '<span class="saveHorizonButton" title="保存当前地图视野">'
						        , '<img src="images/map/universallyTool/mapView.png" /><a href="javascript:void(0);">保存视野</a></span>'
						        , '<span class="mapbtn_split">&nbsp;</span>' 
			                    ];
		
		this.addNewMapTool(clusterButton);
		if (checkFunction("FG_MEMU_MONITOR_AREA"))
		{
			this.addNewMapTool(rectButton);
		}
		if (checkFunction("FG_MEMU_MONITOR_OBJSEARCH"))
		{
			this.addNewMapTool(poiButton);
		}
		this.addNewMapTool(saveHorizonButton);
		
		this.htmlObj.mapToolContainer.find("span.saveHorizonButton").click(function(){
			var c = that.cMap.getCenterPoint();
			$.cookie("monitorMapCenter", [c.getLng(),c.getLat()]);
			$.cookie("monitorMapLevel", that.cMap.getCurrentZoom());
			//$.ligerDialog.alert("<div style='width:48px;height:48px;background:url(../../images/global/dialog-icons.gif) no-repeat;'></div>保存当前地图视野成功");
			$.ligerDialog.alert("保存当前地图视野成功", "提示", "success");
		});
		
		this.htmlObj.mapToolContainer.find("span.clusterButton").toggle(
			function(){
				hasCluster = false;
				that.stopCluster();
				$(this).attr("title", "全部展现").find("img").attr({"src" : "images/map/universallyTool/jh2.png"}).end()
				.find("a").text("全部展现");
			}, function()
			{
				hasCluster = true;
				that.startCluster();
				$(this).attr("title", "全部隐藏").find("img").attr({"src" : "images/map/universallyTool/jh1.png"}).end()
				.find("a").text("全部隐藏");
		}).end().find("span.rectButton").click(function()
		{
			that.startRectSearch();
		}).end().find("span.poiButton").click(function()
		{
			that.showPoiSearchDiv(this);
		}).end().find("span.alarmSound").toggle(function()
		{
			$(this).find("img").attr("src", "images/maptool/alarm-off.png").end().find("a").text("报警");
			$(this).find("img").attr("title", "静音");
			$(this).find("a").attr("title", "报警");
			KCPT.alarmVoice = false;
		}, function()
		{
			$(this).find("img").attr("src", "images/maptool/alarm-on.png").end().find("a").text("静音");
			$(this).find("img").attr("title", "报警");
			$(this).find("a").attr("title", "静音");

			KCPT.alarmVoice = true;
		}).end().find("span.shishijiaotong").toggle(function(){
			if(that.traffic_event){  
				that.traffic_event.openTraffic();  
			}else{  
		    	that.traffic_event = new TMTraffic({map:that.cMap.map});  
		    	that.traffic_event.openTraffic();//打开实时交通 
		    }
		},function(){
			if(that.traffic_event){  
				that.traffic_event.closeTraffic();//关闭实时交通和事件  
		    }
		});
	},

	showPoiSearchDiv : function(obj)
	{
		var that = this, poiDiv = $("<div>");
		poiDiv.addClass("poiSearchDiv").css({
			position : "absolute",
			top : $(obj).offset().top + 26
		});
		if(that.poiSearchDiv){
			if($(this.htmlObj.mainContainer).find("div.poiSearchResultContainer").is(":hidden")){
				that.poiSearchDiv.find("div.diwu_beforeSearch").show();
				that.poiSearchDiv.find("div.diwu_afterSearch").hide();
			}
			that.poiSearchDiv.show();
		}else{
			that.poiSearchDiv = poiDiv;
			poiDiv.appendTo(this.htmlObj.mainContainer.find("div.dragDiv"));
			poiDiv.load("model/monitor/popwindows/poiSearch.html", {}, function()
			{
				$(poiDiv).find("div.searchClose").click(function()
				{
					//begin modify jiangwei bug-YYPT-81  如果调用remove在ie8会报内存错误所以调用hide  at:20120911
					$(that.poiSearchDiv).hide();
//					$(poiDiv).remove();
					//end modify jiangwei bug-YYPT-81  如果调用remove在ie8会报内存错误所以调用hide  at:20120911
				}).end().find("div.diwu_afterSearch a").click(function()
				{
					that.poiSearchDiv.find("div.diwu_beforeSearch").show();
					that.poiSearchDiv.find("div.diwu_afterSearch").hide();
				}).end().find("div.diwu_list_table a").click(function()
				{
					var keyword = $(this).text();
					that.compilPoiSearch(keyword,obj);
				}).end().find("input[name=poiSearchButton]").click(function()
				{
					var keyword = $(poiDiv).find("input[name=poiSearchKeyWord]").val();
					that.compilPoiSearch(keyword,obj);
				});
			});
		}
		
		
	},
	compilPoiSearch : function(keyword,obj)
	{
		if(!keyword) {
			$.ligerDialog.alert("请输入关键字", "提示", "error");
			return false;
		}
		if(this.cMap.getLevel() < 2) {
			$.ligerDialog.alert("地图级别过小", "提示", "error");
			return false;
		}
		var that = this, 
			bounds = this.cMap.map.getLngLatBounds(), 
			rectStr = bounds.Xmin + " " + bounds.Ymin + "," + bounds.Xmax + " " + bounds.Ymax;
			resultContainerObj = $(this.htmlObj.mainContainer).find("div.poiSearchResultContainer");
		
		resultContainerObj.css({
			top : $(obj).offset().top + 26
		});
			
		this.poiSearchCurPage = 1;
		this.poiSearchParamsCache = {
//         	 kind : "2070301",
			 bound : rectStr,
			 word : keyword,
			 pageNo : that.poiSearchCurPage,
			 pageSize : that.poiSearchPageSize
		};
		this.poiSearch(this.poiSearchParamsCache);
		/** 如果查询参数变化,重新给页码赋值  add by t_f 2012_05_23  start **/
		if(keyword!=lastKeyWord)
		{
			$(resultContainerObj).find("li.pageNum ").each(function(i){				
				$(this).find("a").text(i+1);		
				if(i==0)
				{
					$(this).attr("class", "pagination_selected pageNum");
				}else{
					$(this).attr("class", "pagination_blank pageNum");
				}
			});
		}
		lastKeyWord = keyword;
		/** 如果查询参数变化,重新给页码赋值  add by t_f 2012_05_23 end .css("top",110+"px")**/
		this.poiSearchDiv.find("div.diwu_afterSearch label.searchCondition").text(keyword);
		resultContainerObj.show().height($(this.htmlObj.mapContainer).height()-10)
			.find("div.poiSearchResult").height($(this.htmlObj.mapContainer).height() - 85).end()
			.find("div.searchClose").click(function()
			{
				that.removePoiMarkers();
				$(that.poiSearchDiv).hide();
				resultContainerObj.hide();
			}).end();
	
	},
	poiSearch : function(param)
	{
		var that = this;
		var lss = new TMServiceCLS(param);
		lss.doSearch(param,function(result){
			that.compilePoiSearchResult(result,param.pageNo,param.pageSize);
		});
	},
	removePoiMarkers : function()
	{
		var that = this;
		$(this.poiMarkerIdCache).each(function()
		{
			that.cMap.removeMarker(this);
		});
	},
	compilePoiSearchResult : function(data, pageNo, pageSize)
	{
		var that = this, 
			map = this.cMap, 
			resultContainerObj = $(this.htmlObj.mainContainer).find("div.poiSearchResultContainer"), 
			points = [],
			totalRecords = data.resultCount,
			page = (parseInt(data.resultCount / pageSize))+((data.resultCount % pageSize) > 0 ? 1 : 0), 
			curPage = pageNo ;
		if (!page)
		{
			page = parseInt(totalRecords / this.poiSearchPageSize);
			page = (totalRecords % this.poiSearchPageSize) > 0 ? page + 1 : page;
		}
		/**初使分页按钮 如果页数为0 只显示一页  add by t_f 2012_05_23   --------start  **/
	
		if(page <= 1){
			resultContainerObj.find("div.paginations ul li:eq(2)").hide();
			resultContainerObj.find("div.paginations ul li:eq(3)").hide();
			resultContainerObj.find("div.paginations ul li:eq(4)").hide();
			resultContainerObj.find("div.paginations ul li:eq(1) a").text("1");
		}else	if(page == 2)
		{
			resultContainerObj.find("div.paginations ul li:eq(2)").show();
			resultContainerObj.find("div.paginations ul li:eq(3)").hide();
			resultContainerObj.find("div.paginations ul li:eq(4)").hide();
			$(resultContainerObj).find("li.pageNum a").each(function(i){				
				$(this).text(i+1);
			});		
		}else	if(page == 3)
		{
			resultContainerObj.find("div.paginations ul li:eq(2)").show();
			resultContainerObj.find("div.paginations ul li:eq(3)").show();
			resultContainerObj.find("div.paginations ul li:eq(4)").hide();
			$(resultContainerObj).find("li.pageNum a").each(function(i){				
				$(this).text(i+1);
			});
		}else	if(page > 3)
		{
			resultContainerObj.find("div.paginations ul li:eq(2)").show();
			resultContainerObj.find("div.paginations ul li:eq(3)").show();	
			resultContainerObj.find("div.paginations ul li:eq(4)").show();
			
		}
		/**初使分页按钮 如果页数为0 只显示一页  add by t_f 2012_05_23  ---------end **/	
		
		/**分页按钮   add by t_f 2012_05_23  ------start**/
		$(this.htmlObj.mainContainer).find("div.poiSearchResultContainer")
		.find("div.paginations > ul > li.pagination_last").unbind("click").click(function()
		{		
			//左侧<单击事件
			var textFirst = parseInt($(resultContainerObj).find("li.pageNum:eq(0) > a").text());				
			var curPage = parseInt($(resultContainerObj).find("li.pagination_selected > a").text())-1;
		
			if (curPage  > 0)
			{
				that.poiSearchParamsCache["pageNo"] = curPage ;
				that.poiSearchCurPage = curPage ;
				that.poiSearch(that.poiSearchParamsCache);
				$(resultContainerObj).find("li.pageNum").each(function(i){
					if(textFirst > 1) {
						$(this).find("a").text(textFirst + i - 1);
					}
					if($(this).find("a").text()==curPage)
					{
						$(this).attr("class", "pagination_selected pageNum");
						$(this).siblings(".pageNum").attr("class", "pagination_blank pageNum");
					}
				});
			}
			
		}).end()
		.find("div.paginations > ul > li.pageNum").unbind("click").click(function()
		{
			//页码按钮单击事件
			var curPage = that.poiSearchCurPage;
			var textValue = $(this).find("a").text();
			that.poiSearchParamsCache["pageNo"] = textValue;					
			that.poiSearch(that.poiSearchParamsCache);
			$(this).attr("class","pagination_selected pageNum").siblings(".pageNum").attr("class","pagination_blank pageNum");
		}).end()			
		.find("div.paginations > ul > li.jumpPage").unbind("click").click(function()		
		{
			//按钮翻页						
			var textLast = parseInt($(resultContainerObj).find("li.pageNum:eq(2) > a").text());
			var vernier = page - textLast;
			vernier = parseInt(vernier > -1 ? (vernier > 3 ? 3 : vernier) : 0);
			$(resultContainerObj).find("li.pageNum").each(function(i){
				var cur = parseInt($(this).find("a").text()) + vernier;
				$(this).find("a").text(cur);
			});
	
			if(parseInt($(resultContainerObj).find("li.pageNum:eq(0) a").text())>parseInt($(resultContainerObj).find("li.pagination_selected > a").text()))
			{
				$(resultContainerObj).find("li.pageNum:eq(0)").trigger("click");
			}else
			{
				$(resultContainerObj).find("li.pagination_selected").trigger("click");
			}
		}).end()
		.find("div.paginations > ul > li.pagination_next").unbind("click").click(function()
		{	
			//右侧>单击事件
			var textLast = parseInt($(resultContainerObj).find("li.pageNum:eq(2) > a").text());			
			var curPage = parseInt($(resultContainerObj).find("li.pagination_selected > a").text())+1;
			if (curPage <= page)
			{
				that.poiSearchParamsCache["pageNo"] = curPage ;
				that.poiSearchCurPage = curPage ;
				that.poiSearch(that.poiSearchParamsCache);
				$(resultContainerObj).find("li.pageNum").each(function(i){
					if(textLast < page) {
						$(this).find("a").text(textLast + i - 1);
					}
					if($(this).find("a").text()==curPage)
					{
						$(this).attr("class", "pagination_selected pageNum");
						$(this).siblings(".pageNum").attr("class", "pagination_blank pageNum");
					}
				});
			}
		});
	/**分页按钮   add by t_f 2012_05_23  ------end**/
//		if (!curPage)
//		{
//			curPage = this.poiSearchCurPage;
//		}
		this.poiSearchPage = page;
		var errorText = "查询没有结果";
		if ($(data).find("Error").text())
		{
			errorText = $(data).find("Error").text();
			totalRecords = 0;
			this.poiSearchPage = 0;
			this.poiSearchCurPage = 0;
		}

		this.poiSearchDiv.find("div.diwu_beforeSearch").hide();
		this.poiSearchDiv.find("div.diwu_afterSearch").show();
		
		this.removePoiMarkers();
		if (data.resultInfo.length > 0)
		{
			resultContainerObj.find("div.poiSearchResult").html("");
			$(data.resultInfo).each(function(i)
			{
				var name = this.name, address = this.address, telphone = "", lon = this.x, lat = this.y;
				that.addRecord(i, name, address, telphone, lon, lat);
				points.push(lon);
				points.push(lat);
			});
			// 放大到点数组范围
			map.getBestMaps(points);
		} else
		{
			resultContainerObj.find("div.poiSearchResult").html(errorText);
		}
	},
	addRecord : function(num, name, address, telphone, lon, lat)
	{
		var that = this, map = this.cMap, resultContainerObj = $(this.htmlObj.mainContainer).find("div.poiSearchResult"), imgurl = "images/addressMarker/character/char_" + num + ".png", blue_imgurl = "images/addressMarker/blueCharacter/blueChar_" + num + ".png";
		name = null2blank(name);
		address = null2blank(address);
		telphone = null2blank(telphone);
		var div0 = $("<div>"), img = $("<img>"), div1 = $("<div>"), content = "<span  title='" + name + "' style='color:#0070ee;padding-top: 3px;'>名称:" + name + "</span><span style='padding-top: 3px;' title='" + (telphone ? telphone : "") + "'>电话:" + (telphone ? telphone : "")
				+ "</span><span style='padding-top: 3px;' title='" + address + "'>地址:" + address + "</span>", addition = "";
		content = content + addition;
		if (num % 2 != 0)
			div0.addClass("lresBoxover");
		div0.addClass("searchAroundRecord");
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
			var _marker = map.addMarker(markerParam);
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
	},
	addPoint : function(name, address, lon, lat, imgurl, telphone)
	{
		var that = this, map = this.cMap, id = new Date().valueOf() + "_" + Math.random() * 1000, tip = "<div >" + "<table width='100%' cellspacing='0' align='center'  cellpadding='0'>" 
		+ "<tr height='21px'> <td><h5><font style='line-height:120%'>名称:" + name + "</font></h5></td> </tr>" 
		+ "<tr height='21px'> <td><h5><font style='line-height:120%'>地址:" + address + "</font></h5></td> </tr>"
		+ "<tr height='21px'> <td><h5><font style='line-height:120%'>电话:" + telphone + "</font></h5></td> </tr>" + "</table></div>";

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
		var _marker = map.addMarker(markerParam);
		that.poiMarkerIdCache.push(id);
	},

	rectAcreage : function(bounds)
	{
		var minX = bounds.Xmin, 
			minY = bounds.Ymin, 
			maxX = bounds.Xmax, 
			maxY = bounds.Ymax, 
			points = [ 
	           new TMLngLat(minX, minY), 
               new TMLngLat(minX, maxY),
               new TMLngLat(maxX, maxY), 
               new TMLngLat(maxX, minY)
			],
            acreage = TMPolygonTool.getPointsArea(points);
		return acreage;
	},
	startRectSearch : function()
	{
		var that = this, map = that.cMap.map;
		if(that.cMap.mtool){
			that.cMap.mtool.close();	
			that.cMap.mtool = null;
		}
		var option=new TMRectToolOptions();
		option.map=map;
		that.cMap.mtool = new TMRectTool(option);
		that.cMap.mtool.open();
		
		if (that.rectInfoWinCache) that.rectInfoWinCache.remove();
		if (that.rectCache) map.removeOverLay(that.rectCache, true);
		TMEvent.bind(that.cMap.mtool, "drawend", map, function(rect)
		{
//			var acreage = that.rectAcreage(bounds);
//			if(acreage/1000000 > that.regionSearchRectAcreageLimit){
//				alert("拉框面积" + acreage/1000000 + "平方千米,不能大于"+that.regionSearchRectAcreageLimit+"平方千米");
//				control.clear();
//				return false;
//			}
			bounds=rect.getBounds();
			that.cMap.mtool.clear();
			that.cMap.mtool.close();
			that.cMap.mtool=null;		
			map.setMapCursor(_map_cur[0],_map_cur[1]);
			that.rectSearch(bounds);
		});
	},
	rectSearch : function(bounds)
	{
		var that = this, 
			map = this.cMap.map, 
			infoWinHtml = this.getRectSearchHtml(), 
			poplayer = {
				position : "absolute",
				width : 'auto',
				height : 'auto',
				left : 600,
				top : 300,
				zIndex : 3800
			};
		var option=new TMRectOptions();
		option.bounds=bounds;
		that.rectCache = new TMRectOverlay(option);
		map.addOverLay(that.rectCache);
		var popwin = $("<div>");
		popwin.css({
			"position" : poplayer.position,
			"width" : poplayer.width,
			"height" : poplayer.height,
			"left" : poplayer.left,
			"top" : poplayer.top,
			"z-index" : poplayer.zIndex
		});
		popwin.html(infoWinHtml);
		$("#mainDiv").append(popwin);
		popwin.draggable({
			cursor : 'move',
			containment : $("#mainDiv")
		});
		this.rectInfoWinCache = popwin;

		this.bindRectSearchTipEvent(bounds);
	},
	getRectSearchHtml : function()
	{
		var vehicleTypes = KCPT.GeneralCode["SYS_VEHICLE_TYPE"], vehicleTypesOptions = "";
		$(vehicleTypes).each(function()
		{
			if (this)
			{
				vehicleTypesOptions += "<option value='" + this.code + "'>" + this.name + "</option>";
			}
		});
		var html = [ 
		          '<div class="xiecha">'
		        ,	'<div class="xiecha_top">'
		        , 		'<label>区域查车</label>'
		        , 		'<div class="closeTipWindow">'
		        , 			'<img src="images/tipWindow/regional_xiecha_top_close.jpg" />'
		        , 		'</div>'
		        , 	'</div>'
		        , 	'<div class="xiecha_box">'
//		             '<div class="xiecha_main_1">',
//		             '<label>车辆类型：</label>',
//				'<select style="width:150px" name="vehicleType">'
//		        ,	'<option value="" >全部</option>'
//				,	vehicleTypesOptions
//				, 	'</select>', 
//				'</div>'
		        ,		'<div class="xiecha_main_1">'
		        , 			'<label>车辆速度：</label>'
		        , 			'<select name="speedTerm">'
		        , 				'<option value="0">大于等于</option>'
		        , 				'<option value="1">小于</option>'
		        , 			'</select>'
		        , 			'<input style="width:30px;" type="text" name="speed" value=0 />公里/小时'
		        , 		'</div>'
				,		'<div class="xiecha_main_1">'
				, 			'<label>是否报警：</label>'
				, 			'<input type="checkbox" class="checkbox" name="alarmStatus" />'
				, 			'<h2 class="alertMessage"></h2>'
				,		'</div>'
				,		'<div class="xiecha_main_3 startRectSearch" style="margin-left:74px;">查询</div>'
				, 	'</div>'
				, '</div>' 
			];
		return html.join("");
	},
	bindRectSearchTipEvent : function(bounds)
	{
		var that = this, map = this.cMap.map, tipDiv = this.rectInfoWinCache;
		$(tipDiv)
				.find("div.closeTipWindow")
				.click(function()
				{
					that.rectInfoWinCache.remove();
					map.removeOverLay(that.rectCache, true);
				})
				.end()
				.find("input[name=speed]").blur(function(){
					if(isNaN($(this).val())){
						$(tipDiv).find("h2.alertMessage").text("请输入数字");
						return false;
					}else
						$(tipDiv).find("h2.alertMessage").text("");
				}).end()
				.find("div.startRectSearch")
				.click(
						function()
						{
							var vehicleType = ($(tipDiv).find("select[name=vehicleType]").val())
							,	speedTerm = ($(tipDiv).find("select[name=speedTerm]").val())
							,	speed = $(tipDiv).find("input[name=speed]").val() * 10
							,	alarmStatus = $(tipDiv).find("input[name=alarmStatus]").attr("checked") ? "1" : "0"
							,	emphasisStatus = $(tipDiv).find("input[name=emphasisStatus]").attr("checked") ? "1" : "0"
							, 	param = [
								        {name: "requestParam.equal.vehicleType", value: (vehicleType ? vehicleType : "")}
								    ,	{name: "requestParam.equal.lCoordinate", value: (new Number(bounds.Xmin).toFixed(5) + "," + new Number(bounds.Ymin).toFixed(5))}
								    ,	{name: "requestParam.equal.rCoordinate", value: (new Number(bounds.Xmax).toFixed(5)+ "," + new Number(bounds.Ymax).toFixed(5))}
								    //begin modify 姜威 bt-438  区域查车车速需要乘以十 at 2012-7-19
								    ,	{name: "requestParam.equal.ltSpeed", value: ((speedTerm == 1) ? speed : "")}
								    ,	{name: "requestParam.equal.gtSpeed", value: ((speedTerm == 0) ? speed : "")}
								    //end modify 姜威 bt-438  区域查车车速需要乘以十 at 2012-7-19
								    ,	{name: "requestParam.equal.alarmStatus", value: ((alarmStatus ? alarmStatus : "0"))}
								    ,	{name: "requestParam.equal.emphasis", value: (emphasisStatus ? emphasisStatus : "")}
							    ];
							//修改BUG YYPT-277
//							$("#monitor_left_tree_form").find(".btn_green").trigger("click");
							that.monitorTree.reloadGrid(param, "monitor/findVehicleByArea.action");
							$("#monitorTreeLeft").find("li:eq(1)").trigger("click");
							that.rectInfoWinCache.remove();
							map.removeOverLay(that.rectCache, true);
						});
	},
	stopCluster : function()
	{
    	TMRichLayer.unBindMap();
    	clearInterval(clusterTimer);
	},
	startCluster : function()
	{
		var that = this;
		var s = null;
		s=setTimeout(function(){
			that.initClusterMap();
			clearTimeout(s);
		},3000);
		clusterTimer=setInterval(function(){
			TMRichLayer.unBindMap();
			that.initClusterMap();
		},that.clusterTimerDelay);
	},
//	showLabelTip: function(vNo, lnglat){
//		if(this.vehicleLabelTip){
//			this.vehicleLabelTip.setLngLat(lnglat);
//		}else{
//			var pOvrLy = new TMPointOverlay(lnglat,null,[0.7,-0.5]);//[1,-0.5]
//	        pOvrLy.setLabel(vNo ? vNo : "无车牌号");
//	        pOvrLy.setNoWrap(false);
//	        this.vehicleLabelTip = pOvrLy;
//	        this.cMap.map.addOverLay(pOvrLy);
//		}
//	},
//	removeLabelTip: function(){
//		this.cMap.map.removeOverLay(this.vehicleLabelTip);
//	},
	initClusterMap : function()
	{
		var that = this;
		var config = {
				baseUrl : "http://"+MAP_TMRichLayer_URL+"/RTCarService/",
				map : this.cMap.map,
				types : "",
			 	nodeids :KCPT.user.entId,//119378 KCPT.user.entId,
				alarmcodes : "",
				cluster : 1,  //0|1,是否支持抽稀
				large : 0,    //0|1,大小图标切换
				grid : 2
			};
			//如果当前用户parentEntId为-1 最大权限 ，那么地图直接显示全部聚合点，聚合服务不进行组织查询
			if(KCPT.user.parentEntId != "-1"){
				config["nodeids"] = KCPT.user.entId;
			}

			TMRichLayer.bindMap(config);
			TMEvent.addListener(TMRichLayer,"click",function(obj,lnglat){
				if(obj && obj.length > 0)
					that.showTipWindow(obj[0]["id"], new TMLngLat(lnglat.Longitude, lnglat.Latitude), null, null, true);
			});
		//this.onZoomChange(this);
	},
	onZoomChange : function(obj)
	{
		var legend = obj.initLegend();
		obj.initLegendControl(legend);
	},
	/**
	 * 绑定聚合图最后一级动作
	 * 
	 * @return
	 */
	bindMarkersInBound : function()
	{
		if (this.cMap)
		{
			var z = this.cMap.getCurrentZoom(), bounds = this.cMap.getLngLatBounds();
			if (parseInt(z) > this.secondClusterLevel.max)
			{
				this.updateBoundMarkers(bounds);
			} else
			{
				this.removeBoundMarkers();
			}
		}
	},
	updateBoundMarkers : function(bounds)
	{
		var that = this, arrLnglat = bounds.split(";");
		// this.removeBoundMarkers();//每次查询清除上次查询的marker
		JAjax("monitor/findHorizonMarkers.action", {
			"requestParam.equal.lCoordinate" : arrLnglat[0],
			"requestParam.equal.rCoordinate" : arrLnglat[1]
		}, 'json', function(data, error)
		{
			if (data && data.error)
			{
				// alert(data);
			} else
			{
				var dataLimit = [];
				$(data).each(function(i)
				{
					if (i < 200 && this)
					{// 最多添加200个点
						this.vid = "boundMarker_" + this.vid;
						if (inArray(this.vid, that.cache.boundMarkersId) < 0 && inArray(this.vid.split("_")[1], that.cache.vehiclesToBeRollPosition) < 0)
						{
							that.cache.boundMarkersId.push(this.vid);
							that.cache.boundMarkerCache[this.vid] = this;
						}
					}
				});
				for ( var i in that.cache.boundMarkerCache)
				{
					var v = that.cache.boundMarkerCache[i], marker = that.cMap.getMarker(v.vid);
					if (marker && marker.getLngLat())
					{
						if (!that.cMap.containsPoint(marker.getLngLat()))
						{
							that.cMap.removeMarker(v.vid);
							delete that.cache.boundMarkerCache[v.vid];
							// 可以在完全退出第三级时再来删除，会判断是否有vid对应的marker，有则删，没有就跳过
							 var pos = $.inArray(this.vid,
							 that.cache.boundMarkersId);
							 that.cache.boundMarkersId.splice(pos,1);
						} else
						{
							dataLimit.push(v);
						}
					} else
					{
						dataLimit.push(v);
					}
				}
				;
				that.addMarkers(dataLimit, false, "cluster");
			}
		}, function(data, error)
		{
			// alert(data);
		});
	},
	removeBoundMarkers : function()
	{
		var that = this;
		$(this.cache.boundMarkersId).each(function(i)
		{
			if (that.cMap)
			{
				that.cMap.removeMarker(this);
				var pos = inArray(this, that.cache.boundMarkersId);
				that.cache.boundMarkersId.splice(pos, 1);
			}
		});
		this.cache.boundMarkersId.length = 0;
	},
	initLegendControl : function(legend)
	{
		var that = this;
		var legend_button_html = "";
		if (legend.loaded)
			legend_button_html = ('<img src="images/map/legend/open_legend.png"/>');
		else
			legend_button_html = ('<img src="images/map/legend/close_legend.png"/>');
		if ($("#copyright_legendBtn"))
			$("#copyright_legendBtn").remove();

		var cr = new TMCopyrightControl();
    	cr.addCopyright({
    		id: "legendBtn",
    		content: legend_button_html,
    		bounds: new TMLngLatBounds([new TMLngLat(10,30),new TMLngLat(160,80)])
    	});  
    	cr.setLeft(0);
    	cr.setBottom(13);
    	$(cr.div).css({"cursor":"pointer"});
		this.cMap.map.addControl(cr);
		$(cr.div).click(function(e)
		{
			TMEvent.cancelBubble(e);
			if (!that.isLegendShow)
			{
				$("#copyright_legendBtn").html('<img src="images/map/legend/close_legend.png"/>');
				legend.setVisible(true);
				that.isLegendShow = true;
			} else
			{
				$("#copyright_legendBtn").html('<img src="images/map/legend/open_legend.png"/>');
				legend.setVisible(false);
				that.isLegendShow = false;
			}
		});
	},
	initLegend : function()
	{
		var legend_html = "", legendLevel = this.cMap.getCurrentZoom();

		/*2012-03-13 jxf 修改图列样式*/
		//legend_html = ('<img src="images/map/legend/1-10.png"/>');
		
		legend_html =  ('<div style="width:306px;"><div style="width:296px;height:25px;line-height:25px;color:#FFF;background-image:url(images/map/legend/top-bg.png);padding-left:10px;">图例</div>');
		legend_html += ('<div style="clear:both;width:306px;height:125px;background-image:url(images/map/legend/1-10.png)"></div></div>');

		if ($("#legend_monitor"))
			$("#legend_monitor").remove();

		var legend = document.createElement("div");
		$(legend).attr("id", "legend_monitor");
		$(legend).css({
			"z-index" : "9998"
		});
		legend.innerHTML = legend_html;
		
		var cr = new TMCopyrightControl();
    	cr.addCopyright({
    		id: "legendPanel",
    		content: legend_html,
    		bounds: new TMLngLatBounds([new TMLngLat(10,30),new TMLngLat(160,80)])
    	});  
		cr.setLeft(0);
		cr.setBottom(13);
		if (this.isLegendShow)
			cr.setVisible(true);
		else
			cr.setVisible(false);
		this.cMap.map.addControl(cr);
		return cr;
	},
	showVehicleSubFunctionWin : function(vid)
	{
		var that = this;
		JAjax("monitor/findMarkers.action", {
			idArrayStr : vid
		}, 'json', function(data, err)
		{
			var points = [];
			$(data).each(function()
			{
				if (this)
				{
					var vehicle = {
						vid : this.vid,
						vehicleno : this.vehicleno,
						head : this.head,
						isOnline : this.isonline,
						maplon : this.maplon,
						maplat : this.maplat
					}, selectableFuns = [];
					// 轨迹回放
					if (checkFunction("FG_MEMU_MONITOR_LOCUS"))
					{
						selectableFuns.push("pathButton");
					}// 调度信息
					if (checkFunction("FG_MEMU_MONITOR_MAP_INFO"))
					{
						selectableFuns.push("scheduleButton");
					}// 拍照
					if (checkFunction("FG_MEMU_MONITOR_PHOTOGRAPH"))
					{
						selectableFuns.push("photoButton");
					}
					if (checkFunction("FG_MEMU_MONITOR_VIEW"))
					{
						selectableFuns.push("cameraButton");
					}
					if (checkFunction("FG_MEMU_MONITOR_FACILITY"))
					{
						selectableFuns.push("searchAroundButton");
					}
					if (checkFunction("FG_MEMU_MONITOR_MONITOR"))
					{
						selectableFuns.push("normalMonitorButton");
					}
					if (checkFunction("FG_MEMU_MONITOR_EMPHASIS"))
					{
						selectableFuns.push("stressMonitorButton");
					}
					that.initVehicleWindow("pathButton", vehicle, selectableFuns);
				}
			});
		}, function(data, err)
		{
			// alert("查询车辆实时信息错误");
		});
	},
	initTree : function()
	{
		this.monitorTree = new monitorTree({
			monitorObj:this
		});
	},

	// 全屏功能
	fullScreen : function()
	{
		var that = this, fullScreenButton = this.htmlObj.mapToolContainer.find("span.fullscreen");
		fullScreenButton.toggle(function()
		{
			$(this).find("img").attr("src", "images/maptool/outfullscreen.png").end().find("a").text("退出全屏");
			if (that.htmlObj.northContainer)
				that.htmlObj.northContainer.hide();
			if (that.htmlObj.footContainer)
				that.htmlObj.footContainer.hide();
			if (that.htmlObj.leftContainer.css("display") != "none")
				that.htmlObj.leftContainer.hide();
			if (that.htmlObj.mainContainer.find("div.leftShrink").css("display") != "none")
				that.htmlObj.mainContainer.find("div.leftShrink").hide();
			if (that.htmlObj.bottomContainer)
				that.htmlObj.bottomContainer.hide();
			
			that.onResize();

		}, function()
		{		
			$(this).find("img").attr("src", "images/maptool/fullscreen.png").end().find("a").text("全屏");
			if (that.htmlObj.northContainer)
				that.htmlObj.northContainer.show();
			if (that.htmlObj.footContainer)
				that.htmlObj.footContainer.show();
			if (that.htmlObj.mainContainer.find("div.leftShrink").css("display") == "none")
				that.htmlObj.mainContainer.find("div.leftShrink").show();
			if (that.htmlObj.leftContainer.css("display") == "none"&&that.htmlObj.bottomContainer.css("left")!="0px"){
				that.htmlObj.leftContainer.show();
			}
			if (that.htmlObj.bottomContainer)
				that.htmlObj.bottomContainer.show();

			that.onResize(true);
//			KCPT.first.onResize();
		});
	},
	onResize : function(obj)
	{
		var that = this;
		var center = getHeightAndWidth();
		var resultContainer = $(that.htmlObj.mainContainer).find("div.poiSearchResultContainer");
		var poiSearchDiv = $(that.htmlObj.mainContainer).find("div.poiSearchDiv");
		var miniVehiclePopWindow = that.htmlObj.mainContainer.find("div.miniVehiclePopWindow");
		var monitorDiv = $("#monitorDiv");
		if(monitorDiv.css("display") != "none"){
			if(that.htmlObj.leftContainer.css("display") == "none" && that.htmlObj.footContainer.css("display") == "none"){
				if (that.htmlObj.rightContainer)
				{
					that.htmlObj.rightContainer.height(center.height + KCPT.headerHeight + KCPT.footerHeight)// that.htmlObj.mainContainer.height()
					.width(center.width);
				}
				that.htmlObj.mapContainer.width(center.width);
				that.htmlObj.mapContainer.height(center.height + KCPT.headerHeight + KCPT.footerHeight - 28);
				resultContainer.css('top',29);
				poiSearchDiv.css('top',29);
				miniVehiclePopWindow.css('top',29);
				that.htmlObj.vehiclePopWindow.css('top',29);
			}else if(that.htmlObj.leftContainer.css("display") == "none"){
				this.htmlObj.bottomContainer.width(center.width - 1);
				this.htmlObj.rightContainer.width(center.width - 1);
				this.htmlObj.mapContainer.width(center.width - 1);
				this.htmlObj.rightContainer.height(center.height - 5);
				this.htmlObj.mapContainer.height(center.height - 35);
				this.htmlObj.bottomContainer.width(center.width - 1);
				resultContainer.css('top',113);
				poiSearchDiv.css('top',113);
				miniVehiclePopWindow.css('top',113);
				that.htmlObj.vehiclePopWindow.css('top',113);
			}else{
				this.htmlObj.bottomContainer.width(center.width - 301);
				this.htmlObj.rightContainer.width(center.width - 301);
				this.htmlObj.mapContainer.width(center.width - 301);
				this.htmlObj.rightContainer.height(center.height - 5);
				this.htmlObj.mapContainer.height(center.height - 35);
				this.htmlObj.bottomContainer.width(center.width - 301);
				resultContainer.css('top',113);
				poiSearchDiv.css('top',113);
				miniVehiclePopWindow.css('top',113);
				that.htmlObj.vehiclePopWindow.css('top',113);
			}
			if (that.cMap)
				that.cMap.changeSize();
			
			resultContainer.height($(this.htmlObj.mapContainer).height()-10);
			resultContainer.find("div.poiSearchResult").height($(this.htmlObj.mapContainer).height() - 85);
			var vehiclePopheight = $(this.htmlObj.mapContainer).height();
			if(vehiclePopheight > 609){
				$("#monitor_vehiclePopWindow").height(609);
			}else{
				$("#monitor_vehiclePopWindow").height(vehiclePopheight);
			}
		}
//		var width = $(window).width() > 1020?$(window).width():1020;
//		var that = this, 
//			leftShrinkDiv = this.htmlObj.mainContainer.find("div.leftShrink"), 
//			bottomShrinkDiv = this.htmlObj.mainContainer.find("div.udShrink"), 
//			conterHeight = this.htmlObj.northContainer.css("display") == "none" ? $(window).height() : KCPT.root.getCenterSize().height+28, //导航条的高度为28
//			conterWeight = this.htmlObj.leftContainer.css("display") == "none" ? width : width-300;// KCPT.root.getCenterSize().width;
//			
//		if(!obj){
//			leftShrinkDiv.show().css("position", "absolute").find("img").css("padding-top", (conterHeight / 2) + "px");
//		}
//		this.htmlObj.rightContainer.width(conterWeight - 10 - 4 + 8 + 2); //+ 4
//		this.htmlObj.rightContainer.height(conterHeight - 900);
//		this.htmlObj.mapToolContainer.width(conterWeight - 10 - 4 + 8 + 2);//+ 4
//		this.htmlObj.mapContainer.width(conterWeight - 10 - 4 + 8 + 2);//+ 4
//		this.htmlObj.mapContainer.height(conterHeight - 32);
//		this.htmlObj.bottomContainer.width(conterWeight - 10 - 4 + 8);//+ 4
//			
//		this.htmlObj.bottomContainer.css("top", conterHeight - this.htmlObj.bottomContainer.height() - 4);
//		
//		if(this.bottom_AlarmList){
//			var g = this.bottom_AlarmList.getCurGridManager();
//			g.loadData(true);
//		}
//		this.htmlObj.bottomContainer.find("div.monitor_maframe").width(conterWeight - 12 - 4 - 60);
//		
//		var poiSearchButton = this.htmlObj.mapToolContainer.find("span.poiButton"), poiSearchDiv = this.htmlObj.mainContainer.find("div.poiSearchDiv"), resultContainer = $(this.htmlObj.mainContainer).find("div.poiSearchResultContainer");
//		if (poiSearchDiv.length > 0 && poiSearchButton.length > 0)
//		{
//			var poiSearchDivTop = poiSearchButton.offset().top + 26, poiSearchDivLeft = poiSearchButton.offset().left;
//			poiSearchDiv.css({
//				top : poiSearchDivTop
//				
//			});
//			if (resultContainer.length > 0)//.css({		top : poiSearchResultTop}).left : poiSearchDivLeft
//			{
//				var poiSearchResultTop = poiSearchButton.offset().top + 26, poiSearchResultLeft = poiSearchButton.offset().left;
//				resultContainer.height(this.htmlObj.mapContainer.height()).find("div.poiSearchResult").height(this.htmlObj.mapContainer.height() - 60);
//			}
//		}
//		
//		if (this.cMap)
//			this.cMap.changeSize();
//		this.monitorTree.onReSize();
//		this.bottom_AlarmList.onResize();
		
//		this.htmlObj.vehiclePopWindow.height(this.htmlObj.mapContainer.height());
		
	},
	leftResize : function(actionType)
	{
		var that = this;
		switch (actionType)
		{
		case 'hide':
			this.htmlObj.bottomContainer.css("left", "0px");
			this.htmlObj.leftContainer.hide();
			that.onResize();
			break;
		case 'show':
			this.htmlObj.bottomContainer.css("left", "300px");
			this.htmlObj.leftContainer.show();
			that.onResize(true);
//			KCPT.first.onResize();
			break;
		}
	},
	// 显示告警信息，为首页面跳转添加
	showAlarmInfo : function()
	{
		if (KCPT.IndexToMonitor)
		{
			this.htmlObj.mainContainer.find("div.udShrink img:eq(0)").trigger('click');
		}
	},
	bottomResize : function(bottomDivShowStatus, actionType)
	{
		var that = this;
		var monitor_bottom_statements_top = $("#" + this.options.htmlElements.monitor_bottom_statements_top);
		var monitor_bottom_statements_main = $("#" + this.options.htmlElements.monitor_bottom_statements_main);
		switch (actionType)
		{
		case 'show':
			if (bottomDivShowStatus == 0)
			{
				this.htmlObj.bottomContainer.height(200);
				monitor_bottom_statements_main.show();
				monitor_bottom_statements_top.show();
				var index = this.bottom_AlarmList.getCurGridTab();
				//this.bottom_AlarmList.startTimer(index);
			} else if (bottomDivShowStatus == 1) {
				if(this.bottom_AlarmList) //this.bottom_AlarmList.getCurGridManager().setHeight(160 + 200);
					$(this.bottom_AlarmList.getAllGridManager()).each(function(){
						this.setHeight(160 + 200);
					});
				this.htmlObj.bottomContainer.height(200 * 2);
			}
			break;
		case 'hide':
			if (bottomDivShowStatus == 1)
			{
				monitor_bottom_statements_main.hide();
				monitor_bottom_statements_top.hide();
				this.htmlObj.bottomContainer.height(9);
				this.bottom_AlarmList.stopTimer();
			} else if (bottomDivShowStatus == 2) {

				if(this.bottom_AlarmList){
					$(this.bottom_AlarmList.getAllGridManager()).each(function(){
						this.setHeight(160);
					});
				}
				this.htmlObj.bottomContainer.height(this.htmlObj.bottomContainer.height() / 2);
			}
			break;
		}
	},
	bindEvent : function()
	{
		var that = this, bottomDivShowStatus = 0;
		this.htmlObj.mainContainer.find("div.leftShrink > img").toggle(function()
		{
			that.leftResize('hide');
			$(this).attr("src", "images/global/leftShrink_2.png").parent("div.leftShrink").css("left", "0px");
		}, function()
		{
			that.leftResize('show');
			$(this).attr("src", "images/global/leftShrink.png").parent("div.leftShrink").css("left", "300px");
		}).end().find("div.udShrink img:eq(0)").click(function()
		{
			if (bottomDivShowStatus >= 2)
			{
				bottomDivShowStatus = 2;
				return false;
			}
			that.bottomResize(bottomDivShowStatus, 'show');
			bottomDivShowStatus++;
		}).end().find("div.udShrink img:eq(1)").click(function()
		{
			if (bottomDivShowStatus <= 0)
			{// 完全隐藏时的点击
				bottomDivShowStatus = 0;
				return false;
			}
			that.bottomResize(bottomDivShowStatus, 'hide');
			bottomDivShowStatus--;
		}).end();
		this.htmlObj.mainContainer.find("div.udShrink img:eq(0)").trigger('click');
	},
	queryBatchMonitorData : function()
	{
		if (!batchMonitorWinIdCache || batchMonitorWinIdCache.length < 1)
			return false;
		JAjax("monitor/findPositions.action", {
			idArrayStr : batchMonitorWinIdCache.join(",")
		}, 'json', function(data, err)
		{
			$(data).each(function()
			{
				if (this && inArray(this.vid, batchMonitorWinIdCache) > -1 && KCPT.VehicleLatestStatusWindows[this.vid])
				{
					KCPT.VehicleLatestStatusWindows[this.vid].compileVehicleLatestStatus(this);
				}
			});
		}, function(data, err)
		{
			// alert("查询车辆实时信息错误");
		});
	},
	bindBottomContainerEvent : function()
	{
		var that = this, bottomTabs = this.htmlObj.bottomContainer.find("ul > li"), bottomDivs = this.htmlObj.bottomContainer.find("div.monitor_maframe");
		this.htmlObj.bottomContainer.click(function(){
			if(that.vehicleSubfunctionObj)
				that.vehicleSubfunctionObj.closeWindow(true);
		});
		bottomTabs.click(function()
		{
			if ($(this).hasClass("bdown"))
				return false;
			else
			{
				bottomTabs.each(function()
				{
					$(this).removeClass("bdown");
				});
				$(this).addClass("bdown");
				bottomTabs.each(function(i)
				{
					if ($(this).hasClass("bdown"))
						$(bottomDivs[i]).removeClass("hidden");
					else
						$(bottomDivs[i]).addClass("hidden");
				});
			}
		});
	},
	// 初始化报警列表
//	initAlarmList : function()
//	{
//		var params = {
//			container : this.htmlObj.bottomContainer,
//			userId : KCPT.user.opId,
//			alarmVoiceObj : this.htmlObj.mapToolContainer.find("span.alarmSound")
//		};
//		var al = new AlarmList(params);
//		al.queryAlarmList();
//		al.startAlarmListTimer();
//		this.setRealtimeAlarmGrid();
//		this.alarmListObj = al;
//	},
//	// 初始化车辆上下线轮询和播放
//	initLoginVehicleList : function()
//	{
//		var that = this;
//		this.startQueryVehicleListTimer();
//		this.rollVehicleListTimer = setInterval(function()
//		{
//			if(that.loginVehicleList.length > 0)
//				that.rollLoginVehicleList(that.loginVehicleList.splice(0,1));
//			else
//				that.htmlObj.leftContainer.find("div.monitorLine > div:eq(0)").find("label").text("");
//		}, that.rollVehicleListTimerDelay);
//	},
	// 开始轮询上下线车辆列表
	startQueryVehicleListTimer : function()
	{
		var that = this;
		this.queryLoginVehicleList();
		this.loginVehicleListTimer = setInterval(function()
		{
			that.queryLoginVehicleList();
		}, that.loginVehicleListLoopInterval);
	},
	// 停止轮询上下线车辆列表
	stopQueryVehicleListTimer : function()
	{
		clearInterval(this.loginVehicleListTimer);
		this.loginVehicleListTimer = null;
	},
	// 最新上下线车辆列表的查询
	queryLoginVehicleList : function()
	{
		var that = this, url = "monitor/findVehicleOnOffLine.action", param = {
			"requestParam.equal.second" : 60
		};
		JAjax(url, param, 'json', function(data)
		{
			if (data && data.Rows)
				$.merge(that.loginVehicleList, data.Rows);
			else if (!data || (data.error && data.error.length > 0))
			{
				return false;
			}
		}, function(e)
		{
		}, null, null, 10000

		);
	},
	// 滚动播放上下线车辆列表
	rollLoginVehicleList : function(newVehicle)
	{
		if(!newVehicle){
			return false;
		}
		var that = this, container = this.htmlObj.leftContainer.find("div.monitorLine > div:eq(0)"), vehicleMessage = newVehicle ? newVehicle[0]["onOffLineInfo"] : "";
		container.find("label").fadeOut('slow', function()
		{
			$(this).clone().appendTo(container).text(vehicleMessage).show();
			$(this).remove();
		});
	},
	startRollBatchMonitor : function()
	{
		var that = this;
//		if (batchMonitorWinIdCache && batchMonitorWinIdCache.length > 0)
//		{
			this.rollBatchMonitorTimer = setInterval(function()
			{
				if (!batchMonitorWinIdCache || batchMonitorWinIdCache.length < 1)
					return false;
				else
					that.queryBatchMonitorData();
			}, this.rollBatchMonitorTimerDelay);
//		}
	},
	stopRollBatchMonitor : function()
	{
		clearInterval(this.rollBatchMonitorTimer);
		this.rollBatchMonitorTimer = null;
	},
	// 轮询勾选车辆位置
	startRollSelectedVehicles : function()
	{
		var that = this;
		this.rollVehiclesSelectedTimer = setInterval(function(){
			if (that.actionFeedback)
				that.getLatestPositions(that.cache.vehiclesToBeRollPosition, false);
			//setTimeout("CollectGarbage();", 1);
		}, this.rollVehiclesSelectedTimerDelay);
			//监控页面报警列表
//			if(monitor_bottom_AlarmList){
//				//实时tab签选中时，启用轮询查询
//				if($(".monitor_bottom_statements_top").find("li").eq(5).hasClass("monitor_bottom_statements_top_tab_selected")){
//					monitor_bottom_AlarmList.startTimer(5);
//				}
//			}
	},
	stopRollSelectedVehicles : function()
	{
		clearInterval(this.rollVehiclesSelectedTimer);
		this.rollVehiclesSelectedTimer = null;
	},
	addOrRemoveMarkerForSelected : function(addFlag, vehicleIds)
	{
		if(addFlag && (this.cache.vehiclesToBeRollPosition.length + vehicleIds.length) > vehiclesInMapLimit ){
            $.ligerDialog.alert("选择车辆已达到上限!", "提示", "error");
            return false;
        }
        var that = this;
        this.stopRollSelectedVehicles();
        $(vehicleIds).each(function()
        {
            var ui = this;
            if (that.cMap.markerObj[this] && !addFlag)
            {
                //setTimeout(function(){
                    that.cMap.removeMarker(ui);
                //}, 60);
                if (that.currentTipId == ui.vid)//
                {
                    that.cMap.map.removeOverLay(that.currentTip);
                    that.currentTipId = "";
                    that.currentTip = null;
                }
            }

            var vid = this, pos = inArray(vid, that.cache.vehiclesToBeRollPosition);
            if (addFlag && pos == -1)
                that.cache.vehiclesToBeRollPosition.push(this);
            else if (!addFlag && pos > -1)
                that.cache.vehiclesToBeRollPosition.splice(pos, 1);
        });
        /*if(this.vehicleListTimer){
            clearTimeout(this.vehicleListTimer);
            this.vehicleListTimer = null;
        }
        this.vehicleListTimer = setTimeout(function(){*/
            that.getLatestPositions(that.cache.vehiclesToBeRollPosition, true);
            that.startRollSelectedVehicles();
       /* },1);*///dengwei edit  1000 -> 1
        

//        if(!addFlag && that.monitorTree)
//            $("#monitorTreeeFirst").parents("div.left_menu_main").unLoadMask();
//
//        setTimeout(function(){
//            $("#monitorTreeeFirst").parents("div.left_menu_main").unLoadMask("");
//        }, 200);
			
	},
	// 获取车辆数组的实时信息
	getLatestPositions : function(vehicleIds, ifGetBestMap)
	{

		var that = this;
		if(vehicleIds.length < 1){
			if(that.bottom_AlarmList.getCurGridTab() == 0){
				that.bottom_AlarmList.realTimeAlarmListGridManager.loadData({Rows: []});
			}else{
				return false;
			}
		}
		JAjax("monitor/findPositions.action", {
			idArrayStr : vehicleIds.join(",")
		}, 'json', function(data, err)
		{
			that.actionFeedback = true;
			if(data && !data.error)
				that.addMarkers(data, ifGetBestMap, "user");
			if(that.bottom_AlarmList.getCurGridTab() == 0)
				that.bottom_AlarmList.realTimeAlarmListGridManager.loadData({Rows: data});
		}, function(data, err)
		{
			that.actionFeedback = true;
			// alert("查询车辆实时信息错误");
		});
	},
	addMarkers : function(data, ifGetBestMap, markerIconType)
	{
		var isMapMaxLevel = false;
		var that = this, points = [];
		that.actionFeedback = true;
		var len = data.length;
		var sl = 0;
		if(len%8 > 0) sl = parseInt(len/8, 10) + 1;
		else sl = parseInt(len/8, 10);
		var subData = [];
		if(len <= 20){
		subData.push(data);
		}else{
		// dengwei edit 2012-11-10 大于20个点时,才进行分批加载显示在地图上
		for(var i = 0; i < sl; i++) {
		var arr = [];
		arr.push(data[i*8 + 0]);
		arr.push(data[i*8 + 1]);
		arr.push(data[i*8 + 2]);
		arr.push(data[i*8 + 3]);
		arr.push(data[i*8 + 4]);
		arr.push(data[i*8 + 5]);
		arr.push(data[i*8 + 6]);
		arr.push(data[i*8 + 7]);
		subData.push(arr);
		}
		}
		that.cur = 0;
		if(that.markerInterval) {
		clearInterval(that.markerInterval);
		that.markerInterval = null;
		that.cur = 0;
		//$("#monitorTreeeFirst").unLoadMask();
		}
		if(!subData || subData.length < 1) return false;
		var addmk = function(){
		var subArr = subData[that.cur];
		// that.addMarkerForSelectedVehicles(subArr[0], markerIconType);
		// that.addMarkerForSelectedVehicles(subArr[1], markerIconType);
		// that.addMarkerForSelectedVehicles(subArr[2], markerIconType);
		// that.addMarkerForSelectedVehicles(subArr[3], markerIconType);
		// that.addMarkerForSelectedVehicles(subArr[4], markerIconType);
		// that.addMarkerForSelectedVehicles(subArr[5], markerIconType);
		// that.addMarkerForSelectedVehicles(subArr[6], markerIconType);
		// that.addMarkerForSelectedVehicles(subArr[7], markerIconType);
		that.cur++;

		$(subArr).each(function(i){
		if(this) {
			that.addMarkerForSelectedVehicles(subArr[i], markerIconType);
			var treeLeaf = $("#"+this.vid+"_checkbox_tree_leaf");
			if(treeLeaf.length > 0){
			var c = parseInt(this.isonline, 10) === 1 ? "#22d32e" : "#777777";
			treeLeaf.siblings("span[vid=" + this.vid + "]").find("div >	div:eq(0)").css("color", c);
			}
			if (this.maplon && this.maplon > 0 && ifGetBestMap)
			points.push(this.maplon / 600000);
			if (this.maplat && this.maplat > 0 && ifGetBestMap)
			points.push(this.maplat / 600000);
	
	
			if(!this.maplon || this.maplon==""){
			    this.maplon = 0;
			}
			if(!this.maplat || this.maplat == ""){
				this.maplat == 0;
			}
			if(this.maplon < 1 && this.maplat < 1){
				isMapMaxLevel = true;
			}
		}});
		if(that.cur >= sl){
		clearInterval(that.markerInterval);
		that.markerInterval = null;
		that.cur = 0;
		if (isMapMaxLevel){
		that.cMap.setLevel(1);
		}else if (points.length % 2 === 0 && points.length > 2){
		that.cMap.getBestMaps(points);
		}else if (points[0] && points[1] && points.length < 3){
		that.cMap.panTo(points[0], points[1]);
		}
		KCPT.addMarkerFinishedFlag = true;
		// if(that.realTimeRefreshTimer){
		// clearTimeout(that.realTimeRefreshTimer);
		// that.realTimeRefreshTimer = null;
		// }
		// that.realTimeRefreshTimer = setTimeout(function(){
		// if(that.bottom_AlarmList.getCurGridTab() == 5)
		// that.bottom_AlarmList.realTimeAlarmListGridManager.appendRange(data);
		// }, 2000);
		//alert(new Date());
		//$("#monitorTreeeFirst").parents("div.left_menu_main").unLoadMask();
		}
		};
		addmk();
		if(subData.length >1)
		{
		that.markerInterval = setInterval(addmk,300);
		}


	},
	addMarkerForSelectedVehicles : function(vehicle, markerIconType)
	{
//		this.counterTest++;
		if(!vehicle) return false;
		var _marker, that = this;
		var speed = "--";
		if((typeof (vehicle.isonline) == "string" && (vehicle.isonline == "true" || vehicle.isonline == "1"))||vehicle.isonline==1){
			speed = (vehicle.speed ? (vehicle.speed / 10) : 0);
		}
		var params = {
			id : vehicle.vid,
			lng : vehicle.maplon ? vehicle.maplon / 600000 : 0,
			lat : vehicle.maplat ? vehicle.maplat / 600000 : 0,
			iconUrl : getCarDirectionIcon(vehicle.head, vehicle.isonline,vehicle.speed, markerIconType, vehicle.alarmcode),
			iconW : vehicle.alarmcode ? 24 : (markerIconType == "cluster" ? 16 : 24),
			iconH : vehicle.alarmcode ? 24 : (markerIconType == "cluster" ? 16 : 24),
			title : vehicle.vehicleno+" "+speed+"km/h",
			label : vehicle.vehicleno+" "+speed+"km/h",
			labelFontSize : 12,
			labelFontColor : "#000000",
			labelBgColor : "#F2EFE9",
			handler : function()
			{
				that.showTipWindow(vehicle.vid, _marker.getLngLat());
			},
			isDefaultTip : false,
			isOpen : false,
			isMultipleTip : false
		};
//		params.lng = params.lng + this.counterTest;
//		params.lat = params.lat + this.counterTest;
		if (this.cMap.markerObj[vehicle.vid])
		{
			_marker = this.cMap.moveMarker(params);
			if (this.currentTipId == vehicle.vid){
				//this.currentTip.setLngLat(that.cMap.getMarker(vehicle.vid));
				this.showTipWindow(vehicle.vid, _marker.getLngLat());
			}
		} else{
			_marker = this.cMap.addMarker(params);
			_markerLabel = this.cMap.markerLblObj[params.id];
		}

	},
	showTipWindow : function(vid, _marker, anchor, alarmFlag,clusterFlag)
	{
//		vid = vid+"";
		var that = this, vids = (vid + "").split("_");
		anchor = anchor ? anchor : [ 0.49, -1.05 ];
		if (vids.length > 1)
			vid = vids[1];
		JAjax("monitor/findPositions.action", {
			idArrayStr : vid
		}, 'json', function(data, err)
		{
			if (data && data[0])
			{
				$(data).each(function()
				{
					var params = {
						id : alarmFlag ? alarmFlag : vid,
						lng : this.maplon ? this.maplon / 600000 : 0,
						lat : this.maplat ? this.maplat / 600000 : 0,
						iconUrl : getCarDirectionIcon(this.head, this.isonline,this.speed,"",this.alarmcode)
					};
					var marker = that.cMap.moveMarker(params);
					that.tipMarker = clusterFlag ? _marker : marker.getLngLat();
					if (that.currentTip)
						that.cMap.map.removeOverLay(that.currentTip);
					var str = this.allalarm.split(",");
					for(var i=0;i<str.length;i++){
					if(getAlarmTypeDesc(str[i])!=''){
						this.alarmcode=str[i];
						break;
					}
					if(str[i]!=null && str[i]!='' && getAlarmTypeDesc(str[i])=='' && i==length-1){
						this.alarmstartutc='';
					}
					}
					var _selfHtml = that.getTipHtml(this);
					var option = new TMHtmlOptions(); 
					option.editable=false;
					option.lnglat = that.tipMarker;
					option.offset=new TMPoint(anchor[0],anchor[1]); 
					option.content=_selfHtml;
					var _selfDefineTip = new TMHtmlOverlay(option);// [0.58,1.16]
					//_selfDefineTip.setLabel(_selfHtml);
					//_selfDefineTip.setBorderLine(0);
					//_selfDefineTip.setBackgroundColor("");

					that.cMap.addOverLay(_selfDefineTip);
					that.currentTipId = vid;
					that.currentTip = _selfDefineTip;

					that.currentTip.setZindex(600,601);
					$(that.currentTip.getObject()).unbind("mouseover mouseout");
					that.bindTipEvent(this);
				});
			}
		}, function(data, err)
		{

		});
	},
	setRealtimeAlarmGrid : function()
	{
		var that = this,grid = this.htmlObj.bottomContainer.find("div.monitor_maframe:eq(1)");
		var conterWeight = this.htmlObj.leftContainer.css("display") == "none" ? $(window).width() : $(window).width() - 300;// KCPT.root.getCenterSize().width;
		grid.ligerGrid({
			columns : [ {
				display : "车牌号",
				minWidth : 128,
				name : "vehicleno"
			}, {
				display : "车牌颜色",
				minWidth : 128,
				name : "plateColorId",
				render: function(row){
					return tocolor(row.plateColorId);
				}
			}, {
				display : "所属企业",
				minWidth : 120,
				align : "center",
				name : "corpName"
			}, {
				display : "车速",
				minWidth : 80,
				align : "center",
				name : "speed",
				render : function(row)
				{
					return row.speed / 10 + "公里/小时";
				}
			}, {
				display : "方向",
				minWidth : 80,
				name : "head",
				align : "center",
				render : function(row)
				{
					var html = getCarDirectionDesc(row.head);
					return html;
				}
			}, {
				display : "ACC状态",
				minWidth : 70,
				name : "K512_1_2",
				render : function(row)
				{
					var html = row.K512_1_2;
					if (!html)
					{
						html = "";
					}
					return html;

				}

			}, {
				display : "瞬间耗油",
				minWidth : 80,
				name : "oilInstant",
				render : function(row)
				{
					if(row.oilInstant < 0)
						row.oilInstant = "--";
					else
						row.oilInstant = row.oilInstant * 0.05;
					return row.oilInstant + "升/小时";
				}
			}, {
				display : "发动机转数",
				minWidth : 80,
				name : "engineRotateSpeed",
				render : function(row)
				{
					if(row.engineRotateSpeed < 0)
						row.engineRotateSpeed = "--";
					return row.engineRotateSpeed;
				}
			}, {
				display : "累计油耗",
				minWidth : 70,
				name : "oilTotal",
				render : function(row){
					if(row.oilTotal < 0)
						row.oilTotal = "--";
					else
						row.oilTotal = row.oilTotal.substring(0, row.oilTotal.indexOf(".")+2);
					return row.oilTotal + "升";
				}
			}

			, {
				display : "位置描述",
				minWidth : 300,
				name : "location",
				render : function(row)
				{
					var html = "<a type='button' onmouseover='getRealtimeAlarmPosition(this," + row.vid + ");'>获取位置<a/>";
					return html;
				}
			} ],
			width : conterWeight - 47,
			height : 190,
			autoLoad : false,
			url : 'monitor/findMonitorVehiclesList.action',
			usePager : false,
//			pageSize : 30,
			sortName : 'vid',
			allowUnSelectRow : true,
			onSelectRow : function(rowData)
			{
				if(rowData)
				{
					if(rowData.maplon&&rowData.maplat)
					{
						that.cMap.panTo(rowData.maplon/600000, rowData.maplat/600000);
					}
				}
			},
			onUnSelectRow : function(rowData)
			{
				
			}
		});
		this.realTimeGridManager = grid.ligerGetGridManager();
		this.realTimeGridManager.loadData(true);

	},
	addRealtimeAlarm : function(verhicleIds)
	{
		var tmpArr = verhicleIds.concat();
//		tmpArr.reverse();
//		while (tmpArr.length > 30)
//		{
//			tmpArr.pop();
//		}
		if(tmpArr.length == 0){
			tmpArr = ["99999999"];
		}
		var param = [ {
			name : 'idArrayStr',
			value : tmpArr.join(",")
		} ];
		this.realTimeGridManager.setOptions({
			parms : param
		});
		this.realTimeGridManager.loadData(true);

	},
	bindTipEvent : function(vehicle)
	{
		var that = this, tipDiv = this.currentTip.getObject(), tipDivLi = $(tipDiv).find("div.maptop > ul > li"), tipDivText = $(tipDiv).find("div.map_ssy > div.maptext"), tipDivButtons = $(tipDiv).find("div.vehicle_information_tip_bottom > ul > li"), selectableFuns = [];
		$(tipDivButtons).each(function()
		{
			selectableFuns.push($(this).attr("class"));
		});
		// 加载ajax返回的数据
		// innerCode
		// findVehicleInnerCodeByVid(vehicle.vid, $(tipDiv).find("")),
		// location
		findAddressByLngLat(vehicle.vid, {
			mapLon : vehicle.maplon/600000,
			mapLat : vehicle.maplat/600000
		}, $(tipDiv).find("label.location"));
		// lineName
		findClassLineByVid(vehicle.vid, [$(tipDiv).find("label.lineName"), $(tipDiv).find("label.operState")]);

		$(tipDiv).find("div.tip-close").mouseover(function(){
			$(this).find("img").attr("src","images/map/new/tip-close-2.png");
		}).mouseout(function(){
			$(this).find("img").attr("src","images/map/new/tip-close.png");
		}).click(function()
		{
			that.cMap.removeOverLay(that.currentTip);
			that.currentTipId = "";
			// that.cMap.markerSelfDefineTipObjId = "";
		}).end()
		.find("a.tipAlarmDesc").click(function(){
			initAlarmHandler(vehicle.vid,false,vehicle.vehicleno);//传入车牌号到弹出窗
		});
//		tipDivLi.click(function()
//		{
//			if (!$(this).hasClass("h"))
//				return false;
//			else
//			{
//				tipDivLi.each(function()
//				{
//					$(this).addClass("h");
//				});
//				$(this).removeClass("h");
//				tipDivLi.each(function(i)
//				{
//					if (!$(this).hasClass("h"))
//						$(tipDivText[i]).removeClass("hidden");
//					else
//						$(tipDivText[i]).addClass("hidden");
//				});
//			}
//		});
		tipDivButtons.click(function()
		{
			var attrClass=$(this).attr("class");
			if('searchBaiduMapButton'==attrClass){
				KCPT.baiduMapPointList[vehicle.vid]={lon:vehicle.lon,lat:vehicle.lat};
				var baiduWin=window.open('model/monitor/baiduMap.html','baiduMapWin');
				return;
			}
			that.initVehicleWindow(attrClass, vehicle, selectableFuns);
		}).end();

	},
	initVehicleWindow : function(functionType, vehicle, selectableFuns)
	{
		var that = this, vehicleSubfunctionsConfig = {
				functionType : functionType,
				appendToDiv : that.htmlObj.mainContainer.find("div.vehiclePopWindow"),
				miniPopwindow : that.htmlObj.mainContainer.find("div.miniVehiclePopWindow"),
				dragableDiv : that.htmlObj.mainContainer,
				popwindowId : vehicle.vid,
				vehicle : vehicle,
				innerCode : that.innerCodeCache[vehicle.vid],
				selectableFuns : selectableFuns,
				cMap : that.cMap
			};
		
		if (vehicleSubfunctionObjId == vehicle.vid)
		{
			if(that.vehicleSubfunctionObj.isInMiniStatus())
				that.vehicleSubfunctionObj.miniPopwindow.find("div.vehicle_details_back").trigger("click");
			if (that.vehicleSubfunctionObj.curTab == functionType)
				return false;
			else
				//that.vehicleSubfunctionObj.changeTabs(vehicleSubfunctionsConfig.functionType);
				that.vehicleSubfunctionObj.popwindow
					.find("div.vehicle_details_function > ul > li[actionType=" + vehicleSubfunctionsConfig.functionType + "]").trigger("click");
			
		} else
		{
			vehicleSubfunctionObjId = vehicle.vid;
			if (that.vehicleSubfunctionObj)
				that.vehicleSubfunctionObj.closeWindow(false);
			that.vehicleSubfunctionObj = null;
			that.vehicleSubfunctionObj = new VehicleSubfunctions(vehicleSubfunctionsConfig);
		}
//		that.init();
	},
	getTipHtml : function(vehicle)
	{
		var that = this,
		// this.innerCodeCache[vehicle.vid] ? this.innerCodeCache[vehicle.vid] :
		// "",
		buttonsHtml = "";
//		if (checkFunction("FG_MEMU_MONITOR_LOCUS"))
//		{
			buttonsHtml += '<li class="detailButton" funType="0" title="详情"><a href="javascript:void(0);"></a></li>';//<img src="images/map/new/mapbig.png" />
//		}
		if (checkFunction("FG_MEMU_MONITOR_MAP_INFO"))
		{
			buttonsHtml += '<li class="scheduleButton" funType="1" title="调度"><a href="javascript:void(0);"></a></li>';//<img src="images/map/new/updown.png" />
		}
		if (checkFunction("FG_MEMU_MONITOR_PHOTOGRAPH"))
		{
			buttonsHtml += '<li class="photoButton" funType="2" title="拍照"><a href="javascript:void(0);"></a></li>';//<img src="images/map/new/photo.png" />
		}
		if (checkFunction("FG_MEMU_MONITOR_MONITOR"))
		{
			buttonsHtml += '<li class="normalMonitorButton" funType="6" title="监听"><a href="javascript:void(0);"></a></li>';//<img src="images/map/new/monitor.png" />
		}
		if (checkFunction("FG_MEMU_MONITOR_LOCUS"))
		{
			buttonsHtml += '<li class="pathButton" funType="0" title="轨迹"><a href="javascript:void(0);"></a></li>';//<img src="images/map/new/mapbig.png" />
		}

		if (checkFunction("FG_MEMU_MONITOR_VIEW"))
		{
			buttonsHtml += '<li class="cameraButton" funType="3" title="视频"><a href="javascript:void(0);"></a></li>';//<img src="images/map/new/Camera.png" />
		}
		if (checkFunction("FG_MEMU_MONITOR_EMPHASIS"))
		{
			buttonsHtml += '<li class="stressMonitorButton" funType="7" title="跟踪"><a href="javascript:void(0);"></a></li>';//<img src="images/map/new/stressMonitor.png" />
		}
		if (checkFunction("FG_MEMU_MONITOR_FACILITY"))
		{
			buttonsHtml += '<li class="searchAroundButton" funType="4" title="周边"><a href="javascript:void(0);"></a></li>';//<img src="images/map/new/searchAround.png" />
		}
		if (checkFunction("FG_MEMU_MONITOR_BAIDUMAP"))
		{
			buttonsHtml += '<li class="searchBaiduMapButton" funType="4" title="在百度地图中查看位置"><a href="javascript:void(0);"></a></li>';//<img src="images/map/new/searchAround.png" />
		}
		
		// + '<li class="recallVehicleButton" funType="5" title="点名"><img
		// src="images/map/recallVehicle.png" /></li>'

		var weizhi = vehicle.isonline==1?"当前位置：":"最后位置：";
		var tempIsonline = getCarStatusText(vehicle.isonline,vehicle.speed,vehicle.alarmcode!="");
		var lastStation=vehicle.lastBaseStatusMap.K512_3_4==undefined?'未定位':vehicle.lastBaseStatusMap.K512_3_4;
		var speed = "--";
		if((typeof (vehicle.isonline) == "string" && (vehicle.isonline == "true" || vehicle.isonline == "1"))||vehicle.isonline==1){
			speed = (vehicle.speed ? (vehicle.speed / 10) : 0);
		}
		var speedDesc = (getCarDirectionDesc(vehicle.head)) + "  " + speed;
		var tips = [ 
					'<div class="vehicle_information_tip">'
				,		'<div class="vehicle_information_tip_top"><label>' + vehicle.vehicleno + ' ' + tempIsonline + ' '+lastStation+'</label>'//getPlateColor(vehicle.plateColorId ? vehicle.plateColorId : "")
			    ,			'<div class="tip-close">'
			    ,				'<a href="javascript:void(0);"><img src="images/map/new/tip-close.png" name="tip-close" width="31" height="26" border="0" /></a>'//
			    ,			'</div>'
			    ,		'</div>'
			    ,		'<div class="vehicle_information_tip_box">'
			    
				,			'<div class="vehicle_information_tip_box_2">'
				,				'<ul class="tableUL">'   																															//begin 姜威 modify bt-433  显示样式问题，加入车速两个字，解决显示问题  的顺序 at 2012-7-18			
			    ,					'<li class="tip_label">上报时间：</li><li class="tip_value">' + (utc2Date(vehicle.utc) ? (utc2Date(vehicle.utc)) : "") + '</li><li class="" style="">车速：</li><li class="" title="' + speedDesc + '公里/小时">' + speedDesc + '公里/小时</li>'//end 姜威 modify bt-433  显示样式问题，加入车速两个字，解决显示问题  的顺序 at 2012-7-18
			    ,					'<li class="tip_label">当前告警：</li><li class="tip_value_long"><a class="tipAlarmDesc" style="cursor:pointer;">' + getAlarmTypeDesc(vehicle.alarmcode) + ' ' + utc2Date(vehicle.alarmstartutc) + '</a></li>'//(vehicle.alarmdesc ? vehicle.alarmdesc : "")
			    ,					'<li class="tip_label">'+weizhi+'</li><li class="tip_value_long"><label class="location"></label></li>'
			    ,				'</ul>'
				,			'</div>'
				
				,			'<div class="vehicle_information_tip_box_1">'
			    ,				'<ul class="tableUL">'
			    ,					'<li class="tip_label" style="width:72px;">当前驾驶员：</li><li class="tip_value_long" style="width:272px;">' + null2blank(vehicle.cname) + '</li><li class="tip_label" style="display: none">线路名称：</li><li class="tip_value" style="display: none"><label class="lineName"></label></li>'
			    ,					'<li class="tip_label">营运状态：</li><li class="tip_value_short" style="width:80px;"><label class="operState"></label></li><li class="tip_label">所属单位：</li><li class="tip_value" title="' + vehicle.corpName + '">' + vehicle.corpName + '</li>'
			    ,				'</ul>'
				,			'</div>'
				
				,			'<div class="vehicle_information_tip_bottom"><ul>'
				,				buttonsHtml
				,			'</ul></div>'	
				,		'</div>'
			    ,	'</div>'
		];
		return tips.join("");
	}

};
/**
 * 初始化报警处理调用
 */
function initAlarmHandler(vid,isBatch,alarmLevel){
	var urlParam="";
	if(vid){
		urlParam="v="+vid;
	}else if(isBatch){
		urlParam="isAlarmLevel=true&l="+alarmLevel;
	}
	if(KCPT.alarmHandlerWin){
		KCPT.alarmHandlerWin.close();
	}
	KCPT.alarmHandlerWin=window.open("model/alarmHandler/alarmHandler.html?"+urlParam,"alarmHandler",'location=no,menubar=no,resizable=no,status=no,titlebar=no,top=0,left=0,height='+$(window).height()+',width='+$(window).width()+',menubar=0');
	vehicleNoValue = alarmLevel;//将车牌号码赋值给弹出框。
	return false;
};


// 车辆最新信息监控窗口,批量监控
var VehicleLatestStatusWindow = function(o)
{
	this.options = {};
	this.popwindow = null;
	this.popwindowId = "vehicleLatestStatusDiv";
	this.popwindowMapId = "vehicleLatestStatusMap";
	this.vehicleLatestStatusHtml = "model/monitor/popwindows/vehicleLatestStatus.html";
	this.vehicleLatestStatusTimer = null;// 轮询车辆最新信息定时器
	this.vehicleLatestStatusTimerDelay = 10011;// 轮询车辆最新信息定时器间隔，10秒
	this.timerFlag = -1;

	this.cMap = null;
	this.pathPointsCache = [];

	this.poplayer = {
		position : "absolute",
		width : 220,
		height : 'auto',
		left : 400,
		top : 160,
		zIndex : 3800
	};
	this.init(o);
};
VehicleLatestStatusWindow.prototype = {
	loadParams : function(o)
	{
		if (o)
		{
			this.options = o;
			return true;
		} else
			return false;
	},
	init : function(o)
	{
		var loaded = this.loadParams(o);
		if (loaded)
		{
			this.popwindowMapId = this.popwindowMapId + "_" + this.options.vid;
			var popwin = $('<div>');
			popwin.attr('id', this.popwindowId + "_" + this.options.vid);
			popwin.addClass("batchMonitorDiv");
			popwin.css({
				"position" : this.poplayer.position,
				"width" : this.poplayer.width,
				"height" : this.poplayer.height,
				"left" : this.poplayer.left + parseInt(this.poplayer.width) * this.options.offset,
				"top" : this.poplayer.top, // + 10 * this.options.offset,
				"z-index" : this.poplayer.zIndex
			});
			$(popwin).appendTo(this.options.appendToDiv);
			this.popwindow = popwin;
			this.popwindow.draggable({
				cursor : 'move',
				containment : this.options.dragableDiv
			});
			this.loading();
		}
	},
	resetIndex : function(_showPopWin)
	{
		var that = this;
		var popwindow_offset = this.options.appendToDiv.find("div.batchMonitorDiv").length;
		this.options.appendToDiv.find("div.batchMonitorDiv").each(function()
		{
			$(this).css("zIndex", that.poplayer.zIndex);
		});
		_showPopWin.css("zIndex", that.poplayer.zIndex + popwindow_offset);
	},
	showDiv : function(){
		if(this.popwindow){
			this.popwindow.show();
			this.resetIndex(this.popwindow);
		}
	},
	loading : function()
	{
		var that = this;
		this.popwindow.load(this.vehicleLatestStatusHtml, {}, function()
		{
			that.popwindow.mousedown(function()
			{
				that.resetIndex(that.popwindow);
			}).find("div.vehicleLatestStatusDivHead h6").text("单车跟踪【" + (that.options.vNo ? that.options.vNo : "") + "】").end().find("div.vehicleLatestStatusDivHead img").click(function()
			{
				that.closeWindow();
			}).end().find("div.vehicleLatestStatusMap").attr("id", that.popwindowMapId);
			that.initVehicleLatestStatusMap();
			that.getVehiclePath2MinitAgo();
		});
	},
	initVehicleLatestStatusMap : function()
	{
		this.cMap = new CTFO_MAP(this.popwindowMapId);
		this.cMap.setLevel(10);
		this.cMap.addMapControl(1);
	},
	getVehiclePath2MinitAgo : function(){
		var that = this,
			nt = new Date(),
			et = dateFormat(nt, "yyyy-MM-dd hh:mm:ss"),
			st = dateFormat((new Date(nt.getTime() - 120 * 1000)), "yyyy-MM-dd hh:mm:ss");
			p = {
					"requestParam.equal.id" : parseInt(that.options.vid)
				,	"requestParam.equal.startTime" : st
				,	"requestParam.equal.endTime" : et
			};
		JAjax("monitor/findTrack.action", p, 'json', 
			function(data, err)
			{
				if (data && data.error)
				{
					//$.ligerDialog.alert("查询2分钟前轨迹错误!", "提示", "error");
				} else if (data && data.Rows.length > 0)
				{
					that.compileVehiclePath2MinitAgo(data.Rows);
				}
			}, function(data, err)
			{
				// alert("查询车辆实时信息错误");
			});
	},
	compileVehiclePath2MinitAgo : function(path){
		var pathLonLats = [];
		$(path).each(function(){
			var p = this.split("|");
			pathLonLats.push(p[0] / 600000);
			pathLonLats.push(p[1] / 600000);
		});
		var lineId = "2minitPath",
			pathLineParams = {
				id : lineId,
				arrLngLat : pathLonLats,
				strColor : "gray",
				numWidth : "3",
				numOpacity : "0.5"
			};
		this.cMap.removePolyLine(lineId);
		this.cMap.addPolyLine(pathLineParams);
		this.getVehicleLatestStatus();
	},
	getVehicleLatestStatus : function()
	{
		var that = this;
		vehicleIds = [ this.options.vid ];
		JAjax("monitor/findPositions.action", {
			idArrayStr : vehicleIds.join(",")
		}, 'json', function(data, err)
		{
			$(data).each(function()
			{
				if (this && this.error)
				{
					//$.ligerDialog.alert("查询最新位置错误!", "提示", "error");
				} else if (this && !this.error)
				{
					that.compileVehicleLatestStatus(this);
				}
			});
		}, function(data, err)
		{
			// alert("查询车辆实时信息错误");
		});
	},
	compileVehicleLatestStatus : function(vehicle)
	{

		var speed = "--";
		if(vehicle && vehicle.speed > 0){
			speed = (vehicle.speed ? vehicle.speed / 10 : 0 + "").toString();
			if(speed.indexOf(".") > 0)
				speed = speed.substring(0, speed.indexOf(".") + 3) + "公里/小时";
			else
				speed += "公里/小时";
		}
		
		var oilInstant = "--";
		if(vehicle.oilInstant > 0){
			oilInstant = ((vehicle.oilInstant ? vehicle.oilInstant : 0) * 0.05 + "").toString();
			if(oilInstant.indexOf(".") > 0)
				oilInstant = oilInstant.substring(0, oilInstant.indexOf(".") + 3) + "升/小时";
			else
				oilInstant += "升/小时";
		}
		var engineRotateSpeed = "--";
		if(vehicle.engineRotateSpeed > 0){
			engineRotateSpeed = ((vehicle.engineRotateSpeed ? vehicle.engineRotateSpeed : 0) * 0.125 + "").toString();
			if(engineRotateSpeed.indexOf(".") > 0)
				engineRotateSpeed = engineRotateSpeed.substring(0, engineRotateSpeed.indexOf(".") + 3) + "转/分钟";
			else
				engineRotateSpeed += "转/分钟";
			
		}
		var that = this, statusDescContainer = this.popwindow.find("ul.maptprightframe_monitor"), lng = (+(vehicle.maplon) / 600000), // +this.timerFlag,
		lat = (+(vehicle.maplat) / 600000), // +this.timerFlag,
		marker = this.cMap.getMarker(vehicle.vid);
		$.merge(this.pathPointsCache, [ lng, lat ]);

		statusDescContainer.find("label:eq(0)").text(utc2Date(vehicle.utc)).end()// 上报时间
		.find("label:eq(1)").text(getCarDirectionDesc(vehicle.head)).end()// 方向
		.find("label:eq(2)").text(speed).end()// 车速
		.find("label:eq(3)").text(engineRotateSpeed).end()// 转速
		.find("label:eq(4)").text(oilInstant).end();// 瞬时油耗
		// .find("label:eq(5)").text(vehicle.location).end();// 位置
		findAddressByLngLat(vehicle.vid, {
			mapLon : lng,
			mapLat : lat
		}, statusDescContainer.find("label:eq(5)"));
		if (marker)
		{
			var params = {
				id : vehicle.vid,
				lng : lng,
				lat : lat,
				iconUrl : getCarDirectionIcon(vehicle.head, vehicle.isonline,vehicle.speed)
			};
			this.cMap.moveMarker(params);
			this.cMap.removePolyLine(vehicle.vid);
			var lineParams = {
				id : vehicle.vid,
				arrLngLat : this.pathPointsCache.slice(0),
				strColor : "blue",
				numWdth : 2,
				numOpacity : 0.5
			};
			this.cMap.addPolyLine(lineParams);
		} else
		{
			var params = {
				id : vehicle.vid,
				lng : lng,
				lat : lat,
				iconUrl : getCarDirectionIcon(vehicle.head, vehicle.isonline,vehicle.speed),
				iconW : 24,
				iconH : 24,
				tip : "",
				label : "",
				handler : null// function(){that.showTipWindow(vehicle,point);}
				,
				isOpen : false,
				isDefaultTip : false,
				isMultipleTip : false
			};
			this.cMap.addMarker(params);
			this.cMap.getBestMap(lng, lat);
		}
		this.cMap.panTo(lng, lat);
	},
	closeWindow : function()
	{
		clearInterval(this.vehicleLatestStatusTimer);
		this.cMap = null;
		this.popwindow.remove();
		batchMonitorWinIdCache.splice(inArray(this.options.vid, batchMonitorWinIdCache), 1);
		delete KCPT.VehicleLatestStatusWindows[this.options.vid];
	}
};
// 批量消息
var BatchScheduleHandler = function(o)
{
	this.options = {};
	this.batchScheduleHandleWinId = "batchScheduleWin";
	this.popwindow = null;
	this.batchScheduleHtml = "model/monitor/popwindows/batchSchedule.html";

	this.poplayer = {
		position : "absolute",
		width : 220,
		height : 'auto',
		left : 308,
		top : 220,
		zIndex : 3800
	};

	this.init(o);
};
BatchScheduleHandler.prototype = {
	loadParams : function(o)
	{
		if (o)
		{
			this.options = o;
			return true;
		} else
			return false;
	},
	init : function(o)
	{
		var loaded = this.loadParams(o);
		if (loaded)
		{
			var popwin = $('<div>');
			popwin.attr('id', this.batchScheduleHandleWinId);
			// popwin.addClass("trend");
			popwin.css({
				"position" : this.poplayer.position,
				"width" : this.poplayer.width,
				"height" : this.poplayer.height,
				"left" : this.poplayer.left,
				"top" : this.poplayer.top,
				"z-index" : this.poplayer.zIndex
			});
			$(popwin).appendTo(this.options.appendToDiv);
			this.popwindow = popwin;
			this.popwindow.draggable({
				cursor : 'move',
				containment : this.options.dragableDiv
			});
			this.loading();
		}
	},
	loading : function()
	{
		var that = this;
		this.popwindow.load(this.batchScheduleHtml, {}, function()
		{
			if (KCPT.schedulePreMessage && KCPT.schedulePreMessage.length > 0)
			{
				$(KCPT.schedulePreMessage).each(function(){
					var option = "<option value='" + this.msgBody + "' >" + this.msgIdx + "</option>";
					that.popwindow.find("select[name='preinstallSelect']").append(option);
				});
			}
			that.popwindow.find("div.batchScheduleDivHead img").click(function()
			{
				that.closeWindow();
			}).end().find("select[name='preinstallSelect']").change(function()
			{
				that.popwindow.find("textarea[name='textContent']").text($(this).find("option:selected").text());
			}).end().find("textarea[name='textContent']").bind("propertychange", function()
			{
				$(this).removeClass("grayText");
			}).end().find("textarea[name='textContent']").one("keydown", function()
			{
				$(this).text("");
			}).end().find("div.batchScheduleDivHead img").click(function()
			{
				that.closeWindow();
			}).end().find("input[name='sendMessageCommand']").click(function()
			{
				var text = that.popwindow.find("textarea[name='textContent']").text(), 
					alertMessage = that.popwindow.find("h2.alertMessageForBatchSchedule");
//					_emergencyAttValue, 
//					_screenAttValue,
//					_ttsAttValue, 
//					_advertisingAttValue;
//				that.popwindow.find("input[name=msgSendType]").each(function(i){
//					if(i==0)
//						_emergencyAttValue = ($(this).attr("checked") ? 1 : 0);
//					if(i==1)
//						_screenAttValue = ($(this).attr("checked") ? 1 : 0);
//					if(i==2)
//						_ttsAttValue = ($(this).attr("checked") ? 1 : 0);
//					if(i==3)
//						_advertisingAttValue = ($(this).attr("checked") ? 1 : 0);
//				});
				text = (text == "请输入消息内容") ? "" : text;
				if (validateCharLength(text) > 200)
				{
					alertMessage.text("调度信息字符不可超过200字符");
					return false;
				}
				if (!validateText(text))
				{
					alertMessage.text("调度信息不可为空");
					return false;
				}
				var param = {
//					"requestParam.equal.emergencyAttValue" : _emergencyAttValue,
//					"requestParam.equal.screenAttValue" : _screenAttValue,
//					"requestParam.equal.ttsAttValue" : _ttsAttValue,
//					"requestParam.equal.advertisingAttValue" : _advertisingAttValue,
					"requestParam.equal.idArrayStr" : that.options.vehicles.join(","),
					"requestParam.equal.message" : text,
					"requestParam.equal.memo" : ""
				};
				$.ligerDialog.confirm("是否对所选车辆下发消息?", function(r)
				{
					if (r)
						sendMessageCommand(param, "vehicle", alertMessage);
					else
						return false;
				});
			});
		});
	},
	closeWindow : function()
	{
		this.popwindow.remove();
	}
};

// 多条报警定位窗口
function initAlarmsPosition(vid, vNo, obj)
{
	var that = this;
	// testData
	// vid = 15;
	this.loadHtml = "model/monitor/popwindows/alarmPositionWin.html";
	this.vNo = vNo;
	this.cMap = null;
	this.popwindow = null;
	this.alarmMarkerIdCache = [];
	this.popwinId = 'alarmPositionDiv';
	if ($("#" + this.popwinId).length)
		$("#" + this.popwinId).remove();

	this.poplayer = {
		position : "absolute",
		width : 200,
		height : 200,
		left : $(obj).offset().left - 210,
		top : (($(obj).offset().top + 200) < $(window).height() - 20) ? $(obj).offset().top : ($(window).height() - 220),
		zIndex : 3800
	};
	this.appendToDiv = $("#monitorContent").find("div.dragDiv");

	var popwin = $('<div>');
	popwin.attr('id', that.popwinId);
	// popwin.addClass("trend");
	popwin.css(that.poplayer);
	$(popwin).appendTo(that.appendToDiv);
	that.popwindow = popwin;

	this.loading = function()
	{
		that.popwindow.load(that.loadHtml, {}, function()
		{
			that.initMap();
			that.popwindow.find("div.alarmPopWinHead > span:eq(0) > h6").text(that.vNo).end().find("div.alarmPopWinHead > span:eq(1) > img").click(function()
			{
				that.popwindow.remove();
			});
		});
	};
	this.initMap = function()
	{
		that.cMap = new CTFO_MAP("alarmPopWinMap");
		// that.cMap.setCenter(116.29376, 39.95776);
		// that.cMap.setLevel(4);
		that.cMap.addMapControl(1);
		that.cMap.addCenterCrossControl();
		that.cMap.changeSize();
	};

	that.loading();

	JAjax("monitor/findAlarmPositions.action", {
		"requestParam.equal.vid" : vid
	}, 'json', function(data, err)
	{
		if (data)
			that.drawAlarmPosition(data);
	}, function(data, err)
	{
		// alert("查询车辆报警信息坐标错误");
	});

	this.drawAlarmPosition = function(data)
	{
		that.clear();
		var pointsArray = [];
		$(data).each(function(i)
		{
			if (i < 100)
			{// 不能加载超过100个点
				var alarmMarkerId = "alarmMarker_" + i, markerParams = {
					id : alarmMarkerId,
					lng : this.maplon / 600000,
					lat : this.maplat / 600000,
					iconUrl : getAlarmTypeImg(this.alarmType),
					iconW : 24,
					iconH : 24,
					tip : "",
					label : "",
					handler : null,
					isDefaultTip : false,
					isOpen : false,
					isMultipleTip : false
				};
				if (markerParams.lng && markerParams.lat)
				{
					pointsArray.push(markerParams.lng);
					pointsArray.push(markerParams.lat);
					that.cMap.addMarker(markerParams);
				}
			}
		});
		that.cMap.getBestMaps(pointsArray);
		if (that.cMap.getCurrentZoom() < 6)
		{
			that.cMap.setLevel(6);
			that.cMap.panTo(pointsArray[pointsArray.length - 2], pointsArray[pointsArray.length - 1]);
		}
	};
	this.clear = function()
	{
		that.cMap.removeAllMarkers();
	};
};

// 车机命令接收状态
getCommandStatus = function(param, obj)
{
	setInterval(function()
	{
		JAjax("monitor/findCommandStatus.action", param, 'json', function(data, err)
		{
			if (data && data.error)
			{
				// alert(data.error[0]["errorMessage"]);
			} else if(data && data.length > 0 && obj)
			{
				$(obj).html(data[0]['seq']);
				// alert("接收命令状态成功");
			}
		}, function(data, err)
		{
			// alert("接收命令状态错误");
		});
	}, 5000);
};

//获取调度信息预设信息
getSchedulePreInstallMessage = function(){
	JAjax(
		"systemmng/findPredefinedMsgByParam.action", 
		"", 
		"json", 
		function(data)
		{
			if(data && data.length > 0){
				KCPT.schedulePreMessage = data;
			}
		}, null);
};

//在底部状态栏左侧显示错误信息
setAllAlertMessageText = function(text){
	var allAlertMessageObj = $("#footer").find("div.commandReturnText");
	allAlertMessageObj.text(text);
	setTimeout(function(){
		allAlertMessageObj.text("");
	}, 5000);
};
setAllAlertMessageHtml = function(text,time){
	var allAlertMessageObj = $("#footer").find("div.commandReturnText");
	allAlertMessageObj.html(text);
	if(time){
		setTimeout(function(){
			allAlertMessageObj.html("");
		}, 5000);
	}
};

// 以下车机命令函数
// 下发消息指令
sendMessageCommand = function(param, type, alertMessageObj,handler)
{

	var allAlertMessageObj = $("#footer").find("div.commandReturnText");
	$(allAlertMessageObj).css("color", "#ff3d3d");
	
	JAjax("monitor/sendMessageCommand.action", param, 'json', function(data, err)
	{
		// that.reloadGrid();
		showRsTip(data,alertMessageObj);
		if (data && data.error){
			setAllAlertMessageText(data.error[0]["errorMessage"]);
		}
		// alert(data.error[0]["errorMessage"]);
		else
		{
			if (type == "alarm")
				$(data).each(function()
				{
					KCPT.AlarmMessageCommandSuccessStatus.push(this.seq);
				});
			else if (type == "vehicle")
			{
				$(data).each(function()
				{
					KCPT.VehicleMessageCommandSuccessStatus.push(this.seq);
				});
			}

			if (data && data.length > 0)
			{
				if(handler){
					handler.call();
				}
				$(allAlertMessageObj).css("color", "#00ff00");
				$(data).each(function(i)
				{
					setTimeout(function()
					{
						if((i+1)==data.length){
							setAllAlertMessageHtml(data[i]["displayMessage"],true);
						}else{
							setAllAlertMessageHtml(data[i]["displayMessage"]);
						}
					}, 2000 * (i + 1));
				});
			}
		}
	}, function(data, err)
	{
		showRsTip(data,alertMessageObj);
		setAllAlertMessageText("发送车辆调度信息错误");

	});
};
// 下发拍照指令
sendPhotoCommand = function(param, type, alertMessageObj, buttonObj, isBatch)
{
	var allAlertMessageObj = $("#footer").find("div.commandReturnText");
	$(allAlertMessageObj).css("color", "#ff3d3d");
	$(this).attr("disabled", true);
	
	JAjax("monitor/sendPhotoCommand.action", param, 'json', function(data, err)
	{
		showRsTip(data,alertMessageObj);
		if (data && data.error)
		{
			setAllAlertMessageText(data.error[0]["errorMessage"]);
			$(buttonObj).attr("disabled", false);
			// alert(data.error[0]["errorMessage"]);
		} else
		{
			if (data.length > 0)
			{
				$(data).each(function(i)
				{
					setTimeout(function()
					{
						if(data[i].sendOk == "true"){
							$(allAlertMessageObj).css("color", "#00ff00");
						}
						if((i+1)==data.length){
							setAllAlertMessageHtml(data[i]["displayMessage"].split(" ")[0] + " 第" + data[i]["photoLocation"] + "路摄像头 " + data[i]["displayMessage"].split(" ")[1],true);
						}else{
							setAllAlertMessageHtml(data[i]["displayMessage"].split(" ")[0] + " 第" + data[i]["photoLocation"] + "路摄像头 " + data[i]["displayMessage"].split(" ")[1]);
						}
					}, 2000 * (i + 1));
				});
//				if(isBatch){
//					setTimeout(function(){
//						alertMessageObj.hide().siblings("div").show();
//					},2000*(data.length+1));
//				}

			} else
			{
				setAllAlertMessageText("车机不在线,拍照失败");
			}
			$(buttonObj).attr("disabled", false);
		}
	}, function(data, err)
	{
		showRsTip(data,alertMessageObj);
		setAllAlertMessageText("发送拍照指令错误");

	});
};

// 下发监听指令
sendMonitorCommand = function(param, type, alertMessageObj, handler)
{
	var allAlertMessageObj = $("#footer").find("div.commandReturnText");
	$(allAlertMessageObj).css("color", "#ff3d3d");
	
	JAjax("monitor/sendMonitorCommand.action", param, 'json', function(data, err)
	{
		showRsTip(data,alertMessageObj);
		if (data && data.error)
			setAllAlertMessageText(data.error[0]["errorMessage"]);
		else
		{
			if (type == "alarm")
				KCPT.AlarmMonitorCommandSuccessStatus = data[0].seq;
			else if (type == "vehicle")
				KCPT.VehicleMonitorCommandSuccessStatus = data[0].seq;

			if (data.length > 0)
			{
				if(handler){
					handler.call();
				}
				$(allAlertMessageObj).css("color", "#00ff00");
				$(data).each(function(i)
				{
					setTimeout(function()
					{
						if((i+1)==data.length){
							setAllAlertMessageHtml(data[i]["displayMessage"],true);
						}else{
							setAllAlertMessageHtml(data[i]["displayMessage"]);
						}
					}, 2000 * (i + 1));
				});
			}
		}
	}, function(data, err)
	{
		showRsTip(data,alertMessageObj);
		setAllAlertMessageText("发送车辆监听指令错误");
	});
};
// 下发录音指令
sendRecordCommand = function(param, type, alertMessageObj, tapeObj, countdownObj, tapeTime, handler)
{
	var allAlertMessageObj = $("#footer").find("div.commandReturnText");
	//按钮后提示信息
	var tip=$("div.vehicle_details_main_record_tip");
	$(allAlertMessageObj).css("color", "#ff3d3d");
	
	JAjax("monitor/sendRecordCommand.action", param, 'json', function(data, err)
	{
		showRsTip(data,tip);
		if (data && data.error)
			setAllAlertMessageText(data.error[0]["errorMessage"]);
		// alert(data.error[0]["errorMessage"]);
		else
		{
			if (type == "alarm")
				KCPT.AlarmRecordCommandSuccessStatus = data[0].seq;
			else if (type == "vehicle")
				KCPT.VehicleRecordCommandSuccessStatus = data[0].seq;
			if (data.length > 0)
			{
				if(handler){
					handler.call();
				}
				$(allAlertMessageObj).css("color", "#00ff00");
				$(data).each(function(i)
				{
					setTimeout(function()
					{
						if((i+1)==data.length){
							setAllAlertMessageHtml(data[i]["displayMessage"],true);
						}else{
							setAllAlertMessageHtml(data[i]["displayMessage"]);
						}
					}, 2000 * (i + 1));
					if (countdownObj && tapeTime)
					{
						countdownTimer = setInterval(function()
						{
							if(tapeTime>0){
								tapeTime--;
							}else{
								tapeTime=0;//如果小于等于0，则置为0
							}
							countdownObj.text(tapeTime);
							if (tapeTime <= 0)
							{
								clearInterval(countdownTimer);
								$(tapeObj).attr("disabled", false);
							}
						}, 1000);
					}
				});
			}
		}
	}, function(data, err)
	{
		showRsTip(data,tip);
		setAllAlertMessageText("发送车辆录音指令错误");
		$(tapeObj).attr("disabled", false);
	});
};

// 下发重点监控指令
sendEmphasisCommand = function(param, alertMessageObj, handler)
{
	var allAlertMessageObj = $("#footer").find("div.commandReturnText");
	$(allAlertMessageObj).css("color", "#ff3d3d");
	
	JAjax("monitor/sendEmphasisCommand.action", param, 'json', function(data, err)
	{
		if(alertMessageObj) showRsTip(data,alertMessageObj);
		if (data && data.error)
			setAllAlertMessageText(data.error[0]["errorMessage"]);
		else
		{
			KCPT.EmphasisMonitorSuccessStatus = data[0].seq;
			if(handler){
				handler.call();
			}
			if (data.length > 0)
			{
				$(allAlertMessageObj).css("color", "#00ff00");
				$(data).each(function(i)
				{
					setTimeout(function()
					{
						if((i+1)==data.length){
							setAllAlertMessageHtml(data[i]["displayMessage"],true);
						}else{
							setAllAlertMessageHtml(data[i]["displayMessage"]);
						}
					}, 2000 * (i + 1));
				});
			}
		}
	}, function(data, err)
	{
		showRsTip(data,alertMessageObj);
		setAllAlertMessageText("发送车辆重点监控指令错误");
	}, null, null, 20000);
};
// 下发点名指令
sendCallNameCommand = function(param, alertMessageObj, isBatch)
{
	
	var allAlertMessageObj = $("#footer").find("div.commandReturnText");
	$(allAlertMessageObj).css("color", "#ff3d3d");
		
	JAjax("monitor/sendCallNameCommand.action", param, 'json', function(data, err)
	{
		showRsTip(data,alertMessageObj);
		if (data && data.error)
		{
			setAllAlertMessageText(data.error[0]["errorMessage"]);
		} else
		{
			KCPT.VehicleCallNameComandSuccessStatus = data[0].seq;
			// $(alertMessageObj).text(data[0]["displayMessage"]);
			// alert("发送车辆重点监控指令成功");
			if (data.length > 0)
			{
				$(allAlertMessageObj).css("color", "#00ff00");
				$(data).each(function(i)
				{
					setTimeout(function()
					{
						if((i+1)==data.length){
							setAllAlertMessageHtml(data[i]["displayMessage"],true);
						}else{
							setAllAlertMessageHtml(data[i]["displayMessage"]);
						}
					}, 2000 * (i + 1));
				});
//				if(isBatch){
//					setTimeout(function(){
//						alertMessageObj.hide().siblings("div").show();
//					},2000*(data.length+1));
//				}
			}
		}
	}, function(data, err)
	{
		setAllAlertMessageText("发送车辆点名指令错误");
		// alert("发送车辆重点监控指令错误");
	});
};

// 指令收发记录
var ActionRecords = function()
{
	this.options = {};
	this.actionRecordsWinId = "actionRecords";
	this.popwindow = null;
	this.actionRecordsHtml = "model/monitor/popwindows/actionRecords.html";

	this.commandType = null;
	this.commandStatus = null;

	this.poplayer = {
		position : "absolute",
		width : 1020,
		height : 'auto',
		left : 308,
		top : 120,
		zIndex : 3800
	};

	this.init();
};
ActionRecords.prototype = {

	init : function(o)
	{

		var popwin = $('<div>');
		popwin.attr('id', this.actionRecordsWinId);

		popwin.css({
			"position" : this.poplayer.position,
			"width" : this.poplayer.width,
			"height" : this.poplayer.height,
			"left" : this.poplayer.left,
			"top" : this.poplayer.top,
			"z-index" : this.poplayer.zIndex
		});
		$(popwin).appendTo($("#mainDiv"));
		this.popwindow = popwin;
		this.popwindow.draggable({
			cursor : 'move',
			containment : $("#mainDiv")
		});
//		this.getCommandType();
//		this.getCommandStatus();
		this.loading();

	},
	loading : function()
	{
		var that = this;
		this.popwindow.load(this.actionRecordsHtml, {}, function()
		{
			that.initModels();
			that.bindEvent();
		});
	},
	initModels : function()
	{
		this.getCommandType();
		this.getCommandStatus();

		this.initGrid();
	},
	initCommandType : function(commandType)
	{
		var that = this,
			selectObj = this.popwindow.find("select[name='requestParam.equal.commandTypeCode']");
		this.commandType = commandType;
		$(commandType).each(function()
		{
			if (this)
				$(selectObj).append("<option value='" + this.id + "'>" + this.text + "</option>");
		});
		$(selectObj).css("width", "200px");
	},
	initCommandStatus : function(commandStatus)
	{
		var that = this,
			selectObj = this.popwindow.find("select[name='requestParam.equal.coStatus']");
		this.commandStatus = commandStatus;
		$(commandStatus).each(function()
		{
			if (this)
				$(selectObj).append("<option value='" + this.id + "'>" + this.text + "</option>");
		});
		$(selectObj).css("width", "140px");
		// setTimeout(function(){that.initGrid();},2000);
	},
	getCommandType : function()
	{
		var that = this;
		JAjax("monitor/findCommandTypeCode.action", {}, 'json', function(data, err)
		{
			that.initCommandType(data);
		}, function(data, err)
		{
			// alert("获取指令类型错误");
		});
	},
	getCommandStatus : function()
	{
		var that = this;
		JAjax("monitor/findCommandStatusCode.action", {}, 'json', function(data, err)
		{
			that.initCommandStatus(data);
		}, function(data, err)
		{
			// alert("获取指令状态错误");
		});
	},
	initGrid : function()
	{
		var that = this;
		that.grid = new ctfoGrid({
			columns : [ {
				display : '车牌号',
				name : 'vehicleNo',
				width : 100
			}, {
				display : '指令类型',
				name : 'commandTypeCode',
				width : 100,
				render : function(row)
				{
					var desc = "";
					$(that.commandType).each(function()
					{
						if (this.id == row.commandTypeCode)
							desc = this.text;
					});
					return desc;
				}
			}, {
				display : '指令状态',
				name : 'coStatus',
				width : 150,
				render : function(row)
				{
					var desc = "";
					$(that.commandStatus).each(function()
					{
						if (this.id == row.coStatus)
							desc = this.text;
					});
					return desc;
				}
			}, {
				display : '下发时间',
				name : 'coSutc',
				width : 150,
				render : function(row)
				{
					var html = utc2Date(row.coSutc);
					return html;
				}
			}, {
				display : '指令反馈时间',
				name : 'crTime',
				width : 150,
				render : function(row)
				{
					var html = utc2Date(row.crTime);
					return html;
				}
			}, {
				display : '指令描述',
				name : 'coText',
				width : 280,
				align : 'left'
			} ],
			showCheckbox : false,
			sortName : 'vehicleNo',
			url : 'monitor/findCommandByOpId.action',// ?requestParam.equal.opId=12345789

			exportAction : 'monitor/exportExcelDataActionRecord.action',
			showTitle : false,
			mainContain : 'actionRecords',
			pageSize : 40,
			pageSizeOptions : [ 10, 20, 30, 40 ],
			width : '100%',
			height : 200,
			autoLoad : true,
			// 填充数据的tableid
			tableId : 'actionRecordsList',
			mainContain : "actionRecordMng",
			Buttons : [ {// 导出
				id : "actionRecordExportExcel",
				fun : function()
				{
					that.grid.exportExcel(1, 2);
				}
			} ],
			// 查询条件formid
			searchFormId : 'actionRecordsSearch'
		});
		$("#actionRecordsSearch").find("input.Wdate:eq(0)").val((utcToDate((new Date()).getTime()) + " 00:00:00")).end().find("input.Wdate:eq(1)").val((utcToDate((new Date()).getTime()) + " 23:59:59"));
		//this.grid.search();

	},
	bindEvent : function()
	{
		var that = this;
		this.popwindow.find("div.actionRecordsDivHead img").click(function()
		{
			that.closeWindow();
		}).end();

	},

	closeWindow : function()
	{
		this.popwindow.remove();
		KCPT.ActionRecordsObj = null;
	}
};
