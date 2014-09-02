//在地图上画各种形状的方法 参数 1 形状类型 1 圆形 2矩形 3多边形 4折线  map 标示要增加到的地图对象  points 标示传过来的点的集合
var drawZone = function(areaid,type,map,points) {
	var shapeOverlay = null;
	var	pointsArray = new Array(); 
	switch (type) {
		case 1:
			//画圆形
			break;
		case 2:
			//画矩形
			var bounds,
				rect = points.split(";");
			var lngmin="",latmin="",lngMax="",latMax="";
			$(rect).each(function(i){
				var p = this.split(",");
				if(0==i){
					lngmin=p[0]/600000;
					latmin=p[1]/600000;
					lngMax=p[0]/600000;
					latMax=p[1]/600000;
					
				}else {
					if(lngmin>p[0]/600000){
						lngmin=p[0]/600000;
					}else{
						lngMax=p[0]/600000;
					}
					if(latmin>p[1]/600000){
						latmin=p[1]/600000;
					}else{
						latMax=p[1]/600000;
					}
				}

			});
			
			bounds = new TMLngLatBounds(lngmin,latmin,lngMax,latMax);
			var rectOptions=new TMRectOptions();
			rectOptions.bounds=bounds;
			shapeOverlay = new TMRectOverlay(rectOptions);
//			shapeOverlay.setLineColor("#ed008c");   
//			shapeOverlay.setFillColor("#ffcc00");   
//			shapeOverlay.setLineStroke(1); 
			break;
		case 3:
			//画多边形
			var polygon = points.split(";");
			
			$(polygon).each(function(){
				if(this)
					pointsArray.push(new TMLngLat(this.split(",")[0]/600000, this.split(",")[1]/600000));
			});
			var polygonOptions=new TMPolygonOptions();
			polygonOptions.lnglats = pointsArray;
			shapeOverlay = new TMPolygonOverlay(polygonOptions);
//			shapeOverlay.setLineColor("#ed008c");   
//			shapeOverlay.setFillColor("#ffcc00"); 
			break;
		case 4:
			//画折线	
			var polyline = points.split(";");
			$(polyline).each(function(){
				if(this)
					if(this.split(",")[0]!=0&&this.split(",")[1]!=0){
						pointsArray.push(new TMLngLat(this.split(",")[0]/600000, this.split(",")[1]/600000));
					}
			});
			//debugger;
			shapeOverlay = new TMPolyline( pointsArray );   
			break;
			
		default:
			break;
	}
	map.overlayManager.addOverLay( shapeOverlay );
	return shapeOverlay;
};
var areaShowRs=function(data){
	if(data.responseText=="success"){
		alert("操作成功");
	}else{
		alert("操作失败");
	}
};