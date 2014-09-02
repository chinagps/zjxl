var areaPolygon=function(){
	this.htmlObj={
		parentDiv:"#areaMainPanel",
		thisPanel:"#areaPolygonPopDiv",
		closeBtn:"#areaPolygonCloseBtn"
	};
	this.obj={
			actionType:"add",
			opId:"1",
			areaId:0,
			areaName:"",
			//状态1新增2修改3删除
			areaStatus:"",
			areaargs:"",
			areaObj:{}
	};
	this.init();
	this.lineLen=0;
	
};
areaPolygon.prototype={
		init:function(){
		},
		showPopWin:function(areaObj,editData,areaShape){
			var thisref=this;
			thisref.obj.actionType="add";
			var mainDiv = thisref.htmlObj.parentDiv;
			if(areaObj){
				  thisref.obj.areaObj=areaObj;
			}
			var popwin = $("<div>");
			popwin.attr('id', thisref.htmlObj.thisPanel.substring(1,thisref.htmlObj.thisPanel.length));
				popwin.css({
					"position" : "absolute",
					"left" : 830,
					"right" : 0,
					"top" : 230,
					"z-index":1600
				});
				$(thisref.htmlObj.thisPanel).remove();
				$(popwin).appendTo($(mainDiv));
				$(popwin).draggable({
					cursor : 'move',
					containment : thisref.htmlObj.parentDiv
				});
				var url = "model/area/polygon.html";			
				$(popwin).load(url, {}, function()
				{
					// 矩形
					if(areaShape=="2"){		
						$(thisref.htmlObj.thisPanel).find(".imgtype").attr("src","images/area/area-icon08.png");						
						$(thisref.htmlObj.thisPanel).find(".fenceManagement_polygons_top_text").text("矩形电子围栏");
					} else if(areaShape=="3"){
						// 多边形
						$(thisref.htmlObj.thisPanel).find(".fenceManagement_polygons_top_text").text("多边形电子围栏");
					}								
					//thisref.lineLen=thisref.lineObj.markerContent.areaargs.split(";").length-1;

					if(editData){
						thisref.obj.actionType="update";
						$(thisref.htmlObj.thisPanel).find("input:eq(0)").val(thisref.obj.areaName);
						$(thisref.htmlObj.thisPanel).find("input:eq(1)").val(editData.Rows[0].areaMaxspeed/10);//显示围栏时，最大速度/10
						$(thisref.htmlObj.thisPanel).find("input:eq(2)").val(editData.Rows[0].superspeedTimes);	
						$(thisref.htmlObj.thisPanel).find("input:eq(3)").val(editData.Rows[0].areaMinspeed/10);//显示围栏时，最大速度/10
						if(editData.Rows[0].superlowspeedTimes==null){
							editData.Rows[0].superlowspeedTimes=0;
						}
						$(thisref.htmlObj.thisPanel).find("input:eq(4)").val(editData.Rows[0].superlowspeedTimes);	
					}
					thisref.bindEvent();
				});
		},
		showUpdateAreaPolygonPop:function(aid,areaName,areaShape,isShowEditPop){
			if(area.obj.markerCache[aid]&&!isShowEditPop){
				area.deleteMarkerCache(aid);
				return ;
			}
			var thisref=this;
			//thisref.obj.areaObj.markerContent.areashape=areaShape;
			//debugger;
			var lineObj={
				markerContent:{
					areaargs:""
				}
			};
			thisref.obj.areaId=aid;
			thisref.obj.areaName=areaName;
			thisref.obj.actionType="update";
			data = {"tbArea.areaId":aid};
			JAjax("tbAreaManager/findTrAreaByIdForArea.action"
				,	data
				,	"json"
				,function(data,err){
					var points="";
					var ar =[];
		 			for(var i=0; i<data.Rows.length;i++){
		 				ar.push(data.Rows[i].maplon/600000);
		 				ar.push(data.Rows[i].maplat/600000);
		 				points+=data.Rows[i].maplon+","+data.Rows[i].maplat+";";
		 			}
		 			points=points.substring(0,points.length-1);
		 			thisref.obj.actionType="update";
		 			lineObj.markerContent.areaargs=points;
		 			thisref.lineLen=points.length;
		 			thisref.obj.areaargs=points;
		 			if(area.obj.markerCache[aid]==null){
		 				var shapeMark = "";
		 				if(areaShape=="2"){
		 					shapeMark = 3;
		 				} else if(areaShape=="5") {
		 					shapeMark = 2;
		 				} 					
		 				var bufferMarker=new drawZone("areaId",shapeMark,areaMap.map,points);
		 				area.obj.areaMap.getBestMaps(ar);
		 				area.obj.markerCache[aid]=bufferMarker;
		 			}
		 			data.areaName=areaName;
		 			if(isShowEditPop){
		 				thisref.showPopWin(null,data,shapeMark);
		 			}
				}
				,function(data,err){
						$.ligerDialog.warn("查询错误");
				}
			);
		},
		bindEvent:function(){
			var thisref=this;
			$(thisref.htmlObj.closeBtn).bind('click',function(){
				// 关闭添加围栏的弹出页
				$(thisref.htmlObj.thisPanel).remove();
				// 关闭在地图上显示的线路
				if(thisref.obj.actionType=="update" && area.obj.markerCache[thisref.obj.areaId]){
					area.deleteMarkerCache(thisref.obj.areaId);
				}else{
					area.deleteMarkerCache(thisref.obj.areaObj.markerId);
				}
			});
			$(thisref.htmlObj.thisPanel).find(".btn_green").bind('click',function(){
				if(thisref.obj.actionType=="add"){
					thisref.addPolygon();
				}else if(thisref.obj.actionType=="update"){
					thisref.updatePolygon();
				}
			});
		},
		addPolygon:function(){
			var thisref=this;
			var param = {};
			var areaargs = thisref.obj.areaObj.markerContent.areaargs.split(";");
			var areaShape = thisref.obj.areaObj.markerContent.areashape;
			thisref.lineLen=areaargs.length;
			var areaName=$(thisref.htmlObj.thisPanel).find("input:eq(0)").val();
			if (areaName.length > 20){
				$.ligerDialog.warn("围栏名称不能超过20个字符");
				$(thisref.htmlObj.thisPanel).find("input:eq(0)").focus();
				return false;
			} else if(existName(areaName)) {
				$(thisref.htmlObj.thisPanel).find("input:eq(0)").focus();
				return false;
			}
			param["tbArea.areaName"]=areaName;
			// areaMain.js 传过来的markerContent.areashape的值，1:圆,2:矩形,3:多边形,4:线
			if(areaShape == "3"){
				param["tbArea.areaShape"] = 2;      // 库里存的类型
			} else {
				param["tbArea.areaShape"] = 5;
			}		
			param["tbArea.opId"]=KCPT.user.opId;
			param["tbArea.entId"]=area.obj.entId;
			param["tbArea.tbAreaStatus"]=1;	
			
			var areaMaxspeed = $(thisref.htmlObj.thisPanel).find("input:eq(1)").val();
			var superspeedTimes = $(thisref.htmlObj.thisPanel).find("input:eq(2)").val();
			var areaMinspeed = $(thisref.htmlObj.thisPanel).find("input:eq(3)").val();
			var superlowspeedTimes = $(thisref.htmlObj.thisPanel).find("input:eq(4)").val();
			//高速输入框判断
			if(isDigit(areaMaxspeed)){
				$(thisref.htmlObj.thisPanel).find("input:eq(1)").focus();
				return false;
			} else if(areaMaxspeed.length > 3) {
				$.ligerDialog.warn("最高速度不能超过3位数");
				$(thisref.htmlObj.thisPanel).find("input:eq(1)").focus();
				return false;
		    }
			if(isDigit(superspeedTimes)){
			    $(thisref.htmlObj.thisPanel).find("input:eq(2)").focus();
				return false;
			} else if(superspeedTimes.length > 3) {
				$.ligerDialog.warn("超速持续时间不能超过3位数");
				$(thisref.htmlObj.thisPanel).find("input:eq(2)").focus();
				return false;
		    }
			//低速输入框判断 
			if(isDigit(areaMinspeed)){
				$(thisref.htmlObj.thisPanel).find("input:eq(3)").focus();
				return false;
			} else if(areaMinspeed.length > 3) {
				$.ligerDialog.warn("最低速度不能超过3位数");
				$(thisref.htmlObj.thisPanel).find("input:eq(3)").focus();
				return false;
		    }
			if(isDigit(superlowspeedTimes)){
			    $(thisref.htmlObj.thisPanel).find("input:eq(4)").focus();
				return false;
			} else if(superlowspeedTimes.length > 3) {
				$.ligerDialog.warn("低速持续时间不能超过3位数");
				$(thisref.htmlObj.thisPanel).find("input:eq(4)").focus();
				return false;
		    }
			
			if(parseInt(areaMaxspeed)<=parseInt(areaMinspeed)){
				$.ligerDialog.warn("最低速度应小于最高速度");
				return false;
			}
			for(var i=0;i<thisref.lineLen;i++){
                param["trAreaList["+i+"].maplon"]=parseInt(areaargs[i].split(",")[0]*600000);//后台存储为long型
				param["trAreaList["+i+"].maplat"]=parseInt(areaargs[i].split(",")[1]*600000);
				param["trAreaList["+i+"].pointOrder"]=i;
				param["trAreaList["+i+"].areaMaxspeed"]=areaMaxspeed*10;//提交围栏时，最大速度*10
				param["trAreaList["+i+"].superspeedTimes"]=superspeedTimes;
				param["trAreaList["+i+"].areaMinspeed"]=areaMinspeed*10;//提交围栏时，最大速度*10
				param["trAreaList["+i+"].superlowspeedTimes"]=superlowspeedTimes;
			}
			//debugger;
			JAjax("tbAreaManager/addTbAreaForArea.action"
					,param
					,	'json'
					,	function(data,err){
						if(data.responseText=="success"){
							$(thisref.htmlObj.thisPanel).remove();
							area.obj.areaListGrid.reload();
							$.ligerDialog.success('添加成功');
						}else{
							$.ligerDialog.warn("更新失败");
						}
						thisref.remove();
						}
					,	function(data,err){
						if(data.responseText=="success"){
							$(thisref.htmlObj.thisPanel).remove();
							area.obj.areaListGrid.reload();
							$.ligerDialog.success('添加成功');
						}else{
							$.ligerDialog.warn("更新失败");
						}
						thisref.remove();
						}
			);
		},
		updatePolygon:function(){
			var thisref=this;
			var param = {};
			var areaName=$(thisref.htmlObj.thisPanel).find("input:eq(0)").val();
			if (areaName.length > 20){
				$.ligerDialog.warn("围栏名称不能超过20个字符");
				$(thisref.htmlObj.thisPanel).find("input:eq(0)").focus();
				return false;
			} else if(existName(areaName)) {
				$(thisref.htmlObj.thisPanel).find("input:eq(0)").focus();
				return false;
			}
			param["tbArea.areaName"]=areaName;
			param["tbArea.opId"]=KCPT.user.opId;
			//param["tbArea.areaShape"]=2;
			//param["tbArea.tbAreaStatus"]=2;	
			//param["tbArea.entId"]=area.obj.entId;//修改时，所属企业id不做修改，故注掉
			param["tbArea.areaId"]=thisref.obj.areaId;
			
			var areaMaxspeed = $(thisref.htmlObj.thisPanel).find("input:eq(1)").val();
			var superspeedTimes = $(thisref.htmlObj.thisPanel).find("input:eq(2)").val();
			var areaMinspeed = $(thisref.htmlObj.thisPanel).find("input:eq(3)").val();
			var superlowspeedTimes = $(thisref.htmlObj.thisPanel).find("input:eq(4)").val();
			//高速输入框判断
			if(isDigit(areaMaxspeed)){
				$(thisref.htmlObj.thisPanel).find("input:eq(1)").focus();
				return false;
			} else if(areaMaxspeed.length > 3) {
				$.ligerDialog.warn("最高速度不能超过3位数");
				$(thisref.htmlObj.thisPanel).find("input:eq(1)").focus();
				return false;
		    }
			if(isDigit(superspeedTimes)){
			    $(thisref.htmlObj.thisPanel).find("input:eq(2)").focus();
				return false;
			} else if(superspeedTimes.length > 3) {
				$.ligerDialog.warn("超速持续时间不能超过3位数");
				$(thisref.htmlObj.thisPanel).find("input:eq(2)").focus();
				return false;
		    }
			//低速输入框判断 
			if(isDigit(areaMinspeed)){
				$(thisref.htmlObj.thisPanel).find("input:eq(3)").focus();
				return false;
			} else if(areaMinspeed.length > 3) {
				$.ligerDialog.warn("最低速度不能超过3位数");
				$(thisref.htmlObj.thisPanel).find("input:eq(3)").focus();
				return false;
		    }
			if(isDigit(superlowspeedTimes)){
			    $(thisref.htmlObj.thisPanel).find("input:eq(4)").focus();
				return false;
			} else if(superlowspeedTimes.length > 3) {
				$.ligerDialog.warn("低速持续时间不能超过3位数");
				$(thisref.htmlObj.thisPanel).find("input:eq(4)").focus();
				return false;
		    }
			if(parseInt(areaMaxspeed)<=parseInt(areaMinspeed)){
				$.ligerDialog.warn("最低速度应小于最高速度");
				return false;
			}
			
			var areaargs=thisref.obj.areaargs;
			for(var i=0;i<areaargs.split(";").length;i++){
				param["trAreaList["+i+"].areaId"]=thisref.obj.areaId;
				param["trAreaList["+i+"].maplon"]=areaargs.split(";")[i].split(",")[0];
				param["trAreaList["+i+"].maplat"]=areaargs.split(";")[i].split(",")[1];
				param["trAreaList["+i+"].pointOrder"]=i;
				param["trAreaList["+i+"].areaMaxspeed"]=areaMaxspeed*10;//修改提交时，最大速度*10
				param["trAreaList["+i+"].superspeedTimes"]=superspeedTimes;
				param["trAreaList["+i+"].areaMinspeed"]=areaMinspeed*10;//提交围栏时，最大速度*10
				param["trAreaList["+i+"].superlowspeedTimes"]=superlowspeedTimes;
			}

			JAjax("tbAreaManager/modifyForArea.action"
					,param
					,	'json'
					,	function(data,err){
						area.obj.areaListGrid.reload();
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
		delPolygon:function(aId){
			JAjax("findByParams/addTbArea.action"
					,{"areaId":aid}
					,	'json'
					,	function(data,err){
						if(data.responseText=="success"){
							$(thisref.htmlObj.thisPanel).remove();
							area.obj.areaListGrid.reload();
							area.deleteMarkerCache(aId);
							$.ligerDialog.success("删除成功");
						}else{
							$.ligerDialog.warn("删除失败");
						}
						}
					,	function(data,err){
						if(data.responseText=="success"){
							$(thisref.htmlObj.thisPanel).remove();
							area.obj.areaListGrid.reload();
							area.deleteMarkerCache(aId);
							$.ligerDialog.success("删除成功");
						}else{
							$.ligerDialog.warn("删除失败");
						}
						}
				);
		},
		remove:function(){
			if(area.obj.markerCache[this.obj.areaId]){
				area.deleteMarkerCache(this.obj.areaId);
			}
			// 关闭在地图上显示的线路
			area.deleteMarkerCache(this.obj.areaObj.markerId);
			$(this.htmlObj.thisPanel).remove();
		}
		
};