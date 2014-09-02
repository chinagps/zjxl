var maintainClassFream = function() {
	this.maintainShowObj = null;
};
var firstLoad = 0;
//第一个页签点击切换处理
$("#maintainTagContent0").click(function(){
	maintainClassFream.clearLoadDiv();
	$("#maintainClassDiv").show();
	$("#maintainPlanDiv").hide();
	$("#maintainDetailDiv").hide();
	$("#maintainStatisticsDiv").hide();
	$("#maintainTags li").removeClass("selectTag");
	$(this).addClass("selectTag");
	$("#maintainClassDiv").load("model/energymanagement/maintain/maintainclass/maintainClassManage.jsp","");
});
//第二个页签点击切换处理
$("#maintainTagContent1").click(function(){
	maintainClassFream.clearLoadDiv();
	$("#maintainClassDiv").hide();
	$("#maintainPlanDiv").show();
	$("#maintainDetailDiv").hide();
	$("#maintainStatisticsDiv").hide();
	$("#maintainTags li").removeClass("selectTag");
	$(this).addClass("selectTag");
	$("#maintainPlanDiv").load("model/energymanagement/maintain/maintainplan/planList.jsp","");
});
//第三个页签点击切换处理
$("#maintainTagContent2").click(function(){
	maintainClassFream.clearLoadDiv();
	$("#maintainClassDiv").hide();
	$("#maintainPlanDiv").hide();
	$("#maintainDetailDiv").show();
	$("#maintainStatisticsDiv").hide();
	$("#maintainTags li").removeClass("selectTag");
	$(this).addClass("selectTag");
	$("#maintainDetailDiv").load("model/energymanagement/maintain/maintaindetail/maintainRecord.jsp","");
});
//第四个页签点击切换处理
$("#maintainTagContent3").click(function(){
	maintainClassFream.clearLoadDiv();
	$("#maintainClassDiv").hide();
	$("#maintainPlanDiv").hide();
	$("#maintainDetailDiv").hide();
	$("#maintainStatisticsDiv").show();
	$("#maintainTags li").removeClass("selectTag");
	$(this).addClass("selectTag");
	$("#maintainStatisticsDiv").load("model/energymanagement/maintain/maintaindetail/maintainStatistics.jsp","");
});
maintainClassFream.prototype = {
		//清除动态装载页面的内容
		clearLoadDiv : function(){
			$("#maintainClassContentDiv div").html("");
		},
		onResize:function(){
			if(this.maintainShowObj){
				this.maintainShowObj.onResize();
			}
		}
};
var maintainClassFream = new maintainClassFream();
$(document).ready(function() {
	var fir = checkFunction("FG_MEMU_MAINTENANCE_TYPE_MESSAGE");
	var sec = checkFunction("FG_MEMU_MAINTENANCE_TYPE_SELECT");
	var thr = checkFunction("FG_MEMU_MAINTENANCE_MAINTENANCE");
	var fou = checkFunction("FG_MEMU_MAINTENANCE_TYPE_PLAN");
	if(!fir){
		$("#maintainTagContent2").remove();
	}
	if(!sec){
		$("#maintainTagContent3").remove();
	}
	if(!thr){
		$("#maintainTagContent0").remove();
	}
	if(!fou){
		$("#maintainTagContent1").remove();
	}
	$("#maintainTags li").eq(0).click();
	
	
	KCPT.onresizeObj = maintainClassFream;
	//默认显示第三个页签
	//$("#maintainTagContent2").click();
	
});