/**
 * 创建form对象用来实现 增加 修改 详情页面的 使用 预想是在列表页展示时候使用
 *
 * @param o = {
 *            container:obj //包含这个form的对象用来loadhtml loadHtml : '',//增加页面使用的html
 *            formId : '',//页面中使用的form的ID 用来在新增和修改的时候 submitId : '',//
 *            提交时候使用的buttonID resetId : '',//重置按钮的id, addURL : '', //添加的时候使用的url
 *            detailURL : '',//获得详情方法 在修改前要调用 updateURL : ''//修改的时候使用的url
 *            beforeSubmit : function(){},//提交之前的使用方法 如果返回false则不能提交用来做最后一步校验
 *            toFunData : ['utc',function(x){return date2utc(x)},'name',function(){}....],//
 *            otherData : {'name':value}, toAddOtherData:['name',function(xx){
 *            return {"name":xx}},'name'function(xx){return
 *            {"name":xx}}],//在详情的时候追加到otherData中去 用来保存不变的一些数据
 *            addLoadFunction:funciton(){},//调用添加时候提前使用的方法
 *            editLoadFunction：function(){},//调用修改的时候提前使用的方法
 *            detailLoadFunction:funciton(){},//详情时候提前使用的方法 toEditInitData
 *            ：['name',function(x){reutrn utc2date(x)},'name'function(){}], rules : {},//验证规则
 *            selects : [],//ajax下拉框 }
 *            initScope:this,
 *            initReady:function(){
 *            }
 *            editModel:'sysOperator'
 * @returns
 */
var ctfoForm = function(o) {
	this.version = "create by yangxu in 2011.10.21";
	this.options = {};
	this.actionType = "add";
	this.init(o);

	this.selectObject=[];
};

