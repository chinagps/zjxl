function ClusterManager(map, imgs)
{
    this.map = map;
    this.sink = [];
    this.source = [];
    this.radius = 50;
    this.m_diameter = 2 * this.radius;//直径
    this.m_orig = [];
    this.m_overlapExists;
    
    this.imgs = imgs;
    
}

ClusterManager.prototype = {
		setSink : function(sink){
		    this.sink = sink;
		    this.sink_collectionChangeHandler();
		}
	,	setM_orig : function(m_orig){
		    this.sink = [];
		    this.m_orig = [];
		    this.m_orig = m_orig;
		    this.refresh();
		    this.clusterMapPointsByStep2();
		    this.showClustersOnMap();
		}

	,	sink_collectionChangeHandler : function(){
		    this.refresh();
		    this.clusterMapPoints();
		    this.showClustersOnMap();
		}

	,	refresh : function(){
		    for (var i = 0; i < this.source.length; i++) 
		    {
		        var symbol = this.source[i];
		        SE.Event.removeListener(symbol._clk);
		        this.map.removeOverLay(symbol, true);
		        symbol = null;
		    }
		    this.source = [];
		}

	,	clusterMapPoints : function(){
		    for (var car in this.m_orig) 
		    {
		        if (this.m_orig[car].tcars) 
		        {
		            this.m_orig[car].tcars = [];
		            this.m_orig[car] = null;
		            delete this.m_orig[car];
		        }
		    }
		    this.m_orig = [];
		    //1.1所有点分配到聚合数组中，形成初级的聚合圆
		    this.assignMapPointsToClusters();
		    this.clusterMapPointsByStep2();
		}
	,	clusterMapPointsByStep2 : function(){
		    do 
		    { //1.2相邻一个直径的聚合圆再进行聚合，直到超出直径
		        this.mergeOverlappingClusters();
		    }
		    while (this.m_overlapExists);
		}
	,	getOverLay : function(cluster){
			var fontS = "font-size:12px;"
			if(!this.imgs){
				var radius = cluster.n > 1 ? 20 : 8; //如果数量大于一则画大圆，否则小圆
				var ovl = new SE.PointOverlay(new SE.LngLat(cluster.lng,cluster.lat));
				ovl.setLabel(cluster.n);
				ovl.zIndexs=[480,488];
				return [ovl];
			}else{
				for(var i=0;i<this.imgs.length;i++){
					if(cluster.n>=this.imgs[i].min&&cluster.n<=this.imgs[i].max){
						var len = (cluster.n+"").length;
						var offPx = len*2;
						var offPy = 8;
						if(len==3)offPx+=4;
						if(len==4)offPx+=4;
						if(len==5)offPx+=4;
						var img = this.imgs[i].path;
						var sz = this.imgs[i].size;
						
						var icon=new SE.Icon(img,new SE.Size(sz[0],sz[1]),new SE.Point(sz[0]/2,sz[1]/2));
						icon.removeShadow();
						var mk=new SE.Marker(new SE.LngLat(cluster.lng,cluster.lat),icon);
						this.map.addOverLay(mk);
						
						var ovl=new SE.PointOverlay(new SE.LngLat(cluster.lng,cluster.lat),new SE.Point(-offPx,0));
						var dv=ovl.getObject();
						dv.style.border="none";
						dv.style.background="none";
						dv.style.zIndex=mk.getObject().style.zIndex+1;
						ovl.setLabel(cluster.n);
						ovl.setFontColor("#FFFFFF");
						ovl.zIndexs=[480,488];
						
						SE.Event.addListener(mk,"mouseover",function(p){
							dv.style.zIndex=mk.getObject().style.zIndex+1;
						});
						SE.Event.addListener(ovl,"mouseover",function(p){
							dv.style.zIndex=mk.getObject().style.zIndex+1;
						});
						
						return [ovl,mk];
					}
				}
				var ovl = new SE.PointOverlay(new SE.LngLat(cluster.lng,cluster.lat));
				ovl.setLabel(cluster.n);
				ovl.zIndexs=[480,488];
				return [ovl];
			}
		}

	,	showClustersOnMap : function(){
		    var map = this.map;
		    var bounds = this.map.getLngLatBounds();//屏幕四角坐标
		    //循环聚合点，显示与地图上
		    for (var car in this.m_orig) 
		    {
		        if (this.m_orig[car].tcars) 
		        {
		            var cluster = this.m_orig[car];
		            
		            if (bounds.containsLngLat(new SE.LngLat(cluster.lng, cluster.lat))) 
		            {
		                var cs = this.getOverLay(cluster);
		                map.addOverLay(cs[0]);
		                for (var i=0; i<cs.length; i++){
		                	this.source.push(cs[i]);//图形增加到聚合数组中
		                }
		            }
		        }
		    }
		}

	,	assignMapPointsToClusters : function(){
		    var bds = this.map.getLngLatBounds();
		    this.m_orig = [];
		    //循环所有POI
		    for (var i = 0; i < this.sink.length; i++) 
		    {
		        var tcar = this.sink[i];
		        if (bds.containsLngLat(tcar.lnglat)) 
		        {
		            //经纬度转屏幕像素（固定屏幕像素）
		            var sxy = this.getPixelCoord(tcar.lnglat);
		            //根据直径的精度，进行聚合 Convert to cluster x/y values.
		            var cx = parseInt(sxy.x / this.m_diameter);
		            var cy = parseInt(sxy.y / this.m_diameter);
		            //cx位移19位和cy组成Key  cluster dictionary key.                    
		            //var ci : int = (cx << 20) | cy; //位移20位也不够用
		            var ci = cx + "" + cy;
		            //根据key找聚合对象 Find existing cluster                    
		            var cluster = this.m_orig[ci];
		            if (cluster) 
		            { //如果聚合对象已存在
		                //平均聚合点和单签点的距离 Average centroid values based on new map point.
		                cluster.lng = (cluster.lng + tcar.lnglat.lng) / 2;
		                cluster.lat = (cluster.lat + tcar.lnglat.lat) / 2;
		                cluster.x = (cluster.x + sxy.x) / 2;
		                cluster.y = (cluster.y + sxy.y) / 2;
		                //聚合POI数量累加 Increment the number map points in that cluster.
		                cluster.n++;
		                //	            cluster.tcars.push(tcar);
		            }
		            else 
		            { //如果不存在
		                //没有的话，创建并赋值 Not found - create a new cluster as that index.
		                this.m_orig[ci] = new Cluster(sxy.x, sxy.y, cx, cy);
		                this.m_orig[ci].lng = tcar.lnglat.lng;
		                this.m_orig[ci].lat = tcar.lnglat.lat;
		                //	        	this.m_orig[ci].tcars.push(tcar);
		            }
		        }
		    }
		}
	,	mergeOverlappingClusters : function(){
		    this.m_overlapExists = false;
		    // 建立一个新的dic存储圆圆聚合后的圆 Create a new set to hold non-overlapping clusters.            
		    var dest/*<int,Cluster>*/ = [];
		    // 循环所有聚合圆，进行再聚合
		    for (var car in this.m_orig) 
		    {
		        if (this.m_orig[car].tcars) 
		        {
		            var cluster = this.m_orig[car];
		            //忽略空的聚合数组
		            if (cluster.n === 0) 
		            {
		                continue;
		            }
		            //8个方向寻找邻近可聚合的圆 Search all immediately adjacent clusters.
		            this.searchAndMerge(cluster, 1, 0);
		            this.searchAndMerge(cluster, -1, 0);
		            this.searchAndMerge(cluster, 0, 1);
		            this.searchAndMerge(cluster, 0, -1);
		            this.searchAndMerge(cluster, 1, 1);
		            this.searchAndMerge(cluster, 1, -1);
		            this.searchAndMerge(cluster, -1, 1);
		            this.searchAndMerge(cluster, -1, -1);
		            //得到新的聚合圆 Find the new cluster centroid values.                
		            var cx = parseInt(cluster.x / this.m_diameter);
		            var cy = parseInt(cluster.y / this.m_diameter);
		            cluster.cx = cx;
		            cluster.cy = cy;
		            //var ci : int = (cx << 20) | cy;
		            var ci = cx + "" + cy;
		            
		            //保存到新的聚合圆数组
		            dest[ci] = cluster;
		        }
		    }
		    //复制给原始的聚合圆数组            
		    this.m_orig = dest;
		}


	,	searchAndMerge : function(cluster, ox, oy){
		    //获得邻近块,就是扩大聚合范围。cx+1 = x+一个直径
		    var cx = cluster.cx + ox;
		    var cy = cluster.cy + oy;
		    //算出邻近块的聚合圆的ci
		    //const ci : int = (cx << 20) | cy;
		    var ci = (cx) + "" + (cy);
		    
		    //邻近圆是否存在，直径内则合并
		    var found = this.m_orig[ci];
		    if (found && found.n) 
		    {
		        var dx = found.x - cluster.x;
		        var dy = found.y - cluster.y;
		        var dd = Math.sqrt(dx * dx + dy * dy);
		        if (dd < this.m_diameter) 
		        {
		            this.m_overlapExists = true; //设置聚合状态
		            //2圆聚合、经纬度靠近点多方
		            this.merge(cluster, found);
		        }
		    }
		}

	,	merge : function(lhs, rhs){
		    var nume = lhs.n + rhs.n;
		    lhs.x = (lhs.n * lhs.x + rhs.n * rhs.x) / nume;
		    lhs.y = (lhs.n * lhs.y + rhs.n * rhs.y) / nume;
		    lhs.lng = (lhs.n * lhs.lng + rhs.n * rhs.lng) / nume;
		    lhs.lat = (lhs.n * lhs.lat + rhs.n * rhs.lat) / nume;
		    
		    lhs.n += rhs.n; // merge the map points
		    rhs.n = 0; // marke the cluster as merged.
		}

	,	getPixelCoord : function(point, center){
		    var pointMer = SE.Tool.forwardMercator(point.lng / 100000, point.lat / 100000);//转成墨卡托
		    var p = new SE.Point(pointMer[0] / this.map.zoomUnits, pointMer[1] / this.map.zoomUnits);//转化为相对于原点的屏幕像素（这个可保证当前比例尺下屏幕像素唯一）
		    return p;
		}
	,	clusterClickedHandler : function(e){
//	    	var cs:ClusterSymbol = ClusterSymbol(e.currentTarget);
//	    	
//	    	var infoWin:SE.InfoWindow = map.getInfoWindow();
//	    	
//	    	if ( !infoWin ) {
//	    		infoWin = new SE.InfoWindow(cs.lnglat);
//	    	} else {
//	    		infoWin.setLngLat(cs.lnglat);
//	    	}
//	    	
//	    	infoWin.setTitle(null);
//	    	infoWinContent.map = map;
//	    	infoWinContent.setTCars(cs.tcars.source);
//	    	infoWin.setContent(infoWinContent);
//	    	infoWinContent.y = 20;
//	    	infoWin.setWidth(250);
//	    	infoWin.setHeight(220);
//	    	
//	    	map.addOverLay(infoWin);
		}
};


