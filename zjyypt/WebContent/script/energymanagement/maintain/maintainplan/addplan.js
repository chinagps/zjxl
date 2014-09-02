var addPlan = function() {
	this.version = "create by ningdh in 2011.12.28";
	this.planClassArray;
};
addPlan.prototype = {
	// 左侧树的列表隐藏
	hiddenLeftTree : function() {
//		var obj = this;
//		obj.leftTree = KCPT.root.leftTree;
//		obj.leftTree.hide();
	},
	//显示左侧树
	show : function() {
//		var obj = this;
//		obj.leftTree = KCPT.root.leftTree;
//		obj.leftTree.show();
	},
	onResize:function(){
		var center = getHeightAndWidth();
		$("#addPlanForm").width(center.width-270);
		$("#addPlanForm").height(center.height - 108);
	},
	// 选择“执行频率”，更改页面显示区域
	changerExeFrequency : function() {
		if($("#maintainplanEditFlag").val()!=null&&$("#maintainplanEditFlag").val().length>0) {
			$("#warnDaysSpan").text("");
			$("#exeTimeSpan").text("");
			$("#intervalDaysSpan").text("");
			$("#warnMileageSpan").text("");
			$("#intervalMileageSpan").text("");
			
			$("#warnDays").val("");
			$("#exeTime").val("");
			$("#intervalDays").val("");
			$("#warnMileage").val("");
			$("#intervalMileage").val("");
		}
		var obj = this;
		// 获得选中值
		var frequency = '1'
		$("select[id='exeFrequency'] option").each(function(){
			if($(this).attr('selected')){
				frequency = $(this).val();
			}
		});
		// 循环执行
		if (frequency == '0') {
			 $("#dayLi").insertAfter($("#mileageLi"));//交换里程和时间显示的位置
			 $("#frequency0").show();
			 $("#frequency1").show();
			 $("#frequency2").hide();
		} else {
			 $("#mileageLi").insertAfter($("#dayLi"));//交换里程和时间显示的位置
			 $("#frequency0").show();
			 $("#frequency2").show();
			 $("#frequency1").hide();
		}
	},	
	// 改变维保名称，动态改变维保描述
	changeMainTainClassName : function() {
		var obj = this;
		// 获得选中值
		var maintainValue = $("select[id='maintainId'] option[selected]").val();
		//赋值隐藏字段
		$("#maintainName").val($("select[id='maintainId'] option[selected]").html());
		var contentSelect = plan.maintainClassInfo;
	    for (var i = 0; i < contentSelect.length; i++){
	    	if (maintainValue == contentSelect[i][0]) {
				$("#addMaintainContent").html(contentSelect[i][1]);
				$("#addMaintainContent").keydown(function(event) {
				    if(event.keyCode == 8) {
				        return false;
				    }
				});
			}
	    }
	},	
	//赋值exeTime
	loadDate:function(obj){
 		var today=new Date();
 		var year=today.getFullYear();
 		var month=today.getMonth()+1;
 		    month=(month<10)?('0'+month):month;
 		var day=today.getDate();
 	    $('#'+obj).val(year+'-'+month+'-'+day);
 	},
 	clearNoNum:function(obj){
		//先把非数字的都替换掉，除了数字和.
		obj.value = obj.value.replace(/[^\d]/g,"");
		//必须保证第一个为数字而不是.
		obj.value = obj.value.replace(/^\./g,"");
	}
};
ad = new addPlan();
$(document).ready(function() {
	ad.changerExeFrequency();
//	ad.show();
//	ad.hiddenLeftTree();
	ad.loadDate('exeTime');
	ad.onResize();
});
