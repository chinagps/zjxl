<%@ page language="java" contentType="text/html; charset=utf-8"	pageEncoding="utf-8"%>


<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>调度信息详情</title>
<script src="script/entbusiness/thVehicleDispatchIssued.js" type="text/javascript"></script>
<script src="script/entbusiness/thVehicleDispatchReport.js" type="text/javascript"></script>
<script src="script/entbusiness/thVehicleDispatchMsg.js" type="text/javascript"></script>
</head>
<body>
	<div class="Backstage2" style="border-top:none;">
		<div class="right_ct" style="border-bottom:none;">
			<ul>
				<li class="h">
					<a href="javascript:void(0)" id="litab1" >平台下发</a>
				</li>
				<li>
					<a href="javascript:void(0)" id="litab2" >自主上报</a>
				</li>
			</ul>
		</div>
		<!-- 平台下发 -->
		<div id="tab1" style="display: none">
			

<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">

<div id="tvdIssued">
	<div class="content">
		<div class="right_c">
			<div class="right_cs">
				<form id="tvdIssuedForm" name="tvdIssuedForm" action="/thVehicleDispatchMsg.jsp" method="post">
					<div class="Backstage2" style="border-top:#c0d7eb 1px solid;">
						<div id="tvdiSelectParams" style="display: none"></div>
						<ul class="Backstagebg" style="height:44px;">
							<li>起始时间：
								<input type="text" name="" id="dmsgSrtimeStart" class="Wdate" style="width: 150px" onclick="WdatePicker({dateFmt:'yyyy-MM-dd HH:mm'})"/>
							</li>
							<li>结束时间：
								<input type="text" name="" id="dmsgSrtimeEnd" class="Wdate" style="width: 150px" onclick="WdatePicker({dateFmt:'yyyy-MM-dd HH:mm'})"/>
							</li>
							<li>
								<input type="submit" style="margin-left:100px;" class="btn_inquires" onmouseover="this.style.backgroundPosition='0px -200px'" onmouseout="this.style.backgroundPosition='0px -150px'" value="&nbsp;" />
<!--								<input type="submit" id="tvdIssuedForm_0" value="&#26597;&#35810;" class="bt_yy"/>
-->
							</li>
						</ul>
					</div>
				</form>




				<div class="right_cc">
				<div class="right_cdc2">
							<span class="R"> 
							<a id="dispatchIssuedExportExcel" style="cursor:hand;"><img title="导出信息"
									src="images/global/xiahao.png" /> </a> 			
							 </span>
						</div>
					<div id="tvdIssuedTable"></div>
				</div>
			</div>
		</div>
	</div>
	<div class="content" style="display: none;"></div>
</div>
		</div>
		<!-- 自主上报 -->
		<div id="tab2" style="display: none">
			

<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">

<div id="tvdReport">
	<div class="content">
		<div class="right_c">
			<div class="right_cs">
				<form id="tvdReportForm" name="tvdReportForm" action="/thVehicleDispatchMsg.jsp" method="post">
					<div class="Backstage2" style="border-top:#c0d7eb 1px solid;">
						<div id="tvdrSelectParams" style="display: none"></div>
						<ul class="Backstagebg" style="height:44px;">
							<li>起始时间：
								<input type="text" name="" id="umsgSrtimeStart" class="Wdate" style="width: 150px" onclick="WdatePicker({dateFmt:'yyyy-MM-dd HH:mm'})"/>
							</li>
							<li>结束时间：
								<input type="text" name="" id="umsgSrtimeEnd" class="Wdate" style="width: 150px" onclick="WdatePicker({dateFmt:'yyyy-MM-dd HH:mm'})"/>
							</li>
							<li>
								<input type="submit" style="margin-left:100px;" class="btn_inquires" onmouseover="this.style.backgroundPosition='0px -200px'" onmouseout="this.style.backgroundPosition='0px -150px'" value="&nbsp;" />
							</li>
						</ul>
					</div>
				</form>




				<div class="right_cc">
				<div class="right_cdc2">
							<span class="R"> 
							<a id="dispatchReportExportExcel" style="cursor:hand;"><img title="导出信息"
									src="images/global/xiahao.png" /> </a> 			
							 </span>
						</div>
					<div id="tvdReportTable"></div>
				</div>
			</div>
		</div>
	</div>
	<div class="content" style="display: none;"></div>
</div>
		</div>
	</div>
</body>
</html>