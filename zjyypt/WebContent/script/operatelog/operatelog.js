var OperateLogObj = function() {
	this.OPERATELOG_EXP = false;
	this.titleHeight = $("#operateLogForm").height();
};
OperateLogObj.prototype = {
	tvdiTree : function() {// 初始化组织结构Tree
		var obj = this;
//		obj.leftTree = KCPT.root.leftTree;
//		obj.leftTree.hideTabs();
//		obj.leftTree.hidengrid();
//		obj.leftTree.show();
		KCPT.root.triggerShowObj = obj;
	},
//	show : function(){
//		var  obj = this;
//		
//		obj.tvdiTree();
//	},
	getGridHeight : function(){
		var center = getHeightAndWidth();
		return center.height - this.titleHeight - 86;
	},
	tvdiGrid : function() {// 初始化列表页面Grid
		var obj = this;
		var tvdiHeight = obj.getGridHeight();
		var options = {
			columns : [ {
				display : '操作日期',
				name : 'logUtc',
				width : 150,
				sortable : true,
				align : 'center',
				render : function(row) {
					if (null != row.logUtc && undefined != row.logUtc && "" != row.logUtc) {
						return utc2Date(row.logUtc);
					} else {
						return "未知";
					}
				}
			}, {
				display : '用户名称',
				name : 'opName',
				width : 100,
				sortable : true,
				align : 'center',
				toggle : false
			}, {
				display : 'IP',
				name : 'fromIp',
				width : 100,
				sortable : true,
				align : 'center'
			}, {
				display : '组织名称',
				name : 'enterpriseName',
				width : 140,
				sortable : true,
				align : 'center'
			}, {
				display : '所属应用系统',
				name : 'funCbs',
				width : 100,
				sortable : true,
				align : 'center',
				render : function(row) {
					if (row.funCbs == '0') {
						funCbs = "系统功能";
					}
					return funCbs;
				}
			}, {
				display : '操作内容',
				name : 'opType',
				width : 120,
				sortable : true,
				align : 'center'
			}, {
				display : '描述',
				name : 'logDesc',
				width : 100,
				sortable : true,
				align : 'center'
			}, {
				display : '操作类型',
				name : 'logTypeid',
				width : 100,
				sortable : true,
				align : 'center',
				render : function(row) {
					var logTypeid = "未知";
					if (null != row.logTypeid && undefined != row.logTypeid && "" != row.logTypeid) {
						logTypeid = KCPT.CodeManager.getNameByCode("SYS_LOG_TYPE", row.logTypeid);
					}
					if (undefined == logTypeid) {
						logTypeid = "未知";
					}
					return logTypeid;
				}
			} ],
			showCheckbox : false,
			sortName : 'logUtc',
			url : 'tbAreaManager/findOperateLogForPage.action?requestParam.equal.logSystemType=1',// 数据请求地址
			exportAction:'tbAreaManager/exportExcelDataOperateLog.action?requestParam.equal.logSystemType=1',
			showTitle : false,
			pageSize : 10,
			pageSizeOptions : [ 10, 20, 30, 40 ],
			height : tvdiHeight,
			width : "99.8%",
			autoLoad : false,
			gridDIV : "operatelogcontent",
			contentDiv : "operateLog",
			// 填充数据的tableid
			tableId : 'operateLogTable',
			// 查询条件formid
			searchFormId : 'operateLogForm',
			mainContain : "operateLog",

			container : "", // 包含这个form的对象用来loadhtml
			loadHtml : "",// 增加页面使用的html
			formId : '',// 页面中使用的form的ID 用来在新增和修改的时候 submitId : ''
			closeId : '',// 重置按钮的id,
			addURL : '', // 添加的时候使用的url
			detailURL : '',// 获得详情方法 在修改前要调用
			updateURL : '',// 修改的时候使用的url
			editModel : "",
			Buttons : [ {//导出
				id : "operatLogExportExcel",
				fun : function()
				{
					obj.grid.exportExcel(1, 2);
				}
			}],
			gridBeforeSubmit : function() {
				var entId = KCPT.user.entId;
				if (!entId) {
					$.ligerDialog.warn("获取组织ID失败！", "提示");
					return false;
				}
				var selectParams = "";
				// 时间
				var dmsgSrtimeStart = $("#startTime").val();
				if ($.trim(dmsgSrtimeStart).length > 0) {
					selectParams += "<input type='hidden' name='requestParam.equal.startTime' value='" + date2utc(dmsgSrtimeStart) + "' />";
				}
				var dmsgSrtimeEnd = $("#endTime").val();
				if ($.trim(dmsgSrtimeEnd).length > 0) {
					selectParams += "<input type='hidden' name='requestParam.equal.endTime' value='" + date2utcEnd(dmsgSrtimeEnd) + "' />";
				}
				if ($.trim(dmsgSrtimeStart).length > 0 && $.trim(dmsgSrtimeEnd).length > 0) {
					if (dmsgSrtimeStart > dmsgSrtimeEnd) {
						$.ligerDialog.warn("开始时间不能大于结束时间！", "提示");
						return false;
					}
				}
				$("#tvdiSelectParams").empty();
				$("#tvdiSelectParams").append(selectParams);
				return true;
			}
		};
		obj.grid = new ctfoGrid(options);
		obj.gridManager = $("#operateLogTable").ligerGetGridManager();
	},
	change : function(node, chlidrens, parent) {
		// 组织类型，1为企业，2为车队 node.data.entType
		// 父id 根节点为-1 node.data.parentId
		// 车队类型: 1:默认车队,0：不为默认车队 node.data.isdeteam
		// 父节点id parent.id 父节点名字 parent.name
		// 子节点id chlidrens[0].id 子节点名字 chlidrens[0].text
		var name = node.data.text;
		var opNodeName = $("#opNodeName");
		var opEntId = $("#opEntId");
		opNodeName.empty();
		opEntId.empty();
		opEntId.val(node.data.id);
		opNodeName.append(name.length > 12 ? name.substring(0, 10) + "..." : name);
		opNodeName.attr("title", name);
		// this.operateLogSubmit(node.data.id);
	},
	operateLogSubmit : function(entId) {
		window.operatelogEntId = entId;
		$("#operateLogForm").trigger("submit");
	},
	// 增加的权限验证
	authentication : function() {
		this.OPERATELOG_EXP = checkFunction("FG_MEMU_STATIC_SELECT_LOG_EMP");// 导出
		if (!this.OPERATELOG_EXP) {
			$("#operatLogExportExcel").remove();
		}
	},
	onResize : function() {
		var obj = this;
		if (obj.gridManager) {
			obj.gridManager.setHeight(obj.getGridHeight());
		}
	}
};
$(function() {
	var operateLogObj = new OperateLogObj();
	operateLogObj.tvdiTree();
	operateLogObj.authentication();
	operateLogObj.tvdiGrid();
	//runManager.addChildList(operateLogObj);
	//runManager.showObj = operateLogObj;
	KCPT.CodeManager.getSelectList("SYS_LOG_TYPE", "selectId");
	KCPT.onresizeObj = operateLogObj;
	
	var name = (KCPT.root.leftTree.loadTreeSelectedData.data.text != null) ? KCPT.root.leftTree.loadTreeSelectedData.data.text : KCPT.user.entName;
	var opNodeName = $("#opNodeName");
	var opEntId = $("#opEntId");
	opNodeName.empty();
	opEntId.empty();
	opNodeName.append(name.length > 12 ? name.substring(0, 10) + "..." : name);
	opNodeName.attr("title", name);
	opEntId.val(((KCPT.root.leftTree.loadTreeSelectedData.data.id != null) ? KCPT.root.leftTree.loadTreeSelectedData.data.id : KCPT.user.entId));
});
