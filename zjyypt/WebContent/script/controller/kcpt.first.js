/*******************************************************************************
 * 基础信息页面使用的js脚本控制文件
 * 
 * 
 ******************************************************************************/
(function($) {
	KCPT.first = KCPT.extend(KCPT.object, {
		constructor : function(config) {
			KCPT.applyIf(this, config);
			KCPT.first.superclass.constructor.apply(this, arguments);
			this.init();
			this.showObj;
		},
		/**
		 * 重写设置大小方法
		 */
		onReSize : function() {
			var center = getHeightAndWidth();
			var w = center.width + KCPT.leftTreeWidth;
			var menu = $("#smoothmenu1");
			var menus = $("#smoothmenu1").find("li.menuli");
			if (w > 1024 && w < 1281){
				menu.css("padding-right","20px");
				menus.css("padding-right","2px");
			}else if(w > 1280 && w < 1367){
				menu.css("padding-right","30px");
				menus.css("padding-right","3px");
			}else if(w > 1366 && w < 1441){
				menu.css("padding-right","60px");
				menus.css("padding-right","3px");
			}else if(w > 1440 && w < 1681){
				menu.css("padding-right","60px");
				menus.css("padding-right","9px");
			}else if(w > 1680){
				menu.css("padding-right","60px");
				menus.css("padding-right","15px");
			}else{//1024
				menu.css("padding-right","15px");
				menus.css("padding-right","0px");
			}
			$("#header").height(center.height + KCPT.headerHeight);
			$("#header").width(center.width + KCPT.leftTreeWidth);
			$("#firstDiv").height(center.height - 5);
			$("#monitorDiv").height(center.height - 5);
			$("#frame_tabs_content").height(center.height);
			$("#frame_tabs_content").width(center.width-4);
			$("#footer").width(center.width + KCPT.leftTreeWidth);
			$("#homeLeftDiv").height(center.height-2);
			if(KCPT.root.leftTree){
				KCPT.root.leftTree.onReSize();
			}
			if(KCPT.onresizeObj){
				KCPT.onresizeObj.onResize();
			}
		},
		//new 对象时候首先调用的
		init : function(){
			buildAlarmVoice();
//			$notifyContainer = $("#notify").notify();
			this.showWelcome();
			
			this.bindEvent();
			
			this.leftObject();
			
			this.endShow();
			
			this.hideTitle();
			
			var that = this;
			$(window).resize(function(){
				that.onReSize();
			});
			$("#footer").show();
			$("#fullbody").load(function(){
				KCPT.firstRefresh = false;
			});
//			this.startTimer();
		},
//		startTimer : function() {
//			var o = this;
//			$("#notify").everyTime('10s',
//					'realTimeK', function() {
//						o.getAlarmMessage(o);
//					}, 0, true);
//
//		},
//		getAlarmMessage:function(o){
//			var  obj = o;
//			var da = {};
//			if(!obj.timeUtc){
//				var now = dateFormat(new Date(), "yyyy-MM-dd hh:mm:ss");
//				var promtStartTime = date2utcsA(now) - 1800;
//				da["requestParam.equal.timeStamp"] = promtStartTime;//只弹出当前时间半小时前得报警
//			}else{
//				da["requestParam.equal.timeStamp"] = obj.timeUtc;
//			}
//			
//			JAjax("operationmanagement/getAlarmRealTime.action",
//					da, "json",function(x){
//				//成功调用返回后解析数据
//					x = eval(x);
//					if(x){
//						if(x.Rows&&x.Rows.length > 0){
//							var data = x.Rows;
//							showComandMsg(data);
//							var datai = x.Rows[x.Rows.length - 1];
//							if(datai&&datai.alarmTime){
//								obj.timeUtc = datai.alarmTime;
//							}
//							playVoice();
//						}
//					}
//			});
//		},
		leftObject : function(){
			var obj = this;
			
//			var param = {
//				 	mainContainer: "#homeLeftDiv"
//				 		
//				  };
//			KCPT.root.leftTree = new  ctfoTree(param);
			
		},
		hideTitle : function(){
			$("#header").find("div.allbread").find("div.bread").hide();
		},
		shwoGunD : function(){
			$('body').attr("style","overflow:auto");
		},
		//展示欢迎页面
		showWelcome : function(){},
		//展示全部
		endShow : function(){},
		//注册方法
		bindEvent : function(){
			$("#contentMain").find(".micon").find("tr").each(function(){
				$(this).find("a").each(function(i){
					if(i < 3){
						$(this).click(function(){
							$("#smoothmenu1").find("li#monitorDiv").trigger("click");
						});
					}else if(i==3){
						$(this).click(function(){
							$("#smoothmenu1").find("#systemDiv").find("ul").find("li.submenu").eq(9).trigger("click");
						});
					}else if(i==4){
						$(this).click(function(){
							$("#smoothmenu1").find("li#systemDiv").find("li.submenu").eq(11).trigger("click");
						});
					}
				});
			});
			
		},
		//显示
		onShow : function() {
			var obj = this;
			obj.showObj.show();
		},
		// 隐藏
		onHide : function() {
			var obj = this;
			obj.showObj.endTimer();
		}
		});

})(jQuery);