<%@ page language="java" contentType="text/html; charset=utf-8"	pageEncoding="utf-8"%>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>系统管理-告警等级设置</title>
	<script type="text/javascript" src="script/alarmLevel/alarmlevelmng.js"></script>
<style>
	.Warning {
		border: #BAD4EC 1px solid;
		background: #F1F7FD;
		padding: 12px 0 10px 8px;
		width: 520px;
		height: 128px;
	}
	</style>
</head>

<body>

<div id="alarmlevelmng" >
  <div class="content">
    <div class="right_cs">
      <div class="right_ct">
        <h1>告警等级设置</h1>
      </div>
	  <div id="allframeid" class="allframeSysAlarm" style="overflow-y: scroll;">
		  <div class="allTypeframe L" style="width: 30%">
			<div id="allTypeId" class="allType" style="width:100%">
			  <h1>全部告警类型</h1>
			   		<select name="select1" size="10" id="select1" class="textareaSysAlarm" multiple="multiple" style="height:590px;width:99.8%;">
						
					</select>
			</div>
		  </div>
		  <ul class="Add L" style="width: 5%"> 
		  	
			<!--严重 -->
			<li style="padding-top: 20px" style="width: 80%"><img id="input1" src="images/global/addleft.png"  /></li>
			<li class="addright" style="width: 80%"><img id="input3" src="images/global/addright.png" /></li>
			<!-- 中度 -->
		  	<li style="padding-top: 30px" style="width: 80%"><img src="images/global/addleft.png" id="input2addleft" /></li>
			<li class="addright" style="width: 80%"><img src="images/global/addright.png" id="input2addright" /></li>
			<!-- 一般 -->
			<li style="padding-top: 20px" style="width: 80%"><img src="images/global/addleft.png" id="input3addleft" /></li>
			<li class="addright" style="width: 80%"><img src="images/global/addright.png" id="input3addright" /></li>
			<!-- 提醒 -->
			<li style="padding-top: 20px" style="width: 80%"><img src="images/global/addleft.png" id="input4addleft" /></li>
			<li class="addright" style="width: 80%"><img src="images/global/addright.png" id="input4addright" /></li>
		  </ul>
		  <ul class="threeright L" style="width: 50%">
		         
				<li>
					<div class="Warning">
						<div class="Warningred"><h1>严重告警</h1></div>
						<div>
						<div style="width: 50%;float:left">
						<select name="select2" class="Warningtext" id="select2" style="height: 110px;" multiple="multiple" levelcode="1">
						</select>
						</div>
						<div style="float: left；width:50%">
						<ul style="width: 100%">
						<li style="width: 100%">
						<input type="checkbox" value="1" id="select2outmsgId" class="checkbox" name="checked"/>弹出提示
						</li>
						<li style="width: 100%">
						<input type="checkbox" value="1" id="select2soundmsgId" class="checkbox" name="checked"/>声音提示
						</li>
						
						</ul>
						</div>
						</div>
					</div>
				</li>
				
				<li>
					<div class="Warning">
						<div class="Warningorang"><h1>中度告警</h1></div>
						<div>
						<div style="width: 50%;float:left">
						<select name="select3" class="Warningtext" id="select3" style="height: 110px;" multiple="multiple"  levelcode="2">
						</select>
						</div>
						<div style="float: left；width: 50%">
						<ul style="width: 100%">
						<li style="width: 100%">
						<input type="checkbox" value="1" id="select3outmsgId" class="checkbox" name="checked"/>弹出提示
						</li>
						<li style="width: 100%">
						<input type="checkbox" value="1" id="select3soundmsgId" class="checkbox" name="checked"/>声音提示
						</li>
						</ul>
						</div>
						</div>
					</div>
				</li>
				
				<li>
					<div class="Warning">
						<div class="Warningyellow"><h1>一般告警</h1></div>
						<div>
                        <div style="width: 50%;float:left">
						<select name="select4" class="Warningtext" id="select4" style="height: 110px;" multiple="multiple" levelcode="3">
						</select>
						</div>
						<div style="float: left；width:50%">
						<ul style="width: 100%">
						<li style="width: 100%">
						<input type="checkbox" value="1" id="select4outmsgId" class="checkbox" name="checked"/>弹出提示
						</li>
						<li style="width: 100%">
						<input type="checkbox" value="1" id="select4soundmsgId" class="checkbox" name="checked"/>声音提示
						</li>
						</ul>
						</div>
					    </div>
					</div>
				</li>
				<li>
					<div class="Warning">
						<div class="Warningblue"><h1>提醒</h1></div>
						<div>
                        <div style="width: 50%;float:left">
						<select name="select5" class="Warningtext"  id="select5"  style="height: 110px;" multiple="multiple" levelcode="4" >
						</select>
						</div>
						<div style="float: left；width:50%">
						<ul style="width: 100%">
						<li style="width: 100%">
						<input type="checkbox"  value="1"  id="select5outmsgId" class="checkbox"  name="checked"/>弹出提示
						</li>
						<li style="width: 100%"> 
						<input type="checkbox" value="1" id="select5soundmsgId" class="checkbox" name="checked"/>声音提示
						</li>
						</ul>
						</div>
					    </div>
					</div>
				</li>
		  </ul>
		</div>
		<div class="button4SysAlarm" id="buttonid">
        	<input name="addBut" type="button" value="确定" class="btn_green" id="addVehicleFormsubmitMe"
        	onmouseover="this.style.backgroundPosition='-100px -50px'" onmouseout="this.style.backgroundPosition='-100px 0px'"/>&nbsp;&nbsp;
        	<input name="resetBut" type="button" value="恢复默认" onclick="winAlarmlevelMng.listAlarmType()" class="btn_blue"
        	onmouseover="this.style.backgroundPosition='0px -50px'" onmouseout="this.style.backgroundPosition='0px 0px'"/>
        </div>
    </div>
  </div>
</div>
</body>
</html>
