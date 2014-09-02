//其实样式尽可能的合并入css文件中是效率最高的,因为只触发一次reflow...不过目前没有性能问题...也就算了

	function SE_RectMap(bounds,color,bgcolor,weight,opacity)
	{
		this.bounds=bounds;
		color=(color || color=="")?color:"yellow";
		bgcolor=(bgcolor || bgcolor=="")?bgcolor:"#2319DC";
		weight=weight?weight:3;
		opacity=opacity?opacity:0.1;

		this.imgPath = "images/maptool/rect/";
		this.create();
		this.setLineStroke(weight);
		this.setLineColor(color);
		this.setOpacity(opacity);
		this.setFillColor(bgcolor);
		this.setLineStyle("solid");
		this.listeners = [];
//		鹰眼为800,盖住鹰眼
		SE.Tool.setZIndex(this.div,65535);
		this.listeners.push(SE.Event.bind(this.div,"click",this,this.onClick));
		this.listeners.push(SE.Event.bind(this.div,"mouseover",this,this.onMouseOver));
		this.listeners.push(SE.Event.bind(this.div,"mouseout",this,this.onMouseOut));
		this.tempListeners = [];
		SE.Event.bind(this,"rectdraw",this,this.reSize);
		SE.Event.bind(this,"rectdraw",this,this.reBtn);

	}
	SE_RectMap.prototype.create=function()
	{
		this.div=SE.Tool.createDiv(1);
		this.div.style.fontSize = "0px";
		this.div.style.zIndex = "900";
		SE.Tool.setUnSelectable(this.div);
//		填充div
		this.bgdiv = SE.Tool.createDiv(1);
		var style = {width:"100%",height:"100%",cursor:"move"};
		SE.Tool.inherit(this.bgdiv.style,style);
		this.div.appendChild(this.bgdiv);
//		八个点拖拽	lt:left top; lm:leftmiddle; lb:leftbottom; tc:topcenter; tr:topright; rm:rightmiddle; rb:rightbottom; bc:bottomcenter
		this.curs = {lt:"nw-resize",lm:"w-resize",lb:"ne-resize",tc:"n-resize",tr:"ne-resize",rm:"e-resize",rb:"nw-resize",bc:"s-resize"};
			var style = {width:"7px",height:"7px",left:"-4px",top:"-4px",background:"#000000",fontSize:"0px"};
			this.ltdiv = SE.Tool.createDiv(1);
			SE.Tool.inherit(this.ltdiv.style,style);
			this.div.appendChild(this.ltdiv);
			
			var style = {width:"7px",height:"7px",left:"-4px",top:"50%",marginTop:"-4px",background:"#000000",fontSize:"0px"};
			this.lmdiv = SE.Tool.createDiv(1);
			SE.Tool.inherit(this.lmdiv.style,style);
			this.div.appendChild(this.lmdiv);
			
			var style = {width:"7px",height:"7px",left:"-4px",bottom:"-4px",background:"#000000",fontSize:"0px"};
			this.lbdiv = SE.Tool.createDiv(1);
			SE.Tool.inherit(this.lbdiv.style,style);
			this.div.appendChild(this.lbdiv);
			
			var style = {width:"7px",height:"7px",left:"50%",marginLeft:"-4px",top:"-4px",background:"#000000",fontSize:"0px"};
			this.tcdiv = SE.Tool.createDiv(1);
			SE.Tool.inherit(this.tcdiv.style,style);
			this.div.appendChild(this.tcdiv);
			
			var style = {width:"7px",height:"7px",top:"-4px",right:"-4px",background:"#000000",fontSize:"0px"};
			this.trdiv = SE.Tool.createDiv(1);
			SE.Tool.inherit(this.trdiv.style,style);
			this.div.appendChild(this.trdiv);
			
			var style = {width:"7px",height:"7px",top:"50%",marginTop:"-4px",right:"-4px",background:"#000000",fontSize:"0px"};
			this.rmdiv = SE.Tool.createDiv(1);
			SE.Tool.inherit(this.rmdiv.style,style);
			this.div.appendChild(this.rmdiv);
			
			var style = {width:"7px",height:"7px",bottom:"-4px",right:"-4px",background:"#000000",fontSize:"0px"};
			this.rbdiv = SE.Tool.createDiv(1);
			SE.Tool.inherit(this.rbdiv.style,style);
			this.div.appendChild(this.rbdiv);
			
			var style = {width:"7px",height:"7px",bottom:"-4px",left:"50%",marginLeft:"-4px",background:"#000000",fontSize:"0px"};
			this.bcdiv = SE.Tool.createDiv(1);
			SE.Tool.inherit(this.bcdiv.style,style);
			this.div.appendChild(this.bcdiv);
//		左上显示大小
		this.sizeDiv = SE.Tool.createDiv(1);
			var style = {left:"2px",top:"2px",background:"#202020",fontSize:"14px",padding:"3px",color:"#FFFFFF",whiteSpace:"nowrap"};
			SE.Tool.inherit(this.sizeDiv.style,style);
			this.div.appendChild(this.sizeDiv);
//		右下三个按钮
		this.btnDiv = SE.Tool.createDiv(1);
			var style = {display:"none",bottom:"-30px",right:"4px",height:"26px",width:"88px",background:"transparent url("+this.imgPath+"bgs.gif) no-repeat scroll -5px -184px",fontSize:"0px"};
			SE.Tool.inherit(this.btnDiv.style,style);
			this.div.appendChild(this.btnDiv);
				this.btn_cancel = SE.Tool.createDiv(1);
				this.btn_cancel.title = "取消";
				this.btn_cancel.eventtype = "1";
				var style = {cursor:"pointer",height:"20px",position:"absolute",top:"3px",width:"20px",left:"7px"};
				this.btnDiv.appendChild(this.btn_cancel);
				SE.Tool.inherit(this.btn_cancel.style,style);
				SE.Event.bind(this.btn_cancel,"mouseover",this,this.onBtnOver(this.btn_cancel,[-12,-213]));
				SE.Event.bind(this.btn_cancel,"mouseout",this,this.onBtnOut(this.btn_cancel));
				SE.Event.bind(this.btn_cancel,"click",this,this.onBtnClk(this.btn_cancel));
				
				this.btn_show = SE.Tool.createDiv(1);
				this.btn_show.title = "预览";
				this.btn_show.eventtype = "2";
				var style = {cursor:"pointer",height:"20px",position:"absolute",top:"3px",width:"20px",left:"34px"};
				this.btnDiv.appendChild(this.btn_show);
				SE.Tool.inherit(this.btn_show.style,style);
				SE.Event.bind(this.btn_show,"mouseover",this,this.onBtnOver(this.btn_show,[-39,-213]));
				SE.Event.bind(this.btn_show,"mouseout",this,this.onBtnOut(this.btn_show));
				SE.Event.bind(this.btn_show,"click",this,this.onBtnClk(this.btn_show));
				
				this.btn_save = SE.Tool.createDiv(1);
				this.btn_save.title = "另存为";
				this.btn_save.eventtype = "3";
				var style = {cursor:"pointer",height:"20px",position:"absolute",top:"3px",width:"20px",left:"61px"};
				this.btnDiv.appendChild(this.btn_save);
				SE.Tool.inherit(this.btn_save.style,style);
				SE.Event.bind(this.btn_save,"mouseover",this,this.onBtnOver(this.btn_save,[-66,-213]));
				SE.Event.bind(this.btn_save,"mouseout",this,this.onBtnOut(this.btn_save));
				SE.Event.bind(this.btn_save,"click",this,this.onBtnClk(this.btn_save));
			
			
	}
	SE_RectMap.prototype.onBtnOver = function(btn,pos){
		return function(e){
			var style = {background:"transparent url("+this.imgPath+"bgs.gif) repeat scroll "+pos[0]+"px "+pos[1]+"px"};
			SE.Tool.inherit(btn.style,style);
		}
	}
	SE_RectMap.prototype.onBtnOut = function(btn){
		return function(e){
			var style = {background:"transparent none repeat scroll 0% 0%"};
			SE.Tool.inherit(btn.style,style);
		}
	}
	SE_RectMap.prototype.onBtnClk = function(btn){
		return function(e){
			SE.Event.trigger(this,"btnclick",[btn.eventtype]);
		}
	}
	SE_RectMap.prototype.startDrag = function(){
		this.ltdiv.style.cursor = this.curs.lt;
		this.lmdiv.style.cursor = this.curs.lm;
		this.lbdiv.style.cursor = this.curs.lb;
		this.tcdiv.style.cursor = this.curs.tc;
		this.trdiv.style.cursor = this.curs.tr;
		this.rmdiv.style.cursor = this.curs.rm;
		this.rbdiv.style.cursor = this.curs.rb;
		this.bcdiv.style.cursor = this.curs.bc;
		this.listeners.push(SE.Event.bind(this.ltdiv,"mousedown",this,this.onDragDivMd(this.ltdiv)));
		this.listeners.push(SE.Event.bind(this.lmdiv,"mousedown",this,this.onDragDivMd(this.lmdiv)));
		this.listeners.push(SE.Event.bind(this.lbdiv,"mousedown",this,this.onDragDivMd(this.lbdiv)));
		this.listeners.push(SE.Event.bind(this.tcdiv,"mousedown",this,this.onDragDivMd(this.tcdiv)));
		this.listeners.push(SE.Event.bind(this.trdiv,"mousedown",this,this.onDragDivMd(this.trdiv)));
		this.listeners.push(SE.Event.bind(this.rmdiv,"mousedown",this,this.onDragDivMd(this.rmdiv)));
		this.listeners.push(SE.Event.bind(this.rbdiv,"mousedown",this,this.onDragDivMd(this.rbdiv)));
		this.listeners.push(SE.Event.bind(this.bcdiv,"mousedown",this,this.onDragDivMd(this.bcdiv)));
//		位置拖动
		this.listeners.push(SE.Event.bind(this.bgdiv,"mousedown",this,this.onBdDivMd));
		this.reBtn();
		this.btnDiv.style.display = "";
	}
	SE_RectMap.prototype.onDragDivMd=function(ddiv){
		return function(e){
			SE.Event.cancelBubble(e);
			this.map.disableDrag();
			this.tempListeners = [
				SE.Event.bind(document,"mousemove",this,this.onDragDivMm(ddiv)),
				SE.Event.bind(document,"mouseup",this,this.onDragDivMu(ddiv))
			];
			this.sizeDragObject = {};
			this.sizeDragObject.startPoint = SE_RectMap.getPos(e,this.map.container);
			this.sizeDragObject.oldBds = this.bounds;
			
			
			if(document.body.setCapture)
			{
				document.body.setCapture();
			}
		}
	}
	SE_RectMap.prototype.onDragDivMm=function(ddiv){
		return function(e){
			SE.Event.cancelBubble(e);
			var sbd = SE.MercatorBounds;
			var cp = SE_RectMap.getPos(e,this.map.container);
			sp = this.sizeDragObject.startPoint;
			var offset = [cp[0]-sp[0],cp[1]-sp[1]];
			var obds = this.sizeDragObject.oldBds;
//			四角可以改变整个大小
			if(ddiv===this.ltdiv){
				var xi = obds.getMercatorXmin()+offset[0];
				var xa = obds.getMercatorXmax();
				var yi = obds.getMercatorYmin()+offset[1];
				var ya = obds.getMercatorYmax();
			}else if(ddiv===this.rbdiv){
				var xi = obds.getMercatorXmin();
				var xa = obds.getMercatorXmax()+offset[0];
				var yi = obds.getMercatorYmin();
				var ya = obds.getMercatorYmax()+offset[1];
			}else if(ddiv===this.lbdiv){
				var xi = obds.getMercatorXmin()+offset[0];
				var xa = obds.getMercatorXmax();
				var yi = obds.getMercatorYmin();
				var ya = obds.getMercatorYmax()+offset[1];
			}else if(ddiv===this.trdiv){
				var xi = obds.getMercatorXmin();
				var xa = obds.getMercatorXmax()+offset[0];
				var yi = obds.getMercatorYmin()+offset[1];
				var ya = obds.getMercatorYmax();
			}else if(ddiv===this.lmdiv){
				var xi = obds.getMercatorXmin()+offset[0];
				var xa = obds.getMercatorXmax();
				var yi = obds.getMercatorYmin();
				var ya = obds.getMercatorYmax();
			}else if(ddiv===this.rmdiv){
				var xi = obds.getMercatorXmin();
				var xa = obds.getMercatorXmax()+offset[0];
				var yi = obds.getMercatorYmin();
				var ya = obds.getMercatorYmax();
			}else if(ddiv===this.tcdiv){
				var xi = obds.getMercatorXmin();
				var xa = obds.getMercatorXmax();
				var yi = obds.getMercatorYmin()+offset[1];
				var ya = obds.getMercatorYmax();
			}else if(ddiv===this.bcdiv){
				var xi = obds.getMercatorXmin();
				var xa = obds.getMercatorXmax();
				var yi = obds.getMercatorYmin();
				var ya = obds.getMercatorYmax()+offset[1];
			}
			
			var newBds = new sbd(Math.max(0,Math.min(xi,xa)),Math.max(0,Math.min(yi,ya)),Math.min(this.map.viewSize[0],Math.max(xi,xa)),Math.min(this.map.viewSize[1],Math.max(yi,ya)));
			this.setBounds(newBds);
		}
	}
	SE_RectMap.prototype.onDragDivMu=function(ddiv){
		return function(e){
			SE.Event.cancelBubble(e);
			if(document.releaseCapture)
			{
				document.releaseCapture();
			}
			var tmp;
			while(tmp = this.tempListeners.pop()){
				SE.Event.removeListener(tmp);
			}
			this.map.enableDrag();
		}
	}
	SE_RectMap.prototype.onBdDivMd=function(e){
		SE.Event.cancelBubble(e);
		this.bgListeners = [
				SE.Event.bind(document,"mousemove",this,this.onBdDivMm),
				SE.Event.bind(document,"mouseup",this,this.onBdDivMu)
			];
		this.moveObject = {};
		this.moveObject.startPoint = SE_RectMap.getPos(e,this.map.container);
		this.oldBd = this.bounds;
		
	}
	SE_RectMap.prototype.onBdDivMm=function(e){
		SE.Event.cancelBubble(e);
		var cp = SE_RectMap.getPos(e,this.map.container);
		var sp = this.moveObject.startPoint;
		var offset = [cp[0]-sp[0],cp[1]-sp[1]];
		var sbd = SE.MercatorBounds;
		var obd = this.oldBd;
		var cbd = this.getBounds();
		var xi = obd.getMercatorXmin()+offset[0];
		var xa = obd.getMercatorXmax()+offset[0];
		var yi = obd.getMercatorYmin()+offset[1];
		var ya = obd.getMercatorYmax()+offset[1];
		var wth = xa - xi;
		var hth = ya - yi;
		var newbd;
		newbd = new sbd(xi,yi,xa,ya);
		if(xi<=this.mapBd.getMercatorXmin()){
			newbd.setMercatorXmin(this.mapBd.getMercatorXmin());
			newbd.setMercatorXmax(this.mapBd.getMercatorXmin()+wth);
		}
		if(xa>=this.mapBd.getMercatorXmax()){
			newbd.setMercatorXmin(this.mapBd.getMercatorXmax()-wth);
			newbd.setMercatorXmax(this.mapBd.getMercatorXmax());
		}
		if(yi<=this.mapBd.getMercatorYmin()){
			newbd.setMercatorYmin(this.mapBd.getMercatorYmin());
			newbd.setMercatorYmax(this.mapBd.getMercatorYmin()+hth);
		}
		if(ya>=this.mapBd.getMercatorYmax()){
			newbd.setMercatorYmin(this.mapBd.getMercatorYmax()-hth);
			newbd.setMercatorYmax(this.mapBd.getMercatorYmax());
		}
		this.setBounds(newbd);
		
	}
	SE_RectMap.prototype.onBdDivMu=function(e){
		SE.Event.cancelBubble(e);
		
		var tp;
		while(tp = this.bgListeners.pop()){
			SE.Event.removeListener(tp);
		}
		
	}
	SE_RectMap.prototype.onMouseOver=function(e)
	{
		var point=SE.Tool.getEventPosition(e,this.map.container);
		SE.Event.trigger(this,"mouseover",[point]);
	}
	SE_RectMap.prototype.onMouseOut=function(e)
	{
		var point=SE.Tool.getEventPosition(e,this.map.container);
		SE.Event.trigger(this,"mouseout",[point]);
	}
	SE_RectMap.prototype.onClick=function(e)
	{
		var point=SE.Tool.getEventPosition(e,this.map.container);
		SE.Event.trigger(this,"click",[point,SE.Tool.getEventButton(e)]);
	}
	SE_RectMap.prototype.initialize=function(map)
	{
		if(!this.div || this.map){return false;}
		this.map=map;
		var sbd = SE.MercatorBounds;
		this.mapBd = new sbd(0,0,this.map.viewSize[0],this.map.viewSize[1]);
		this.reDraw();
	}
	SE_RectMap.prototype.reDraw=function()
	{
		//进行重绘,对div进行切割,如果边框超出就剪掉
		this.drawSpan = this.map.getDrawBounds();
//		坐标都是像素坐标
		var l = Math.max(0,this.bounds.getMercatorXmin());
		var b = Math.min(this.map.viewSize[1],this.bounds.getMercatorYmax());
		var r = Math.min(this.map.viewSize[0],this.bounds.getMercatorXmax());
		var t = Math.max(0,this.bounds.getMercatorYmin());
		var lt=[l,t];//取得范围bounds左上角的坐标
		var rb=[r,b];//取得范围bounds右下角坐标
		
		this.draw(lt,rb);
	}
	SE_RectMap.prototype.draw=function(lt,rb)
	{
		SE.Tool.setPosition(this.div,lt);
		var size = [];
		//size[0] = Math.abs(rb[0]-lt[0]-parseInt(this.weight)*2);
		//size[1] = Math.abs(rb[1]-lt[1]-parseInt(this.weight)*2);
		size[0] = Math.abs(rb[0]-lt[0]);
		size[1] = Math.abs(rb[1]-lt[1]);
		SE.Tool.setSize(this.div,size);
		SE.Event.trigger(this,"rectdraw",[size]);
	}
