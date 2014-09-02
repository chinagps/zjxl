<%@ page language="java" contentType="text/html; charset=utf-8"	pageEncoding="utf-8"%>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>驾驶员身份信息识别记录查询</title>
<script type="text/javascript" src="script/driverMessageRecordCount/driverMessageRecordCount.js"></script>  
</head>
<body>
<div id="driverMessageRecordCount">
	<div id="driverMessageRecordCountcontent" class="content">
	<div class="content">
		<div class="right_cs">
			<form id="driverMessageRecordCountSearchForm">
			<div class="Backstage2">
			<div id="tvdiSelectParams" style="display: none"></div>
		      <ul class="QueryListTitle" style="display: none">
		            <li>
		                <span style="width: 70px; text-align:right;">所属组织：</span>
		                <span id="driverMessageRecordCountOrgName"></span>
						<input id="vehicleinfoOrgId" name="" type="hidden" class="srkjl4 w_yy_1"/>
					</li>
		      </ul>
		      <ul class="QueryListCondition">
		      		<li style="width:100%;">
		      		    <div>
            	          <span style="width: 50px; text-align:right;">驾驶员:</span>
            	          <input name="requestParam.like.driverName" type="text" style="width: 100px;" class="srkjl4 w_yy_1" />
						</div>
						
		            	<div>
            	          <span style="width: 50px; text-align:right;">车牌号:</span>
            	          <input name="requestParam.like.vehicleNo" type="text" style="width: 100px;" class="srkjl4 w_yy_1" />
						</div>
						<div>
							<span style="width: 45px; text-align:right;">状态:</span>
							<select  name="requestParam.equal.status" style="width:80px;">
							  <option value="">全部</option>
			   	              <option value="0">识别成功</option>
			                  <option value="1">识别失败</option>
			                </select>
						</div>
						<div>
							<span style="width:65px; text-align:right; padding-bottom: 3px;">查询时间</span>
							<input name="startTime"  onclick="WdatePicker({dateFmt:'yyyy-MM-dd',isShowClear:true})" type="text" maxlength="10" style="width: 100px;" class="Wdate srkjl4 w_yy_1" /> 至 <input name="endTime" onclick="WdatePicker({dateFmt:'yyyy-MM-dd',isShowClear:true})" type="text" maxlength="10" style="width: 100px;" class="Wdate srkjl4 w_yy_1"  />
						</div>
						<div>
							<input type="submit" id="driverMessageRecordCountSearchFormSubmit" style="margin-left:50px;" class="btn_inquires" onmouseover="this.style.backgroundPosition='0px -200px'" onmouseout="this.style.backgroundPosition='0px -150px'" value="&nbsp;" />
						</div>
		            </li>
		        </ul>
		      </div>
		      </form>
		      <div class="right_cc">
		        <div class="right_cdc2"></div>
		        <div id="driverMessageRecordCountGrid">
			    </div>
		      </div>
	     
	    </div>
   </div>
   </div>
</div>
</body>
</html>
