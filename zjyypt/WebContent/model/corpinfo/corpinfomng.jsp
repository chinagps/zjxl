<%@ page language="java" contentType="text/html; charset=utf-8"	pageEncoding="utf-8"%>


<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>运营管理-基础数据管理-车队管理 </title>
<script type="text/javascript" src="script/corpinfo/corpinfoMng.js"></script>
</head>

<body>
	<div id="corpinfonmg">
		<div id="corpinfonmgcontent" class="content">
		<div class="content">
			<div class="right_c">
				<div class="right_cs">
					<form id="corpInfoSearchform">
						<div class="Backstage2">
							<ul class="QueryListTitle">
								<li>所属组织：<span id="parentOrgName"></span> <input
									name="requestParam.equal.parentId" type="hidden"
									id="parentOrgId" class="srkjl4 w_yy_1" />
									  <input id="orgTypeAdd" value="" type="hidden" />
									</li>
							</ul>
							<ul class="QueryListCondition">
								<li>
									<div>
										企业编码：<input name="requestParam.like.corpCode" type="text"
											class="srkjl4 w_yy_1" maxlength="10" />
									</div>
									<div style="width:100%">&nbsp;&nbsp;所属省：<select id="corpProvinceGrid" name="requestParam.equal.corpProvince" style="height:20px;width:130px;">
											<option value="">请选择</option>
										</select>
									</div></li>
								<li>
									<div>企业名称：<input name="requestParam.like.entName" maxlength="50"  type="text"
											class="srkjl4 w_yy_1" />
									</div>
									<div style="width:100%">&nbsp;&nbsp;所属市：<select id="corpCityGrid" name="requestParam.equal.corpCity" style="height:20px;width:130px;">
											<option value="">请选择</option>
										</select>
									</div>
								</li>
								<li>
									<input type="submit" class="btn_inquires" onmouseover="this.style.backgroundPosition='0px -200px'" onmouseout="this.style.backgroundPosition='0px -150px'" value="&nbsp;" />
								</li>
							</ul>
						</div>
					</form>
					<div class="right_cc">
						<div class="right_cdc2">
							<span class="R"> <a id="showAdd" style="cursor:hand;"><img title="新增"
									src="images/global/jiahao.png" /> </a>
<!--							<a id="impExcelButton" style="cursor:hand;"><img title="导入信息"-->
<!--									src="images/global/shanghao.png" /> </a> 	-->
							<a id="corpInfoExportExcel" style="cursor:hand;"><img title="导出信息"
									src="images/global/xiahao.png" /> </a> 			
							 </span>
						</div>
						<div id="corpinfoGrid"></div>
					</div>
				</div>
			</div>
		</div>
		</div>
		<div id="corpInfoSearchAddform" class="content" style="display: none;">
		</div>
	</div>
</body>
</html>
