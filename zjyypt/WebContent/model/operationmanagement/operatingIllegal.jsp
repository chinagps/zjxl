<%@ page language="java" contentType="text/html; charset=utf-8"	pageEncoding="utf-8"%>

    
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<script type="text/javascript" src="script/operationmanagement/operatingIllegal.js"></script>
<title>运营统计|运营违规统计</title>

</head>
 <body>
 <div>

<div class="content">
<div class="right_c">
<div class="right_cs">
<div class="right_ct">

 <form id="operatingIllegalform" action="#">
 <input id="operatingIllegalvidInStr" type="hidden" name="vidInStr" />
 <input id="type" type="hidden"/>
 <input id="time" type="hidden"/>
 <input id="uri" type="hidden"/>
 <input id="vehicleNo" type="hidden"/>
 <div class="right_titlechos">
<span class="L">
	  <input id="timelineoperatingIllegal" name="requestParam.equal.timeline" type="radio" class="checkbox" value="0" checked="checked"/>时段：

	  <select name="requestParam.equal.timeBucket" id="timeBucket" onclick="operatingIllegalObj.operatingIllegalchangeRedio('0')">
	        <option value="week">上周</option>
	        <option value="month">上月</option>
	        <option value="year" >上年</option>
	  </select>
	  <input id="timelineoperatingIllegal" name="requestParam.equal.timeline" type="radio" class="checkbox" value="1"/>自定义时段:

	  <input id="startDateoperatingIllegal" name="requestParam.equal.startDate" readonly="readonly"  class="Wdate" type="text" onclick="WdatePicker();operatingIllegalObj.operatingIllegalchangeRedio('1');" />
	  至
	  <input id="endDateoperatingIllegal" name="requestParam.equal.endDate"  type="text" class="Wdate" readonly="readonly" onclick="WdatePicker();operatingIllegalObj.operatingIllegalchangeRedio('1');" />
	  </span>
	  <span class="R">
	  <input type="submit" class="btn_inquires" onmouseover="this.style.backgroundPosition='0px -200px'" onmouseout="this.style.backgroundPosition='0px -150px'" value="" />
	  <!-- <button type="submit" class="bt_yy3" >查询</button> -->
	  </span></div>
</form>

</div></div></div>
<div class="right_cdc2">
                    <span class="R"> <a id="gridExport" style="cursor: hand;"><img
                            title="导出信息" src="images/global/xiahao.png" /> </a> </span>
                </div>
<div class="right_cc">
<div id="operatingIllegalgrid"></div>
</div>
</div>

</div>
</body>
</html>
