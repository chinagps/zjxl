<%@ page language="java" contentType="text/html; charset=utf-8"	pageEncoding="utf-8"%>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>里程统计</title>
<script type="text/javascript" src="script/mealCount/mealCount.js"></script>  
</head>
<body>
<div id="mealCount">
	<div id="mealCountcontent" class="content">
	<div class="content">
		<div class="right_cs">
		    <div class="right_ct">
		        <ul style="margin-top:13px;">
		           <li id="mealTab1" class="h"><a href="javascript:mealCountObj.changeQueryType('1');">单车统计</a></li>
		           <li id="mealTab2"><a href="javascript:mealCountObj.changeQueryType('2');">分组统计</a></li>
		        </ul>
		    </div>
		    
			<form id="mealCountSearchForm">
			<input id="searchTypeId" name="requestParam.equal.searchType" type="hidden" value="1"/>
			<div class="Backstage2" style="border:none; border-bottom:#c0d7eb 1px solid;">
			<div id="tvdiSelectParams" style="display: none"></div>
		      <ul class="QueryListTitle">
		            <li>
		               <span style="width: 70px; text-align:right;">所属组织：</span>
		               <span id="mealCountOrgName"></span>
					   <input id="vehicleinfoOrgId" name="" type="hidden" class="srkjl4 w_yy_1"/>
					</li>
		      </ul>
		      <ul class="QueryListCondition">
	      		<li style="width:100%;">
	            	<div id="vehicleNoDiv">
	           		 	<span style="width: 45px; text-align:right;">VIN码:</span>
	           		 	<input name="requestParam.like.vehicleVin" type="text" maxlength="15" style="width: 100px;" class="srkjl4 w_yy_1" />
	            	</div>
	            	<div id="vehicleVinDiv">
	            	   <span style="width: 50px; text-align:right;">车牌号:</span>
	            	   <input name="requestParam.like.vehicleNo" type="text" maxlength="15" style="width: 100px;" class="srkjl4 w_yy_1" />
					</div>
					<div>
						<span style="width: 65px; text-align:right; padding-bottom: 3px;">查询时间:</span>
						<input name="startTime"  onclick="WdatePicker()" type="text" maxlength="10" style="width: 100px;" class="Wdate srkjl4 w_yy_1" /> 至 <input name="endTime" onclick="WdatePicker()" type="text" maxlength="10" style="width: 100px;" class="Wdate srkjl4 w_yy_1" />
					</div>
					<div>
						<input type="submit" id="mealCountSearchFormSubmit" style=" margin-left:10px;" class="btn_inquires" onmouseover="this.style.backgroundPosition='0px -200px'" onmouseout="this.style.backgroundPosition='0px -150px'" value="" />
					    <!-- <input id="mealCountSearchFormSubmit" name="" type="submit" value="" class="bt_yy" style="float: left;margin-left: 10px;"/> -->
					</div>
	            </li>
		        </ul>
		      </div>
		      </form>
		      <div class="right_cc">
		        <div class="right_cdc2">
		         <span class="R">
		        <a id="mealCountExportExcel" style="cursor:hand;"><img title="导出信息"
									src="images/global/xiahao.png" /> </a>
				</span>
		        </div>
		        <div id="mealCountGrid">
			    </div>
		      </div>
	     
	    </div>
   </div>
   </div>
</div>
</body>
</html>
