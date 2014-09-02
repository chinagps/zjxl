var devicestatusList = function () {
	this.leftTree;
	this.grid;
	this.height = KCPT.root.getCenterSize().height;
	this.titleHeight = $("#dvcstaForm").height();
	this.init();
	this.isViewDeatil = false;
	this.refreshTimerInterval = 10000;
	this.isRefrshTimering = false;
	this.refreshTimerId;
	this.canRefresh = false;
};

Date.prototype.pattern=function(fmt) {     
    var o = {     
    "M+" : this.getMonth()+1, //月份     
    "d+" : this.getDate(), //日     
    "h+" : this.getHours()%12 == 0 ? 12 : this.getHours()%12, //小时     
    "H+" : this.getHours(), //小时     
    "m+" : this.getMinutes(), //分     
    "s+" : this.getSeconds(), //秒     
    "q+" : Math.floor((this.getMonth()+3)/3), //季度     
    "S" : this.getMilliseconds() //毫秒     
    };     
    var week = {     
    "0" : "\u65e5",     
    "1" : "\u4e00",     
    "2" : "\u4e8c",     
    "3" : "\u4e09",     
    "4" : "\u56db",     
    "5" : "\u4e94",     
    "6" : "\u516d"    
    };     
    if(/(y+)/.test(fmt)){     
        fmt=fmt.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length));     
    }     
    if(/(E+)/.test(fmt)){     
        fmt=fmt.replace(RegExp.$1, ((RegExp.$1.length>1) ? (RegExp.$1.length>2 ? "\u661f\u671f" : "\u5468") : "")+week[this.getDay()+""]);     
    }     
    for(var k in o){     
        if(new RegExp("("+ k +")").test(fmt)){     
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));     
        }     
    }     
    return fmt;     
};

