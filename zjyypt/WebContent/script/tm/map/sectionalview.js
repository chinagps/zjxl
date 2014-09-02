//by lee  截取地图时向服务端发起的请求参数
//以下代码不可放入api中,老廖混淆器会把undefined混淆掉

//属性intercept代表是否要被截取,false的话则不提交

var hostinfo="192.168.100.51:9082";//CountrySearch服务外网访问ip及端口


function getMarkersRequest(map,bd,type){
	if(type === undefined)	type = 1;
	type = type===1?"marker":"text";
	var str = [];
	var mks = map.overlays;
	var zu = map.getZoomUnits(map.getCurrentZoom());
	for(var i=0;i<mks.length;i++){
		var o = mks[i];
		if(o instanceof SE.PointOverlay){
			var pos = [];
			var left = (o.getPoint().getMercatorLongitude() - bd.getMercatorXmin())/zu;
			var top = (bd.getMercatorYmax() - o.getPoint().getMercatorLatitude())/zu;
			var paddingLeft = parseInt(SE.Tool.GetCurrentStyle(o.getObject(),"paddingLeft"));
		    var paddingTop = parseInt(SE.Tool.GetCurrentStyle(o.getObject(),"paddingTop"));
			if(o.intercept){
	//			  是个marker
				if(o.getIcon&&o.getIcon().getImgObject&&type==="marker"){
			        left = left - o.getAnchor()[0] + paddingLeft;
			        top = top - o.getAnchor()[1] + paddingTop;
					pos.push(parseInt(left));
					pos.push(parseInt(top));
	//				关于取路径的方法,其实很复杂,详见yahoo!前端工程师 秦歌 的blog,http://dancewithnet.com/2009/07/27/get-right-url-from-html/comment-page-1/#comment-215398
	//				测试了一下,绝对路径只用src就可以取道,所有浏览器适应
//					var imgurl = o.getIcon().getImgObject().src;
					var imgurl = o.getIcon().getAbsSrc();
					str.push([pos.join("@"),imgurl].join(","));
				}else if(!o.getIcon&&type==="text"){
					left -= o.getAnchor()[0];
					top -= o.getAnchor()[1];
					pos.push(parseInt(left));
					pos.push(parseInt(top));
	//				innerText和textContent有区别,例如对于空格和换行等等
					var txt = o.getObject().innerText||o.getObject().textContent;
					var divsize = [o.getObject().offsetWidth,o.getObject().offsetHeight];
	//				txt = encodeURIComponent(txt);
	//				标准浏览器返回color rgb(1,2,3);  font-size:12px	fontSize:12px 	统一用驼峰式命名法取值,其余属性类似 fontSize
	//				IE6,7,8返回color #000000;   font-size:空 	fontSize:12px			
					var color = SE.Tool.GetCurrentStyle(o.getObject(),"color");
					var size = SE.Tool.GetCurrentStyle(o.getObject(),"fontSize");
					var bgcolor = SE.Tool.GetCurrentStyle(o.getObject(),"backgroundColor");
//					if(bgcolor.split("(").length>1){
//						bgcolor = bgcolor.split("(")[1].split(")")[0].split(",");
//						bgcolor = RGB2Color(bgcolor[0],bgcolor[1],bgcolor[2]);
//					}
////					变成255@255@255形式
//					bgcolor = Color2RGB_yuyang(bgcolor);
					if("transparent"!=bgcolor){
						if(bgcolor.split("(").length>1){
							bgcolor = bgcolor.split("(")[1].split(")")[0].split(",");
							bgcolor = RGB2Color(bgcolor[0],bgcolor[1],bgcolor[2]);
						}
						// 变成255@255@255形式
						bgcolor = Color2RGB_yuyang(bgcolor);
					}
//					去px
					size = parseInt(size);
					if(color.split("(").length>1){
						color = color.split("(")[1].split(")")[0].split(",");
						color = RGB2Color(color[0],color[1],color[2]);
					}
//					变成255@255@255形式
					color = Color2RGB_yuyang(color);
					
					str.push([pos.join("@"),txt,size,color,bgcolor,divsize.join("@")].join(";"));
				}
			}
		}
	}
	return str.join("=");
}
//1为线,2为面,不传默认为1
function getPolygonsRequest(map,bd,type){
	if(type === undefined)	type = 1;
	type = type===1?"polyline":undefined;
	
	var str = [];
	var mks = map.overlays;
	var zu = map.getZoomUnits(map.getCurrentZoom());
	for(var i=0;i<mks.length;i++){
		var o = mks[i];
		if(o.intercept){
			if(o instanceof SE.Polygon){
				if(o.polygonType === type){
					var points = o.getPoints();
					var pstr = [];
					for(var j=0;j<points.length;j++){
						pstr.push([parseInt((points[j].getMercatorLongitude()-bd.getMercatorXmin())/zu),parseInt((bd.getMercatorYmax()-points[j].getMercatorLatitude())/zu)].join("@"));
					}
//					返回#000000这样的格式,也可能是red等
					var color = o.getLineColor();
//					变成255@255@255形式
					color = Color2RGB_yuyang(color);
					var weight = o.getLineStroke();
					weight = parseInt(weight);
					var style = o.getLineStyle()==="solid"?2:1;
					var opacity = o.getOpacity();
					var colorfill = o.getFillColor();
					//					变成255@255@255形式
					colorfill = Color2RGB_yuyang(colorfill);
					if("polyline" === type){
						str.push([pstr.join(","),color,weight,style,opacity].join(";"));
					}else{
						str.push([pstr.join(","),colorfill,opacity,color,weight].join(";"));
					}
				}
			}
		}
	}
	return str.join("=");
}

