<%@ page language="java" contentType="text/html; charset=utf-8"	pageEncoding="utf-8"%>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<title>机务管理--维保统计 </title>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
<script type="text/javascript" src="script/energymanagement/maintain/maintaindetail/maintainStatistics.js"></script>
<script type="text/javascript"	src="script/energymanagement/maintain/maintaindetail/maintainStatisticsLeftTree.js"></script>
<link href="css/vehicleReport/newCtfoPanel.css" rel="stylesheet" type="text/css" />
<link href="css/vehicleReport/mainFrames.css" rel="stylesheet" type="text/css" />
<style>

.QueryListTitle li {
    padding-left: 2px;
}
</style>
</head>
<body>
<div id="maintainStatisticsSet"  style=" margin-top:3px; width:100%;">
	<div class="left_c" id="vehicleStatisticsLeftNavigation" style="float: left;">
	    <div id="accordionStatistics1">
        <div title="按车辆查询" id="panelStatistics3" style="padding-top: 70px;">
<!--          	<div class="panelSearch" style="border-top:#bed5f3 1px solid;"> -->
<!--          		<input type="text" id="threeSearchStatisticsInput" style="margin-left:10px; width:120px;" name="threeSearchInput" value=""/> -->
<!--          		<input type="button" id="searchStatisticsThree" style="float:left; margin:-29px 0 0 150px;" class="btn_inquires" onmouseover="this.style.backgroundPosition='0px -200px'" onmouseout="this.style.backgroundPosition='0px -150px'" value="&nbsp;" /><br> -->
<!--          		<span id="resultStatisticsOper" class="btnNone"> -->
<!--          			<a style="margin-left:15px;" href="javascript:void(0)" id="resultStatisticsUp">上一结果</a> -->
<!--          			<a style="margin:0 20px 0 11px;" href="javascript:void(0);" id="resultStatisticsDown">下一结果</a> -->
<!-- 					<input type="button" id="clearStatisticsResult" class="btn_green" onmouseover="this.style.backgroundPosition='-100px -50px'" onmouseout="this.style.backgroundPosition='-100px 0px'" value="清&nbsp;除" /> -->
<!-- 				</span> -->
<!--          	</div> -->
			<div class="panelSearch">
				<table>
					<tr>
					<td>
					&nbsp;<input type="text" id="threeSearchStatisticsInput" class="noVehicle" style="width:120px;" name="threeSearchStatisticsInput" value="车牌号"/>
					</td>
					<td>
	         		<input type="button" id="searchStatisticsThree"  class="btn_inquires" onmouseover="this.style.backgroundPosition='0px -200px'" onmouseout="this.style.backgroundPosition='0px -150px'" value="&nbsp;" /><br/>
	         		</td>
	         		</tr>
         		<tr id="resultStatisticsOper">
         			<td>
					&nbsp;<select name="vehicleStatisticsResult" id="vehicleStatisticsResult" style="width:120px;" class="srkjl4 w_yy_5"></select>
					</td>
					<td style="padding-top: 3px;">
					<input type="button" id="clearStatisticsResult" value="清除" name="clearStatisticsResult" class="btn_green" onmouseover="this.style.backgroundPosition='-100px -50px'" onmouseout="this.style.backgroundPosition='-100px 0px'"/><br/>
					</td>
         		</tr>
         		</table>
			</div>
         	<div class="panelInner" style="padding: 0px;">
                <ul id="panelConStatistics3">
                </ul>
         	</div>
        </div>
       </div>
	</div>
	<div class="hidden_pop_up_vertical_hidden" id="maintainStatisticsLeftShrink" ><a href="javascript:void(0);">&nbsp;</a></div>
		  <div id="rightContent" class="right_c" style="float: left;">
		    <div class="right_cs" style="border:#c0d7eb 1px solid;">
		    <form id="maintainStatisticsForm" action="#">
		    	<input id="maintainRecordvidInStr" type="hidden" name="maintainRecordvidInStr"/>
		    	<input id="maintainRecordTeamInStr" type="hidden" name="maintainRecordTeamInStr"/>
		          <div>
		          	<ul class="QueryListTitle">
						<li>
							<div>计划维保日期:<input type="text" size="12" id="maintainStatisticsStartDate" readonly="readonly" name="requestParam.equal.startPlanDate" class="Wdate"	onfocus="WdatePicker({maxDate:'2099-12-31 23:59:59'});" />
							至 <input type="text" size="12" readonly="readonly" id="maintainStatisticsEndDate" name="requestParam.equal.endPlanDate" class="Wdate" onfocus="WdatePicker({maxDate:'2099-12-31 23:59:59'});" />
							</div>
						</li>
						<li style="margin-left: 2px;">
							<div>维保状态:<select name="maintainStatisticsStatRecord" id="maintainStatisticsStatRecord" style="width: 88px;" >
								<option value="">全部</option>
								<option value="0">维保期未到</option>
								<option value="1">到期未维保</option>
								<option value="2">已按期维保</option>
								<option value="3">超期已维保</option>
								</select>
							</div>
						</li>
						<li style="margin-left: 2px;">
					       	<div>维保项目:<select id="mainTainStatisticsRecordId"  style="width: 88px;" name="requestParam.equal.maintainRecordId">
							</select>
							</div>
						</li>
						<li style="margin-left: 2px;">
							<input type="submit" class="btn_inquires" onmouseover="this.style.backgroundPosition='0px -200px'" onmouseout="this.style.backgroundPosition='0px -150px'" value="" />
						</li>
						<li>
							<span class="R" id="maintainStatisticsExportButton">
								<input id='maintainStatisticsgridExport' type="button" class="btn_green" onmouseover="this.style.backgroundPosition='-100px -50px'" onmouseout="this.style.backgroundPosition='-100px 0px'" value="导&nbsp;&nbsp;出" />
							</span>
						</li>
		      		</ul>
		          </div>
		    </form>
		    </div>
		        <!-- 图表显示-->
		    <div id="rightCenterChartAndGridAreaMaintain" style="WIDTH:100%;overflow-x: hidden;overflow-y: auto;">
 		        <div class="righChartArea" id="maintainStatisticsChartArea" style="height: 302px;" >
 		            <div class="L" style="width:45%" onmouseover="document.getElementById('vehicleMaintainLeftImg').style.visibility='visible'" onmouseout="document.getElementById('vehicleMaintainLeftImg').style.visibility='hidden'">
 		            	<div class="R" id="leftChartMaintain" style="background:url(images/global/no_data1.png) no-repeat; border:#aaccee 1px solid; width:450px; height:290px;" ></div>
 		            	<div id="vehicleMaintainLeftImg" style="float:right; margin:-280px 405px 0 0;visibility:hidden; cursor: pointer;"><img src="images/global/chart_bar.png" title="点击看大图"/></div>
 		            </div>
 		            <div class="R" style="width:45%" onmouseover="document.getElementById('vehicleMaintainRightImg').style.visibility='visible'" onmouseout="document.getElementById('vehicleMaintainRightImg').style.visibility='hidden'">
 		            	<div class="L" id="rightChartMaintain" style="background:url(images/global/no_data1.png) no-repeat; border:#aaccee 1px solid; width:450px; height:290px;" ></div>
 		            	<div id="vehicleMaintainRightImg" style="float:left; margin:6px 0 0 -440px;visibility:hidden; cursor: pointer;"><img src="images/global/chart_bar.png" title="点击看大图"/></div>
 		            </div>
 		        </div>
 		        <div class="hidden_pop_up_horizontal_pop_up" id="maintainStatisticsShrink" style="display: none;"><a href="javascript:void(0);">&nbsp;</a></div>
   		        <div class="right_center_bottom" id="maintainStatisticsListGridArea">
   		                  <div id="maintainStatisticsTableDiv" class="flex_grid"></div>
				</div>
			</div>
		    </div>
		   </div>
</body>
</html>