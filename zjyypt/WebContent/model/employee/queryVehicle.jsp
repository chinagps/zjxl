<%@ page language="java" contentType="text/html; charset=utf-8"	pageEncoding="utf-8"%>


<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<script src="script/employee/queryVehicle.js" type="text/javascript"></script>
<title>车辆选择</title>
</head>
<body>
	<div class="seven3" style="border:1px solid #146EB0;background-color: #FFF;">
		<div class="seventitle">
			<span class="Lfont" style="color:#fff;font-size: 12px;">车辆选择</span>
			<span class="R"><img id="closeQueryVehicle" style="cursor: pointer;" src="images/global/tcolse2.png" /></span>
		</div>
		<div id="queryvehicle">
			<div id="queryvehiclecontent" class="content1">
				<form id="queryVehicleForm" method="post">
					<input id="queryVehicleEntId" name="requestParam.equal.entIds" type="hidden" class="srkjl28" />
					<div class="sevenbg222">
						<ul class="Backstagebg6">
							<table width="100%" border="0" cellspacing="0" cellpadding="0" class="busfontt" style="background-color: #C9DFFF;">
								<tr height="25">
									<td width="15%" align="right">车牌号:</td>
									<td width="29%" align="left">
										<input name="requestParam.like.vehicleNo" type="text" class="srkjl28" />
									</td>
									<td width="20%" align="right">车辆VIN:</td>
									<td width="45%" align="left">
										<input name="requestParam.like.vinCode" type="text" class="srkjl28" />
									</td>
								</tr>
								<tr height="25">
									<td align="right">车辆编号:</td>
									<td align="left">
										<input name="requestParam.like.innerCode" type="text" class="srkjl28" />
									</td>
									<td align="right">车辆品牌:</td>
									<td align="left">
										<select id="vbrandCodeId" name="requestParam.equal.vbrandCode" style="width: 130px">
											<option value="">请选择</option>
										</select>
									</td>
								</tr>
								<!-- <tr>
									<td height="23" align="right">车型:</td>
									<td align="left">
										<select id="prodCodeId" name="requestParam.equal.prodCode" style="width: 130px">
											<option value="">请选择</option>
										</select>
									</td>
									<td align="right">&nbsp;</td>
									<td height="23" align="left">&nbsp;</td>
								</tr> BsApp没有根据对车辆品牌对车型的加载方法-->
								<tr height="30">
									<td colspan="2" align="center">
										<input type="submit" value="" class="bt2134" style="float:right;"/>
									</td>
									<td colspan="2" align="center">
										<input type="button" id="btnSure" value="确定" class="bt4" style="font-weight:bold;margin:0 0 0 0;"/>
									</td>
								</tr>
							</table>
						</ul>
						<div class="right_cc">
							<div id="queryVehicleTable"></div>
						</div>
					</div>
				</form>
			</div>
		</div>
	</div>
</body>
</html>