/**
 * 地图工具条组件.
 *
 * @author bxf baoxiufeng@terra-it.cn
 */
var hostinfo="192.168.100.51:9082";//CountrySearch服务外网访问ip及端口

window.SE_MapTool = window.SE_MapTool||{};
window.control = window.control || null;
/** ID前缀 */
SE_MapTool.PID=null;
/** 地图实例 */
SE_MapTool.Map=null;

/**
 * 初始化地图工具条.
 * 
 * @param id 地图工具条挂载DIV容器ID
 * @param map 地图实例
 * @param p 额外工具的权限属性
 */
SE_MapTool.addMapTool = function(map,id, p) {
	SE_MapTool.Map = map;
	var pid=SE_MapTool.pid=id;
	SE_Rego._Element = null;
	var content=[];
	// 地图中心列表
	// 地图工具条
	content.push('<div id="'+pid+'tool_panel" class="tool_panel">');
	if((p && p.alarm) || !p){
		content.push('<span class="alarmSound" title="静音">');
		content.push('<img src="images/maptool/alarm-on.png" /><a href="javascript:void(0);">静音</a></span>');
		content.push('<span class="mapbtn_split">&nbsp;</span>');	
	}
	content.push('<span class="shishijiaotong" ><img src="images/maptool/traffic.png" style="margin-top:0px;"/><a href="javascript:void(0);">实时路况</a>&nbsp;</span>');
	content.push('<span class="mapbtn_more" onclick="SE_MapTool.moreMapbtn(this)"><a href="javascript:void(0);">地图工具</a><img src="images/maptool/more.png" /></span>');
	content.push('<span class="mapbtn_split">&nbsp;</span>');
	content.push('<div id="'+pid+'more_btn" class="more_btn hidden">');
	content.push('<img class="more_btn_arrow" src="images/maptool/arrow.gif" />');
	
	content.push('<span id="'+pid+'mapButton_0" onclick="SE_MapTool.mapToolButtonClick(this)" title="拖动">');
	content.push('<img src="images/maptool/handmove.png" /><a href="javascript:void(0);">拖动</a></span>');
	content.push('<br />');
	content.push('<span class="zoom_in" id="'+pid+'mapButton_1" onclick="SE_MapTool.mapToolButtonClick(this);SE_MapTool.hiddMoreMapbtn();" title="拉框放大">');
	content.push('<img src="images/maptool/zoomin.png" /><a href="javascript:void(0);">拉框放大</a></span>');
	content.push('<br />');
	content.push('<span id="'+pid+'mapButton_3" onclick="SE_MapTool.mapToolButtonClick(this);SE_MapTool.hiddMoreMapbtn();" title="拉框缩小">');
	content.push('<img src="images/maptool/zoomout.png" /><a href="javascript:void(0);">拉框缩小</a></span>');
	content.push('<br />');
	content.push('<span id="'+pid+'mapButton_4" onclick="SE_MapTool.mapToolButtonClick(this);SE_MapTool.hiddMoreMapbtn();" title="测面">');
	content.push('<img src="images/maptool/cover.png" /><a href="javascript:void(0);">测面</a></span>');
	content.push('<br />');
	content.push('<span class="distance" id="'+pid+'mapButton_2" onclick="SE_MapTool.mapToolButtonClick(this);SE_MapTool.hiddMoreMapbtn()" title="测距">');
	content.push('<img src="images/maptool/distance.png" /><a href="javascript:void(0);">测距</a></span>');
	content.push('<br />');
	//if(checkFunction(PMS.MAPSAVE)){
		content.push('<span class="snap" id="'+pid+'mapButton_5" onclick="SE_MapTool.mapToolButtonClick(this);SE_MapTool.hiddMoreMapbtn();" title="保存">');//
		content.push('<img src="images/maptool/savemap.png" /><a href="javascript:void(0);" >保存</a></span>');//style="color:#B3B3B3"
		content.push('<br />');
	//}
	//if(checkFunction(PMS.MAPPLANT)){
		content.push('<span id="'+pid+'mapPrint" onclick="SE_MapTool.resetMapToolButton();SE_MapTool.printMap();SE_MapTool.hiddMoreMapbtn();" title="打印">');//
		content.push('<img src="images/maptool/print.png" /><a href="javascript:void(0);">打印</a></span>');// style="color:#B3B3B3"
		content.push('<br />');
	//}
	
	content.push('</div>');
	
	if((p && p.fullscreen) || !p){
		content.push('<span class="fullscreen" title="全屏">');
		content.push('<img src="images/maptool/fullscreen.png" /><a href="javascript:void(0);">全屏</a></span>');
		content.push('<span class="mapbtn_split">&nbsp;</span>');
	}
	content.push('</div>');
	if($("#"+id).find("div.tool_menu"))
		$("#"+id).html(content.join(""));
};
SE_MapTool.removeMapTool = function()
{
	$("#"+SE_MapTool.pid + " > div").remove();
};
/** 当前激活地图工具ID */
SE_MapTool.activeId=0;

