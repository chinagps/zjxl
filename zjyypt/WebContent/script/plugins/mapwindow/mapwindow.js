/**
 * 弹出地图窗口并定位车辆
 */

var mapwindow = function(o)
{
	this.container = null;
	this.map = null;
	this.mapContainer = "mapwindow";
	this.mapWidth = 800;
	this.mapHeight = 800;
	this.mapCenter = [ "116.29376", "39.95776" ];
	this.mapLevel = 15;
	this.lng = null;
	this.lat = null;
	this.iconUrl = 'images/marker.png';
	this.iconWidth = 20;
	this.iconHeight = 20;
	this.markerid = new Date().valueOf() + "_" + Math.random() * 1000;

};

mapwindow.prototype = {
	init : function(o)
	{
		if (o)
		{
			this.container = o.container;
			this.lng = o.lng;
			this.lat = o.lat;
			this.points = o.points;
			return true;
		} else
			return false;
	},
	initMap : function()
	{
		var obj = this;
		this.map = new CTFO_MAP(this.mapContainer);
		this.map.setCenter(obj.lng, obj.lat);
		this.map.setLevel(this.mapLevel);
		this.map.addCenterCrossControl();
		this.map.changeSize();
		
	},
	showMarker : function(o)
	{
		var obj = this;
		var loaded = this.init(o);
		if (loaded)
		{
			var mapwin = $('<div>');
			var mapwinid = new Date().valueOf() + "_" + Math.random() * 1000;
			mapwin.attr('id', mapwinid);
			mapwin.css({
				left : 200,
				top : 200
			});
			$(mapwin).appendTo($("#" + this.container));
			$(mapwin).load('mapwindow.html', {}, function()
			{  obj.initMap();

				if (obj.container)
				{
					$("#mapwinclose").bind('click', function()
					{
						$("#"+obj.container).remove();
					});
				}
				obj.addMarker(obj.lng, obj.lat);
				
			});
		}
	},
	showTrack : function(o)
	{
		var obj = this;
		var loaded = this.init(o);
		if (loaded)
		{
			var mapwin = $('<div>');
			var mapwinid = new Date().valueOf() + "_" + Math.random() * 1000;
			mapwin.attr('id', mapwinid);
			mapwin.css({
				left : 200,
				top : 200
			});
			$(mapwin).appendTo($("#" + this.container));
			$(mapwin).load('mapwindow.html', {}, function()
			{  obj.initMap();

				if (obj.container)
				{
					$("#mapwinclose").bind('click', function()
					{
						$("#"+obj.container).remove();
					});
				}
				obj.addTrack(obj.points);
				
			});
		}
	},
	addMarker : function(lng, lat)
	{
		var obj = this;
		var params = {
			id : obj.markerid,
			lng : obj.lng,
			lat : obj.lat,
			iconUrl : obj.iconUrl,
			iconW : obj.iconWidth,
			iconH : obj.iconHeight,
			handler : null,
			openflag : false,
			onlyOneTip : true
		};
		obj.map.addMarker(params);
	},
	addTrack : function(points)
	{
		var obj = this;
		var lineParams = {
				lineId: "test"+Math.random()
			,	lineLngLats: points
			,	lineColor: "blue"
			,	lineWdth: 2
			,	lineOpacity: 0.5
		};
		obj.map.addPolyLine(lineParams);
	}
};
