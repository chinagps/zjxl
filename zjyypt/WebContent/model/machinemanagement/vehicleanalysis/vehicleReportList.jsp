<%@ page language="java" contentType="text/html; charset=utf-8"	pageEncoding="utf-8"%>


<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>机务管理|单车分析报告</title>
<script type="text/javascript"	src="script/machinemanagement/vehicleanalysis/vehicleReportList.js"></script>
<script type="text/javascript"	src="script/machinemanagement/vehicleanalysis/vehicleReportLeftTree.js"></script>
<link href="css/unsafeDriving/newCtfoPanel.css" rel="stylesheet" type="text/css" />
<link href="css/unsafeDriving/mainFrames.css" rel="stylesheet" type="text/css" />
</head>
<body>
 <div id="vehicleReportMain"  style=" margin-top:3px;">
 	  <!-- 该提交按钮的作用主要用于屏蔽焦点 -->
 	  <input type="submit" style="width: 0px;height: 0px; display:none" />
	  <div class="left_c_unsafeDriving" id="vehicleReportLeftNavigation">
	  	<div id="accordionMain">
         <div title="按车辆查询" id="vrPanel3" style="padding-top: 70px;width: 238px;">
         	<div class="panelSearch">
				<table>
				<tr>
					<td>
					&nbsp;<input type="text" id="threeSearchInputDcVr" class="noVehicle" style="width:120px;" name="threeSearchInput" value="车牌号"/>
					</td>
					<td>
	         		<input type="button" id="searchThreeVr"  class="btn_inquires" onmouseover="this.style.backgroundPosition='0px -200px'" onmouseout="this.style.backgroundPosition='0px -150px'" value="&nbsp;" /><br/>
	         		</td>
	         	</tr>
         		<tr id="resultOperDcVr" >
         			<td>
					&nbsp;<select name="threeSearchResult" id="threeSearchResult" style="width:120px;padding: 0px;" class="srkjl4 w_yy_5"></select>
	         		&nbsp;
	         		</td>
	         		<td style="padding-top: 3px;">
					<input type="button" id="clearResultDcVr"
					value="清除" name="clearResultDcVr"  class="btn_green" onmouseover="this.style.backgroundPosition='-100px -50px'" onmouseout="this.style.backgroundPosition='-100px 0px'"/><br>
					</td>
         		</tr>
         		</table>
         	</div>
         	<div class="panelInner" id="TreeContineDiv" >
                <ul id="panelConVr3" style="width: 238px;">
                </ul>
         	</div>
        </div>
       </div>
      </div>
  	<table id="vehicleReportTable">
  	<tr><td>	
  		<div class="hidden_pop_up_vertical_hidden" id="vehicleReportLeftLeftShrink" style="margin-top: 0px;"><a href="javascript:void(0);">&nbsp;</a></div>
	</td><td>	
		<div class="right_center" id="vehicleReportRightCenter">
		  <div class="right_center_con">
          <div id="rightCenterMainArea">
 		       <div class="righFormArea" style="margin:0 0 10px 0;" id="vehicleReportFormArea">
                 <form id="searchVehicleReportForm" name="searchVehicleReportForm" action="##" method="get" style="margin-top:10px;">
                 	<input type="hidden" id="reportVehicleNos" name="requestParam.like.vids" />
                 	<input type="hidden" id="reportTeamids" name="requestParam.like.teamIds" />
 		          <span class="L_top5">报告生成时间:
 		          	<input type="text" id="startDateVra" style="margin-right:15px;"
						name="requestParam.equal.startDate" readonly="readonly" class="Wdate"
						onclick="WdatePicker({dateFmt: 'yyyy-MM-dd'});" style="width: 100px;"/>至
 		          	<input type="text" id="endDateVra" style="margin:0 30px 0 10px;"
						name="requestParam.equal.endDate" readonly="readonly" class="Wdate"
						onclick="WdatePicker({dateFmt: 'yyyy-MM-dd'});" style="width: 100px;"/>
					状态：<select name="requestParam.equal.cstate" id="searchVehicleReportForm_requestParam_equal_cstate" style="width:80px;">
    <option value=""
    >请选择</option>
    <option value="1">成功</option>
    <option value="2">失败</option>
    <option value="0">生成中</option>


</select>

 		          	<input type="submit" id="searchForButton" style="margin-top:-6px;" class="btn_inquires" onmouseover="this.style.backgroundPosition='0px -200px'" onmouseout="this.style.backgroundPosition='0px -150px'" value="" />
 		          </span>
		          <span style="margin-right:10px;" class="R">
		          	<input type="button" id="createRepSel" name="createRepSel" class="btn_green" onmouseover="this.style.backgroundPosition='-100px -50px'" onmouseout="this.style.backgroundPosition='-100px 0px'" onclick="vehiclerport.openXcWin();" value="生成报告" />
		          </span>
		         </form>




		     </div>
		     <div  style="display:none" >
				 <form id="downloadPDFFrom" name="downloadPDFFrom" action="vehicleanalysis/downLoadPDF.action" method="get">
				    <input id="reportPDFurl" type="hidden" name="reportPDFurl" />
				 	<input id="downLoadPdfButton"  type="submit" value="pdf下载" />
				 </form>




				 <form id="downloadHtmlFrom" name="downloadHtmlFrom" action="vehicleanalysis/downLoadHtml.action" method="get">
				    <input id="reportHtmlurl" type="hidden" name="reportHtmlurl" />
				 	<input id="downLoadHtmlButton"  type="submit" value="html下载" />
				 </form>




				 <a href="www.baidu.com" target="blank" id="vrTurnHtmlHref"><span id="vrTurnHtml">htmlyula</span></a>
			</div>
		     <div id="vehicleReportTableDiv" class="flex_grid"></div>
		</div>
	  </div>
		</div>
	</td></tr>
	</table>
</div>
</body>
</html>