var Cluster = function(x, y, cx, cy)
{
    this.x = x; //屏幕像素
    this.y = y;
    this.cx = cx; //聚合的索引值
    this.cy = cy;
    this.n = 1; //聚合的POI数量 Number of map points in the cluster
    this.lng; //经纬度
    this.lat;
    
    this.tcars = [];
    
};




var TCar = function(lng, lat)
{
    this.name = "aaa";
    this.type = "bbb";
    this.lnglat = new SE.LngLat(lng, lat);
    
};
///////////////////////////////地图补充/////////////////////////////
//SE.prototype.onMouseDown=function(e){
//	var eventTarget=e.target||e.srcElement;
//	if(!eventTarget.isCancelBubble){
////		SE.Event.cancelBubble(e);
//	}else{
//		return;
//	}
//	
//	var point=SE.Tool.getEventPosition(e,this.map.container);
//	var dragObj={
//			"startTime": (new Date()).getTime()
//		,	"startDivPoint": [e.clientX,e.clientY]
//		,	"mul": SE.Event.bind(document,"mouseup",this,this.onMouseUp)
//	};
//	this.dragObj=dragObj;
//	var pit = new SE.Point(point[0],point[1]);
//	pit[0] = point[0],pit[1] = point[1];
//	SE.Event.trigger(this,"mousedown",[pit,SE.Tool.getEventButton(e)]);
//	if(this.canDrag)
//	{
//		SE.Event.cancelBubble(e);
//		dragObj.sp=point;
//		dragObj.startPoint=this.getPoint();
//		dragObj.nCursor=this.div.style.cursor;
//		dragObj.dl=SE.Event.bind(document,"mousemove",this,this.onDrag);
//		SE.Tool.setCursorStyle(this.div,"move");
//		SE.Event.trigger(this,"dragstart",[this.getPoint()]);
//	}
//};
//
//SE.prototype.onDrag= function(e)
//{
//	if(this.canDrag)
//		SE.Event.cancelBubble(e);
//	var dragObj=this.dragObj;
//	var point=SE.Tool.getEventPosition(e,this.map.container);
//	var offset=[point[0]-dragObj.sp[0],point[1]-dragObj.sp[1]];
//	var units=this.map.zoomUnits;
//	var latlng=new SE.MercatorLngLat(dragObj.startPoint.getMercatorLongitude()+offset[0]*units[0],dragObj.startPoint.getMercatorLatitude()-offset[1]*units[1]);
//	if(this.map.getBoundsLatLng().containsPoint(latlng))
//	this.setPoint(latlng);
//	SE.Event.trigger(this,"drag",[latlng]);
//};
//
//SE.prototype.onMouseUp=function(e)
//{
//	var eventTarget=e.target||e.srcElement;
//	if(!eventTarget.isCancelBubble){
//		if(this.canDrag)
//			SE.Event.cancelBubble(e);
//	}else{
//		return;
//	}
//	
//	if(!this.map){return;}
//	var point=SE.Tool.getEventPosition(e,this.map.container);
//	var pit =  new SE.Point(point[0],point[1]);
//	pit[0] = point[0],pit[1] = point[1];
//	SE.Event.trigger(this,"mouseup",[pit,SE.Tool.getEventButton(e)]);
//	if(!this.dragObj){return;}
//	SE.Event.removeListener(this.dragObj.mul);
//	if((new Date()).getTime()-this.dragObj.startTime<=500&&(Math.abs(this.dragObj.startDivPoint[0]-e.clientX)<=2&&Math.abs(this.dragObj.startDivPoint[1]-e.clientY)<=2))
//	{
//		var p = new SE.Point(point[0],point[1]);
//		SE.Event.trigger(this.map,"click",[p,SE.Tool.getEventButton(e),this]);
//		SE.Event.trigger(this,"click",[p,SE.Tool.getEventButton(e)]);
//	}
//	this.dragEnd();
//};