//	更新左上角文本
	SE_RectMap.prototype.reSize=function(size){
		var sz = [this.sizeDiv.offsetWidth,this.sizeDiv.offsetHeight];
		this.sizeDiv.style.top = -sz[1]-2+"px";
//		margin为2
		if(this.getBounds().getMercatorYmin()-sz[1]-2<this.mapBd.getMercatorYmin()){
			this.sizeDiv.style.top = "2px";
		}
		this.sizeDiv.innerHTML = size[0]+" * "+size[1];
	}
//	更新左下角btn
	SE_RectMap.prototype.reBtn=function(){
		var sz = [this.btnDiv.offsetWidth,this.btnDiv.offsetHeight];
//		4为margin
		if(this.getBounds().getMercatorYmax()+sz[1]+4>this.mapBd.getMercatorYmax()){
			this.btnDiv.style.bottom = "4px";
		}else{
			this.btnDiv.style.bottom = "-30px";
		}
	}
	SE_RectMap.prototype.getObject=function(){return this.div;}
	SE_RectMap.prototype.remove=function()
	{
		this.map=null;
	}
	SE_RectMap.prototype.depose=function()
	{
		SE.Event.deposeNode(this.div);
		this.div=null;
		this.bounds=null;
	}
	SE_RectMap.prototype.getBounds=function()
	{
		return this.bounds;
	}
	SE_RectMap.prototype.getMBounds=function()
	{
		var bd = this.bounds;
//		this.bounds点全部为像素,getMercatorYmin取出的也全是像素
		var ltxy = this.map.fromContainerPixelToLngLat(new SE.Point(bd.getMercatorXmin(),bd.getMercatorYmin()));
		var rbxy = this.map.fromContainerPixelToLngLat(new SE.Point(bd.getMercatorXmax(),bd.getMercatorYmax()));
		var mbd = new SE.MercatorBounds(ltxy.getMercatorLongitude(),rbxy.getMercatorLatitude(),rbxy.getMercatorLongitude(),ltxy.getMercatorLatitude());
		return mbd;
	}
	SE_RectMap.prototype.setBounds=function(bounds)
	{
		this.bounds=bounds;
		if(this.map)
		{
			this.reDraw();
		}
	}
	SE_RectMap.prototype.getLineColor=function()
	{
		return this.color;
	}
	SE_RectMap.prototype.setLineColor=function(color)
	{
		this.color=color;
		this.div.style.borderColor=color;
	}
	SE_RectMap.prototype.getFillColor=function()
	{
		return this.bgcolor;
	}
	SE_RectMap.prototype.setFillColor=function(bgcolor)
	{
		this.bgcolor=bgcolor;
		this.bgdiv.style.backgroundColor=bgcolor;
	}
	SE_RectMap.prototype.getOpacity=function()
	{
		return this.opacity;
	}
	SE_RectMap.prototype.setOpacity=function(opacity)
	{
		this.opacity=opacity;
		SE.Tool.setOpacity(this.bgdiv,this.opacity);
	}
	SE_RectMap.prototype.getLineStroke=function()
	{
		return this.weight;
	}
	SE_RectMap.prototype.setLineStroke=function(weight)
	{
		this.weight=weight;
		this.div.style.borderWidth=parseInt(weight)+"px";
	}
	SE_RectMap.prototype.getLineStyle=function(style)
	{
		return this.lineStyle;
	}
	SE_RectMap.prototype.setLineStyle=function(style)
	{
		if(!style){return;}
		this.lineStyle=style;
		if(style.toLowerCase()=="dot"){style="dotted";}
		if(style.toLowerCase()=="dash"){style="dashed";}
		this.div.style.borderStyle=style;
	}
	SE_RectMap.getPos = function(e,container){
		var offset=SE.Tool.getPageOffset(container);
		var epos = SE.Tool.pointXY(e);
		return [epos[0]-offset[0],epos[1]-offset[1]];
	}
