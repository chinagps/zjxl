$(function(){
	winVehicleMng.tbVehicleVid = $("#tbVehicleVid");
	winVehicleMng.vehicleNoId = $("#vehicleNoId");
	winVehicleMng.plateColorId = $("#plateColorId");
	
	winVehicleMng.modifyDo();
	
	$("#vehicleNoId").blur(function() {
		winVehicleMng.vehicleValidate();
	}).keyup(function() {
		if ($.trim($(this).val()).length == 0) {
			if ($("#vehicleNoIdForValid").size() > 0) {
				$("#vehicleNoIdForValid").remove();
			}
			if ($("#plateColorIdForValid").size() > 0) {
				$("#plateColorIdForValid").remove();
			}
		}
	});
	$("#plateColorId").change(function() {
		winVehicleMng.vehicleValidate();
	});
	 
	var center = getHeightAndWidth();
	$("#addVehicleForm").find("#addVehicleInfoDiv").height(center.height - 230);
	
	$("#vbrandCodeId").change(function() {
		//v.vehicleValidate();
		if(winVehicleMng.changeFlag == '1'){
			winVehicleMng.findListProductType();
		}
	});
	
	$("#otherCheckIType").click(function(){
		var flag = $("#otherCheckIType").attr("checked");
		if(flag){
			$("#otherCheckInsuranceType").show();
		}else{
			$("#otherCheckInsuranceType").val("");
			$("#otherCheckInsuranceType").hide();
		}
	});
});