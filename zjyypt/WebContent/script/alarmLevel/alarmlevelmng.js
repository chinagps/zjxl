var alarmlevel = function() {

};
alarmlevel.prototype = {
	// 初始化
	init : function() {
		var obj = this;
		KCPT.SYSPARAMPAGE = 3;
		var center = getHeightAndWidth();
		var height1 = center.height-45;
		var width = center.width;
		$("#alarmlevelmng").height(height1+11);
		$("#alarmlevelmng").width(width - 260);
		$("#allframeid").height(height1 - 78);
	},
	onResize : function(){
		var obj = this;
		var center = getHeightAndWidth();
		var height1 = center.height-45;
		var width = center.width;
		$("#alarmlevelmng").height(height1+11);
		$("#alarmlevelmng").width(width - 260);
		$("#allframeid").height(height1 - 78);
	},
	// 恢复默认执行
	listAlarmType : function() {
		var objFun = this;
		var options = {
			// 查询默认值
			flag : true
		};
		/*****************2012-04-01 jxf 添加提示框*******************/
		$.ligerDialog.confirm("确定恢复默认吗？", function(yes) {
			if (yes) {
				// $("#fileUploadSubmit").trigger('click');
				//如果用户确定则执行恢复操作
				JAjax("systemmng/findEntAlarmSetAction.action", options,
						"json", function(data) {
							// 查询码表默认告警等级Action：entbusiness/findAllSysAlarmType.action
							var listdata = eval(data);
							var j = 0;
							var options3 = "";
							var options0 = "";
							var options1 = "";
							var options2 = "";
							var options4 = ""; // 提醒
							if (listdata != "" && listdata != null) {

								for (j = 0; j < listdata.length; j++) {
									var obj = listdata[j];
									// ALARM_DEFAULT_LEVEL
									// 0 严重 1 紧急 2 一般 3提醒
									if (obj.sysAlarmLevelId != undefined) {
										if (obj.sysAlarmLevelId == '1') {
											options0 += "<option value='"
													+ obj.alarmCode + "' >"
													+ obj.alarmName
													+ "</option>";
										} else if (obj.sysAlarmLevelId == '2') {
											options1 += "<option value='"
													+ obj.alarmCode + "' >"
													+ obj.alarmName
													+ "</option>";
										} else if (obj.sysAlarmLevelId == '3') {
											// 添加提醒选项
											options4 += "<option value='"
													+ obj.alarmCode + "'>"
													+ obj.alarmName
													+ "</option>";
										} else {
											options2 += "<option value='"
													+ obj.alarmCode + "' >"
													+ obj.alarmName
													+ "</option>";
										}
									} else {
										options3 += "<option value='"
												+ obj.alarmCode + "' >"
												+ obj.alarmName + "</option>";
									}
								}
								$("#select1").empty().append(options3);
								$("#select2").empty().append(options0);
								$("#select3").empty().append(options1);
								$("#select4").empty().append(options2);
								$("#select5").empty().append(options4); // 将拼好的提醒项添加到select中
							}
							// 默认的checkbox选择
							$("[name='checked']").each(function() {
								objFun.checkboxChecked($(this).attr("id"));
							});
							// 默认的checkbox不选择
							objFun.checkboxDesc("select2downmsgId");
							objFun.checkboxDesc("select3downmsgId");
							objFun.checkboxDesc("select4downmsgId");
							objFun.checkboxDesc("select5downmsgId"); // 设置提醒
							// 下发机车指令为空，表单不能输入
							objFun.downMsg("select2downmsgId");
							objFun.downMsg("select3downmsgId");
							objFun.downMsg("select4downmsgId");
							objFun.downMsg("select5downmsgId"); // 提醒
						}, null, true);
			}
		});
	},
	// 进入页面执行，获取当前企业的报警信息
	findListAlarmType : function() {

		var objFun = this;
		var options = {
			// 查询默认值
			flag : false
		};

		JAjax(
				"systemmng/findEntAlarmSetAction.action",
				options,
				"json",
				function(data) {
					var listdata = eval(data);
					var j = 0;
					var options3 = "";
					var options0 = "";
					var options1 = "";
					var options2 = "";
					var options4 = ""; // 提醒
					if (listdata != "" && listdata != null) {

						for (j = 0; j < listdata.length; j++) {
							var obj = listdata[j];
							// ALARM_DEFAULT_LEVEL
							var flag11 = false;
							var flag12 = false;
							var flag13 = false;
							var flag21 = false;
							var flag22 = false;
							var flag23 = false;
							var flag31 = false;
							var flag32 = false;
							var flag33 = false;
							// 提醒
							var flag41 = false; // 弹出提醒的checkbox状态
							var flag42 = false; // 声音提示的checkbox状态
							var flag43 = false; // 下发车机内容的checkbox状态
							// 1 严重 2 紧急 3 一般 4提醒
							if (obj.sysAlarmLevelId != undefined
									&& obj.sysAlarmLevelId != null
									&& obj.sysAlarmLevelId != "") {
								if (obj.sysAlarmLevelId == '1') {
									options0 += "<option value='"
											+ obj.alarmCode + "' >"
											+ obj.alarmName + "</option>";
									if (!flag11) {
										if (obj.popPoint == 1) {
											objFun.checkboxChecked("select2outmsgId");
											flag11 = true;
										}
									}
									if (!flag12) {
										if (obj.voicePoint == 1) {
											objFun.checkboxChecked("select2soundmsgId");
											flag12 = true;
										}
									}
									/*此功能去掉
									if (!flag13) {
										if (obj.downPoint == 1) {
											objFun.checkboxChecked("select2downmsgId");
											$("#select2downmsgIdcontent").val(
													obj.message);
											$("#select2downmsgIdcontent").removeAttr("disabled");
											flag13 = true;
										}
									}
									*/
								} else if (obj.sysAlarmLevelId == '2') {
									options1 += "<option value='"
											+ obj.alarmCode + "' >"
											+ obj.alarmName + "</option>";
									if (!flag21) {
										if (obj.popPoint == 1) {
											objFun.checkboxChecked("select3outmsgId");
											flag21 = true;
										}
									}
									if (!flag22) {
										if (obj.voicePoint == 1) {
											objFun.checkboxChecked("select3soundmsgId");
											flag22 = true;
										}
									}
									/*此功能去掉
									if (!flag23) {
										if (obj.downPoint == 1) {
											objFun.checkboxChecked("select3downmsgId");
											$("#select3downmsgIdcontent").val(
													obj.message);
											$("#select3downmsgIdcontent").removeAttr("disabled");
											flag23 = true;
										}
									}
									*/
								} else if (obj.sysAlarmLevelId == '3') {
									options2 += "<option value='"
											+ obj.alarmCode + "' >"
											+ obj.alarmName + "</option>";
									if (!flag31) {
										if (obj.popPoint == 1) {
											objFun.checkboxChecked("select4outmsgId");
											flag31 = true;
										}
									}
									if (!flag32) {
										if (obj.voicePoint == 1) {
											objFun.checkboxChecked("select4soundmsgId");
											flag32 = true;
										}
									}
									/*此功能去掉
									if (!flag33) {
										if (obj.downPoint == 1) {
											objFun.checkboxChecked("select4downmsgId");
											$("#select4downmsgIdcontent").val(
													obj.message);
											$("#select4downmsgIdcontent").removeAttr("disabled");
											flag33 = true;
										}
									}*/
								} else if (obj.sysAlarmLevelId == '4') {
									// 如果类型等于4说明是提醒，将所取得的值set入提醒的select中
									options4 += "<option value='"
											+ obj.alarmCode + "'>"
											+ obj.alarmName + "</option>";
									// 首先判断弹出框的状态如果等于false进入判断
									if (!flag41) {
										// 如果popPoint等于说明弹出复选框是被选中的
										if (obj.popPoint == 1) {
											objFun.checkboxChecked("select5outmsgId");
											flag41 = true;
										}
									}
									if (!flag42) {
										// 判断声音提示如果等于1设为选中状态
										if (obj.voicePoint == 1) {
											objFun.checkboxChecked("select5soundmsgId");
											//flag32 = true;//这里为什么是flag32?
											flag42 = true;// 判断是flag42，设置也应该是flag42 by malq 2012-06-13
										}
									}
									/*此功能去掉
									if (!flag43) {
										// 判断下发车机内容如果等于设为选中状态，并将内容赋给input文本框
										if (obj.downPoint == 1) {
											objFun.checkboxChecked("select5downmsgId");
											$("#select5downmsgIdcontent").val(
													obj.message);
											$("#select5downmsgIdcontent").removeAttr("disabled");
											flag43 = true;
										}
									}*/
								} else {

									options3 += "<option value='"
											+ obj.alarmCode + "' >"
											+ obj.alarmName + "</option>";
								}

							} else {
								// 默认的情况下
								if (obj.alarmDefaultLevel == '0') {
									options0 += "<option value='"
											+ obj.alarmCode + "' >"
											+ obj.alarmName + "</option>";
								} else if (obj.alarmDefaultLevel == '1') {
									options1 += "<option value='"
											+ obj.alarmCode + "' >"
											+ obj.alarmName + "</option>";
								} else if (obj.alarmDefaultLevel == '3') {
									options2 += "<option value='"
											+ obj.alarmCode + "' >"
											+ obj.alarmName + "</option>";
								} else if (obj.alarmDefaultLevel == '2') {
									// 如果类型等于4说明是提醒，将所取得的值set入提醒的select中
									options4 += "<option value='"
											+ obj.alarmCode + "'>"
											+ obj.alarmName + "</option>";
								} else {
									options3 += "<option value='"
											+ obj.alarmCode + "' >"
											+ obj.alarmName + "</option>";
								}
								/*
								// 默认的checkbox选择
								$("[name='checked']").each(function() {
									objFun.checkboxChecked($(this).attr("id"));
								});*/
							}
						}
					}

					$("#select1").empty().append(options3); // 全部告警类型
					$("#select2").empty().append(options0); // 严重告警
					$("#select3").empty().append(options1); // 紧急告警
					$("#select4").empty().append(options2); // 一般告警
					$("#select5").empty().append(options4); // 提醒告警

				}, null, true);
	},
	// 给按钮绑定事件
	bindEventSixBut : function() {
		var objFun = this;
		// 严重告警
		$("#input1").click(function() {
			var los = $("#select1 option");
			for ( var i = 0; i < los.length; i++) {
				if ($(los[i]).attr("selected")) {
					$("#select2").append($(los[i]));
				}
			}
			objFun.resetSize("select1");
			objFun.resetSize("select2");
		});
		$("#input3").click(function() {
			var los = $("#select2 option");
			for ( var i = 0; i < los.length; i++) {
				if ($(los[i]).attr("selected")) {
					$("#select1").append($(los[i]));
				}
			}
			objFun.resetSize("select1");
			objFun.resetSize("select2");
		});
		// 紧急告警
		$("#input2addleft").click(function() {
			var los = $("#select1 option");
			for ( var i = 0; i < los.length; i++) {
				if ($(los[i]).attr("selected")) {
					$("#select3").append($(los[i]));
				}
			}
			objFun.resetSize("select1");
			objFun.resetSize("select3");
		});
		$("#input2addright").click(
				function() {
					var los = $("#select3 option");
					for ( var i = 0; i < los.length; i++) {
						if ($(los[i]).attr("selected")) {
							//update 修改紧急超速报警不能从中度报警移动限制 by zhengzhong 20120922
//							if ($(los[i]).val() == 0 || $(los[i]).val() == 2
//									|| $(los[i]).val() == 3
//									|| $(los[i]).val() == 23) {
//								$.ligerDialog.error("对不起，该项不能移动！");
//							}
//							else {
								$("#select1").append($(los[i]));
//							}
						}
					}
					objFun.resetSize("select1");
					objFun.resetSize("select3");
				});
		// 一般告警
		$("#input3addleft").click(function() {
			var los = $("#select1 option");
			for ( var i = 0; i < los.length; i++) {
				if ($(los[i]).attr("selected")) {
					// alert($(los[i]).val());
					$("#select4").append($(los[i]));
				}
			}
			objFun.resetSize("select1");
			objFun.resetSize("select4");
		});
		$("#input3addright").click(function() {
			var los = $("#select4 option");
			for ( var i = 0; i < los.length; i++) {
				if ($(los[i]).attr("selected")) {
					$("#select1").append($(los[i]));
				}
			}
			objFun.resetSize("select1");
			objFun.resetSize("select4");
		});

		// 提醒
		// 向右添加按钮单击事件
		$("#input4addleft").click(function() {
			var los = $("#select1 option"); // 取得全部告警类型下的值向提醒下select里添加
			// 循环判断选项状态
			for ( var i = 0; i < los.length; i++) {
				if ($(los[i]).attr("selected")) {
					// alert("被选中的："+$(los[i]).val());
					$("#select5").append($(los[i])); // 从全部告警中添加到提醒里面
				}
			}

			objFun.resetSize("select1");
			objFun.resetSize("select5");
		});
		// 向左添加按钮单击事件
		$("#input4addright").click(function() {
			var los = $("#select5 option"); // 取得提醒select中的所有值
			for ( var i = 0; i < los.length; i++) {
				if ($(los[i]).attr("selected")) {
					$("#select1").append($(los[i])); // 将提醒下select中选中的项添加到全部各告警类型中
				}
			}
			objFun.resetSize("select1");
			objFun.resetSize("select5");
		});
	},
	// 告警等级设置增加事件
	addAlarmEvent : function() {
		var obj = this;
		$("#addVehicleFormsubmitMe").click(
				function() {
					var select1Val = obj.getSelectValue("select1");
					var select2Val = obj.getSelectValue("select2");
					var select3Val = obj.getSelectValue("select3");
					var select4Val = obj.getSelectValue("select4");
					var select5Val = obj.getSelectValue("select5"); // 提醒
					
					//alert(select2Val+""+select3Val+""+select4Val+""+select5Val);
					var params = {
						"select2" : select2Val,
						"select3" : select3Val,
						"select4" : select4Val,
						"select5" : select5Val,
						// 弹出提示
						"tbAlarmEntConfSerious.popPoint" : obj
								.packageParam("select2outmsgId"),
						"tbAlarmEntConfUrgency.popPoint" : obj
								.packageParam("select3outmsgId"),
						"tbAlarmEntConfGeneral.popPoint" : obj
								.packageParam("select4outmsgId"),
						"tbAlarmEntConfRemind.popPoint" : obj
								.packageParam("select5outmsgId"), // 提醒
						// 声音提示
						"tbAlarmEntConfSerious.voicePoint" : obj
								.packageParam("select2soundmsgId"),
						"tbAlarmEntConfUrgency.voicePoint" : obj
								.packageParam("select3soundmsgId"),
						"tbAlarmEntConfGeneral.voicePoint" : obj
								.packageParam("select4soundmsgId"),
						"tbAlarmEntConfRemind.voicePoint" : obj
								.packageParam("select5soundmsgId") // 提醒
								/*此功能去掉
						// 下发车机提示信息
						"tbAlarmEntConfSerious.downPoint" : obj
								.packageParam("select2downmsgId"),
						"tbAlarmEntConfUrgency.downPoint" : obj
								.packageParam("select3downmsgId"),
						"tbAlarmEntConfGeneral.downPoint" : obj
								.packageParam("select4downmsgId"),
						"tbAlarmEntConfRemind.downPoint" : obj
								.packageParam("select5downmsgId"), // 提醒
						// 下发车机提示内容
						"tbAlarmEntConfSerious.message" : $(
								"#select2downmsgIdcontent").val(),
						"tbAlarmEntConfUrgency.message" : $(
								"#select3downmsgIdcontent").val(),
						"tbAlarmEntConfGeneral.message" : $(
								"#select4downmsgIdcontent").val(),
						"tbAlarmEntConfRemind.message" : $(
								"#select5downmsgIdcontent").val()
								*/
					// 提醒

					};
				
					if (undefined != select1Val && "" == select1Val) {
						JAjax("systemmng/addEntAlarmSetAction.action?", params,
								"json", function(data) {
									obj.addSuccess(data, obj);
								}, obj.addError, true, null, 30000);
					} else {
						$.ligerDialog.success("当前有未设置的告警，请继续设置");
					}
				});
	},
	// 设置成功调用
	addSuccess : function(data, obj) {
		if (data.displayMessage == "success") {
			var strName = new Array("select2", "select3", "select4","select5");
			obj.updateAlarmLevelList(strName);
			$.ligerDialog.success("告警设置设置成功");
		} else {
			$.ligerDialog.error("告警设置设置失败");
		}
	},
	// 设置失败调用
	addError : function(data) {
		$.ligerDialog.error("告警设置设置失败");
	},
	// 获取各个select中的值
	getSelectValue : function(selectId) {
		var select2Val = "";
		var select2 = document.getElementById(selectId).options;
		for ( var i = 0; i < select2.length; i++) {
			if (select2Val == "") {
//				select2Val = select2.options[i].value;
				select2Val = select2[i].value;
			} else {
				select2Val = select2Val + "," + select2[i].value;
			}
		}
		return select2Val;
	},
	// 更新内存中的alarmLevelList列表，strName为数组对象
	updateAlarmLevelList : function(strName) {
		// 格式化alarmLevelList

		KCPT.cache.alarmLevelList = new Array();

		if (strName != null && strName.length > 0) {

			for ( var i = 0; i < strName.length; i++) {
				var levelCode = $("#" + strName[i]).attr("levelcode"); // 取等级标识

				var option = document.getElementById(strName[i]).options; // 取得当前select下所有的option的value和text值

				for ( var j = 0; j < option.length; j++) {
					var alarmCode = $(option[j]).attr("value");
					var alarmName = $(option[j]).text();
					// alert("alarmcode = "+alarmCode+";alarmName =
					// "+alarmName);
					// 写入对像中
					var _obj = {
						alarmCode : alarmCode,
						alarmName : alarmName,
						levelCode : levelCode
					};
					KCPT.cache.alarmLevelList.push(_obj); // 加到alarmLevelList中
				}
			}
		}
	},

	// 下发车机内容，选择提示框能够输入
	downMsg : function(downMsg) {
		/*if (document.getElementById(downMsg).checked == true) {
			$("#" + downMsg + "content").removeAttr("disabled");
		} else {*/
			$("#" + downMsg + "content").val("");
			$("#" + downMsg + "content").attr("disabled", "disabled");
		/*}*/
	},
	// 组装称参数，传递到后台，设置告警
	packageParam : function(selectmngId) {
		var selectmsg = 0;
		if (document.getElementById(selectmngId).checked == true) {
			selectmsg = 1;
		}
		return selectmsg;
	},
	// 设置一个checkbox选项框为选择状态
	checkboxChecked : function(selectmngId) {
		$("#" + selectmngId).attr("checked", "checked");
		document.getElementById(selectmngId).checked;
	},
	// 设置一个checkbox选项框为取消状态
	checkboxDesc : function(selectmngId) {
		$("#" + selectmngId).attr("checked", "");
	},
	resetSize : function(o) {
//		/$("#" + o).width($("#allTypeId").width());
	}

};
$(document).ready(function() {
	var alarmlevelMng = new alarmlevel();
	alarmlevelMng.init();
	alarmlevelMng.findListAlarmType();
	alarmlevelMng.bindEventSixBut();
	alarmlevelMng.addAlarmEvent();
	window.winAlarmlevelMng = alarmlevelMng;
	sysparammng.showObj = alarmlevelMng;
	alarmlevelMng.resetSize("select1");
	alarmlevelMng.resetSize("select2");
	alarmlevelMng.resetSize("select3");
	alarmlevelMng.resetSize("select4");
	alarmlevelMng.resetSize("select5"); // 提醒
});