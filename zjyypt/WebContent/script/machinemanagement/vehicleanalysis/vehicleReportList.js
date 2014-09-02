var vehicleReportList = function() {
	this.version = "create by cuisong in 2011.10.14";
	this.resultIdx = 0;
	this.selectedTeamNodes = null;
	this.VREPORT_C = false;//生成
	this.VREPORT = false;//删除
	this.VREPORT_L = false;//预览
	this.VREPORT_D = false;//下载
};
var leftShrinkhidden=0;
var startVrIr = 0;
var unsafeDrivingFrameConigs= {
	  htmlElements : {
		  mainContainer : "vehicleReportMain",
		  leftContainer : "vehicleReportLeftNavigation",
		  searchFromId : "searchFormForVehicleReport",
		  leftShrink: "vehicleReportLeftLeftShrink",
		  rightContainer : "vehicleReportRightCenter",
		  rightCenterMainArea :"rightCenterMainArea",
		  rightFormContainer : "unsafeDrivingFormArea"
	  }
};
vehicleReportList.prototype = {
	//隐藏其它功能左侧树
//	 hiddenLeftTree : function() {
////		var obj = this;
//		vehiclerport.leftTree = KCPT.root.leftTree;
//		try{
//			vehiclerport.leftTree.hide();
//		}catch(e){
//			//alert(e.message);
//		}
//	 },
	//初始化处理
     init:function(){
//    	var obj = this;
    	//vehiclerport.hiddenLeftTree();
//		var obj = this;
		//vehiclerport.setThree(vehiclerport);
		//vehiclerport.bindPanelVehicleEvent();
		//vehiclerport.bindResultEvent();
		//vehiclerport.bindClearResult();
    	//vehiclerport.bindSearchDivFloat();
    	
    	//$("#accordionMain").ligerAccordion({ changeHeightOnResize : false,speed : 'normal'});
    },
    bindPanelVehicleEvent : function(){
		var url = "operationmanagement/findVehicleForThreeTab.action";
		$("#searchThreeVr").click(function(){
			var vehicleNo = $("#threeSearchInputDcVr").val();
			vehicleNo=trim(vehicleNo);
			if(vehicleNo.length < 3){
				$.ligerDialog.alert('请最少输入三位车牌号!', '提示', 'warn');
				return ;
			}
			var manager = vehiclerport.treeTreeManager;
			manager.collapseAll();//全部折叠
			$.ajax({
			   type: 'post',
			   url: url,
			   data: 'tabFlag=3&rows=10000&requestParam.like.vehicleNo='+vehicleNo,
			   success: function(col){
				   vehiclerport.searchArr = eval("data="+col);
				   if(vehiclerport.searchArr.Rows.length != 0){
					   $("#resultOperDcVr").removeClass("btnNone");
					   $("#TreeContineDiv").css("padding-top","30px");
					   vehiclerport.findVehicleNoHC(col);
				   }
			   }
			});
		});
	},
	//清除查询车辆查询结果
	clearResult : function(){
		vehiclerport.searchArr = [];
		var heightNode = $("div[id=vrPanel3]:visible").find("div[class*=searchBk]");
		$("div[class=panelSearch]:visible > input[id=threeSearchInputDcVr]")[0].value="";
		$(heightNode[0]).removeClass("searchBk");
		$("span[id=resultOperDcVr]:visible").addClass("btnNone");
		$("#TreeContineDiv").css("padding-top","5px");
	},
	bindClearResult : function(){
		var obj = this;
		$("#clearResultDcVr").click(function(){
			obj.clearResult();
		});
	},
	bindResultEvent : function(){
    	var obj = this;
		$("#resultUpDcVr").click(function(){
			obj.treeSearchUp();
		});
		$("#resultDownDcVr").click(function(){
			obj.treeSearchDown();
		});
	},
	//查询结果上移一位
	treeSearchUp : function(){
		var obj = this;
		var resultArr = vehiclerport.searchArr;
		var manager = obj.treeTreeManager;
		data = manager.getData();
		if(vehiclerport.resultIdx > 0){
			vehiclerport.resultIdx = Number(vehiclerport.resultIdx)-1;
			obj._getDataNodeByTreeDataIndex(data[0].childrenList,resultArr.Rows[vehiclerport.resultIdx]);
			obj.searchSel(resultArr.Rows[vehiclerport.resultIdx].vid);
		}
	},
	//查询结果下移一位
	treeSearchDown : function(){
		var obj = this;
		var resultArr = vehiclerport.searchArr;
		var manager = obj.treeTreeManager;
		data = manager.getData();
		if(vehiclerport.resultIdx < resultArr.Rows.length-1){
			vehiclerport.resultIdx = Number(vehiclerport.resultIdx)+1;
			obj._getDataNodeByTreeDataIndex(data[0].childrenList,resultArr.Rows[vehiclerport.resultIdx]);
			obj.searchSel(resultArr.Rows[vehiclerport.resultIdx].vid);
		}
	},
	bindSearchDivFloat : function(){
		$("div[id=vrPanel3]").scroll(function(){
			var offsetTop = $(this).scrollTop();
			var offsetLeft = $(this).scrollLeft();
			$("div[id=vrPanel3]").find("div[class=panelSearch]").css("top",offsetTop-1+"px");
			$("div[id=vrPanel3]").find("div[class=panelSearch]").css("left",offsetLeft-1+"px");
		});
	},
	findVehicleNoHC : function(vehicleArr){
//		var obj = this;
		var RowsArr = eval("data="+vehicleArr);
		var manager = vehiclerport.treeTreeManager;
		var data = manager.getData();
		vehiclerport.resultIdx = 0;
		vehiclerport._getDataNodeByTreeDataIndex(data[0].childrenList,RowsArr.Rows[0]);
		vehiclerport.searchSel(RowsArr.Rows[0].vid);
	},
	//查找结果中的车辆，并展开节点
	_getDataNodeByTreeDataIndex: function (data,subNodes)
    {
//    	var obj = this;
    	var manager = vehiclerport.treeTreeManager;
    	var entId = subNodes.entId;
        for (var i = 0; i < data.length; i++)
        {
        	if(data[i].childrenList != ""){
        		vehiclerport._getDataNodeByTreeDataIndex(data[i].childrenList,subNodes);
        	}else{
	            if (data[i].id == entId){//data[i].id
					var tmpNode = $("#panelConVr3").find("li[id="+entId+"]");
		          	var dvNodes = $(tmpNode).find("div[class*=l-expandable-close]");
					$(dvNodes[0]).click();//点击“+”号展开节点
					vehiclerport.treeStepExpand(tmpNode);
	            }
        	}
        }
        return true;
    },
  //展开节点
    treeStepExpand : function(treeNode){
//    	var obj = this;
		var manager = vehiclerport.treeTreeManager;
		var treeLevel = $(treeNode).attr("outlinelevel");
		if(treeLevel == "1"){
			return true;
		}
		var parentNode = manager.getParentTreeItem(treeNode, treeLevel-1);
		var dvNodes = $(parentNode).find("div[class*=l-expandable-close]");
		$(dvNodes[0]).click();
		vehiclerport.treeStepExpand(parentNode, $(parentNode).attr("outlineLevel")-1);
    },
  //查询结果选中高亮状态
    searchSel : function(liId){
    	setTimeout("divOffset("+liId+")",1000);
    },
    setThree : function(o){
		var treeClick = "treeClick";
		//var firstVal = $("#threeSearchInput").val();
		$("#panelConVr3").ligerTree({
			url: 'operationmanagement/findOrgTree.action',
			onBeforeExpand : function(note){
				o.treeClick(note);
			},
			onSuccess : function(){
				o.selectNode("3",true);
				o.leafCoverFolder();
			},
			checkbox : true,
			childType : 'entType'
		});
		o.treeTreeManager = $("#panelConVr3").ligerGetTreeManager();
	},
	// 树节点点击事件
	treeClick : function(note) {
		try{
			var dix = "3";
			var manager = vehiclerport.getManager(dix);
			var id = note.data.id;
			var tmpNode = $("#panelConVr3").find("li[id="+id+"]");
			var olevel = $(tmpNode).attr("outlinelevel");
			if(olevel > 6) {
				if(olevel == 6) {
					$("#TreeContineDiv").css("width","360px");
				}
				if(olevel == 9) {
					$("#TreeContineDiv").css("width","400px");
				}
				if(olevel == 12) {
					$("#TreeContineDiv").css("width","420px");
				}
			}else {
				$("#TreeContineDiv").css("width","320px");
			}
			//获得选中节点的标签值
//			var val = $("#"+id+" :nth-child(1) >span").html();
//			alert(val);
//			alert($("#"+id).html());
			var entType = note.data.entType;
			var nodeType = note.data.nodeType;
			if(entType == "2"){
				if(dix == "3"){
					var searchVal = $("#threeSearchInputDcVr").val();
					if (note.data.childrenList=="" && nodeType == "2"){
						var tg = note.target;
						if($(tg).attr("flag") == "1"){
							return ;
						}
						$(tg).attr("flag","1");
						var url = 'operationmanagement/findVehicleNodesOfTeam.action?teamId='+id;
						vehiclerport.ajaxTreeNode(url,note,id,manager,dix);
					}
				}else if(dix == "4"){
					if (note.data.childrenList=="" && nodeType == "2"){
						var tg = note.target;
						if($(tg).attr("flag") == "1"){
							return ;
						}
						$(tg).attr("flag","1");
						var url = "operationmanagement/findCorpAndLineTree.action";
						vehiclerport.ajaxTreeNode(url,note,id,manager,dix);
					}
				}
			}
		}catch(e){return ;}
	},
	getManager : function(idx){//获取需要操作树的管理器
//		var obj = this;
		var manager = "";
		if(idx == '1'){
			manager = vehiclerport.treeOneManager;
		}else if(idx == '2'){
			manager = vehiclerport.treeTwoManager;
		}else if(idx == '3'){
			manager = vehiclerport.treeTreeManager;
		}else if(idx == '4'){
			manager = vehiclerport.treeFourManager;
		}else if(idx == '5'){
			manager = vehiclerport.treeFiveManager;
		}
		return manager;
	},
	ajaxTreeNode : function(url,note,id,manager,idx){
    	$.ajax({
		   type: 'post',
		   url: url,
		   data: '',
		   aysnc : false,
		   success: function(col){
			   vehiclerport.addTreeNode(note,col,manager);
			   vehiclerport.selectNode(idx,false);
			   vehiclerport.selectSubNodeAll(note.target);
		   }
		});
    },
    selectSubNodeAll : function(parentNode){
    	var isHave = $(parentNode).find("div[class*=l-checkbox-checked]");
    	if(isHave.length > 0){
    		$(parentNode).find("div[class*=l-checkbox-unchecked]").removeClass("checkbox-unchecked").addClass("l-checkbox-checked");
    	}
    },
    addTreeNode : function(note,nodes,manager){
    	manager.append(note.target,eval(nodes));
    },
    selectNode : function (idx,flag)
    {
    	var a = null;
    	if(idx == "3"){
    		a = $("#panelConVr3 > li > div > div[class*=l-checkbox]");
    	}
		var cls = $(a[0]).attr("class");
		if(flag){
			//$(a[0]).click();
    	}
    },
    leafCoverFolder : function(){
    	$("#panelConVr3").find("div[class*=l-note]").removeClass("l-note").addClass("l-expandable-close");
    },
	openXcWin : function() {
		if(startVrIr == 0) {
			$("#mainWorkArea").A_Window({ //弹出层的父类的iD
	 			dragabId: 'mainWorkArea', //可拖动的范围
	 			//id：'这个是弹出层的id'
	 	        width: 900, //宽度
	 	        height: 436,//高度
	 	        //默认现在弹出层在父类容器的中间
	 	        //x:35 相对于父类容器的横坐标的位移 用来定位
	 	        //y:50 相对于父类容器的纵坐标的位移 用来定位
	 	        //data:{}, 传递的参数 {id:'1',name:'name'}
	 	        //点击关闭弹出页面窗口
	 	       load_fn:function(){
	 	    	//注册关闭窗口
	 	        	$("#econdrvClose").click(
	 	        			function(){$("#mainWorkArea").close_ALL_Window();});
	 	       },
	 	       url: 'model/machinemanagement/vehicleanalysis/chooseVehicleMain.jsp'  //目标页面或action的地址
	 		});
		}else {
			$.ligerDialog.alert("数据还没生成完成，请稍后", "信息提示",'warn');
		}
	},
	onResize : function() {
//		var obj = this;
		var center = getHeightAndWidth();
		if (vehiclerport.gridManager) {
			vehiclerport.gridManager.setHeight(center.height - 124);
		}
		$("#panelConVr3").height(center.height - 143);
//		$("#vehicleReportTable").css("width",center.width-264);
//		$("#"+unsafeDrivingFrameConigs.htmlElements.mainContainer).width(center.width-2);
//    	$("#TreeContineDiv").css("height",center.height-125);
//    	$("#vrPanel3").css("height",center.height-130);
//    	$("#panelInner").css("height",center.height-135);
//    	$("#panelConVr3").css("height",center.height-115);
//    	
//    	$("#"+unsafeDrivingFrameConigs.htmlElements.leftContainer).height(center.height-44);
//    	$("#accordionMain").height(center.height-44);
//    	$("#"+unsafeDrivingFrameConigs.htmlElements.rightContainer).height(center.height-44);
    	$("#"+unsafeDrivingFrameConigs.htmlElements.rightContainer).width(center.width-270);
//    	//$("#"+unsafeDrivingFrameConigs.htmlElements.leftShrink).height(vehiclerport.height/2);
//    	$("#"+unsafeDrivingFrameConigs.htmlElements.leftShrink).attr({"style" : "margin-top:0px;"});
//    	$("#"+unsafeDrivingFrameConigs.htmlElements.leftContainer).width(260);
//    	$("#"+unsafeDrivingFrameConigs.htmlElements.rightFormContainer).height(30);
//    	$("#"+unsafeDrivingFrameConigs.htmlElements.rightCenterMainArea).height(center.height-63);
	},
	authentication : function() {// 权限验证
		this.VREPORT_C = checkFunction("FG_MEMU_MAINTENANCE_ANALYSIS_FILE");//生成、重新生成
		this.VREPORT = checkFunction("FG_MEMU_MAINTENANCE_ANALYSIS_DELETE");//删除
		this.VREPORT_L = checkFunction("FG_MEMU_MAINTENANCE_ANALYSIS_VIEW");//预览
		this.VREPORT_D = checkFunction("FG_MEMU_MAINTENANCE_ANALYSIS_DOWNLOAD");//下载
		if (!this.VREPORT_C)
			$("#createRepSel").remove();
	},
	
	vehicleReportGrid : function() {
		var obj = this;
		var options = {
			columns : [
					{
						display : '序号',
						name : 'vindex',
						width : 50,
						align : 'center'
					},
					{
						display : '车牌号 ',	
						name : 'vehicleNo',
						width : 120,
						align : 'center'
					},
					{
						display : 'VIN码',
						name : 'vinCode',
						width : 130,
						align : 'center'
					},
					{
						display : '开始时间',
						name : 'repBeginTime',
						width : 100,
						align : 'center'
					},
					{
						display : '结束时间',
						name : 'repEndTime',
						width : 100,
						align : 'center'
					},
					{
						display : '创建人',
						name : 'creatorName',
						width : 80,
						align : 'center'
					},
					{
						display : '创建时间',
						name : 'buildTime',
						width : 160,
						align : 'center'
					},
					{
						display : '状态',
						name : 'createState',
						width : 110,
						align : 'center',
						render : function(row) {
							if(row.createState == "0") {
								return "生成中";
							}else if(row.createState == "1") {
								return "成功";
							}else if(row.createState == "2") {
								return "失败";
							}else {
								return "";
							}
						}
					},
					{
						display : '操作',
						name : '',
						width : 140,
						render : function(row) {
							if(row.createState == "0") {
								return "";
							}else if(row.createState == "1") {
								var restr = "";
								if(obj.VREPORT_L){
									restr+="<a title=\"点击预览报告\" href=\"javascript:vehiclerport.downLoadHtml('"+row.repWebUri + "','"+row.repAllWebUri+"')\" >预览</a>&nbsp;&nbsp;";
								}
								if(obj.VREPORT_D){
									restr+="<a title=\"点击下载报告\" href=\"javascript:vehiclerport.downLoadPdf('" + row.repPdfUri + "')\">下载</a>&nbsp;&nbsp;";
								}
								if(obj.VREPORT){
									restr+="<a title=\"删除报告\" href=\"javascript:vehiclerport.delReport('"+row.autoId + "')\">删除</a>";
								}
	 							return restr;
							}else if(row.createState == "2") {
								var restr = "";
								if(obj.VREPORT_C){
									restr+="<a title=\"点击生成报告\" href=\"javascript:vehiclerport.createReportAgain('"+row.autoId+ "')\">重新生成</a>&nbsp;&nbsp;";
								}
								if(obj.VREPORT){
									restr+= "<a title=\"删除报告\" href=\"javascript:vehiclerport.delReport('"+row.autoId + "')\">删除</a>";
								}
								return restr;
							}else {
								return "";
							}
							
						}
					} ],
			showCheckbox : false,
			showTableToggleBtn : true,
			sortName : 'autoId',
			url : 'vehicleanalysis/findReport.action',// 数据请求地址
			showTitle : true,
			pageSize : 30,
 			height : getHeightAndWidth().height - 124,
 			width:'100%',
			autoLoad : true,
			tableId : 'vehicleReportTableDiv', // 查询条件formid
			searchFormId : 'searchVehicleReportForm'
		};
		vehiclerport.ctfoFormWithGrid = new ctfoFormWithGrid(options),
		vehiclerport.grid = vehiclerport.ctfoFormWithGrid.getGrid();
		vehiclerport.gridManager = $("#vehicleReportTableDiv").ligerGetGridManager();
	},
	downLoadHtml : function(htmlUrl,htmlAllUrl){
		var params = {"reportPDFurl" : htmlUrl};
		$.ajax({
 	        type : "post",
 	        url : "vehicleanalysis/fileExits.action",
 	        data : params,
 	        dataType : "json",
 	        success : function (data){
 	        	if(data.displayMessage == "success") {
 	        		$("#vrTurnHtmlHref").attr("href",htmlAllUrl);
 	        		$("#vrTurnHtml").trigger('click');
 	        	}else {
 	        		$("#vrTurnHtmlHref").attr("href","warn.jsp");
 	        		$("#vrTurnHtml").trigger('click');
 	        	}
 	        }
 	    });
// 		$("#reportHtmlurl").val(HtmlUrl);
//		$("#downLoadHtmlButton").trigger('click');
 	},
	downLoadPdf : function(pdfUrl){
		var params = {"reportPDFurl" : pdfUrl};
		$.ajax({
 	        type : "post",
 	        url : "vehicleanalysis/fileExits.action",
 	        data : params,
 	        dataType : "json",
 	        success : function (data){
 	        	if(data.displayMessage == "success") {
 	        		$("#reportPDFurl").val(pdfUrl);
 	        		$("#downLoadPdfButton").trigger('click');
 	        	}else {
 	        		$.ligerDialog.warn("下载文件不存在");
 	        	}
 	        }
 	    });
 		
 	},
 	createReportAgain : function(autoId) {
 		$("#createRepSel").attr("disabled","true");
 		var data = {"vehicleReport.autoId" : autoId};
 		$.ajax({
 	        type : "post",
 	        url : "vehicleanalysis/createReportAgain.action",
 	        data : data,
 	        dataType : "json",
 	        success : function (data){
 	        	vehiclerport.grid.gridManager.loadData();
 	        	$("#createRepSel").removeAttr("disabled");
 	        }
 	    });
 	},
 	delReport : function(autoId) {
 		var data = {"vehicleReport.autoId" : autoId};
 		$.ligerDialog.confirm("确定要删除吗？",function(yes) {
 			if(yes) {
 				$.ajax({
 		 	        type : "post",
 		 	        url : "vehicleanalysis/removeReportInfo.action",
 		 	        data : data,
 		 	        dataType : "json",
 		 	        success : function (data){
 		 	        	vehiclerport.grid.gridManager.loadData();
 		 	        }
 		 	    });
 			}
 		});
 	},
 	bindSubmitEvent : function(){
 		$("#searchForButton").click(function(){
			var tids = vehiclerportLeftTree.getCheckSelect("fleet",1);
			var vids = vehiclerportLeftTree.getCheckSelect("vehicle",1);
			if(tids.split(",").length>1000){
				$.ligerDialog.success("所选车队量过大，请重试！");
				return;
			}
			if(vids.split(",").length>1000){
				$.ligerDialog.success("所选车辆数过大，请重试！");
				return;
			}
			$("#reportTeamids").val(tids);  //选择的车队
			$("#reportVehicleNos").val(vids);  //选择的车辆
		});
	},
	//获取打勾的复选框节点ID
	// 1: 获取组织节点ID
	//2：获取车队ID
	//3：获取车辆ID
	//4：获取线路ID
	getCheckSelect : function(tx,flag){
		var str = "";
		var idx = "3";
		var notes = null;
		if (tx == "fleet") {
			this.selectedTeamNodes = this.getManager(idx).getChecked();
			notes = this.selectedTeamNodes;
		} else {
			notes = this.selectedTeamNodes;
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
				//var parentNode = manager.getParentTreeItem(notes[i].target);
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
	timeRefreshGrid : function() {   //刷新grid
		vehiclerport.grid.gridManager.loadData();
	}
};

//左侧点击收缩
$("#"+unsafeDrivingFrameConigs.htmlElements.leftShrink).find("a").click(function(){
		 if(leftShrinkhidden==0){
			 $("#"+unsafeDrivingFrameConigs.htmlElements.leftShrink).removeClass('hidden_pop_up_vertical_hidden');
			 $("#"+unsafeDrivingFrameConigs.htmlElements.leftShrink).addClass('hidden_pop_up_vertical_pop_up');
			 $("#"+unsafeDrivingFrameConigs.htmlElements.leftContainer).hide();
			 $("#"+unsafeDrivingFrameConigs.htmlElements.rightContainer).width(getHeightAndWidth().width-25);
			 leftShrinkhidden=1;
		 }else{
			 $("#"+unsafeDrivingFrameConigs.htmlElements.leftShrink).removeClass('hidden_pop_up_vertical_pop_up');
			 $("#"+unsafeDrivingFrameConigs.htmlElements.leftShrink).addClass('hidden_pop_up_vertical_hidden');
			 $("#"+unsafeDrivingFrameConigs.htmlElements.leftContainer).show();
			 $("#"+unsafeDrivingFrameConigs.htmlElements.rightContainer).width(getHeightAndWidth().width-260-25);
			 leftShrinkhidden=0;
		 }
		 
});

function divOffset(liId){
 	var tmpNode = $("li[id="+liId+"]");
	$("#vrPanel3").scrollTop(0);
	$("ul[id=panelConVr3]:visible > li").find("div[class*=l-checkbox-checked]")[0].click();
	if(tmpNode != null && tmpNode != undefined && tmpNode.length > 0){
		var arr = $(tmpNode[0]).offset();
    	$("#vrPanel3").scrollTop(arr.top-260);
    	var removeClassNode = $("#vrPanel3").find("div[class*=searchBk]");
    	$(removeClassNode[0]).removeClass("searchBk");
		$(tmpNode[0]).children().addClass("searchBk");
    	$("ul[id=panelConVr3]:visible").find("div[class*=l-checkbox-checked]").click();
    	$(tmpNode[0]).find("div[class*=l-checkbox]").click();
	}
};

var vehiclerport = new vehicleReportList();
var refreshVR;
var vehiclerportLeftTree;
$(document).ready(function() {
	vehiclerport.init();
	vehiclerport.authentication();
	vehiclerport.vehicleReportGrid();
	vehiclerport.bindSubmitEvent();  //给查询按钮绑定事件
//	alert(refreshVR);
//	refreshVR = setInterval(function() {
//	}, 30000);
//	alert(refreshVR);
//	clearInterval(refreshVR);
//	alert(refreshVR);
	KCPT.onresizeObj = vehiclerport;
	vehiclerport.onResize();
});
