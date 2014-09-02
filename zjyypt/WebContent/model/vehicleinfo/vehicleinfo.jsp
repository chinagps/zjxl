<%@ page language="java" contentType="text/html; charset=utf-8"	pageEncoding="utf-8"%>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>运营管理-车辆信息查询</title>
<script type="text/javascript" src="script/vehicleinfo/vehicleinfomng.js"></script>  
</head>
<body>
<div id="vehicleinfomng">
	<div id="vehicleinfomngcontent" class="content">
	<div class="content">
		<div class="right_cs">
			<form id="vehicleInfoSearchForm">
			<div class="Backstage2" style="border:none; border-bottom:#c0d7eb 1px solid;">
		      <ul class="QueryListTitle">
		            <li>所属组织：<span id="vehicleinfoOrgName"></span>
							<input id="vehicleinfoOrgId" name="requestParam.equal.entsId" type="hidden" class="srkjl4 w_yy_1"/>
					</li>
		      </ul>
		      <ul class="QueryListCondition">
		      		<li style="width: 200px;">
		      			<div>
		            	&nbsp;&nbsp;&nbsp;&nbsp;车牌号：<input name="requestParam.like.vehicleNo" type="text" maxlength="20" style="width: 80px;" class="srkjl4 w_yy_1" />
						</div>
						<div>
		            	驾驶员姓名：<input name="requestParam.like.staffName" type="text" maxlength="20" style="width: 80px;" class="srkjl4 w_yy_1" />
		            	</div>
		            </li>
					<li style="width: 200px;">
						<div>		              
		            	车辆类型：<select id="vehicleTypeIdSearch" name="requestParam.equal.vehicleType" style="width: 120px;" class="srkjl4 w_yy_3">
		            				<option value="">请选择</option>
		            			</select>
		            	</div>
		            	<div>
		            	终端类型：<select id="tmodelCodeIdSearch" name="requestParam.equal.tmodelCode" style="width: 120px;" class="srkjl4 w_yy_3">
		            				<option value="">请选择</option>
		            			</select>
		            	</div>
		            </li>
		            <li style="width: 200px;">
		            	车辆运营状态：
						<select id="queryVehicleOperationStateId" name="requestParam.like.vehicleOperationState" style="width: 80px;" class="srkjl4 w_yy_3">
							<option value="">全部</option>
						</select>
		            	<div style="margin-top: 8px;">
		           		 	&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;SIM卡号：<input name="requestParam.like.commaddr" type="text" maxlength="11" style="width: 80px;margin-left: 6px" class="srkjl4 w_yy_1" />
		            	</div>
		            </li>
		            <li style="width: 100px;"><div style="vertical-align: middle;">
		            	<input type="submit" class="btn_inquires" onmouseover="this.style.backgroundPosition='0px -200px'" onmouseout="this.style.backgroundPosition='0px -150px'" value="&nbsp;" />
		            </li>
		        </ul>
		      </div>
		      </form>
		      <div class="right_cc">
		        <div class="right_cdc2">
		        <span class="R"> 
				<a id="viewVehicleInfoExportExcel" style="cursor:hand;"><img title="导出信息"
									src="images/global/xiahao.png" /> </a> 			
				</span>
		        </div>
		        <div id="vehicleInfoGrid">
			    </div>
		      </div>
	     
	    </div>
   </div>
   </div>
   <div id="vehicleInfoSearchAddform" class="content" style="display:none;"></div>
</div>
</body>
</html>
