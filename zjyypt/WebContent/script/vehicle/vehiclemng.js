/**
 * 运营管理 -> 基础数据管理 -> 车辆管理 
 */
var vehicle = function(o) {
	this.VEHICLE_U = false;// 编辑
	this.VEHICLE_EXP = false;// 导出
	this.VEHICLE_MOVE = false;// 车辆转组
	this.manager = null;
	this.addObject = o;
	this.v_entName = null;
	this.changeFlag = '1';
	
	this.titleHeight = $("#vehicleSearchForm").height();
};
vehicle.prototype = {
	orgTree : function() {// 初始化组织结构Tree
		var obj = this;
//		obj.leftTree = KCPT.root.leftTree;
//		obj.leftTree.hideTabs();
//		obj.leftTree.hidengrid();
//		obj.leftTree.show();
//		obj.leftTree.triggerShowObj = obj;
		KCPT.root.triggerShowObj = obj;
	},
	onResize : function() {
		var obj = this;
		if(obj.gridManager){
			obj.gridManager.setHeight(obj.getGridHeight());
		}
	},
	getGridHeight : function(){
		var center = getHeightAndWidth();
		return center.height - this.titleHeight - 86;
	},
	vehicleGrid : function() {
		var vehicleObject = this;
		var height = vehicleObject.getGridHeight();
		var options = {
			// 列
			// checkbox: true,
			columns : [
			// {display: '序号', name : 'vid', width : 100, sortable : true, align: 'center'},
			{
				display : '车辆VIN',
				name : 'vinCode',
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
				display : '车牌颜色',
				name : 'plateColor',
				width : 100,
				sortable : true,
				align : 'center',
				render : function(row) {
					var plTemp = KCPT.CodeManager.getNameByCode("SYS_VCL_PLATECOLOR", row.plateColor);
					if (plTemp)
						return plTemp;
					else
						return "";
				}
			}, {
				display : '电压',
				name : 'voltage',
				width : 100,
				sortable : true,
				align : 'center'
			}, {
				display : '驾驶员',
				name : 'staffName',
				width : 100,
				sortable : true,
				align : 'center',
				render : function(row) {
					var staffNameHtml = "";
					var staffNameArray = new Array();
					var staffName = row.staffName;
					if (staffName) {
						var staffNames = staffName.split(",");
						for ( var i = 0; i < staffNames.length; i++) {
							var obj = staffNames[i].split(";");
							var staffNameObj = new Object();
							staffNameObj.id = obj[0];
							staffNameObj.name = obj[1];
							staffNameArray[i] = staffNameObj;
						}
					}
					if (0 < staffNameArray.length) {
						for ( var i = 0; i < staffNameArray.length; i++) {
							var obj = staffNameArray[i];
							if (0 != i) {
								staffNameHtml += ",";
							}
							staffNameHtml += obj.name;
						}
					}
					return staffNameHtml;
				}
			},
			// {display: '发动机型号', name : 'emodelCode', width : 100, sortable : true, align: 'center', render:function(row){
			// var ecTemp = KCPT.CodeManager.getNameByCode("SYS_ENGINE_MODEL" , row.emodelCode);
			// if(ecTemp)
			// return ecTemp;
			// else
			// return "";
			// }},
			// {display: '车辆用途', name : '', width : 100, sortable : true, align: 'center'},
			{
				display : '车辆类型',
				name : 'vehicleType',
				width : 100,
				sortable : true,
				align : 'center',
				render : function(row) {
					var vtTemp = KCPT.CodeManager.getNameByCode("SYS_VEHICLE_TYPE", row.vehicleType);
					if (vtTemp)
						return vtTemp;
					else
						return "";
				}
			}, {
				display : '内部编号',
				name : 'innerCode',
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
				display : '所属车队',
				name : 'entName',
				width : 100,
				sortable : true,
				align : 'center',
				toggle : false,
				render : function(row) {
					var entName = "未分配车辆";
					if ("1" != row.isdeteam) {
						entName = row.entName;
					}
					return entName;
				}
			}, {
				display : '车辆运营状态',
				name : 'vehicleOperationState',
				width : 100,
				sortable : true,
				align : 'center',
				render : function(row) {
					var vehicleOperationState = KCPT.CodeManager.getNameByCode("SYS_VCL_RUNSTATUS", row.vehicleOperationState);
					if (vehicleOperationState) {
						return vehicleOperationState;
					} else {
						return "";
					}
				}
			}, {
				display : '操作',
				name : 'vehicleMem',
				width : 70,
				sortable : true,
				align : 'center',
				render : function(row) {
					var modify = '<a name="vehicleModify" href="javascript:winVehicleMng.modifyVehicle(' + row.vid + ');">修改</a>';// ="operationmanagement/tbVehicleMng!toModify.action?tbVehicle.vid=' + row.vid + '"

					return modify;
				}
			} ],
			showCheckbox : checkFunction("FG_MEMU_VEHICLE_ACCOUNT_MANAGER_MOVE"),//检查是否有车辆转组权限，有的显示复选框，没有就是显示
			sortName : 'id',
			url : 'operationmanagement/findVehicleForListPage.action',
			exportAction : 'operationmanagement/exportExcelDataVehicle.action',
			data : "orgId=4",
			showTitle : false,
			pageSize : 30,
			pageSizeOptions : [ 10, 20, 30, 40 ],
			height : height,
			width:'99.8%',
			autoLoad : false,
			gridDIV : "vehiclemngcontent",
			// 填充数据的tableid
			tableId : 'vehicleGrid',
			// 查询条件formid
			searchFormId : 'vehicleSearchForm',

			// addURL : 'operationSupport/tbVehicle!add.action', //添加的时候使用的url
			detailURL : 'operationmanagement/findVehicleById.action',// 获得详情方法 在修改前要调用
			updateURL : 'operationmanagement/modifyVehicle.action',// 修改的时候使用的url
			editModel : 'tbVehicle',

			container : "vehicleSearchAddform", // 包含这个form的对象用来loadhtml
			loadHtml : 'model/vehicle/addvehicle.jsp',// 增加页面使用的html model/vehicle/addvehicle.jsp
			formId : 'addVehicleForm',// 页面中使用的form的ID 用来在新增和修改的时候 submitId : '',//
			submitId : 'addVehicleFormsubmit',// addVehicleFormsubmit
			closeId : 'close',// 重置按钮的id,

			mainContain : "vehiclemng",
			// addButton :"showAdd",
			Buttons : [      
			  {// 导出
				id : "vehicleInfoExportExcel",
				fun : function() {
					vehicleObject.grid.exportExcel(1, 2);
				}
			  }, 
			  {// 车辆过户
					id : "vehicleInfoChangeOrg",
					fun : function()
					{
						vehicleObject.vehicleChangeOrg();
					}
			  }
			],
			toEditInitData : [ 'tbVehicle.vbrandCode', function(x) {
				vehicleObject.intinfo(x);

				return x;
			}, 'tbVehicle.entName', function(x) {
				var vehicleOrgNameAdd = $("#vehicleOrgNameAdd");
				vehicleOrgNameAdd.empty();
				return vehicleOrgNameAdd.append(x);
			}, 'tbVehicle.cityId', function(x) {
				return KCPT.CodeManager.getProvAndCity("tbVehicleAreaCode", "tbVehicleCityId", x);
			} ],
			detailEnd : "tbVehicle.prodCode",
			detailEndFun : function(x) {
				$("#prodCodeId").val(x);
				$("#prodCodeId").trigger("change");
				//if(vehicleObject.status == "update"){
				var vehicle = vehicleObject.ctfoFormWithGrid.form.dealdata;
				var othert = vehicle.insuranceTypeOther;
				if(othert!=null && othert.length>0){
					var chk = $("#otherCheckIType").attr("checked");
					if(!chk){
						$("#otherCheckIType").click();
					}
					$("#otherCheckInsuranceType").show();
					$("#otherCheckInsuranceType").val(othert);
				}else{
					$("#otherCheckInsuranceType").hide();
				}
				var types = vehicle.insuranceType;
				if(types!=null && types.length>0){
					var fir = $("#tinsuranceType1").attr("checked");
					var sec = $("#tinsuranceType2").attr("checked");
					var thr = $("#tinsuranceType3").attr("checked");
					var fou = $("#tinsuranceType4").attr("checked");
					var fiv = $("#tinsuranceType5").attr("checked");
					var six = $("#tinsuranceType6").attr("checked");
					if(fir)
						$("#tinsuranceType1").click();
					if(sec)
						$("#tinsuranceType2").click();
					if(thr)
						$("#tinsuranceType3").click();
					if(fou)
						$("#tinsuranceType4").click();
					if(fiv)
						$("#tinsuranceType5").click();
					if(six)
						$("#tinsuranceType6").click();
					var tps = types.split(",");
					for(var i=0;i<tps.length;i++){
						$("#tinsuranceType"+vehicleObject.LTrim(tps[i])).click();
					}
				}
				var oftime = vehicle.outFactoryTime;
				if(oftime!=null && oftime!= ""){
					$("#outfactorytime").val(utcToDate(oftime));
				}
				var etime = vehicle.insuranceExpirateTime;
				if(etime!=null && etime!= ""){
					$("#insuranceexpiratetime").val(utcToDate(etime));
				}
				//}
			},
			// 从本地获得下拉框
			localSelect : [ {
				name : "SYS_VCL_RUNSTATUS",
				id : "queryVehicleOperationStateId"
			}, {
				name : "SYS_VCL_PLATECOLOR",
				id : "plateColorId"
			}, {
				name : "SYS_VEHICLE_BRAND",
				id : "vbrandCodeId"
			}, {
				name : "SYS_VEHICLE_TYPE",
				id : "vehicleTypeId"
			}
			// ,{name:"SYS_PRODUCT_TYPE",id: "prodCodeId"}
			, {
				name : "SYS_CERTIFICATE_TYPE",
				id : "certificateTypeId"
			}, {
				name : "SYS_REVIEW_STATE",
				id : "reviewStateId"
			}, {
				name : "SYS_MAINTENANCE_STATE",
				id : "maintenanceStateId"
			}, {
				name : "SYS_VCL_TRANSPORTTYPE",
				id : "transtypeCodeId"
			}, {
				name : "SYS_VCL_RUNSTATUS",
				id : "vehicleOperationStateId"
			}, {
				name : "SYS_INSURE_STATE",
				id : "insuranceStateId"
			}, {
				name : "SYS_COACH_LEVEL",
				id : "coachLevelId"
			}, {
				name : "SYS_VCL_OILTYPE",
				id : "oiltypeId"
			}, {
				name : "SYS_ENGINE_BRAND",
				id : "ebrandCodeId"
			}, {
				name : "SYS_ENGINE_MODEL",
				id : "emodelCodeId"
			}, {
				name : "SYS_VEHICLE_ORIGIN",
				id : "originCodeId"
			} ],// SERVICEBRAND_CODE
			// add页面：下拉框 业务表 ajax下拉框 -- 从本地获得下拉框
			selects : [ {
				id : 'vsRefIdId',
				url : 'operationmanagement/findAllVstatusRefId.action',
				i : 1,
				userData : {},
				idMap : 'vsRefId',
				textMap : 'refName',
				userMap : []
			} ],
			initReady : function() {
				KCPT.CodeManager.getProvAndCity("tbVehicleAreaCode", "tbVehicleCityId");
			}
		};

		if (!this.VEHICLE_U) {// 如果没有修改权限，操作列不显示
			options.columns.pop();
		}

		vehicleObject.ctfoFormWithGrid = new ctfoFormWithGrid(options);
		vehicleObject.grid = vehicleObject.ctfoFormWithGrid.getGrid();
		vehicleObject.gridManager = $("#vehicleGrid").ligerGetGridManager();
	},
	//车辆转租
	vehicleChangeOrg: function()
	{
		var that = this;
		vehicle.prototype.vehicleTransferGroupTeamId = "";
		var manager2 = that.gridManager;
		var data = manager2.getCheckedRows();
		var vidTmp = "";
		if (data == undefined || data == null || data.length == 0)
		{
			$.ligerDialog.warn("请选择转组车辆！");
			return;
		}
		for ( var i = 0; i < data.length; i++) {
			if (0 != i) {
				vidTmp += ",";
			}
			vidTmp += data[i].vid;
		}
		winVehicleMng.vidTmp = vidTmp;

		$("#mainWorkArea").A_Window({ //弹出层的父类的iD
			dragabId: 'mainWorkArea', //可拖动的范围
	        width: 450, //宽度
	        height: 420,//高度
	        load_fn: function()
	        {
	        	$("#vehicleChangeOrgWin").find("#vehicleTransferGroupClose").click(function(){
	        		$("#mainWorkArea").close_ALL_Window();
	        	});
	        	
	        	$("#vehicleChangeOrgWin").find("#cancleChangeOrging").click(function(){
	        		$("#mainWorkArea").close_ALL_Window();
	        	});
	        	
	        },
	        url: "model/vehicle/vehicleTransferGroup.jsp"
		});
	},
	modifyVehicle : function(date) {

		$("label[class=error]").each(function() {
			$(this).remove();
		});

		var vehicleObject = this;

		vehicleObject.changeFlag = '0';

		var vidMap = {
			"vid" : date
		};
		vehicleObject.ctfoFormWithGrid.update(vidMap);
		$("#prodCodeId").empty();
		$("#prodCodeId").append($("<option value='' >请选择</option>"));
		winVehicleMng.changeFlag = '1';
		// $("input[name!=submit]").css("width","150px");
	},
	intinfo : function(data) {
		JAjax("baseinfo/findProductTypeByParam.action?requestParam.equal.vbrandCode=" + data, "", "json", function(seldata) {
			var monthSelect = $("#prodCodeId");
			var options = "";
			monthSelect.empty();
			var objArray = eval(seldata);
			var length = objArray.length;
			var j = 0;
			options += "<option value='' >请选择</option>";
			for (j = 0; j < length; j++) {
				var obj = objArray[j];
				if (obj.prodCode != undefined) {
					// if(obj.prodCode == data.prodCode){
					// options += "<option value='" + obj.prodCode + "' selected='selected' >"
					// + obj.prodName + "</option>";
					// }else{
					options += "<option value='" + obj.prodCode + "' >" + obj.prodName + "</option>";
					// }

				}
			}
			try {
				monthSelect.append(options);
			} catch (ex) {
			}
		}, null, false);
	},
	change : function(date) {
		var obj = this;
		if (obj.ctfoFormWithGrid.status == "list") {
			var checkedOrg = $("#vehicleOrgName");
			var checkedOrgId = $("#vehicleOrgId");
			checkedOrgId.empty();
			checkedOrg.empty();
			checkedOrg.append(date.data.text);
			checkedOrgId.val(date.data.id);
		} else if (obj.ctfoFormWithGrid.status == "add") {
			var checkedOrgAdd = $("#vehicleOrgNameAdd");
			var checkedOrgIdAdd = $("#vehicleOrgIdAdd");
			checkedOrgIdAdd.empty();
			checkedOrgAdd.empty();
			// checkedOrgAdd.val("");
			checkedOrgAdd.append(date.data.text);
			checkedOrgIdAdd.val(date.data.id);

			// $("#operatorSearchform").trigger("submit");
		} else if (obj.ctfoFormWithGrid.status == "update") {
			// 暂无操作
		}
	},

	getAddVehicleFormValidate : function() {
		var obj = this;
		obj.addVehicleFormValidate = $("#addVehicleForm").validate({
			debug : true,
			rules : {
			// "tbVehicle.vehicleNo": { required: true, maxlength:20},
			// "tbVehicle.plateColor": { required: true},
			// "tbVehicle.autoSn": { required: true, maxlength:10},
			// "tbVehicle.vinCode": { required: true, maxlength:20},
			// "tbVehicle.vbrandCode": { required: true},
			//						
			// "tbVehicle.vehicleType": { required: true},
			// "": {},
			// "tbVehicle.prodCode": { required: true},
			// "tbVehicle.certificateType": { },
			// //"tbVehicle.entId": { required: true, maxlength:15},
			//						
			// "tbVehicle.certificateState": { },
			// "tbVehicle.roadTransport": { required: false, maxlength:10},
			// "tbVehicle.reviewState": { required: false},
			// "tbVehicle.maintenanceState": { required: false},
			// "tbVehicle.transtypeCode": { required: true},
			//						
			// "tbVehicle.vehicleOperationState": { required: false},
			// "tbVehicle.insuranceState": { required: false},
			// "tbVehicle.coachLevel": { required: true},
			// "tbVehicle.vehicleMennum": { required: false, digits:true, max:1000000000},
			// "tbVehicle.vehicleTon": { required: false, digits:true, max:1000000000},
			//						
			// "tbVehicle.tyreR": { required: true, digits:true, max:1000000000},
			// "tbVehicle.rearAxleRate": { required: true, digits:true, max:1000000000},
			// "tbVehicle.oiltypeId": { required: true},
			// "tbVehicle.voltage": { required: true}
			},
			message : {
				"tbVehicle.plateColor" : "请选择车牌颜色"
			},
			success : function() {
			}
		});
		return obj.addVehicleFormValidate;
	},

	modifyDo : function() {
		// $("#addVehicleFormsubmitMe").css("display","block");
		var obj = this;
		$("#addVehicleFormsubmitMe").click(function() {
			var oftime = $("#outfactorytime").val();
			var etime = $("#insuranceexpiratetime").val();
			if(oftime != "" && oftime != null){
				$("#outfactorytimeh").val(date2utc(oftime));
			}
			if(etime!=""&&etime!=null){
				$("#insuranceexpiratetimeh").val(date2utc(etime));
			}
			var otherTypeFlag = $("#otherCheckIType").attr("checked");
			if(!otherTypeFlag)
				$("#otherCheckInsuranceType").val("");
			
			var t = obj.getAddVehicleFormValidate();
			// t.form() 验证通过，提交表单；否则，不处理
			if (obj.vehicleValidate() && t.form()) {
				var data = $('#addVehicleForm').serializeArray();
				JAjax("operationmanagement/modifyVehicle.action", data, "json", function(data) {
					var msg = eval(data);
					if (msg.displayMessage) {
						obj.ctfoFormWithGrid.status = 'list';
						obj.ctfoFormWithGrid.getForm().hide();
						obj.ctfoFormWithGrid.getGrid().show();
						obj.ctfoFormWithGrid.getGrid().search();
						$.ligerDialog.success(msg.displayMessage);
					} else {
						$.ligerDialog.error(msg.error[0].errorMessage);
					}
				}, null, true);
			} else {
				// alert("FAIL-validate");
			}
		});

		// $("#modifyVehicleCancel").click(function(){
		// $.ligerDialog.confirm('信息已更改，确认取消？', function(yes) {
		// if (yes) {
		// $("#modifyvehicle").hide();
		// $("#vehiclemng").show();
		// }
		// });
		// });
	},
	vehicleValidate : function() {
		var obj = this;
		var validates = false;
		if ($.trim(obj.vehicleNoId.val()).length > 0 && $.trim(obj.plateColorId.val()).length > 0) {
			var data = {
				"requestParam.noId" : function() {
					return obj.tbVehicleVid.val();
				},
				"requestParam.equal.vehicleNo" : obj.vehicleNoId.val(),
				"requestParam.equal.plateColor" : obj.plateColorId.val()
			};
			JAjax("operationmanagement/isUniqueForVehicleNoAndPlateColor.action", data, "html", function(str) {
				// alert($("#vehicleNoIdForValid").size());
				if (str == "true") {
					if ($("#vehicleNoIdForValid").size() > 0) {
						$("#vehicleNoIdForValid").remove();
					}
					if ($("#plateColorIdForValid").size() > 0) {
						$("#plateColorIdForValid").remove();
					}
					validates = true;
				} else {
					if (!($("#vehicleNoIdForValid").size() > 0)) {
						var labelVehicleNo = $("<label style='display:inline;' class='error' id='vehicleNoIdForValid'>车牌号与车牌颜色已存在！</label>");
						obj.vehicleNoId.after(labelVehicleNo);
					}
					if (!($("#plateColorIdForValid").size() > 0)) {
						var labelPlateColor = $("<label style='display:inline;' class='error' id='plateColorIdForValid'>车牌号与车牌颜色已存在！</label>");
						obj.plateColorId.after(labelPlateColor);
					}
					validates = false;
				}
			}, null, false);
			return validates;
		} else {
			if ($("#vehicleNoIdForValid").size() > 0) {
				$("#vehicleNoIdForValid").remove();
			}
			if ($("#plateColorIdForValid").size() > 0) {
				$("#plateColorIdForValid").remove();
			}
			validates = true;
			return validates;
		}
	},
	initOperatorOrgGrid : function() {
		// 获取选中组织
//		var leftTreeManager = KCPT.root.leftTree.getTreeManager();
//		var selectNode = leftTreeManager.getSelected();
		var checkedOrg = $("#vehicleOrgName");
		var checkedOrgId = $("#vehicleOrgId");
		
		var operatorEntId = ((KCPT.root.leftTree.loadTreeSelectedData.data.id != null) ? KCPT.root.leftTree.loadTreeSelectedData.data.id : KCPT.user.entId);
		var operatorEntName = (KCPT.root.leftTree.loadTreeSelectedData.data.text != null) ? KCPT.root.leftTree.loadTreeSelectedData.data.text : KCPT.user.entName;

		checkedOrgId.empty();
		checkedOrg.empty();
		checkedOrg.append(operatorEntName);
		checkedOrgId.val(operatorEntId);
	},
	authentication : function() {// 权限验证
		var that=this;
		this.VEHICLE_U = checkFunction("FG_MEMU_OPERATIONS_DATA_VEHICLE_U");
		if (!this.VEHICLE_U)
		{
			$("a[name=vehicleModify]").remove();
		}
			
		this.VEHICLE_EXP = checkFunction("FG_MEMU_OPERATIONS_DATA_VEHICLE_EXP");// 导出
		if (!this.VEHICLE_EXP)
		{
			$("#vehicleInfoExportExcel").remove();
		}
			
		this.VEHICLE_MOVE = checkFunction("FG_MEMU_VEHICLE_ACCOUNT_MANAGER_MOVE");// 车辆转组
		if (!this.VEHICLE_MOVE)
		{
			$("#vehicleInfoChangeOrg").remove();
			//window.winVehicleMng.gridManager.setOptions({parms: [{name: showCheckbox, value: false}]}); //隐藏表格的复选框
		}
		
	},
	findListProductType : function() {
		// alert('ch');
		var obj = this;
		var brandIdTemp = $("#vbrandCodeId").val();
		JAjax("baseinfo/findProductTypeByParam.action?requestParam.equal.vbrandCode=" + brandIdTemp, "", "json", obj.createSelectProductType, null, false);
	},
	createSelectProductType : function(data) {
		var monthSelect = $("#prodCodeId");
		var options = "";
		monthSelect.empty();
		var objArray = eval(data);
		var length = objArray.length;
		var j = 0;
		options += "<option value='' >请选择</option>";
		for (j = 0; j < length; j++) {
			var obj = objArray[j];
			if (obj.prodCode != undefined) {
				options += "<option value='" + obj.prodCode + "' >" + obj.prodName + "</option>";
			}
		}
		try {
			monthSelect.append(options);
		} catch (ex) {
		}
	},
//	show : function() {
//		var obj = this;
//		obj.orgTree();
//	},
	// 企业入网车辆跳转到车辆管理,此方法只适用于首页
	vehicleToManagement : function() {
		var obj = this;
		$("#vehicleSearchForm").find("ul").eq(1).find("li").first().prepend("<input name='requestParam.equal.vehicleState' type='hidden' value='2'/>");
		$("#vehicleSearchForm").trigger("submit");
	},
	LTrim:function(str)
	{
	    var i;
	    for(i=0;i<str.length;i++)
	    {
	        if(str.charAt(i)!=" "&&str.charAt(i)!=" ")break;
	    }
	    str=str.substring(i,str.length);
	    return str;
	}
};

$(document).ready(function() {

	var vehicleMng = new vehicle();
	vehicleMng.authentication();
	// 加载组织树
	vehicleMng.orgTree();

	// 加载 Grid
	vehicleMng.vehicleGrid();

	vehicleMng.initOperatorOrgGrid();
	// Form 加验证
	// v.getAddVehicleFormValidate();
	// 为Form提交绑定事件：加验证、成功失败提示信息、页面跳转
	// v.modifyDo();
	//$("#vehicleSearchAddform").height(KCPT.root.getCenterSize().height);
	window.winVehicleMng = vehicleMng;
	//operatorManager.addChildList(vehicleMng);
	//operatorManager.showObj = vehicleMng;

	if (null != KCPT.vehiclemngFlag) {
		if (KCPT.vehiclemngFlag) {
			KCPT.vehiclemngFlag = false;
			$("#vehicleSearchForm").submit();
		}
	}
	KCPT.onresizeObj = vehicleMng;
});
