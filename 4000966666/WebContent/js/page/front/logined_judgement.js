/**
 * @description: 登录页面_判断是否已经登录_显示相应内容 JS文件,依赖于jQuery
 * @author: shen_chengjie
 * @email: 15576810155@163.com
 * @time: 2013-03-22
 */
$(function(){
	var _userNameUrl_ = root + '/portal/front/getLoginUserName.action'; // 获取登录用户名称
	var _balanceUrl_ =  root + '/portalJson/account/getAccountBalance.action'; // 获取账户余额
	var _msgUrl_ = root+"/portal/message/queryTotal.action"; // 获取未读消息条数
	$.ajax({
		url : _userNameUrl_,
		type : "POST",
		dataType : 'json',
		error : function(){
			$("#loginedView").hide();
			$("#noLoginedView").show();
		},
		success : function(data){
			if(data){
				if(data.length>=10){
					$("#userName_login").attr("title",data);
					data = data.substring(0,10)+'...';
				}
				$("#noLoginedView").hide();
				$("#loginedView").show();
				$("#userName_login").html(data);
				_getBalance();
				_getMessageCount();
			}else{
				$("#loginedView").hide();
				$("#noLoginedView").show();
			}
		}
	});
	//AJAX获取可用余额
	_getBalance = function(){
		$.ajax({
			url : _balanceUrl_,
			type : "POST",
			dataType : 'json',
			success : function(data){
				var str = '';
				if(data!=null && data>=0){
					str = data + '元';
				}else{
					str = '当前不支持查询';
				}
				$("#balance_login").html(str);
			}
		});
	};
	// 获取未读消息数量
	_getMessageCount = function(){
		$.ajax({
			url:_msgUrl_,
			type:"post",
			dataType:"text",
			success:function(data){
				if(data!=null && !isNaN(data)){
					$("#msg_login").text(data);
				}
			}
		});
	};
 });