/**
 * 地图工具点击事件处理.
 * 
 * @param o 当前点击的地图工具对象
 */
SE_MapTool.mapToolButtonClick = function(o) {
	var that = this;
	var id=parseInt(o.id.substring(o.id.lastIndexOf("_")+1));
	// 当点击的是当前正激活的工具时则不执行操作并返回
//	if (id==SE_MapTool.activeId) { return; }
	// 先结束先一次激活的操作
	if (SE_MapTool.activeControl) {
		SE_MapTool.activeControl.close();
	}
	if (control) {
		control.close();
		control=null;
	}
	switch(id) {
	case 0:
		SE_MapTool.Map.setMapCursor(_map_cur[0],_map_cur[1]);
		break;
	case 1: // 拉框放大
		var option=new TMRectToolOptions();   //构造参数对象
        option.map=SE_MapTool.Map;
        option.editable=false;
		control = new TMRectTool(option);
		TMEvent.bind(control,"drawend",SE_MapTool.Map,function(rect) {
			control.clear();
			control.close();
			var bounds = rect.getBounds();
			that.getMapByBounds(bounds,id);
		});	
		break;
	case 2: // 测距		
		var option=new TMLineToolOptions();   //构造参数对象
        option.map=SE_MapTool.Map;
       //节点是否右拖动
        option.editable=true;
       
        control=new TMDistanceTool(option);
		break;
	case 3: // 拉框缩小
		var option=new TMRectToolOptions();   //构造参数对象
        option.map=SE_MapTool.Map;
        option.editable=false;
		control = new TMRectTool(option);
		
		TMEvent.bind(control, "drawend", SE_MapTool.Map, function(rect) {
			control.clear();
			control.close();
			var bounds = rect.getBounds();
			that.getMapByBounds(bounds,id);
		});
		break;
	case 4: // 测面			
		var option = new TMPolygonOptions(); 
	    //将当前地图对象保存 必传 
	    option.map = SE_MapTool.Map;
	    option.editable=true;
	    //创建画面工具类 
	    control = new TMAreaTool(option); 
		break;
	case 5: // 截图
		control=new TMMapSnap(SE_MapTool.Map);
		break;
	}
	if (control) {
		control.open(true);
		SE_MapTool.activeButton=o;
		SE_MapTool.activeControl=control;
		SE_MapTool.activeId=id;
	} else {
		SE_MapTool.resetMapToolButton();
	}	
	SE_MapTool.hiddMoreMapbtn();
};

//自己做的拉框放大和缩小
SE_MapTool.getMapByBounds = function(bounds,type) {
	var zoom = SE_MapTool.Map.getBestZoom(bounds);
	var center = bounds.getCenterPoint();
	if(type==1){
		var nowMapZoom = SE_MapTool.Map.getCurrentZoom();
		if(nowMapZoom==zoom){
			SE_MapTool.Map.setCenterAtLngLat(center);
			SE_MapTool.Map.zoomIn();
		}else{
			SE_MapTool.Map.centerAndZoom(center,zoom);
		}
		
	}else {
		SE_MapTool.Map.setCenterAtLngLat(center);
		SE_MapTool.Map.zoomOut();
	}
};

