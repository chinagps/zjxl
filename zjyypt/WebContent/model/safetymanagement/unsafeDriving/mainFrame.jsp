<%@ page language="java" contentType="text/html; charset=utf-8"	pageEncoding="utf-8"%>


<html>
<head>
<title>安全驾驶主框架</title>
<script type="text/javascript" src="script/safetymanagement/unsafeDriving/mainFrame.js"></script>
<script type="text/javascript"  src="script/util/customReportColumn/customReportColumn.js"></script>
<script type="text/javascript"  src="script/util/generalChart.js"></script>
<script type="text/javascript"  src="script/util/customReportColumn/openCustomReportColumn.js"></script>
<script type="text/javascript"	src="script/safetymanagement/unsafeDriving/vehicleList.js"></script>
<script type="text/javascript"  src="script/safetymanagement/unsafeDriving/unsafeDrivingLeftPanel.js"></script>
<link href="css/unsafeDriving/newCtfoPanel.css" rel="stylesheet" type="text/css" />
<link href="css/unsafeDriving/mainFrames.css" rel="stylesheet" type="text/css" />
</head>
<body>
 <div id="unsafeDrivingMain"  style=" margin-top:3px; width:99.8%;">
	  	<div class="left_c_unsafeDriving" id="unsafeDrivingLeftNavigation">
	  	<div id="accordion1">
         <div title="按组织查询" id="panel1">
	         <div class="panelInner">
	              <ul id="panelCon1">
	               </ul>
	         </div>
        </div>
         <div title="按车队查询" id="panel2">
         	<div class="panelInner">
                <ul id="panelCon2">
                </ul>
         	</div>
        </div>
         <div title="按车辆查询" id="panel3" style="padding-top: 70px;">
<!--          	<div class="panelSearch" style=" border-top:#bed5f3 1px solid;"> -->
<!--          		<input type="text" id="threeSearchInput" style="margin-left:10px; width:120px;" name="threeSearchInput" value=""/> -->
<!--          		<input type="button" id="searchThree" style="float:left; margin:-29px 0 0 148px;" class="btn_inquires" onmouseover="this.style.backgroundPosition='0px -200px'" onmouseout="this.style.backgroundPosition='0px -150px'" value="&nbsp;" /><br/> -->

<!-- 				<input type="button" id="clearResult" class="btn_green" onmouseover="this.style.backgroundPosition='-100px -50px'" onmouseout="this.style.backgroundPosition='-100px 0px'" value="清&nbsp;除" /> -->

