<%@ page language="java" contentType="text/html; charset=utf-8"	pageEncoding="utf-8"%>



<html>
<head>
<title>告警统计主框架</title>
<script type="text/javascript"   src="script/safetymanagement/alarmStatistics/alarmStatisticsMainFrame.js"></script>
<script type="text/javascript"  src="script/util/customReportColumn/customReportColumn.js"></script>
<script type="text/javascript"  src="script/util/customReportColumn/openCustomReportColumn.js"></script>
<script type="text/javascript"	src="script/safetymanagement/alarmStatistics/alarmStatisticsGridList.js"></script>
<script type="text/javascript"  src="script/safetymanagement/alarmStatistics/leftPanelForAlarm.js"></script>
<link href="css/unsafeDriving/newCtfoPanel.css" rel="stylesheet" type="text/css" />
<link href="css/unsafeDriving/mainFrames.css" rel="stylesheet" type="text/css" />
</head>
<body>
 <div id="alarmStatisticsMain"  style=" margin-top:3px; width:99.8%;">
	  	<div class="left_c" id="alarmStatisticsLeftNavigation" style="float: left;">
	  	<div id="accordion1">
         <div title="按组织查询" id="panel1" style="width:239px;">
	         <div class="panelInner">
	              <ul id="panelCon1">
	               </ul>
	         </div>
        </div>
         <div title="按车队查询" id="panel2" style="width:239px;">
         	<div class="panelInner">
                <ul id="panelCon2">
                </ul>
         	</div>
        </div>
         <div title="按车辆查询" id="panel3" style="padding-top: 70px;width:239px;">
<!--          	<div class="panelSearch" style=" border-top:#bed5f3 1px solid;"> -->
<!--          		<input type="text" id="threeSearchInput" style="margin-left:10px; width:120px;" name="threeSearchInput" value=""/> -->
<!--          		<input type="button" id="searchThree" style="float:left; margin:-29px 0 0 148px;" class="btn_inquires" onmouseover="this.style.backgroundPosition='0px -200px'" onmouseout="this.style.backgroundPosition='0px -150px'" value="&nbsp;" /><br/> -->

<!-- 				<input type="button" id="clearResultForAlarm" class="btn_green" onmouseover="this.style.backgroundPosition='-100px -50px'" onmouseout="this.style.backgroundPosition='-100px 0px'" value="清&nbsp;除" /> -->

