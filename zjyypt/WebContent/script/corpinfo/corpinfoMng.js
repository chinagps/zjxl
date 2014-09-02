var organization = function() {
	this.name="车队管理";
	this.TEAM_C = false;//创建
	this.TEAM_U = false;//修改
	this.TEAM_D = false;//删除
	this.TEAM_INFO = false;//详情
	this.TEAM_EXP = false;//导出
	
	this.titleHeight = $("#corpInfoSearchform").height();
};
organization.prototype = {
	orgTree : function() {// 初始化组织结构Tree
		var obj = this;
//		obj.leftTree = KCPT.root.leftTree;
//		obj.leftTree.hideTabs();
//		obj.leftTree.hidengrid();
//		obj.leftTree.show();
//		obj.leftTree.triggerShowObj = obj;
		KCPT.root.triggerShowObj = obj;
	},
//	show : function() {
//		var obj = this;
//		obj.orgTree();
//	},
	onResize : function() {
		var obj = this;
		if(obj.gridManager){
			obj.gridManager.setHeight(obj.getGridHeight());
		}
		//添加修改页面的form高度更改
		var center = getHeightAndWidth();
		$("#addCorpInfoForm").height(center.height-75);
	},
	getGridHeight : function(){
		var center = getHeightAndWidth();
		return center.height - this.titleHeight - 86;
	},
	orgInfoGrid : function() {
		var corpInfoObj = this;
		var height = corpInfoObj.getGridHeight();
		var options = {
			// 列
			columns : [
					{
						display : '企业编码',
						name : 'corpCode',
						width : 100,
						sortable : true,
						align : 'center',
						toggle : false
					},
					{
						display : '企业名称',
						name : 'entName',
						width : 100,
						sortable : true,
						align : 'center'
					},
					{
						display : '企业简称',
						name : 'orgShortname',
						width : 100,
						sortable : true,
						align : 'center'
					},
					{
						display : '所属省',
						name : 'corpProvince',
						width : 100,
						sortable : true,
						align : 'center',
						render : function(row) {
							return  KCPT.CodeManager.getNameByCode("SYS_AREA_INFO",row.corpProvince);
						}
					},
					{
						display : '所属市',
						name : 'corpCity',
						width : 100,
						sortable : true,
						align : 'center',
						render : function(row) {
							return KCPT.CodeManager.getCityProvcodeNameByCode("SYS_AREA_INFO",row.corpProvince,row.corpCity);
						}
					},
					{
						display : '上级企业',
						name : 'parentName',
						width : 100,
						sortable : true,
						align : 'center'
					},
					{
						display : '创建人',
						name : 'createByName',
						width : 100,
						sortable : true,
						align : 'center'
					},
					{
						display : '创建时间',
						name : 'createTime',
						width : 160,
						sortable : true,
						align : 'center',
						render : function(row) {
							return utc2Date(row.createTime);
						}
					},
					{
						display : '状态',
						name : 'entState',
						width : 100,
						sortable : true,
						align : 'center',
						render : function(row) {
							return row.entState == 1 ? "有效" : "无效";
						}
					},
					{
						display : '操作',
						name : 'entType',
						width : 120,
						sortable : true,
						align : 'center',
						render : function(row) {
							var detail = "";
							var remove="";
							var edit="";
//							this.TEAM_REVOKE = false;//吊销
						if(corpInfoObj.TEAM_U){
							 edit = '<a href="javascript:orgWin.updateCorpInfo('
									+ row.entId + ')">修改</a>';
							}
							if(corpInfoObj.TEAM_INFO){
								detail = '<a href="javascript:orgWin.detailCorpInfo('
										+ row.entId + ')">查看</a>';
							}
							if(corpInfoObj.TEAM_D){
							 remove = '<a href="javascript:orgWin.removeOrgById('
									+ row.entId + ')">删除</a>';
							}
							return edit + "&nbsp;" + detail + "&nbsp;" + remove;
						}
					} ],
			container : "corpInfoSearchAddform", // 包含这个form的对象用来loadhtml
			loadHtml : 'model/corpinfo/addcorpinfo.jsp',// 增加页面使用的html
			formId : 'addCorpInfoForm',// 页面中使用的form的ID
			// 用来在新增和修改的时候 submitId
			// : '',//
			submitId : 'addCorpInfoFormsubmit',
			closeId : 'corpinfoMngClose',// 重置按钮的id,
			showCheckbox : false,
			sortName : 'id',
			url : 'operationmanagement/findForListPage.action',// 数据请求地址
			exportAction:'operationmanagement/exportExcelDataCorp.action',
			data : {},
			showTitle : false,
			pageSize : 10,
			pageSizeOptions : [ 10, 20, 30, 40 ],
			height : height,
			width:'99.8%',
			autoLoad : false,
			mainContain : "corpinfonmg",
			Buttons : [ {
				id : "showAdd",
				fun : function() {
					if(corpInfoObj.judgeCorpTeam()){
						corpInfoObj.ctfoFormWithGrid.add();
					}
				}
			},{//导出
				id : "corpInfoExportExcel",
				fun : function()
				{
					corpInfoObj.grid.exportExcel(1, 2);
				}
			}],
			resetFun:function(){
				$("#corpCity").html("<option value=''>请选择</option>");
			},
			gridDIV : "corpinfonmgcontent",
			// 填充数据的tableid
			tableId : 'corpinfoGrid',
			// 查询条件formid
			searchFormId : 'corpInfoSearchform',
			addURL : 'operationmanagement/addOrgCorp.action', // 添加的时候使用的url
			detailURL : 'operationmanagement/findOrgById.action',// 获得详情方法
			// 在修改前要调用
			updateURL : 'operationmanagement/modifyOrg.action',// 修改的时候使用的url
			editModel : "viewOrgCorp",
			beforeSubmit : function() {
				var flag =  corpInfoObj.corpCodeUnique();
				return flag;
			},
			detailEnd:"viewOrgCorp.corpCity",
			detailEndFun:function(x){
				$("#corpCity").val(x);
				$("#corpCity").trigger("change");
			},
			toEditInitData : [ 'viewOrgCorp.parentName', function(x) {
				var checkedOrgAdd = $("#parentOrgNameAdd");
				checkedOrgAdd.empty();
				return checkedOrgAdd.append(x);
			} ],//验证规则
			//			  initScope:this,
			initReady : function() {
				corpInfoObj.initOperatorOrgGrid();
				KCPT.CodeManager.getProvAndCity("corpProvince", "corpCity");
				corpInfoObj.initAddCorpInfoHeight();
			},
			success:function(){
				var oo = corpInfoObj.ctfoFormWithGrid;
				
				oo.form.actionType == "add";

				oo.status = "list";
				
				oo.form.hide();
				
				oo.form.reset();
				
				oo.grid.show();
				
				$.ligerDialog.success("数据保存成功！");
				
				oo.grid.search();
				
//				corpInfoObj.leftTree.seachNode();
			},
			// 从本地获得下拉框
			localSelect : [ {
				name : "SYS_CORP_BUSINESS_SCOPE",
				id : "corpQuale"
			}, {
				name : "SYS_CORP_LEVEL",
				id : "corpLevel"
			} ],
			editLoadFunction : function() {
				removeErrorCss();//删除字段验证提示
				$("#disabledCorpCode").attr("disabled", "disabled");
				$("#selectEntType").attr("disabled", "disabled");
				$("#close").val("取消");
			},//调用修改的时候提前使用的方法
			addLoadFunction : function() {
				removeErrorCss();//删除字段验证提示
				//获取当前树选中组织
				corpInfoObj.initOperatorOrgGrid();
//				corpInfoObj.addOption();
				$("#disabledCorpCode").attr("disabled", false);
				$("#selectEntType").attr("disabled", false);
				$("#close").val("取消");
			},//调用添加时候提前使用的方法
			detailLoadFunction:function(){
				$("#close").val("返回");
			}

		};
		if(!this.TEAM_U && !this.TEAM_D && !this.TEAM_INFO){//如果没有修改、删除权限，操作列不显示
			options.columns.pop();
		}
		corpInfoObj.ctfoFormWithGrid = new ctfoFormWithGrid(options);

		corpInfoObj.grid = corpInfoObj.ctfoFormWithGrid.getGrid();
		KCPT.corpInfoImportExcel = corpInfoObj.ctfoFormWithGrid.getGrid();
		corpInfoObj.gridManager = $("#corpinfoGrid").ligerGetGridManager();
	},
	addOption:function(){
		$("#addCorpInfoForm").find("select").each(function(){
			$(this).html("<option value=''>请选择</option>");
		});
	},
	change : function(date) {
		var corpInfoObj = this;
		var checkedOrg = $("#parentOrgName");
		var checkedOrgId = $("#parentOrgId");
		var orgTypeAdd = $("#orgTypeAdd");
		//添加
		var checkedOrgAdd = $("#parentOrgNameAdd");
		var checkedOrgIdAdd = $("#parentOrgIdAdd");
		if (corpInfoObj.ctfoFormWithGrid.status == "list") {
			checkedOrgId.empty();
			checkedOrg.empty();
			checkedOrg.append(date.data.text);
			checkedOrgId.val(date.data.id);
			orgTypeAdd.val(date.data.entType);
			if (date.data.entType != 2) {
				checkedOrgIdAdd.empty();
				checkedOrgAdd.empty();
				checkedOrgAdd.append(date.data.text);
				checkedOrgIdAdd.val(date.data.id);
				corpInfoObj.initCorpCode(date);
			}
			;
		} else {
			if (corpInfoObj.ctfoFormWithGrid.status == "add") {
				checkedOrgId.empty();
				checkedOrg.empty();
				checkedOrg.append(date.data.text);
				checkedOrgId.val(date.data.id);
				orgTypeAdd.val(date.data.entType);
				if (date.data.entType != 2) {
					checkedOrgIdAdd.empty();
					checkedOrgAdd.empty();
					checkedOrgAdd.append(date.data.text);
					checkedOrgIdAdd.val(date.data.id);
					corpInfoObj.initCorpCode(date);
				} else {
					$.ligerDialog.success("所选组织为车队，不能新建！");
					return;
				}
				
			}
			;
		}
	},
	initCorpCode :function(date){
		if(date !=null && date != undefined){
		if(date.data.parentId==-1){
			//可以输入
		$("#disabledCorpCode").val("");
		$("#disabledCorpCode").attr("readonly", false);
		}else{
			$("#disabledCorpCode").attr("readonly", false);
			//$("#disabledCorpCode").val(date.data.value); 注释之后点击不会连带有默认企业编码
		}
		}
	},
	updateCorpInfo : function(date) {
		var corpInfoObj = this;
		var operatorId = {
			"orgId" : date
		};
		corpInfoObj.ctfoFormWithGrid.update(operatorId);
		corpInfoObj.status = "update";
	},
	detailCorpInfo : function(date) {
		var corpInfoObj = this;
		window.corpInfoDetailEntId = date;
		$("#mainWorkArea").A_Window({ //弹出层的父类的iD
			dragabId: 'mainWorkArea', //可拖动的范围
	        width: 800, //宽度
	        height: 420,//高度
	        load_fn:function(){
	        	$("#corpInfoClose").click(
	        			function(){$("#mainWorkArea").close_ALL_Window();});
	        	$("#corpInfoCloseRightTop").click(
	        			function(){$("#mainWorkArea").close_ALL_Window();});
					//$("#corpInfoEntId").val(date);
	        },
	        url: "model/corpinfo/corpinfodetail.jsp" //"devicestatus/viewDevicestatus.action?vid=" + vid //目标页面或action的地址
		},null,false);
		
		
		
	},
	closePage : function() {
		var obj = this;
		obj.grid.hideAddPage();
	},
	removeOrgById : function(orgId) {
		/**
		 * ** * 删除企业/车队*
		 * 
		 * @param id
		 */
		var obj = this;
		$.ligerDialog.confirm('是否删除企业！', function(yes) {
			if (yes) {
				JAjax("operationmanagement/removeOrg.action?orgId=" + orgId,
						"", "json", obj.removeSuccess, obj.removeError, true);
			}
		});
	},
	revokeEdit : function(orgId, entState) {// 吊销企业
		var corpInfoObj = this;
		var message = "是否吊销企业!";
		if (entState == 1) {
			message = "是否启用企业!";
		}
		$.ligerDialog.confirm(message, function(yes) {
			if (yes) {
				JAjax("operationmanagement/revokeEditOrg.action", {
					"orgId" : orgId,
					"entState" : entState
				}, "json", corpInfoObj.removeSuccess, corpInfoObj.removeError,
						true);
			}
		});
	},
	removeSuccess : function(data) {
		$.ligerDialog.success(eval(JSON.stringify(data.displayMessage)));
		KCPT.root.leftTree.seachNode();
		$("#corpInfoSearchform").trigger("submit");
	},
	removeError : function(data) {
		$.ligerDialog.error(eval(JSON.stringify(data)));
	},
	addCorpInfoValidate : function() {// 加入表单验证
		$("#addCorpInfoForm").validate();
	},
	corpCodeUnique : function() {// 企业代码添加时唯一验证
		var parentId = $("#parentOrgIdAdd").val();
		if(parentId = -1){
		var corpCode = $("#disabledCorpCode").val();
		var updateEntId = $("#updateEntId").val();
		var flag = false;
		$.ajax({
			url : "operationmanagement/isCorpCodeUnique.action",
			type : "POST",
			data : {
				"requestParam.equal.parentId" : parentId,
				"requestParam.equal.corpCode" : corpCode,
				"requestParam.noId" : updateEntId
			},
			dataType : "json",
			cache : false,
			async : false,
			success : function(data) {
				if (data.displayMessage == "success") {
					$.ligerDialog.success("企业代码已经存在请重新输入");
					flag = false;
				} else {
					//	$.ligerDialog.success("组可以");
					flag = true;
				}
			},
			error : function(data) {
				$.ligerDialog.error("通信错误！");
				flag = false;
			}
		});
		return flag;
		}
		return true;
	},
	orgUnique : function() {// 企业添加时唯一验证
		var corpInfoObj = this;
		var parentId = $("#parentOrgIdAdd").val();
		var entName = $("#entNameAdd").val();
		var updateEntId = $("#updateEntId").val();
		var flag = false;
		$.ajax({
			url : "operationmanagement/isOrgUnique.action",
			type : "POST",
			data : {
				"requestParam.equal.parentId" : parentId,
				"requestParam.equal.entName" : entName,
				"requestParam.noId" : updateEntId
			},
			dataType : "json",
			cache : false,
			async : false,
			success : function(data) {
				if (data.displayMessage == "success") {
					$.ligerDialog.success("组织已经存在请重新输入");
					flag = false;
					//return corpInfoObj.isOrgUnique;
				} else {
					//	$.ligerDialog.success("组可以");
					flag = true;
				}
			},
			error : function(data) {
				$.ligerDialog.error("通信错误！");
				flag = false;
			}
		});
		return flag;
	},
	judgeCorpTeam : function() {//判断所选企业是否车队
		var orgTypeAdd = $("#orgTypeAdd").val();
		if (orgTypeAdd != "2") {
			return true;
		} else {
			$.ligerDialog.success("所选组织为车队，不能再新建！");
			return false;
		}
	},
	initAddCorpInfoHeight:function(){
		//var nowHeight = KCPT.root.getCenterSize().height;
		//$("#addCorpInfoForm").find("#addCorpInfoDiv").height(nowHeight-82-200);
	},
	authentication : function() {//权限验证
		this.TEAM_C = checkFunction("FG_MEMU_OPERATIONS_DATA_TEAM_C");//添加
		this.TEAM_U = checkFunction("FG_MEMU_OPERATIONS_DATA_TEAM_U");//修改
		this.TEAM_D = checkFunction("FG_MEMU_OPERATIONS_DATA_TEAM_D");//删除
		this.TEAM_INFO = checkFunction("FG_MEMU_OPERATIONS_DATA_TEAM_INFO");//删除
		if (!this.TEAM_C)
			$("#showAdd").remove();
		this.TEAM_EXP = checkFunction("FG_MEMU_OPERATIONS_DATA_TEAM_IMP");//导出
		if (!this.TEAM_EXP)
			$("#corpInfoExportExcel").remove();
	},
	impExcelFunction :function(){
	$("#impExcelButton").click(function() {
		$("#mainWorkArea").A_Window({ // 弹出层的父类的iD
			dragabId : 'mainWorkArea', // 可拖动的范围
			id : 'addOilRecordDiv',
			width : 600, // 宽度
			height : 160,// 高度
			load_fn : function() {
				$("#importOrgParentId").val($("#parentOrgId").val());
				$("#uploadExcelPageClose").click(function() {
					$("#mainWorkArea").close_ALL_Window();
				});
			},
		 url : 'model/corpinfo/uploadExcelFile.jsp' // 目标页面或action的地址
		});
	});
	},
	initOperatorOrgGrid : function(data) {
		// 获取选中组织
		var orgTypeAdd = $("#orgTypeAdd");
		var corpInfoObj =this;
		var checkedOrgAdd = $("#parentOrgNameAdd");
		var checkedOrgIdAdd = $("#parentOrgIdAdd");
		var checkedOrg = $("#parentOrgName");
		var checkedOrgId = $("#parentOrgId");
		checkedOrgId.empty();
		checkedOrg.empty();
		orgTypeAdd.empty();
		checkedOrgIdAdd.empty();
		checkedOrgAdd.empty();
		
		var operatorEntId = ((KCPT.root.leftTree.loadTreeSelectedData.data.id != null) ? KCPT.root.leftTree.loadTreeSelectedData.data.id : KCPT.user.entId);
		var operatorEntName = (KCPT.root.leftTree.loadTreeSelectedData.data.text != null) ? KCPT.root.leftTree.loadTreeSelectedData.data.text : KCPT.user.entName;
		var operatorParentEntId = KCPT.root.leftTree.loadTreeSelectedData.data.parentEntId;
		checkedOrg.append(operatorEntName);
		checkedOrgId.val(operatorEntId);
		checkedOrgAdd.append(operatorEntName);
		checkedOrgIdAdd.val(operatorEntId);
		orgTypeAdd.val(KCPT.user.entType);
		if(operatorParentEntId==-1){
			//可以输入
		$("#disabledCorpCode").val("");
		$("#disabledCorpCode").attr("readonly", false);
		}else{
			$("#disabledCorpCode").attr("readonly", false);
			//$("#disabledCorpCode").val( KCPT.user.corpCode);  注释之后点击不会连带有默认企业编码
		}
		
	}
	
};
$(document).ready(function() {
	var org = new organization();
	org.orgTree();
	org.authentication();//初始化权限控制
	org.orgInfoGrid();
	KCPT.CodeManager.getProvAndCity("corpProvinceGrid", "corpCityGrid");
	org.impExcelFunction();
	window.orgWin = org;
	//operatorManager.addChildList(org);
	//operatorManager.showObj = org;
	KCPT.onresizeObj = org;
});
