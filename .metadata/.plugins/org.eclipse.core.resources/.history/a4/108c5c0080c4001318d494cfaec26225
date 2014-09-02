//
//	CTFO MAP API
//	CreateDate: 2010-07-28
//	CreateBy: TsengYuen
//  EditBy: FanXuean,liutinghai
//	EditDate: 2012-5-09
//
/**
 * 地图api封装,目前只针对中交兴路的地图api,会把不是调用此api直接提供的方法的封装功能剥离出去
 * @author TsengYuen create in 2010-07-28;FanXuean edit in 2011-12-20 liutinghai edit in 2012-05-9
 * @param {String} mCtnr 填放地图的容器的ID
 * @param {String} defCenter 默认的中心位置(可选,如不传,则为北京 )
 * @param {Int} defLvl 默认地图级别(可选,如不传,则为5 )
 * @param {bool} heighlight :true 显示大厦边框，else 不显示。
 * @return {Object} CTFO_MAP对象的引用
 */
var CTFO_MAP = function(mCtnr, defCenter, defLvl, heighlight) {
    var that = this;
    if (!defCenter) 
        defCenter = "beijing";
    if (!defLvl) 
        defLvl = 4;
    this.mtool = null;
	this.map = new TMMaps(mCtnr);
	if (heighlight){
			this.map.openHighlight();
	}
	else{
			this.map.closeHighlight();
		 
	}
	this.map.centerAndZoom(new TMLngLat(116.40969,39.94940),defLvl);
	this.map.handleMouseScroll(true);
	this.map.enableDoubleClickZoom();
	this.minmap = new TMOverviewMapControl(null,[200,150],null,null,3);
	//右键功能
	var ary = new Array();
	//右键添加地图放大功能
	var zoomIn = new TMMenuItem();
	//设置菜单项ID
	zoomIn.id = "zoomIn";
	//设置菜单项显示文字
	zoomIn.menuText = "放大";
	//设置菜单项的触发事件
	zoomIn.functionName = function(){
		that.zoomIn();
	};
	//将右键菜单参数对象增加到数组中
	ary.push(zoomIn);
	//右键添加地图缩小功能
	var zoomOut = new TMMenuItem();
	zoomOut.id = "zoomOut";
	zoomOut.menuText = "缩小";
	zoomOut.functionName =function(){
		 that.zoomOut();
	};
	//设置分割线
	zoomOut.separateLine = true;
	ary.push(zoomOut);

	//右键添加地图标注功能
	var marker = new TMMenuItem();
	marker.id = "TMTraffic";
	marker.menuText = "实时交通";
	this.traffic=null;
	marker.functionName = function(){
		if(that.traffic){
			that.traffic.closeTraffic();
			that.traffic.removeTrafficTips();
			that.traffic=null;
		}else{
			that.traffic = new TMTraffic();
			that.traffic.openTraffic(that.map);
			that.traffic.addTrafficTips();
		}
	};
	ary.push(marker);
	//创建右键控件，将装载TMMenuItem对象的数组传入到右键控件中
	var menu = new TMMenuControl(ary);
	//向地图上增加右键
	//this.map.addMenuControl(menu);
	this.map.setMapCursor(_map_cur[0],_map_cur[1]);

//  this.map.removeControl(this.map.logoControl);
	/**
	 * 添加骨头棒控件
	 *  0(默认)：显示移动按钮、缩放按钮和缩放等级条；
	 *1：显示移动按钮和缩放按钮，不显示缩放等级条；
	 *2：只显示缩放按钮(竖排)。
	 *3：只显示缩放按钮(横排)。
	 *4：只显示缩放按钮和缩放等级条。
	 *默认值为0。（可选）
	 */
    this.addMapControl = function(type) {
        var mc;
        if (type) 
        {
        	if (type == 1 || type == 2 || type == 3 || type == 4) 
            {
        		mc= new TMMapControl(type);
            }
        }
        else 
        {
        	mc= new TMMapControl();
        }
        //添加骨头棒控件至地图
        this.map.addControl(mc);
    };
    /**
     * 添加地图类型切换控件
     */
    this.addMapTypeControl = function()
    {
    	//暂无卫星地图
    	//this.map.addControl(new SE.MapTypeControl());
    };
    /**
     * 添加地图比例尺
     */
    this.addScaleControl = function()
    {
    	this.map.addControl(new TMScaleControl());
    };
    /**
     * 添加地图的中心十字
     */
    this.addCenterCrossControl = function()
    {
        this.map.addControl(new TMCenterCrossControl());
    };
    /**
     * 添加地图版权信息
     */
    this.addMapCopyRight = function(){
    	var cr = new TMCopyrightControl();
    	cr.addCopyright({
    		id: 1,
    		content: "<span style='color:blue;font-size:12px;'>&copy;2012 TransWiseway - 审图号GS(2010)1367号  - 甲测资质11002076</span>",
    		bounds: new TMLngLatBounds([new TMLngLat(10,30),new TMLngLat(160,80)])
    	});  
      cr.setRight(160);  
      cr.setBottom(10);
    this.map.addControl(cr);
    };
    /**
     * 添加地图鹰眼控制
     */
    this.addOverviewMapControl = function(openFlag)
    {
    	this.map.addControl(this.minmap);
    	if (!openFlag) 
        {
            //切换鹰眼地图的开关
            this.minmap.changeView();
        }
        
    };
    
    this.pointMarkerObj = {};//pointMarker缓存
    
    this.markerObj = {};//marker缓存
    this.markerLblObj = {};//label对象缓存
    this.markerLockObj = {};
    this.markerTipObj = {};//自定义tip缓存，用label标注实现
    this.currentTipId = "";//当前显示的tip对象引用缓存
    this.polyLineObj = {};//polyline缓存
    this.polygonObj = {};//polygon缓存
    this.ellipseObj = {};//ellipse缓存
    
    this.addPointMarker = function(p){
    	var _pointMarker = new TMPointOverlay(new TMLngLat(p.lng, p.lat));	
    	_pointMarker.setTitle('');
    	_pointMarker.setLabel('<img src="' + p.iconUrl + '"/>');
    	_pointMarker.setBackgroundColor("");
    	_pointMarker.setBorderLine(0);
    	_pointMarker.setNoWrap(false);
    	_pointMarker.getObject().style.zIndex = 10000;
		this.map.addOverLay(_pointMarker);
//		_pointMarker.setOffset(p.anchor);
		_pointMarker.setAnchorPer(p.anchor);
		this.pointMarkerObj[p.id] = _pointMarker;
		return _pointMarker;
    };
    
    this.movePointMarker = function(p){
    	if(this.pointMarkerObj && this.pointMarkerObj[p.id]){
	    	var _pointMarker = this.pointMarkerObj[p.id],
		    	_lngLat = new TMLngLat(p.lng, p.lat);
		    
	    	_pointMarker.setLngLat(_lngLat);
	    	if (p.iconUrl) 
	        {
	    		_pointMarker.setLabel('<img src="' + p.iconUrl + '"/>');
	        }
	    	return _pointMarker;
    	}
    };
    
    this.removePointMarker = function(id){
    	if(this.pointMarkerObj && this.pointMarkerObj[id]){
    		this.map.removeOverLay(this.pointMarkerObj[id], true);
            delete this.pointMarkerObj[id];
    	}
    };
    
    /**
     * 新增点对象Marker及其所带的label,tip等内容,可自定义tip框
     * @author FanXuean edit in 2011.12.6
     * @param {Object} params 参数集合
     * @param {String} params.id marker唯一标识
     * @param {Number} params.lng 经度
     * @param {Number} params.lat 纬度
     * @param {String} params.iconUrl 图标的URL路径
     * @param {Number} params.iconW 图标宽
     * @param {Number} params.iconH 图标高
     * @param {String} params.tip 标注内容(信息浮窗的内容为指定的HTML标签内容)
     * @param {String} params.title 锚点默认tip样式 标题内容
     * @param {String} params.label  锚点处文字标注内容
     * @param {Number} params.labelFontSize 锚点文字标注字体大小
     * @param {String} params.labelFontColor 锚点文字标注字体颜色
     * @param {String} params.labelBgColor 锚点文字标注背景色
     * @param {String} params.labelAnchor 锚点文字标注偏移量
     * @param {Object} params.handler   锚点点击事件方法
     * @param {Boolean} params.isDefaultTip 是否采用自定义标注样式(true:默认样式;false:自定义样式)
     * @param {Boolean} params.isOpen  是否默认打开信息浮窗
     * @param {Boolean} params.isMultipleTip 是否可以打开多个tip窗口
     * @return marker对象
     */
    this.addMarker = function(params) {
        var _marker = null,
        	_icon = null,
        	_selfDefineTip = null;
        
        if (!this.markerObj) 
            this.markerObj = {};
        if (!this.markerLblObj) 
            this.markerLblObj = {};
        
        if(!params.iconUrl){
        	params.iconUrl = "images/addressMarker/marker.png";
        	params.iconW = 20;
        	params.iconH = 20;
        }
        //创建ICON
        if (params.iconUrl && params.iconW && params.iconH) {
            _icon = new TMIcon(params.iconUrl, new TMSize(params.iconW, params.iconH));
//            _icon.removeShadow();
        }
        
        //创建Marker
        if (!this.markerObj[params.id]) {   
        	//标记对象,并保持在标记数组中
			var _lngLat = new TMLngLat(params.lng,params.lat);
            _marker = new TMMarker(_lngLat, _icon);
            this.markerObj[params.id] = _marker;
        }else {
			return this.markerObj[params.id];
        }
        if(params.anchor){
        	this.markerObj[params.id].setAnchorPer(params.anchor);
        	//this.markerObj[params.id].reDraw(true);
        }
        this.map.addOverLay(_marker);
        
        //	Marker's Label  在地图上指定地理位置的锚点处显示文字
        if (params.label) { 
        	if(!params.labelAnchor)
        		params.labelAnchor = [0.7,-0.5];
            var pOvrLy = new TMPointOverlay(_marker,null,params.labelAnchor);//[0.7,-0.5]
            var title = params.title ? params.title : params.label;
            pOvrLy.setTitle(title);
            pOvrLy.setLabel(params.label);
            if(params.labelBgColor)
            	pOvrLy.setBackgroundColor(params.labelBgColor);//"#545454"
            if(params.labelFontColor)
            	pOvrLy.setFontColor(params.labelFontColor);//"#FFFFFF"
            if(params.labelFontSize)
            	pOvrLy.setFontSize (params.labelFontSize);//10
            pOvrLy.setNoWrap(false);
            
            this.markerLblObj[params.id] = pOvrLy;
            this.map.addOverLay(pOvrLy);
        }
        //	tip marker弹窗
        if (params.isDefaultTip && params.tip) {//默认风格
        	_selfDefineTip = params.tip;
        }else if(!params.isDefaultTip && params.tip) {//自定义风格
        	_selfDefineTip = new TMPointOverlay(_marker,null,[0.52, 1.02]);//[0.58,1.16]
        	_selfDefineTip.setLabel(params.tip);
        	_selfDefineTip.setBorderLine(0);
        	_selfDefineTip.setBackgroundColor("");
        }
        
        //如果没有缓存该tip，则加入缓存
    	if(!this.markerTipObj[params.id] && _selfDefineTip)
    		this.markerTipObj[params.id] = _selfDefineTip;
    	
        //注册锚点的click事件
        if(params.handler){//自定义marker点击事件
        	TMEvent.addListener(_marker, "click", params.handler);
        }else if(_selfDefineTip){//默认marker点击事件
            if(params.isDefaultTip){//默认风格的点击事件,closeInfoWindow/openInfoWinHtml
            	TMEvent.addListener(_marker, "click", function(e){
            		if(that.markerTipObj[that.currentTipId] && !params.isMultipleTip)
            			that.markerObj[that.currentTipId].closeInfoWindow();
            		//_marker.closeInfoWindow();
            		var infowin = _marker.openInfoWinHtml(_selfDefineTip);
            		infowin.setTitle(params.title ? params.title : params.label);
            	});
            }else{//自定义风格的点击事件,增删PointOverlay
            	TMEvent.addListener(_marker, "click", function(e){
	        		if(that.markerTipObj[params.id])
	        			that.map.removeOverLay(that.markerTipObj[params.id]);
	        		if(that.markerTipObj[that.currentTipId] && !params.isMultipleTip)
	        			that.map.removeOverLay(that.markerTipObj[that.currentTipId]);
	        		that.markerTipObj[params.id] = _selfDefineTip;
	            	that.map.addOverLay(_selfDefineTip);
	            	that.currentTipId = params.id;
	            });
            }
        }
      //是否默认打开信息浮窗
	  if (_selfDefineTip && params.isOpen && !params.isDefaultTip){//自定义风格tip
		  if(that.markerTipObj[that.currentTipId] && !params.isMultipleTip)
			  that.map.removeOverLay(that.markerTipObj[that.currentTipId]);
		  that.markerTipObj[params.id] = _selfDefineTip;
    	  that.map.addOverLay(_selfDefineTip);
      	  that.currentTipId = params.id;
      }else if(_selfDefineTip && params.isOpen && params.isDefaultTip){//默认风格tip
    	  if(that.markerTipObj[that.currentTipId] && !params.isMultipleTip)
    		  that.markerObj[that.currentTipId].closeInfoWindow();
  		  var infowin = _marker.openInfoWinHtml(_selfDefineTip);
  		  infowin.setTitle(params.title ? params.title : params.label);
      }
        return _marker;
    };
    
    
    
    /**
     * 根据ID删除Marker
     * @param {String} id
     */
    this.removeMarker = function(id) {
        if (this.markerObj && this.markerObj[id]) {
            if(this.markerTipObj && this.markerTipObj[id]) {
            	var _tipObj = this.markerTipObj[id];
            	if(typeof(_tipObj) == "object"){//如果是自定义tip,则removeOverLay
            		this.map.removeOverLay(_tipObj, true);
            	}else{//如果是默认风格tip,则关闭infoWindow
                    this.markerObj[id].closeInfoWindow();
            	}   
            	delete _tipObj;
            }

            this.map.removeOverLay(this.markerObj[id], true);
            delete this.markerObj[id];
            
            //删除label标注
            if (this.markerLblObj && this.markerLblObj[id]) 
            {
                this.map.removeOverLay(this.markerLblObj[id], true);
                delete this.markerLblObj[id];
            }
            
            //删除锁定的marker缓存
            if (this.markerLockObj && this.markerLockObj[id]) 
            {
                delete this.markerLockObj[id];
            }
        }
    };
    
    /**
     * 删除全部Marker
     * 有点问题,rmvMarker传入参数为id,这里的是marker对象?
     */
    this.removeAllMarkers = function() {
        for (var obj in this.markerObj) {
            this.removeMarker(obj);
        }
    };
    
    /**
     * 移动Marker
     *
     * @author FanXuean edit in 2011.12.6
     * @param {Object} params 参数集合
     * @param {String} params.id marker唯一标识
     * @param {Number} params.lng 经度
     * @param {Number} params.lat 纬度
     * @param {String} params.iconUrl marker图片路径
     */
    this.moveMarker = function(params) {
        if (this.markerObj && this.markerObj[params.id]) {
            var _marker = this.markerObj[params.id],
            	_lngLat = new TMLngLat(params.lng, params.lat);
            
            _marker.setLngLat(_lngLat);
            //如果是自定义tip,则removeOverLay
            if(this.markerTipObj && this.markerTipObj[params.id]) {
            	var _tipObj = this.markerTipObj[params.id];
            	if(typeof(_tipObj) == "object")
            		_tipObj.setLngLat(_lngLat);
            	else
            		_marker.closeInfoWindow();
            }
            if (params.iconUrl) 
            {
            	_marker.setIconImage(params.iconUrl);
            }
            if (this.markerLblObj && this.markerLblObj[params.id]) 
            {
                this.markerLblObj[params.id].setLngLat(_lngLat);
                if(params.label)
                	this.markerLblObj[params.id].setLabel(params.label);
            }
            
            if (this.markerLockObj && this.markerLockObj[params.id]) 
            {
                var _tmpLvl = this.map.getCurrentZoom();
                this.map.setCenter(_lngLat);
            }
            return this.markerObj[params.id];
        }
    };
    
    /**
     * 获取marker文字标注
     */
    this.getMarkerLabel = function(id)
    {
        return this.markerLblObj[id];
    };
    
    /**
     * 获取marker对象
     */
    this.getMarker = function(id)
    {
        return this.markerObj[id];
    };

    /**
     * 根据ID数组隐藏Markers
     * @param {Array} arrIds marker的id数组
     */
    this.hideMarkersByIds = function(arrIds) {
        $(arrIds).each(function(){
        	(that.markerObj[this]).setOpacity(0);
        	if(that.markerLblObj[this])
        		that.markerLblObj[this].setOpacity(0);
        	if(that.markerTipObj[this])
        		that.markerTipObj[this].setOpacity(0);
        });
        
    };
    /**
     * 根据ID数组显示Markers
     * @param {Array} arrIds marker的id数组
     */
    this.showMarkersByIds = function(arrIds) {
    	$(arrIds).each(function(){
        	(that.markerObj[this]).setOpacity(50);
        	if(that.markerLblObj[this])
        		that.markerLblObj[this].setOpacity(50);
        	if(that.markerTipObj[this])
        		that.markerTipObj[this].setOpacity(50);
        });
    };
    
    /**
     * 锁定marker在地图中心
     * @param {String} id
     */
    this.lockMarker = function(id)
    {
        if (!this.markerLockObj) 
            this.markerLockObj = {};
        
        this.markerLockObj[id] = true;
    };
    
    /**
     * 解锁marker在地图中心
     * @param {String} id
     */
    this.unlockMarker = function(id)
    {
        if (this.markerLockObj[id]) 
            this.markerLockObj[id] = false;
    };
    
    
    //----------------------------------------------------------------------------------------------
    //
    //		Line
    //
    //----------------------------------------------------------------------------------------------
    
    /**
     * 新增线对象PolyLine
     * @author FanXuean edit in 2011.12.6
     * @param {Object} params 参数集合
     * @param {String} params.id PolyLine 唯一标识
     * @param {Array} params.arrLngLat PolyLine 坐标数组
     * @param {String} params.strColor PolyLine 填充颜色
     * @param {Number} params.numWdth PolyLine 宽度
     * @param {Number} params.numOpacity PolyLine 透明度
     * @return {Object} TMPolyLine对象
     */
    this.addPolyLine = function(params) {
        var defaultParam = {
        		strColor: "blue"
        	,	numWidth: 3
        	,	numOpacity: 0.5
        };
        params = $.extend({}, defaultParam, params || {});
    	if (!params.arrLngLat.length) 
            return false;
        if ((params.arrLngLat.length % 2)) 
            throw "arrLngLat%2 != 0";
        if (!this.polyLineObj) 
            this.polyLineObj = {};
        
        //----------------------------
        //	Change To TMLngLat Array
        //----------------------------
        var _arrSE_LngLat = [];
        while (params.arrLngLat.length) 
        {
            var _arrTmp = params.arrLngLat.splice(0, 2);
            _arrSE_LngLat.push(new TMLngLat(_arrTmp[0], _arrTmp[1]));
        }
        
        //----------------------------
        //	Create & Add TMPolyline
        //----------------------------
        var _pl = new TMPolyline(_arrSE_LngLat, params.strColor, params.numWdth, params.numOpacity);
        this.polyLineObj[params.id] = _pl;
        this.map.addOverLay(_pl);
        
        return _pl;//fanshine 2011.4.6添加
    };
    
    /**
     * 根据ID删除PolyLine
     * @param {String} id PolyLine 唯一标识
     */
    this.removePolyLine = function(id) {
        if (this.polyLineObj && this.polyLineObj[id]) 
        {
            this.map.removeOverLay(this.polyLineObj[id], true);
            delete this.polyLineObj[id];
        }
    };
    
    /**
     * 删除所有PolyLine
     */
    this.removeAllPolyLines = function() {
        for (var prop in this.polyLineObj) { 
            this.removePolyLine(prop);
        }
    };
    
    //----------------------------------------------------------------------------------------------
    //
    //		Polygon
    //
    //----------------------------------------------------------------------------------------------
    
    /**
     * 新增面对象Polygon
     *
     * @param {Object} params 参数集合
     * @param {String} params.id	Polygon 唯一标识
     * @param {Array} params.arrLngLat Polygon 坐标数组
     * @param {String} params.strColor Polygon 边框颜色
     * @param {String} params.strBgColor Polygon 背景填充颜色
     * @param {Number} params.numWdth Polygon 边框宽度
     * @param {Number} params.numOpacity Polygon 填充透明度
     * @return {Object} TMPolygon对象
     */
    this.addPolygon = function(params) {
        if (!params.arrLngLat.length) 
            return false;
        if ((params.arrLngLat.length % 2)) 
            throw "arrLngLat%2 != 0";
        if (!this.polygonObj) 
            this.polygonObj = {};
        
        //----------------------------
        //	Change To TMLngLat Array
        //----------------------------
        var _arrSE_LngLat = [];
        while (params.arrLngLat.length) 
        {
            var _arrTmp = params.arrLngLat.splice(0, 2);
            _arrSE_LngLat.push(new TMLngLat(_arrTmp[0], _arrTmp[1]));
        }
        
        //----------------------------
        //	Create & Add TMPolygon
        //----------------------------
        var _pg = new TMPolygon(_arrSE_LngLat, params.strColor, params.strBgColor, 
        		params.numWdth, params.numOpacity);
        this.polygonObj[params.id] = _pg;
        this.map.addOverLay(_pg);
        return _pg;
    };
    
    /**
     * 根据ID删除Polygon
     * @param {String} id Polygon's ID
     */
    this.removePolygon = function(id) {
        if (this.polygonObj && this.polygonObj[id]) {
            this.map.removeOverLay(this.polygonObj[id], true);
            delete this.polygonObj[id];
        }
    };
    
    /**
     * 删除所有Polygon
     */
    this.removeAllPolygons = function()
    {
        for (var prop in this.polygonObj) {
            this.removePolygon(prop);
        }
    };
    
    //----------------------------------------------------------------------------------------------
    //
    //		Ellipse(圆)
    //
    //----------------------------------------------------------------------------------------------
    /**
     * 新增/重设(重设圆对象范围)圆对象Ellipse
     * @author FanXuean add in 2011.12.6
     * @param {Object} params 参数集合
     * @param {String} params.id Ellipse 唯一标识
     * @param {Object} params.objCenter 中心点坐标
	 * @param {Number} params.numRadius 圆半径(可选，默认500)
	 * @param {String} params.strColor 圆边框颜色(可选，默认蓝色)
	 * @param {String} params.strBgColor 圆背景色或填充色(可选，默认黄色)
	 * @param {Number} params.numWeight 圆边框宽度(可选，默认1)
	 * @param {Number} params.numOpacity 圆背景透明度(可选，默认0.8)
	 * @return {Object} TMEllipse对象
     */
    this.addEllipse = function(params) {
    	var defaults = {
    				objCenter: null
    			,	numRadius: 500
    			,	strColor: "blue"
    			,	strBgColor: "yellow"
    			,	numWeight: 1
    			,	numOpaity: 0.8
    		},
    		extendParams = $.extend({}, defaults, params),
    		zoom = this.map.getCurrentZoom(),
	    	zu = this.map.getZoomUnits(zoom),
	    	size = (extendParams.numRadius + extendParams.numWeight*2) / 2;
	    zu /= Math.pow(2,(18-zoom));
	    if(!this.ellipseObj) {
            this.ellipseObj = {};
	    }
	    if(!extendParams.objCenter) {
	    	throw "no center point";
	    	return false;
	    }
	    var cur = zu * size,
			left = extendParams.objCenter.getMercatorLongitude() - cur,
			right = extendParams.objCenter.getMercatorLongitude() + cur,
			top = extendParams.objCenter.getMercatorLatitude() + cur,
			bottom = extendParams.objCenter.getMercatorLatitude() - cur,
			bds = new SE.MercatorBounds(left,bottom,right,top);

	    if(!this.ellipseObj[params.id]){
			var _geoEllipse = new TMEllipse(bds,extendParams.strColor,
						extendParams.strBgColor,extendParams.numWeight,extendParams.numOpacity); 
			this.ellipseObj[params.id] = _geoEllipse;
			this.map.addOverLay(_geoEllipse);
	    }else{
	    	this.ellipseObj[params.id].setBounds(bds);
	    }
    	return this.ellipseObj[params.id];
    };
    /**
     * 根据ID删除Ellipses
     * @param {String} id Ellipse's ID
     */
    this.removeEllipse = function(id) {
        if (this.ellipseObj && this.ellipseObj[id]) {
            this.map.removeOverLay(this.ellipseObj[id], true);
            delete this.ellipseObj[id];
        }
    };
    
    /**
     * 删除所有Ellipses
     */
    this.removeAllEllipses = function()
    {
        for (var prop in this.ellipseObj) {
            this.removeEllipse(prop);
        }
    };
    
    //----------------------------------------------------------------------------------------------
    //
    //		Map Control
    //
    //----------------------------------------------------------------------------------------------
    
    /**
     * 在地图所在的DOM对象大小变化后（例如窗口大小改变）,调用该方法以让地图重新自适应新的大小
     */
    this.changeSize = function()
    {
        this.map.resizeMapDiv();
    };
    
    /**
     * 设置地图缩放级别
     *
     * @param {Number} level
     */
    this.setLevel = function(level)
    {
//        this.map.setZoom(level);
    	  this.map.zoomTo(level);
        
    };
    
    /**
     * 设置地图视野中心
     *
     * @param {Number} numLng Longitude
     * @param {Number} numLat Latitude
     */
    this.setCenter = function(numLng, numLat)
    {  	
        this.map.setCenterAtLngLat(new TMLngLat(parseFloat(new Number(numLng).toFixed(5)),parseFloat(new Number(numLat).toFixed(5))));
//    	 this.map.setCenterAtLngLat(new TMLngLat(110.93243,32.87360));
    };
    this.setCenterByLngLat = function(lnglat){
    	this.map.setCenter(lnglat);
    };
    /**
     * 放大地图
     */
    this.zoomIn = function()
    {
        this.map.zoomIn();
    };
    
    /**
     * 缩小地图
     */
    this.zoomOut = function()
    {
        this.map.zoomOut();
    };
  //在此标注
    this.mapMarker=function(p){
    	var marker = new TMMarker(p);
    	this.map.addOverLay(marker);
    };
    /**
     * 是否允许使用鼠标滚轮缩放地图
     *
     * @param {Boolean} b
     */
    this.mouseWheelEnabled = function(b)
    {
        if (b) 
            this.map.enableHandleMouseScroll(true);
        else 
            this.map.disableDragHandleMouseScroll(false);
    };
    
   
   
    /**
     * 获取单个坐标在地图上的最佳视野范围
     * @param {Number} lon 经度
     * @param {Number} lat 纬度
     */
    this.getBestMap = function(lon, lat)
    {
        var lonlat = new TMLngLat(lon, lat);
        this.map.getBestMap([lonlat]);
    };
    /**
     * 获取多个坐标在地图上的最佳视野范围
     * @param {Array} array 经度，纬度数组
     */
    this.getBestMaps = function(array)
    {
        var __arrSE_LngLat = [];
        while (array.length) 
        {
            var __arrTmp = array.splice(0, 2);
            __arrSE_LngLat.push(new TMLngLat(parseFloat(__arrTmp[0]),parseFloat(__arrTmp[1])));
        }
        this.map.getBestMap(__arrSE_LngLat);
    };
    /**
     * 获取当前地图中心点对象
     * @return {Object} TMLngLat对象
     */
    this.getCenterPoint = function()
    {
        return this.map.getCenterPoint();
    };
    /**
     * 获取当前地图显示的地理区域范围
     * @return {String} "xmin,ymin;xmax,ymax"字符串
     */
    this.getLngLatBounds = function()
    {
        var bound = this.map.getLngLatBounds();
        var XminNTU = bound.XminNTU / 100000;//12365443
        var YminNTU = bound.YminNTU / 100000;//3663097
        var XmaxNTU = bound.XmaxNTU / 100000;//12365443
        var YmaxNTU = bound.YmaxNTU / 100000;//3663097
        return XminNTU + "," + YminNTU + ";" + XmaxNTU + "," + YmaxNTU;
    };
    /**
     * 获取当前地图放大级别
     * @return {Number} 0-18数字
     */
    this.getCurrentZoom = function()
    {
        return this.map.getCurrentZoom();
    };
    /**
     * 清楚所有地图上的overlay
     */
    this.removeAll = function()
    {
        this.map.clearOverLays();
    };
    /**
     * 切换鹰眼显示/隐藏
     */
    this.changeView = function()
    {
        this.minmap.changeView();
    };
    /**
     * 移动地图中心到指定坐标
     * @param {Number} lon 经度
     * @param {Number} lat 纬度
     */
    this.panTo = function(lon, lat,level)
    {
        var lonlat = new TMLngLat(lon, lat);
        if(level){
        	this.map.moveToCenter(lonlat,level);
        }else{
            this.map.moveToCenter(lonlat);	
        }
    };
    /**
     * 将地理坐标转化为地图上点的像素坐标，相对于container左上角
     * @param {Object} lnglat TMLnglat对象
     * @return {Object} TMPoint对象
     */
    this.fromLngLatToContainerPixel = function(lnglat)
    {
        var point = this.map.fromLngLatToContainerPixel(lnglat);
        return point;
    };
    /**
     * 添加OverLay通用方法
     * @param {Object} overlay TMOverLay及其继承类对象
     */
    this.addOverLay = function(overlay)
    {
        this.map.addOverLay(overlay);
    };
    /**
     * 删除OverLay通用方法
     * @param {Object} overlay TMOverLay及其继承类对象
     */
    this.removeOverLay = function(overlay)
    {
     this.map.removeOverLay(overlay,true);
//   overlay.closeInfoWindow();
    };
    /**
     * 判断当前地图视野范围是否包含传入的坐标点
     * @param {Object} lnglat TMLnglat对象
     * @return {Boolean} 是否包含的布尔值
     */
    this.containsPoint = function(lnglat)
    {
        return this.map.getLngLatBounds().containsBounds(lnglat);
    };

};

