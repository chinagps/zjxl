var leftPanelForAlarm = function() {
	this.version = "";
	this.mainContainer = 'homeLeftDiv', //包含此对象的div的id
	this.firstUrl = "operationmanagement/findOrgTreeLikeEntName.action";
	this.secondUrl = "";
	this.threeUrl = "";
	this.fourUrl = "operationmanagement/findGroupEntClassline.action?entId="+ KCPT.user.entId;
	this.xmlData = "";
	this.lineXmlData = "";
	this.chartVal = [];
	this.clickChartImg = "";  //left表示点击了左边图表，right表示点击了右边图表
	this.clickChartType = []; //显示弹出框时使用，[0]左边图表类型，[1]右边图表类型，类型有pieFusion, lineFusion, columnFusion
	this.clickChartData = []; //弹出框的数据源
	this.clickChartTitle = []; //弹出框的表头
	this.chartCaption = [];
	this.searchArr = [];
	this.resultIdx = 0;
	this.monthTitle = [ "", "" ];
	this.getTitleName = [];
	this.chartCorpName = "";
	this.pieDataCounter = 0;  //饼图合计为0时显示为no data to display，增加此变量用于显示饼图无数据时的显示问题。
	this.init();
	this.colorArray = [ '00b7da', 'ff7d00', '247deb', 'fb4c29', 'f7cb00', '03a803' ];
	this.selectedTeamNodes = null;
};

