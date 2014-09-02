<%@ page language="java" contentType="text/html; charset=utf-8"	pageEncoding="utf-8"%>


<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
<title>系统参数设置</title>
<script src="script/plugins/ligerUI/js/plugins/ligerAccordion.js"
	type="text/javascript"></script>
<script src="script/sysparam/sysparam.js" type="text/javascript"></script>
<style type="text/css">
#accordion1 {
	width: 160px;
	overflow: hidden;
}
</style>
</head>
<body>
	<div id="sysparammng">
		<div class="content" id="sysparammngcontent">
			<div class="sysm_syscontent">
				<table>
				<tr>
				<td>
				<div id="sysparamAccordion1" style="width: 270 px;">
					<div title="企业标识设置" id="corplogo">
						<ul class="sysm_cs_sysleft">
							<li url="model/sysparam/corplogo.jsp"><a
								href="javascript:void(0)">设置LOGO</a>
							</li>
						</ul>
					</div>
					<div title="监控设置" id="monitoring">
						<ul class="sysm_cs_sysleft">
							<!-- <li url=""><a href="javascript:void(0)">自动拍照设置</a>
							</li> -->
							<li url="model/predefinedMsg/predefinedmsgmng.jsp"><a
								href="javascript:void(0)">调度信息设置</a>
							</li>
							<!-- <li url="">提问信息设置</li>
							<li class="hiden" url="model/sysparam/checkwork.jsp">查岗参数设置</li> -->
						</ul>
					</div>
					<div title="告警设置" id="emergency">
						<ul class="sysm_cs_sysleft">
							<li url="model/sysparam/alarmlevelmng.jsp"><a
								href="javascript:void(0)">告警等级设置</a>
							</li>
							<!-- <li url="model/sysparam/vehicleReplyalarm.jsp"><a
								href="javascript:void(0)">告警自动处理设置</a>
							</li> -->
							<!-- <li url=""><a href="javascript:void(0)">其他告警设置</a></li> -->
							<!-- 其他告警设置 链接界面 model/sysparam/otheralarmmng.jsp  -->
						</ul>
					</div>


					<div title="车辆在线率设置" id="monitoring">
						<ul class="sysm_cs_sysleft">
							<li url="model/onlinevehicle/addonlinevehicletime.jsp"><a
								href="javascript:void(0)">在线时间设置</a>
							</li>
						</ul>
					</div>


				</div>
				</td>
				<td valign="top">
				<div id="sysparamRightParamContent"></div>
				</td>
				</tr>
				</table>
			</div>
		</div>
	</div>
</body>
</html>
