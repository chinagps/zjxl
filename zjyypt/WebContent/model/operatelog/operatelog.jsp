<%@ page language="java" contentType="text/html; charset=utf-8"	pageEncoding="utf-8"%>


<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
	<head>
		<title></title>
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
		<style>
		.QueryListCondition li{width:auto;}
		</style>
		<script src="script/operatelog/operatelog.js" type="text/javascript"></script>
	</head>
	<body>
		<div id="operateLog">
			<div id="operatelogcontent" class="content">
			<div class="content">
				<div class="right_c">
					<div class="right_cs">
						<form id="operateLogForm" name="operateLogForm" action="/operatelog.jsp" method="post">	
						<input type="hidden" name="requestParam.equal.enterpriseId" value="" id="opEntId"/>	
							<div class="Backstage2">
								<div id="tvdiSelectParams" style="display: none"></div>
								<ul class="QueryListTitle">
									<li>
										组织名称:
										<span id="opNodeName" style="width: 90px; text-align:left;"></span>
									</li>
								</ul>
								<ul class="QueryListCondition">		
									<li style="width:27%;">
										<div>起始时间：
											<input type="text" name="" id="startTime" class="Wdate srkjl4 w_yy_1" style="width:130px;" onclick="WdatePicker()"/>
										</div>
									</li>
									<li style="width:27%;">
										<div>结束时间：
											<input type="text" name="" id="endTime" class="Wdate srkjl4 w_yy_1" style="width:130px;" onclick="WdatePicker()"/>
										</div>
									</li>
									<li style="width:27%;">
										<div>查询类型：
											<select id="selectId" name="requestParam.equal.logTypeid" class="srkjl4 w_yy_3" style="width:130px;">
												<option value="">请选择</option>
											</select>
										</div>
									</li>
									<li style="width:13%;">
										<input type="submit" class="btn_inquires" onmouseover="this.style.backgroundPosition='0px -200px'" onmouseout="this.style.backgroundPosition='0px -150px'" value="&nbsp;" />
									</li>
								</ul>
							</div>
							<div id="operatelogSelectParams"></div>
						</form>




						<div class="right_cc">
							<div class="right_cdc2">
								<span class="L"><strong>日志信息</strong></span>
								<span class="R">
									<a id="operatLogExportExcel"  style="cursor:hand;"><img title="导出"  src="images/global/xiahao.png" /></a>&nbsp;
<!--									<img title="导入" style="cursor: pointer;" src="images/global/xiahao.png" />-->
								</span>
							</div>
							<div id="operateLogTable"></div>
						</div>
					</div>
				</div>
			</div>
			</div>
			<div class="content" style="display: none;"></div>
		</div>
	</body>
</html>