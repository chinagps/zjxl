/**
 * 创建form对象用来实现 增加 修改 详情页面的 使用 预想是在列表页展示时候使用
 * 
 * @param o = {
 *            container:obj //包含这个form的对象用来loadhtml loadHtml : '',//增加页面使用的html formId : '',//页面中使用的form的ID 用来在新增和修改的时候 submitId : '',// 提交时候使用的buttonID resetId : '',//重置按钮的id, addURL : '', //添加的时候使用的url detailURL : '',//获得详情方法 在修改前要调用 updateURL : ''//修改的时候使用的url beforeSubmit : function(){},//提交之前的使用方法 如果返回false则不能提交用来做最后一步校验 toFunData : ['utc',function(x){return
 *            date2utc(x)},'name',function(){}....],// otherData : {'name':value}, toAddOtherData:['name',function(xx){ return {"name":xx}},'name'function(xx){return {"name":xx}}],//在详情的时候追加到otherData中去 用来保存不变的一些数据 addLoadFunction:funciton(){},//调用添加时候提前使用的方法 editLoadFunction：function(){},//调用修改的时候提前使用的方法 detailLoadFunction:funciton(){},//详情时候提前使用的方法 toEditInitData：['name',function(x){reutrn
 *            utc2date(x)},'name'function(){}], rules : {},//验证规则 selects : [],//ajax下拉框 } editModel:'sysOperator'
 * @returns
 */
