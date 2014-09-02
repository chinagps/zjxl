var QueryVehicle = function() {
};
QueryVehicle.prototype = {
	queryVehicleGrid : function() {// 初始化列表页面Grid
		var obj = this;
		var queryVehicleHeight = KCPT.root.getCenterSize().height;
		var titleHeight = $("#queryVehicleForm").height();
		var queryVehicleOptions = {
			columns : [ {
				display : '选择',
				name : 'vid',
				width : 30,
				sortable : true,
				align : 'center',
				toggle : false,
				render : function(row) {
					return "<input type=\"radio\" name=\"vidRadio\" value=\"" + row.vid + "\" vehicleNo=\"" + row.vehicleNo + "\"/>";
				}
			}, {
				display : '车牌号',
				name : 'vehicleNo',
				width : 100,
				sortable : true,
				align : 'center',
				toggle : false
			}, {
				display : 'VIN',
				name : 'vinCode',
				width : 100,
				sortable : true,
				align : 'center'
			}, {
				display : '车辆编号',
				name : 'innerCode',
				width : 100,
				sortable : true,
				align : 'center'
			}, {
				display : '车辆品牌',
				name : 'vbrandCode',
				width : 100,
				sortable : true,
				align : 'center',
				render : function(row) {
					var vbrandCode = "";
					if (null != row.vbrandCode && undefined != row.vbrandCode && "" != row.vbrandCode) {
						vbrandCode = KCPT.CodeManager.getNameByCode("SYS_VEHICLE_BRAND", row.vbrandCode);
						if (undefined == vbrandCode) {
							vbrandCode = "";
						}
					}
					return vbrandCode;
				}
			}],
			showCheckbox : false,
			sortName : 'createTime',
			url : 'operationmanagement/findVehicleForListPage.action',// 数据请求地址
			showTitle : false,
			pageSize : KCPT.PageSize,
			pageSizeOptions :  KCPT.PageSizeOptions,
			height : 400,
			width:'99.8%',
			autoLoad : false,
			contentDiv : "queryvehicle",
			// 填充数据的tableid
			tableId : 'queryVehicleTable',
			// 查询条件formid
			searchFormId : 'queryVehicleForm',
			gridDIV : "queryvehiclecontent",
			mainContain : "queryvehicle",
			beforeSubmit : function() {
				return true;
			}
		};
		obj.ctfoFormWithGrid = new ctfoFormWithGrid(queryVehicleOptions);
		obj.grid = obj.ctfoFormWithGrid.getGrid();
		obj.gridManager = $("#queryVehicleTable").ligerGetGridManager();
	},
	submitQueryVehicle : function() {
		var vidRadio = $('input:radio[name="vidRadio"]:checked');
		if (vidRadio.val() == null) {
			$.ligerDialog.warn("请选择！", "提示");
		} else {
			$("#likeVehicleNo").val(vidRadio.attr("vehicleNo"));
			$("#vehicleNoemployee").val(vidRadio.attr("vehicleNo"));
			$("#vehicleNoId").val(vidRadio.val());
			$("#mainWorkArea").close_A_Window({id:"queryVehicleWin"});
		}
	}
};
$(function() {
		var queryVehicle = new QueryVehicle();
		queryVehicle.queryVehicleGrid();
		window.queryVehicle = queryVehicle;
//		$(".ui-draggable").height("0px");
//		var pContentHeigth = $("#queryVehicleTable").height() + $(".busfontt").height();
//		$(".p_content").height(pContentHeigth + 35 + "px");

		// 车辆品牌change事件绑定
//		$("#vbrandCodeId").change(function() {
//			$("#prodCodeId").empty();
//			//setTimeOut(,1000);
//			window.employ.findListProductType();
//		});
		//绑定确定按钮点击事件
		$("#btnSure").bind("click",queryVehicle.submitQueryVehicle); 
});