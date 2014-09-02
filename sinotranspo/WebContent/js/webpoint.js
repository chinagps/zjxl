//初始化数据
function init(){
	$("#hidden_button").hide();
	$(".navc").bind("click",function(){
		$("#main_conttwo").html("");
		$("#map").show();
	})
	
	//获取区域信息
	$.getJSON(contextPath+"front/webpoint_dataInit.do",function(data){
		//展示区域信息
		showArea(data.area);
	});

}

//展示区域
function showArea(area){
	var areaHtml = "";
	$.each(area,function(i,n){
		areaHtml+='<TR>'+
		  '<TD width="13%" height="25" align="center" colspan="2">'+
			'<SPAN style="color: rgb(29, 0, 189);">'+n.regionName+'</SPAN>'+              
		  '</TD>'+
		'</TR>';
		var j=0;
		areaHtml+='<TR>';
		$.each(n.sysAreaInfoList,function(areaIndex,areaInfo){
			j=areaIndex;
			areaHtml+='<TD height="25" align="center">'+
				'<span onclick="getAreaWebPointByCode('+areaInfo.areaCode+');">'+areaInfo.areaName+'</span>'+
			  '</TD>';
			if((areaIndex+1)%2==0){//够两列则增加一行
				areaHtml+='</TR><TR>';
			}
			 
		});
		if((j+1)%2!=0){//如果最后一行只是一列，则增加一列
			areaHtml+='<TD height="25" align="center"></TD>';
		}
		areaHtml+='</TR>';
	});
	$("#areaTbody").html(areaHtml);
}

function getAreaWebPointByCode(areaCode){
	if(areaCode=="000000"){
		return false;
	}
	$.getJSON(
			contextPath+"front/webpoint_areaWebpointData.do",
		{provinceCode:areaCode},
		function(data){
			//展示区域网点信息
			showAreaWebPoint(data);
		}
	);
}

//点击flash区域，展示区域的服务网点
function getAreaWebPoint(areaName){
	var areaDate = sysAreaDate[areaName];
	getAreaWebPointByCode(areaDate.code);
	hiddenButtonClick();
}
//解决:当点击flash时，flash获取光标隐藏，滚轮不能使用bug
function hiddenButtonClick(){
	$("#hidden_button").show();
	$("#hidden_button").focus();
	$("#hidden_button").hide();
}

//展示区域网点信息
function showAreaWebPoint(data){
	$("#map").hide();
	$("#main_conttwo").html("");
	
	var areaWebPointHtml="";
	areaWebPointHtml+=
	'<CENTER>'+
	'<DIV id="ContentPlaceHolder1_Panel1" style="width: 680px;">'+
		'<DIV align="left">'+
			'<SPAN id="ContentPlaceHolder1_LabelCenterSite" style="color: red; font-size: 16pt;">'+data.provinceName+'管理中心网点：</SPAN>'+
		'</DIV>'+
	'</DIV>';
	areaWebPointHtml+=
	'<DIV id="ContentPlaceHolder1_Panel2">'+
		'<TABLE id="ContentPlaceHolder1_DataListSiteQx" style="width: 695px; border-collapse: collapse;" cellspacing="0">'+
			  '<TBODY>';
			  var areaWebPoint = data.areaWebPoint;
			  $.each(areaWebPoint,function(i,n){
				  areaWebPointHtml+=
					  '<TR>'+
						'<TD>'+
							'<DIV align="left">'+
								'<SPAN id="ContentPlaceHolder1_DataListSiteQx_LabelCITY_0"style="color: red;">'+n.areaName+'</SPAN>'+
							'</DIV>'+
							'<TABLE width="695" align="center" bgcolor="#d9d9d9" border="0"cellspacing="1" cellpadding="0">'+
							'<TBODY>'+
								'<TR>';
					var j=0;
					var column = 2;//table 一行column列
					$.each(n.webPointList,function(webpointIndex,webpoint){
						j=webpointIndex;
						areaWebPointHtml+=
							'<TD width="160" height="25" align="center"class="AlternatingRow"'+
								'onclick="this" bgcolor="#ffffff">'+
								'<A href="javascript:getWebPointInfo('+webpoint.id+');">'+
									webpoint.webpointName+
								'</A>'+
							'</TD>';
						if((webpointIndex+1)%column==0){
							areaWebPointHtml+='</TR><TR>';
						}
						//areaWebPointHtml = areaWebPointHtml.replace(/<\/TR><TR>$/,"");
					});
					//最后一行不够column列，则增加到column列
					var last=j!=0?column-((j+1)%column):column;
					for(var x=1;x<=last;x++){
						areaWebPointHtml+=
							'<TD width="160" height="25" align="center"class="AlternatingRow" bgcolor="#ffffff"></TD>';
					}					
					areaWebPointHtml+=
							'</TR>'+
						'</TBODY>'+
					'</TABLE>';
			  });

areaWebPointHtml+='</TD>'+
				'</TR>'+
			'</TBODY>'+
		'</TABLE>'+
	'</DIV>'+
  '</CENTER>';
  $("#main_conttwo").html(areaWebPointHtml);
}

