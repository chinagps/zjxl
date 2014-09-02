var areaLine=function(){
	this.htmlObj={
		parentDiv:"#areaMainPanel",
		closeBtn:"#areaBindCarClose",
		thisPanel:"#areaLinePopDiv",
		closeBtn:"#areaLineCloseBtn",
		arealineConditionPanel:"#arealineConditionPanel"
	};
	this.areaObj={
			opId:KCPT.user.opId,
			areaId:0,
			areaName:"",
			areaargs:"",
			areaStatus:"",
			lineCache:[],
			lineObj:{}
	};
	this.actionType="add";
	this.lineLen=0;
};

areaLine.prototype={
		showPopWin:function(lineObj,data){
			  var thisref=this;
			  this.actionType="add";
			  thisref.areaObj.lineObj=lineObj;
			  var mainDiv = thisref.htmlObj.parentDiv;
			   var popwin = $("<div>");
				popwin.attr('id', thisref.htmlObj.thisPanel.substring(1,thisref.htmlObj.thisPanel.length));
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
				var url = "model/area/line.html";
				$(popwin).load(url, {}, function()
				{
					var _panel=$(thisref.htmlObj.arealineConditionPanel);
					var tabSize=13;
			    	var initLi=function(li){
				    	$(li).bind('click',function(){
				    	$(thisref.htmlObj.thisPanel).find(".arealinetobletwo li").each(function(i){
				    		 if ( $(this).hasClass("arealinelight") ){
					    		 return ;
					    	 }{
					    	   	 $(this).removeClass("arealinetd");
					    		 $(this).addClass("arealinelight"); 
					    	 }
				    	});
				    	$(this).removeClass("arealinelight");
			    		$(this).addClass("arealinetd");
			    		_panel.find("table").hide();
				    	//var thisIndex=$(this).index()+1;
			    		_panel.find("table:eq("+$(this).text()+")").show();
				    });
				    
			    		
			    	};
					$(thisref.htmlObj.thisPanel).find("img:eq(0)").hide();
			    	$(thisref.htmlObj.thisPanel).find("img:eq(1)").hide();
			    	_panel.find("table:eq(0)").hide();
					//设置数字tab
					thisref.lineLen=lineObj.markerContent.areaargs.split(";").length-1;
					for(var i=0;i<thisref.lineLen;i++){
						_panel.append(_panel.find("table:eq(0)").clone().hide());
						var li=$("<li>");
						initLi(li);
					    if(i==0){
					    	 $(li).addClass("arealinetd");
					    }else{
					    	  $(li).addClass("arealinelight");
					    }
					    $(li).text(i+1);
					    if(i<13){
					    	$(thisref.htmlObj.thisPanel).find(".arealinetobletwo").append($(li));
					    }
					    
					}
					
					if(thisref.lineLen>13){
					var _img0=$(thisref.htmlObj.thisPanel).find("img:eq(0)"),
			    	_img1=$(thisref.htmlObj.thisPanel).find("img:eq(1)");
			    	_img0.hide();
			    	_img1.show();
			    	_img1.bind('click',function(){
			    	var lastTabText=$(thisref.htmlObj.thisPanel).find(".arealinetobletwo li:last").text();
			    	$(thisref.htmlObj.thisPanel).find(".arealinetobletwo li").remove();
			    		//debugger;
			    		var _startTabIndex=parseInt(lastTabText)+1;
			    		var _endIndex=parseInt(lastTabText)+tabSize>thisref.lineLen?thisref.lineLen+1:_startTabIndex+tabSize;
			    		for(var i=_startTabIndex;i<_endIndex;i++){
							var li=$("<li>");
							initLi(li);
						    if(i==0){
						    	 $(li).addClass("arealinetd");
						    }else{
						    	  $(li).addClass("arealinelight");
						    }
						    $(li).text(i);
						    $(thisref.htmlObj.thisPanel).find(".arealinetobletwo").append($(li));
			    		}
			    		if(_endIndex>thisref.lineLen){
			    			_img1.hide();
			    		}
			    		_img0.show();
			    	});
			    	
			    	_img0.bind('click',function(){
			    		//debugger;
			    		var firstTabText=$(thisref.htmlObj.thisPanel).find(".arealinetobletwo li:first").text();
			    		var _endTabIndex=parseInt(firstTabText)-tabSize>0?parseInt(firstTabText):tabSize+1;
			    		var _startTabIndex=parseInt(firstTabText)-tabSize>0?(parseInt(firstTabText)-tabSize):1;
			    		$(thisref.htmlObj.thisPanel).find(".arealinetobletwo li").remove();
			    		//debugger;
			    		for(var i=_startTabIndex;i<_endTabIndex;i++){
							var li=$("<li>");
							initLi(li);
						    if(i==0){
						    	 $(li).addClass("arealinetd");
						    }else{
						    	  $(li).addClass("arealinelight");
						    }
						    $(li).text(i);
						    $(thisref.htmlObj.thisPanel).find(".arealinetobletwo").append($(li));
			    		}
			    		if(_startTabIndex==1){
			    			_img0.hide();
			    		}
			    		_img1.show();
			    		
			    	});
						
						
						
					}
					
					
					
					//显示需要编辑的数据
				    if(data){
				    	thisref.actionType="update";
				    	$(thisref.htmlObj.thisPanel).find("input:eq(0)").val(data.areaName);
			 			for(var i=0;i<data.Rows.length;i++){	
			 				_panel.find("table:eq("+(i+1)+")").find("input:eq(0)").val(data.Rows[i].lineWidth);
			 				_panel.find("table:eq("+(i+1)+")").find("input:eq(1)").val(data.Rows[i].lineTimes);
			 				_panel.find("table:eq("+(i+1)+")").find("input:eq(2)").val(data.Rows[i].areaMaxspeed/10);//显示最大速度/10
			 				_panel.find("table:eq("+(i+1)+")").find("input:eq(3)").val(data.Rows[i].superspeedTimes);
			 				_panel.find("table:eq("+(i+1)+")").find("input:eq(4)").val(data.Rows[i].thresholdLong);
			 				_panel.find("table:eq("+(i+1)+")").find("input:eq(5)").val(data.Rows[i].thresholdShort);
			 			}
				    }
				    _panel.find("table:eq(1)").show();
					thisref.bindEvent();
				});
		},
		bindEvent:function(){
			var thisref=this;
			$(thisref.htmlObj.closeBtn).bind('click',function(){
				$(thisref.htmlObj.thisPanel).remove();
				if(area.obj.markerCache[thisref.areaObj.areaId]){
					area.deleteMarkerCache(thisref.areaObj.areaId);
					return ;
				}
				thisref.remove();
			});
			$(thisref.htmlObj.thisPanel).find(".monitorButton").bind('click',function(){
				if(thisref.actionType=="add"){
					thisref.addAreaLine();
				}
				else if(thisref.actionType=="update"){
					thisref.updateAreaLine();
				}
			});
		},
		//tbArea.areaShape 3 line   4 polygon
		addAreaLine:function(){
			var thisref=this;
			//thisref.showPopWin(thisref.areaObj.lineObj);
			var areaargs=thisref.areaObj.lineObj.markerContent.areaargs.split(";");
			thisref.lineLen=areaargs.length;
			var param = {};
			var areaName=$(thisref.htmlObj.thisPanel).find("input:eq(0)").val();
			if (areaName.length > 20){
				$(thisref.htmlObj.thisPanel).find("input:eq(0)").focus();
				$.ligerDialog.warn("围栏名称不能超过20个字符");
				return false;
			} else if(existName(areaName)) {
				$(thisref.htmlObj.thisPanel).find("input:eq(0)").focus();
				return false;
			}
			param["tbArea.areaName"]=areaName;
			param["tbArea.areaShape"]=3;
			param["tbArea.entId"]=area.obj.entId;
			param["tbArea.opId"]=thisref.areaObj.opId;
			for(var i=0;i<thisref.lineLen;i++){	
				var _lon=areaargs[i].split(",")[0],_lat=areaargs[i].split(",")[1];
				//无法正常插入和显示
				if(undefined==_lon||""==_lon||undefined==_lat||""==_lat){
					break;
				}
				param["trAreaList["+i+"].lon"]=_lon;
				param["trAreaList["+i+"].lat"]=_lat;
				param["trAreaList["+i+"].pointOrder"]=i;
				var _panel=$(thisref.htmlObj.arealineConditionPanel);
				if(i<(thisref.lineLen-1)){
				var lineWidth=_panel.find("table:eq("+(i+1)+")").find("input:eq(0)").val();
				var lineTimes=_panel.find("table:eq("+(i+1)+")").find("input:eq(1)").val();
			    var areaMaxspeed=_panel.find("table:eq("+(i+1)+")").find("input:eq(2)").val();
			    var superspeedTimes=_panel.find("table:eq("+(i+1)+")").find("input:eq(3)").val();
			    var thresholdLong=_panel.find("table:eq("+(i+1)+")").find("input:eq(4)").val();
			    var thresholdShort=_panel.find("table:eq("+(i+1)+")").find("input:eq(5)").val();
			    // debugger;
			    if(isDigit(lineWidth)){
			    	_panel.find("table:eq("+(i+1)+")").find("input:eq(0)").focus();			    	
					return false;
			    } else if(lineWidth.length > 5) {
			    	_panel.find("table:eq("+(i+1)+")").find("input:eq(0)").focus();
			    	$.ligerDialog.warn("路段宽度不能超过5位数");
					return false;
			    }
			    if(isDigit(lineTimes)){
			    	_panel.find("table:eq("+(i+1)+")").find("input:eq(1)").focus();			    	
					return false;
			    } else if(lineTimes.length > 5) {
			    	_panel.find("table:eq("+(i+1)+")").find("input:eq(1)").focus();
			    	$.ligerDialog.warn("路段时长不能超过5位数");
					return false;
			    }
			    if(isDigit(areaMaxspeed)){
			    	_panel.find("table:eq("+(i+1)+")").find("input:eq(2)").focus();			
					return false;
			    } else if(areaMaxspeed.length > 3) {
			    	_panel.find("table:eq("+(i+1)+")").find("input:eq(2)").focus();
			    	$.ligerDialog.warn("最高速度不能超过3位数");
					return false;
			    }
			    if(isDigit(superspeedTimes)){
			    	_panel.find("table:eq("+(i+1)+")").find("input:eq(3)").focus();
					return false;
			    } else if(superspeedTimes.length > 5) {
			    	_panel.find("table:eq("+(i+1)+")").find("input:eq(3)").focus();
			    	$.ligerDialog.warn("超速持续时间不能超过5位数");
					return false;
			    }
			    if(isDigit(thresholdLong)){
			    	_panel.find("table:eq("+(i+1)+")").find("input:eq(4)").focus();
					return false;
			    } else if(thresholdLong.length > 5) {
			    	_panel.find("table:eq("+(i+1)+")").find("input:eq(4)").focus();
			    	$.ligerDialog.warn("行驶过长阀值不能超过5位数");
					return false;
			    }
			    if(isDigit(thresholdShort)){
			    	_panel.find("table:eq("+(i+1)+")").find("input:eq(5)").focus();
					return false;
			    } else if(thresholdShort.length > 5) {
			    	_panel.find("table:eq("+(i+1)+")").find("input:eq(5)").focus();
			    	$.ligerDialog.warn("行驶过短阀值不能超过5位数");
					return false;
			    }
				param["trAreaList["+i+"].lineWidth"]=lineWidth;
				param["trAreaList["+i+"].lineTimes"]=lineTimes;
				param["trAreaList["+i+"].areaMaxspeed"]=areaMaxspeed*10;//添加围栏时，最大速度*10
				param["trAreaList["+i+"].superspeedTimes"]=superspeedTimes;
				param["trAreaList["+i+"].thresholdLong"]=thresholdLong;
				param["trAreaList["+i+"].thresholdShort"]=thresholdShort;
				}
			}
		//debugger;
			JAjax("tbAreaManager/addTbAreaForArea.action"
					,	param
					,	'json'
					,	function(data,err){
						if(data.responseText=="success"){
							$(thisref.htmlObj.thisPanel).remove();
							area.obj.areaListGrid.reload();
							$.ligerDialog.success("新增线路电子围栏成功");
						}else{
							$.ligerDialog.warn("新增线路电子围栏失败");
						}						
						}
					,	function(data,err){
						if(data.responseText=="success"){
							$(thisref.htmlObj.thisPanel).remove();
							area.obj.areaListGrid.reload();
							$.ligerDialog.success("新增线路电子围栏成功");
						}else{
							$.ligerDialog.warn("新增线路电子围栏失败");
						}
						area.deleteMarkerCache(thisref.areaObj.lineObj.markerId);
						}
				);
		},
		
		showUpdateAreaLinePop:function(aid,areaName,tbAreaStatus){
			var thisref=this;
			var lineObj={
					markerContent:{
						areaargs:""
					}
			};
			thisref.areaObj.areaId=aid;
			thisref.areaObj.areaName=areaName;
			thisref.areaObj.areaStatus=tbAreaStatus;
			data = {"tbArea.areaId":aid};
			JAjax("tbAreaManager/findTrAreaByIdForArea.action"
			,	data
			,	"json"
			,	function(data,err){
				var points="";
	 			for(var i=0; i<data.Rows.length;i++){
	 				points+=data.Rows[i].lon+","+data.Rows[i].lat+";";
	 			}
	 			points=points.substring(0,points.length-1);
	 			//debugger;
	 			thisref.actionType="update";
	 			lineObj.markerContent.areaargs=points;
	 			thisref.areaObj.areaargs=points;
	 			if(area.obj.markerCache[aid]==null){
	 				var bufferMarker=new drawZone("areaId",4,areaMap,points);
	 			//bufferMarker.enableEdit();
	 				area.obj.markerCache[aid]=bufferMarker;
	 			}
	 			//area.obj.markerCache[thisref.areaObj.areaId]
	 			data.areaName=areaName;
	 			thisref.showPopWin(lineObj,data);
				}
			,	function(data,err){
				$.ligerDialog.warn("查询错误");
				}
			);
			
		},
		updateAreaLine:function(){
			var thisref=this;
			var areaargs=this.areaObj.areaargs.split(";");
			thisref.lineLen=areaargs.length;
			var param = {};
			var areaName=$(thisref.htmlObj.thisPanel).find("input:eq(0)").val();
			if (areaName.length > 20){
				$(thisref.htmlObj.thisPanel).find("input:eq(0)").focus();
				$.ligerDialog.warn("围栏名称不能超过20个字符");
				return false;
			} else if(existName(areaName)) {
				$(thisref.htmlObj.thisPanel).find("input:eq(0)").focus();
				return false;
			}
			param["tbArea.areaName"]=areaName;
			param["tbArea.areaShape"]=3;
			param["tbArea.opId"]=this.areaObj.opId;
			param["tbArea.areaId"]=this.areaObj.areaId;	
			param["tbArea.entId"]=area.obj.entId;
			param["tbArea.tbAreaStatus"]=this.areaObj.areaStatus;	
			//debugger;
			var _panel=$(thisref.htmlObj.arealineConditionPanel);
			for(var i=0;i<areaargs.length;i++){	
				param["trAreaList["+i+"].areaId"]=this.areaObj.areaId;	
				param["trAreaList["+i+"].lon"]=areaargs[i].split(",")[0];
				param["trAreaList["+i+"].lat"]=areaargs[i].split(",")[1];
				param["trAreaList["+i+"].pointOrder"]=i;
				if(i<(thisref.lineLen-1)){
					var lineWidth=_panel.find("table:eq("+(i+1)+")").find("input:eq(0)").val();
					var lineTimes=$(thisref.htmlObj.arealineConditionPanel).find("table:eq("+(i+1)+")").find("input:eq(1)").val();
				    var areaMaxspeed=_panel.find("table:eq("+(i+1)+")").find("input:eq(2)").val();
				    var superspeedTimes=_panel.find("table:eq("+(i+1)+")").find("input:eq(3)").val();
				    var thresholdLong=_panel.find("table:eq("+(i+1)+")").find("input:eq(4)").val();
				    var thresholdShort=_panel.find("table:eq("+(i+1)+")").find("input:eq(5)").val();
				    if(isDigit(lineWidth)){
				    	_panel.find("table:eq("+(i+1)+")").find("input:eq(0)").focus();			    	
						return false;
				    } else if(lineWidth.length > 5) {
				    	_panel.find("table:eq("+(i+1)+")").find("input:eq(0)").focus();
				    	$.ligerDialog.warn("路段宽度不能超过5位数");
						return false;
				    }
				    if(isDigit(lineTimes)){
				    	_panel.find("table:eq("+(i+1)+")").find("input:eq(1)").focus();			    	
						return false;
				    } else if(lineTimes.length > 5) {
				    	_panel.find("table:eq("+(i+1)+")").find("input:eq(1)").focus();
				    	$.ligerDialog.warn("路段时长不能超过5位数");
						return false;
				    }
				    if(isDigit(areaMaxspeed)){
				    	_panel.find("table:eq("+(i+1)+")").find("input:eq(2)").focus();			
						return false;
				    } else if(areaMaxspeed.length > 3) {
				    	_panel.find("table:eq("+(i+1)+")").find("input:eq(2)").focus();
				    	$.ligerDialog.warn("最高速度不能超过3位数");
						return false;
				    }
				    if(isDigit(superspeedTimes)){
				    	_panel.find("table:eq("+(i+1)+")").find("input:eq(3)").focus();
						return false;
				    } else if(superspeedTimes.length > 5) {
				    	_panel.find("table:eq("+(i+1)+")").find("input:eq(3)").focus();
				    	$.ligerDialog.warn("超速持续时间不能超过5位数");
						return false;
				    }
				    if(isDigit(thresholdLong)){
				    	_panel.find("table:eq("+(i+1)+")").find("input:eq(4)").focus();
						return false;
				    } else if(thresholdLong.length > 5) {
				    	_panel.find("table:eq("+(i+1)+")").find("input:eq(4)").focus();
				    	$.ligerDialog.warn("行驶过长阀值不能超过5位数");
						return false;
				    }
				    if(isDigit(thresholdShort)){
				    	_panel.find("table:eq("+(i+1)+")").find("input:eq(5)").focus();
						return false;
				    } else if(thresholdShort.length > 5) {
				    	_panel.find("table:eq("+(i+1)+")").find("input:eq(5)").focus();
				    	$.ligerDialog.warn("行驶过短阀值不能超过5位数");
						return false;
				    }
				    param["trAreaList["+i+"].lineWidth"]=_panel.find("table:eq("+(i+1)+")").find("input:eq(0)").val();
					param["trAreaList["+i+"].lineTimes"]=_panel.find("table:eq("+(i+1)+")").find("input:eq(1)").val();
					param["trAreaList["+i+"].areaMaxspeed"]=_panel.find("table:eq("+(i+1)+")").find("input:eq(2)").val()*10;//提交修改的围栏时，最大速度*10
					param["trAreaList["+i+"].superspeedTimes"]=_panel.find("table:eq("+(i+1)+")").find("input:eq(3)").val();
					param["trAreaList["+i+"].thresholdLong"]=_panel.find("table:eq("+(i+1)+")").find("input:eq(4)").val();;
					param["trAreaList["+i+"].thresholdShort"]=_panel.find("table:eq("+(i+1)+")").find("input:eq(5)").val();;
				}
			}
			JAjax("tbAreaManager/modifyForArea.action"
					,param
					,	'json'
					,	function(data,err){
						if(data.responseText=="success"){
							$(thisref.htmlObj.thisPanel).remove();
							area.obj.areaListGrid.reload();
							$.ligerDialog.success('更新成功');
						}else{
							$.ligerDialog.warn("更新失败");
						}
						
						
						thisref.remove();
						}
					,	function(data,err){
						if(data.responseText=="success"){
							$(thisref.htmlObj.thisPanel).remove();
							area.obj.areaListGrid.reload();
							$.ligerDialog.success('更新成功');
						}else{
							$.ligerDialog.warn("更新失败");
						}
						thisref.remove();
						}
				);
		},
		showAreaLine:function(aid){
			if(area.obj.markerCache[aid]){
				area.deleteMarkerCache(aid);
				return ;
			}
			data = {"tbArea.areaId":aid};
			JAjax("tbAreaManager/findTrAreaByIdForArea.action"
			,	data
			,	"json"
			,	function(data,err){
				var points="";
				var ar = new Array();   
	 			for(var i=0; i<data.Rows.length;i++){
					var _lon=data.Rows[i].lon,_lat=data.Rows[i].lat;
					if(undefined!=_lon&&""!=_lon&&undefined!=_lat&&""!=_lat){
						ar.push(_lon/100000); 
		 				ar.push(_lat/100000);
		 				points+=_lon+","+_lat+";";
					}
	 			}
	 			if(area.obj.markerCache[aid]==null){
	 			var bufferMarker=new drawZone("areaId",4,areaMap,points);
	 			area.obj.markerCache[aid]=bufferMarker;
	 			}
	 			area.obj.areaMap.getBestMaps(ar);   
				}
			,	function(data,err){
				$.ligerDialog.warn("查询错误");
				}
			);
		
		},
		delAreaLine:function(areaId){
			//debugger;
			$.ligerDialog.confirm('确定要删除么?', function (yes) { 
				if(yes){
					JAjax("tbAreaManager/removeForArea.action"
							,{"tbArea.areaId":areaId}
							,	'json'
							,	function(data,err){
								if(!data || (data.error && data.error.length > 0)){
									$.ligerDialog.success(data.error[0].errorMessage);
									return;
								}
								 
								if(!data || (data.displayMessage && data.displayMessage.length > 0)){
									area.deleteMarkerCache(areaId);
									area.obj.areaListGrid.reload();
									$.ligerDialog.success(data.displayMessage);
								}
							/*	if(data.responseText=="success"){
									
									$.ligerDialog.success('删除成功');
								}else{
									$.ligerDialog.warn('删除失败');
								}*/
								}
							,	function(data,err){
								
									$.ligerDialog.warn('删除失败');
								
								}
						);
				}
			});
			
		},
		remove:function(){
			if(area.obj.markerCache[this.areaObj.areaId]){
				area.deleteMarkerCache(this.areaObj.areaId);
			}
			area.deleteMarkerCache(this.areaObj.lineObj.markerId);
			$(this.htmlObj.thisPanel).remove();
		}

		
};
