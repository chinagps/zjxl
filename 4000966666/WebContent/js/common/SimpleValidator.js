/*
 * 自定义客户注册信息简单验证器(依赖JQuery1.3以上版本)
 * author:shen_chengjie
 * date:2012-08-01
 */
(function(){
SimpleValidator = {
	// 单选复选框
	checkable: function(element) {
		return /radio|checkbox/i.test(element.type);
	},
	// 获取长度
	getLength: function(value, element) {
		if(!element || !element.nodeName) return 0;
		switch( element.nodeName.toLowerCase() ) {
		case 'select':
			return $("option:selected", element).length;
		case 'input':
			if( this.checkable( element))
				return $("input[name='"+element.name+"']").filter(':checked').length;
		}
		return value.length;
	},
	// 必输入项
	required: function(value, element) {
		switch( element.nodeName.toLowerCase() ) {
		case 'select':
			var options = $("option:selected", element);
			return options.length > 0 && ( element.type=="select-multiple" || ($.browser.msie && !(options[0].attributes['value'].specified) ? options[0].text : options[0].value).length > 0);
		case 'input':
			if (this.checkable(element))
				return this.getLength(value, element) > 0;
		default:
			return $.trim(value).length > 0;
		}
	},
	// 比较两值相等
	equals: function(value1, value2) {
		return value1==value2;
	},
	//手机号码
	phone :  function(value) {
//		return /^1[3458]\d{9}$/.test(value);
		return /^1[3-8]\d{9}$/.test(value);
	},
	//电话号码
	telphone :  function(value) {
		return  /^(([0\+]\d{2,3})?(0\d{2,3})[-]?)?(\d{7,8})(-(\d{3,}))?$/.test(value);
	},
	//手机和电话号码
	phone_telphone :  function(value) {
//		return  /^1[3458]\d{9}$/.test(value) || /^(([0\+]\d{2,3})?(0\d{2,3})[-]?)?(\d{7,8})(-(\d{3,}))?$/.test(value);
		return  /^1[3-8]\d{9}$/.test(value) || /^(([0\+]\d{2,3})?(0\d{2,3})[-]?)?(\d{7,8})(-(\d{3,}))?$/.test(value);
	},
	//身份证
	cardNumber :  function(value) {
		return checkIdcard(value);
	},
	//邮政编码
	postalcode :  function(value) {
		return /^[1-9][0-9]{5}$/.test(value);
	},
	//驾驶证号
	drivingLicense:  function(value) {
		return  /^[a-zA-Z0-9]{1,18}$/.test(value);
	},
	//行驶证号
	drivePermit: function(value){
		// TODO
		return true;
	},
	//道路运输证
	roadTransport: function(value){
		return /^\d{12}$/.test(value);
	},
	//营业执照
	businessLicense :  function(value) {
		return /^\d{16}$/.test(value);
	},
	//税务登记证号
	taxRegNo :  function(value) {
		return /^\d{15}$/.test(value);
	},
	// 用户名
	userName :  function(value) {
		return /^[a-zA-Z0-9\-\_]{6,20}$/.test(value) || /^[\u4e00-\u9fa5]{2,12}$/.test(value);
	},
	//密码
	password :  function(value) {
		return /^[a-zA-Z0-9\:\;\"\<\>\'\{\}\[\]\`\~\!\@\#\$\%\^\&\*\(\)\-\_\=\+\,\.\?\/\|\\]{6,20}$/.test(value);
	},
	//组织机构代码
	OrganizationCode :  function(value) {
		return /^[A-Z0-9]{9}$/.test(value);
	},
	//车牌号码
	LicenseNumber :  function(value) {
		return /^[\u4e00-\u9fa5]{1}[A-Z0-9]{4,5}[A-Z0-9\u4e00-\u9fa5]{1}$/.test(value);
	},
	// 最小长度
	minlength: function(value, element, param) {
		return this.getLength($.trim(value), element) >= param;
	},
	// 最大长度
	maxlength: function(value, element, param) {
		return this.getLength($.trim(value), element) <= param;
	},
	// 长度区间
	rangelength: function(value, element, param) {
		var length = this.getLength($.trim(value), element);
		return ( length >= param[0] && length <= param[1] );
	},
	// 最小值
	min: function( value, param ) {
		return value >= param;
	},
	// 最大值
	max: function( value, param ) {
		return value <= param;
	},
	// 区间值
	range: function( value, param ) {
		return ( value >= param[0] && value <= param[1] );
	},
	// 电子邮件
	email: function(value) {
		return /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?$/i.test(value);
	},
	// 链接
	url: function(value) {
		return /^(https?|ftp):\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(\#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i.test(value);
	},
	// 中文 n位 - m位
	chinese: function(value, element, n, m){
		return /^[\u4e00-\u9fa5]+$/.test(value) && this.minlength(value,element,n) && this.maxlength(value,element,m);
	},
	//整数
	isInteger : function(value){
		return /^[0-9]+$/.test(value);
	},
	//数字
	isDigit : function(value){
		return /^[0-9.]+$/.test(value);
	},
	// 纯数字 n位 - m位
	digit: function(value, element, n, m){
		return /^[0-9]+$/.test(value) && this.minlength(value,element,n) && this.maxlength(value,element,m);
	},
	// 英文_数字 n位 - m位
	en_num: function(value, element, n, m){
		return /^[a-zA-Z0-9]+$/.test(value) && this.minlength(value,element,n) && this.maxlength(value,element,m);
	},
	// 中文_英文_数字 n位 - m位
	ch_en_num: function(value, element, n, m){
		return /^[a-zA-Z0-9\u4e00-\u9fa5]+$/.test(value) && this.minlength(value,element,n) && this.maxlength(value,element,m);
	},
	// 中文_英文_数字_其他一些符号 n位 - m位
	ch_en_num_other: function(value, element, n, m){
		return /^[a-zA-Z0-9\u4e00-\u9fa5\-\_\(\)\（\）\——\?\？\!\！\@]+$/.test(value) && this.minlength(value,element,n) && this.maxlength(value,element,m);
	},
	// 图片格式控制
	imgExt:function(value){
		var ext = value.substring(value.lastIndexOf(".")+1,value.length).toLowerCase();
		if ("jpg"!=ext && "jpeg"!=ext && "png"!=ext && "gif"!=ext){ return false;}
	    return true;
	},
	// 地址
	address:function(value){
		return /^[a-zA-Z0-9\u4e00-\u9fa5\-\_\#\(\)\（\）\s]{0,40}$/.test(value);
	},
	// 商户名称
	storeName:function(value){
		return /^[\u4e00-\u9fa5\-\_\(\)\（\）]{4,20}$/.test(value);
	},
	// 门店名称
	portalStoreName:function(value){
		return /^[a-zA-Z0-9\u4e00-\u9fa5\-\_\(\)\（\）\]{4,40}$/.test(value) && /[\u4e00-\u9fa5]/g.test(value);
	},
	// 银行名称
	bankName:function(value){
		return /^[a-zA-Z0-9\u4e00-\u9fa5\(\)\（\）]{2,40}$/.test(value) && /[\u4e00-\u9fa5]/g.test(value);
	},
	// 短信验证码
	smsCode:function(value){
		return /^[0-9]{6}$/.test(value);
	},
	// 乐行卡密码
	affCardPwd:function(value){
		return /^[0-9]{6}$/.test(value);
	},
	// 卡号
	affCardNo:function(value){
		return /^[0-9]{16}$/.test(value);
	},
	// 优惠折扣
	discount:function(value){
		return /^[0-9]{1}\.[0-9]{1,2}$/.test(value) || /^[0-9]{1}$/.test(value);
	}
};
// 验证身份证号码（包括部分有效性验证）供 cardNumber 使用,请勿直接调用
function checkIdcard(idcard){
	if(idcard) idcard = idcard.toUpperCase();
	var area={11:"北京",12:"天津",13:"河北",14:"山西",15:"内蒙古",21:"辽宁",22:"吉林",23:"黑龙江",31:"上海",32:"江苏",33:"浙江",34:"安徽",35:"福建",36:"江西",37:"山东",41:"河南",42:"湖北",43:"湖南",44:"广东",45:"广西",46:"海南",50:"重庆",51:"四川",52:"贵州",53:"云南",54:"西藏",61:"陕西",62:"甘肃",63:"青海",64:"宁夏",65:"新疆",71:"台湾",81:"香港",82:"澳门",91:"国外"}; 
	var Y,JYM;
	var S,M;
	var idcard_array = new Array(); 
	idcard_array = idcard.split(""); 
	//地区检验，只检验了省市自治区，没有检验出市县合法性(待完善)
	if(area[parseInt(idcard.substr(0,2))]==null) return false; 
	//身份号码位数及格式检验 
	switch(idcard.length){
		case 15: 
			if ( (parseInt(idcard.substr(6,2))+1900) % 4 == 0 || ((parseInt(idcard.substr(6,2))+1900) % 100 == 0 && (parseInt(idcard.substr(6,2))+1900) % 4 == 0 )){ 
				ereg=/^[1-9][0-9]{5}[0-9]{2}((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|[1-2][0-9]))[0-9]{3}$/;//测试出生日期的合法性 
			} else { 
				ereg=/^[1-9][0-9]{5}[0-9]{2}((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|1[0-9]|2[0-8]))[0-9]{3}$/;//测试出生日期的合法性 
			}
			if(ereg.test(idcard)) return true;
			else return false; 
			break;
		case 18: 
			//18位身份号码检测 
			//出生日期的合法性检查 
			//闰年月日:((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|[1-2][0-9])) 
			//平年月日:((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|1[0-9]|2[0-8])) 
			if ( parseInt(idcard.substr(6,4)) % 4 == 0 || (parseInt(idcard.substr(6,4)) % 100 == 0 && parseInt(idcard.substr(6,4))%4 == 0 )){ 
				ereg=/^[1-9][0-9]{5}19[0-9]{2}((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|[1-2][0-9]))[0-9]{3}[0-9Xx]$/;//闰年出生日期的合法性正则表达式 
			} else { 
				ereg=/^[1-9][0-9]{5}19[0-9]{2}((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|1[0-9]|2[0-8]))[0-9]{3}[0-9Xx]$/;//平年出生日期的合法性正则表达式 
			}
			if(ereg.test(idcard)){//测试出生日期的合法性 
				//计算校验位 
				S = (parseInt(idcard_array[0]) + parseInt(idcard_array[10])) * 7
				+ (parseInt(idcard_array[1]) + parseInt(idcard_array[11])) * 9
				+ (parseInt(idcard_array[2]) + parseInt(idcard_array[12])) * 10
				+ (parseInt(idcard_array[3]) + parseInt(idcard_array[13])) * 5
				+ (parseInt(idcard_array[4]) + parseInt(idcard_array[14])) * 8
				+ (parseInt(idcard_array[5]) + parseInt(idcard_array[15])) * 4
				+ (parseInt(idcard_array[6]) + parseInt(idcard_array[16])) * 2
				+ parseInt(idcard_array[7]) * 1
				+ parseInt(idcard_array[8]) * 6
				+ parseInt(idcard_array[9]) * 3 ;
				Y = S % 11;
				M = "F";
				JYM = "10X98765432";
				M = JYM.substr(Y,1);//判断校验位 
				if(M == idcard_array[17]) return true; //检测ID的校验位 
				else return false;
			}else return false;
			break;
		default:
			return false;
			break;
	}
};
})();