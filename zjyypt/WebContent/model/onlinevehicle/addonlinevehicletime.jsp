<%@ page language="java" contentType="text/html; charset=utf-8"	pageEncoding="utf-8"%>



<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>车辆在线率时间设置</title>
<script type="text/javascript" src="script/onlinevehicle/addonlinevehicletime.js"></script>
</head>
<body>
<div id="content">
	<div class="content">
  <div class="right_c">
    <div class="right_cs">
    <form id="addOnlineTimefinedmsgForm">
    	<div class="right_ct4">车辆在线率时间设置(<span class="red">*</span>号为必填项)
    	</div>
    	<input id="id" name="onlineVehicleTime.id" type="hidden" value=""></input> 
    	<input id="msgIdx_old" name="onlineVehicleTime.onlineTime" type="hidden" value=""></input>    
    	<input id="entId" name="onlineVehicleTime.entId" type="hidden" value=""></input>
        
        <ul class="frame2Add_Page">
        	<li>
        		<span class="LAdd_Page">所属组织：<span id="span_entName" style=""></span><!-- <input id="msgIdx" name="onlineVehicleTime.entId" type="text" value="" style="width:150px;" /> -->
            	</span>
        	</li>
            <li>          	
            	<span class="LAdd_Page" >在线率时间：<input id="msgIdx" name="onlineVehicleTime.onlineTime" type="text" value="" style="width:120px;" class="{required: true, specialchars:true, maxlength:10}" /><span class="red">*</span>
            	小时
            	</span>
            </li>
          
        </ul>
        <div style="padding-left:40%;margin-top:45px">
        	<input name="" type="button" value="确定" class="btn_green" id="addOnlineTeimfinedmsgFormsubmitMe"
        	onmouseover="this.style.backgroundPosition='-100px -50px'" onmouseout="this.style.backgroundPosition='-100px 0px'"/>&nbsp;&nbsp;
        	<input id="closeReset" name="" type="button" value="取消" class="btn_blue"
        	onmouseover="this.style.backgroundPosition='0px -50px'" onmouseout="this.style.backgroundPosition='0px 0px'"/>
        </div>
    </form>
    </div>
   </div>
   </div>
</div>
</body>
</html>
