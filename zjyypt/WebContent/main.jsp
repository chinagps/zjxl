<%@ page language="java" contentType="text/html; charset=utf-8"	pageEncoding="utf-8"%>

<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<script type="text/javascript" src="script/homepage/homepage.js"></script>
<title>中交兴路运营平台</title>
<script type="text/javascript">
	$(document).ready(function() {
		//去掉链接的虚线
		$("a").bind("focus", function() {
			if (this.blur) {
				this.blur();
			}
		});
		first = new KCPT.first({
			id : "firstDiv",
			name : "基础信息",
			containerDiv : 'firstDiv',
			ready : {
				data : "load....",
				cbfun : function(t, data) {
					t.onReSize();
			}
			}
		});
		//添加到主框架中
			hp = new homePage();
			hp.maskAll();
			hp.showInformation();
			hp.initInfo();			
			hp.getPageInfo();
			hp.startTimer();
			hp.alarmTimer();
			hp.opLoginName();
			hp.vehicleShow();
			first.showObj = hp;
			window.winHp = hp;

			//平台实时报文和消息
			//new PlatformInspectAndMessage();
	
			//底部状态栏
			var bsmParam = {
					bottomObj: $("#footer")
				,	onlineNum: hp.onlineNumber
				,	operationVehicle: hp.operationVehicle
			};
			new BottomStatusMessage(bsmParam);
	        document.title=KCPT.TITLE;
			
	      	//平台实时报文和消息-手工查岗
			if(KCPT.user.businessLicense!='' && KCPT.user.businessLicense!= null){
				PlatformInspectAndMessage();
			}
	});
	
</script>
</head>
<body>
	<div id="contentMain">
		<div id="contentMain2" class="mainContent">
		<div class="sidebar_left">
	        <div class="enterprise_information">
	        	<div class="enterprise_information_top" ></div>
	            <div class="enterprise_information_main" id="main_corp_info" >
	            <ul></ul>
	            <div class="enterprise_information_bottom"></div>
	        	</div>        	
	        </div>
	        <div class="energy_saving_list">
	        	<div class="energy_saving_list_top">            	
	                	<ul>
		                    <li class="energy_saving_list_top_tab_selected" onclick="winHp.selectVehicleTop('1');" style="cursor: pointer;">车辆</li>
		                    <li class="energy_saving_list_top_tab" onclick="winHp.selectVehicleTop('3');" style="cursor: pointer;">车队</li>
	                    </ul>
				</div>
	            <div class="energy_saving_list_main" id="vehicleTeam" style="height:292px;">				
	            </div>
	            <div class="energy_saving_list_main" id="vehicle" style="height:292px;">
	            </div>	  
	        </div>
	    </div>
	    
	    <div class="sidebar_right">
			<div class="system_announcement">
	        	<div class="system_announcement_top"></div>
	            <div id="main_corpnotice" class="system_announcement_main">
	            	<ul></ul>
	            	<div class="system_announcement_bottom"></div>            
	            </div>
	            
	        </div>
	         <div class="question_feedback">
	         	<div class="question_feedback_top">
	         		<ul>
	            		<li class="question_feedback_top_tab_selected" onclick="winHp.showInformation()"><img style="float:left; margin:5px 0 0 7px; border:0;" src="images/global/feedback_img.png" />信息反馈</li>
	                	<li class="question_feedback_top_tab" onclick="winHp.showQuestion()"><a href="javascript:void(0);"><img style="float:left; margin:5px 0 0 7px; border:0;" src="images/global/my_question.png" />我的问题</a></li>
	           		</ul>
	            </div>
	            <div id="feedback" class="question_feedback_main" style="height:292px;">            
				</div>
				<div id="question" class="question_feedback_main" style="height:292px;">
				</div>			
	         </div>
	    </div>
	    
	    <div class="index_middle">
	    	<div class="vehicle_statistics">                      
	            <ul class="vehicle_statistics_right" id="enterpriseOnlineVehicle">
	                <li>0</li>
	                <li>0%</li>
	                <li>0</li>
	            </ul>
	            <ul class="vehicle_statistics_left" id="enterpriseAccessVehicle" onclick="winHp.vehicleToManagement()" style="cursor: pointer;">
	                <li><img src='images/global/newChange/vehicle_statistics_number_0.png'></li>
	                <li><img src='images/global/newChange/vehicle_statistics_number_0.png'></li>
	                <li><img src='images/global/newChange/vehicle_statistics_number_0.png'></li>
	                <li><img src='images/global/newChange/vehicle_statistics_number_0.png'></li>
	                <li><img src='images/global/newChange/vehicle_statistics_number_0.png'></li>
	                <li><img src='images/global/newChange/vehicle_statistics_number_0.png'></li>
	            </ul>	
	        </div>
	        <div class="alarmTrendDiagram">
	           <div class="alarmTrendDiagram_top">
               	<ul>
                  <li id='alarmTag0' class="alarmTrendDiagram_top_active_1"><a onClick="winHp.selectTag('alarmTag0')" href="javascript:void(0)"></a ></li>
                  <li id='alarmTag1' class="alarmTrendDiagram_top_2"><a onClick="winHp.selectTag('alarmTag1')" href="javascript:void(0)"></a ></li>
                  <li id='alarmTag2' class="alarmTrendDiagram_top_3"><a onClick="winHp.selectTag('alarmTag2')" href="javascript:void(0)"></a ></li>
               	</ul>
          	   </div>
	           <div class="warning_wait_main" id="alarmChartDiv" align="center">
	           		<iframe id="alarmChartDiv_frame" src="main_chart.jsp" style="width: 530px;height: 270px;border: none;overflow-x: hidden;overflow-y: hidden;" frameborder="0px" >
	           		</iframe>
	           </div>
	           <div class="alarmTrendDiagram_bottom">
    			<ul>
        			<li id='view1' class="alarmTrendDiagram_bottom_active_1"><a onClick="winHp.selectViewType('view1')" href="javascript:void(0)"></a></li>
        			<li id='view2' class="alarmTrendDiagram_bottom_2"><a onClick="winHp.selectViewType('view2')" href="javascript:void(0)"></a></li>
        		</ul>
    		   </div>
	        </div>
	        
	        <div class="road_conditions">
	        	<div class="road_conditions_top">
	            	<div class="road_conditions_top_1">
	                <select name="provinceCodes" id="roadSelect" onchange="winHp.showRoad(this)">
							<option value="">全部</option>
							<option value="110000">北京</option>
							<option value="120000">天津</option>
							<option value="130000">河北</option>
							<option value="410000">河南</option>
							<option value="430000">湖南</option>
							<option value="450000">广西</option>
							<option value="460000">海南</option>
							<option value="520000">贵州</option>
							<option value="610000">陕西</option>
							<option value="620000">甘肃</option>
							<option value="630000">青海</option>
							<option value="650000">新疆</option>
					</select>
	                </div>
	                <div class="road_conditions_top_2"><a href='javascript:void(0)' onclick='winHp.showEntMoreRoad()'>更多...</a></div>
	            </div>
	            <div class="road_conditions_main" id="road" >
	            	<div></div>
	            </div>
	         </div>
	    </div>
  </div>
</div>
</body>
</html>