<!--          	</div> -->
				<div class="panelSearch" style="height:48px;">
					&nbsp;<input type="text" id="threeSearchInput" class="noVehicle" style="margin-left:10px; width:120px;" name="threeSearchInput" value="车牌号"/>
	         		<input type="button" id="searchThree" style="float:left; margin:-24px 0 0 150px;"  class="btn_inquires" onmouseover="this.style.backgroundPosition='0px -200px'" onmouseout="this.style.backgroundPosition='0px -150px'" value="&nbsp;" /><br/>
         			<span id="resultOper" style="display:block;">
					&nbsp;&nbsp;<select name="vehicleResult" id="vehicleResult" style="margin:5px 5px; width:120px;" class="srkjl4 w_yy_5"></select>
	         		&nbsp;
					<input type="button" id="clearResultForAlarm"
					value="清除" name="clearResultForAlarm" style="float:left; margin:-25px 0 0 150px;" class="btn_green" onmouseover="this.style.backgroundPosition='-100px -50px'" onmouseout="this.style.backgroundPosition='-100px 0px'"/><br>
         		</span>
				</div>
         	<div class="panelInner" id="vehiclePanel">
                <ul id="panelCon3">
                </ul>
         	</div>
        </div>
        <!--  <div title="按线路查询" id="panel4" style="width:239px;">
         	<div class="panelInner">
                <ul id="panelCon4">
                </ul>
         	</div>
        </div> -->
    <!-- <div title="按驾驶员查询" id="panel5">
         	<div class="panelInner">
                <ul id="panelCon5">
                </ul>
	       	 </div>
        </div>
        -->
       </div>
        </div>
		<div class="right_center" id="alarmStatisticsRightCenter" style="float: left;overflow:auto;">
			<div class="hidden_pop_up_vertical_hidden" id="alarmStatisticsLeftLeftShrink" ><a href="javascript:void(0);">&nbsp;</a></div>
		  <div class="right_center_con" style="margin:10px 0 0 0;">
 			<div class="topTabTool" id="alarmStatisticsTabTool">
               <ul id="tags" class="top_tags">
                  <li id='tagContent0' class="selectTag"><a onClick="alarmStatisticsMainFrame.selectTag('tagContent0')" onmouseover="this.style.backgroundPosition='0 -50px'" onmouseout="this.style.backgroundPosition='0 0'" href="javascript:void(0)">汇总表</a ></li>
                  <li id='tagContent1'><a onClick="alarmStatisticsMainFrame.selectTag('tagContent1')" onmouseover="this.style.backgroundPosition='0 -50px'" onmouseout="this.style.backgroundPosition='0 0'" href="javascript:void(0)">月报表</a ></li>
                  <li id='tagContent2'><a onClick="alarmStatisticsMainFrame.selectTag('tagContent2')" onmouseover="this.style.backgroundPosition='0 -50px'" onmouseout="this.style.backgroundPosition='0 0'" href="javascript:void(0)">日报表</a ></li>
               </ul>
           </div>
         <div id="rightCenterMainArea">
 		       <div class="righFormArea" id="alarmStatisticsFormArea">
                 <form id="searchFormForAlarmStatistics" name="searchFormForAlarmStatistics" action="##" method="POST" style="margin-top:10px;">
                    <input type="hidden" id="corpIds" name="requestParam.equal.corpIds"/>
                 	<input type="hidden" id="teamIds" name="requestParam.equal.teamIds"/>
                 	<input type="hidden" id="vids" name="requestParam.equal.vids"/>
                 	<input type="hidden" id="lineIds" name="requestParam.equal.lineIds"/>
    				<input type="hidden" id="statTypeForAlarm" name="requestParam.equal.statType" value="1"/>
    				<input type="hidden" id="statTypeForAlarmStatistics" name="statTypeForAlarmStatistics" value="1"/>
    				<input type="hidden" id="latitudeForAlarmStatistics" name="latitudeForAlarmStatistics" value="1" />
 		          <span class="L_top5">时间范围
 		          	<input type="text" id="startDateForAlarmStatisticsTotal" name="requestParam.equal.startDate" readonly="readonly" class="Wdate" onClick="WdatePicker();" />
 		          	<input type="text" id="startDateForAlarmStatisticsMonth" name="requestParam.equal.startDateMonth" style="display:none"  class="Wdate" onfocus="WdatePicker({dateFmt:'yyyy-MM',autoPickDate:true,isShowToday:false})"/>至
 		          	<input type="text" id="endDateForAlarmStatisticsTotal" name="requestParam.equal.endDate" readonly="readonly" class="Wdate"	onClick="WdatePicker();" />
 		          	<input type="text" id="endDateForAlarmStatisticsMonth" name="requestParam.equal.endDateMonth" style="display:none" class="Wdate" onfocus="WdatePicker({dateFmt:'yyyy-MM',autoPickDate:true,isShowToday:false})"/>
 		          	<input type="button" id="searchForButtonForAlarmStatistics" style="margin-top:-6px;" class="btn_inquires" onmouseover="this.style.backgroundPosition='0px -200px'" onmouseout="this.style.backgroundPosition='0px -150px'" value="" />
 		          	<input type="submit" id="searchForSubmit" style="display:none"  />
 		          </span>
		          <span style="margin-right:10px;" class="R">
		          	<input type="button" id='customColumn' class="btn_blue" onmouseover="this.style.backgroundPosition='0px -50px'" onmouseout="this.style.backgroundPosition='0px 0px'" value="自定义列" />
		          	<input id='gridExport' type="button" class="btn_green" onmouseover="this.style.backgroundPosition='-100px -50px'" onmouseout="this.style.backgroundPosition='-100px 0px'" value="导&nbsp;&nbsp;出" />
		          </span>
		         </form>




		        </div>
		     <div id="rightCenterChartAndGridArea" style="overflow-x: hidden;overflow-y: auto;">
 		        <div class="righChartArea" id="alarmStatisticsChartArea" style="height:305px;">
 		             <div class="L" style="width:45%" onmouseover="document.getElementById('leftImg').style.visibility='visible'" onmouseout="document.getElementById('leftImg').style.visibility='hidden'">
 		            	<div class="R" id="leftChart" style="background:url(images/global/no_data1.png) no-repeat; border:#aaccee 1px solid; width:450px; height:290px;"></div>
 		            	<div id="leftImg" class="btnNone" style="float:right; margin:-280px 405px 0 0;visibility:hidden; cursor: pointer;"><img src="images/global/chart_bar.png" title="点击看大图"/></div>
 		            </div>
 		            <div class="R" style="width:45%" onmouseover="document.getElementById('rightImg').style.visibility='visible'" onmouseout="document.getElementById('rightImg').style.visibility='hidden'">
 		            	<div class="L" id="rightChart" style="background:url(images/global/no_data1.png) no-repeat; border:#aaccee 1px solid; width:450px; height:290px;"></div>
 		            	<div id="rightImg" class="btnNone" style="float:left; margin:6px 0 0 -440px;visibility:hidden; cursor: pointer;"><img src="images/global/chart_bar.png" title="点击看大图"/></div>
 		            </div>
 		        </div>
		        <div class="hidden_pop_up_horizontal_pop_up" id="alarmStatisticsShrink"><a href="javascript:void(0);">&nbsp;</a></div>
   		        <div class="right_center_bottom" id="alarmStatisticsListGridArea">
   		                  <div id="resultTableDivForAlarmStatistics" class="flex_grid"></div>
				</div>
			</div>
		</div>
	  </div>
	</div>
</div>
</body>
</html>