var newLeftPanel = function(){
	this.version = "";
	this.mainContainer = 'homeLeftDiv'; //包含此对象的div的id
	this.firstUrl = "operationmanagement/findOrgTreeLikeEntName.action";
	this.secondUrl = "";
	this.threeUrl = "";
	this.fourUrl = "operationmanagement/findGroupEntClassline.action?entId="+KCPT.user.entId;
	this.selectedTeamNodes = null;
	this.init();
};

newLeftPanel.prototype = {
		init : function(){
    		this.load();
		},
		//falg 表示获取的值是否过滤
		// 1/true：过滤,
		// 0/false ： 不过滤
		getGroupId : function(flag){//获取组织ID
 			var obj = this;
			var panelIdx = obj.getDisplayPanel();
			var tabId = $("#statTypeForUnsafeDriving").val();//获取页面打开的tab页签
			var arr = "";
			if(panelIdx == "1"){
				if(tabId == "1"){
					 $("#statType").val("1");
				}else if(tabId == "2"){
					 $("#statType").val("2");
				}else if(tabId == "3"){
					 $("#statType").val("3");
				}
			}
			if(panelIdx != "3" && panelIdx != "2"){
			  arr = obj.getCheckSelect("group",flag);
			}
			return arr;
		},
		//flag 表示获取的值是否过滤
		// 1/true：过滤,
		// 0/false ： 不过滤
		getFleetId : function(flag){//获取车队ID
 			var obj = this;
			var panelIdx = obj.getDisplayPanel();
			var tabId = $("#statTypeForUnsafeDriving").val();//获取页面打开的tab页签
			var arr = "";
			if(panelIdx == "2"){
				if(tabId == "1"){
					 $("#statType").val("4");
				}else if(tabId == "2"){
				     $("#statType").val("5");
				}else if(tabId == "3"){
					 $("#statType").val("6");
				}
			}
			if(panelIdx == "2" || panelIdx=="3"){
				arr = obj.getCheckSelect("fleet",flag);
			}
			return arr;
		},
		//falg 表示获取的值是否过滤
		// 1/true：过滤,
		// 0/false ： 不过滤
		getVehicleId : function(flag){//获取车辆ID
 			var obj = this;
			var panelIdx = obj.getDisplayPanel();
			var tabId = $("#statTypeForUnsafeDriving").val();//获取页面打开的tab页签
			var arr = "";
			if( panelIdx == "3"){
				if(tabId == "1"){
			       $("#statType").val("7");
				}else if(tabId == "2"){
					$("#statType").val("8");
				}else if(tabId == "3"){
				   $("#statType").val("9");
				}
				arr = obj.getCheckSelect("vehicle",flag);
			}
			return arr;
		},
		//falg 表示获取的值是否过滤
		// 1/true：过滤,
		// 0/false ： 不过滤
		getWayLineId : function(flag){//获取线路ID
			var obj = this;
			var panelIdx = obj.getDisplayPanel();
			var tabId = $("#statTypeForUnsafeDriving").val();//获取页面打开的tab页签
			var arr = "";
			if(panelIdx == "4"){
				if(tabId == "1"){
					$("#statType").val("10");
				}else if(tabId == "2"){
					$("#statType").val("11");
				}else if(tabId == "3"){
				 	$("#statType").val("12");
				}
				arr = obj.getCheckSelect("wayLine",flag);
			}
			return arr;
		},
		load : function(){
			$("#accordion1").ligerAccordion({ changeHeightOnResize : true,speed : null});
			var obj = this;
			obj.setFirst(obj);
 		},
		setFirst : function(o){
			//var a = $("#panelCon1").html();
				$("#panelCon1").ligerTree({
					url : 'operationmanagement/findOrgTreeOnlyCorp.action',
					onSuccess : function(){
						//o.selectNode("1",true);
						//$("#searchForButton").trigger('click');
					},
					checkbox : true,
					isCheckAll : true,
					childType : 'entType',
					treeFilter : true
				});
				o.treeOneManager = $("#panelCon1").ligerGetTreeManager();
		},
		setSecond : function(o){
		//	var a = $("#panelCon2").html();
				$("#panelCon2").ligerTree({
					url: 'operationmanagement/findOrgTree.action',
					onSuccess : function(data,curnode,param){
						//o.selectNode("2",true);
					},
					checkbox : true,
					childType : 'entType'
				});
				o.treeTwoManager = $("#panelCon2").ligerGetTreeManager();
		},
		setThree : function(o){
			var treeClick = "treeClick";
				$("#panelCon3").ligerTree({
					url: 'operationmanagement/findOrgTree.action',
					onBeforeExpand : function(note){
						o.treeClick(note);
					},
					onSuccess : function(){
						//o.selectNode("3",true);
						o.leafCoverFolder();
					},
					checkbox : true,
					childType : 'entType'
				});
				o.treeTreeManager = $("#panelCon3").ligerGetTreeManager();
		},
		setFour : function(o){
				$("#panelCon4").ligerTree({
					url: 'operationmanagement/findCorpAndLineTree.action',
					onSuccess : function(){
						//o.selectNode("4",true);
					},
					checkbox : true,
					childType : 'entType'
				});
				o.treeFourManager = $("#panelCon4").ligerGetTreeManager();
		},
		setFive : function(o){
			$("#panelCon5").ligerTree({
				url: 'operationmanagement/findOrgTree.action',
				onSuccess : function(){
					//o.selectNode("5",true);
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
			$(treeSecond).ligerTree({
				url : obj.options.secondTabUrl,
				onClick : treeClick,
				checkbox : false,
				data:{"tabFlag":2},
				clickScope : obj.options.SecondclickScope ? obj.options.SecondclickScope : obj
			});

			obj.SecondTreeManager = $(treeSecond).ligerGetTreeManager();
		},
		activePanel : function(pv){//子面板点击事件
		},
		bindPanelVehicleEvent : function(){
			var obj = this;
			var url = "operationmanagement/findVehicleForThreeTab.action?vehicleState=2";
 			obj.clearResult(false);
			$("#searchThree").click(function(){
 				$("#panel3 > ul > div[class*=l-checkbox-checked]").click();
				var vehicleNo = $("#threeSearchInput").val();
	 			 vehicleNo=trim(vehicleNo);
				if(vehicleNo.length < 3){
							$.ligerDialog.alert('请最少输入三位车牌号!', '提示', 'warn');
					return ;
				}
				$.ajax({
				   type: 'post',
				   url: url,
				   data: 'tabFlag=3&rows=10000&requestParam.like.vehicleNo='+vehicleNo,
				   success: function(col){
				   		leftPanel.searchArr = eval("data="+col);
				   		if(leftPanel.searchArr.Rows.length == 0){
				   			$.ligerDialog.alert('没有找到相关车辆!', '提示', 'warn');
				   			return ;
				   		}
//				   		if(leftPanel.searchArr.Rows.length != 0){
//				   			$("#resultOper").removeClass("btnNone");
//					   		obj.findVehicleNoHC(col);
//				   		}
				   		if(leftPanel.searchArr.Rows.length != 0){
				   			leftPanel.bindResultEvent();
							leftPanel.bindClearResult();
							leftPanel.resultEvent();
					   		obj.findVehicleNoHC(col);
					   		//设置查询出的车辆结果填入下拉列表中
					   		var selResultObj = $("select[id=vehicleResult]:visible");
				   			selResultObj.removeAttr("disabled");
				   			selResultObj.empty();
				   			selResultObj.data("searchArr",leftPanel.searchArr);
				   			$.each(leftPanel.searchArr.Rows,function(idx,node){
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
		bindPanelEvent : function(){//绑定子面板点击事件
			var obj = this;
			 $('div.l-accordion-header').each(function(i) {
		        $(this).bind('click',function(){
		        	obj.activePanel(this);
 		        	var idx = Number(i)+1;
		        	$("#latitudeForUnsafeDriving").val(idx);
		        	if(idx == "2"){
    					obj.setSecond(obj);
		        	}else if(idx == "3"){
						obj.setThree(obj);
						leftPanel.bindPanelVehicleEvent();
						var panelContextObj = $("ul[id=panelCon3]:visible");
						//计算高度
						var hgt = 260;
						if (obj.getPosition(panelContextObj)){
							hgt=$(window).height()-obj.getPosition(panelContextObj)-50-20;
						}
						panelContextObj.css("overflow","auto").css("height",hgt+"px");
		        	}else if(idx == "4"){
						obj.setFour(obj);
		        	}else if(idx == "5"){
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
		treeSearchUp : function(idx){
			var obj = this;
			var resultArr = leftPanel.searchArr;
			var manager = obj.treeTreeManager;
			data = manager.getData();
			if(leftPanel.resultIdx > 0){
				leftPanel.resultIdx = Number(idx);
				obj._getDataNodeByTreeDataIndex(data[0].childrenList,resultArr.Rows[leftPanel.resultIdx]);
				obj.searchSel(resultArr.Rows[leftPanel.resultIdx].vid,resultArr.Rows[leftPanel.resultIdx].vehicleNo);
			}
		},
		//查询结果下移一位
		treeSearchDown : function(idx){
			var obj = this;
			var resultArr = leftPanel.searchArr;
			var manager = obj.treeTreeManager;
			data = manager.getData();
			if(leftPanel.resultIdx < resultArr.Rows.length-1){
				leftPanel.resultIdx = Number(idx);
				obj._getDataNodeByTreeDataIndex(data[0].childrenList,resultArr.Rows[leftPanel.resultIdx]);
				obj.searchSel(resultArr.Rows[leftPanel.resultIdx].vid,resultArr.Rows[leftPanel.resultIdx].vehicleNo);
			}
		},
		//清除查询车辆查询结果
		clearResult : function(flag){
//			leftPanel.searchArr = [];
//			var heightNode = $("#panel3").find("div[class*=searchBk]");
//			$("#threeSearchInput").val("");
// 			$(heightNode[0]).removeClass("searchBk");
//			$("#resultOper").addClass("btnNone");
			leftPanel.searchArr = [];
			var heightNode = $("ul[id=panel3]:visible").find("div[class*=searchBk]").removeClass("searchBk");
			if(flag){
				$("input[id=threeSearchInput]:visible").val("车牌号");
			}
 			var selResultObj = $("select[id=vehicleResult]:visible");
   			selResultObj.attr("disabled",true);
   			selResultObj.empty();
		},
		bindClearResult : function(){
			var obj = this;
			$("#clearResult").click(function(){
				obj.clearResult(true);
			});
		},
		bindResultEvent : function(){
			var obj = this;
			$("#resultUp").click(function(){
				obj.treeSearchUp();
			});
			$("#resultDown").click(function(){
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
			newLeftPanel.resultIdx = 0;
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
		_getDataNodeByTreeDataIndex: function (data,subNodes)
        {
        	var obj = this;
        	var entId = subNodes.entId;
            for (var i = 0; i < data.length; i++)
            {
            	if(data[i].childrenList != ""){
					this._getDataNodeByTreeDataIndex(data[i].childrenList,subNodes);
            	}else{
		            if (data[i].id == entId){//data[i].id
						var tmpNode = $("#panelCon3").find("li[id="+entId+"]");
			          	var dvNodes = $(tmpNode).find("div[class*=l-expandable-close]");
						$(dvNodes[0]).click();//点击“+”号展开节点
						obj.treeStepExpand(tmpNode);
		            }
            	}
            }
            return true;
        },
        //展开节点
        treeStepExpand : function(treeNode){
        	var obj = this;
			var manager = obj.treeTreeManager;
			var treeLevel = $(treeNode).attr("outlinelevel");
			if(treeLevel == "1"){
				return true;
			}
			var parentNode = manager.getParentTreeItem(treeNode, treeLevel-1);
			var dvNodes = $(parentNode).find("div[class*=l-expandable-close]");
			$(dvNodes[0]).click();
			this.treeStepExpand(parentNode, $(parentNode).attr("outlineLevel")-1);
        },
        //查询结果选中高亮状态
        searchSel : function(liId,vehicleNo){
         	 setTimeout("divOffset("+liId+",'"+vehicleNo+"')",1000);
        },
		getDisplayPanel : function(){//获取哪一个查询面板是显示状态
			var arrs = $("ul[id^=panelCon]:visible");
			var id = $(arrs[0]).attr("id");
			var idx = "";
			if(id == "panelCon1"){
				idx = "1";
			}else if(id == "panelCon2"){
				idx = "2";
			}else if(id == "panelCon3"){
				idx = "3";
			}else if(id == "panelCon4"){
				idx = "4";
			}else if(id == "panelCon5"){
				idx = "5";
			}
			return idx;
		},
		getManager : function(idx){//获取需要操作树的管理器
			var obj = this;
			var manager = "";
			if(idx == '1'){
				manager = obj.treeOneManager;
			}else if(idx == '2'){
				manager = obj.treeTwoManager;
			}else if(idx == '3'){
				manager = obj.treeTreeManager;
			}else if(idx == '4'){
				manager = obj.treeFourManager;
			}else if(idx == '5'){
				manager = obj.treeFiveManager;
			}
			return manager;
		},
		//获取打勾的复选框节点ID
		// 1: 获取组织节点ID
		//2：获取车队ID
		//3：获取车辆ID
		//4：获取线路ID
		getCheckSelect : function(tx,flag){
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
            for (var i = 0; i < notes.length; i++)
            {
            	var entType = "";
            	try{
            		entType = notes[i].data.nodeType ? notes[i].data.nodeType : "";
            	}catch(e){entType = "3";}//在获取不到节点属性nodeType 的情况下，该方法是获取 车辆 ID
				if((tx == "group" && entType == "1") ||
					(tx == "fleet" && entType == "2") ||
					(tx == "wayLine" && entType == "4")){
					if(tmpEntType != entType){
						continue;
					}
					if(flag){
						var d = $(notes[i].target).find("div[class*=l-checkbox-incomplete]");//获取该车辆所在车队，是否半选
						if(d.length != 0){
							continue ;
						}
					}
					if(str.length != 0 ){
						str = str + "," + notes[i].data.id;
					}else{
						str = notes[i].data.id;
					}
				}else if(tx == "vehicle" && entType == "3"){
					//车辆 为懒加载数据，tree.data中无法获取到jquery对象，自获取target-DOM对象获取ID
					if(flag){
						var parentNode = $(notes[i].target).parent().parent();
						var d = $(parentNode).find("div[class*=l-checkbox-incomplete]");//获取该车辆所在车队，是否半选
						if(d.length == 0){
						 continue;
						}
					}
					if(str.length != 0){
						str = str + "," + $(notes[i].target).attr("id");
					}else{
						str = $(notes[i].target).attr("id");
					}
				}
            }
            return str;
		},
		// 树节点点击事件
		treeClick : function(note) {
			try{
				var dix = leftPanel.getDisplayPanel();
				var manager = leftPanel.getManager(dix);
				var id = note.data.id;
				var entType = note.data.entType;
				var nodeType = note.data.nodeType;
				if(entType == "2"){
					if(dix == "3"){
						if (note.data.childrenList=="" && nodeType == "2"){
							var tg = note.target;
							if($(tg).attr("flag") == "1"){
								return ;
							}
							$(tg).attr("flag","1");
							var url = 'operationmanagement/findVehicleNodesOfTeam.action?teamId='+id;
							leftPanel.ajaxTreeNode(url,note,id,manager,dix);
						}
					}else if(dix == "4"){
						if (note.data.childrenList=="" && nodeType == "2"){
							var tg = note.target;
							if($(tg).attr("flag") == "1"){
								return ;
							}
							$(tg).attr("flag","1");
							var url = "operationmanagement/findCorpAndLineTree.action";
							leftPanel.ajaxTreeNode(url,note,id,manager,dix);
						}
					}
				}
			}catch(e){return ;}
		},
		selectNode : function (idx,flag)
	    {
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
 			if (flag) {
				$(a[0]).click();
			}
	    },
	    leafCoverFolder : function(){
	    	$("#panelCon3").find("div[class*=l-note]").removeClass("l-note").addClass("l-expandable-close");
	    },
	    addTreeNode : function(note,nodes,manager){
	    	manager.append(note.target,eval(nodes));
	    },
	    ajaxTreeNode : function(url,note,id,manager,idx){
	    	$.ajax({
			   type: 'post',
			   url: url,
			   data: '',
			   aysnc : false,
			   success: function(col){
					leftPanel.addTreeNode(note,col,manager);
					leftPanel.selectNode(idx,false);
					leftPanel.selectSubNodeAll(note.target);
			   }
			});
	    },
	    selectSubNodeAll : function(parentNode){
	    	var isHave = $(parentNode).find("div[class*=l-checkbox-checked]");
	    	if(isHave.length > 0){
	    		$(parentNode).find("div[class*=l-checkbox-unchecked]").removeClass("checkbox-unchecked").addClass("l-checkbox-checked");
	    	}
	    },
	    getTabIndex : function(){
	    	var disTab = $("#unsafeDrivingTabTool").find("li[class=selectTag]");
			var htmlTxt = $(disTab[0]).text();
			if(htmlTxt == "汇总表"){
				return "1";
			}else if(htmlTxt == "月报表"){
				return "2";
			}else if(htmlTxt == "日报表"){
				return "3";
			}
	    },
	    createFirstChart : function (data,chartsTitle){
//	   	 $("#resultTableDivForUnsafeDriving").find("tr[class*=l-grid-row l-grid-row-alt l-selected]").removeClass('l-selected');
// 		 $("#resultTableDivForUnsafeDriving").find("tr[class*=l-grid-row l-selected]").removeClass('l-selected');
//  		 $("#resultTableDivForUnsafeDriving").find("div[class*=sumAllFromDatabaseStyle]").removeClass('sumAllFromDatabaseStyle').addClass('sumAllFromDatabaseStyleSelected');
	    	var obj = this;
	    	displayChart.chartCaption = chartsTitle;
			displayChart.chartVal = [];
	    	//取列中可自定义列的数据刷成图表展示
	    	var disTitle = new Array();
	    	var setVal = new Array();
 			var columns = gridListForUnsafeDriving.grid.realGrid.options.columns;
 			var gridColumnsLength=columns.length;
			for(var i = 0; i < gridColumnsLength; i++){
				if(columns[i].frozen == undefined){
					disTitle.push(columns[i].display);
					setVal.push(data[columns[i].columns[0].name]);
					displayChart.getTitleName.push(columns[i].columns[0].name);
				}else if(columns[i].frozen){
					var panelIdx = obj.getDisplayPanel();
					if(panelIdx == "1"){
						displayChart.monthTitle[0] = "corpId";
						displayChart.monthTitle[1] = data[displayChart.monthTitle[0]];
					}else if(panelIdx == "2"){
						displayChart.monthTitle[0] = "teamId";
						displayChart.monthTitle[1] = data[displayChart.monthTitle[0]];
					}else if(panelIdx == "3"){
						displayChart.monthTitle[0] = "vehicleNo";
						displayChart.monthTitle[1] = data[displayChart.monthTitle[0]];
					}else if(panelIdx == "4"){
						displayChart.monthTitle[0] = "lineId";
						displayChart.monthTitle[1] = data[displayChart.monthTitle[0]];
					}
				}
			}
			displayChart.chartCorpName = displayChart.monthTitle[1];
			displayChart.chartVal.push(disTitle);
			displayChart.chartVal.push(setVal);
			var leftChart = [];
			var rightChart = [];
			var tabIdx = obj.getTabIndex();
			if(tabIdx === "1"){
				leftChart[0] = "pieFusion";
				leftChart[1] = chartsTitle[3][0];
				rightChart[0] = "columnFusion";
				rightChart[1] = chartsTitle[3][1];
				displayChart.clickChartType[0] = "pieFusion";
				displayChart.clickChartType[1] = "columnFusion";
				displayChart.createTotalChart(leftChart,rightChart);
			}
			if(tabIdx === "2"){
				leftChart[0] = "pieFusion";
				leftChart[1] = chartsTitle[3][0];
				rightChart[0] = "lineFusion";
				rightChart[1] = chartsTitle[3][1];
				displayChart.clickChartType[0] = "pieFusion";
				displayChart.clickChartType[1] = "lineFusion";
				displayChart.createMonthChart(leftChart,rightChart);
			}
			if(tabIdx === "3"){
				leftChart[0] = "pieFusion";
				leftChart[1] = chartsTitle[3][0];
				rightChart[0] = "columnFusion";
				rightChart[1] = chartsTitle[3][1];
				displayChart.clickChartType[0] = "pieFusion";
				displayChart.clickChartType[1] = "columnFusion";
				displayChart.createDayChart(leftChart,rightChart);
			}
	    },
		getCurrentGridRow : function(data,rowindex,rowobj,chartsTitle){
	  	  $("#resultTableDivForUnsafeDriving").find("div[class*=sumAllFromDatabaseStyle]").removeClass('sumAllFromDatabaseStyleSelected').addClass('sumAllFromDatabaseStyle');
	    	var obj = this;
	    	displayChart.chartCaption = chartsTitle;
			displayChart.chartVal = [];
	    	//取列中可自定义列的数据刷成图表展示
	    	var disTitle = new Array();
	    	var setVal = new Array();
			var columns = gridListForUnsafeDriving.grid.realGrid.options.columns;
 			var gridColumnsLength=columns.length;
			for(var i = 0; i < gridColumnsLength; i++){
				if(columns[i].frozen == undefined){
					disTitle.push(columns[i].display);
					setVal.push(data[columns[i].columns[0].name]);
					displayChart.getTitleName.push(columns[i].columns[0].name);
				}else if(columns[i].frozen){
					var panelIdx = obj.getDisplayPanel();
					if(panelIdx == "1"){
						displayChart.monthTitle[0] = "corpId";
						displayChart.monthTitle[1] = data[displayChart.monthTitle[0]];
					}else if(panelIdx == "2"){
						displayChart.monthTitle[0] = "teamId";
						displayChart.monthTitle[1] = data[displayChart.monthTitle[0]];
					}else if(panelIdx == "3"){
						displayChart.monthTitle[0] = "vehicleNo";
						displayChart.monthTitle[1] = data[displayChart.monthTitle[0]];
					}else if(panelIdx == "4"){
						displayChart.monthTitle[0] = "lineId";
						displayChart.monthTitle[1] = data[displayChart.monthTitle[0]];
					}
				}
			}
			displayChart.chartCorpName = displayChart.monthTitle[1];
			displayChart.chartCorpId = data["corpId"];
			displayChart.chartVal.push(disTitle);
			displayChart.chartVal.push(setVal);
			var leftChart = [];
			var rightChart = [];
			var tabIdx = obj.getTabIndex();
			if(tabIdx == "1"){
				leftChart[0] = "pieFusion";
				leftChart[1] = chartsTitle[0][0];
				rightChart[0] = "columnFusion";
				rightChart[1] = chartsTitle[0][1];
				displayChart.clickChartType[0] = "pieFusion";
				displayChart.clickChartType[1] = "columnFusion";
				displayChart.createTotalChart(leftChart,rightChart);
			}
			else if(tabIdx == "2"){
				leftChart[0] = "pieFusion";
				leftChart[1] = chartsTitle[1][0];
				rightChart[0] = "lineFusion";
				rightChart[1] = chartsTitle[1][1];
				displayChart.clickChartType[0] = "pieFusion";
				displayChart.clickChartType[1] = "lineFusion";
				displayChart.createMonthChart(leftChart,rightChart);
			}
			else if(tabIdx == "3"){
				leftChart[0] = "pieFusion";
				leftChart[1] = chartsTitle[2][0];
				rightChart[0] = "columnFusion";
				rightChart[1] = chartsTitle[2][1];
				displayChart.clickChartType[0] = "pieFusion";
				displayChart.clickChartType[1] = "columnFusion";
				displayChart.createDayChart(leftChart,rightChart);
			}
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
        		$(tmpNode[tmpNode.length-1]).children().addClass("searchBk");
	        	$("ul[id=panelCon3]:visible").find("div[class*=l-checkbox-checked]").click();
	        	$(tmpNode[tmpNode.length-1]).find("div[class*=l-checkbox]").click();
        	}
        };
        var leftPanel = "";
        var displayChart = "";
    	leftPanel = new newLeftPanel();
        displayChart = new generalChart(leftPanel,"resultTableDivForUnsafeDriving","");
        displayChart.setUnit("次");
$(document).ready(function() {
	leftPanel.bindPanelEvent();
//	leftPanel.bindPanelVehicleEvent();
//	leftPanel.bindResultEvent();
//	leftPanel.bindClearResult();
//	leftPanel.bindSearchDivFloat();
    displayChart.bindBigChartEvent();
    KCPT.LeftPanelTree = leftPanel;
    KCPT.openFusionChart = displayChart;
  });