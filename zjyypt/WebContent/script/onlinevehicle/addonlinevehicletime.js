
var onlineTimefinedmsg = function(o) {
	this.SIM_C = false;
	this.SIM_U = false;
	
	this.manager = null;
	this.addObject = o;
};

onlineTimefinedmsg.prototype = {
		orgTree : function(){
			KCPT.SYSPARAMPAGE = 5;
			var center = getHeightAndWidth();
			var height1 = center.height-45;
			var width = center.width;
			$("#addOnlineTimefinedmsgForm").height(height1+11);
			$("#addOnlineTimefinedmsgForm").width(width-280);
			$("#content").width(width-280);
			
			//$("#onlineTimefinedmsgSearchAddform").css("display","block");
		},
		onResize : function(){
			var center = getHeightAndWidth();
			var height1 = center.height-45;
			var width = center.width;
			$("#addOnlineTimefinedmsgForm").height(height1+11);
			$("#addOnlineTimefinedmsgForm").width(width-280);
			$("#content").width(width-280);
		},
		
		getAddPredefinedmsgFormValidate : function(){
			var obj = this;
			obj.addPredefinedmsgFormValidate = $("#addOnlineTimefinedmsgForm").validate({
				debug:false,
				rules:{
				},
				message:{
					
				}
			});
			return obj.addPredefinedmsgFormValidate;
		},	
		modifyDo : function(){			
			var obj = this;
			$("#addOnlineTeimfinedmsgFormsubmitMe").click(function(){
				var t = obj.getAddPredefinedmsgFormValidate();
				// t.form() 验证通过，提交表单；否则，不处理
				if(t.form()){
					//var data = $('#addOnlineTimefinedmsgForm').serializeArray();
					var TempUrl = "systemmng/modifyOnlineVehicleTime.action";
//					if(){
//						TempUrl = "systemmng/modifyOnlineVehicleTime.action";
//					}else{
//						TempUrl = "systemmng/addOnlineVehicleTime.action";
//					}

					var id = $("#id").val();
					var entId = KCPT.user.entId;
					var onlineTime = $("#msgIdx").val();
					if(onlineTime != ""){
						onlineTime = onlineTime*3600*1000;
					}
					JAjax(TempUrl, {"onlineVehicleTime.entId":entId, "onlineVehicleTime.onlineTime":onlineTime, "onlineVehicleTime.id":id}, "json", function(data){
						var sucMsg = eval(data);					
						if(sucMsg.displayMessage){						
							getSchedulePreInstallMessage();				
							obj.updateSchedulePreMessage();							
							$.ligerDialog.success(data.displayMessage);	
						}else{
							$.ligerDialog.error(sucMsg.error[0].errorMessage);
						}
					}, null);
				}
			});
			$("#closeReset").click(function(){				
				$("#msgIdx").val($("#msgIdx_old").val());
			});
		},
		updateSchedulePreMessage : function() {
			var id = $("#id").val();
			var entId=KCPT.user.entId;
			JAjax(
					"systemmng/findOnlineVehicleTimeById.action", 
					{"onlineVehicleTime.entId":entId, "onlineVehicleTime.id":id}, 
					"json", 
					function(data){
						var time = data.onlineTime;
						if(time != "" && time != undefined){
							time = (time/1000)/3600;
						} else {
							// 如果为空，默认24小时
							time = 24;
						}
						$("#msgIdx").val(time);
						$("#msgIdx_old").val(time);
						$("#id").val(data.id);
				
						if(data && data.length > 0){
							KCPT.schedulePreMessage = data;
							if(KCPT.VehicleMonitorObj&&KCPT.VehicleMonitorObj.monitorTree){
								KCPT.VehicleMonitorObj.monitorTree.bindBatchScheduleEvent();
							}
						}
					}, null);
			
		},
		authentication : function() {// 权限验证
//			this.SIM_C = checkFunction("BG_MEMU_BUSINESS_SUPPORT_SIM_CARD_C");
//			this.SIM_U = checkFunction("BG_MEMU_BUSINESS_SUPPORT_SIM_CARD_U");

			this.SIM_C = true;
			this.SIM_U = true;
			if (!this.SIM_C)
				$("a[name=simAdd]").remove();
		},show : function(){
			var obj = this;
			obj.orgTree();
		}
};



$(document).ready( function() {
	//alert(KCPT.user.entName);
	$("#span_entName").text(KCPT.user.entName);
	$("#entId").val(KCPT.user.entId);
	
	var onlineTimefinedmsgMng = new onlineTimefinedmsg();
	onlineTimefinedmsgMng.authentication();
		// 加载组织树
	onlineTimefinedmsgMng.orgTree();
	// 加载 Grid
	onlineTimefinedmsgMng.modifyDo();
	onlineTimefinedmsgMng.updateSchedulePreMessage();
	window.winOnlineTimefinedmsgMng = onlineTimefinedmsgMng;
	sysparammng.showObj = onlineTimefinedmsgMng;
});
