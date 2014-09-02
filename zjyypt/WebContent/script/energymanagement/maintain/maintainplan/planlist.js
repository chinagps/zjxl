var planList = function() {
	this.maintainClassInfo  = new Array();
	this.version = "create by ningdh in 2011.12.27";
	this.grid = null;
	var treeFlag = 0;
	var dateV = new Date();
	this.todateValue = '';
	if((dateV.getMonth()+1)<=9)
		this.todateValue += dateV.getFullYear()+"-0"+(dateV.getMonth()+1);
	else
		this.todateValue += dateV.getFullYear()+"-"+(dateV.getMonth()+1);

	if(dateV.getDate()<=9)
		this.todateValue += '-0'+dateV.getDate();
	else
		this.todateValue += dateV.getDate();

//	this.height = KCPT.root.getCenterSize().height;
	this.titleHeight = $("#planListForm").height();
};
planList.prototype = {
		//隐藏左侧树
		onResize : function() {
			var obj = this;
			if (obj.gridManager) {
				obj.gridManager.setHeight(obj.getGridHeight());
			}
			if(ad){
				ad.onResize();
			}
			
			if(maintainPlanLeftTree){
				maintainPlanLeftTree.onResize();
			}
//			var nowHeight = KCPT.root.getCenterSize().height;
//	 		$("#planListContent").css("width",$(window).width()-5);
		},
//		initAddPlanHeight : function() {
//			var nowHeight = KCPT.root.getCenterSize().height;
//			$("#addPlanForm").find("#div_addplan").height(nowHeight-158);
//		},
		//使用正则表达式截取空格
		trim : function(s){
		    return s.replace(/^\s*/, "").replace(/\s*$/, "");
		},
		getGridHeight : function(){
			var center = getHeightAndWidth();
			return center.height - this.titleHeight - 78;
		},
		//初始化创建grid并查询
		initChartGrid : function() {
			var obj = this;
			//隐藏左侧树
//			obj.hide();
			var height = obj.getGridHeight();
			var options = {
				columns : [
						{display : '序号',name : 'planId',width: 30,align : 'center',render : function (row,index){
	                        return index + 1;
	                    }},
	    				{display : '维保项目',name : 'maintainName',width : 100,align : 'center'},
						{display : '执行频率',name : 'exeFrequency',width : 80,align : 'center',render : function(row) {
							return row.exeFrequency == 0 ? "循环执行" : "单次执行";}
	    				},
	    				{display: '循环执行', columns:
	    				[
							{display : '维保间隔里程',name : 'intervalMileage',width : 80,align : 'center',render : function(row) {
								return row.exeFrequency == 0 ? row.intervalMileage : "";}},
							{display : '提前提醒里程',name : 'warnMileage',width : 80,align : 'center',render : function(row) {
								return row.exeFrequency == 0 ? row.warnMileage : "";}},
							{display : '维保间隔天数',name : 'intervalDays',width : 80,align : 'center',render : function(row) {
								return row.exeFrequency == 0 ? row.intervalDays : "";}},
							{display : '提前提醒天数',name : 'warnDays',width : 80,align : 'center',render : function(row) {
								return row.exeFrequency == 0 ? row.warnDays : "";}}
	    				]
	    				},
	    				{display: '单次执行', columns:
		    				[
								{display : '计划执行时间',name : 'exeTime',width : 80,align : 'center',render : function(row) {
									return row.exeFrequency == 1 ? row.exeTime : "";}},
								{display : '提前提醒天数',name : 'warnDays',width : 80,align : 'center',render : function(row) {
									return row.exeFrequency == 1 ? row.warnDays : "";}},
								{display : '维保间隔里程',name : 'intervalMileage',width : 80,align : 'center',render : function(row) {
									return row.exeFrequency == 1 ? row.intervalMileage : "";}},
								{display : '提前提醒里程',name : 'warnMileage',width : 80,align : 'center',render : function(row) {
									return row.exeFrequency == 1 ? row.warnMileage : "";}}
		    				]
		    			},
		    			{display : '创建人',name : 'createByName',width : 80,sortable : false,align : 'center'},
						{display : '创建时间',name : 'createTime',width : 130,align : 'center'},
						{display : '最后修改人',name : 'modifyByName',width : 80,sortable : false,align : 'center'},
						{display : '最后修改时间',name : 'modifyTime',width : 130,sortable : false,align : 'center'},
						{display : '操作',name : '',width : 140,render : function(row) {
							var functionChecked = '';
							if(row.exeFrequency==1) {
								var exeDate = Number((row.exeTime.replace('-','')).replace('-',''));
								var toDay = Number((obj.todateValue.replace('-','')).replace('-',''));
								if(exeDate>=toDay) {
									if(checkFunction("FG_MEMU_MAINTENANCE_TYPE_PLAN_U")){
										functionChecked += '<a title="点击修改记录" href="javascript:plan.updateRecord('+ row.planId+ ','+ row.maintainId +')">编辑</a>';
									}
									if(checkFunction("FG_MEMU_MAINTENANCE_TYPE_PLAN_D")){
										functionChecked +="&nbsp;&nbsp;"+'<a title="点击删除记录" href="javascript:plan.deleteRecord('+ row.planId+ ')">删除</a>';
									}
									if(checkFunction("FG_MEMU_MAINTENANCE_TYPE_PLAN_U")){
										functionChecked +="&nbsp;&nbsp;"+'<a title="点击查看所选车辆" href="javascript:plan.selectChangeVehicleMaintain('+ row.planId+ ',\'true\',\''+row.maintainName+'\')",\'1\'>查看车辆</a>';
									}
								} else {
									functionChecked = '&nbsp;&nbsp;&nbsp;&nbsp;';
									if(checkFunction("FG_MEMU_MAINTENANCE_TYPE_PLAN_D")){
										functionChecked +="&nbsp;&nbsp;"+'<a title="点击删除记录" href="javascript:plan.deleteRecord('+ row.planId+ ')">删除</a>';
									}
									if(checkFunction("FG_MEMU_MAINTENANCE_TYPE_PLAN_U")){
										functionChecked +="&nbsp;&nbsp;"+'<a title="点击查看所选车辆" href="javascript:plan.selectChangeVehicleMaintain('+ row.planId+ ',\'false\',\''+row.maintainName+'\',\'1\')">查看车辆</a>';
									}
								}
							} else {
								if(checkFunction("FG_MEMU_MAINTENANCE_TYPE_PLAN_U")){
									functionChecked += '<a title="点击修改记录" href="javascript:plan.updateRecord('+ row.planId+ ','+ row.maintainId +')">编辑</a>';
								}
								if(checkFunction("FG_MEMU_MAINTENANCE_TYPE_PLAN_D")){
									functionChecked +="&nbsp;&nbsp;"+'<a title="点击删除记录" href="javascript:plan.deleteRecord('+ row.planId+ ')">删除</a>';
								}
								if(checkFunction("FG_MEMU_MAINTENANCE_TYPE_PLAN_U")){
									functionChecked +="&nbsp;&nbsp;"+'<a title="点击查看所选车辆" href="javascript:plan.selectChangeVehicleMaintain('+ row.planId+ ',\'true\',\''+row.maintainName+'\',\'0\')">查看车辆</a>';
								}
							}
							return functionChecked;
							}
						} ],
				container : 'planListEditArea', // 包含这个form的对象用来loadhtml
				loadHtml : 'model/energymanagement/maintain/maintainplan/addplan.jsp',// 增加页面使用的路径
				formId : 'addPlanForm',// 页面中使用的form的ID 用来在新增和修改的时候
				submitId : 'addPlanSubmitButton', //增加一条记录按钮
				closeId : 'addPlanCloseButton',  // 取消返回列表按钮
				showCheckbox : false,
				showTableToggleBtn : true,
				sortName : 'vid',
				url : 'maintain/selectMainTainPlanList.action',//查询Grid列表请求的URL
				showTitle : true,
				pageSize : 30,
				height : height,
				autoLoad : true,
				mainContain : "planListContent",
				Buttons : [ {id : "addRecord",fun : function() {
						obj.ctfoFormWithGrid.add();
				}}],
				gridDIV : 'planListManagementMainArea', // 填充数据的tableid
				tableId : 'planListTable', // 查询列表对应的DIV ID
				searchFormId : 'planListForm', //查询页面对应的FORM ID
				addURL : 'maintain/insertMainTainPlan.action', // 添加保存请求的action
				detailURL : 'maintain/singleMainTainPlan.action',// 根据ID获得明细的action
				updateURL : 'maintain/updateMainTainPlan.action',// 修改信息之后点击保存之后的action
				editModel : "tbMaintainPlan",
				//进入添加页面调用函数
				addLoadFunction : function() {
					obj.findMainTainViewClass("single");
 					$("#maintainplanEditFlag").val("1");
					$("#exeFrequency").val('0');
					$("#addMaintainContent").attr("disabled","true");
					$("#frequency0").show();
					$("#frequency1").show();
					$("#frequency2").hide();

					$("#maintainIdSpan").html("维保项目:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<select id=\"maintainId\" name=\"tbMaintainPlan.maintainId\" style=\"width: 150px;\" onchange=\"ad.changeMainTainClassName();\"></select>");
					$("#addMaintainContentSpan").html("维保描述:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<textarea readonly=\"readonly\" disabled=\"disabled\" cols=\"55\" rows=\"4\" id=\"addMaintainContent\" name=\"tbMaintainPlan.maintainContent\"></textarea>");

					//添加页面显示左侧树
					$("#vehiclePlanLeftNavigation").width(260);
					$("#vehiclePlanLeftNavigation").show();
					$("#vehiclePlanLeftNavigation").addClass('left_c');
					$("#accordionplan1").removeClass().removeClass('left_c_display');
					maintainPlanLeftTree.bindPanelSize();
				},
				//进入编辑页面调用函数
				editLoadFunction : function() {
					obj.findMainTainViewClass("all");
					$("#maintainId").attr("disabled","true");
					$("#exeFrequency").attr("disabled","true");
					$("#addMaintainContent").attr("disabled","true");

					//编辑页面隐藏左侧树
					$("#vehiclePlanLeftNavigation").hide();
 					$("#vehiclePlanLeftNavigation").removeClass('left_c');
					$("#accordionplan1").removeClass().addClass('left_c_display');
				},
//				initReady : function(){
//					obj.initAddPlanHeight();
//				},
				//这个是增加的时候,提交前函数
				beforeSubmit:function() {
					var flag = false;
					var planId = $("#planId").val();
					// 判断是否选中车辆
					if(planId){
						$("#vidStr").val("");
					}else{
						var treeStr = maintainPlanLeftTree.getCheckSelect("vehicle",0);;
						$("#vidStr").val(treeStr);
						if (treeStr == "") {
							$.ligerDialog.alert("请选择车辆！", "提示", 'warn');
							return false;
						}
					}
					var frequency = $("#exeFrequency").val();
					var maintainId= $("#maintainId").val();
					var maintainName= $("#maintainId").html();
				    //赋值隐藏字段
					$("#updateMaintainId").val(maintainId);
					$("#updateMaintainName").val(maintainName);
					$("#updateExeFrequency").val(frequency);
					var intervalMileage = obj.trim($("#intervalMileage").val());
					var warnMileage = obj.trim($("#warnMileage").val());
					var intervalDays = obj.trim($("#intervalDays").val());
					var warnDays = obj.trim($("#warnDays").val());
					var exeTime = obj.trim($("#exeTime").val());
					//循环执行
					if(frequency=='0'){
						//判断间隔里程
						if(intervalMileage==''){
							if(warnMileage!=''){
								$("#warnMileageSpan").text("请输入间隔里程");
								return false;
							}
						}else{
							flag = true;
							//判断提醒里程
							if(warnMileage==''){
								$.ligerDialog.alert("请输入提醒里程", "提示", 'warn');
								return false;
							}else{
								var intervalMileage = $('#intervalMileage').val()-$('#warnMileage').val()-1;
								if(intervalMileage<0) {
									$.ligerDialog.alert("提醒里程应小于间隔里程", "提示", 'warn');
									return false;
								}
							}
						}

						//判断间隔天数
						if(intervalDays==''){
							if(warnDays!=''){
								$("#warnDaysSpan").text("请输入间隔天数");
								return false;
							}
						}else{
							//判断提醒天数
							flag = true;
							if(warnDays==''){
								$.ligerDialog.alert("请输入提醒天数", "提示", 'warn');
								return false;
							}else{
								var intervalDays = $('#intervalDays').val()-$('#warnDays').val()-1;
								if(intervalDays<0) {
									$.ligerDialog.alert("提醒天数应小于间隔天数", "提示", 'warn');
									return false;
								}
							}
						}

					}
					//单次执行
					else if(frequency=='1'){
						//判断执行日期
						if(exeTime==''){
							if(warnDays!=''){
								$("#warnDaysSpan").text("请输入结束时间");
								return false;
							}
						}else{
							//判断提醒天数
							flag = true;
							if(warnDays==''){
								$.ligerDialog.alert("请输入提醒天数", "提示");
								return false;
							}else{
								var d = new Date();
								var vYear = d.getFullYear();
								var vMon = d.getMonth() + 1;
								var vDay = d.getDate();
								var dd = $("#exeTime").val().split('-');

								var dayLast = Number((dd[0]-vYear)*365)+Number((dd[1]-vMon)*31)+((dd[2]-vDay));
								var warnDays = $('#warnDays').val();

								if(warnDays>dayLast) {
									$.ligerDialog.alert("设置的提醒时间已过,请修改！", "提示", 'warn');
									return false;
								}
							}
						}

						//判断间隔里程
						if(intervalMileage==''){
							if(warnMileage!=''){
								$("#warnMileageSpan").text("请输入间隔里程");
								return false;
							}
						}else{
							//判断提醒里程
							flag = true;
							if(warnMileage==''){
								$.ligerDialog.alert("请输入提醒里程","提示", 'warn');
								return false;
							}else{
								var intervalMileage = $('#intervalMileage').val()-$('#warnMileage').val()-1;
								if(intervalMileage<0) {
									$.ligerDialog.alert("提醒里程应小于间隔里程", "提示", 'warn');
									return false;
								}
							}
						}

					}
					if(flag==false){
						$.ligerDialog.alert("请输入维保条件！", "提示", 'warn');
						return false;
					}

					return true;
				},
				success:function(data){
					if(data.displayMessage==null)
						data.displayMessage = '';
					if(data.displayMessage=='success'){
						var oo = plan.ctfoFormWithGrid;
						oo.form.actionType == "add";
						oo.status = "list";
						oo.form.hide();
						oo.form.reset();
						oo.grid.show();
						$.ligerDialog.success("数据保存成功！");
						plan.grid.gridManager.loadData(true);
					}else{
						$.ligerDialog.success("该类别计划已生成！");
					}
//					plan.onResize();
				},
				//隐藏目录树
				detailLoadFunction:function(){
					obj.hide();
				},
				gridBeforeSubmit : function(){
					obj.curStartDate = $("#maintainPlanStartDate").val();
					obj.curEndDate = $("#maintainPlanEndDate").val();
					var startdate=Number((obj.curStartDate.replace('-','')).replace('-',''));
					var enddate  =Number((obj.curEndDate.replace('-','')).replace('-',''));
					if (obj.curStartDate == "") {
						startdate = 0;
					}
					if (obj.curEndDate == "") {
						enddate = 0;
					}
					if(startdate!=0&&enddate!=0&&startdate > enddate){
						$.ligerDialog.alert("结束时间不能少于开始时间", "信息提示", 'warn');
						return false;
					}
					return true;
				}
			};
			obj.ctfoFormWithGrid = new ctfoFormWithGrid(options);
			obj.grid = obj.ctfoFormWithGrid.getGrid();
			
			obj.gridManager = $("#planListTable").ligerGetGridManager();
	   },
	   //删除记录
	   deleteRecord:function(planId) {
			$.ligerDialog.confirm('确定要删除该条记录吗！', function(yes) {
				if (yes) {
					JAjax("maintain/deleteMainTainPlan.action?queryPlanId=" + planId,"", "json", plan.removeSuccess, plan.removeError, true);
				}
			});
		},
		//更新记录
		updateRecord : function(data,maintainId) {
			var obj = this;
			var planIdSet = {
				"queryPlanId" : data
			};
			JAjax("maintain/findMaintainClassById.action?maintainId=" + maintainId, "", "json",
					obj.changeEditData, null, true);

			obj.ctfoFormWithGrid.update(planIdSet);
		},

		changeEditData : function(data){
			$("#maintainIdSpan").html("维保项目:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<input id=\"editMaintainId\" readonly=\"readonly\" maxlength=\"5\" style=\"width: 150px\"  />");
			$("#editMaintainId").val(data.maintainName).attr("disabled","true");
			$("#addMaintainContentSpan").html("维保描述:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<textarea readonly=\"readonly\" disabled=\"disabled\" cols=\"55\" rows=\"4\" id=\"editMaintainContent\"></textarea>");
			$("#editMaintainContent").html(data.maintainContent);
		},

		removeSuccess : function(data){
			if(data.displayMessage=="success"){
				$.ligerDialog.success('删除成功！');
				//重新加载页面
				plan.grid.gridManager.loadData(true);
				//$("#planListForm").trigger("submit");
			}
			else if(data.displayMessage=="isnotnull"){
				$.ligerDialog.alert("该维保计划下已有添加的有维保车辆，不能删除！", "信息提示", 'warn');
			}
			else{
				$.ligerDialog.error('删除失败！');
			}
		},
		removeError  : function(data){
			$.ligerDialog.error('没有登录！');
		},
		// 查询维保管理类别
		findPlanMainTainClass : function() {
			var obj = this;
			JAjax("maintain/findAllClassByEntId.action", "", "json",
					plan.createPlanSelectMainTainClass, null, true);
		},
		// 创建维保类别下拉菜单
		createPlanSelectMainTainClass : function(data) {
			var obj = this;
			obj.planClassArray = new Array();
			var mainTainClassSelect = $("#queryPlanMainTainId");
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
		},
		// 查询维保管理类别
		findMainTainViewClass : function(type) {
			$(".red").html("");
			var obj = this;
			if(type=='all') {
				JAjax("maintain/findAllClassByEntId.action", "", "json",
						obj.createSelectMainTainViewClass, null, true);
			} else {
				JAjax("maintain/findAllClassByEntId.action?maintainClassType=true", "", "json",
					obj.createSelectMainTainViewClass, null, true);
			}
		},
		selectChangeVehicleMaintain : function (data,type,maintainName,exeFrequency) {
			//这里将维保设定的车辆写入公共函数
			var vehicleV= '';
			if(type=='true')
				vehicleV+="1"+exeFrequency+"-"+maintainName+"-"+data+"-";
			else
				vehicleV+="0"+exeFrequency+"-"+maintainName+"-"+data+"-";
			$("#mainWorkArea").A_Window({
				dragabId : 'mainWorkArea', // 可拖动的范围
				id : 'showPlanVehicleMainDiv',
				width : 800, // 宽度
				height : 455,// 高度
				priv : vehicleV,
				load_fn : function() {
					$("#showPlanVehicleMainDivClose").click(
		 	        	function(){
		 	        		$("#lazyPlanId").val(data);
		 	        		$("#mainWorkArea").close_ALL_Window();  //根据悬浮的window的id关闭window
		 	        	}
		 	        );
				},
				url : 'model/energymanagement/maintain/maintainplan/selectVehicle.jsp'
			});
		},
		// 创建维保类别下拉菜单
		createSelectMainTainViewClass : function(data) {
			var obj = this;
			obj.planClassArray = new Array();
			var mainTainNameSelect = $("#maintainId");

			var optionsName = "";
			mainTainNameSelect.empty();
			if (data != null && data != "" && data != undefined) {
				var objArray = eval(data);
				for ( var j = 0; j < objArray.length; j++) {
					var oArray = objArray[j];
					var content = oArray.maintainContent;
					optionsName += "<option value='" + oArray.maintainId + "' >"
							+ oArray.maintainName + "</option>";

					var infoCont = new Array();
					infoCont[0] = oArray.maintainId;
					infoCont[1] = content;
					plan.maintainClassInfo.push(infoCont);

					// 生成维保类别数组
					obj.planClassArray[j] = [ oArray.maintainId,
							oArray.maintainName, oArray.maintainContent ];
				}
				$("#addMaintainContent").html(objArray[0].maintainContent);
				try {
					mainTainNameSelect.append(optionsName);
					//赋值隐藏字段
					$("#maintainName").val(obj.planClassArray[0][1]);
				} catch (ex) {
				}
			}
		},
		//添加权限
		checkButtonFunction : function(){
			if(!checkFunction("FG_MEMU_MAINTENANCE_TYPE_PLAN_C")){
				$("#maintainPlanAddButton").html("");
			}
		}
};
var plan = new planList();
var maintainPlanLeftTree;
var ad;
$(document).ready(function() {
	plan.onResize();
	plan.findPlanMainTainClass();
	plan.initChartGrid();
	plan.checkButtonFunction();
	
	maintainClassFream.maintainShowObj = plan;
});
