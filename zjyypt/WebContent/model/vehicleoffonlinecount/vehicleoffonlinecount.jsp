<%@ page language="java" contentType="text/html; charset=utf-8"	pageEncoding="utf-8"%>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>车辆上下线统计</title>
<script type="text/javascript" src="script/vehicleoffonlineCount/vehicleoffonlineCount.js"></script>  
</head>
<body>
<div id="vehicleoffonlineCount">
	<div id="vehicleoffonlineCountcontent" class="content">
	<div class="content">
		<div class="right_cs">
			<form id="vehicleoffonlineCountSearchForm">
			<div class="Backstage2">
			<div id="tvdiSelectParams" style="display: none"></div>
		      <ul class="QueryListCondition">
		            <li style="width: 100%">
		                <span style="width: 70px; text-align:right;">所属组织：</span>
		                <span id="vehicleoffonlineCountOrgName"></span>
						<input id="vehicleinfoOrgId" name="" type="hidden" class="srkjl4 w_yy_1"/>
					</li>
		      		<li style="margin-top: 15px;width:35%;">	
		      		    <div>
		            	   <span style="width: 70px; text-align:right;margin-top:0px;">车牌号码：</span>
		            	   <input name="requestParam.like.vehicleNo" type="text" maxlength="11" style="width: 60px;" class="srkjl4 w_yy_1" />
						</div>
						
		            	<div>
		           		 	<span style="width: 70px; text-align:right;margin-top:0px;">&nbsp;&nbsp;状态：</span>
		           		 	<select  name="requestParam.equal.onOffline" class="select" style="width: 60px;" class="srkjl4 w_yy_3">
			       				<option value="">全部</option>
			       				<option value="1">上线</option>
			       				<option value="0">下线</option>
			       			</select>
		            	</div>
		            	
					</li>
					<li style="margin-top: 15px;width:60%;">
						<div>
							<span style="width: 70px; text-align:right;margin-top:0px;">起始时间：</span>
							<input name="startTime"  onclick="WdatePicker()" type="text" maxlength="20" style="width: 100px;" class="Wdate srkjl4 w_yy_1" />
						</div>
						<div>
							<span style="width: 70px; text-align:right;margin-top:0px;">结束时间：</span>
							<input name="endTime" onclick="WdatePicker()" type="text" maxlength="20" style="width: 100px;" class="Wdate srkjl4 w_yy_1" />
						</div>
						<div>
						&nbsp;&nbsp;&nbsp;
		               		<input type="submit" id="vehicleoffonlineCountSearchFormSubmit" style="margin-top:0px;" class="btn_inquires" onmouseover="this.style.backgroundPosition='0px -200px'" onmouseout="this.style.backgroundPosition='0px -150px'" value="&nbsp;" />
		               </div>
		           </li>
		        </ul>
		      </div>
		      </form>
		      <div class="right_cc">
		        <div class="right_cdc2">
		          <span class="R">
		        <a id="vehicleoffonlineExportExcel" style="cursor:hand;"><img title="导出信息"
									src="images/global/xiahao.png" /> </a>
				</span>
		        </div>
		        <div id="vehicleoffonlineCountGrid">
			    </div>
		      </div>
	     
	    </div>
   </div>
   </div>
</div>
</body>
</html>