<!--          	</div> -->
				<div class="panelSearch" style="height: 48px;">
					&nbsp;<input type="text" id="threeSearchInput" class="noVehicle" style="margin-left:10px; width:120px;" name="threeSearchInput" value="车牌号"/>
	         		<input type="button" id="searchThree" style="float:left; margin:-24px 0 0 150px;"  class="btn_inquires" onmouseover="this.style.backgroundPosition='0px -200px'" onmouseout="this.style.backgroundPosition='0px -150px'" value="&nbsp;" /><br/>
         			<span id="resultOper" style="display:block;">
					&nbsp;&nbsp;<select name="vehicleResult" id="vehicleResult" style="margin:5px 5px; width:120px;" class="srkjl4 w_yy_5"></select>
	         		&nbsp;
					<input type="button" id="clearResult"
					value="清除" name="clearResult" style="float:left; margin:-25px 0 0 150px;" class="btn_green" onmouseover="this.style.backgroundPosition='-100px -50px'" onmouseout="this.style.backgroundPosition='-100px 0px'"/><br>
         		</span>
				</div>
         	<div class="panelInner" id="vehiclePanel">
                <ul id="panelCon3">
                </ul>
         	</div>
        </div>
         <div title="按线路查询" id="panel4">
         	<div class="panelInner">
                <ul id="panelCon4">
                </ul>
         	</div>
        </div>
    <!-- <div title="按驾驶员查询" id="panel5">
         	<div class="panelInner">
                <ul id="panelCon5">
                </ul>
	       	 </div>
        </div>
        -->
       </div>
        </div>
		<div class="right_center" id="unsafeDrivingRightCenter">
		  <div class="hidden_pop_up_vertical_hidden" id="unsafeDrivingLeftLeftShrink" ><a href="javascript:void(0);">&nbsp;</a></div>
		  <div class="right_center_con">
 			<div class="topTabTool" id="unsafeDrivingTabTool">
               <ul id="tags" class="top_tags">
                  <li id='tagContent0' class="selectTag"><a onClick="unsafeDrivingMainFrame.selectTag('tagContent0')" onmouseover="this.style.backgroundPosition='0 -50px'" onmouseout="this.style.backgroundPosition='0 0'" href="javascript:void(0)">汇总表</a ></li>
                  <li id='tagContent1'><a onClick="unsafeDrivingMainFrame.selectTag('tagContent1')" onmouseover="this.style.backgroundPosition='0 -50px'" onmouseout="this.style.backgroundPosition='0 0'" href="javascript:void(0)">月报表</a ></li>
                  <li id='tagContent2'><a onClick="unsafeDrivingMainFrame.selectTag('tagContent2')" onmouseover="this.style.backgroundPosition='0 -50px'" onmouseout="this.style.backgroundPosition='0 0'" href="javascript:void(0)">日报表</a ></li>
               </ul>
           </div>
         <div id="rightCenterMainArea">
 		       <div class="righFormArea" id="unsafeDrivingFormArea">
                 <form id="searchFormForUnsafeDriving" name="searchFormForUnsafeDriving" action="##" method="POST" style="margin-top:10px;">
                    <input type="hidden"  id="corpIds" name="requestParam.equal.corpIds"/>
                 	<input type="hidden"  id="teamIds" name="requestParam.equal.teamIds"/>
                 	<input type="hidden"  id="vids" name="requestParam.equal.vids"/>
                 	<input type="hidden"  id="lineIds" name="requestParam.equal.lineIds"/>
    				<input type="hidden"  id="statType" name="requestParam.equal.statType" value="1"/>
    				<input type="hidden"  id="statTypeForUnsafeDriving" name="statTypeForUnsafeDriving" value="1"/>
    				<input type="hidden"  id="latitudeForUnsafeDriving" name="latitudeForUnsafeDriving" value="1" />
 		          <div class="L_top5">
 		          	<table>
 		          	<tr>
 		          	<td>时间范围&nbsp;&nbsp;</td>
 		          	<td><input type="text" id="startDateForUnSafeDrivingTotal" name="requestParam.equal.startDate" readonly="readonly" class="Wdate" onClick="WdatePicker();" />
 		          	</td><td><input type="text" id="startDateForUnSafeDrivingMonth" name="requestParam.equal.startDateMonth" style="display:none"  class="Wdate" onfocus="WdatePicker({dateFmt:'yyyy-MM',autoPickDate:true,isShowToday:false})"/>
 		          	</td><td>&nbsp;&nbsp;至&nbsp;&nbsp;
 		          	</td><td><input type="text" id="endDateForUnSafeDrivingTotal" name="requestParam.equal.endDate" readonly="readonly" class="Wdate"	onClick="WdatePicker();" />
 		          	</td><td><input type="text" id="endDateForUnSafeDrivingMonth" name="requestParam.equal.endDateMonth" style="display:none" class="Wdate" onfocus="WdatePicker({dateFmt:'yyyy-MM',autoPickDate:true,isShowToday:false})"/>
 		          	</td><td>&nbsp;&nbsp;<input type="button" id="searchForButton" style="margin-top:-2px;" class="btn_inquires" onmouseover="this.style.backgroundPosition='0px -200px'" onmouseout="this.style.backgroundPosition='0px -150px'" value="" />
 		          	</td><td><input type="submit" id="searchForSubmit" style="display:none"  /></td>
 		          	</tr>
 		          	</table>
 		          </div>
		          <span style="margin-right:10px;" class="R">
		          	<input type="button" id='customColumn' class="btn_blue" onmouseover="this.style.backgroundPosition='0px -50px'" onmouseout="this.style.backgroundPosition='0px 0px'" value="自定义列" />
		          	<input id='gridExport' type="button" class="btn_green" onmouseover="this.style.backgroundPosition='-100px -50px'" onmouseout="this.style.backgroundPosition='-100px 0px'" value="导&nbsp;&nbsp;出" />
		          </span>
		         </form>




		        </div>
		     <div id="rightCenterChartAndGridArea" style="OVERFLOW-X:auto;OVERFLOW:auto;">
 		        <div class="righChartArea" id="unsafeDrivingChartArea"  style="height: 302px;">
 		            <div class="L" style="width:45%" onmouseover="document.getElementById('leftImg').style.visibility='visible'" onmouseout="document.getElementById('leftImg').style.visibility='hidden'">
 		            	<div class="R" id="leftChart" style="background:url(images/global/no_data1.png) no-repeat; border:#aaccee 1px solid; width:450px; height:290px;"></div>
 		            	<div id="leftImg" class="btnNone" style="float:right; margin:-280px 405px 0 0;visibility:hidden; cursor: pointer;"><img src="images/global/chart_bar.png" title="点击看大图"/></div>
 		            </div>
 		            <div class="R" style="width:45%" onmouseover="document.getElementById('rightImg').style.visibility='visible'" onmouseout="document.getElementById('rightImg').style.visibility='hidden'">
 		            	<div class="L" id="rightChart" style="background:url(images/global/no_data1.png) no-repeat; border:#aaccee 1px solid; width:450px; height:290px;"></div>
 		            	<div id="rightImg" class="btnNone" style="float:left; margin:6px 0 0 -440px;visibility:hidden; cursor: pointer;"><img src="images/global/chart_bar.png" title="点击看大图"/></div>
 		            </div>
 		        </div>
		        <div class="hidden_pop_up_horizontal_pop_up" id="unsafeDrivingShrink" ><a href="javascript:void(0);">&nbsp;</a></div>
   		        <div class="right_center_bottom" id="unsafeDrivingListGridArea">
   		                  <div id="resultTableDivForUnsafeDriving" class="flex_grid"></div>
				</div>
			</div>
		</div>
	  </div>
	</div>
</div>
</body>
</html>