leftPanelForAlarm.prototype = {
	init : function() {
		this.load();
	},
	//falg 表示获取的值是否过滤
	// 1/true：过滤,
	// 0/false ： 不过滤
	getGroupId : function(flag) {//获取组织ID
		var obj = this;
		var panelIdx = obj.getDisplayPanel();
		var tabId = $("#statTypeForAlarmStatistics").val();//获取页面打开的tab页签
		var arr = "";
		if (panelIdx == "1") {
			if (tabId == "1") {
				$("#statTypeForAlarm").val("1");
			} else if (tabId == "2") {
				$("#statTypeForAlarm").val("2");
			} else if (tabId == "3") {
				$("#statTypeForAlarm").val("3");
			}
		}
		if (panelIdx != "3" && panelIdx != "2") {
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
		var tabId = $("#statTypeForAlarmStatistics").val();//获取页面打开的tab页签
		var arr = "";
		if (panelIdx == "2") {
			if (tabId == "1") {
				$("#statTypeForAlarm").val("4");
			} else if (tabId == "2") {
				$("#statTypeForAlarm").val("5");
			} else if (tabId == "3") {
				$("#statTypeForAlarm").val("6");
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
		var tabId = $("#statTypeForAlarmStatistics").val();//获取页面打开的tab页签
		var arr = "";
		if (panelIdx == "3") {
			if (tabId == "1") {
				$("#statTypeForAlarm").val("7");
			} else if (tabId == "2") {
				$("#statTypeForAlarm").val("8");
			} else if (tabId == "3") {
				$("#statTypeForAlarm").val("9");
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
		var tabId = $("#statTypeForAlarmStatistics").val();//获取页面打开的tab页签
		var arr = "";
		if (panelIdx == "4") {
			if (tabId == "1") {
				$("#statTypeForAlarm").val("10");
			} else if (tabId == "2") {
				$("#statTypeForAlarm").val("11");
			} else if (tabId == "3") {
				$("#statTypeForAlarm").val("12");
			}
			arr = obj.getCheckSelect("wayLine", flag);
		}
		return arr;
	},
	load : function() {
		$("div[id=accordion1]:visible").ligerAccordion({
			changeHeightOnResize : true,
			speed : null
		});
		var obj = this;
		obj.setFirst(obj);
	},
	setFirst : function(o) {
		$("div[class=panelInner] > ul[id=panelCon1]:visible").ligerTree({
			url : 'operationmanagement/findOrgTreeOnlyCorp.action',
			onSuccess : function() {
				//o.selectNode("1",true);
				//$("#panel1").find(".panelInner").eq(0).width(400);
				//$("#searchForButtonForAlarmStatistics").trigger('click');				
			},
			checkbox : true,
			isCheckAll : true,
			childType : 'entType',
			treeFilter : true
		});
		o.treeOneManager = $("div[class=panelInner] > ul[id=panelCon1]:visible").ligerGetTreeManager();
	},
	setSecond : function(o) {
		$("div[class=panelInner] > ul[id=panelCon2]:visible").ligerTree({
			url : 'operationmanagement/findOrgTree.action',
			onSuccess : function(data, curnode, param) {
				//o.selectNode("2",true);
				//$("#panel2").find(".panelInner").eq(0).width(400);
			},
			checkbox : true,
			childType : 'entType'
		});
		o.treeTwoManager = $("div[class=panelInner] > ul[id=panelCon2]:visible").ligerGetTreeManager();
	},
	setThree : function(o) {
		var treeClick = "treeClick";
		$("div[class=panelInner] > ul[id=panelCon3]:visible").ligerTree({
			url : 'operationmanagement/findOrgTree.action',
			onBeforeExpand : function(note) {
				o.treeClick(note);
			},
			onSuccess : function() {
				//o.selectNode("3",true);
				o.leafCoverFolder();
			},
			checkbox : true,
			childType : 'entType'
		});
		o.treeTreeManager = $("div[class=panelInner] > ul[id=panelCon3]:visible").ligerGetTreeManager();
	},
	setFour : function(o) {
		//$("#panel4").width(251);
//		$("div[class=panelInner] > ul[id=panelCon4]:visible").ligerTree({
//			url : 'operationmanagement/findCorpAndLineTree.action',
//			onSuccess : function() {
//				//o.selectNode("4",true);
//				//$("#panel4").find(".panelInner").eq(0).width(400);
//			},
//			checkbox : true,
//			childType : 'entType'
//		});
//		o.treeFourManager = $("div[class=panelInner] > ul[id=panelCon4]:visible").ligerGetTreeManager();
	},
	setFive : function(o) {
		//$("#panel5").width(251);
		$("div[class=panelInner] > ul[id=panelCon5]:visible").ligerTree({
			url : 'operationmanagement/findOrgTree.action',
			onSuccess : function() {
				//o.selectNode("5");
				//$("#panel5").find(".panelInner").eq(0).width(400);
			},
			checkbox : true,
			childType : 'entType'
		});
		o.treeFiveManager = $("div[class=panelInner] > ul[id=panelCon5]:visible").ligerGetTreeManager();
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
	      obj.clearResult();
		  $("div[class=panelSearch]:visible").find("input[id=searchThree]:visible").click(function() {
 			 var vehicleNo = $("div[class=panelSearch]:visible > input[id=threeSearchInput]")[0].value;
 			 vehicleNo=trim(vehicleNo);
 			 if (vehicleNo.length < 3) {
				 $.ligerDialog.alert('请最少输入三位车牌号!', '提示', 'warn');
				 return;
			  };
			 $.ajax({type : 'post',
					 url : url,
					 data : 'tabFlag=3&rows=10000&requestParam.like.vehicleNo='+ vehicleNo,
					 success : function(col) {
						leftPanelForAlarm.searchArr = eval("data="+ col);
				   		if(leftPanelForAlarm.searchArr.Rows.length == 0){
				   			$.ligerDialog.alert('没有找到相关车辆!', '提示', 'warn');
				   			return ;
				   		}
//					    if (leftPanelForAlarm.searchArr.Rows.length != 0) {
//							 $("#resultOper").removeClass("btnNone");
//							 obj.findVehicleNoHC(col);
//						 }
				   		if(leftPanelForAlarm.searchArr.Rows.length != 0){
				   			leftPanelForAlarm.bindResultEvent();
							leftPanelForAlarm.bindClearResult();
							leftPanelForAlarm.resultEvent();
					   		obj.findVehicleNoHC(col);
					   		//设置查询出的车辆结果填入下拉列表中
					   		var selResultObj = $("select[id=vehicleResult]:visible");
				   			selResultObj.removeAttr("disabled");
				   			selResultObj.empty();
				   			selResultObj.data("searchArr",leftPanelForAlarm.searchArr);
				   			$.each(leftPanelForAlarm.searchArr.Rows,function(idx,node){
					   			var vid = node.vid;
				                var vehicleNo = node.vehicleNo;

				                $("select[name='vehicleResult']",$("#resultOper:visible")).append("<option value='"+vid+"'>"+$.trim(vehicleNo)+"</option>");
				                if (idx==0){
				                	obj.selectedNodeId=vid;
				                	//默认选中第一个车
//				                	obj._getDataNodeByTreeDataIndex(null,node);
				                }
					   		});
					   		$(selResultObj).attr("selected",true);
				   		}else{//没有找到车辆时时，提示
				   			var selResultObj = $("select[name='vehicleResult']",$("div[id=Accordion1]:visible"));
				   			selResultObj.attr("disabled",true);
				   			selResultObj.empty();
				   			$.ligerDialog.alert('没有找到相关车辆!', '提示', 'warn');
				   			return ;
				   		}
					  }
				  });
			 });
			 //车辆查询输入框事件
				$("div[class=panelSearch]:visible > input[id=threeSearchInput]").keypress(function(){
					var a = $(this).val();
					if(a == "车牌号"){
						$(this).val("");
						$(this).removeClass("noVehicle");
					}
				}).focus(function(){
					var a = $(this).val();
					$(this).val("");
					$(this).removeClass("noVehicle");
				}).blur(function(){
					var a = $(this).val();
					if(a.length == 0 || a == "车牌号"){
						$(this).val("车牌号");
						$(this).addClass("noVehicle");
					}
				});
	},
	bindPanelEvent : function() {//绑定子面板点击事件
		var obj = this;
		$('div.l-accordion-header:visible').each(function(i) {
			$(this).bind('click', function() {
				obj.activePanel(this);
				var idx = Number(i) + 1;
				$("#latitudeForAlarmStatistics").val(idx);
				if (idx == "2") {
					obj.setSecond(obj);
				} else if (idx == "3") {
					obj.setThree(obj);
					leftPanelForAlarm.bindPanelVehicleEvent();
					var panelContextObj = $("ul[id=panelCon3]:visible");
					//计算高度
					var hgt = 260;
					if (obj.getPosition(panelContextObj)){
						hgt=$(window).height()-obj.getPosition(panelContextObj)-50-20;
					}
					panelContextObj.css("overflow","auto").css("height",hgt+"px");
				} else if (idx == "4") {
					obj.setFour(obj);
				} else if (idx == "5") {
					obj.setFive(obj);
				}
			});
		});
	},
	getPosition:function(obj){
		var top=0;
 		top = obj.offset().top;
		return top;
	},
	//查询结果上移一位
	treeSearchUp : function(idx) {
		var obj = this;
		var resultArr = leftPanelForAlarm.searchArr;
		var manager = obj.treeTreeManager;
		data = manager.getData();
		if (leftPanelForAlarm.resultIdx > 0) {
			leftPanelForAlarm.resultIdx = Number(idx);
			obj._getDataNodeByTreeDataIndex(data[0].childrenList, resultArr.Rows[leftPanelForAlarm.resultIdx]);
			obj.searchSel(resultArr.Rows[leftPanelForAlarm.resultIdx].vid,resultArr.Rows[leftPanelForAlarm.resultIdx].vehicleNo);
		}else{
			$.ligerDialog.alert('已经是第一个结果!', '提示', 'warn');
		}
	},
	//查询结果下移一位
	treeSearchDown : function(idx) {
		var obj = this;
		var resultArr = leftPanelForAlarm.searchArr;
		var manager = obj.treeTreeManager;
		data = manager.getData();
		if (leftPanelForAlarm.resultIdx < resultArr.Rows.length - 1) {
			leftPanelForAlarm.resultIdx = Number(idx);
			obj._getDataNodeByTreeDataIndex(data[0].childrenList,resultArr.Rows[leftPanelForAlarm.resultIdx]);
			obj.searchSel(resultArr.Rows[leftPanelForAlarm.resultIdx].vid,resultArr.Rows[leftPanelForAlarm.resultIdx].vehicleNo);
		}else{
			$.ligerDialog.alert('已经是最后一个结果!', '提示', 'warn');
		}
	},
	//清除查询车辆查询结果
	clearResult : function(){
//		leftPanelForAlarm.searchArr = [];
//		var heightNode = $("#panel3").find("div[class*=searchBk]");
//		$("#threeSearchInput").val("");
//		$(heightNode[0]).removeClass("searchBk");
//		$("#resultOper").addClass("btnNone");
		leftPanelForAlarm.searchArr = [];
		var heightNode = $("ul[id=panel3]:visible").find("div[class*=searchBk]").removeClass("searchBk");
		$("input[id=threeSearchInput]:visible").val("车牌号");
		var selResultObj = $("select[id=vehicleResult]:visible");
		selResultObj.attr("disabled",true);
		selResultObj.empty();
	},
	bindClearResult : function(){
		var obj = this;
		$("#clearResultForAlarm").click(function(){
			obj.clearResult();
		});
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
		bindSearchDivFloat : function(){
			$("#panel3").scroll(function(){
				var offsetTop = $(this).scrollTop();
				$("#panel3").find("div[class=panelSearch]").css("top",offsetTop-1+"px");
			});
		},
	findVehicleNoHC : function(vehicleArr) {
		var obj = this;
		var RowsArr = eval("data=" + vehicleArr);
		leftPanelForAlarm.resultIdx = 0;
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
				this._getDataNodeByTreeDataIndex(data[i].childrenList,subNodes);
			} else {
				if (data[i].id == entId) {//data[i].id
					var tmpNode = $("ul[id=panelCon3]:visible").find("li[id=" + entId + "]");
					var dvNodes = $(tmpNode).find("div[class*=l-expandable-close]");
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
	searchSel : function(liId,vehicleNo) {
		setTimeout("divOffset(" + liId + ",'"+vehicleNo+"')", 1000);
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
		var notes = null;
		if (tx == "group" || tx == "wayLine") {
			notes = this.getManager(idx).getChecked();
		} else if (tx == "fleet") {
			this.selectedTeamNodes = this.getManager(idx).getChecked();
			notes = this.selectedTeamNodes;
		} else {
			notes = this.selectedTeamNodes;
		}
		var tmpEntType = "";
		if(tx == "group"){
		 tmpEntType = "1";
		}else if(tx == "fleet"){
			tmpEntType = "2";
		}else if(tx == "wayLine"){
			tmpEntType = "4";
		}
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
				if(tmpEntType != entType){
					continue;
				}
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
			var dix = leftPanelForAlarm.getDisplayPanel();
			var manager = leftPanelForAlarm.getManager(dix);
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
						leftPanelForAlarm.ajaxTreeNode(url, note, id, manager,
								dix);
					}
				} else if (dix == "4") {
					if (note.data.childrenList == "" && nodeType == "2") {
						var tg = note.target;
						if ($(tg).attr("flag") == "1") {
							return;
						}
						$(tg).attr("flag", "1");
						var url = "operationmanagement/findCorpAndLineTree.action";
						leftPanelForAlarm.ajaxTreeNode(url, note, id, manager,
								dix);
					}
				}
			}
		} catch (e) {
			return;
		}
	},
	selectNode : function(idx,flag) {
		var a = null;
		if (idx == "1") {
			a = $("ul[id=panelCon1]:visible > li > div > div[class*=l-checkbox]");
		} else if (idx == "2") {
			a = $("ul[id=panelCon2]:visible > li > div > div[class*=l-checkbox]");
		} else if (idx == "3") {
			a = $("ul[id=panelCon3]:visible > li > div > div[class*=l-checkbox]");
		} else if (idx == "4") {
			a = $("ul[id=panelCon4]:visible > li > div > div[class*=l-checkbox]");
		} else if (idx == "5") {
			a = $("ul[id=panelCon5]:visible > li > div > div[class*=l-checkbox]");
		}
 		if(flag){
			$(a[0]).click();
		}
  	},
	leafCoverFolder : function() {
		$("ul[id=panelCon3]:visible").find("div[class*=l-note]").removeClass("l-note")
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
				leftPanelForAlarm.addTreeNode(note, col, manager);
				leftPanelForAlarm.selectNode(idx,false);
				leftPanelForAlarm.selectSubNodeAll(note.target);
			}
		});
	},
    selectSubNodeAll : function(parentNode){
    	var isHave = $(parentNode).find("div[class*=l-checkbox-checked]");
    	if(isHave.length > 0){
    		$(parentNode).find("div[class*=l-checkbox-unchecked]").removeClass("checkbox-unchecked").addClass("l-checkbox-checked");
    	}
    },
	getTabIndex : function() {
		var disTab = $("#alarmStatisticsTabTool").find("li[class=selectTag]");
		var htmlTxt = $(disTab[0]).text();
		if (htmlTxt == "汇总表") {
			return "1";
		} else if (htmlTxt == "月报表") {
			return "2";
		} else if (htmlTxt == "日报表") {
			return "3";
		}
	},
	createFirstChart : function(data, chartsTitle) {
//  	$("#resultTableDivForAlarmStatistics").find("tr[class*=l-grid-row l-grid-row-alt l-selected]").removeClass('l-selected');
//		$("#resultTableDivForAlarmStatistics").find("tr[class*=l-grid-row l-selected]").removeClass('l-selected');
//	  	$("#resultTableDivForAlarmStatistics").find("div[class*=sumAllFromDatabaseStyle]").removeClass('sumAllFromDatabaseStyle').addClass('sumAllFromDatabaseStyleSelected');
		var obj = this;
		obj.chartCaption = chartsTitle;
		obj.chartVal = [];
		//取列中可自定义列的数据刷成图表展示
		var disTitle = new Array();
		var setVal = new Array();
		var columns = gridListForAlarmStatistics.grid.realGrid.options.columns;
		var gridColumnsLength = columns.length;
		for ( var i = 0; i < gridColumnsLength; i++) {
			if (columns[i].frozen == undefined) {
				disTitle.push(columns[i].display);
				setVal.push(data[columns[i].columns[0].name]);
				obj.getTitleName.push(columns[i].columns[0].name);
			} else if (columns[i].frozen) {
				var panelIdx = obj.getDisplayPanel();
				if (panelIdx == "1") {
					obj.monthTitle[0] = "corpId";
					obj.monthTitle[1] = data[obj.monthTitle[0]];
				} else if (panelIdx == "2") {
					obj.monthTitle[0] = "teamId";
					obj.monthTitle[1] = data[obj.monthTitle[0]];
				} else if (panelIdx == "3") {
					obj.monthTitle[0] = "vehicleNo";
					obj.monthTitle[1] = data[obj.monthTitle[0]];
				} else if (panelIdx == "4") {
					obj.monthTitle[0] = "lineId";
					obj.monthTitle[1] = data[obj.monthTitle[0]];
				}
			}
		}
		obj.chartCorpName = obj.monthTitle[1];
		obj.chartVal.push(disTitle);
		obj.chartVal.push(setVal);
		var leftChart = [];
		var rightChart = [];
		var tabIdx = obj.getTabIndex();
		if (tabIdx === "1") {
				leftChart[0] = "pieFusion";
				leftChart[1] = gridListForAlarmStatistics.chartsTitle[3][0];
				rightChart[0] = "columnFusion";
				rightChart[1] = gridListForAlarmStatistics.chartsTitle[3][1];
				obj.clickChartType[0] = "pieFusion";
				obj.clickChartType[1] = "columnFusion";
				obj.createTotalChart(leftChart,rightChart);
		}
		if (tabIdx === "2") {
				leftChart[0] = "pieFusion";
				leftChart[1] = gridListForAlarmStatistics.chartsTitle[3][0];
				rightChart[0] = "lineFusion";
				rightChart[1] = gridListForAlarmStatistics.chartsTitle[3][1];
				obj.clickChartType[0] = "pieFusion";
				obj.clickChartType[1] = "lineFusion";
				obj.createMonthChart(leftChart,rightChart);
		}
		if (tabIdx === "3") {
				leftChart[0] = "pieFusion";
				leftChart[1] = gridListForAlarmStatistics.chartsTitle[3][0];
				rightChart[0] = "columnFusion";
				rightChart[1] = gridListForAlarmStatistics.chartsTitle[3][1];
				obj.clickChartType[0] = "pieFusion";
				obj.clickChartType[1] = "columnFusion";
				this.createDayChart(leftChart,rightChart);
		}
	},
	getCurrentGridRow : function(data, rowindex, rowobj, chartsTitle) {
	  $("#resultTableDivForAlarmStatistics").find("div[class*=sumAllFromDatabaseStyle]").removeClass('sumAllFromDatabaseStyleSelected').addClass('sumAllFromDatabaseStyle');
		var obj = this;
		obj.chartCaption = chartsTitle;
		obj.chartVal = [];
		//取列中可自定义列的数据刷成图表展示
		var disTitle = new Array();
		var setVal = new Array();
		var columns = gridListForAlarmStatistics.grid.realGrid.options.columns;
		var gridColumnsLength = columns.length;
		for ( var i = 0; i < gridColumnsLength; i++) {
			if (columns[i].frozen == undefined) {
				disTitle.push(columns[i].display);
				setVal.push(data[columns[i].columns[0].name]);
				obj.getTitleName.push(columns[i].columns[0].name);
			} else if (columns[i].frozen) {
				var panelIdx = obj.getDisplayPanel();
				if (panelIdx == "1") {
					obj.monthTitle[0] = "corpId";
					obj.monthTitle[1] = data[obj.monthTitle[0]];
				} else if (panelIdx == "2") {
					obj.monthTitle[0] = "teamId";
					obj.monthTitle[1] = data[obj.monthTitle[0]];
				} else if (panelIdx == "3") {
					obj.monthTitle[0] = "vehicleNo";
					obj.monthTitle[1] = data[obj.monthTitle[0]];
				} else if (panelIdx == "4") {
					obj.monthTitle[0] = "lineId";
					obj.monthTitle[1] = data[obj.monthTitle[0]];
				}
			}
		}

//		if (displayChart.chartCorpName!=null && obj.chartCorpName == obj.monthTitle[1]) {
//			return;
//		}
		obj.chartCorpName = obj.monthTitle[1];
		obj.chartVal.push(disTitle);
		obj.chartVal.push(setVal);
		var leftChart = [];
		var rightChart = [];
		var tabIdx = obj.getTabIndex();
		if (tabIdx == "1") {
			leftChart[0] = "pieFusion";
			leftChart[1] = gridListForAlarmStatistics.chartsTitle[0][0];
			rightChart[0] = "columnFusion";
			rightChart[1] = gridListForAlarmStatistics.chartsTitle[0][1];
				obj.clickChartType[0] = "pieFusion";
				obj.clickChartType[1] = "columnFusion";
			obj.createTotalChart(leftChart, rightChart);
		} else if (tabIdx == "2") {
			leftChart[0] = "pieFusion";
			leftChart[1] = gridListForAlarmStatistics.chartsTitle[1][0];
			rightChart[0] = "lineFusion";
			rightChart[1] = gridListForAlarmStatistics.chartsTitle[1][1];
				obj.clickChartType[0] = "pieFusion";
				obj.clickChartType[1] = "lineFusion";
			obj.createMonthChart(leftChart, rightChart);
		} else if (tabIdx == "3") {
			leftChart[0] = "pieFusion";
			leftChart[1] = gridListForAlarmStatistics.chartsTitle[2][0];
			rightChart[0] = "columnFusion";
			rightChart[1] = gridListForAlarmStatistics.chartsTitle[2][1];
				obj.clickChartType[0] = "pieFusion";
				obj.clickChartType[1] = "columnFusion";
				obj.createDayChart(leftChart,rightChart);
		}
	},
	//汇总报表图表
	//参数 	pieTid:数组(饼图)  、columnTid:数组(柱状图)
	//0-标题，1-chartId
	createTotalChart : function(pieTid, columnTid) {
		var obj = this;
		obj.xmlData = "";
		obj.xmlData = obj.getXmlData();
		obj.createPieFusion(obj.xmlData, pieTid);
		obj.createColumnFusion(obj.xmlData, columnTid);
	},
	//月报表图表
	//参数 	pieTid:数组(饼图)  、lineTid:数组(线形图)
	//0-标题，1-chartId
	createMonthChart : function(pieTid, lineTid) {
		var obj = this;
		var panelIdx = obj.getDisplayPanel();
		obj.xmlData = "";
		obj.xmlData = obj.getMonthPieXmlData(panelIdx);
		obj.lineXmlData = "";
		obj.lineXmlData = obj.getMonthLineXmlData(panelIdx);
		obj.createPieFusion(obj.xmlData, pieTid);
		obj.createLineFusion(obj.lineXmlData, lineTid);
	},
	//日报表图表
	//参数 	pieTid:数组(饼图)  、columnTid:数组(柱状图)
	//0-标题，1-chartId
	createDayChart : function(pieTid, columnTid) {
		var obj = this;
		obj.xmlData == "";
		obj.xmlData = obj.getXmlData();
		obj.createPieFusion(obj.xmlData, pieTid);
		obj.createColumnFusion(obj.xmlData, columnTid);
	},

	createPieFusion : function(xmlData, pieTid) {
 		var chart = getChartFromId(pieTid[0]);
		 if(xmlData.indexOf('set')!=-1 ){
		 //  var str = "<chart caption='"+pieTid[1]+"' showNames='1' baseFont='Arial' baseFontSize ='12'  formatNumberScale='0' formatNumber='1' decimalPrecision='2' chartLeftMargin='5' chartRightMargin='5' chartTopMargin='5' chartBottomMargin='5'>";
			   var str = "<chart caption='"+pieTid[1]+"' hoverCapSepChar='：' showNames='1' baseFont='Arial' showPercentValues='1' showPercentInToolTip='0' numberSuffix ='次' baseFontSize ='12' formatNumberScale='0' formatNumber='1' chartLeftMargin='5' chartRightMargin='5' chartTopMargin='5' chartBottomMargin='5'>";
			 	 str = str + xmlData;
			 	 str = str + "</chart>";
			 	this.clickChartData[0] = xmlData;
			 	this.clickChartTitle[0] = pieTid[1];
			 	if (chart == null) {
	  				chart = new FusionCharts(
					 "script/fusionchart/Pie3D.swf", pieTid[0], "450", "290", "0", "0");
	  				chart.setDataXML(str);
					chart.render("leftChart");
			 	} else {
	 				updateChartXML(chart.id, str);
	 			}
		   } else {
			this.clickChartData[1] = "";
			$("#leftChart").html('');
			$("#leftChart").attr('style','width:570px;height:346px;border:white 1px solid; margin-left:0px; margin-top:0px; position:relative;');
 		}
		$("#leftImg").removeClass("btnNone").addClass("btnDisplay");
 	},
	createColumnFusion : function(xmlData, columnTid) {
			var chart = getChartFromId(columnTid[0]);
			 if(xmlData.indexOf('set')!=-1){
			 	// var str = "<graph caption='"+columnTid[1]+"' xAxisName='' yAxisName='' formatNumberScale='0' baseFont='Arial' baseFontSize ='12' canvasBaseColor='74bb45' chartLeftMargin='5' chartRightMargin='5' chartTopMargin='5' chartBottomMargin='5'>";
			 	 var str = "<graph caption='"+columnTid[1]+"' hoverCapSepChar='：' animation='0' numberSuffix='' xAxisName='' yAxisName='' decimalPrecision='0'  formatNumber='1' formatNumberScale='0' baseFont='Arial' baseFontSize ='12' canvasBaseColor='74bb45' chartLeftMargin='5' chartRightMargin='5' chartTopMargin='5' chartBottomMargin='5'>";
			 	 str = str + xmlData;
			 	 str = str + "</graph>";
			 	this.clickChartData[1] = xmlData;
			 	this.clickChartTitle[1] = columnTid[1];
				 	if (chart == null) {
				 		chart = new FusionCharts( "script/fusionchart/Column3D.swf", columnTid[0], "450", "290", "0", "0");
		  				chart.setDataXML(str);
						chart.render("rightChart");
		 			} else {
		 				updateChartXML(chart.id, str);
		 			}
 			  }else{
 				 this.clickChartData[1] = "";
		    	$("#rightChart").html('');
		        $("#rightChart").attr('style','background:url(images/global/no_data2.png) no-repeat; border:#aaccee 1px solid; width:450px; height:290px;');
	        	//$("#rightChart").html('<img src="images/global/no_data2.png" style="position:absolute;left:0px;top:0px;width:100%;height:100%;z-Index:-1; border:1px solid white"/>');
		}
		$("#rightImg").removeClass("btnNone").addClass("btnDisplay");
	},

	createLineFusion : function(xmlData, lineTid) {
 			var chart = getChartFromId(lineTid[0]);
			 if(xmlData.indexOf('set')!=-1){
			 	 var str = "<graph caption='"+lineTid[1]+"' hoverCapSepChar='：' bgColor='#FFFFFF' hovercapbg='FFECAA' hovercapborder='F47E00'  formatNumber='1'  formatNumberScale='0' rotateNames='1' slantLabels='1' decimalPrecision='2' showvalues='0' numdivlines='3' numVdivlines='0' yaxisminvalue='1000' yaxismaxvalue='1800'  rotateLabels='1' chartLeftMargin='5' chartRightMargin='5' chartTopMargin='5' chartBottomMargin='5'>";
			 	 str = str + xmlData;
			 	 str = str + "</graph>";
			 	this.clickChartData[1] = xmlData;
			 	this.clickChartTitle[1] = lineTid[1];
			 	if (chart == null) {
			 		chart = new FusionCharts("script/fusionchart/MSLine.swf",lineTid[0], "450", "290", "0", "0");
					 chart.setDataXML(str);
					 chart.render("rightChart");
	 			} else {
	 				updateChartXML(chart.id, str);
	 			}
 			   }else{
 				  this.clickChartData[1] = "";
			    $("#rightChart").html('</graph>');
		        $("#rightChart").attr('style','background:url(images/global/no_data2.png) no-repeat; border:#aaccee 1px solid; width:450px; height:290px;');
	        	//$("#rightChart").html('<img src="images/global/no_data2.png" style="position:absolute;left:0px;top:0px;width:100%;height:100%;z-Index:-1; border:1px solid white"/>');
		}
		$("#rightImg").removeClass("btnNone").addClass("btnDisplay");
	},
	getMonthData : function() {
		var obj = this;
		var gridData = $("#resultTableDivForAlarmStatistics")
				.ligerGetGridManager().getData();
		var rowsData = gridData;
		var monthRowsData = [];
		for ( var i = 0; i < rowsData.length; i++) {
			var curData = rowsData[i];
			if (curData[obj.monthTitle[0]] == obj.monthTitle[1]) {
				monthRowsData.push(curData);
			}
		}
		return monthRowsData;
	},
	getMonthPieXmlData : function() {
		var obj = this;
		var xmlData = "";
		var title = obj.chartVal[0];
		var chartData = obj.getMonthData();
		var totalData = [];
		for ( var j = 0; j < obj.getTitleName.length; j++) {
			var a = 0;
			for ( var i = 0; i < chartData.length; i++) {
				var rowsData = chartData[i];
				a = Number(a) + Number(rowsData[obj.getTitleName[j]]);
			}
			totalData.push(a);
		}
			obj.pieDataCounter = 0;
		for ( var i = 0; i < title.length; i++) {
				xmlData = xmlData + "<set label='"+title[i]+"' value='"+totalData[i]+"' color='"+leftPanelForAlarm.colorArray[i]+"'/>";
				obj.pieDataCounter += totalData[i];
				}
		return xmlData;
	},
	getMonthLineXmlData : function() {
		var obj = this;
		var xmlData = "";
		var title = obj.chartVal[0];
		var chartData = obj.getMonthData();
		var totalData = [];
		var category = [];
		for ( var i = 0; i < chartData.length; i++) {
			var a = [];
			for ( var j = 0; j < obj.getTitleName.length; j++) {
				var rowsData = chartData[i];
				category
						.push((rowsData.statYear + "年" + rowsData.statMonth + "月"));
				a.push(rowsData[obj.getTitleName[j]]);
			}
			totalData.push(a);
		}
		category = filterArrayRepeat(category);
		var categoryXml = "<categories>";
		var contentXml = "";
		for ( var i = 0; i < category.length; i++) {
			categoryXml = categoryXml + "<category name='" + category[i]
					+ "' />";
		}
		for ( var i = 0; i < title.length; i++) {
			contentXml = contentXml + "<dataset seriesName='" + title[i]
					+ "' anchorBorderColor='1D8BD1' anchorBgColor='1D8BD1'>";
			for ( var j = 0; j < totalData.length; j++) {
				contentXml = contentXml + "<set value='" + totalData[j][i]
						+ "' />";
			}
			contentXml = contentXml + "</dataset>";

		}
		categoryXml = categoryXml + "</categories>";
		xmlData = xmlData + categoryXml;
		xmlData = xmlData + contentXml;

		return xmlData;
	},
	getXmlData : function() {
		var obj = this;
		if (leftPanelForAlarm.chartVal[0] != undefined
				|| leftPanelForAlarm.chartVal[1] != undefined) {
			var xmlData = "";
			obj.title = leftPanelForAlarm.chartVal[0];
			obj.vals = leftPanelForAlarm.chartVal[1];
			for ( var i = 0; i < obj.title.length; i++) {
				xmlData = xmlData + "<set label='" + obj.title[i] + "' value='"
						+ obj.vals[i] + "' color='"
						+ leftPanelForAlarm.colorArray[i] + "'/>";
			}
			return xmlData;
		}
		return obj.xmlData;
	},
	updateChart : function(domId, dataXml) {
		updateChartXML(domId, dataXml);
	},
	bindChartEvent : function() {//绑定弹出图表窗口事件
		var obj = this;
		$("#wok").click(function() {
			obj.showPopChart();
		});
	},
		showPopChart : function(chartType){
		$("#mainWorkArea").A_Window({
			dragabId : 'mainWorkArea', // 可拖动的范围
			id : 'clickChart',
			width : 800, // 宽度
			height : 500,// 高度
			load_fn : function() {
				$("#closeCustomColumnDiv").click(function() {
					$("#mainWorkArea").close_ALL_Window();
				});
			},
			url : 'model/safetymanagement/alarmStatistics/openCharts.jsp'
		});
	},
	bindBigChartEvent : function() {
		var obj = this;
			$("#leftImg > img").click(function(){
				obj.clickChartImg = "left";
				obj.showPopChart();
			});
			$("#rightImg > img").click(function(){
				obj.clickChartImg = "right";
				obj.showPopChart();
			});
	},
    //下拉框事件,车辆查询结果
    resultEvent : function(){
    	var obj = this;
    	$("select[id=vehicleResult]:visible").change(function(){
    		var vid = $(this).val();
			var resultArr = $(this).data("searchArr");
			$.each(resultArr.Rows,function(idx,node){
                if (node.vid==vid){
                	obj._searchDataNodeByTreeDataIndex(node.entId,vid);
                	return false;
                }
	   		});
    	});
    }
};
       function divOffset(liId,vehicleNo){
         	var tmpNode = $("ul[id=panelCon3]:visible").find("li[id="+liId+"]:contains('"+vehicleNo+"')");
    		$("ul[id=panelCon3]:visible").scrollTop(0);
    		$("ul[id=panelCon3]:visible").find("div[class*=l-checkbox-checked]").removeClass("l-checkbox-checked").addClass("l-checkbox-unchecked");
    		$("ul[id=panelCon3]:visible").find("div[class*=l-checkbox-incomplete]").removeClass("l-checkbox-incomplete").addClass("l-checkbox-unchecked");
        	if(tmpNode != null && tmpNode != undefined){
        		var arr = $(tmpNode[0]).offset();
	        	$("ul[id=panelCon3]:visible").scrollTop(arr.top-280);
	        	var removeClassNode = $("ul[id=panelCon3]:visible").find("div[class*=searchBk]");
	        	$(removeClassNode[0]).removeClass("searchBk");
        		$(tmpNode[0]).children().addClass("searchBk");
        		$("ul[id=panelCon3]:visible").find("div[class*=l-checkbox-checked]").click();
        		$(tmpNode[0]).find("div[class*=l-checkbox]").click();
        	}
        };
var leftPanelForAlarm = new leftPanelForAlarm();
$(document).ready(function() {
	leftPanelForAlarm.bindPanelEvent();
//	leftPanelForAlarm.bindPanelVehicleEvent();
	leftPanelForAlarm.bindBigChartEvent();
//	leftPanelForAlarm.bindResultEvent();
//	leftPanelForAlarm.bindClearResult();
//	leftPanelForAlarm.bindSearchDivFloat();
});