// 重置地图工具
SE_MapTool.resetMapToolButton = function() {	
	SE_MapTool.activeId=0;
	SE_MapTool.activeButton=$("#"+SE_MapTool.pid+"mapButton_"+SE_MapTool.activeId)[0];
	$(document.body).unbind("click");
};
// 清除地图工具操作控件
SE_MapTool.removeControl = function(ctrl) {
	//debugger;
	if(control){
		control.close();
		control=null;		
		SE_MapTool.Map.setMapCursor(_map_cur[0],_map_cur[1]);		
	}
};
// 打印地图
SE_MapTool.printMap = function() { 
//	saveMap(SE_MapTool.Map.getLngLatBounds(),3,false);
	 var html = "<!DOCTYPE HTML PUBLIC \"-//W3C//DTD HTML 4.01 Transitional//EN\">\n";
		html += (document.all)?"<html xmlns:v=\"urn:schemeas-microsoft-com:vml\">":"<html>";
		html += "\n<head>\n<meta http-equiv=\"Content-Type\" content=\"text/html; charset=gb2312\">\n<title>Print Maps<\/title>\n";
		html += "<style type=\"text\/css\">\nbody {margin: 0px;}\n";
		html += (document.all)?"v\\:*{ Behavior:url(#default#VML);}":"";
		html += "\n</style>\n";
		html += "<\/head>\n";
		html += "<body><right>\n";
		html += SE_MapTool.Map.getMapContent(1);//改变"0"这个参数，可以将地图之中的标注也打印到地图，具体请参照类参考文档之中的getMapContent说明
		html += "\n<\/right><\/body>\n<\/html>";
		var win = window.open("about:blank","win","menubar=1,width="+(SE_MapTool.Map.container.offsetWidth)+",height="+(SE_MapTool.Map.container.offsetHeight-20));
		win.document.writeln(html);
		win.moveTo(0,0);
		win.print();
		win.document.close();	
		win.close();
};
// 截图工具重绘
SE_MapTool.onDraw = function(rect) {
	TMEvent.bind(rect,"btnclick",rect,SE_MapTool.onRectBtnClk);
	SE_MapTool.Srm_last_rect=rect;
};
// 移除截图操作
SE_MapTool.remove_slr = function() {
	if (SE_MapTool.Srm_last_rect) {
		SE_MapTool.Map.removeControl(SE_MapTool.Srm_last_rect,true);
		SE_MapTool.Srm_last_rect=null;
	}
};
// 截图工具操作（1为取消,2为预览,3为另存为）
SE_MapTool.onRectBtnClk = function(type) {
	switch(parseInt(type)) {
	case 1: SE_MapTool.remove_slr(); break;
	case 2: saveMap(this.getMBounds(),1); break;
	case 3: saveMap(this.getMBounds(),2);SE_MapTool.remove_slr(); break;
	}
};
SE_MapTool.addTraffic=function(){
	if(this.traffic){
		this.traffic.closeTraffic();
		this.traffic.removeTrafficTips();
		this.traffic=null;
	}else{
		this.traffic = new TMTraffic();
		this.traffic.openTraffic(SE_MapTool.Map);
		this.traffic.addTrafficTips();
	}
};
/** 更多工具隐藏标识 */
SE_MapTool.moreMapbtnHid=true;
/** 当前更多工具组件top位置 */
SE_MapTool.curTop=0;

// 隐藏更多公交组件
SE_MapTool.hiddMoreMapbtn = function() {
	if (!SE_MapTool.moreMapbtnHid) {
		SE_MapTool.btnContainer.addClass("hidden");
		SE_MapTool.moreMapbtnHid=true;
	}
};
// 重置更多工具组件
SE_MapTool.resetMoreMapbtn = function(fullscreen) {
	if (SE_MapTool.btnContainer) {
		SE_MapTool.btnContainer.css({top:SE_MapTool.curTop});
	}
};
// 打开更多公交组件
SE_MapTool.moreMapbtn = function(o) {
//	if (!SE_MapTool.btnContainer) { SE_MapTool.btnContainer=$("#"+SE_MapTool.pid+"more_btn"); }
	SE_MapTool.btnContainer=$("#"+SE_MapTool.pid+"more_btn");
	if (SE_MapTool.moreMapbtnHid) {
		SE_MapTool.btnContainer.removeClass("hidden");
		SE_MapTool.moreMapbtnHid=false;
		if (o) {
			o=$(o);
			SE_MapTool.curTop=o.offset().top+o.height();//34;//
			if(SE_MapTool.pid == "monitorMapTool")
				SE_MapTool.btnContainer.css({top: SE_MapTool.curTop,right:o.offset().right});
			else
				SE_MapTool.btnContainer.css({top: SE_MapTool.curTop,left:o.offset().left - 20});
			
			var offset=SE_MapTool.btnContainer.offset();
			SE_MapTool.DivPosition_l=offset.left;
			SE_MapTool.DivPosition_t=$(o).offset().top;
			SE_MapTool.DivPosition_w=SE_MapTool.btnContainer.width() +18;
			SE_MapTool.DivPosition_h=SE_MapTool.btnContainer.height()+10;
			$(document.body).click(function(e) {
				var l=SE_MapTool.DivPosition_l;
				var r=SE_MapTool.DivPosition_l+SE_MapTool.DivPosition_w;
				var t=$(o).offset().top;
				var b=$(o).offset().top+SE_MapTool.DivPosition_h;
				if ((e.pageX<l||e.pageX>r)||(e.pageY<t||e.pageY>b)) {
		    		SE_MapTool.btnContainer.addClass("hidden");
		    		if (!SE_MapTool.moreMapbtnHid) { SE_MapTool.moreMapbtnHid = true; }
		    		$(document.body).unbind("click");
				}
				SE_MapTool.DivPosition_t=SE_MapTool.curTop;
			});
		}
	}
};

