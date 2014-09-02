var areaMain=function(){
	this.FENCE_U = false; // 编辑
	this.FUNCE_D = false; // 删除电子围栏
	this.FENCE_BINGING = false; // 绑定车辆
	this.FENCE_VBINGING= false; //编辑车辆围栏
	this.FENCE_UNBIND=false; //解除绑定
	this.htmlObj={
			areaMainPanel:"#areaMainPanel",
			areaLeftPanel:"#areaLeftPanel",
			areaMapPanel:"#areaMapPanel",
			areaMapToolPanel:"#areaMapToolPanel",
			areaListGrid:"#areaListGrid",
			AreaBindCarsGrid:"#AreaBindCarsGrid",
			AreaBindCarsFailGrid:"#AreaBindCarsFailGrid",
			areaSearchBindCarsForm:"#areaSearchBindCarsForm",
			areaSearchBindCarsFaildForm:"#areaSearchBindCarsFaildForm",
			areaTreePanel:"#areaTree"
	};	
	this.obj={
			entId:KCPT.user.entId,
			areaMap:null,
			markerIdCache: [],
			markerCache:[],
			bindCarsGrid:null,
			areaListGrid:null,
			importTrackGrid:null,
			bindCarsFailGrid:null
	};
	this.init();
	this.initEvent();
	this.loadAreaData();
	this.searchBindCar();
	this.searchSendErrorCars();
	this.onResize();
	this.initMap();
	this.authentication();
	this.initOperatorOrgGrid();
	};
	areaMain.prototype={
			init:function(){
				var txtEntId=$(this.htmlObj.areaLeftPanel).find(".area_entIdHiddenInput");
				txtEntId.val(KCPT.user.entId);
			},
			orgTree : function() {// 初始化组织结构Tree
				var obj = this;
				KCPT.root.triggerShowObj = obj;
			},
			authentication :function(){//权限验证	
				this.FENCE_U=checkFunction("FG_MEMU_OPERATIONS_FENCE_U"); //编辑		
				this.FENCE_D=checkFunction("FG_MEMU_OPERATIONS_FENCE_D"); //删除电子围栏	
				this.FENCE_BINGING=checkFunction("FG_MEMU_OPERATIONS_FENCE_BINGING"); //绑定车辆
				this.FENCE_VBINGING=checkFunction("FG_MEMU_OPERATIONS_FENCE_VBINGING"); //编辑车辆围栏
				this.FENCE_UNBIND=checkFunction("FG_MEMU_OPERATIONS_FENCE_UNBIND"); //解除绑定
				
				this.FENCE_C=checkFunction("FG_MEMU_OPERATIONS_FENCE_C"); //添加
				if(!this.FENCE_C){
					$("#lineId").remove();
					$("#polygonId1").remove();
					$("#polygonId2").remove();
					$("#importId").remove();					
				}
				
			},
			onResize:function(){
				var obj = this;
				var center = getHeightAndWidth();
				var height = (center.height -198)/2;
				if(obj.gridManager1){//围栏列表
					obj.gridManager1.setHeight(height);
				}
				if(obj.gridManager2){//绑定车辆列表
					obj.gridManager2.setHeight(height);
				}
				if(obj.gridManager3){//绑定失败车辆列表
					obj.gridManager3.setHeight(height);
				}
				//围栏整个div
				$(this.htmlObj.areaMainPanel).height(center.height-28);
				//围栏左侧div
				$(this.htmlObj.areaLeftPanel).height(center.height-27);
				//右侧地图操作栏
				$(this.htmlObj.areaMapToolPanel).width(center.width-480-10);
				//右侧地图
				$(this.htmlObj.areaMapPanel).width(center.width-480-10);
				$(this.htmlObj.areaMapPanel).height(center.height-35-50);
				//右侧绑定车辆div
				//debugger;
				try{
					if(bindCar!=null && bindCar!=undefined && $(bindCar.htmlObj.thisPanel)){
						$(bindCar.htmlObj.thisPanel).width(center.width-480-10);
						$(bindCar.htmlObj.thisPanel).height(center.height-33-50);
						bindCar.onResize();
					}
				}catch(e){
				}
//				var height = KCPT.root.getCenterSize().height;
//				var width = KCPT.root.getCenterSize().width>1200-250?KCPT.root.getCenterSize().width-10:1200-265;
//				var _leftPanel=this.htmlObj.areaLeftPanel;
//				$(_leftPanel).height(height-10);
//				$(this.htmlObj.areaTreePanel).height(height);
//				$(this.htmlObj.areaMapPanel).height(height-64);
//				var w=width-$(_leftPanel).width();
//				$(this.htmlObj.areaMapPanel).width(w-5);
//				$(this.htmlObj.areaMapToolPanel).width(w-5);
			
//				this.obj.areaListGrid.gridManager.setHeight((KCPT.root.getCenterSize().height-228)/2);
//				this.obj.bindCarsGrid.gridManager.setHeight((KCPT.root.getCenterSize().height-188)/2);
//				this.obj.bindCarsFailGrid.gridManager.setHeight((KCPT.root.getCenterSize().height-188)/2);
			},
			change : function(date) {
				this.obj.entId=date.data.id;
//				if($("#dataEntId").length>0){
//					$("#dataEntId").val(date.data.id);
//				}
				$(this.htmlObj.areaLeftPanel).find(".area_entIdHiddenInput").val(date.data.id);
				//$(this.htmlObj.areaMapToolPanel).find("span:eq(0)").text(date.data.text);
				if(this.obj.importTrackGrid){
					$("#area_ImportTrackEntid").val(date.data.id);
					this.obj.importTrackGrid.search();
				}
			},
			initOperatorOrgGrid : function() {
				var entId=$(this.htmlObj.areaLeftPanel).find(".area_entIdHiddenInput").val();
				this.obj.entId=entId;
				if(this.obj.importTrackGrid){
					$("#area_ImportTrackEntid").val(entId);
				}		
			},
			initMap : function()
			{
				var that = this;
				this.obj.areaMap = new CTFO_MAP(that.htmlObj.areaMapPanel.substring(1, that.htmlObj.areaMapPanel.length));
				areaMap=this.obj.areaMap;
				this.obj.areaMap.setCenter(116.29376, 39.95776);
				this.obj.areaMap.setLevel(6);
				TMEvent.addListener(this.obj.areaMap, "move", SE_Rego.getRegoCode);
				this.obj.areaMap.addMapControl();
				this.obj.areaMap.addCenterCrossControl();
				//this.obj.areaMap.addOverviewMapControl(false);
				SE_MapCenter.init();
				this.obj.areaMap.changeSize();
				//地图中已含有版权信息
//				this.obj.areaMap.addMapCopyRight({right: 10, bottom: 5});
			},
			initEvent:function(){
				var thisref=this;
				$(this.htmlObj.areaMapToolPanel).find("a").each(function(i){
					$(this).bind('click',function(){
						switch(i){
						case 0:
							//thisref.findVehiclePostion();
							thisref.mapEvent(3);
							break;
						case 1:
							thisref.mapEvent(2);
							break;
						case 2:
							thisref.findVehiclePostion(2);
							break;
//						case 3:
//							thisref.showImportTrackWin();
//							break;
						}
					});
				});
				
				$("#vehicleNoEqual").bind('focus',function(){
					$("#vehicleNoEqual").val("");
				});
				
				//tab设置
				$(this.htmlObj.areaLeftPanel).find(".areaTab_all a").each(function(i){
					$(this).bind('click',function(){
						$(thisref.htmlObj.areaLeftPanel).find(".areaTab_all a").each(function(j){
							$(this).removeClass("areaTab_back");
						});
						$(this).addClass("areaTab_back");
						$(thisref.htmlObj.areaLeftPanel).find(".tabListBody div").hide();
					   
						$(thisref.htmlObj.areaLeftPanel).find(".tabListBody div:eq("+i+")").show();
						if(i==0){
							$(thisref.htmlObj.AreaBindCarsFailGrid).hide();
							$(thisref.htmlObj.AreaBindCarsGrid).show();
						}else if(i==1){
							$(thisref.htmlObj.AreaBindCarsFailGrid).show();
							$(thisref.htmlObj.AreaBindCarsGrid).hide();
						}
					});
				});
				$("#bindCarBtn").bind('click',function(){
					thisref.loadAreaData();
					//var bindCar=new areaBindCar(thisref.htmlObj.areaMainPanel,thisref.htmlObj.areaMapPanel);
					//thisref.testEditLine();
				});			
			},
			// 快速定位
			findVehiclePostion : function() {
				var _thisref = this;
				var _params = {
					vehicleNo : $("#vehicleNoEqual").val(),
					markerId : "areaFlashMarker",
					map : _thisref.obj.areaMap,
					showTipWindow : null,
					markerVehicleFlash : "areaFlashMarker"
				};
				markerVehicleFlash(_params);

			},
			getEntId:function(){
				if(!KCPT.root.triggerShowObj){
					KCPT.root.triggerShowObj = this;
				}
				var _id=KCPT.user.entId;			
				var txtEntId=$(this.htmlObj.areaLeftPanel).find(".area_entIdHiddenInput");
				var entId=txtEntId.val();
				if(""!=entId){
					_id=entId;
				}
				return _id;
			},			
			showImportTrackWin:function(){
				var thisref=this;
				 var mainDiv = thisref.htmlObj.areaMainPanel;
				   var popwin = $("<div>");
					popwin.attr('id', "area_importTrackPanel");
					popwin.css({
						"position" : "absolute",
						"left" : 830,
						"right" : 0,
						"top" : 230,
						"z-index":1
					});
					$(thisref.htmlObj.thisPanel).remove();
					$(popwin).appendTo($(mainDiv));
					$(popwin).draggable({
					cursor : 'move',
					containment : thisref.htmlObj.parentDiv
					});
					var url = "model/area/importTrack.html";
					$(popwin).load(url, {}, function()
					{
						var _bufferMarker,_markerId;
						var thisPanel=$("#area_importTrackPanel");
						thisPanel.find(".areaClose").bind('click',function(){
							thisref.deleteMarkerCache(_markerId);
							thisPanel.remove();
						});
						//查询轨迹
						thisPanel.find(".area_bt213").bind('click',function(){
							//debugger;
							if(!thisref.obj.importTrackGrid.realGrid.getSelectedRow()){
								$.ligerDialog.warn("车辆选择不能为空");
								return false;
							}
							if(thisPanel.find(".area_srkjl3:eq(0)").val()==""){
								$.ligerDialog.warn('开始时间不能为空');
								return false;
							}
							if(thisPanel.find(".area_srkjl3:eq(1)").val()==""){
								$.ligerDialog.warn('结束时间不能为空');
								return false;
							}							
							var _vid="",
							_startTime=date2utcsA(thisPanel.find(".area_srkjl3:eq(0)").val()),
							_endTime=date2utcsA(thisPanel.find(".area_srkjl3:eq(1)").val());
							if(_startTime > _endTime){
								$.ligerDialog.warn("开始时间不能大于结束时间！", "提示");
								return false;
							}
							_vid=thisref.obj.importTrackGrid.realGrid.getSelectedRow().vid;//2024有值
							JAjax("tbAreaManager/findTrackByVid.action"
									,{"vid":_vid,"startTime":_startTime,"endTime":_endTime}
									,	'json'
									,	function(data,err){
										if(null!=data.error){
											$.ligerDialog.warn("查询轨迹失败 !");
											return false;
										}
										if(data.length<1){
											$.ligerDialog.success("查询轨迹为空");
											return false;
										}
										var _areaargs="",_drawPoints="";
										var _ar = new Array();   
										$(data).each(function(){
											_ar.push(this.longitude); 
							 				_ar.push(this.latitude);
											_areaargs+=parseInt(this.longitude*100000)+","+parseInt(this.latitude*100000)+";";
											_drawPoints+=this.longitude+","+this.latitude+";";
										});
										_markerId ="addOverlay" + thisref.obj.markerIdCache.length;
										var markerContent = {
												areaname : "",
												areaid : _markerId,
												areaioflag : "0",
												areamem : "",
												areashare : 0,
												areashape : "4",
												areaargs : _areaargs,
												areaargsexpand : null
										};
										var areaObj={};
										areaObj.markerId=_markerId;
										areaObj.point=null;
										areaObj.actionType="add";
										areaObj.markerContent=markerContent;
										thisPanel.find(".areaClose").trigger("click");
										line.showPopWin(areaObj);
										_bufferMarker=new drawZone("areaId",4,thisref.obj.areaMap.map,_drawPoints);
										this.obj.markerCache[_markerId]=_bufferMarker;
										this.obj.areaMap.getBestMaps(_ar);  
										}
									,	function(data,err){
										  $.ligerDialog.success("查询轨迹数据为空");
										}
								);
						});
						 var options = {
									//列 
								   columns : [
												{
													display : '选择',
													name : 'vid',
													width : 100,
													align : 'center',
													toggle : false,
								                    render: function (row)
								                    {
								                        var html = '<input type="radio" name="area_ImportTrack_radio" />';
								                        return html;
								                    }
												},
												{
													display : '车牌号码',
													name : 'vehicleNo',
													width : 150,
													align : 'left',
													toggle : false
												}],
													showCheckbox : false,
													url : 'operationmanagement/findVehicleForListPage.action',//数据请求地址
													parms:[{name:"requestParam.equal.entId",value:thisref.getEntId()}],
													pageSizeOptions : [ 5, 10, 20, 30 ],
													height :245,
													autoLoad : true,
													//submitId:"area_importTrackSearchCarBtn",
													usePager : true,
													mainContain:"area_importTrackPanel",
													container:"area_importTrackPanel",
													tableId :'area_importTrackTable',
													page : 1, // 默认当前页
													//查询条件formid
													searchFormId : 'area_searchCarForm'
												};
						 
							thisref.obj.importTrackGrid = new ctfoGrid(options);
							thisPanel.find(".l-bar-text").remove();
					});
			},
			// 注册地图事件
			// type 表示注册的是那类型事件1:圆形,2:矩形,3:多边形,4:线
			mapEvent : function(type) {
				var that = this, map =that.obj.areaMap.map, actionType = "add";
				if (that.obj.areaMap.mtool){
					that.obj.areaMap.mtool.close();
					that.obj.areaMap.mtool=null;
				}
				switch (type) {
					case 1:
						break;
					case 2:
						var rectOption = new TMRectOptions();    
						rectOption.map = map; 
						rectOption.editable = false;
						that.obj.areaMap.mtool = new TMRectTool(rectOption);
						TMEvent.bind(that.obj.areaMap.mtool, "drawend",that.obj.areaMap.mtool, function(rect) {
							that.obj.areaMap.mtool.close();	
							that.obj.areaMap.mtool=null;
							map.setMapCursor(_map_cur[0],_map_cur[1]);
							var bounds=rect.getBounds();
							that.addMarkerForLabel(bounds, type, null, actionType,rect);							
						});
						break;
					case 3:
						var polygonOption=new TMAreaToolOptions();
						polygonOption.map=map;
						polygonOption.editable=false;
						that.obj.areaMap.mtool=new TMPolygonTool(polygonOption);						
						TMEvent.bind(that.obj.areaMap.mtool, "drawend", map, function(polygon) {							
							that.obj.areaMap.mtool.close();	
							that.obj.areaMap.mtool=null;
							map.setMapCursor(_map_cur[0],_map_cur[1]);
							var points=polygon.getPoints();
							that.addMarkerForLabel(points, type, null, actionType,polygon);							
					});
						break;
					case 4://线，暂时没用，如果使用下面方法需修改
						that.obj.areaMap.mtool = new TMPolyLineTool(map,false);
						that.obj.areaMap.mtool.setCursor("crosshair");						
						TMEvent.bind(that.obj.areaMap.mtool, "draw", map, function(points, area, polyline) {
							that.obj.areaMap.mtool.close();
							that.obj.areaMap.mtool=null;
							map.setMapCursor(_map_cur[0],_map_cur[1]);
							
							that.addMarkerForLabel(points, type, null, actionType);
						});		
						break;
					default:
						break;
				}
				if (that.obj.areaMap.mtool){
					that.obj.areaMap.mtool.open();
				}
			},
			//1:圆,2:矩形,3:多边形,4:线
			addMarkerForLabel : function(points, type, markerContent, actionType,overlay) {
				var that = this,
					map = this.obj.areaMap.map, 
					areaargs = "", 
					point,
					pointsArray = [],
					pointsObj = null,
					marker = null,
					bufferMarker = null,
					strCoordsPoint = "",
					radius = markerContent ? markerContent.arearadius : 100,
					markerId = markerContent ? markerContent.areaid : "addOverlay" + that.obj.markerIdCache.length;
				if(markerContent && !points)
					points = markerContent.areaargs;
				if((typeof points) == "string" && points){
					var pointsArr = points.split(";");
					$(pointsArr).each(function(){
						var p = this.split(","),
							lnglat = new TMLngLat(p[0], p[1]);
						pointsArray.push(lnglat);
					});
					pointsObj = pointsArray;
					if(type == 2){
						point = pointsObj[0];
						pointsObj = new TMLngLatBounds(pointsArray);
					}
				}else if((typeof points) == "object" && points)
					pointsObj = points;
				
				switch (type) {
					case 1:
			
						break;
					case 2:
						marker = overlay;
						if(actionType == "add"){
							point = pointsObj.getCenterPoint();
						}
						areaargs = pointsObj.Xmin + "," + pointsObj.Ymax + ";"
								+ pointsObj.Xmax + "," + pointsObj.Ymin;
						break;
					case 3:
						marker = overlay;
						point = pointsObj[0];
						$(pointsObj).each(function(i){
							if (i ==0) 
							areaargs += this.getLng() + "," + this.getLat();
							areaargs += ";" + this.getLng() + "," + this.getLat();
						});
						break;
			
					case 4://线，暂时没用，如果使用下面方法需修改
						//marker = new SE.PolyLine(pointsObj);
						point = pointsObj[0];
						$(pointsObj).each(function(i){
							if (i == 0)
								areaargs += this.getLng() + "," + this.getLat();
							else
								areaargs += ";" + this.getLng() + "," + this.getLat();
						});
						strCoordsPoint = that.getBufferShapePoints(radius, areaargs);
						bufferMarker = drawZone("lineBuffer_"+markerId,3,map,strCoordsPoint);
						break;
			
					default:
						break;
				}
				if(!markerContent){
					markerContent = {
							areaname : "",
							areaid : markerId,
							areaioflag : "0",
							areamem : "",
							areashare : 0,
							areashape : type,
							areaargs : areaargs,
							areaminspeed : "",
							areamaxspeed : "",
							arearadius : "100",
							areaargsexpand : strCoordsPoint
					};
				}
				if(marker){
					map.overlayManager.addOverLay(marker);
					this.obj.markerIdCache.push(markerId);
					this.obj.markerCache[markerId] = marker;
					TMEvent.addListener(marker, "click", function(rect){
						that.showTipContent(markerId, point, type, actionType, markerContent);
					});
				}
				if(bufferMarker){
					map.overlayManager.addOverLay(bufferMarker);
//						bufferMarker.enableEdit();
//						this.obj.markerIdCache.push("lineBuffer_"+markerId);
					this.obj.markerCache[markerId] = bufferMarker;
					/*SE.Event.addListener(bufferMarker, "click", function(){
						that.showTipContent(markerId, point, type, actionType, markerContent);
					});*/
				}
				this.showTipContent(markerId, point, type, actionType, markerContent);
				
			},
			getBufferShapePoints : function(r, areaargs){
				//画完成折线以后 把点扩展成为面 并展示出来
				var radius = 0.00000899 * 100000 * r,
					strCoordsPoint = PolylineBuffer.GetBufferEdgeCoords(areaargs, radius);
				return strCoordsPoint;
			},
			showTipContent : function(markerId, point, type, actionType, markerContent){
				var areaObj={};
				areaObj.markerId=markerId;
				areaObj.point=point;
				areaObj.actionType=actionType;
				areaObj.markerContent=markerContent;
				if(type=="4"){
					//var line=new areaLine();
					line.showPopWin(areaObj);
					//debugger;
				}else if(type=="3" || type=="2"){
					//var polygon=new areaPolygon(this.htmlObj.areaMainPanel,areaObj);
					polygon.showPopWin(areaObj,null,type);
				}
			},
			isHidden : function(markerId){
				var marker = this.markerCache[markerId];
				return marker.getOpacity();
			},
			showMarker : function(markerId){
				var map = this.options.defaultObj.Map;
				var marker = this.markerCache[markerId];
				if(this.markerInfoWinCacheId == markerId)
					map.addOverLay(this.markerInfoWinCache);
				marker.setOpacity(0.5);
			},
			hideMarker : function(markerId){
				var map = this.options.defaultObj.Map;
				var marker = this.markerCache[markerId];
				if(this.markerInfoWinCacheId == markerId)
					map.removeOverLay(this.markerInfoWinCache, false);
				marker.setOpacity(0);
			},
			deleteMarkerCache : function(markerId){
				var map = this.obj.areaMap,
				marker = this.obj.markerCache[markerId];
                map.map.overlayManager.removeOverLay(marker, true);
				this.obj.markerCache[markerId]=null;
				delete marker;
			},
			getGridHeight : function(){
				var center = getHeightAndWidth();
				return (center.height -200)/2;
			},
			/**
			 * 加载电子围栏数据
			 */
			loadAreaData:function(){
				   var thisref=this;
				   var height=thisref.getGridHeight();
				   var options = {
							//列 
						   columns : [
										{
														display : '围栏名称',
														name : 'areaName',
														width : 100,
														align : 'left',
														toggle : false
													},
													{
														display : '围栏类型',
														name : 'areaShape',
														width : 60,
														align : 'center',
														render : function(row) {
															if(row.areaShape=="3"){
																return "线路";
															}else if(row.areaShape=="2"){
																return "多边形";
															}else if(row.areaShape=="5"){
																return "矩形";
															}
															else{
																return "";
															}
														}
													},
													{
														display : '绑定车辆数',
														name : 'vehicleCount',
														width : 70,
														align : 'center',
														 render: function (row)
										                    {
										                        var html = '<a href="javascript:void(0)" onclick="area.searchBindCarsByAreaName(\'' + row.areaName + '\')">'+ row.vehicleCount +' </a>';
										                        return html;
										                    }
													} ,
													{
														display : '发送不成功数',
														name : 'sendFailCount',
														width : 80,
														align : 'center',
														 render: function (row)
										                    {
										                        var html = '<a href="javascript:void(0)" onclick="area.searchBindFaildCarsByAreaName(\'' + row.areaName + '\')">'+ row.sendFailCount +' </a>';
										                        return html;
										                    }

													} ,
													{
														display : '操作',					
														width : 100,
														align : 'center',
														render : function(row) {
															var show = "";
															var revoke = "";
															var remove = "";
															var bind = "";
																													
															if(row.areaShape=="3"){																
																show='<a onclick="line.showAreaLine('+row.areaId+');"><img class="hand" src="images/area/fenceManagement_operate_1.png"  title="显示/隐藏" /></a>';
																if(thisref.FENCE_U){
																	revoke = '<a onclick="line.showUpdateAreaLinePop('+row.areaId+',\''+row.areaName+'\','+row.tbAreaStatus+');"><img class="hand" src="images/area/fenceManagement_operate_2.png" title="编辑" /></a>';
																}									
															}else if(row.areaShape=="2"){
																//onclick="this.alt=(this.alt==\'显示\'?\'隐藏\':\'显示\');"
																show='<a onclick="polygon.showUpdateAreaPolygonPop('+row.areaId+',\''+row.areaName+'\','+row.areaShape+','+false+');"><img class="hand" src="images/area/fenceManagement_operate_1.png"  title="显示/隐藏" /></a>';
																if(thisref.FENCE_U){
																	revoke = '<a onclick="polygon.showUpdateAreaPolygonPop('+row.areaId+',\''+row.areaName+'\','+row.areaShape+','+true+');"><img class="hand" src="images/area/fenceManagement_operate_2.png"  title="编辑"/></a>';
																}																
															}else if(row.areaShape=="5"){
																//onclick="this.alt=(this.alt==\'显示\'?\'隐藏\':\'显示\');"
																show='<a onclick="polygon.showUpdateAreaPolygonPop('+row.areaId+',\''+row.areaName+'\','+row.areaShape+','+false+');"><img class="hand" src="images/area/fenceManagement_operate_1.png"  title="显示/隐藏" /></a>';
																
																if(thisref.FENCE_U){		
																	revoke = '<a onclick="polygon.showUpdateAreaPolygonPop('+row.areaId+',\''+row.areaName+'\','+row.areaShape+','+true+');"><img class="hand" src="images/area/fenceManagement_operate_2.png"  title="编辑"/></a>';
																}
																
															}
															
															if(thisref.FENCE_D){
																remove = '<a onclick="line.delAreaLine('+ row.areaId + ');"><img class="hand" src="images/area/fenceManagement_operate_3.png" title="删除"/></a>';
															}
															
															if(thisref.FENCE_BINGING){
																bind = '<a onclick="bindCar.showBindCarPop('+ row.areaId + ','+row.entId+');"><img class="hand" src="images/area/fenceManagement_operate_4.png" title="车辆绑定"/></a>';
															}															
															return show + " " + revoke + " "+ remove+" "+bind;
															
													}
													}],
											showCheckbox : false,
											url : 'tbAreaManager/findByParamsForArea.action',//数据请求地址
											showTitle : false,
											pageSize : 5,
											beforeSubmit: function () {
												return true;
											},
											pageSizeOptions : [ 5, 10, 20, 30 ],
											height : height,//160
											autoLoad : false,
											sortName:"areaId",
											submitId:"areaListSearchBtn",
											//parms:[{name:"requestParam.equal.entId",value:thisref.getEntId()}],
											usePager : true,
											mainContain:"areaLeftPanel",
											container:"areaLeftPanel",
											tableId :'areaListGrid',
											page : 1, // 默认当前页
											//查询条件formid
											searchFormId : 'alarmManagerform'
										};
					thisref.obj.areaListGrid = new ctfoGrid(options);
//					var txtEntId=$(thisref.htmlObj.areaLeftPanel).find(".area_entIdHiddenInput");
//					var entId=txtEntId.val();
//					if(""==entId){
//						txtEntId.val(KCPT.user.entId);
//					}
					thisref.obj.areaListGrid.search();
					thisref.gridManager1 = $("#areaListGrid").ligerGetGridManager();
			},
			/**
			 * 绑定车辆查询
			 */
			searchBindCar:function(){
				var thisref=this;
				var height=thisref.getGridHeight();
				var options = {
						//列 
					   columns : [
									{
										display : '围栏名称',
										name : 'areaName',
										width : 100,
										align : 'left',
										toggle : false
									},
									{
										display : '类型',
										name : 'areaShape',
										width : 40,
										align : 'center',
										render : function(row) {
											if(row.areaShape=="3"){
												return "线路";
											}else if(row.areaShape=="2"){
												return "多边形";
											}else if(row.areaShape=="5"){
												return "矩形";
											}else{
												return "";
											}
										}
									},
									{
										display : '车牌号码',
										name : 'vehicleNo',
										width : 60,
										align : 'center'
										
									} ,
									{
										display : '组织名称',
										name : 'entName',
										width : 100,
										align : 'left',
										render:function(row){
											if(row.entName.length>6){														
											return  '<span  title="'+row.entName+'" >'+row.entName.substring(0,6)+'...</span>';
											}else{
												return row.entName;
											}
										}

									} ,
									{
										display : '时间设置',
										name : 'sendUtc',
										width : 340,
										align : 'center',
										render:function(row){
											return  utc2Date(row.areaBegintime).substring(0,10)+"至"+utc2Date(row.areaEndtime).substring(0,10)
											+" 有效时间："+formatTime(row.periodBegintime)+"至"+formatTime(row.periodEndtime);
										}
											
									},
									{
										display : '围栏属性',
										name : 'areaUsetype',
										width : 270,
										align : 'left',
										render:function(row){
											
										var s=row.areaUsetype.split(",");
										var rs="";
										for(var i=0;i<s.length;i++){
											switch(s[i]){
											case "1":
												rs+="限时,";
												break;
											case "2":
												rs+="超速限速,";
												break;
											case "9":
												rs+="低速限速,";
												break;
											case "7":
												rs+="进报警给平台,";
												break;
											case "4":
												rs+="进报警给终端,";
												break;
											case "8":
												rs+="出报警给平台,";
												break;
											case "6":
												rs+="出报警给终端,";
												break;
											}
										}
										if(rs.length>0){
										return rs.substring(0, rs.length-1);
										}else{
											return "";
										}
										}
									},
									{
										display : '判断方式',
										name : 'areaDecide',
										width : 60,
										align : 'center',
										render : function(row) {
											if(row.areaDecide==1){
												return "平台判断";
											} else if(row.areaDecide==2){
												return "车机判断";
											} 
										}
									},
									{
										display : '状态',
										name : 'areaEnable',
										width : 60,
										align : 'center',
										render : function(row) {
											//debugger;
											//根据YYPT-202所修改 yuanxiujun
											if(row.areaEnable=="1" && date2utcs(utc2Date(row.areaEndtime).substring(0,10)+" "+row.periodEndtime) > date2utcs(getnowTime(true))){
												return "使用";
											}else{
												return "无效";
											}
										}
											
									},
									{
										display : '操作',					
										width : 70,
										align : 'center',
										render : function(row) {
											var data=row.areaBegintime+"|"+row.areaEndtime+"|"+row.areaUsetype+"|"+row.areaDecide+"|"+row.vid+"|"+row.id+"|"+row.areaName+"|"+row.seq
											+"|"+row.periodBegintime+"|"+row.periodEndtime;
											var del="";														
											var bind = "";
										
											if(thisref.FENCE_UNBIND){
												del = '<a onclick="bindCar.delBindCars('+ row.id + ','+row.areaId+');"><img class="hand" src="images/area/fenceManagement_operate_3.png" title="解除绑定"/></a>';
											}
											if(thisref.FENCE_VBINGING){
												bind = '<a onclick="bindCar.showBindCarPop('+ row.areaId +','+row.entId+ ','+true+',\''+data+'\');"><img class="hand" src="images/area/fenceManagement_operate_2.png" title="编辑"/></a>';
											}
											return bind+" "+del;
									}
									}
									],
										showCheckbox : false,
										// 发送状态 -1等待回应 0:成功 1:失败   sendStatusNot=1:不是失败的
										url : 'tbAreaManager/findByParamsForVA.action?requestParam.equal.sendsStatus=1&&requestParam.equal.areaStatusNot=3',//数据请求地址
										//data:{"requestParam.equal.sendStatus":"-1","requestParam.equal.entId":thisref.obj.entId},										
										showTitle : false,
										pageSize : 5,
										beforeSubmit: function () {
											return true;
										},
										pageSizeOptions : [ 5, 10, 20, 30 ],
										height : height,//155,
										autoLoad : false,
										submitId:"AreaBindCarsBtn",
										usePager : true,
										mainContain:"areaLeftPanel",
										container:"areaLeftPanel",
										tableId :'AreaBindCarsGrid',
										page : 1, // 默认当前页
										//查询条件formid
										searchFormId : 'areaSearchBindCarsForm'
									};
				thisref.obj.bindCarsGrid= new ctfoGrid(options);
				//$(thisref.htmlObj.areaLeftPanel).find(".area_entIdHiddenInput").val(((KCPT.root.leftTree.loadTreeSelectedData.data.id != null) ? KCPT.root.leftTree.loadTreeSelectedData.data.id : KCPT.user.entId));
				thisref.obj.bindCarsGrid.search();
				thisref.gridManager2 = $("#AreaBindCarsGrid").ligerGetGridManager();
			},
			/**
			 * 查询发送不成功车辆
			 */
			searchSendErrorCars:function(){
				var thisref=this;
				var height = thisref.getGridHeight();
				var options = {
						//列 
					   columns : [
									{
										display : '围栏名称',
										name : 'areaName',
										width : 100,
										align : 'center',
										toggle : false
									},
									{
										display : '类型',
										name : 'areaShape',
										width : 40,
										align : 'center',
										render : function(row) {
											if(row.areaShape=="3"){
												return "线路";
											}else if(row.areaShape=="2"){
												return "多边形";
											}else if(row.areaShape=="5"){
												return "矩形";
											}else{
												return "";
											}
										}
									},
									{
										display : '车牌号码',
										name : 'vehicleNo',
										width : 60,
										align : 'center'
										
									} ,
									{
										display : '组织名称',
										name : 'entName',
										width : 70,
										align : 'center'

									}
									,
									{
										display : '时间设置',
										name : 'sendUtc',
										width : 340,
										align : 'center',
										render:function(row){
											return  utc2Date(row.areaBegintime).substring(0,10)+"至"+utc2Date(row.areaEndtime).substring(0,10)
											+" 有效时间："+formatTime(row.periodBegintime)+"至"+formatTime(row.periodEndtime);
										}
											
									},
									{
										display : '围栏属性',
										name : 'areaUsetype',
										width : 270,
										align : 'left',
										render:function(row){
											
										var s=row.areaUsetype.split(",");
										var rs="";
										for(var i=0;i<s.length;i++){
											switch(s[i]){
											case "1":
												rs+="限时,";
												break;
											case "2":
												rs+="超速限速,";
												break;
											case "9":
												rs+="低速限速,";
												break;
											case "7":
												rs+="进报警给平台,";
												break;
											case "4":
												rs+="进报警给终端,";
												break;
											case "8":
												rs+="出报警给平台,";
												break;
											case "6":
												rs+="出报警给终端,";
												break;
											}
										}
											if(rs.length>0){
											return rs.substring(0, rs.length-1);
											}else{
												return "";
											}
										}
									}
									,
									{
										display : '判断方式',
										name : 'areaDecide',
										width : 60,
										align : 'center',
										render : function(row) {
											if(row.areaDecide==1){
												return "平台判断";
											} else if(row.areaDecide==2){
												return "车机判断";
											} 
										}
									},
									{
										display : '操作类型',
										name : 'areaStatus',
										width : 60,
										align : 'center',
										render : function(row) {
											if(row.areaStatus==1){
												return "新增绑定";
											} else if(row.areaStatus==2){
												return "修改绑定";
											} else if(row.areaStatus==3){
												return "删除绑定";
											}
										}
											
									},
									{
										display : '状态',
										name : 'sendStatus',
										width : 60,
										align : 'center',
										render : function(row) {
											if(row.sendStatus=="-1"){
												return "等待回应";
											} else if(row.sendStatus=="0"){
												return "发送成功";
											} else {
												return "发送失败";
											}
										}
											
									},
									{
										display : '操作',					
										width : 80,
										align : 'center',
										render : function(row) {
											var remove = "<a onclick=\"area.resetSendCommand("+ row.id+");\"><img class='hand' src='images/area/fs.png' title='重新发送'/></a>";
											return  remove ;
									}
									}],
										showCheckbox : false,
										url : 'tbAreaManager/findByParamsForVA.action?requestParam.equal.sendStatus=-1&&requestParam.equal.tbareaStatus=1',//数据请求地址
										// 发送状态 -1等待回应 0:成功 1:失败
										//data:{"requestParam.equal.sendStatus":"1","requestParam.equal.entId":thisref.obj.entId},
										showTitle : false,
										pageSize : 5,
										beforeSubmit: function () {
											return true;
										},
										pageSizeOptions : [ 5, 10, 20, 30 ],
										height : height,//160,
										autoLoad : false,
										submitId:"areaBindCarsFailBtn",
										usePager : true,
										mainContain:"areaLeftPanel",
										container:"areaLeftPanel",
										tableId :'AreaBindCarsFailGrid',
										page : 1, // 默认当前页
										//查询条件formid
										searchFormId : 'areaSearchBindCarsFaildForm'
									};
				thisref.obj.bindCarsFailGrid = new ctfoGrid(options);
				thisref.gridManager3 = $("#AreaBindCarsFailGrid").ligerGetGridManager();
			},
			searchBindCarsByAreaName:function(areaName){
				$(this.htmlObj.areaLeftPanel).find(".areaTab_all a:eq(0)").click();
				var _thisForm=$(this.htmlObj.areaSearchBindCarsForm);
				_thisForm.find("input:eq(1)").val(areaName);
				_thisForm.find("input:eq(2)").val("");
				_thisForm.find("select:eq(0) option:eq(0)").attr("selected","selected");
				_thisForm.find("input[type=submit]")[0].click();
			},
			searchBindFaildCarsByAreaName:function(areaName){
				$(this.htmlObj.areaLeftPanel).find(".areaTab_all a:eq(1)").click();
				var _thisForm=$(this.htmlObj.areaSearchBindCarsFaildForm);
				_thisForm.find("input:eq(1)").val(areaName);
				_thisForm.find("input:eq(2)").val("");
				_thisForm.find("select:eq(0) option:eq(0)").attr("selected","selected");
				_thisForm.find("select:eq(1) option:eq(0)").attr("selected","selected");
				_thisForm.find("input[type=submit]")[0].click();
			},
			resetSendCommand:function(id){//车辆状态
				var that=this;
				JAjax("tbAreaManager/resetSendCommand.action"
						,{"vehicleArea.id":id}
						,	'json'
						,	function(data,err){
							if(data.responseText=="success"){
								$.ligerDialog.success("操作成功");
							}else{
								$.ligerDialog.warn("操作失败");
							}
							}
						,	function(data,err){
							if(data.responseText=="success"){
								that.obj.areaListGrid.reload();
								$.ligerDialog.success("操作成功");
							}else{
								$.ligerDialog.warn("操作失败");
							}
							}
					);
			}
	};
	
	/**
	 * 检查是否由数字组成
	 */
	function isDigit(_string) {
		 var reg = /^\d+$/;
		 if (!_string.match(reg)){
			 $.ligerDialog.warn("不能为空，且只能输入数字");
		     return true;
		 }else{    
		     return false;        
		 }    
	};
	
	/**
	 * 验证电子围栏名称
	 */
    function existName(_string) {
    	var reg = /^[\u4e00-\u9fa5\w]+$/;
    	if (!_string.match(reg)){
    		$.ligerDialog.warn("不能为空，且不能包含非法字符");
		    return true;
		}else{    
		    return false;        
		}    
    }
	/**
	 * hh:mm:ss转为标准的hh:mm:ss
	 * 不足位数的补0
	 */
	function formatTime(s_time){
		var times=s_time.split(":");
		var timeStr=((!times[0]||times[0].length<2)?"0":"")+times[0]
					+":"+((!times[1]||times[1].length<2)?"0":"")+times[1]
					+":"+((!times[2]||times[2].length<2)?"0":"")+times[2];
		return timeStr;
	}
    