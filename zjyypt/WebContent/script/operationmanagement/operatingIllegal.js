var operatingIllegalList = function () {
	this.name="运营违规统计";
	this.grid = null;
	this.leftTree;
	this.height = KCPT.root.getCenterSize().height;
	this.titleHeight = $("#operatingIllegalform").height();
	this.init();
};

operatingIllegalList.prototype = {
	//左边树需要增加的方法
	show : function() {
		var obj = this;
		obj.leftTree = KCPT.root.leftTree;
		obj.leftTree.showGrid();
		obj.leftTree.showTabs();
		obj.leftTree.setCheckDataName("vid");
		obj.leftTree.showTabs();
		obj.leftTree.showGrid();
		obj.leftTree.show();

	},
	//页面大小调整需要增加的方法
	onResize : function() {
		var obj = this;
		if (obj.grid) {
			obj.grid.onReSize();
		}
	},

	init : function () {
		var that = this;
		that.show();
		var options = {
				columns:[
				{display: '车牌号', name : 'vehicleNo', width : 80},
				{display: '驾驶员', name : 'driverName', width : 80},
				{display: '违规类型', name : 'alarmClass', width : 80},
				{display: '违规事件说明', name : 'alarmCodeName', width : 80},
				{display: '开始时间', name : 'beginTime', width : 140},
				{display: '结束时间', name : 'endTimeStr', width : 140 ,render : function(row){
				    return row.endTime;
				}},
				{
					display: '违规开始速度',
					name : 'beginGpsSpeedStr',
					width : 80,
					render: function(row){
						var bSpeed = row.beginGpsSpeed /10;
						return bSpeed;
					}
				},
				{
					display: '违规最高车速',
					name : 'keypointGpsSpeedStr',
					width : 80,
					render : function(row){
						if(row.keypointGpsSpeed>2000){
						  return "--";
						}else{
						  return row.keypointGpsSpeed /10;
						}
					}
				},
				{display: '违规照片', render: function (row) {

					//0：图像 1：音频 2：视频
				   	return "<a style=\"cursor: pointer;\" onclick=\"operatingIllegalObj.operatingIllegalopenW('"+row.mtypeCode+"','"+row.beginTime+"','"+row.vehicleNo+"','"+row.mediaUri+"')\" ><img src='images/openwindow/photo.png' border='0'/></a>";
			      }, width : 80 },

				{display: '位置/轨迹', render: function (row) {
				   	return "<a style=\"cursor: pointer;\" onclick=\"operatingIllegalObj.addLineMap('"+row.beginLatDouble+"','"+row.beginLonDouble+"','"+
				   	row.endLatDouble+"','"+row.endLonDouble+"','"+row.beginMaplonDouble+"','"+row.beginMaplatDouble+"','"+
				   	row.endMaplonDouble+"','"+row.endMaplatDouble+"')\" ><img src='images/openwindow/mapbig.png' border='0'/></a>";
			      }, width : 80 }
	    		],
	    		showCheckbox:false,
	    		sortName:'vehicleNo',
	    		url:'operationmanagement/searchOperatingIllegal.action',
	    		exportAction : "operationmanagement/exportIllegalGrid.action",
	    		showTitle:false,
	    		pageSize:10,
	    		pageSizeOptions:[10,20,30,40],
	    		height: (that.height - that.titleHeight - 15 - 55),
	    		autoLoad:false,
	    		//填充数据的tableid
	            tableId: 'operatingIllegalgrid',
	            //查询条件formid
	            searchFormId :'operatingIllegalform',
	            gridBeforeSubmit: function () {
	            	var treeStr = that.leftTree.getGridSelectRowID().toString();

					if (treeStr == "") {
						$.ligerDialog.alert("请选择车辆！", "提示");
						return false;
					}

					$("#operatingIllegalvidInStr").val(treeStr);

					if($("input:radio[id='timelineoperatingIllegal']:checked").val()==1) {
						that.curStartDate = $("#startDateoperatingIllegal").val();
						that.curEndDate = $("#endDateoperatingIllegal").val();
						if(that.curStartDate==""){
							$.ligerDialog.alert("开始时间不能为空", "信息提示");
							return false;
						}
						if(that.curEndDate==""){
							$.ligerDialog.alert("结束时间不能为空", "信息提示");
							return false;
						}
						var startdate=Number((that.curStartDate.replace('-','')).replace('-',''));
						var enddate  =Number((that.curEndDate.replace('-','')).replace('-',''));
						if(startdate > enddate){
							$.ligerDialog.alert("结束时间不能少于开始时间", "信息提示");
							return false;
						}
	        		}

	            	return true;
	            }

		};
		this.grid = new ctfoGrid(options);

	},
	operatingIllegalopenW : function(type,time,vehicleNo,uri) {
		//v   0: 照片 1：视频 2：位置轨迹
		var url  = "operationmanagement/searchOperatingIllegalInfo.action?";

		if(type!='')
			url += 'type='+type;
		else
			url += 'type=null';
		if(time!='')
			url += '&time='+encodeURI(encodeURI(time));
		if(vehicleNo!='')
			url += '&vehicleNo='+encodeURI(encodeURI(vehicleNo));
		if(uri!='')
			url += '&uri='+uri;
		else
			url += '&uri=null';

		$("#mainWorkArea").A_Window({
			dragabId: 'mainWorkArea', //可拖动的范围
			width: 600, //宽度
            height: 500,//高度
			load_fn:function(){
                 	 //加载完成之后回调的函数 可以用来注册关闭方法
                      $("#operatingClose").click(function(){$("#mainWorkArea").close_ALL_Window();});
                 },
                 url: url //目标页面或action的地址
		});
	},
	operatingIllegalchangeRedio : function(value) {
		$("input[id='timelineoperatingIllegal']:eq("+value+")").attr("checked", 'checked');
	},
	addLineMap: function(beginLat,beginLon,endLat,endLon,beginMaplon,beginMaplat,endMaplon,endMaplat)
	{
		$("#mainWorkArea").Map_Window({
			dragabId: 'mainWorkArea', //可拖动的范围
	        width: 600, //宽度
	        height: 500,//高度
	        load_fn:function(){
	        	var d = [];
	        	if(beginMaplon==endMaplon&&beginMaplat==endMaplat) {
		        	d.push(beginMaplon);
		        	d.push(endMaplon);
	        	} else {
	        		d.push(beginMaplon);
		        	d.push(beginMaplat);
		        	d.push(endMaplon);
		        	d.push(endMaplat);
	        	}
	        	KCPT.userMap.addMarkers(d);
	        	//画线
	        	//KCPT.userMap.addTrack(d);
	        }

		});
	},
	bindExportBtnClick : function(){
	    $("#gridExport").bind("click",function(){window.pageObj.exportGridToExcel();});
	},
	exportGridToExcel : function(){
		var obj = this;
		var treeStr = obj.leftTree.getGridSelectRowID("vid").toString();
        $("#vidInStr").val(treeStr);
		window.pageObj.grid.exportExcel(1, 2);
	}

};

var operatingIllegalObj = null;

$(document).ready(function() {
	operatingIllegalObj = new operatingIllegalList();
	window.pageObj = operatingIllegalObj;
	window.pageObj.bindExportBtnClick();
	runManager.addChildList(operatingIllegalObj);
	runManager.showObj = operatingIllegalObj;
});
