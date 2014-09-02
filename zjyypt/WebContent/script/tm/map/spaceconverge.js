///**
// * 控制聚合数量显示,根据数值用6级圆圈表示
// * @param p {Object} 参数集合,具体参数说明见私有变量defaultParam
// * @return SpaceConverge对象的引用
// */
//window.hasCluster = true;
//var SpaceConverge = function(p){
//	//默认变量
//	var defaultParam = {
//			type: "1,2,3,5,6"//设置默认搜索的类型
//		,	dis: 110000//设置默认搜索的行政区划
//		,	splitLevelMin: 1//1和10之间显示小点，包括1和10
//		,	splitLevelMax: 10
//		,	scUrl: "http://192.168.5.139:7003"//"http://222.240.193.170:7003"//聚合服务器
//		,	arrImage: [
//			 	{
//				    path: "images/map/ioc6.png",
//				    min: 0,
//				    max: 100,
//				    size: [28, 28]
//				}
//			,	{
//				    path: "images/map/ioc5.png",
//				    min: 101,
//				    max: 500,
//				    size: [34, 34]
//				}
//			,	{
//				    path: "images/map/ioc4.png",
//				    min: 501,
//				    max: 1000,
//				    size: [40, 40]
//				}
//			,	{
//				    path: "images/map/ioc3.png",
//				    min: 1001,
//				    max: 5000,
//				    size: [46, 46]
//				}
//			,	{
//				    path: "images/map/ioc2.png",
//				    min: 5001,
//				    max: 10000,
//				    size: [52, 52]
//				}
//			,	{
//				    path: "images/map/ioc1.png",
//				    min: 10001,
//				    max: Number.MAX_VALUE,
//				    size: [59, 59]
//				}
//			]
//		,	map: null//外部传入地图对象
//		
//		,	_mzstart: null
//		,	_cmObj: null
//		,	_imgshow: null
//		,	_imghide: null
//		,	_imgs: null
//		,	_c_timer: null
//	};
//	//私有对象缓存
////	var privateVariate = {
////			_mzstart: null
////		,	_cmObj: null
////		,	_imgshow: null
////		,	_imghide: null
////		,	_imgs: null
////		,	_c_timer: null
////	};
//	//扩展默认变量,根据传入的参数
//	p = $.extend({}, defaultParam, p || {});
//	
//	var g = {
//			/**
//			 * 绑定到地图.
//			 */
//			bindMap: function(){
//				p._mzstart = SE.Event.bind(p.map, "zoom", window, g.mapZoomst);
//				p._cmObj = new ClusterManager(p.map, p.arrImage);
//				p._imgshow = SE.Event.bind(p.map, "showimg", window, g._on_imgshow);
//				p._imghide = SE.Event.bind(p.map, "hiddenimg", window, g._on_imghide);
//				p._imgs = {};
//			    p.map.moveMapImages(true);
//			}
//			/**
//			 * 地图比例尺变换事件处理.
//			 * 
//			 * @param oldZoom 变换前比例尺
//			 * @param newZoom 变换后比例尺
//			 */
//		,	mapZoomst: function(oldZoom, newZoom){
//				var lv = newZoom;
//				if ((lv > p.splitLevelMax || lv < p.splitLevelMin) && p._imgshow) 
//			    {
//			    	p._cmObj.refresh();
//			        g._bindImgHide();
//			        p._imgs = {};
//			    }
//			    else if ((lv <= p.splitLevelMax && lv >= p.splitLevelMin) && !p._imgshow) 
//			    {
//			    	g._bindImgShow();
//			    	p.map.moveMapImages(true);
//			    }
//			    if (p.map) 
//			    {
//			    	p._cmObj.refresh();
//			    }
//			}
//			/**
//			 * 取消绑定地图.
//			 */
//		,	unBindMap: function(){
//				if (!p.map) 
//			        return;
//			    p.map = null;
//			    
//			    g._bindImgHide();
//			    SE.Event.removeListener(p._mzstart);
//			    p._cmObj.refresh();
//			    p._cmObj = null;
//			}
//			/**
//			 * 聚合搜索.
//			 */
//		,	search: function(){
//			    if (!p.map) 
//			        return;
//			    p._cmObj.refresh();
////			    p.type = type;
////			    p.dis = dis;
//			    p._imgs = {};
//			    p.map.moveMapImages(true);
//			}
//			/**
//			 * 地图图片数据载入后的处理.
//			 * 
//			 * @param data 地图图片数据
//			 * @param id 块号及比例尺数组[块号X,块号Y,比例尺]
//			 * @param obj 地图图片对象
//			 */
//		,	onJsLoad: function(data, id, obj){
//				if (!p.map) 
//			        return;
//			    
//			    if (!obj) 
//			        return; //be  delete
//			    obj._poisData = data;
//			    obj._id = id;
//			    clearTimeout(p._c_timer);
//			    p._c_timer = setTimeout(function()
//			    {
//			    	g._cluster();
//			    	p._c_timer = null;
//			    }, 1000);
//			}
//			/**
//			 * 经纬度坐标转屏幕像素.
//			 * 
//			 * @param xyz 块号及比例尺
//			 * @param xy 经纬度坐标
//			 * @param map 地图实例对象
//			 * @return 屏幕像素坐标
//			 */
//		,	getPx: function(xyz, xy, map){
//			    var lv = map.zoomLevels[xyz[2]];
//			    var zu = map.getZoomUnits(lv);
//			    var x = xyz[0] * zu * 256 - 156543.0339 * 128;
//			    var y = 156543.0339 * 128 - xyz[1] * zu * 256;
//			    var px = x / zu + 256 / 4 * xy[0];
//			    var py = y / zu - 256 / 4 * xy[1];
//			    return [px, py];
//			}
//			/**
//			 * 屏幕像素坐标转经纬度.
//			 * 
//			 * @param xyz 块号及比例尺
//			 * @param xy 屏幕像素坐标
//			 * @param map 地图实例对象
//			 * @return 经纬度坐标
//			 */
//		,	getLngLat: function(xyz, xy, map){
//			    var lv = map.zoomLevels[xyz[2]];
//			    var zu = map.getZoomUnits(lv);
//			    var x = xyz[0] * zu * 256 - 156543.0339 * 128;
//			    var y = 156543.0339 * 128 - xyz[1] * zu * 256;
//			    var mx = x + (256 / 4 * xy[0] - 256 / 8) * zu;
//			    var my = y - (256 / 4 * xy[1] - 256 / 8) * zu;
//			    
//			    return SE.Tool.inverseMercator(mx, my);
//			}
//		,	_bindImgShow: function(){
//				p._imgshow = SE.Event.bind(p.map, "showimg", window, g._on_imgshow);
//		    	p._imghide = SE.Event.bind(p.map, "hiddenimg", window, g._on_imghide);
//	        
//			}
//		,	_bindImgHide: function(){
//				SE.Event.removeListener(p._imgshow);
//			    SE.Event.removeListener(p._imghide);
//			    p._imgshow = null;
//		        p._imghide = null;
//			}
//			/**
//			 * 地图图片显示触发事件处理.
//			 * 
//			 * @param id 块号及比例尺数组[块号X,块号Y,比例尺]
//			 */
//		,	_on_imgshow: function(id){
//			    if (id[0] < 0 || id[1] < 0) 
//			        return;
//			    var lv = p.map.zoomLevels[id[2]];
//			    if (lv > p.splitLevelMax || lv < p.splitLevelMin) 
//			        return;
//			    var signal = id.join("_");
//			    if (p._imgs[signal]) 
//			        return;
//			    p._imgs[signal] = {};
//			    
//			    var loader = SE.ObjectLoader.getObject();
//			    SE.Event.bind(loader, "loaded", this, function(data)
//			    {
//			        //			ie下loader函数貌似有问题
//			        g.onJsLoad.call(this, data, id, p._imgs[signal]);
//			    });
//			    
//			    var jsurl = p.scUrl+"/SE_MG_CAR?st=mg&lev=" + lv 
//			    	+ "&x=" + id[0] + "&y=" + id[1] + "&grid=2&dis=" + p.dis + "&type=" + p.type;
//	
//			    setTimeout(function()
//			    {
//			        loader.load(jsurl, false, false, "_MG_" + lv + "_" + id[0] + "_" + id[1]);
//			    }, 10);
//			}
//			/**
//			 * 地图图片隐藏时触发的事件处理.
//			 * 
//			 * @param id 块号及比例尺数组[块号X,块号Y,比例尺]
//			 */
//		,	_on_imghide: function(id){
//			    if (id[0] <= 0 || id[1] <= 0) 
//			        return;
//			    var signal = id.join("_");
//			    p._imgs[signal] = null;
//			    delete p._imgs[signal];
//			}
//			/**
//			 * 执行初次聚合
//			 */
//		,	_cluster: function(){
//				if(!hasCluster){
//					return;
//				}
//				if (!p.map) 
//			        return;
//			    var x,
//			    	y,
//			    	temp_ary = {},
//			    	zm = p.map.getCurrentZoom();
//			    for (var t in p._imgs) {
//			        var data = p._imgs[t]._poisData;
//			        var id = p._imgs[t]._id;
//			        if (id && (id[2] + 1) != zm) 
//			            continue;
//			        if (data) {
//			            for (var i = 0; i < data.c.length; i++) {
//			                if (data.c[i] == 0) 
//			                    continue;
//			                y = Math.ceil((i + 1) / 4);
//			                x = (i + 1) % 4;
//			                x = x == 0 ? 4 : x;
//			                var pxpy = g.getPx(id, [x, y], p.map);
//			                var lnglat = g.getLngLat(id, [x, y], p.map);
//			                if (lnglat[0] < 0 || lnglat[0] > 180 || lnglat[1] < 0 || lnglat[1] > 180) 
//			                {
//			                    //return;
//			                }
//			                
//			                var cx = parseInt(pxpy[0] / 100);
//			                var cy = parseInt(pxpy[1] / 100);
//			                //cx位移19位和cy组成Key  cluster dictionary key.                    
//			                //var ci : int = (cx << 20) | cy; //位移20位也不够用
//			                var ci = cx + "" + cy;
//	
//			                var cluster = temp_ary[ci];
//			                if (cluster) { 	
//			                	//如果聚合对象已存在
//			                	//平均聚合点和单签点的距离 Average centroid values based on new map point.
//			                    cluster.lng = (cluster.lng * cluster.n + lnglat[0] * data.c[i]) / (data.c[i] + cluster.n);
//			                    cluster.lat = (cluster.lat * cluster.n + lnglat[1] * data.c[i]) / (data.c[i] + cluster.n);
//			                    cluster.x = (cluster.x * cluster.n + pxpy[0] * data.c[i]) / (data.c[i] + cluster.n);
//			                    cluster.y = (cluster.y * cluster.n + pxpy[1] * data.c[i]) / (data.c[i] + cluster.n);
//			                    //聚合POI数量累加 Increment the number map points in that cluster.
//			                    cluster.n += data.c[i];
//			                    //cluster.tcars.push(tcar);
//			                }else { 
//			                	//如果不存在
//			                    //没有的话，创建并赋值 Not found - create a new cluster as that index.
//			                    temp_ary[ci] = new Cluster(pxpy[0], pxpy[1], cx, cy);
//			                    temp_ary[ci].lng = lnglat[0];
//			                    temp_ary[ci].lat = lnglat[1];
//			                    temp_ary[ci].n = data.c[i];
//			                    //this.m_orig[ci].tcars.push(tcar);
//			                }
//			            }
//			        }
//			    }
//			    p._cmObj.setM_orig(temp_ary);
//			}
//	};
//	
//	//初始化
////	g.unBindMap();
//	g.bindMap();
//	g.search();
//	
//	this.g = g;
//	this.p = p;
//};
//


