var chooseVehicleSon = function() {
	this.version = "create by liujie in 2012.05.21";
 };

chooseVehicleSon.prototype = {
	initTree : function() {
		$("#accordionCvs1").ligerAccordion({ height : 490 ,changeHeightOnResize : false,speed : 'normal'});
		var obj = this;
		obj.setSecond(obj);
    },
    initValue : function() {
    	$("#vehicleNoSon").val($("#vehicaleNum").val());
		
    },
    initQuery : function() {
    	//根据用户输入的车牌号查询车辆信息
    	//$("#serchVeBtn").trigger("click");
    },
    initVehicle : function() {
    	//添加选择项到上部
    	$.each(checkedVeInfo,function(i,n) {
    		var vidv = n.split("|")[0];
    		var veNo = n.split("|")[1];
    		chooseVehicleSon.selectVehicelClick(vidv,veNo,veNo);
    	});
    },  
    disableBtn : function() {
    	$("#createReports").attr("disabled","true");
    	$("#goBackPage").attr("disabled", "true");
    },
	selectVehicleListGrid : function() {
		var obj = this;
		var options = {
			columns : [
					{
						display : '序号',
						name : 'vindex',
						width : 40,
						align : 'center'
					},
					{
						display : '组织',
						name : 'pentName',
						width : 90,
						align : 'center'
					},
					{
						display : '车队',
						name : 'entName',
						width : 130,
						align : 'center'
					},
					{
                        display : '车牌号',
                        name : 'vehicleNo',
                        width : 60,
                        align : 'center'
                    },
                    {
                        display : '自编号',
                        name : 'vid',
                        hide : true,
                        width : 115,
                        align : 'center'
                    }],
					showCheckbox : true,
					sortName : 'vid',
					url : 'vehicleanalysis/findVehicleInfo.action',
					showTitle : false,
					width: '100%',
 					height : 200,
					pageSize : 30,
					autoLoad : false,
					tableId : 'vehicleInfoTableDiv',
					searchFormId : 'selectVehicleSearchForm',
					onCheckRow : function(checked, data, rowindex, rowobj) {  //单选的操作
						if(checked) {
							checkedCustomer.push(data.vid.toString());
							var bl = obj.selectVehicelClick(data.vid,data.vehicleNo,data.vehicleNo);
							var rowobj1 = obj.grid.gridManager.getRowObj(rowindex, true);
							if(bl == false) {
								//反选
				                $(rowobj).removeClass("l-selected");
				                $(rowobj1).removeClass("l-selected");
				                obj.deleteSelectedVehicles(data.vid,data.vid,data.vehicleNo);
							}else {
								checkedVeInfo.push(data.vid +"|"+data.vehicleNo);
							}	
						}else {
							obj.deleteSelectedVehicles(data.vid,data.vid,data.vehicleNo);
						}
					},
					onCheckAllRow : function(checked, gridobj) {   //全选全部选的事件
						var data = obj.grid.gridManager.rows;
						if(checked) {
							var isCheck = 0;
							for (var rowparm in data) {
								//根据行索引得到行数据
						 		var item = data[rowparm];
						 		//得到行id
					            var rowid = item['__id'];
					            var robj = obj.grid.gridManager.getRowObj(rowid);
					            var rowobj1 = obj.grid.gridManager.getRowObj(rowid, true);
					            //如果没有选中，选中并添加该条记录
					            if($.inArray(item.vid,checkedCustomer) == -1) {
					            	if(isCheck == 1) {
					            		//反选
						                $(robj).removeClass("l-selected");
						                $(rowobj1).removeClass("l-selected");
					            	}else {
					            		var bl = obj.selectVehicelClick(item.vid,item.vehicleNo,item.vehicleNo);
						            	if(bl) {
						            		checkedCustomer.push(item.vid);
							            	checkedVeInfo.push(item.vid +"|"+item.vehicleNo);
						            	}else {
						            		//反选
							                $(robj).removeClass("l-selected");
							                $(rowobj1).removeClass("l-selected");
							                isCheck = 1;
							                if($(".l-grid-header-table").find("tr").hasClass("l-checked")) {
												$(".l-grid-header-table").find("tr").removeClass("l-checked");
											}
						            	}
					            	}
					            }
							}
						}else {
							for (var rowparm in data) {
								//根据行索引得到行数据
						 		var item = data[rowparm];
						 		//删除车辆到上层
						 		obj.deleteSelectedVehicles(item.vid,item.vid);
						 		checkedCustomer = [];
						 		checkedVeInfo = [];
							}
							
						}
					},
					onAfterShowData : function() {
						var data = obj.grid.gridManager.rows;
						for (var rowparm in data) {
							//根据行索引得到行数据
					 		var item = data[rowparm];
					 		//得到行id
				            var rowid = item['__id'];
				            var robj = obj.grid.gridManager.getRowObj(rowid);
				            var rowobj1 = obj.grid.gridManager.getRowObj(rowid, true);
				            //如果没有选中，选中并添加该条记录
				            if($.inArray(item.vid,checkedCustomer) != -1) {
				            	$(robj).addClass("l-selected");
				                $(rowobj1).addClass("l-selected");
				            }
						}
						if($(".l-grid-header-table").find("tr").hasClass("l-checked")) {
							$(".l-grid-header-table").find("tr").removeClass("l-checked");
						}
					}
 			};
		this.grid = new ctfoGrid(options);
	},
	setSecond : function(o){
		$("#panelConCvs2").ligerTree({
			url: 'operationmanagement/findOrgTree.action',
			onSuccess : function(data,curnode,param){
			},
			checkbox : true,
			childType : 'entType'
		});
		o.treeTwoManager = $("#panelConCvs2").ligerGetTreeManager();
	},
	selectVehicelClick : function(vid,vinCode,vehicleNO){
		if(checkedCustomer.length > 30) {
		   $.ligerDialog.alert("选择的车辆请勿超过30辆！", "信息提示",'warn');
		   return false;
	   }
   	   $("#selectVehicleDiv").append("<span id=\""+vid+"\"><div class='cp_close'><div class='cp_close_number'>"+vehicleNO+"</div><div class='cp_close_close'><a href=\"javascript:chooseVehicleSon.deleteSelectedVehicles('"+vid+"','"+vid+"','"+vehicleNO+"')\" title=\"点击删除车辆\"  id=\"addRecord\"></a></div></div></span>");
   	   return true;
	},
	selectVehicelClickTwo : function(){
		if(checkedCustomer.length > 30) {
			   $.ligerDialog.alert("选择的车辆请勿超过30辆！", "信息提示",'warn');
			   return false;
		}
	   	return true;
	},
	getCheckSelect : function(tx,flag,notes){
		var str = "";
		//var idx = "2";
		//var manager = chooseVehicleSon.getManager(idx);
		//var notes = manager.getChecked();
        for (var i = 0; i < notes.length; i++)
        {
        	var entType = "";
        	try{
        		entType = notes[i].data.nodeType ? notes[i].data.nodeType : "";
        	}catch(e){entType = "3";}//在获取不到节点属性nodeType 的情况下，该方法是获取 车辆 ID
			if((tx == "group" && entType == "1") ||
				(tx == "fleet" && entType == "2") ||
				(tx == "wayLine" && entType == "4")){
				if(flag){
					var d = $(notes[i].target).find("div[class*=l-checkbox-incomplete]");//获取该车辆所在车队，是否半选
					if(d.length != 0){
						continue ;
					}
				}
				if(str.length != 0 ){
					str = str + "," + notes[i].data.id;
				}else{
					str = notes[i].data.id;
				}
			}else if(tx == "vehicle" && entType == "3"){
				//车辆 为懒加载数据，tree.data中无法获取到jquery对象，自获取target-DOM对象获取ID
				//var parentNode = manager.getParentTreeItem(notes[i].target);
				if(flag){
					var parentNode = $(notes[i].target).parent().parent();
					var d = $(parentNode).find("div[class*=l-checkbox-incomplete]");//获取该车辆所在车队，是否半选
					if(d.length == 0){
					 continue;
					}
				}
				if(str.length != 0){
					str = str + "," + $(notes[i].target).attr("id");
				}else{
					str = $(notes[i].target).attr("id");
				}
			}
        }
        return str;
	},
	getManager : function(idx){//获取需要操作树的管理器
		var obj = this;
		var manager = "";
		if(idx == '1'){
			manager = obj.treeOneManager;
		}else if(idx == '2'){
			manager = obj.treeTwoManager;
		}else if(idx == '3'){
			manager = obj.treeTreeManager;
		}else if(idx == '4'){
			manager = obj.treeFourManager;
		}else if(idx == '5'){
			manager = obj.treeFiveManager;
		}
		return manager;
	},
	bindSubmitEvent : function(){
		$("#serchVeBtn").click(function(){
			debugger;
			
			var manager = chooseVehicleSon.getManager('2');
			var notes = manager.getChecked();
			if(notes.length==0){
				$.ligerDialog.alert("请选择车队", "信息提示",'warn');
				return false;
			}
			$("#entIdForSelectVehicles").val(chooseVehicleSon.getCheckSelect("fleet",true,notes));
		});
	},
	deleteSelectedVehicles:function(spanId,vid,vehicleNO){
	 	
	 	//获取grid的行数据
	 	var data = this.grid.gridManager.rows;
	 	for (var rowparm in data) {
 			//根据行索引得到行数据
	 		var item = data[rowparm];
	 		//得到行id
            var rowid = item['__id'];
            //获得checkbox的行dom
            var rowobj1 = this.grid.gridManager.getRowObj(rowid, true);
            //获取数据的行dom
            var robj = this.grid.gridManager.getRowObj(rowid);
            if($(robj).find("td").eq(4).text() == vid) {
            	//反选
                $(robj).removeClass("l-selected");
                $(rowobj1).removeClass("l-selected");
            }
 		}
	 	if($.inArray(vid,checkedCustomer) != -1) {
	 		checkedCustomer.splice($.inArray(vid,checkedCustomer),1);
			checkedVeInfo.splice($.inArray(vid +"|"+vehicleNO,checkedVeInfo),1);
	 	}
	 	
	    $("#"+spanId).remove();
	},
	fuzhi:function(){
		$("#selectedVehicleVid").val(checkedCustomer.toString());
		$("#updatePageSelectedVehicleVids").val($("#selectedVehicleVid").val());
	}
};
$("#closePage").click(function() {
    $("#selectedVehicleVid").val('');
    var obj = {id:'parMainWinId'};  //悬浮window的ID
	$("#mainWorkArea").close_A_Window(obj);  //根据悬浮的window的id关闭window
	$("#createReports").removeAttr("disabled");
	$("#goBackPage").removeAttr("disabled");
});

