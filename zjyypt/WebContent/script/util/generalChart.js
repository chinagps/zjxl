var generalChart = function(pageJsObj,tableId,dvCharts){
	this.xmlData = "";
	this.lineXmlData = "";
	this.chartVal = [];
	this.clickChartImg = "";  //left表示点击了左边图表，right表示点击了右边图表
	this.clickChartType = []; //显示弹出框时使用，[0]左边图表类型，[1]右边图表类型，类型有pieFusion, lineFusion, columnFusion
	this.clickChartData = []; //弹出框的数据源
	this.clickChartTitle = []; //弹出框的表头
	this.chartCaption = [];
	this.searchArr = [];
	this.resultIdx = 0;
	this.monthTitle = ["",""];
	this.getTitleName = [];
	this.chartCorpName = "";
	this.pieDataCounter = 0;  //饼图合计为0时显示为no data to display，增加此变量用于显示饼图无数据时的显示问题。
	this.colorArray=['00b7da','ff7d00','247deb','fb4c29','f7cb00','03a803'];
 	this.leftFusionChart = "";
	this.rightFusionChart = "";
	this.pageJsObj = pageJsObj;
	this.tableId = tableId;
	this.dvCharts = dvCharts;
	this.suffUnit = "";
	this.chartCorpId = "";
};

