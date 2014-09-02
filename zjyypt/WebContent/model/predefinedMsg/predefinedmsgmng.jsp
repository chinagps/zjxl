<%@ page language="java" contentType="text/html; charset=utf-8"	pageEncoding="utf-8"%>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>业务支撑-企业管理</title>
<script type="text/javascript" src="script/predefinedMsg/predefinedmsgmng.js"></script>
</head>
<body>
<div id="predefinedmsgmng">
	<div id="predefinedmsgmngcontent" class="content">
	<div class="content">
			<div class="right_cs">
				<form id="predefinedmsgSearchForm">
				<div class="Backstage2">
					<ul class="QueryListCondition">
						<li>
							<div>
								信息类型：<select id="businessIdSearch" name="requestParam.equal.msgType" style="width:110px;" class="srkjl4 w_yy_3">
										<option value="">请选择</option>
										<option value="1">文本信息</option>
										<option value="2">事件信息</option>
									</select>
							</div>
						</li>
						<li>
							<div>
								录入人：<input name="requestParam.like.opName" maxlength="20" style="width:110px;" type="text" class="srkjl4 w_yy_1" />
							</div>
							
						</li>
						<li>
							<input name="" type="submit" value="" class="btn_inquires" onmouseover="this.style.backgroundPosition='0px -200px'" onmouseout="this.style.backgroundPosition='0px -150px'"/>
						</li>
					</ul>
				</div>
				</form>
				<div class="right_cc">
					<div class="right_cdc2"><span class="R"><a id="showAdd" name="predefinedmsgAdd"><img title="新增" style="cursor: pointer;" src="images/global/jiahao.png" /></a></span></div>
					<div id="predefinedmsgGrid"></div>
				</div>
			</div>
		</div>
	</div>
	<div id="predefinedmsgSearchAddform" class="content" style="display:none;">
	</div>
	</div>
</body>
</html>
