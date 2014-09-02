var employinfo = function() {
	this.name = "驾驶员管理";
	this.height = KCPT.root.getCenterSize().height;
	this.EMPLOYEE_C = false;// 增加
	this.EMPLOYEE_U = false;// 修改
	this.EMPLOYEE_D = false;// 删除
	this.titleHeight = $("#customerSearchForm").height();
	this.treeEntIds;//所选企业id
};
employinfo.prototype = {
	// 左侧树的列表
	orgTree : function() {
		// 初始化组织结构Tree
		var obj = this;
		KCPT.root.triggerShowObj = obj;
	},
	// 选择左侧树列表，在右边显示所选企业
	change : function(date) {
		var checkedOrg = $("#parentOrgName");
		var checkedOrg3 = $("#parentOrgName3");
		var checkedOrgId3 = $("#parentOrgId3");
		var checkedOrgId = $("#parentOrgId");
		var checkedOrg2 = $("#parentOrgName2");
		var parentOrgIdEmployee = $("#parentOrgIdEmployee");
		var entTypeId = $("#entType");
		var staffIdId = $("#staffIdId").val();
		
		try {
			entTypeId.empty();
			entTypeId.val(date.data.entType);
			parentOrgIdEmployee.empty();
			checkedOrg2.empty();
			checkedOrg2.val(date.data.text);
			checkedOrgId.empty();
			checkedOrg.empty();
			checkedOrg3.empty();
			checkedOrgId3.empty();
			checkedOrg3.append(date.data.text);
			checkedOrg.append(date.data.text);
			checkedOrgId3.val(date.data.id);
			parentOrgIdEmployee.val(date.data.id);
			checkedOrgId.val(date.data.id);
		}catch(e){
		}
		var addEmployeeId = $("#addEmployeeId").val();
		if (addEmployeeId == "zengjia") {
			employ.findVehicleOnclick();
		}
		this.treeEntIds=date.data.id;
	},
	getGridHeight : function(){
		var center = getHeightAndWidth();
		return center.height - this.titleHeight - 86;
	},
	// 进入页面直接加载的列表
	init : function() {
		var obj = this;
		var height = obj.getGridHeight();
		var options = {
			// 列
			columns : [ {
				display : '序号',
				name : 'sqlid',
				width : 100,
				sortable : true,
				align : 'center',
				toggle : false
			}, {
				display : '驾驶员姓名',
				name : 'staffName',
				width : 100,
				sortable : true,
				align : 'center'
			}, {
				display : '性别',
				name : 'staffSex',
				width : 100,
				sortable : true,
				align : 'center',
				render : function(row) {
					if (row.staffSex == 1) {
						return "男";
					} else {
						return "女";
					}
				}
			}, {
				display : '联系手机号',
				name : 'staffMobile',
				width : 100,
				sortable : true,
				align : 'center'
			}, {
				display : '联系地址',
				name : 'staffAddress',
				width : 100,
				sortable : true,
				align : 'center'
			}, {
				display : '驾驶证档案号',
				name : 'staffDriverNo',
				width : 100,
				sortable : true,
				align : 'center'
			}, {
				display : '所属车队',
				name : 'staffEntName',
				width : 100,
				sortable : true,
				align : 'center',
				render : function(row) {
					var entName = "";
					//modify by tangfeng 运营管理 -> 业务管理 -> 驾驶员管理  默认车队显示为空问题
					//if ("默认车队" != row.staffEntName && "未分配车辆" != row.staffEntName && "未分队车辆" != row.staffEntName) {
						entName = row.staffEntName;
					//}
					return entName;
				}
			}, {
				display : '驾驶车牌号',
				name : 'staffVehicleNo',
				width : 100,
				sortable : true,
				align : 'center'
			}, {
				display : '操作',
				name : 'entState',
				width : 100,
				sortable : true,
				align : 'center',
				render : function(row) {
					var edit = "";
					var remove = "";
					if (employ.EMPLOYEE_U) {
						edit = '<a href="javascript:employ.update(' + row.staffId + ')">修改</a>';
					}
					if (employ.EMPLOYEE_D) {
						remove = '<a href="javascript:employ.remove(' + row.staffId + ')">删除</a>';
					}
					return edit + "&nbsp;" + remove;

				}
			} ],
			showCheckbox : false,
			sortName : 'updateTime',
			url : 'operationmanagement/findByParamString.action',
			showTitle : false,
			pageSize : 10,
			pageSizeOptions : [ 10, 20, 30, 40 ],
			height : height,
			width:'99.8%',
			autoLoad : false,
			detailURL : 'operationmanagement/findById.action',
			updateURL : 'operationmanagement/modifyCustomer.action',
			Buttons : [ {
				id : "addPage_employee_class",
				fun : function() {
					obj.ctfoFormWithGrid.add();
				}
			} ],
			formId : 'addCustomerForm',
			submitId : 'addCustomerFormSubmit',
			addURL : 'operationmanagement/addCustomer.action',
			container : 'opEmployeeAddform',
			loadHtml : 'model/employee/addemployee.jsp',
			closeId : 'escButtonAddEmploee',
			mainContain : 'employMng',
			editModel : "customer",
			gridDIV : 'classCustomerDivContent',
			// 填充数据的tableid
			tableId : 'customerGrid',
			// 查询条件formid
			searchFormId : 'customerSearchForm',
			detailLoadFunction : function() {

			},
			addLoadFunction : function() {
				var parentOrgName = $("#parentOrgName").html();
				$("#parentOrgName3").empty();
				$("#parentOrgName3").append(parentOrgName);
				var parentOrgId3 = $("#parentOrgId3").val();
				$("#parentOrgIdEmployee").val(parentOrgId3);
				$("#addEmployeeId").val("zengjia");
				$("#staffIdId").val("");
				$("#vehicleNoId").val("");
				employ.findVehicleOnclick();
				employ.emptySpan();
				removeErrorCss();
			},
			editLoadFunction : function() {
				var gridMng = $("#customerGrid").ligerGetGridManager();
				var data = gridMng.getSelectedRow();
				//修改页显示车辆信息
				$("#vehicleNoemployee").val(data.staffVehicleNo);
				$("#vehicleNoId").val(data.vid);
				var checkedOrg3 = $("#parentOrgName3");
				checkedOrg3.empty();
				checkedOrg3.append(data.staffEntName);
				employ.findVehicleNoSelect(data.entId);
				employ.emptySpan();
				removeErrorCss();
			},
			beforeSubmit : function() {
				var entType = $("#entType").val();
				var staffIdId = $("#staffIdId").val();
				var staffName = $("#staffName").val();
				var mobilephone = $("#mobilephone").val();
				var address = $("#address").val();
				var driverNo = $("#driverNo").val();
				var carId = $("#carId").val();
				var driverDep = $("#driverDep").val();
				var bussinessIdId = $("#bussinessIdId").val();
				var regushuzi = /^[0-9]{20}$/;
				var parMobilephone = /^(13|15|18|16)[0-9]{9}$/;
				var parName = /^[\u4E00-\u9FA5]+$/gi;
				var regu = /^[\u4e00-\u9fa5]+$/;
				var regu1 = /^[\-A-Za-z0-9\u4e00-\u9fa5]+$/;
				if (!parName.test(staffName)) {
					$("#staffNamespan").text("姓名为汉字");
					return false;
				} else {
					if (staffName.length > 10) {
						$("#staffNamespan").text("小于十位");
					} else {
						$("#staffNamespan").text("");
					}
				}
				if (!parMobilephone.test(mobilephone)) {
					$("#mobilephonespan").text("手机号不正确");
					return false;
				} else {
					$("#mobilephonespan").text("");
				}
				var regu2 = /^[A-Za-z0-9]$/;
				var start = address.charAt(0);
				var end = address.charAt(address.length - 1);
				if (start == "-" || regu2.test(start)) {
					$("#addressSpan").text("开头为汉字");
					return false;
				} else {
					$("#addressSpan").text("");
				}
				if (end == "-" || regu2.test(end)) {
					$("#addressSpan").text("末尾为汉字");
					return false;
				} else {
					$("#addressSpan").text("");
				}
				if (regu1.test(address) || address.length == 0) {
					if (address.length > 50) {
						$("#addressSpan").text("小于50位汉字");
						return false;
					} else {
						$("#addressSpan").text("");
					}
				} else {
					$("#addressSpan").text("汉字字母数字组合");
					return false;
				}
				var par1 = /^\d+(\.\d+)?$/;
				if (driverNo.length != 12 || !par1.test(driverNo)) {
					$("#driverNoIdspan").text("12位数字");
					return false;
				} else {
					$("#driverNoIdspan").text("");
				}
				var cardsub = carId.substring(0, 17);
				var cardsubl = carId.substring(17, 18);
				if (carId.length != 18) {
					$("#cardIdspan").text("18位！");
					return false;
				} else {
					var par3 = /^[A-Z0-9]$/;
					if (par1.test(cardsub)) {
						if (par3.test(cardsubl)) {
							$("#cardIdspan").text("");
						} else {
							$("#cardIdspan").text("最后一位是数字或大写字母");
							return false;
						}
					} else {
						$("#cardIdspan").text("身份证号不正确");
						return false;
					}
				}
				if (regu.test(driverDep) || driverDep.length == 0) {
					if (driverDep.length > 50) {
						$("#driverDepspan").text("小于25位汉字");
						return false;
					} else {
						$("#driverDepspan").text("");
					}
				} else {
					$("#driverDepspan").text("小于25位汉字");
					return false;
				}
				if (regushuzi.test(bussinessIdId)) {
					$("#bussinessIdIdspan").text("");
				} else {
					if (bussinessIdId == 0) {
						$("#bussinessIdIdspan").text("");
					} else {
						$("#bussinessIdIdspan").text("20位数字");
						return false;
					}
				}
				return true;
			}
		};
		if (!employ.EMPLOYEE_U && !employ.EMPLOYEE_D) {
			options.columns.pop();
		}
		obj.ctfoFormWithGrid = new ctfoFormWithGrid(options);
		obj.grid = obj.ctfoFormWithGrid.getGrid();
		obj.gridManager = $("#customerGrid").ligerGetGridManager();
	},
	remove : function(staffId) {
		var obj = this;
		$.ligerDialog.confirm('是否删除驾驶人员！', function(yes) {
			if (yes) {
				JAjax("operationmanagement/removeCustomer.action?staffId=" + staffId, "", "json", obj.removeSuccess, obj.removeError, true);
			}
		});
	},
	removeSuccess : function(data) {
		$("#customerSearchForm").trigger("submit");
		if (data.displayMessage == "success") {
			$.ligerDialog.success("删除成功！");
		} else {
			$.ligerDialog.error("删除失败！");
		}
	},
	removeError : function(data) {
		$.ligerDialog.error("删除失败！");
	},
	update : function(data) {
		var obj = this;
		var addemployeeId = {
			"staffId" : data
		};
		obj.ctfoFormWithGrid.update(addemployeeId);
	},
	createSelectVehicle : function(data) {
		var vehicleNoSelect = $("#vehicleNoId");
		var options = "";
		vehicleNoSelect.empty();
		options += "<option value='' >请选择</option>";
		if (data != null && data != "" && data != undefined) {
			var objArray = eval(data);
			var length = objArray.length;
			var j = 0;
			for (j = 0; j < length; j++) {
				var obj = objArray[j];
				if (obj.vid != undefined) {
					options += "<option value='" + obj.vid + "' >" + obj.vehicleNo + "</option>";
				}
			}
		}
		try {
			vehicleNoSelect.append(options);
		} catch (ex) {
		}
	},
	// 获取所选企业下属企业车队的所有车辆，为吊销的车辆
	findVehicleNoSelect : function(datatemp) {
		var findvehicleobj2 = this;
		JAjax("operationmanagement/selectVehicleColForStaff.action?entId=" + datatemp, "", "json", findvehicleobj2.createSelectVehicle, null, true);
	},
	closePage : function() {
		var obj = this;
		obj.grid.hideAddPage();
	},
	onResize : function() {
		var obj = this;
		if(obj.gridManager){
			obj.gridManager.setHeight(obj.getGridHeight());
		}
	},
	// 查询车辆
	findVehicleOnclick : function() {
		var temp = $("#parentOrgIdEmployee").val();
		employ.findVehicleNoSelect(temp);
	},
	// 验证手机号
	checkMobile : function() {
		var mobilephone = $("#mobilephone").val();
		var parMobilephone = /^(13|15|18|16)[0-9]{9}$/;
		if (!parMobilephone.test(mobilephone)) {
			$("#mobilephonespan").text("手机号不正确");
			return false;
		} else {
			$("#mobilephonespan").text("");
		}
	},
	// 验证姓名汉字
	checkName : function() {
		var staffName = $("#staffName").val();
		var parName = /^[\u4E00-\u9FA5]+$/gi;
		if (!parName.test(staffName)) {
			$("#staffNamespan").text("姓名为汉字");
			return false;
		} else {
			if (staffName.length > 10) {
				$("#staffNamespan").text("小于十位");
			} else {
				$("#staffNamespan").text("");
			}
		}
	},
	// 验证身份证号
	checkSelf : function() {
		var carId = $("#carId").val();
		var par1 = /^\d+(\.\d+)?$/;
		var cardsub = carId.substring(0, 17);
		var cardsubl = carId.substring(17, 18);
		if (carId.length != 18) {
			$("#cardIdspan").text("18位！");
			return false;
		} else {
			var par3 = /^[A-Z0-9]$/;
			if (par1.test(cardsub)) {
				if (par3.test(cardsubl)) {
					$("#cardIdspan").text("");
				} else {
					$("#cardIdspan").text("最后一位是数字或大写字母");
					return false;
				}
			} else {
				$("#cardIdspan").text("身份证号不正确");
				return false;
			}
		}
	},
	// 驾驶证档案号
	checkDriverNo : function() {
		var driverNo = $("#driverNo").val();
		var par1 = /^\d+(\.\d+)?$/;
		if (driverNo.length != 12 || !par1.test(driverNo)) {
			$("#driverNoIdspan").text("12位数字");
			return false;
		} else {
			$("#driverNoIdspan").text("");
		}
	},
	// 验证地址,汉字，字母，下划线，数字
	checkAddress : function() {
		var address = $("#address").val();
		var regu = /^[\-A-Za-z0-9\u4e00-\u9fa5]+$/;
		var regu1 = /^[A-Za-z0-9]$/;
		var start = address.charAt(0);
		var end = address.charAt(address.length - 1);
		if (start == "-" || regu1.test(start)) {
			$("#addressSpan").text("开头为汉字");
			return false;
		} else {
			$("#addressSpan").text("");
		}
		if (end == "-" || regu1.test(end)) {
			$("#addressSpan").text("末尾为汉字");
			return false;
		} else {
			$("#addressSpan").text("");
		}
		if (regu.test(address) || address.length == 0) {
			if (address.length > 50) {
				$("#addressSpan").text("小于50位汉字");
				return false;
			} else {
				$("#addressSpan").text("");
			}
		} else {
			$("#addressSpan").text("汉字字母数字组合");
			return false;
		}
	},
	// 验证发证机关
	checkDep : function() {
		var driverDep = $("#driverDep").val();
		var regu = /^[\u4e00-\u9fa5]+$/;
		if (regu.test(driverDep) || driverDep.length == 0) {
			if (driverDep.length > 25) {
				$("#driverDepspan").text("小于25位汉字");
				return false;
			} else {
				$("#driverDepspan").text("");
			}
		} else {
			$("#driverDepspan").text("请输入汉字");
			return false;
		}
	},
	// 验证从业资格证号
	checkBusId : function() {
		var bussinessIdId = $("#bussinessIdId").val();
		var regushuzi = /^[0-9]{20}$/;
		if (regushuzi.test(bussinessIdId)) {
			$("#bussinessIdIdspan").text("");
		} else {
			if (bussinessIdId == 0) {
				$("#bussinessIdIdspan").text("");
			} else {
				$("#bussinessIdIdspan").text("20位数字");
				return false;
			}
		}
	},
	// 增加的权限验证
	authentication : function() {
		this.EMPLOYEE_C = checkFunction("FG_MEMU_OPERATIONS_DRIVERS_C");// 增加
		this.EMPLOYEE_U = checkFunction("FG_MEMU_OPERATIONS_DRIVERS_U");// 修改
		this.EMPLOYEE_D = checkFunction("FG_MEMU_OPERATIONS_DRIVERS_D");// 删除
		if (!this.EMPLOYEE_C) {
			$("#addPage_employee_class").remove();
		}
	},
	// 清空span里的值
	emptySpan : function() {
		$("#bussinessIdIdspan").text("");
		$("#driverDepspan").text("");
		$("#addressSpan").text("");
		$("#driverNoIdspan").text("");
		$("#staffNamespan").text("");
		$("#mobilephonespan").text("");
		$("#cardIdspan").text("");
	},
	// 显示所属企业
	viewEnt : function() {
//		var leftTreeManager = KCPT.root.leftTree.getTreeManager();
//		var selectNode = leftTreeManager.getSelected();
		
		var parentOrgName = $("#parentOrgName");
		parentOrgName.empty();
		parentOrgName.append(KCPT.user.entName);
		var parentOrgId3 = $("#parentOrgId3");
		parentOrgId3.empty();
		parentOrgId3.val(KCPT.user.entId);
		
	},
	queryVehicle : function() {
		var obj = this;
		$("#mainWorkArea").A_Window({ // 弹出层的父类的id
			dragabId : 'mainWorkArea', // 可拖动的范围
			id:'queryVehicleWin',
			width : 500, // 宽度
			height : 530,// 高度 popClose
			load_fn : function() {
				$("#closeQueryVehicle").click(function() {
					$("#mainWorkArea").close_A_Window({id:"queryVehicleWin"});
				});
				// 从本地获得下拉框
				KCPT.CodeManager.getSelectList("SYS_VEHICLE_BRAND", "vbrandCodeId");// 车牌品牌
				//KCPT.CodeManager.getSelectList("SYS_PRODUCT_TYPE", "prodCodeId");// 车型
				var queryVehicleEntId = $("#queryVehicleEntId");
				if (undefined != obj.treeEntIds && null != obj.treeEntIds) {
					queryVehicleEntId.val(obj.treeEntIds);
				} else {
					queryVehicleEntId.val(KCPT.user.entId);
				}
			},
			url : "model/employee/queryVehicle.jsp"// 目标页面或action的地址
		});
		$("#mainWorkArea").show_A_Window({});
	},
	findListProductType : function() {//车型查询BsApp中没有此方法
		var brandIdTemp = $("#vbrandCodeId").val();
		var data = {"requestParam.equal.vbrandCode" : brandIdTemp};
		JAjax("operationmanagement/findProductTypeByParam.action", data, "json", function(json) {
			var prodCodeId = $("#prodCodeId");
			prodCodeId.empty();
			var option = $("<option>");
			$(option).text("请选择");
			$(option).attr("value", "");
			prodCodeId.append($(option));
			var objArray = eval(json);
			for (var i = 0; i < objArray.length; i++) {
				var obj = objArray[i];
				if (obj.prodCode != undefined) {
					var opt = $("<option>");
					$(opt).text(obj.prodName);
					$(opt).attr("value", obj.prodCode);
					$(opt).attr("title", obj.prodName);
					prodCodeId.append($(opt));
				}
			}
		}, null, true);
	}
};
$(document).ready(function() {
	var employ = new employinfo();
	window.employ = employ;
	employ.authentication();
	employ.init();
	employ.orgTree();
	employ.viewEnt();
	KCPT.onresizeObj = employ;
	var tmp={
			data:{
				id:KCPT.user.entId,
				text:KCPT.user.entName,
				entType:KCPT.user.entType
			}
	};
	employ.change(tmp);
});
