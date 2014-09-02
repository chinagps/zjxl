var OperingLogState = function(){
	this.version = "create by liujie in 2012.5.28";
	this.name = "非法营运统计";
//	this.height = KCPT.root.getCenterSize().height;  //页面高度
	this.leftShrinkhidden = 0;  //横向收缩标志
	this.rightCenterUpShrinkhidden = 0;  //纵向收缩标志
	this.illOperatingFrameConigs= {
		  htmlElements : {
			  mainContainer : "illOperatingMain",
			  leftContainer : "illOperatingLeftNavigation",
			  searchFromId : "searchFormForIllOperating",
			  leftShrink: "illOperatingLeftLeftShrink",
			  rightContainer : "illOperatingRightCenter",
			  tabToolContainer : "illOperatingTabTool",
			  rightCenterMainArea :"iORightCenterMainArea",
			  rightFormContainer : "illOperatingFormArea",
			  rightChartContainer : "illOperatingChartArea",
			  rightCenterChartAndGridArea : "iORightCenterChartAndGridArea",
			  rightCenterShrink:  "illOperatingShrink",
			  listGridContainer : "illOperatingListGridArea"
		  }
	};
	this.init();
	this.EMP_BTN = false;
};

OperingLogState.prototype = {
		ivdiTree : function() {// 初始化组织结构Tree
			var obj = this;
			obj.leftTree = KCPT.root.leftTree;
		},
	//初始化页面
    init : function(){
    	var obj = this;
    	var center = getHeightAndWidth();
	    $("#"+obj.illOperatingFrameConigs.htmlElements.rightContainer).height(center.height-41);
	    $("#"+obj.illOperatingFrameConigs.htmlElements.rightContainer).width(center.width-6);
		$("#TreeContineDivIo").height(center.height-148);
		obj.changeFirstTabStyle();
    }, 
    //第一个页签样式
    changeFirstTabStyle:function(){
 	    $("#tagIllOperateContent0").addClass('selectTag');
			$("#tagIllOperateContent1").removeClass('selectTag');
			$("#tagIllOperateContent2").removeClass('selectTag');
			$("#startDateForIllOperatingMonth").val("");
		 	$("#endDateForIllOperatingMonth").val("");
			$("#startDateForIllOperatingTotal").val(getYesterdayPrecedeMonth());
			$("#endDateForIllOperatingTotal").val(getYesterday());
			$("#startDateForIllOperatingMonth").attr({"style" : "display:none"});
			$("#endDateForIllOperatingMonth").attr({"style" : "display:none"});
	 		$("#startDateForIllOperatingTotal").attr({"style" : "display:block"});
	 		$("#endDateForIllOperatingTotal").attr({"style" : "display:block"});
    },
  //第二个页签样式
    changeSecondTabStyle:function(){
		$("#tagIllOperateContent0").removeClass('selectTag');
		$("#tagIllOperateContent1").addClass('selectTag');
		$("#tagIllOperateContent2").removeClass('selectTag');
		$("#startDateForIllOperatingTotal").val("");
		$("#endDateForIllOperatingTotal").val("");
		$("#startDateForIllOperatingTotal").attr({"style" : "display:none"});
		$("#endDateForIllOperatingTotal").attr({"style" : "display:none"});
		  var date = new Date(); date.setMonth(date.getMonth()-6);
		$("#startDateForIllOperatingMonth").val(dateFormat(date, "yyyy-MM"));
		date = new Date(); date.setMonth(date.getMonth()-1);
		$("#endDateForIllOperatingMonth").val(dateFormat(date, "yyyy-MM"));
	 	$("#startDateForIllOperatingMonth").attr({"style" : "display:block"});
	 	$("#endDateForIllOperatingMonth").attr({"style" : "display:block"});
    },
  //第三个页签样式
    changeThirdTabStyle:function(){
		$("#tagIllOperateContent0").removeClass('selectTag');
		$("#tagIllOperateContent1").removeClass('selectTag');
		$("#tagIllOperateContent2").addClass('selectTag');
		$("#startDateForIllOperatingMonth").val("");
		$("#endDateForIllOperatingMonth").val("");
		$("#startDateForIllOperatingTotal").val(getYesterdayPrecedeWeek());
		$("#endDateForIllOperatingTotal").val(getYesterday());
		$("#startDateForIllOperatingMonth").attr({"style" : "display:none"});
		$("#endDateForIllOperatingMonth").attr({"style" : "display:none"});
	 	$("#startDateForIllOperatingTotal").attr({"style" :"display:block"});
	 	$("#endDateForIllOperatingTotal").attr({"style" : "display:block"});
    },
  //点击切换页签
    selectTag: function (showContent){
 	     var obj=this;
 		 var longitude=0;//tab面签层级
 		 //判断切换页签时是否树是否选择了节点
 		 var isHave = obj.leftTree.GridManager.getCheckedRows();
 		 if(isHave.length == 0) {
 			$.ligerDialog.alert("请在左侧树中选择查询条件", "信息提示", 'warn');
 			return;
 		 }
 		  if (showContent == "tagIllOperateContent0") {
 			  obj.changeFirstTabStyle();
 			    longitude=1;  //汇总表
 	 		} else if (showContent == "tagIllOperateContent1") {
 	 			obj.changeSecondTabStyle();
 	 			longitude=2;  //月报表
 			}  else if (showContent == "tagIllOperateContent2") {
 				obj.changeThirdTabStyle();
 				longitude=3;  //日报表
 			}
 			$("#iOStatType").val(longitude);
 			$("#statTypeForIllOperating").val(longitude);
 			gridListForIllOperating.changeGrid(longitude);
 			
 		    $('#iOsearchForButton').trigger('click');
	},
	// 增加的权限验证
		authentication : function() {
			this.EMP_BTN = checkFunction("FG_MEMU_STATIC_STATIC_ILLEGAL_EXPORT");// 导出
			if (!this.EMP_BTN) {
				$("#ioGridExport").remove();
			}
		},
	onResize : function(bool) {
    	var obj = this;
    	var center = getHeightAndWidth();
	    $("#"+obj.illOperatingFrameConigs.htmlElements.rightContainer).height(center.height-41);
	    if(obj.leftShrinkhidden && obj.leftShrinkhidden==1){
	    	$("#"+obj.illOperatingFrameConigs.htmlElements.rightContainer).width(center.width-7);
	    }else{
	    	
	    	$("#"+obj.illOperatingFrameConigs.htmlElements.rightContainer).width(center.width-6);
	    }
		$("#TreeContineDivIo").height(center.height-148);
		gridListForIllOperating.onResize();
	},
	bindButtonEvent : function() {
		var obj = this;
		//左侧点击收缩
		$("#"+obj.illOperatingFrameConigs.htmlElements.leftShrink).find("a").click(function(){
				 if(obj.leftShrinkhidden==0){
					 $("#"+obj.illOperatingFrameConigs.htmlElements.leftShrink).removeClass('hidden_pop_up_vertical_hidden');
					 $("#"+obj.illOperatingFrameConigs.htmlElements.leftShrink).addClass('hidden_pop_up_vertical_pop_up');
					 $("#"+obj.illOperatingFrameConigs.htmlElements.leftContainer).hide();
					 
					 obj.leftShrinkhidden=1;
				 }else{
					 $("#"+obj.illOperatingFrameConigs.htmlElements.leftShrink).removeClass('hidden_pop_up_vertical_pop_up');
					 $("#"+obj.illOperatingFrameConigs.htmlElements.leftShrink).addClass('hidden_pop_up_vertical_hidden');
					 $("#"+obj.illOperatingFrameConigs.htmlElements.leftContainer).show();
					 obj.leftShrinkhidden=0;
				 }
				 obj.onResize(true);
		});
		//点击上下收缩
		$("#"+obj.illOperatingFrameConigs.htmlElements.rightCenterShrink).click(function(){
			 if(obj.rightCenterUpShrinkhidden==0 ){
				 $("#"+obj.illOperatingFrameConigs.htmlElements.rightChartContainer).hide();
				 $("#"+obj.illOperatingFrameConigs.htmlElements.rightCenterShrink).removeClass('hidden_pop_up_horizontal_pop_up');
				 $("#"+obj.illOperatingFrameConigs.htmlElements.rightCenterShrink).addClass('hidden_pop_up_horizontal_hidden');
				 var newHeight=KCPT.root.getCenterSize().height-70;
				 KCPT.gridListForIllOperatingGrid.getGridManager().setHeight(newHeight);
				 obj.rightCenterUpShrinkhidden=1;
			 }else{
				 $("#"+obj.illOperatingFrameConigs.htmlElements.rightChartContainer).show();
				 $("#"+obj.illOperatingFrameConigs.htmlElements.rightCenterShrink).removeClass('hidden_pop_up_horizontal_hidden');
				 $("#"+obj.illOperatingFrameConigs.htmlElements.rightCenterShrink).addClass('hidden_pop_up_horizontal_pop_up');
				 var newHeight=KCPT.root.getCenterSize().height - 385;
				 if(newHeight<200){
					 newHeight=200;
				 }
				 KCPT.gridListForIllOperatingGrid.getGridManager().setHeight(newHeight);
				 obj.rightCenterUpShrinkhidden=0;
			 }
		});
	}
};

var illOperatingMainFrame = new OperingLogState();
$(document).ready(function (){
	illOperatingMainFrame.ivdiTree();
	illOperatingMainFrame.authentication();
//	runManager.addChildList(illOperatingMainFrame);
//	runManager.showObj = illOperatingMainFrame;
	illOperatingMainFrame.bindButtonEvent();
	KCPT.onresizeObj = illOperatingMainFrame;
});