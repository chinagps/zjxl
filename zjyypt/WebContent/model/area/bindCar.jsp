<%@ page language="java" contentType="text/html; charset=utf-8"	pageEncoding="utf-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=gb2312" />
<title>电子围栏管理</title>
</head>

<body>
	<div class="areatop">
		<div class="areaicon">
			<div class="areaimg">
				<img src="images/area/area-icon01.png"/>
			</div>
			<div class="areafont">围栏名称1</div>
		</div>
		<div class="areaclose" id="areaBindCarClose"><img src="images/area/area-icon02.png"/></div>
	</div>
			  
	<div class="areamenu" style="padding-left:2px;">
		<form action="" method="post" id="areaSearchCarListForm">
			<input type="hidden" name="requestParam.data.entId" id="dataEntId"/>
			<input type="hidden" name="requestParam.equal.areaId" id="dataAreaId"/>
			<div  style="float:left;height:30px;">
			车牌号码：<input type="text" name="requestParam.like.vehicleNo" style="width:100px; margin:3px 10px 0 10px;"/>
			企业名称：<input type="text" name="requestParam.like.pentName"  style="width:100px; margin:3px 10px 0 10px;"/>
			</div>
			<div style="width:70px;float:left;">
				<input style="margin-top:2px;" type="submit" class="btn_inquires"  id="areaSearCarsListBtn" value="" 
				onmouseover="this.style.backgroundPosition='0px -200px'" onmouseout="this.style.backgroundPosition='0px -150px'"/>
			</div>
		</form>
	</div>

 	<div  id="areaBindCarsListGrid"></div>
 
 	<div id="areaBindCarContextPanel"> 

		<div class="fenceManagement_vehicleBinding_main_2" >
			<ul>
        		<li>开始时间：&nbsp;&nbsp;&nbsp;&nbsp;
        			<input style="width:100px; float:none;" type="text" name="textfield3" onfocus="WdatePicker({dateFmt:'yyyy-MM-dd',minDate:new Date(),maxDate:'2099-12-31'})" class="areainputleft" /><input style="float:none;" type="text" name="textfield3" class="areainputright"/>
        		</li>
        		<li>结束时间：
        			<input style="width:100px; float:none;" type="text" name="textfield3" onfocus="WdatePicker({dateFmt:'yyyy-MM-dd',minDate:new Date(),maxDate:'2099-12-31'})" class="areainputleft" /><input style="float:none;" type="text" name="textfield3" class="areainputright"/>
        		</li>
            	<li>每天有效时间：
            		<input style="width:100px; float:none;" type="text" name="textfield3" onfocus="WdatePicker({dateFmt:'HH:mm:ss',minDate:new Date(),maxDate:'2099-12-31'})" class="areainputleft" /><input type="text" style="float:none;" name="textfield3" class="areainputright"/>      	
            	</li>
            	<li>至&nbsp;&nbsp;
            		<input style="width:100px; float:none;" type="text" name="textfield3" onfocus="WdatePicker({dateFmt:'HH:mm:ss',minDate:new Date(),maxDate:'2099-12-31'})" class="areainputleft" /><input type="text" style="float:none;" name="textfield3" class="areainputright"/>
            	</li>
            	<li><input type="checkbox" class="checkbox" name="areaUsetype" value="2" />超速限速</li>
            	<li><input type="checkbox" class="checkbox" name="areaUsetype" value="9" />低速限速</li>
            	<li><input type="radio" class="checkbox" name="areaJudgeType" value="1" checked="checked" />进入区域报告平台</li>
            	<li><input type="radio" class="checkbox" name="areaJudgeType" value="2" />出区域报告平台</li>
            	<li><input type="radio" class="checkbox" name="areaDecide" value="1" checked="checked"/>平台判断</li>         	
            	<li><input type="radio" class="checkbox" name="areaDecide" value="2"/>车机判断</li>
            	<li><input type="checkbox" class="checkbox" name="areaUsetype" value="platform" />提示上报至平台</li>
            	<li><input type="checkbox" class="checkbox" name="areaUsetype" value="terminal" />提示发送给终端</li>    
        	</ul>
			
			<div>
				<input type="submit" class="btn_blue" id="areaAreaBindCarSubmitBtn" value="绑定" style="vertical-align:middle;margin-left:125px;" 
         		onmouseover="this.style.backgroundPosition='0px -50px'" onmouseout="this.style.backgroundPosition='0px 0px'" />  
			</div>		
		
		</div>
	</div>
</body>
</html>
