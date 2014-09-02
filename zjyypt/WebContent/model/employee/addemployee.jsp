<%@ page language="java" contentType="text/html; charset=utf-8"	pageEncoding="utf-8"%>

 
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>业务支撑-编辑驾驶员</title>
</head>
<body>
<div id="addemployeepage">
	<div class="content">
  <div class="right_c">
    <div class="right_cs">
    	<div class="right_ct4">驾驶员信息(<span class="red">*</span>号为必填项)</div>
    	<form id="addCustomerForm" name="addCustomerForm" action="/addemployee.jsp" method="post">
    	    <input  id="entType" type="hidden"></input>
        	<input name="customer.staffId" id="staffIdId" type="hidden"></input>
        	<input name="customer.entId" id="parentOrgIdEmployee" type="hidden"/>
        	<input id="addEmployeeId" type="hidden"  value=""/>
    	<div class="text2">
       <h1>所属企业： <span id="parentOrgName3">
                                      请选择所属企业（请从左边的树中选择企业)
                        </span></h1></div>
        <ul class="frame2" style="width: 960px">
        	<li>
        	<table style="margin-bottom: 8px">
        	<tr align="left">
        	<td width="480px"><span >驾驶员姓名&nbsp;&nbsp;：<input name="customer.staffName" onblur="employ.checkName()" type="text" class="required" id="staffName"  /><span id="staffNamespan" class="red"></span><span class="red">*</span></span></td>
        	<td width="480px">        	<span >性别&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;：<select name="customer.sex" style="width:132px;">
        	<option  value="1" selected="selected">男</option>
        	<option  value="2">女</option>
        	</select><span class="red">*</span></span></td>
        	</tr>
        	</table>
        	</li>
            <li>
            <table style="margin-bottom: 8px"> <tr align="left">
            <td width="480px"><span >联系手机号&nbsp;&nbsp;：<input name="customer.mobilephone" onblur="employ.checkMobile()" type="text" id="mobilephone" class="{required:true,number:true}"/><span class="red" id="mobilephonespan"></span><span class="red">*</span></span></td>
            <td width="480px"> <span >联系地址&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;：<input name="customer.address" type="text" onblur="employ.checkAddress()" id="address" />&nbsp;<span  class="red"  id="addressSpan"></span></span></td>
            <tr> </table>
            </li>
            <li>
            <table style="margin-bottom: 8px">
        	<tr align="left">
        	<td width="480px"> <span>驾驶证档案号：<input name="customer.driverNo" onblur="employ.checkDriverNo()" type="text" id="driverNo" class="required"/><span class="red" id="driverNoIdspan"></span><span class="red">*</span></span></td>
        	<td width="480px"><span >身份证号&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;：<input name="customer.cardId" onblur="employ.checkSelf()" type="text" class="required:true" id="carId"  /><span class="red" id="cardIdspan"></span><span class="red">*</span></span></td>
        	</tr>
        	</table>
            </li>
            <li>
            <table style="margin-bottom: 8px">
        	<tr align="left">
        	<td width="480px"> <span >从业资格证号：<input name="customer.bussinessId" onblur="employ.checkBusId()"  type="text" id="bussinessIdId"   /><span class="red" id="bussinessIdIdspan"></span></span></td>
        	<td width="480px"> <span >驾驶证核发机关：<input name="customer.drivercardDep" onblur="employ.checkDep()"  id="driverDep" type="text" />&nbsp;<span class="red" id="driverDepspan"></span></span></td>
        	</tr>
        	</table>
            </li>
            <li>
            <table style="margin-bottom: 8px">
        	<tr align="left">
        	<td width="480px">
        		<span class="L">驾驶车牌号&nbsp;&nbsp;：<input type="text" id="vehicleNoemployee"/>
            		<input type="hidden" id="vehicleNoId" name="customer.vid"/>
            		<img onclick="employ.queryVehicle()" style="cursor: pointer;" src="images/global/big.png" />
            	</span>
            </td>
        	<td width="480px"></td>
        	</tr>
        	</table>
            </li>
        </ul>
        <div class="button4">
        <input name="" id="addCustomerFormSubmit" type="submit" value="确定" class="bt4" />
        <input name="" id="escButtonAddEmploee" type="button" value="取消" class="bt5" />
        </div>
        </form>




    </div>
   </div>
   </div>
</div>
</body>
</html>