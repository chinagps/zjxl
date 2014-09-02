/**
 * @description: 登录页面 JS文件,依赖于jQuery
 * @author: shen_chengjie
 * @email: 15576810155@163.com
 * @time: 2012-08-28
 */
$(function(){
	var _nameTip = '手机号/用户编号'; // 用户名提示
	// 会员登录、商户登录切换
	$(".loginSubNavItem").click(function(){
		var typeTxt = $.trim($(this).text());
		if("会员/商户登录"==typeTxt){
			var nameVal = $.trim($("#loginName").val());
			$(this).addClass("loginSubNavSelectL").siblings().removeClass("loginSubNavSelectR");
			if(nameVal=='' || nameVal=='手机号/用户编号'){
				$("#loginName").val("手机号/用户编号");
			}
			_nameTip = "手机号/用户编号";
			$("#chptLogin").show();
			$("#yyptLogin").hide();
		}else{
			$(this).addClass("loginSubNavSelectR").siblings().removeClass("loginSubNavSelectL");
			$("#chptLogin").hide();
			$("#yyptLogin").attr("src","http://www.zjyypt.net/login_chpt.jsp?_time="+(new Date)).show();
		}
	});
	// 免费注册、合作申请按钮事件注册
	$("input[name='toRegBtn']").click(function(){
		var flag = this.id;
		if('idForJs_user'==flag){ // 免费注册
			window.location.href = root + '/portal/front/toRegSelect.action';
		}else if('idForJs_store'==flag){ // 合作申请
			window.location.href = root + '/portal/front/toUserReg.action?userType=vehicle_store';
		}
	});
	// 找回密码按钮事件注册
	$("#findPassword").click(function(){
		window.location.href = root + '/portal/front/toFindPassword.action';
	});
	// 从cookie中获取用户名、记住用户名状态
	var isKeep = $.cookie('isKeepUserName_hcr');
	if(isKeep){
		if(isKeep=='true'){
			if($.cookie('keepUserName_hcr')){
				$("#loginName").val($.cookie('keepUserName_hcr'));
			}
		}
	}
	var _curObj; // 当前验证对象
	var _curObjVal; // 当前验证对象值
	var _fieldName = []; // 当前验证field自定义名称数组
	// 获取表单所有输入域
	var _allInputs = $("#loginForm input[type='text'],#loginPwd");
	// 给所有输入域注册focus事件
	_allInputs.focus(function(){
		$(this).removeClass("inputError");
		$(this).addClass("inputFocus");
	});
	// 给所有输入域注册blur事件
	_allInputs.blur(function(){
		$(this).removeClass("inputFocus");
	});
	_allInputs.blur(); // 页面刷新，所有输入域不获取焦点
	var _Field = function (id,name){
		this.id = id;
		this.name = name;
	};
	// 必输入项集合
	var _fields = new Array(new _Field("loginName","用户名"),new _Field("loginPwd","密码"),new _Field("validateCode","验证码"));
	// 验证通用效果处理
	var commonHandle = function(flag,obj,fieldName){
		if(!flag){
			$(obj).addClass("inputError");
			$("#"+obj.id+"Error").text(fieldName+"格式不正确");
			$("#"+obj.id+"Error").show();
		}else{
			$(obj).removeClass("inputError");
			$("#"+obj.id+"Error").hide();
		}
	};
	// 遍历数组,给必输入项表单元素注册相关事件,进行验证判断
	for ( var j = 0; j < _fields.length; j++) {
		_fieldName[_fields[j].id] = _fields[j].name;
		_curObj = $("#"+_fields[j].id);
		//给表单元素注册blur事件
		_curObj.bind("blur", function(){
			_curObjVal = $(this).val();
			if("loginName"==this.id){// 用户名
				if('手机号/用户编号'!=_curObjVal){
					if(_curObjVal!='' && (isNaN(_curObjVal) || (_curObjVal.length!=10 && _curObjVal.length!=12 && !SimpleValidator.phone(_curObjVal))))
						commonHandle(false,this,_fieldName[this.id]);
					else
						commonHandle(true,this,_fieldName[this.id]);
				}
			}else if("loginPwd"==this.id){// 密码
				if(_curObjVal!='' && _curObjVal.length<6)
					commonHandle(false,this,_fieldName[this.id]);
				else
					commonHandle(true,this,_fieldName[this.id]);
			}else if("validateCode"==this.id){// 验证码
				if(_curObjVal!='' && !SimpleValidator.en_num(_curObjVal,this,4,4)){
					$(this).addClass("inputError");
					$("#"+this.id+"Error").text(_fieldName[this.id]+"不正确");
					$("#"+this.id+"Error").show();
				}else{
					$(this).removeClass("inputError");
					$("#"+this.id+"Error").hide();
					if(_curObjVal!='' && SimpleValidator.en_num(_curObjVal,this,4,4)){
						isValidateCodeRight(_curObjVal,_fieldName[this.id]);
					}
				}
			}
		});
	}
	// 验证输入项信息
	var loginValidate = function(){
		var obj; // 待验证的DOM对象
		var objVal; // DOM对象值
		var errorCnt = 1; // 错误个数
		for ( var i = 0; i < _fields.length; i++) {
			obj = $("#"+_fields[i].id);
			objVal = obj.val();
			if(objVal==null || objVal=='' || '手机号/用户编号'==objVal){
				obj.addClass("inputError");
				$("#"+_fields[i].id+"Error").text(_fields[i].name+"不能为空");
				$("#"+_fields[i].id+"Error").show();
			}else{
				obj.blur();
			}
			if(obj.hasClass("inputError")) 
				errorCnt++;
		}
		if(errorCnt>1)
			return false;
		return true;
	};
	var options = {
		url:root+"/portal/front/logining.action",
		type:"post",
		dataType:'text',
		error:function(){
			$("#submitBtn").removeAttr("disabled");
			if(typeof(type) == 'undefined'){
				$("#submitBtn").val("登录");
			}else{
				$("#submitBtn").css("background-image",  "url(" + root + "/images/home_new/but01.png)");
			}
			$("#validateCodeError").text("登录出现异常！");
			$("#validateCodeError").show();
		},
		success:function(flag){
			if(flag){
				if('1'==flag){ // 登录成功,跳转至我的车后页面
					window.location.href = root+"/portal/mychehou/mychehou.action";
				}else if('2'==flag){ // 用户名不存在
					$("#validateCodeError").text("抱歉，用户名不存在！");
				}else if('3'==flag){ // 验证码错误
					$("#validateCodeError").text("抱歉，验证码不正确！");
				}else if('4'==flag){ // 验证系统异常
					$("#validateCodeError").text("抱歉，系统异常,请重试！");
				}else if('5'==flag){ // 用户被锁定(后台ERP系统)
					$("#validateCodeError").text("抱歉，该用户已被锁定！");
				}else if('6'==flag.split(",")[0]){ // 用户被锁定(连续登录,系统被锁定)
					$("#validateCodeError").text("抱歉,该用户暂时已被锁定");
				}else if('7'==flag.split(",")[0]){ // 用户名密码输入错误(此时用逗号分割,后跟还能尝试登录的次数)
					$("#validateCodeError").text("密码错误,还能尝试" + flag.split(",")[1] + "次");
				}else{//登录失败
					$("#validateCodeError").text("抱歉，登录失败！");
				}
			}else{
				$("#validateCodeError").text("抱歉，登录失败！");
			}
			
			if(flag!='1'){
				$("#validateCode").val(""); // 清空验证码输入域
				$("#validateImg").click(); // 刷新验证码
				$("#submitBtn").removeAttr("disabled");
				if(typeof(type) == 'undefined'){
					$("#submitBtn").val("登录");
				}else{
					$("#submitBtn").css("background-image",  "url(" + root + "/images/home_new/but01.png)");
				}
				$("#validateCodeError").show();
			}
		}
	};
	$("#loginForm").ajaxForm(options);
	// 同意协议并提交
	$("#submitBtn").click(function(){
		formSubmit();
	});
	// 按回车键提交表单
	$(document).bind("keyup",function(evt){
		if(evt.keyCode==13){
			formSubmit();
		}
	});
	// 表单提交操作
	var formSubmit = function(){
		if(loginValidate()){
			if($(".inputError").size() < 1){
				if(typeof(type) == 'undefined'){
					$("#submitBtn").val("登录中...");
				}else{
					$("#submitBtn").css("background-image", "url(" + root + "/images/home_new/dengluzhong.png)");
				}
				$("#submitBtn").attr("disabled",true);
				$("#loginForm").submit();
				// 是否保存用户名、记住用户名状态到cookie
				var isKeep = $("#keepUserName_hcr").is(":checked");
				if(isKeep==true){
					$.cookie('isKeepUserName_hcr', isKeep, {expires: 30});
					$.cookie('keepUserName_hcr', $("#loginName").val(), {expires: 30});
				}else if(isKeep==false){
					$.cookie('isKeepUserName_hcr', isKeep, {expires: 30});
					$.cookie('keepUserName_hcr', null);
				}
				return false;
			}
		}
	};
	// 验证普通验证码是否正确
	var isValidateCodeRight = function(validateCode,codeName){
		$.ajax({
			url:root+"/portal/front/checkValidateCode.action",
			type:"post",
			dataType:'text',
			data:{"validateCode":validateCode},
			async:false,
			success: function(data){
				if('0'==data){
					$("#validateImg").click();
					$("#validateCode").addClass("inputError");
					$("#validateCodeError").text(codeName+"不正确").show();
				}else{
					$("#validateCode").removeClass("inputError");
					$("#validateCodeError").hide();
				}
			}
		});
	};
	// 验证码点击换一张
	$("#validateImg").click(function(){
		$(this).attr("src",root+"/portal/front/getImgCode.action?time="+(new Date()).getTime());
	});
	// 控制用户名输入框中'手机号/用户编号'字样提示
	$("#loginName").bind("focus",function(){
		if($.trim(this.value)=='手机号/用户编号'){
			_nameTip = $.trim(this.value);
			$(this).val("");
		}
	});
	$("#loginName").bind("blur",function(){
		if($.trim(this.value)=='')
			$(this).val(_nameTip);
	});
 });