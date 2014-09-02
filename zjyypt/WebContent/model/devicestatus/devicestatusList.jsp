<%@ page language="java" contentType="text/html; charset=utf-8"	pageEncoding="utf-8"%>

<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>设备状态</title>
<script type="text/javascript" src="script/devicestatus/devicestatusList.js"></script>
</head>
<body>
<div id="contentDvcsta">
<div class="content">
	<div id="rightContent" class="right_c">
		<div class="right_cs" style="border-top:none;">
			<div class="right_ct" style="border-bottom:none; height:44px;">
				
					<form id="dvcstaForm" action="#">
						<div class="right_titlechos">
						<input id="vidInStrDvcsta" type="hidden" name="vidInStr" /> 
						<span class="L">
						           请选择类型：<select name="requestParam.equal.vehicleStatus" id="requestParam_equal_vehicleStatus" style="vertical-align:middle;">
    <option value="-1">全部</option>
    <option value="0">正常</option>
    <option value="error">异常</option>


</select>
                            					
						</span>
						<span class="R"><input type="submit" class="btn_inquires" onmouseover="this.style.backgroundPosition='0px -200px'" onmouseout="this.style.backgroundPosition='0px -150px'" value="&nbsp;" /><!-- <input name="" type="submit" value="查询" class="bt_yy3" /> --></span>
						
						</div>
					</form>
				
			</div>
		<div class="right_cc">
            <div class="right_cdc9" style="border-bottom-style: none;">
                 <div class="R">
                     <img src="/images/global/ls.png"/>&nbsp;正常&nbsp;&nbsp;
                     <img src="/images/global/ss.png"/>&nbsp;异常&nbsp;&nbsp;
                     <img src="/images/global/hs.png"/>&nbsp;不在线
                 </div>
            </div>		
      		<div id="dvcstatable" ></div>
      </div>
    </div>
  </div>
  </div>
</div>
</body>
</html>