/** 逆地理编码 */
window.SE_Rego = window.SE_Rego||{};
SE_Rego.regoTime=1000;
SE_Rego.regoLoader;
SE_Rego.regoUrlPre="http://"+hostinfo+"/CountrySearch/citydisplace.servlet?type=getidbyengine&show=2";//192.168.100.51:9082
//SE_Rego.regoUrlPre="http://58.83.210.11/CountrySearch/citydisplace.servlet?type=getidbyengine&show=2";
// 发现数据中城市的坐标范围仅表示市区的范围,不能满足程序要求,所以要改成要以区县为基础,然后根据显示级别确定地图中心的显示
SE_Rego.getRegoCode = function(point) {
	if (!point||typeof point=="number") {
		if (!SE_Rego.regoLoader) {
			SE_Rego.regoLoader=new SE.ObjectLoader();
			SE.Event.clearListeners(SE_Rego.regoLoader);
			SE.Event.addListener(SE_Rego.regoLoader,"loaded",SE_Rego.onRegoCode);
		}
		SE_Rego.regoUrl=SE_Rego.regoUrlPre+"&id="+SE_Rego.regoPoint[0]+","+SE_Rego.regoPoint[1];
	    SE_Rego.regoLoader.load(SE_Rego.regoUrl,"UTF-8");
	} else {
		SE_Rego.regoPoint=[parseInt(point.getNTULongitude()),parseInt(point.getNTULatitude())];
		if (SE_Rego.regoTimeout) { window.clearTimeout(SE_Rego.regoTimeout); }
		SE_Rego.regoTimeout = window.setTimeout(SE_Rego.getRegoCode,SE_Rego.regoTime);
	}
};
// 设置中心点并按照不同比例尺显示相应的范围：11到15级只显示省，6到10级显示省、市，0到5级显示省、市、县区
SE_Rego.onRegoCode = function(o) {
	if (!SE_Rego._Element) {
		SE_Rego._Element={};
		SE_Rego._Element.city=$("#"+SE_MapTool.pid+"city_container");
		SE_Rego._Element.dis=$("#"+SE_MapTool.pid+"dis_container");
	}
	var sid=String(o.id);
	var zoom=SE_MapTool.Map.getCurrentZoom();
	if (zoom>=1&&zoom<=3) {
		SE_Rego._Element.city.addClass("hidden");
		SE_Rego._Element.dis.addClass("hidden");
		// 从引擎上取得的地理id信息，若是省截取前两位后补7个零
		sid=sid.substring(0,2)+"0000000";    	
	}
	if(zoom>=4&&zoom<=6) {	
		SE_Rego._Element.dis.addClass("hidden");
	    // 从引擎上取得的地理id信息，若是市截取前四位后补5个零
		if (sid.startWith("11")||sid.startWith("12")||sid.startWith("31")||sid.startWith("50")) {
			// 考虑北京、上海、天津、重庆四个直辖市的特殊性，其截取方法和省一样
			sid=sid.substring(0,2)+"0000000";
			SE_Rego._Element.city.addClass("hidden");
		} else {
			SE_Rego._Element.city.removeClass("hidden");
			if(o.province=="海南省"){
				sid+="000";
			}else{
				sid=sid.substring(0,4)+"00000";
			}
		}  
	}
	if(zoom>=7&&zoom<=18) {
		// 若是北京、上海、天津、重庆四个直辖市的区县，则市不必显示
		if(sid.startWith("11")||sid.startWith("12")||sid.startWith("31")||sid.startWith("50")) {
			SE_Rego._Element.city.addClass("hidden");
		} else {
			SE_Rego._Element.city.removeClass("hidden");
		}
		SE_Rego._Element.dis.removeClass("hidden");
        // 从引擎上取得的地理id信息，若是区、直接补3个零即可
  		sid+="000";
	}
	// 若从引擎中取不到市的信息则市不显示
	if (o.city=="null") { SE_Rego._Element.city.addClass("hidden"); }
	// 若从引擎中取不到区县的信息则区县不显示
	if (o.dis=="null") { SE_Rego._Element.dis.addClass("hidden"); }
	// 根据行政区划ID设置地图中心目标位置
	SE_MapCenter.setOrientation(o.province,sid);
};
// 根据给定点坐标获取当前点所在城市
SE_Rego.getCity = function(point, handler) {
	var city=null;
	var request = {
			location:point[0]+" "+point[1],
//			location:"115.583724 38.499280",
			type:1
		};
		var rgcobj = new TMServiceGC();
		rgcobj.rgcEncoding(request,function(obj){
		    var json = obj.result;
			var city = json.province.code;
			handler.call(this,city);
//			alert("city:"+city);
		});
	return city;
};

