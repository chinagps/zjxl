var thVehicleDispatchIssued = function() {
	this.THVEHICLEDISPATCH_EMP = false;
	this.titleHeight = $("#tvdIssuedForm").height();
};
thVehicleDispatchIssued.prototype = {
	tvdiTree : function() {// 初始化组织结构Tree
		var obj = this;
		obj.leftTree = KCPT.root.leftTree;
//		obj.leftTree.showTabs();
//		obj.leftTree.showGrid();
//		obj.leftTree.show();
//		KCPT.root.triggerShowObj = obj;
	},
//	show : function() {
//		var obj = this;
//
//		obj.tvdiTree();
//	},
	// 增加的权限验证
	authentication : function() {
		this.THVEHICLEDISPATCH_EMP = checkFunction("FG_MEMU_STATIC_SELECT_DISPATCH_EMP");// 导出
		if (!this.THVEHICLEDISPATCH_EMP) {
			$("#dispatchIssuedExportExcel").remove();
		}
	},
	getGridHeight : function(){
		var center = getHeightAndWidth();
		return center.height - this.titleHeight - 183;
	},
	tvdiGrid : function() {// 初始化列表页面Grid
		var obj = this;
		var tvdiHeight = obj.getGridHeight();
		var options = {
			columns : [ {
				display : '车牌号',
				name : 'vehicleNoTmp',
				width : 100,
				sortable : true,
				align : 'center',
				toggle : false
			}, {
				display : '车牌颜色',
				name : 'plateColor',
				width : 100,
				sortable : true,
				align : 'center',
				render : function(row) {
					var plateColor = "";
					if (null != row.plateColor && undefined != row.plateColor && "" != row.plateColor) {
						plateColor = KCPT.CodeManager.getNameByCode("SYS_VCL_PLATECOLOR", row.plateColor);
						if (undefined == plateColor) {
							plateColor = "";
						}
					}
					return plateColor;
				}
			}, {
				display : '发送时间',
				name : 'dmsgSrtime',
				width : 150,
				sortable : true,
				align : 'center',
				render : function(row) {
					if (null != row.dmsgSrtime && undefined != row.dmsgSrtime && "" != row.dmsgSrtime) {
						return dateFormat(new Date(parseInt(row.dmsgSrtime)), "yyyy-MM-dd hh:mm");
					} else {
						return "";
					}
				}
			}, {
				display : '发送人员',
				name : 'dsendUsername',
				width : 100,
				sortable : true,
				align : 'center'
			}, {
				display : '下发状态',
				name : 'dmsgStatus',
				width : 100,
				sortable : true,
				align : 'center',
				render : function(row) {
					if (1 == row.dmsgStatus) {
						return "未读";
					} else if (0 == row.dmsgStatus) {
						return "已读";
					} else {
						return "未知";
					}
				}
			}, {
				display : '消息内容',
				name : 'dmsgContent',
				width : 150,
				sortable : true,
				align : 'center',
				render : function(row) {
					var dmsgContent = row.dmsgContent;
					if (null != dmsgContent && undefined != dmsgContent && "" != dmsgContent && 15 < dmsgContent.length) {
						dmsgContent = dmsgContent.substring(0, 15) + "...";
					}
					return "<span title=\"" + row.dmsgContent + "\">" + dmsgContent + "</span>";
				}
			} ],
			showCheckbox : false,
			sortName : 'dmsgSrtime',
			url : 'entbusiness/findIssuedForListPage.action',// 数据请求地址
			exportAction:'entbusiness/exportExcelDataDispatchIssued.action',
			showTitle : false,
			pageSize : 10,
			pageSizeOptions : [ 10, 20, 30, 40 ],
			height : tvdiHeight,
			width:"99.8%",
			autoLoad : false,
			mainContain : "tvdIssued",
			contentDiv : "tvdIssued",
			// 填充数据的tableid
			tableId : 'tvdIssuedTable',
			// 查询条件formid
			searchFormId : 'tvdIssuedForm',
			Buttons : [{//导出
				id : "dispatchIssuedExportExcel",
				fun : function()
				{
					obj.grid.exportExcel(1, 2);
				}
			}],
			gridBeforeSubmit : function() {
				var rows = obj.leftTree.GridManager.getCheckedRows();
				if (rows == null || rows == undefined || rows == "" || 0 >= rows.length) {
					$.ligerDialog.alert("请选择车辆！", "提示");
					return false;
				}
				var selectParams = "";
				for ( var i = 0; i < rows.length; i++) {
					selectParams += "<input type=\"hidden\" name=\"vids\" value=\"" + rows[i].vid + "\" />";
				}
				// 时间
				var dmsgSrtimeStart = $("#dmsgSrtimeStart").val();
				if ($.trim(dmsgSrtimeStart).length > 0) {
					selectParams += "<input type=\"hidden\" name=\"requestParam.equal.dmsgSrtimeStart\" value=\"" + strToUtc(dmsgSrtimeStart) + "\" />";
				}
				var dmsgSrtimeEnd = $("#dmsgSrtimeEnd").val();
				if ($.trim(dmsgSrtimeEnd).length > 0) {
					selectParams += "<input type=\"hidden\" name=\"requestParam.equal.dmsgSrtimeEnd\" value=\"" + strToUtc(dmsgSrtimeEnd) + "\" />";
				}
				selectParams += "<input type=\"hidden\" name=\"requestParam.equal.dmsgSrtimeOrderBy\" value=\"desc\" />";
				if (undefined != dmsgSrtimeStart && undefined != dmsgSrtimeEnd) {			
					if ($.trim(dmsgSrtimeStart).length > 0 && $.trim(dmsgSrtimeEnd).length > 0) {
						if (strToUtc(dmsgSrtimeStart) > strToUtc(dmsgSrtimeEnd)) {
							$.ligerDialog.warn("开始时间不能大于结束时间！", "提示");
							return false;
						}					
					}					
				}
				
				var myDate = new Date();
				if (undefined != dmsgSrtimeStart){
					if ($.trim(dmsgSrtimeStart).length > 0) {
						if (myDate.getTime() < strToUtc(dmsgSrtimeStart)) {
							$.ligerDialog.warn("起始时间不能晚于现在时间 ！", "提示");
							return false;
						}
					}
				}
				$("#tvdiSelectParams").empty();
				$("#tvdiSelectParams").append(selectParams);
				return true;
			}
		};
		obj.grid = new ctfoGrid(options);
		obj.gridManager = $("#tvdIssuedTable").ligerGetGridManager();
	},
	onResize : function(){
		var obj = this;
		if(obj.gridManager){
			obj.gridManager.setHeight(obj.getGridHeight());
		}
	}
};