devicestatusList.prototype = {
	showImage : function (val,flagOnline) {
	    if (flagOnline && flagOnline == 1){
		    if(val == 0){
	    	    return '<img src=\'images/global/ls.png\'/>';
	        }else if(val == 1){
	    	    return '<img src=\'images/global/ss.png\'/>';
	        }else{
	        	return '<img src=\'images/global/hs.png\'/>';
	        }
	    }else {
	        return '<img src=\'images/global/hs.png\'/>'; 
	    }
	},
	showFlagOnlineImage : function(val){
	    if (val && val == 1){
	        return '<img src=\'images/global/ls.png\'/>';
	    }else {
	        return '<img src=\'images/global/hs.png\'/>';
	    }
	},
	//左边树需要增加的方法
	show : function() {
		var obj = this;
		obj.leftTree = KCPT.root.leftTree;
		obj.leftTree.setCheckDataName("vid");
//		obj.leftTree.showTabs();
//		obj.leftTree.showGrid();
//		obj.leftTree.show();
//		KCPT.root.triggerShowObj = obj;
	},
	//页面大小调整需要增加的方法
	onResize : function() {
		var obj = this;
		if(obj.gridManager){
			obj.gridManager.setHeight(obj.getGridHeight());
		}
	},
	getGridHeight : function(){
		var center = getHeightAndWidth();
		return center.height - this.titleHeight - 98;
	},
	init : function () {
		var that = this;
		that.show();
		var options = {
				//列
				columns:[
                            {display: '所属企业', name : 'corpName', width : 140},
							{display: '车队名称', name : 'teamName', width : 140},
							{display: '车牌号 ', name : 'vehicleNo', width : 80},
							{display: '车辆VIN', name : 'vinCode', width : 120},
                            {display: '最后采集时间', name : 'gatherTimeStr', width : 140, render : function (row){
//                                return row.flagOnline && row.flagOnline == 1 ? row.gatherTimeStr : "--";
                            	return row.gatherTimeStr;
                            }},
                            {display: '在线状态', name : 'flagOnline', width : 60, render: function (row) {
                                return that.showFlagOnlineImage(row.flagOnline);
                            }},
							{display: '终端状态', name : 'terminalStatus', width : 60, render: function (row) {
								return that.showImage(row.terminalStatus,row.flagOnline);
							}},
							{display: '定位状态 ', name : 'gpsStatus', width : 60, render: function (row) {
								return that.showImage(row.gpsStatus,row.flagOnline);
							}},
							{display: '冷却液温度 ', name : 'EWaterTempStatus', width : 80, render: function (row) {
								return that.showImage(row.EWaterTempStatus,row.flagOnline);
								//return "1111" + row.EWaterTempStatus;
							}},
							{display: '蓄电池电压', name : 'extVoltageStatus', width : 80, render: function (row) {
								return that.showImage(row.extVoltageStatus,row.flagOnline);
							}},
							{display: '严重警告', name : 'seriousStatus', width : 60, render: function (row) {
								return that.showImage(row.seriousStatus,row.flagOnline);
							}},
							{display: '阻塞警告', name : 'blockStatus', width : 60, render: function (row) {
								return that.showImage(row.blockStatus,row.flagOnline);
							}},
							{display: '高温警告 ', name : 'hightempStatus', width : 60, render: function (row) {
								return that.showImage(row.hightempStatus,row.flagOnline);
							}},
							{display: '其它警告', name : 'otherStatus', width : 60, render: function (row) {
								return that.showImage(row.otherStatus,row.flagOnline);
							}},
							{display: '操作', name : 'vid', width : 60, render: function (row) {
								return " <a style=\"cursor: pointer;\" onclick=\"devicestatusListObj.showChartPop('" + row.vid + "');\">详情</a>";
							}}
	    		],
	    		showCheckbox:false,
	    		sortName:'vehicleNo',
	    		url:'devicestatus/findInfo.action',
	    		showTitle:false,
	    		pageSize:30,
	    		/*pageSizeOptions:[10,20,30,40],*/
	    		height: that.getGridHeight(),
	    		width:"99.8%",
	    		autoLoad:false,
	    		//填充数据的tableid
	            tableId: 'dvcstatable',
	            //查询条件formid
	            searchFormId :'dvcstaForm',
	            gridBeforeSubmit: function () {
	            	var treeStr = that.leftTree.getGridSelectRowID().toString();

					$("#vidInStrDvcsta").val(treeStr);

					if (treeStr == "") {
						$.ligerDialog.alert("请选择车辆！", "提示",'warn');
						return false;
					}
					
					//开始新查询前关闭定时刷新并使定时刷新按钮不可操作
					var pageObj = that;
					var checkBox = $("#isRefreshTimerCheckbox");
					if (pageObj.isRefrshTimering){
					    checkBox.attr("checked",false);
					    pageObj.changeRefreshTimer(checkBox);
					}
					if (pageObj.canRefresh){
					    checkBox.attr("disabled",true);
					    pageObj.canRefresh = false;
					}
	            	
	            	return true;
	            },
	            onAfterShowData : function(){//显示数据完成后使定时刷新按钮可操作
	                var pageObj = that;
	                var checkBox = $("#isRefreshTimerCheckbox");
	                if(!pageObj.canRefresh){
	                    checkBox.attr("disabled",false);
	                    pageObj.canRefresh = true;
	                }
	                /* detele by liuxiaolei at 2012-7-2 改为默认不启动定时刷新
	                 * if (!pageObj.isRefrshTimering){
	                    checkBox.attr("checked",true);
	                    pageObj.changeRefreshTimer(checkBox);
	                }*/
	            }
			   
		};
		
		this.grid = new ctfoGrid(options);
		that.gridManager = $("#dvcstatable").ligerGetGridManager();
	},
	
	showChartPop : function (vid) {
	    var thisObj = this;
		$("#mainWorkArea").A_Window({ //弹出层的父类的iD
			dragabId: 'mainWorkArea', //可拖动的范围
	        width: 600, //宽度
	        height: 426,//高度
	        load_fn:function(){
	        	$("#dvcstaClose").click(function(){
	        	    thisObj.isViewDeatil = false;
	        	    $("#mainWorkArea").close_ALL_Window();
	        	});
	        },
	        url: "devicestatus/viewDevicestatus.action?vid=" + vid //目标页面或action的地址
		});
		this.isViewDeatil = true;
	},
	changeRefreshTimer : function (checkBoxObj) {
	    var thisObj = this;
	    var isChecked = checkBoxObj.attr("checked");
	    /*if(isChecked){
	        thisObj.refreshTimerId = window.setInterval(thisObj.fun_refreshData(thisObj), thisObj.refreshTimerInterval);
	        thisObj.isRefrshTimering = true;
	    } else{
	        window.clearInterval(thisObj.refreshTimerId);
	        thisObj.isRefrshTimering = false;
	    }*/ //  2013-01-05   注释 暂时不要定时刷新
	},
	fun_refreshData : function(pageObj) {
	    var thisObj = this;
	    return function (){thisObj.refreshData(pageObj); };
	},
	refreshData : function (pageObj){
	    if (!pageObj) {
	        return;
	    }
	    //分别判断页面是否可见,页面是否已重建,决定定时任务是否继续有效
	    var isValid = true;
	    var gridDivId = "dvcstatable";
	    var isGridDivVisible = $("#" + gridDivId).is(":visible" );
	    if (!isGridDivVisible){
	        isValid = false;
	    }
	    var curPageObj = safeManager.showObj;
	    if (curPageObj != pageObj){
	        isValid = false;
	    }
	    	    
	    //若无效，则关闭定时任务，否则继续执行
	    if (!isValid){
	        window.clearInterval(pageObj.refreshTimerId);
	        return;
	    }
	    //若当前页面正在显示详细信息窗口，则不作动作，否则刷新grid
	    if (!pageObj.isViewDeatil){
	        pageObj.grid.gridManager.loadData(true);
	    }
	}
};

var devicestatusListObj = new devicestatusList();
$(document).ready(function() {
	//devicestatusListObj.init();
	//safeManager.addChildList(devicestatusListObj);
	//safeManager.showObj = devicestatusListObj;
	$("#isRefreshTimerCheckbox").bind(
	    "click",
	    {"checkBoxObj":$("#isRefreshTimerCheckbox")},
	    function(event){devicestatusListObj.changeRefreshTimer(event.data.checkBoxObj);}
	);
	KCPT.onresizeObj = devicestatusListObj;
});
