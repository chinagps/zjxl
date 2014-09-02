<%@ page language="java" contentType="text/html; charset=utf-8"	pageEncoding="utf-8"%>


<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>机务管理|维保记录维护</title>
<script type="text/javascript"	src="script/energymanagement/maintain/maintaindetail/maintainRecord.js"></script>
<script type="text/javascript"	src="script/energymanagement/maintain/maintaindetail/maintainDetailLeftTree.js"></script>
<link href="css/vehicleReport/newCtfoPanel.css" rel="stylesheet" type="text/css" />
<link href="css/vehicleReport/mainFrames.css" rel="stylesheet" type="text/css" />
</head>
<body>
<div id="maintainRecordManagement" style=" margin-top:3px; width:100%;">
<div class="left_c" id="vehicleRecordLeftNavigation" style="float:left;">
        <div id="accordionRecord1">
        <div title="按车辆查询" id="panelRecord3" style="padding-top: 70px;overflow:hidden;">
			<div class="panelSearch">
				<table>
				<tr>
					<td>
					&nbsp;<input type="text" id="threeSearchRecordInput" class="noVehicle" style="width:120px;" name="threeSearchRecordInput" value="车牌号"/>
					</td>
					<td>
	         		<input type="button" id="searchReportThree"  class="btn_inquires" onmouseover="this.style.backgroundPosition='0px -200px'" onmouseout="this.style.backgroundPosition='0px -150px'" value="&nbsp;" /><br/>
	         		</td>
	         	</tr>
         		<tr id="resultRecordOper" >
         			<td>
					&nbsp;<select name="vehicleRecordResult" id="vehicleRecordResult" style="width:120px;padding: 0px;" class="srkjl4 w_yy_5"></select>
	         		&nbsp;
	         		</td>
	         		<td style="padding-top: 3px;">
					<input type="button" id="clearRecordResult"
					value="清除" name="clearRecordResult"  class="btn_green" onmouseover="this.style.backgroundPosition='-100px -50px'" onmouseout="this.style.backgroundPosition='-100px 0px'"/><br>
					</td>
         		</tr>
         		</table>
			</div>
         	<div class="panelInner" style="padding:0px">
                <ul id="panelConRecord3" style="overflow: auto;">
                </ul>
         	</div>
        </div>
       </div>
</div>
<!-- 缩放 -->
<div class="hidden_pop_up_vertical_hidden" id="maintainRecordLeftShrink" style="float:left;"><a href="javascript:void(0);">&nbsp;</a></div>
<!-- 右侧 -->
<div id="maintainManagementMainArea" class="right_center" style="float:left">
	<div id="maintainManagementRightArea" class="right_c">
		<div class="right_cs" style="border:none;">
		 <form id="maintainRecordSearchForm" name="maintainRecordSearchForm" action="#" method="post">
			<input id="maintainRecordvidInStr" type="hidden" name="maintainRecordvidInStr"/>
			<input id="maintainRecordTeamInStr" type="hidden" name="maintainRecordTeamInStr"/>
			<div class="Backstage">
			<ul class="MaintainPlanQueryListTitle" style="padding:10px 0;">
				<li style="margin-left: 30px;">
		        <div>维保项目：<select id="mainTainRecordId"  style="width: 118px;" name="requestParam.equal.maintainRecordId">
				</select>
				</div>
				</li>
				<li style="margin-left: 30px;">
					<div>维保状态：<select name="requestParam.equal.maintainStat" id="maintainStatRecord" style="width: 118px;" >
					<option value="all">全部</option>
					<option value="0">未维护</option>
					<option value="1">已维护</option>
					</select>
					</div>
				</li>
				<li style="margin-left: 30px;">
		        <div>维保计划号：
		        	<input type="text" name="requestParam.like.planCode" class="srkjl4" maxlength="400" />
				</div>
				</li>
				<li>
				<div>
					<span style="margin-left:50px;">
						<input type="submit" class="btn_inquires" onmouseover="this.style.backgroundPosition='0px -200px'" onmouseout="this.style.backgroundPosition='0px -150px'" value="" />
					</span>
				</div>
				</li>
		 	</ul>
			</div>
		</form>




		</div>
		<div class="right_cc">
			<div align="left" class="right_cdc2" style="margin:5px auto;">
			<span class="L">维保计划列表</span>
			<span class="R">
				<span id="recordMaintainRecordBottonSpan" style="float:left;">
					<input type="submit" id="batchEditButton" title="批量维护" class="btn_green" onclick="maintainRecordManager.maintainRecordUpdate()" onmouseover="this.style.backgroundPosition='-100px -50px'" onmouseout="this.style.backgroundPosition='-100px 0px'" value="维护" />
				</span>&nbsp;
				<span id="maintainBottonSpan" title="导出维保记录">
					<input id='gridExport' type="button" class="btn_green" onmouseover="this.style.backgroundPosition='-100px -50px'" onmouseout="this.style.backgroundPosition='-100px 0px'" value="导&nbsp;&nbsp;出" />
				</span>
			</span>
			</div>
		<div id="maintainRecordTableDiv"></div>
		</div>
	</div>
</div>
</div>
</body>
</html>