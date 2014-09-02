var ThVehicleDispatchMsg = function() {
	this.tvdi;
	this.tvdr;
	this.init();
	this.tab("1");
	this.initEvent();
};
ThVehicleDispatchMsg.prototype = {
	init : function() {
		var that = this;
		that.tvdi = new thVehicleDispatchIssued();
		that.tvdi.authentication();
		that.tvdi.tvdiTree();
		that.tvdi.tvdiGrid();

		that.tvdr = new thVehicleDispatchReport();
		that.tvdr.authentication();
		that.tvdr.tvdrTree();
		that.tvdr.tvdrGrid();
	},
	// Tab选项卡
	tab : function(id) {
		for ( var i = 1; i < 3; i++) {
			$("#litab" + i).parent().removeClass();
			$("#tab" + i).hide();
		}
		$("#litab" + id).parent().addClass("h");
		$("#tab" + id).show();
	},
	initEvent:function(){
		var that = this;
		$("#litab1").click(function(){
			that.tab('1');
		});
		$("#litab2").click(function(){
			that.tab('2');
		});
	},
	onResize : function() {
		var that = this;
		if (that.tvdi)
			that.tvdi.onResize();

		if (that.tvdr)
			that.tvdr.onResize();
	}
};

$(document).ready(function() {
	var vehicleDispatchMsg = new ThVehicleDispatchMsg();
	KCPT.onresizeObj = vehicleDispatchMsg;
});