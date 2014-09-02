<%@ page language="java" contentType="text/html; charset=utf-8"	pageEncoding="utf-8"%>


<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html>
<head>
<base target="_self"/>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<script type="text/javascript" src="script/energymanagement/maintain/maintainclass/maintainClassManage.js"></script>
<link href="css/maintainClass/topTags.css" rel="stylesheet" type="text/css" />
<title>运营统计|维保类别管理</title>
</head>
<body>
		<div id="maintainClassManageDiv">
			<div id="maintainClassContentDiv" class="content">
				<div class="right_c">
					<div class="right_cs" style="border:#c0d7eb 1px solid;">
						<form id="maintainClassManageForm" action="#">
							<div class="planright_ct" style="border-bottom:none;">
								<!-- MaintainPlanQueryListTitle -->
									<ul class=MaintainPlanQueryListTitle>
										<li>
												<div>
													维保项目：							
													<select id="queryMainTainId" style="width: 120px;height:23px;" 
														name="requestParam.equal.maintainId">
													</select>
												</div>
										</li>
									    <li style="margin-left: 30px;">
												<div>
													维保内容：<input type="text" id="maintainContent" 
													name="requestParam.like.maintainContent" size="15"
													class="srkjl4" maxlength="400" />
												</div>
										</li>
										<li style="margin-left: 30px;">
												<div>&nbsp;&nbsp;
													创建人：<input type="text" id="createBy" size="15"
													name="requestParam.like.createByName" class="srkjl4" />
												</div>
										</li>
										<li style="margin-left: 30px;">
												<div>
													创建时间：<input type="text" id="createTimeFrom" size="15"
													name="requestParam.equal.createTimeFrom" readonly="readonly"
													class="srkjl4" onclick="WdatePicker();" /> 
													至 <input type="text" id="createTimeTo" size="15"
													name="requestParam.equal.createTimeTo" readonly="readonly"
													class="srkjl4" onclick="WdatePicker();" />
												</div>
										</li>
										<li style="margin-left:30px;">
											<div>
								          		<input type="submit" class="btn_inquires" onmouseover="this.style.backgroundPosition='0px -200px'" onmouseout="this.style.backgroundPosition='0px -150px'" value="" />
								        	</div>
								        </li>
								        <li class="R" id="maintainClassAddButton">
											<div>
								          		<input type="button" style="float:right;" value="新增" id="showAdd" class="btn_blue" onmouseover="this.style.backgroundPosition='0px -50px'" onmouseout="this.style.backgroundPosition='0px 0px'"/>
								        	</div>
								        </li>
								    </ul>
								</div>
						</form>
					</div>
					<div class="right_cc" style="margin-top:5px;">
						<div id="maintainClassGrid"></div>
					</div>
				</div>
			</div>
			<div id="maintainClassAddContainerDiv" class="content" style="display: none;"></div>
		</div>
</body>
</html>
