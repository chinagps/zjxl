var ioReportChart = function(){
	this.version = "";
	this.clickChartImg = "";  //left表示点击了左边图表，right表示点击了右边图表
	this.colorArray=['00b7da','ff7d00','247deb','fb4c29','f7cb00','03a803','9E9BF2','F7E967','04BFBF','A9CF54'];
	this.chartPie = "script/fusionchart/Pie3D.swf";
	this.chartColumn = "script/fusionchart/Column3D.swf";
	this.chartLine = "script/fusionchart/MSLine.swf";
	this.clickChartImg = "";  //left表示点击了左边图表，right表示点击了右边图表
	this.clickChartData = []; //弹出框的数据源
	this.clickChartTitle = []; //弹出框的表头
	this.monthTitle = ["",""];
	this.summaryChartTitleLeft ="告警分类统计（合计）";
	this.summaryChartTitleRight ="车辆告警统计次数排名(前5名-后5名)";
	this.totalChartTitleLeft = "告警分类统计(汇总)";
	this.totalChartTitleRight = "告警分类统计(汇总)";
	
	this.monthChartTitleLeft = "告警分类统计(合计)";
	this.monthChartTitleRight = "告警分类统计趋势(合计)";
	this.monthCharTitleOnlyLeft = "告警分类统计(月)";
	this.monthCharTitleOnlyRight = "告警分类统计趋势(月)";
	
	this.dayChartTitleLeft = "告警分类统计(合计)";
	this.dayChartTitleRight = "告警分类统计趋势(合计)";
	this.dayChartTitleOnlyLeft = "告警分类统计(日)";
	this.dayChartTitleOnlyRight = "告警分类统计趋势(日)";
};