ctfoForm.prototype = {
	loadParams : function(o) {
		if (o) {
			this.options = o;
			return true;
		} else
			return false;
	},
	init : function(o) {
		var su = this.loadParams(o);
		if (su) {
			this.rules = {
					fun : this.submitfun,
					funScope : this
			};
			this.loading();
		} else {
			alert("加载数据失败");
		}
	},
	loading : function() {
		var obj = this;

		obj.mainContainer = $("#"+obj.options.container);



		obj.mainContainer.load(obj.options.loadHtml, null, function() {

			obj.mefrom = $('#' + obj.options.formId);

			obj.initSelect();

			//obj.initRules();

//			obj.bindEvent();

			obj.initLocalSelect();

			obj.bindVailder();

			obj.bindSubmit();

			obj.bindReset();

			obj.bindClose();
			if(obj.options.initReady){
				obj.options.initReady.call(obj.options.initScope?obj.options.initScope:obj);
			}

		});
	},
	initLocalSelect : function(){
		var obj = this;

		if(obj.options.localSelect && obj.options.localSelect.length > 0){
			for ( var m = 0; m < obj.options.localSelect.length; m++) {
				KCPT.CodeManager.getSelectList(obj.options.localSelect[m].name,obj.options.localSelect[m].id);
			}
		}
	},
	initSelect : function() {
		var obj = this;
		if (obj.options.selects && obj.options.selects.length > 0) {
			for ( var m = 0; m < obj.options.selects.length; m++) {
				obj.selectObject["" + obj.options.selects[m].id] = obj.InitSelect(obj.options.selects[m]);
			}
		}
	},
	// 下拉框 初始化
	InitSelect : function(o) {
		var i;
		if (!o.i) {
			i = 0;
		} else {
			i = o.i;
		}
		if (!o)
			return;
		$.ajax({
			url : o.url || "outxml_Test.action",
			type : 'post',
			dataType : "json",
			async : false,
			data : o.userData || {},
			error : function() {
				alert('Error loading json document');
			},
			complete : function(data) {
				data = eval(data.responseText);
//				checkData(data);
				for ( var i = 0; i < data.length; i++) {
					var datai = data[i];
					var value = datai[o.idMap];
					var name = datai[o.textMap];

					if(o.fun){
						name = o.fun.call(o,name);
					}
					if (name && value) {
						if (o.i == 0) {
							$("#" + o.id).append(
									"<option  value='" + value
											+ "' selected=\"selected\">" + name
											+ "</option>");
						} else {
							$("#" + o.id).append(
									"<option value='" + value + "'>" + name
											+ "</option>");

						}
					}
					;
				}

			}

		});
	},
	initRules : function() {
		var obj = this;

		if (obj.options.rules) {
			for ( var vin in obj.options.rules) {
				var vinobj = obj.options.rules[vin];
				var tar = obj.mefrom[0][vin];
				if (vinobj.form) {
					vinobj.form["formid"] = obj.options.formId;
					$(tar).formValidator(vinobj.form);
				}
				if (vinobj.input) {
					vinobj.input["formid"] = obj.options.formId;
					$(tar).inputValidator(vinobj.input);
				}
				if (vinobj.regex) {
					vinobj.regex["formid"] = obj.options.formId;
					$(tar).regexValidator(vinobj.regex);
				}
				if (vinobj.fun) {
					vinobj.fun["formid"] = obj.options.formId;
					$(tar).functionValidator(vinobj.fun);
				}
				if (vinobj.compare) {
					vinobj.compare["formid"] = obj.options.formId;
					$(tar).compareValidator(vinobj.compare);
				}
				if (vinobj.ajax) {
					vinobj.ajax["formid"] = obj.options.formId;
					$(tar).ajaxValidator(vinobj.ajax);
				}

			}

		}

	},
	bindEvent : function() {
		var obj = this;

		$.formValidator.initConfig({
			formid : obj.options.formId,
			onerror : function(msg) {
				alert(msg);
			},
			onsuccess : function() {
				if (confirm("是否确认提交数据?")) {
					obj.submitfun(obj);

				}
				return false;
			}
		});
	},
	bindVailder : function(){
		var obj = this;
		if(obj.options.validateRules){
			var rules = KCPT.apply(obj.rules,obj.options.validateRules);
			$("#"+obj.options.formId).validate(rules);
		}else{
			$("#"+obj.options.formId).validate(obj.rules);
		}

	},	
	bindSubmit : function(){
		var obj = this;
		$("#"+obj.options.formId).submit(function(){
			if($(this).validate().form()){
				return obj.submitfun(obj);
			}else{
				return false;
			}
		});

	},
	bindReset : function() {
		var obj = this;

		$('#' + obj.options.resetId).click(function() {
			obj.reset();

			if (obj.actionType == "update") {

				obj.dealData(obj.dealdata);
			}

		});

	},
	reset : function(){
		var obj = this;

		if(obj.options.resetFun){
			obj.options.resetFun.call(obj);
		}
		$("#" + obj.options.formId)[0].reset();


	},
	bindClose:function(){
		var obj = this;
		$('#' + obj.options.closeId).bind("click",function() {
			obj.reset();

			obj.actionType == "add";

			obj.hide();


		});
	},
	maskForm : function() {
		var obj = this;

		mask(obj.options.formId, "", true);// 加上遮盖
	},
	unMaskForm : function() {
		var obj = this;

		mask(obj.options.formId, "", false);// 取消遮盖
	},
	submitfun : function() {
		var obj = this;
		obj.maskForm();
		var bstr = true;
		if (obj.options.beforeSubmit) {
			bstr = obj.options.beforeSubmit.call(obj);
		}
		if (!bstr) {
			obj.unMaskForm();
			return false;
		}
		var ov = $('#' + obj.options.formId).serializeArray();
		var data = {};
		for ( var i = 0; i < ov.length; i++) {
			var datai = ov[i];
			var name = datai.name;
			var value = datai.value;
			// if(value){
			data[name] = value;
			// }
		}

		// 格式 ['name',function,name,function]
		if (obj.options.toFunData && obj.options.toFunData.length > 0
				&& obj.options.toFunData.length % 2 == 0) {
			for ( var j = 0; j < obj.options.toFunData.length; j++) {
				var st = $("input[name='" + obj.options.toFunData[j] + "']")
						.val();
				var u = obj.options.toFunData[j + 1].call(obj, st);
				data[obj.options.toFunData[j]] = u;
				j++;
			}
		}
		var url = obj.options.addURL;
		if (obj.actionType && obj.actionType == "update") {
			url = obj.options.updateURL;
		}
		if (obj.options.otherData) {
			for ( var i in obj.options.otherData) {
				data[i] = obj.otherData[i];
			}
		}

		$.ajax({
			url : url,
			type : 'post',
			dataType : "json",
			data : data,
			error : function() {
				alert('Error loading json document');
				obj.unMaskForm();
				;// 加上遮盖
			},
			success : function(data) {
				obj.unMaskForm();
				if(checkData(data)){
				if(obj.options.successScope){
					obj.options.success.call(obj.options.successScope,data);
				}else{
					obj.options.success.call(obj,data);
				}
				}
			}
		});
		return false;
	},
	getDetailData : function(data) {
		var obj = this;

		if (obj.options.beforeEditLoadFunction) {
			obj.options.beforeEditLoadFunction.call(obj);
		}
		obj.maskForm();
		$.ajax({
			url : obj.options.detailURL,
			type : obj.type || 'post',
			dataType : "json",
			data : data,
			error : function() {
				alert("加载出错！");
				obj.unMaskForm();
				;// 加上遮盖
				alert('Error loading XML document');
			},
			success : function(data) {
//				checkData(data);
				obj.dealdata = data;
				obj.dealData(data);
				obj.unMaskForm();
				//obj.options.editLoadFunction.call(obj, data);

				;// 加上遮盖
			}
		});

	},
	// 处理详情数据
	dealData : function(data) {
		var obj = this;
		var textName = obj.options.editModel;
		for ( var w in data) {
			var name = w;
			var changeName = textName+"."+name;
			var text = data[w];
			//如果有需要最后加载的
			if(obj.options.detailEnd&&changeName==obj.options.detailEnd){
				obj.detailEnd = text;
			}

			if (obj.options.toAddOtherData
					&& obj.options.toAddOtherData.length > 0
					&& obj.options.toAddOtherData.length % 2 == 0) {
				for ( var j = 0; j < obj.options.toAddOtherData.length; j++) {
					var addData;
					if (obj.options.toAddOtherData[j] == changeName) {
						addData = obj.options.toAddOtherData[j + 1].call(obj,
								text);
						if (addData) {
							if (obj.options.otherData) {
								for ( var i in addData) {
									obj.options.otherData[i] = addData[i];
								}
							} else {
								obj.options.otherData = {};
								for ( var i in addData) {
									obj.options.otherData[i] = addData[i];
								}
							}
						}
					}

					j++;
				}
			} // 格式 ['name',function,name,function]
			if (obj.options.toEditInitData
					&& obj.options.toEditInitData.length > 0
					&& obj.options.toEditInitData.length % 2 == 0) {
				for ( var j = 0; j < obj.options.toEditInitData.length; j++) {
					if (obj.options.toEditInitData[j] == changeName) {
						text = obj.options.toEditInitData[j + 1]
								.call(obj, text);
					}
					j++;
				}
			}
			if (obj.mefrom[0][changeName]) {
				var type = obj.mefrom[0][changeName].type;
				if (type == "radio") {
					var len;
					for ( var i = 0; i < len; i++) {
						var crod = obj.mefrom[0][changeName].item(i);
						if (crod.value == (text)) {
							crod.checked = true;
							break;
						}
					}
				} else if (type == "select-one" || type == "select") {
					$("select[name='"+changeName+"']").val(text);
					var sob = obj.mefrom[0][changeName];
					sob.value=text;
					$(sob).trigger('change');
				} else {
					obj.mefrom[0][changeName].value = (text.toString()) || "";
				}
			} else {

			}
		}
		//回调方法
		if(obj.options.detailEndFun){
			obj.options.detailEndFun.call(obj,obj.detailEnd);
		}
	},
	// 详情的时候调用都变成disabled
	disabled : function() {
		var  obj = this;
		$(obj.mefrom).find("input[type='text']").each(function(){
			$(this).attr("disabled",true);
		});

		$(obj.mefrom).find("textarea").each(function(){
			$(this).attr("disabled",true);
		});

		$(obj.mefrom).find("input[type='radio']").each(function(){
			$(this).attr("disabled",true);
		});
		$(obj.mefrom).find("select").each(function(){
			$(this).attr("disabled",true);
		});
	},
	// 如果可以从详情页直接进入修改页就有用了 暂时预备着
	undisabled : function() {
		var  obj = this;

		$(obj.mefrom).find("input[type='text']").each(function(){
			$(this).attr("disabled",false);
		});

		$(obj.mefrom).find("textarea").each(function(){
			$(this).attr("disabled",false);
		});

		$(obj.mefrom).find("input[type='radio']").each(function(){
			$(this).attr("disabled",false);
		});
		$(obj.mefrom).find("select").each(function(){
			$(this).attr("disabled",false);
		});
	},
	show : function() {
		var obj = this;

		obj.mainContainer.show();
	},
	hide : function() {
		var obj = this;

		obj.mainContainer.hide();
	},
	// 新增的时候调用
	add : function() {
		/**--begin bug-YYPT-25  姜威 modify 调用此方法清空会清空select导致bug at:20120906*/
		$("label.error").html('');
		/**--end bug-YYPT-25  姜威 modify 调用此方法清空会清空select导致bug at:20120906*/
		var obj = this;

		obj.undisabled();

		$("#"+obj.options.formId).find("input[type='submit']").show();

		obj.actionType = "add";
		if(obj.options.addLoadFunction){
			obj.options.addLoadFunction.call(obj.options.addLoadFunctionScope ? obj.options.addLoadFunctionScope:obj);
		}
		obj.show();
	},
	/**
	 * 点击详情的时候调用 传入data 用来查询后台
	 *
	 * @param data
	 */
	detail : function(data) {
		/**--begin bug-YYPT-25  姜威 modify 调用此方法清空会清空select导致bug at:20120906*/
		$("label.error").html('');
		/**--end bug-YYPT-25  姜威 modify 调用此方法清空会清空select导致bug at:20120906*/
		var obj = this;

		obj.actionType = "detail";
		if(obj.options.detailLoadFunction){
			obj.options.detailLoadFunction.call(obj);
		}
		obj.getDetailData(data);

		obj.disabled();

		$("#"+obj.options.formId).find("input[type='submit']").hide();

		obj.show();

	},
	update : function(data) {
		/**--begin bug-YYPT-25  姜威 modify 调用此方法清空会清空select导致bug at:20120906*/
		$("label.error").html('');
		/**--end bug-YYPT-25  姜威 modify 调用此方法清空会清空select导致bug at:20120906*/
		var obj = this;

		obj.actionType = "update";

		obj.undisabled();

		$("#"+obj.options.formId).find("input[type='submit']").show();

		if(obj.options.editLoadFunction){
			obj.options.editLoadFunction.call(obj.options.editLoadFunctionScope ? obj.options.editLoadFunctionScope:obj);
		}
		
		obj.getDetailData(data);
		
		obj.show();

	}

}