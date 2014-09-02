var sysparam = function() {
	this.showObj;
};
sysparam.prototype = {
		// 隐藏左侧树的列表
//		orgTree : function() {
//			// 初始化组织结构Tree
//			var obj = this;
//			obj.leftTree = KCPT.root.leftTree;
//			obj.leftTree.hide();
//		},
	onResize : function(){
		var obj = this;
		var center = getHeightAndWidth();
		var height1 = center.height-40;
		var width = center.width;
		$("#sysparamAccordion1").ligerAccordion({
			height : height1
		});
		//$("#systemManagerContent").height(height1);
		$("#sysparamAccordion1").height(height1);
		$("#sysparammng").height(height1+5);
		$("#sysparammng").css("width",width-5);
		
		
		$("#corplogo").css("height",height1-113);
		$("#monitoring").css("height",height1-113);
		$("#emergency").css("height",height1-113);
		$("#monitoring").css("height",height1-113);
		var pageIdx = KCPT.SYSPARAMPAGE;
		if(obj.showObj){
			obj.showObj.onResize();
		}
	},
	initaccordion : function() {
		var center = getHeightAndWidth();
		var height1 = center.height-40;
		var width = center.width;
		$("#sysparamAccordion1").ligerAccordion({
			height : height1
		});
//		$("#sysparammngcontent").height(height1);
		$("#sysparamAccordion1").height(height1);
		$("#sysparammng").height(height1+5);
		
		$(".l-accordion-content").addClass("sysm_syscontentwidth");
		$(".l-accordion-header").addClass("headerAccordion");
		$(".l-accordion-header-inner").addClass("sysm_cell_sysright");
		$("#sysparamAccordion1").addClass("accordion_cs_left");
		$("#footer").show();
		$("#sysparammng").css("width",width-5);
		
		
		var contents = $("#sysparamAccordion1").find(".l-accordion-content");
		$("#sysparamAccordion1").find(".l-accordion-header").each(function(i){
			if(i==0){
				if(!checkFunction("FG_MEMU_MANAGER_PARAMETER_LOGO")){
					$(this).addClass("hiden");
					contents.eq(0).addClass("hiden");
				}else{
					$(this).addClass("show");
					contents.eq(0).addClass("show");
				}
			}else if(i==1){
				if(!checkFunction("FG_MEMU_MANAGER_PARAMETER_DISPATCH")){
					$(this).addClass("hiden");
					contents.eq(1).addClass("hiden");
				}else{
					$(this).addClass("show");
					contents.eq(1).addClass("show");
				}
			}else if(i==2){
				var isHave = 0;
				contents.eq(2).find("li").each(function(w){
					if(w==0){
						if(!checkFunction("FG_MEMU_MANAGER_PARAMETER_ALARM_LEVEL")){
							$(this).addClass("hiden");
						}else{
							$(this).addClass("show");
							isHave++;
						}
					}else if(w==1){
						if(!checkFunction("FG_MEMU_MANAGER_PARAMETER_ALARM_SHOW")){
							$(this).addClass("hiden");
						}else{
							$(this).addClass("show");
							isHave++;
						}
					}
					
				});
				if(isHave==0){
					$(this).addClass("hiden");
					contents.eq(2).addClass("hiden");
				}else{
					$(this).addClass("show");
					contents.eq(2).addClass("show");
				}
			}else if(i == 3){
				if(!checkFunction("FG_MEMU_MANAGER_PARAMETER_ALARM_LEVEL")){
					$(this).addClass("hiden");
					contents.eq(3).addClass("hiden");
				}else{
					$(this).addClass("show");
					contents.eq(3).addClass("show");
				}
			}
		});
		this.bindEvent();
		 $("#sysparamAccordion1").find("div.l-accordion-header.show").eq(0).trigger("click");
		 $("#sysparamAccordion1").find("div.l-accordion-content.show").find("li").eq(0).trigger("click");
	},
	//li上绑定的事件
		bindEvent:function()
		{
			$("#sysparamAccordion1").find("li").each(function() {
				$(this).click(function() {
					var thisurl = $(this).attr("url");
					$("#sysparamRightParamContent").empty();
					if(thisurl!=undefined && thisurl!=null && thisurl!=""){
						$("#sysparamRightParamContent").load(thisurl);
					}
				});
			});
		}  
};
$(document).ready(function() {
	var sysparammng = new sysparam();
	//sysparammng.orgTree();
	sysparammng.initaccordion();
	window.sysparammng = sysparammng;
	//systemManager.addChildList(sysparammng);
	//systemManager.showObj = sysparammng;
	KCPT.onresizeObj = sysparammng;
});