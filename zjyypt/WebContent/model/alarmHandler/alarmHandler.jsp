<%@ page language="java" contentType="text/html; charset=utf-8"	pageEncoding="utf-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
	<meta http-equiv="X-UA-Compatible" content="IE=edge" />
	<title>报警处理</title>
	<style type="text/css">v\:shape{behavior:url(#default#VML);} v\:oval{behavior:url(#default#VML);</style>
	<link rel="shortcut icon" href="../../images/global/logo.ico" />
	<link href="../../css/alarmHandler/alarmHandler.css" rel="stylesheet" type="text/css" />
	<link href="../../script/plugins/ligerUI_V1.1.9/skins/Aqua/css/ligerui-all.css" rel="stylesheet" type="text/css" />
	<link href="../../css/jquery/jquery-ui.min.css" rel="stylesheet" type="text/css" />
	<link rel="stylesheet" type="text/css" href="../../script/plugins/loading/jquery.loadmask.css" />
	<link href="../../script/plugins/datePicker/skin/WdatePicker.css" rel="stylesheet" type="text/css" />
	<script type="text/javascript" src="../../script/plugins/jquery/jquery-1.8.3.min.js"></script>
	<script type="text/javascript" src="../../script/plugins/ligerUI_V1.1.9/js/core/base.js"></script>
	<script type="text/javascript" src="../../script/plugins/ligerUI_V1.1.9/js/plugins/ligerGrid.js"></script>
	<script type="text/javascript" src="../../script/plugins/ligerUI_V1.1.9/js/plugins/ligerDialog.js"></script>
	<script type="text/javascript" src="../../script/plugins/jquery/jquery.ui.core.js"></script>
	<script type="text/javascript" src="../../script/plugins/jquery/jquery.ui.widget.js"></script>
	<script type="text/javascript" src="../../script/plugins/jquery/jquery.ui.mouse.js"></script>
	<script type="text/javascript" src="../../script/plugins/jquery/jquery.ui.slider.js"></script>
	<script type="text/javascript" src="../../script/plugins/datePicker/WdatePicker.js"></script>
	<script type="text/javascript" src="../../script/plugins/loading/jquery.loadmask.js"></script>
	<script type="text/javascript" src="../../script/plugins/jqueryDownload/downloadr/jqbrowser.js"></script>
	<script type="text/javascript" src="../../script/plugins/jqueryDownload/downloadr/downloadr.js"></script>
	<script type="text/javascript" src="../../script/ctfoGrid/ctfoGrid.js"></script>
	<script type="text/javascript" src="../../script/alarmHandler/alarmHandlerUtil.js"></script>
	<script type="text/javascript" src="../../script/alarmHandler/alarmHandlerVedio.js"></script>
	<script type="text/javascript" src="../../script/config/mapConfig.js"></script>
	<script type="text/javascript" src="../../script/alarmHandler/init.js"></script>
</head>
<body>
	<div id="busThree">
		<div id="busThreeTop">
			<table width="100%" border="0" cellspacing="0" cellpadding="0" id="alarmHandler_pageTop">
				<tr>
					<td width="16" height="32" align="center"><img style="margin-left: 5px;"
						src="../../images/alarmHandler/busIcon01.png" width="16" height="16" /></td>
					<td width="120" height="32" class="busThreeFont"><span style="margin-left: 5px;">报警处理</span></td>
					<td width="90" height="32"></td>
					<td width="525" height="32"></td>
					<td align="right" height="32">  <img src="../../images/alarmHandler/alarmHandlerReturn.png"  class="hidden hand" alt="返回" id="returnBatchAlarmBtn" /> </td>
				</tr>
			</table>

		</div>
		<div class="busThreebj">
			<div id="tabPanel2" class="tabPanel2">
				<ul class="tabGroup">
					<li class="tabSelected"><a href="javascript:void(0);">当前告警列表</a></li>
					<li class="tab"><a href="javascript:void(0);">告警历史记录</a></li>
				</ul>
				<div class="tabContentGroup">
					<div class="tabContent mainTab">
						<div class="busThreeMain">
							<div class="busThreeLeft">
								<form action="" method="get">
									<table width="100%" border="0" cellspacing="0" cellpadding="0" class="remarksTable">
										<tr>
											<td class="processAlarmMenu" style="width: 100px;" align="right">备注：</td>
											<td width="87%"><div style="margin-right: 20px;">
													<textarea name="relieveAlarmRemark" rows="" class="busRemarks" style="width: 100%"></textarea>
												</div></td>
										</tr>
									</table>
								</form>
								<div class="busThreeButton">
									<div class="busThreeResult">
										<div class="busOrange hand">不作处理</div>
										<div class="busBlue hand">将来处理</div>
									</div>
									<div class="busGreen hand" style="margin-right: 20px;">处理完毕</div>
								</div>
								<div class="busline" style="margin-top: 45px;"></div>
								<div class="busThree">
									<!-- 单车报警处理 -->
									<form id="currentAlarmHandler_form">
										<table width="100%" border="0" cellspacing="0" cellpadding="0">
											<tr>
												<td class="processAlarmMenu" style="width: 100px;" height="35" align="right">告警级别：</td>
												<td height="35"><select class="busThreeSelect w138" id="alarmHandler_alarmLevelSel"  style="width:138px;">
														<option value="-1">全部</option>
														<option value="1">严重告警</option>
														<option value="2">中度告警</option>
														<option value="3">一般告警</option>
												</select></td>
												<td height="35" width="60" align="right">告警类型：</td>
												<td height="35"><select name="requestParam.equal.alarmCode" id="alarmHandler_alarmLevelType"
													class="busThreeSelect w156" style="width:156px;">
														<option value="">全部</option>
												</select></td>
											</tr>
											<tr>
												<td class="processAlarmMenu" align="right">时间范围：</td>
												<td colspan="3" align="left" valign="middle"><table width="280" border="0" cellspacing="0"
														cellpadding="0" class="timeRangeInput" style="float: left;">
														<tr>
															<td width="7%"><input type="radio" class="checkbox" checked="checked" name="timeLimit" value="2" /></td>
															<td width="18%">2小时内</td>
															<td width="6%"></td>
															<td width="18%"></td>
															<td width="6%"></td>
															<td width="19%"></td>
															<td width="6%"></td>
															<td></td>
														</tr>
													</table>

													<div style="float: right; width: 100px;">
														<input type="submit" id="alarmHandler_currentBtn" name="Submit" value="查找" class="busFind hand"
															style="margin-right: 20px;" /> <input type="hidden" name="requestParam.equal.levelId"
															id="alarmHandler_curAlarmLevelId"></input> <input type="hidden" name="requestParam.equal.startTime"
															id="alarmHandler_curAlarmStartTime"></input> <input type="hidden" name="requestParam.equal.endTime"
															id="alarmHandler_curAlarmEndTime"></input>
													</div></td>
											</tr>
										</table>
									</form>
									<!--批量报警处理 -->
									<form id="batchCurrentAlarmHandler_form">
										<table width="100%" border="0" cellspacing="0" cellpadding="0">
											<tr>

												<td height="35" width="100" align="right">车牌号码：</td>
												<td height="35" align="left"><input type="text" name="requestParam.like.vehicleNo"></input></td>

												<td class="processAlarmMenu" style="width: 100px;" height="35" align="right">告警级别：</td>
												<td height="35"><select name="requestParam.equal.alarmLevel" class="busThreeSelect w138"
													id="alarmHandler_alarmBatchLevelSel">
														<option value="-1">全部</option>
														<option value="0">严重告警</option>
														<option value="1">紧急告警</option>
														<option value="2">一般告警</option>
												</select></td>

											</tr>
											<tr>
												<td class="processAlarmMenu" align="right">时间范围：</td>
												<td colspan="3" align="left" valign="middle"><table width="280" border="0" cellspacing="0"
														cellpadding="0" class="timeRangeInput" style="float: left;">
														<tr>
															<td width="7%"><input type="radio"  name="timeLimit" value="0.5" /></td>
															<td width="18%">30分钟</td>
															<td width="6%"><label> <input type="radio" class="checkbox" name="timeLimit" value="1" />
															</label></td>
															<td width="18%">1小时内</td>
															<td width="6%"><label> <input type="radio" class="checkbox" name="timeLimit" value="2" />
															</label></td>
															<td width="19%">2小时内</td>
															<td width="6%"><input type="radio" class="checkbox" name="timeLimit" checked="checked" value="4" /></td>
															<td>4小时内</td>
														</tr>
													</table>

													<div style="float: right; width: 100px;">
														<input type="submit" id="alarmHandler_batchCurrentBtn" name="Submit" value="查找" class="busFind hand"
															style="margin-right: 20px;" /> <input type="hidden" name="requestParam.equal.levelId"
															id="alarmHandler_curBatchAlarmLevelId"></input> <input type="hidden" name="requestParam.equal.utc"
															id="alarmHandler_curBatchAlarmStartTime"></input> <input type="hidden" name="requestParam.equal.endTime"
															id="alarmHandler_curBatchAlarmEndTime"></input>
													</div></td>
											</tr>
										</table>
									</form>
								</div>
								<div class="busline"></div>
								<div class="busThreebiaoge" id="alarmHandler_currentAlarmListGrid"></div>
								<div class="busThreebiaoge" id="alarmHandler_batchCurrentAlarmListGrid"></div>

								<div class="busThreeCljbxx hidden">
									<div class="busThreeIcon">
										<img src="../../images/alarmHandler/busIcon05.png" />
									</div>
									<div class="busThreeFont">车辆基本信息</div>
								</div>
								<div class="busThreeInformation hidden">
									<p></p>
									<p></p>
									<p></p>
									<p></p>
									<p></p>
									<p></p>
								</div>
							</div>
						</div>
					</div>
					<div class="tabContent mainTab" style="display: none;">
						<div class="busHistory">
							<div class="historyLeft">
								<form action="" method="get">
									<table width="100%" border="0" cellspacing="0" cellpadding="0" class="remarksTable">
										<tr>
											<td class="processAlarmMenu" style="width: 100px;" align="right">备注：</td>
											<td width="87%"><div style="margin-right: 20px;">
													<textarea name="relieveAlarmRemark" rows="" class="busRemarks" style="width: 100%"></textarea>
												</div></td>
										</tr>
									</table>
								</form>
								<div class="busThreeButton">
									<div class="busThreeResult">
										<div class="busOrange hand">不作处理</div>
										<div class="busBlue hand">将来处理</div>
									</div>
									<div class="busGreen hand" style="margin-right: 20px;">处理完毕</div>
								</div>
								<div class="busline" style="margin-top: 45px;"></div>
								<div class="busHistoryone">
									<form id="alarmHandler_hisform">
										<table width="100%" border="0" cellspacing="0" cellpadding="0">
											<tr>
												<td height="35" align="right">报警类型:</td>
												<td height="35"><select name="requestParam.equal.alarmCode" id="alarmHandler_alarmType"
													class="busSelectone w138">
														<option value="">全部</option>
												</select></td>
												<td height="35" align="right">报警状态:</td>
												<td height="35"><select name="requestParam.equal.alarmHandlerStatusTyp" id="classline_alarmStatus"
													class="busSelectone w138">
														<option value="">全部</option>
														<option value="-1">未处理</option>
														<!-- <option value="1">处理中</option> -->
														<option value="2" avalue="2">处理完毕</option>
														<option value="2" avalue="0">不做处理</option>
														<option value="2" avalue="1">将来处理</option>
												</select></td>
											</tr>
											<tr>
												<td height="35" align="right">起始时间:</td>
												<td height="35">
													<div class="busStarttime">
														<input class="Wdate" style="width: 138px" id="alarmHandlerHis_startTime"
															onfocus="WdatePicker({dateFmt:'yyyy-MM-dd HH:mm:ss'})" type="text" /> <input type="hidden"
															name="requestParam.equal.startUtc" id="alarmHandlerHis_startTimeH" />
													</div>
												</td>
												<td height="35" align="right">结束时间:</td>
												<td height="35"><div class="busStarttime">
														<input class="Wdate " style="width: 138px" id="alarmHandlerHis_endTime"
															onfocus="WdatePicker({dateFmt:'yyyy-MM-dd HH:mm:ss'})" type="text" /> <input type="hidden"
															name="requestParam.equal.endUtc" id="alarmHandlerHis_endTimeH" />
													</div></td>
											</tr>
										</table>
										<div class="busButtona">
											<input type="hidden" id="alarmHandler_StatusType" /> <input type="submit" id="alarmHandler_hisBtn"
												style="margin-right: 20px;" name="Submit" value="查找" class="busFind hand" />
										</div>
									</form>

								</div>
								<div class="historyTable" id="alarmHandler_hisAlarmList"></div>
								<div class="busThreecar hidden">
									<div class="busThreeIcon">
										<img src="../../images/alarmHandler/busIcon05.png" />
									</div>
									<div class="busThreeFont">车辆基本信息</div>
								</div>
								<div class="busThreeInformation hidden">
									<p></p>
									<p></p>
									<p></p>
									<p></p>
									<p></p>
									<p></p>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
	<div id="busThreeRight" class="busThreeRight">
		<div class="busThreeMonitor">
			<div id="tabPanel3" class="tabPanel3">
				<ul class="tabGroup" id="alarmHandler_processTab">
					<li class="tab"><a href="javascript:void(0);">消息</a></li>
					<li class="tab"><a href="javascript:void(0);">拍照</a></li>
					<li class="tab"><a href="javascript:void(0);">监听</a></li>
					<li class="tab"><a href="javascript:void(0);">视频</a></li>
					<li class="tab" style="display: none;"><a href="javascript:void(0);">历史详情</a></li>
				</ul>
				<div class="tabContentGroup">
	
					<div class="tabContent" style="display: none;">
						<div class="busjianting">
							<form action="" method="get">
								<table width="100%" border="0" cellspacing="0" cellpadding="0">
									<tr>
										<td width="20%" height="41" align="right">发送方式:</td>
										<td width="3%" height="41" align="center"><label> <input type="checkbox" name="msgSendType"
												value="checkbox" class="checkbox" checked="checked" />
										</label></td>
										<td width="10%" height="41" align="left">紧急</td>
										<td width="3%" height="41" align="center"><label> <input type="checkbox" name="msgSendType"
												value="checkbox" class="checkbox" />
										</label></td>
										<td width="14%" height="41" align="left">终端显示</td>
										<td width="3%" height="41" align="center"><label> <input type="checkbox" name="msgSendType"
												value="checkbox" class="checkbox" />
										</label></td>
										<td width="14%" height="41" align="left">终端播读</td>
										<td width="3%" height="41" align="center"><label> <input type="checkbox" name="msgSendType"
												value="checkbox" class="checkbox" />
										</label></td>
										<td width="21%" height="41" align="left">广告屏显示</td>
									</tr>
									<tr>
	
										<td height="50" colspan="5"><span style="margin-left: 28px;">消息内容:</span> <textarea
												name="messageContext" class="busContent" style="width: 217px; height: 85px; margin-left: 28px;"></textarea>
										</td>
	
										<td height="50" colspan="4"><span>添加备注:</span> <textarea name="messageRemark" class="busContent"
												style="width: 217px; height: 85px;"></textarea></td>
									</tr>
									<tr>
	
										<td height="40" colspan="5"><select name="preinstallSelect" class="busSelect"
											style="margin-left: 28px; width: 217px;">
												<option>请停车</option>
										</select></td>
										<td height="40">&nbsp;</td>
	
										<td height="40" colspan="3"><div class="StartListening hand" id="alarmHandler_messageBtn">发送</div></td>
									</tr>
									<tr>
										<td colspan="9" align="center" height="30">
											<div class="busCenter">
												<div class="StartListeningRight" style="display: none;" id="alarmHandler_sendMsgFail">
													<img src="../../images/alarmHandler/icon32.png" /><span>指令发送失败</span>
												</div>
												<div class="StartListeningYellow" style="display: none;" id="alarmHandler_sendMsgSuccess">
													<img src="../../images/alarmHandler/icon33.png" /><span>指令发送成功</span>
												</div>
											</div>
										</td>
									</tr>
									<tr>
	
										<td colspan="9">
											<div class="busNewsRemarks" id="alarmHandler_context">
												<ul></ul>
											</div>
										</td>
									</tr>
									<tr>
										<td height="30" align="right">&nbsp;</td>
										<td height="30">&nbsp;</td>
										<td height="30">&nbsp;</td>
										<td height="30">&nbsp;</td>
										<td height="30">&nbsp;</td>
										<td height="30">&nbsp;</td>
										<td height="30">&nbsp;</td>
										<td height="30">&nbsp;</td>
										<td height="30">&nbsp;</td>
									</tr>
								</table>
							</form>
						</div>
	
	
					</div>
					<!-- 拍照start -->
					<div class="tabContent" style="display: none;"  id="alarmHandler_photoDiv">
						<!-----Photograph--Start---->
						<div class="busPhoto" >
							<form action="" method="get">
								<table width="100%" border="0" cellspacing="0" cellpadding="0" id="alarmHandler_caremaPosition">
									<tr>
										<td width="15%" height="30" align="right">摄像头:</td>
										<td width="3%" align="center"><input name="caremaPosition" type="checkbox" class="checkbox" checked="checked"
											value="1" /></td>
										<td width="9%" align="left">1路</td>
										<td width="3%" align="center"><input name="caremaPosition" type="checkbox" class="checkbox" value="2" /></td>
										<td width="9%" align="left">2路</td>
										<td width="3%" align="center"><input name="caremaPosition" type="checkbox" class="checkbox" value="3" /></td>
										<td width="9%" align="left">3路</td>
										<td width="3%" align="center"><input name="caremaPosition" type="checkbox" class="checkbox" value="4" /></td>
										<td width="46%" align="left">4路</td>
									</tr>
								</table>
							</form>
						</div>
						<div class="busPhotoTwo">
	
							<table width="280" border="0" id="alarmHandler_photoSharpness">
								<tr align="center">
									<td height="34">清晰度：</td>
									<td><input name="photoSharpness" type="radio" class="checkbox" value="1" />高清</td>
									<td><input name="photoSharpness" type="radio" class="checkbox" value="2" />清晰</td>
									<td><input name="photoSharpness" type="radio"  class="checkbox" value="3" checked=true />一般</td>
									<td><input type="button" id="alarmHandler_refershShowPhotoBtn" value="刷新" class="busDefault hand"
										style="margin-left: 5px;" /></td>
									<td>&nbsp;</td>
								</tr>
							</table>
	
	
							<table width="100%" border="0" cellspacing="0" cellpadding="0" id="alarmHandelr_setPhoto" class="hidden">
								<tr>
									<td align="right">镜头设置:</td>
									<td style="width: 60px;" align="right"><label>图像质量:</label><label
										class="alertMessageForPhotoQuality alertMessage R"></label></td>
									<td align="center"><input name="photoQuality" type="text" class="ptext3" value="2" /></td>
									<td>1</td>
									<td height="20">
										<div class="photoSlider" style="width: 40px;" id="photoQualitySlider"></div>
									</td>
									<td>10</td>
									<td width="55" align="right">分辨率:</td>
									<td colspan="4"><select name="photoSense" class="busSelect" style="margin-left: 12px;">
											<option selected="selected" value="0">320*240</option>
											<option value="1">640*480</option>
											<option value="2">800*600</option>
											<option value="3">1024*768</option>
									</select></td>
								</tr>
								<tr>
									<td><input type="submit" name="Submit" value="默认" class="busDefault hand" style="margin-left: 5px;" /></td>
									<td align="right">对比度:</td>
									<td align="center"><input name="photoContrast" type="text" class="ptext3" value="65" /></td>
									<td>1</td>
									<td>
										<div class="photoSlider" style="width: 40px;" id="photoContrastSlider"></div>
									</td>
									<td>127</td>
									<td align="right">亮度:</td>
									<td align="center"><input name="photoBrightness" type="text" class="ptext3" value="126" /></td>
									<td>0</td>
									<td>
										<div class="photoSlider" style="width: 40px;" id="photoBrightnessSlider"></div>
									</td>
									<td>255</td>
								</tr>
	
	
	
								<tr>
									<td></td>
									<td align="right">饱和度:</td>
									<td align="center"><input name="photoSaturation" type="text" class="ptext3" value="65" /></td>
									<td>0</td>
									<td>
										<div class="photoSlider" style="width: 40px;" id="photoSaturationSlider"></div>
									</td>
									<td>127</td>
									<td align="right">色度:</td>
									<td align="center"><input name="photoChroma" type="text" class="ptext3" value="126" /></td>
									<td>0</td>
									<td>
										<div class="photoSlider" style="width: 40px;" id="photoChromaSlider"></div>
									</td>
									<td>255</td>
								</tr>
								<tr>
									<td align="right">备注:</td>
									<td colspan="10" align="left"><label> <textarea name="textarea4" class="busTextarea"
												style="width: 400px;"></textarea>
									</label></td>
								</tr>
							</table>
						</div>
	
	
	
	
						<!-----Photograph--End---->
						<table style="width: 100%; margin-top: 10px; margin-bottom: 10px;">
							<tr>
								<td align="right" width="285"><input type="submit" value="拍照" name="sendPhotoCommand"
									id="alarmHandler_sendPhotoCommand" class="photo_bt1 hand"></input></td>
								<td>
									<div class="StartListeningRight" style="display: none;" id="alarmHandler_sendPhotoFail">
										<img src="../../images/alarmHandler/icon32.png" /><span>指令发送失败</span>
									</div>
									<div class="StartListeningYellow" style="display: none;" id="alarmHandler_sendPhoroSuccess">
										<img src="../../images/alarmHandler/icon33.png" /><span>指令发送成功</span>
									</div>
								</td>
							</tr>
						</table>
	
	
						<div id="alarmHandler_pictureContainer" class="photoDiv">
							<div class="alarmHandler_picTitle" id="alarmHandler_picTitle"></div>
							<div class="bigShowPhoto" style="margin-left: 10px; margin-right: 10px; margin-top: 10px;">
								<img src="../../images/alarmHandler/noPic_big.gif" width="380" height="285" />
							</div>
							<div class="pagingPhoto" style="margin-top: 10px;">
								<div class="scrollPreButton">
									<img src="../../images/map/new/scrollPreButtonGray.png" />
								</div>
								<div class="scrollPhotosDiv">
									<img src="../../images/map/noPic_small.gif" width="80" height="60" /> <img
										src="../../images/map/noPic_small.gif" width="80" height="60" /> <img
										src="../../images/map/noPic_small.gif" width="80" height="60" /> <img
										src="../../images/map/noPic_small.gif" width="80" height="60" />
								</div>
								<div class="scrollNextButton">
									<img src="../../images/map/new/scrollNextButton.png" />
								</div>
							</div>
	
						</div>
	
					</div>
					<!-- 拍照end -->
	
					<!--监听start -->
					<div class="tabContent">
						<div class="busjianting">
							<div class="jianting">
								<form action="" method="get">
									<div class="jtLeft" align="center">
										<input name="jianting" checked="checked" class="checkbox" type="radio" value="1" />监听 <input name="jianting"
											type="radio" class="checkbox" value="2" />录音
									</div>
								</form>
							</div>
	
							<div class="jiantingTab">
								<div class="busThreecar">
									<div class="busThreeIcon">
										<img src="../../images/alarmHandler/sound.png" />
									</div>
									<div class="busThreeFont">车辆监听</div>
								</div>
								<div class="busMonitor">
									<form action="" method="get">
										<table width="100%" border="0" cellspacing="0" cellpadding="0">
											<tr>
												<td style="width: 100px;" height="30" align="right">监听方式:</td>
												<td><div class="busjtfs">
														<div class="jtfsLeft">
															<input name="jiantingType" type="radio" class="checkbox" checked="checked" value="1" /><span>单向监听</span>
														</div>
														<div class="jtfsRight">
															<input name="jiantingType" type="radio" class="checkbox" value="2" /><span>双向通话</span>
														</div>
													</div></td>
											</tr>
											<tr>
												<td align="right">回拨手机号码:</td>
												<td><label> <input type="text" name="jiantingNumber" class="busInput" /><span></span>
												</label></td>
											</tr>
											<tr>
												<td align="right">添加备注:</td>
												<td><label> <textarea name="jiantingRemark" style="height: 130px;" class="busTextarea"></textarea>
												</label></td>
											</tr>
											<tr>
												<td height="40" colspan="2">
													<div class="busStartListening">
														<div class="StartListening hand" id="alarmHandler_jianTingBtn">开始监听</div>
														<div class="StartListeningRight" style="display: none;" id="alarmHandler_sendJianTingFail">
															<img src="../../images/alarmHandler/icon32.png" /><span>指令发送失败</span>
														</div>
														<div class="StartListeningYellow" style="display: none;" id="alarmHandler_sendJianTingSuccess">
															<img src="../../images/alarmHandler/icon33.png" style="absmiddle" />指令发送成功
														</div>
													</div>
												</td>
											</tr>
										</table>
									</form>
	
								</div>
							</div>
	
							<div class="jiantingTab" style="display: none;">
								<div class="busThreecar">
									<div class="busThreeIcon">
										<img src="../../images/alarmHandler/icon34.png" />
									</div>
									<div class="busThreeFont">录音</div>
								</div>
	
	
								<form method="get" action="">
									<table border="0" cellSpacing="0" cellPadding="0" width="100%">
	
										<tbody>
											<tr>
												<td height="40" width="14%" align="right">录音时长:</td>
												<td height="40" width="86%"><label> <select id="alarmHandler_recordTime">
															<option value="10">10</option>
															<option value="20">20</option>
															<option value="30">30</option>
													</select>
												</label></td>
											</tr>
											<tr>
												<td height="157" align="right">添加备注:</td>
												<td height="157"><label> <textarea class="busTextarea" style="height: 130px;"
															id="alarmHandler_recordRemark" name="textarea"></textarea>
												</label></td>
											</tr>
											<tr>
												<td height="40" colSpan="2">
													<div class="busStartListening">
														<div class="StartListening hand" id="alarmHandler_startRecordBtn" style="display:block">开始录音</div>
														<div class="StartRecording hand" id="alarmHandler_endRecordBtn"  style="display:none;margin-left:0;">停止录音</div>
														<div class="StartListeningRight" style="display: none;" id="alarmHandler_startRecordFail">
															<img src="../../images/alarmHandler/icon32.png"><span>指令发送失败</span>
														</div>
														<div class="StartListeningYellow" style="display: none;" id="alarmHandler_startRecordSuccess">
															<img src="../../images/alarmHandler/icon33.png"><span>指令发送成功</span>
														</div>
													</div>
												</td>
											</tr>
											<tr>
												<td colspan="2">
													<div align="center" id="alarmHandler_recordTimeText"></div>
												</td>
											</tr>
										</tbody>
									</table>
								</form>
	
	
	
							</div>
	
	
						</div>
	
					</div>
					<!-- 监听end -->
	
					<div class="tabContent" style="display: none;"></div>
					<div class="tabContent" style="display: none;">
						<div class="historyFont Alarm_history_processing_details">
							<div style="margin-top:20px; color:#000;">还没有告警详情哦，</div>
							<div style="color:#000;">您可以点击左侧的告警历史记录列表中的“详情”，查看告警处理过程！</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>

	<div class="busmap" style="position: absolute;" id="alarmHandler_map"></div>
</body>
</html>
