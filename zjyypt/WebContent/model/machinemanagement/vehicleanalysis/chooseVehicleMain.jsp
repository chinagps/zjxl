<%@ page language="java" contentType="text/html; charset=utf-8"	pageEncoding="utf-8"%>


<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<script type="text/javascript" src="script/machinemanagement/vehicleanalysis/chooseVehicleMain.js"></script>
<title>机务管理-单车分析报告</title>

<script type="text/javascript">
</script>
</head>
<body onload="">
<div class="kcptWindow_qyzx" style="width: 900px;">
	<div class="kcptWindow_top" style="width: 900px;">
        <div class="kcptWindow_top_img"><img src="images/global/chooseVehicle/car.png" /></div>
        <div id="econdrvClose" class="kcptWindow_top_close"><img src="images/global/topRightClose.png" onmouseover="this.src='images/global/topRightCloseHover.png'" onmouseout="this.src='images/global/topRightClose.png'" /></div>
        <div class="kcptWindow_top_text"><h4 style="color:#ffffff">车辆选择(<span class="red">*</span>为必填项)</h4></div>
    </div>
    <div class="kcptWindow_main" style="padding:10px;">
    	<div class="oilwear_trendtext">
    		<form id="selectedVehicleInfoFrom" name="selectedVehicleInfoFrom" method="post">
			  <input id="updatePageSelectedVehicleVids" type="hidden" name="requestParam.equal.updatePageSelectedVehicleVids"/>
		    </form>
            <table width="95%" height="45" cellspacing="0" border="0" cellpadding="0" style="font-size:12px;">
              <tr>
                <td nowrap width="29%"><b>车牌号：</b>
                	<input type="text" id="vehicaleNum" name="vehicaleNum" style="width: 110px;" onkeypress="chooseVehicleMain.pressSelVehicleKey(window.event);"/>
                	<img id="findVehicle" style="cursor: pointer;"	src="images/global/big.png" onclick="chooseVehicleMain.openXczsWin();"/>
                	<a id="showSelectedVehicle" name="showSelectedVehicle" title="查询已选车辆"	 style="cursor: pointer;" />
                </td>
                <td nowrap width="25%">
                	<b>生成时间：</b>
                	<input type="text" id="startDateMin"
						name="requestParam.equal.startDate" readonly="readonly" class="Wdate"
						onClick="WdatePicker({dateFmt: 'yyyy-MM-dd'});" style="width: 85px;"/><span class="red">*</span>
                </td>
                <td nowrap width="25%">
                	<b>至：</b>
                	<input type="text" id="endDateMin"
						name="requestParam.equal.endDate" readonly="readonly" class="Wdate"
						onClick="WdatePicker({dateFmt: 'yyyy-MM-dd'});" style="width: 85px;"/><span class="red">*</span>
                </td>
                <td nowrap width="21%" align="center">
                	<input id="createReports" type="button" class="btn_blue" onmouseover="this.style.backgroundPosition='0px -50px'" onmouseout="this.style.backgroundPosition='0px 0px'" value="生成" />
                	<input id="goBackPage" type="button" class="btn_blue" onmouseover="this.style.backgroundPosition='0px -50px'" style="margin-left: 25px;" onmouseout="this.style.backgroundPosition='0px 0px'" value="返回" />
                </td>
              </tr>
            </table>
        </div>
        <!--
		<div class="oilwear_powerm_tab3">
        	<ul>
            	<li id="viewId1" class="h"><a href="javascript:owv.queryViewType('1',$('#vid').val(),$('#qType').val(),$('#sd').html(),$('#sDate').html(),$('#eDate').html());"><b>油耗趋势</b></a></li>
                <li id="viewId2"><a href="javascript:owv.queryViewType('2',$('#vid').val(),$('#qType').val(),$('#sd').html(),$('#sDate').html(),$('#eDate').html());"><b>节油驾驶</b></a></li>
                <li id="viewId3"><a href="javascript:owv.queryViewType('3',$('#vid').val(),$('#qType').val(),$('#sd').html(),$('#sDate').html(),$('#eDate').html());"><b>节油时间</b></a></li>
                <li id="viewId4"><a href="javascript:owv.queryViewType('4',$('#vid').val(),$('#qType').val(),$('#sd').html(),$('#sDate').html(),$('#eDate').html());"><b>车速分析</b></a></li>
                <li id="viewId5"><a href="javascript:owv.queryViewType('5',$('#vid').val(),$('#qType').val(),$('#sd').html(),$('#sDate').html(),$('#eDate').html());"><b>转速分析</b></a></li>
            </ul>
        </div>
         -->
         <div id="chooseVehicleInfoTableDiv"></div>
    </div>
    <div class="kcptWindow_bottom">
        <div class="kcptWindow_bottom_middle"></div>
    </div>
</div>
</body>

</html>