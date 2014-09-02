<%@ page language="java" contentType="text/html; charset=utf-8"	pageEncoding="utf-8"%>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>车辆详情</title>
<link href="css/global/index.css" type="text/css" media="screen" rel="stylesheet" />
<script type="text/javascript" src="script/corpinfo/corpinfodetail.js"></script>
<style type="text/css">
	table tr td {
		width: 50%;
		line-height: 26px;
	}
</style>
</head>

<body style="font:12px Tahoma,Helvetica,Arial,'宋体',sans-serif;color:#333;">

<div class="kcptWindow" style="width:800px;">
	<div class=kcptWindow_top>
        <div class="kcptWindow_top_img"><img src="images/global/chooseVehicle/car.png" /></div>
        <div id="corpInfoCloseRightTop" class="kcptWindow_top_close"><img src="images/global/topRightClose.png" onmouseover="this.src='images/global/topRightCloseHover.png'" onmouseout="this.src='images/global/topRightClose.png'" /></div>
        <div class="kcptWindow_top_text">车队详情</div>
	</div>
	<div class="kcptWindow_main">
    	<div class="right_cs">
                <div class="right_ct4" style="width:99.9%">
                	<div class="plr">车队基本信息</div>
        		</div>
			<table style="font-size: 12px;" border="0" cellspacing="0" cellpadding="0" width="95%" class="newtable" >
				<tr style="line-height: 25px;">
					<td colspan="2">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;所属组织：<span id="parentName"></span></td>
				</tr>
				<tr style="line-height: 25px;">
					<td >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;企业编码：<span id="corpCode"></span></td>
					<td >企业名称：<span id="entName"></span></td>
				</tr>
				<tr style="line-height: 25px;">
					<td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;企业简称：<span id="orgShortname"></span></td>
					<td>组织类型：<span id="entType"></span></td>
				</tr>
				<tr style="line-height: 25px;">
					<td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;网址：<span id="url"></span></td>
					<td>企业地址：<span id="orgAddress"></span></td>
				</tr>
				<tr style="line-height: 25px;">
					<td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;所属省：<span id="corpProvinceDetail"></span></td>
					<td>&nbsp;&nbsp;所属市：<span id="corpCityDetail"></span></td>
				</tr>
				<tr style="line-height: 25px;">
					<td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Email：<span id="orgCmail"></span></td>
					<td>&nbsp;&nbsp;&nbsp;&nbsp;邮编：<span id="orgCzip"></span></td>
				</tr>
				<tr style="line-height: 25px;">
					<td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;企业性质：<span id="corpQualeDetail"></span></td>
					<td>企业级别：<span id="corpLevelDetail"></span></td>
				</tr>
				<tr style="line-height: 25px;">
					<td>企业经营许可证：<span id="businessLicense"></span></td>
					<td>&nbsp;&nbsp;联系人：<span id="orgCname"></span></td>
				</tr>
				<tr style="line-height: 25px;">
					<td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;传真：<span id="orgCfax"></span></td>
					<td>联系电话：<span id="orgCphone"></span></td>
				</tr>
				<tr style="line-height: 25px;">
					<td colspan="2">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;企业简介：<span id="orgMem"></span></td>
				</tr>
			</table>

		</div>
        <div class="button7">
        	<input type="submit" id="corpInfoClose" class="btn_blue" onmouseover="this.style.backgroundPosition='0px -50px'" onmouseout="this.style.backgroundPosition='0px 0px'" value="关闭" />
        </div>
	</div>
    <div class="kcptWindow_bottom">
        <div class="kcptWindow_bottom_middle"></div>
    </div>
</div>

</body>
</html>
