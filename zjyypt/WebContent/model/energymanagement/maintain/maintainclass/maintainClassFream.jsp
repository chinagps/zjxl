<%@ page language="java" contentType="text/html; charset=utf-8"	pageEncoding="utf-8"%>


<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<script type="text/javascript" src="script/energymanagement/maintain/maintainclass/maintainClassFream.js"></script>
<link href="css/maintainClass/topTags.css" rel="stylesheet" type="text/css" />
<title>机务管理|车辆智能维保</title>
</head>
<body>
	<div class="topTabTool" id="maintainTabTool" style="border-bottom:none; margin-top:5px;">
		<ul id="maintainTags" class="top_tags" style="margin-left:0;">
			<li id='maintainTagContent2' class="selectTag" url="model/energymanagement/maintain/maintaindetail/maintainRecord.jsp"><a href="javascript:void(0)" onmouseover="this.style.backgroundPosition='0 -50px'" onmouseout="this.style.backgroundPosition='0 0'">维保记录维护</a ></li>
			<li id='maintainTagContent3' url="model/energymanagement/maintain/maintaindetail/maintainStatistics.jsp"><a href="javascript:void(0)" onmouseover="this.style.backgroundPosition='0 -50px'" onmouseout="this.style.backgroundPosition='0 0'">维保查询统计</a ></li>
			<li id='maintainTagContent0' url="model/energymanagement/maintain/maintainclass/maintainClassManage.jsp"><a href="javascript:void(0)" onmouseover="this.style.backgroundPosition='0 -50px'" onmouseout="this.style.backgroundPosition='0 0'">维保项目管理</a ></li>
			<li id='maintainTagContent1' url="model/energymanagement/maintain/maintainplan/planList.jsp"><a href="javascript:void(0)" onmouseover="this.style.backgroundPosition='0 -50px'" onmouseout="this.style.backgroundPosition='0 0'">维保计划设置</a ></li>
		</ul>
	</div>
	<div id="maintainClassContentDiv">
		<div id="maintainDetailDiv"></div>
		<div id="maintainStatisticsDiv"></div>
		<div id="maintainClassDiv"></div>
		<div id="maintainPlanDiv"></div>
	</div>
</body>
</html>
