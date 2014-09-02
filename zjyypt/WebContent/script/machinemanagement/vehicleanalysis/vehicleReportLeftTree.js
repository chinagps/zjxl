var vehiclerportLeftTree = function(){
	this.version = "create by liujie in 2012.05.28";
	this.mainContainer = 'powerDiv', //包含此对象的div的id
	this.firstUrl = "operationmanagement/findOrgTreeLikeEntName.action";
	this.secondUrl = "";
	this.threeUrl = "";
	this.fourUrl = "operationmanagement/findGroupEntClassline.action?entId="+KCPT.user.entId;
	this.searchArr = [];
	this.resultIdx = 0;
	this.selectedTeamNodes = null;
	this.init();
	this.onResize();
};

vehiclerportLeftTree.prototype = {
		init : function(){
			this.load();
		},
		load : function(){
	 		$("#accordionMain").ligerAccordion({changeHeightOnResize : true,speed : null});
			var obj = this;
			obj.setThree(obj);
		},
		onResize:function(){
//			$("#panelConVr3").height(getHeightAndWidth().height-173);
		},
		setThree : function(o){
			var treeClick = "treeClick";
			$("#panelConVr3").ligerTree({
				url: 'operationmanagement/findOrgTree.action',
				onBeforeExpand : function(note){
					o.treeClick(note);
				},
				onSuccess : function(){
//					o.selectNode("3",true);
					o.leafCoverFolder();
//					o.allSel(true);
					o.bindPanelSize();
				},
				checkbox : true,
				childType : 'entType'
			});
			o.treeTreeManager = $("#panelConVr3").ligerGetTreeManager();
	 	},
	 	//获取树的高度，以便增加滚动条
	 	bindPanelSize : function(){
	 		var obj = this;
			var panelContextObj = $("#panelConVr3");
			//计算高度
			var hgt = 260;
			panelContextObj.css("overflow","auto");
			panelContextObj.find("li").eq(0).width(400);
	 	},
 		getPosition:function(obj){//定位
			var top=0;
	 		top = obj.offset().top;
			return top;
		},
		// 树节点点击事件
		treeClick : function(note) {
			try{
				var dix = vehiclerportLeftTree.getDisplayPanel();
				var manager = vehiclerportLeftTree.getManager(dix);
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
							var url = 'operationmanagement/findVehicleNodesOfTeam.action?vehicleState=2&teamId='+id;
							vehiclerportLeftTree.ajaxTreeNode(url,note,id,manager,dix);
						}
					}else if(dix == "4"){
						if (note.data.childrenList=="" && nodeType == "2"){
							var tg = note.target;
							if($(tg).attr("flag") == "1"){
								return ;
							}
							$(tg).attr("flag","1");
							var url = "operationmanagement/findCorpAndLineTree.action";
							vehiclerportLeftTree.ajaxTreeNode(url,note,id,manager,dix);
						}
					}
				}
			}catch(e){return ;}
		},
		getDisplayPanel : function(){//获取哪一个查询面板是显示状态
			var arrs = $("ul[id^=panelCon]:visible");
			var id = $(arrs[0]).attr("id");
			var idx = "";
			if(id == "panelConVr3"){
				idx = "3";
			}
			return idx;
		},
		getManager : function(idx){//获取需要操作树的管理器
			var obj = this;
			var manager = "";
			if(idx == '3'){
				manager = obj.treeTreeManager;
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
				   vehiclerportLeftTree.addTreeNode(note,col,manager);
				   vehiclerportLeftTree.selectNode(idx,false);
				   vehiclerportLeftTree.selectSubNodeAll(note.target);
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
				$(a[0]).click();
	    	}
	    },
		leafCoverFolder : function(){
	    	$("#panelConVr3").find("div[class*=l-note]").removeClass("l-note").addClass("l-expandable-close");
	    },
	    bindResultEvent : function(){
			var obj = this;
			$("#resultRecordUp").click(function(){
				obj.treeSearchUp();
			});
			$("#resultRecordDown").click(function(){
				obj.treeSearchDown();
			});
		},
		//查询结果上移一位
		treeSearchUp : function(idx){
			var obj = this;
			var resultArr = vehiclerportLeftTree.searchArr;
			var manager = obj.treeTreeManager;
			data = manager.getData();
			if(vehiclerportLeftTree.resultIdx > 0){
				vehiclerportLeftTree.resultIdx = Number(idx);
				obj._getDataNodeByTreeDataIndex(data[0].childrenList,resultArr.Rows[vehiclerportLeftTree.resultIdx]);
				obj.searchSel(resultArr.Rows[vehiclerportLeftTree.resultIdx].vid,resultArr.Rows[vehiclerportLeftTree.resultIdx].vehicleNo);
			}else{
				$.ligerDialog.alert('已经是第一个结果!', '提示', 'warn');
			}
		},
		//查询结果下移一位
		treeSearchDown : function(idx){
			var obj = this;
			var resultArr = vehiclerportLeftTree.searchArr;
			var manager = obj.treeTreeManager;
			data = manager.getData();
			if(vehiclerportLeftTree.resultIdx < resultArr.Rows.length-1){
				vehiclerportLeftTree.resultIdx = Number(idx);
				obj._getDataNodeByTreeDataIndex(data[0].childrenList,resultArr.Rows[vehiclerportLeftTree.resultIdx]);
				obj.searchSel(resultArr.Rows[vehiclerportLeftTree.resultIdx].vid,resultArr.Rows[vehiclerportLeftTree.resultIdx].vehicleNo);
			}else{
				$.ligerDialog.alert('已经是最后一个结果!', '提示', 'warn');
			}
		},
		findVehicleNoHC : function(vehicleArr) {
			var obj = this;
			var RowsArr = eval("data=" + vehicleArr);
			vehiclerportLeftTree.resultIdx = 0;
			obj._searchDataNodeByTreeDataIndex(RowsArr.Rows[0].entId,RowsArr.Rows[0].vid);
		},
		//通过查询的车辆entid并展开节点
		_searchDataNodeByTreeDataIndex : function(entId,vid){
			var temp = $("ul[id=panelConVr3]:visible").find("li[outlinelevel=1]").find(".l-box.l-checkbox").eq(0);
			if(temp.attr("class").indexOf("l-checkbox-checked")>0){
				temp.click();
			}
			var tmpNode = $("ul[id=panelConVr3]:visible").find("li[id="+entId+"]");
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
						var tmpNode = $("#panelConVr3").find("li[id="+entId+"]");
			          	var dvNodes = $(tmpNode).find("div[class*=l-expandable-close]");
						$(dvNodes[0]).click();//点击“+”号展开节点
						obj.treeStepExpand(tmpNode);
		            }
	        	}
	        }
	        return true;
	    },
	    //查询结果选中高亮状态
	    searchSel : function(liId,vehicleNo){
	     	 setTimeout("divOffset("+liId+",'"+vehicleNo+"')",1000);
	    },
	    bindPanelVehicleEvent : function(){
			var obj = this;
			var url = "operationmanagement/findVehicleForThreeTab.action?vehicleState=2";
			$("#searchThreeVr").click(function(){
				obj.clearResult(false);
				var vehicleNo = $("#threeSearchInputDcVr").val();
				if(vehicleNo.length < 3){
					$.ligerDialog.alert('请最少输入三位车牌号!', '提示', 'warn');
					return ;
				}
				$.ajax({
					   type: 'post',
					   url: url,
					   data: 'tabFlag=3&rows=10000&requestParam.like.vehicleNo='+vehicleNo,
					   success: function(col){
						   vehiclerportLeftTree.searchArr = eval("data="+col);
					   		if(vehiclerportLeftTree.searchArr.Rows.length != 0){
//					   			$("#resultRecordOper").removeClass("btnNone");
//					   			$("div[id=panelRecord3]:visible").css("padding-top","60");
						   		obj.findVehicleNoHC(col);
						   		//设置查询出的车辆结果填入下拉列表中
						   		var selResultObj = $("select[id=threeSearchResult]:visible");
					   			selResultObj.removeAttr("disabled");
					   			selResultObj.empty();
					   			selResultObj.data("searchArr",vehiclerportLeftTree.searchArr);
					   			$.each(vehiclerportLeftTree.searchArr.Rows,function(idx,node){
						   			var vid = node.vid;
					                var vehicleNo = node.vehicleNo;

					                $("select[name='threeSearchResult']",$("#resultOperDcVr:visible")).append("<option value='"+vid+"'>"+$.trim(vehicleNo)+"</option>");
					                if (idx==0){
					                	obj.selectedNodeId=vid;
					                	//默认选中第一个车
	//				                	obj._getDataNodeByTreeDataIndex(null,node);
					                }
						   		});
						   		$(selResultObj).attr("selected",true);
					   		}else{
					   			var selResultObj = $("select[name='resultOperDcVr']",$("div[id=accordionMain]:visible"));
					   			selResultObj.attr("disabled",true);
					   			selResultObj.empty();
					   			$.ligerDialog.alert('没有找到相关车辆!', '提示', 'warn');
					   			return ;
					   		}
					   }
				});
			});
			//车辆查询输入框事件
				$("#threeSearchInputDcVr").keypress(function(){
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

	  //flag 表示获取的值是否过滤
		// 1/true：过滤,
		// 0/false ： 不过滤
		getFleetId : function(flag){//获取车队ID
			var obj = this;
			arr = obj.getCheckSelect("fleet",flag);
			return arr;
		},

	    //falg 表示获取的值是否过滤
		// 1/true：过滤,
		// 0/false ： 不过滤
		getVehicleId : function(flag){//获取车辆ID
			var obj = this;
			var arr = "";
			arr = obj.getCheckSelect("vehicle",flag);
			return arr;
		},
		//获取打勾的复选框节点ID
		// 1: 获取组织节点ID
		//2：获取车队ID
		//3：获取车辆ID
		//4：获取线路ID
		getCheckSelect : function(tx,flag){
			var str = "";
			var idx = this.getDisplayPanel();
//			var manager = this.getManager(idx);
//			var notes = manager.getChecked();

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
				if((tx == "fleet" && entType == "2") ){
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
				}else if((tx == "vehicle" && entType == "3")){
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
		allSel : function(flag){
			if(flag){
				$("ul[id=panelConVr3]:visible > li").find("div[class*=l-checkbox]")[0].click();
			}
		},
				//清除查询车辆查询结果
		clearResult : function(flag){
//				vehiclerportLeftTree.searchArr = [];
//				var heightNode = $("div[id=panelRecord3]:visible").find("div[class*=searchBk]");
//				$("#threeSearchRecordInput").val("");
//				$(heightNode[0]).removeClass("searchBk");
//				$("#resultRecordOper").addClass("btnNone");
//				$("div[id=panelRecord3]:visible").css("padding-top","40");
				vehiclerportLeftTree.searchArr = [];
			var heightNode = $("#vrPanel3").find("div[class*=searchBk]").removeClass("searchBk");
			if(flag){
				$("#threeSearchInputDcVr").val("车牌号");
			}
 			var selResultObj = $("#threeSearchResult");
   			selResultObj.attr("disabled",true);
   			selResultObj.empty();
		},
		bindClearResult : function(){
			var obj = this;
			$("#clearResultDcVr").click(function(){
				obj.clearResult(true);
			});
		},
		bindSearchDivFloat : function(){
			$("#panelConVr3").scroll(function(){
				var offsetTop = $(this).scrollTop();
				$("#panelConVr3").find("div[class=panelSearch]").css("top",offsetTop-1+"px");
			});
		},
			//下拉框事件,车辆查询结果
	    resultEvent : function(){
	    	var obj = this;
	    	$("#threeSearchResult").change(function(){
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
	var tmpNode = $("ul[id=panelConRecord3]:visible").find("li[id="+liId+"]:contains('"+vehicleNo+"')");
 	$("#panelConVr3").scrollTop(0);
 	$("ul[id=panelConVr3]:visible > li").find("div[class*=l-checkbox-checked]")[0].click();
 	if(tmpNode != null && tmpNode != undefined){
		var arr = $(tmpNode[0]).offset();
		$("#panelConVr3").scrollTop(arr.top-280);
    	var removeClassNode = $("#panelConVr3").find("div[class*=searchBk]");
    	$(removeClassNode[0]).removeClass("searchBk");
		$(tmpNode[tmpNode.length-1]).children().addClass("searchBk");
		$("ul[id=panelConVr3]:visible").find("div[class*=l-checkbox-checked]").click();
    	$(tmpNode[tmpNode.length-1]).find("div[class*=l-checkbox]").click();
	}
};
vehiclerportLeftTree = new vehiclerportLeftTree();
$(document).ready(function() {
	vehiclerportLeftTree.bindPanelVehicleEvent();
	//vehiclerportLeftTree.bindResultEvent();
	vehiclerportLeftTree.bindClearResult();
	vehiclerportLeftTree.resultEvent();
//	$("#vehicleRecordLeftNavigation").width(260);
  });