//获取网点相信信息
function getWebPointInfo(id){
	$.getJSON(contextPath+"front/webpoint_webpointDeatil.do",{webpointId:id},function(data){
		showWebPointDetail(data);
	});
}
//展示网点详细信息
function showWebPointDetail(webpoint){
	var webpointDetailHtml="";
	webpointDetailHtml+=
	'<CENTER>'+
	'<TABLE width="600" class="tbl3" style="border: 1px solid rgb(217, 217, 217);"cellspacing="0" cellpadding="0">'+
		'<TBODY>'+
			'<TR>'+
				'<TD height="30" colspan="2">'+
				'<FONT style="font-weight: bold;">'+
					webpoint.provinceName+'-'+webpoint.webpointName+'&nbsp;&nbsp;网点资料'+  
				'</FONT>'+
				'<span  onclick="getAreaWebPointByCode('+webpoint.provinceCode+');" style="cursor: pointer;color:#1066C2;float: right;padding:0;padding-right:10px;"><<&nbsp;返回</span>'+
				'</TD>'+
			'</TR>'+
			'<TR bgcolor="#ffffff">'+
				'<TD width="50" height="26" bgcolor="#f2f2f2">'+
					'所在地区'+
				'</TD>'+
				'<TD width="400">'+
					'<span>'+webpoint.provinceName+'-'+webpoint.cityName+'</span>'+
				'</TD>'+
			'</TR>'+
			'<TR bgcolor="#ffffff">'+
				'<TD height="26" bgcolor="#f2f2f2">'+
					'经&nbsp;&nbsp;&nbsp;&nbsp;理'+
				'</TD>'+
				'<TD>'+
					'<span>'+webpoint.webpointManager+'</span>'+
	            '</TD>'+
			'</TR>'+
			'<TR bgcolor="#ffffff">'+
				'<TD height="26" bgcolor="#f2f2f2">'+
				'经理手机'+
				'</TD>'+
				'<TD>'+
					'<span>'+webpoint.managerPhone+'</span>'+  
	           ' </TD>'+
			'</TR>'+
			'<TR bgcolor="#ffffff">'+
				'<TD min-height="50" bgcolor="#f2f2f2">'+
					'公司地址'+
				'</TD>'+
				'<TD min-height="50" align="left">'+
					'<span>'+webpoint.address+'</span>'+
				'</TD>'+
			'</TR>'+
			'<TR bgcolor="#ffffff">'+
				'<TD height="26" bgcolor="#f2f2f2">'+
					'传真号码'+
				'</TD>'+
				'<TD>'+
					'<span>'+webpoint.webpointFax+'</span>'+                  
	            '</TD>'+
			'</TR>'+
			'<TR bgcolor="#ffffff">'+
				'<TD height="26" bgcolor="#f2f2f2">'+
					'查询电话'+
				'</TD>'+
				'<TD>'+
					'<span>'+webpoint.searchTel+'</span>'+   
				'</TD>'+
			'</TR>'+
			'<TR bgcolor="#ffffff">'+
				'<TD height="20" bgcolor="#f2f2f2">'+ 
					'业务电话'+ 
				'</TD>'+ 
				'<TD>'+ 
					'<span>'+webpoint.businessTel+'</span>'+
				'</TD>'+
			'</TR>'+
			'<TR bgcolor="#ffffff">'+
				'<TD min-height="80" bgcolor="#f2f2f2">'+
					'业务范围'+
				'</TD>'+
				'<TD min-height="80" align="left" colspan="2">'+
				'<span>'+webpoint.dispatchExtent+'</span>'+  
				'</TD>'+
			'</TR>'+
			'<TR bgcolor="#ffffff">'+
				'<TD min-height="57" bgcolor="#f2f2f2">'+
					'备&nbsp;&nbsp;&nbsp;&nbsp;注'+
				'</TD>'+
				'<TD min-height="80" align="left" colspan="2">'+
					'<span>'+webpoint.remark+'</span>'+
			'	</TD>'+
			'</TR>'+
		'</TBODY>'+
	'</TABLE>'+
	'</CENTER>';
	
	$("#main_conttwo").html(webpointDetailHtml);

}

var sysAreaDate = {
		"xinjiang": {name: "新疆",code: "650000"},
		"neimeng": {name: "内蒙",code: "150000"},
		"heilongjiang": {name: "黑龙江",code: "230000"},
		"jilin": {name: "吉林",code: "220000"},
		"liaoning": {name: "辽宁",code: "210000"},
		"beijing": {name: "北京",code: "110000"},
		"tianjin": {name: "天津",code: "120000"},
		"hebei": {name: "河北",code: "130000"},
		"shandong": {name: "山东",code: "370000"},
		"henan": {name: "河南",code: "410000"},
		"shanxi": {name: "山西",code: "140000"},
		"shanxi3": {name: "陕西",code: "610000"},
		"ningxia": {name: "宁夏",code: "640000"},
		"gansu": {name: "甘肃",code: "620000"},
		"qinghai": {name: "青海",code: "630000"},
		"xizang": {name: "西藏",code: "540000"},
		"sichuan": {name: "四川",code: "510000"},
		"chongqing": {name: "重庆",code: "500000"},
		"hubei": {name: "湖北",code: "420000"},
		"anhui": {name: "安徽",code: "340000"},
		"jiangsu": {name: "江苏",code: "320000"},
		"shanghai": {name: "上海",code: "310000"},
		"zhejiang": {name: "浙江",code: "330000"},
		"fujian": {name: "福建",code: "350000"},
		"jiangxi": {name: "江西",code: "360000"},
		"hunan": {name: "湖南",code: "430000"},
		"guizhou": {name: "贵州",code: "520000"},
		"yunnan": {name: "云南",code: "530000"},
		"guangxi": {name: "广西",code: "450000"},
		"guangdong": {name: "广东",code: "440000"},
		"hainan": {name: "海南",code: "460000"},
		"taiwan": {name: "台湾",code: "000000"},
		"aomen": {name: "澳门",code: "000000"},
		"xianggang": {name: "香港",code: "000000"}
}
