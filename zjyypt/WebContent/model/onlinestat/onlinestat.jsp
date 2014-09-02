<%@ page language="java" contentType="text/html; charset=utf-8"	pageEncoding="utf-8"%>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>在线统计率</title>
<script type="text/javascript" src="script/onlinestat/onlinestat.js"></script>
<link href="css/global/safeDetail.css" rel="stylesheet" type="text/css" />
</head>

<body>
	<div id="onlinestatDIV">
	<div id="onlinestatcontentDIV" class="content">
		<div class="content">
	 		<div class="right_c">
				<div class="right_cs">
					<form id="onlineSearchform">
					 <div class="Backstage2" style="border:none; border-bottom:#c0d7eb 1px solid;">
					    <ul class="QueryListTitle" id="ul_mess_index">
							<li>所属组织：<span id="parentOrgNameOper"></span>
								<input id="parentOrgIdOper" name="requestParam.equal.entId" type="hidden" value="" />
							</li>
						</ul>
						<ul class="QueryListCondition">
							<li style="width:40%">
								<div>最近 ：
									<input name="requestParam.equal.beforeutc" id="beforeutc" maxlength="40" type="text" class="srkjl4 w_yy_1"
										onKeyUp="value=value.replace(/\D/g,'')" onafterpaste="value=value.replace(/\D/g,'')"  value="30" />分钟 上报位置车辆统计
								</div>
							</li>
							<li>
								<div>
									<input type="submit" class="btn_inquires" onmouseover="this.style.backgroundPosition='0px -200px'" onmouseout="this.style.backgroundPosition='0px -150px'" value="" />
									<!-- <input name="" type="submit" value="" class="bt_yy" /> -->
								</div>
							</li>
						</ul>
						</div>
					</form>
					<div class="right_cc">
						<div class="right_cdc2">
						<span class="R">
							<a id="gridExport" style="cursor: hand;"><img
								title="导出信息" src="images/global/xiahao.png" />
						    </a>
						</span>		
						</div>
						<div id="onlinestatGrid"></div>
					</div>
				</div>
			</div>
		</div>
	</div>
	</div>
</body>
</html>
