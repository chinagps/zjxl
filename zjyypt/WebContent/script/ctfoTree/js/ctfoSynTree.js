var ctfoTree = function(o) {
	this.version = "";
	this.options = {
		 mainContainer: '#homeLeftDiv', //包含此对象的div的id
		// 用来唯一标识此对象防止以为id相同导致紊乱
		id : 'ctfoTree',
		treeTab : true, // 表示tree上面有标签
		tabClass : 'powerm_tab', // tab使用的class样式 只有上面使用的是true才有用
		tab : 'li', // tab使用的标签
		tabUseClass : 'h', // 选中标签后使用的样式,
		tabContentClass : 'powerm_con',
		tabContentId : 'tabDiv', // tab签里面内容的divid
		userGrid : true, // 配置使用是否下面有grid
		gridId : 'leftTreeCTFOgrid', // grid使用的id,
		gridUrl : 'operationmanagement/findVehicleForThreeTab.action', // grid使用的action
		checkData : 'id',
		treeOnClick : function(node) {
			alert(node.data.id);
		},
		clickScope : null,
		// 树点击事件
		seachInput : 'searchInput', // 第一个标签页里面的text标签的id
		treeSearchButton : "serachButton",// 第一个标签页里面的查询按钮的id
		leftRefreshBtn : "leftRefreshBtn", //左侧树刷新按钮
		firstTabUrl : 'operationmanagement/findOrgTreeByParentId.action', // 组织结构树使用的url
		firstTabUrlWithName : 'operationmanagement/findOrgSynTreeLikeEntName.action', // 组织结构树使用的url  有查询条件
		firstTabId : 'powerm_tree', // 组织结构树的容器id
		secondTabId : 'tree2',// 线路树的容器id
		secondTabUrl : 'operationmanagement/findGroupEntClassline.action?entId='+KCPT.user.entId,// 线路树的容器id
		secondTabSeachInput : 'searchLineInput',
		secondTabtreeSearchButton : 'secondTabtreeSearchButton',
		childType:'entType',
		underTree : false,
		advanceSearchButton : "advanceSearchButton",// 高级查询里面的button ID
		searchForm : "searchFormTree" // 高级查询是按照form查询的};
	};
	this.loadHtml = "script/ctfoTree/html/ctfoTree.html";
	this.mainContainer = "";
	this.init(o);
	this.status = "hide";
	this.scope = this;
	this.GridManager;
	this.showTab = true;
	this.selectedNodeName = null;
	this.selectedNodeId = null;
	this.isRefreshed = false;
	//默认为当前用户
	this.loadTreeSelectedData = {  //加载已选择的树的信息
			data : {
				id:KCPT.user.entId,
				text:KCPT.user.entName,
				entType:KCPT.user.entType,
//				text : null, 
//				id 	 : null,
//				entType : null,
				parentEntId : null
			}
	};
};
ctfoTree.prototype = {
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
			this.loading();
		} else {
			alert("加载数据失败");
		}

	},
	loading : function() {
		var that = this;
		that.mainContainer = $(this.options.mainContainer);
		that.mainContainer.load(that.loadHtml, null, function() {
			that.setTabs();
			that.setGrid();//初始化表格
			if (!that.options.treeTab) {
				that.hideTabs();//默认tab隐藏
			}
			if (!that.options.userGrid) {
				that.hidengrid();//默认表格隐藏
			}
			that.setTree();
			that.bindEvent();
			that.clearSeach();
			that.bindKeyDown();
			that.initSelect();
			that.onReSize();
		});
	},
	//控制左侧树是否显示tab和grid
	showTree : function(data){
		var that = this;
		if (!KCPT.root.leftTree) { //第一次加载显示“组织名称”
			that.mainContainer.find("#" + that.options.seachInput).val('组织名称');
		}
		that.mainContainer.find("#" + that.options.searchForm).find("table td input[type=text]").val('');
		$("#powerm_tab_three").removeClass(that.options.tabUseClass);
		if(!data){
			data = {
				treeTab : false,
				userGrid : false
			};
		}
		//把传入的值赋值到ctfotree全局
		for ( var i in data) {
			that.options[i] = data[i];
		}
		//根据传入的参数判断左侧树显示的内容
		if(data.treeTab){
			that.showTabs();
			that.showGrid();
		}else{
			that.hideTabs();
			that.hidengrid();
		}
	},
	treeReflash:function(data){
		var that = this;
		setTimeout(function() {
			that.TreeManager.clear();
			that.mainContainer.find("#powerm_tree > li").show();
			that.TreeManager.loadData(null, that.options.firstTabUrl, null);
			if (that.options.userGrid) {
				that.GridManager._clearGrid();
			}
			that.onReSize();
		}, 1);
	},
	showLoadedTree:function(data){ //显示已加载树
		var that = this;
		setTimeout(function() {
			that.mainContainer.find("#powerm_tree > li").show();
			that.onReSize();
		}, 1);
	},
	bindKeyDown:function(){
		var obj = this;
		obj.mainContainer.find("#"+obj.options.seachInput).parents("form.form").bind('keydown', function (e) {
            var key = e.which;
            if (key == 13) {
            	 obj.mainContainer.find("#"+obj.options.seachInput).trigger('click');
            	 return false;
            }
        });

		 obj.mainContainer.find("#"+obj.options.secondTabSeachInput).parents("form.form").bind('keydown', function (e) {
		            var key = e.which;
		            if (key == 13) {
		            	 obj.mainContainer.find("#"+obj.options.advanceSearchButton).trigger('click');
		            	 return false;
		            }
		 });


	},
	clearSeach : function(){
		var obj = this;

		var inputOne = obj.mainContainer.find("#"+obj.options.seachInput);

		inputOne.bind("focus",function(){
			$(this).val("");
		});

		var inputTow = obj.mainContainer.find("#"+obj.options.secondTabSeachInput);

		inputTow.bind("focus",function(){
			$(this).val("");
		});


	},
	initSelect:function(){
		var obj = this;
//		KCPT.CodeManager.getSelectListByObject("SYS_VEHICLE_BRAND", obj.mainContainer.find("#vponevbrandCode"));
//		obj.mainContainer.find("#vponevbrandCode").change(function(){
//			obj.vchieltypevehicleType();
//		});
		//KCPT.CodeManager.getSelectList("SYS_PRODUCT_TYPE","vchieltypevehicleType");
		KCPT.CodeManager.getSelectListByObject("SYS_VEHICLE_TYPE", obj.mainContainer.find("#vehicleType"));
	},
	getId : function() {
		var obj = this;

		return obj.options.id;
	},
	hideTabs : function() {
		var that = this;
		$("#powerm_tab_one").addClass(that.options.tabUseClass);
//		$("#powerm_tab_two").hide();
		$("#powerm_tab_three").hide();
		$("#" + that.options.tabContentClass+0).show();
//		$("#" + that.options.tabContentClass+1).hide();
		$("#" + that.options.tabContentClass+2).hide();
	},
	showTabs : function() {
		var that = this;
		$("#powerm_tab_one").addClass(that.options.tabUseClass);
//		$("#powerm_tab_two").show();
		$("#powerm_tab_three").show();
		$("#" + that.options.tabContentClass+0).show();
//		$("#" + that.options.tabContentClass+1).hide();
		$("#" + that.options.tabContentClass+2).hide();
	},
	setTabs : function() {
		var obj = this;
		var cc_cc = obj.mainContainer.find("#" + obj.options.tabClass).find(obj.options.tab);
		cc_cc.each(function() {
			$(this).click(function() {
				var index = cc_cc.index(this);
				if ($(this).attr("class") == obj.options.tabUseClass) {
					return;
				} else {
					cc_cc.each(function() {
						if ($(this).attr("class") == obj.options.tabUseClass) {
							var ii = cc_cc.index(this);

							obj.mainContainer.find("#" + obj.options.tabContentId).find("." + obj.options.tabContentClass).eq(ii).hide();
							$(this).removeClass(obj.options.tabUseClass);
						}
					});
					$(this).addClass(obj.options.tabUseClass);
					obj.mainContainer.find("#" + obj.options.tabContentId).find("." + obj.options.tabContentClass).eq(index).show();

				}
			});
		});

	},
	bindEvent : function() {
		var obj = this;
		// 第一个tab签的查询
		var form1 = obj.mainContainer.find("#"+obj.options.seachInput).parents("form.form");
		var validate1 = form1.validate();
		obj.mainContainer.find("#"+obj.options.treeSearchButton).click(function() {
			if(validate1.form()){
				var value = obj.mainContainer.find("#" + obj.options.seachInput).val();
				obj.seachNode(value);
				//点击查询将选中的节点名称及ID清空及Grid清空
				obj.selectedNodeName = null;
				obj.selectedNodeId = null;
				obj.GridManager._clearGrid();
			}
		});
		
		//刷新按钮绑定click
		obj.mainContainer.find("#" + obj.options.leftRefreshBtn).click(function() {
			$(this).attr("disabled", "disabled");
			obj.isRefreshed = true;
			obj.treeReflash();
		});

		// 第二个tab签的查询
		var form2 = obj.mainContainer.find("#"+obj.options.searchForm);
		var validate2 = form2.validate();
		obj.mainContainer.find("#"+obj.options.advanceSearchButton).click(function() {
			if(validate2.form()){
				obj.submitThridForm();
			}
		});
	},
	// 查询当前树中是否有符合查询条件的叶子节点
	seachNode : function(text) {
		var obj = this;
		var text = obj.mainContainer.find("#" + obj.options.seachInput).val();
		if(text=="组织名称"){
			text = "";
		}
		if(text){
		JAjax(obj.options.firstTabUrlWithName, {"entName":text}, "json", obj.reloadTrdd, null, true,obj);
		}else{
		JAjax(obj.options.firstTabUrl, null, "json", obj.reloadTrdd, null, true,obj);
		}

	},
	// 级联查询节点下是否存在要查询的关键字 data 数据源 来自树 text 来自
	searchCaseNode : function(data, text) {
		var obj = this;
		var dd = data;
		if (!((dd["text"]).indexOf(text) == -1)) {
			return true;
		} else if (dd["childrenList"]) {
			var thdata = dd["childrenList"];
			var have = false;
			for ( var i = 0; i < thdata.length; i++) {

				have = obj.searchCaseNode(thdata[i], text);

				if (have) {
					break;
				}
			}
			return have;

		} else {
			return false;
		}

	},
	// 重新load 树
	reloadTrdd : function(data) {
		data = eval(data);
		var obj = this;
		obj.TreeManager.clear();
		obj.TreeManager.append(null, data, true);
		$("#powerm_tree").find(".l-expandable-close").removeClass("l-expandable-close").addClass('l-expandable-open');
	},
	getTreeManager:function(){
		var obj = this;

		return obj.TreeManager;
	},
	
	setTree : function() {
		var obj = this;
		var tree = obj.mainContainer.find("#" + obj.options.firstTabId);
		setTimeout(function(){
			$(tree).ligerTree({
				url : obj.options.firstTabUrl,
				childType:obj.options.childType,
				onClick : obj.treeClick,
				data:{"tabFlag":1},
				textFieldName : 'n',
				hasChild : 't',
				idFieldName:'i',
				 checkbox: false,
				isRootExpand:true,
				isMonitorTree : true,
				childrenListName : 'c',
				onBeforeExpand : function(note, isRoot) {
					if ($(note.target).find("ul > li").length < 1) {
						var p = {
								"org.parentId" : note.data.i
							};
						obj.TreeManager.loadData(note.target, obj.options.firstTabUrl, p);
					} 
				},
				clickScope : obj.options.clickScope ? obj.options.clickScope : obj,
				onSuccess : function(data, curnode, param) {
					$("#powerm_tree").find(".l-body:eq(0)").find('div:eq(0)').removeClass("l-expandable-close").addClass('l-expandable-open');
				}
			});
			obj.TreeManager = $(tree).ligerGetTreeManager();
		},1);
	},
	// load第二个tab签的
	loadSecondTree : function() {
		var obj = this;
		var treeClick = obj.treeClick;
		var treeSecond = obj.mainContainer.find("#" + this.options.secondTabId);
		setTimeout(function(){
			$(treeSecond).ligerTree({
				url : obj.options.secondTabUrl,
				onClick : treeClick,
				checkbox : false,
				data:{"tabFlag":2},
				clickScope : obj.options.SecondclickScope ? obj.options.SecondclickScope : obj
			});
			obj.SecondTreeManager = $(treeSecond).ligerGetTreeManager();
		}, 1);
		
	},
	reloadSeTree : function(data) {
		var obj = this;
		obj.SecondTreeManager.clear();
		obj.SecondTreeManager.append(null, data,true);
	},
	submitThridForm : function(){
		var obj = this;
		var data = obj.mainContainer.find("#" + obj.options.searchForm).serializeArray();

		var param = [];
		for ( var i = 0; i < data.length; i++) {
			var datai = data[i];
			var d = {};
			if (datai.value) {
				d["name"] = datai.name;
				d["value"] = datai.value;
			}
			param.push(d);
		}
		var tdata = {};

		tdata["name"] = "tabFlag";
		tdata["value"] = 3;

		param.push(tdata);


		if(!obj.options.ThirdSearch&&obj.options.userGrid){
			obj.reloadGrid(param);
		}else{
			var scope = obj;
			if(obj.options.ThirdSearchScope){
				scope = obj.options.ThirdSearchScope;
			}
			obj.options.ThirdSearch.call(scope,data);
		}

		return false;

	},
	// 树节点点击事件
	treeClick : function(note, oo) {
		var obj = oo;
		obj.clickTreeData = note.data;
		//将选中的节点名称和节点ID保存
		//obj.selectedNodeName = note.data.text;
		//obj.selectedNodeId = note.data.id;
		obj.loadTreeSelectedData.data.text = note.data.n;
		obj.loadTreeSelectedData.data.id = note.data.i;
		obj.loadTreeSelectedData.data.entType = note.data.t;
		obj.loadTreeSelectedData.data.parentEntId = note.data.p;
		note.data.text= note.data.n;
		note.data.id= note.data.i;
		
		var chlidren = note.data.childrenList;
		var currentLevel = parseInt($(note.target).attr("outlinelevel"));
		var a = null;
		if(!note || !note.data.i) {
			return false;
		}
		if (currentLevel > 1) {
			a = obj.TreeManager.getParentTreeItem(note.target, currentLevel - 1);
		} else {
			a = obj.TreeManager.getParentTreeItem(note.target);
		}
		var html = null;
		var parent = null;
		if (a) {
			html = a.innerHTML;
			var name = $(html).find("span").first().html();
			var id = a.id;
			parent = {
				id : id,
				name : name,
				obj : a
			};
		}
		if (KCPT.root.triggerShowObj) {
			
			KCPT.root.triggerShowObj.change(note, chlidren, parent);
			//return;
		}
		if (obj.GridManager) {
			var data = [];

			for(var i in note.data){
				var ddi = {};

				if(i=="tabFlag"){
					if(parseInt(note.data[i])==1){
						var dd = {};

						dd["name"] = "entId";
						dd["value"] = note.data.id;

						data.push(dd);
					}else if(parseInt(note.data[i])==2){
						var dds = {};
						dds["name"] = "requestParam.equal.vlineId";
						dds["value"] = note.data.id;

						data.push(dds);
					}

					ddi["name"] = i;
					ddi["value"] = note.data[i];

					data.push(ddi);
				}
			}
			obj.reloadGrid(data);
		} else {
			alert("列表没有加载完成！");
		}
	},
	// 刷新grid方法
	reloadGrid : function(data) {
		var obj = this;
		var pp = {};
		pp["parms"] = data;
		obj.GridManager.setOptions(pp);
		obj.GridManager.loadDataOut(true);
	},
	// 运用ligerui组建组成列表grid
	setGrid : function() {
		var obj = this;
		var grid = obj.mainContainer.find("#" + obj.options.gridId);
		obj.grid = $(grid).ligerGrid({
			pageParmName : 'requestParam.page', // 页索引参数名，(提交给服务器)
			pagesizeParmName : 'requestParam.rows',
			checkbox : true,
			isChecked : false,
			barTextShow : false,
			userRight:false,
			columns : [ {
				display:'品牌',
				name:'servicebrandLogo',
				width:50,
				render :function(row){
					if(row.servicebrandLogo&&row.servicebrandLogo!=""){
						return "<img src='images/servicebrand/"+row.servicebrandLogo+"'></img>";
					}else{
						return "";
					}
				}
			},{
				display : '车牌号',
				name : 'vehicleNo',
				minWidth : 75
			}, {
				display : '内部编号',
				name : 'innerCode',
				width : 75,
				align : 'center'
			} ],
			onCheckRow : function(checked,row,rowi,index){obj.checkRow(checked, row, rowi, index);},
			onCheckAllRow:function(checked,grid){ obj.checkAllRow(checked,grid);},
			onAfterShowData : function(){
				$(grid).find("tr[class*=l-checked]").removeClass("l-checked");
			},
			pageSize : 30,
			url : obj.options.gridUrl,
			sortName : 'vehicleNo',
			width : '99.5%',
			height : 100
		});
		obj.GridManager = $(grid).ligerGetGridManager();
		obj.GridManager._clearGrid();
	},
	checkRow : function(checked,row,rowi,index){
		var obj = this;
		if (obj.checkRowShowObj) {
			obj.checkRowShowObj.checkRow(checked,row,rowi,index);
			return;
		}
	},
	checkAllRow : function(checked,grid){
		var obj = this;
		if (obj.checkAllRowShowObj) {
			obj.checkAllRowShowObj.checkAllRow(checked,grid);
			return;
		}
	},
	// hidengrid 隐藏grid
	hidengrid : function() {
		var obj = this;
		obj.options.userGrid = false;

		$("#" + obj.options.gridId).hide();

	},
	showGrid : function() {
		var obj = this;
		obj.options.userGrid = true;
		$("#" + obj.options.gridId).show();
	},
	// 返回grid的manager对象用来提供外部调用操作
	getGridManager : function() {
		var obj = this;
		return obj.GridManager;
	},
	// 获得选中的数据
	/**
	 * name == "vid"
	 *
	 * this.lefttree.getGridSelectRowID("vid"); this.lefttree.getGridSelectRowID("vehicleNo");
	 *
	 */
	getGridSelectRowID : function(name) {
		var obj = this;
		if (obj.GridManager) {
			var rows = obj.GridManager.getCheckedRows();
			var checkData = [];
			$(rows).each(function() {
				if (name) {
					checkData.push(this[name]);
				} else {
					checkData.push(this[obj.options.checkData]);
				}
			});

			return checkData;
		} else
			return null;
	},
	setCheckDataName : function(name) {
		var obj = this;

		obj.options.checkData = name;

	},
	bodyshow:function(){
		var that = this;
		that.status = "show";
		that.mainContainer.show();
	},
	bodyhide : function(){
		var obj = this;
		obj.status = "hide";
		obj.mainContainer.find("#powerm_tree > li").hide();
		obj.mainContainer.hide();
	},
	getStatus : function() {
		var obj = this;

		return obj.status;
	},
	/*
	 * 改变节点名称方法 用来完成企业  的名称的修改 作为第一个签的使用
	 */
	changeNodeName : function(note,newName){
		var obj = this;

		if(!obj.TreeData){
			obj.TreeData = obj.TreeManager.getData();
		}

		var data = note.data;

		obj.tihuanData(obj.TreeData, data, newName);


		obj.reloadTrdd(obj.TreeData);
	},
	//第二个树的替换名称方法
	changeNodeName : function(note,newName){
		var obj = this;

		if(!obj.SecondTreeDate){
			obj.SecondTreeDate = obj.SecondTreeManager.getData();
		}

		var data = note.data;

		obj.tihuanData(obj.SecondTreeDate, data, newName);


		obj.reloadSeTree(obj.SecondTreeDate);
	},
	tihuanData:function(allData,data,newName){
		var obj = this;

		for(var i = 0; i < allData.length; i++){
			var datai = allData[i];
			if(datai == data){
				datai.text = newName;
				break;
			}
			if(datai.childrenList){
				obj.tihuanData(datai.childrenList, data, newName);
			}
		}
	},
	/**
	 *  新增完节点后调用
	 * @param parentNode 父节点
	 * @param data 新增节点的对象
	 */
	addNewNoteForFirstTree:function(parentNode,data){
		var obj = this;

		if(!obj.TreeData){
			obj.TreeData = obj.TreeManager.getData();
		}
		var parendNodeData = parentNode.data;

		obj.addNewData(obj.TreeData,parendNodeData,data);

		obj.reloadTrdd(obj.TreeData);
	},
	//第二个树的
	addNewNoteForSecondTree:function(parentNode,data){
		var obj = this;

		if(!obj.SecondTreeDate){
			obj.SecondTreeDate = obj.SecondTreeManager.getData();
		}
		var parendNodeData = parentNode.data;

		obj.addNewData(obj.SecondTreeDate,parendNodeData,data);

		obj.reloadSeTree(obj.SecondTreeDate);
	},
	addNewData:function(allData,parentNode,data){
		var obj = this;

		for(var i = 0; i < allData.length; i++){
			var datai = allData[i];
			if(datai == parentNode){
				if(datai.childrenList){
					datai.childrenList.push(data);
				}else{
					var childrenList = [];

					childrenList.push(data);

					datai["childrenList"] = childrenList;
				}
				break;
			}
			if(datai.childrenList){
				obj.addNewData(datai.childrenList,parentNode, data);
			}
		}
	},
	deleteFirstTree:function(node){
		var obj = this;

		obj.TreeManager.remove(node.target);

	},
	deleteSecondTree:function(node){
		var obj = this;

		obj.SecondTreeManager.remove(node.target);

	},
	onReSize : function(data) {
		var that = this;
		var center = getHeightAndWidth();
		if(that.options.userGrid){
			if(that.GridManager){
				that.GridManager.setHeight(center.height/2 - 2);
			}
			that.mainContainer.find("#powerm_tree").height(center.height/2 - 126); //减去26高度。
		}else{
			that.mainContainer.find("#powerm_tree").height(center.height - 126);
		}
		if(that.options.treeTab){
			that.mainContainer.find("#powerm_con2").height(center.height/2 - 64);
		}
	},
	vchieltypevehicleType : function(){
		var obj = this;
		var brandIdTemp = obj.mainContainer.find("#vponevbrandCode").val();
		var monthSelect = obj.mainContainer.find("#vchieltypevehicleType");
		JAjax(
				"baseinfo/findProductTypeByParam.action?requestParam.equal.vbrandCode="
						+ brandIdTemp, "", "json", function(data) {
							var options = "";
							monthSelect.empty();
							var objArray = eval(data);
							var length = objArray.length;
							var j = 0;
							options += "<option value='' >请选择</option>";
							for (j = 0; j < length; j++) {
								var obj = objArray[j];
								if (obj.prodCode != undefined) {
									options += "<option value='" + obj.prodCode + "' >"
											+ obj.prodName + "</option>";
								}
							}
							try {
								monthSelect.append(options);
							} catch (ex) {
							}
						},
				null, true);
	}
};
