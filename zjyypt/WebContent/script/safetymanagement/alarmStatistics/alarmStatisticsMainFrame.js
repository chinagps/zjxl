var alarmStatisticsMaimFrames = function() {
	this.version = "create by cuisong in 2012.5.04";
	this.height = getHeightAndWidth().height;
	this.width = getHeightAndWidth().width;
    this.leftShrinkhidden=0;
    this.rightCenterUpShrinkhidden=0;
    this.alarmStatisticsConfigs= {
		  htmlElements : {
			  mainContainer : "alarmStatisticsMain",
			  leftContainer : "alarmStatisticsLeftNavigation",
			  searchFromId : "searchFormForAlarmStatistics",
			  leftShrink: "alarmStatisticsLeftLeftShrink",
			  rightContainer : "alarmStatisticsRightCenter",
			  tabToolContainer : "alarmStatisticsTabTool",
			  rightCenterMainArea :"rightCenterMainArea",
			  rightFormContainer : "alarmStatisticsFormArea",
			  rightChartContainer : "alarmStatisticsChartArea",
			  rightCenterChartAndGridArea : "rightCenterChartAndGridArea",
			  rightCenterShrink:  "alarmStatisticsShrink",
			  listGridContainer : "alarmStatisticsListGridArea"
		  }
    };
	this.init();
	this.gridShowObj;
	this.ALARMEMP = false;//导出
};
 alarmStatisticsMaimFrames.prototype = {
 	  //初始化处理
      init:function(){
    		var obj = this;
    	    //$("#"+obj.alarmStatisticsConfigs.htmlElements.mainContainer).width(obj.width-290);
    	    //$("#"+obj.alarmStatisticsConfigs.htmlElements.leftContainer).height(obj.height-35);
    	    $("#"+obj.alarmStatisticsConfigs.htmlElements.rightContainer).width(obj.width-260);
    	    $("#"+obj.alarmStatisticsConfigs.htmlElements.rightContainer).height(obj.height-37);
    	   // $("#"+obj.alarmStatisticsConfigs.htmlElements.leftShrink).height(obj.height-30);
    	   // $("#"+obj.alarmStatisticsConfigs.htmlElements.leftShrink).attr({"style" : "margin-top:"+obj.height/2+"px;"});
    	    //$("#"+obj.alarmStatisticsConfigs.htmlElements.leftContainer).width(253);
			//$("#"+obj.alarmStatisticsConfigs.htmlElements.rightFormContainer).height(30);
//			$("#"+obj.alarmStatisticsConfigs.htmlElements.rightCenterChartAndGridArea).height(obj.height-148);
			//$("#"+obj.alarmStatisticsConfigs.htmlElements.rightCenterMainArea).height(obj.height-93);
 			obj.changeFirstTabStyle();
 			$("#panel1").height(obj.height - 146);
			$("#panel2").height(obj.height - 146);
			$("#panel3").height(obj.height - 212);
        },
        onResize:function(r){
    		var obj = this;
    		var center = getHeightAndWidth();
    		obj.height = center.height;
    		obj.width = center.width;
    		//$("#"+obj.alarmStatisticsConfigs.htmlElements.mainContainer).width(obj.width-290);
    	    //$("#"+obj.alarmStatisticsConfigs.htmlElements.leftContainer).height(obj.height-35);
    		if($("#alarmStatisticsLeftNavigation").is(":hidden")){
    			$("#"+obj.alarmStatisticsConfigs.htmlElements.rightContainer).width(obj.width-10);
			}else{
				if(r){
					$("#"+obj.alarmStatisticsConfigs.htmlElements.rightContainer).width(obj.width-243);
				}else{
					$("#"+obj.alarmStatisticsConfigs.htmlElements.rightContainer).width(obj.width-260);
				}
			}
    	    $("#"+obj.alarmStatisticsConfigs.htmlElements.rightContainer).height(obj.height-37);
    	    //$("#"+obj.alarmStatisticsConfigs.htmlElements.leftShrink).height(obj.height-30);
    	    //$("#"+obj.alarmStatisticsConfigs.htmlElements.leftShrink).attr({"style" : "margin-top:"+obj.height/2+"px;"});
    	    //$("#"+obj.alarmStatisticsConfigs.htmlElements.leftContainer).width(253);
			//$("#"+obj.alarmStatisticsConfigs.htmlElements.rightFormContainer).height(30);
//			$("#"+obj.alarmStatisticsConfigs.htmlElements.rightCenterChartAndGridArea).height(obj.height-148);
			//$("#"+obj.alarmStatisticsConfigs.htmlElements.rightCenterMainArea).height(obj.height-93);
 			obj.changeFirstTabStyle();
 			$("#panel1").height(obj.height - 146);
			$("#panel2").height(obj.height - 146);
			$("#panel3").height(obj.height - 212);
//			$("#panel4").height(obj.height - 186);
			if(obj.gridShowObj){
				if(!r){
					obj.gridShowObj.onResize();
				}
			}
        },
       //第一个页签样式
       changeFirstTabStyle:function(){
    	   this.calculateStatTypeValue();
    	    $("#tagContent0").addClass('selectTag');
			$("#tagContent1").removeClass('selectTag');
			$("#tagContent2").removeClass('selectTag');
			$("#startDateForAlarmStatisticsMonth").val("");
		 	$("#endDateForAlarmStatisticsMonth").val("");
			$("#startDateForAlarmStatisticsTotal").val(getYesterdayPrecedeMonth());
			$("#endDateForAlarmStatisticsTotal").val(getYesterday());
			$("#startDateForAlarmStatisticsMonth").attr({"style" : "display:none"});
			$("#endDateForAlarmStatisticsMonth").attr({"style" : "display:none"});
	 		$("#startDateForAlarmStatisticsTotal").attr({"style" : ""});
	 		$("#endDateForAlarmStatisticsTotal").attr({"style" : ""});
       },
       //第二个页签样式
       changeSecondTabStyle:function(){
    	   this.calculateStatTypeValue();
   		$("#tagContent0").removeClass('selectTag');
		$("#tagContent1").addClass('selectTag');
		$("#tagContent2").removeClass('selectTag');
		$("#startDateForAlarmStatisticsTotal").val("");
		$("#endDateForAlarmStatisticsTotal").val("");
		$("#startDateForAlarmStatisticsTotal").attr({"style" : "display:none"});
		$("#endDateForAlarmStatisticsTotal").attr({"style" : "display:none"});
		  var date = new Date(); date.setMonth(date.getMonth()-6);
		$("#startDateForAlarmStatisticsMonth").val(dateFormat(date, "yyyy-MM"));
		date = new Date(); date.setMonth(date.getMonth()-1);
		$("#endDateForAlarmStatisticsMonth").val(dateFormat(date, "yyyy-MM"));
	 	$("#startDateForAlarmStatisticsMonth").attr({"style" : ""});
	 	$("#endDateForAlarmStatisticsMonth").attr({"style" : ""});
       },
       //第三个页签样式
       changeThirdTabStyle:function(){
    	   this.calculateStatTypeValue();
   		$("#tagContent0").removeClass('selectTag');
		$("#tagContent1").removeClass('selectTag');
		$("#tagContent2").addClass('selectTag');
		$("#startDateForAlarmStatisticsMonth").val("");
		$("#endDateForAlarmStatisticsMonth").val("");
    	$("#startDateForAlarmStatisticsTotal").val(getYesterdayPrecedeWeek());
		$("#endDateForAlarmStatisticsTotal").val(getYesterday());
		$("#startDateForAlarmStatisticsMonth").attr({"style" : "display:none"});
		$("#endDateForAlarmStatisticsMonth").attr({"style" : "display:none"});
	 	$("#startDateForAlarmStatisticsTotal").attr({"style" : ""});
	 	$("#endDateForAlarmStatisticsTotal").attr({"style" : ""});
       },
      calculateStatTypeValue: function(){
   		var tabId = $("#statTypeForAlarmStatistics").val();//获取页面打开的tab页签
   		var leftPanel = $("#latitudeForAlarmStatistics").val();//获取页面打开的tab页签
 		if (leftPanel == "1") {
			if (tabId == "1") {
				$("#statTypeForAlarm").val("1");
			} else if (tabId == "2") {
				$("#statTypeForAlarm").val("2");
			} else if (tabId == "3") {
				$("#statTypeForAlarm").val("3");
			}
		}
 		if (leftPanel == "2") {
			if (tabId == "1") {
				$("#statTypeForAlarm").val("4");
			} else if (tabId == "2") {
				$("#statTypeForAlarm").val("5");
			} else if (tabId == "3") {
				$("#statTypeForAlarm").val("6");
			}
		}
 		if (leftPanel == "3") {
			if (tabId == "1") {
				$("#statTypeForAlarm").val("7");
			} else if (tabId == "2") {
				$("#statTypeForAlarm").val("8");
			} else if (tabId == "3") {
				$("#statTypeForAlarm").val("9");
			}
		}
 		if (leftPanel == "4") {
			if (tabId == "1") {
				$("#statTypeForAlarm").val("10");
			} else if (tabId == "2") {
				$("#statTypeForAlarm").val("11");
			} else if (tabId == "3") {
				$("#statTypeForAlarm").val("12");
			}
		}
       },
       //点击切换页签
       selectTag: function (showContent){
    	   var obj=this;
   	       var arrs = $("ul[id^=panelCon]:visible");
	       var panelId = $(arrs[0]).attr("id");
		   var isHaveSelect = $("#"+panelId).find("div[class*=l-checkbox-checked]");
	 	   if(isHaveSelect.length == 0){
 				$.ligerDialog.alert("请选择查询维度", "信息提示", 'warn');
				return false;
			}
    		  var latitude = $("#latitudeForAlarmStatistics").val(),//左侧导航层级
    		      longitude=0;//tab面签层级
    		  if (showContent == "tagContent0") {
    			  obj.changeFirstTabStyle();
    			    longitude=1;
    	 		} else if (showContent == "tagContent1") {
    	 			obj.changeSecondTabStyle();
    	 			longitude=2;
    			}  else if (showContent == "tagContent2") {
    				obj.changeThirdTabStyle();
    				longitude=3;
    			}
    			$("#statType").val(longitude);
    			$("#statTypeForAlarmStatistics").val(longitude);
    		   gridListForAlarmStatistics.changeGrid(latitude,longitude);
    		   $('#searchForButtonForAlarmStatistics').trigger('click');
  		},
  	// 增加的权限验证
  		authentication : function() {
  			this.ALARMEMP = checkFunction("FG_MEMU_SAFE_ALARM_EXPORT");// 导出
  			if (!this.ALARMEMP) {
  				$("#gridExport").remove();
  			}
  		},
  		bindButtonEvent : function() {
  			var obj=this;
  		  //左侧点击收缩
  			 $("#"+obj.alarmStatisticsConfigs.htmlElements.leftShrink).find("a").click(function(){
  					 if(obj.leftShrinkhidden==0){
  						 $("#"+obj.alarmStatisticsConfigs.htmlElements.leftShrink).removeClass('hidden_pop_up_vertical_hidden');
  						 $("#"+obj.alarmStatisticsConfigs.htmlElements.leftShrink).addClass('hidden_pop_up_vertical_pop_up');
  						 $("#"+obj.alarmStatisticsConfigs.htmlElements.leftContainer).hide();
  						 obj.leftShrinkhidden=1;
  					 }else{
  						 $("#"+obj.alarmStatisticsConfigs.htmlElements.leftShrink).removeClass('hidden_pop_up_vertical_pop_up');
  						 $("#"+obj.alarmStatisticsConfigs.htmlElements.leftShrink).addClass('hidden_pop_up_vertical_hidden');
  						 $("#"+obj.alarmStatisticsConfigs.htmlElements.leftContainer).show();
  						 obj.leftShrinkhidden=0;
  					 }
  					 obj.onResize(true);
  			 });
  			   
  			  //点击上下收缩
  			  $("#"+obj.alarmStatisticsConfigs.htmlElements.rightCenterShrink).click(function(){
  					 if(obj.rightCenterUpShrinkhidden==0 ){
  						 $("#"+obj.alarmStatisticsConfigs.htmlElements.rightChartContainer).hide();
  						 $("#"+obj.alarmStatisticsConfigs.htmlElements.rightCenterShrink).removeClass('hidden_pop_up_horizontal_pop_up');
  						 $("#"+obj.alarmStatisticsConfigs.htmlElements.rightCenterShrink).addClass('hidden_pop_up_horizontal_hidden');
  						 var newHeight=KCPT.root.getCenterSize().height-70;	
  						 gridListForAlarmStatistics.gridHeight=newHeight;
  						 gridListForAlarmStatistics.grid.getGridManager().setHeight(newHeight);
  						 obj.rightCenterUpShrinkhidden=1;
  					 }else{
  						 $("#"+obj.alarmStatisticsConfigs.htmlElements.rightChartContainer).show();
  						 $("#"+obj.alarmStatisticsConfigs.htmlElements.rightCenterShrink).removeClass('hidden_pop_up_horizontal_hidden');
  						 $("#"+obj.alarmStatisticsConfigs.htmlElements.rightCenterShrink).addClass('hidden_pop_up_horizontal_pop_up');
  						 var newHeight=KCPT.root.getCenterSize().height - 385;
  						 if(newHeight<200){
  							 newHeight=200;
  						 }
  						 gridListForAlarmStatistics.gridHeight=newHeight;
  						 setGridScroll(gridListForAlarmStatistics.grid);
  						 gridListForAlarmStatistics.grid.getGridManager().setHeight(newHeight);
  						 obj.rightCenterUpShrinkhidden=0;
  					 }
  			});
  		}
 };

var alarmStatisticsMainFrame = new alarmStatisticsMaimFrames();
 $(document).ready(function() {
	 alarmStatisticsMainFrame.authentication();
	 alarmStatisticsMainFrame.bindButtonEvent();
	 KCPT.onresizeObj = alarmStatisticsMainFrame;
	 window.alarmStatisticsMainFrame = alarmStatisticsMainFrame;
  });
