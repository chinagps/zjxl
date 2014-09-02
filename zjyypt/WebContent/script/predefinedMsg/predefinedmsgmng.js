var predefinedmsg = function(o) {
	this.SIM_C = false;
	this.SIM_U = false;
	this.SIM_UD = false;
	this.SIM_D = false;
	
	this.manager = null;
	this.addObject = o;
	this.titleHeight = $("#predefinedmsgSearchForm").height();
};
predefinedmsg.prototype = {
	orgTree : function(){
		var obj = this;
		var center = getHeightAndWidth();
		var height = center.height;
		var width = center.width;
		//$("#predefinedmsgmng").height(height);
		$("#predefinedmsgmng").width(width-280);
		$("#predefinedmsgSearchAddform").height(height-34);
		//$("#predefinedmsgmngcontent").height(height-34);
	},
	getGridHeight : function(){
		var center = getHeightAndWidth();
		return center.height - this.titleHeight - 88;
	},
	onResize : function(){
		var obj = this;
		
		var center = getHeightAndWidth();
		var height = center.height;
		var width = center.width;
		$("#predefinedmsgmng").width(width-280);
		$("#predefinedmsgSearchAddform").height(height-34);
		//$("#predefinedmsgmng").height(height);
		//$("#predefinedmsgmngcontent").height(height-34);
		//$("#predefinedmsgSearchAddform").width(width-280);
		//$("#predefinedmsgSearchAddform").css("display","block");
		if(obj.gridManager){
			obj.gridManager.setHeight(obj.getGridHeight());
		}
	},
	predefinedmsgGrid : function(){
		var predefinedmsgObject = this;
		var height = predefinedmsgObject.getGridHeight();
		options = {
				//列
				columns:[ 
					{display: '信息类型', name : 'msgType', width : 100, sortable : true, align: 'center',render:function(row){
						if(row.msgType == '1')
							return "文本信息";
						else if(row.msgType == '2')
							return "事件信息";
						else return "";
					}},
//					{display: '信息标志位', name : 'businessId', width : 100, sortable : true, align: 'center',render:function(){
//						return "";
//					}},
//					{display: '信息标题', name : 'msgIdx', width : 100, sortable : true, align: 'center'},
					{display: '信息内容', name : 'msgBody', width : 200, sortable : true, align: 'center'},
//					{display: '是否共享', name : 'isShared', width : 100, sortable : true, align: 'center',render:function(row){
//						if(row.isShared == '1')
//							return "共享";
//						else if(row.isShared == '0')
//							return "不共享";
//						else 
//							return "";
//					}},
					{display: '录入人', name : 'opName', width : 100, sortable : true, align: 'center'},
					{display: '录入时间', name : 'createUtcStr', width : 140, sortable : true, align: 'center'},
					{display: '操作', name : 'entState', width : 100, sortable : true, align: 'center',render: function (row) {
						  var modify = '';
						  var remove = '';
						  if(predefinedmsgObject.SIM_U){
							  modify = '<a href="javascript:winPredefinedmsgMng.modifyPredefinedmsg(' + row.msgId + ')">修改</a>';
						  }
						  if(predefinedmsgObject.SIM_D){
							  remove = '<a href="javascript:winPredefinedmsgMng.removePredefinedmsg(' + row.msgId + ')">删除</a>';
						  }
					      
//					      if (!predefinedmsgObject.SIM_U)
//						  		modify="";//$("a[name=vehicleModify]").remove();
//						  if (!predefinedmsgObject.SIM_D)
//						  		remove="";//$("a[name=vehicleDelete]").remove();
					      
					      return modify + "&nbsp;" + remove;
					}}
	    		],
	    		showCheckbox:false,
	    		sortName:'id',
	    		url: 'systemmng/findPredefinedMsgForListPage.action',
	    		data: "orgId=4",
	    		showTitle:false,
	    		pageSize:10,
	    		pageSizeOptions:[10,20,30,40],
	    		height:height,
	    		width : "99.8%",
	    		autoLoad:false,
	    		//填充数据的tableid
	            tableId: 'predefinedmsgGrid',
	            //查询条件formid
	            searchFormId :'predefinedmsgSearchForm',
	            
	            
	            addURL : 'systemmng/addPredefinedmsg.action', //添加的时候使用的url
				detailURL : 'systemmng/findPredefinedMsgById.action',//获得详情方法 在修改前要调用 
				updateURL : 'systemmng/modifyPredefinedmsg.action',//修改的时候使用的url
				editModel:"tbPredefinedMsg",
	        	container:"predefinedmsgSearchAddform", //包含这个form的对象用来loadhtml
				loadHtml : 'model/predefinedMsg/addpredefinedmsg.jsp',//增加页面使用的html model/vehicle/addvehicle.jsp 
				formId : 'addPredefinedmsgForm',//页面中使用的form的ID 用来在新增和修改的时候 submitId : '',//
				submitId:'addPredefinedmsgFormsubmitMe',
				closeId : 'close',//重置按钮的id, 
				
				mainContain : "predefinedmsgmng",
				//addButton :"showAdd",
				Buttons:[{
					id:"showAdd",
					fun:function(){
						//alert(1);
						$("label[class=error]").each(function(){
							$(this).remove();
						});
						predefinedmsgObject.ctfoFormWithGrid.add();
						predefinedmsgObject.status ="add";
					}
				}],
				gridDIV:"predefinedmsgmngcontent",
				// add 页面：下拉框 业务表 Ajax请求
				selects : [],
				// add页面 下拉框 -- 码表 
				localSelect: [],
				addLoadFunction: function(){
					//alert(2);
					//KCPT.CodeManager.prototype.getSelectList("SYS_STAFF_WORK_TYPE", "opType");
					//KCPT.CodeManager.prototype.getSelectList("SYS_SPECIAL", "opSuper");
				}
		};
		
//		if (!predefinedmsgObject.SIM_D && !predefinedmsgObject.SIM_U) {// 如果没有修改权限，操作列不显示
//			options.columns.pop();
//		}
		
		predefinedmsgObject.ctfoFormWithGrid = new ctfoFormWithGrid(options);
		predefinedmsgObject.grid = predefinedmsgObject.ctfoFormWithGrid.getGrid();
		predefinedmsgObject.gridManager = $("#predefinedmsgGrid").ligerGetGridManager();
	},
	// 修改
	modifyPredefinedmsg : function(date){
		
		$("label[class=error]").each(function(){
			$(this).remove();
		});
		
		
		var predefinedmsgObject =this;
		var sidMap = {"msgId" :date};
		predefinedmsgObject.ctfoFormWithGrid.update(sidMap);
		predefinedmsgObject.status="update";
	},
	// SIM卡删除
	removePredefinedmsg : function(msgId){
		var obj = this;
		$.ligerDialog.confirm("确认删除调度信息吗？", function(yes){
			if(yes){
				 JAjax('systemmng/removePredefinedMsg.action?tbPredefinedMsg.msgId=' + msgId,{},'json',function(data){
					 var msg = eval(data);
					 if(msg.displayMessage){
						 getSchedulePreInstallMessage();//雪安提供的load全局文本和事件信息的方法
						 /**2012-04-06 jxf**/
						obj.updateSchedulePreMessage();
						 $.ligerDialog.success(data.displayMessage);
						 obj.ctfoFormWithGrid.getGrid().reload();
					 } else {
						 $.ligerDialog.error(msg.error[0].errorMessage);
					 }
				 }, null, false);
			}
		});
	},
	getAddPredefinedmsgFormValidate : function(){
		var obj = this;
		obj.addPredefinedmsgFormValidate = $("#addPredefinedmsgForm").validate({
			debug:false,
			rules:{
			},
			message:{
				
			}
		});
		return obj.addPredefinedmsgFormValidate;
	},
	modifyDo : function(){
		
		var obj = this;
		$("#addPredefinedmsgFormsubmitMe").click(function(){
			var t = obj.getAddPredefinedmsgFormValidate();
			// t.form() 验证通过，提交表单；否则，不处理
			if(t.form()){
				var data = $('#addPredefinedmsgForm').serializeArray();
				var TempUrl = "";
				//alert(obj.ctfoFormWithGrid.getForm().actionType);
				if(obj.ctfoFormWithGrid.getForm().actionType == 'update'){
					TempUrl = "systemmng/modifyPredefinedMsg.action";
				}else{
					TempUrl = "systemmng/addPredefinedMsg.action";
				}
				JAjax(TempUrl, data, "json", function(data){
					
					var sucMsg = eval(data);
					
					if(sucMsg.displayMessage){
						
						obj.ctfoFormWithGrid.status = 'list';
						obj.ctfoFormWithGrid.getForm().reset();
						obj.ctfoFormWithGrid.getForm().hide();
						obj.ctfoFormWithGrid.getGrid().show();
						obj.ctfoFormWithGrid.getGrid().search();		
						getSchedulePreInstallMessage();//雪安提供的load全局文本和事件信息的方法
						/**2012-04-06 jxf**/
						obj.updateSchedulePreMessage();
						
						$.ligerDialog.success(data.displayMessage);
						
					}else{
						obj.ctfoFormWithGrid.getForm().reset();
						$.ligerDialog.error(sucMsg.error[0].errorMessage);
					}
				}, null, true);
			}else{
				//alert("FAIL-validate");
			}
		});
	},
	updateSchedulePreMessage : function() {
		//更新KCPT.schedulePreMessage  2012-04-06 jxf
		JAjax(
				"systemmng/findPredefinedMsgByParam.action", 
				"", 
				"json", 
				function(data)
				{
					if(data && data.length > 0){
						KCPT.schedulePreMessage = data;
						if(KCPT.VehicleMonitorObj&&KCPT.VehicleMonitorObj.monitorTree){
							KCPT.VehicleMonitorObj.monitorTree.bindBatchScheduleEvent();
						}
					}
				}, null);
		
	},
	authentication : function() {// 权限验证
		this.SIM_C = checkFunction("FG_MEMU_MANAGER_PARAMETER_DISPATCH_C");
		this.SIM_U = checkFunction("FG_MEMU_MANAGER_PARAMETER_DISPATCH_U");
		//this.SIM_UD = checkFunction("BG_MEMU_BUSINESS_SUPPORT_SIM_CARD_REVOKE");
		this.SIM_D = checkFunction("FG_MEMU_MANAGER_PARAMETER_DISPATCH_D");
		if (!this.SIM_C)
			$("a[name=predefinedmsgAdd]").remove();
	},show : function(){
		var obj = this;
		obj.orgTree();
	}
};


$(document).ready( function() {
	//alert();
	var predefinedmsgMng = new predefinedmsg();
	predefinedmsgMng.authentication();
		// 加载组织树
	predefinedmsgMng.orgTree();
	// 加载 Grid
	predefinedmsgMng.predefinedmsgGrid();
	window.winPredefinedmsgMng = predefinedmsgMng;
	
	sysparammng.showObj = predefinedmsgMng;
	
});  
