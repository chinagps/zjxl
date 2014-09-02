$(function($){
	
	blurFocus("orderNO","最多支持10个单号,用回车换行隔开");
	
	$("#expressTrace").submit(function(){
		return checkExpressOrderForm();
	});
	
	function rereshVerifyCode(){
		$("#verifyCodeImg").trigger("click");
		$("#verifyCodeVal").val("");
	}
	
	function checkExpressOrderForm(){

		var verifyCode = $("#verifyCodeVal").val();
		var orderNo = $("#orderNO").val();
		//查询类型
		var orderType = $("input[name='orderType']:checked").val();
		
		if(verifyCode==""){
			alert("请输入验证码");
			return false;
		}
		
		if(empString(orderNo).replace("最多支持10个单号,用回车换行隔开","").length==0){
			alert("请输入订单号");
			return false;
		}
		if(orderNo.indexOf("<")>0 ||orderNo.indexOf(">")>0 || 
				orderNo.indexOf("\"")>0 || orderNo.indexOf("'")>0){
			alert("订单号输入错误！");
			return false;
		}
		var nos="";
		var j = 0;
		if (orderNo != null && orderNo != "") {
			if (orderNo.indexOf("\n") > -1) {
				var noArray = orderNo.split("\n");
				for (var i=0; i<noArray.length; i++) {
					var no = noArray[i].trim();
					if (no !=null && no != "") {
						j++;
						nos+=no+'|';
					}
				}
			} 
			if (j > 10) {
				alert("查询请在10条内！");
			} else {
				nos = j>0? nos.replace(/\|$/, ''):orderNo.replace(/\|$/, '');
				var verifyCode=$("#verifyCodeVal").val();
				var queryData = {"orderNos":nos,"orderType":orderType,"verifyCode":verifyCode};
				$("#orderNos").val(nos);

				var isSubmit = false;
	        	$.ajax({
	        		url : contextPath+"front/front_verifyNo.do",
	        		type : "POST",
	        		timeout : 10000,
	        		data : queryData,
	        		cache : false,
	        		async : false,
	        		success : function(data){
	        			var j = eval("("+data+")");
	        			if(!j.success){
	        				alert(j.msg);
	        				isSubmit = false;
	        			}else{
	        				isSubmit = true;
	        			}
	        		},
	        		error : function(e, s){        			
	        			alert("单号查询错误！");
	        			isSubmit = false;
	        		}
	        	});
	        	rereshVerifyCode();
	        	return isSubmit;
			}
		}
	}

});


