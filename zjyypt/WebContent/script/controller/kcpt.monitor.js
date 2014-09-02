/*******************************************************************************
 * 车辆监控页面使用的js脚本控制文件
 * 
 * 
 ******************************************************************************/
(function($) {
	KCPT.monitor = KCPT.extend(KCPT.object, {
		constructor : function(config) {
			KCPT.applyIf(this, config);
			KCPT.monitor.superclass.constructor.apply(this, arguments);
			this.onShow();
			this.init();
		},
		/**
		 * 重写设置大小方法
		 */
		//new 对象时候首先调用的
		init : function(){
			var that = this;
			this.showWelcome();
			this.bindEvent();
			this.endShow();
			var monitor = new VehicleMonitor(vehicleMonitorConfigs);
			KCPT.VehicleMonitorObj = monitor;
		},
		//展示欢迎页面
		showWelcome : function(){},
		//展示全部
		endShow : function(){},
		//注册方法
		bindEvent : function(){},
		//显示
		onShow : function() {
			if(KCPT.VehicleMonitorObj)
				KCPT.VehicleMonitorObj.showOut();
		},
		// 隐藏
		onHide : function() {
			if(KCPT.VehicleMonitorObj)
				KCPT.VehicleMonitorObj.clearOut();
		}
		});

})(jQuery);