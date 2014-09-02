/**
 * 首页
 */

var homePage = function(o) {
	var entId = null;// 企业代码
	var infoType = null;// 信息类型公告
	this.string = '';
	this.enterpriseVehicle = 0;
	//this.operationVehicle = 0; //运营状态统计的入网车辆
	this.timesId = "contentMain";
	this.timesName = "firstPageInfo";
	this.alarmType = 1;
	this.alarmNumType = "Day"; // 告警图查询时间类型
	this.viewType = "column";  // 告警图展示类型
};
homePage.prototype = {
	selectVehicleTop : function(value) {
		var homeObj = this;
		if (value === '3') {
			$(".energy_saving_list").find(".energy_saving_list_top").find("li").eq(0).removeClass("energy_saving_list_top_tab_selected");
			$(".energy_saving_list").find(".energy_saving_list_top").find("li").eq(0).addClass("energy_saving_list_top_tab");
			$(".energy_saving_list").find(".energy_saving_list_top").find("li").eq(1).addClass("energy_saving_list_top_tab_selected");		
			//车队排行榜
			JAjax("memcache/memcache!getVehicleTeamTop.action", {"entId" : KCPT.user.entId}, "json",
					homeObj.VehicleTeamTopList, null, true, homeObj);
			winHp.vehicleTeamShow();
		} else {
			$(".energy_saving_list").find(".energy_saving_list_top").find("li").eq(1).removeClass("energy_saving_list_top_tab_selected");
			$(".energy_saving_list").find(".energy_saving_list_top").find("li").eq(0).addClass("energy_saving_list_top_tab_selected");
			winHp.vehicleShow();
		}
	},
	showRoad : function(obj) {
		var value = obj[obj.selectedIndex].value;
		var data = {};
		if(value){
			 data = {"provinceCodes" : value};
		}
		JAjax("memcache/memcache!getRoadCondition.action", data, "json", winHp.findTbRoadConditionList, null, true, winHp);
	},
	showInformation : function() {
		$(".question_feedback").find(".question_feedback_top").find("li").eq(0).addClass("question_feedback_top_tab_selected");
		$(".question_feedback").find(".question_feedback_top").find("li").eq(1).removeClass("question_feedback_top_tab_selected");
		if($(".question_feedback").find(".question_feedback_top").find("li").eq(1).children("strong").html() != null){
			$(".question_feedback").find(".question_feedback_top").find("li").eq(1).children("strong").remove();
			$(".question_feedback").find(".question_feedback_top").find("li").eq(1).append("<a href='javascript:void(0);'>我的问题</a>");
			$(".question_feedback").find(".question_feedback_top").find("li").eq(0).children("a").remove();
			$(".question_feedback").find(".question_feedback_top").find("li").eq(0).append("信息反馈");
		}
		$("#feedback").show();
		$("#question").hide();
	},
	showQuestion : function() {
		var homeObj = this;
		// 我的问题
		JAjax("homepage/findFeedbackQuestion.action", "", "json",
				homeObj.findFeedbackQuestion, null, true);
		$(".question_feedback").find(".question_feedback_top").find("li").eq(0).removeClass("question_feedback_top_tab_selected");
		$(".question_feedback").find(".question_feedback_top").find("li").eq(0).addClass("question_feedback_top_tab");
		$(".question_feedback").find(".question_feedback_top").find("li").eq(1).addClass("question_feedback_top_tab_selected");
		if($(".question_feedback").find(".question_feedback_top").find("li").eq(0).children("strong").html() != null){
			$(".question_feedback").find(".question_feedback_top").find("li").eq(0).append("<a href='javascript:void(0);'>信息反馈</a>");
			$(".question_feedback").find(".question_feedback_top").find("li").eq(1).children("a").remove();
			$(".question_feedback").find(".question_feedback_top").find("li").eq(1).append("我的问题");
		}
		$("#feedback").hide();
		$("#question").show();
	},
	showVidRed : function() {
		$(".warning_situation").find("li").eq(0).addClass("warning_number");
		$(".warning_situation").find("li").eq(1).removeClass("warning_number");
		$(".warning_situation").find("li").eq(2).removeClass("warning_number");
		$(".warning_situation").find("li").eq(3).removeClass("warning_number");		
	},
	showRed : function(){
		this.getAlarmInfo(1);
		this.showVidRed();
	},
	showOrang : function(){
		this.getAlarmInfo(0);
		this.showVidOrang();
	},
	showGreen : function(){
		this.getAlarmInfo(2);
		this.showVidGreen();
	},
	showBlue : function(){
		this.getAlarmInfo(3);
		this.showVidBlue();
	},
	showVidOrang : function() {
		$(".warning_situation").find("li").eq(0).removeClass("warning_number");
		$(".warning_situation").find("li").eq(1).addClass("warning_number");
		$(".warning_situation").find("li").eq(2).removeClass("warning_number");
		$(".warning_situation").find("li").eq(3).removeClass("warning_number");	
	},
	showVidGreen : function() {
		$(".warning_situation").find("li").eq(0).removeClass("warning_number");
		$(".warning_situation").find("li").eq(1).removeClass("warning_number");
		$(".warning_situation").find("li").eq(2).addClass("warning_number");
		$(".warning_situation").find("li").eq(3).removeClass("warning_number");	
	},
	showVidBlue : function() {
		$(".warning_situation").find("li").eq(0).removeClass("warning_number");
		$(".warning_situation").find("li").eq(1).removeClass("warning_number");
		$(".warning_situation").find("li").eq(2).removeClass("warning_number");
		$(".warning_situation").find("li").eq(3).addClass("warning_number");	
	},
	initInfo : function() {
		var enttype = KCPT.user.entType;
		// 如果是车队用户不显示车队排行 1企业 2车队
		if(enttype == 2) {
			$(".energy_saving_list").find(".energy_saving_list_top").find("li").eq(1).css("display","none");
		}
		var homeObj = this;
		// 信息反馈
		JAjax("memcache/memcache!getTbFeedback.action", {"entId":KCPT.user.entId}, "json",
				homeObj.findFeedback, homeObj.findFeedbackError, true);
		
		// 系统公告
		JAjax("memcache/memcache!getSystemAnnouncement.action", {"infoType":"01","entId":KCPT.user.entId}, "json",
				homeObj.findTbPublishInfo, homeObj.findTbPublishInfoError, true);
		
		// 企业咨询
		JAjax("memcache/memcache!getTbComPublishInfo.action", {"infoType":"02","entId":KCPT.user.entId}, "json",
				homeObj.findCompanyTbPublishInfo, null, true);
		
		// 车辆排行榜
		JAjax("memcache/memcache!getVehicleTop.action", {"entId" : KCPT.user.entId}, "json",
				homeObj.VehicleTopList, null, true, homeObj);
		
		// 显示路况
		JAjax("memcache/memcache!getRoadConditionByProvince.action", {"provinceCodes" : KCPT.user.opProvince}, "json",
				homeObj.findTbRoadConditionList, null, true, homeObj);
		
		// 告警图		
//		homeObj.getMemAlarminfo();
	},
	
	// 告警趋势图页签样式
	changeFirstTabStyle : function(){
	    $("#alarmTag0").removeClass('alarmTrendDiagram_top_1');
	    $("#alarmTag0").addClass('alarmTrendDiagram_top_active_1'); 
		$("#alarmTag1").removeClass('alarmTrendDiagram_top_active_2');
		$("#alarmTag1").addClass('alarmTrendDiagram_top_2');
		$("#alarmTag2").removeClass('alarmTrendDiagram_top_active_3');
		$("#alarmTag2").addClass('alarmTrendDiagram_top_3');
	},
	changeSecondTabStyle : function(){
		$("#alarmTag0").removeClass('alarmTrendDiagram_top_active_1');
		$("#alarmTag0").addClass('alarmTrendDiagram_top_1'); 
		$("#alarmTag1").removeClass('alarmTrendDiagram_top_2');
		$("#alarmTag1").addClass('alarmTrendDiagram_top_active_2');
		$("#alarmTag2").removeClass('alarmTrendDiagram_top_active_3');
		$("#alarmTag2").addClass('alarmTrendDiagram_top_3');
	},
	changeThirdTabStyle : function(){
		$("#alarmTag0").removeClass('alarmTrendDiagram_top_active_1');
		$("#alarmTag0").addClass('alarmTrendDiagram_top_1'); 
		$("#alarmTag1").removeClass('alarmTrendDiagram_top_active_2');
		$("#alarmTag1").addClass('alarmTrendDiagram_top_2');
		$("#alarmTag2").removeClass('alarmTrendDiagram_top_3');
		$("#alarmTag2").addClass('alarmTrendDiagram_top_active_3');
	},
	changeFirstViewStyle : function(){
	    $("#view1").removeClass('alarmTrendDiagram_bottom_1');
	    $("#view1").addClass('alarmTrendDiagram_bottom_active_1'); 
		$("#view2").removeClass('alarmTrendDiagram_bottom_active_2');
		$("#view2").addClass('alarmTrendDiagram_bottom_2');
	},
	changeSecondViewStyle : function(){
	    $("#view1").removeClass('alarmTrendDiagram_bottom_active_1');
	    $("#view1").addClass('alarmTrendDiagram_bottom_1');
	    $("#view2").removeClass('alarmTrendDiagram_bottom_2');
		$("#view2").addClass('alarmTrendDiagram_bottom_active_2');
	},
	
	// 点击切换告警趋势图页签
    selectTag : function (showContent){
		var obj = this;
 		if (showContent == "alarmTag0") {
 			obj.changeFirstTabStyle();
 			obj.alarmNumType = "Day";
 		} else if (showContent == "alarmTag1") {
 			obj.changeSecondTabStyle();
 			obj.alarmNumType = "Week";
 		} else if (showContent == "alarmTag2") {
 			obj.changeThirdTabStyle();
 			obj.alarmNumType = "Month";
 		}	
 		obj.getMemAlarminfo();
    },
	
    // 点击切换告警趋势图展示样式(柱状图或曲线图)
    selectViewType : function (showview) {
    	var obj = this;
    	if (showview == "view1") {
    		obj.changeFirstViewStyle();
 			obj.viewType = "column";
 		} else if (showview == "view2") {
 			obj.changeSecondViewStyle();
 			obj.viewType = "line";
 		}
    	obj.getMemAlarminfo();
    },
    
    // 获取告警图方法
    getMemAlarminfo : function() {
    	var homeObj = this;
    	var actionType = homeObj.createAlarmLineFusion;
    	var type = homeObj.viewType;
    	if(type == "line") {
    		actionType = homeObj.createAlarmLineFusion;
    	} else if (type == "column") {
    		actionType = homeObj.createAlarmColumnFusion;
    	}   	
    	JAjax("memcache/memcache!getMemAlarmInfo.action", {"entId":KCPT.user.entId, "alarmNumType":homeObj.alarmNumType}, "json",
    			actionType, null, true, homeObj);
    },
    
    // 获取首页车辆统计
	getPageInfo : function(){
		var homeObj = this;
		JAjax("memcache/memcache!getStatisticsVehicleOperationState.action", {"entId":KCPT.user.entId}, "json",
			function(data){
			    var data1 =  eval(data);
			    var networkNum=0;
			    var onlineNum=0;
			    var drivingNum=0;
			    var networkAllNum=0;
			    //update by zhengzhong 20130408 修改首页从缓存中取数据失败问题
			    if(data == null || data == undefined || data1== null || data1 == undefined || data1[0]== null || data1[0] == undefined ) {
			    	return;
			    } else {
			    	networkNum=data1[0].corpVehicleNetworkNum; 
			    	onlineNum=data1[0].corpVehicleOnlineNum;
			    	drivingNum=data1[0].corpVehicleOnlineDrivingNum;
			    	networkAllNum=data1[0].networkNum;
			    }
			   //update by zhengzhong 20130408 修改首页从缓存中取数据失败问题
			    homeObj.enterpriseVehicle = networkNum;			  
			    homeObj.onlineNumber = onlineNum;    
			    // 企业接入车辆数
				homeObj.findCompanyAccessVehicle(networkAllNum);	
				// 企业在线车辆数 、在线率
				homeObj.findCompanyOnlineVehicle(onlineNum);
				// 企业行驶车辆数
				homeObj.findCompanyOnlineTravelVehicle(drivingNum);			
		}, function(data){	
			  var data1 =  eval(data);
		if(data == null || data == undefined || data1== null || data1 == undefined || data1[0]== null || data1[0] == undefined ) {
			   return;
		}else{
			networkNum=data1[0].corpVehicleNetworkNum; 
	    	onlineNum=data1[0].corpVehicleOnlineNum;
	    	drivingNum=data1[0].corpVehicleOnlineDrivingNum;
	    	networkAllNum=data1[0].networkNum;
		}
		 // 企业接入车辆数
		homeObj.findCompanyAccessVehicle(networkAllNum);	
		// 企业在线车辆数 、在线率
		homeObj.findCompanyOnlineVehicle(onlineNum);
		// 企业行驶车辆数
		homeObj.findCompanyOnlineTravelVehicle(drivingNum);	}, true);
	},

	//统计报警图
	getAlarmInfo : function(data){
		if(data == undefined || data == null){
			this.alarmType = 1;
		}else{
			this.alarmType = data;
		}
		var homeObj = this;
		JAjax("entbusiness/countAlarmByCorpId.action", {'levelType':this.alarmType}, "json",
				homeObj.countAlarmByCorpId, homeObj.countAlarmByCorpIdError, true,homeObj);
	},
	VehicleTopList:function(arrayVehicleTop){
		mask("vehicle","",false);
		var str = "<table>";
		if(arrayVehicleTop != undefined && arrayVehicleTop != null){
			for ( var i = 0; i < 10; i++) {
				if(arrayVehicleTop.length < i+1){
					str += "<tr><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr>";
					continue;
				}
				str += "<tr><td><img src='images/global/top-"+(i+1)+".png'>"
						+ "</td><td>"
						+ arrayVehicleTop[i].vehicleNo
						+ "</td>";
				
				if(arrayVehicleTop[i].sign=="1"){
					str	+= "<td><img src='images/global/newChange/list_number_up.png'/></td>";
				}else if(arrayVehicleTop[i].sign=="0"){
					str	+= "<td><img src='images/global/newChange/list_number_stop.png'/></td>";
				}else if(arrayVehicleTop[i].sign=="-1"){
					str	+= "<td><img src='images/global/newChange/list_number_down.png'/></td>";
				}
				str += "<td>"+arrayVehicleTop[i].allScoreSum+"</td></tr>";
			}
		}
		str += "</table>";
		str += "<div class='energy_saving_list_bottom'></div>";
		$("#vehicle").html(str);
	},
	VehicleTeamTopList : function(arrayVehicleTeamTop){
		mask("vehicleTeam","",false);
		var value = 0;
		var str = "<table>";
		if(arrayVehicleTeamTop != undefined && arrayVehicleTeamTop != null){
			for ( var i = 0; i < 10; i++) {
				value = 9;
				if(arrayVehicleTeamTop.length < i+1){
					str += "<tr><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr>";
					continue;
				}
				str += "<tr><td style='width:20%;'><img src='images/global/top-"+(i+1)+".png'>"
						+ "</td>";
				if(arrayVehicleTeamTop[i].teamName.length > value) {
					value += winHp.getSpecialCharactersNumber(arrayVehicleTeamTop[i].teamName.substring(0,value));
					str += "<td style='text-align:left;width:60%;' title='"+arrayVehicleTeamTop[i].teamName+"'>" + arrayVehicleTeamTop[i].teamName.substring(0,value) + "..." + "</td>";
				} else {
					str += "<td style='text-align:left;width:60%;'>" + arrayVehicleTeamTop[i].teamName + "</td>";
				}
				if(arrayVehicleTeamTop[i].sign=="1"){
					str	+= "<td style='width:10%;'><img src='images/global/newChange/list_number_up.png'/></td>";
				}else if(arrayVehicleTeamTop[i].sign=="0"){
					str	+= "<td style='width:10%;'><img src='images/global/newChange/list_number_stop.png'/></td>";
				}else if(arrayVehicleTeamTop[i].sign=="-1"){
					str	+= "<td style='width:10%;'><img src='images/global/newChange/list_number_down.png'/></td>";
				}
				str += "<td style='width:10%;'>"+arrayVehicleTeamTop[i].allScoreSum+"</td></tr>";
			}
		}
		str += "</table>";
		str += "<div class='energy_saving_list_bottom'></div>";
		$("#vehicleTeam").html(str);
	},
	findFeedback : function(o) {
		mask("feedback","",false);
		var str = "<ul>";
		var array = eval(o);
		var length = 0;
		var strLength = 0;
		var strLengthContent = 0;
		if(array != undefined && array != null){
			length = array.length;
			var number = 10;
			if(length>number){
				length = number;
			}
			for(var i=0; i<length; i++){
				strLength = 14;
				
				strLength += winHp.getSpecialCharactersNumber(array[i].replyTheme.substring(0,strLength));
				if(array[i].replyTheme.length>strLength){
					str += "<li title='"+array[i].replyContent.substring(0,array[i].replyContent.length)+"'><h3 class='opti_font'>" +"<a href=\"javascript:winHp.showInfoQuestionDetail(1,'"+array[i].replyId+"','"+array[i].replyTheme+"','"+array[i].createName+"','"+array[i].createTime+"')\" >"+ array[i].replyTheme.substring(0,strLength) + "...</a></h3></li>";
				}else{
					str += "<li><h3 class='opti_font'>" + "<a href=\"javascript:winHp.showInfoQuestionDetail(1,'"+array[i].replyId+"','"+array[i].replyTheme+"','"+array[i].createName+"','"+array[i].createTime+"')\" >" + array[i].replyTheme + "</a></h3></li>";
				}
			}
			if(length<number){
				for(var i = length; i < number; i++){
					if(i == (number-1)){
						str += "<li style='line-height: 22px;'><h3 class='opti_font'><a href='javascript:void(0)' style='cursor:default;'>&nbsp;</a></h3></li>";
					}else{
						str += "<li style='border-bottom:0px; line-height: 24px;'><h3 class='opti_font'><a href='javascript:void(0)' style='cursor:default;'>&nbsp;</a></h3></li>";
					}
				}
			}
			str += "</ul>";
			if(length >= 10) {
				str += "<div class='question_feedback_bottom'><a href='javascript:winHp.showEntMoreFeedback(1);'>更多...&nbsp;&nbsp;&nbsp;&nbsp;</a></div>";
			} else {
				str += "<div class='question_feedback_bottom'></div>";
			}
			$("#feedback").html(str);
		}
	},
	findFeedbackQuestion : function(date) {
		var array = eval(date);
		var value = "<ul>";
		var length = 0;
		var strLength = 0;
		var strLengthContent = 0;
		if(array != undefined && array != null){
			length = array.length;
			var number = 10;
			if(length>number){
				length = number;
			}
			for ( var i = 0; i <length; i++) {
				strLength = 14;
				strLength += winHp.getSpecialCharactersNumber(array[i].replyTheme.substring(0,strLength));
				if(array[i].replyTheme.length>strLength){
					value += "<li title="+array[i].replyContent.substring(0,array[i].replyContent.length)+"><h3 class='opti_font'>"
						+ "<a href=\"javascript:winHp.showInfoQuestionDetail(2,'"+array[i].replyId+"','"+array[i].replyTheme+"','"+array[i].createName+"','"+array[i].createTime+"')\" >" + array[i].replyTheme.substring(0,strLength)
						+ "...</a></h3></li>";
				}else{
					value += "<li><h3 class='opti_font'>"
						+ "<a href=\"javascript:winHp.showInfoQuestionDetail(2,'"+array[i].replyId+"','"+array[i].replyTheme+"','"+array[i].createName+"','"+array[i].createTime+"')\" >" + array[i].replyTheme
						+ "</a></h3></li>";
				}
				
			}
		}
		if (length < number) {
			for ( var i = length; i < number; i++) {
				if(i == (number-1)){
					value += "<li style='line-height: 22px;'><h3 class='opti_font'><a href='javascript:void(0)' style='cursor:default;'>&nbsp;</a></h3></li>";
				}else{
					value += "<li style='border-bottom:0px; line-height: 24px;'><h3 class='opti_font'><a href='javascript:void(0)' style='cursor:default;'>&nbsp;</a></h3></li>";
				}
			}
		}
		value += "</ul>";
		if(length >= 10) {
			value += "<div class='question_feedback_bottom'><a href='javascript:winHp.showEntMoreFeedback(2);'>更多...&nbsp;&nbsp;&nbsp;&nbsp;</a><a href='javascript:winHp.showRetQuestion();'>提问&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</a></div>";
		} else {
			value += "<div class='question_feedback_bottom'><a href='javascript:winHp.showRetQuestion();'>提问&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</a></div>";
		}
		$("#question").html(value);
	},
	
	// 柱状图
	createAlarmColumnFusion : function(date) {
		var array = eval(date);
		var colorArray=['ff8683','7fccdc','cde75f','ffdd6e'];
		var btSeriousStr = "";
		var length = array.length;
		var seriousCountStr = "";//严重
		var urgentCountStr = "";//紧急
		var generalCountStr = "";//一般
		var suggestionCountStr = "";//报警提示
		
		btSeriousStr = "<chart overlapColumns='0' decimals='0' bgColor='#d6eaff,FFFFFF' showSum='1' showvalues='0' shownames='1' canvasBaseColor='74bb45'" +
				"palette='1' formatNumberScale='0' formatNumber='0' chartLeftMargin='15' chartRightMargin='30' chartTopMargin='20' showLegend='1' >";
		btSeriousStr += "<categories font='Arial' fontSize='11' fontColor='000000'>";
		for(var i=0; i<length; i++){ //从小到大排序	modified by fenglong at 20121228
			btSeriousStr += "<category label='"+this.getColumnName(array[i].alarmDate)+"'/>";
		}
		btSeriousStr += "</categories>";
		
		for(var i=0; i<length; i++) { //从小到大排序	modified by fenglong at 20121228
			seriousCountStr += "<set value='"+array[i].seriousCount+"' color='"+colorArray[0]+"' />";
			urgentCountStr += "<set value='"+array[i].urgentCount+"' color='"+colorArray[1]+"'/>";
			generalCountStr += "<set value='"+array[i].generalCount+"' color='"+colorArray[2]+"'/>";
			suggestionCountStr += "<set value='"+array[i].suggestionCount+"' color='"+colorArray[3]+"'/>";
		}
		
		btSeriousStr += "<dataset showValues='0' seriesName='严重告警' color='"+colorArray[0]+"'>";
		btSeriousStr += seriousCountStr;
		btSeriousStr += "</dataset>";	
		btSeriousStr += "<dataset showValues='0' seriesName='中度告警' color='"+colorArray[1]+"'>";
		btSeriousStr += urgentCountStr;
		btSeriousStr += "</dataset>";
		btSeriousStr += "<dataset showValues='0' seriesName='一般告警' color='"+colorArray[2]+"'>";
		btSeriousStr += generalCountStr;
		btSeriousStr += "</dataset>";
		btSeriousStr += "<dataset showValues='0' seriesName='提示告警' color='"+colorArray[3]+"'>";
		btSeriousStr += suggestionCountStr;
		btSeriousStr += "</dataset>";
		
		btSeriousStr += "</chart>";
//		var chart = new FusionCharts("script/fusionchart/StackedColumn3D.swf",
//				"alarmChartDiv", "530", "269", "0", "0");
		if(length != 0){
			$("#alarmChartDiv").removeClass("warning_wait_main");
			$("#alarmChartDiv").removeClass("warning_situation_main");
			$("#alarmChartDiv_frame").show();
			$("#alarmChartDiv_frame")[0].contentWindow.createAlarmColumnFusion(btSeriousStr);
//			chart.setDataXML(btSeriousStr);
//			chart.render("alarmChartDiv");	
		}else{
			$("#alarmChartDiv").addClass("warning_situation_main");
			$("#alarmChartDiv").removeClass("warning_wait_main");
			$("#alarmChartDiv").html('<br/><br/><span style="font-size:12px;margin-top:130px;font-weight:bold;"></span>');
			$("#alarmChartDiv_frame").hide();
		}
	},
	
	// 曲线图
	createAlarmLineFusion : function(date) {
		var array = eval(date);
		var colorArray=['ff8683','7fccdc','cde75f','ffdd6e'];
		var btSeriousStr = "";
		var length = array.length;
		var seriousCountStr = "";//严重
		var urgentCountStr = "";//紧急
		var generalCountStr = "";//一般
		var suggestionCountStr = "";//报警提示
		
		btSeriousStr = "<chart overlapColumns='0' decimals='0' bgColor='FFFFFF,#d6eaff' showSum='1' slantLabels='1' showvalues='0' shownames='1' showBorder='0'" +
				"palette='1' formatNumberScale='0' formatNumber='0' numberSuffix ='次' chartLeftMargin='15' chartRightMargin='25' chartTopMargin='20' showLegend='1'>";
		btSeriousStr += "<categories font='Arial' fontSize='11' fontColor='000000'>";
		for(var i=0; i<length; i++){ //从小到大排序	modified by fenglong at 20121228
			btSeriousStr += "<category label='"+this.getColumnName(array[i].alarmDate)+"'/>";
		}
		btSeriousStr += "</categories>";
		
		for(var i=0; i<length; i++) { //从小到大排序	modified by fenglong at 20121228
			seriousCountStr += "<set value='"+array[i].seriousCount+"' color='"+colorArray[0]+"'/>";
			urgentCountStr += "<set value='"+array[i].urgentCount+"' color='"+colorArray[1]+"'/>";
			generalCountStr += "<set value='"+array[i].generalCount+"' color='"+colorArray[2]+"'/>";
			suggestionCountStr += "<set value='"+array[i].suggestionCount+"' color='"+colorArray[3]+"'/>";
		}
		
		btSeriousStr += "<dataset showValues='0' seriesName='严重告警' color='"+colorArray[0]+"'>";
		btSeriousStr += seriousCountStr;
		btSeriousStr += "</dataset>";	
		btSeriousStr += "<dataset showValues='0' seriesName='中度告警' color='"+colorArray[1]+"'>";
		btSeriousStr += urgentCountStr;
		btSeriousStr += "</dataset>";			
		btSeriousStr += "<dataset showValues='0' seriesName='一般告警' color='"+colorArray[2]+"'>";
		btSeriousStr += generalCountStr;
		btSeriousStr += "</dataset>";
		btSeriousStr += "<dataset showValues='0' seriesName='提示告警' color='"+colorArray[3]+"'>";
		btSeriousStr += suggestionCountStr;
		btSeriousStr += "</dataset>";
		
		btSeriousStr += "</chart>";
//		var chart = new FusionCharts("script/fusionchart/MSLine.swf",
//				"chartId", "530", "269", "0", "0");
		if(length != 0){
			$("#alarmChartDiv").removeClass("warning_situation_main");
			$("#alarmChartDiv").removeClass("warning_wait_main");
			$("#alarmChartDiv_frame").show();
			$("#alarmChartDiv_frame")[0].contentWindow.createAlarmLineFusion(btSeriousStr);
//			chart.setDataXML(btSeriousStr);
//			chart.render("alarmChartDiv");			
		}else{
			$("#alarmChartDiv").addClass("warning_situation_main");
			$("#alarmChartDiv").removeClass("warning_wait_main");
			$("#alarmChartDiv").html('<br/><br/><span style="font-size:12px;margin-top:130px;font-weight:bold;"></span>');
			$("#alarmChartDiv_frame").hide();
		}
	},	
	
	countAlarmByCorpId : function(date){
		var array = eval(date);
		var seriousCount = 0;//严重
		var urgentCount = 0;//紧急
		var generalCount = 0;//一般
		var suggestionCount = 0;//报警提示
		var btSeriousStr = "";
		var colorArray=['00b7da','ff7d00','247deb','fb4c29','f7cb00','03a803','9E9BF2','F7E967','04BFBF','A9CF54','FF9BF9','85DB18','FF9800','329A27','a181d4','34279A','ff4444','04bfbf','f7e967','a9cf54'];
		if(array == null || array == undefined || array[0]==null || array[0]== undefined){
			generalCount = 0;
			urgentCount = 0;
			seriousCount = 0;
			suggestionCount = 0;
		}else{
			var length = array.length;
			suggestionCount = array[length-1].alarmCodeCount;
			generalCount = array[length-2].alarmCodeCount;
			urgentCount = array[length-3].alarmCodeCount;
			seriousCount = array[length-4].alarmCodeCount;
		}
		if(this.alarmType == 0){
			this.showVidOrang();
			$(".warning_situation").find("li").eq(0).find("a").text(urgentCount);
			$(".warning_situation").find("li").eq(1).find("a").text(seriousCount);		
			$(".warning_situation").find("li").eq(2).find("a").text(generalCount);
			$(".warning_situation").find("li").eq(3).find("a").text(suggestionCount);
			if(seriousCount != 0){
				btSeriousStr = "<graph xAxisName='' baseFontSize='12' showLegend='1' caption='严重告警(次)' showBorder='0' " +
					"bgAlpha='40,100' startingAngle='70' formatNumberScale='0' bgColor='#d6eaff,FFFFFF' bgRatio='0,100' " +
					"decimalPrecision='1' bgAngle='360' chartRightMargin='25' rotateYAxisName='1' yAxisName='' showNames='0' decimals='2'>";
				for(var i=0; i<length-4; i++){
					btSeriousStr += "<set isSliced='1' name='"+array[i].alarmTypeName+ "'  value = '"+array[i].alarmCodeCount+"' color='"+colorArray[i]+"'/>";
				}
			}
		}else if(this.alarmType == 1){
			this.showVidRed();
			$(".warning_situation").find("li").eq(0).find("a").text(urgentCount);
			$(".warning_situation").find("li").eq(1).find("a").text(seriousCount);
			$(".warning_situation").find("li").eq(2).find("a").text(generalCount);
			$(".warning_situation").find("li").eq(3).find("a").text(suggestionCount);
			if(urgentCount != 0){
				btSeriousStr = "<graph xAxisName='' baseFontSize='12' showLegend='1' caption='紧急告警(次)' showBorder='0' " +
					"bgAlpha='40,100' startingAngle='70' formatNumberScale='0' bgColor='#d6eaff,FFFFFF' bgRatio='0,100' " +
					"decimalPrecision='1' bgAngle='360' chartRightMargin='25' rotateYAxisName='1' yAxisName='' showNames='0' decimals='2'>";
				for(var i=0; i<length-4; i++){
					btSeriousStr += "<set isSliced='1' name='"+array[i].alarmTypeName+ "'  value = '"+array[i].alarmCodeCount+"' color='"+colorArray[i]+"'/>";
				}
			}
		}else if(this.alarmType == 2){
			this.showVidGreen();
			$(".warning_situation").find("li").eq(0).find("a").text(urgentCount);
			$(".warning_situation").find("li").eq(1).find("a").text(seriousCount);
			$(".warning_situation").find("li").eq(2).find("a").text(generalCount);
			$(".warning_situation").find("li").eq(3).find("a").text(suggestionCount);
			if(generalCount != 0){
				btSeriousStr = "<graph xAxisName='' baseFontSize='12' showLegend='1' caption='一般告警(次)' showBorder='0' " +
					"bgAlpha='40,100' startingAngle='70' formatNumberScale='0' bgColor='#d6eaff,FFFFFF' bgRatio='0,100' " +
					"decimalPrecision='1' bgAngle='360' chartRightMargin='25' rotateYAxisName='1' yAxisName='' showNames='0' decimals='2'>";
				for(var i=0; i<length-4; i++){
					btSeriousStr += "<set isSliced='1' name='"+array[i].alarmTypeName+ "'  value = '"+array[i].alarmCodeCount+"' color='"+colorArray[i]+"'/>";
				}
			}
		}else{
			this.showVidBlue();
			$(".warning_situation").find("li").eq(0).find("a").text(urgentCount);
			$(".warning_situation").find("li").eq(1).find("a").text(seriousCount);
			$(".warning_situation").find("li").eq(2).find("a").text(generalCount);
			$(".warning_situation").find("li").eq(3).find("a").text(suggestionCount);
			if(suggestionCount != 0){
				btSeriousStr = "<graph xAxisName='' baseFontSize='12' showLegend='1' caption='告警提示(次)' showBorder='0' " +
					"bgAlpha='40,100' startingAngle='70' formatNumberScale='0' bgColor='#d6eaff,FFFFFF' bgRatio='0,100' " +
					"decimalPrecision='1' bgAngle='360' chartRightMargin='25' rotateYAxisName='1' yAxisName='' showNames='0' decimals='2'>";
				for(var i=0; i<length-4; i++){
					btSeriousStr += "<set isSliced='1' name='"+array[i].alarmTypeName+ "'  value = '"+array[i].alarmCodeCount+"' color='"+colorArray[i]+"'/>";
				}
			}
		}
		if(btSeriousStr != "")
			btSeriousStr += "</graph>";
//		var chart = new FusionCharts("script/fusionchart/Pie3DOld.swf",
//				"alarmChartDiv", "530", "251", "0", "0");
		if(btSeriousStr.indexOf('set')!=-1){
			$("#alarmChartDiv").removeClass("warning_situation_main");
			$("#alarmChartDiv_frame").show();
			$("#alarmChartDiv_frame")[0].contentWindow.countAlarmByCorpId(btSeriousStr);
//			chart.setDataXML(btSeriousStr);
//			chart.render("alarmChartDiv");			
		}else{
			$("#alarmChartDiv").addClass("warning_situation_main");
			$("#alarmChartDiv").html('<br/><br/><span style="font-size:12px;margin-top:130px;font-weight:bold;"></span>');
			$("#alarmChartDiv_frame").hide();
		}
		document.title=KCPT.TITLE;
		
	},
	countAlarmByCorpIdError : function(){
		if(this.alarmType == 1){
			this.showVidRed();
			$(".warning_situation").find("li").eq(0).find("a").text(0);
			$(".warning_situation").find("li").eq(1).find("a").text(0);
			$(".warning_situation").find("li").eq(2).find("a").text(0);
			$(".warning_situation").find("li").eq(3).find("a").text(0);			
		}
		if(this.alarmType == 0){
			this.showVidOrang();
			$(".warning_situation").find("li").eq(0).find("a").text(0);
			$(".warning_situation").find("li").eq(1).find("a").text(0);
			$(".warning_situation").find("li").eq(2).find("a").text(0);
			$(".warning_situation").find("li").eq(3).find("a").text(0);		
		}
		if(this.alarmType == 2){
			this.showVidYellow();
			$(".warning_situation").find("li").eq(0).find("a").text(0);
			$(".warning_situation").find("li").eq(1).find("a").text(0);
			$(".warning_situation").find("li").eq(2).find("a").text(0);
			$(".warning_situation").find("li").eq(3).find("a").text(0);		
		}
		if(this.alarmType == 3){
			this.showVidYellow();
			$(".warning_situation").find("li").eq(0).find("a").text(0);
			$(".warning_situation").find("li").eq(1).find("a").text(0);
			$(".warning_situation").find("li").eq(2).find("a").text(0);
			$(".warning_situation").find("li").eq(3).find("a").text(0);			
		}
		$("#alarmChartDivRed").addClass("warning_situation_main");
		$("#alarmChartDivRed").html('<br/><br/><span style="font-size:12px;margin-top:130px;font-weight:bold;"></span>');
        document.title=KCPT.TITLE;
	},
	findFeedbackError : function(o) {
		// $.ligerDialog.error(o);
	},
	findTbPublishInfoError : function(o) {
		// $.ligerDialog.error(o);
	},
	
	// 右侧系统公告
	findTbPublishInfo : function(date) {
		mask("main_corpnotice","",false);
		var str = "";
		var count = 0;
		var array = eval(date);
		var strLength = 0;
		var morestr = "";
		if(array != undefined && array != null){
			count = array.length;
			if(count >= 10) {
				morestr = "<a href=\"javascript:void(0)\" onclick=\"winHp.showEntMore('1','001')\">更多...&nbsp;&nbsp;&nbsp;&nbsp;</a>";
			}
			var number = 10;
			if(count>number){
				count = number;
			}
			for(var i=0;i<count;i++){
				strLength = 10;
				var obj = array[i];
				if(obj === undefined){
					break;
				}
				var time = dateFormat(new Date(obj.publishTime),"MM.dd日");
				if(obj.isSettop == '1'){
					if(obj.infoTheme.length>strLength){
						strLength += winHp.getSpecialCharactersNumber(obj.infoTheme.substring(0,strLength));
						str += "<li><a href=\"javascript:void(0)\" onclick=\"winHp.showPublishInfoDetail(1,"+obj.infoId+")\">" + time + obj.infoTheme.substring(0,strLength)
						+ "... </a><font color = 'red' >TOP</font></li>";
					}else{
						str += "<li><a href=\"javascript:void(0)\" onclick=\"winHp.showPublishInfoDetail(1,"+obj.infoId+")\">" + time + obj.infoTheme
						+ " </a><font color = 'red' >TOP</font></li>";
					}
				}else if(obj.sysTime<obj.publishTime){
					if(obj.infoTheme.length>strLength){
						strLength += winHp.getSpecialCharactersNumber(obj.infoTheme.substring(0,strLength));
						str += "<li><a href=\"javascript:void(0)\" onclick=\"winHp.showPublishInfoDetail(1,"+obj.infoId+")\">" + time + obj.infoTheme.substring(0,strLength)
						+ "... </a><font color = 'red' >NEW</font></li>";
					}else{
						str += "<li><a href=\"javascript:void(0)\" onclick=\"winHp.showPublishInfoDetail(1,"+obj.infoId+")\">" + time + obj.infoTheme
						+ " </a><font color = 'red' >NEW</font></li>";
					}
				}else{
					if(obj.infoTheme.length>strLength){
						strLength += winHp.getSpecialCharactersNumber(obj.infoTheme.substring(0,strLength));
						str += "<li><a href=\"javascript:void(0)\" onclick=\"winHp.showPublishInfoDetail(1,"+obj.infoId+")\">" + time + obj.infoTheme.substring(0,strLength)
						+ "... </a></li>";
					}else{
						str += "<li><a href=\"javascript:void(0)\" onclick=\"winHp.showPublishInfoDetail(1,"+obj.infoId+")\">" + time + obj.infoTheme
						+ "</a></li>";
					}
				}
			}			
		}
		var flag = false;
		if (count < number) {
			flag = true;
			for ( var i = count; i < number; i++) {
				if(count == 0 && i == 3) {
					str += "<li style=\"border-bottom:0px;text-align:center;text-indent:0px;\">暂无内容</li>";
					continue;
				}
				str += "<li style=\"border-bottom:0px\"> &nbsp;</li>";
			}
		}
		$(".system_announcement").find("ul").html(str);
		$(".system_announcement_bottom").html(morestr);		
	},
	
	// 左侧企业资讯
	findCompanyTbPublishInfo : function(date) {
		mask("main_corp_info","",false);
		var str = "";
		var array = eval(date);
		var count = 0;
		var strLength = 0;
		var morestr = "";
		if(array != undefined && array != null){
			count = array.length;
			// 公告没有内容时不需要更多
			if(count >= 10) {
				morestr = "<a href=\"javascript:void(0)\" onclick=\"winHp.showEntMore('2','002,005')\">更多...&nbsp;&nbsp;&nbsp;&nbsp;</a>";	
			}
			var flag = false;
			var number = 10;
			if(count>number){
				flag = true;
				count = number;
			}
			for(var i=0;i<count;i++){
				strLength = 10;
				var obj = array[i];
				if(obj === undefined){
					break;
				}
				var time = dateFormat(new Date(obj.publishTime),"MM.dd日");
				if(flag && count-1 == i){
					if(obj.isSettop == '1'){
						if(obj.infoTheme.length>strLength){
							strLength += winHp.getSpecialCharactersNumber(obj.infoTheme.substring(0,strLength));
							str += "<li><a href=\"javascript:void(0)\" onclick=\"winHp.showPublishInfoDetail(2,"+obj.infoId+")\">" + time + obj.infoTheme.substring(0,strLength)
							+ "... </a><font color='red'>TOP</font></li>";
						}else{
							str += "<li> <a href=\"javascript:void(0)\" onclick=\"winHp.showPublishInfoDetail(2,"+obj.infoId+")\">" + time + obj.infoTheme
							+ " </a><font color='red'>TOP</font></li>";
						}
					}else if(obj.sysTime<obj.publishTime){
						if(obj.infoTheme.length>strLength){
							strLength += winHp.getSpecialCharactersNumber(obj.infoTheme.substring(0,strLength));
							str += "<li> <a href=\"javascript:void(0)\" onclick=\"winHp.showPublishInfoDetail(2,"+obj.infoId+")\">" + time + obj.infoTheme.substring(0,strLength)
							+ "... </a><font color='red'>NEW</font></li>";
						}else{
							str += "<li> <a href=\"javascript:void(0)\" onclick=\"winHp.showPublishInfoDetail(2,"+obj.infoId+")\">" + time + obj.infoTheme
							+ "</a><font color='red'>NEW</font></li>";
						}
					}else{
						if(obj.infoTheme.length>strLength){
							strLength += winHp.getSpecialCharactersNumber(obj.infoTheme.substring(0,strLength));
							str += "<li> <a href=\"javascript:void(0)\" onclick=\"winHp.showPublishInfoDetail(2,"+obj.infoId+")\">" + time + obj.infoTheme.substring(0,strLength)
							+ "... </a></li>";
						}else{
							str += "<li> <a href=\"javascript:void(0)\" onclick=\"winHp.showPublishInfoDetail(2,"+obj.infoId+")\">" + time + obj.infoTheme
							+ "</a></li>";
						}
					}
				}else{
					if(obj.isSettop == '1'){
						if(obj.infoTheme.length>strLength){
							strLength += winHp.getSpecialCharactersNumber(obj.infoTheme.substring(0,strLength));
							str += "<li> <a href=\"javascript:void(0)\" onclick=\"winHp.showPublishInfoDetail(2,"+obj.infoId+")\">" + time + obj.infoTheme.substring(0,strLength)
							+ "... </a><font color = 'red' >TOP</font></li>";
						}else{
							str += "<li> <a href=\"javascript:void(0)\" onclick=\"winHp.showPublishInfoDetail(2,"+obj.infoId+")\">" + time + obj.infoTheme
							+ " </a><font color = 'red' >TOP</font></li>";
						}
					}else if(obj.sysTime<obj.publishTime){
						if(obj.infoTheme.length>strLength){
							strLength += winHp.getSpecialCharactersNumber(obj.infoTheme.substring(0,strLength));
							str += "<li> <a href=\"javascript:void(0)\" onclick=\"winHp.showPublishInfoDetail(2,"+obj.infoId+")\">" + time + obj.infoTheme.substring(0,strLength)
							+ "... </a><font color = 'red' >NEW</font></li>";
						}else{
							str += "<li> <a href=\"javascript:void(0)\" onclick=\"winHp.showPublishInfoDetail(2,"+obj.infoId+")\">" + time + obj.infoTheme
							+ " </a><font color = 'red' >NEW</font></li>";
						}
					}else{
						if(obj.infoTheme.length>strLength){
							strLength += winHp.getSpecialCharactersNumber(obj.infoTheme.substring(0,strLength));
							str += "<li> <a href=\"javascript:void(0)\" onclick=\"winHp.showPublishInfoDetail(2,"+obj.infoId+")\">" + time + obj.infoTheme.substring(0,strLength)
							+ "... </a></li>";
						}else{
							str += "<li> <a href=\"javascript:void(0)\" onclick=\"winHp.showPublishInfoDetail(2,"+obj.infoId+")\">" + time + obj.infoTheme
							+ "</a></li>";
						}
					}
				}
			}				
		}
		if (count < number) {
			for ( var i = count; i < number; i++) {
				if(count == 0 && i == 3) {
					str += "<li style=\"text-align:center;text-indent:0px;\">暂无内容</li>";
					continue;
				}
				str += "<li>&nbsp;</li>";
			}
		}
		$("#main_corp_info").find("ul").html(str);
		$(".enterprise_information_bottom").html(morestr);	
	},
	
	// 企业接入车辆数
	findCompanyAccessVehicle : function(date) {
		var homeObj = this;
		var array = new Array();
		var i = 0;
		var str = '';
		var remainder = 0;// 余数
		var divisor = 10;// 除数
		var value = 0;// 商
		while (true) {
			if (date < 10) {
				array[i] = date;
				break;
			} else {
				remainder = date % divisor;
				date = Math.floor(date / divisor);
				array[i] = remainder;
				i++;
			}
		}
		for ( var i = 0; i < 6 - array.length; i++) {// 当长度少于六位时，在前补零
			str += "<li><img src='images/global/newChange/vehicle_statistics_number_"+ 0 +".png'></li>";
		}
		for ( var j = array.length - 1; j >= 0; j--) {
			str += "<li><img src='images/global/newChange/vehicle_statistics_number_"+ array[j] +".png'></li>";
		}
		$("#enterpriseAccessVehicle").html(str);
	},
	
	// 企业在线车辆数 、在线率
	findCompanyOnlineVehicle : function(date) {
		var str = '';
		if(date == 0){
			str += "<li onclick='winHp.vehicleToOnline()' style='cursor: pointer;'>" + "--" + "</li>";
		} else {
			str += "<li onclick='winHp.vehicleToOnline()' style='cursor: pointer;'>" + date + "</li>";
		}
			
		if (this.enterpriseVehicle == 0 || date == 0) {
			str += "<li>--</li>";
		} else {
			str += "<li>"
					+ (Math.round(date / this.enterpriseVehicle * 1000))
					/ 10 + "%" + "</li>";
		}
		this.string = str;
	},
	
	// 企业行驶车辆数
	findCompanyOnlineTravelVehicle : function(date) {
		if(date == 0){
			this.string += "<li onclick='winHp.vehicleRunToOnline()' style='cursor: pointer;'>" + "--" + "</li>";
		} else {
			this.string += "<li onclick='winHp.vehicleRunToOnline()' style='cursor: pointer;'>" + date + "</li>";
		}		
		$("#enterpriseOnlineVehicle").html(this.string);
	},
	vehicleShow : function() {
		$("#vehicleTeam").hide();
		$("#vehicle").show();
	},
	vehicleTeamShow : function() {
		$("#vehicleTeam").show();
		$("#vehicle").hide();
	},
	findTbRoadConditionList : function(date) {// 显示路况
		mask("road","",false);
		var map = {"110000":"北京","120000":"天津","130000":"河北","410000":"河南","430000":"湖南",
					"450000":"广西","460000":"海南","520000":"贵州","610000":"陕西","620000":"甘肃",
					"630000":"青海","650000":"新疆"};
		var str = "<ul class='road_conditions_main_img'>";
		var count = 0;
		var roadArray = eval(date);
		if(roadArray != undefined && roadArray != null){
			count = roadArray.length;// 用于表示显示的总条数	
			//var height = (count - 1) * 75 + 20;
			var value = 0;
			var number = 4;
			if(count>number){
				count = number;
			}
			for ( var i = 0; i < count; i++) {
				str += "<li style='margin-top:30px;'><img src='images/global/newChange/roadPic.png' /></li>";
			}		
			str += "</ul>" +
					"<ul class='road_conditions_main_text'>";
			
			for ( var i = 0; i < count; i++) {
				value = 33;
				var time = roadArray[i].roadConditionTime;
				var date = roadArray[i].descriptions;
				if (roadArray[i].descriptions.length < value) {
					str += "<li>"
							+ "<a href='javascript:void(0)' onclick=\"winHp.showRoadDetail('"+time+"','"+date+"')\">"
							+ "<span style='color:#336699'>" + roadArray[i].roadConditionTime + "</span>  " + "<span style='color:b11506'>" + map[roadArray[i].provinceCode] + "</span><br>"
							+ roadArray[i].descriptions + "</a></li>";
				} else {
					value += winHp.getSpecialCharactersNumber(roadArray[i].descriptions.substring(0,value));
					str += "<li title='"
							+ roadArray[i].descriptions + "'>"
							+ "<a href='javascript:void(0)' onclick=\"winHp.showRoadDetail('"+time+"','"+date+"')\">" + "<span style='color:#336699'>" + roadArray[i].roadConditionTime + "</span>  " + "<span style='color:b11506'>"+ map[roadArray[i].provinceCode] + "</span><br>"
							+ roadArray[i].descriptions.substring(0, value)
							+ "...</a></li>";
				}
			}
			
		}
		if (count < number) {
			for ( var i = count; i < number; i++) {
				if(i == (number-1)){
					str += "<li><a href='javascript:void(0)' style='cursor:default;'><h4> &nbsp</h4> &nbsp</a></li>";
				}else{
					str += "<li style='border-bottom:0;'><a href='javascript:void(0)' style='cursor:default;'><h4> &nbsp</h4> &nbsp</a></li>";
				}
			}
		}
		str += "</ul>";
		$("#road").find("div").html(str);
	},
	showRoadCondition : function(data) {// 企业用户页调用,用于显示路况
		var homeObj = this;
		var da = {};
		if(data){
			da = {"provinceCode" : data};
		}
		JAjax("homepage/findTbRoadConditionList.action ", {
			"provinceCode" : da
		}, "json", homeObj.findTbRoadConditionList, null, true, homeObj);
		
	},
	opLoginName : function() {
		if(KCPT.user.parentEntId!="-1"){
			$("#instCtrlSrvsubmenu").remove();
		}
		$("#opLoginName").text(KCPT.user.opName);
		$("#corpLogoUrl").attr("src",KCPT.user.orgLogo);
		/**
		 * 帐号有效日期提醒
		 */
		var opEndutc = KCPT.user.opEndutc+86400000; // 取得帐号有效时间；整型秒数
		var d = new Date(); // 实例代一个时间对象
		var nowDate = d.getTime(); // 取得当前时间;整型秒数
		var str = utcToDate(KCPT.user.opEndutc); // 转换时间
		if (!KCPT.user.opEndutc) {
			str = "帐号状态：永久有效";
		} else {
			/**
			 * 判断如果帐号有效时间大于当然时间，说明还在有效期内，否则超过有效期
			 * 
			 */

			if (opEndutc > nowDate) {
				/**
				 * 在有效期内前五天进行提醒
				 */
				if ((opEndutc - nowDate) < (5 * 24 * 3600 * 1000)) {
					str = "有效期至:<font color='red'>" + str + "</font>";
				} else {
					str = "有效期至:" + str;
				}
			}else
			{
				str="";	
			}
		}
		$("#opEndutc").html(str);
		$(".kcpt_top_welcome").show();
		$("#smoothmenu1").show();
	},
	
	// 账号注销
	logout : function() {
		var homeObj = this;
		$.ligerDialog.confirm('是否注销登陆！', function(yes) {
			if (yes) {
				JAjax("portal/logout.action", null, "json",
						homeObj.removeSuccess, homeObj.removeerror, true);
			}
		});

	},
	
	// 注销后直接跳至登录页面
	removeSuccess : function(date) {		
		location.href = KCPT.index_url;
	},
	removeerror : function(date) {
		$.ligerDialog.success(JSON.stringify(date));
	},
	
	// 修改密码弹出页
	showRetPassWord : function() {
		$("#mainWorkArea").A_Window({ // 弹出层的父类的iD
			dragabId : 'mainWorkArea', // 可拖动的范围
			width : 240, // 宽度
			height : 250,// 高度
			load_fn : function() {
				$("#retPassWordClose").click(function() {
					$("#mainWorkArea").close_ALL_Window();
				});
			},
			url : "model/common/retpassword.jsp"
		});
	},
	
	// 修改密码
	retPassWord : function() {
		var obj = this;
		var oldPassword = $("#retOldPassword").val();
		var retNewPassword = $("#retNewPassword").val();
		var validRetNewPassword = $("#validRetNewPassword").val();
		if (oldPassword == "") {
			$.ligerDialog.error("请输入旧密码！");
			return;
		}
		if (retNewPassword == "") {
			$.ligerDialog.error("请输入新密码！");
			return;
		}
		if ($.trim(retNewPassword).length < 6) {
			$.ligerDialog.error("密码不能小于6位！");	
			return;
		}
		if ($.trim(retNewPassword).length > 20) {
			$.ligerDialog.error("密码不能大于20位！");	
			return;
		}
		if (validRetNewPassword == "") {
			$.ligerDialog.error("请重复输入新密码！");
			return;
		}
		if (retNewPassword != validRetNewPassword) {
			$.ligerDialog.error("新密码两次输入不一致！");
			return;
		}
		$.ligerDialog.confirm('确定要修改密码！', function(yes) {
			if (yes) {
				var oldPassword = $("#retOldPassword").val();
				var retNewPassword = $("#retNewPassword").val();
				oldPassword = hex_sha1(oldPassword).toLowerCase();
				retNewPassword = hex_sha1(retNewPassword).toLowerCase();
				JAjax("portal/retPassword.action", {
					"oldPassword" : oldPassword,
					"retNewPassword" : retNewPassword
				}, "json", function(data) {
					var obj = eval(data);
					if (obj.error != null && obj.error != "") {
						if (obj.error[0].errorMessage != null
								&& obj.error[0].errorMessage != "") {
							$.ligerDialog.error(obj.error[0].errorMessage);
						}
					} else {
						$.ligerDialog.success(obj.displayMessage);
						$("#mainWorkArea").close_ALL_Window();
					}
				}, function(data) {
					$.ligerDialog.error(JSON.stringify(date));
				}, true);
			}
		});
	},
	showRetQuestion : function() {
		$("#mainWorkArea").A_Window({ // 弹出层的父类的iD
			dragabId : 'mainWorkArea', // 可拖动的范围
			width : 550, // 宽度
			height : 300,// 高度
			load_fn : function() {
				$("#retQuestionClose").click(function() {
					$("#mainWorkArea").close_ALL_Window();
				});
			},
			url : "model/entbusiness/myQuestion.jsp" 
		// + vid //目标页面或action的地址
		});
	},
	retQuestion : function() {// 提交用户问题
		var obj = this;
		var retTitle = $("#retTitle").val();
		if (retTitle == "" || retTitle == "请输入您的问题") {
			$.ligerDialog.error("请输入您的问题！");
			return;
		}
		if(validateCharLength(retTitle)>120){
			$.ligerDialog.error("请不要超过六十个字符！");
			return;
		}
		retTitle=retTitle.replace(/\r\n/g," ");   
		retTitle=retTitle.replace(/\n/g," ");   
		JAjax("homepage/addQuestion.action", {"replyTheme" : retTitle}, "json", function(){
			$("#mainWorkArea").close_ALL_Window();
			JAjax("homepage/findFeedbackQuestion.action", "", "json",
					obj.findFeedbackQuestion, null, true);
		}, null, true);
	},
	
	// 查看更多路况
	showEntMoreRoad : function(){
		var obj = this;
		$("#mainWorkArea").A_Window({ // 弹出层的父类的iD
			dragabId : 'contentMain', // 可拖动的范围
			width : 650, // 宽度
			height : 416,// 高度
			load_fn : function() {
				var typeName = "";
				$("#entMoreCloseRoad").click(function() {
					winHp.returnValue = null;
					winHp.curentPage = 1;
					$("#mainWorkArea").close_ALL_Window();
				});
				var ddl_status=  window.document.getElementById("roadSelect");
				winHp.returnValue=ddl_status.options[ddl_status.selectedIndex].value;
				$("#entMoreTopRoad").html("路况快报列表");
				JAjax("memcache/memcache!getRoadConditionPage.action", {"provinceCodes" : winHp.returnValue}, "json", obj.showEntMoreRoadGrid, null, true);
			},
			url : "model/entbusiness/entRoadMore.jsp"
		// + vid //目标页面或action的地址
		});
	},
	showEntMoreRoadGrid: function(data){ 
		pageRowSize=10;
		var searchfun="winHp.showEntMoreRoadPage";//翻页函数
		var pageBarObject = new pageBarObj();
		var arr = data.Rows;
		var totalSize =data.Total;
		var strLength = 0;
		//var str = "<table border=\"0\" cellspacing=\"1\" cellpadding=\"0\">";
		var str = "<table align='center' style='border-collapse:collapse; text-align:center;' width='100%' border='1' bordercolor='#6699cc' cellspacing='0' cellpadding='0'>";
		str += "<tr bgcolor='#dfffdf' style='height:30px; font-weight:bold;'><td width='70%'>路况快报</td><td>时间</td></tr>";
		if(arr != undefined && arr != null){
			for(var i=0; i<arr.length; i++){
				strLength = 30;
				var obj = arr[i];
				var time = obj.roadConditionTime;
				var date = obj.descriptions;
				if(date.length<strLength){
					str += "<tr bgcolor='#ecf4f9'><td style='text-align:left;padding-left:10px;'><a href=\"javascript:void(0)\" onclick=\"winHp.showRoadDetail('"+time+"','"+date+"',true)\">"+date+"</a></td><td>"+time+"</td></tr>";
				}else{
					strLength += winHp.getSpecialCharactersNumber(date.substring(0,strLength));
					str += "<tr bgcolor='#ecf4f9'><td style='text-align:left;padding-left:10px;'><a href=\"javascript:void(0)\" onclick=\"winHp.showRoadDetail('"+time+"','"+date+"',true)\">"+date.substring(0,strLength)+"...</a></td><td>"+time+"</td></tr>";
				}
			}
		}
        str += "</table>";
        $("#entMoreTableRoad").html(str);
        pageBarObject.pagebarFun(searchfun, winHp.curentPage, totalSize, pageRowSize); //添加翻页
	},
	showEntMoreRoadPage: function(curentPage){
		pageRowSize=10;
		winHp.curentPage = curentPage ==""?"1":curentPage;
		var obj = this;
		JAjax("memcache/memcache!getRoadConditionPage.action", {"provinceCodes" : winHp.returnValue,"requestParam.page":winHp.curentPage,"requestParam.rows":pageRowSize}, "json", obj.showEntMoreRoadGrid, null, true);
	},
	
	// 查看路况详细信息
	showRoadDetail : function(time,date,type) {
		$("#mainWorkArea").close_A_Window({id:57});
		$("#mainWorkArea").A_Window({ // 弹出层的父类的iD
			dragabId : 'contentMain', // 可拖动的范围
			width : 600, // 宽度
			height : 376,// 高度
			id : 57,
			load_fn : function() {
				$("#roadDetailClose").click(function() {
					if(type){
						$("#mainWorkArea").close_AY_Window({id:57});
					}else{
						$("#mainWorkArea").close_A_Window({id:57});
					}
				});
				$("#roadDetailTop").html("路况快报");
				$("#roadDetailTitle").html("来源：本信息由上海优途提供&nbsp;&nbsp;&nbsp;&nbsp;时间：" + time);
	    		$("#roadContent").html(date);
			},
			url : "model/entbusiness/roadDetail.jsp"
		// + vid //目标页面或action的地址
		});
	},
	showEntMoreFeedback: function(type){//1 为信息反馈 ， 2 为我的问题
		var obj = this;
		winHp.feedbackType = type;
		$("#mainWorkArea").A_Window({ // 弹出层的父类的iD
			dragabId : 'contentMain', // 可拖动的范围
			width : 550, // 宽度
			height : 379,// 高度
			load_fn : function() {
				$("#entMoreCloseQuestion").click(function() {
					winHp.curentPage = 1;
					winHp.feedbackType = null;
					$("#mainWorkArea").close_ALL_Window();
				});
				var typeName = "";
				if(winHp.feedbackType == 1){
					$("#entMoreTopQuestion").html("信息反馈列表");
					typeName = "信息反馈";
				}else{
					$("#entMoreTopQuestion").html("我的问题列表");
					typeName = "我的问题";
				}
				JAjax("homepage/findFeedbackGrid.action", {"type":winHp.feedbackType}, "json", winHp.showInfoQuestionGrid, null, true);
			},
			url : "model/entbusiness/entMoreQuestion.jsp"
		// + vid //目标页面或action的地址
		});
	},
	showEntFeedbackPage: function(curentPage){
		pageRowSize=10;
		winHp.curentPage = curentPage ==""?"1":curentPage;
		var obj = this;
		JAjax("homepage/findFeedbackGrid.action", {"requestParam.page":curentPage,"requestParam.rows":pageRowSize,"type":winHp.feedbackType}, "json", obj.showInfoQuestionGrid, null, true);
	},
	showInfoQuestionGrid: function(data){
		pageRowSize=10;
		var searchfun="winHp.showEntFeedbackPage";//翻页函数
		var pageBarObject = new pageBarObj();
		var arr = data.Rows;
		var totalSize =data.Total;
		var feedbackType = "";
		var typeName = "";
		var strLength = 0;
		var strLengthContent = 0;
		if(winHp.feedbackType == 1){
			feedbackType = "1";
			typeName = "信息反馈";
		}else{
			feedbackType = "2";
			typeName = "我的问题";
		}
		//var str = "<table border=\"0\" cellspacing=\"1\" cellpadding=\"0\">";
		var str = "<table align='center' style='border-collapse:collapse; text-align:center;' width='90%' border='1' bordercolor='#6699cc' cellspacing='0' cellpadding='0'>";
		str += "<tr bgcolor='#dfffdf' style='height:30px; font-weight:bold;'><td width='50%'>"+typeName+"</td><td>回复</td></tr>";
		if(arr != undefined && arr != null){
			for(var i=0; i<arr.length; i++){
				strLength = 20;
				strLengthContent = 20;
				var obj = arr[i];
				if(obj.replyTheme.length<strLength){
					if(obj.replyContent.length<strLengthContent){
						var reply = obj.replyContent.length == 0 ? "无回复" : obj.replyContent;
						str += "<tr bgcolor='#ecf4f9'><td><a href=\"javascript:void(0)\" onclick=\"winHp.showInfoQuestionDetail("+feedbackType+","+obj.replyId+",'"+obj.replyTheme+"','"+obj.createName+"','"+obj.createTime+"')\">"+obj.replyTheme+"</a></td><td>"+reply+"</td></tr>";
					}else{
						strLengthContent += winHp.getSpecialCharactersNumber(obj.replyContent.substring(0,strLengthContent));
						str += "<tr bgcolor='#ecf4f9'><td><a href=\"javascript:void(0)\" onclick=\"winHp.showInfoQuestionDetail("+feedbackType+","+obj.replyId+",'"+obj.replyTheme+"','"+obj.createName+"','"+obj.createTime+"')\">"+obj.replyTheme+"</a></td><td>"+obj.replyContent.substring(0,strLengthContent)+"...</td></tr>";
					}
				}else{
					strLength += winHp.getSpecialCharactersNumber(obj.replyTheme.substring(0,strLength));
					if(obj.replyContent.length<strLengthContent){
						var reply = obj.replyContent.length == 0 ? "无回复" : obj.replyContent;
						str += "<tr bgcolor='#ecf4f9'><td><a href=\"javascript:void(0)\" onclick=\"winHp.showInfoQuestionDetail("+feedbackType+","+obj.replyId+",'"+obj.replyTheme+"','"+obj.createName+"','"+obj.createTime+"')\">"+obj.replyTheme.substring(0,strLength)+"...</a></td><td>"+reply+"</td></tr>";
					}else{
						strLengthContent += winHp.getSpecialCharactersNumber(obj.replyContent.substring(0,strLengthContent));
						str += "<tr bgcolor='#ecf4f9'><td><a href=\"javascript:void(0)\" onclick=\"winHp.showInfoQuestionDetail("+feedbackType+","+obj.replyId+",'"+obj.replyTheme+"','"+obj.createName+"','"+obj.createTime+"')\">"+obj.replyTheme.substring(0,strLength)+"...</a></td><td>"+obj.replyContent.substring(0,strLengthContent)+"...</td></tr>";
					}
				}
			}
		}
        str += "</table>";
        $("#entMoreTableQuestion").html(str);
        pageBarObject.pagebarFun(searchfun, winHp.curentPage, totalSize, pageRowSize); //添加翻页
	},
	
	// 查看信息反馈内容    type 1信息反馈，2我的问题
	showInfoQuestionDetail : function(type,replyId,replyTheme,createName,createTime,model){
		$("#mainWorkArea").close_A_Window({id:58});
		var object = this;
		$("#mainWorkArea").A_Window({ // 弹出层的父类的iD
			dragabId : 'contentMain', // 可拖动的范围
			width : 650, // 宽度
			height : 350,// 高度
			id : 58,
			mode : function(){
				if(model == 1){
					return true;
				}
			},
			load_fn : function() {
				$("#feedbackDetailClose").click(function() {
					$("#mainWorkArea").close_A_Window({id:58});
				});
				if(type == 1){
					$("#feedbackDetailTop").html("信息反馈");
				}else{
					$("#feedbackDetailTop").html("我的问题");
				}
				JAjax("homepage/findFeedbackParent.action", {"replyId" : replyId}, "json", function(data){
					var arr = eval(data);
					$("#feedbackDetailTitle").html(replyTheme);
					$("#createUser").html(createName);
					$("#createTime").html(utc2Date(createTime));
					var feedback = '';
					//var strLength = 0;
					if(feedback != undefined && feedback != null){
						var length = arr.length;
						if(length == 0){
							feedback = '无回复消息';
						}
						for(var i=0; i<length; i++){
							//strLength = 15;
							//strLength += winHp.getSpecialCharactersNumber(arr[i].replyContent.substring(0,strLength));
							feedback += "<div>"+arr[i].replyContent+"</div><div class='kcptWindow_main_info_feedback'><span style='margin-right:15px;'>"+arr[i].createName+"</span><span>"+utc2Date(arr[i].createTime)+"</span></div>";
							
						}
					}
					$("#feedbackContent").html(feedback);
				}, null, true);
			},
			url : "model/entbusiness/feedbackDetail.jsp"
		// + vid //目标页面或action的地址
		});
	},
	pucker_show : function(name,no,replyNumber){
		//name:命名前缀
		//no:当前鼠标所处对象的序号
		//replyNumber：回复条数
		var allOpenId = "#openReply";
		var allCloseId = "#closeReply";
		for (var i=0 ;i<replyNumber ;i++ ){
			allOpenId = "#openReply";
			allCloseId = "#closeReply";
			allOpenId += i;
			allCloseId += i;
			$(allOpenId).hide();
			$(allCloseId).show();
		}
		var id = "#"+name+no;
		var otherId = "#";
		if(name == "closeReply"){
			$(id).hide();
			otherId += "openReply";
			otherId += no;
			$(otherId).show();
		}else{
			$(id).hide();
			otherId += "closeReply";
			otherId += no;
			$(otherId).show();
		}
	},
	
	// 查看公告详细内容    type 1系统公告，2企业资讯
	showPublishInfoDetail : function(type,id,model){
		$("#mainWorkArea").close_A_Window({id:56});
		$("#mainWorkArea").A_Window({ // 弹出层的父类的iD
			dragabId : 'contentMain', // 可拖动的范围
			width : 650, // 宽度
			height : 350,// 高度
			id : 56,
			mode : function(){
				if(model == 1){
					return true;
				}
			},
			load_fn : function() {
				$("#publishInfoDetailClose").click(function() {
					$("#mainWorkArea").close_A_Window({id:56});
				});
				if(type == 1){
					$("#publishInfoDetailTop").html("系统公告");
				}else{
					$("#publishInfoDetailTop").html("企业资讯");
				}
				JAjax("homepage/findTbPublishInfoById.action", {"id" : id}, "json", function(data){
					var obj = data[0];
					$("#publishInfoDetailTitle").html(obj.infoTheme);
					$("#source").html(obj.userName);
					$("#infoTime").html(obj.publicInfoTime);
					$("#publishInfoContent").html(obj.infoContent);
				}, null, true);
			},
			url : "model/entbusiness/tbPublishInfoDetail.jsp"
		// + vid //目标页面或action的地址
		});
	},
	
	// 公告更多弹出页 1系统公告，2企业资讯
	showEntMore : function(type,infoType){
		var obj = this;
		winHp.pulishInfoType = type ;
		$("#mainWorkArea").A_Window({ // 弹出层的父类的iD
			dragabId : 'contentMain', // 可拖动的范围
			width : 550, // 宽度
			height : 416,// 高度
			load_fn : function() {
				$("#entMoreClose").click(function() {
					winHp.curentPage = 1;
					$("#mainWorkArea").close_ALL_Window();
				});
				if(type == 1){
					$("#entMoreTop").html("系统公告列表");
					$("#titleName").html("公告标题：");
				}else if(type == 2){
					$("#entMoreTop").html("企业资讯列表");
					$("#titleName").html("资讯标题：");
				}
				JAjax("homepage/findTbPublishInfoGrid.action", {"infoTypeStr" : infoType}, "json", obj.showEntMoreGrid, null, true);
			},
			url : "model/entbusiness/publishMore.jsp"
		// + vid //目标页面或action的地址
		});
	},
	showEntFindTheme: function(curentPage){
		pageRowSize=10;
		winHp.curentPage = curentPage ==""?"1":curentPage;
		var obj = this;
		var infoType = "";
		if(winHp.pulishInfoType == 1){
			infoType = "001";
		}else{
			infoType = "002,005";
		}
		JAjax("homepage/findTbPublishInfoGrid.action", {"requestParam.page":curentPage,"requestParam.rows":pageRowSize, "infoTypeStr" : infoType,"infoTheme": $("#entPublishInfoTheme").val()}, "json", obj.showEntMoreGrid, null, true);
	},
	showEntMoreGrid: function(data){
		pageRowSize=10;
		var searchfun="winHp.showEntFindTheme";//翻页函数
		var pageBarObject = new pageBarObj();
		var arr = data.Rows;
		var totalSize =data.Total;
		var type = "";
		var typeName = "";
		if(winHp.pulishInfoType == 1){
			type = "1";
			typeName = "系统公告";
		}else{
			type = "2";
			typeName = "企业资讯";
		}
		//var str = "<table border=\"0\" cellspacing=\"1\" cellpadding=\"0\">";		
		var str = "<table align='center' style='border-collapse:collapse; text-align:center;' width='90%' border='1' bordercolor='#6699cc' cellspacing='0' cellpadding='0'>";
		str += "<tr bgcolor='#dfffdf' style='height:30px; font-weight:bold;'><td width='60%'>"+typeName+"</td><td>时间</td></tr>";
		if(arr != undefined && arr != null){
			for(var i=0; i<arr.length; i++){
				var obj = arr[i];
				if(obj.isSettop == '1'){
					str += "<tr bgcolor='#ecf4f9'><td><a href=\"javascript:void(0)\" onclick=\"winHp.showPublishInfoDetail("+type+","+obj.infoId+")\">"+obj.infoTheme+"</a><font color = 'red'>&nbsp;TOP</font></td><td>"+obj.publicInfoTime+"</td></tr>";
				}else if(obj.sysTime<obj.publishTime){
					str += "<tr bgcolor='#ecf4f9'><td><a href=\"javascript:void(0)\" onclick=\"winHp.showPublishInfoDetail("+type+","+obj.infoId+")\">"+obj.infoTheme+"</a><font color = 'red'>&nbsp;NEW</font></td><td>"+obj.publicInfoTime+"</td></tr>";
				}else{
					str += "<tr bgcolor='#ecf4f9'><td><a href=\"javascript:void(0)\" onclick=\"winHp.showPublishInfoDetail("+type+","+obj.infoId+")\">"+obj.infoTheme+"</a></td><td>"+obj.publicInfoTime+"</td></tr>";
				}
			}
		}
        str += "</table>";
        $("#publishMoreTable").html(str);
        pageBarObject.pagebarFun(searchfun, winHp.curentPage, totalSize, pageRowSize); //添加翻页
	},
	maskAll:function(){
		mask("main_corpnotice","",true);
		mask("main_corp_info","",true);
		mask("feedback","",true);
		mask("road","",true);
		mask("vehicleTeam","",true);
		mask("vehicle","",true);
	},
	//定时轮训
	startTimer : function() {
		var o = this;
		$("#" + this.timesId).everyTime('60s',
				this.timesName, function() {
					o.getPageInfo(o);
				}, 0, true);
	},
	alarmTimer : function(){
		var o = this;
		$("#" + this.timesId).everyTime('150s',
				this.timesName, function() {
					//o.getAlarmInfo(o.alarmType);
				}, 0, true);
	},
	show:function(){
		this.startTimer();
		//this.alarmTimer();
	},
	
	/*
	 * 停止定时器
	 */
	endTimer: function(){
		$("#"+this.timesId).stopTime(this.timesName);
	},
	//企业入网车辆跳转到车辆管理
	vehicleToManagement : function() {
		var fun = function(){
			$("#operatorManagerContent").empty();
			$("#operatorManagerContent").load("model/vehicle/vehiclemng.jsp",null,function(){
				winVehicleMng.vehicleToManagement();
			});
		};
		if(checkFunction("FG_MEMU_OPERATIONS_DATA_VEHICLE")){
			//var name = $("div#CenterMaskDiv").find("li.menuli").eq(6).find("li[url='model/vehicle/vehiclemng.jsp']").text();
			//$("div#CenterMaskDiv").find("li.menuli").eq(6).trigger("click",["operatorDiv.jsp",name,fun]);
			KCPT.vehiclemngFlag = true;
			$("div#CenterMaskDiv").find("li.menuli[id=operatorDiv]").find("li[url='model/vehicle/vehiclemng.jsp']").trigger("click");
		}
	},
	//首页告警跳转到报警跟踪页
	alarmToMonitor : function(){
		if(checkFunction("FG_MEMU_SAFE_ALARM_FOLLOW")){
			KCPT.indexToAlarmTracking = true;
			$("div#CenterMaskDiv").find("li[url='model/alarmtrack/alarmtrack.jsp']").trigger("click",["safeDiv.jsp"]);
		}
	},
	//企业在线车辆跳转到在线车辆查询
	vehicleToOnline : function() {
		if(checkFunction("FG_MEMU_STATIC_SELECT_UPTIME")){
			KCPT.vehicleOnline = true;
			$("div#CenterMaskDiv").find("li.menuli[id=systemDiv]").find("li[url='model/vehicleOnline/vehileOnline.jsp']").trigger("click",["systemDiv.jsp"]);
		}
	},
	//企业在线行使车辆跳转到在线车辆查询
	vehicleRunToOnline : function() {
		if(checkFunction("FG_MEMU_STATIC_SELECT_UPTIME")){
			KCPT.vehicleRun = true;
			$("div#CenterMaskDiv").find("li.menuli[id=systemDiv]").find("li[url='model/vehicleOnline/vehileOnline.jsp']").trigger("click",["systemDiv.jsp"]);
		}
	},
	//返回特殊字符的个数的一半
	getSpecialCharactersNumber : function(str){
		var number = 0;
		var num = 0;
		number = validateCharLength(str);
		var strNumber = str.length;
		number = strNumber*2 - number;//获取特殊字符的个数
		if(number / 2 > 0.9){//如果特殊字符数多于五个
			num = number/2; //每两个特殊字符，新增一个字符
			if(number / 2 > 1){
				num += (number/2);//大于五个特殊字符的补填字符
			}else{
				num += 2;
			}
		}else{
			num = number/2;
		}
		number = (num)/2;
		return number;
	},
	// 告警趋势图列标题格式化
	getColumnName : function(str) {
		var newStr = "";
		var strs = new Array();
		strs = str.split("-");
		if(strs.length == 3) {
			newStr = strs[1] + "." + strs[2];
		} else if(strs.length == 2) {
			newStr = str;
		} else if(strs.length == 1) {
			newStr = str + "周";
		}
		return newStr;
	}
};