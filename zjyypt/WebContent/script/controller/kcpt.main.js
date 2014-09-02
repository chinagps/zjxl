/*******************************************************************************
 * home.jsp页面使用的js脚本控制文件
 * 
 ******************************************************************************/
(function($) {
	KCPT.main = KCPT.extend(KCPT.object, {
		constructor : function(config) {
			KCPT.applyIf(this, config);
			KCPT.main.superclass.constructor.apply(this, arguments);
			var center = getHeightAndWidth();
			if(!InterNetType().ie){
				this.height = center.height - 10;
			}else{
				this.height = center.height;
			}
			this.width = center.width;
			
			this.northSize = {};
			this.centerSize = {};
			this.oldCenterSize = {};
			this.foorSize = {};
			this.windowReSize();
			this.init();
			
		},
		/**
		 * 首页分为3个部分 
		 * 1 top 这里就是企业的log以及用户名 和tab页信息 是index页面的上面部分
		 * 2 bottom 这里是系统底部 只有一些企业信息和log
		 * 3 center 这里就是每个模块展示位置
		 */
		//获得center的宽度
		getWidth : function() {
			return this.width;
		},
		//获得整体的高度
		getHeight : function() {
			return this.height;
		},
		getCenterSize : function() {
			return {
				'width' : this.getWidth(),
				'height' : this.getHeight()-28//导航条高度为28
			};
		},
		/**
		 * 注册window
		 */	
		windowReSize : function(){
//			var obj = this;
//			$(window).resize(function(){
//				obj.onSize();
//			});
		},
		onSize : function() {
//			var center = getHeightAndWidth();
//			$("#pageNavigationDiv").width(center.width);
			//$("#frame_tabs_content").height(center.height-80);
//			return true;
//			var center = getHeightAndWidth();
//			if (this.width != center.width
//					|| this.height != center.height) {
//				this.oldCenterSize = {
//					'width' : this.getWidth(),
//					'height' : this.getHeight()
//				};
//				this.width = center.width;
//				if(!InterNetType().ie){
//					this.height = center.height - 10;
//				}else{
//					this.height = center.height;
//				}
//				var titleWidth = 0;
//				
//				$("#smoothmenu1").find("ul.sf-menu_ul").find("li.menuli").each(function(){
//					if(!$(this).hasClass("hiden")){
//						titleWidth += 124;
//					}
//					
//				});
//				var ww = (this.width + 270 - titleWidth) / 2;
//				if(ww < 0){
//					ww = 0;
//				}
//				$("#smoothmenu1").find("ul.sf-menu_ul").css({
////					"padding-left":ww+"px",
//					"float":"right"
//				});
//				
////				if(this.leftTree){
////					this.leftTree.onReSize();
////				}
//				$("#pageNavigationDiv")
//				
//				return true;
//			}
//			return false;
		},
		paddingLeft : function(){
			var obj = this;
			
			var titleWidth = 0;
			
			$("#smoothmenu1").find("ul.sf-menu_ul").find("li.menuli").each(function(){
				if(!$(this).hasClass("hiden")){
					titleWidth += 124;
				}
				
			});
			var ww = (obj.width + 270 - titleWidth) / 2;
			if(ww < 0){
				ww = 0;
			}
			$("#smoothmenu1").find("ul.sf-menu_ul").css({
//				"padding-left":ww+"px",
				"float":"right"
			});
		},
		//new 对象时候首先调用的
		init : function(){
			var obj = this;
			
			obj.initOperatorInfo();
			
			new ActionRecordsAnchor();
			
			getAlarmTypeDesc();
			

			
		},
		initOperatorFun : function() {// 初始化用户权限
			var Mainobj = this;
			if (typeof (KCPT.user.opId) != "undefined") {
				JAjax("homepage/findSpRoleFun.action", {}, "json", function(data) {
					var obj = data;
					if(!obj){
						window.location.href = KCPT.index_url;
						return;
					}
					// alert(obj[0].error.errorMessage);
					if (obj.error != null && obj.error != "") {
						if (obj.error[0].errorMessage != null
								&& obj.error[0].errorMessage != "") {
							$.ligerDialog.error(obj.error[0].errorMessage);
							window.location.href = KCPT.index_url;
						}
						return false;
					} else {
						KCPT.funlist = obj;
						return Mainobj.checkMenuFunctions(Mainobj);
					}
				}, null, true);
			}
			;

		},
		initOperatorInfo : function() {
			var Mainobj = this;
			JAjax("homepage/findOperatorfromMem.action", {}, "json",
					function(data) {
						var obj = eval(data);
						// alert(obj[0].error.errorMessage);
						if(!obj){
							window.location.href = KCPT.index_url;
							return;
						}
						if (obj.error != null && obj.error != "") {
							if (obj.error[0].errorMessage != null
									&& obj.error[0].errorMessage != "") {
								$.ligerDialog.error(obj.error[0].errorMessage);
								window.location.href = KCPT.index_url;
							}
						} else {
							KCPT.user = obj;
							
							Mainobj.initOperatorFun.call(Mainobj);
						}
					}, null, true);

		},
		checkMenuFunctions : function(){
			var obj = this;
			if(KCPT.funlist){
				//只能是一个一个开始弄吧 有别的好方法吗？？
				$("#smoothmenu1").find("li[fun]").each(function(){
					var funName = $(this).attr("fun");
					if(funName){
						 if(!checkFunction(funName)){
							$(this).remove();
						}
					}
				
				});
				obj.setTabs.call(obj);
			}else{
				return false;
			}
		},
		
		bindEvent : function(){
			$("#logout").click(function(){
				JAjax('exit.action',{},'html',function(x){
					if(x=="true"||x==true){
						 window.location.href="login.html";
					}else{
						 window.location.href="login.html";
					}
				});	
			});
//			var as = $("#menu").find("li.menuli");
//			as.click(function(){
//				if ($(this).find("a.menu_a").hasClass("menu_a_visited"))
//					return false;
//				else
//				{
//					as.each(function()
//					{
//						$(this).find("a.menu_a").removeClass("menu_a_visited");
//					});
//					$(this).find("a.menu_a").addClass("menu_a_visited");
//				}
//			});
//			$("#menu").find("a.submenu_a").mouseover(function(){
//				var parentNode = $(this).parents("li.menuli").find("a.menu_a");
//				parentNode.addClass("menu_a_visited");
//			}).mouseout(function(){
//				var parentNode = $(this).parents("li.menuli").find("a.menu_a");
//				parentNode.removeClass("menu_a_visited");
//			}).click(function(){
//				var parentNode = $(this).parents("li.menuli").find("a.menu_a");
//				if(parentNode.hasClass("menu_a_visited"))
//					return false;
//				else{
//					as.each(function()
//					{
//						$(this).find("a.menu_a").removeClass("menu_a_visited");
//					});
//					$(this).find("a.menu_a").addClass("menu_a_visited");
//				}
//			});
		},
		//获得用户登陆信息
//		getLoginInfo : function(f){
//			var obj = this;
//			  JAjax('getloginInfo.action', {}, 'xml', function(x){
//			        // 解释xml
//			        var user = {};
//			        if($(x).find("exception").length > 0){
//			        	$(x).find("exception").each(function(){
//			        		alert($(this).text());
//			        	});
//			        	return;
//			        }
//			        $(x).find("cell").each(function(){
//			        	if($(this).attr("name")=="opLogname"){
//			        		user["oplogname"] = $(this).text();
//			        	}
//			        	if($(this).attr("name")=="spId"){
//			        		user["spid"] = $(this).text();
//			        	}
//			        	if($(this).attr("name")=="roleName"){
//			        		user["rolename"] = $(this).text();
//			        	}
//			        	if($(this).attr("name")=="roleId"){
//			        		user["roleid"] = $(this).text();
//			        	}
//			        	if($(this).attr("name")=="opType"){
//			        		user["optype"] = $(this).text();
//			        	}
//			        	if($(this).attr("name")=="opId"){
//			        		user["opid"] = $(this).text();
//			        	}
//			        	if($(this).attr("name")=="opPass"){
//			        		user["oppass"] = $(this).text();
//			        	}
//			        	if($(this).attr("name")=="opName"){
//			        		user["opname"] = $(this).text();
//			        	}
//			        	if($(this).attr("name")=="opSex"){
//			        		user["opsex"] = $(this).text();
//			        	}
//			        	if($(this).attr("name")=="opPos"){
//			        		user["oppos"] = $(this).text();
//			        	}
//			        	if($(this).attr("name")=="opWorkid"){
//			        		user["opworkid"] = $(this).text();
//			        	}
//			        	if($(this).attr("name")=="opIdentityId"){
//			        		user["opidentityid"] = $(this).text();
//			        	}
//			        	if($(this).attr("name")=="opPhone"){
//			        		user["opphone"] = $(this).text();
//			        	}
//			        	
//			        	if($(this).attr("name")=="opMobile"){
//			        		user["opmobile"] = $(this).text();
//			        	}
//			        	
//			        	if($(this).attr("name")=="opAddress"){
//			        		user["opaddress"] = $(this).text();
//			        	}
//			        	if($(this).attr("name")=="opStartutc"){
//			        		user["opstartutc"] = $(this).text();
//			        	}
//			        	if($(this).attr("name")=="opSuper"){
//			        		user["opsuper"] = $(this).text();
//			        	}
//			        	if($(this).attr("name")=="opStatus"){
//			        		user["opstatus"] = $(this).text();
//			        	}
//			        	if($(this).attr("name")=="opMem"){
//			        		user["opmem"] = $(this).text();
//			        	}
//			        	if($(this).attr("name")=="opReceiver"){
//			        		user["opreceiver"] = $(this).text();
//			        	}
//			        	
//			        	if($(this).attr("name")=="trackpointColor"){
//			        		user["trackpointcolor"] = $(this).text();
//			        	}
//			        	if($(this).attr("name")=="tracklineWeight"){
//			        		user["tracklineweight"] = $(this).text();
//			        	}
//			        	if($(this).attr("name")=="tracklineColor"){
//			        		user["tracklinecolor"] = $(this).text();
//			        	}
//			        	if($(this).attr("name")=="realpointNamepos"){
//			        		user["realpointnamepos"] = $(this).text();
//			        	}
//			        	if($(this).attr("name")=="realpointNormalicon"){
//			        		user["realpointnormalicon"] = $(this).text();
//			        	}
//			        	
//			        	if($(this).attr("name")=="realpointAlarmicon"){
//			        		user["realpointalarmicon"] = $(this).text();
//			        	}
//			        	if($(this).attr("name")=="defaultViewId"){
//			        		user["defaultviewid"] = $(this).text();
//			        	}
//			        	if($(this).attr("name")=="basetype"){
//			        		user["basetype"] = $(this).text();
//			        	}
//			        	
//			        });
//			        KCPT["user"] = user;
//			        $("#userNameMain").html(KCPT.user.opname);
//			        if(f){
//						  try{
//							  f.call(obj,x);
//						  }catch(e){
//							  
//						  }
//					  }
//			    });
//			  
//			
//		},
        //获得下拉列表数据
//        getSelectData : function(){
//        	var obj = this;
//			initSelectList(obj.setUserName);        	
//        }, 
//		//用户名放入首页中的用户信息里
//		setUserName : function(){
//			
//		},
		//展示第一个页面
		firstPage : function(){
			
//			this.index_page = 0;
//			var page;
//			var is = false;
//			$("#mainNav").find("li").each(function()
//			{
//				if (!is)
//				{
//					page = $("#mainNav").find("li").index(this);
//					is = true;
//				}
//			});
			$("#smoothmenu1").find("li.menuli").eq(0).trigger("click");
		},
		onResize : function(){
			var that = this;
			var center = getHeightAndWidth();
			that.content.height(center.height);
			that.content.width(center.width-4);
		},
		
		/**
		 * 首页上tab签进行操作方法
		 * 
		 */
		
		setTabs : function()
		{
			//获取所有配置了url属性的子菜单
			var menus = $("div#smoothmenu1").find("li[url]");
			var pageNavigationSpan = $("span#pageNavigationSpan");
			var pageNavigationDiv = $("div#pageNavigationDiv");
			var contont = $("div#mainContontDiv");
			var first = $("div#firstDiv");
			KCPT.body = $("#fullbody");
			this.content = $("#frame_tabs_content");
			var firstload = true;
			var monitor = $("div#monitorDiv");
			var monitorload = true;
			var showObj = null;
			var showMenu = null;
			var that = this;
			menus.each(function(){
				$(this).click(function(){
					var obj = $(this);
					//判断点击的是否是当前显示的菜单 如果是不执行后续代码
					if(null!=showMenu&&obj.attr("url")==showMenu.attr("url") && obj.attr("fun")==showMenu.attr("fun")){
						return;
					}
					//赋值当前显示的菜单对象
					showMenu = obj;
					//隐藏当前显示的div和左侧树
					if(null!=showObj){
						if(KCPT.root.leftTree&&KCPT.root.leftTree != undefined) {
							KCPT.root.leftTree.bodyhide();
						}
						$("#frame_tabs_content").hide();
						showObj.hide();
					}
					//隐藏导航条
					pageNavigationDiv.hide();
					//关闭监控页面的timer
					if(KCPT.monitorC){
						KCPT.monitorC.onHide();
					}
					//如果用户点击的是主页
					if(obj.attr("id")=="firstDivli"){
						//如果主页是第一次加载
						if(firstload){
							first.load(obj.attr("url"),function(){
								
							});
							firstload = false;
						}
						//显示主页
						first.show();
						//赋值当前显示对象
						showObj = first;
					}else if(obj.attr("id")=="monitorDivli"){//如果用户点击的是监控页面
						//显示监控页面
						monitor.show();
						//如果监控页面是第一次加载
						if(monitorload){
							monitor.load(obj.attr("url"),function(){
								
							});
							monitorload = false;
						}else{
							//打开监控页面的timer
							if(KCPT.monitorC){
								KCPT.monitorC.onShow();
							}
						}
						//赋值当前显示对象
						showObj = monitor;
					}else{
						//删除全局左侧树引用对象
						KCPT.root.triggerShowObj = null;
						//清除div的内容
						contont.empty();
						//获取页面左侧树显示属性
						var treePrams = obj.attr("lefttree");
						//如果配置了就显示左侧树
						if(treePrams){
							//如果左侧树初始化过直接显示左侧树
							$("#homeLeftDiv").show();
						}
						//如果用户点击的是其它功能页面
						contont.load(obj.attr("url"),function(){
							var leftBtn=$("#leftRefreshBtn");
							if(leftBtn.attr('disabled')){
								leftBtn.removeAttr('disabled');
							}
						});
						$("#frame_tabs_content").show();
						//显示功能页
						contont.show();
						//重绘页面大小
						that.onResize(treePrams);
						
						//如果配置了就显示左侧树
						if(treePrams){
							//把配置的字符串转换为json对象
							treePrams = eval('('+treePrams+')');
							//判断左侧树是否初始化过
							if(KCPT.root.leftTree){
								//通过home页面配置的属性来显示左侧树中的tab和grid
								KCPT.root.leftTree.showTree(treePrams);
								//然后刷新左侧树的组织数据
								KCPT.root.leftTree.showLoadedTree(); //不刷新直接显示树 modified by fenglong at 20130110 
								//指令控制服务模块加入了两个全局引用对象
								KCPT.root.leftTree.checkRowShowObj = null;
								KCPT.root.leftTree.checkAllRowShowObj = null;
							}else{
								//如果左侧树为第一次加载，设定为异步加载
								//通过home页面配置的属性来初始左侧树显示
								KCPT.root.leftTree = new ctfoTree(treePrams);
							}
						}
						//显示导航条
						pageNavigationDiv.show();
						//获取当前父节点名称
						var firstName = obj.parent().parent().find("label").eq(0).text();
						//获取当前节点名称
						var secondName = "<font color='#0070ff'>"+obj.find("label").text()+"</font>";
						//给导航条赋值
						if(obj.attr("value")=="3"){
							//如果是三级菜单，获取最外层节点
							var parentName = obj.parent().parent().parent().parent().find("label").eq(0).text();
							pageNavigationSpan.html("当前位置: -> "+parentName+" -> "+firstName+" -> "+secondName);
						}else{
							pageNavigationSpan.html("当前位置: -> "+firstName+" -> "+secondName);
						}
						//赋值当前显示对象
						showObj = contont;
					}
				});
			});
//			var obj = this;
			
//			var f_c = $("div#CenterMaskDiv").find("li.menuli");
//			var c_c = $("#frame_tabs_content").children();
//			var o = this;
//			this.isLoading = false;
//			this.curShowObject = null;
//			this.curPanel = null;
//			f_c.each(function()
//			{
//			
//				$(this).click(function(t,a,secondName,f)
//				{						
//					if($(this).attr("id")!="firstDiv"&&$(this).attr("id")!="monitorDiv"&&$(this).attr("id")!="reportDiv"&&!secondName){
//
//						return;
//					}
////					if($(this).attr("id")!="firstDiv"&&$(this).attr("id")!="monitorDiv"&&$(this).attr("id")!="reportDiv"&&obj.leftTree){
////						obj.leftTree.bodyhide();
////					}
//					var obc = this;
//					var cur=null;
//					for ( var w = 0; w < c_c.length; w++)
//					{	
//						if ($(c_c[w]).attr("id") == $(obc).attr("id"))
//						{
//							cur = $(c_c[w]);
//							break;
//						}
//					}
//					//隐藏当前位置
//					var index=$(this).index();
//
//					if(cur.attr("id")=="firstDiv"){
//						$("#sysMore").hide();
//							
//						$("#contentMain").show();
//					}
//					
////					if(obj.leftTree){
////						obj.leftTree.hide();
////					}
//					
//					if($(obc).attr("id")=="firstDiv"||$(obc).attr("id")=="monitorDiv"){
//						$("#mainWorkArea").find("div.pageNavigation").hide();
//					}else{
//						$("#mainWorkArea").find("div.pageNavigation").show();
//					}
//					
//					//设置背景样式变化
//					f_c.find("a.menu_a_visited").each(function(){
//						$(this).removeClass("menu_a_visited");
//					});
//					$(this).find("a.menu_a").addClass("menu_a_visited");
//					
//					var firstName = $(this).find("a").first().text();
//
//					
//					var ch= o.findChildById(cur[0].id);
//					if (o.curPanel && cur)
//					{// check if o and cur exists
//						try
//						{
//							if (cur[0].id == o.curPanel[0].id)
//								{
//								
//									if(ch.showObj){
//										if(ch.getChildListChildByName(secondName)&&ch.showObj == ch.getChildListChildByName(secondName)){
//											return false;
//										}else{
//											f.call(this);
//											obj.changePosition(firstName, secondName);
//											return false;
//										}
//									}else{
//										f.call(this);
//										obj.changePosition(firstName, secondName);
//										return false;
//									}
//									
//							}
//						} catch (Exception)
//						{
//							return;
//						}
//					}
//					if(!$(cur).attr("u_path")&&!a){
//						return;
//					}
//					
//					function callOut()
//					{	
//						if (o.curShowObject)
//						{	
//							o.curShowObject.onHide();
//							if (ch)//如果点击的页面已经加载过则
//							{
//								cur.fadeIn("fast");
//								ch.onShow();
//								obj.changePosition(firstName, secondName,cur);
//								
//								if(ch.showObj){
//									if(ch.getChildListChildByName(secondName)&&ch.showObj == ch.getChildListChildByName(secondName)){
//										ch.showObj.show.call(ch.showObj);
//										return false;
//									}else if(f){
//										f.call(this);
////										obj.changePosition(firstName, secondName);
//										return false;
//									}
//								}
//								o.curShowObject = ch;
//								
//							} else //如果还没有加载过则
//							{
////								var ob = o;
//								if(!cur.attr("u_path")&&!a){
//									return;
//								}else if(a){
//									cur.attr("u_path",a);
//								}
//
//								obj.changePosition(firstName, secondName,cur);
//
//								cur.show();
//								cur.load(cur.attr("u_path"),function(){
////									cur.append(r);
//									if(f){
//										f.call(this);
//									}
//								});
////								JAjax(cur.attr("u_path"), null, "html", function(r, o1)
////								{
////									cur.show();
////									cur.append(r);
////									
////									if(f){
////										f.call(this);
////									}
////								});
//							}
//						} else
//						{
////							var ob = o;
//							// alert(cur.attr("u_path"))
//							if(!cur.attr("u_path")&&!a){
//								return;
//							}else if(a){
//								cur.attr("u_path",a);
//							}
//							
//							obj.changePosition(firstName, secondName,cur);
//							
//							cur.show();
//							cur.load(cur.attr("u_path"),function(){
////								cur.append(r);
//								if(f){
//									f.call(this);
//								}
//							});
////							JAjax(cur.attr("u_path"), null, "html", function(r, o1)
////							{
////								
////								cur.show();
////								cur.append(r);
////								
////								if(f){
////									f.call(this);
////								}
////							});
//						}
//						
//						
//					};
//					if (o.curPanel){
//						o.curPanel.hide();
//						callOut();
//					}else{
//						callOut();
//					}
//					o.curPanel = cur;
//					
//					
////				}).find("a.submenu_a").mouseover(function(){
////					var parentNode = $(this).parents("li.menuli").find("a.menu_a");
////					parentNode.addClass("menu_a_visited");
////				}).mouseout(function(){
////					var parentNode = $(this).parents("li.menuli").find("a.menu_a");
////					for ( var w = 0; w < c_c.length; w++)
////					{	
////						if ($(c_c[w]).attr("id") == $(this).parents("li.menuli").attr("id"))
////						{
////							cur = $(c_c[w]);
////							break;
////						}
////					}
////					if(cur[0].id != $(this).parents("li.menuli").attr("id"))
////						parentNode.removeClass("menu_a_visited");
//				});
//			});
			
			this.bindEvent();
			
//			obj.bindSafeManager();
//			
//			obj.bindPowerManager();
//			
//			obj.bindOillManager();
//			
//			obj.bindRunManager();
//			
//			obj.bindOperatorManager();
//			
//			obj.bindMotorcadeManager();
//			
//			obj.bindSystemManager();
			
			this.paddingLeft();
			
			this.firstPage();
			
			return this;
		},
//		setNavMenuColor:function(obj,secondName){
//			var parentName=$(obj).parent().parent().find("label:eq(0)").text();
//			var rs=parentName+"->"+"<font color='#0070ff'>"+secondName+"</font>";
//			return rs;
//		},
//		bindSafeManager:function(){
//			$("li#safeDiv").find("li").each(function(){
//				$(this).click(function(){
//					var thisurl = $(this).attr("url");
//					if(!thisurl){
//						return;
//					}
//					var secondName = $(this).find("a").text();
//					var val=$(this).attr("value");
//					if(null!=val){
//						if(3==val){
//							var parentName=$(this).parent().parent().find("label:eq(0)").text();
//							secondName=parentName+"->"+"<font color='#0070ff'>"+secondName+"</font>";
//						}
//					}
//					var fun = function(){
//						$("#safeManagerContent").empty();
//						$("#safeManagerContent").load(thisurl);
//					};
//					$("div#CenterMaskDiv").find("li#safeDiv").trigger("click",["safeDiv.jsp",secondName,fun]);
//				});
//			});
//		},
//		bindOillManager:function(){
//			$("li#orgainDiv").find("li.submenu").each(function(){
//				$(this).click(function(){
//					var thisurl = $(this).attr("url");
//					if(!thisurl){
//						return;
//					}
//					var secondName = $(this).find("a").text();
//					var val=$(this).attr("value");
//					if(null!=val){
//						if(3==val){
//							var parentName=$(this).parent().parent().find("label:eq(0)").text();
//							secondName=parentName+"->"+"<font color='#0070ff'>"+secondName+"</font>";
//						}
//					}
//					var fun = function(){
//						$("#oillManagerContent").empty();
//						$("#oillManagerContent").load(thisurl);
//					};
//					$("div#CenterMaskDiv").find("li#orgainDiv").trigger("click",["orgainDiv.jsp",secondName,fun]);
//				});
//			});
//		},
//		bindPowerManager:function(){
//			$("li#powerDiv").find("li").each(function(){
//				$(this).click(function(){
//					var thisurl = $(this).attr("url");
//					if(!thisurl){
//						return;
//					}
//					var secondName = $(this).find("a").text();
//					var val=$(this).attr("value");
//					if(null!=val){
//						if(3==val){
//							var parentName=$(this).parent().parent().find("label:eq(0)").text();
//							secondName=parentName+"->"+"<font color='#0070ff'>"+secondName+"</font>";
//						}
//					}
//					var fun = function(){
//						$("#powerManagerContent").empty();
//						$("#powerManagerContent").load(thisurl);
//					};
//					$("div#CenterMaskDiv").find("li#powerDiv").trigger("click",["powerManager.jsp",secondName,fun]);
//				});
//			});
//		},
//		bindRunManager:function(){
//			$("li#systemDiv").find("li").each(function(){
//				$(this).click(function(){
//					var thisurl = $(this).attr("url");
//					if(!thisurl){
//						return;
//					}
//					var secondName = $(this).find("a").text();
//					var val=$(this).attr("value");
//					if(null!=val){
//						if(3==val){
//							var parentName=$(this).parent().parent().find("label:eq(0)").text();
//							secondName=parentName+"->"+"<font color='#0070ff'>"+secondName+"</font>";
//						}
//					}
//					var fun = function(){
//						$("#runManagerContent").empty();
//						$("#runManagerContent").load(thisurl);
//					};
//					$("div#CenterMaskDiv").find("li#systemDiv").trigger("click",["systemDiv.jsp",secondName,fun]);
//				});
//			});
//		},
//		bindMotorcadeManager:function(){
//			$("li#motorcadeDiv").find("li[fun]").each(function(){
//				$(this).click(function(){
//					var thisurl = $(this).attr("url");
//					if(!thisurl){
//						return;
//					}
//					var secondName = $(this).find("a").text();
//					var val=$(this).attr("value");
//					if(null!=val){
//						if(3==val){
//							var parentName=$(this).parent().parent().find("label:eq(0)").text();
//							secondName=parentName+"->"+"<font color='#0070ff'>"+secondName+"</font>";
//						}
//					}
//					var fun = function(){
//						$("#motorcadeManagerContent").empty();
//						$("#motorcadeManagerContent").load(thisurl);
//					};
//					$("div#smoothmenu1").find("li#motorcadeDiv").trigger("click",["motorcadeDiv.jsp",secondName,fun]);
//				});
//			});
//		},
//		bindOperatorManager:function(){
//			$("li#operatorDiv").find("li").each(function(){
//				$(this).click(function(){
//					var thisurl = $(this).attr("url");
//					if(!thisurl){
//						return;
//					}
//					var secondName = $(this).find("a").text();
//					var val=$(this).attr("value");
//					if(null!=val){
//						if(3==val){
//							var parentName=$(this).parent().parent().find("label:eq(0)").text();
//							secondName=parentName+"->"+"<font color='#0070ff'>"+secondName+"</font>";
//						}
//					}
//					var fun = function(){
//						$("#operatorManagerContent").empty();
//						$("#operatorManagerContent").load(thisurl);
//					};
//					$("div#smoothmenu1").find("li#operatorDiv").trigger("click",["operatorDiv.jsp",secondName,fun]);
//				});
//			});
//		},
//		bindSystemManager:function(){
//			$("li#systemManagerDiv").find("li").each(function(){
//				$(this).click(function(){
//					var thisurl = $(this).attr("url");
//					if(!thisurl){
//						return;
//					}
//					var secondName = $(this).find("a").text();
//					var val=$(this).attr("value");
//					if(null!=val){
//						if(3==val){
//							var parentName=$(this).parent().parent().find("label:eq(0)").text();
//							secondName=parentName+"->"+"<font color='#0070ff'>"+secondName+"</font>";
//						}
//					}
//					var fun = function(){
//						$("#systemManagerContent").empty();
//						$("#systemManagerContent").load(thisurl);
//					};
//					$("div#CenterMaskDiv").find("li#systemManagerDiv").trigger("click",["systemManagerDiv.jsp",secondName,fun]);
//				});
//			});
//		},
//	changePosition : function(firstName,secondName,cur)	{
//		//var obj = this;
//		
//		var span=$("#mainWorkArea").find("div.pageNavigation").find("span");
//		if(secondName){
//			if(secondName.indexOf('->')<1){
//					secondName="<font color='#0070ff'>"+secondName+"</font>";
//			}
//		}
//		if(KCPT.root.leftTree&&KCPT.root.leftTree != undefined) {
////			if(cur&&cur.attr("id")!="firstDiv"&&cur.attr("id")!="monitorDiv"&&cur.attr("id")!="reportDiv"){
////				KCPT.root.leftTree.hide();
////			}else{
//				KCPT.root.leftTree.bodyhide();
////			}
//		}
//		if(firstName&&secondName){
//			span.html("当前位置: -> "+firstName+" -> "+secondName);
//		}else if(firstName&&!secondName){
//			span.html("当前位置：-> "+firstName);
//		}else if(!firstName&&secondName){
//			var htmls = span.text().split("->");
//			firstName = htmls[1];
//			span.html("当前位置：-> "+firstName+" ->"+secondName);
//		}
//		
//	},
	//显示
	onShow : function() {	
		
	},
	// 隐藏
	onHide : function() {
	}
	});

})(jQuery);
$(document).ready(function() {
	KCPT.root = new KCPT.main({
		id : "0",
		name : "总体框架",
		ready : {
			data : "load....",
			cbfun : function(t, data) {
			}
		}
	});
});