window.SpaceConverge = window.SpaceConverge || {};
SpaceConverge.SCURL = "http://192.168.5.139:7003";// 聚合服务器
//设置默认搜索的类型
SpaceConverge.type = "1";
//设置默认搜索的行政区划
SpaceConverge.dis = "100748";
//1和10之间显示聚合，包括1和10
SpaceConverge.splitLevelMin = 1;
SpaceConverge.splitLevelMax = 10;
//设置在0到1000点时显示74*74大小的图片
//SpaceConverge.image=[{path:"img/p1.png",min:0,max:1000,size:[74,74]},{path:"img/p2.png",min:1001,max:Number.MAX_VALUE,size:[74,74]}];
SpaceConverge.image = [
        {
			path: "images/map/ioc6.png",
			min: 0,
			max: 100,
			size: [28, 28]
		}
	,	{
			path: "images/map/ioc5.png",
			min: 101,
			max: 500,
			size: [34, 34]
		}
	,	{
			path: "images/map/ioc4.png",
			min: 501,
			max: 1000,
			size: [40, 40]
		}
	,	{
			path: "images/map/ioc3.png",
			min: 1001,
			max: 5000,
			size: [46, 46]
		}
	,	{
			path: "images/map/ioc2.png",
			min: 5001,
			max: 10000,
			size: [52, 52]
		}
	,	{
			path: "images/map/ioc1.png",
			min: 10001,
			max: Number.MAX_VALUE,
			size: [59, 59]
		}
	];
