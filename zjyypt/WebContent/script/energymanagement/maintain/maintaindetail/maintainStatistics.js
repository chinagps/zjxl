var maintainStatisticsList = function() {
	this.version = "create by lishuai in 2011.12.22";
	this.leftTree;	
//	this.height = KCPT.root.getCenterSize().height;
	this.titleHeight = $("#maintainStatisticsForm").height();
	this.clickChartImg = 'left';
	this.xmlData = "";
	this.leftShrinkhidden = "0";
};
var rightCenterUpShrinkhidden=0;
var maintainStatisticsConigs= {
		  htmlElements : {
			  rightChartContainer : "maintainStatisticsChartArea",
			  rightCenterShrink:  "maintainStatisticsShrink",
			  rightCenterChartAndGridAreaMaintain : "rightCenterChartAndGridAreaMaintain",
			  rightContent : "rightContent"
		  }
};
//点击上下收缩
$("#"+maintainStatisticsConigs.htmlElements.rightCenterShrink).click(function(){
		 if(rightCenterUpShrinkhidden==0 ){
			 $("#"+maintainStatisticsConigs.htmlElements.rightChartContainer).hide();
			 $("#"+maintainStatisticsConigs.htmlElements.rightCenterShrink).removeClass('hidden_pop_up_horizontal_pop_up');
			 $("#"+maintainStatisticsConigs.htmlElements.rightCenterShrink).addClass('hidden_pop_up_horizontal_hidden');
			 var newHeight=KCPT.root.getCenterSize().height-110;
			 KCPT.maintainRecordGrid.getGridManager().setHeight(newHeight);
			 rightCenterUpShrinkhidden=1;
		 }else{
			 $("#"+maintainStatisticsConigs.htmlElements.rightChartContainer).show();
			 $("#"+maintainStatisticsConigs.htmlElements.rightCenterShrink).addClass('hidden_pop_up_horizontal_pop_up');
			 $("#"+maintainStatisticsConigs.htmlElements.rightCenterShrink).removeClass('hidden_pop_up_horizontal_hidden');
			 var newHeight=KCPT.root.getCenterSize().height-350;
			 KCPT.maintainRecordGrid.getGridManager().setHeight(newHeight);
			 rightCenterUpShrinkhidden=0;
		 }
});
//追加对象属性方法
maintainStatisticsList.prototype = {
	 	
		getGridHeight : function(){
			var center = getHeightAndWidth();
			return center.height - this.titleHeight - 390;
		},
		init : function() {
			var obj = this;
			var height = obj.getGridHeight();
			//obj.show();
//			$("#"+maintainStatisticsConigs.htmlElements.rightCenterChartAndGridAreaMaintain).height(KCPT.root.getCenterSize().height-93);
//			$("#"+maintainStatisticsConigs.htmlElements.rightContent).height(KCPT.root.getCenterSize().height-70);
			
			var options = {
				columns:[
					{display : '维保计划号',name : 'planCode',width: 120,align : 'center'},
					{display : '车牌号',name : 'vehicleNo',width: 90,align : 'center'},
					{display : '车型',name : 'prodName',width : 80,align : 'center'},
					{display : '维保项目',name : 'maintainName',width : 110,align : 'center'},
					{display : '执行频率',name : 'exeFrequency',width : 65,align : 'center'},
					{display : '计划维保时间',name : 'planMaintainDate',width : 100,align : 'center'},
					{display : '计划维保里程',name : 'planMaintainMileage',width : 100,align : 'center',render:function(row){
						return row.planMaintainMileage==0?"":row.planMaintainMileage;
					}},
					{display : '实际维保时间',name : 'maintainDate',width : 100,align : 'center',render:function(row){
						if(row.maintainOntimeStat=="维保期未到"||row.maintainOntimeStat=="到期未维保"){
							return "";
						}else{
							return row.maintainDate;
						}
					}},
					{display : '实际维保里程',name : 'maintainMileage',width : 100,align : 'center',render:function(row){
						if(row.maintainOntimeStat=="维保期未到"||row.maintainOntimeStat=="到期未维保"){
							return "";
						}else{
							return row.maintainMileage;
						}
					}},
					{display : '维保状态',name : 'maintainOntimeStat',width : 80,align : 'center'}
					],
				showCheckbox : false,
				showTableToggleBtn : false,
				sortName : 'vehicleNo',
				url : 'maintain/findMainTainStatisRecordList.action',// 数据请求地址
				mainContain : "maintainStatisticsSet",
				Buttons : [ {
	                id : "maintainStatisticsgridExport",
	                fun : function() {
	                	owsMaintainStatistics.grid.exportExcel(1, 2);
	                }
	            }],
	            exportAction : "maintain/exportMaintainStatistics.action",
				pageSize : 30,
				height : height,
				width : '99.8%',
				autoLoad:true,
				tableId: 'maintainStatisticsTableDiv',
				searchFormId: 'maintainStatisticsForm',
				gridBeforeSubmit: function() {
					$("#maintainRecordTeamInStr").val(maintainStatisticsLeftTree.getCheckSelect("fleet",1));
					$("#maintainRecordvidInStr").val(maintainStatisticsLeftTree.getCheckSelect("vehicle",0));
					if($("#maintainRecordvidInStr").val()==""&&$("#maintainRecordTeamInStr").val()==""){
						$.ligerDialog.alert("请选择查询车辆或车队", "信息提示", 'warn');
						return false;
					}
					return true;
				},
				onAfterShowData : function() {
					var datas = $("#maintainStatisticsTableDiv").ligerGetGridManager();
					var rows = datas.getData();
					owsMaintainStatistics.selectMaintainStatisticsGraph();
				}
			};
			obj.ctfoFormWithGrid = new ctfoFormWithGrid(options),
			obj.grid = obj.ctfoFormWithGrid.getGrid();
			KCPT.maintainRecordGrid = obj.ctfoFormWithGrid.getGrid();
			
			obj.gridManager = $("#maintainStatisticsTableDiv").ligerGetGridManager();
		},
		
		// 查询维保管理类别
		findMainTainClass : function() {
			var obj = this;
			JAjax("maintain/findAllClassByEntId.action", "", "json",
					owsMaintainStatistics.createSelectMainTainClass, null, true);
		},
		// 创建维保类别下拉菜单
		createSelectMainTainClass : function(data) {
			var obj = this;
			obj.planClassArray = new Array();
			var mainTainClassSelect = $("#mainTainStatisticsRecordId");
			var options = "";
			mainTainClassSelect.empty();
			if (data != null && data != "" && data != undefined) {
				var objArray = eval(data);
				options += "<option value='' >请选择</option>";
				for ( var j = 0; j < objArray.length; j++) {
					var oArray = objArray[j];
					options += "<option value='" + oArray.maintainId + "' >"
							+ oArray.maintainName + "</option>";
				}
				try {
					mainTainClassSelect.append(options);
				} catch (ex) {
				}
			}
		},
		// 左侧树的列表隐藏
		hiddenLeftTree : function() {
			//左侧树样式
//			$("#maintainStatisticsLeftShrink").height(obj.height);
//		    $("#maintainStatisticsLeftShrink").attr({"style" : "margin-top:"+obj.height/2+"px;"});
		},
		//页面大小调整需要增加的方法
		onResize : function() {
			var obj = this;
			if (obj.gridManager) {
				obj.gridManager.setHeight(obj.getGridHeight());
			}
			var center = getHeightAndWidth();
			if($("#vehicleStatisticsLeftNavigation").is(":hidden")){
				$("#rightContent").width(center.width-20);
			}else{
				$("#rightContent").width(center.width-250-20);
			}
			$("#rightContent").height(center.height-75);
			if(maintainStatisticsLeftTree){
				maintainStatisticsLeftTree.onResize();
			}
		},
		//显示报表图形数据
		selectMaintainStatisticsGraph : function() {
			var obj = this;
			obj.curStartDate = $("#maintainStatisticsStartDate").val();
			obj.curEndDate = $("#maintainStatisticsEndDate").val();
			var startDate = "";
			var endDate = "";
			var maintainRecordTeamInStr = maintainStatisticsLeftTree.getCheckSelect("fleet",1);
			var maintainRecordvidInStr = maintainStatisticsLeftTree.getCheckSelect("vehicle",0);
			var maintainStatRecord = $("#maintainStatisticsStatRecord").val();
			var mainTainRecordId = $("#mainTainStatisticsRecordId").val();
			if (obj.curStartDate != "") {
				startDate = Number((obj.curStartDate.replace('-', '')).replace('-', ''));
			}
			if (obj.curEndDate != "") {
				endDate = Number((obj.curEndDate.replace('-', '')).replace('-', ''));
			}
			if (startDate!=""&&endDate!=""&&startDate > endDate) {
				$.ligerDialog.alert("结束时间不能少于开始时间", "信息提示");
				return false;
			}
			
			var url = 'maintain/mainTainStatisticsGraphData.action?maintainRecordvidInStr=' + maintainRecordvidInStr;
			if(startDate != "")
				url += '&startDate=' + encodeURI(encodeURI(obj.curStartDate));
			if(endDate != "")
				url += '&endDate=' + encodeURI(encodeURI(obj.curEndDate));
			url += '&maintainStatRecord=' + maintainStatRecord;
			url += '&mainTainRecordId=' + mainTainRecordId;
			url += '&maintainRecordTeamInStr=' + maintainRecordTeamInStr;
			$.post(url,function(data){
				var dataV = eval(data);
				var xmlData = dataV.chartValue;
				var haveResult = dataV.haveResult;
				if("0"==haveResult)
					owsMaintainStatistics.showNoChartImg();
				else{
					owsMaintainStatistics.maintainchartColumn(xmlData);
					owsMaintainStatistics.maintainchartPie(xmlData);
					owsMaintainStatistics.xmlData = xmlData;
				}
		  	},"json");
	 	},
	 	maintainchartColumn : function(xmlData){
	 		var chart1 = new FusionCharts("script/fusionchart/Column3D.swf", "chart1Id", "450", "290", "0", "0");
			chart1.setDataXML(xmlData);
			chart1.render("leftChartMaintain");
		},
		maintainchartPie : function(xmlData){
			var chart2 = new FusionCharts("script/fusionchart/Pie3D.swf", "chart2Id", "450", "290", "0", "0");
			chart2.setDataXML(xmlData);
			chart2.render("rightChartMaintain");
		},
		//无数据时显示图形div显示暂无数据图片
		showNoChartImg : function(){
			$("#leftChartMaintain").empty().attr("style","background:url(images/global/no_data2.png) no-repeat; border:#aaccee 1px solid; width:450px; height:290px;");
			$("#rightChartMaintain").empty().attr("style","background:url(images/global/no_data2.png) no-repeat; border:#aaccee 1px solid; width:450px; height:290px;");
			
		},
		//点击图形放大镜处理
		bindBigChartEvent : function(){
			var obj = this;
			$("#vehicleMaintainLeftImg > img").click(function(){
				obj.clickChartImg = "left";
				obj.showPopChart();
			});
			$("#vehicleMaintainRightImg > img").click(function(){
				obj.clickChartImg = "right";
				obj.showPopChart();
			});
		},
		//弹出框显示放大图形
		showPopChart : function(chartType){
			$("#mainWorkArea").A_Window({
						dragabId : 'mainWorkArea', // 可拖动的范围
						id : 'clickChart',
						width : 800, // 宽度
						height : 500,// 高度
						load_fn : function() {
							$("#closeCustomColumnDiv").click(function() {
								$("#mainWorkArea").close_ALL_Window();
							});
						},
						url : 'model/energymanagement/maintain/maintaindetail/openCharts.jsp?'
			});
		},
		//添加权限
		checkButtonFunction : function(){
			if(!checkFunction("FG_MEMU_MAINTENANCE_TYPE_SELECT_EMP")){
				$("#maintainStatisticsExportButton").html("");
			}
		}
};
//左侧点击收缩
$("#maintainStatisticsLeftShrink").find("a").click(function(){
	if(owsMaintainStatistics.leftShrinkhidden==0){
		$("#maintainStatisticsLeftShrink").removeClass().addClass('hidden_pop_up_vertical_pop_up');
		$("#vehicleStatisticsLeftNavigation").hide();
		owsMaintainStatistics.leftShrinkhidden=1;
	}else{
		$("#maintainStatisticsLeftShrink").removeClass().addClass('hidden_pop_up_vertical_hidden');
		$("#vehicleStatisticsLeftNavigation").show();
		owsMaintainStatistics.leftShrinkhidden=0;
	}
	owsMaintainStatistics.onResize(true);
});

//创建对象
var owsMaintainStatistics=new maintainStatisticsList();
var maintainStatisticsLeftTree = null;
/**
 * 页面加载初始化
 */
$(document).ready(function() {
	owsMaintainStatistics.hiddenLeftTree();
	owsMaintainStatistics.checkButtonFunction();
	
	owsMaintainStatistics.findMainTainClass();
	owsMaintainStatistics.bindBigChartEvent();
	owsMaintainStatistics.init();
	owsMaintainStatistics.onResize();
	
	maintainClassFream.maintainShowObj = owsMaintainStatistics;
});