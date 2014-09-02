var ctfoPanel = function(o) {
	this.version = "";
	this.options = {
		mainContainer : 'leftPlaneDiv', //包含此对象的div的id
		firstUrl : "operationmanagement/findOrgTreeLikeEntName.action",
		secondUrl : "",
		threeUrl : "",
		fourUrl : "operationmanagement/findGroupEntClassline.action?entId="
				+ KCPT.user.entId,
		chartVal : [],
		searchArr : [],
		resultIdx : 0
	};
	this.mainContainer = "";
	this.loadHtml = "script/ctfoPanel/html/ctfoPanel.html";
	this.init(o);
};

ctfoPanel.prototype = {
	// 展示
	show : function() {
		var obj = this;
		//obj.onReSize();
		obj.status = "show";
		obj.mainContainer.show();
	},
	hide : function() {
		var obj = this;
		obj.status = "hide";
		obj.mainContainer.hide();
 	},
	loadParams : function(o) {
		var obj = this;
		if (o) {
			for ( var i in o) {
				obj.options[i] = o[i];
			}
			return true;
		} else
			return false;
	},
	init : function(o) {
		var su = this.loadParams(o);
		if (su) {
			this.load();
		} else {
			alert("加载数据失败");
		}

	},
	load : function() {
		var that = this;
		that.mainContainer = $(this.options.mainContainer);
		that.mainContainer.load(that.loadHtml, null, function() {
 		that.firstFunction();
		});
	},
 
	firstFunction :function(){
		$("#accordion1").ligerAccordion({
			height : KCPT.root.getCenterSize().height - 12,
			changeHeightOnResize : true,
			speed : 'normal'
		});
		var obj = this;
		obj.setFirst(obj);
		obj.setSecond(obj);
		obj.setThree(obj);
		obj.setFour(obj);
	},
	//重軒导航
	onReSize : function() {
		var obj = this;
		var height = KCPT.root.getCenterSize().height + 28;//加上导航条的高度
		obj.mainContainer.find("div#ctfoTree").height(height - 10);
		if (!obj.options.underTree && !obj.options.userGrid) {
			obj.mainContainer.find("div#powerm_tree").height(height - 80 - 4);
		} else if (obj.options.underTree) {
			var firstHeight = obj.mainContainer.height();//height * 0.45 - 30 - 64;
			obj.mainContainer.find("div#ctfoTree").height(firstHeight - 20);
			obj.mainContainer.find("div#powerm_tree").width(260).height(
					firstHeight - 71 - 4);
			obj.mainContainer.find("div#tree2").height(firstHeight - 71 - 4);
			obj.mainContainer.find("div#tabDiv").find("div.powerm_con").last()
					.height(firstHeight - 26 - 4);
			$("#" + obj.options.gridId).height(0);
		} else {
			var firstHeight = height * 0.45 - 30 - 50 - 4;
			obj.mainContainer.find("div#powerm_tree").height(firstHeight);
			obj.mainContainer.find("div#tree2").height(firstHeight);
			obj.mainContainer.find("div#tabDiv").find("div.powerm_con").last()
					.height(firstHeight + 46);
		}
		if (obj.GridManager && obj.options.userGrid) {
			var firstHeight = height * 0.55;
			obj.GridManager.setHeight(firstHeight);
		} else if (obj.GridManager) {
			obj.GridManager.setHeight(1);
		}

	},
	//falg 表示获取的值是否过滤
	// 1/true：过滤,
	// 0/false ： 不过滤
	getGroupId : function(flag) {//获取组织ID
		var obj = this;
		var panelIdx = obj.getDisplayPanel();
		var tabId = $("#statTypeForUnsafeDriving").val();//获取页面打开的tab页签
		var arr = "";
		if (panelIdx == "1") {
			if (tabId == "1") {
				$("#statType").val("1");
			} else if (tabId == "2") {
				$("#statType").val("2");
			} else if (tabId == "2") {
				$("#statType").val("3");
			}
		}
		if (panelIdx != "3") {
			arr = obj.getCheckSelect("group", flag);
		}
		return arr;
	},
	//flag 表示获取的值是否过滤
	// 1/true：过滤,
	// 0/false ： 不过滤
	getFleetId : function(flag) {//获取车队ID
		var obj = this;
		var panelIdx = obj.getDisplayPanel();
		var tabId = $("#statTypeForUnsafeDriving").val();//获取页面打开的tab页签
		var arr = "";
		if (panelIdx == "2") {
			if (tabId == "1") {
				$("#statType").val("4");
			} else if (tabId == "2") {
				$("#statType").val("5");
			} else if (tabId == "2") {
				$("#statType").val("6");
			}
		}
		if (panelIdx == "2" || panelIdx == "3") {
			arr = obj.getCheckSelect("fleet", flag);
		}
		return arr;
	},
	//falg 表示获取的值是否过滤
	// 1/true：过滤,
	// 0/false ： 不过滤
	getVehicleId : function(flag) {//获取车辆ID
		var obj = this;
		var panelIdx = obj.getDisplayPanel();
		var tabId = $("#statTypeForUnsafeDriving").val();//获取页面打开的tab页签
		var arr = "";
		if (panelIdx == "3") {
			if (tabId == "1") {
				$("#statType").val("7");
			} else if (tabId == "2") {
				$("#statType").val("8");
			} else if (tabId == "2") {
				$("#statType").val("9");
			}
			arr = obj.getCheckSelect("vehicle", flag);
		}
		return arr;
	},
	//falg 表示获取的值是否过滤
	// 1/true：过滤,
	// 0/false ： 不过滤
	getWayLineId : function(flag) {//获取线路ID
		var obj = this;
		var panelIdx = obj.getDisplayPanel();
		var tabId = $("#statTypeForUnsafeDriving").val();//获取页面打开的tab页签
		var arr = "";
		if (panelIdx == "4") {
			if (tabId == "1") {
				$("#statType").val("10");
			} else if (tabId == "2") {
				$("#statType").val("11");
			} else if (tabId == "2") {
				$("#statType").val("12");
			}
			arr = obj.getCheckSelect("wayLine", flag);
		}
		return arr;
	},
	setFirst : function(o) {
		$("#panelCon1").ligerTree({
			url : 'operationmanagement/findOrgTreeOnlyCorp.action',
			onSuccess : function() {
				o.selectNode("1");
			},
			checkbox : true,
			isCheckAll : true,
			childType : 'entType',
			treeFilter : true
		});
		o.treeOneManager = $("#panelCon1").ligerGetTreeManager();
	},
	setSecond : function(o) {
		$("#panelCon2").ligerTree({
			url : 'operationmanagement/findOrgTree.action',
			onSuccess : function(data, curnode, param) {
				o.selectNode("2");
			},
			checkbox : true,
			childType : 'entType'
		});
		o.treeTwoManager = $("#panelCon2").ligerGetTreeManager();
	},
	setThree : function(o) {
		var treeClick = "treeClick";
		$("#panelCon3").ligerTree({
			url : 'operationmanagement/findOrgTree.action',
			onBeforeExpand : function(note) {
				o.treeClick(note);
			},
			onSuccess : function() {
				o.selectNode("3");
				o.leafCoverFolder();
			},
			checkbox : true,
			childType : 'entType'
		});
		o.treeTreeManager = $("#panelCon3").ligerGetTreeManager();
	},
	setFour : function(o) {
		$("#panelCon4").ligerTree({
			url : 'operationmanagement/findCorpAndLineTree.action',
			onSuccess : function() {
				o.selectNode("4");
			},
			checkbox : true,
			childType : 'entType'
		});
		o.treeFourManager = $("#panelCon4").ligerGetTreeManager();
	},
	setFive : function(o) {
		$("#panelCon5").ligerTree({
			url : 'operationmanagement/findOrgTree.action',
			onSuccess : function() {
				o.selectNode("5");
			},
			checkbox : true,
			childType : 'entType'
		});
		o.treeFiveManager = $("#panelCon5").ligerGetTreeManager();
	},
	loadSecondTree : function() {
		var obj = this;

		var treeClick;
		if (!obj.options.secondTreeClick) {
			treeClick = obj.treeClick;
		} else {
			treeClick = obj.options.secondTreeClick;
		}

		var treeSecond = obj.mainContainer.find("#" + this.options.secondTabId);
		$(treeSecond)
				.ligerTree(
						{
							url : obj.options.secondTabUrl,
							onClick : treeClick,
							checkbox : false,
							data : {
								"tabFlag" : 2
							},
							clickScope : obj.options.SecondclickScope ? obj.options.SecondclickScope
									: obj
						});

		obj.SecondTreeManager = $(treeSecond).ligerGetTreeManager();
	},
	activePanel : function(pv) {//子面板点击事件
	},
	bindPanelVehicleEvent : function() {
		var obj = this;
		var url = "operationmanagement/findVehicleForThreeTab.action";
		$("#searchThree")
				.click(
						function() {
							var vehicleNo = $("#threeSearchInput").val();
							if (vehicleNo.length < 3) {
								$.ligerDialog
										.alert('请最少输入三位车牌号!', '提示', 'warn');
								return;
							}
							$
									.ajax({
										type : 'post',
										url : url,
										data : 'tabFlag=3&rows=10000&requestParam.like.vehicleNo='
												+ vehicleNo,
										success : function(col) {
											leftPanel.searchArr = eval("data="
													+ col);
											$("#resultOper").removeClass(
													"btnNone");
											obj.findVehicleNoHC(col);
										}
									});
						});
	},
	bindPanelEvent : function() {//绑定子面板点击事件
		var obj = this;
		$('div.l-accordion-header').each(function(i) {
			$(this).bind('click', function() {
				obj.activePanel(this);
				var idx = Number(i) + 1;
				$("#latitudeForUnsafeDriving").val(idx);
				if (idx == "2") {
					obj.setSecond(obj);
				} else if (idx == "3") {
					obj.setThree(obj);
				} else if (idx == "4") {
					obj.setFour(obj);
				} else if (idx == "5") {
					obj.setFive(obj);
				}
			});
		});
	},
	//查询结果上移一位
	treeSearchUp : function() {
		var obj = this;
		var resultArr = leftPanel.searchArr;
		var manager = obj.treeTreeManager;
		data = manager.getData();
		if (leftPanel.resultIdx > 0) {
			leftPanel.resultIdx = Number(leftPanel.resultIdx) - 1;
			obj._getDataNodeByTreeDataIndex(data[0].childrenList,
					resultArr.Rows[leftPanel.resultIdx]);
			obj.searchSel(resultArr.Rows[leftPanel.resultIdx].vid);
		}
	},
	//查询结果下移一位
	treeSearchDown : function() {
		var obj = this;
		var resultArr = leftPanel.searchArr;
		var manager = obj.treeTreeManager;
		data = manager.getData();
		if (leftPanel.resultIdx < resultArr.Rows.length - 1) {
			leftPanel.resultIdx = Number(leftPanel.resultIdx) + 1;
			obj._getDataNodeByTreeDataIndex(data[0].childrenList,
					resultArr.Rows[leftPanel.resultIdx]);
			obj.searchSel(resultArr.Rows[leftPanel.resultIdx].vid);
		}
	},
	bindResultEvent : function() {
		var obj = this;
		$("#resultUp").click(function() {
			obj.treeSearchUp();
		});
		$("#resultDown").click(function() {
			obj.treeSearchDown();
		});
	},
	findVehicleNoHC : function(vehicleArr) {
		var obj = this;
		var RowsArr = eval("data=" + vehicleArr);
		ctfoPanel.resultIdx = 0;
		obj._searchDataNodeByTreeDataIndex(RowsArr.Rows[0].entId,RowsArr.Rows[0].vid);
	},
	//通过查询的车辆entid并展开节点
	_searchDataNodeByTreeDataIndex : function(entId,vid){
		var temp = $("ul[id=panelCon3]:visible").find("li[outlinelevel=1]").find(".l-box.l-checkbox").eq(0);
		if(temp.attr("class").indexOf("l-checkbox-checked")>0){
			temp.click();
		}
		var tmpNode = $("ul[id=panelCon3]:visible").find("li[id="+entId+"]");
		var temchedui = tmpNode.find("div.l-body").find("div.l-box.l-expandable-close");
		temchedui.click();
		
		var parents = tmpNode.parents();
		parents.each(function(){
			var that = $(this);
			if(that.attr("outlineLevel")&&that.attr("treedataindex")){
				if(that.attr("isexpand")==undefined||that.attr("isexpand")=="false"||that.attr("isexpand")==false){
					that.find("div.l-body").eq(0).find("div.l-box.l-expandable-close").click();
				}
			}
		});
		var time = null;
		time = setTimeout(function(){
			var checkbox = tmpNode.find("li[id="+vid+"]").find(".l-box.l-checkbox");
			if(checkbox.attr("class").indexOf("l-checkbox-unchecked")>0){
				checkbox.click();
			}
			clearTimeout(time);
		}, 1000);
	},
	//查找结果中的车辆，并展开节点
	_getDataNodeByTreeDataIndex : function(data, subNodes) {
		var obj = this;
		var entId = subNodes.entId;
		for ( var i = 0; i < data.length; i++) {
			if (data[i].childrenList != "") {
				this
						._getDataNodeByTreeDataIndex(data[i].childrenList,
								subNodes);
			} else {
				if (data[i].id == entId) {//data[i].id
					var tmpNode = $("#panelCon3").find("li[id=" + entId + "]");
					var dvNodes = $(tmpNode).find(
							"div[class*=l-expandable-close]");
					$(dvNodes[0]).click();//点击“+”号展开节点
					obj.treeStepExpand(tmpNode);
				}
			}
		}
		return true;
	},
	//展开节点
	treeStepExpand : function(treeNode) {
		var obj = this;
		var manager = obj.treeTreeManager;
		var treeLevel = $(treeNode).attr("outlinelevel");
		if (treeLevel == "1") {
			return true;
		}
		var parentNode = manager.getParentTreeItem(treeNode, treeLevel - 1);
		var dvNodes = $(parentNode).find("div[class*=l-expandable-close]");
		$(dvNodes[0]).click();
		this.treeStepExpand(parentNode, $(parentNode).attr("outlineLevel") - 1);
	},
	//查询结果选中高亮状态
	searchSel : function(liId) {
		setTimeout("divOffset(" + liId + ")", 1000);
	},
	getDisplayPanel : function() {//获取哪一个查询面板是显示状态
		var arrs = $("ul[id^=panelCon]:visible");
		var id = $(arrs[0]).attr("id");
		var idx = "";
		if (id == "panelCon1") {
			idx = "1";
		} else if (id == "panelCon2") {
			idx = "2";
		} else if (id == "panelCon3") {
			idx = "3";
		} else if (id == "panelCon4") {
			idx = "4";
		} else if (id == "panelCon5") {
			idx = "5";
		}
		return idx;
	},
	getManager : function(idx) {//获取需要操作树的管理器
		var obj = this;
		var manager = "";
		if (idx == '1') {
			manager = obj.treeOneManager;
		} else if (idx == '2') {
			manager = obj.treeTwoManager;
		} else if (idx == '3') {
			manager = obj.treeTreeManager;
		} else if (idx == '4') {
			manager = obj.treeFourManager;
		} else if (idx == '5') {
			manager = obj.treeFiveManager;
		}
		return manager;
	},
	//获取打勾的复选框节点ID
	// 1: 获取组织节点ID
	//2：获取车队ID
	//3：获取车辆ID
	//4：获取线路ID
	getCheckSelect : function(tx, flag) {
		var str = "";
		var idx = this.getDisplayPanel();
		var manager = this.getManager(idx);
		var notes = manager.getChecked();
		for ( var i = 0; i < notes.length; i++) {
			var entType = "";
			try {
				entType = notes[i].data.nodeType ? notes[i].data.nodeType : "";
			} catch (e) {
				entType = "3";
			}//在获取不到节点属性nodeType 的情况下，该方法是获取 车辆 ID
			if ((tx == "group" && entType == "1")
					|| (tx == "fleet" && entType == "2")
					|| (tx == "wayLine" && entType == "4")) {
				if (flag) {
					var d = $(notes[i].target).find(
							"div[class*=l-checkbox-incomplete]");//获取该车辆所在车队，是否半选
					if (d.length != 0) {
						continue;
					}
				}
				if (str.length != 0) {
					str = str + "," + notes[i].data.id;
				} else {
					str = notes[i].data.id;
				}
			} else if (tx == "vehicle" && entType == "3") {
				//车辆 为懒加载数据，tree.data中无法获取到jquery对象，自获取target-DOM对象获取ID
				//var parentNode = manager.getParentTreeItem(notes[i].target);
				if (flag) {
					var parentNode = $(notes[i].target).parent().parent();
					var d = $(parentNode).find(
							"div[class*=l-checkbox-incomplete]");//获取该车辆所在车队，是否半选
					if (d.length == 0) {
						continue;
					}
				}
				if (str.length != 0) {
					str = str + "," + $(notes[i].target).attr("id");
				} else {
					str = $(notes[i].target).attr("id");
				}
			}
		}

		return str;
	},
	// 树节点点击事件
	treeClick : function(note) {
		try {
			var dix = leftPanel.getDisplayPanel();
			var manager = leftPanel.getManager(dix);
			var id = note.data.id;
			var entType = note.data.entType;
			var nodeType = note.data.nodeType;
			if (entType == "2") {
				if (dix == "3") {
					if (note.data.childrenList == "" && nodeType == "2") {
						var tg = note.target;
						if ($(tg).attr("flag") == "1") {
							return;
						}
						$(tg).attr("flag", "1");
						var url = 'operationmanagement/findVehicleNodesOfTeam.action?teamId='
								+ id;
						leftPanel.ajaxTreeNode(url, note, id, manager, dix);
					}
				} else if (dix == "4") {
					if (note.data.childrenList == "" && nodeType == "2") {
						var tg = note.target;
						if ($(tg).attr("flag") == "1") {
							return;
						}
						$(tg).attr("flag", "1");
						var url = "operationmanagement/findCorpAndLineTree.action";
						leftPanel.ajaxTreeNode(url, note, id, manager, dix);
					}
				}
			}
		} catch (e) {
			return;
		}
	},
	selectNode : function(idx) {
		var a = null;
		if (idx == "1") {
			a = $("#panelCon1 > li > div > div[class*=l-checkbox]");
		} else if (idx == "2") {
			a = $("#panelCon2 > li > div > div[class*=l-checkbox]");
		} else if (idx == "3") {
			a = $("#panelCon3 > li > div > div[class*=l-checkbox]");
		} else if (idx == "4") {
			a = $("#panelCon4 > li > div > div[class*=l-checkbox]");
		} else if (idx == "5") {
			a = $("#panelCon5 > li > div > div[class*=l-checkbox]");
		}
		var cls = $(a[0]).attr("class");
		if (cls.indexOf("l-checkbox-checked") != -1) {
			$(a[0]).click();
		}
		$(a[0]).click();
	},
	leafCoverFolder : function() {
		$("#panelCon3").find("div[class*=l-note]").removeClass("l-note")
				.addClass("l-expandable-close");
	},
	addTreeNode : function(note, nodes, manager) {
		manager.append(note.target, eval(nodes));
	},
	ajaxTreeNode : function(url, note, id, manager, idx) {
		$.ajax({
			type : 'post',
			url : url,
			data : '',
			aysnc : false,
			success : function(col) {
				leftPanel.addTreeNode(note, col, manager);
				leftPanel.selectNode(idx);
			}
		});
	},
	getTabIndex : function() {
		var disTab = $("#unsafeDrivingTabTool").find("li[class=selectTag]");
		var htmlTxt = $(disTab[0]).text();
		if (htmlTxt == "汇总表") {
			return "1";
		} else if (htmlTxt == "月报表") {
			return "2";
		} else if (htmlTxt == "日报表") {
			return "3";
		}
	}
};

/*var ctfoPanel = new leftPanel();
$(document).ready(function() {
	ctfoPanel.bindPanelEvent();
	ctfoPanel.bindPanelVehicleEvent();
	ctfoPanel.bindResultEvent();
});*/