function getPolylinesRequest(map,bd){
	return getPolygonsRequest(map,bd,2);
}

function getLayersRequest(map){
	var str = [[map.getImgUrl(),map.getExtName(),0].join(",")];
//	因为平台自写的聚合图服务无法被截图，所以注释以下代码
//	var layers = map.getLayers();
//	for (var i=0; i<layers.length; i++) {
//		var o = layers[i];
//		str.push([o.getImgUrl(),o.getExtName(),(o.customized?1:0)].join(","));
//	}
	return str.join(";");
}

//rgb与16进制互转的两个函数
var hexch = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "A", "B", "C", "D", "E", "F"]; 
var hexStr ="0123456789ABCDEF"; 
function ToHex(n){   
	var h, l;   
	n = Math.round(n);   
	l = n % 16;   
	h = Math.floor((n / 16)) % 16;   
	return (hexch[h] + hexch[l]); 
} 
function RGB2Color(r, g, b){   
	var r, g, b;   
	return ( '#' + ToHex(r) + ToHex(g) + ToHex(b)); 
} 
//#FFFFFF 
function Color2RGB(strhex){   
	r = hexStr.indexOf(strhex.charAt(1))*16 + hexStr.indexOf(strhex.charAt(2));   
	g = hexStr.indexOf(strhex.charAt(3))*16 + hexStr.indexOf(strhex.charAt(4));   
	b = hexStr.indexOf(strhex.charAt(5))*16 + hexStr.indexOf(strhex.charAt(6));   
	return (r+","+g+","+b) 
} 
//#FFFFFF 
function Color2RGB_yuyang(strhex){   
	strhex = strhex.toUpperCase();
	r = hexStr.indexOf(strhex.charAt(1))*16 + hexStr.indexOf(strhex.charAt(2));   
	g = hexStr.indexOf(strhex.charAt(3))*16 + hexStr.indexOf(strhex.charAt(4));   
	b = hexStr.indexOf(strhex.charAt(5))*16 + hexStr.indexOf(strhex.charAt(6));   
	return r+"@"+g+"@"+b;
} 
//设置标记位
function setIntercept(map){ 
	var mks = map.overlays;
	for(var i=0;i<mks.length;i++){
		mks[i].intercept = true;
	}
}
function test1(){
	var bds = map.getBoundsLatLng();
	setIntercept(map);
	alert(getMarkersRequest(map,bds,2));
}
function test2(){
	var point = map.getCenterPoint();
	var text=new SE.PointOverlay(point);//建立地图文本对象
	text.setLabel( "<a href='http://www.smartearth.cn' target='_blank'>北京                   即可以让该</a>" );
	map.addOverLay(text); 
	var text1=new SE.PointOverlay(point,[50,50]);//建立地图文本对象
	text1.setLabel( "<a href='http://www.smartearth.cn' target='_blank'>北京起点</a>" );
	map.addOverLay(text1); 
}