var publishInfo = function() {
	this.BULLETIN_C=false;//添加
	this.BULLETIN_U=false;//修改
	this.BULLETIN_D=false;//删除
	this.BULLETIN_RELEASE=false;//发布
	this.BULLETIN_UPSET=false;//置顶
	this.titleHeight = $("#publishSearchform").height();
};
publishInfo.prototype = {
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
	getGridHeight : function(){
		var center = getHeightAndWidth();
		return center.height - this.titleHeight - 86;
	},
	authentication :function(){//权限验证		
		this.BULLETIN_C=checkFunction("FG_MEMU_MANAGER_BULLETIN_C");//添加
		if(!this.BULLETIN_C)$("#showAdd").remove();
		this.BULLETIN_U=checkFunction("FG_MEMU_MANAGER_BULLETIN_U");//修改
		this.BULLETIN_D=checkFunction("FG_MEMU_MANAGER_BULLETIN_D");//删除
		this.BULLETIN_RELEASE=checkFunction("FG_MEMU_MANAGER_BULLETIN_RELEASE");//发布
		this.BULLETIN_UPSET=checkFunction("FG_MEMU_MANAGER_BULLETIN_UPSET");//置顶
	},
	change : function(date) {
		var publishMngObject = this;
		if(publishMngObject.ctfoFormWithGrid.status == "list"
			|| publishMngObject.ctfoFormWithGrid.status == "add"){
			var checkedOrg = $("#parentOrgNameOper");
			var checkedOrgId = $("#parentOrgIdOper");
			checkedOrgId.empty();
			checkedOrg.empty();
			checkedOrg.append(date.data.text);
			checkedOrgId.val(date.data.id);
			
			var checkedOrgAdd = $("#parentOrgNameAddOper");
			var checkedOrgIdAdd = $("#parentOrgIdAddOper");
			checkedOrgIdAdd.empty();
			checkedOrgAdd.empty();
			checkedOrgAdd.append(date.data.text);
			checkedOrgIdAdd.val(date.data.id);
		}
		var checkedOrg = $("#parentOrgNameOper");
		var checkedOrgId = $("#parentOrgIdOper");
		checkedOrgId.empty();
		checkedOrg.empty();
		checkedOrg.append(date.data.text);
		checkedOrgId.val(date.data.id);
		
		var checkedOrgAdd = $("#parentOrgNameAddOper");
		var checkedOrgIdAdd = $("#parentOrgIdAddOper");
		checkedOrgIdAdd.empty();
		checkedOrgAdd.empty();
		checkedOrgAdd.append(date.data.text);
		checkedOrgIdAdd.val(date.data.id);
		
		
		// 点击树节点时，将节点ID作为查询条件
		//var entId = $("#entId");
		//entId.empty();
		//entId.val(date.data.id);
		//$("#addEntId").val(date.data.id);
		//$("#publishSearchform").submit();
	},
	showPublishInfoGrid : function() {// 初始化列表页面Grid
		var publishInfoObject = this;
		var height = publishInfoObject.getGridHeight();
		var options = {
			// 列
			columns : [ {
				display : '资讯主题',
				name : 'infoTheme',
				width : 180,
				sortable : true,
				align : 'center',
				toggle : false
			}, {
				display : '资讯类型',
				name : 'infoType',
				width : 100,
				sortable : true,
				align : 'center',
				render : function(row) {
					var tt = row.infoType;
					if (tt == "001") {
						return "系统公告";
					} else if (tt == "002") {
						return "企业公告";
					} else if (tt == "003") {
						return "政策法规";
					} else if (tt == "004") {
						return "行业快讯";
					} else if (tt == "005") {
						return "企业资讯";
					} else {
						return "未知类型";
					}
				}
			}, {
				display : '资讯状态',
				name : 'infoStatus',
				width : 100,
				sortable : true,
				align : 'center',
				render : function(row) {
					var tt = row.infoStatus;
					if (tt == "0") {
						return "未发布";
					} else if (tt == "1") {
						return "已发布";
					} else if (tt == "2") {
						return "吊销";
					} else {
						return "其他";
					}
				}
			}, {
				display : '是否置顶',
				name : 'isSettop',
				width : 100,
				sortable : true,
				align : 'center',
				render : function(row) {
					var tt = row.isSettop;
					if (tt == "0") {
						return "否";
					} else if (tt == "1") {
						return "是";
					} else {
						return "其他";
					}
				}
			}, {
				display : '发布时间',
				name : 'publishTime',
				width : 100,
				sortable : true,
				align : 'center',
				render : function(row) {
					if ("0" == row.publishTime) {
						return "";
					} else {
						return utcToDate(row.publishTime);
					}

				}
			}, {
				display : '失效时间',
				name : 'enddate',
				width : 100,
				sortable : true,
				align : 'center',
				render : function(row) {
					return utcToDate(row.enddate);
				}
			}, {
				display : '操作',
				name : 'entState',
				width : 250,
				sortable : true,
				align : 'center',
				render : function(row) {
					var revoke = "";
					var infoStatus = "";
					var remove = '';
					var edit = "";
					
					if(publishInfoObject.BULLETIN_U){
						 edit = '<a href="javascript:void(0)" onclick="objop.updatepublishInfo(' + row.infoId + ')">编辑</a>';
					}

					if (row.infoStatus == "1") {
						if (row.isSettop == "0") {
							if(publishInfoObject.BULLETIN_UPSET){
								revoke = '<a href="javascript:void(0)" onclick="objop.moveToTop(' + row.infoId + ',1)">设为置顶</a>';
							}							
						} else {
							if(publishInfoObject.BULLETIN_UPSET){
								revoke = '<a href="javascript:void(0)" onclick="objop.cancelToTop(' + row.infoId + ',1)">取消置顶</a>';
							}						
						}
					} else {						
							revoke = '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;';						
					}

					if (row.infoStatus == "0") {
						if(publishInfoObject.BULLETIN_RELEASE){
							infoStatus = '<a href="javascript:void(0)" onclick="objop.publishing(' + row.infoId + ',1)">发布资讯</a>';
						}						
					} else {
						if(publishInfoObject.BULLETIN_RELEASE){
							infoStatus = '<a href="javascript:void(0)" onclick="objop.cancelPublish(' + row.infoId + ',1)">取消发布</a>';
						}						
					}

					if (row.infoStatus == "0") {
						if(publishInfoObject.BULLETIN_D){
							remove = '<a href="javascript:void(0)" onclick="objop.removePublishById(' + row.infoId + ')">删除</a>';
						}					
					} else {
						remove = '&nbsp;&nbsp;&nbsp;&nbsp;';
					}
					
					return edit + "&nbsp;&nbsp;&nbsp;" + revoke + "&nbsp;&nbsp;&nbsp;" + infoStatus + "&nbsp;&nbsp;&nbsp;" + remove;
				}
			} ],
			container : "publishSearchAddform", // 包含这个form的对象用来loadhtml
			loadHtml : 'model/publishInfo/addPublish.jsp',// 增加页面使用的html
			formId : 'addPublishForm',// 页面中使用的form的ID 用来在新增和修改的时候 submitId :
			submitId : 'addPublishFormsubmit',
			closeId : 'close',// 重置按钮的id,
			showCheckbox : false,
			sortName : 'infoId',
			url : "systemmng/publish!findPublishForListPage.action?requestParam.equal.sysRequest='002','005'",// 数据请求地址
			// data : "infoId=4",
			showTitle : false,
			pageSize : 10,
			pageSizeOptions : [ 10, 20, 30, 40 ],
			height : height,
			width : "99.8%",
			autoLoad : false,
			mainContain : "publishInfomng",
			Buttons : [ {
				id : "showAdd",
				fun : function() {
					publishInfoObject.ctfoFormWithGrid.add();
					publishInfoObject.status = "add";
				}
			} ],
			gridDIV : "publishInfomngcontent",
			// 填充数据的tableid
			tableId : 'publishInfoGrid',
			// 查询条件formid
			searchFormId : 'publishSearchform',
			addURL : 'systemmng/addPublishInfo.action', // 添加的时候使用的url
			detailURL : 'systemmng/publish!findPublishByParam.action',// 获得详情方法
			// 在修改前要调用
			updateURL : 'systemmng/publish!updatePublishInfo.action',// 修改的时候使用的url
			editModel : "tbPublishInfo",
			beforeSubmit : function() {
				var content = publishContent.getContent();
				if(content == "<p></p>"){
					alert("资讯内容不能为空！");
					return false;
				}
				var tbPublishInfoInfoContent = $("#tbPublishInfoInfoContent");
				tbPublishInfoInfoContent.empty();
				tbPublishInfoInfoContent.val(content);
				return true;
			},
			/*
			 * selects : [{ id : 'roleSelectId', url : 'systemmng/findRoleList.action', i : 1, userData : {}, idMap : 'roleId', textMap : 'roleName', userMap : [] }],//ajax下拉框
			 */
			addLoadFunction : function() {
				// 加载新增页面
				$("#warn").html("资讯信息-增加(<span class=\"red\">*</span>号为必填项)");
				$("#editor_iframe").empty();
				var editorOption = {
					UEDITOR_HOME_URL : 'script/plugins/webEdit/',
					elementPathEnabled : false,
					autoClearinitialContent : true,
					iframeCssUrl : 'script/plugins/webEdit/themes/default/iframe.css',
					initialContent : '在这里编辑您的企业资讯内容...'// 初始化编辑器的内容
				// textarea : 'tbPublishInfo.infoContent'
				};
				var publishContent = new baidu.editor.ui.Editor(editorOption);
				publishContent.render("editor_iframe");
				window.publishContent = publishContent;
				var center = getHeightAndWidth();
				var theight = center.height - 72;
				$("#form_div").attr("style", "height:" + theight + "px;overflow: auto;");
				
				//设置滚动条至顶 by malq 2012-05-24
				$("#form_div").scrollTop(0);
				
				$("#createBy").val(KCPT.user.opId);
				//$("#addEntId").val(KCPT.user.entId);
				
				publishInfoObject.initOperatorOrgGrid();
			},
			editLoadFunction : function() {
				$("#warn").html("资讯信息-修改(<span class=\"red\">*</span>号为必填项)");
				// $("#editor_iframe").empty();
				var center = getHeightAndWidth();
				var theight = center.height - 72;
				$("#form_div").attr("style", "height:" + theight + "px;overflow: auto;");
				
				//设置滚动条至顶 by malq 2012-05-24
				$("#form_div").scrollTop(0);
				
				$("#createBy").val(KCPT.user.opId);
			},
			toEditInitData : [ 'tbPublishInfo.enddate', function(x) {
				return utcToDate(x).substring(0, 10);
			}, 'tbPublishInfo.infoContent', function(x) {
				$("#editor_iframe").empty();
				// alert("initialContent: "+x);
				var editorOption = {
					UEDITOR_HOME_URL : 'script/plugins/webEdit/',
					elementPathEnabled : false,
					autoClearinitialContent : false,
					iframeCssUrl : 'script/plugins/webEdit/themes/default/iframe.css',
					initialContent : x
				// 初始化编辑器的内容
				// textarea : 'tbPublishInfo.infoContent'
				};
				var publishContent = new baidu.editor.ui.Editor(editorOption);
				publishContent.render("editor_iframe");
				window.publishContent = publishContent;
				return publishContent;
			} ],
			toFunData : [ 'tbPublishInfo.enddate', function(x) {
				return date2utc(x);
			} ]/*,
			gridBeforeSubmit : function() {
				return true;
			}*/
		};
		publishInfoObject.ctfoFormWithGrid = new ctfoFormWithGrid(options);
		publishInfoObject.grid = publishInfoObject.ctfoFormWithGrid.getGrid();
		publishInfoObject.gridManager = $("#publishInfoGrid").ligerGetGridManager();
	},
	addUpdateSetEditor : function() {
		var content = publishContent.getContent();
		var tbPublishInfoInfoContent = $("#tbPublishInfoInfoContent");
		tbPublishInfoInfoContent.empty();
		tbPublishInfoInfoContent.val(content);
		return true;
	},
	updatepublishInfo : function(infoId) {
		// 修改企业资讯信息
		var publishInfoObject = this;
		var publishId = {
			"requestParam.equal.infoId" : infoId
		};
		publishInfoObject.ctfoFormWithGrid.update(publishId);
		publishInfoObject.status = "update";
		
//		publishInfoObject.initOperatorOrgGrid();
	},
	initOperatorOrgGrid : function(data) {
		var checkedOrg = $("#parentOrgNameOper");
		var checkedOrgId = $("#parentOrgIdOper");
		var checkedOrgAdd = $("#parentOrgNameAddOper");
		var checkedOrgIdAdd = $("#parentOrgIdAddOper");
		
		
		var operatorEntId = ((KCPT.root.leftTree.loadTreeSelectedData.data.id != null) ? KCPT.root.leftTree.loadTreeSelectedData.data.id : KCPT.user.entId);
		var operatorEntName = (KCPT.root.leftTree.loadTreeSelectedData.data.text != null) ? KCPT.root.leftTree.loadTreeSelectedData.data.text : KCPT.user.entName;
		
		checkedOrgId.empty();
		checkedOrg.empty();
		checkedOrg.append(operatorEntName);
		checkedOrgId.val(operatorEntId);
		
		checkedOrgIdAdd.empty();
		checkedOrgAdd.empty();		
		checkedOrgAdd.append(operatorEntName);
		checkedOrgIdAdd.val(operatorEntId);
		
	},
	moveToTop : function(infoId) {
		// 企业资讯置顶
		if (infoId) {
			var publishInfoObject = this;
			$.ligerDialog.confirm('是否置顶企业资讯！', function(yes) {
				if (yes) {
					var param = {
							"requestParam.equal.infoId" : infoId
						};
						JAjax("systemmng/publish!moveToTop.action", param, "json", function() {
							$.ligerDialog.success("置顶成功！");
							publishInfoObject.grid.reload();
						}, null, true);
				}
			});		
		}
	},
	cancelToTop : function(infoId) {
		// 企业资讯取消置顶
		if (infoId) {
			var publishInfoObject = this;
			$.ligerDialog.confirm('是否取消置顶！', function(yes) {
				if (yes) {
					var param = {
							"requestParam.equal.infoId" : infoId
						};
						JAjax("systemmng/publish!cancelToTop.action", param, "json", function() {
							$.ligerDialog.success("取消置顶成功！");
							publishInfoObject.grid.reload();
						}, null, true);
				}
			});		
		}
	},
	publishing : function(infoId) {
		// 发布企业资讯
		if (infoId) {
			var publishInfoObject = this;
			$.ligerDialog.confirm('是否发布企业资讯！', function(yes) {
				if (yes) {
					var param = {
							"requestParam.equal.infoId" : infoId
						};
						JAjax("systemmng/publish!publishing.action", param, "json", function() {
							$.ligerDialog.success("发布企业资讯成功！");
							publishInfoObject.grid.reload();
						}, null, true);
				}
			});		
		}
	},
	cancelPublish : function(infoId) {
		// 取消发布
		if (infoId) {
			var publishInfoObject = this;
			$.ligerDialog.confirm('是否取消企业资讯！', function(yes) {
				if (yes) {
					var param = {
						"requestParam.equal.infoId" : infoId
					};
					JAjax("systemmng/publish!cancelPublish.action", param, "json", function() {
						$.ligerDialog.success("取消发布成功！");
						publishInfoObject.grid.reload();
					}, null, true);
				}
			});
		}
	},
	removePublishById : function(infoId) {
		// 删除企业资讯信息
		if (infoId) {
			var publishInfoObject = this;
			$.ligerDialog.confirm('是否删除企业资讯！', function(yes) {
				if (yes) {
					var param = {
						"requestParam.equal.infoId" : infoId
					};
					JAjax("systemmng/publish!removePublishByParam.action", param, "json", function() {
						$.ligerDialog.success("删除成功！");
						publishInfoObject.grid.reload();
					}, null, true);
				}
			});
		}
	},
	closePage : function() {
		// var obj = this;
		// obj.grid.hideAddPage();
	},
	findRoleList : function() {
		/*
		 * var publishInfoObject = this; JAjax("systemmng/findRoleList.action", null, "json", publishInfoObject.createRoleSelect, null, true);
		 */
	},
	createRoleSelect : function(data) {// 创建角色下拉框
		/*
		 * var roleselect = $("#roleSelectIdSeach"); var objArray = eval(data); var options = ""; var length = objArray.length; for (j = 0; j < length; j++) { var obj = objArray[j]; options +="<option vale='"+obj.roleId+"' >"+obj.roleName+"</option>"; }// end for try { roleselect.append(options); } catch (ex) { }
		 */
	},
	addPublishValidate : function() {// 加入表单验证
		// $("#addPublishForm").validate();
	},
	onResize : function() {
		var obj = this;
		if (obj.gridManager) {
			obj.gridManager.setHeight(obj.getGridHeight());
		}
		var center = getHeightAndWidth();
		var theight = center.height - 72;
		$("#form_div").attr("style", "height:" + theight + "px;overflow: auto;");
	}
};

/**
 * 页面加载初始化
 */
$(document).ready(function() {
	var publish = new publishInfo();
	publish.authentication();
	publish.orgTree();
	publish.showPublishInfoGrid();
	
	//systemManager.addChildList(publish);
	//systemManager.showObj = publish;
	window.objop = publish;
	KCPT.onresizeObj = publish;
	publish.initOperatorOrgGrid();
});