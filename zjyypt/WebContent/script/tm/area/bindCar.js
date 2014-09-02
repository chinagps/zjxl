var areaBindCar = function() {
	this.htmlObj = {
		bindCarPanel : "#areaMainPanel",
		mapPanel : "#areaMapPanel",
		closeBtn : "#areaBindCarClose",
		thisPanel : "#areaBindCarPopDiv",
		searchBtn : "#areaSearCarsListBtn",
		submitBtn : "#areaAreaBindCarSubmitBtn",
		contextPanel : "#areaBindCarContextPanel",
		areaBindCarsListGrid : "#areaBindCarsListGrid"
	};
	this.obj = {
		carListGrid : "",
		areaId : "",
		// update use
		vid : "",
		// 车辆与围栏关系id
		id : "",
		seq : "",
		areaName : "",
		areaEntId :""
	};
	this.init();
	this.initEvent();
};

areaBindCar.prototype = {
	init : function() {

	},
	onResize :function() {
		var obj = this;
		if(obj.gridManager){
			obj.gridManager.setHeight(obj.getBindCarGridHeight());
		}
	},
	showBindCarPop : function(areaId,entId, isShowBind, editRow) {
		var thisref = this;
		thisref.obj.areaId = areaId;
		thisref.obj.areaEntId= entId;
		var mainDiv = $(this.htmlObj.bindCarPanel).find("#areaMapToolPanel");//td后的一个div
		var popwin = $("<div>");
		popwin.attr('id', this.htmlObj.thisPanel.substring(1, this.htmlObj.thisPanel.length));
		$(thisref.htmlObj.thisPanel).remove();
		$(mainDiv).after($(popwin));
//		$(popwin).appendTo($(mainDiv));
		var url = "model/area/bindCar.html";
		$(popwin).css({
			"width" : $(this.htmlObj.mapPanel).width(),
			"height" : $(this.htmlObj.mapPanel).height(),
			/*"border-left" : "solid 1px #cccccc",*/
			"float"	: "right",
			"margin": "0px 2px 3px 0px"
		});

		$(popwin).load(url, {}, function() {
			$(thisref.htmlObj.thisPanel).find("#dataAreaId").val(areaId);
			$(thisref.htmlObj.thisPanel).find("#dataEntId").val(entId);
			
			$(thisref.htmlObj.mapPanel).hide();
			$(thisref.htmlObj.closeBtn).bind('click', function() {
				$(thisref.htmlObj.thisPanel).remove();
				$(thisref.htmlObj.mapPanel).show();
			});

			$(thisref.htmlObj.submitBtn).bind('click', function() {
				if (editRow) {
					thisref.updateBindCar();
				} else {
					thisref.addAreaBindCars();
				}
			});					
			
			// 编辑行状态下
			if (editRow) {
				$(thisref.htmlObj.areaBindCarsListGrid).hide();
				$(thisref.htmlObj.thisPanel).find(".areamenu").hide();
				var rows = editRow.split("|");
				thisref.obj.vid = rows[4];
				thisref.obj.id = rows[5];
				thisref.obj.areaName = rows[6];
				thisref.obj.seq = rows[7];
				
				$(thisref.htmlObj.thisPanel).find(".areafont").text(thisref.obj.areaName);
				$(thisref.htmlObj.contextPanel).find("input:eq(0)").val(utc2Datestr(rows[0]));
				$(thisref.htmlObj.contextPanel).find("input:eq(2)").val(utc2Datestr(rows[1]));
				$(thisref.htmlObj.contextPanel).find("input:eq(4)").val(rows[8]);
				$(thisref.htmlObj.contextPanel).find("input:eq(6)").val(rows[9]);

				var bindType = $(thisref.htmlObj.contextPanel).find("input[name='areaUsetype']");
				var judgeType = $(thisref.htmlObj.contextPanel).find("input[name='areaJudgeType']");
				var userTypes = rows[2].split(",");
				for (var i = 0; i < userTypes.length; i++) {
					if (userTypes[i] == 2) {//2-超速限速
						bindType.eq(0).attr("checked",true);
					}else if (userTypes[i] == 9) {//9-低速限速
						bindType.eq(1).attr("checked",true);
					} else if(userTypes[i] == 3) {//3-进报警判断
						judgeType.eq(0).attr("checked",true);//进入区域报告平台
					} else if(userTypes[i] == 4 || userTypes[i] == 6) {//4-进报警给终端,6-出报警给终端
						bindType.eq(3).attr("checked",true);//提示发送给终端
					} else if(userTypes[i] == 7 || userTypes[i] == 8) {//7-进报警给平台,8-出报警给平台
						bindType.eq(2).attr("checked",true);
					} else if(userTypes[i] == 5) {//5-出报警判断
						judgeType.eq(1).attr("checked",true);//出区域报告平台
					} 
				}
				
				$(thisref.htmlObj.contextPanel).find("input[name='areaDecide']").each(function(i, obj) {
					if (obj.value == rows[3]) {
						$(this).attr("checked", true);
					}
				});
			} else {
				var areaName = $(area.htmlObj.areaListGrid).find(".l-selected:eq(0)").find("td:eq(0)").text();
				$(thisref.htmlObj.thisPanel).find(".areafont").text(areaName);
				// 查询未绑定车辆
				thisref.searBindCarList();
			}

		});
	},
	initEvent : function() {
		var thisref = this;

	},
	getBindCarGridHeight : function(){
		var center = getHeightAndWidth();
		return center.height -107-280;
	},
	/**
	 * 查询未绑定车辆
	 * @param isShowBind
	 */
	searBindCarList : function() {
		var thisref = this;
		var height=thisref.getBindCarGridHeight();
		var url = 'operationmanagement/selectVehicleColForArea.action';
		var options = {
			// 列
			columns : [ {
				display : '车牌号码',
				name : 'vehicleNo',
				width : 100,
				align : 'center',
				toggle : false
			}, {
				display : '企业名称',
				name : 'pentName',
				width : 200,
				align : 'center'

			}, {
				display : '行业类型',
				name : 'transtypeCode',
				width : 110,
				align : 'center',
				render : function(row) {
					if ("" != row.transtypeCode) {
						return KCPT.CodeManager.getNameByCode("SYS_VCL_TRANSPORTTYPE", row.transtypeCode);
					} else {
						return "";
					}
				}

			} ],
			showCheckbox : true,
			url : url,
			showTitle : false,
			pageSize : 10,
			pageSizeOptions : [ 10, 20, 30, 40 ],
			height : height,
			width:'99.8%',
			autoLoad : false,
			submitId : "areaSearCarsListBtn",
			usePager : true,
			mainContain : thisref.htmlObj.thisPanel,
			container : thisref.htmlObj.thisPanel,
			tableId : 'areaBindCarsListGrid',
			page : 1, // 默认当前页
//			parms: [{name: "requestParam.equal.areaId", value: thisref.obj.areaId}, {name: "requestParam.data.entId", value: thisref.obj.areaEntId}],
			// 查询条件formid
			searchFormId : 'areaSearchCarListForm'
		};
		
		thisref.obj.carListGrid = new ctfoGrid(options);
		thisref.obj.carListGrid.search();
		thisref.gridManager = $("#areaBindCarsListGrid").ligerGetGridManager();
	},
	/**
	 * 围栏与车辆绑定
	 */
	addAreaBindCars : function() {
		var thisref = this;
		
		// 进出区域判断
		var areaJudge = 0;
		$(thisref.htmlObj.contextPanel).find("input[name='areaJudgeType']").each(function(i, obj) {
			if ($(this).attr("checked")) {
				areaJudge = obj.value;
			}
		});
		
		// 绑定的用户类型
		// 2-超速限速,3-进报警判断,4-进报警给终端,5-出报警判断,6-出报警给终端,7-进报警给平台,8-出报警给平台,9-低速限速
		var areaUsetype = "";
		var _useType = $(thisref.htmlObj.contextPanel).find("input[name='areaUsetype']");
		if(!_useType.eq(2).attr("checked") && !_useType.eq(3).attr("checked")) {
			$.ligerDialog.warn('报警方式选择不能为空');
			return false;
		}
		if(areaJudge == 1) {
			areaUsetype += "3,";
		} else {
			areaUsetype += "5,";
		}
		_useType.each(function(i, obj) {
			if ($(this).attr("checked")) {
				if(obj.value == "platform" && areaJudge == 1) {//提示上报至平台+进入区域报告平台
					areaUsetype += "7,";//7-进报警给平台
				} else if(obj.value == "platform" && areaJudge == 2) {//提示上报至平台+出区域报告平台
					areaUsetype += "8,";//8-出报警给平台
				} else if(obj.value == "terminal" && areaJudge == 1) {//提示发送给终端+进入区域报告平台
					areaUsetype += "4,";//4-进报警给终端
				} else if(obj.value == "terminal" && areaJudge == 2) {//提示发送给终端+出区域报告平台
					areaUsetype += "6,";//6-出报警给终端
				} else {
					areaUsetype += obj.value + ",";
				}
			}
		});
		areaUsetype = areaUsetype.substring(0, areaUsetype.length - 1);
		
		// 判断类型（平台或车机）
		var areaDecide = 0;
		$(thisref.htmlObj.contextPanel).find("input[name='areaDecide']").each(function(i, obj) {
			if ($(this).attr("checked")) {
				areaDecide = obj.value;
			}
		});

		var data = {};
		var row = thisref.obj.carListGrid.realGrid.getCheckedRows();

		if (row.length < 1) {
			$.ligerDialog.warn('车牌号码选择不能为空');
			return false;
		}

		if ($(thisref.htmlObj.contextPanel).find("input:eq(0)").val() == "") {
			$.ligerDialog.warn('开始时间不能为空');
			return false;
		}
		if ($(thisref.htmlObj.contextPanel).find("input:eq(2)").val() == "") {
			$.ligerDialog.warn('结束时间不能为空');
			return false;
		}
		if ($(thisref.htmlObj.contextPanel).find("input:eq(4)").val() == "") {
			$.ligerDialog.warn('每天有效开始时间不能为空');
			return false;
		}
		if ($(thisref.htmlObj.contextPanel).find("input:eq(6)").val() == "") {
			$.ligerDialog.warn('每天有效结束时间不能为空');
			return false;
		}
		
		// 有效的开始结束时间
		var areaBegintime = date2utc($(thisref.htmlObj.contextPanel).find("input:eq(0)").val());
		var areaEndtime = date2utc($(thisref.htmlObj.contextPanel).find("input:eq(2)").val());
		var periodBegintime = $(thisref.htmlObj.contextPanel).find("input:eq(4)").val();
		var periodEndtime = $(thisref.htmlObj.contextPanel).find("input:eq(6)").val();
		var begintimeUtc = str2Utc(periodBegintime) + areaBegintime - 1000;
		var endtimeUtc = str2Utc(periodEndtime) + areaEndtime - 1000;
		
		if (areaEndtime <areaBegintime) {
			$.ligerDialog.warn('开始时间应小于等于结束时间');
			return false;
		}		
		if (str2Utc(periodEndtime) <= str2Utc(periodBegintime)) {
			$.ligerDialog.warn('每天有效开始时间应小于有效结束时间');
			return false;
		}
		/*if (!flag) {
			$.ligerDialog.warn('报警方式选择不能为空');
			return false;
		}*/
		
		for ( var i = 0; i < row.length; i++) {
			data["vehicleAreaList[" + i + "].vid"] = row[i].vid;
			data["vehicleAreaList[" + i + "].areaId"] = thisref.obj.areaId;
			data["vehicleAreaList[" + i + "].areaBegintime"] = areaBegintime;
			data["vehicleAreaList[" + i + "].areaEndtime"] = areaEndtime;
			data["vehicleAreaList[" + i + "].areaUsetype"] = areaUsetype;
			data["vehicleAreaList[" + i + "].areaDecide"] = areaDecide;
			data["vehicleAreaList[" + i + "].periodBegintime"] = periodBegintime;
			data["vehicleAreaList[" + i + "].periodEndtime"] = periodEndtime;
			data["vehicleAreaList[" + i + "].begintimeUtc"] = begintimeUtc;
			data["vehicleAreaList[" + i + "].endtimeUtc"] = endtimeUtc;
		}
				
		JAjax("tbAreaManager/addForVA.action", data, "json", function(data, err) {
			if (data.responseText == "success") {			
				$(thisref.htmlObj.thisPanel).remove();
				$(thisref.htmlObj.mapPanel).show();
				$.ligerDialog.success('绑定车辆成功');
			} else if(data.responseText == "notonline") {
				$.ligerDialog.warn('车辆不在线，绑定车辆失败');
			} else {
				$.ligerDialog.warn('绑定车辆失败');
			}
			//刷新围栏列表、绑定车辆列表、右侧可选车辆列表
			area.obj.areaListGrid.reload();
			area.obj.bindCarsGrid.reload();
			thisref.obj.carListGrid.reload();
			
		}, function(data, err) {
			if (data.responseText == "success") {
				$(thisref.htmlObj.thisPanel).remove();
				$(thisref.htmlObj.mapPanel).show();
				$.ligerDialog.success('绑定车辆成功');
			} else if(data.responseText == "notonline") {
				$.ligerDialog.warn('车辆不在线，绑定车辆失败');
			} else {
				$.ligerDialog.warn('绑定车辆失败');
			}
			//刷新围栏列表、绑定车辆列表、右侧可选车辆列表
			area.obj.areaListGrid.reload();
			area.obj.bindCarsGrid.reload();
			thisref.obj.carListGrid.reload();
		});

	},
	
	/**
	 * 修改绑定
	 */
	updateBindCar : function() {
		var thisref = this;
		
		// 进出区域判断
		var areaJudge = 0;
		$(thisref.htmlObj.contextPanel).find("input[name='areaJudgeType']").each(function(i, obj) {
			if ($(this).attr("checked")) {
				areaJudge = obj.value;
			}
		});
		
		// 绑定的用户类型
		// 2-超速限速,3-进报警判断,4-进报警给终端,5-出报警判断,6-出报警给终端,7-进报警给平台,8-出报警给平台,9-低速限速
		var areaUsetype = "";
		var _useType = $(thisref.htmlObj.contextPanel).find("input[name='areaUsetype']");
		if(!_useType.eq(2).attr("checked") && !_useType.eq(3).attr("checked")) {
			$.ligerDialog.warn('报警方式选择不能为空');
			return false;
		}
		if(areaJudge == 1) {
			areaUsetype += "3,";
		} else {
			areaUsetype += "5,";
		}
		$(thisref.htmlObj.contextPanel).find("input[name='areaUsetype']").each(function(i, obj) {
			if ($(this).attr("checked")) {
				flag = true;
				if(obj.value == "platform" && areaJudge == 1) {
					areaUsetype += "7,";
				} else if(obj.value == "platform" && areaJudge == 2) {
					areaUsetype += "8,";
				} else if(obj.value == "terminal" && areaJudge == 1) {
					areaUsetype += "4,";
				} else if(obj.value == "terminal" && areaJudge == 2) {
					areaUsetype += "6,";
				} else {
					areaUsetype += obj.value + ",";
				}
			}
		});
		areaUsetype = areaUsetype.substring(0, areaUsetype.length - 1);
		
		var areaDecide = 0;
		$(thisref.htmlObj.contextPanel).find("input[name='areaDecide']").each(function(i, obj) {
			if ($(this).attr("checked")) {
				areaDecide = obj.value;
			}
		});

		if ($(thisref.htmlObj.contextPanel).find("input:eq(0)").val() == "") {
			$.ligerDialog.warn('开始时间不能为空');
			return false;
		}
		if ($(thisref.htmlObj.contextPanel).find("input:eq(2)").val() == "") {
			$.ligerDialog.warn('结束时间不能为空');
			return false;
		}
		if ($(thisref.htmlObj.contextPanel).find("input:eq(4)").val() == "") {
			$.ligerDialog.warn('每天有效开始时间不能为空');
			return false;
		}
		if ($(thisref.htmlObj.contextPanel).find("input:eq(6)").val() == "") {
			$.ligerDialog.warn('每天有效结束时间不能为空');
			return false;
		}
		
		var areaBegintime = date2utc($(thisref.htmlObj.contextPanel).find("input:eq(0)").val());
		var areaEndtime = date2utc($(thisref.htmlObj.contextPanel).find("input:eq(2)").val());
		var periodBegintime = $(thisref.htmlObj.contextPanel).find("input:eq(4)").val();
		var periodEndtime = $(thisref.htmlObj.contextPanel).find("input:eq(6)").val();
		var begintimeUtc = str2Utc(periodBegintime) + areaBegintime - 1000;
		var endtimeUtc = str2Utc(periodEndtime) + areaEndtime - 1000;
		
		if (areaEndtime < areaBegintime) {
			$.ligerDialog.warn('开始时间应小于等于结束时间');
			return false;
		}
		if (str2Utc(periodEndtime) <= str2Utc(periodBegintime)) {
			$.ligerDialog.warn('每天有效开始时间应小于有效结束时间');
			return false;
		}
		
		var data = {};
		data["vehicleAreaList[0].seq"] = thisref.obj.seq;
		data["vehicleAreaList[0].id"] = thisref.obj.id;
		data["vehicleAreaList[0].vid"] = thisref.obj.vid;
		data["vehicleAreaList[0].areaId"] = thisref.obj.areaId;
		data["vehicleAreaList[0].areaBegintime"] = areaBegintime;
		data["vehicleAreaList[0].areaEndtime"] = areaEndtime;
		data["vehicleAreaList[0].areaUsetype"] = areaUsetype;
		data["vehicleAreaList[0].areaDecide"] = areaDecide;
		data["vehicleAreaList[0].areaStatus"] = "2";
		data["vehicleAreaList[0].areaEnable"] = "1";
		data["vehicleAreaList[0].periodBegintime"] = periodBegintime;
		data["vehicleAreaList[0].periodEndtime"] = periodEndtime;
		data["vehicleAreaList[0].begintimeUtc"] = begintimeUtc;
		data["vehicleAreaList[0].endtimeUtc"] = endtimeUtc;
		
		JAjax("tbAreaManager/modifyForVA.action", data, "json", function(data, err) {
			if (data.responseText == "success") {
				$(thisref.htmlObj.thisPanel).remove();
				$(thisref.htmlObj.mapPanel).show();
				$.ligerDialog.success('绑定车辆修改成功');
			} else if(data.responseText == "notonline") {
				$.ligerDialog.warn('车辆不在线，修改绑定车辆失败');
			} else {
				$.ligerDialog.warn('修改绑定车辆失败');
			}
			//刷新围栏列表、绑定车辆列表
			area.obj.areaListGrid.reload();
			area.obj.bindCarsGrid.reload();
		}, function(data, err) {
			if (data.responseText == "success") {
				$(thisref.htmlObj.thisPanel).remove();
				$(thisref.htmlObj.mapPanel).show();
				$.ligerDialog.success('绑定车辆修改成功');
			} else if(data.responseText == "notonline") {
				$.ligerDialog.warn('车辆不在线，修改绑定车辆失败');
			} else {
				$.ligerDialog.warn('修改绑定车辆失败');
			}
			//刷新围栏列表、绑定车辆列表
			area.obj.areaListGrid.reload();
			area.obj.bindCarsGrid.reload();
		});
	},
	
	/**
	 * 围栏与车辆解绑
	 */
	delBindCars : function(id, areaId) {
		$.ligerDialog.confirm('确定要删除么?', function(yes) {
			if (yes) {

				JAjax("tbAreaManager/removeForVA.action", {
					"vehicleArea.id" : id,
					"vehicleArea.areaId" : areaId
				}, 'json', function(data, err) {
					if (data.responseText == "success") {
						$.ligerDialog.success('删除成功');
					} else if(data.responseText == "notonline") {
						$.ligerDialog.warn('车辆不在线，删除失败');
					} else {
						$.ligerDialog.warn('删除失败');
					}
					//刷新围栏列表、绑定车辆列表、右侧可选车辆列表
					area.obj.areaListGrid.reload();
					area.obj.bindCarsGrid.reload();
					thisref.obj.carListGrid.reload();
				}, function(data, err) {
					if (data.responseText == "success") {
						$.ligerDialog.success('删除成功');
					} else if(data.responseText == "notonline") {
						$.ligerDialog.warn('车辆不在线，删除失败');
					} else {
						$.ligerDialog.warn('删除失败');
					}
					//刷新围栏列表、绑定车辆列表、右侧可选车辆列表
					area.obj.areaListGrid.reload();
					area.obj.bindCarsGrid.reload();
					thisref.obj.carListGrid.reload();
				});

			}
		});

	},
	unBindCars : function() {

	}
};