var addlineTip = function() {
	this.initEvent();
};
addlineTip.prototype = {
	initEvent : function() {
		var _thisPanel = $("#operatorManagerContent");
		// 轨迹导入
		$("#classline_tip_importBtn").bind('click', function() {
			_thisPanel.close_ALL_Window();
			_thisPanel.A_Window({ // 弹出层的父类的iD
				dragabId : 'operatorManagerContent', // 可拖动的范围
				width : 420, // 宽度
				height : 235,// 高度 popClose
				load_fn : function() {
				},
				url : "model/classline/findPath.html" // 目标页面或action的地址
			});
			_thisPanel.show_A_Window();

		});
		
		$("#classline_popClose").bind('click',function(){
			_thisPanel.close_ALL_Window();
		});
		
		// 手工录入
		
		var _mainWorkArea = $("#mainWorkArea");
		$("#classline_tip_inputBtn").bind('click', function() {
			_thisPanel.close_ALL_Window();
			_mainWorkArea.A_Window({
//				dragabId : 'operatorManagerContent',
				id:'classline_linePopWin',
				dragAble:false,
				width : 850,
				height : 535,
				load_fn : function() {
					classline_linePopMain.mapEvent();
				},
				url : "model/classline/linePopMain.html"
			});
			_mainWorkArea.show_A_Window();
		});
		
	}

};
$(document).ready(function() {
		var addtip = new addlineTip();
		window.classline_addlineTip = addtip;
});
