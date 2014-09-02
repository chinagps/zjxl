var monitorTree = function(o) {
	this.version = "edit by fanxuean in 2012.07.30";
	this.options = {
		mainContainer : '#monitorTree', // 包含此对象的div的id
		id : 'monitorTree',// 用来唯一标识此对象防止以为id相同导致紊乱
		monitorObj : null,// 因为是在监控页面中使用的 难免要和监控业务打交道 比如地图的使用 以及其他的, 这样就最好保存monitor对象
		tabId : 'monitorTreeLeft', // tab签的id 因为结构为ul--》li格式 用来查找里面的li元素
		tab : 'li', // tab 签结构 用来切换标签
		tabUseClass : 'monitor_left_menu_pic', // 选中标签后使用的样式,
		tabNotUseClass : 'monitor_left_menu_pic_1',// 未选中标签的样式
		tabContentClass : 'monitor_left_tree_content',// 标签相应的div容器的Class，在切换过程中查找出来 用来显示和隐藏
		tabContentId : 'monitor_left_tree_content', // 标签相应的div容器的父类 用来查找里面的标签内容

		firstTabId : 'monitorTreeeFirst', // 组织结构树的容器id
		firstTabUrl : 'baseinfo/structureOrgMonitor!asynchronousTree.action', // 组织结构树使用的url, 异步树
		firstTabRefreshUrl : 'baseinfo/structureOrgMonitor!asynchronousTree.action',// 第一颗树的刷新, 异步树
		firstRefleshButton : 'left_menu_main_refresh_first',// 组织结构树使用的刷新按钮的id
		firstUnCheckButton : 'left_menu_main_unCheck_first',// 组织结构树使用的解除选中状态的按钮id
		firstSearchType : 'firstSearchType',// 第一次给我页面的时候有按照不同类型 如：车牌号码 SIM卡 等查询, 所以要进行绑定不同的参数用来查询 现在只有一种就是车牌号码, 还没修改
		firstSearchInput : 'firstSearchInput',// 通过不同的查询条件的输入框
		firstSearchButton : 'firstSearchButton',// 通过不同的查询条件的查询按钮
		firstSeachUrl : 'baseinfo/structureOrgMonitor!synchronizedTree.action',// 刷新树使用的方法, 要记录打开多少节点

		secondTabId : 'monitorTreeSecond',// 我的关注树的容器id
		secondTabUrl : 'tbAreaManager/operatorVehicle!findByParam.action',// 我的关注树的容器url
		secondRefleshButton : 'left_menu_main_refresh_second',// 我的关注树的 刷新按钮
		secondUnCheckButton : 'left_menu_main_unCheck_second',// 我的关注树的 清除选中
		addInterestAction : 'tbAreaManager/operatorVehicle!add.action',// 添加我的关注acton
		removeInterestAction : 'tbAreaManager/operatorVehicle!remove.action',// 删除我的关注
		// action

		gridId : 'left_menu_main_search_result',// 第三个签使用的grid容器ID
		gridUrl : 'operationmanagement/findVehicleForThreeTab.action', // grid使用的action
		searchForm : 'monitor_left_tree_form', // 第三个签使用的查询form
		gridUnCheckButton : ''

	};
	this.loadHtml = "script/monitorTree/html/Vehicle_Monitoring_left_tree.html";
	this.mainContainer = "";
	
	this.treeLoadStatus = false; //左侧树是否在加载完成
	
	this.status = "hide";
	this.scope = this;
	this.showTab = true;
	this.tempKey;// 保存每次点击节点打开的id {tempKey:[data 是点击展开后的节点id]}
	this.openEntData = {};// 用来保存已经load的企业
	this.loadStatus = false;// 用来标识 是展开 还是 刷新动作,false:展开,true:刷新
	
	this.checkedVehicle = [];// 第一个标签中用来缓存选中车辆
	this.interestMarker = [];// 第二个标签中用来缓存选中车辆 ,我的关注里
	this.searchVehicle = [];// 第三个标签中用来缓存选中车辆
	this.haveInterestMarker = [];// 缓存 一份给我的关注车辆的数据 是车辆id

	this.checkedVehicleName = [];// 第一个标签中用来缓存选中车辆的车牌号
	this.interestMarkerName = [];// 第二个标签中用来缓存选中车辆的车牌号
	this.searchVehicleName = [];// 第三个标签中用来缓存选中车辆的车牌号

	this.checkedNodeCache = []; // 记忆勾选节点
	
//	this.getcheckedVehicle = [];// 每一次勾选 刷新一次 待优化
	this.getinterestMarker = {};

//	this.getgroupcheckedVehicle = {};

	this.entLeavesTmpCache = [];// 小于200车企业全勾选车辆id缓存
	// this.entLeavesTmpCacheCount = 0;//小于200车企业全勾选车辆数

	this.entVehicleCache = {}; // 勾选企业查询该企业下车辆的缓存

	this.firstTreeClickTimer = null; // 关注/取消关注动作延时
	this.secondTreeClickTimer = null;
	
	this.init(o);
};
monitorTree.prototype = {
	init : function(o) {
		this.options = $.extend( {}, this.options, o || {});
		this.loading();
	},
	loading : function() {
		var that = this;
		that.mainContainer = $(this.options.mainContainer);
		that.mainContainer.load(that.loadHtml, null, function() {
				that.setTabs();// tab签 要进行tab签的切换
				that.loadSecondTreeData(true);// 加载重点关注树数据,true:第一次加载,false:第n次加载
				that.setTree();// 加载组织结构树
				that.bindReflash();// 绑定刷新全部按钮
				that.bindAllUnCheck();// 清空已选
				that.bindSearch();// 第一签中的查询按钮的事件
				that.bindSecondTreeReflsh();// //绑定重点关注树的刷新动作
				that.bindAllUnCheckSecond();// 重点关注树的清空已选
				that.setGrid();// 第三个签初始化grid
				that.bindSearchForm();// 绑定第三个签中查询条件 用来刷新上面的grid
				that.bindBatchEvent(); // 绑定下发批量操作按钮
				// that.initValite();//绑定验证 然后通过验证才能进行查询
				that.bindKeyDown();// 绑定回车方法进行查询
				that.checkTheFunction();
				that.onReSize();// 窗体变化尺寸时使用的
			});

	},
	checkTheFunction : function()
	{
		var that = this, actionButtons = that.mainContainer.find("div.monitor_left_menu_function > ul");
		
		actionButtons.find("li").each(function(i)
		{
			if (i == "0")
			{
				// 批量监控
				if (!checkFunction("FG_MEMU_MONITOR_BATCH_EMPHASIS"))
				{
					$(this).addClass("hiden");
				}
			} else if (i == "1")
			{
				// 批量拍照
				if (!checkFunction("FG_MEMU_MONITOR_BATCH_PHOTOGRAPH"))
				{
					$(this).addClass("hiden");
				}
			} else if (i == "2")
			{
				// 批量点名
				if (!checkFunction("FG_MEMU_MONITOR_BATCH_VIEW"))
				{
					$(this).addClass("hiden");
				}
			} else if (i == "3")
			{
				// 群发短信
				if (!checkFunction("FG_MEMU_MONITOR_BATCH"))
				{
					$(this).addClass("hiden");
				}
			}
		});

	},
	// 绑定监控左侧组件回车事件
	bindKeyDown : function() {
		var that = this;
		that.mainContainer
			.find("#monitor_first_tree_form").bind('keydown', function(e) {
				var key = e.which;
				if (key === 13) {
					$("#" + that.options.firstSearchButton).trigger('click');
					return false;
				}
			}).end()
			.find("#monitor_left_tree_form").bind('keydown', function(e) {
				var key = e.which;
				if (key === 13) {
					$("#" + that.options.searchForm).find(".left_menu_main_button_3").trigger('click');
					return false;
				}
			});
	},
	// 重置查询框
	clearSeach : function() {
		$("#" + this.options.firstSearchInput).bind("focus", function() {
			$(this).val("");
		});
		$("#" + this.options.secondTabSeachInput).bind("focus", function() {
			$(this).val("");
		});
	},
	// 获取当前标签
	getCurTab : function() {
		var that = this, 
			index = 0;
		var cc_cc = $("#" + that.options.tabId).find(that.options.tab);
		cc_cc.each(function(i) {
			if ($(this).hasClass(that.options.tabUseClass))
				index = i;
		});
		return index;
	},
	// 绑定标签事件
	setTabs : function() {
		var that = this;
		var cc_cc = $("#" + that.options.tabId).find(this.options.tab);
		cc_cc.each(function() {
			$(this).click(function() {
				var index = cc_cc.index(this);
				if ($(this).hasClass(that.options.tabUseClass)) {
					return;
				} else {
					cc_cc.each(function(i) {
						if ($(this).hasClass(that.options.tabUseClass)) {
							var ii = cc_cc.index(this);
							that.mainContainer.find("#" + that.options.tabContentId)
								.find("." + that.options.tabContentClass).eq(ii).hide();
							$(this).removeClass(that.options.tabUseClass)
									.addClass(that.options.tabNotUseClass);
						}
					});
					$(this).addClass(that.options.tabUseClass)
							.removeClass(that.options.tabNotUseClass);
					that.mainContainer.find("#" + that.options.tabContentId)
						.find("." + that.options.tabContentClass).eq(index).show();
					if (index == 1) {
						/* 修改BUG YYPT-277 by zhengzhong 20121015
						that.reloadGrid(null, that.options.gridUrl);
						 */
					}
				}
			});
		});
	},
	// 树形结构节点后缀文本
	textAfter : function(text, type, isOnline) {
		var color = (isOnline == "0") ? "#777777" : "#316d1e",
			buttons = (type != "interestTree") 
				? '<div class="interestedIn" style="float:left;display:none;">&nbsp;</div>'
				: '',
			html = [
					'<div>'
				,		'<div style="float:left;color:' + color + '">' + text + '</div>'
				,		'<div class="buttons" style="float:left;">'
				,			buttons
				,			'<div class="cancelInterest" style="float:left; display:none;">&nbsp;</div>'
				,		'</div>'
				,	'</div>'
			];
		return html.join('');
	},
	// 根据企业id查询企业下的车辆
	getEntVehicles : function(p, handler) {
		var that = this;
		JAjax("monitor/findTreeMarkers.action", p, "json", function(data) {
			if (data && data.error) {
				return false;
			}
			handler.call(that, data);
		}, function(err) {
			that.entVehicleCache[p["requestParam.equal.entId"]] = null;
//			$("#monitorTreeeFirst").parents("div.left_menu_main").unLoadMask();
			that.options.monitorObj.startRollSelectedVehicles();
		},null,null,20000);
	},
	// 批量删除车辆marker和缓存
	batchRemoveMarker : function(data) {
		var that = this;
		$(data).each(function() {
			var vid = this.vid, vno = this.vehicleno, pos = inArray(vid, that.options.monitorObj.cache.vehiclesToBeRollPosition);
			if (that.options.monitorObj.cMap.markerObj[vid]) {
				setTimeout(function() {
					that.options.monitorObj.cMap.removeMarker(vid);
				}, 60);
			}
			if (pos > -1)
				that.options.monitorObj.cache.vehiclesToBeRollPosition.splice(pos, 1);
			if ($.inArray(vid, that.checkedVehicle) > -1) {
				arrayRemove(that.checkedVehicle, vid);
				arrayRemove(that.checkedVehicleName, vno);
			}
		});
	},
	// 查询企业下车辆
	findTreeEntVehicles : function(entId, isonline, flag) {
		var that = this, p = {
			"requestParam.equal.entId" : entId
		};
		if (isonline)
			p["requestParam.equal.isOnline"] = isonline;
		that.options.monitorObj.stopRollSelectedVehicles();

		if (flag) {
			this.getEntVehicles(p, function(data) {
				that.entVehicleCache[entId] = data.slice(0);
				$(data).each(function() {
					var vid = this.vid, vno = this.vehicleno, pos = inArray(vid, that.options.monitorObj.cache.vehiclesToBeRollPosition);
					if (pos == -1)
						that.options.monitorObj.cache.vehiclesToBeRollPosition.push(vid);
					that.editVehicleCache(this, flag, "vid", "vehicleno");
				});

				that.options.monitorObj.addMarkers(data, true, "user");
				// if(that.options.monitorObj.bottom_AlarmList.getCurGridTab() == 5)
				// that.options.monitorObj.bottom_AlarmList.realTimeAlarmListGridManager.appendRange(data);
//				that.options.monitorObj.getLatestPositions(that.options.monitorObj.cache.vehiclesToBeRollPosition, true);
				that.options.monitorObj.startRollSelectedVehicles();
			});
		} else {
			// if(that.options.monitorObj.bottom_AlarmList.getCurGridTab() == 5)
			// that.options.monitorObj.bottom_AlarmList.realTimeAlarmListGridManager.deleteRange(that.entVehicleCache[entId]);

			if (that.entVehicleCache[entId]) {
				that.batchRemoveMarker(that.entVehicleCache[entId]);
				that.entVehicleCache[entId] = null;
			} else {
				this.getEntVehicles(p, function(data) {
					that.batchRemoveMarker(data);
				});
			}
			that.options.monitorObj.getLatestPositions(that.options.monitorObj.cache.vehiclesToBeRollPosition, false);
			that.options.monitorObj.startRollSelectedVehicles();
//			$("#monitorTreeeFirst").parents("div.left_menu_main").unLoadMask();
		}
		if (that.options.monitorObj.currentTip) {
			that.options.monitorObj.cMap.map.removeOverLay(that.options.monitorObj.currentTip);
			that.options.monitorObj.currentTipId = "";
			that.options.monitorObj.currentTip = null;
		}
	},
	// 添加/删除勾选车辆缓存
	editVehicleCache : function(data, flag, vidStr, vnoStr) {
		vidStr = vidStr ? vidStr : "i";
		vnoStr = vnoStr ? vnoStr : "n";
		var that = this, vid = data[vidStr];
		if (flag) {
			that.checkedVehicle.push(vid);
			that.checkedVehicleName.push(data[vnoStr]);
		} else {
			arrayRemove(that.checkedVehicle, vid);
			arrayRemove(that.checkedVehicleName, data[vnoStr]);
		}
	},

	// 运用ligerui组件把页面弄成树形页形式
	setTree : function() {
		var that = this;

//		$("#monitorTreeeFirst").parents("div.left_menu_main").loadMask("");
		var tree = that.mainContainer.find("#" + that.options.firstTabId);
		$(tree).ligerTree({
//			isLoading : false,
			url : that.options.firstTabUrl,
			queryParam : {
				"requestParam.equal.entId" : KCPT.user.entId,
				"entType" : -1
			},
			checkbox : true,
			isLoading : false,
			textFieldName : 'n',
			hasChild : 't',
			parentIcon : '',
			childIcon : '',
			isMonitorTree : true,
			childrenListName : 'c',
			isCheckAll : false,
			appendText : function(data) {
				var text = '', html = '';
				if (data.t == "3") {
					text = that.textAfter(data.n, "tree", data.ov);
					html = '<span vid="' + data.i + '" title="' + data.n + '" class="vehicleNoText">' + text + '</span></div>';
				} else {
					text = data.n + "(" + data.s + ")";
					html += '<span title="' + text + '">' + text + '</span></div>';
				}
				return html;
			},
			onBeforeCheck : function(note) {
				if ((that.options.monitorObj.cache.vehiclesToBeRollPosition.length + parseInt(note.data['s'])) > vehiclesInMapLimit) {
					$.ligerDialog.alert("选择车辆超过上限!", "提示", "error");
					return false;
				} else
					return true;
			},
			onCheck : function(note, flag) {// status
				// 0:incomplete,1:checked,2:unchecked
//				$("#monitorTreeeFirst").parents("div.left_menu_main").loadMask("");
				var nid = note.data.i, 
					nlev = note.data.t,
					nodeId = nid + (nlev == 3 ? "_checkbox_tree_leaf" : "_checkbox_tree"),
					pos = $.inArray(nodeId, that.checkedNodeCache);
				if(flag) {
					note.data["status"] = "1";
					note.data["cid"] = nodeId;
					if (pos < 0)
						that.checkedNodeCache.push(nodeId);
				}else {
					if(pos >= 0)
						that.checkedNodeCache.splice(pos, 1);
				}
				
				if (note.data.t == "3") {
					that.options.monitorObj.addOrRemoveMarkerForSelected(flag, [ nid ]);
					that.editVehicleCache(note.data, flag);
//					$("#monitorTreeeFirst").parents("div.left_menu_main").unLoadMask();
				}
				if (note.data.t == "2") {
					var vehicleIdCache = [];
					$(note.data.c).each(function() {
						that.editVehicleCache(this, flag);
						vehicleIdCache.push(this.i);
					});
					that.options.monitorObj.addOrRemoveMarkerForSelected(flag, vehicleIdCache);
//					$("#monitorTreeeFirst").parents("div.left_menu_main").unLoadMask();
				}
				if (note.data.t == "1") {
					var onlineFlag = that.mainContainer.find("input[name=onlineFlag]").attr("checked") ? 1 : "";
					that.findTreeEntVehicles(note.data.i, onlineFlag, flag);
				}
			},
			onClick : function(data) {
				if (that.firstTreeClickTimer) {
					clearTimeout(that.firstTreeClickTimer);
					that.firstTreeClickTimer = null;
				}
				that.firstTreeClickTimer = setTimeout(function() {
					if ($.trim(data.target.className) == "interestedIn") {
						that.addInterest(data.data.i, function() {
							$(data.target).hide().siblings("div.cancelInterest").show();
						});
					} else if ($.trim(data.target.className) == "vehicleDetail") {
						that.detail(data.data.i);
					} else if ($.trim(data.target.className) == "cancelInterest") {
						that.removeInterest(data.data.i, function() {
							$(data.target).hide().siblings("div.interestedIn").show();
						});
					} else {
						if (data.data && data.data.i)
							that.locateVehicle(data.data.i);
					}
				}, 1000);
			},
//			loadCheckedData : function(data) {
//				var flag = false;
//				if (that.checkedVehicle.length < 1) {
//					return false;
//				} else {
//					return ($.inArray(data.i, that.checkedVehicle) > -1) ? true : false;
//				}
//			},
			onHoverIn : function(thisHtml) {
				var vNo = $(thisHtml).find("span").attr("vid");
				if (vNo && $.inArray(vNo, that.haveInterestMarker) == -1) {
					$(thisHtml).find("span div.buttons").find("div").each(function(i) {
						if (!$(this).hasClass("cancelInterest")) {
							$(this).css({
								display : 'block'
							});
						}
					});
				} else if (vNo && $.inArray(vNo, that.haveInterestMarker) > -1) {
					$(thisHtml).find("span div.buttons").find("div").each(function(i) {
						if (!$(this).hasClass("interestedIn")) {
							$(this).css( {
								display : 'block'
							});
						} else {
							$(this).css( {
								display : 'none'
							});
						}
					});
				}
			},
			onHoverOut : function(thisHtml) {
				$(thisHtml).find("span div.buttons").find("div").each(function(i) {
					$(this).css( {
						display : 'none'
					});
				});
			},
			onBeforeExpand : function(note, isRoot) {
				if ($(note.target).find("ul > li").length < 1) {
					var p = "";
					that.loadStatus = false;
					that.tempKey = note.data.i;
					var isOnlineFlag = that.mainContainer.find("input[name=onlineFlag]").attr("checked");
					if (note.data.t == "1") {
						p = {
							"requestParam.equal.parentId" : note.data.i,
							"entType" : note.data.t
						};
					} else if (note.data.t == "2") {
						p = {
							"requestParam.equal.entId" : note.data.i,
							"entType" : note.data.t
						};
					}
					if (isOnlineFlag)
						p["requestParam.equal.isOnline"] = 1;

					if (note.data.t != "3")
						that.TreeManager.loadData(note.target, that.options.firstTabUrl, p);
//					if (isRoot)
//						that.Treemanager.append(note.target, note.data.c);
				} else {
					that.TreeManager.success(note.data.c, note.target,
					{
						"requestParam.equal.parentId" : note.data.i,
						"entType" : note.data.t
					});
				}
			},
			onExpand : function(note) {
			},

			onCollapse : function(note) {
				var key = note.data.i;
				that.openEntData[key] = "";
			},
			onSuccess : function(data, curnode, param) {
				if (curnode && data && data.length > 0) {
					$(that.checkedNodeCache).each(function(){
						if($(curnode).find("ul li #" + this).length > 0 && !$("#" + this).hasClass("l-uncheckbox")){
//							var ui = this;
//							setTimeout(function(){$("#" + ui).trigger("click");},200);
							$("#" + this).trigger("click");
						}
					});
					if(param){
						var pid = param["requestParam.equal.parentId"] || param["requestParam.equal.entId"];
						var pidChecked = $("#" + pid + "_checkbox_tree").hasClass("l-checkbox-checked");
						if(pidChecked){
							$(data).each(function() {
								var cnode = null;
								if (this["t"] == 3)
									cnode = $("#" + this["i"] + "_checkbox_tree_leaf");
								else
									cnode = $("#" + this["i"] + "_checkbox_tree");
								if (this["t"] != 3 && this["s"] && parseInt(this["s"]) == 0)
									cnode.removeClass("l-checkbox-unchecked")
										.addClass("l-uncheckbox");
								else if (this["t"] == 3 || (this["s"] && parseInt(this["s"]) > 0))
									cnode.removeClass("l-checkbox-unchecked")
										.addClass("l-checkbox-checked");
							});
						}
					}
//					if (param) {
//						var ids = param["requestParam.equal.parentId"] || param["requestParam.equal.entId"];
//						var isleaf = false;
//						if (param["requestParam.equal.entId"] && param["entType"] != "-1") {
//							isleaf = true;
//							if ($("#" + ids + "_checkbox_tree").hasClass("l-uncheckbox"))
//								$("#" + ids + "_checkbox_tree").removeClass("l-uncheckbox l-uncheckbox-checked l-checkbox-unchecked")
//									.addClass("l-checkbox l-checkbox-unchecked")
//						}
//						var cco = $("#" + ids + "_checkbox_tree").hasClass("l-checkbox-checked");
//						if (cco) {
//							$(data).each(function() {
//								var cnode = null;
//								if (this["t"] == 3)
//									cnode = $("#" + this["i"] + "_checkbox_tree_leaf");
//								else
//									cnode = $("#" + this["i"] + "_checkbox_tree");
//								if (this["s"] && parseInt(this["s"]) == 0)
//									cnode.removeClass("l-checkbox-unchecked")
//										.addClass("l-uncheckbox");
//								else if (this["s"] && parseInt(this["s"]) > 0)
//									cnode.removeClass("l-checkbox-unchecked")
//										.addClass("l-checkbox-checked");
//							});
//						} else {
//							$(data).each(function() {
//								if (parseInt(this["t"]) === 2) {
//									if (that.getgroupcheckedVehicle[this["i"]]) {
//										if (parseInt(that.getgroupcheckedVehicle[this["i"]].status) == 1)
//											$("#" + that.getgroupcheckedVehicle[this["i"]].cid)
//													.removeClass("l-uncheckbox l-uncheckbox-checked l-checkbox-unchecked")
//													.addClass("l-checkbox l-checkbox-checked");
//										else
//											$("#" + that.getgroupcheckedVehicle[this["i"]].cid)
//													.removeClass("l-uncheckbox l-uncheckbox-checked l-checkbox-unchecked")
//													.addClass("l-checkbox l-checkbox-incomplete");
//									}
//								} else {
//									if (that.getcheckedVehicle && that.getcheckedVehicle.length > 0) {
//										for ( var j = 0; j < that.getcheckedVehicle.length; j++) {
//											if (parseInt(this["i"]) == parseInt(that.getcheckedVehicle[j].i)) {
//												if (parseInt(that.getcheckedVehicle[j]['status']) == 1) {
//													if (parseInt(that.getcheckedVehicle[j].t) == 2)
//														$("#" + that.getcheckedVehicle[j].cid)
//																.removeClass("l-uncheckbox l-uncheckbox-checked l-checkbox-unchecked")
//																.addClass("l-checkbox l-checkbox-checked");
//																
//													else
//														$("#" + that.getcheckedVehicle[j].cid)
//																.removeClass("l-uncheckbox l-uncheckbox-checked l-checkbox-unchecked")
//																.addClass("l-checkbox l-checkbox-checked");
//												} else {
//													if (parseInt(that.getcheckedVehicle[j].t) == 2)
//														$("#" + that.getcheckedVehicle[j].cid)
//																.removeClass("l-uncheckbox l-uncheckbox-checked l-checkbox-unchecked")
//																.addClass("l-checkbox l-checkbox-incomplete");
//													else
//														$("#" + that.getcheckedVehicle[j].cid)
//																.removeClass("l-checkbox-unchecked")
//																.addClass("l-checkbox-incomplete");
//												}
//												break;
//											}
//										}
//									}
//	
//								}
//							});
//						}
//					} 
				}
				if (data && data.length > 0) {
					var datai = data[0];
					if (!that.loadStatus) {
						if (datai['t'] == "1" || datai['t'] == "2") {
							if (!that.tempKey) {
								that.tempKey = KCPT.user.entId;
							}
							that.openEntData[that.tempKey] = data;
						}
					}
					if (curnode == null)
						that.TreeManager.expandRootNode(0);
				}
//				$("#monitorTreeeFirst").parents("div.left_menu_main").unLoadMask();
				$("#monitorTreeeFirst").find("li").eq(0).width(400);
				
				that.treeLoadStatus = true;
			}
		});

		that.TreeManager = $(tree).ligerGetTreeManager();		
	},
	bindReflash : function() {
		var that = this, actionDelay = null;
		that.mainContainer.find("#" + that.options.firstRefleshButton).click(function() {
			if(that.treeLoadStatus){
				that.treeLoadStatus = false;
	//			$("div.left_menu_main").eq(0).unLoadMask("");
	//			$("div.left_menu_main").eq(0).loadMask("");
				that.loadStatus = true;
				if (actionDelay)
					clearTimeout(actionDelay);
				actionDelay = setTimeout(function() {
					that.options.monitorObj.addOrRemoveMarkerForSelected(false, that.checkedVehicle);
					that.checkedVehicle = [];
					that.checkedVehicleName = [];
					that.entVehicleCache = {};
					var isOnlineFlag = that.mainContainer.find("input[name=onlineFlag]").attr("checked");
					var param = {
						"requestParam.equal.entId" : KCPT.user.entId,
						"entType" : -1
					};
					if (isOnlineFlag)
						param["requestParam.equal.isOnline"] = 1;
					that.TreeManager.flash(null, that.options.firstTabRefreshUrl, param);
				}, 1);//dengwei edit 2012-11-10 1000->1
			}
		}).end()
		.find("input[name=onlineFlag]").click(function() {
			if(that.treeLoadStatus){
				if (actionDelay)
					clearTimeout(actionDelay);
				actionDelay = setTimeout(function() {
					that.mainContainer.find("#" + that.options.firstRefleshButton).trigger("click");
				}, 1);//dengwei edit 2012-11-10 1000->1
			}else{
				if($(this).attr("checked")){
					$(this).attr("checked",false);
				}else{
					$(this).attr("checked",true);
				}
			}
		});
	},
	// 清空已选
	bindAllUnCheck : function() {
		var that = this;

		that.mainContainer.find("#" + that.options.firstUnCheckButton).click(function() {
			that.options.monitorObj.addOrRemoveMarkerForSelected(false, that.checkedVehicle);
			that.checkedVehicle = [];
			that.checkedVehicleName = [];
			that.entVehicleCache = {};
//			that.getcheckedVehicle = [];
//			that.getgroupcheckedVehicle = {};
			that.checkedNodeCache = [];

			that.mainContainer
					.find("#" + that.options.firstTabId)
					.find("div.l-checkbox-checked")
					.each(function() {
						$(this).removeClass("l-checkbox-incomplete l-checkbox-checked")
								.addClass("l-checkbox-unchecked");
					});

			that.mainContainer
					.find("#" + that.options.firstTabId)
					.find("div.l-checkbox-incomplete")
					.each(function() {
						$(this).removeClass("l-checkbox-incomplete l-checkbox-checked")
								.addClass("l-checkbox-unchecked");
					});
		});
	},
	// 绑定查询事件
	bindSearch : function() {
		var that = this, actionDelay = null;
		that.mainContainer.find("#" + that.options.firstSearchInput).click(function() {
			$(this).css('color', 'black').val("");
		});
		that.mainContainer.find("#" + that.options.firstSearchButton).click(function() {
			if(that.treeLoadStatus){
				that.treeLoadStatus = false;
	//			$("div.left_menu_main").eq(0).unLoadMask("");
	//			$("div.left_menu_main").eq(0).loadMask("");
				if (actionDelay)
					clearTimeout(actionDelay);
				actionDelay = setTimeout(function() {
					var searchContent = $.trim(that.mainContainer.find("#" + that.options.firstSearchInput).val());
					if (searchContent == "请输入组织名称")
						searchContent = "";
					var isOnlineFlag = that.mainContainer.find("input[name=onlineFlag]").attr("checked");
					var param = null;
					if (isOnlineFlag) {
	
					}
					if (!searchContent) {
						that.loadStatus = true;
						var param = {
							"requestParam.equal.entId" : KCPT.user.entId,
							"entType" : -1
						};
						if (isOnlineFlag)
							param["requestParam.equal.isOnline"] = 1;
						that.TreeManager.flash(null,
								that.options.firstTabRefreshUrl, param);
					} else {
						var param = {
							"requestParam.equal.entName" : searchContent
						};
						if (isOnlineFlag)
							param["requestParam.equal.isOnline"] = 1;
						that.TreeManager.clear();
						that.TreeManager.loadData(null, that.options.firstSeachUrl, param);
					}
				}, 1000);
			}
		});
	},
	// 加载我的关注树
	loadSecondTree : function(d) {
		var that = this;

		var treeSecond = that.mainContainer
				.find("#" + this.options.secondTabId);
		$(treeSecond).ligerTree({
			// url : that.options.secondTabUrl,
			textFieldName : 'vehicleNo',
			checkbox : true,
			hasChild : 't',
			parentIcon : '',
			childIcon : '',
			childrenListName : 'c',
			isMonitorTree : true,
			isCheckAll : false,
			data : d,
			appendText : function(data) {
				var text = '', 
					html = '';
				if (data.t == "3") {
					text = that.textAfter(data.vehicleNo, "interestTree", data.isVehicleOnLine);
					html = '<span vid="' + data.vid + '" title="' + data.vehicleNo + '" class="vehicleNoText">' + text + '</span></div>';
				} else {
					text = data.vehicleNo + "(" + data.s + ")";
					html += '<span title="' + text + '">' + text + '</span></div>';
				}
				return html;
			},
			onClick : function(data) {
				if (that.secondTreeClickTimer) {
					clearTimeout(that.secondTreeClickTimer);
					that.secondTreeClickTimer = null;
				}
				that.secondTreeClickTimer = setTimeout(
						function() {
							if ($.trim(data.target.className) === "cancelInterest") {
								that.removeInterest(data.data.vid);
							} else {
								that.locateVehicle(data.data.i);
							}
						}, 1000);

			},
			onHoverIn : function(thisHtml) {
				$(thisHtml).find("span div.buttons").find("div").each(function(i) {
					$(this).css( {
						display : 'block'
					});
				});

			},
			onHoverOut : function(thisHtml) {
				$(thisHtml).find("span div.buttons").find("div").each(function(i) {
					$(this).css( {
						display : 'none'
					});
				});
			},
			onCheck : function(note, flag) {
				if (note.data["t"] == "3") {
					that.checkOrUncheck(note.data, flag);
					that.options.monitorObj.addOrRemoveMarkerForSelected(flag, [ note.data.vid ]);
				} else {
					if (!flag) {
						that.options.monitorObj.addOrRemoveMarkerForSelected(flag, that.interestMarker);
						$(note.data["c"]).each(function() {
							that.checkOrUncheck(this, flag);
						});
					} else {
						$(note.data["c"]).each(function() {
							that.checkOrUncheck(this, flag);
						});
						that.options.monitorObj.addOrRemoveMarkerForSelected(flag, that.interestMarker);
					}
				}
			},
			onSuccess : function(data, node, param) {
				if (that.interestMarker
						&& that.interestMarker.length > 0) {
					$(that.interestMarker).each(function() {
						$("#" + this.vid + "_checkbox_tree_leaf").trigger("click");
//						var cnode = $("#" + this.vid + "_checkbox_tree_leaf");
//						cnode.removeClass("l-checkbox-unchecked")
//								.addClass("l-checkbox-checked");
					});
				}
			}
		});

		that.SecondTreeManager = $(treeSecond).ligerGetTreeManager();
		that.SecondTreeManager.expandAll();
	},
	// 勾选/取消勾选
	checkOrUncheck : function(vehicle, flag) {
		if (flag) {
			if ($.inArray(vehicle.vid, this.interestMarker) < 0) {
				this.interestMarker.push(vehicle.vid);
				this.interestMarkerName.push(vehicle.vehicleNo);
			}
		} else {
			if ($.inArray(vehicle.vid, this.interestMarker) > -1) {
				arrayRemove(this.interestMarker, vehicle.vid);
				arrayRemove(this.interestMarkerName, vehicle.vehicleNo);
			}
		}
	},
	// 加载我的关注树的数据
	loadSecondTreeData : function(isFirst) {
		var that = this;
		if (isFirst) {
			that.haveInterestMarker = [];
			that.getinterestMarker = {};
		}
		JAjax(
				that.options.secondTabUrl,
				null,
				"json",
				function(data) {
					var r = data.Rows, d = {}, onlineCount = 0, allCount = r.length;
					if (r.length > 0) {
						$(r).each(function(i) {
							this['t'] = 3;
							if (parseInt(this.isVehicleOnLine) == 1)
								onlineCount++;
							if ($.inArray(this.entId,
									that.interestMarker) == -1)
								that.haveInterestMarker.push(this.vid);
							// if(!that.getinterestMarker[this.vid])
							that.getinterestMarker[this.vid] = this.autoId;
							if (that.interestMarker.length > 0) {
								if ($.inArray(this.entId, that.interestMarker) > -1) {
									this["ischecked"] = true;
								} else {
									this["ischecked"] = false;
								}
							}
						});
					}
					d["id"] = "root";
					d["t"] = "2";
					d["vehicleNo"] = "我的关注 ";
					d['o'] = onlineCount;
					d['s'] = allCount;
					d["c"] = r;
					if (isFirst)
						that.loadSecondTree( [ d ]);
					else {
						that.SecondTreeManager.clear();
						that.SecondTreeManager.append(null, [ d ], true);
						that.SecondTreeManager.expandAll();
						that.SecondTreeManager.tree.find("div.l-checkbox-unchecked").each(function() {
							if ($.inArray($(this).attr("id").split("_")[0], that.interestMarker) > -1) {
								$(this).click();// removeClass("l-checkbox-unchecked").addClass("l-checkbox-checked");
							}
						});
					}
				},null,null,null,20000);
	},
	// 绑定我的关注树的刷新方法
	bindSecondTreeReflsh : function() {
		var that = this, actionDelay = null;

		that.mainContainer.find("#" + that.options.secondRefleshButton).click(function() {
			if (actionDelay)
				clearTimeout(actionDelay);
			actionDelay = setTimeout(function() {
				that.loadSecondTreeData(false);
			}, 1000);

		});
	},
	// 绑定我的关注树的取消已选事件
	bindAllUnCheckSecond : function() {
		var that = this, actionDelay = null;
		that.mainContainer.find("#" + that.options.secondUnCheckButton).click(function() {
			if (actionDelay)
				clearTimeout(actionDelay);
			actionDelay = setTimeout(function() {
				that.options.monitorObj.addOrRemoveMarkerForSelected(false, that.interestMarker);
				that.interestMarker = [];
				that.interestMarkerName = [];
				that.mainContainer.find("#" + that.options.secondTabId).find("div.l-checkbox-checked").each(function() {
					$(this).removeClass("l-checkbox-incomplete l-checkbox-checked")
							.addClass("l-checkbox-unchecked");
				});

				that.mainContainer.find("#" + that.options.secondTabId).find("div.l-checkbox-incomplete").each(function() {
					$(this).removeClass("l-checkbox-incomplete l-checkbox-checked")
							.addClass("l-checkbox-unchecked");
				});
			}, 1000);

		});
	},
	// 定位树上车辆节点的marker位置
	locateVehicle : function(vid) {
		if (this.options.monitorObj.cMap.getMarker(vid)) {
			var marker = this.options.monitorObj.cMap.getMarker(vid);
			this.options.monitorObj.cMap.map.panTo(marker.getLngLat());
		}
	},
	// 添加关注
	addInterest : function(vid, f) {
		var that = this;
		var d = {
			"trOperatorVehicle.vid" : vid
		};
		JAjax(that.options.addInterestAction, d, "text", function(x) {
			if (x.indexOf("success") > -1) {
				setTimeout(function() {
					that.loadSecondTreeData(false);
				}, 50);
					var autoId = x.split("_")[1];
					that.getinterestMarker[vid] = autoId;
				if (f && f instanceof Function) {
					f.call(that);
				}
				$.ligerDialog.alert("关注成功", "提示", "success");
			} else if (x == "fail" || x == "exist") {
				$.ligerDialog.alert("添加关注失败", "提示", "error");
			}
		}, function(err) {

		});
	},
	// 取消关注
	removeInterest : function(vid, f) {
		var that = this;
		var d = {
			"trOperatorVehicle.autoId" : that.getinterestMarker[vid]
		};
		JAjax(that.options.removeInterestAction, d, "text", function(x) {
			if (x == "success") {
				arrayRemove(that.haveInterestMarker, vid);
				setTimeout(function() {
					that.loadSecondTreeData(false);
				}, 50);
				if (f && (f instanceof Function)) {
					f.call(that);
				}
				$.ligerDialog.alert("取消关注成功", "提示", "success");
			} else if (x == "fail") {
				$.ligerDialog.alert("删除关注失败", "提示", "error");
			}
		}, function(err) {

		});
	},
	getGridHeight:function(){
		var center = getHeightAndWidth();
		return center.height - 170;
	},
	// 初始化车辆grid列表
	setGrid : function() {
		var that = this;
		var grid = that.mainContainer.find("#" + that.options.gridId);
		that.grid = $(grid).ligerGrid({
			pageParmName : 'requestParam.page', // 页索引参数名，(提交给服务器)
			pagesizeParmName : 'requestParam.rows',
			checkbox : true,
			barTextShow : false,
			userRight : false,
			columns : [ /*
						 * { display:'品牌',
						 * name:'servicebrandLogo', width:50,
						 * render :function(row){
						 * if(row.servicebrandLogo&&row.servicebrandLogo!=""){
						 * return "<img
						 * src='images/servicebrand/"+row.servicebrandLogo+"'></img>";
						 * }else{ return ""; } } },
						 */
					{
						display : '车牌号',
						name : 'vehicleNo',
						minWidth : 75
					},
					{
						display : '手机号',
						name : 'commaddr',
						width : 80,
						type:'string',
						align : 'center',
						render : function(row) {
							return row.commaddr ? row.commaddr
									: row.commaddr;
						}
					},
					{
						display : '操作',
						name : 'vid',
						width : 80,
						align : 'center',
						render : function(row) {
							if (row.vid) {
								if(row.isBindOp == 1) {
									return "<a href='javascript:void(0);' vid='"
										+ row.vid
										+ "' class='interest'><div class='cancelInterest' style='float:left;'>&nbsp;</div></a>";
								}else {
									return "<a href='javascript:void(0);' vid='"
										+ row.vid
										+ "' class='interest'><div class='interestedIn' style='float:left;'>&nbsp;</div></a>";
								}
//								if ($.inArray(row.vid, that.haveInterestMarker) == -1) {
//									// 在a标记中加了一个div替换到了以前的关注
//									return "<a href='javascript:void(0);' vid='"
//											+ row.vid
//											+ "' class='interest'><div class='interestedIn' style='float:left;'>&nbsp;</div></a>";
//								} else if ($.inArray(row.vid, that.haveInterestMarker) > -1) {
//									// 在a标记中加了一个div替换到了以前的取消关注
//									return "<a href='javascript:void(0);' vid='"
//											+ row.vid
//											+ "' class='interest'><div class='cancelInterest' style='float:left;'>&nbsp;</div></a>";
//								}
							}
						}
					} ],
			onBeforeCheckRow : function(checked, rowData, rowDataId, rowDomElement, event) {
				var vid = $(rowDomElement).find("a.interest").attr("vid");
				if ($.trim(event.className) == "cancelInterest") {
					that.removeInterest(vid, function() {
						// 在a标记中加了一个div替换到了以前的关注
						$(rowDomElement).find("a.interest")
								.replaceWith("<a href='javascript:void(0);' vid='" 
											+ vid 
											+ "' class='interest'><div class='interestedIn' style='float:left;'>&nbsp;</div></a>");
					});
				} else if ($.trim(event.className) == "interestedIn") {
					that.addInterest(vid, function() {
						// 在a标记中加了一个div替换到了以前的取消关注
						$(rowDomElement).find("a.interest")
								.replaceWith("<a href='javascript:void(0);' vid='"
											+ vid
											+ "' class='interest'><div class='cancelInterest' style='float:left;'>&nbsp;</div></a>");
					});
				}

				if ($.trim(event.className) == "cancelInterest" || $.trim(event.className) == "interestedIn")
					return false;

			},
			onCheckRow : function(checked, rowData, rowDomElement, rowIndex, event) {
				that.options.monitorObj.addOrRemoveMarkerForSelected(checked, [ rowData.vid ]);
				if (checked) {
					that.searchVehicle.push(rowData.vid);
					that.searchVehicleName.push(rowData.vehicleNo);
				} else {
					arrayRemove(that.searchVehicle, rowData.vid);
					arrayRemove(that.searchVehicleName, rowData.vehicleNo);
				}
			},
			onSelectRow : function(rowdata, rowindex, rowDomElement) {
				that.options.monitorObj.addOrRemoveMarkerForSelected(true, [ rowdata.vid ]);
			},
			onCheckAllRow : function(checked, grid, data) {
				var vidArr = [];
				$(data.Rows).each(function() {
					vidArr.push(this.vid);
					if (checked) {
						that.searchVehicle.push(this.vid);
						that.searchVehicleName.push(this.vehicleNo);
					} else {
						arrayRemove(that.searchVehicle, this.vid);
						arrayRemove(that.searchVehicleName, this.vehicleNo);
					}
				});
				that.options.monitorObj.addOrRemoveMarkerForSelected(checked, vidArr);
			},
			isChecked : function(data) {
				return ($.inArray(data.vid, that.searchVehicle) > -1) ? true : false;
			},
			pageSize : 30,
			url : that.options.gridUrl,
			sortName : 'vehicleNo',
			width : '100%',
			autoLoad : false,
			height : that.getGridHeight()
		});
		that.GridManager = $(grid).ligerGetGridManager();
	},
	// 绑定搜索标签查询事件
	bindSearchForm : function() {
		var that = this, actionDelay = null;
		that.mainContainer.find("#" + that.options.searchForm).find(".left_menu_main_button_3").click(function() {
			
			if (actionDelay)
				clearTimeout(actionDelay);
			actionDelay = setTimeout(function() {
				that.options.monitorObj.addOrRemoveMarkerForSelected(false, that.searchVehicle);
				that.searchVehicle = [];
				that.searchVehicleName = [];
				//----------------------------------------------------------------------------------------------------------------------------------
				$("#left_menu_main_search_result").find("div.l-grid-header-inner").eq(0).find("tr").removeClass("l-checked");
				
			/*修改BUG YYPT-264 20120922 by zhengzhong
			that.GridManager.loadData();
			*/
			}, 1000);
			
			actionDelay = null;
			
			var kw = $("input[name=secondSearchInput]").val();
			if (!kw) {
				$.ligerDialog.alert("请输入关键字", "提示", "error");
				return false;
			}
			if (actionDelay)
				clearTimeout(actionDelay);
			actionDelay = setTimeout(function() {
				that.submitThrid();
			}, 1000);
		});
		that.mainContainer.find("#" + that.options.searchForm).find(".btn_green").click(function() {
			if (actionDelay)
				clearTimeout(actionDelay);
			actionDelay = setTimeout(function() {
				that.options.monitorObj.addOrRemoveMarkerForSelected(false, that.searchVehicle);
				that.searchVehicle = [];
				that.searchVehicleName = [];
				
				$("#left_menu_main_search_result").find("div.l-grid-header-inner").eq(0).find("tr").removeClass("l-checked");
				$(that.GridManager.getSelectedRowObjs()).trigger("click");
				
//				that.GridManager.loadData();
			}, 1000);
		});
	},
	// 刷新grid
	submitThrid : function() {
		var that = this;
		 actionDelay = null;
		var secondSearchName = that.mainContainer.find("#" + that.options.searchForm).find("select[name=secondSearchType]").val(), 
			secondSearchValue = $.trim(that.mainContainer.find("#" + that.options.searchForm).find("input[name=secondSearchInput]").val()), 
			param = [ 
			    {
					name : secondSearchName,
					value : secondSearchValue
				}, {
					name : "tabFlag",
					value : 3
				}, {
					name : "requestParam.equal.treeSearchvehicleStatus",
					value : 2
				}
			]; // treeSearchvehicleStatus=3; //在搜索时用于去除吊销和未绑定车辆
		
		that.reloadGrid(param, that.options.gridUrl);
		
		return false;

	},
	// 刷新grid
	reloadGrid : function(data, newUrl) {
		var that = this;
		var pp = {};
		if (data) {
			pp["parms"] = data;
			that.GridManager.setOptions(pp);
		}
		that.GridManager.loadDataOut(true, newUrl);

	},
	// 调整页面布局
	onReSize : function() {
		var that = this;
		var center = getHeightAndWidth();
		that.mainContainer.find("#"+that.options.tabContentId).height(center.height - 93);
		that.mainContainer.find("#"+that.options.firstTabId).height(center.height - 180);
		if(that.GridManager){
			that.GridManager.setHeight(that.getGridHeight());
		}
		that.mainContainer.find("#"+that.options.secondTabId).height(center.height - 140);
//		that.mainContainer.height(height + 3); // 2012-03-09 jxf 修改前是：height-9
//		// 修改后将减9改为加3去掉为了将高度放高
//		that.mainContainer.find("div#monitor_left_tree_content").height(height - 9 - topHeight - bottomHeight);
		/*
		 * that.mainContainer.height(height);
		 * that.mainContainer.find("div#monitor_left_tree_content").height(height -
		 * 5 - topHeight - bottomHeight);
		 */
//		that.mainContainer.find("#" + that.options.firstTabId).height(
//				(height - 5 - topHeight - bottomHeight) - searchHeight - 2
//						- buttonHeight);
//		that.mainContainer.find("#" + that.options.secondTabId).height(
//				(height - 2 - topHeight - bottomHeight) - buttonHeight - 2);
		// that.mainContainer.find("#" + that.options.gridId).height(height -
		// topHeight - bottomHeight - 200 + 27);
//		if (that.GridManager)
//			that.GridManager.setHeight(height - topHeight - bottomHeight - 100
//					+ 32);
	},

	/* 以下批量操作功能 */
	bindBatchEvent : function() {
		var that = this, bottomButtons = this.mainContainer.find("div.monitor_left_menu_function > ul > li"), 
			bottomDivs = that.mainContainer.find("div.monitor_left_menu_batch");

		bottomButtons.click(function() {
			if ($(this).hasClass("selectedBatch"))
				return false;
			else {
				bottomButtons.each(function() {
					$(this).removeClass("selectedBatch");
				});
				$(this).addClass("selectedBatch");
				bottomButtons.each(function(i) {
					if ($(this).hasClass("selectedBatch"))
						$(bottomDivs[i]).removeClass("hidden");
					else
						$(bottomDivs[i]).addClass("hidden");
				});
			}
		});
		bottomDivs.find("div.monitor_left_menu_close").click(function() {
			var container = $(this).parent().parent();
			if (!$(container).hasClass("hidden"))
				$(container).addClass("hidden");
			bottomButtons.each(function() {
				$(this).removeClass("selectedBatch");
			});
		});

		this.bindBatchRecallEvent();
		this.bindBatchScheduleEvent();
		this.bindBatchPhotoEvent();
		this.bindBatchMonitorEvent();
	},
	getCurTabSelectedData : function() {
		var selectedData = null;
		if (this.getCurTab() == 0) {
			selectedData = this.checkedVehicle;
		} else if (this.getCurTab() == 2) {
			selectedData = this.interestMarker;
		} else if (this.getCurTab() == 1) {
			selectedData = this.searchVehicle;
		} else {
			selectedData = null;
		}
		return selectedData;
	},
	getCurTabSelectedDataName : function() {
		var selectedData = null;
		if (this.getCurTab() == 0) {
			selectedData = this.checkedVehicleName;
		} else if (this.getCurTab() == 2) {
			selectedData = this.interestMarkerName;
		} else if (this.getCurTab() == 1) {
			selectedData = this.searchVehicleName;
		} else {
			selectedData = null;
		}
		return selectedData;
	},
	// 批量点名div事件
	bindBatchRecallEvent : function() {
		var that = this, recallDiv = this.mainContainer.find("div.batchRecall");
		recallDiv.find("div.monitor_left_menu_button_3").click(function() {
			var selectedData = that.getCurTabSelectedData(), 
				alertMessageForBatch = recallDiv.find("div.monitor_left_menu_Monitor_tip");
			if (!selectedData || (selectedData && selectedData.length < 1)) {
				$.ligerDialog.alert("请至少勾选一辆车!", "提示", "error");
				return false;
			} else {
				$.ligerDialog.confirm("是否对所选车辆进行点名?", function(r) {
					if (r) {
						var param = {
							"requestParam.equal.idArrayStr" : selectedData.join(","),
							"requestParam.equal.memo" : ""
						};
						sendCallNameCommand(param, alertMessageForBatch, true);
					} else
						return false;
				});
			}
		});
	},
	// 批量拍照div事件
	bindBatchPhotoEvent : function() {
		var that = this, 
			photoDiv = this.mainContainer.find("div.batchPhoto");
		photoDiv.find("div.monitor_left_menu_button_2").click(function() {
			var buttonObj = this, 
				alertMessageForBatch = photoDiv.find("div.monitor_left_menu_Monitor_tip"),
				selectedData = that.getCurTabSelectedData(),
				selectedCamera = [];
			if (!selectedData || (selectedData && selectedData.length < 1)) {
				$.ligerDialog.alert("请至少勾选一辆车!");
				return false;
			}
			photoDiv.find("input[name='cameraChanel']").each(function() {
				if ($(this).attr("checked"))
					selectedCamera.push($(this).val());
			});
			if (!selectedCamera || (selectedCamera && selectedCamera.length < 1)) {
				$.ligerDialog.alert("请至少选中一路摄像头!", "提示", "error");
				return false;
			}
			var param = {
				"requestParam.equal.idArrayStr" : (selectedData.join(",")),
				"photoParameter.locationArray" : selectedCamera.join(","),// 摄像头位置
				"photoParameter.quality " : 5,// 图像质量1-10的数字
				"photoParameter.light" : 100,// 亮度0-255的数字
				"photoParameter.contrast" : 100, // 对比度0-127的数字
				"photoParameter.saturation" : 100,// 饱和度0-127的数字
				"photoParameter.color" : 100,// 色度0-255的数字
				"photoParameter.resolution" : "640*480"// 分辨率
			};
			$.ligerDialog.confirm("是否对所选车辆进行拍照?", function(r) {
				if (r)
					sendPhotoCommand(param, "vehicle", alertMessageForBatch, buttonObj, true);
				else
					return false;
			});
		});

	},
	
	/*修改BUG YYPT-287 by jiangwei at:20121018*/
	// 批量跟踪div事件	
	bindBatchMonitorEvent : function() {
		var that = this, 
			batchDelay = null,
			monitorDiv = this.mainContainer.find("div.batchMonitor");
		monitorDiv.find("div.monitor_left_menu_button_1").click(function() {
			if(batchDelay) {
				clearTimeout(batchDelay);
				batchDelay = null;
			}
			
			batchDelay = setTimeout(function(){
				var alertMessageForBatch = monitorDiv.find("div.monitor_left_menu_Monitor_tip"),
					selectedData = that.getCurTabSelectedData(), 
					selectedDataName = that.getCurTabSelectedDataName();
				if (!selectedData || (selectedData && selectedData.length < 1)) {
					$.ligerDialog.alert("请至少勾选一辆车!", "提示", "error");
					return false;
				}
				if (!selectedData || (selectedData && selectedData.length > KCPT.VehicleLatestStatusWindowsNumLimit)) {
					$.ligerDialog.alert("不能勾选多于" + KCPT.VehicleLatestStatusWindowsNumLimit + "辆车!", "提示", "error");
					return false;
				}
			
				$(selectedData).each(function(i) {
					var vid = this;
					if (KCPT.VehicleLatestStatusWindows[vid])
						KCPT.VehicleLatestStatusWindows[vid].showDiv();
					else {
						if (batchMonitorWinIdCache.length < KCPT.VehicleLatestStatusWindowsNumLimit) {
							var params = {
								appendToDiv : $("#monitorContent").find("div.dragDiv"),
								dragableDiv : $("#monitorContent"),
								vid : vid,
								vNo : selectedDataName[i],
								offset : batchMonitorWinIdCache.length
							};
							batchMonitorWinIdCache.push(vid);
							
							KCPT.VehicleLatestStatusWindows[vid] = new VehicleLatestStatusWindow(params);
							
						} else {
							$.ligerDialog.alert("批量监控窗口不能超过" + KCPT.VehicleLatestStatusWindowsNumLimit + "个", "提示", "error");
							return false;
						}
					}
				});
		
				var param = {
					"requestParam.equal.idArrayStr" : batchMonitorWinIdCache.join(","),
					"requestParam.equal.memo" : "", // 备注
					"emphasisParameter.upload" : 10, // 上报间隔2-60的数字
					"emphasisParameter.time " : 10, // 上报次数1-100的数字
					"emphasisParameter.refresh" : 10
				// 刷新间隔 2-60的数字
				};
				sendEmphasisCommand(param,alertMessageForBatch);
			},1000);
		});

	},
	
	
	
	
	// 批量消息div事件
	bindBatchScheduleEvent : function() {
		var that = this, 
			scheduleDiv = this.mainContainer.find("div.batchSchedule");
		if (KCPT.schedulePreMessage && KCPT.schedulePreMessage.length > 0) {
			scheduleDiv.find("select[name='preinstallSelect']").find("option:gt(0)").remove();
			$(KCPT.schedulePreMessage).each(function() {
				var option = "<option value='" + this.msgBody + "' >" + this.msgIdx + "</option>";
				scheduleDiv.find("select[name='preinstallSelect']").append(option);
			});
		}

		scheduleDiv.find("select[name='preinstallSelect']").change(function() {
			scheduleDiv
					.find("textarea[name='textContent']")
					.text($(this).find("option:selected").val());
		}).end()
		/*.find("textarea[name='textContent']").bind("propertychange", function() {
			// $(this).removeClass("grayText");
		}).end()
		.find("textarea[name='textContent']").one("keydown", function() {
			$(this).text("");
		}).end()
		.find("input[name=msgSendType]").eq(0).click(function(){
			alert("000");
			var ui = this;
			$(ui).siblings("input").each(function(){
				$(this).attr("checked", $(ui).attr("checked"));
			});
		}).end()*/
		.find("div.monitor_left_menu_button_4").click(function() {
			var selectedData = that.getCurTabSelectedData(), 
				text = scheduleDiv.find("textarea[name='textContent']").text(), 
				alertMessage = scheduleDiv.find("div.monitor_left_menu_Monitor_tip");
			text = (text == "请输入消息内容") ? "" : text;
			if (!selectedData || (selectedData && selectedData.length < 1)) {
				$.ligerDialog.alert("请至少勾选一辆车!", "提示", "error");
				return false;
			}
			if (validateCharLength(text) > 200) {
				$.ligerDialog.alert("调度信息字符不可超过200字符", "提示", "error");
				return false;
			}
			if (!validateText(text)) {
				$.ligerDialog.alert("调度信息不可为空", "提示", "error");
				return false;
			}
			var _emergencyAttValue, _screenAttValue, _ttsAttValue, _advertisingAttValue;
			$(scheduleDiv).find("input[name=msgSendType]").each(function(i) {
				if (i == 0)
					_emergencyAttValue = ($(this).attr("checked") ? 1 : 0);
				if (i == 1)
					_screenAttValue = ($(this).attr("checked") ? 1 : 0);
				if (i == 2)
					_ttsAttValue = ($(this).attr("checked") ? 1 : 0);
				if (i == 3)
					_advertisingAttValue = ($(this).attr("checked") ? 1 : 0);
			});
			var param = {
				"requestParam.equal.emergencyAttValue" : _emergencyAttValue,
				"requestParam.equal.screenAttValue" : _screenAttValue,
				"requestParam.equal.ttsAttValue" : _ttsAttValue,
				"requestParam.equal.advertisingAttValue" : _advertisingAttValue,
				"requestParam.equal.idArrayStr" : selectedData.join(","),
				"requestParam.equal.message" : text,
				"requestParam.equal.memo" : ""
			};
			$.ligerDialog.confirm("是否对所选车辆下发消息?", function(r) {
				if (r)
					sendMessageCommand(param, "vehicle", alertMessage);
				else
					return false;
			});
		});
	}
};