SpaceConverge._radius = 100;
/**
 * 绑定到地图.
 * 
 * @param map 地图实例对象
 */
SpaceConverge.bindMap = function(map){
	SpaceConverge.map = map;
	//比例尺缩放监听事件
	SpaceConverge._mzstart = SE.Event.bind(map, "zoom", window, SpaceConverge.mapZoomst);
	
	SpaceConverge.CM = new ClusterManager(map, SpaceConverge.image);
//	SpaceConverge.CM.setSink(arrcol);
	
	SpaceConverge._imgshow = SE.Event.bind(map, "showimg", window, SpaceConverge._on_imgshow);
	SpaceConverge._imghide = SE.Event.bind(map, "hiddenimg", window, SpaceConverge._on_imghide);
	SpaceConverge._imgs = {};	
	map.moveMapImages(true);//触发显示聚合
};
/**
 * 地图比例尺变换事件处理.
 * 
 * @param oldZoom 变换前比例尺
 * @param newZoom 变换后比例尺
 */
SpaceConverge.mapZoomst = function(oldZoom,newZoom){
	var map = SpaceConverge.map;
	var lv = newZoom;
	if((lv > SpaceConverge.splitLevelMax || lv < SpaceConverge.splitLevelMin) && SpaceConverge._imgshow){
		SpaceConverge.CM.refresh();
		SE.Event.removeListener(SpaceConverge._imgshow);
		SE.Event.removeListener(SpaceConverge._imghide);
		SpaceConverge._imgshow = null;
		SpaceConverge._imghide = null;
		SpaceConverge._imgs = {};
	}else if((lv <= SpaceConverge.splitLevelMax && lv >= SpaceConverge.splitLevelMin) && !SpaceConverge._imgshow){
		SpaceConverge._imgshow = SE.Event.bind(map, "showimg", window, SpaceConverge._on_imgshow);
		SpaceConverge._imghide = SE.Event.bind(map, "hiddenimg", window, SpaceConverge._on_imghide);
		map.moveMapImages(true);
	}
	if(map){
		SpaceConverge.CM.refresh();
	}
};
/**
 * 取消绑定地图.
 */
