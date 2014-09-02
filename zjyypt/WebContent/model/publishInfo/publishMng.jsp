<%@ page language="java" contentType="text/html; charset=utf-8"	pageEncoding="utf-8"%>


<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>业务支撑-管理</title>
<script type="text/javascript" src="script/publishInfo/publishMng.js"></script>
<script type="text/javascript" src="script/plugins/webEdit/editor_config.js"></script>
<script type="text/javascript" src="script/plugins/webEdit/editor_ui_all_zip.js"></script>
</head>

<body>
	<div id="publishInfomng">
	<div id="publishInfomngcontent" class="content">
			<div class="right_c">
				<div class="right_cs">
				
					<form id="publishSearchform">
					 <div class="Backstage2">
					 	<ul class="QueryListTitle">
					 		<li>
					 		所属企业：<span id="parentOrgNameOper"></span>
							<input id="parentOrgIdOper" name="requestParam.equal.entId" type="hidden" class="srkjl4 w_yy_1"/>
							</li>
					 	</ul>
						<ul class="QueryListCondition">
							<li>
							<div>
							<span>
							        企业资讯主题：</span><input name="requestParam.like.infoTheme" type="text" class="srkjl4 w_yy_1" />
							</div></li>
							<li>
							     <div>
						             <span>企业资讯类型：</span>
						             <select id="infoType2" name="requestParam.equal.infoType" class="srkjl4 w_yy_1">
						                  <option value="">请选择</option>
						                  <option value="002">企业公告</option>
						                  <option value="005">企业资讯</option>
						             </select>
							     </div>
							</li>
							<li>
								<input type="submit" id="goToSearch" class="btn_inquires" onmouseover="this.style.backgroundPosition='0px -200px'" onmouseout="this.style.backgroundPosition='0px -150px'" value="&nbsp;" />
							    <input id="entId" name="requestParam.equal.entId" type="hidden" /></li>
						</ul>
						</div>
					</form>
					<div class="right_cc">
						<div class="right_cdc2">
						<span class="R">
							<a id="showAdd"><img
								src="images/global/jiahao.png" />
							</a>
						</span>		
						</div>
						<div id="publishInfoGrid"></div>
					</div>
				</div>
		</div>
		 </div>
		<div id="publishSearchAddform" class="content" style="display:none;">
	             
		</div>
	</div>
	
</body>
</html>
