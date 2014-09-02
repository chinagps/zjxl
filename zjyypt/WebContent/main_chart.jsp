<%@ page language="java" contentType="text/html; charset=utf-8"	pageEncoding="utf-8"%>

<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<script type="text/javascript" src="script/fusionchart/FusionCharts.js"></script>
</head>
<body style="margin: 0px;padding: 0px;" onload="init();">
	<div id="alarmChartDiv" style="overflow-x: hidden;overflow-y: hidden;"></div>
</body>
<script type="text/javascript">
	/* 柱状图 */
	window.createAlarmColumnFusion = function(btSeriousStr) {
		var chart = new FusionCharts("script/fusionchart/StackedColumn3D.swf","alarmChartDiv", "530", "265", "0", "0");
		chart.setDataXML(btSeriousStr);
		chart.render("alarmChartDiv");
	};
	/* 曲线图 */
	window.createAlarmLineFusion = function(btSeriousStr) {
		var chart = new FusionCharts("script/fusionchart/MSLine.swf","chartId", "530", "265", "0", "0");
		chart.setDataXML(btSeriousStr);
		chart.render("alarmChartDiv");	
	};
	window.countAlarmByCorpId = function(btSeriousStr){
		var chart = new FusionCharts("script/fusionchart/Pie3DOld.swf","alarmChartDiv", "530", "251", "0", "0");
		chart.setDataXML(btSeriousStr);
		chart.render("alarmChartDiv");	
	};
	window.init = function(){
		window.parent.winHp.getMemAlarminfo();
	}
</script>
</html>