ioReportChart.prototype = {
		//汇总表左饼图
		showTotleLeftChart : function(data,flag){
			var obj = this;
			var columnNames = new Array();
			var columns = gridListForIllOperating.grid.realGrid.options.columns;
			var gridColumnsLength=columns.length;
			for(var i = 0; i < gridColumnsLength; i++){
				columnNames.push(columns[i].name);
			}
			//拼接饼图xml信息
			var setxml = "";
			//夜间非法营运
			if($.inArray("illegalRunSum",columnNames)>=0) {
				setxml += "<set label='夜间非法运营' value='"+obj.filterData(data.illegalRunSum)+"' toolText='夜间非法运营:"+obj.filterData(data.illegalRunSum)+"次' color='"+obj.colorArray[0]+"'/>";
			}
			//非法点火
			if($.inArray("illegalAccOnSum",columnNames)>=0) {
				setxml += "<set label='非法点火' value='"+obj.filterData(data.illegalAccOnSum)+"' toolText='非法点火:"+obj.filterData(data.illegalAccOnSum)+"次' color='"+obj.colorArray[1]+"'/>";
			}
			//进出区域
			if($.inArray("inoutAreaSum",columnNames)>=0) {
				setxml += "<set label='进出区域' value='"+obj.filterData(data.inoutAreaSum)+"' toolText='进出区域:"+obj.filterData(data.inoutAreaSum)+"次' color='"+obj.colorArray[2]+"'/>";
			}
			//进出线路
			if($.inArray("inoutLineSum",columnNames)>=0) {
				setxml += "<set label='进出线路' value='"+obj.filterData(data.inoutLineSum)+"' toolText='进出线路:"+obj.filterData(data.inoutLineSum)+"次' color='"+obj.colorArray[3]+"'/>";
			}
			//违规开门
			if($.inArray("routeRunSum",columnNames)>=0) {
				setxml += "<set label='违规开门' value='"+obj.filterData(data.routeRunSum)+"' toolText='违规开门:"+obj.filterData(data.routeRunSum)+"次' color='"+obj.colorArray[4]+"'/>";
			}
			//偏航
			if($.inArray("offLineSum",columnNames)>=0) {
				setxml += "<set label='偏航' value='"+obj.filterData(data.offLineSum)+"' toolText='偏航:"+obj.filterData(data.offLineSum)+"次' color='"+obj.colorArray[5]+"'/>";
			}
			//路段行驶时间过长
			if($.inArray("areaOpendoorSum",columnNames)>=0) {
				setxml += "<set label='路段行驶时间过长' value='"+obj.filterData(data.areaOpendoorSum)+"' toolText='路段行驶时间过长:"+obj.filterData(data.areaOpendoorSum)+"次' color='"+obj.colorArray[6]+"'/>";
			}
			//超速
			if($.inArray("overspeedAlarmSum",columnNames)>=0) {
				setxml += "<set label='超速' value='"+obj.filterData(data.overspeedAlarmSum)+"' toolText='超速:"+obj.filterData(data.overspeedAlarmSum)+"次' color='"+obj.colorArray[7]+"'/>";
			}
			//超员
			if($.inArray("overmanSum",columnNames)>=0) {
				setxml += "<set label='超员' value='"+obj.filterData(data.overmanSum)+"' toolText='超员:"+obj.filterData(data.overmanSum)+"次' color='"+obj.colorArray[8]+"'/>";
			}
			//疲劳驾驶
			if($.inArray("fatigueAlarmSum",columnNames)>=0) {
				setxml += "<set label='疲劳驾驶' value='"+obj.filterData(data.fatigueAlarmSum)+"' toolText='疲劳驾驶:"+obj.filterData(data.fatigueAlarmSum)+"次' color='"+obj.colorArray[9]+"'/>";
			}

			//存储弹出窗口数据
			var caption = "";
			if(flag == '11') {
				caption = obj.summaryChartTitleLeft;
			}else if(flag == '12') {
				caption = obj.totalChartTitleLeft;
			}else if(flag == '21') {
				caption = obj.monthChartTitleLeft;
			}else if(flag == '22') {
				caption = obj.monthCharTitleOnlyLeft;
			}else if(flag == '31') {
				caption = obj.dayChartTitleLeft;
			}else if(flag == '32') {
				caption = obj.dayChartTitleOnlyLeft;
			}
			this.clickChartData[0] = setxml;
		 	this.clickChartTitle[0] = caption;
			obj.createOpenPieChart(setxml, caption, "iOLeftChart");
		},
		//汇总表右柱图
		showTotleRightChart : function(data,flag){
			var obj = this;
	    	//主图xml信息
	    	var setxml = "";
	    	for ( var i = 1; i < data.length; i++) {
	    		setxml += "<set label='"+data[i]["vehicleNo"]+"' value='"+obj.filterData(data[i]["total"])+"' toolText='"+data[i]["vehicleNo"]+":"+obj.filterData(data[i]["total"])+"次' color='"+obj.colorArray[i-1]+"'/>";
			}
	    	
			//存储弹出窗口数据
			var caption = flag == '11' ? obj.totalChartTitleRight : obj.summaryChartTitleRight;
			this.clickChartData[1] = setxml;
		 	this.clickChartTitle[1] = caption;
			obj.createOpenColumnChart(setxml, caption, "iORightChart");
		},
		//月报表和日报表普通列右线图(合计)
		showAllMonthAndDayRightChart : function(data,flag){
			var obj = this;
			//获得选中的菜单的值
			var statType =$("#statTypeForIllOperating").val();
			var xmlData = "";
			var categoryXml = "<categories>";
			var contentXml = "";
			for ( var i = 1; i < data.length; i++) {
				if(statType == 2) {
					var title = data[i]["statYear"]+"年"+data[i]["statMonth"]+"月";
					categoryXml = categoryXml + "<category name='"+title+"' />";
				}else {
					categoryXml = categoryXml + "<category name='"+data[i]["statDateStr"]+"' />";
				}
			}
			//获得grid的列
			var columns = gridListForIllOperating.grid.realGrid.options.columns;
			var gridColumnsLength=columns.length;  //列的长度
			var inde = 0;  //取颜色的索引
			for(var i = 0; i < gridColumnsLength; i++){
				if(columns[i].frozen == false) {
					if(columns[i].name != "vid" && columns[i].name != "vinCode" && columns[i].name != "total" && columns[i].name != "rank" && columns[i].name != "vehicleType") {
						contentXml = contentXml + "<dataset seriesName='"+columns[i].display+"' color='"+obj.colorArray[inde]+"' anchorBorderColor='"+obj.colorArray[inde]+"' anchorBgColor='"+obj.colorArray[inde]+"'>";
						inde++;
						for(var j = 1; j < data.length; j++) {
							contentXml = contentXml + "<set value='"+obj.filterData(data[j][columns[i].name])+"' toolText='"+columns[i].display+":"+obj.filterData(data[j][columns[i].name])+"次'/>";
						}
						contentXml = contentXml + "</dataset>";
					}
				}
			}
			categoryXml = categoryXml + "</categories>";
			xmlData = xmlData + categoryXml;
			xmlData = xmlData + contentXml;
			
			//存储弹出窗口数据
			var caption = "";
			if(flag == "20"){
				caption = obj.monthChartTitleRight;
			}else if(flag == "30"){
				caption = obj.dayChartTitleRight;
			}
			this.clickChartData[1] = xmlData;
		 	this.clickChartTitle[1] = caption;

			obj.createOpenLineChart(xmlData, caption, "iORightChart");
		},
		//选中单行数据(单行)
		getCurrentGridRow : function(data,rowindex,rowobj,rightXml){
			var obj = this;
			obj.chartVal = [];
	    	//取列中可自定义列的数据刷成图表展示
	    	var disTitle = new Array();
	    	var setVal = new Array();
			var columns = gridListForIllOperating.grid.realGrid.options.columns;
			var gridColumnsLength=columns.length;
			for(var i = 0; i < gridColumnsLength; i++){
				if(columns[i].frozen == false){
					if(columns[i].name != "total" && columns[i].name != "rank" && columns[i].name != "vid" && columns[i].name != "vinCode" && columns[i].name != "vehicleType") {
						disTitle.push(columns[i].display);
						setVal.push(data[columns[i].name]);
					}
				}else if(columns[i].frozen){
					obj.monthTitle[0] = "vehicleNo";
					obj.monthTitle[1] = data[obj.monthTitle[0]];
				}
			}
			obj.chartCorpName = obj.monthTitle[1];
			obj.chartVal.push(disTitle);
			obj.chartVal.push(setVal);
			var tabIdx = $("#statTypeForIllOperating").val();
			if(tabIdx == "1"){  //总计
				obj.createTotalDeChart();
			}else if(tabIdx == "2") {  //按月统计
				obj.createPieLeftChart(obj.monthCharTitleOnlyLeft);
				obj.createLineRightChart(rightXml, obj.monthCharTitleOnlyRight);
			}else if(tabIdx == "3") {  //按日统计
				obj.createPieLeftChart(obj.dayChartTitleOnlyLeft);
				obj.createLineRightChart(rightXml, obj.monthCharTitleOnlyRight);
			}
		},
		//绘制饼图和柱状图(总计的单行)
		createTotalDeChart : function (){
			var obj = this;
			obj.xmlData = "";
			obj.xmlData = obj.getXmlData();
			this.clickChartData[0] = obj.xmlData;
		 	this.clickChartTitle[0] = obj.totalChartTitleLeft;
		 	//绘制左侧饼图
			obj.createOpenPieChart(obj.xmlData,obj.totalChartTitleLeft,"iOLeftChart");
			this.clickChartData[1] = obj.xmlData;
		 	this.clickChartTitle[1] = obj.totalChartTitleRight;
		 	//绘制右侧柱状图
			obj.createOpenColumnChart(obj.xmlData,obj.totalChartTitleRight,"iORightChart");
		},
		//解析数据为图形需要的xml数据格式
		getXmlData : function(){
			var obj = this;
			if(obj.chartVal[0] != undefined || obj.chartVal[1] != undefined ){
				var xmlData = "";
				obj.title = obj.chartVal[0];
				obj.vals = obj.chartVal[1];
				for(var i = 0; i < obj.title.length; i++){
					xmlData = xmlData + "<set label='"+obj.title[i]+"' value='"+obj.filterData(obj.vals[i])+"' toolText='"+obj.title[i]+":"+obj.filterData(obj.vals[i])+"次' color='"+obj.colorArray[i]+"'/>";
				}
				return xmlData;
			}
			return obj.xmlData;
		},
		//绘制单行饼图
		createPieLeftChart : function(caption) {
			var obj = this;
			obj.xmlData = "";
			//饼图的数据
			obj.xmlData = obj.getXmlData();
			//生成饼图的方法
			obj.createOpenPieChart(obj.xmlData,caption,"iOLeftChart");
			this.clickChartData[0] = obj.xmlData;
		 	this.clickChartTitle[0] = caption;
		},
		//绘制单行趋势图
		createLineRightChart : function(dataXml,caption) {
			var obj = this;
			obj.createOpenLineChart(dataXml,caption,"iORightChart");
			this.clickChartData[1] = dataXml;
		 	this.clickChartTitle[1] = caption;
		},
		//饼图
		createOpenPieChart : function(xmlData,caption,chartDivId){
			var chartDiv = $("#" + chartDivId);
	 		var chart = new FusionCharts(
				 "script/fusionchart/Pie3D.swf",
				 "chartObjs", "450", "290", "0", "0");
			if(xmlData.indexOf('set')!=-1){
				var str = "<graph caption='"+caption+"' showNames='1' baseFont='Arial' showZeroPies='0' pieRadius='85' startingAngle='125' showPercentValues='1' showPercentInToolTip='0' numberSuffix ='次' baseFontSize ='12' formatNumberScale='0' formatNumber='1' chartLeftMargin='5' chartRightMargin='5' chartTopMargin='5' chartBottomMargin='5'>";
			 	 str = str + xmlData;
			 	 str = str + "</graph>";
 				 chart.setDataXML(str);
				 chart.render(chartDivId);
				 $("#iOLeftImg").removeClass("btnNone").addClass("btnDisplay");
		   	}else{
		   		$(chartDiv).html('');
		        $(chartDiv).attr('style','background:url(images/global/no_data2.png) no-repeat; border:#aaccee 1px solid; width:450px; height:290px;');
	        	$("#iOLeftImg").removeClass("btnDisplay").addClass("btnNone");
		     }
	 	},
	 	//柱图
	 	createOpenColumnChart : function(xmlData,caption,chartDivId){
	 		var chartDiv = $("#" + chartDivId);
	 		var chart = new FusionCharts(
				 "script/fusionchart/Column3D.swf",
				 "chartObjs", "450", "290", "0", "0");
			if(xmlData.indexOf('set')!=-1){
				var str = "<graph caption='"+caption+"' rotateNames='1' slantLabels='1' xAxisName='' yAxisName='' decimalPrecision='0' formatNumber='0' formatNumberScale='0' baseFont='Arial' baseFontSize ='12' canvasBaseColor='74bb45' >";
			 	 str = str + xmlData;
			 	 str = str + "</graph>";
				 chart.setDataXML(str);
				 chart.render(chartDivId);
				 $("#iORightImg").removeClass("btnNone").addClass("btnDisplay");
		   	}else{
		   		$(chartDiv).html('');
		        $(chartDiv).attr('style','background:url(images/global/no_data2.png) no-repeat; border:#aaccee 1px solid; width:450px; height:290px;');
	        	$("#iORightImg").removeClass("btnDisplay").addClass("btnNone");
		     }
	 	},
	 	//线图
	 	createOpenLineChart : function(xmlData,caption,chartDivId){
	 		var chartDiv = $("#" + chartDivId);
	 		var chart = new FusionCharts(
				 "script/fusionchart/MSLine.swf",
				 "chartObjs", "450", "290", "0", "0");
			if(xmlData.indexOf('set')!=-1){
				var str = "<graph caption='"+caption+"' rotateNames='1' slantLabels='1' divLineIsDashed='1' drawAnchors='1' bgColor='#FFFFFF' hovercapbg='FFECAA' formatNumber='0' hovercapborder='F47E00' formatNumberScale='0' decimalPrecision='0' showvalues='0' numdivlines='3' numVdivlines='0' yaxisminvalue='5' yaxismaxvalue='10' rotateLabels='1'>";
			 	 str = str + xmlData;
			 	 str = str + "</graph>";
				 chart.setDataXML(str);
				 chart.render(chartDivId);
				 $("#iORightImg").removeClass("btnNone").addClass("btnDisplay");
		   	}else{
		   		$(chartDiv).html('');
		        $(chartDiv).attr('style','background:url(images/global/no_data2.png) no-repeat; border:#aaccee 1px solid; width:450px; height:290px;');
	        	$("#iORightImg").removeClass("btnDisplay").addClass("btnNone");
		     }
	 	},
	 	//放大镜按钮点击处理事件
	 	bindBigChartEvent : function(){
			var obj = this;
			$("#iOLeftImg > img").click(function(){
				obj.clickChartImg = "left";
				obj.showPopChart();
			});
			$("#iORightImg > img").click(function(){
				obj.clickChartImg = "right";
				obj.showPopChart();
			});
		},
		//显示弹出框大图
		showPopChart : function(){
			$("#mainWorkArea").A_Window({
				dragabId : 'mainWorkArea', // 可拖动的范围
				id : 'clickIoChart',
				width : 800, // 宽度
				height : 500,// 高度
				load_fn : function() {
					$("#closeIoCustomColumnDiv").click(function() {
						$("#mainWorkArea").close_ALL_Window();
					});
				},
				url : 'model/illoperating/openIoCharts.jsp?'
			});
		},
		getTabIndex : function(){
	    	var disTab = $("#illOperatingTabTool").find("li[class=selectTag]");
			var htmlTxt = $(disTab[0]).text();
			if(htmlTxt == "汇总表"){
				return "1";
			}else if(htmlTxt == "月报表"){
				return "2";
			}else if(htmlTxt == "日报表"){
				return "3";
			}
	    },
		filterData : function(data){
	    	if(data<0||data==999999999)
	    		return 0;
	    	else 
	    		return data;
	    }
};
var ioReportChartHandle = new ioReportChart();
$(document).ready(function() {
	ioReportChartHandle.bindBigChartEvent();
});