/**
 * 
 */
var classLineMng = function() {
	this.name = "线路管理";
	this.CLASSLINE_C = false;// 增加
	this.CLASSLINE_U = false;// 修改
	this.CLASSLINE_D = false;// 删除
	this.CLASSLINE_M = false;// 绑定车辆
	this.CLASSLINE_UnBind = false;// 解除绑定

	this.titleHeight1 = $("#searchClassLineForm").height();
	this.titleHeight2=$("#searchClassLineBindForm").height();
};
classLineMng.prototype = {
	// 线路管理缓存
	cache : {
		// 添加线路、更新线路为:add,绑定车辆：update
		bindcarActionType : "add"
	},
	// 左侧树的列表
	orgTree : function() {
		// 初始化组织结构Tree
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
	// 选择左侧树列表，在右边显示所选企业
	change : function(date) {
		var checkedOrg = $("#parentOrgName");
		var checkedOrgId = $("#parentOrgId");
		var checkedOrg3 = $("#parentOrgName3");
		var parentOrgNameBindSearchText = $("#parentOrgNameBindSearch");

		var checkedOrgId3 = $("#parentOrgId3");
		var parentOrgIdClass = $("#parentOrgIdClass");
		var parentOrgIdBindstatus = $("#parentOrgIdBindstatus");

		var entTypeId = $("#entTypeId");
		var lineIdId = $("#lineIdId").val();
		if (date.data.entType != 2) {
			checkedOrg.empty();
			checkedOrg.append(date.data.text);
			parentOrgIdClass.empty();
			parentOrgIdClass.val(date.data.id);
			parentOrgIdBindstatus.empty();
			parentOrgIdBindstatus.val(date.data.id);

			checkedOrg3.empty();
			checkedOrg3.append(date.data.text);
			parentOrgNameBindSearchText.empty();
			parentOrgNameBindSearchText.append(date.data.text);

			checkedOrgId3.empty();
			checkedOrgId3.val(date.data.id);
			entTypeId.empty();
			entTypeId.val(date.data.entType);
		} else {
			$.ligerDialog.success('请选择线路所属企业！');
		}
		// checkedOrgId.empty();
		checkedOrgId.val(date.data.id);
	},
	init : function() {
		this.initEvent();
		this.loadBindStatusGrid();
	},
	initEvent : function() {
		// init tab
		var _container = $("#editclasslinepage");
		_container.find(".areaTab_all a").each(function(i) {
			$(this).bind('click', function() {
				_container.find(".areaTab_all a").each(function(j) {
					$(this).removeClass("areaTab_back");
				});
				$(this).addClass("areaTab_back");
				_container.find("div.right_c").hide();
				_container.find("div.right_c").eq(i).show();
			});
		});
	},
	getGridHeight1 : function(){
		var center = getHeightAndWidth();
		return center.height - this.titleHeight1 - 121;
	},
	getGridHeight2 : function(){
		var center = getHeightAndWidth();
		return center.height - this.titleHeight2-213;
	},
	// 生成右侧列表
	getGrid : function() {
		var obj = this;
		var height = obj.getGridHeight1();
		var options = {
			// 列
			columns : [ {
				display : '序号',
				name : 'sqlid',
				width : 100,
				sortable : true,
				align : 'center'
			}, {
				display : '线路名称',
				name : 'lineName',
				width : 100,
				sortable : true,
				align : 'center'
			}, {
				display : '线路编码',
				name : 'lineCode',
				width : 100,
				sortable : true,
				align : 'center'
			}, {
				display : '所属企业',
				name : 'entName',
				width : 100,
				sortable : true,
				align : 'center'

			}, {
				display : '编辑人',
				name : 'opName',
				width : 100,
				sortable : true,
				align : 'center',
				render : function(row) {
					if (null != row.opName && undefined != row.opName && "" != row.opName) {
						return row.opName;
					} else {
						return "--";
					}
				}
			}, {
				display : '编辑时间',
				name : 'updateTime',
				width : 100,
				sortable : true,
				align : 'center',
				render : function(row) {
					if (null != row.updateTime && undefined != row.updateTime && "" != row.updateTime) {
						return utc2Date(row.updateTime);
					} else {
						return "--";
					}
				}
			}, {
				display : '操作',
				name : 'entState',
				width : 150,
				sortable : true,
				align : 'center',
				render : function(row) {
					var edit = "";
					var del = "";
					var mng = "";
					if (classline.CLASSLINE_U) {
						edit = '<a href="javascript:classline.updateClassLine(' + row.lineId + ')">修改</a>';
					}
					if (classline.CLASSLINE_D) {
						del = '<a href="javascript:classline.remove(' + row.lineId + ')">删除</a>';
					}
					var _judgment = (row.judgment == "" ? "1" : row.judgment);
					var _userType = (row.usetype == "" ? "-1" : row.usetype);
					// _judgment="2"; _userType="1,2,3,4,5,6";
					_userType = _userType.replace(/\,/g, "");
					if (classline.CLASSLINE_M) {
						mng = '<a href="javascript:classline.mngClassLine(' + row.lineId + ',' + row.belongToCrop + ',' + _judgment + ',' + _userType + ')">绑定车辆</a>';
					}
					return edit + "&nbsp;" + del + "&nbsp;" + mng;
				}
			} ],
			Buttons : [ {
				id : "addPage_class",
				fun : function() {
					/**因线路导入部分暂时屏蔽，故弹出框去掉，直接进入线路添加框
					$("#operatorManagerContent").A_Window({ // 弹出层的父类的iD
						dragabId : 'operatorManagerContent', // 可拖动的范围
						width : 250, // 宽度
						height : 195,// 高度 popClose
						load_fn : function() {
						},
						url : "model/classline/addLineTip.html" // 目标页面或action的地址
					});
					$("#operatorManagerContent").show_A_Window();
					// obj.ctfoFormWithGrid.add();
					**/
					$("#mainWorkArea").A_Window({
						dragabId : 'mainWorkArea',
						id:'classline_linePopWin',
						dragAble:false,
						width : 850,
						height : 535,
						load_fn : function() {
							classline_linePopMain.mapEvent();
						},
						url : "model/classline/linePopMain.html"
					});
					$("#mainWorkArea").show_A_Window({id:"classline_linePopWin"});
				}
			} ],
			sortName : 'sqlid',
			url : 'operationmanagement/findClassLineList.action',
			pageSize : 15,
			pageSizeOptions : [ 15, 25, 35, 45 ],
			height : height,
			width:'99.8%',
			submitId : 'classline_searchBtn',
			container : 'editclasslinepage',
			mainContain : 'editclasslinepage',
			tableId : 'classLineMngGrid',
			searchFormId : 'searchClassLineForm',
			usePager : true,
			page : 0
		// 默认当前页
		};
		obj.ctfoFormWithGrid = new ctfoFormWithGrid(options);
		obj.gridManager1 = $("#classLineMngGrid").ligerGetGridManager();
	},
	// 生成右侧列表
	loadBindStatusGrid : function() {
		var obj = this;
		var height = obj.getGridHeight2();
		var options = {
			// 列
			columns : [ {
				display : '线路名称',
				name : 'lineName',
				width : 100,
				sortable : true,
				align : 'center'
			}, {
				display : '所属企业',
				name : 'pentName',
				width : 100,
				sortable : true,
				align : 'center'

			}, {
				display : '车牌号',
				name : 'vehicleNo',
				width : 100,
				sortable : true,
				align : 'center'

			}, {
				display : '线路属性',
				name : 'useType',
				width : 220,
				sortable : true,
				align : 'center',
				render : function(row) {
					// 业务类型,1-限时,2-限速,3-进报警判断,4-进报警给终端,5-出报警判断,6-出报警给终端,7进报警给平台,8出报警给平台
					var userType = row.useType.split(",");
					var html = "";
					$(userType).each(function(i) {
						switch (userType[i]) {
						case '1':
							html += "限时,";
							break;
						case '2':
							html += "限速,";
							break;
						case '4':
							html += "进报警给终端,";
							break;					
						case '6':
							html += "出报警给终端,";
							break;
						case '7':
							html += "进报警给平台,";
							break;
						case '8':
							html += "出报警给平台,";
							break;
						}
					});
					html = (html.length > 0 ? html.substring(0, html.length - 1) : "--");
					return html;
				}
			}, {
				display : '判断方式',
				name : 'judgment',// 判断类型:1平台判断 2车机判断
				width : 100,
				sortable : true,
				align : 'center',
				render : function(row) {
					if (1 == row.judgment) {
						return "平台判断";
					} else if (2 == row.judgment) {
						return "车机判断";
					} else {
						return "失败";
					}
				}
			}, {
				display : '操作类型',
				name : 'lineStatus',// 1:增加绑定 2：修改 3：解除
				width : 100,
				sortable : true,
				align : 'center',
				render : function(row) {
					var html = "";
					switch (row.lineStatus) {
					case '1':
						html = "绑定";
						break;
					case '2':
						html = "修改";
						break;
					case '3':
						html = "解除绑定";
						break;
					default:
						html = "--";
						break;
					}
					return html;
				}

			}, {
				display : '状态',
				name : 'sendCommandStatus',// 0:成功 否则 -1：等待？
				width : 100,
				sortable : true,
				align : 'center',
				render : function(row) {
					if ("0" == row.sendCommandStatus) {
						return "成功";
					} else if ("-1" == row.sendCommandStatus) {
						return "等待发送";
					} else {
						return "失败";
					}
				}

			}, {
				display : '操作',
				name : 'entState',
				width : 120,
				sortable : true,
				align : 'center',
				render : function(row) {
					var html = "";
					// 绑定成功
					if ("0" == row.sendCommandStatus && "1" == row.lineStatus) {
						html = "<a class='hand' onclick=classline.removeBind("+row.vid+","+row.classLineId+",'"+row.useType+"',"+row.lineBeginTime+","+row.lineEndTime+",'"+str2Utc(row.periodBeginTime)+"','"+str2Utc(row.periodEndTime)+"','"+row.periodBeginTime+"','"+row.periodEndTime+"',"+row.judgment+",'"+row.pid+"') >解除绑定</a>";
					} 
					// 解除绑定成功
					else if("0" == row.sendCommandStatus && "3" == row.lineStatus) {
						html = "--";
					}
					// 解除绑定失败
					else if("0" != row.sendCommandStatus && "3" == row.lineStatus) {
						html = "<a class='hand' onclick=classline.removeBind("+row.vid+","+row.classLineId+",'"+row.useType+"',"+row.lineBeginTime+","+row.lineEndTime+",'"+str2Utc(row.periodBeginTime)+"','"+str2Utc(row.periodEndTime)+"','"+row.periodBeginTime+"','"+row.periodEndTime+"',"+row.judgment+",'"+row.pid+"') >重新解除绑定</a>";
					}
					// 绑定失败
					else if("0" != row.sendCommandStatus && "1" == row.lineStatus) {
						html = "<a class='hand' onclick=classline.reSend("+row.vid+","+row.classLineId+",'"+row.useType+"',"+row.lineBeginTime+","+row.lineEndTime+",'"+str2Utc(row.periodBeginTime)+"','"+str2Utc(row.periodEndTime)+"','"+row.periodBeginTime+"','"+row.periodEndTime+"',"+row.judgment+",'"+row.pid+"','"+row.lineStatus+"') >重新绑定</a>";
					}
					// 修改成功
					if ("0" == row.sendCommandStatus && "2" == row.lineStatus) {
						html = "<a class='hand' onclick=classline.removeBind("+row.vid+","+row.classLineId+",'"+row.useType+"',"+row.lineBeginTime+","+row.lineEndTime+",'"+str2Utc(row.periodBeginTime)+"','"+str2Utc(row.periodEndTime)+"','"+row.periodBeginTime+"','"+row.periodEndTime+"',"+row.judgment+",'"+row.pid+"') >解除绑定</a>";
					}
					// 修改失败
					else if("0" != row.sendCommandStatus && "2" == row.lineStatus) {
						html = "<a class='hand' onclick=classline.reSend("+row.vid+","+row.classLineId+",'"+row.useType+"',"+row.lineBeginTime+","+row.lineEndTime+",'"+str2Utc(row.periodBeginTime)+"','"+str2Utc(row.periodEndTime)+"','"+row.periodBeginTime+"','"+row.periodEndTime+"',"+row.judgment+",'"+row.pid+"','"+row.lineStatus+"') >重新修改</a>";
					}
					return html;
				}
			} ],
			url : 'operationmanagement/trLineVehicle!findByParamPage.action',
			pageSize : 15,
			pageSizeOptions : [ 15, 25, 35, 45 ],
			height : height,
			width:'99.8%',
			submitId : 'classline_bindSearchBtn',
			container : 'editclasslinepage',
			mainContain : 'editclasslinepage',
			tableId : 'classlineBindSerchGrid',
			searchFormId : 'searchClassLineBindForm',
			usePager : true,
			page : 0
		// 默认当前页
		};
		obj.bindSherchGrid = new ctfoFormWithGrid(options);
		obj.gridManager2 = $("#classlineBindSerchGrid").ligerGetGridManager();
	},
	/**
	 * 弹出修改线路页面
	 * @param lineId
	 */
	updateClassLine : function(lineId) {
		var _mainWorkArea = $("#mainWorkArea");
		_mainWorkArea.close_ALL_Window("classline_linePopWin");
		_mainWorkArea.A_Window({
			dragabId : 'operatorManagerContent',
			id : 'classline_linePopWin',
			dragAble : true,//设置是否可拖拽
			width : 850,
			height : 535,
			load_fn : function() {
				classline.cache.bindcarActionType = "add";
				classline_linePopMain.actionType = "update";
				mask("classline_linePopMain", "", true);
				setTimeout(function(){
					classline_linePopMain.loadSpanLine();
					classline_linePopMain.setUpdateLineData(lineId);//设置线路信息
					mask("classline_linePopMain", "", false);
				},1000);
				$("#lineTable tr").children().eq(0).text("线路修改");
				// classline_linePopMain.mapEvent();
			},
			url : "model/classline/linePopMain.html"
		});
		_mainWorkArea.show_A_Window();

	},
	// 重新发送
	reSend : function(vid,classLineId,useType,lineBeginTime,lineEndTime,begintimeUtc,endtimeUtc,periodBeginTime,periodEndTime,judgment,pid,lineStatus) {
		JAjax("operationmanagement/rebindClasslineAndVehicle.action?trLineVehicle.vid="+vid+"&" +
			"trLineVehicle.classLineId="+classLineId+"&trLineVehicle.useType="+ useType+"&" +
			"trLineVehicle.lineBeginTime="+lineBeginTime+"&trLineVehicle.lineEndTime="+lineEndTime+"&" +
			"trLineVehicle.begintimeUtc="+begintimeUtc+"&trLineVehicle.endtimeUtc="+endtimeUtc+"&" +
			"trLineVehicle.periodBeginTime="+periodBeginTime+"&trLineVehicle.periodEndTime="+periodEndTime+"&" +
			"trLineVehicle.judgment="+judgment+"&trLineVehicle.pid="+pid+"&trLineVehicle.lineStatus="+lineStatus, 
		"", "json", 
		function(data, err) {
			if (data) {
				if (data.resultJudge) {
					if ("success" == data.resultJudge) {
						$("#searchClassLineBindForm").trigger("submit");
						$.ligerDialog.success('重发成功！');
					}
				}else if ("success" == data) {
					$("#searchClassLineBindForm").trigger("submit");
					$.ligerDialog.success('重发成功！');
				} else {
					$.ligerDialog.success('重发失败！');
				}
			}
		}, function(data, err) {
			if (data) {
				if (data.resultJudge) {
					if ("success" == data.resultJudge) {
						$("#searchClassLineBindForm").trigger("submit");
						$.ligerDialog.success('重发成功！');
					}
				}else if ("success" == data) {
					$("#searchClassLineBindForm").trigger("submit");
					$.ligerDialog.success('重发成功！');
				} else {
					$.ligerDialog.success('重发失败！');
				}
			}
		}, true, null, 30000

		);
	},
	// 解除绑定
	removeBind : function(vid,classLineId,useType,lineBeginTime,lineEndTime,begintimeUtc,endtimeUtc,periodBeginTime,periodEndTime,judgment,pid) {
		mask("mainWorkArea", "", true);
		JAjax("operationmanagement/removeLineVehicle.action?trLineVehicle.vid="+ vid+"&" +
			"trLineVehicle.classLineId="+classLineId+"&trLineVehicle.useType="+useType+"&" +
			"trLineVehicle.lineBeginTime="+lineBeginTime+"&trLineVehicle.lineEndTime="+lineEndTime+"&" +
			"trLineVehicle.begintimeUtc="+begintimeUtc+"&trLineVehicle.endtimeUtc="+endtimeUtc+"&" +
			"trLineVehicle.periodBeginTime="+periodBeginTime+"&trLineVehicle.periodEndTime="+periodEndTime+"&" +
			"trLineVehicle.judgment="+judgment+"&trLineVehicle.pid="+pid,
		"", "json", 
		function(data, err) {
			if (data) {
				if (data.resultJudge) {
					if ("success" == data.resultJudge) {
						$("#searchClassLineBindForm").trigger("submit");
						$.ligerDialog.success('解绑成功！');
						mask("mainWorkArea", "", false);
					}
				}else if ("success" == data) {
					$("#searchClassLineBindForm").trigger("submit");
					$.ligerDialog.success('解绑成功！');
				} else {
					$.ligerDialog.success('解绑失败！');
				}
				mask("mainWorkArea", "", false);
			}
		}, function(data, err) {
			if (data) {
				if (data.resultJudge) {
					if ("success" == data.resultJudge) {
						$("#searchClassLineBindForm").trigger("submit");
						$.ligerDialog.success('解绑成功！');
					}
				}else if ("success" == data) {
					$("#searchClassLineBindForm").trigger("submit");
					$.ligerDialog.success('解绑成功！');
				} else {
					$.ligerDialog.success('解绑失败！');
				}
			}
		}, true, null,60000);
	},
	remove : function(lineId) {
		$.ligerDialog.confirm('是否删除线路！', function(yes) {
			if (yes) {
				JAjax("operationmanagement/removeTbClassLine.action", {lineId : lineId, "requestParam.equal.lineStatus": 1}, "json", function(data, err) {
					if (data) {
						if (data.responseText) {
							if ("success" == data.responseText) {
								$("#searchClassLineForm").trigger("submit");
								$.ligerDialog.success('删除成功！');
							}
						}
						if ("success" == data) {
							$("#searchClassLineForm").trigger("submit");
							$.ligerDialog.success('删除成功！');

						} else if ("1" == data) {
							$.ligerDialog.error('此线路已经绑定车辆，不能删除！');
						}
					}
				}, function(data, err) {
					if (null != data.responseText) {
						if ("success" == data.responseText) {
							$("#searchClassLineForm").trigger("submit");
							$.ligerDialog.success('删除成功！');
						}
					}
					if ("success" == data) {
						$("#searchClassLineForm").trigger("submit");
						$.ligerDialog.success('删除成功！');
					} else if ("1" == data) {
						$.ligerDialog.error('此线路已经绑定车辆，不能删除！');
					}
				}, true, null, 30000

				);
				KCPT.root.leftTree.searchNodeSecond();
			}
		});
	},
	mngClassLine : function(lineId, entId, judgment, usetype) {
		$("#mainWorkArea").A_Window({ // 弹出层的父类的iD
			dragabId : 'mainWorkArea', // 可拖动的范围
			id : 'editclasslinediv',
			width : 850, // 宽度
			height : 430,// 高度
			url : 'model/classline/findVehicle.jsp', // 目标页面或action的地址,
			load_fn : function() {
				classline.cache.isSetMapCenter = false;
				classline.cache.bindcarActionType = "update";
				$("#vlineId").val(lineId);
				classline_findVehicle.getVehicleGrid();
				classline_findVehicle.getBindVehicleGrid(lineId);
				classline_findVehicle.getLineAlarmSet(lineId, judgment, usetype);
			}
		});
		$("#mainWorkArea").show_A_Window();
	},
	closePage : function() {
		var obj = this;
		obj.grid.hideAddPage();
	},
	onResize : function() {
		var obj = this;
		if(obj.gridManager1){
			obj.gridManager1.setHeight(obj.getGridHeight1());
		}
		if(obj.gridManager2){
			obj.gridManager2.setHeight(obj.getGridHeight2());
		}
	},
	isSuccess : function(data) {
		var temp = eval(data);
		if (temp.resultJudge == "success") {
			$.ligerDialog.success('操作成功！');
			$("#mainWorkArea").close_ALL_Window();
		} else {
			$.ligerDialog.error('操作失败！');
		}
	},
	// 增加的权限验证
	authentication : function() {
		this.CLASSLINE_C = checkFunction("FG_MEMU_OPERATIONS_DATA_LINE_C");// 增加
		this.CLASSLINE_U = checkFunction("FG_MEMU_OPERATIONS_DATA_LINE_U");// 修改
		this.CLASSLINE_D = checkFunction("FG_MEMU_OPERATIONS_DATA_LINE_D");// 删除
		this.CLASSLINE_M = checkFunction("FG_MEMU_OPERATIONS_DATA_LINE_BINGING");// 绑定车辆
		this.CLASSLINE_UnBind = checkFunction("FG_MEMU_OPERATIONS_DATA_LINE_UNBING");// 解除绑定
		if (!this.CLASSLINE_C) {
			$("#addPage_class").remove();
		}
	},
	// 验证线路编码
	authenClassLineCode : function() {
		var lineCodeId = $("#lineCodeId").val();
		// 验证数字
		var regu1 = /^[0-9A-Za-z]+$/;
		if (regu1.test(lineCodeId) && lineCodeId.length < 16) {
			$("#lineCodeSpan").text("");
		} else {
			$("#lineCodeSpan").text("不超过15位字符串");
		}
	},
	// 验证线路名称
	authenClassLineName : function() {
		var lineNameId = $("#lineNameId").val();
		// 验证数字字母汉字组合
		var regu = /^[0-9A-Za-z\u4e00-\u9fa5]+$/;
		if (lineNameId.length < 21) {
			if (regu.test(lineNameId)) {
				$("#lineNameSpan").text("");
			} else {
				var classlines = lineNameId.split("-");
				if (classlines.length > 0) {
					if (!regu.test(classlines[0])) {
						$("#lineNameSpan").text("线路名不合法");
						return false;
					} else {
						$("#lineNameSpan").text("");
					}
					if (!regu.test(classlines[classlines.length - 1])) {
						$("#lineNameSpan").text("线路名不合法");
						return false;
					} else {
						$("#lineNameSpan").text("");
					}
					for ( var i = 0; i < classlines.length; i++) {
						if (regu.test(classlines[i])) {
							$("#lineNameSpan").text("");
						} else {
							$("#lineNameSpan").text("线路名不合法");
							return false;
						}
					}
				} else {
					$("#lineNameSpan").text("");
					return false;
				}
			}
		} else {
			$("#lineNameSpan").text("20位字符串");
		}
	},
	// 清空span里的值
	emptySpan : function() {
		$("#lineNameSpan").text("");
		$("#lineCodeSpan").text("");
	},
	// 显示所属企业
	viewEnt : function() {
//		var leftTreeManager = KCPT.root.leftTree.getTreeManager();
//		var selectNode = leftTreeManager.getSelected();

		var parentOrgName = $("#parentOrgName");
		parentOrgName.empty();
		parentOrgName.append((KCPT.root.leftTree.loadTreeSelectedData.data.text != null) ? KCPT.root.leftTree.loadTreeSelectedData.data.text : KCPT.user.entName);
		var parentOrgId3 = $("#parentOrgIdClass");
		parentOrgId3.empty();
		parentOrgId3.val(((KCPT.root.leftTree.loadTreeSelectedData.data.id != null) ? KCPT.root.leftTree.loadTreeSelectedData.data.id : KCPT.user.entId));

		var parentOrgNameBindSearchText = $("#parentOrgNameBindSearch");
		parentOrgNameBindSearchText.empty();
		parentOrgNameBindSearchText.append((KCPT.root.leftTree.loadTreeSelectedData.data.text != null) ? KCPT.root.leftTree.loadTreeSelectedData.data.text : KCPT.user.entName);
		var parentOrgIdBindstatus = $("#parentOrgIdBindstatus");
		parentOrgIdBindstatus.empty();
		parentOrgIdBindstatus.val(((KCPT.root.leftTree.loadTreeSelectedData.data.id != null) ? KCPT.root.leftTree.loadTreeSelectedData.data.id : KCPT.user.entId));

		
	},
	getEntId : function() {
		var _id = KCPT.user.entId;
		var entId = $("#parentOrgIdClass").val();
		if (entId != null && entId != undefined) {
			_id = entId;
		}
		return _id;
	}
};
$(document).ready(function() {
	var classlinemng = new classLineMng();
	window.classline = classlinemng;
	classline.authentication();
	classline.orgTree();
	classline.init();
	//operatorManager.addChildList(classline);
	//operatorManager.showObj = classline;
	classline.viewEnt();
	classline.getGrid();
	var tmp={
			data:{
				id:KCPT.user.entId,
				text:KCPT.user.entName,
				entType:KCPT.user.entType
			}
	};
	classlinemng.change(tmp);
	KCPT.onresizeObj = classlinemng;
});
