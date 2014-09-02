//请求物流地址
var LMIS_REQUEST_URL = "http://www.sinotrucker.com";
//var LMIS_REQUEST_URL = "http://192.168.100.194";
//var LMIS_REQUEST_URL = "http://192.168.100.206:8080";
//日期格式转换
//eg:
//var d = new Date();
//d.format('yyyy-MM-dd');
Date.prototype.format = function(format)
{
  var o = {
   "M+" : this.getMonth()+1, //month
   "d+" : this.getDate(),    //day
   "h+" : this.getHours(),   //hour
   "m+" : this.getMinutes(), //minute是
   "s+" : this.getSeconds(), //second
   "q+" : Math.floor((this.getMonth()+3)/3),  //quarter
   "S" : this.getMilliseconds() //millisecond
  };
  if(/(y+)/.test(format)) 
    format=format.replace(RegExp.$1,(this.getFullYear()+"").substr(4 - RegExp.$1.length));
  for(var k in o)
    if(new RegExp("("+ k +")").test(format))
     format = format.replace(RegExp.$1,RegExp.$1.length==1 ? o[k] :("00"+ o[k]).substr((""+ o[k]).length));
  return format;
};

//long 转化成yyyy-MM-dd日期
function transDate(longDate){
	var d = new Date(longDate);
	return d.format('yyyy-MM-dd');
}

//null 字符串 转为空
function empString(str){
	return str || '';
}
//截取字符串，如果超过指定长度追加appendStr,
function cutStr(str,n,appendStr){
	if(!appendStr){
		appendStr="";
	}
	var length = empString(str).length;
	if(length<=n){
		return empString(str);
	}else{
		return empString(str).substring(0,n)+appendStr;
	}
}
function cutProvinceName(provinceName){
	//如果str是省份或市名称
	var len = provinceName.indexOf("黑龙江");
	var n=2;
	if(len!=-1){
		n=3;
	}
	return cutStr(provinceName,n,"");
}

//将JSON对象转变成String
function obj2str(o){
	var r = [];
	if(typeof o =="string") return "\""+o.replace(/([\'\"\\])/g,"\\$1").replace(/(\n)/g,"\\n").replace(/(\r)/g,"\\r").replace(/(\t)/g,"\\t")+"\"";
	if(typeof o =="undefined") return "";
	if(typeof o == "object"){
		if(o===null){
			return "null";
		}else if(!o.sort){
			for(var i in o){
				r.push(i+":"+obj2str(o[i]));
			}
			r="{"+r.join()+"}";
		}else{
			for(var i =0;i<o.length;i++){
				r.push(obj2str(o[i]));
			}
			r="["+r.join()+"]";
		}
		return r;
	}
	return o.toString();
}

//window.open(url)post 提交数据
function openPostWindow(url,data) 
{ 
    var tempForm = document.createElement("form"); 
    tempForm.id="tempForm1"; 
    tempForm.method="post"; 
    tempForm.action=url;
    tempForm.target="_blank";
    $.each(data,function(i,n){
    	var hideInput = document.createElement("input"); 
        hideInput.type="hidden";
        hideInput.name= i;
        hideInput.value= n;
        tempForm.appendChild(hideInput);  
    });
    
    document.body.appendChild(tempForm); 

    tempForm.submit();
    document.body.removeChild(tempForm);
    return false;
}
//输入框提示文字
function blurFocus(domId,text){
	$("#"+domId).css("color","#B6B6B6");

	$("#"+domId).bind('focus',function(){
		if($("#"+domId).val()==text){	
			$("#"+domId).val('');
		}
	});
	$("#"+domId).blur(function() {
		if($("#"+domId).val().trim()=="" || $("#"+domId).val().trim()==text){
			$("#"+domId).val(text);
			$("#"+domId).css("color","#B6B6B6");
		}else{
			$("#"+domId).css("color","#000");
		}
	});
}
//表单重置
function resetForm(formId){
	$("#"+formId).find("select").each(function(){
		$(this).val("");
	});
	$("#"+formId).find("input").val("");
	$("#"+formId).find("textarea").val("");
	$("#"+formId).find("redio").attr("checked","false");
}
//ajax验证验证码
function checkVerifyCode(verifyCode){
	var check = false;
	$.ajax({
		url : contextPath+"front/front_chekcVerifyCode.do",
		type : "POST",
		timeout : 10000,
		data : {verifyCode:verifyCode},
		cache : false,
		async : false,
		success : function(data){
			check =  data=="true"?true:false;
		},
		error : function(e, s){        			
		}
	});
	return check;
}

/**
 * 车辆类型
 */
var VEHICLE_TYPE={
		1:"箱式",
		2:"平板",
		3:"冷藏",
		4:"危险品货运",
		5:"罐车",
		6:"重型厢式货车",
		7:"普通货车",
		8:"牵引车",
		9:"半挂车",
		10:"大型货车",
		11:"低速载货汽车",
		12:"专用运输车",
		13:"半挂牵引车",
		14:"集装箱车",
		15:"自卸车"
};
//添加车辆类型 option
function appendVehicleType(id,show99){
	var vehicle_type_select = document.getElementById(id);
	for(var item in VEHICLE_TYPE){
		var objOption = document.createElement("OPTION");
	    objOption.text = VEHICLE_TYPE[item];  
	    objOption.value = item;  
	    vehicle_type_select.options.add(objOption);  
	}
}
