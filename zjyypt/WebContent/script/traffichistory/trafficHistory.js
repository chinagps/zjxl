var TrafficHistory = function(p)
{
	var that = this;
	this.p = p;
	this.poplayer = {
		position : "absolute",
		width : 750,
		height : 'auto',
		left : 500,
		top : 420,
		zIndex : 3800
	};
	this.cMap = null;
	this.searchType = 0;// 多区域批次协查 每次查询设1 每次翻页设 0 | 单次区域协查 设 0
	this.regionSearchRectAcreageLimit = 1000;
	this.queryIdForSingle = "";
	this.queryIdForMulti = "";
	this.singleRegionSearch = true;
	this.rectInfoWinCache = null;
	this.rectCache = null;
	this.regionSearchParamsCache = null;
	this.trafficHistoryGrid = null;
	this.mainObj = $("#" + p.mainContainer);
	this.mapObj = $("#" + p.mapContainer);
	this.mapToolObj = $("#" + p.mapToolContainer);
	var g = {
		initMap : function()
		{
			that.cMap = new CTFO_MAP(p.mapContainer);
			SE_MapTool.addMapTool(that.cMap.map, p.mapToolContainer, {
				alarm : false,
				fullscreen : false
			});
			g.addNewMapTool();
			that.cMap.setCenter(116.29376, 39.95776);
			that.cMap.setLevel(4);
			that.cMap.addMapControl();
			that.cMap.addScaleControl();
			that.cMap.addMapCopyRight({
				right : 160,
				bottom : 10
			});
			that.cMap.addOverviewMapControl(false);

			that.cMap.changeSize();
		},
		addNewMapTool : function()
		{
			var button1 = [ '<span class="regionSearch_single" title="点击后请在地图上拉框">', '<img src="images/map/universallyTool/snap.png" /><a href="javascript:void(0);">单次区域协查</a></span>', '<span class="mapbtn_split">&nbsp;</span>' ];
			var button2 = [ '<span class="regionSearch_multi" title="点击后请在地图上拉框">', '<img src="images/map/universallyTool/snap.png" /><a href="javascript:void(0);">多次区域协查</a></span>', '<span class="mapbtn_split">&nbsp;</span>' ];
			that.mapToolObj.find("div.tool_panel").prepend(button2.join(""));
			that.mapToolObj.find("div.tool_panel").prepend(button1.join(""));
		},
		clearCache : function()
		{
			JAjax("accord/destroyDataByAreaCache.action", null, 'json', function(data)
			{
				// 清理缓存
			}, function(e)
			{
				// alert("查询车辆列表错误");
			});
		},
		bindEvent : function()
		{
			that.mapToolObj.find("div.tool_panel span.regionSearch_single").click(function()
			{

				that.searchType = 0;
				that.queryIdForSingle = "regionSearchSingle" + "_" + Math.floor(Math.random()) * 10000 + "_" + (new Date()).getTime();
				that.queryIdForMulti = "";
				that.singleRegionSearch = true;
				g.clearCache();
				g.startRegionSearch();
			}).end().find("div.tool_panel span.regionSearch_multi").click(function()
			{
				that.searchType = 1;
				if (!that.queryIdForMulti) that.queryIdForMulti = "regionSearchMulti" + "_" + Math.floor(Math.random()) * 10000 + "_" + (new Date()).getTime();
				that.singleRegionSearch = false;
				g.startRegionSearch();
			});
		},
		rectAcreage : function(bounds)
		{
			var minX = bounds.XminNTU, minY = bounds.YminNTU, maxX = bounds.XmaxNTU, maxY = bounds.YmaxNTU, points = [ new SE.LngLat(minX, minY), new SE.LngLat(minX, maxY), new SE.LngLat(maxX, maxY), new SE.LngLat(maxX, minY) ], acreage = SE.PolygonTool.getPointsArea(points);
			return acreage;
		},
		startRegionSearch : function()
		{
			if (control) control.close();
			control = null;
			var map = that.cMap.map, control = new SE.RectTool(map, false);
			if (that.rectInfoWinCache) map.removeOverLay(that.rectInfoWinCache, true);
			if (that.rectCache) map.removeOverLay(that.rectCache, true);
			SE.Event.bind(control, "draw", map, function(bounds, rect)
			{
				var acreage = g.rectAcreage(bounds);
				if (acreage / 1000000 > that.regionSearchRectAcreageLimit)
				{
					alert("拉框面积" + (acreage / 1000000) + "平方千米,不能大于" + that.regionSearchRectAcreageLimit + "平方千米");
					control.clear();
					return false;
				}
				control.close();
				g.regionSearch(bounds);
			});
			if (control)
			{
				control.open();
				SE_MapTool.activeControl = control;
				SE_MapTool.activeId = p.mapToolContainer + "_mapButton_0";
			}
		},
		regionSearch : function(bounds)
		{
			var map = that.cMap.map, centerPoint = bounds.getCenter(), infoWin = new SE.InfoWindow(centerPoint), infoWinHtml = g.getRectSearchHtml();
			if (that.rectInfoWinCache) map.removeOverLay(that.rectInfoWinCache, true);
			if (that.rectCache) map.removeOverLay(that.rectCache, true);
			that.rectCache = new SE.Rect(bounds);
			map.addOverLay(that.rectCache);

			var _selfDefineTip = new SE.PointOverlay(centerPoint, null, [ 0.52, 1.20 ]);// [0.58,1.16]
			_selfDefineTip.setLabel(infoWinHtml);
			_selfDefineTip.setBorderLine(0);
			_selfDefineTip.setBackgroundColor("");
			that.cMap.addOverLay(_selfDefineTip);
			that.rectInfoWinCache = _selfDefineTip;
			g.bindRectSearchTipEvent(bounds);
		},
		getRectSearchHtml : function()
		{
			var html = [
			'<div class="xiecha">', '<div class="xiecha_top">', '<label>区域协查</label>', '<div class="closeTipWindow">', '<img src="images/tipWindow/regional_xiecha_top_close.jpg" />', '</div>', '</div>', '<div class="xiecha_box">',
					'<div class="xiecha_main_1"><label>开始时间：</label><input name="regionSearchStartTime" value="" class="longWdate" readonly=true/>&nbsp;</div>'
					, '<div class="xiecha_main_2"><label>结束时间：</label><input name="regionSearchEndTime" value="" class="longWdate" readonly=true/>&nbsp;</div>'
					, '<div class="red" style="margin: 0 0 6px 74px;">开始结束时间不能超过1小时</div>', '<div class="xiecha_main_3 startRectSearch" style="margin-left:74px;">查找</div>'
					, '</div>', '</div>' ];
			return html.join("");
		},
		bindRectSearchTipEvent : function(bounds)
		{
			var map = that.cMap.map, tipDiv = that.rectInfoWinCache.getObject();
			$(tipDiv).find("div.closeTipWindow").click(function()
			{
				map.removeOverLay(that.rectInfoWinCache, true);
				map.removeOverLay(that.rectCache, true);
			}).end().find("input[name=regionSearchStartTime]").click(function()
			{
				WdatePicker({
					dateFmt : 'yyyy-MM-dd HH:mm'
				});
			}).focus(function()
			{
				WdatePicker({
					dateFmt : 'yyyy-M-d HH:mm',
					maxDate : '#F{$dp.$D(\'regionSearchEndTim\')||\'%y-%M-%d\'}',
					onpicked : function()
					{
						$("input[name=regionSearchEndTime]").focus();
					}
				});
			}).end().find("input[name=regionSearchEndTime]").click(function()
			{
				WdatePicker({
					dateFmt : 'yyyy-MM-dd HH:mm'
				});
			}).focus(function()
			{
				WdatePicker({
					dateFmt : 'yyyy-M-d HH:mm',
					maxDate : '#F{$dp.$D(\'regionSearchStartTime\')}'
				});
			}).end().find("div.startRectSearch").click(function()
			{
				var queryId = (that.singleRegionSearch ? that.queryIdForSingle : that.queryIdForMulti), startTime = date2utcm($(tipDiv).find("input[name=regionSearchStartTime]").val()), endTime = date2utcm($(tipDiv).find("input[name=regionSearchEndTime]").val()), params = [ {
					name : "queryParam.llon",
					value : bounds.XminNTU * 6
				}, {
					name : "queryParam.llat",
					value : bounds.YmaxNTU * 6
				}, {
					name : "queryParam.rlon",
					value : bounds.XmaxNTU * 6
				}, {
					name : "queryParam.rlat",
					value : bounds.YminNTU * 6
				}, {
					name : "queryParam.startTime",
					value : startTime
				}, {
					name : "queryParam.endTime",
					value : endTime
				}, {
					name : "queryParam.queryId",
					value : queryId
				}, {
					name : "queryParam.change",
					value : that.searchType
				} ];
				if (!startTime || !endTime)
				{
					$.ligerDialog.alert("起止时间不能为空");
					return false;
				}
				if (startTime > endTime)
				{
					$.ligerDialog.alert("结束时间不能小于开始时间");
					return false;
				}
				if ((endTime - startTime) > 60 * 60 * 1000)
				{
					$.ligerDialog.alert("起止时间不能超过1小时");
					return false;
				}
				if (that.trafficHistoryGrid)
				{
					g.reloadGrid(params);
					that.mainObj.find("div.trafficHistoryVehicleList").show();
				}
				else
				{
					g.getVehicleListByRegion(params);
				}
				map.removeOverLay(that.rectInfoWinCache, true);
				map.removeOverLay(that.rectCache, true);
			});
		},
		getVehicleListByRegion : function(params)
		{
			if (params)
			{
				var popwin = that.mainObj.find("div.trafficHistoryVehicleList");
				popwin.removeClass("hidden");
				popwin.css({
					"position" : that.poplayer.position,
					"width" : that.poplayer.width,
					"height" : that.poplayer.height,
					"left" : that.poplayer.left,
					"top" : that.poplayer.top,
					"z-index" : that.poplayer.zIndex

				});
				popwin.draggable({
					cursor : 'move',
					containment : that.mainObj
				});
				$(popwin).find("div.mapclose").click(function()
				{
					$(popwin).hide();
				});
				$(popwin).find("div.maptp_monitor").ligerGrid({
					pageParmName : 'queryParam.page', // 页索引参数名，(提交给服务器)
					pagesizeParmName : 'queryParam.rows',
					columns : [ {
						display : "车牌号",
						width : 80,
						name : "vehicleno"
					}, {
						display : "当时驾驶员",
						width : 120,
						name : "cname",
						render : function(row)
						{
							return null2blank(row.cname);
						}
					}, {
						display : "速度(千米/小时)",
						width : 120,
						name : "speed",
						render : function(row)
						{
							var speedStr = parseInt(row.speed) / 10 + "";
							return speedStr.substring(0, speedStr.indexOf(".") + 2);
						}
					}, {
						display : "进区域时间",
						width : 240,
						name : "startTime",
						render : function(row)
						{
							var html = utc2Date(row.startTime);
							return html;
						}
					}, {
						display : "期间报警",
						width : 160,
						name : "alarm",
						render : function(row, r)
						{
							var alarmArr = row.alarm.split(","), html = "";
							$(alarmArr).each(function()
							{
								if (this != "" && this != undefined) html += getAlarmTypeDesc(this) + ",";
							});
							html = html.substring(0, html.length - 1);
							var span = '<span class="cutText" style="width:150px;" title=' + html + '>' + html + '</span>';
							return span;
						}
					} ],
					width : "100%",
					height : 226,
					dataAction : 'server',
					autoLoad : true,
					url : 'accord/findDataByArea.action',
					parms : params,
					pageSize : 30,
					pageSizeOptions : [ 10, 20, 30, 40, 50, 60, 70, 80, 90, 100 ],
					inPageAction : true,
					timeout : 60000
				});
				that.trafficHistoryGrid = $(popwin).find("div.maptp_monitor").ligerGetGridManager();
			}
		},
		reloadGrid : function(params)
		{
			that.trafficHistoryGrid.setOptions({
				parms : params
			});
			that.trafficHistoryGrid.loadDataOut(true);
		},
		onResize : function()
		{
			var height = KCPT.root.getCenterSize().height;
			var width = $(window).width();
			that.mapObj.width(width).height(height - 35);
			that.mapToolObj.width(width);
		}
	};
	KCPT.root.leftTree.hide();
	g.onResize();
	g.initMap();
	g.bindEvent();
};

$(function()
{
	var trafficHistoryParams = {
		mainContainer : "trafficHistoryPanel",
		mapContainer : "trafficHistoryMap",
		mapToolContainer : "trafficHistoryMapTool"
	};
	var trafficHistoryObj = new TrafficHistory(trafficHistoryParams);
});
