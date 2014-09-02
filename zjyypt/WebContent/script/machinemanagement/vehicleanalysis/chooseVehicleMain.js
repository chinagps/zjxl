var chooseVehicleMain = function() {
	this.version = "create by liujie in 2012.05.16";
};
var checkedCustomer = new Array();
var checkedVeInfo = new Array();
chooseVehicleMain.prototype = {
	pressSelVehicleKey : function(obj) {
		if(obj.keyCode == 13) {
			this.openXczsWin();
		}
	},
	openXczsWin : function() {
		$("#mainWorkArea").A_Window({ //弹出层的父类的iD
// 			dragabId: 'mainWorkArea', //可拖动的范围
 			id : 'parMainWinId',
 			dragAble : true,
 	        width: 900, //宽度
 	        height: 540,//高度
 	        //默认现在弹出层在父类容器的中间
 	        //x:35 相对于父类容器的横坐标的位移 用来定位
 	        //y:50 相对于父类容器的纵坐标的位移 用来定位
 	        //data:{}, 传递的参数 {id:'1',name:'name'}
 	        //点击关闭弹出页面窗口
 	       load_fn:function(){
 	    	//注册关闭窗口
 	        	$("#selectVehiclePopClose").click(
 	        			function(){
 	        				var winobj = {id:'parMainWinId'};  //悬浮window的ID
 	        				$("#mainWorkArea").close_AY_Window(winobj);  //根据悬浮的window的id关闭window
 	        				$("#createReports").removeAttr("disabled");
 	        		    	$("#goBackPage").removeAttr("disabled");
 	        			});
 	       },
 	        url: 'model/machinemanagement/vehicleanalysis/chooseVehicleSon.jsp'  //目标页面或action的地址
 		});
		//$("#mainWorkArea").show_A_Window();
	},
	chooseVehicleMainGrid : function() {
		var options = {
			columns : [
				{
					display : '序号',
					name : 'vindex',
					width : 60,
					align : 'center'
				},
				{
					display : '组织',
					name : 'pentName',
					width : 200,
					align : 'center'
				},
				{
					display : '车队',
					name : 'entName',
					width : 200,
					align : 'center'
				},
				{
					display : '车牌号',
					name : 'vehicleNo',
					width : 150,
					align : 'center'
				},
				{
					display : '自编号',
					name : 'vid',
					width : 80,
					align : 'center'
				}],
				showCheckbox : false,
				sortName : 'vid',
				url : 'vehicleanalysis/searchSelectedVehiclesInfo.action',
				showTitle : false,
				pageSize : KCPT.PageSize,
	 			pageSizeOptions : KCPT.PageSizeOptions,
				height : 328,
				pageSize : 30,
				autoLoad : false,
				tableId : 'chooseVehicleInfoTableDiv',
				searchFormId : 'selectedVehicleInfoFrom'
 			};
		this.grid = new ctfoGrid(options);
	}
};
//模拟点击查询按钮的操作
$("#showSelectedVehicle").click(function() {
	$("#selectedVehicleInfoFrom").submit();
});
//点击分析报告按钮时的操作
$("#createReports").click(function() {
	var vids = $("#updatePageSelectedVehicleVids").val();
	var startTime = $("#startDateMin").val();
	var endTime = $("#endDateMin").val();
	if(vids == "") {
		$.ligerDialog.alert("请选择车辆！", "信息提示",'warn');
		return false;
	}
	if(startTime == "") {
		$.ligerDialog.alert("开始时间不能为空！", "信息提示",'warn');
		return false;
	}
	if(endTime == "") {
		$.ligerDialog.alert("结束时间不能为空！", "信息提示",'warn');
		return false;
	}
	if (startTime > endTime ) {
		$.ligerDialog.alert("开始时间不能大于结束时间！","信息提示",'warn');
		return false;
	}
	var DayNumber=daysBetween(startTime,endTime);
	var isToday=daysBetween(new Date().Format("yyyy-MM-dd"),endTime);
	if((DayNumber > 90 && isToday!=0) || (isToday ==0 && DayNumber>90)){
		$.ligerDialog.alert("可选时间范围不能超过90天", "信息提示",'warn');
		return false;
   };
	var data = {"vehicleReport.vehicleNo" : vids,"vehicleReport.repBeginTime" : startTime,"vehicleReport.repEndTime" : endTime};
	$("#mainWorkArea").close_ALL_Window();
	refreshVR = setInterval(function() {
		vehiclerport.timeRefreshGrid();
	}, 30000);
	$("#createRepSel").attr("disabled","true");
	startVrIr == 1;
	$.ajax({
        type : "post",
        url : "vehicleanalysis/createReport.action",
        data : data,
        dataType : "json",
        success : function (data){
        	vehiclerport.timeRefreshGrid();
        	clearInterval(refreshVR);
        	disposeData();
        	startVrIr == 0;
        	$("#createRepSel").removeAttr("disabled");
        	$("#searchForButton").trigger('click');
        }
    });
	//延时两秒刷新grid列表
	setTimeout($("#searchForButton").trigger('click'),2000);
});

function disposeData() {  //清理无效数据
	var bl = false;
	$.ajax({
        type : "post",
        url : "vehicleanalysis/disposeReport.action",
        dataType : "json",
        success : function (data){
        }
    });
};
//点击返回按钮的操作
$("#goBackPage").click(function() {
	$("#mainWorkArea").close_ALL_Window();
});

var chooseVehicleMain = new chooseVehicleMain();
$(document).ready(function() {
	chooseVehicleMain.chooseVehicleMainGrid();
	$("#mainWorkArea").show_A_Window({});
	
});