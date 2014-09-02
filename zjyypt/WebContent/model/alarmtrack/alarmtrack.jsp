<%@ page language="java" contentType="text/html; charset=utf-8"	pageEncoding="utf-8"%>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>报警跟踪</title>
<script type="text/javascript" src="script/alarmtrack/alarmtrack.js"></script>  
</head>
<body>
<div id="alarmtrack">
	<div id="alarmtrackcontent" class="content">
	<div class="content">
		<div class="right_cs">
			<form id="alarmtrackSearchForm">
			<div class="Backstage2" style="border-top:none; border-bottom:none;">
			<div id="tvdiSelectParams" style="display: none"></div>
		      <ul class="QueryListCondition" style="height: 80px;line-height:">
		           <li>
		              <div> 
		                  <span style="width: 70px; text-align:right;">所属组织：</span>
		                  <span id="alarmtrackOrgName"></span>
						  <input id="vehicleinfoOrgId" name="" type="hidden" class="srkjl4 w_yy_1"/>
					  </div>
					</li>
					
		      		<li style="width: 100%">
		            	<span>
		           		 	车牌号码：<input id="alarmTrack_vehicleNoText"  name="requestParam.like.vehicleNo" type="text" maxlength="11" style="width: 110px;" class="srkjl4 w_yy_1" />
		            	</span>
						<span>
		           		 	<!-- <span style="width: 70px; text-align:right;">报警级别：</span> -->
		           		 	&nbsp;&nbsp;报警类型：<select id="parentAlarmCode" name="requestParam.equal.parentAlarmCode" class="select" style="width: 115px;margin: 0 0 0 2px;">
															<option value="-1">全部</option>
															<option value="1">严重告警</option>
															<option value="2">中度告警</option>
															<option value="3">一般告警</option>
															<option value="4">提示告警</option>
			       			</select>
			       			<input type="hidden"  name="requestParam.equal.alarmCodeArray" id="alarmTrack_alarmCodeArray" />
		            	</span>
		                <span>
		           		 	<select id="alarmCode"  name="requestParam.equal.alarmCode" class="select" style="width: 150px;margin-left:2px;">
			       				<option value="">全部</option>
			       			</select>
		                </span>
						<span>
							<input type="submit" id="alarmtrackSearchFormSubmit" class="btn_inquires" onmouseover="this.style.backgroundPosition='0px -200px'" onmouseout="this.style.backgroundPosition='0px -150px'" value="" />
							<!--<input id="alarmtrackSearchFormSubmit" type="submit" value="" class="bt_yy" style="float: left;margin-left: 30px; padding-left: 10px;"/>-->
						</span>
		            </li>
		            <li style="width: 100%">
		               <span>
							起始时间：<input id="aaccee" name="startTime"  onclick="WdatePicker({dateFmt:'yyyy-MM-dd',isShowClear:true})" type="text" maxlength="11" style="width: 110px;" class="Wdate srkjl4 w_yy_1" />
						</span>
						<span>
							&nbsp;&nbsp;结束时间：<input name="endTime" onclick="WdatePicker({dateFmt:'yyyy-MM-dd',isShowClear:true})" type="text" maxlength="11" style="width: 110px;" class="Wdate srkjl4 w_yy_1" />
						</span>
		            </li>
		        </ul>
		      </div>
		      </form>
		      <div class="right_cc">
		       <div class="right_cdc2">
							<span class="R"> 
							<a id="alarmtrackExportExcel" style="cursor:hand;"><img title="导出信息"
									src="images/global/xiahao.png" /></a> 			
						</span>
				</div>
		      <div id="alarmtrackfirsttable">
		        <div style="width:100%;height:40px; display: none;"> <!-- 报警个级别的数量，暂时不显示  -->
		    		<table width="100%"; height="100%"; style="margin-left: 10px">
		    			<tr>
		    				<td style="padding-top:15px;"></td>
		    				<td style="padding-top:15px;"></td>
		    				<td style="padding-top:15px;"></td>
		    				<td style="padding-top:15px;"></td>
		    				<td style="padding-top:15px;"></td>
		    			</tr>
		    		</table>
		        </div>
		        <div id="alarmtrackGrid">
			    </div>
			    </div>
			    <div id="alarmtracksecondtable" style="display:none;">
			    	<div style="width:100%;height:40px;">
		    		<table width="100%";height="100%"; style="margin-left: 10px">
		    			<tr>
		    				<td style="padding-top:15px;">车牌号码 ：<span name="vehicleNo"></span></td>
		    				<td style="padding-top:15px;">驾驶员 ：<span name="staffName"></span></td>
		    				<td style="padding-top:15px;">车队名 ：<span name="teamName"></span></td>
		    				<td style="padding-top:15px;">企业名 ： <span name="corpName"></span></td>
		    				<td style="padding-top:15px;">线路 : <span name="lineName"></span></td>
		    			</tr>
		    			<tr>
		    				<td style="padding-top:15px;">报警来源 : <span name="alarmSrc"></span></td>
		    				<td style="padding-top:15px;">报警类型 ：<span name="alarmName"></span></td>
		    				<!-- <td style="padding-top:15px;">报警等级 ：<span name="levelName"></span></td> 2012-11-22 qishuping注释掉，查询未加企业id限定，且之前页面已经显示级别-->
		    				<td style="padding-top:15px;">备注 ：<span name="remark"></span></td>
		    				<td style="padding-top:15px;">处理状态：<span name="alarmHandlerStatus"></span></td>
		    			</tr>
		    			<tr>
		    				<td style="padding-top:15px;"></td>
		    				<td style="padding-top:15px;"></td>
		    				<td style="padding-top:15px;"></td>
		    				<td style="padding-top:15px;"></td>
		    				<td style="padding-top:15px;"></td>
		    				<td style="padding-top:15px;"><input type="button" value="返回" class="monitorButton" id="returntoalarmtrick" style="margin-bottom: 3px;"></input></td>
		    			</tr>
		    		</table>
		        </div>
			     	<div  id="alaramDealGrid">
   					</div>
   				</div>
		      </div>
	    </div>
   </div>
 
   </div>
</div>
</body>
</html>
