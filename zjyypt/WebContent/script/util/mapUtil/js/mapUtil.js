var mapUtil = function(o) {

	this.mapDIV = "mapwindow";

	this.iconUrl = 'script/util/mapUtil/images/marker.png';
	this.startIconUrl='images/addressMarker/startPoint.png'; 
	this.endIconUrl='images/addressMarker/endPoint.png';     

	this.mapLevel = 13;
	
	this.iconWidth = 20;
	
	this.iconHeight = 20;

	this.options;
	
	this.init(o);
};

mapUtil.prototype = {
	init : function(o) {
		var obj = this;
		if (o) {
			obj.options = o;
			
			obj.height = o.height - 50;
			
			obj.width = o.width - 10;
			
			return obj.initMap();
		} else
			alert("初始化失败");
	},
	initMap : function() {
		var obj = this;
		
		obj.map = new CTFO_MAP(obj.options.mapDiv ? obj.options.mapDiv : obj.mapDIV);
		
	//	obj.map.setCenter(obj.options.lng, obj.options.lat);
		obj.map.setLevel(obj.mapLevel);
 		//obj.map.addCenterCrossControl();
 		obj.map.addMapControl(1);
//		obj.map.changeSize();
		return true;
	},
	addMarkers : function(points)
	{
		var obj = this;
		for(var i = 0; i < points.length; i++){
			var params = {
					id : new Date().valueOf() + "_" + Math.random() * 1000,
					lng : points[i],
					lat : points[i+1],
					iconUrl : obj.iconUrl,
					iconW : obj.iconWidth,
					iconH : obj.iconHeight,
					handler : null,
					openflag : false,
					onlyOneTip : true
				};
				obj.map.addMarker(params);
				//obj.map.setCenter(points[i], points[i+1]);
				i++;
		}
		
	},
	//标注起始点并在在两点之间画轨迹
	addMarkersAndLine : function(points){
 		var obj = this;
		//调整在最佳视野范围内
 		obj.map.getBestMaps(points.slice(0));
		//开始点
 		var startParams = {
				id : new Date().valueOf() + "_" + Math.random() * 1000,
				lng : points[0],
				lat : points[1],
				iconUrl : obj.startIconUrl,
				iconW : obj.iconWidth,
				iconH : obj.iconHeight,
				handler : null,
				openflag : false,
				onlyOneTip : true
		 };
		 obj.map.addMarker(startParams);
		//结束点
		 var endParams = {
					id : new Date().valueOf() + "_" + Math.random() * 1000,
					lng : points[points.length-2],
					lat : points[points.length-1],
					iconUrl : obj.endIconUrl,
					iconW : obj.iconWidth,
					iconH : obj.iconHeight,
					handler : null,
					openflag : false,
					onlyOneTip : true
			 };
			 obj.map.addMarker(endParams);
		//轨迹
			 obj.addTrackDataListMap(points);
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
 		obj.map.setCenter(points[0], points[1]);
		obj.map.addPolyLine(lineParams);
	},
	addTrackDataListMap : function(points)
	{
		var obj = this;
  		var lineParams = {
				lineId: "test"+Math.random()
			,	arrLngLat: points
			,	lineColor: "blue"
			,	lineWdth: 2
			,	lineOpacity: 0.5
		};
  		//set地图中心点
		//if(points.length!=0){
		//   if((points.length)/2%2==0){
 		//	obj.map.setCenter(points[points.length/2], points[points.length/2+1]);
 		//     }else{
		// 	obj.map.setCenter(points[(points.length)/2+1], points[(points.length)/2+2]);
		 //  }
 		//} 
  		obj.map.addPolyLine(lineParams);
 	},
	moveMarkers : function(points)
	{
		var obj = this;
		for(var i = 0; i < points.length; i++){
			var params = {
					id : new Date().valueOf() + "_" + Math.random() * 1000,
					lng : points[i],
					lat : points[i+1],
					iconUrl : obj.iconUrl,
					iconW : obj.iconWidth,
					iconH : obj.iconHeight,
					handler : null,
					openflag : false,
					onlyOneTip : true
				};
				obj.map.addMarker(params);
				obj.map.setCenter(points[i], points[i+1]);
				i++;
		}
		
	}
};