window.SE_MapCenter=window.SE_MapCenter||{};
/** 地图中心查询地址 */
SE_MapCenter.url="http://"+hostinfo+"/CountrySearch/citydisplace.servlet";//192.168.100.51:9082
/** 页面元素对象 */
SE_MapCenter._Element={};
/** 正则表达式对象 */
SE_MapCenter._Regex={};
SE_MapCenter._Regex.pro=/0{7}/; // 省份格式字符串判断
SE_MapCenter._Regex.cit=/0{5}/; // 城市格式字符串判断
SE_MapCenter._Regex.dis=/0{3}/; // 区县格式字符串判断
/** 缓存对象 */
SE_MapCenter._Cache={};
SE_MapCenter._Cache.locationDisplay=false;
SE_MapCenter._Cache.DivPosition={};
/** 获取JSON格式数据长度 */
SE_MapCenter.getJsonLength = function(d) { var s=0; for (var i in d) { s++; } return s; };
/** 地图中心初始化 */
SE_MapCenter.init=function(){
	var pid=SE_MapTool.pid;
	// 设置地图中心位置选择列表容器
	SE_MapCenter.MCContainer=$("#"+pid+"location_list_result");
	// 获取省市区县元素对象
	SE_MapCenter._Element.province=$("#"+pid+"province");
	SE_MapCenter._Element.city=$("#"+pid+"city");
	SE_MapCenter._Element.dis=$("#"+pid+"dis");
	SE_MapCenter._Element.place=$("#"+pid+"place");
	// 设置省市区县行政区划隐藏元素对象
	SE_MapCenter._Element.provinceid=$("#"+pid+"provinceid");
	SE_MapCenter._Element.cityid=$("#"+pid+"cityid");
	SE_MapCenter._Element.disid=$("#"+pid+"disid");
	SE_MapCenter._Element.placeid=$("#"+pid+"placeid");
	// 设置地图中心IMG对象
	SE_MapCenter._Element.MC_IMG=$("#"+pid+" .map_center a.img_bg");
	// 设置地图中心LI对象
	SE_MapCenter._Element.MC_LI=$("#"+pid+" .map_center li:gt(0)");
	// 初始化地图中心样式
	SE_MapCenter.initAutoCss();
};
/** 初始化地图中心样式 */
SE_MapCenter.initAutoCss = function() {
	SE_MapCenter._Element.MC_IMG.hover(
		function() {
			$(this).css({background:"url('images/maptool/list_1.png')"}).parent().parent().addClass("li_hover");
		}, function() {
			if (!SE_MapCenter._Cache.locationDisplay) {
				$(this).css({background:"url('images/maptool/list_1.png')"}).parent().parent().addClass("li_hover");
			}
		}
	);
	SE_MapCenter._Element.MC_LI.hover(
		function() {
			$(this).addClass("li_hover").children().children("a.img_bg").css({background:"url('images/maptool/list_1.png')"});
		}, function() {
			if (!SE_MapCenter._Cache.locationDisplay) {
				$(this).removeClass("li_hover").children().children("a.img_bg").css({background:"url('images/maptool/list_0.png')"});
			}
		}
	);
};
// 载入地图中心位置选择列表
SE_MapCenter.onloadLocationList = function(id) {
	SE_MapCenter._Cache.imgClick=false;
	id=id.substring(SE_MapTool.pid.length);
	var i=id.indexOf("_");
	if (i>-1) {
		id=id.substring(0,i);
		SE_MapCenter._Cache.imgClick=true;
	}
	SE_MapCenter.selectMapcenterById(id);
	// 初始化地图中心容器
	SE_MapCenter.MCContainer.empty().unbind();
	$(document).unbind("click");
	// 构建请求参数
	var param;
	switch(String(id)) {
	case "province": param="type=getprovince&id=&show=2"; break;
	case "city": param="type=province&id="+SE_MapCenter._Element.provinceid.val()+"&show=2"; break;
	case "dis": param="type=city&id="+SE_MapCenter._Element.cityid.val()+"&show=2"; break;
	case "place": param="type=dis&id="+SE_MapCenter._Element.disid.val()+"&show=2"; break;
	}
	// ajax调用
	$.ajax({ url:SE_MapCenter.url, data:param, dataType:"json", success:function(d) { SE_MapCenter.showLocationList(d,id); } });
};
// 显示地图中心位置选择列表
SE_MapCenter.showLocationList = function(data,id) {
	switch(String(id)) {
	case "province": data=data.cities1; break;
	case "city": data=data.cities; break;
	case "dis": data=data.dis; break;
	case "place": data=data.places; break;
	}
	if (data) {
		var size=SE_MapCenter.getJsonLength((data=data[0]));
		var html=[],d,na;
		for (var i=0;i<size;i++) {
			d=data[i][0],na=(id=="dis"?(d.na+d.type):d.na);
			html[i]=("<a href='javascript:void(0)' onclick='SE_MapCenter.refreshLocation(\""+d.lo+"\",\""+d.la+"\",\""+d.le+"\",\""+na+"\",\""+d.id+"\",\""+id+"\",\""+id+"id\")'>"+na+"</a><br/>");
		}
		SE_MapCenter.buildLocation(html.join(""),id);
	}
};
// 构建地图中心位置选择列表
SE_MapCenter.buildLocation = function(html,id) {
	SE_MapCenter.MCContainer=$("#"+SE_MapTool.pid+"location_list_result");
	SE_MapCenter.MCContainer.html(html);
	var offset=$("#"+SE_MapTool.pid+id).offset();
	var l=offset.left;
	var t=offset.top;
	var w=SE_MapCenter.MCContainer.width();
	SE_MapCenter.MCContainer.css({zIndex:1000,position:"absolute",left:l,top:t+25});
	SE_MapCenter.MCContainer.click(function() {
		SE_MapCenter._Cache.DivPosition.lt=$(this).offset();
		SE_MapCenter._Cache.DivPosition.w=$(this).width();
		SE_MapCenter._Cache.DivPosition.h=$(this).height();
	});
	SE_MapCenter.MCContainer.click();
	$(document).click(function(e) {
		var l=SE_MapCenter._Cache.DivPosition.lt.left;
		var r=l+SE_MapCenter._Cache.DivPosition.w;
		var t=SE_MapCenter._Cache.DivPosition.lt.top;
		var b=t+SE_MapCenter._Cache.DivPosition.h;
		if ((e.pageX<l||e.pageX>r)||(e.pageY<t||e.pageY>b)) { SE_MapCenter.hiddLocation(); }
	});
	if (!SE_MapCenter.ImageArrow) {
		SE_MapCenter.MCContainer.after('<img id="'+SE_MapTool.pid+'mapcenter_arrowImg" src="images/maptool/arrow.gif"/>');
		SE_MapCenter.ImageArrow=$("#"+SE_MapTool.pid+"mapcenter_arrowImg");
	}
	if (!SE_MapCenter.ImageClose) {
		SE_MapCenter.MCContainer.after('<img id="'+SE_MapTool.pid+'mapcenter_closeImg" class="hidden" src="images/maptool/close.jpg" title="关闭" />');
		SE_MapCenter.ImageClose=$("#"+SE_MapTool.pid+"mapcenter_closeImg");
	}
	SE_MapCenter.ImageArrow.css({zIndex:100,position:"absolute",left:l+10,top:t+20});
	SE_MapCenter.ImageClose.css({zIndex:100,position:"absolute",left:l+w-15,top:t+30,cursor:"pointer"});
	SE_MapCenter.ImageClose.click(SE_MapCenter.hiddLocation);
	SE_MapCenter.showLocation(id);
};
// 显示地图中心位置选择列表
SE_MapCenter.showLocation = function(id) {
	$("#"+SE_MapTool.pid+"location_list_result").removeClass("hidden");
	$("#"+SE_MapTool.pid+"mapcenter_arrowImg").removeClass("hidden");
	//$("#"+SE_MapTool.pid+"mapcenter_closeImg").removeClass("hidden");
	SE_MapCenter._Cache.locationDisplay=true;
	SE_MapCenter.selectMapcenterById(id);
};
// 隐藏地图中心位置选择列表
SE_MapCenter.hiddLocation = function() {
	$("#"+SE_MapTool.pid+"location_list_result").addClass("hidden");
	$("#"+SE_MapTool.pid+"mapcenter_arrowImg").addClass("hidden");
	//$("#"+SE_MapTool.pid+"mapcenter_closeImg").addClass("hidden");
	$(document).unbind("click");
	SE_MapCenter._Cache.locationDisplay=false;
	SE_MapCenter.revertMapcenter();
};
// 恢复地图中心状态
SE_MapCenter.revertMapcenter = function() {
	SE_MapCenter._Element.MC_LI.removeClass("li_hover");
	SE_MapCenter._Element.MC_IMG.css({background:"url('images/maptool/list_0.png')"});
};
// 选择位置后刷新地图中心和地图位置
SE_MapCenter.refreshLocation = function(lo,la,zoom,name,id,loc,locid) {
	SE_MapCenter.MCContainer.addClass("hidden");
	if(SE_MapCenter.ImageArrow)
		SE_MapCenter.ImageArrow.addClass("hidden");
	if(SE_MapCenter.ImageClose)
		SE_MapCenter.ImageClose.addClass("hidden");
	SE_MapCenter.revertMapcenter();
	$("#"+SE_MapTool.pid+loc).text(String(name));
	$("#"+SE_MapTool.pid+locid).val(id);
	SE_MapTool.Map.centerAndZoom(new TMLngLat(lo,la),zoom);
};


