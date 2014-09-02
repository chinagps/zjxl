<%@ page language="java" contentType="text/html; charset=utf-8"	pageEncoding="utf-8"%>


<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>业务支撑-驾驶员管理</title>
<script type="text/javascript" src="script/employee/employeeinfoMng.js"></script>

<link href="css/global/employee.css" rel="stylesheet" type="text/css" />
</head>
<body>

<div id="employMng">
<div id="classCustomerDivContent" class="content">
<div class="right_c">
<div class="right_cs">
<form id="customerSearchForm">
<div class="Backstage2">
<ul class="QueryListTitle">
	<li>所属企业：<span id="parentOrgName"></span> <input
		name="requestParam.equal.entIds" type="hidden" id="parentOrgId3" /></li>
</ul>
<ul class="QueryListCondition">
	<li>驾驶员姓名：<input name="requestParam.like.staffName" type="text"
		maxlength="10" class="srkjl4 w_yy_1" /></li>
	<li>驾驶车牌号：<input name="requestParam.like.staffVehicleNo" type="text"
		maxlength="20" class="srkjl4 w_yy_1" /></li>
	<li>
		<input type="submit" class="btn_inquires" onmouseover="this.style.backgroundPosition='0px -200px'" onmouseout="this.style.backgroundPosition='0px -150px'" value="&nbsp;" />
	</li>
</ul>
</div>
</form>
<div class="right_cc">
<div class="right_cdc2"><a id="addPage_employee_class" title="增加"
	style="cursor: pointer;" href="javascript:void(0)"><img
	src="images/global/jiahao.png" align="right" /></a> &nbsp;</div>
<div id="customerGrid"></div>
</div>
</div>
</div>
</div>

<div id="opEmployeeAddform" class="content" style="display: none;">
</div>
</div>
</body>
</html>