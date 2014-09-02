<%@ page language="java" contentType="text/html; charset=utf-8"	pageEncoding="utf-8"%>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
<meta http-equiv="X-UA-Compatible" content="IE=edge" />
<title>中交兴路运营平台</title>
	<style type="text/css">v\:shape{behavior:url(#default#VML);} v\:oval{behavior:url(#default#VML);</style>
	<link rel="shortcut icon" href="images/global/logo.ico" />
	<script type="text/javascript" src="script/config/mapConfig.js"></script>
	<script type="text/javascript" src="script/plugins/jquery/jquery-1.8.3.min.js"></script>
	<script type="text/javascript" src="script/plugins/jquery/jquery.form.js"></script>
	<script type="text/javascript" src="script/util/codemanager.js"></script>
	<script type="text/javascript" src="script/config/config.js"></script>
	<script type="text/javascript" src="script/plugins/FancyZoom/js-global/FancyZoom.js"></script>
	<script type="text/javascript" src="script/plugins/FancyZoom/js-global/FancyZoomHTML.js"></script>
	<script type="text/javascript" src="script/initialize.js"></script>
</head>
<body id="fullbody" style="cursor: default; overflow: auto;min-width: 1024;min-height: 768" onbeforeunload="history.go(0);">
	<div id="mainDiv" style="display: none; overflow: hidden;">
		<div id="mainWorkArea">
			<div id="header">
				<div class="kcpt_top">
					<div class="kcpt_top_logo" style="margin-top:12px;">
						<img src="images/top/kcpt-logo.png" />
					</div>
					<div class="kcpt_top_welcome" id="kcpt_top_welcome" style="display: none;"><span id="opEndutc"></span><br />
					欢迎：<span id="opLoginName"></span><br />
					<a href="javascript:winHp.showRetPassWord()">修改密码</a> | <a
						href="javascript:winHp.logout();">注销</a> <!-- | <a href="javascript:void(0)">帮助</a> -->
					</div>
					<div id="CenterMaskDiv" style="z-index: 70000; position: relative;">
                        <div id="smoothmenu1" class="smoothmenu1" style="display: none;">
                            <ul class="sf-menu_ul" style="margin-left: 0px;" id="menu">
                                <li class="menuli" id="firstDivli" url="main.jsp">
                                    <a class="menu_a" href="javascript:void(0)"><img border="0" src="images/top/top-1.png" />
                                        <label class="menuli">
                                            首页
                                        </label>
                                    </a>
                                </li>
                                <li class="menuli" fun="FG_MEMU_MONITOR" id="monitorDivli" url="model/monitor/monitor.jsp">
                                    <a class="menu_a" href="javascript:void(0)"><img border="0" src="images/top/top-2.png"/>
                                        <label class="menuli">
                                            车辆监控
                                        </label>
                                    </a>
                                </li>
                                <li fun="FG_MEMU_VEHICLE_TEAM" value="1" class="menuli" id="motorcadeDiv">
									<a class="menu_a" href="javascript:void(0)">
										<img border="0" src="images/top/top-10.png" />
										<label class="menuli">车队管理</label>
									</a>
									<ul>
										<li fun="FG_MEMU_BUSINESS" value="2" class="submenu">
											<a class="submenu_a" href="javascript:void(0)">
												<img class="submenu_img" src="images/top/subMenuImg/safe_equipment.png" />
												<label class="submenu_label">业务管理</label>
												<div>&gt;</div>
											</a>
											<ul>
												<li fun="FG_MEMU_OILRECORD" value="3" class="submenu" url="model/oilrecord/oilRecordMng.jsp" lefttree="{treeTab:false,userGrid:false}">
													<a class="submenu_a" href="javascript:void(0)">
														<img class="submenu_img" src="images/top/subMenuImg/safe_equipment.png" />
														<label class="submenu_label">加油管理</label>
													</a>
												</li>
												<li fun="FG_MEMU_VEHICLEMAINTAIN" value="3" class="submenu" url="model/vehiclemaintain/vehicleMaintainMng.jsp" lefttree="{treeTab:false,userGrid:false}">
													<a class="submenu_a" href="javascript:void(0)">
														<img class="submenu_img" src="images/top/subMenuImg/safe_equipment.png" />
														<label class="submenu_label">维修管理</label>
													</a>
												</li>
												<li fun="FG_MEMU_VEHICLEINSPECTION" class="submenu"  value="3"  url="model/vehicleInspection/vehicleInspection.jsp" lefttree="{treeTab:false,userGrid:false}">
													<a class="submenu_a" href="javascript:void(0)">
														<img class="submenu_img" src="images/top/subMenuImg/safe_equipment.png" />
														<label class="submenu_label">年检管理</label>
													</a>
												</li>
												<li fun="FG_MEMU_VEHICLEINSUREANCE" class="submenu"  value="3"  url="model/vehicleinsureance/vehicleInsureance.jsp" lefttree="{treeTab:false,userGrid:false}">
													<a class="submenu_a" href="javascript:void(0)">
														<img class="submenu_img" src="images/top/subMenuImg/safe_equipment.png" />
														<label class="submenu_label">保险管理</label>
													</a>
												</li>
											</ul>
										</li>
										<li fun="FG_MEMU_VEHICLE" value="2" class="submenu">
											<a class="submenu_a" href="javascript:void(0)">
												<img class="submenu_img" src="images/top/subMenuImg/operations_plan.png" />
												<label class="submenu_label">车辆管理</label>
												<div>&gt;</div>
											</a>
											<ul>
												<li fun="FG_MEMU_VEHICLEOUT" value="3" class="submenu" url="model/vehicleout/vehicleoutOut.jsp" lefttree="{treeTab:false,userGrid:false}">
													<a class="submenu_a" href="javascript:void(0)">
														<img class="submenu_img" src="images/top/subMenuImg/operations_data_fence.png" />
														<label class="submenu_label">出车登记管理</label>
													</a>
												</li>
												<li fun="FG_MEMU_VEHICLEIN" value="3" class="submenu" url="model/vehicleout/vehicleoutIn.jsp" lefttree="{treeTab:false,userGrid:false}">
													<a class="submenu_a" href="javascript:void(0)">
														<img class="submenu_img" src="images/top/subMenuImg/operations_data_fence.png" />
														<label class="submenu_label">收车登记管理</label>
													</a>
												</li>
											</ul>
										</li>
										<li fun="FG_MEMU_INTELLIGENTEARLYWARNING" value="2" class="submenu" url="model/intelligentearlywarning/intelligentearlywarningList.jsp" lefttree="{treeTab:false,userGrid:false}">
											<a class="submenu_a" href="javascript:void(0)">
												<img class="submenu_img" src="images/top/subMenuImg/operations_plan.png" />
												<label class="submenu_label">智能预警</label>
											</a>
										</li>
										<li fun="FG_MEMU_VEHICLEIDLE" value="2" class="submenu" url="model/vehicleIdle/vehicleIdle.jsp" lefttree="{treeTab:false,userGrid:false}">
											<a class="submenu_a" href="javascript:void(0)">
												<img class="submenu_img" src="images/top/subMenuImg/operations_plan.png" />
												<label class="submenu_label">怠速管理</label>
											</a>
										</li>
									</ul>
								</li>
                                <li class="menuli" fun="FG_MEMU_SAFE" id="safeDiv">
                                    <a class="menu_a" href="javascript:void(0)"><img border="0" src="images/top/top-3.png" />
                                        <label class="menuli">
                                            安全管理
                                        </label>
                                    </a>
                                    <ul>
                                        <li fun="FG_MEMU_SAFE_EQUIPMENT" class="submenu" url="model/devicestatus/devicestatusList.jsp" lefttree="{treeTab:true,userGrid:true}">
                                            <a class="submenu_a" href="javascript:void(0)"><img class="submenu_img" src="images/top/subMenuImg/safe_equipment.png" />
                                                <label class="submenu_label">
                                                    设备状态
                                                </label>
                                            </a>
                                        </li>
                                        <li fun="FG_MEMU_SAFE_DRIVE" class="submenu" url="model/safetymanagement/unsafeDriving/mainFrame.jsp">
                                           <a class="submenu_a" href="javascript:void(0)"><img class="submenu_img" src="images/top/subMenuImg/safe_drive.png" />
                                                <label class="submenu_label">
                                                         安全驾驶
                                                </label>
                                            </a>
                                        </li>
                                        <li fun="FG_MEMU_SAFE_ALARM_FOLLOW" class="submenu" url="model/alarmtrack/alarmtrack.jsp" lefttree="{treeTab:false,userGrid:false}">
                                            <a class="submenu_a" href="javascript:void(0)"><img class="submenu_img" src="images/top/subMenuImg/safe_alarm_follow.png" />
                                                <label class="submenu_label">
                                                    告警明细
                                                </label>
                                            </a>
                                        </li>
                           				<li fun="FG_MEMU_SAFE_ALARM" class="submenu" url="model/energymanagement/vehicleAlarm.jsp">
                                            <a class="submenu_a" href="javascript:void(0)"><img class="submenu_img" src="images/top/subMenuImg/safe_alarm.png" />
                                                <label class="submenu_label">
                                                    告警统计
                                                </label>
                                            </a>
                                        </li>
                                        <li fun="FG_MEMU_SAFE_ALARM" class="submenu" url="model/safetymanagement/alarmStatistics/alarmStatisticsMain.jsp">
                                            <a class="submenu_a" href="javascript:void(0)"><img class="submenu_img" src="images/top/subMenuImg/safe_alarm.png" />
                                                <label class="submenu_label">
                                                    告警统计
                                                </label>
                                            </a>
                                        </li>  
                                        
                                        <li fun="FG_MEMU_VEHICLEREPLYALARMHISTORY" value="2" class="submenu" url="model/sysparam/vehicleReplyalarmhistory.jsp" lefttree="{treeTab:false,userGrid:false}">
											<a class="submenu_a" href="javascript:void(0)">
												<img class="submenu_img" src="images/top/subMenuImg/safe_alarm.png" />
												<label class="submenu_label">自动转发记录</label>
											</a>
										</li>
                                        
                                        <li fun="FG_MEMU_SAFE_DRIVING_RECORD" class="submenu" url="model/safetymanagement/drivingRecord/drivingRecordMainPage.jsp" lefttree="{treeTab:false,userGrid:false}">
                                            <a class="submenu_a" href="javascript:void(0)"><img class="submenu_img" src="images/top/subMenuImg/safe_drive_record.png" />
                                                <label class="submenu_label">
                                                    事故疑点分析
                                                </label>
                                            </a>
                                        </li>
                                        
                                        <li fun="FG_MEMU_SAFE_LOCUS" class="submenu" url="model/traffichistory/trafficHistory.html">
                                            <a class="submenu_a" href="javascript:void(0)"><img class="submenu_img" src="images/top/subMenuImg/safe_locus.png" />
                                                <label class="submenu_label">
                                                    轨迹分析
                                                </label>
                                                <div>&gt;</div>
											</a>
											
                                            <ul>
                                                <li fun="FG_MEMU_SAFE_LOCUS_AREA"  value="3" class="submenu" url="model/traffichistory/trafficHistory.html">
                                                    <a class="submenu_a" href="javascript:void(0)"><img class="submenu_img" src="images/top/subMenuImg/safe_locus_area.png" />
                                                        <label class="submenu_label">
                                                            区域协查
                                                        </label>
                                                    </a>
                                                </li>
                                            </ul>
											
                                        </li>
                                        <li fun="FG_MEMU_SAFE_VIEWFILELOG" class="submenu" url="model/viewfilelog/viewfilelog.jsp" >
                                            <a class="submenu_a" href="javascript:void(0)"><img class="submenu_img" src="images/top/subMenuImg/maintenance_service_network.png" />
                                                <label class="submenu_label">
                                                    行驶记录查询
                                                </label>
                                            </a>
                                        </li>
                                    </ul>
                                </li>
                                
<!--                                 <li class="menuli" fun="FG_MEMU_ENERGY" id="orgainDiv"> -->
<!--                                     <a class="menu_a" href="javascript:void(0)"><img border="0" src="images/top/top-4.png" /> -->
<!--                                         <label class="menuli"> -->
<!--                                             能耗管理 -->
<!--                                         </label> -->
<!--                                     </a> -->
<!--                                     <ul> -->
<!--                                         <li fun="FG_MEMU_ENERGY_STATIC" class="submenu" url="vehiclestat/initVehicleOilWear.action"> -->
<!--                                         <li fun="FG_MEMU_ENERGY_STATIC" class="submenu" url="model/energymanagement/oilwearstat/mainFrame.jsp"> -->
<!--                                             <a class="submenu_a" href="javascript:void(0)"><img class="submenu_img" src="images/top/subMenuImg/energy_static.png" /> -->
<!--                                                 <label class="submenu_label"> -->
<!--                                                     油耗统计 -->
<!--                                                 </label> -->
<!--                                             </a> -->
<!--                                         </li> -->
<!--                                         <li fun="FG_MEMU_ENERGY_DRIVE" class="submenu" url="model/economizedriving/fuelsavingDriving/fuelMainFrame.jsp"> -->
<!--                                             <a class="submenu_a" href="javascript:void(0)"><img class="submenu_img" src="images/top/subMenuImg/energy_drive.png" /> -->
<!--                                                 <label class="submenu_label"> -->
<!--                                                     节油驾驶 -->
<!--                                                 </label> -->
<!--                                             </a> -->
<!--                                         </li> -->
<!--                                         <li fun="FG_MEMU_ENERGY_ANALYSIS" class="submenu" url="vehiclestat/initSingleVehicleOil.action"> -->
<!--                                             <a class="submenu_a" href="javascript:void(0)"><img class="submenu_img" src="images/top/subMenuImg/energy_analysis.png" /> -->
<!--                                                 <label class="submenu_label"> -->
<!--                                                     单车油耗分析 -->
<!--                                                 </label> -->
<!--                                             </a> -->
<!--                                         </li> -->
<!--                                         <li fun="FG_MEMU_ENERGY_MANAGER" class="submenu" url="model/energymanagement/addOilManagement/vehicleOilManage.jsp"> -->
<!--                                             <a class="submenu_a" href="javascript:void(0)"><img class="submenu_img" src="images/top/subMenuImg/energy_manager.png" /> -->
<!--                                                 <label class="submenu_label"> -->
<!--                                                     加油记录管理 -->
<!--                                                 </label> -->
<!--                                             </a> -->
<!--                                         </li> -->
<!--                                         	<li fun="FG_MEMU_OILCALIBRATION_MONITOR" value="2" class="submenu"> -->
<!-- 											<a class="submenu_a" href="javascript:void(0)"> -->
<!-- 												<img class="submenu_img" src="images/top/subMenuImg/energy_manager.png" /> -->
<!-- 												<label class="submenu_label">油箱油量监控</label> -->
<!-- 												<div>&gt;</div> -->
<!-- 											</a> -->
<!-- 											<ul> -->
<!-- 												<li fun="FG_MEMU_OILCALIBRATION" value="3" class="submenu" url="model/oilcalibration/oilCalibration.jsp"> -->
<!-- 													<a class="submenu_a" href="javascript:void(0)"> -->
<!-- 														<img class="submenu_img" src="images/top/subMenuImg/maintenance_analysis.png" /> -->
<!-- 														<label class="submenu_label">油量标定设置</label> -->
<!-- 													</a> -->
<!-- 												</li> -->
<!-- 												<li fun="FG_MEMU_OILMONITOR" value="3" class="submenu" url="model/oilmonitor/oilMonitor.jsp"> -->
<!-- 													<a class="submenu_a" href="javascript:void(0)"> -->
<!-- 														<img class="submenu_img" src="images/top/subMenuImg/maintenance_analysis.png" /> -->
<!-- 														<label class="submenu_label">油量监控统计</label> -->
<!-- 													</a> -->
<!-- 												</li> -->
<!-- 											</ul> -->
<!-- 										</li> -->
<!--                                     </ul> -->
<!--                                 </li> -->
                                <li class="menuli" fun="FG_MEMU_MAINTENANCE" id="powerDiv">
                                    <a class="menu_a" href="javascript:void(0)"><img border="0" src="images/top/top-5.png" />
                                        <label class="menuli">
                                            智能维保
                                        </label>
                                    </a>
                                    <ul>
                                        <li fun="FG_MEMU_MAINTENANCE_TYPE" class="submenu" url="model/energymanagement/maintain/maintainclass/maintainClassFream.jsp">
                                            <a class="submenu_a" href="javascript:void(0)"><img class="submenu_img" src="images/top/subMenuImg/maintenance_type.png" />
                                                <label class="submenu_label">
                                                    车辆智能维保
                                                </label>
											</a>
                                        </li>
										<li fun="FG_MEMU_MAINTENANCE_ANALYSIS" class="submenu" url="model/machinemanagement/vehicleanalysis/vehicleReportList.jsp"> 
                                        	<a class="submenu_a" href="javascript:void(0)"><img class="submenu_img" src="images/top/subMenuImg/maintenance_analysis.png" /> 
                                          		<label class="submenu_label">
                                          			单车分析报告 
                                          		</label> 
                                       		</a>
	                                    </li>
<!--                                         <li fun="FG_MEMU_MAINTENANCE_DRIVE_STATIC" class="submenu" url="model/vehiclemanagement/vehicleReport/mainFrame.jsp"> -->
<!--                                             <a class="submenu_a" href="javascript:void(0)"><img class="submenu_img" src="images/top/subMenuImg/maintenance_drive_static.png" /> -->
<!--                                                 <label class="submenu_label"> -->
<!--                                                     车辆运行统计 -->
<!--                                                 </label> -->
<!--                                             </a> -->
<!--                                         </li> -->
										<!--
										<li fun="FG_MEMU_MAINTENANCE_ANALYSIS" class="submenu" url="model/machinemanagement/vehicleanalysis/vehicleReportList.jsp">
                                            <a class="submenu_a" href="javascript:void(0)"><img class="submenu_img" src="images/top/subMenuImg/maintenance_analysis.png" />
                                                <label class="submenu_label">
                                                    设备状态
                                                </label>
                                            </a>
                                        </li>
										-->
<!--                                         <li fun="FG_MEMU_MAINTENANCE_SERVICE_NETWORK" class="submenu" url="model/servicespoi/servicespoi.jsp"> -->
<!--                                             <a class="submenu_a" href="javascript:void(0)"><img class="submenu_img" src="images/top/subMenuImg/maintenance_service_network.png" /> -->
<!--                                                 <label class="submenu_label"> -->
<!--                                                     服务网点查询 -->
<!--                                                 </label> -->
<!--                                             </a> -->
<!--                                         </li> -->
                                    </ul>
                                </li>
                                <li class="menuli" fun="FG_MEMU_STATIC" id="systemDiv">
                                    <a class="menu_a" href="javascript:void(0)"><img border="0" src="images/top/top-6.png" />
                                        <label class="menuli">
                                            运营统计
                                        </label>
                                    </a>
                                    <ul>
                                        <li fun="FG_MEMU_STATIC_STATIC" class="submenu" >
                                            <a class="submenu_a" href="javascript:void(0)"><img class="submenu_img" src="images/top/subMenuImg/static_static.png" />
                                                <label class="submenu_label">
                                                    运营统计
                                                </label>
                                                <div>&gt;</div>
											</a>
                                            <ul>
                                                <li fun="FG_MEMU_STATIC_STATIC_ILLEGAL" value="3" class="submenu" url="model/operationmanagement/operatingIllegal.jsp">
                                                    <a class="submenu_a" href="javascript:void(0)"><img class="submenu_img" src="images/top/subMenuImg/static_static_illegal.png" />
                                                        <label class="submenu_label">
                                                            运营违规统计
                                                        </label>
                                                    </a>
                                                </li>
                                                <li fun="FG_MEMU_STATIC_STATIC_OVERANDFATIGUE" class="submenu" url="model/operationstat/vehicleOverAndFatigueReport/vehicleOverAndFatigueReportPage.jsp">
                                                    <a class="submenu_a" href="javascript:void(0)"><img class="submenu_img" src="images/top/subMenuImg/static_static_illegal.png" />
                                                        <label class="submenu_label">
                                                            三超一疲劳报表
                                                        </label>
                                                    </a>
                                                </li>
												<li fun="FG_MEMU_STATIC_STATIC_TLOG" class="submenu" url="model/onlinestat/onlinestat.jsp" lefttree="{treeTab:false,userGrid:false}">
                                                    <a class="submenu_a" href="javascript:void(0)"><img class="submenu_img" src="images/top/subMenuImg/static_select_uptime.png" />
                                                        <label class="submenu_label">
                                                           在线率统计
                                                        </label>
                                                    </a>
                                                </li>
												<li fun="FG_MEMU_STATIC_STATIC_ILLEGAL" class="submenu" url="model/illoperating/illoperating.jsp" lefttree="{treeTab:true,userGrid:true}">
                                                    <a class="submenu_a" href="javascript:void(0)"><img class="submenu_img" src="images/top/subMenuImg/static_select_dispatch.png" />
                                                        <label class="submenu_label">
                                                           运营违规统计
                                                        </label>
                                                    </a>
                                                </li>
												<li fun="FG_MEMU_STATIC_STATIC_MILEAGE" value="3" class="submenu" url="model/mealCount/mealCount.jsp" lefttree="{treeTab:false,userGrid:false}">
                                                    <a class="submenu_a" href="javascript:void(0)"><img class="submenu_img" src="images/top/subMenuImg/static_static_mileage.png" />
                                                        <label class="submenu_label">
                                                            行驶里程统计
                                                        </label>
                                                    </a>
                                                </li>
                                                <li fun="FG_MEMU_STATIC_STATIC_UPTIME" value="3" class="submenu" url="model/vehiclelinerate/vehiclelinerate.jsp" lefttree="{treeTab:false,userGrid:false}">
                                                    <a class="submenu_a" href="javascript:void(0)"><img class="submenu_img" src="images/top/subMenuImg/static_access.png" />
                                                        <label class="submenu_label">
                                                            车辆上线率统计
                                                        </label>
                                                    </a>
                                                </li>
                                                <li fun="FG_MEMU_STATIC_STATIC_UPTIME" value="3" class="submenu" url="model/vehiclelinerate/vehiclelinerate.jsp">
                                                    <a class="submenu_a" href="javascript:void(0)"><img class="submenu_img" src="images/top/subMenuImg/static_static_uptime.png" />
                                                        <label class="submenu_label">
                                                            轨迹质量分析
                                                        </label>
                                                    </a>
                                                </li>
                                            </ul>
                                        </li>
<!--                                         <li fun="FG_MEMU_STATIC_ASSESS" class="submenu" url="model/operationmanagement/operationscore.jsp"> -->
<!--                                             <a class="submenu_a" href="javascript:void(0)"><img class="submenu_img" src="images/top/subMenuImg/energy_manager.png" /> -->
<!--                                                 <label class="submenu_label"> -->
<!--                                                     运营考核 -->
<!--                                                 </label> -->
<!--                                                 <div></div> -->
<!-- 											</a> -->
											<!--  
                                            <ul>
                                                <li fun="FG_MEMU_STATIC_ASSESS_EFFICIENT" value="3" class="submenu" url="model/operationmanagement/performancegrade/oilScore.jsp">
                                                    <a class="submenu_a" href="javascript:void(0)"><img class="submenu_img" src="images/top/subMenuImg/static_access_efficient.png" />
                                                        <label class="submenu_label">
                                                            节油驾驶考核
                                                        </label>
                                                    </a>
                                                </li>
                                                <li fun="FG_MEMU_STATIC_ASSESS_SECURITY" value="3" class="submenu" url="model/operationmanagement/performancegrade/safeScore.jsp">
                                                    <a class="submenu_a" href="javascript:void(0)"><img class="submenu_img" src="images/top/subMenuImg/static_access_security.png" />
                                                        <label class="submenu_label">
                                                            安全驾驶考核
                                                        </label>
                                                    </a>
                                                </li>
                                                <li fun="FG_MEMU_STATIC_ASSESS_SCORE" value="3" class="submenu" url="model/operationmanagement/performancegrade/gradeScore.jsp">
                                                    <a class="submenu_a" href="javascript:void(0)"><img class="submenu_img" src="images/top/subMenuImg/static_access_score.png" />
                                                        <label class="submenu_label">
                                                            综合驾驶评分
                                                        </label>
                                                    </a>
                                                </li>
                                            </ul>-->
<!--                                         </li> -->
                                        <li fun="FG_MEMU_STATIC_SELECT" class="submenu">
                                            <a class="submenu_a" href="javascript:void(0)"><img class="submenu_img" src="images/top/subMenuImg/static_select.png" />
                                                <label class="submenu_label">
                                                    运营查询
                                                </label>
                                                <div>&gt;</div>
											</a>
                                            <ul>
                                            	<li fun="FG_MEMU_STATIC_SELECT_VEHICLE_INFO" value="3" class="submenu" url="model/vehicleinfo/vehicleinfo.jsp" lefttree="{treeTab:false,userGrid:false}">
                                                    <a class="submenu_a" href="javascript:void(0)"><img class="submenu_img" src="images/top/subMenuImg/static_select_vehicle_info.png" />
                                                        <label class="submenu_label">
                                                            车辆信息查询
                                                        </label>
                                                    </a>
                                                </li>
                                                <li fun="FG_MEMU_STATIC_SELECT_LOG" class="submenu" value="3" url="model/operatelog/operatelog.jsp" lefttree="{treeTab:false,userGrid:false}">
                                                    <a class="submenu_a" href="javascript:void(0)"><img class="submenu_img" src="images/top/subMenuImg/static_select_log.png" />
                                                        <label class="submenu_label">
                                                            操作日志查询
                                                        </label>
                                                    </a>
                                                </li>

                                                <li fun="FG_MEMU_STATIC_SELECT_DISPATCH" class="submenu" value="3" url="model/entbusiness/thVehicleDispatchMsg.jsp" lefttree="{treeTab:true,userGrid:true}">
                                                    <a class="submenu_a" href="javascript:void(0)"><img class="submenu_img" src="images/top/subMenuImg/static_select_dispatch.png" />
                                                        <label class="submenu_label">
                                                            调度信息查询
                                                        </label>
                                                    </a>
                                                </li>
                                                <li fun="FG_MEMU_STATIC_SELECT_PIC" class="submenu" value="3" url="model/mediaInfo/mediainfomng.jsp" lefttree="{treeTab:true,userGrid:true}">
                                                    <a class="submenu_a" href="javascript:void(0)"><img class="submenu_img" src="images/top/subMenuImg/static_select_pic.png" />
                                                        <label class="submenu_label">
                                                            多媒体信息查询
                                                        </label>
                                                    </a>
                                                </li>
												<li fun="FG_MEMU_STATIC_SELECT_PIC" class="submenu" value="3" url="model/mediaInfo/mediainfomng.jsp">
                                                    <a class="submenu_a" href="javascript:void(0)"><img class="submenu_img" src="images/top/subMenuImg/static_select_pic.png" />
                                                        <label class="submenu_label">
                                                            终端登录查询
                                                        </label>
                                                    </a>
                                                </li>
<!-- 												<li fun="FG_MEMU_STATIC_SELECT_SUPERVISE" class="submenu" value="3" url="model/ThVehicleAlarmtodo/ThVehicleAlarmtodo.jsp"> -->
<!--                                                     <a class="submenu_a" href="javascript:void(0)"><img class="submenu_img" src="images/top/subMenuImg/static_select_supervise.png" /> -->
<!--                                                         <label class="submenu_label"> -->
<!--                                                             督办记录查询 -->
<!--                                                         </label> -->
<!--                                                     </a> -->
<!--                                                 </li> -->
<!--                                                 <li fun="FG_MEMU_STATIC_SELECT_WARNING" class="submenu" value="3" url="model/ThVehicleEarlywarning/ThVehicleEarlywarning.jsp"> -->
<!--                                                     <a class="submenu_a" href="javascript:void(0)"><img class="submenu_img" src="images/top/subMenuImg/static_select_warning.png" /> -->
<!--                                                         <label class="submenu_label"> -->
<!--                                                             预警记录查询 -->
<!--                                                         </label> -->
<!--                                                     </a> -->
<!--                                                 </li> -->
<!-- 												<li fun="FG_MEMU_STATIC_SELECT_COMMAND" class="submenu" value="3" url="model/reporthistorycount/reporthistorycount.jsp"> -->
<!--                                                     <a class="submenu_a" href="javascript:void(0)"><img class="submenu_img" src="images/top/subMenuImg/operations_ent.png" /> -->
<!--                                                         <label class="submenu_label"> -->
<!--                                                             监管报文记录 -->
<!--                                                         </label> -->
<!--                                                     </a> -->
<!--                                                 </li> -->

<!--                                                 <li fun="FG_MEMU_STATIC_SELECT_POST_HISTORY" class="submenu" value="3" url="model/findThPlatInfos/findThPlatInfos.jsp"> -->
<!--                                                     <a class="submenu_a" href="javascript:void(0)"><img class="submenu_img" src="images/top/subMenuImg/static_access_efficient.png" /> -->
<!--                                                         <label class="submenu_label"> -->
<!--                                                             监管查岗记录 -->
<!--                                                         </label> -->
<!--                                                     </a> -->
<!--                                                 </li> -->
												<li fun="FG_MEMU_STATIC_SELECT_UPDOWN" class="submenu" value="3" url="model/vehicleoffonlinecount/vehicleoffonlinecount.jsp" lefttree="{treeTab:false,userGrid:false}">
                                                    <a class="submenu_a" href="javascript:void(0)"><img class="submenu_img" src="images/top/subMenuImg/static_select_updown.png" />
                                                        <label class="submenu_label">
                                                            车辆上下线查询
                                                        </label>
                                                    </a>
                                                </li>
												<li fun="FG_MEMU_STATIC_SELECT_UPDOWN" class="submenu" value="3" url="model/vehicleoffonlinecount/vehicleoffonlinecount.jsp">
                                                    <a class="submenu_a" href="javascript:void(0)"><img class="submenu_img" src="images/top/subMenuImg/static_select_updown.png" />
                                                        <label class="submenu_label">
                                                            用户在线情况
                                                        </label>
                                                    </a>
                                                </li>
												<li fun="FG_MEMU_STATIC_SELECT_DRIVER" class="submenu" value="3" url="model/driverMessageRecord/driverMessageRecord.jsp" lefttree="{treeTab:false,userGrid:false}">
                                                    <a class="submenu_a" href="javascript:void(0)"><img class="submenu_img" src="images/top/subMenuImg/static_select_driver.png" />
                                                        <label class="submenu_label">
                                                            驾驶员识别查询
                                                        </label>
                                                    </a>
                                                </li>
												<li fun="FG_MEMU_STATIC_SELECT_LINK_LOG_HISTORY" value="3" class="submenu" url="model/ThLinkStatus/ThLinkStatus.jsp">
                                                    <a class="submenu_a" href="javascript:void(0)"><img class="submenu_img" src="images/top/subMenuImg/static_select_link_log_history.png" />
                                                        <label class="submenu_label">
                                                            平台链路控制
                                                        </label>
                                                    </a>
                                                </li>
<!--                                                 <li fun="FG_MEMU_STATIC_SELECT_LINK_LOG_HISTORY" value="3" class="submenu" url="model/ThLinkStatus/ThLinkStatus.jsp"> -->
<!--                                                     <a class="submenu_a" href="javascript:void(0)"><img class="submenu_img" src="images/top/subMenuImg/static_select_link_log_history.png" /> -->
<!--                                                         <label class="submenu_label"> -->
<!--                                                             链路历史情况 -->
<!--                                                         </label> -->
<!--                                                     </a> -->
<!--                                                 </li> -->


<!--                                                 <li fun="FG_MEMU_STATIC_SELECT_POST_HISTORY" class="submenu" value="3" url="model/vehicleWaybill/vehicleWaybill.jsp"> -->
<!--                                                     <a class="submenu_a" href="javascript:void(0)"><img class="submenu_img" src="images/top/subMenuImg/static_select_command.png" /> -->
<!--                                                         <label class="submenu_label"> -->
<!--                                                             电子运单查询 -->
<!--                                                         </label> -->
<!--                                                     </a> -->
<!--                                                 </li> -->
<!--                                                 <li fun="FG_MEMU_STATIC_SELECT_POST_HISTORY" class="submenu" value="3" url="model/bridge/bridge.jsp"> -->
<!--                                                     <a class="submenu_a" href="javascript:void(0)"><img class="submenu_img" src="images/top/subMenuImg/static_select_post_history.png" /> -->
<!--                                                         <label class="submenu_label"> -->
<!--                                                            数据透传查询 -->
<!--                                                         </label> -->
<!--                                                     </a> -->
<!--                                                 </li> -->
												<li fun="FG_MEMU_STATIC_SELECT_UPTIME" class="submenu" value="3" url="model/vehicleOnline/vehileOnline.jsp" lefttree="{treeTab:false,userGrid:false}">
                                                    <a class="submenu_a" href="javascript:void(0)"><img class="submenu_img" src="images/top/subMenuImg/static_select_uptime.png" />
                                                        <label class="submenu_label">
                                                            车辆在线查询
                                                        </label>
                                                    </a>
                                                </li>
                                            </ul>
                                        </li>
                                    </ul>
                                </li>
                                <li class="menuli" fun="FG_MEMU_OPERATIONS" id="operatorDiv">
                                    <a class="menu_a" href="javascript:void(0)"><img border="0" src="images/top/top-7.png" />
                                        <label class="menuli">
                                            运营管理
                                        </label>
                                    </a>
                                    <ul>
                                          <li fun="FG_MEMU_OPERATIONS_TRIGGER" class="submenu" url="model/photographConfig/photographConfig.jsp" lefttree="{treeTab:false,userGrid:false}">
                                            <a class="submenu_a" href="javascript:void(0)"><img class="submenu_img" src="images/top/subMenuImg/operations_trigger_photos_set.png" />
                                                <label class="submenu_label">
                                                    触发拍照设置
                                                </label>
                                                <div></div>
											</a>
											</li>
										<li fun="FG_MEMU_OPERATIONS_JOB" class="submenu" url="model/photographJob/photographJob.jsp" lefttree="{treeTab:false,userGrid:false}">
									    	<a class="submenu_a" href="javascript:void(0)"><img class="submenu_img" src="images/top/subMenuImg/operations_trigger_photos_set.png" />
									        	<label class="submenu_label">
					定时拍照设置
									            </label>
									          <div></div>
											</a>
										</li>
<!--                                       <li fun="FG_MEMU_OPERATIONS_SETUP" class="submenu"> -->
<!--                                             <a class="submenu_a" href="javascript:void(0)"><img class="submenu_img" src="images/top/subMenuImg/operations_setup.png" /> -->
<!--                                                 <label class="submenu_label"> -->
<!--                                                     考核设置 -->
<!--                                                 </label> -->
<!--                                                 <div>&gt;</div> -->
<!-- 											</a> -->
<!--                                             <ul> -->
<!--                                                 <li fun="FG_MEMU_OPERATIONS_ASSECC_FUEL" value="3" class="submenu" url="model/assessoilset/assessoilsetmng.jsp"> -->
<!--                                                     <a class="submenu_a" href="javascript:void(0)"><img class="submenu_img" src="images/top/subMenuImg/operations_assecc_fuel.png" /> -->
<!--                                                         <label class="submenu_label"> -->
<!--                                                             油耗设置 -->
<!--                                                         </label> -->
<!--                                                     </a> -->
<!--                                                 </li> -->
<!--                                                 <li fun="FG_MEMU_OPERATIONS_ASSECC_SCORE_INFO" value="3" class="submenu" url="model/vehiclescore/scoremng.jsp"> -->
<!--                                                     <a class="submenu_a" href="javascript:void(0)"><img class="submenu_img" src="images/top/subMenuImg/operations_assecc_score.png" /> -->
<!--                                                         <label class="submenu_label"> -->
<!--                                                             评分设置 -->
<!--                                                         </label> -->
<!--                                                     </a> -->
<!--                                                 </li> -->
<!--                                                 <li fun="FG_MEMU_OPERATIONS_MONTH" class="submenu" value="3" url="model/monthset/monthsetmng.jsp"> -->
<!--                                                     <a class="submenu_a" href="javascript:void(0)"><img class="submenu_img" src="images/top/subMenuImg/operations_month.png" /> -->
<!--                                                         <label class="submenu_label"> -->
<!--                                                             月度管理 -->
<!--                                                         </label> -->
<!--                                                     </a> -->
<!--                                                 </li> -->
<!--                                             </ul> -->
<!--                                         </li> -->
                                        <li fun="FG_MEMU_OPERATIONS_ENT" class="submenu">
                                            <a class="submenu_a" href="javascript:void(0)"><img class="submenu_img" src="images/top/subMenuImg/operations_ent.png" />
                                                <label class="submenu_label">
                                                    基础数据管理
                                                </label>
                                                <div>&gt;</div>
											</a>
                                            <ul>
                                                <li fun="FG_MEMU_OPERATIONS_DATA_TEAM" class="submenu" value="3" url="model/corpinfo/corpinfomng.jsp" lefttree="{treeTab:false,userGrid:false}">
                                                    <a class="submenu_a" href="javascript:void(0)"><img class="submenu_img" src="images/top/subMenuImg/operations_data_team.png" />
                                                        <label class="submenu_label">
                                                            车队管理
                                                        </label>
                                                    </a>
                                                </li>
                                                <li fun="FG_MEMU_OPERATIONS_DATA_VEHICLE" class="submenu" value="3" url="model/vehicle/vehiclemng.jsp" lefttree="{treeTab:false,userGrid:false}">
                                                    <a class="submenu_a" href="javascript:void(0)"><img class="submenu_img" src="images/top/subMenuImg/operations_data_vehicle.png" />
                                                        <label class="submenu_label">
                                                            车辆管理
                                                        </label>
                                                    </a>
                                                </li>
                                                <li fun="FG_MEMU_OPERATIONS_DRIVERS" class="submenu" value="3" url="model/employee/employeemng.jsp" lefttree="{treeTab:false,userGrid:false}">
                                                    <a class="submenu_a" href="javascript:void(0)"><img class="submenu_img" src="images/top/subMenuImg/operations_drivers.png" />
                                                        <label class="submenu_label">
                                                            驾驶员管理
                                                        </label>
                                                    </a>
                                                </li>
<!--                                                 <li fun="FG_MEMU_OPERATIONS_TERMAINAL" class="submenu" value="3" url="model/terminalconfiguerprogram/terminalconfiguerprogram.jsp"> -->
<!--                                                     <a class="submenu_a" href="javascript:void(0)"><img class="submenu_img" src="images/top/subMenuImg/operations_terminal.png" /> -->
<!--                                                         <label class="submenu_label"> -->
<!--                                                             终端配置 -->
<!--                                                         </label> -->
<!--                                                     </a> -->
<!--                                                 </li> -->
<!--                                                 <li fun="FG_MEMU_OPERATIONS_VEHICLE_DETAIL" class="submenu" value="3" url="model/vtconfiguration/vehicleConfiguerMng.jsp"> -->
<!--                                                     <a class="submenu_a" href="javascript:void(0)"><img class="submenu_img" src="images/top/subMenuImg/operations_vehicle_detail.png" /> -->
<!--                                                         <label class="submenu_label"> -->
<!--                                                             车辆配置 -->
<!--                                                         </label> -->
<!--                                                     </a> -->
<!--                                                 </li> -->
											</ul>
										</li>
                                        <li fun="FG_MEMU_OPERATIONS_PLAN" class="submenu">
                                            <a class="submenu_a" href="javascript:void(0)"><img class="submenu_img" src="images/top/subMenuImg/operations_plan.png" />
                                                <label class="submenu_label">
                                                    线路围栏
                                                </label>
                                                <div>&gt;</div>
											</a>
                                            <ul>
                                                <li fun="FG_MEMU_OPERATIONS_DATA_LINE" class="submenu" value="3" url="model/classline/classlinemng.jsp" lefttree="{treeTab:false,userGrid:false}">
                                                    <a class="submenu_a" href="javascript:void(0)"><img class="submenu_img" src="images/top/subMenuImg/operations_data_line.png" />
                                                        <label class="submenu_label">
                                                            线路管理
                                                        </label>
                                                    </a>
                                                </li>
                                                <li fun="FG_MEMU_OPERATIONS_FENCE" class="submenu" value="3" url="model/area/areaMain.html" lefttree="{treeTab:false,userGrid:false}">
                                                    <a class="submenu_a" href="javascript:void(0)"><img class="submenu_img" src="images/top/subMenuImg/operations_data_fence.png" />
                                                        <label class="submenu_label">
                                                            围栏管理
                                                        </label>
                                                    </a>
                                                </li>
                                            </ul>
                                        </li>
                                        <!--<li fun="FG_MEMU_OPERATIONS_ASSECC_SCORE_INFO" class="submenu" url="model/systemmanagement/platformHistory.jsp"><a href="javascript:void(0)" >平台历史记录</a></li>-->
                                    </ul>
                                </li>
                                <li fun="FG_MEMU_REPORT" class="menuli" id="reportDiv" >
                                    <a class="menu_a" href="javascript:void(0)"><img border="0" src="images/top/top-9.png"  height="50px"/>
                                        <label class="menuli">
                    							 报表系统
                                        </label>
                                    </a>
                                </li>
                                <li class="menuli" fun="FG_MEMU_MANAGER" id="systemManagerDiv">
                                    <a class="menu_a" href="javascript:void(0)"><img border="0" src="images/top/top-8.png" />
                                        <label class="menuli">
                                            系统管理
                                        </label>
                                    </a>
                                    <ul>
                                        <li fun="FG_MEMU_MANAGER_USER" class="submenu" url="model/spoperator/operatormng.jsp" lefttree="{treeTab:false,userGrid:false}">
                                            <a class="submenu_a" href="javascript:void(0)"><img class="submenu_img" src="images/top/subMenuImg/manager_user.png" />
                                                <label class="submenu_label">
                                                    系统用户管理
                                                </label>
                                            </a>
                                        </li>
                                        <li fun="FG_MEMU_MANAGER_ROLE" class="submenu" url="model/sprole/rolemng.jsp" lefttree="{treeTab:false,userGrid:false}">
                                            <a class="submenu_a" href="javascript:void(0)"><img class="submenu_img" src="images/top/subMenuImg/manager_role.png" />
                                                <label class="submenu_label">
                                                    系统角色管理
                                                </label>
                                            </a>
                                        </li>
                                        <li fun="FG_MEMU_MANAGER_BULLETIN" class="submenu" url="model/publishInfo/publishMng.jsp" lefttree="{treeTab:false,userGrid:false}">
                                            <a class="submenu_a" href="javascript:void(0)"><img class="submenu_img" src="images/top/subMenuImg/manager_bulletin.png" />
                                                <label class="submenu_label">
                                                    企业资讯管理
                                                </label>
                                            </a>
                                        </li>
                                        <li fun="FG_MEMU_MANAGER_PARAMETER" class="submenu" url="model/sysparam/sysparam.jsp">
                                            <a class="submenu_a" href="javascript:void(0)"><img class="submenu_img" src="images/top/subMenuImg/manager_parameter.png" />
                                                <label class="submenu_label">
                                                    系统参数设置
                                                </label>
                                            </a>
                                        </li>
                                        <li fun="FG_MEMU_MANAGER_ALARMSTRATEGY" class="submenu" url="model/alarmstrategy/alarmstrategy.jsp" lefttree="{treeTab:false,userGrid:false}">
                                            <a class="submenu_a" href="javascript:void(0)"><img class="submenu_img" src="images/top/subMenuImg/manager_parameter.png" />
                                                <label class="submenu_label">
                                                    报警策略
                                                </label>
                                            </a>
                                        </li>
                                        <li fun="FG_MEMU_MANAGER_POIMANAGE" class="submenu" url="model/poimanage/poimanage.jsp">
                                            <a class="submenu_a" href="javascript:void(0)"><img class="submenu_img" src="images/top/subMenuImg/manager_parameter.png" />
                                                <label class="submenu_label">
                                                    POI管理
                                                </label>
                                            </a>
                                        </li>
                                        <li id="instCtrlSrvsubmenu" class="submenu" url="model/commandControl/commandControl.html"  lefttree="{treeTab:true,userGrid:true}">
                                            <a class="submenu_a" href="javascript:void(0)"><img class="submenu_img" src="images/top/subMenuImg/maintenance_maintenance.png" />
                                                <label class="submenu_label">
                                                    指令控制服务
                                                </label>
                                            </a>
                                        </li>
                                    </ul>
                                </li>                               
							</ul>
                        </div>
                    </div>
				</div>

				<div id="firstDiv" style="width: 100%;height:500px;overflow-y:auto;overflow-x:hidden;" ></div>
				<div id="monitorDiv" style="width: 100%; display: none;"></div>
				<div id="mainDivContent" class="mainDivContent">
					<table>
					<tr>
					<td>
					<div class="left_c" id="homeLeftDiv" style="float: left;height:500px;display: none;">
					</div>
					</td>
					<td>
					<div id="frame_tabs_content"
						style="float: left;display:none; padding-left: 3px;width: 99.8%;">
						<div id="pageNavigationDiv" class="pageNavigation hidden">
							<div style="float:left;"><img src="images/global/nav_01.png" /></div><span id="pageNavigationSpan"></span>
						</div>
						<div id="mainContontDiv" style="width: 100%;"></div>
						<!-- <div id="safeDiv"></div>
						<div id="orgainDiv"></div>
						<div id="powerDiv"></div>
						<div id="systemDiv"></div>
						<div id="operatorDiv"></div>
						<div id="systemManagerDiv"></div> -->
						<!-- <div id="reportDiv" class="reportDiv" u_path="model/report/report.jsp"></div> -->
					</div>
					</td>
					</tr>
					</table>
				</div>
			</div>
			<div id="flashVoiceDiv" style="width: 2px; height: 2px;"></div>
			<div id="loadmask_id_all" class="loadmask hidden"></div>
		</div>
		<div style="display: none" id="notify">
			<div id="default">
				<div class="messagebox new_alarm"
					style="z-index: 9999; width: 300px; height: 185px; background: #fff; border: #014D88 solid 2px; overflow: hidden;">
					<div
						style="padding-bottom: 0px; border-top: none; width: 100%; height: 100%; font-size: 12px;">
						<div
							style="width: 100%; height: 30px; background: url(css/menu/images/juhe.jpg) repeat-x;">
							<!--<div class="new_alarm_title">
                                <div class="new_alarm_pic_1"><img src="images/map/alarm.png"></div><span>新告警</span><span style="float:right; margin-right:30px;">更多>></span>
                                </div>
                                <div class="new_alarm_pic_2"><img src="images/map/new_alarm_close.jpg"></div>
                                -->
							<div
								style="margin-left: auto; background: url(css/menu/images/juhe.jpg) repeat-x; width: 100%">
								<div style="float: left;">
									<div style="float: left; margin-top: 5px; margin-left: 3px;">
										<img src="images/map/alarm.png">
									</div>
									<span
										style="height: 30px; line-height: 30px; font-weight: bold; padding-left: 8px; color: #fff;">新报警</span>
								</div>
								<div style="float: right">
									<a class="ui-notify-close" href="javascript:void(0);"><img
										src="css/menu/images/juhe-icon01.png" /></a>
								</div>
							</div>
						</div>
						<div class="message_content"
							style="width: 297px; height: 150px; brack-ground: #fff; font-size: 12px; color: #1f336b; text-align: left; overflow: hidden;">
							#{text}</div>
					</div>
				</div>
			</div>
		</div>
		<div id="footer" class="footer" style="display: none;">
			<div style="clear: both;"></div>
			<!-- <div class="page_bottom_1 onOffLineText">
				<div class="page_bottom_1_pic"><img src="images/bottom/image-1.png" /></div><div class="onOffLineText"></div>
			</div> -->
			<div class="page_bottom_2">
				<span class="page_bottom_2_sx"></span>
			</div>
			<div class="page_bottom_3 commandReturnText">
				<!--湘A51548：拍照指令<span class="page_bottom_3_sb">发送失败</span>，车机不在线-->
			</div>
			
			<div class="page_bottom_5 alarmText" vid="" title="点击打开报警处理窗口">
				<!--<div class="page_bottom_5_pic"><img src="images/bottom/image-2.png" /></div>
			    	<span class="page_bottom_5_bj"></span>-->
			</div>
			
			<div class="page_bottom_4 onlineVehicleCount">
				<!--当前在线车辆数：90   在线率<span class="page_bottom_4_zxl">90%</span>-->
			</div>
			<!--
				<div class="foot">
		            <div class="L">京ICP备05018144号</div>
		            <div class="R">北京中交兴路信息科技有限公司&nbsp;&nbsp;版权所有&nbsp;&nbsp;版本号：v2.0&nbsp;&nbsp;联系电话：4000966666</div>
	            </div>
				-->
		</div>
	</div>
	<script type="text/javascript">
		//屏蔽backspace回退 到首頁
		function onkeydown() {
			if (event.keyCode == 8) {
				if (document.activeElement.type == "text"||document.activeElement.type == "textarea") {
					if (document.activeElement.readOnly == false)
						return true;
				}
				return false;
			}
		}
		document.onkeydown = onkeydown;
		$.ajaxSetup({
			cache : false
		//关闭AJAX相应的缓存
		});
		//要跳往的模块
		guide_module = '';
	
		$(document).ready(function() {
			$("#mainDiv").show();
			//document.title = KCPT_title;//重设标题
			KCPT.AJAX = true;
			KCPT.isFirstLogOut = true;
		});
		window.onbeforeunload = function() {
			var n = window.event.screenX - window.screenLeft;
			var b = n > document.documentElement.scrollWidth - 20;
			if ((b && window.event.clientY < 0) || window.event.altKey || (window.event.keyCode == 8)) {
				//alert("是关闭而非刷新");   
				window.event.returnValue = "是否关闭或回到首页？";
			} else {
				//alert("是刷新而非关闭");   
			}
		};
			
		//此方法在onbeforeunload之后执行,onbeforeunload可以阻止其执行.
		/* window.onunload = function()
		{
			if(event.clientX > 360 && event.clientY < 0 || (event.altKey))
			{
	           JAjax("portal/logout.action", null, "json",null,null, true);
			}	
		} */
	
	</script>
	<script type="text/javascript">
	//	var menu = new menu.dd("menu");
	//	menu.init("menu", "menuhover");
	//用jQuery jquery-1.4.2.min.js的menu
	$(" #menu li").hover(function() {			
		$(this).find('ul:first').show();
	}, function() {				
		$(this).find('ul:first').hide();
	});
	
</script>
<script type="text/javascript">  
  
//处理键盘事件 禁止后退键（Backspace）密码或单行、多行文本框除外  
function banBackSpace(e){     
    var ev = e || window.event;//获取event对象     
    var obj = ev.target || ev.srcElement;//获取事件源     
      
    var t = obj.type || obj.getAttribute('type');//获取事件源类型    
      
    //获取作为判断条件的事件类型  
    var vReadOnly = obj.getAttribute('readonly');  
    var vEnabled = obj.getAttribute('enabled');  
    //处理null值情况  
    vReadOnly = (vReadOnly == null) ? false : vReadOnly;  
    vEnabled = (vEnabled == null) ? true : vEnabled;  
      
    //当敲Backspace键时，事件源类型为密码或单行、多行文本的，  
    //并且readonly属性为true或enabled属性为false的，则退格键失效  
    var flag1=(ev.keyCode == 8 && (t=="password" || t=="text" || t=="textarea")   
                && (vReadOnly==true || vEnabled!=true))?true:false;  
     
    //当敲Backspace键时，事件源类型非密码或单行、多行文本的，则退格键失效  
    var flag2=(ev.keyCode == 8 && t != "password" && t != "text" && t != "textarea")  
                ?true:false;          
      
    //判断  
    if(flag2){  
        return false;  
    }  
    if(flag1){     
        return false;     
    }     
}  
  
//禁止后退键 作用于Firefox、Opera  
document.onkeypress = banBackSpace;
//禁止后退键  作用于IE、Chrome  
document.onkeydown = banBackSpace; 
//document.onclick = banBackSpace;

</script> 
<!--add by tangfeng 2012-09-10 start 添加视频厂商-->
<!-- 播放雅讯电视视频   -->
<script for="VideoControl1" event="ServerConnect()" language="javascript">
		OnServerConnect();
</script>
<!--add by tangfeng 2012-09-10 end 添加视频厂商-->
<!--add by tangfeng 2012-10-30 end 添加视频厂商-->
<!-- 贝尔视频   -->
<script  for="VideoBE" event="OnLoginServer(s)">
	playVideoOne(s)
</script> 
<!--add by tangfeng 2012-10-30 end 添加视频厂商-->
</body>
</html>