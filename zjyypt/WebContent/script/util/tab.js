var tab = {
	// Tab选项卡
	tab : function(id) {
		for ( var i = 1; i < 3; i++) {
			$("#litab" + i).parent().removeClass();
			$("#tab" + i).hide();
		}
		$("#litab" + id).parent().addClass("h");
		$("#tab" + id).show();
		if(1 == id){
//			var tvdi = new thVehicleDispatchIssued();
//			tvdi.tvdiTree();
//			tvdi.tvdiGrid();
		}
		if(2 == id){
//			var tvdr = new thVehicleDispatchReport();
//			tvdr.tvdrTree();
//			tvdr.tvdrGrid();
		}
	}
};
$(function() {
	tab.tab("1");
});