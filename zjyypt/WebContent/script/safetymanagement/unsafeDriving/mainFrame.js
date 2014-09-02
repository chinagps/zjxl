var unsafeDrivingMainFrames = function() {
	this.version = "create by cuisong in 2012.5.04";
	this.height = getHeightAndWidth().height;
    this.leftShrinkhidden=0;
    this.rightCenterUpShrinkhidden=0;
    this.unsafeDrivingFrameConigs= {
		  htmlElements : {
			  mainContainer : "unsafeDrivingMain",
			  leftContainer : "unsafeDrivingLeftNavigation",
			  searchFromId : "searchFormForUnsafeDriving",
			  leftShrink: "unsafeDrivingLeftLeftShrink",
			  rightContainer : "unsafeDrivingRightCenter",
			  tabToolContainer : "unsafeDrivingTabTool",
			  rightCenterMainArea :"rightCenterMainArea",
			  rightFormContainer : "unsafeDrivingFormArea",
			  rightChartContainer : "unsafeDrivingChartArea",
			  rightCenterChartAndGridArea : "rightCenterChartAndGridArea",
			  rightCenterShrink:  "unsafeDrivingShrink",
			  listGridContainer : "unsafeDrivingListGridArea"
		  }
       };
    this.init();
    this.ALARMEMP = false;//导出
    this.gridShowObj;
  };
 unsafeDrivingMainFrames.prototype = {
	 //隐藏其它功能左侧树
	/* hiddenLeftTree : function() {
		var obj = this;
		obj.leftTree = KCPT.root.leftTree;
		obj.leftTree.hide();
	 },*/
	 //初始化处理
      init:function(){
    		this.onResize();
        },
        onResize:function(){
    		var obj = this;
    		obj.height = getHeightAndWidth().height;
    	    //obj.hiddenLeftTree();
//     	    $("#"+obj.unsafeDrivingFrameConigs.htmlElements.mainContainer).height(obj.height);
    	    $("#"+obj.unsafeDrivingFrameConigs.htmlElements.leftContainer).height(obj.height-35);
    	    $("#"+obj.unsafeDrivingFrameConigs.htmlElements.rightContainer).height(obj.height-46);
    	    $("#"+obj.unsafeDrivingFrameConigs.htmlElements.leftShrink).height(obj.height-30);
    	    $("#"+obj.unsafeDrivingFrameConigs.htmlElements.leftShrink).attr({"style" : "margin-top:"+obj.height/2+"px;"});
    	    $("#"+obj.unsafeDrivingFrameConigs.htmlElements.leftContainer).width(253);
//			$("#"+obj.unsafeDrivingFrameConigs.htmlElements.rightFormContainer).height(30);
			$("#"+obj.unsafeDrivingFrameConigs.htmlElements.rightCenterChartAndGridArea).height(obj.height-148);
			$("#"+obj.unsafeDrivingFrameConigs.htmlElements.rightCenterMainArea).height(obj.height-93);
			$("#panel1").height(obj.height - 186);
			$("#panel2").height(obj.height - 186);
			$("#panel3").height(obj.height - 252);
			$("#panel4").height(obj.height - 186);
 			//$("#"+obj.unsafeDrivingFrameConigs.htmlElements.listGridContainer).height(obj.height-419);
			obj.changeFirstTabStyle();
			if(obj.gridShowObj){
				if(obj.rightCenterUpShrinkhidden==1){
					obj.gridShowObj.onResize(true);
				}else{
					obj.gridShowObj.onResize(false);
				}
			}
        },
       //第一个页签样式
       changeFirstTabStyle:function(){
    	    $("#tagContent0").addClass('selectTag');
			$("#tagContent1").removeClass('selectTag');
			$("#tagContent2").removeClass('selectTag');
			$("#startDateForUnSafeDrivingMonth").val("");
		 	$("#endDateForUnSafeDrivingMonth").val("");
			$("#startDateForUnSafeDrivingTotal").val(getYesterdayPrecedeMonth());
			$("#endDateForUnSafeDrivingTotal").val(getYesterday());
			$("#startDateForUnSafeDrivingMonth").attr({"style" : "display:none"});
			$("#endDateForUnSafeDrivingMonth").attr({"style" : "display:none"});
	 		$("#startDateForUnSafeDrivingTotal").attr({"style" : "display:block"});
	 		$("#endDateForUnSafeDrivingTotal").attr({"style" : "display:block"});
       },
       //第二个页签样式
       changeSecondTabStyle:function(){
   		$("#tagContent0").removeClass('selectTag');
		$("#tagContent1").addClass('selectTag');
		$("#tagContent2").removeClass('selectTag');
		$("#startDateForUnSafeDrivingTotal").val("");
		$("#endDateForUnSafeDrivingTotal").val("");
		$("#startDateForUnSafeDrivingTotal").attr({"style" : "display:none"});
		$("#endDateForUnSafeDrivingTotal").attr({"style" : "display:none"});
		  var date = new Date(); 
		  date.setMonth(date.getMonth()-6);
		$("#startDateForUnSafeDrivingMonth").val(dateFormat(date, "yyyy-MM"));
		date = new Date(); date.setMonth(date.getMonth()-1);
		$("#endDateForUnSafeDrivingMonth").val(dateFormat(date, "yyyy-MM"));
	 	$("#startDateForUnSafeDrivingMonth").attr({"style" : "display:block"});
	 	$("#endDateForUnSafeDrivingMonth").attr({"style" : "display:block"});
       },
       //第三个页签样式
       changeThirdTabStyle:function(){
   		$("#tagContent0").removeClass('selectTag');
		$("#tagContent1").removeClass('selectTag');
		$("#tagContent2").addClass('selectTag');
		$("#startDateForUnSafeDrivingMonth").val("");
		$("#endDateForUnSafeDrivingMonth").val("");
    	$("#startDateForUnSafeDrivingTotal").val(getYesterdayPrecedeWeek());
		$("#endDateForUnSafeDrivingTotal").val(getYesterday());
		$("#startDateForUnSafeDrivingMonth").attr({"style" : "display:none"});
		$("#endDateForUnSafeDrivingMonth").attr({"style" : "display:none"});
	 	$("#startDateForUnSafeDrivingTotal").attr({"style" : "display:block"});
	 	$("#endDateForUnSafeDrivingTotal").attr({"style" : "display:block"});
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
    		  var latitude = $("#latitudeForUnsafeDriving").val(),//左侧导航层级
    		      longitude=0;//tab面签层级
    		  if (showContent == "tagContent0") {
    			  obj.changeFirstTabStyle();
    			    longitude=1;
    	 		} else if (showContent == "tagContent1") {
    	 			obj.changeSecondTabStyle();
    	 			longitude=2;
    	 			 $("#leftChart").html('');
    			     $("#leftChart").attr('style','background:url(images/global/no_data2.png) no-repeat; border:#aaccee 1px solid; width:450px; height:290px;');
    			     $("#rightChart").html('');
    			     $("#rightChart").attr('style','background:url(images/global/no_data2.png) no-repeat; border:#aaccee 1px solid; width:450px; height:290px;');
    	 		}  else if (showContent == "tagContent2") {
    				obj.changeThirdTabStyle();
    				longitude=3;
    			}
    			$("#statType").val(longitude);
    			$("#statTypeForUnsafeDriving").val(longitude);
    		   gridListForUnsafeDriving.changeGrid(latitude,longitude);
    		   $('#searchForButton').trigger('click');
  		},
  	// 增加的权限验证
  		authentication : function() {
  			this.ALARMEMP = checkFunction("FG_MEMU_SAFE_DRIVE_EXPORT");// 导出
  			if (!this.ALARMEMP) {
  				$("#gridExport").remove();
  			}
  		},
  		bindButtonEvent : function() {
  			var obj=this;
  			 //左侧点击收缩
  			 $("#"+obj.unsafeDrivingFrameConigs.htmlElements.leftShrink).find("a").click(function(){
  					 if(obj.leftShrinkhidden==0){
  						 $("#"+obj.unsafeDrivingFrameConigs.htmlElements.leftShrink).removeClass('hidden_pop_up_vertical_hidden');
  						 $("#"+obj.unsafeDrivingFrameConigs.htmlElements.leftShrink).addClass('hidden_pop_up_vertical_pop_up');
  						 $("#"+obj.unsafeDrivingFrameConigs.htmlElements.leftContainer).hide();
  						obj.leftShrinkhidden=1;
  					 }else{
  						 $("#"+obj.unsafeDrivingFrameConigs.htmlElements.leftShrink).removeClass('hidden_pop_up_vertical_pop_up');
  						 $("#"+obj.unsafeDrivingFrameConigs.htmlElements.leftShrink).addClass('hidden_pop_up_vertical_hidden');
  						 $("#"+obj.unsafeDrivingFrameConigs.htmlElements.leftContainer).show();
  						obj.leftShrinkhidden=0;
  					 }
  				 gridListForUnsafeDriving.onResize();	 
  			 });
  			  //点击上下收缩
  			  $("#"+obj.unsafeDrivingFrameConigs.htmlElements.rightCenterShrink).click(function(){
  					 if(obj.rightCenterUpShrinkhidden==0 ){
  						 $("#"+obj.unsafeDrivingFrameConigs.htmlElements.rightChartContainer).hide();
  						 $("#"+obj.unsafeDrivingFrameConigs.htmlElements.rightCenterShrink).removeClass('hidden_pop_up_horizontal_pop_up');
  						 $("#"+obj.unsafeDrivingFrameConigs.htmlElements.rightCenterShrink).addClass('hidden_pop_up_horizontal_hidden');
  						 obj.rightCenterUpShrinkhidden=1;
  						gridListForUnsafeDriving.onResize(true);
  					 }else{
  						 $("#"+obj.unsafeDrivingFrameConigs.htmlElements.rightChartContainer).show();
  						 $("#"+obj.unsafeDrivingFrameConigs.htmlElements.rightCenterShrink).removeClass('hidden_pop_up_horizontal_hidden');
  						 $("#"+obj.unsafeDrivingFrameConigs.htmlElements.rightCenterShrink).addClass('hidden_pop_up_horizontal_pop_up');
  						 var newHeight=KCPT.root.getCenterSize().height - 385;
  						 if(newHeight<200){
  							 newHeight=200;
  						 }
  						 obj.rightCenterUpShrinkhidden=0;
  						 setGridScroll(gridListForUnsafeDriving.grid);
  						gridListForUnsafeDriving.onResize(false);
  					 }
  			});
  		}
 };
   
var unsafeDrivingMainFrame = new unsafeDrivingMainFrames();
 $(document).ready(function() {
	 unsafeDrivingMainFrame.authentication();
	 unsafeDrivingMainFrame.bindButtonEvent();
	 KCPT.onresizeObj = unsafeDrivingMainFrame;
	 window.unsafeDrivingMainFrame = unsafeDrivingMainFrame;
  });
