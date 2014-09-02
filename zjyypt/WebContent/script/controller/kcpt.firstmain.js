/*******************************************************************************
 * 基础信息页面使用的js脚本控制文件
 * 
 * 
 ******************************************************************************/
(function($) {
	KCPT.firstmian = KCPT.extend(KCPT.object, {
		constructor : function(config) {
			KCPT.applyIf(this, config);
			KCPT.firstmian.superclass.constructor.apply(this, arguments);
			
			this.init();
			
			this.showObj;
		},
		/**
		 * 重写设置大小方法
		 */
		onReSize : function() {
			var height = KCPT.root.getCenterSize().height - 10;
			var width = KCPT.root.getCenterSize().width;
//			var isLeftTreeShow = $("#homeLeftDiv").css("display") != "none";
//			width = isLeftTreeShow ? width - 274 : width;
//			$("#runManagerContent").height(height);
//			
//			$("#content_railManager").css({
//				height:height+"px"
////				width:width+"px"
//			});
			var w = 8;
			$("#mainContontDiv").css({
				height:height+"px"
//				width:(width-w)+"px"
			});
//			$("#systemManagerContent").css({
//				height:height+"px"
////				width:(width-w)+"px"
//			});
//			$("#operatorManagerContent").css({
//				height:height+"px"
////				width:(width-w)+"px"
//			});
//			
//			$("#powerManagerContent").css({
//				height:height+"px"
////				width:(width-w)+"px"
//			});
//			
//			$("#oillManagerContent").css({
//				height:height+"px"
////				width:(width-w)+"px"
//			});
//			
//			$("#safeManagerContent").css({
//				height:height+"px"
////				width:(width-w+10)+"px"
//			});
			
			if(this.childrenList.length > 0){
				for(var i= 0; i < this.childrenList.length;i++ ){
					this.childrenList[i].onResize();
				}
			}
			
		},
		//new 对象时候首先调用的
		init : function(){
			this.showWelcome();
			
			this.bindEvent();
			
			this.endShow();
			
			this.showTitle();
			
		},
		
		
		//展示欢迎页面
		showWelcome : function(){},
		//展示全部
		endShow : function(){},
		//注册方法
		bindEvent : function(){},
		//显示
		onShow : function() {
			this.hideGunD();
			this.showTitle();
		},
		showTitle:function(){
			$("#mainWorkArea").find("div.allbread").find("div.bread").show("show");
		},
		hideGunD : function(){
			$('body').attr("style","overflow:hidden");
		},
		// 隐藏
		onHide : function() {
			
		}
		});

})(jQuery);