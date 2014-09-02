<%@ page language="java" contentType="text/html; charset=utf-8"	pageEncoding="utf-8"%>


<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<title>运营管理-线路管理</title>
<script type="text/javascript" src="script/classline/classlinemng.js" />
<script type="text/javascript" src="script/classline/addlineTip.js" />
<link href="css/global/employee.css" rel="stylesheet" type="text/css" />
</head>

<body>
	<div id="editclasslinepage">
		<ul class="areaTab_all">
			<li><a class="areaTab_back">线路管理</a></li>
			<li><a>绑定查询</a></li>
		</ul>
		<div id="classlinecontent" class="content">
			<div class="right_c">
				<div class="right_cs">
					<form id="searchClassLineForm">
						<div class="Backstage2" style="border-top:1px solid #C0D7EB;">
							<ul class="QueryListTitle">
								<li>所属企业： <span id="parentOrgName"></span> <input
									name="requestParam.equal.belongToCrop" type="hidden"
									id="parentOrgIdClass" />
								</li>
							</ul>
							<ul class="QueryListCondition">
								<li>线路名称： <input name="requestParam.like.lineName"
									maxlength="20" type="text" class="srkjl4 w_yy_1" />
								</li>
								<li>线路编码： <input name="requestParam.like.lineCode"
									type="text" maxlength="15" class="srkjl4 w_yy_1" />
								</li>
								<li>
									<input type="submit" id="classline_searchBtn" class="btn_inquires" onmouseover="this.style.backgroundPosition='0px -200px'" onmouseout="this.style.backgroundPosition='0px -150px'" value="&nbsp;" />
									</li>
							</ul>
						</div>
					</form>
					<div class="right_cc">
						<div class="right_cdc2">
							<a id="addPage_class" title="增加" style="cursor: pointer;"
								href="javascript:void(0)"> <img
								src="images/global/jiahao.png" align="right" />
							</a>&nbsp;
						</div>
						<div id="classLineMngGrid"></div>
					</div>
				</div>
			</div>
			<div class="right_c hidden">
				<div class="right_cs">
				<form id="searchClassLineBindForm">
					<div class="Backstage2" style="border-top:1px solid #c0d7eb;">
						<ul class="QueryListTitle">
							<li>所属企业： <span id="parentOrgNameBindSearch"></span> <input
								name="requestParam.equal.belongToCrop" type="hidden"
								id="parentOrgIdBindstatus" />
							</li>
						</ul>
						<ul class="QueryListCondition" style="height: 80px;">
							<li><div>线路名称： <input name="requestParam.like.lineName"
								maxlength="20" type="text" class="srkjl4 w_yy_1" /></div>
							</li>
							<li><div>车牌号： <input name="requestParam.like.vehicleNo"
								type="text" maxlength="15" class="srkjl4 w_yy_1" /></div>
							</li>
							<li><div>
								<input type="submit" id="classline_bindSearchBtn" class="btn_inquires" onmouseover="this.style.backgroundPosition='0px -200px'" onmouseout="this.style.backgroundPosition='0px -150px'" value="&nbsp;" />
							</div></li>

							<li><div>操作类型： <select class="srkjl4 w_yy_1"
								name="requestParam.equal.lineStatus" style="height:20px;">
								<option value="">请选择</option>
								<option value="1">绑定</option>
								<option value="2">修改</option>
								<option value="3">解除绑定</option></select></div>
							</li>
							<li><div>状&nbsp;&nbsp;态： <select class="srkjl4 w_yy_1"
								name="requestParam.equal.status" style="height:20px;">
								<option value="">请选择</option>
								<option value="0">成功</option>
								<option value="1">失败</option></select></div>
							</li>


						</ul>
					</div>
				</form>
				<div id="classlineBindSerchGrid"></div>
				</div>
	
			</div>
		</div>
	</div>

</body>
</html>