$("#reselectedVehicle").click(function() {
	 $.ligerDialog.confirm("确定要重新选择车辆吗？", function(yes) {
		  if (yes) {
			  $("#selectVehicleDiv").html("");
			  chooseVehicleSon.grid.gridManager.loadData();
		      checkedCustomer = [];
		      checkedVeInfo = [];
		}
	});
});
 
$("#validationSelectedVehicel").click(function() {
	if(checkedCustomer.length > 0) {
		$.ligerDialog.confirm("确定车辆选择完成吗？", function(yes) {
			  if (yes) {
				  var bl = chooseVehicleSon.selectVehicelClickTwo();
				  if(bl) {
					  chooseVehicleSon.fuzhi();
					  var obj = {id:'parMainWinId'};  //悬浮window的ID
					  $("#mainWorkArea").close_A_Window(obj);  //根据悬浮的window的id关闭window
				      $("#showSelectedVehicle").trigger('click');
				      $("#createReports").removeAttr("disabled");
				  	  $("#goBackPage").removeAttr("disabled");
				  }
	 		}
		});
	}else {
		$.ligerDialog.alert("请选择车辆", "信息提示",'warn');
	}
	
});
var chooseVehicleSon = new chooseVehicleSon();
$(document).ready(function() {
	chooseVehicleSon.selectVehicleListGrid();
	chooseVehicleSon.initValue();
	$("#mainWorkArea").show_A_Window({});
	chooseVehicleSon.initTree();
	chooseVehicleSon.initVehicle();
	chooseVehicleSon.bindSubmitEvent();
	chooseVehicleSon.initQuery();
	chooseVehicleSon.disableBtn();
	$("#vehicleNoSon").focus();
});
