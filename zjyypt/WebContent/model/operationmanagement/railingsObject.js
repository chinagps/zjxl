var railManageObject = function(o){
	this.version = "create by gaoyang in 2011.10.13";
//	this.loadHtml = "script/ctfoTree/html/ctfoTree.html";
	this.mainContainer = "";
	this.options = {};
	this.init(o);
};

railManageObject.prototype = {
		loadParams : function(o){
			var obj = this;
			if(o){	
				
				obj.options = o;
				
				return true;
			}else
				return false;
		},
		init : function(o){
			var obj = this;
			var su = this.loadParams(o);
			if(su){
				obj.loadding();	
			}else{
				alert("加载数据失败");
			}
			
		},
		loadding:function(){
			var obj = this;
			
			obj.loaddingleft();
			
			obj.setTabs();
			
			obj.loaddingMiddle();
			
			obj.loaddingRightMap();
			
			obj.onResize();
		},
		//初始化左侧树形结构
		loaddingleft:function(){
			var obj = this;
			
//			var param = {
//				 	mainContainer: "#railManagerLeft"
//				 		
//				  };
//			obj.leftTree = new  ctfoTree(param);
			obj.leftTree = KCPT.root.leftTree;
			obj.leftTree.show();
		},
		//初始化中间的grid和上面的查询页面
		loaddingMiddle : function(){
			var obj = this;
			var height = KCPT.root.getCenterSize().height - 180;
			
			
			var optionA = {
					//列
					columns:[ 
					          {display:'围栏名称',name:'',width:100} ,
					          {display:'围栏类型',name:'vinCode',width:100},
					          {display:'告警类型',name:'bl100kml',width:150}, 
		    		          {display:'操作',name:'',width:200,render: function (row) {
		    				    return  "<a href='javascript:railManage.detail("+row.id+")></a><a href='javascript:railManage.update("+row.id+")></a><a href='javascript:railManage.delete("+row.id+")></a>";
		    			      }}
		    		],
		    		showCheckbox:true,
		    		sortName:'id',	
		    		url:'',    	
		    		showTitle:false,
		    		pageSize:10,
		    		pageSizeOptions:[10,20,30,40],
		    		height:height,
		    		autoLoad:false,
		    		//填充数据的tableid
		            tableId: 'RailManagerAllRail',
		            //查询条件formid
		            searchFormId :'searRailForm' 			   
			};
			obj.AllGrid = new ctfoGrid(optionA);
			
			
			obj.AllGridManager = obj.AllGrid.getGridManager();
			
			var optionB = {
					//列
					columns:[ 
					          {display:'围栏名称',name:'',width:100} ,
					          {display:'围栏类型',name:'vinCode',width:100},
					          {display:'告警类型',name:'bl100kml',width:150}, 
		    		          {display:'操作',name:'',width:200,render: function (row) {
		    				    return  "<a href='javascript:railManage.detail("+row.id+")></a><a href='javascript:railManage.update("+row.id+")></a><a href='javascript:railManage.delete("+row.id+")></a>";
		    			      }}
		    		],
		    		showCheckbox:true,
		    		sortName:'id',	
		    		url:'',    	
		    		showTitle:false,
		    		pageSize:10,
		    		pageSizeOptions:[10,20,30,40],
		    		height:height,
		    		autoLoad:false,
		    		//填充数据的tableid
		            tableId: 'RailManagerChoseRail',
		            beforeSubmit:obj.getLeftChecked,
		            beforeSubmitScope:obj,
		            //查询条件formid
		            searchFormId :'searRailForm' 			   
			}
			obj.chooseGrid = new ctfoGrid(optionB);
			obj.chooseGridManager = obj.chooseGrid.getGridManager();
		},
		loaddingRightMap:function(){
			var obj = this;
			obj.cMap = new CTFO_MAP("railManagerMap");
			//SE_MapTool.addMapTool(this.cMap.map, this.options.htmlElements.mapToolContainer);
			obj.cMap.setCenter(116.29376, 39.95776);
			obj.cMap.setLevel(4);
			obj.cMap.addMapControl();
			obj.cMap.addScaleControl();
			obj.cMap.addCenterCrossControl();
			obj.cMap.addOverviewMapControl(false);
			// 绑定地图移动事件
			SE.Event.addListener(obj.cMap.map, "move", SE_Rego.getRegoCode);
			SE_MapCenter.init();
			obj.cMap.changeSize();
		},
		//设置切签操作
		setTabs : function(){
			var obj = this;
			
			var cc_cc = $("div#railManagerTab").find("li");
			
			cc_cc.each(function(){
				$(this).click(function(event,id,type){
					var index =cc_cc.index(this);
					if($(this).attr("class")=="h"){
						return;
					}else{
						cc_cc.each(function(){
							if($(this).attr("class")=="h"){
								var ii = cc_cc.index(this);
								$("#tabContentRailManager").find("div.content").eq(ii).hide();
								$(this).removeClass("h");
								$(this).addClass("ptp");
							}
						});
						$(this).addClass("h");
						$(this).removeClass("ptp");
						$("#tabContentRailManager").find("div.content").eq(index).show();
					}
					
					if(index==0){
						if(obj.control){
							obj.control.close();
						}
						obj.AllGrid.setGridActive(true);
						obj.chooseGrid.setGridActive(false);
					}else if(index==2){
						if(obj.control){
							obj.control.close();
						}
						obj.AllGrid.setGridActive(false);
						obj.chooseGrid.setGridActive(true);
					}else if(index==1){
						if(id){
							obj.loadDetailData(id,type);
						}else{
							
						}
					}
					
					
				});
			});
		},
		bindMapEvent : function(){
			var obj = this;
			var map = obj.cMap.map;
			if(!obj.control){
				obj.control = new SE.RectTool(map);
			}
			SE.Event.bind(obj.control, "draw", map, function(bounds, rect) {
				//obj.control.close();
//				that.addMarkerForLabel(bounds, type, null, actionType);
			});
			if (obj.control)
				obj.control.open();
		},
		loadDetailData:function(id,type){
			var obj = this;
			
			
			if(type=="detail"){
				obj.setAllDisable();
			}else{
				obj.bindMapEvent();
			}
		},
		//把页面弄成灰色 这样在详情的时候禁止操作
		setAllDisable : function(){
			
		},
		//展示所画的电子围栏
		drowArea : function(points){
			var map = obj.cMap.map;
			var bounds;
			var rect = points.split(";");
			$(rect).each(function(){
				var p = this.split(","),
					lngLat = new SE.LngLat( p[0], p[1]);
				pointsArray.push(lngLat);
			});
			bounds = new SE.LngLatBounds(pointsArray);   
			shapeOverlay = new SE.Rect(bounds);   
			shapeOverlay.setLineColor("#ed008c");   
			shapeOverlay.setFillColor("#ffcc00");   
			shapeOverlay.setLineStroke(1); 
		},
		//获得左侧列表中获得的选中的车辆的id
		getLeftChecked : function(obj){
			var checkedId = obj.leftTree.getGridSelectRowID();
//			还得重新写个方法 使这个能追加到grid的参数中去
			obj.chooseGrid.setOtherData({"id":5,"name":'33'});
			
			return true;
		},
		show : function(){
			var obj = this;
			
			obj.leftTree.show();
		},
		onResize : function(){
			var obj = this;
			var height = KCPT.root.getCenterSize().height;
			var width = KCPT.root.getCenterSize().width-20;
			
			$("#content_railManager").css({
				height:height+"px",
				width:width+"px"
			});
			
			$("#content_railManager").find("div.right_c").height(height-10);
			
			$("#content_railManager").find("div.right_c").find("div.right_cc").height(height-108);
			
			$("#content_railManager").find("#railManagerMap").height(height-10);
			
			if(obj.AllGridManager){
				obj.AllGridManager.setHeight(height-180);
			}
		}
}