//预览或保存截图
//注意,IE的form name和input type为只读
function saveMap(bds, type, geturl){
	var xMin = bds.getNTUXmin();
	var yMin = bds.getNTUYmin();
	var xMax = bds.getNTUXmax();
	var yMax = bds.getNTUYmax();
	var map = SE_MapTool.Map;
	if (xMin == xMax || yMin == yMax) {
		alert("截图区域无效，请重新绘制！");
		return;
	}
	if(!document.getElementById("snapForm")){
		var form1 = document.createElement("form");
		form1.style.display = "none";
		form1.method = "post";
		// 发现IE下加target也可以正常保存
		form1.target = "sinlee";
		form1.name = "snapForm";
		form1.id = "snapForm";
		form1.innerHTML = ''
			+'<input type="text" size="100" name="marks" />'
			+'<input type="text" size="100" name="polylines" />'
			+'<input type="text" size="100" name="polygons"/>'
			+'<input type="text" size="100" name="txts" />'
			+'<input type="text" size="100" name="boxes" />'
			+'<input type="text" size="100" name="zoom" />'
			+'<input type="text" size="100" name="maps" />'
		document.body.appendChild(form1);
	}
	// 设置标记位
	setIntercept(map);
	var formobj = document.getElementById("snapForm");
	formobj.marks.value = getMarkersRequest(map,bds,1);
	formobj.polylines.value = getPolygonsRequest(map,bds,1);
	formobj.polygons.value = getPolygonsRequest(map,bds,2);
	formobj.txts.value = getMarkersRequest(map,bds,2);
	formobj.boxes.value = parseInt(bds.getNTUXmin())/100000+","+parseInt(bds.getNTUYmin())/100000+";"+parseInt(bds.getNTUXmax())/100000+","+parseInt(bds.getNTUYmax())/100000;
	formobj.zoom.value = map.getCurrentZoom();
	formobj.maps.value = getLayersRequest(map);
	// 设置Action地址
	switch (type) {
	case 1: type = "view"; break;
	case 2: type = "save"; break;
	case 3: type = "print"; break;
	default: type = "view"; break;
	}
	var actionurl = "http://"+hostinfo+"/CountrySearch/snap?watermark=&type=" + type + "&time=" + new Date().getTime();//192.168.100.51:9082
	document.forms["snapForm"].action = actionurl;
	if (geturl) {
		actionurl += "&geturl=" + geturl;
		document.forms["snapForm"].target="SendWindowIF";
		// 获取请求Data
		var _DataMap = [];
		_DataMap.push("marks=" + formobj.marks.value);
		_DataMap.push("polylines=" + formobj.polylines.value);
		_DataMap.push("polygons=" + formobj.polygons.value);
		_DataMap.push("txts=" + formobj.txts.value);
		_DataMap.push("boxes=" + formobj.boxes.value);
		_DataMap.push("zoom=" + formobj.zoom.value);
		_DataMap.push("maps=" + formobj.maps.value);
		
		$.ajax({
			type: "POST",
			async: true,
			url: actionurl,
			data: _DataMap.join("&") + "&callback=?",
			dataType: "jsonp",
			success: function(d) {
				if (MAP_SENDER.getContentCache) {
					var cache=MAP_SENDER.getContentCache();
					if(d.url){
						cache.imgurl = d.url;
					}else{
						cache.imgurl = "none";
						cache.error = d.error;
					}
				}
			}
		});
	} else {
		document.forms["snapForm"].target="sinlee";
		formobj.submit();
	}
}