var maintainRecordManagement = function() {
	this.version = "create by lishuai in 2011.12.22";
	this.reportId = "powerVehicleReport";
	this.leftShrinkhidden = "0";
	this.titleHeight = $("#maintainRecordSearchForm").height();
	this.onResize();
};

maintainRecordManagement.prototype = {
	//页面大小调整需要增加的方法
	onResize : function(bool) {
		var obj = this;
		if (obj.gridManager) {
			obj.gridManager.setHeight(obj.getGridHeight());
		}
		var center = getHeightAndWidth();
		if($("#vehicleRecordLeftNavigation").is(":hidden")){
			$("#maintainManagementMainArea").width(center.width-20);
		}else{
			if(bool){
				center.width = center.width+15;
			}
			$("#maintainManagementMainArea").width(center.width-250-20);
		}
		$("#maintainManagementMainArea").height(center.height-75);
		if(maintainDetailLeftTree){
			maintainDetailLeftTree.onResize();
		}
	},
	getGridHeight:function(){
		var center = getHeightAndWidth();
		return center.height - this.titleHeight - 126;
	},
	init : function() {
		var obj = this;
		var height = obj.getGridHeight();
		var options = {
			columns:[
				{display : '维保计划号',name : 'planCode',width: 120,align : 'center'},
				{display : '车牌号',name : 'vehicleNo',width: 90,align : 'center'},
				{display : '车型',name : 'prodName',width : 80,align : 'center'},
				{display : '维保项目',name : 'maintainName',width : 110,align : 'center'},
				{display : '执行频率',name : 'exeFrequency',width : 65,align : 'center'},
				{display : '计划维保时间',name : 'planMaintainDate',width : 100,align : 'center',render:function(row){
					return '<span id="planMaintainDate'+row.autoId+'">'+ row.planMaintainDate + '</span>';
				}},
				{display : '计划维保里程',name : 'planMaintainMileage',width : 80,align : 'center',render:function(row){
					var planMaintainMileage = row.planMaintainMileage==0?"":row.planMaintainMileage;
					return '<span id="planMaintainDate'+row.autoId+'">'+ planMaintainMileage + '</span>';
				}},
				{display : '实际维保时间',name : 'maintainDate',width : 100,align : 'center',render:function(row) {
					var maintainDate = '<input type="text" id="date'+row.autoId+'" value="'+row.maintainDate+'" style="width:85px;height:20px" id="date'+row.autoId+'" readonly="readonly" class="Wdate" onchange="maintainRecordManager.updateMaintainDateRecord('+row.autoId+',\'date\',\''+row.vid+'\');" onfocus="WdatePicker();" />';
					return maintainDate;
				}},
				{display : '实际维保里程',name : 'maintainMileage',width : 100,align : 'center',render:function(row) {
					var maintainMileage = '<input type="text" id="mileage'+row.autoId+'" value="'+row.maintainMileage+'" style="width:85px;height:20px" id="mileage'+row.autoId+'" align="center" onchange="maintainRecordManager.updateMaintainDateRecord('+row.autoId+',\'mileage\',\''+row.vid+'\');" />';
					return maintainMileage;
				}},
				{display : '维保状态',name : 'maintainStat',width : 80,align : 'center',render: function(row) {
					   var functionChecked ="";
					   if(row.maintainStat=='未维护') {
						   functionChecked += '<select id="maintainRSelected'+row.autoId+'" onchange="maintainRecordManager.changeMaintainStatR('+row.autoId+',\'1\');" style="width: 65px;" >';
						   functionChecked += '<option value="0">未维护</option>';
						   functionChecked += '<option value="1">已维护</option>';
					   } else {
						   functionChecked += '<select id="maintainRSelected'+row.autoId+'" onchange="maintainRecordManager.changeMaintainStatR('+row.autoId+',\'0\');" style="width: 65px;" >';
						   functionChecked += '<option value="1">已维护</option>';
						   functionChecked += '<option value="0">未维护</option>';
					   }
					   functionChecked += '</select>';
					   return functionChecked;
				}}],
			showCheckbox : true,
			showTableToggleBtn : true,
			showTitle : false,
			autoLoad:false,
			sortName : 'vehicleNo',
			url : 'maintain/mainTainRecordList.action',// 数据请求地址
			mainContain : "maintainRecordManagement",
			Buttons : [ {
                id : "gridExport",
                fun : function() {
                	maintainRecordManager.grid.exportExcel(1, 2);
                }
            }],
            exportAction : "maintain/exportMaintain.action",
			pageSize : 30,
			height : height,
			width : '100%',
			tableId: 'maintainRecordTableDiv',
			searchFormId: 'maintainRecordSearchForm',
			gridBeforeSubmit: function() {
				$("#maintainRecordTeamInStr").val(maintainDetailLeftTree.getCheckSelect("fleet",1));
				$("#maintainRecordvidInStr").val(maintainDetailLeftTree.getCheckSelect("vehicle",1));
				if($("#maintainRecordvidInStr").val()==""&&$("#maintainRecordTeamInStr").val()==""){
					$.ligerDialog.alert("请选择查询车辆或车队", "信息提示", 'warn');
					return false;
				}
				var vidArry = $("#maintainRecordvidInStr").val().split(",");
				var TeamArry = $("#maintainRecordTeamInStr").val().split(",");
				
				if(TeamArry.length>1000){
					$.ligerDialog.alert("一次选择的组织包含车队不能超过1000", "信息提示", 'warn');
					return false;
				}
				
				if(vidArry.length>1000){
					$.ligerDialog.alert("一次选择的车辆不能超过1000", "信息提示", 'warn');
					return false;
				}
				return true;

			}
		};
		obj.ctfoFormWithGrid = new ctfoFormWithGrid(options),
		obj.grid = obj.ctfoFormWithGrid.getGrid();
		KCPT.maintainRecordGrid = obj.ctfoFormWithGrid.grid;
		obj.gridManager = $("#maintainRecordTableDiv").ligerGetGridManager();
	},
	//批量 修改实际维保时间和维保里程处理方法
	maintainRecordUpdate:function() {
		var obj = this;
		var ii=0;
		var jj=0;
		var datas = $("#maintainRecordTableDiv").ligerGetGridManager();
		if (datas) {
			var rows = datas.getCheckedRows();
			if(rows.length>0) {
				var checkData = [];
				$.each(rows,function(name,value) {
					if($("#date" + value.autoId).val().length>0)
						checkData.push(value.autoId+"-"+value.vid);
					else {
						ii=1;
					}
					if($("#mileage" + value.autoId).val().length>0) {
					} else {
						jj=1;
					}
				});
				if(ii==1) {
					$.ligerDialog.alert("请输入维护实际时间!", "信息提示", 'warn');
					return;
				}
				if(jj==1) {
					$.ligerDialog.alert("请输入维护里程!", "信息提示", 'warn');
					return;
				}
				var autoId = 'autoId='+checkData;
				JAjax("maintain/mainTainRecordUpdateList.action",autoId,"text",function(data){
					if(data=='success') {
						$.ligerDialog.success("数据维护成功");
					}else
						$.ligerDialog.alert("数据有误", "信息提示", 'warn');
					obj.grid.gridManager.loadData(true);
			  	},null,null);

			} else {
				$.ligerDialog.alert("请选择维保单据", "信息提示", 'warn');
				return null;
			}

		}
	},
	//将状态设置为已维保时，获取维保时间和维保里程，存储数据库
	changeMaintainStatR:function(autoId,stat) {
		var obj = this;
		var functionChecked='';
		functionChecked += '<option value="0">未维护</option>';
		functionChecked += '<option value="1">已维护</option>';
		if($("#maintainRSelected"+autoId).val()==1) {
			if($("#date"+autoId).val()==null||$("#date"+autoId).val().length<1) {
				$.ligerDialog.alert("请输入维保时间", "信息提示", 'warn');
				$("#maintainRSelected"+autoId).html(functionChecked);
				return;
			}
			if($("#mileage"+autoId).val()==null||$("#mileage"+autoId).val().length<1) {
				$.ligerDialog.alert("请输入维保里程", "信息提示", 'warn');
				$("#maintainRSelected"+autoId).html(functionChecked);
				return;
			}
		}
		JAjax("maintain/changeMaintainStatR.action?" +
				"autoId="+autoId
				+"&maintainStat="+$("#maintainRSelected"+autoId).val()
				+"&planMaintainDate="+$("#planMaintainDate"+autoId).text()
				+"&planMaintainMileage="+$("#planMaintainMileage"+autoId).text()
				+"&maintainDateString="+$("#date"+autoId).val()
				+"&maintainMileage="+$("#mileage"+autoId).val()
				,null,"text",function(data){
			obj.grid.gridManager.loadData(true);
	  	},null,null);
	},
	maintainRecordDelete:function() {
		var obj = this;
		$.ligerDialog.confirm("确定要删除该记录吗？", function(yes) {
			if(yes) {
				var datas = $("#maintainRecordTableDiv").ligerGetGridManager();
				if (datas) {
					var rows = datas.getCheckedRows();
					if(rows.length>0) {
						var checkData = [];
						$.each(rows,function(name,value) {
							checkData.push(value.autoId);
						});

						var autoId = 'autoId='+checkData;

						JAjax("maintain/mainTainRecordDeleteList.action",autoId,"text",function(data){
							if(data=='success')
								$.ligerDialog.success("操作成功");
							else
								$.ligerDialog.alert("数据有误", "信息提示", 'warn');
							obj.grid.search();
					  	},null,null);

					} else {
						$.ligerDialog.alert("请选择维保单据", "信息提示", 'warn');
						return null;
					}
				}
			}
		});
	},
	deleteRecord : function(autoId) {
		var obj = this;
 		$.ligerDialog.confirm("确定要删除该记录吗？", function(yes) {
			if (yes) {
				var autoIdL = 'autoId='+autoId;
				JAjax("maintain/mainTainRecordDeleteList.action",autoIdL, "text",
						function(data){
							if(data=='success')
								$.ligerDialog.success("删除成功!","信息提示");
							else
								$.ligerDialog.alert("数据有误", "信息提示", 'warn');
							obj.grid.search();
						}, null, null);
				}
 			});
	},
	//获取维保项目列表，用于主页查询
	checkFunction : function(){
		JAjax("maintain/findAllClassByEntId.action", "", "json",
				function(data) {
					var obj = this;
					obj.planClassArray = new Array();
					var mainTainClassSelect = $("#mainTainRecordId");
					var options = "";
					mainTainClassSelect.empty();
					if (data != null && data != "" && data != undefined) {
						var objArray = eval(data);
						options += "<option value='' >请选择</option>";
						for ( var j = 0; j < objArray.length; j++) {
							var oArray = objArray[j];
							options += "<option value='" + oArray.maintainId + "' >"
									+ oArray.maintainName + "</option>";
						}
						try {
							mainTainClassSelect.append(options);
						} catch (ex) {
						}
					}
		}, null, true);
		
	},
	//更新实际维保里程和时间
	updateMaintainDateRecord:function(date,type,vid) {
		var obj =  this;
		var dataV = "";
		if(type=='mileage') {
			dataV = $("#mileage"+date).val();
			if(isNaN(dataV)){
				$.ligerDialog.alert("里程必须为数字!","信息提示", 'warn');
				$("#mileage"+date).val("");
				return false;
			}
		} else{
			dataV = $("#date"+date).val();
		}
			if(dataV!=null&&dataV!=""){
				JAjax("maintain/updateMaintainDateRecord.action?updateMaintainDate="+dataV+"&autoId="+date+"&type="+type+"&vid="+vid,null, "text",
					function(data){
						if(data=='mileage') {
						}
						else {
							$("#mileage" + date).val(data);
						}
	
					}, null, null);
			}else{
				return false;
			}
	},
	//维护和导出权限
	checkButtonFunction : function(){
		if(!checkFunction("FG_MEMU_MAINTENANCE_TYPE_MESSAGE_U")){
			$("#recordMaintainRecordBottonSpan").html("");
		}
		if(!checkFunction("FG_MEMU_MAINTENANCE_TYPE_MESSAGE_EMP")){
			$("#maintainBottonSpan").html("");
		}
	}

};
//左侧点击收缩
$("#maintainRecordLeftShrink").find("a").click(function(){
	if(maintainRecordManager.leftShrinkhidden==0){
		$("#maintainRecordLeftShrink").removeClass().addClass('hidden_pop_up_vertical_pop_up');
		$("#vehicleRecordLeftNavigation").hide();
		maintainRecordManager.leftShrinkhidden=1;
	}else{
		$("#maintainRecordLeftShrink").removeClass().addClass('hidden_pop_up_vertical_hidden');
		$("#vehicleRecordLeftNavigation").show();
		maintainRecordManager.leftShrinkhidden=0;
	}
	maintainRecordManager.onResize(true);
});

var maintainRecordManager = new maintainRecordManagement();
var maintainDetailLeftTree = null;
$(document).ready(function() {
	maintainRecordManager.checkFunction();
	
	maintainRecordManager.checkButtonFunction();
	maintainRecordManager.init();
	
	maintainClassFream.maintainShowObj = maintainRecordManager;
});