// 通过位置ID选择地图中心
SE_MapCenter.selectMapcenterById = function(id) {
	if (!id) {
		SE_MapCenter._Element.MC_LI.removeClass("li_hover");
		SE_MapCenter._Element.MC_IMG.css({background:"url('images/maptool/list_0.png')"});
		var $clickLoc = $("#"+SE_MapTool.pid+id);
		$clickLoc.parent().parent().addClass("li_hover");
		if (SE_MapCenter._Cache.imgClick) {
			$clickLoc.next().css({background:"url('images/maptool/list_1.png')"});
		} else {
			$clickLoc.next().css({background:"url('images/maptool/list_1.png')"});
		}
	}
};
//根据省份和行政区划ID设置地图中心目标位置
SE_MapCenter.setOrientation = function(pro,id) {
	var ispro=SE_MapCenter._Regex.pro.test(id);	// 是否为符合省份格式
	var iscit=SE_MapCenter._Regex.cit.test(id);	// 是否为符合城市格式
	var isdis=SE_MapCenter._Regex.dis.test(id);	// 是否为符合区县格式
	if(pro&&pro=="海南省"){
		if(!iscit){iscit=SE_MapCenter._Regex.dis.test(id);}
	}
	var type;
	if (isdis&&!ispro&&!iscit) {
		type="getdis";
	} else if ((isdis&&!ispro&&iscit)||(id==110000000||id==120000000||id==310000000|id==500000000)) {
		type="getcity";
	} else if (isdis&&ispro&&iscit) {
		type="getprovince";
	} else {
		type="getplace";
	}
	SE_MapCenter.setOrientationByType(type,id);
};
// 根据类型定位目标位置
SE_MapCenter.setOrientationByType = function(type,id) {
	id=SE_MapCenter.getIdByType(type,id);
	$.ajax({
		url: SE_MapCenter.url,
		data: "type="+type+"&id="+id+"&show=2",
		dataType:"json",
		success:function(d) {
			switch(String(type)) {
			case "getprovince": SE_MapCenter.setProvince(d); break;
			case "getcity": SE_MapCenter.setCity(d); break;
			case "getdis": SE_MapCenter.setDis(d); break;
			case "getplace": SE_MapCenter.setPlace(d); break;
			}
		}
	});
};
// 根据类型获取id（注：如果参数id有值，则先设置id再直接返回id值）
SE_MapCenter.getIdByType = function(type,id) {
	type=type.substring(3,type.length)+"id";
	var o=SE_MapCenter._Element[type];
	//$("#"+SE_MapTool.pid+type);
	//SE_MapCenter._Element[type];
	if(id)
		o.val(id);
	return id?id:o.val();
};
// 设置省份
SE_MapCenter.setProvince = function(province) {
	SE_MapCenter.setOrientationListByType("province",province);
};
// 设置城市
SE_MapCenter.setCity = function(province) {
 	SE_MapCenter.setOrientationListByType("city",province);
 	SE_MapCenter.setOrientationByType("getprovince");
};
// 设置区县
SE_MapCenter.setDis = function(city) {
 	SE_MapCenter.setOrientationListByType("dis",city);
 	SE_MapCenter.setOrientationByType("getcity");
};
// 设置热点
SE_MapCenter.setPlace = function(dis) {
 	SE_MapCenter.setOrientationListByType("place",dis);
 	SE_MapCenter.setOrientationByType("getdis");
};
// 根据类型定位中心点中的位置列表
SE_MapCenter.setOrientationListByType = function(type,loc) {
	var po,pid;
	switch(String(type)) {
	case "province": if (!loc.cities1) { return; } loc=loc.cities1[0]; break;
	case "city": if (!loc.cities) { return; } loc=loc.cities[0]; po=SE_MapCenter._Element.provinceid; pid=loc[0][0].provinceid; break;
	case "dis": if (!loc.dis) { return; } loc=loc.dis[0]; po=SE_MapCenter._Element.cityid; pid=loc[0][0].citiesid; break;
	case "place": if (!loc.places) { return; } loc=loc.places[0]; po=SE_MapCenter._Element.disid; pid=loc[0][0].disesid; break;
	}
	var sid=SE_MapCenter._Element[type+"id"].val().substring(0,6);
	//$("#"+SE_MapTool.pid+type+"id").val().substring(0,6);
	//SE_MapCenter._Element[type+"id"].val().substring(0,6);
	var size=SE_MapCenter.getJsonLength(loc);
	for (var i=0;i<size;i++) {
		if (String(loc[i][0].id).strip()==sid) {
			SE_MapCenter._Element[type].text(loc[i][0].na+("dis"==type?loc[i][0].type:""));
			break;
		}
	}
	if (po) { po.val(pid); }
	
	//设置车辆监控地物搜索地区列表
	SE_MapCenter.getCitiesFromProvince();
};
// 获取地图中心所在城市
SE_MapCenter.getCity = function() {
	var pid=SE_MapCenter._Element.provinceid.val();
	var cid=SE_MapCenter._Element.cityid.val();
	if (cid==""||pid.substring(0,3)!=cid.substring(0,3)) {
		return SE_MapCenter._Element.province.text();
	}
	return SE_MapCenter._Element.city.text();
};

