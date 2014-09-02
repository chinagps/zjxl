<%@ page language="java" contentType="text/html; charset=utf-8"	pageEncoding="utf-8"%>


<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<title>运营管理-维保计划设置-计划编辑</title>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<script type="text/javascript" src="script/energymanagement/maintain/maintainplan/addplan.js"></script>
<script type="text/javascript" src="script/energymanagement/maintain/maintainplan/maintainPlanLeftTree.js"></script>
</head>
<body>
	<div id="addPlanPage">
		<div class="content">
			<div class="right_c">
				<div class="right_cs">
					<div class="right_ct4" style="border-top:#c0d7eb 1px solid;">
						维保计划设置-计划编辑
					</div>
					<div class="left_c" id="vehiclePlanLeftNavigation" style="width: 260px;float: left;">
					<div id="accordionplan1">
			        <div title="按车辆查询" id="panelplan3" style="padding-top: 70px;overflow:hidden;">
						<div class="panelSearch">
							<table>
							<tr>
								<td>
								&nbsp;<input type="text" id="threeSearchplanInput" class="noVehicle" style="width:120px;" name="threeSearchplanInput" value="车牌号"/>
								</td>
								<td>
				         		<input type="button" id="searchplanThree" class="btn_inquires" onmouseover="this.style.backgroundPosition='0px -200px'" onmouseout="this.style.backgroundPosition='0px -150px'" value="&nbsp;" /><br/>
				         		</td>
				         	</tr>
			         		<tr id="resultplanOper">
			         			<td>
								&nbsp;<select name="vehicleplanResult" id="vehicleplanResult" style="width:120px;" class="srkjl4 w_yy_5"></select>
								</td>
				         		<td style="padding-top: 3px;">
								<input type="button" id="clearplanResult"
								value="清除" name="clearplanResult" class="btn_green" onmouseover="this.style.backgroundPosition='-100px -50px'" onmouseout="this.style.backgroundPosition='-100px 0px'"/><br>
								</td>
			         		</tr>
			         		</table>
						</div>
			         	<div class="panelInner" style="padding:0px">
			                <ul id="panelConplan3" style="overflow: auto;">
			                </ul>
			         	</div>
			        </div>
			       	</div>
					</div>
					<form id="addPlanForm" name="addPlanForm"  onSubmit="" style="float: left;border: 1px solid #C0D7EB;">
						<input type="hidden" id="planId" name="tbMaintainPlan.planId" value="" />
						<input type="hidden" id="vidStr" name="vidStr" value="" />
						<!-- 左侧树车辆拼接字符串 -->
						<input type="hidden" id="maintainName" name="tbMaintainPlan.maintainName" value="" />
						 <select id="maintainContentSelect" style="display: none;"></select>
						<!-- 专为修改保存用  解决修改置灰后，相关字段传值为空的问题-->
						<input type="hidden" id="updateMaintainId" name="updateMaintainId" value="" />
						 <input type="hidden" id="updateMaintainName" name="updateMaintainName" value="" />
						 <input type="hidden" id="updateExeFrequency" name="updateExeFrequency" value="" />
						 <input type="hidden" id="maintainplanEditFlag" value="" />
						<div align="center" id="div_addplan" style="overflow:auto;">
						<ul class="frame2">
							<li>
								<span style="float:left;" id="maintainIdSpan">维保项目:<select 
									id="maintainId" name="tbMaintainPlan.maintainId" style="width: 150px;" onchange="ad.changeMainTainClassName();"></select>
								</span>
								<span class="RAdd_Page">执行频率:&nbsp;&nbsp;&nbsp;&nbsp;
									<select id="exeFrequency" name="tbMaintainPlan.exeFrequency" style="width: 150px;" onchange="ad.changerExeFrequency();">
										<option value="0">循环执行</option>
										<option value="1">单次执行</option>
									</select>
									<span class="red">*</span>
								</span>
							</li>
							<!-- 0: 循环执行显示区域 -->
							<li id="mileageLi">
								<span style="float:left;"><span id="intervalMileageText">维保间隔里程:</span>
									<input id="intervalMileage" name="tbMaintainPlan.intervalMileage" maxlength="5" style="width: 150px" onkeyup="ad.clearNoNum(this);" />
									<span id="intervalMileageSpan" class="red"></span>
									<span class="red"></span>
								</span>
								<span class="RAdd_Page">提前提醒里程:
									<input id="warnMileage" name="tbMaintainPlan.warnMileage" maxlength="5" style="width: 150px" onkeyup="ad.clearNoNum(this);" />
									<span id="warnMileageSpan" class="red"></span>
									<span class="red"></span>
								</span>
							</li>
							<!-- 1: 单次执行显示区域 -->
							<li id="dayLi">
								 <span id="frequency1" style="float:left;">维保间隔天数:
									 <input id="intervalDays" name="tbMaintainPlan.intervalDays" maxlength="4" style="width: 150px" onkeyup="ad.clearNoNum(this);" />
									 <span id="intervalDaysSpan" class="red"></span>
									 <span class="red"></span>
								 </span>
								 <span id="frequency2" style="float:left;">计划执行时间:
									<input id="exeTime" name="tbMaintainPlan.exeTime" class="Wdate" readonly="readonly" onClick="WdatePicker({minDate:'%y-%M-%d',maxDate:'2099-12-31 23:59:59'});" style="width: 150px" />
									<span id="exeTimeSpan" class="red"></span>
									<span class="red"></span>
								</span>
								<span class="RAdd_Page">提前提醒天数:
									 <input id="warnDays" name="tbMaintainPlan.warnDays" maxlength="4" style="width: 150px" onkeyup="ad.clearNoNum(this);" />
									 <span id="warnDaysSpan" class="red"></span>
									 <span class="red"></span>
								</span>
							</li>
							<li>
								<span style="float:left;">
								<span style="float:left;" id="addMaintainContentSpan">
									维保描述:
									<textarea readonly="readonly" disabled="disabled" cols="40" rows="6" id="addMaintainContent" name="tbMaintainPlan.maintainContent"></textarea>
								</span>
								</span>
							</li>
						</ul>
						</div>
						<div id="maintainLeaveTop" class="button4">
							<input type="submit" id="addPlanSubmitButton" name="addPlanSubmitButton" class="btn_green" style="margin-right:20px;" onmouseover="this.style.backgroundPosition='-100px -50px'" onmouseout="this.style.backgroundPosition='-100px 0px'" value="确定" />
							<input type="button" id="addPlanCloseButton" name="addPlanCloseButton" class="btn_blue" onmouseover="this.style.backgroundPosition='0px -50px'" onmouseout="this.style.backgroundPosition='0px 0px'" value="取消" />
						</div>

					</form>
				</div>
			</div>
		</div>
	</div>
</body>
</html>