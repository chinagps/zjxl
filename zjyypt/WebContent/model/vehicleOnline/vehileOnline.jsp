<%@ page language="java" contentType="text/html; charset=utf-8"	pageEncoding="utf-8"%>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>车辆在线统计</title>
<script type="text/javascript" src="script/vehicleOnlineCount/vehicleOnlineCount.js"></script>  
</head>
<body>
<div id="alarmCount">
	<div id="vehicleOnlineCountcontent" class="content">
	<div class="content">
		<div class="right_cs">
			<form id="vehicleOnlineCountSearchForm">
			<div class="Backstage2" style="border-top:none;">
			<div id="tvdiSelectParams" style="display: none"></div>
		      <ul class="QueryListTitle">
		            <li>所属组织：<span id="vehicleOnlineCountOrgName"></span>
							<input id="vehicleinfoOrgId" name="" type="hidden" class="srkjl4 w_yy_1"/>
					</li>
		      </ul>
		      <ul class="QueryListCondition">
		      		<li style="width:26%;">
		            	<!-- <div>
		           		 	车辆VIN&nbsp;&nbsp;：<input name="requestParam.like.vehicleVin" type="text" maxlength="11" style="width: 110px;" class="srkjl4 w_yy_1" />
		            	</div> -->
		            	<div>
		            	   车牌号&nbsp;：<input name="requestParam.like.vehicleNo" type="text" maxlength="20" style="width: 133px;" class="srkjl4 w_yy_1" />
						</div>
					</li>
					<li style="width:28%;">
						<div>
							<span style="width: 70px; text-align:right;">是否在线：</span>
							 <select id="isOnlineId"  name="requestParam.equal.isOnline" style="width:133px;" class="srkjl4 w_yy_3">
			                  <option value="1" selected>在线</option>
			                  <option value="0">不在线</option>
			                 </select>
						</div>
		            </li>
		            <li style="width:28%;">
		            	<div>
		            		<span style="width: 70px; text-align:right;">是否行驶：</span>
							<select id="isRunId" name="requestParam.equal.isRun" style="width:133px;" class="srkjl4 w_yy_3">
								<option value="">全部</option>
								<option value="1">行驶</option>
			                 	<option value="0">不行驶</option>
			                </select>
						</div>
		            </li>
		            <li style="width:12%;">
		            	<input type="submit" id="mealCountSearchFormSubmit" class="btn_inquires" onmouseover="this.style.backgroundPosition='0px -200px'" onmouseout="this.style.backgroundPosition='0px -150px'" value="&nbsp;" />
		            </li>
		        </ul>
		      </div>
		      </form>
		      <div class="right_cc">
		        <div class="right_cdc2">
		         <span class="R">
		        <a id="vehileOnlineExportExcel" style="cursor:hand;"><img title="导出信息"
									src="images/global/xiahao.png" /> </a>
				</span>
		        </div>
		        <div id="vehicleOnlineCountGrid">
			    </div>
		      </div>
	     
	    </div>
   </div>
   </div>
</div>
</body>
</html>