/** 自定义对象方法 */
String.prototype.Trim = function () {
	return this.replace(/(^\s*)|(\s*$)/g, "");
};
String.prototype.startWith = function (str) {
	if (str == null || str == "" || this.length == 0 || str.length > this.length) {
		return false;
	}
	if (this.substr(0, str.length) != str) {
		return false;
	}
	return true;
};
String.prototype.strip = function () {
	return this.replace(/^\s+/, "").replace(/\s+$/, "");
};

/**
 * 设置车辆监控地物搜索地区列表
 */
SE_MapCenter.getCitiesFromProvince = function()
{
    var pid = SE_MapCenter._Element.provinceid.val();
    $("#province_selectForSouBoxArea").text(SE_MapCenter._Element.province.text());
    var param, type;
    if (pid.startWith("11") || pid.startWith("12") || pid.startWith("31") || pid.startWith("50")) 
    {
        param = "type=city&id=" + pid + "&show=2";
        type = "dis";
    }
    else 
    {
        param = "type=province&id=" + pid + "&show=2";
        type = "city";
    }
    
    $.ajax(
    {
        url: SE_MapCenter.url,
        data: param,
        dataType: "json",
        success: function(data){
            switch (type)
            {
                case "city":
                    data = data.cities;
                    break;
                case "dis":
                    data = data.dis;
                    break;
            }
            if (data) 
            {
                var size = SE_MapCenter.getJsonLength((data = data[0]));
                var html = [], d, na;
                var id = type;
                for (var i = 0; i < size; i++) 
                {
                    d = data[i][0];
                    na = (id == "dis" ? (d.na + d.type) : d.na);
                    html[i] = ("<a href='javascript:void(0)' class='level_link' onclick='SE_MapCenter.refreshLocation(\"" + d.lo + "\",\"" + d.la + "\",\"" + d.le + "\",\"" + na + "\",\"" + d.id + "\",\"" + id + "\",\"" + id + "\");'>" + na + "</a>&nbsp;&nbsp;");
                }
                var Province_selectForSouBoxArea = $("#citiesForProvince");
                Province_selectForSouBoxArea.html("");
                Province_selectForSouBoxArea.html(html.join(" "));
            }
            
        }
    });
};

/*Show email box*/
SE_MapTool.emailBox = function (){
	$("#monitorMap").show_SendEmailWindow(
	        {
	            url: "modules/monitor/message.html",
	            params: 
	            {
	                
	            }
	        });
};