//	map, html为控件的容器
	function SE_RectMapMrg(map,color,bgcolor,weight,opacity)
	{
		this.initialize(map);
//		SE.Tool.inherit(this,SE_BaseControl);
//		this.create();
		this.lineColor=(color || color=="")?color:"#003366";
		this.fillColor=(bgcolor || bgcolor=="")?bgcolor:"#CCCCFF";
		this.lineStroke=weight?weight:1;
		this.fillOpacity=opacity?opacity:0.3;

	}
//	SE_RectMapMrg.prototype.create=function()
//	{
//		this.div =SE.Tool.createDiv(1,["85%","90%"]);
//		this.btn = document.createElement( "input" );
//		this.btn.type = "button";
//		this.btn.title = "截图";
//		this.btn.value="拉框截图";
//		this.div.appendChild( this.btn );
//		
//		this.listeners = [
//			SE.Event.bind(this.btn,"click",this,this.btnClick),
//			SE.Event.addListener(this.btn,"dblclick",SE.Event.cancelBubble),
//			SE.Event.addListener(this.btn,"mousedown",SE.Event.returnTrue),
//			SE.Event.addListener(this.btn,"mouseup",SE.Event.cancelBubble)
//		];
//		this.autoClear=true;
//	}
//	SE_RectMapMrg.prototype.btnClick = function(e)
//	{
//		SE.Event.returnTrue(e);
//		this.start();
//	}
	SE_RectMapMrg.prototype.open = function(){
		this.start();
	}
	SE_RectMapMrg.prototype.close = function(){
		this.end();
	}
	SE_RectMapMrg.prototype.start = function(){
		if(this.flag) { return false; }
//		if(!this.flag) { this.end(); return; }
//		if(!this.map.startOccupy(this.btn.title))
//		{
//			return;
//		}
		this.map.disableDrag();
		this.flag=true;
		this.mmdl=SE.Event.bind(this.map.container,"mousedown",this,this.onMouseDown);
		this.bounds=[];
		this.rects=[];
		this.index=0;
		this.lastPoint=null;
		if(this.lastRect){
			this.map.removeControl(this.lastRect,true);
			this.lastRect = null;
		}
//		this.btn.style.backgroundColor="#FFFFFF";
		if(SE.Tool.browserInfo().isWebKit){
			var cur = 'url(/img/cursor/jietu.cur) 13 13,auto';
		}else{
			var cur = '/img/cursor/jietu.cur';
		}
		this.map.setMapCursor(cur);
		return true;
	}
	SE_RectMapMrg.prototype.end = function(){
		if(!this.flag) return false;
//		this.map.endOccupy(this.btn.title);
		this.map.enableDrag();
		this.flag=false;
		SE.Event.removeListener(this.mmdl);
		SE.Event.removeListener(this.mmdrl);
		SE.Event.removeListener(this.mmul);
		this.mmdl=null;
		this.mmdrl=null;
		this.mmul=null;
		if(this.autoClear)
		{
			this.clear();
		}
//		this.btn.style.backgroundColor="";
	}
	SE_RectMapMrg.prototype.clear=function()
	{
		if(!this.rects){return;}
		var rect;
		while(rect=this.rects.pop())
		{
			this.map.removeControl(rect,true);
		}
		this.rects=[];
		this.bounds=[];
		this.index=0;
	}
	SE_RectMapMrg.prototype.drawRect=function(bounds)
	{
		var rect=new SE_RectMap(bounds,this.lineColor,this.fillColor,this.lineStroke,this.fillOpacity);
		if(this.lineStyle){rect.setLineStyle(this.lineStyle);}
		return rect;
	}
	SE_RectMapMrg.prototype.onMouseDown = function(e)
	{
		if(this.dragObj){this.onMouseUp(e);}
		var dragObj={startPoint:SE.Tool.getEventPosition(e,this.map.container),startDivPoint:[e.clientX,e.clientY]};
		dragObj.mmdrl=SE.Event.bind(document,"mousemove",this,this.onMouseMove);
		dragObj.mmul=SE.Event.bind(document,"mouseup",this,this.onMouseUp);
		this.lastPoint=dragObj.startPoint;
		this.lastBounds=new SE.MercatorBounds(this.lastPoint[0],this.lastPoint[1],this.lastPoint[0],this.lastPoint[1]);
		this.bounds.push(this.lastBounds);
		this.lastRect=this.drawRect(this.lastBounds);
		this.rects.push(this.lastRect);
		this.map.addControl(this.lastRect);
		this.dragObj=dragObj;
		if(this.map.container.setCapture)
		{
			this.map.container.setCapture();
		}
	}
	SE_RectMapMrg.prototype.onMouseUp = function(e)
	{
		SE.Event.cancelBubble(e);
		if(document.releaseCapture)
		{
			document.releaseCapture();
		}
		this.index++;
		var dragObj=this.dragObj;
		if(dragObj)
		{
			SE.Event.removeListener(dragObj.mmdrl);
			SE.Event.removeListener(dragObj.mmul);
		}
		this.map.setMapCursor("default");
		this.dragObj=null;
		SE.Event.trigger(this,"draw",[this.lastRect,this.bounds[this.index-1]]);
		SE.Event.trigger(this,"enddraw",[this.lastRect,this.bounds[this.index-1]]);
		this.lastPoint=null;
		
//		不调用这个函数的话是可以支持连续画多个rect的,不过多个rect也没用
		this.end();
		this.lastRect.startDrag();
	}
	SE_RectMapMrg.prototype.onMouseMove = function(e)
	{
		var dragObj=this.dragObj;
		var p=[dragObj.startPoint[0]+e.clientX-dragObj.startDivPoint[0],dragObj.startPoint[1]+e.clientY-dragObj.startDivPoint[1]];
		this.lastBounds=new SE.MercatorBounds(Math.min(p[0],this.lastPoint[0]),Math.min(p[1],this.lastPoint[1]),Math.max(p[0],this.lastPoint[0]),Math.max(p[1],this.lastPoint[1]));
		this.bounds[this.index]=this.lastBounds;
		this.lastRect.setBounds(this.lastBounds);
	}
	
	SE_RectMapMrg.prototype.initialize=function(map)
	{
		this.map=map;
		this.flag = false;
	}
	SE_RectMapMrg.prototype.remove=function()
	{
		if(this.flag){
			this.close();
		}
		if(this.autoClear){
			this.clear();
		}
		this.map=null;
	}
	SE_RectMapMrg.prototype.depose=function()
	{
		this.remove();
	}
//	SE.Tool.pointXY = function(event){
//		var x = event.pageX || (event.clientX +
//	      (document.documentElement.scrollLeft || document.body.scrollLeft));
//	      
//		var y = event.pageY || (event.clientY +
//	      (document.documentElement.scrollTop || document.body.scrollTop));
//	      return [x,y];
//	}