generalChart.prototype = {
		//设置图表数据单位
		setUnit : function(valUnit){
			var obj = this;
			obj.suffUnit = valUnit;
		},
		//设置表格ID
		setTableId : function(tableId){
			var obj = this;
			obj.tableId = tableId;
		},
		//页面图表ID前缀
		setdvCharts : function(dvCharts){
			var obj = this;
			obj.dvCharts = dvCharts;
		},
		//汇总报表图表
		//参数 	pieTid:数组(饼图)  、columnTid:数组(柱状图)
		//0-标题，1-chartId
		createTotalChart : function (pieTid,columnTid){
			var obj = this;
			obj.xmlData = "";
			obj.xmlData = obj.getXmlData();
			obj.createPieFusion(obj.xmlData,pieTid);
			obj.createColumnFusion(obj.xmlData,columnTid);
		},
		//月报表图表
		//参数 	pieTid:数组(饼图)  、lineTid:数组(线形图)
		//0-标题，1-chartId
		createMonthChart : function(pieTid,lineTid){
			var obj = this;
			var panelIdx = obj.pageJsObj.getDisplayPanel();
			obj.xmlData = "";
 			obj.xmlData = obj.getMonthPieXmlData(panelIdx);
 			obj.lineXmlData = "";
			obj.lineXmlData = obj.getMonthLineXmlData(panelIdx);
 			obj.createPieFusion(obj.xmlData,pieTid);
			obj.createLineFusion(obj.lineXmlData,lineTid);
		},
		//日报表图表
		//参数 	pieTid:数组(饼图)  、columnTid:数组(柱状图)
		//0-标题，1-chartId
		createDayChart : function(pieTid,columnTid){
 			var obj = this;
			obj.xmlData == "";
			obj.xmlData = obj.getXmlData();
 			obj.createPieFusion(obj.xmlData,pieTid);
 			obj.createColumnFusion(obj.xmlData,columnTid);
 		},
 		//饼图
		createPieFusion : function(xmlData,pieTid){
			var obj = this;
 			var chart = getChartFromId(pieTid[0]);
 			var fusionCharts = null;
 			 if(xmlData.indexOf('set')!=-1 && this.pieDataCounter != 0){
			    var str = "<chart caption='"+pieTid[1]+"'  hoverCapSepChar='：'  rotateNames='1' slantLabels='1'  showNames='1' baseFont='Arial' showPercentValues='1' showPercentInToolTip='0' numberSuffix ='"+obj.suffUnit+"' baseFontSize ='12' formatNumberScale='0' formatNumber='1' chartLeftMargin='5' chartRightMargin='5' chartTopMargin='5' chartBottomMargin='5'>";
 			     str = str + xmlData;
			 	 str = str + "</chart>";
			 	this.clickChartData[0] = xmlData;
			 	this.clickChartTitle[0] = pieTid[1];
			 	var chartObjs = $("div[id=rightCenterChartAndGridArea]:visible").find("Object[id="+pieTid[0]+"]");
			 	if(chartObjs.length == 0){
			 		fusionCharts = new FusionCharts(
					 "script/fusionchart/Pie3D.swf", pieTid[0], "450", "290", "0", "0");
			 		fusionCharts.setDataXML(str);
	  				var renderDv = obj.dvCharts + "leftChart";
	  				fusionCharts.render(renderDv);
	 			} else {
	 				updateChartXML(chart.id, str);
	 				KCPT.openFusionChart.leftFusionChart.variables.dataXML = str;
	 			}
 			   }else{
 				  this.clickChartData[0] = "";
		        $("div[id="+obj.dvCharts +"leftChart]:visible").html('');
		        $("div[id="+obj.dvCharts +"leftChart]:visible").attr('style','background:url(images/global/no_data2.png) no-repeat; border:#aaccee 1px solid; width:450px; height:290px;');
		     }
 			 if(null!=fusionCharts){
 				 displayChart.leftFusionChart = fusionCharts;
			 }
 			$("div[class=L]:visible > div[id=leftImg]").removeClass("btnNone").addClass("btnDisplay");
		},
		//拆线图
		createColumnFusion : function(xmlData,columnTid){
			var obj = this;

			var chart = getChartFromId(columnTid[0]);
			var fusionCharts = null;
			 if(xmlData.indexOf('set')!=-1 && this.pieDataCounter != 0){
			 	 var str = "<graph caption='"+columnTid[1]+"'  hoverCapSepChar='：' formatNumber='1' rotateNames='1' slantLabels='1'  xAxisName='' yAxisName='' decimalPrecision='0' numberSuffix ='"+obj.suffUnit+"'  formatNumberScale='0' baseFont='Arial' baseFontSize ='12' canvasBaseColor='74bb45' chartLeftMargin='5' chartRightMargin='5' chartTopMargin='5' chartBottomMargin='5'>";
			 	 str = str + xmlData;
			 	 str = str + "</graph>";
			 	this.clickChartData[1] = xmlData;
			 	this.clickChartTitle[1] = columnTid[1];
			 	var chartObjs = $("div[id=rightCenterChartAndGridArea]:visible").find("Object[id="+columnTid[0]+"]");
			 	if(chartObjs.length == 0){
			 			fusionCharts = new FusionCharts(
								 "script/fusionchart/Column3D.swf",
								 columnTid[0], "450", "290", "0", "0");
			 			fusionCharts.setDataXML(str);
		  				var renderDv = displayChart.dvCharts +"rightChart";
		  				fusionCharts.render(renderDv);
		 			} else {
		 				updateChartXML(chart.id, str);
		 				KCPT.openFusionChart.rightFusionChart.variables.dataXML = str;
		 			}
 			  }else{
 				 this.clickChartData[1] = "";
		        $("div[id="+obj.dvCharts +"rightChart]:visible").html('');
		        $("div[id="+obj.dvCharts +"rightChart]:visible").attr('style','background:url(images/global/no_data2.png) no-repeat; border:#aaccee 1px solid; width:450px; height:290px;');
		     }
			 if(null!=fusionCharts){
				 displayChart.rightFusionChart = fusionCharts;
			 }
			$("div[class=R]:visible > div[id=rightImg]").removeClass("btnNone").addClass("btnDisplay");
		},
		//折线图
		createLineFusion : function(xmlData,lineTid){
			var obj = this;
 			var chart = getChartFromId(lineTid[0]);
 			var fusionCharts = null;
			 if(xmlData.indexOf('set')!=-1 && this.pieDataCounter != 0){
			 	 var str = "<graph caption='"+lineTid[1]+"' showborder='0' hoverCapSepChar='：' formatNumber='1' numberSuffix ='"+obj.suffUnit+"' rotateNames='1' slantLabels='1' rotateLabels='1' bgColor='#FFFFFF' hovercapbg='FFECAA' hovercapborder='F47E00' formatNumberScale='0' rotateNames='1' slantLabels='1' decimalPrecision='2' showvalues='0' numdivlines='3' numVdivlines='0'  rotateLabels='1' chartLeftMargin='5' chartRightMargin='5' chartTopMargin='5' chartBottomMargin='5'>";
			 	 str = str + xmlData;
			 	 str = str + "</graph>";
			 	this.clickChartData[1] = xmlData;
			 	this.clickChartTitle[1] = lineTid[1];
			 	var chartObjs = $("div[id=rightCenterChartAndGridArea]:visible").find("Object[id="+lineTid[0]+"]");
			 	if(chartObjs.length == 0){
			 		fusionCharts = new FusionCharts(
							 "script/fusionchart/MSLine.swf",
							 lineTid[0], "450", "290", "0", "0");
			 		fusionCharts.setDataXML(str);
					 var renderDv = displayChart.dvCharts +"rightChart";
					 fusionCharts.render(renderDv);
	 			} else {
	 				obj.updateChart(chart.id,str);
	 				KCPT.openFusionChart.rightFusionChart.variables.dataXML = str;
	 			}
 			   }else{
 				  this.clickChartData[1] = "";
		        $("div[id="+obj.dvCharts +"rightChart]:visible").html('');
		        $("div[id="+obj.dvCharts +"rightChart]:visible").attr('style','background:url(images/global/no_data2.png) no-repeat; border:#aaccee 1px solid; width:450px; height:290px;');
		     }
			 if(null!=fusionCharts){
				 displayChart.rightFusionChart = fusionCharts;
			 }
		     $("div[id=rightImg]:visible").removeClass("btnNone").addClass("btnDisplay");
		},
		//获取月报表数据
		getMonthData : function(){
			var obj = this;
			var gridData = $("#" + obj.tableId).ligerGetGridManager().getData();
			var rowsData = gridData;
			var monthRowsData = [];
			var tmpCorpId = "";
			for(var i = 0 ; i < rowsData.length; i++){
				var curData = rowsData[i];
				tmpCorpId = curData["corpId"];
				if(obj.monthTitle[0] == "lineId"){//判断线路ID，则根据企业ID一起判断获取表格数据
					if(curData[obj.monthTitle[0]] == obj.monthTitle[1]){
						if(obj.chartCorpId == tmpCorpId){
							monthRowsData.push(curData);
						}
					}
				}else{
					if(curData[obj.monthTitle[0]] == obj.monthTitle[1]){
						monthRowsData.push(curData);
					}
				}
			}
			//过滤要获取的日期格化
			if(monthRowsData[0].statDateStr == undefined){
				if(monthRowsData[0].statDatestr == null || monthRowsData[0].statDatestr.length != 0){
					var firstDate = monthRowsData[0].statDatestr;//.split("-");
					var lastDate = monthRowsData[monthRowsData.length-1].statDatestr;//.split("-");
					if(firstDate > lastDate){
						monthRowsData.reverse();
					}
				}
			}else{
				if(monthRowsData[0].statDateStr == null || monthRowsData[0].statDateStr.length != 0){
					var firstDate = monthRowsData[0].statDateStr;//.split("-");
					var lastDate = monthRowsData[monthRowsData.length-1].statDateStr;//.split("-");
					if(firstDate > lastDate){
						monthRowsData.reverse();
					}
				}
			}
			return monthRowsData;
		},
		//获取月报表中的饼图数据
		getMonthPieXmlData : function(){
			var obj = this;
			var xmlData = "";
			var title = obj.chartVal[0];
			var chartData = obj.getMonthData();
			var totalData = [];
			for(var j = 0; j < obj.getTitleName.length; j++){
				var a = 0;
				for(var i = 0; i < chartData.length; i++){
					var rowsData = chartData[i];
					a = Number(a) + Number(rowsData[obj.getTitleName[j]]);
				}
				totalData.push(a);
			}
			obj.pieDataCounter = 0;
			for(var i = 0; i < title.length; i++){
				var data = totalData[i] < 0?0:totalData[i];
				xmlData = xmlData + "<set label='"+title[i]+"' value='"+data+"' color='"+obj.colorArray[i]+"'/>";
				obj.pieDataCounter += totalData[i];
			}
			return xmlData;
		},
		//获取月报表的折线图数据
		getMonthLineXmlData : function(){
			var obj = this;
			var xmlData = "";
			var title = obj.chartVal[0];
 			var chartData = obj.getMonthData();
			var totalData = [];
			var category = [];
			for(var i = 0; i < chartData.length; i++){
				var a = [];
				for(var j = 0; j < obj.getTitleName.length; j++){
					var rowsData = chartData[i];
					if(rowsData.statYear.length != 0){//格式化日期
						category.push((rowsData.statYear + "年" + rowsData.statMonth + "月"));
					}else{
						if(rowsData.statDateStr != undefined){
							if(rowsData.statDateStr.length != 0){
								var dataArr = rowsData.statDateStr.split("-");
								category.push(dataArr[1] + "月" + dataArr[2] + "日");
							}
						}else{
							if(rowsData.statDatestr.length != 0){
								var dataArr = rowsData.statDatestr.split("-");
								category.push(dataArr[1] + "月" + dataArr[2] + "日");
							}
						}
					}
 					a.push(rowsData[obj.getTitleName[j]]);
				}
				totalData.push(a);
			}
			//合成图表数据
			category = filterArrayRepeat(category);
			var categoryXml = "<categories>";
			var contentXml = "";
			for(var i = 0; i < category.length; i++){
				categoryXml = categoryXml + "<category name='"+category[i]+"' />";
			}
			for(var i = 0; i < title.length; i++){//color='1D8BD1'
				contentXml = contentXml + "<dataset seriesName='"+title[i]+"' anchorBorderColor='1D8BD1' anchorBgColor='1D8BD1'>";
				for(var j = 0; j < totalData.length; j++){
					var data = totalData[j][i] < 0?0:totalData[j][i];
					contentXml = contentXml + "<set value='"+data+"' />";
				}
				contentXml = contentXml + "</dataset>";

			}
			categoryXml = categoryXml + "</categories>";
			xmlData = xmlData + categoryXml;
			xmlData = xmlData + contentXml;

			return xmlData;
		},
		//根据获取相应表格得到图表数据
		getXmlData : function(){
			var obj = this;
			if(obj.chartVal[0] != undefined || obj.chartVal[1] != undefined ){
			var xmlData = "";
			obj.title = obj.chartVal[0];
			obj.vals = obj.chartVal[1];
			obj.pieDataCounter = 0;
			for(var i = 0; i < obj.title.length; i++){
				var data = obj.vals[i] < 0 ? 0 : obj.vals[i];
 				if(data != 999999999){
					xmlData = xmlData + "<set label='"+obj.title[i]+"' value='"+data+"' color='"+obj.colorArray[i]+"'/>";
					obj.pieDataCounter += obj.vals[i];
				}
			}
			return xmlData;
			}
			return obj.xmlData;
		},
		//图表放大镜事件
		fillImg : function(){
			$("div[id="+displayChart.dvCharts +"leftChart]").html('');
		    $("div[id="+displayChart.dvCharts +"leftChart]").attr('style','background:url(images/global/no_data2.png) no-repeat; border:#aaccee 1px solid; width:450px; height:290px;');
		    $("div[id="+displayChart.dvCharts +"rightChart]").html('');
		    $("div[id="+displayChart.dvCharts +"rightChart]").attr('style','background:url(images/global/no_data2.png) no-repeat; border:#aaccee 1px solid; width:450px; height:290px;');
		},
		//变更图表数据
		updateChart : function(domId,dataXml){
			updateChartXML(domId,dataXml);
		},
		//图表放大镜事件弹出窗
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
						url : 'model/openChart/openCharts.jsp'
			});
		},
		//绑定放大镜事件
		bindBigChartEvent : function(){
			var obj = this;
			$("div[class=L]:visible > div[id=leftImg] > img").click(function(){
				obj.clickChartImg = "left";
				obj.showPopChart();
			});
			$("div[class=R]:visible > div[id=rightImg] > img").click(function(){
				obj.clickChartImg = "right";
				obj.showPopChart();
			});
		}
};

$(document).ready(function() {

  });