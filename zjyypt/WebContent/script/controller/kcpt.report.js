/*******************************************************************************
 * 车辆监控页面使用的js脚本控制文件
 * 
 * 
 ******************************************************************************/
(function($) {
	KCPT.report = KCPT.extend(KCPT.object, {
		constructor : function(config) {
			KCPT.applyIf(this, config);
			KCPT.report.superclass.constructor.apply(this, arguments);
			this.onShow();
			this.init();
		},
		/**
		 * 重写设置大小方法
		 */
		/**
		 * 重写设置大小方法
		 */
		onReSize : function() {			
			var height = KCPT.root.getCenterSize().height;
			var width = KCPT.root.getCenterSize().width;
			$("#reportContent").width(width + 270 - 8);
			$("div#reportContent").height(height - 8);
			if(this.childrenList.length > 0){
				for(var i = 0; i < this.childrenList.length; i++){
					this.childrenList[i].onResize();
				}
			}			
		},
		//new 对象时候首先调用的
		init : function(){
			
		},
		showTitle:function(){
			$("#mainWorkArea").find("div.allbread").find("div.bread").show("show");
		},
		//展示欢迎页面
		showWelcome : function(){},
		//展示全部
		endShow : function(){},
		//注册方法
		bindEvent : function(){},
		//显示
		onShow : function() {
			
		},
		// 隐藏
		onHide : function() {}
			
		});

})(jQuery);