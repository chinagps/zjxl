var thVehicleDispatchReport = function() {
	this.THVEHICLEDISPATCHREP_EMP = false;
	this.titleHeight = $("#tvdReportForm").height();
};
thVehicleDispatchReport.prototype = {
	tvdrTree : function() {// 初始化组织结构Tree
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
		this.THVEHICLEDISPATCHREP_EMP = checkFunction("FG_MEMU_STATIC_SELECT_DISPATCH_EMP");// 导出
		if (!this.THVEHICLEDISPATCHREP_EMP) {
			$("#dispatchReportExportExcel").remove();
		}
	},
	getGridHeight : function(){
		var center = getHeightAndWidth();
		return center.height - this.titleHeight - 183;
	},
	tvdrGrid : function() {// 初始化列表页面Grid
		var obj = this;
		obj.tvdrTree();
		var tvdrHeight = obj.getGridHeight();
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
			sortName : 'umsgSrtime',
			url : 'entbusiness/findReportForListPage.action',// 数据请求地址
			exportAction:'entbusiness/exportExcelDataDispatchReport.action',
			// data : "",
			showTitle : false,
			pageSize : 10,
			pageSizeOptions : [ 10, 20, 30, 40 ],
			height : tvdrHeight,
			width : "99.8%",
			autoLoad : false,
			contentDiv : "tvdReport",
			mainContain : "tvdReport",
			// 填充数据的tableid
			tableId : 'tvdReportTable',
			// 查询条件formid
			searchFormId : 'tvdReportForm',
			Buttons : [{//导出
				id : "dispatchReportExportExcel",
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
				var umsgSrtimeStart = $("#umsgSrtimeStart").val();
				if ($.trim(umsgSrtimeStart).length > 0) {
					selectParams += "<input type=\"hidden\" name=\"requestParam.equal.umsgSrtimeStart\" value=\"" + strToUtc(umsgSrtimeStart) + "\" />";
				}
				var umsgSrtimeEnd = $("#umsgSrtimeEnd").val();
				if ($.trim(umsgSrtimeEnd).length > 0) {
					selectParams += "<input type=\"hidden\" name=\"requestParam.equal.umsgSrtimeEnd\" value=\"" + strToUtc(umsgSrtimeEnd) + "\" />";
				}
				selectParams += "<input type=\"hidden\" name=\"requestParam.equal.umsgSrtimeOrderBy\" value=\"desc\" />";
				if (undefined != umsgSrtimeStart && undefined != umsgSrtimeEnd) {
					if ($.trim(umsgSrtimeStart).length > 0 && $.trim(umsgSrtimeEnd).length > 0) {
						if (strToUtc(umsgSrtimeStart) > strToUtc(umsgSrtimeEnd)) {
							$.ligerDialog.warn("开始时间不能大于结束时间！", "提示");
							return false;
						}
					}
				}
				
				var myDate = new Date();
				if (undefined != umsgSrtimeStart){
					if ($.trim(umsgSrtimeStart).length > 0) {
						if (myDate.getTime() < strToUtc(umsgSrtimeStart)) {
							$.ligerDialog.warn("起始时间不能晚于现在时间 ！", "提示");
							return false;
						}
					}
				}
				
				$("#tvdrSelectParams").empty();
				$("#tvdrSelectParams").append(selectParams);
				return true;
			}
		};
		obj.grid = new ctfoGrid(options);
		obj.gridManager = $("#tvdReportTable").ligerGetGridManager();
	},
	onResize : function(){
		var obj = this;
		if(obj.gridManager){
			obj.gridManager.setHeight(obj.getGridHeight());
		}
	}
};