SpaceConverge.unBindMap = function(){
	if(!SpaceConverge.map) return;
	SpaceConverge.map = null;
	SE.Event.removeListener(SpaceConverge._imgshow);
	SE.Event.removeListener(SpaceConverge._imghide);
	SE.Event.removeListener(SpaceConverge._mzstart);
	SpaceConverge._imgshow = null;
	SpaceConverge._imghide = null;
	SpaceConverge.CM.refresh();
	SpaceConverge.CM = null;
};
/**
 * 聚合搜索.
 * 
 * @param type 车辆类型
 * @param dis 行政区划
 */
SpaceConverge.search = function(type,dis){
	if(!SpaceConverge.map) return;
	SpaceConverge.CM.refresh();
	SpaceConverge.type = type ? type : SpaceConverge.type;
	SpaceConverge.dis = dis ? dis : SpaceConverge.dis;
	SpaceConverge._imgs = {};
	SpaceConverge.map.moveMapImages(true);
};
/**
 * 地图图片显示触发事件处理.
 * 
 * @param id 块号及比例尺数组[块号X,块号Y,比例尺]
 */
SpaceConverge._on_imgshow = function(id){
	if(id[0] < 0 || id[1] < 0) return;
	var lv = SpaceConverge.map.zoomLevels[id[2]];
	if(lv > SpaceConverge.splitLevelMax || lv < SpaceConverge.splitLevelMin) return;
	var signal = id.join("_");
	if(SpaceConverge._imgs[signal]){
		return;
	}
	SpaceConverge._imgs[signal] = {};
	
	var loader = SE.ObjectLoader.getObject();
	SE.Event.bind(loader, "loaded", this, function(data){
		//IE下loader函数貌似有问题
		SpaceConverge.onJsLoad.call(this, data, id, SpaceConverge._imgs[signal]);
	});
	
	var jsurl = SpaceConverge.SCURL+"/SE_MG_CAR?st=mg&lev="+lv+"&x="+id[0]+"&y="+id[1]+"&grid=2&dis="+SpaceConverge.dis+"&type="+SpaceConverge.type;

	setTimeout(function(){
		loader.load(jsurl,false,false,"_MG_"+lv+"_"+id[0]+"_"+id[1]);
	},10);    	
	
};
/**
 * 地图图片隐藏时触发的事件处理.
 * 
 * @param id 块号及比例尺数组[块号X,块号Y,比例尺]
 */
SpaceConverge._on_imghide = function(id){
	if(id[0] <= 0 || id[1] <= 0) return;
	var signal = id.join("_");
	SpaceConverge._imgs[signal] = null;
	delete SpaceConverge._imgs[signal];
};
/**
 * 地图图片数据载入后的处理.
 * 
 * @param data 地图图片数据
 * @param id 块号及比例尺数组[块号X,块号Y,比例尺]
 * @param obj 地图图片对象
 */
