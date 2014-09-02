/**
 * 车辆查询JS
 */
// 车辆js根对象
var vehicleinfo = function(o) {
	this.VEHICLEINFO_EXP = false;
	this.vid = null;
	this.manager = null;
	this.addObject = o;
	this.VEHICLEINFO_EMP = false;
	this.VEHICLEINFO_INFO = false;
	this.titleHeight = $("#vehicleForm").height();
};

vehicleinfo.prototype = {
	orgTree : function() {// 初始化组织结构Tree
		var obj = this;
//		obj.leftTree = KCPT.root.leftTree;
//		obj.leftTree.hideTabs();
//		obj.leftTree.hidengrid();
//		obj.leftTree.show();
//		obj.leftTree.triggerShowObj = obj;
		KCPT.root.triggerShowObj = obj;
	},
	getGridHeight : function(){
		var center = getHeightAndWidth();
		return center.height - this.titleHeight - 205;
	},
	vehicleGrid : function() {
		var vehicleinfoObject = this;
		var height = vehicleinfoObject.getGridHeight();
		var options = {
			// 列
			// checkbox: true,
			columns : [
			// {display: '序号', name : 'vid', width : 100, sortable : true, align: 'center'},
			{
				display : '车牌号码',
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
					var pcTemp = KCPT.CodeManager.getNameByCode("SYS_VCL_PLATECOLOR", row.plateColor);
					if (pcTemp)
						return pcTemp;
					else
						return "";
				}
			}, {
				display : 'SIM卡号',
				name : 'commaddr',
				width : 100,
				sortable : true,
				align : 'center'
			}, {
				display : '终端编号',
				name : 'tmac',
				width : 100,
				sortable : true,
				align : 'center'
			}, {
				display : '驾驶员姓名',
				name : 'staffName',
				width : 100,
				sortable : true,
				align : 'center'
			}, {
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
			},
			// {display: '经营范围', name : 'businessScope', width : 100, sortable : true, align: 'center'},
			{
				display : '操作',
				name : 'vid',
				width : 100,
				render : function(row) {
					if(vehicleinfoObject.VEHICLEINFO_INFO){
						return '<a href="javascript:winVi.showDetailPop(' + row.vid + ')">查看</a>';
					}else{
						return '';
					}
				}
			} ],
			showCheckbox : false,
			sortName : 'id',
			url : 'operationmanagement/findViewVehicleInfoByParam.action',//
			exportAction : 'operationmanagement/exportExcelDataViewVehicle.action',
			data : "orgId=4",
			showTitle : false,
			pageSize : 10,
			pageSizeOptions : [ 10, 20, 30, 40 ],
			height : height,
			autoLoad : false,

			tableId : 'vehicleInfoGrid',// 填充数据的tableid
			searchFormId : 'vehicleInfoSearchForm',// 查询条件formid
			Buttons : [ {// 导出
				id : "viewVehicleInfoExportExcel",
				fun : function() {
					vehicleinfoObject.grid.exportExcel(1, 2);
				}
			} ],
			mainContain : "vehicleinfomng",
			gridDIV : "vehiclemngcontent",
			addLoadFunction : function() {
				// KCPT.CodeManager.prototype.getSelectList("SYS_VEHICLE_TYPE", "vehicleTypeIdSearch");
				// KCPT.CodeManager.prototype.getSelectList("SYS_TERMINAL_MODEL", "tmodelCodeIdSearch");
			}
		};
		vehicleinfoObject.ctfoFormWithGrid = new ctfoFormWithGrid(options);
		vehicleinfoObject.grid = vehicleinfoObject.ctfoFormWithGrid.getGrid();
		vehicleinfoObject.gridManager = $("#vehicleInfoGrid").ligerGetGridManager();
	},
	showDetailPop : function(vid) {
		var obj = this;
		VehilceDetailId = vid;
		$("#mainWorkArea").A_Window({ // 弹出层的父类的iD
			dragabId : 'mainWorkArea', // 可拖动的范围
			width : 800, // 宽度
			height : 500,// 高度
			load_fn : function() {
				$("#vehicleInfoClose").click(function() {
					$("#mainWorkArea").close_ALL_Window();
				});
				$("#vehicleInfoCloseRightTop").click(function() {
					$("#mainWorkArea").close_ALL_Window();
				});
			},
			url : "model/vehicleinfo/vehicleinfodetail.jsp" // "devicestatus/viewDevicestatus.action?vid=" + vid //目标页面或action的地址
		});
		// alert(data);
		// viTemp.dealDetail(vinfodetail);
	},
	dealDetail : function(vinfodetail) {
		// alert(vinfodetail.vehicleNo);
		$("#vehicleNo").append(vinfodetail.vehicleNo);
		$("#plateColor").append(KCPT.CodeManager.getNameByCode("SYS_VCL_PLATECOLOR", vinfodetail.plateColor));
		$("#tmac").append(vinfodetail.tmac);
		$("#commaddr").append(vinfodetail.commaddr);
		$("#staffName").append(vinfodetail.staffName);
		$("#pentName").append(vinfodetail.pentName);
		$("#entName").append(vinfodetail.entName);
		$("#orgCname").append(vinfodetail.orgCname);
		// 取省名称getNameByCode；取市名称getCityProvcodeNameByCode
		$("#corpProvince").append(KCPT.CodeManager.getNameByCode("SYS_AREA_INFO", vinfodetail.corpProvince) + KCPT.CodeManager.getCityProvcodeNameByCode("SYS_AREA_INFO", vinfodetail.corpProvince, vinfodetail.corpCity));// 省vinfodetail.corpProvince市
		$("#certificateOffice").append(vinfodetail.certificateOffice);
		$("#businessScope").append(KCPT.CodeManager.getNameByCode("SYS_CORP_BUSINESS_SCOPE", vinfodetail.businessScope));// SYS_CORP_BUSINESS_SCOPE 企业经营范围表
		$("#licenceNo").append(vinfodetail.licenceNo);//
		$("#orgCphone").append(vinfodetail.orgCphone);
		$("#corpBoss").append(vinfodetail.corpBoss);
		$("#orgAddress").append(vinfodetail.orgAddress);
		$("#vinCode").append(vinfodetail.vinCode);
		$("#ebrandCode").append(KCPT.CodeManager.getNameByCode("SYS_ENGINE_BRAND", vinfodetail.ebrandCode));// ebrandCode
		$("#emodelCode").append(KCPT.CodeManager.getNameByCode("SYS_ENGINE_MODEL", vinfodetail.emodelCode));// emodelCode
		$("#oemCode").append(vinfodetail.fullName);// oemCode
		$("#tmodelCode").append(KCPT.CodeManager.getNameByCode("SYS_TERMINAL_MODEL", vinfodetail.tmodelCode));// vinfodetail.tmodelCode
		$("#tprotocolId").append(vinfodetail.tprotocolName);// tprotocolId
	},
	change : function(date) {
		var spoperatorObject = this;
		var checkedOrg = $("#vehicleinfoOrgName");
		var checkedOrgId = $("#vehicleinfoOrgId");
		checkedOrgId.empty();
		checkedOrg.empty();
		checkedOrg.append(date.data.text);
		checkedOrgId.val(date.data.id);
	},
	// 增加的权限验证
	authentication : function() {
		this.VEHICLEINFO_EMP = checkFunction("FG_MEMU_STATIC_SELECT_VEHICLE_INFO_EMP");// 导出
		this.VEHICLEINFO_INFO = checkFunction("FG_MEMU_STATIC_SELECT_VEHICLE_INFO_INFO");// 详情
		if (!this.VEHICLEINFO_EMP) {
			$("#viewVehicleInfoExportExcel").remove();
		}
	},
	onResize : function() {
		var obj = this;
		if (obj.gridManager) {
			obj.gridManager.setHeight(obj.getGridHeight());
		}
	},
	initOperatorOrgGrid : function() {
		var checkedOrg = $("#vehicleinfoOrgName");
		var checkedOrgId = $("#vehicleinfoOrgId");
		
		var operatorEntId = ((KCPT.root.leftTree.loadTreeSelectedData.data.id != null) ? KCPT.root.leftTree.loadTreeSelectedData.data.id : KCPT.user.entId);
		var operatorEntName = (KCPT.root.leftTree.loadTreeSelectedData.data.text != null) ? KCPT.root.leftTree.loadTreeSelectedData.data.text : KCPT.user.entName;

		checkedOrgId.empty();
		checkedOrg.empty();
		checkedOrg.append(operatorEntName);
		checkedOrgId.val(operatorEntId);
		

	}
	/*show : function() {
		var obj = this;
		obj.orgTree();
	}*/
};

$(document).ready(function() {

	var vi = new vehicleinfo();
	// 加载组织树
	vi.orgTree();
	vi.authentication();
	// 加载 Grid
	vi.vehicleGrid();
	vi.initOperatorOrgGrid();
	KCPT.CodeManager.getSelectList("SYS_VEHICLE_TYPE", "vehicleTypeIdSearch");
	KCPT.CodeManager.getSelectList("SYS_TERMINAL_MODEL", "tmodelCodeIdSearch");
	KCPT.CodeManager.getSelectList("SYS_VCL_RUNSTATUS", "queryVehicleOperationStateId");// 车辆运营状态

	window.winVi = vi;
	KCPT.onresizeObj = vi;
	//runManager.addChildList(vi);
	//runManager.showObj = vi;

});