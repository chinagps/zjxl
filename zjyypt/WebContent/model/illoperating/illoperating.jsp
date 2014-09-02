<%@ page language="java" contentType="text/html; charset=utf-8"	pageEncoding="utf-8"%>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">  
<html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml">  
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<script type="text/javascript" src="script/illoperating/illoperating.js"></script>
<script type="text/javascript" src="script/illoperating/illoperatingVehicleList.js"></script>
<script type="text/javascript" src="script/illoperating/ioReportChar.js"></script>
<script type="text/javascript"  src="script/util/customReportColumn/customReportColumn.js"></script>
<script type="text/javascript"  src="script/util/customReportColumn/openCustomReportColumn.js"></script>
<title>运行统计|非法营运统计</title>
</head>
<body>
    <div id="illOperatingMain"  style=" margin-top:3px; width:100%;">
        <div class="right_center" id="illOperatingRightCenter" style="float:left;overflow:auto;">
  		<!-- <div class="hidden_pop_up_vertical_hidden" id="illOperatingLeftLeftShrink"><a href="javascript:void(0);">&nbsp;</a></div> -->
		  <div class="right_center_con" style="margin:10px 0 0 0;">
 			<div class="topTabTool" id="illOperatingTabTool">
               <ul id="tags" class="top_tags">
                  <li id='tagIllOperateContent0' class="selectTag"><a onClick="illOperatingMainFrame.selectTag('tagIllOperateContent0')" onmouseover="this.style.backgroundPosition='0 -50px'" onmouseout="this.style.backgroundPosition='0 0'" href="javascript:void(0)">汇总表</a ></li>
                  <li id='tagIllOperateContent1'><a onClick="illOperatingMainFrame.selectTag('tagIllOperateContent1')" onmouseover="this.style.backgroundPosition='0 -50px'" onmouseout="this.style.backgroundPosition='0 0'" href="javascript:void(0)">月报表</a ></li>
                  <li id='tagIllOperateContent2'><a onClick="illOperatingMainFrame.selectTag('tagIllOperateContent2')" onmouseover="this.style.backgroundPosition='0 -50px'" onmouseout="this.style.backgroundPosition='0 0'" href="javascript:void(0)">日报表</a ></li>
               	  
               </ul>
           </div>
         <div id="iORightCenterMainArea">
 		       <div class="righFormArea" id="illOperatingFormArea">
                 <form id="searchFormForIllOperating" name="searchFormForIllOperating" action="##" method="post" style="margin-top:10px;height:50px;">
                    <!-- <input type="hidden"  id="iOCorpIds" name="requestParam.equal.corpIds"/>-->
                 	<input type="hidden"  id="iOTeamIds" name="requestParam.equal.teamIds"/> 
                 	<input type="hidden"  id="iOVids" name="requestParam.equal.vids"/>
                 	<!-- <input type="hidden"  id="lineIds" name="requestParam.equal.lineIds"/> -->
    				<input type="hidden"  id="iOStatType" name="requestParam.equal.statType" value="1"/>
    				<input type="hidden"  id="statTypeForIllOperating" name="statTypeForIllOperating" value="1"/>
    				<!-- <input type="hidden"  id="latitudeForIllOperating" name="latitudeForIllOperating" value="1" /> 左侧导航层级 -->
 		          <div class="L_top5">
 		          <table>
 		          	<tr>
 		          	<td>时间范围&nbsp;&nbsp;</td>
 		          	<td><input type="text" id="startDateForIllOperatingTotal" name="requestParam.equal.startDate" readonly="readonly" class="Wdate" onclick="WdatePicker();" style="height:20px;"/>
 		          	</td><td><input type="text" id="startDateForIllOperatingMonth" name="requestParam.equal.startDateMonth" style="display:none;"  class="Wdate" onfocus="WdatePicker({dateFmt:'yyyy-MM',autoPickDate:true,isShowToday:false})"/>
 		          	</td><td>&nbsp;&nbsp;至&nbsp;&nbsp;
 		          	</td><td><input type="text" id="endDateForIllOperatingTotal" name="requestParam.equal.endDate" readonly="readonly" class="Wdate"	onclick="WdatePicker();" style="height:20px;"/>
 		          	</td><td><input type="text" id="endDateForIllOperatingMonth" name="requestParam.equal.endDateMonth" style="display:none;height:25px;" class="Wdate" onfocus="WdatePicker({dateFmt:'yyyy-MM',autoPickDate:true,isShowToday:false})"/>
 		          	</td><td>&nbsp;&nbsp;<input type="button" id="iOsearchForButton" class="btn_inquires" onmouseover="this.style.backgroundPosition='0px -200px'" onmouseout="this.style.backgroundPosition='0px -150px'" value="" />
 		          	</td><td><input type="submit" id="searchForSubmit" style="display:none"/></td>
 		          	</tr>
 		          </table>
 		          </div>
		          <span style="margin-right:10px;" class="R">
		          	<input type="button" id='customColumnIo' class="btn_blue" onmouseover="this.style.backgroundPosition='0px -50px'" onmouseout="this.style.backgroundPosition='0px 0px'" value="自定义列" />
		          	<input id='ioGridExport' type="button" class="btn_green" onmouseover="this.style.backgroundPosition='-100px -50px'" onmouseout="this.style.backgroundPosition='-100px 0px'" value="导&nbsp;&nbsp;出" />
		          </span>
		         </form>




		        </div>
		     <div id="iORightCenterChartAndGridArea" style="overflow:auto;">
 		        <div class="righChartArea" id="illOperatingChartArea" style="height:308px;">
 		            <div class="L" style="width:45%" onmouseover="document.getElementById('iOLeftImg').style.visibility='visible'" onmouseout="document.getElementById('iOLeftImg').style.visibility='hidden'">
 		            	<div class="R" id="iOLeftChart" style="background:url(images/global/no_data1.png) no-repeat; border:#aaccee 1px solid; width:450px; height:290px;"></div>
 		            	<div id="iOLeftImg" class="btnNone" style="float:right; margin:-280px 405px 0 0;visibility:hidden; cursor: pointer;"><img src="images/global/chart_bar.png" title="点击看大图"/></div>
 		            </div>
 		            <div class="R" style="width:45%" onmouseover="document.getElementById('iORightImg').style.visibility='visible'" onmouseout="document.getElementById('iORightImg').style.visibility='hidden'">
 		            	<div class="L" id="iORightChart" style="background:url(images/global/no_data1.png) no-repeat; border:#aaccee 1px solid; width:450px; height:290px;"></div>
 		            	<div id="iORightImg" class="btnNone" style="float:left; margin:6px 0 0 -440px;visibility:hidden; cursor: pointer;"><img src="images/global/chart_bar.png" title="点击看大图"/></div>
 		            </div>
 		        </div>
		        <div class="hidden_pop_up_horizontal_pop_up" id="illOperatingShrink"><a href="javascript:void(0);">&nbsp;</a></div>
   		        <div class="right_center_bottom" id="illOperatingListGridArea" style="overflow:auto;">
   		                  <div id="resultTableDivForIllOperating" class="flex_grid"></div>
				</div>
			</div>
		</div>
	  </div>
	</div>
</div>
</body>
</html>