SpaceConverge.onJsLoad = function(data,id,obj){
	if(!SpaceConverge.map) return;
	if(!obj) return;	//be delete
	obj._poisData = data;
	obj._id = id;
	clearTimeout(SpaceConverge._c_timer);
	SpaceConverge._c_timer = setTimeout(function(){
		SpaceConverge._cluster();
		SpaceConverge._c_timer = null;
	},1000);
};
/**
 * 执行初次聚合.
 */
SpaceConverge._cluster = function(){
	if(!SpaceConverge.map) return;
	var x,y;
	var temp_ary = {};
	var zm = SpaceConverge.map.getCurrentZoom();
	for(var t in SpaceConverge._imgs){
		var data = SpaceConverge._imgs[t]._poisData;
		var id = SpaceConverge._imgs[t]._id;
		if(id && (id[2]+1) != zm) continue;
		if(data){
			for(var i=0;i<data.c.length;i++){
				if(data.c[i]==0){
					continue;
				}
				y = Math.ceil((i+1) / 4);
				x = (i+1) % 4;
				x = x==0?4 : x;
				var pxpy = SpaceConverge.getPx(id,[x,y],SpaceConverge.map);
				var lnglat = SpaceConverge.getLngLat(id,[x,y],SpaceConverge.map);
				if(lnglat[0]<0||lnglat[0]>180||lnglat[1]<0||lnglat[1]>180){
//					return;
				}
				
				var cx = parseInt(pxpy[0] / (SpaceConverge._radius*2));
				var cy = parseInt(pxpy[1] / (SpaceConverge._radius*2));
				//cx位移19位和cy组成Key  cluster dictionary key.                    
				//var ci : int = (cx << 20) | cy; //位移20位也不够用
				var ci = cx+""+cy;
				
				var cluster = temp_ary[ci];
				if(cluster){ //如果聚合对象已存在
						//平均聚合点和单签点的距离 Average centroid values based on new map point.
					cluster.lng = (cluster.lng*cluster.n + lnglat[0]*data.c[i]) / (data.c[i]+cluster.n);
				    cluster.lat = (cluster.lat*cluster.n + lnglat[1]*data.c[i]) / (data.c[i]+cluster.n);
				    cluster.x = (cluster.x*cluster.n + pxpy[0]*data.c[i]) / (data.c[i]+cluster.n);
				    cluster.y = (cluster.y*cluster.n + pxpy[1]*data.c[i]) / (data.c[i]+cluster.n);
				    //聚合POI数量累加 Increment the number map points in that cluster.
				    cluster.n += data.c[i];
				//	            cluster.tcars.push(tcar);
				}else{ //如果不存在
				    //没有的话，创建并赋值 Not found - create a new cluster as that index.
				    temp_ary[ci] = new Cluster( pxpy[0], pxpy[1], cx, cy);
				    temp_ary[ci].lng = lnglat[0];
					temp_ary[ci].lat = lnglat[1];
					temp_ary[ci].n = data.c[i];
				//	this.m_orig[ci].tcars.push(tcar);
				}
			}
		}
	}
	SpaceConverge.CM.setM_orig(temp_ary);
};
/**
 * 经纬度坐标转屏幕像素.
 * 
 * @param xyz 块号及比例尺
 * @param xy 经纬度坐标
 * @param map 地图实例对象
 * @return 屏幕像素坐标
 */
SpaceConverge.getPx = function(xyz,xy,map){
	var lv = map.zoomLevels[xyz[2]];
	var zu = map.getZoomUnits(lv);
	var x = xyz[0] * zu * 256 - 156543.0339*128;
	var y = 156543.0339*128 - xyz[1] * zu * 256;
	var px = x/zu + 256/4 * xy[0];
	var py = y/zu - 256/4 * xy[1];
	return [px,py];
};
/**
 * 屏幕像素坐标转经纬度.
 * 
 * @param xyz 块号及比例尺
 * @param xy 屏幕像素坐标
 * @param map 地图实例对象
 * @return 经纬度坐标
 */
SpaceConverge.getLngLat = function(xyz,xy,map){
	var lv = map.zoomLevels[xyz[2]];
	var zu = map.getZoomUnits(lv);
	var x = xyz[0] * zu * 256 - 156543.0339*128;
	var y = 156543.0339*128 - xyz[1] * zu * 256;
	var mx = x + (256/4 * xy[0] - 256/8) * zu;
	var my = y - (256/4 * xy[1] - 256/8) * zu;
	
	return SE.Tool.inverseMercator(mx,my);
};




