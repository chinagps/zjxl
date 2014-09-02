/*
 * ajax调用方法 全局
 *
 */
function JAjax(u, d, h, fn, er, sync, scope, time)
{

	$.ajax(
	{
		url : u,
		type : "POST",
		timeout : time || 10000,
		data : d ||
		{},
		dataType : h || "html",
		cache : false,
		async : (sync == true || sync == false) ? sync : true,
		success : function(req, err)
		{

			// checkData(req);
			if (fn)
				if (fn instanceof Function)
				{
					if (!scope)
					{
						fn.call(this, req);
					} else
					{
						fn.call(scope, req);
					}
				}
		},
		error : function(e, s)
		{
			// $("#CenterMaskDiv").load("gloaberror.jsp",null,function(){
			// $("#errorMessage").html(errorMessage);
			// });
			if (er)
				if (er instanceof Function)
				{
					er.call(this, e);
				}
		}
	});
};
$(document).ajaxComplete(
		function(event, request, settings)
		{
//			if(request.responseText == "完成该操作所需的数据还不可使用。") return false;
//			//每次调用完毕检查用户是否已经注销
//			if(request.getResponseHeader('isLogined')=="noLogin" && !KCPT.user.noLoginShowBf)
//			{
//				KCPT.user.noLoginShowBf="yes";//防止重复狂弹
//				//注： noLogin的真实情况是： 用户已经登出，Memcache用户在线列表不存在该用户。
//				$.ligerDialog.warn("您已经注销,请重新登录！", "提示信息", function(){
//					KCPT.user.noLoginShowBf=null;
//				    window.location.href = "index.jsp";
//				}) ;
//			 }
//
//			 if(request.status==404 && !KCPT.user.timeOutShowBf)
//			 {
//				KCPT.user.timeOutShowBf="yes";//防止重复狂弹
//				alert("连接后台服务出现异常(Error:"+request.status+"),请重新登陆！");
//				window.location.href = "index.jsp";
//
//				/*$.ligerDialog.success("连接后台服务出现异常！(Error:"+request.status+"),请重新登陆。", "提示信息", function()
//				{
//					KCPT.user.timeOutShowBf=null;
//					window.location.href = "index.jsp";
//				}) ;*/
//			 }
   }).ajaxError(function(event,request, settings){
	   
   });



function checkData(data)
{
	if (data)
	{
		if (data.error)
		{
			var errorObj = data.error;
			var errorLeave;
			var errorMessage;
			for ( var i in errorObj)
			{
				if (i == "0")
				{
					errorMessage = errorObj[i].errorMessage;
				} else if (i == "1")
				{
					errorLeave = errorObj[i].errorLevel;

				}

			}
			if (errorLeave == "2")
			{
				$.ligerDialog.error(errorMessage, "错误");
			} else if (errorLeave == "1")
			{
				$("#CenterMaskDiv").load("gloabError.jsp", null, function()
				{
					$("#errorMessage").html(errorMessage);
				});
			}
			return false;
		} else if (data.displayMessage)
		{
			var message = data.displayMessage;
			// $.ligerDialog.success(errorMessage, "成功");
			return true;
		} else
		{
			return true;
		}
	} else
	{
		return true;
	}
};
function trim(str){ //删除左右两端的空格
    return str.replace(/(^\s*)|(\s*$)/g, "");
 }
function ltrim(str){ //删除左边的空格
    return str.replace(/(^\s*)/g,"");
 }
function rtrim(str){ //删除右边的空格
	return str.replace(/(\s*$)/g,"");
 }
/*
 * 获取flash组件
 */
function getFlashObj(movieName)
{
	var chartRef = null;
	if (navigator.appName.indexOf("Microsoft Internet") == -1)
	{
		if (document.embeds && document.embeds[movieName])
			chartRef = document.embeds[movieName];
		else
			chartRef = window.document[movieName];
	} else
	{
		chartRef = window[movieName];
	}
	if (!chartRef)
		chartRef = document.getElementById(movieName);

	return chartRef;
}
var checkFunction = function(value)
{
	var flag = false;
	if (value && KCPT.funlist)
	{
		try
		{
			var funlist = KCPT.funlist;
			if (funlist && funlist.length > 0)
			{
				for ( var i = 0; i < funlist.length; i++)
				{
					var _obj = funlist[i];
					if (_obj)
					{
						if (_obj == value)
						{
							flag = true;
							break;
						}
					}
				}
			}
		}
		catch (e)
		{
		}
	}
	return flag;
};
var removeErrorCss = function()
{// 删除字段验证提示
	$("label[class=error]").each(function()
	{
		$(this).remove();
	});
};
KCPT.extend = function()
{
	var io = function(o)
	{
		for ( var m in o)
		{
			this[m] = o[m];
		}
	};
	var oc = Object.prototype.constructor;

	return function(sb, sp, overrides)
	{
		if (KCPT.isObject(sp))
		{
			overrides = sp;
			sp = sb;
			sb = overrides.constructor != oc ? overrides.constructor : function()
			{
				sp.apply(this, arguments);
			};
		}
		var F = function()
		{
		}, sbp, spp = sp.prototype;
		F.prototype = spp;
		sbp = sb.prototype = new F();
		sbp.constructor = sb;
		sb.superclass = spp;
		if (spp.constructor == oc)
		{
			spp.constructor = sp;
		}
		sb.override = function(o)
		{
			KCPT.override(sb, o);
		};
		sbp.superclass = sbp.supr = (function()
		{
			return spp;
		});
		sbp.override = io;
		KCPT.override(sb, overrides);
		sb.KCPTend = function(o)
		{
			return KCPT.KCPTend(sb, o);
		};
		return sb;
	};
}(), KCPT.override = function(origclass, overrides)
{
	if (overrides)
	{
		var p = origclass.prototype;
		KCPT.apply(p, overrides);
		if (KCPT.isIE && overrides.hasOwnProperty('toString'))
		{
			p.toString = overrides.toString;
		}
	}
};
KCPT.isObject = function(v)
{
	return !!v && Object.prototype.toString.call(v) === '[object Object]';
};
KCPT.apply = function(o, c, defaults)
{
	// no "this" reference for friendly out of scope calls
	if (defaults)
	{
		KCPT.apply(o, defaults);
	}
	if (o && c && typeof c == 'object')
	{
		for ( var p in c)
		{
			o[p] = c[p];
		}
	}
	return o;
};
KCPT.isDefined = function(v)
{
	return typeof v !== 'undefined';
};
KCPT.applyIf = function(o, c)
{
	if (o)
	{
		for ( var p in c)
		{
			if (!KCPT.isDefined(o[p]))
			{
				o[p] = c[p];
			}
		}
	}
	return o;
};

$.fn.show_A_Window = function()
{
	$(this).find("div.openwindow").show();

};
/*
 * 弹出窗口
 *
 */
$.fn.A_Window = function(o){
	var obj = this;
	var p = {
		id : "test_" + new Date().getTime(),
		html : "<span>1</span>",
		url : false,
		width : 500,
		height : 300,
		dragAble : true,
		unMask : false,
		dragabId : false,
		load_fn: function(){},//注册点击页面X关闭事件
		loading : false,
		mode : true,
		module : ""
	};
	$.extend(p, o || {});

	if (p.mode){		
		$("#loadmask_id_all").removeClass("hidden");//.addClass("masked")
		var maskDiv = $("#loadmask_id_all");
//		this.append(maskDiv);
		var explorerType = navigator.userAgent.toLowerCase();
		// auto height fix for IE
//		if (explorerType.indexOf("msie") > -1)
//		{
//			maskDiv.width(this.width() + parseInt(this.css("padding-top")) + parseInt(this.css("padding-bottom")))
//				.height(this.height() + parseInt(this.css("padding-left")) + parseInt(this.css("padding-right")));
//		}
		// fix for z-index bug with selects in IE6
		if (explorerType.indexOf("msie 6") > -1)
		{
			this.find("select").addClass("masked-hidden");
		}
	}

	var str = "";
	var title = p.title;

	// 操作模式
	var moduleClass = "title";
	var moduleClassClose = "close";
	// 判断是否为弹出页面
	if (p.module === "delete")
	{
		// 设定弹出页面页头样式, XP样式
		moduleClass = "delete";
		moduleClassClose = "deletePopClose";
	}

	var loading = p.loading ? '<div class="loading"><img src="images/loading.gif"/></div>' : "";
	var clazz = "openwindow";
	
	if (p.priv) {
		str = '<div id="' + p.id + '" class="' + clazz + '" >' 
			+     '<div>'
			+         '<table>'
			+			'<tr><td>'
			+				'<input type="hidden" id="priv" name="priv" value="' + o.priv + '" />'
			+			'</td></tr>'
			+		  '</table>'
			+	  '</div>' 
			+ 	  '<div class="p_content" style="height: ' + (p.height) + 'px;"></div>'
			+ '</div>' 
			+ loading;
	} else {// title
		str = '<div id="' + p.id + '" class=' + clazz + ' >' 
			+ 	'<div class="p_content" style="height: ' + (p.height) + 'px;"></div>'
			+ '</div>'
			+ loading;
	}

	var dw = $(str);
	$(dw).appendTo($(this));
	
	var centerX = p.x ? p.x : Math.round(this.width() / 2 - (p.width - parseInt(dw.css("padding-left")) - parseInt(dw.css("padding-right"))) / 2);
	var centerY = p.y ? p.y : Math.round(this.height() / 2 - (p.height - parseInt(dw.css("padding-top")) - parseInt(dw.css("padding-bottom"))) / 2);
	
	dw.css({
			top: centerY
		,	left: centerX
	});
	
	var loadingObj = $("#"+p.id).find("div.loading");
	if (p.background && loadingObj) {
		loadingObj.css(
		{
			'margin-left' : Math.round(p.width - loadingObj.width()) / 2,
			'margin-top' : Math.round(p.height - loadingObj.height()) / 2
		});
	} else {
		loadingObj.css(
		{
			'margin-left' : Math.round(p.width - loadingObj.width()) / 2,
			'margin-top' : Math.round(p.height - loadingObj.height()) / 2
		});
	}

	if (p.url) {
		$(dw).find("div.p_content").load(p.url, p.data, p.load_fn);
	} else {
		$(dw).find("div.p_content").html(p.html);
	}
	if (p.dragAble && o.dragabId) {
		$(dw).draggable({
			containment : 'parent',
			handle : 'div.kcptWindow_top'
 		});
	}else if (p.dragAble){
		$(dw).draggable(
		{
			containment : 'parent',
			handle : 'div.kcptWindow_top'
		});
	}
	
	return $(dw);
};
$.fn.Map_Window = function(o)
{
	var obj = this;
	var p =
	{
		url : 'script/util/mapUtil/html/mapwindow.html',
		load_fn : function()
		{

			KCPT.userMap = new mapUtil(o);

			$("div.seven7map").height(o.height);

			$("div.seven7map").width(o.width);

			$("div#mapwindow").height(o.height - 50);

			$("div#mapwindow").width(o.width - 25);

			KCPT.userMap.map.changeSize();

			$("#mapwinclose").bind('click', function()
			{
				$(obj).close_ALL_Window();
				KCPT.userMap = null;
			});
			o.load_fn.call(obj);

			$(obj).show_A_Window();

			if(o.closeTrue) {
				$("#mapwinclose").hide();
			}
		}
	};
	o.load_fun = null;
	for ( var i in o)
	{
		if (!p[i])
		{
			p[i] = o[i];
		}
	}

	$(obj).A_Window(p);
};
$.fn.Map_Window2 = function(o)
{
	var obj = this;
	var p =
	{
		 url : 'script/util/mapUtil/html/mapwindow2.html',
		 //url: o.url,
		load_fn : function()
		{

			KCPT.userMap = new mapUtil(o);

			$("div.seven7map").height(o.height);

			$("div.seven7map").width(o.width);

			$("div#mapwindow").height(o.height);

			$("div#mapwindow").width(o.width);

			KCPT.userMap.map.changeSize();

			$("#mapwinclose").bind('click', function()
			{
				$(obj).close_ALL_Window();
				KCPT.userMap = null;
			});
			o.load_fn.call(obj);

		 	$(obj).show_A_Window();

			if(o.closeTrue) {
				$("#mapwinclose").hide();
			}
		}
	};
	o.load_fun = null;
	for ( var i in o)
	{
		if (!p[i])
		{
			p[i] = o[i];
		}
	}

	$(obj).A_Window(p);
};
//弹出窗口内带地图
$.fn.MapAndGrid_Window = function(o){
	var obj = this;
	var p = {
		id : "test" + Math.random(),
		html : "<span>1</span>",
		url : false,
		width : 500,
		height : 300,
		dragAble : true,
		unMask : false,
		dragabId : false,
 		loading : false,
		mode : true,
		module : "",
		load_fn : function(){}
	};
	
 	//KCPT.apply(p, o);
	$.extend(p, o || {});
	
 	if (p.mode)
	{
		// 取消遮盖
		this.una_Window();
// 		if (this.css("position") == "static")
//		{
//			this.addClass("masked-relative");
//		}
		this.find("div.loadmask").removeClass("hidden");//.addClass("masked")
		var maskDiv = this.find("div.loadmask");
 		if (navigator.userAgent.toLowerCase().indexOf("msie") > -1) {
			maskDiv.height(this.height() + parseInt(this.css("padding-top")) + parseInt(this.css("padding-bottom")))
				.width(this.width() + parseInt(this.css("padding-left")) + parseInt(this.css("padding-right")));
		}
  		if (navigator.userAgent.toLowerCase().indexOf("msie 6") > -1) {
			this.find("select").addClass("masked-hidden");
		}
	}
	var str = "";
	var title = p.title;

	// 操作模式
	var moduleClass = "title";
	var moduleClassClose = "close";
	// 判断是否为弹出页面
	if (p.module === "delete")
	{
		// 设定弹出页面页头样式, XP样式
		moduleClass = "delete";
		moduleClassClose = "deletePopClose";
	}

	var loading = p.loading ? '<div class="loading"><img src="images/loading.gif"/></div>' : "";
	var clazz = "openwindow";
	
	if (p.priv) {
		str = '<div id="' + p.id + '" class="' + clazz + '" style="width: ' + p.width + 'px;height: ' + p.height + 'px;">' 
			+     '<div>'
			+         '<table>'
			+			'<tr><td>'
			+				'<input type="hidden" id="priv" name="priv" value="' + o.priv + '" />'
			+			'</td></tr>'
			+		  '</table>'
			+	  '</div>' 
			+ 	  '<div class="p_content" style="height: ' + (p.height) + 'px;"></div>'
			+ '</div>' 
			+ loading;
	} else {// title
		str = '<div id="' + p.id + '" class=' + clazz + ' style="width: ' + p.width + 'px;height: ' + p.height + 'px;">' 
			+ 	'<div class="p_content" style="height: ' + (p.height) + 'px;"></div>'
			+ '</div>'
			+ loading;
	}

	var dw = $(str);
	$(dw).appendTo($(this));
	
	var centerX = p.x ? p.x : Math.round(this.width() / 2 - (dw.width() - parseInt(dw.css("padding-left")) - parseInt(dw.css("padding-right"))) / 2);
	var centerY = p.y ? p.y : Math.round(this.height() / 2 - (dw.height() - parseInt(dw.css("padding-top")) - parseInt(dw.css("padding-bottom"))) / 2);
	
	dw.css({
			top: centerY
		,	left: centerX
	});
	
	var loadingObj = $("#"+p.id).find("div.loading");
	if (p.background && loadingObj) {
		loadingObj.css(
		{
			'margin-left' : Math.round($(".openwindow").width() - loadingObj.width()) / 2,
			'margin-top' : Math.round($(".openwindow").height() - loadingObj.height()) / 2
		});
	} else {
		loadingObj.css(
		{
			'margin-left' : Math.round($(".openwindow1").width() - loadingObj.width()) / 2,
			'margin-top' : Math.round($(".openwindow1").height() - loadingObj.height()) / 2
		});
	}

//	if (p.url) {
//		$(dw).find("div.p_content").load(p.url, p.data, p.load_fn);
//	} else {
//		$(dw).find("div.p_content").html(p.html);
//	}
//	o.load_fun = null;
// 	for ( var i in o)
//	{
//		if (!p[i])
//		{
//			 p[i] = o[i];
//		}
//	}

	if (p.url){
		$(dw).find("div.p_content").load(p.url, p.data, p.load_fn);
	} else{
		$(dw).find("div.p_content").append(p.html);
	}
	if (p.dragAble && o.dragabId){
		$(dw).draggable({
			containment : 'parent',
			handle : 'div.kcptWindow_top'
 		});
	} else if (p.dragAble)
	{
		$(dw).draggable(
		{
			containment : 'parent',
			handle : 'div.kcptWindow_top'
		});
	}
  	return $(dw);
};

/**
 * 去除遮盖层
 */
$.fn.una_Window = function(label)
{
	$("#loadmask_id_all").addClass("hidden");
//	this.find(".loadmask-msg,.loadmask").addClass("hidden");
//	this.removeClass("masked masked-relative");
	//this.removeClass("masked-relative");
	if (navigator.userAgent.toLowerCase().indexOf("msie 6") > -1) 
		this.find("select").removeClass("masked-hidden");
};
// 关闭所有悬浮窗
$.fn.close_ALL_Window = function(o)
{
	var p =
	{
		priv : false
	};
	if (o)
		KCPT.apply(p, o);
	// o.priv = true 隐藏 false 显示
	var obj = $(this).find("div.openwindow");
	var obj1 = $(this).find("div.openwindow1");
	if (p.priv)
	{
		$(obj).hide();
		$(obj1).hide();
	} else
	{
		$(obj).remove();
		$(obj1).remove();
	}
	// 取消遮盖
	this.una_Window();
};

// 根据ID关闭悬浮窗(取消遮罩)
$.fn.close_A_Window = function(o)
{
	if($("#" + o.id).length=0)
		return;
	var p =
	{
		priv : false
	};
	if (o)
		KCPT.apply(p, o);
	// o.priv = true 隐藏 false 显示
	var obj = $("#" + o.id);

	if (p.priv)
	{
		$(obj).hide();
	} else
	{
		$(obj).remove();
	}
	// 取消遮盖
	this.una_Window();
};
//根据ID关闭悬浮窗(取消遮罩)
$.fn.alarmstrategy_close_A_Window = function(o)
{
	var p =
	{
		priv : false
	};
	if (o)
		KCPT.apply(p, o);
	// o.priv = true 隐藏 false 显示
	var obj = $("#" + o.id);

	if (p.priv)
	{
		$(obj).hide();
	} else
	{
		$(obj).hide();
		setTimeout(function(){
			$(obj).remove();
		}, 100);
	}
	// 取消遮盖
	this.una_Window();
};
//根据ID关闭悬浮窗(不取消遮罩)
$.fn.close_AY_Window = function(o)
{
	var p =
	{
		priv : false
	};
	if (o)
		KCPT.apply(p, o);
	// o.priv = true 隐藏 false 显示
	var obj = $("#" + o.id);

	if (p.priv)
	{
		$(obj).hide();
	} else
	{
		$(obj).remove();
	}
};
/**
 * Removes mask from the element.
 */
//$.fn.una_Window = function(label)
//{
//	this.find(".loadmask-msg,.loadmask").remove();
//	this.removeClass("masked");
//	this.removeClass("masked-relative");
//	this.find("select").removeClass("masked-hidden");
//};
$.fn.showSelect = function(name)
{

	var options = "<option value=''>请选择</option>";

	var objData = KCPT.CodeManager[name];
	for ( var i = 0; i < objData.length; i++)
	{
		var odata = objData[i];
		var value = odata.code;
		var name = odata.name;

		options += "<option value='" + value + "'>" + name + "</option>";
	}
	$(this).append(options);

};

/**
 * 通用组件
 */

/*
 * **********************************************日期扩展完成
 */
/*
 * UTC-DATE转换、时间格式化 创建时间：2011/11/22 10:12 创建者：zhangming
 *
 * 示例： strToUtc("2011-11-22 10:12"); 返回： 1321927920000
 */
function strToUtc(dateStr)
{
	return new Date(dateStr.replace(/-/g, "/")).getTime();
}
/*
 * DATE时间格式化 创建时间：2011/11/22 10:12 创建者：zhangming
 *
 * 示例： var dateUTC = strToDate("2011-11-22 10:12");
 * dateFormat(dateUTC,"yyyy-MM-dd hh:mm"); 返回：2011-11-22 10:12
 */
function dateFormat(date, format)
{
	var o =
	{
		"M+" : date.getMonth() + 1,
		"d+" : date.getDate(),
		"h+" : date.getHours(),
		"m+" : date.getMinutes(),
		"s+" : date.getSeconds(),
		"q+" : Math.floor((date.getMonth() + 3) / 3),
		"S" : date.getMilliseconds()
	};
	if (/(y+)/.test(format))
	{
		format = format.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
	}
	for ( var k in o)
	{
		if (new RegExp("(" + k + ")").test(format))
		{
			format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));
		}
	}
	return format;
}
/*
 * UTC和date 转换
 */
date2utc = function(c_date)
{
	if (!c_date)
		return "";
	var tempArray = c_date.split("-");
	if (tempArray.length != 3)
	{
		alert("你输入的日期格式不正确,正确的格式:2000-05-01");
		return 0;
	}
	var date = new Date(tempArray[0], tempArray[1] - 1, tempArray[2], 00, 00, 01);
	return parseInt("" + date.getTime());
};
quarterDate2utc = function(c_date, quarterDate, t1, t2)
{
	if (!c_date)
		return "";
	var tempArray = c_date.split("-");
	if (tempArray.length != 3)
	{
		alert("你输入的日期格式不正确,正确的格式:2000-05-01");
		return 0;
	}
	var date = new Array();
	if (quarterDate == 0)
	{
		date[0] = new Date(tempArray[0], tempArray[1] - 1, tempArray[2], 00, 00, 00);
		date[1] = new Date(tempArray[0], tempArray[1] - 1, tempArray[2], 23, 59, 59);
	} else if (quarterDate == 1)
	{
		date[0] = new Date(tempArray[0], tempArray[1] - 1, tempArray[2], 00, 00, 00);
		date[1] = new Date(tempArray[0], tempArray[1] - 1, tempArray[2], 05, 59, 59);
	} else if (quarterDate == 2)
	{
		date[0] = new Date(tempArray[0], tempArray[1] - 1, tempArray[2], 06, 00, 00);
		date[1] = new Date(tempArray[0], tempArray[1] - 1, tempArray[2], 11, 59, 59);
	} else if (quarterDate == 3)
	{
		date[0] = new Date(tempArray[0], tempArray[1] - 1, tempArray[2], 12, 00, 00);
		date[1] = new Date(tempArray[0], tempArray[1] - 1, tempArray[2], 17, 59, 59);
	} else if (quarterDate == 4)
	{
		date[0] = new Date(tempArray[0], tempArray[1] - 1, tempArray[2], 18, 00, 00);
		date[1] = new Date(tempArray[0], tempArray[1] - 1, tempArray[2], 23, 59, 59);
	} else if (quarterDate == 4)
	{
		var t1t = c_date.split(":");
		var t2t = c_date.split(":");
		date[0] = new Date(tempArray[0], tempArray[1] - 1, tempArray[2], t1t[0] ? t1t[0] : 00, t1t[1] ? t1t[1] : 00, t1t[2] ? t1t[2] : 00);
		date[1] = new Date(tempArray[0], tempArray[1] - 1, tempArray[2], t2t[0] ? t2t[0] : 00, t2t[0] ? t2t[0] : 00, t2t[0] ? t2t[0] : 00);
	}
	return [ parseInt("" + date[0].getTime() / 1000), parseInt("" + date[1].getTime() / 1000) ];
};
/*
 * UTC和date 转换 开始时间 为 yyyy-mm-dd 00-00-00
 */
date2utcBegin = function(c_date)
{
	if (!c_date)
		return "";
	var tempArray = c_date.split("-");
	if (tempArray.length != 3)
	{
		alert("你输入的日期格式不正确,正确的格式:2000-05-01");
		return 0;
	}
	var date = new Date(tempArray[0], tempArray[1] - 1, tempArray[2], 00, 00, 00);
	return parseInt("" + date.getTime() / 1000);
};
/**jxf 2012-06-08 修改**/
dateToutcBegin = function(c_date)
{
	if (!c_date)
		return "";
	var tempArray = c_date.split("-");
	if (tempArray.length != 3)
	{
		alert("你输入的日期格式不正确,正确的格式:2000-05-01");
		return 0;
	}
	var date = new Date(tempArray[0], tempArray[1] - 1, tempArray[2], 00, 00, 00);
	return parseInt("" + date.getTime() );
};
/*
 * UTC和date 转换 开始时间 为 yyyy-mm-dd 23-59-59
 */
date2utcEnd = function(c_date)
{
	if (!c_date)
		return "";
	var tempArray = c_date.split("-");
	if (tempArray.length != 3)
	{
		alert("你输入的日期格式不正确,正确的格式:2000-05-01");
		return 0;
	}
	var date = new Date(tempArray[0], tempArray[1] - 1, tempArray[2], 23, 59, 59);
	return parseInt("" + date.getTime());
};
date2utcs = function(c_date)
{
	if (!c_date)
		return "";
	var number = c_date.split(" ");
	if(number == 1){
		date2utcEnd(c_date);
	}else{
		var tempArray2 = c_date.split(" ")[1].split(":");
		var tempArray = c_date.split(" ")[0].split("-");
		if (tempArray.length != 3)
		{
			// alert(c_date);
			alert("你输入的日期格式不正确,正确的格式:2000-05-01 23:23:23");
			return 0;
		}
		var date = new Date(tempArray[0], tempArray[1] - 1, tempArray[2], (tempArray2[0] ? tempArray2[0] : "00"), (tempArray2[1] ? tempArray2[1] : "00"), (tempArray2[2] ? tempArray2[2] : "00"));
	
		return parseInt("" + date.getTime() / 1000);
	}

};
// UTC和date 转换 精确到毫秒
date2utcm = function(c_date)
{
	if (!c_date)
		return "";
	var number = c_date.split(" ");
	if(number.length == 1){
		date2utcEnd(c_date);
	}else{
		var tempArray2 = c_date.split(" ")[1].split(":");
		var tempArray = c_date.split(" ")[0].split("-");
		if (tempArray.length != 3)
		{
			// alert(c_date);
			alert("你输入的日期格式不正确,正确的格式:2000-05-01 23:23:23");
			return 0;
		}
		var date = new Date(tempArray[0], tempArray[1] - 1, tempArray[2], (tempArray2[0] ? tempArray2[0] : "00"), (tempArray2[1] ? tempArray2[1] : "00"), (tempArray2[2] ? tempArray2[2] : "00"));

		return parseInt("" + date.getTime());
	}
};
date2utcsA = function(c_date)
{
	if (!c_date)
		return "";
	var number = c_date.split(" ");
	if(number.length == 1){
		date2utcEnd(c_date);
	}else{
		var tempArray2 = c_date.split(" ")[1].split(":");
		var tempArray = c_date.split(" ")[0].split("-");
		if (tempArray.length != 3)
		{
			// alert(c_date);
			alert("你输入的日期格式不正确,正确的格式:2000-05-01 23:23:23");
			return 0;
		}
		var date = new Date(tempArray[0], tempArray[1] - 1, tempArray[2], (tempArray2[0] ? tempArray2[0] : "00"), (tempArray2[1] ? tempArray2[1] : "00"), (tempArray2[2] ? tempArray2[2] : "00"));
	
		return parseInt("" + date.getTime());
	}
};
utc2Date = function(n_utc)
{
	if (!n_utc || n_utc == null || n_utc == "null" || n_utc == "无" || +n_utc == 0)
		return "";
	var date = new Date();
	date.setTime((parseInt(n_utc) + (8 * 3600 * 1000)));
	var s = date.getUTCFullYear() + "-";
	if ((date.getUTCMonth() + 1) < 10)
	{
		s += "0" + (date.getUTCMonth() + 1) + "-";
	} else
	{
		s += (date.getUTCMonth() + 1) + "-";
	}
	if (date.getUTCDate() < 10)
	{
		s += "0" + date.getUTCDate();
	} else
	{
		s += date.getUTCDate();
	}
	if (date.getUTCHours() < 10)
	{
		s += " 0" + date.getUTCHours() + ":";
	} else
	{
		s += " " + date.getUTCHours() + ":";
	}
	if (date.getMinutes() < 10)
	{
		s += "0" + date.getUTCMinutes() + ":";
	} else
	{
		s += date.getUTCMinutes() + ":";
	}
	if (date.getUTCSeconds() < 10)
	{
		s += "0" + date.getUTCSeconds();
	} else
	{
		s += date.getUTCSeconds();
	}

	return s;
};
/**
 * utc转成时间字符串
 */
utc2Datestr = function(n_utc) {
	if (!n_utc || n_utc == null || n_utc == "null" || n_utc == "无" || +n_utc == 0)
		return "";
	var date = new Date();
	date.setTime((parseInt(n_utc) + (8 * 3600 * 1000)));
	var s = date.getUTCFullYear() + "-";
	if ((date.getUTCMonth() + 1) < 10)
	{
		s += "0" + (date.getUTCMonth() + 1) + "-";
	} else
	{
		s += (date.getUTCMonth() + 1) + "-";
	}
	if (date.getUTCDate() < 10)
	{
		s += "0" + date.getUTCDate();
	} else
	{
		s += date.getUTCDate();
	}
	return s;
};
/**
 * 将字符串转换成utc
 */
str2Utc = function(c_date) {
	var tempArray = c_date.split(":");
	var hour = tempArray[0] * 3600000;
	var minute = tempArray[1] * 60000;
	var second = tempArray[2] * 1000;
	return parseInt(hour) + parseInt(minute) + parseInt(second);
};
tocolor = function(color)
{
	var rv = "";
	switch (color)
	{
	case "1":
		rv = "蓝色";
		break;
	case "2":
		rv = "黄色";
		break;
	case "3":
		rv = "黑色";
		break;
	case "4":
		rv = "白色";
		break;
	case "9":
		rv = "其他";
		break;
	default:
		rv = "";
		break;
	}
	return rv;
};
utcToDate = function(n_utc)
{
	if (!n_utc)
		return "";
	var date = new Date();
	date.setTime((parseInt(n_utc) + ((8 * 3600) * 1000)));

	var s = date.getUTCFullYear() + "-";
	if ((date.getUTCMonth() + 1) < 10)
	{
		s += "0" + (date.getUTCMonth() + 1) + "-";
	} else
	{
		s += (date.getUTCMonth() + 1) + "-";
	}
	if (date.getUTCDate() < 10)
	{
		s += "0" + date.getUTCDate();
	} else
	{
		s += date.getUTCDate();
	}

	return s;
};
// 获得两个日期字符串之间的天数差
daysBetween = function(startDate, endDate)
{
	// var sYear = startDate.substring(0, startDate.indexOf("-")),
	// sMonth = startDate.substring(5, startDate.lastIndexOf("-")),
	// sDay = startDate.substring(startDate.length,
	// startDate.lastIndexOf("-")+1),
	// eYear = endDate.substring(0, endDate.indexOf("-")),
	// eMonth = endDate.substring(5, endDate.lastIndexOf("-")),
	// eDay = endDate.substring(endDate.length, endDate.lastIndexOf("-")+1),
	// cha = ((Date.parse(sMonth+'/'+sDay+'/'+sYear) -
	// Date.parse(eMonth+'/'+eDay+'/'+eYear))/86400000);
	var cha = (Date.parse(startDate.replace("-", "/")) - Date.parse(endDate.replace("-", "/")));
	return Math.abs(cha) / 86400000;
};
compareDays = function(startDate, endDate){
	var startdate=startDate.split('-');
	var enddate=endDate.split('-');
		startdate=new Date(startdate[0],startdate[1],startdate[2]);
		enddate=new Date(enddate[0],enddate[1],enddate[2]);
		if(startdate > enddate){
			return true;
		}else{
			return false;
		}
};
//取今天 前一周的时间
getTodayPrecedeWeek = function(){
	var now = new Date();
 	var ls = new Date(now.getTime() - 1000 * 60 * 60 * 24 * 7);
	var date= ls.getUTCFullYear()+"-"+(ls.getMonth()+1)+"-"+ls.getDate();
	return date;
};
//取昨天前一周的时间
getYesterdayPrecedeWeek = function(){
	var now = new Date();
 	var ls = new Date(now.getTime() - 1000 * 60 * 60 * 24 * 7);
	var date= ls.getUTCFullYear()+"-"+(ls.getMonth()+1)+"-"+ls.getDate();
	return date;
};
//获取昨天时间
getYesterday =function(){
	var now = new Date();
 	var ls = new Date(now.getTime() - 1000 * 60 * 60 * 24);
	var date= ls.getUTCFullYear()+"-"+(ls.getMonth()+1)+"-"+ls.getDate();
	return date;
};
//获取昨天的月初时间
getYesterdayPrecedeMonth =function(){
	var now = new Date();
 	var ls = new Date(now.getTime() - 1000 * 60 * 60 * 24);
	var date= ls.getUTCFullYear()+"-"+(ls.getMonth()+1)+"-1";
	return date;
};
// 调度信息状态图标
getScheduleStatusImg = function(status)
{
	var statusImg = "images/openwindow/";
	if (status == "1")
		statusImg += "sended.png";
	else
		statusImg += "received.png";
	return statusImg;
};
// 调度信息状态描述
getScheduleStatusDesc = function(status)
{
	// 发送状态-1等待回应,0:成功,1 设备返回失败,2 发送失败,3 设备不支持此功能,4 设备不在线
	var statusDesc = "";
	if (status == "-1")
		statusDesc = "等待回应";
	if (status == "0")
		statusDesc = "成功";
	if (status == "1")
		statusDesc = "设备返回失败";
	if (status == "2")
		statusDesc = "发送失败";
	if (status == "3")
		statusDesc = "设备不支持此功能";
	if (status == "4")
		statusDesc = "设备不在线";

	return statusDesc;
};
var alarmCodeList =
{
	isLoad : false
};
// 转换车辆报警类型描述
getAlarmTypeDesc = function(code)
{
	var alarmTypeDesc = "";
	if (!alarmCodeList.isLoad)
	{
		alarmCodeList.isLoad = true;
		JAjax("entbusiness/findAllSysAlarmType.action",
		{}, 'json', function(data, err)
		{
			$(data).each(function(i)
			{
				alarmCodeList[this.alarmCode] = this.alarmName;
			});
		}, function(data, err)
		{

		});
	} else
	{
		alarmTypeDesc = alarmCodeList[code];
	}
	return alarmTypeDesc == undefined ? "" : alarmTypeDesc;
};
// 获取车辆报警类型图标
getAlarmTypeImg = function(code)
{
	var alarmTypeImg = "images/alarmLevel/level" + code + ".png";
	if (!code || ('012').indexOf(code) < 0)
		alarmTypeImg = "images/alarmLevel/level0.png";
	if (code == "stop")
		alarmTypeImg = "images/alarmLevel/stopPoint.png";
	// if (code == "0")
	// alarmTypeImg += code;
	// else if (code == "1")
	// alarmTypeImg = "images/map/dangeroranger.png";
	// else if (code == "2")
	// alarmTypeImg = "images/map/dangeroranger.png";
	// else if (code == "stop")
	// alarmTypeImg = "images/map/dangeroranger.png";
	// else
	// alarmTypeImg = "images/map/dangeroranger.png";
	return alarmTypeImg;
};
// 车牌颜色转码
getPlateColor = function(plateId)
{
	var plateDesc = "";
	if (plateId == "")
	{
		plateDesc = "";
	} else
	{

		plateDesc = KCPT.CodeManager.getNameByCode("SYS_VCL_PLATECOLOR", plateId);
	}
	return plateDesc ? plateDesc : "";
};
// 获取车辆方向描述,正北为0,顺时针方向
function getCarDirectionDesc(direction, deflection)
{
	var desc = "";
	direction = parseFloat(direction);
	if(direction == 360) direction = 0;
	
	if (255 < direction && direction <= 285)
		desc = "正西";
	else if (285 < direction && direction <= 345)
		desc = "西北";
	else if (345 < direction || direction <= 15)
		desc = "正北";
	else if (15 < direction && direction <= 75)
		desc = "东北";
	else if (75 < direction && direction <= 105)
		desc = "正东";
	else if (105 < direction && direction <= 165)
		desc = "东南";
	else if (165 < direction && direction <= 195)
		desc = "正南";
	else if (195 < direction && direction <= 255)
		desc = "西南";
	else
		desc = "未知";
	return desc;
};
//弹出tip框的5种状态
getCarStatusText = function(ifOnline,speed,alarmStatus)
{
	var temp = "<span style='color:#00fe1d;'>未知</span>";
	if ((typeof (ifOnline) == "string" && (ifOnline == "false" || ifOnline == "0"))||ifOnline==0){
		temp = "<span style='color:#ffc90e;'>离线</span>";
	}else if ((typeof (ifOnline) == "string" && (ifOnline == "true" || ifOnline == "1"))||ifOnline==1){
//		if(alarmStatus) {
//			temp = "<span style='color:#00fe1d;'>告警</span>";
//		}else if(speed<50){
//			temp = "<span style='color:#00fe1d;'>停靠</span>";
//		}else if(speed>700){
//			temp = "<span style='color:#00fe1d;'>预警</span>";
//		}else{
		temp = "<span style='color:#00fe1d;'>在线</span>";
//		}
	}
	return temp;
};
// 获取车辆方向图标
getCarDirectionIcon = function(direction, ifOnline,speed, markerIconType, alarmStatus)
{
	var icon = "images/vehicleDirection/new/";
	direction = parseFloat(direction);
	if(direction == 360) direction = 0;
	
	switch (markerIconType){
		case "cluster":
			icon += "c-";
			break;
		case "user":
			icon += "";
			break;
		default:
			icon += "";
			break;
	}

	if(markerIconType=="alarm"||alarmStatus) {
		icon += "a-online-";
	}else if ((typeof (ifOnline) == "string" && (ifOnline == "false" || ifOnline == "0"))||ifOnline==0){
		icon += "offline-";
	}else if ((typeof (ifOnline) == "string" && (ifOnline == "true" || ifOnline == "1"))||ifOnline==1){
		if(markerIconType!="cluster"&&speed<50){
			icon += "stop-";
		}else if(markerIconType!="cluster"&&speed>700){
			icon += "warning-";
		}else{
			icon += "online-";
		}
	}

	if (15 > direction || direction >= 345)
		icon += "0";
	else if (15 <= direction && direction < 45)
		icon += "30";
	else if (45 <= direction && direction < 75)
		icon += "60";
	else if (75 <= direction && direction < 105)
		icon += "90";
	else if (105 <= direction && direction < 135)
		icon += "120";
	else if (135 <= direction && direction < 165)
		icon += "150";
	else if (165 <= direction && direction < 195)
		icon += "180";
	else if (195 <= direction && direction < 225)
		icon += "210";
	else if (225 <= direction && direction < 255)
		icon += "240";
	else if (255 < direction && direction < 285)
		icon += "270";
	else if (285 <= direction && direction < 315)
		icon += "300";
	else if (315 <= direction && direction < 345)
		icon += "330";
	else
		icon += "0";
	icon += ".png";//(markerIconType == "alarm" || alarmStatus ? ".gif" : ".png");
	return icon;
};

var oldDirection = 0;
//根据前后坐标点的值计算车辆方向图标，轨迹回放用到
getCarDirectionIconByLngLat = function(lonlatArr, direction, ifOnline, markerIconType)
{
	var icon = "images/vehicleDirection/new/";
	var x1 = parseFloat(lonlatArr[0]),
		y1 = parseFloat(lonlatArr[1]),
		x2 = parseFloat(lonlatArr[2]),
		y2 = parseFloat(lonlatArr[3]);
	if (typeof (ifOnline) == "string" && (ifOnline == "true" || ifOnline == "1"))
		icon += (markerIconType == "cluster" ? "c-online-" : "online-");
	else if (typeof (ifOnline) == "string" && (ifOnline == "false" || ifOnline == "0"))
		icon += (markerIconType == "cluster" ? "c-offline-" : "offline-");
	else
		icon += (markerIconType == "cluster" ? "c-offline-" : "offline-");

	if(Math.abs(direction - oldDirection) < 30)
		direction = oldDirection;
	if (15 > direction || direction >= 345)
		icon += "0";
	else if (15 <= direction && direction < 45)
		icon += "30";
	else if (45 <= direction && direction < 75)
		icon += "60";
	else if (75 <= direction && direction < 105)
		icon += "90";
	else if (105 <= direction && direction < 135)
		icon += "120";
	else if (135 <= direction && direction < 165)
		icon += "150";
	else if (165 <= direction && direction < 195)
		icon += "180";
	else if (195 <= direction && direction < 225)
		icon += "210";
	else if (225 <= direction && direction < 255)
		icon += "240";
	else if (255 < direction && direction < 285)
		icon += "270";
	else if (285 <= direction && direction < 315)
		icon += "300";
	else if (315 <= direction && direction < 345)
		icon += "330";
	else
		icon += "0";
	icon += ".png";
	return icon;
};

validateText = function(text)
{
	if (text)
		return true;
	else
		return false;
};

/**
 * 验证字符长度
 */
function validateCharLength(str)
{
	var l = 0;
	var chars = str.split("");
	for ( var i = 0; i < chars.length; i++)
	{
		if (chars[i].charCodeAt(0) < 299)
			l++;
		else
			l += 2;
	}
	return l;
};

/**
 * 检查是否手机号,13/15/18开头
 *
 * @param {Object}
 *            _string
 */
function isTelphone(_string)
{
	// var istel = /^13\d{9}$/g.test(_string) || /^15[8,9]\d{8}$/g.test(_string)
	// || /^18\d{9}$/g.test(_string);
	var istel = /^[0-9]\d{10}$/g.test(_string);
	return istel;
};

function displaySubMenu(li)
{
	var subMenu = li.getElementsByTagName("ul")[0];
	if (subMenu)
	{
		subMenu.style.display = "block";
	}
	// $(subMenu).show("show");
};
function hideSubMenu(li)
{
	var subMenu = li.getElementsByTagName("ul")[0];
	if (subMenu)
	{
		subMenu.style.display = "none";
	}
	// $(subMenu).hide("slow");
};

function getJsonLength(json)
{
	var len = 0;
	if (Boolean(json))
	{
		for (i in json)
			len++;
	}
	return len;
};
/**
 * 判断数组中是否包含传入的值
 *
 * @param elem
 * @param array
 * @return
 */
var inArray = function(elem, array)
{
	for ( var i = 0, length = array.length; i < length; i++)
		if (array[i] == (elem + ""))
			return i;

	return -1;
};

// 指令收发记录触发点
var ActionRecordsAnchor = function()
{
	this.container = $("#actionRecordsAnchor");
	// this.container.draggable({
	// cursor : 'move',
	// containment : $("#mainDiv")
	// });
	this.container.find("img").click(function()
	{
		if (!KCPT.ActionRecordsObj)
		{
			KCPT.ActionRecordsObj = new ActionRecords();
		}
	});
};
// 显示遮罩
// i 为false时隐藏 true 显示
function mask(id, l, i)
{
	if (!l)
	{
		l = "&nbsp;";
	}
	if (i)
	{
		$("#" + id).loadMask(l);
	} else
	{
		$("#" + id).unLoadMask(l);
	}
};

// 分析是那种浏览器的方法
function InterNetType()
{

	var Sys = {};
	var ua = window.navigator.userAgent.toLowerCase();
//	if (window.ActiveXObject)
//	{
//		Sys.ie = ua.match(/msie ([\d.]+)/)[1];
//	}
//	else if (window.opera)
//	{
//		Sys.opera = ua.match(/opera.([\d.]+)/)[1];
//	}
//	else if (document.getBoxObjectFor)
//	{
//		Sys.firefox = ua.match(/firefox\/([\d.]+)/)[1];
//	}
//	else if (window.openDatabase)
//	{
//		Sys.safari = ua.match(/version\/([\d.]+)/)[1];
//	}
//	else if (window.MessageEvent && !document.getBoxObjectFor && !window.openDatabase)
//	{
//		Sys.chrome = ua.match(/chrome\/([\d.]+)/)[1];
//	} 
	var s;
	(s = ua.match(/msie ([\d.]+)/)) ? Sys.ie = s[1] :  
    (s = ua.match(/firefox\/([\d.]+)/)) ? Sys.firefox = s[1] :  
    (s = ua.match(/chrome\/([\d.]+)/)) ? Sys.chrome = s[1] :  
    (s = ua.match(/opera.([\d.]+)/)) ? Sys.opera = s[1] :  
    (s = ua.match(/version\/([\d.]+).*safari/)) ? Sys.safari = s[1] : 0;
	return Sys;
};

// 获得高度的方法屏蔽不用浏览器之间的差异
getHeightAndWidth = function()
{
	var center =
	{};
	if(!KCPT.body){
		KCPT.body = $("#fullbody");
	}
	
	var width = document.documentElement.clientWidth;
	var height = document.documentElement.clientHeight;
	if(width >= KCPT.min_width&&height >= KCPT.min_height){
		KCPT.body.css('overflow-y','hidden');
		KCPT.body.css('overflow-x','hidden');
		width = document.documentElement.clientWidth;
		height = document.documentElement.clientHeight;
	}else if(width >= KCPT.min_width&&height < KCPT.min_height){
		KCPT.body.css('overflow-y','hidden');
		width = document.documentElement.clientWidth - 18;
		height = KCPT.min_height;
	}else if(width < KCPT.min_width&&height >= KCPT.min_height){
		KCPT.body.css('overflow-x','hidden');
		width = KCPT.min_width;
		height = document.documentElement.clientHeight - 18;
	}else if(width < KCPT.min_width&&height < KCPT.min_height){
		width = KCPT.min_width;
		height = KCPT.min_height;
	}
	
	if (!KCPT.headerHeight)
	{
		KCPT.headerHeight = $("#header").find("div.kcpt_top").height();
	}
	if (!KCPT.footerHeight)
	{
		KCPT.footerHeight = $("#footer").height();
	}
	if($("#homeLeftDiv").css("display") == "none"){
		KCPT.leftTreeWidth = 0;
	}else{
		KCPT.leftTreeWidth = $("#homeLeftDiv").width();
	}
	KCPT.body.css('overflow-y','auto');
	KCPT.body.css('overflow-x','auto');
	var sys = InterNetType();
	if (sys.ie)
	{
		center.width = width - KCPT.leftTreeWidth;

		center.height = height - KCPT.headerHeight - 4 - KCPT.footerHeight;
		return center;
	} else if (sys.firefox)
	{

		center.width = width - KCPT.leftTreeWidth;
		center.height = height - KCPT.headerHeight - 4 - KCPT.footerHeight;

		return center;
	} else if (sys.chrome || sys.safari)
	{
		center.width = width - KCPT.leftTreeWidth;
		center.height = height - KCPT.headerHeight - 4 - KCPT.footerHeight;

		return center;
	}

};
// 根据浏览器类型不同加载不同的css样式用来屏蔽不同的浏览器造成的差异
loadCssUtil = function()
{
	var sys = InterNetType();

	if (sys.ie)
	{
		initialize();
	} else
	{
		initialize("NOTIE");
	}
};

function getRealtimeAlarmPosition(thisObj, vid)
{
	JAjax("monitor/findVehicleLocal.action?requestParam.equal.vid=" + vid + "",
	{}, 'json', function(data, err)
	{
		var _address = "";
		if (undefined != data[0])
		{
			_address = data[0].address;
		} else
		{
			_address = "未知位置";
		}
		var span = $("<span>");
		$(span).addClass("cutText").width(280).text(_address).attr("title", _address);
		$(thisObj).parent().append($(span));
		$(thisObj).hide();
		var showTimer = setInterval(function()
		{
			$(thisObj).parent().find("span").remove();
			$(thisObj).show();
			clearInterval(showTimer);
		}, 20000);
	}, function(data, err)
	{
		var span = $("<span>");
		$(span).addClass("cutText").width(280).text("未知位置").attr("title", "未知位置");
		$(thisObj).parent().append($(span));
		$(thisObj).hide();
		var showTimer = setInterval(function()
		{
			$(thisObj).parent().find("span").remove();
			$(thisObj).show();
			clearInterval(showTimer);
		}, 20000);
	});
};
filtrates = function(value)
{
	if (!value)
		return true;

	var result = true;
	var str = "/,{,},(,)";
	var arr = str.split(",");
	for ( var i = 0; i < arr.length; i++)
	{
		if (!(value.indexOf(arr[i]) == -1))
		{
			result = false;
			break;
		}
	}
	return result;
};
// 格式 化时间 ：秒转时分秒形式
formatTime = function(Stime){
	var result = "";
	var isNegative =false;
	var NumTime = Number(Stime);
	if(NumTime<0){
		NumTime=Math.abs(NumTime);
		isNegative=true;
	}
	var hours = NumTime / 3600;
	hours = Math.floor(hours);
	if (hours != 0)
	{
		if(hours<10){
			result ="0"+hours + ":";
		}else{
			result = hours + ":";
		}
	}else{
		result = "00:";
	}
	var minus = NumTime % 3600;
	var minu = minus / 60;
	minu = Math.floor(minu);
	if (minu != 0)
	{
		if(minu<10){
			result = result +"0"+ minu + ":";
	    }else{
			result = result + minu + ":";
	    }
	}else{
		result = result + "00:";
	}
	var second = minus - minu * 60;
	if(second!=0){
		if(second<10){
			result = result +"0"+ second;
		}else{
			result = result + second;
		}
 	}else{	
		result = result + "00";
	}
	if(isNegative){
		result ="-"+result;
	}
	return result;
};

//格式 化时间 ：HH：MM：SS形式
formatTime2 = function(Stime)
{
	var result = "";
	var isNegative =false;
	var NumTime = Number(Stime);
	if(NumTime<0){
		NumTime=Math.abs(NumTime);
		isNegative=true;
	}
	var hours = NumTime / 3600;
	hours = Math.floor(hours);
	if (hours != 0)
	{
		if(hours<10){
			result ="0"+hours + ":";
		}else{
			result = hours + ":";
		}
	}else{
		result = "00:";
	}
	var minus = NumTime % 3600;
	var minu = minus / 60;
	minu = Math.floor(minu);
	if (minu != 0)
	{
		if(minu<10){
			result = result +"0"+ minu + ":";
	    }else{
			result = result + minu + ":";
	    }
	}else{
		result = result + "00:";
	}
	var second = minus - minu * 60;
	if(second!=0){
		if(second<10){
			result = result +"0"+ second;
		}else{
			result = result + second;
		}
 	}else{	
		result = result + "00";
	}
	if(isNegative){
		result ="-"+result;
	}
	return result;
};

// 报表页面过滤数据
// 7月5日去掉滤负值
FilterData = function(data, isTime)
{
	var result = "";
	var NumData = Number(data);
	if (NumData == 999999999)
	{
		result = "--";
	} else
	{
		if (isTime)
		{
			result = formatTime(data);
		} else
		{
			result = data;
		}
	}
	return result;
};
//报表页面过滤数据
//7月5日去掉滤负值
FilterData2 = function(data, isTime)
{
	var result = "";
	var NumData = Number(data);
	if (NumData == 999999999)
	{
		result = "--";
	} else
	{
		if (isTime)
		{
			result = formatTime(data);
		} else
		{
			result = data;
		}
	}
	return result;
};
//过滤百分数
FilterData1 = function(data, isTime)
{
	var result = "";
	var NumData = Number(data);
	if (NumData < 0 )
	{
		result = "0%";
	}
	else if(NumData == 999999999){
		result = "--";
	}
	else
	{
		if (isTime)
		{
			result = formatTime(data);
		} else
		{
			result = data+"%";
		}
	}
	return result;
};
//报表页面过滤数据 将时间转化为HH：MM：SS形式
FilterData3 = function(data, isTime)
{
	var result = "";
	var NumData = Number(data);
	if (NumData < 0 || NumData == 999999999)
	{
		result = "--";
	} else
	{
		if (isTime)
		{
			result = formatTime2(data);
		} else
		{
			result = data;
		}
	}
	return result;
};
//取月的最后一天
getMonthLastDay = function (dat)        
{        
var year=dat.substring(0,4);
var month=dat.substring(5,7);
 var new_year = Number(year);    
 var new_month = Number(month);
 new_month++;
 if(new_month>12)                  
 {        
  new_month -=12;              
  new_year++;              
  } 
 var new_date = new Date(new_year,month,1,0,0,0); 
 dat=dat+"-"+(new Date(new_date.getTime()-1000*60)).getDate();
 return dat;    
};   


//--------------------------------------------------------------------------------------------------------------------------------------------------------------------

/**
 * 定时轮询平台实时查岗和报文信息 返回0为查岗,1为报文 新增实时的
 */
PlatformInspectAndMessage = function() {
	
	var now = dateFormat(new Date(), "yyyy-MM-dd hh:mm:ss");
	var promtStartTime = date2utcsA(now) - 1800000;
	var c = {
		inspectLastTime : promtStartTime,
		messageLastTime : promtStartTime,
		utc : promtStartTime,
		utcyujing : promtStartTime,
		yujingx : 0,
		yujingy : 0,
		dubanx : 0,
		dubany : 0
	}, poplayer = {
		position : "absolute",
		width : 'auto',
		height : 'auto',
		// left : 900,
		left : $(window).width() - 260,
		top : $(window).height() - 180-32,
		zIndex : 3800
	};

	var alarmWinList = new Array;//报警弹窗列表，缓存弹出窗口的ID，用于超时移除
	var platformInspectInterval=null;//查岗清除定时器
	var platformInterval=null;//报文清除定时器
//	var vehicleAlarmtodoInterval=null;//督办清除定时器
//	var vehicleAlarmYuJingInterval=null;//预警弹窗清除定时器

	//各类型弹出框轮询间隔与清除时间间隔定义

	//报文
	var selectTimer_Platform=60000; //查岗和报文的轮询间隔一致
	var cleanTimer_Platform=20000;

	//查岗
	var cleanTimer_Inspect=1800000;

	//督办
//	var selectTimer_Alarmtodo=5000;
//	var cleanTimer_Alarmtodo=4000;

	//预警
//	var selectTimer_AlarmYuJing=9000;
//	var cleanTimer_AlarmYuJing=7000;

	var f = {

		platformInspectAndMessage : function() {// 平台报文,查岗
			var url = "accord/findThPlatInfosByObjectId.action", param = {
				"requestParam.equal.entId" : KCPT.user.entId,
				"requestParam.equal.objectId" : KCPT.user.businessLicense,
				"requestParam.equal.inspectUtc" : c.inspectLastTime,//报文最新时间
				"requestParam.equal.messageUtc" : c.messageLastTime//, //查岗最新时间
				//"requestParam.like.messageContent":"手工查岗"//手工查岗
			};
			f.ajaxFun(url, param);
		},
//		vehicleAlarmtodo : function() {// 获取实时督办
//			var url = "accord/findThVehicleAlarmtodoByUTC.action", param = {
//				"requestParam.equal.entId" : KCPT.user.entId,
//				"requestParam.equal.utc" : c.utc
//			};
//			f.ajaxFunAlarmtodo(url, param);
//		},
//		vehicleAlarmYuJing : function() {// 获取实时预警
//			var url = "accord/findWarningByUtc.action", param = {
//				"requestParam.equal.corpId" : KCPT.user.entId,
//				"requestParam.equal.timeStamp" : c.utcyujing
//			};
//			f.ajaxFunYuJing(url, param);
//		},
		//实时弹出督办信息
//		compileBubbleTipFunAlarmtodo : function(data) {
//			if (data && data.length > 0) {
//				c.dubanx=0;
//				c.dubany=0;
//
//				//先清除之前的定时器，再启用新的
//				if(vehicleAlarmtodoInterval)
//				{
//					clearInterval(vehicleAlarmtodoInterval);
//				}
//
//				for ( var i = 0; i < data.length; i++) {
//					c.dubanx += 20;
//					c.dubany += 20;
//					var html = f.createHtmlAlarmtodo(data[i]);
//
//					var id = "duban" + parseInt(Math.random()*10000000000);
//					var popwin = $("<div>");
//					popwin.css({
//						"position" : poplayer.position,
//						"width" : poplayer.width,
//						"height" : poplayer.height,
//						"left" : poplayer.left - c.dubanx - 300 - 380,
//						"top" : poplayer.top - c.dubany,
//						"z-index" : poplayer.zIndex
//					});
//
//					popwin.attr("id", id);
//					popwin.attr("class", "forClose");
//					popwin.html(html);
//					$("#mainDiv").append(popwin);
//					popwin.draggable({
//						cursor : 'move',
//						containment : $("#mainDiv")
//					});
//
//					alarmWinList.push({id:id,type:"duban"});
//
//					$(popwin).find("div#dubanClose").click(function() {
//						c.dubanx -= 20;
//						c.dubany -= 20;
//						$(this).parents("div.ui-draggable").remove();
//					}).end();
//				}
//
//
//				//启用定时器  8秒自动清除
//				vehicleAlarmtodoInterval=setInterval(function(){
//					if (alarmWinList && alarmWinList.length>0)
//					{
//						$(alarmWinList).each(function(i) {
//							if("duban"==this.type)
//							{
//						       if(this.id && $("#"+this.id))
//							   {
//							  	   $("#"+this.id).remove();
//							    }
//							}
//						});
//					}
//				}, cleanTimer_Alarmtodo);
//
//			}
//		},
		//实时弹出报警预警信息
//		compileBubbleTipYuJing : function(data) {
//			if (data && data.length > 0)
//			{
//				//关闭之前的定时器
//				if(vehicleAlarmYuJingInterval){
//					clearInterval(vehicleAlarmYuJingInterval);
//				}
//				c.yujingx = 0;
//				c.yujingy = 0;
//				for ( var i = 0; i < data.length; i++) {
//					c.yujingx += 20;
//					c.yujingy += 20;
//					var html = f.createHtmlYuJing(data[i]);
//
//					var id = "yujing" + parseInt(Math.random()*100000000);
//					var popwin = $("<div>");
//					popwin.css({
//						"position" : poplayer.position,
//						"width" : poplayer.width,
//						"height" : poplayer.height,
//						"left" : poplayer.left - c.yujingx - 300,
//						"top" : poplayer.top - c.yujingy,
//						"z-index" : poplayer.zIndex
//					});
//					popwin.attr("id", id);
//					popwin.attr("class", "forClose");
//					popwin.html(html);
//					$("#mainDiv").append(popwin);
//					popwin.draggable({
//						cursor : 'move',
//						containment : $("#mainDiv")
//					});
//					alarmWinList.push({id:id,type:"yujing"});
//					$(popwin).find("div#yujingClose").bind('click', function() {
//						c.yujingx -= 20;
//						c.yujingy -= 20;
//						$(this).parents("div.ui-draggable").remove();
//					}).end();
//				}
//
//
//				//预警清除定时器
//				vehicleAlarmYuJingInterval=setInterval(function(){
//					if (alarmWinList && alarmWinList.length>0)
//					{
//						$(alarmWinList).each(function(i) {
//							if("yujing"==this.type)
//							{
//						       if(this.id && $("#"+this.id))
//							   {
//							  	   $("#"+this.id).remove();
//							    }
//							}
//						});
//					}
//				}, cleanTimer_AlarmYuJing);
//
//			}
//		},
		//实时弹出报文和查岗信息
		compileBubbleTip : function(data) {
			if(platformInterval)
			{
				 clearInterval(platformInterval);
			}

			if(platformInspectInterval)
			{
				 clearInterval(platformInspectInterval);
		    }

			if (data && data["inspect"] && data["inspect"].length > 0) {
				$(data["inspect"]).each(function() {
					//记录查岗的最后一条的时间时间
					if(this && this.utc)
					{
					  if(c.inspectLastTime==this.utc)
					  {
						  c.inspectLastTime=(parseInt(c.inspectLastTime)+1);
					  }else
					  {
						  $(alarmWinList).each(function(i) {
								if("inspect"==this.type)
								{
							       if(this.id && $("#"+this.id))
								   {
								  	   $("#"+this.id).remove();
								   }
								}
							});
						  f.createDiv(this, "inspect");// 查岗
						  c.inspectLastTime=this.utc;
					  }
					}

				});
			}
			if (data && data["message"] && data["message"].length > 0) {
				$(data["message"]).each(function() {

					//记录查岗的最后一条的时间时间
					if(this && this.utc)
					{
						 if(c.messageLastTime==this.utc)
						  {
							   c.messageLastTime=(parseInt(c.messageLastTime)+1);
						  }else
						  {
							  f.createDiv(this, "message");// 报文
							  c.messageLastTime=this.utc;
						  }
					}
				});
			}

			//报文清除定时器
			platformInterval=setInterval(function(){
				if (alarmWinList && alarmWinList.length>0)
				{
					$(alarmWinList).each(function(i) {
						if("message"==this.type)
						{
					       if(this.id && $("#"+this.id))
						   {
						  	   $("#"+this.id).remove();
						    }
						}
					});
				}
			}, cleanTimer_Platform);

			//查岗清除定时器
			platformInspectInterval=setInterval(function(){
				if (alarmWinList && alarmWinList.length>0)
				{
					$(alarmWinList).each(function(i) {
						if("inspect"==this.type)
						{
					       if(this.id && $("#"+this.id))
						   {
						  	   $("#"+this.id).remove();
						   }
						}
					});
				}
			}, cleanTimer_Inspect);

		},
		createDiv : function(inspectParam, type) {
			var popwin = $("<div>");
			popwin.css({
				"position" : poplayer.position,
				"width" : poplayer.width,
				"height" : poplayer.height,
				"left" : (type == "inspect" ? ($(window).width()/2-130) : poplayer.left),
				//"top" : poplayer.top - (type == "inspect" ? 180 : 0),
				"top" : (type == "inspect" ? ($(window).height()/2-90) : poplayer.top),
				"z-index" : poplayer.zIndex
			});

			var id = type + parseInt(Math.random()*10000);
			$(popwin).attr("id",id);
			alarmWinList.push({id:id,type:type});
			var html = f.createHtml(type, inspectParam);
			popwin.html(html);
			$("#mainDiv").append(popwin);
			popwin.draggable({
				cursor : 'move',
				containment : $("#mainDiv")
			});

			$(popwin)
					.find("div.PlaformChagang_Popup_top_close")
					.click(function() {
						$(popwin).remove();
					})
					.end()
					.find("div.inspectBack")
					.click(
							function() {
								var answer = $(popwin).find("input[name=inspectAnswer]").val();
								var loading = '<div class="PlaformChagang_Popup_main_answer_4">提交答案……</div>'
										+ '<div class="PlaformChagang_Popup_main_answer_loading">'
										+ '<img width="16" height="16" src="images/tipWindow/chagang_loading.gif"></div>';

								$(popwin).find("div.inspectBack").replaceWith(loading);
								f.answerInspect(answer, inspectParam,$(popwin));
							});
		},
		answerInspect : function(answer,inspectParam,ldObj) {

			JAjax(
					"accord/modify.action",
					{
						"result" : answer,
						"pid" : inspectParam.pid,
						"resultOp" : KCPT.user.opLoginname,
						"businessLicense" : KCPT.user.businessLicense,
						"userId" : KCPT.user.opId,
						"opName":KCPT.user.opName,//用户名
						"objectId" : KCPT.user.businessLicense
					},
					'json',
					function(data, err) {
						if ("0"==data) {// success
							// ldObj.close();
							ldObj
									.find(
											"div.PlaformChagang_Popup_main_answer_4")
									.replaceWith(
											'<div class="PlaformChagang_Popup_main_answer_5">回复成功，请关闭窗口！</div>')
									.end()
									.find(
											"div.PlaformChagang_Popup_main_answer_loading")
									.remove();
							setTimeout(function() {
								ldObj.remove();
							}, 2000);
						} else {// fail
							// ldObj.close();
							ldObj
									.find(
											"div.PlaformChagang_Popup_main_answer_4")
									.replaceWith(
											'<div class="PlaformChagang_Popup_main_answer_5">回复失败，请关闭窗口！</div>')
									.end()
									.find(
											"div.PlaformChagang_Popup_main_answer_loading")
									.remove();
							setTimeout(function() {
								ldObj.remove();
							}, 2000);
						}
					}, function(data, err) {
						alert("获取平台实时查岗或报文失败");
					});
		},
//		createHtmlAlarmtodo : function(data) {
//			var type = "未知";
//			if (data["wanType"]) {
//				type = getAlarmTypeDesc(data["wanType"]);
//			}
//			var html = [
//					'<div class="PlatformChagang_PopUp_box">',
//					'<div class="PlaformChagang_Popup_top">',
//					'<label class="L">报警督办</label>',
//					'<div class="PlaformChagang_Popup_top_close" id="dubanClose">',
//					'<img src="images/tipWindow/PlaformChagang_Popup_top_close.jpg">',
//					'</div>',
//					'</div>',
//					'<div class="PlaformChagang_Popup_main">',
//					'<div class="PlaformChagang_Popup_main_answer" style="margin-top:15px;">报警时间：'
//							+ utc2Date(data["warUtc"]) + '</div>',
//					'<div class="PlaformChagang_Popup_main_answer_2">报警车辆：'
//							+ data["vehicleno"] + ' &nbsp; ',
//					'</div>',
//					'<div class="PlaformChagang_Popup_main_answer_2">报警类型：'
//							+ type + ' &nbsp; ',
//					'</div>',
//					'<div class="PlaformChagang_Popup_main_answer_2">督办时间：'
//							+ utc2Date(data["utc"]) + '</div>',
//					'<div class="PlaformChagang_Popup_main_answer_2">截止时间：'
//							+ utc2Date(data["supervisionEndUtc"]) + ' &nbsp; ',
//					'</div>', '</div>', '</div>'
//
//			];
//			return html.join("");
//		},
//		createHtmlYuJing : function(data) {
//			var alarmSouce = "未知";
//			if (parseInt(data["alarmFrom"]) == 1) {
//				alarmSouce = "车载终端";
//			} else if (parseInt(data["alarmFrom"]) == 2) {
//				alarmSouce = "企业监控平台";
//			} else if (parseInt(data["alarmFrom"]) == 3) {
//				alarmSouce = "政府监管平台";
//			} else if (parseInt(data["alarmFrom"]) == 9) {
//				alarmSouce = "其他";
//			}
//
//			var type = "未知";
//			/*if (data["alarmType"]) {
//				type = getAlarmTypeDesc(data["alarmType"]);
//			} 原有的方式*/
//			var alarmType=data["alarmType"];
//			if(1==alarmType)
//			{
//			     type="超速报警";
//			}else if(2==alarmType)
//			{
//				 type="疲劳驾驶报警";
//			}else if(3==alarmType)
//			{
//				 type="紧急报警";
//			}else if(4==alarmType)
//			{
//				 type="进入指定区域报警";
//			}else if(5==alarmType)
//			{
//				 type="离开指定区域报警";
//			}else if(6==alarmType)
//			{
//				 type="路段堵塞报警";
//			}else if(7==alarmType)
//			{
//				 type="危险路段报警";
//			}else if(8==alarmType)
//			{
//				 type="越界报警";
//			}else if(9==alarmType)
//			{
//				 type="盗警";
//			}else if(10==alarmType)
//			{
//				 type="劫警";
//			}else if(11==alarmType)
//			{
//				 type="偏移路线报警";
//			}else if(12==alarmType)
//			{
//				 type="车辆移动报警";
//			}else if(13==alarmType)
//			{
//				 type="超时驾驶报警";
//			}else if(14==alarmType)
//			{
//				 type="其他报警";
//			}
//
//
//			/*var html = [
//					'<div class="PlatformChagang_PopUp_box">',
//					'<div class="PlaformChagang_Popup_top">',
//					'<label class="L">报警预警</label>',
//					'<div class="PlaformChagang_Popup_top_close" id="yujingClose">',
//					'<img src="images/tipWindow/PlaformChagang_Popup_top_close.jpg">',
//					'</div>',
//					'</div>',
//					'<div class="PlaformChagang_Popup_main">',
//					'<div class="PlaformChagang_Popup_main_answer" style="margin-top:15px;">报警时间：'
//							+ utc2Date(data["alarmTime"]) + '</div>',
//					'<div class="PlaformChagang_Popup_main_answer_2">报警车辆：'
//							+ data["vehicleNo"] + ' &nbsp; ',
//					'<div class="PlaformChagang_Popup_main_answer_2">报警类型：'
//							+ type + ' &nbsp; ',
//					'</div>',
//					'<div class="PlaformChagang_Popup_main_answer_2">报警来源：'
//							+ (alarmSouce) + '</div>',
//					'<div class="PlaformChagang_Popup_main_answer_2">报警描述：'
//							+ (data["alarmDesc"]) + ' &nbsp; ',
//					'</div>', '</div>', '</div>'
//
//			];*/
//
//			//转换出车辆的车牌颜色
//			var plateColorTemp=KCPT.CodeManager.getNameByCode("SYS_VCL_PLATECOLOR", data["plateColor"]);
//			var html = [
//						'<div class="PlatformChagang_PopUp_box">',
//						'<div class="PlaformChagang_Popup_top">',
//						'<label class="L">报警预警</label>',
//						'<div class="PlaformChagang_Popup_top_close" id="yujingClose">',
//						'<img src="images/tipWindow/PlaformChagang_Popup_top_close.jpg">',
//						'</div>',
//						'</div>',
//						'<div class="PlaformChagang_Popup_main">',
//						'<div class="PlaformChagang_Popup_main_answer" style="margin-top:15px;">报警时间：'
//								+ utc2Date(data["alarmTime"]) + '</div>',
//						'<div style="margin-top:8px;">车牌号码：'
//								+ data["vehicleNo"] + ' &nbsp; ',
//						'<div style="margin-top:8px;">车牌颜色：'
//								+ plateColorTemp + ' &nbsp; ',
//						'<div style="margin-top:8px;">报警类型：'
//								+ type + ' &nbsp; ',
//						'</div>',
//						'<div style="margin-top:8px;">报警来源：'
//								+ (alarmSouce) + '</div>',
//						'<div style="margin-top:8px;">报警描述：'
//								+ (data["alarmDesc"]) + ' &nbsp; ',
//						'</div>', '</div>', '</div>'
//
//				];
//			return html.join("");
//		},
		createHtml : function(type, data) {
			var typeDesc = (type == "message" ? "报文" : "查岗"), 
				contentHead = (type == "inspect" ? '请回答：': '消息内容：'), 
				input = (type == "inspect" ? '<input name="inspectAnswer" value="" style="width:230px;"/>': ''), 
				content = data["messageContent"];
			if (content.indexOf("http") > -1) {
				content = "<img src='" + data["messageContent"] + "'>";
			}
			if(type != "message"){//查岗
				var index=content.indexOf('OBJECT_ID');
				if(index>=0){
					index=content.indexOf(';');//前部OBJECT_ID:=500108200207-13;部分去掉
					content=content.substr(index+1);
				}
			}
			
			// button = (type == "message" ? "" : '<input
			// name=inspectBack type=button value="提交" />'),
			button = (type == "message" ? '': '<div class="PlaformChagang_Popup_main_answer_3 inspectBack">提交</div>'),
			html = [
					// '<ul>'
					// , '<li>' + typeDesc + '内容:' +
					// data["messageContent"] + (type=="inspect" ? input
					// : "") + '</li>'
					// , '<li>' + typeDesc + '时间:' +
					// utc2Date(data["utc"]) + '</li>'
					// , '<li>' + typeDesc + '来源:' + data["areaId"] +
					// '</li>'
					// , '<li>' + button + '</li>'
					// , '</ul>'
					'<div class="PlatformChagang_PopUp_box">',
					'<div class="PlaformChagang_Popup_top" >',
					'<label class="L">' + typeDesc + '消息</label>',
					'<div class="PlaformChagang_Popup_top_close">',
					'<img src="images/tipWindow/PlaformChagang_Popup_top_close.jpg">',
					'</div>',
					'</div>',
					'<div class="PlaformChagang_Popup_main" style="background-color:#E5F3FA;color:#0066CC">',
					'<div class="PlaformChagang_Popup_main_answer" style="margin-top: 5px;"><b>'+ contentHead + '</b></div>',
					'<div class="PlaformChagang_Popup_main_answer_2">'+ content + ' &nbsp; <br><br><center>', input, '</center></div>',
					button, '</div>', '</div>' ];
			return html.join("");
		},
		ajaxFun : function(url, param) {
			JAjax(
					url,
					param,
					'json',
					function(data, err) {
						if (data && data.error) {

						} else if ((data instanceof Array) && data.length == 0) {

						} else if (data) {
							f.compileBubbleTip(data);
						}

						/*if (data && data["inspectLastTime"]) {
							c.inspectLastTime = data["inspectLastTime"];
						}

						if (data && data["messageLastTime"]) {
							c.messageLastTime = data["messageLastTime"];
						}*/

					}, function(data, err) {
						window.status = "获取实时报警预警失败 ";

					});
		}
//		,
//		ajaxFunAlarmtodo : function(url, param) {
//			JAjax(url, param, 'json', function(data, err) {
//				data = eval(data);
//				if (data && data.error) {
//
//				} else if (data && (data.length > 0)) {
//					c.utc = data[data.length-1].utc;
//					f.compileBubbleTipFunAlarmtodo(data);
//				}
//			}, function(data, err) {
//				window.status = "获取实时报警督办失败 ";
//
//			});
//		},
//		ajaxFunYuJing : function(url, param) {
//			JAjax(url, param, 'json', function(data, err) {
//				data = eval(data);
//				if (data && data.error) {
//
//				} else if (data && (data.Rows) && (data.Rows.length > 0)) {
//					c.utcyujing = data.Rows[data.Rows.length - 1].alarmTime;
//					f.compileBubbleTipYuJing(data.Rows);
//					// clearInterval(platformMessageTimer);
//				}
//			}, function(data, err) {
//				window.status = "获取平台实时查岗或报文失败 ";
//			});
//		}
	};

	// 分开设置定时器
	/*setInterval(function() {
		f.platformInspectAndMessage();
		f.vehicleAlarmtodo();
		f.vehicleAlarmYuJing();
	}, 12000);*/

	//报文查岗
	setInterval(function() {
		if(KCPT.user.businessLicense!='' && KCPT.user.businessLicense!= null){
			f.platformInspectAndMessage();
		}
	}, selectTimer_Platform);

	//督办
//	setInterval(function() {
//		f.vehicleAlarmtodo();
//	}, selectTimer_Alarmtodo);

	//预警
//	setInterval(function() {
//		f.vehicleAlarmYuJing();
//	}, selectTimer_AlarmYuJing);

};


//--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

/**
 * 底部状态栏
 */
var BottomStatusMessage = function(p)
{
	var that = this;
	this.onOffLineVehicleTextObj = $(p.bottomObj).find("div.onOffLineText");
	this.alarmTextObj = $(p.bottomObj).find("div.alarmText");
	this.onlinePerObj = $(p.bottomObj).find("div.onlineVehicleCount");
	this.timeUtc = null;
//	this.operationVehicle = 1;
	this.alarmQueryTimer = null;
	this.alarmQueryTimerDelay = 600011;//10分钟
	this.vehicleCountTimer=null;
	this.vehicleCountTimerDelay=60000;//改为与homepage.js的getPageInfo方法定时轮训间隔相同60s
	this.alarmRollTimer = null;
	this.alarmRollTimerDelay = 2000;
	this.loginVehicleRollTimer = null;
//	this.loginVehicleRollTimerDelay = 2000;
	this.alarmListArr = [];
	this.loginVehicleList = [];
	var f =
	{
		startAlarmQueryTimer : function()
		{
			that.alarmQueryTimer = setInterval(function() {
				f.getAlarmMessage();
			}, that.alarmQueryTimerDelay);
			that.vehicleCountTimer = setInterval(function(){
//				f.getLoginVehicle();
				f.getVehicleCount();
			}, that.vehicleCountTimerDelay);
		},
		getVehicleCount : function()
		{
			JAjax("memcache/memcache!getStatisticsVehicleOperationState.action",
			{
				"entId" : KCPT.user.entId
			}, "json", function(data, err)
			{
				if (data)
					f.refreshOnlinePerInfo(data);
			}, function(data)
			{
//				that.operationVehicle = 0;
			});
		},
//		refreshVehiclesInfo : function(data)
//		{
//			var corpVehicleOnlineNum = 0;
//			JAjax("memcache/memcache!getVehicleCoprNum.action",
//			{
//				"entId" : KCPT.user.entId
//			}, "json", function(data)
//			{
//				if (data && data.length > 0)
//					corpVehicleOnlineNum = data[0].corpVehicleOnlineNum;
//				f.refreshOnlinePerInfo(corpVehicleOnlineNum, statisticVehicle);
//			}, function(data)
//			{
//				f.refreshOnlinePerInfo(0, 1);
//			});
//		},
		refreshOnlinePerInfo : function(data)
		{
			var networkNum = 0;
		    var onlineNum = 0;
		    var drivingNum = 0;
		    if(data && data[0]){
		    	networkNum = data[0].corpVehicleNetworkNum;
		    	onlineNum = data[0].corpVehicleOnlineNum;
		    	drivingNum = data[0].corpVehicleOnlineDrivingNum;
		    }

			var onlinePer = (Math.round(onlineNum / networkNum * 1000)) / 10 + "";
			onlinePer = onlinePer.substring(0, (onlinePer.indexOf(".") > 0) ? (onlinePer.indexOf(".") + 2) : onlinePer.length) + "%";

			if (networkNum == 0 || !networkNum)
				onlinePer = "0%";
			var vehiclesInfo = '当前在线车辆数：  ' + onlineNum + '  在线率：  <span class="page_bottom_4_zxl">' + onlinePer + '</span>';
			that.onlinePerObj.html(vehiclesInfo);
		},
		getAlarmMessage : function(o)
		{
			var da =
			{};
			if (!that.timeUtc)
			{
				var now = dateFormat(new Date(), "yyyy-MM-dd hh:mm:ss");
				var promtStartTime = date2utcsA(now) - 1800000;
				da["requestParam.equal.timeStamp"] = promtStartTime;// 只弹出当前时间半小时前得报警
			} else
			{
				da["requestParam.equal.timeStamp"] = that.timeUtc;
			}

			JAjax("operationmanagement/getAlarmRealTime.action", da, "json", function(data)
			{
				// 成功调用返回后解析数据
				if (data && data.Rows&&data.Rows.length>0)
				{
					$.merge(that.alarmListArr, data.Rows);
					f.rollAlarmList();
					var datai = data.Rows[data.Rows.length - 1];
					if (datai && datai.alarmTime)
					{
						that.timeUtc = datai.alarmTime;
					}

				} else if (!data || (data.error && data.error.length > 0))
				{
					return false;
				}
			});
		},
		rollAlarmList : function()
		{
			if (that.alarmRollTimer)
			{
				clearInterval(that.alarmRollTimer);
				that.alarmRollTimer = null;
			}

			that.alarmRollTimer = setInterval(function()
			{
				if (that.alarmListArr.length > 0){
					var _alarm=that.alarmListArr.splice(0, 1);
					if(1==_alarm[0].popPoint){
						f.rollAlarmText(_alarm);
					}
					if(1==_alarm[0].voicePoint){
							playVoice();
					}


				}

				// else
				// that.alarmTextObj.html("");
			}, that.alarmRollTimerDelay);
		},
		rollAlarmText : function(alarm)
		{
			if (!alarm[0])
			{
				return false;
			}
			alarm = alarm[0];
			var vNo = null2blank(alarm.vehicleNo), alarmType = getAlarmTypeDesc(alarm.alarmCode);
			if (!vNo)
				vNo = "未知";
			if (!alarmType)
				alarmType = "";

			var alarmTime = alarm.alarmTime ? utc2Date(alarm.alarmTime) : "未知时间";
			var alarmPlace = alarm.alarmPlace ? alarm.alarmPlace : "未知地点";
			var alarmDesc = '<div class="page_bottom_5_left"><img src="images/bottom/bottom5_bg_left.png" /></div>'
				+ '<div class="page_bottom_5_middle ">' + vNo + " " + alarmTime + " " + "<span class='page_bottom_5_bj'>"
					+ alarmType + "</span></div>"
				+ '<div class="page_bottom_5_right"><img src="images/bottom/bottom5_bg_right.png" /></div>';
			if (!alarmType)
				alarmDesc = "";
			if(alarmDesc)
				that.alarmTextObj.html(alarmDesc).attr("vid",alarm.vid).attr("vno",vNo);//保存车辆vid和车牌号
		}

//		getLoginVehicle : function()
//		{
//			var url = "monitor/findVehicleOnOffLine.action", param =
//			{
//				"requestParam.equal.second" : 60
//			};
//			JAjax(url, param, 'json', function(data)
//			{
//				if (data && data.Rows && data.Rows.length>0)
//				{
//					$.merge(that.loginVehicleList, data.Rows);
////					f.rollLoginVehicle();
//				} else if (!data || (data.error && data.error.length > 0))
//				{
//					return false;
//				}
//			}, function(e)
//			{
//			}, null, null, 10000
//
//			);
//		}
//		rollLoginVehicle : function()
//		{
//			if (that.loginVehicleRollTimer)
//			{
//				clearInterval(that.loginVehicleRollTimer);
//				that.loginVehicleRollTimer = null;
//			}
//
////			that.loginVehicleRollTimer = setInterval(function()
////			{
////				if (that.loginVehicleList.length > 0)
////					f.rollLoginVehicleText(that.loginVehicleList.splice(0, 1));
////				// else
////				// that.onOffLineVehicleTextObj.text("");
////			}, that.loginVehicleRollTimerDelay);
//		}
////		rollLoginVehicleText : function(loginVehicle)
////		{
////			if (!loginVehicle)
////			{
////				return false;
////			}
////			var longinText = '<div class="page_bottom_1_pic"><img src="images/bottom/image-1.png" /></div>' + (loginVehicle ? loginVehicle[0]["onOffLineInfo"] : "");
////			that.onOffLineVehicleTextObj.html(longinText);
////		}
	};
	f.startAlarmQueryTimer();
	f.getAlarmMessage();
	f.getVehicleCount();
	that.alarmTextObj.click(function(){
		var vid = $(this).attr("vid");
//		vid = "301";
		if(!vid) return false;
			var win=window.open("model/alarmHandler/alarmHandler.html?v="+vid,"alarmHandler",'location=no,menubar=no,resizable=no,status=no,titlebar=no,top=0,left=0,height='+$(window).height()+',width='+$(window).width()+',menubar=0');
			win.opener.window.vehicleNoValue=$(this).attr("vno");//弹出窗口alarmHandler.html中显示车牌号
		 //$.ligerDialog.open({ url:'model/alarmHandler/alarmHandler.html?'+vid, width: 500, height: 440,allowClose:false }); 
		 //$.ligerDialog.open({ url:'model/alarmList/alarmEmergencyList.html', title:"告警列表", height: 300,fixedType:"e"}); 
	});
};

/**
 * 报警实时弹出框 调用
 *
 * @param vNo
 * @param type
 * @param response
 * 2012.4.18 fanxuean 查证该函数已不用
 */
//function showComandMsg(data)
//{
//
//	/*
//	 * var content = "<div style='width:70px; float:left;padding-top:70px;'>" + "<img
//	 * src='images/ico_small.gif'>" + "</div>" + "<div
//	 * class='pop_waitnotify'>" + "<p>车牌号：" + vNo + "</p>" + "<p>报警类型：" +
//	 * type + "</p>" + "<p>报警内容：" + cc + "</p>" + "<p>报警时间：" + time + "</p>" + "</div>";
//	 */
//	var content = '<div class="new_alarm_main">'
//			+ '<table class="new_alarm_table" border="0" width="280" cellspacing="1" cellpadding="0" bgcolor="#9ac3ec" style="margin-top:12px; margin-bottom:12px; margin-left:10px;margin-right:10px;font-size:12px;line-height:2">';
//
//	var alarmC = "";
//	var len = data.length > 5 ? 5 : data.length;
//	for ( var i = 0; i < len; i++)
//	{
//		var datai = data[i];
//		var vNo = datai.vehicleNo;
//		var driverName = datai.staffName;
//		// var type = datai.alarmName;
//		var place = datai.alarmPlace;
//		var utc = datai.alarmTime;
//
//		var alarmCode = datai.alarmCode;
//
//		vNo = null2blank(vNo);
//		var type = getAlarmTypeDesc(alarmCode);
//
//		if (!vNo)
//		{
//			vNo = "未知";
//		}
//		if (!type)
//		{
//			type = "未知";
//		}
//		alarmC += '<tr align="center" bgcolor="#9ac3ec">' + '<td bgcolor="#FFFFFF">' + vNo + '</td>' + '<td bgcolor="#FFFFFF">' + type + '</td>' + '</tr>';
//	}
//	content += alarmC + '</table>' + '</div>';
//
//	var title = "新报警";
//	// alert(content)
//	create("default",
//	{
//		title : title,
//		text : content
//	});
//
//};
function null2blank(value)
{
	if (!value || value == "null" || value == "NULL")
	{
		value = "";
	}
	return value;
}
function create(template, vars, opts)
{
	return $notifyContainer.notify("create", template, vars, opts);
}
String.prototype.replaceAll = function(reallyDo, replaceWith, ignoreCase)
{
	if (!RegExp.prototype.isPrototypeOf(reallyDo))
	{
		return this.replace(new RegExp(reallyDo, (ignoreCase ? "gi" : "g")), replaceWith);
	} else
	{
		return this.replace(reallyDo, replaceWith);
	}
};
/*
 * *****************************************************日期扩展
 */
Date.prototype.toCommonCase = function()
{
	var xYear = this.getUTCFullYear();
	xYear = xYear + 1900;
	var xMonth = this.getMonth() + 1;
	if (xMonth < 10)
	{
		xMonth = "0" + xMonth;
	}
	var xDay = this.getDate();
	if (xDay < 10)
	{
		xDay = "0" + xDay;
	}
	var xHours = this.getHours();
	if (xHours < 10)
	{
		xHours = "0" + xHours;
	}
	var xMinutes = this.getMinutes();
	if (xMinutes < 10)
	{
		xMinutes = "0" + xMinutes;
	}
	var xSeconds = this.getSeconds();
	if (xSeconds < 10)
	{
		xSeconds = "0" + xSeconds;
	}
	return xYear + "-" + xMonth + "-" + xDay + " " + xHours + ":" + xMinutes + ":" + xSeconds;
};
Date.prototype.toCommon2Case = function()
{
	var xYear = this.getFullYear();
	var xMonth = this.getMonth() + 1;
	if (xMonth < 10)
	{
		xMonth = "0" + xMonth;
	}
	var xDay = this.getDate();
	if (xDay < 10)
	{
		xDay = "0" + xDay;
	}
	return xYear + "-" + xMonth + "-" + xDay;
};
Date.prototype.Format = function(fmt)
{
	// author: meizz
	var o =
	{
		"M+" : this.getMonth() + 1, // 月份
		"d+" : this.getDate(), // 日
		"h+" : this.getHours(), // 小时
		"m+" : this.getMinutes(), // 分
		"s+" : this.getSeconds(), // 秒
		"q+" : Math.floor((this.getMonth() + 3) / 3), // 季度
		"S" : this.getMilliseconds()
	// 毫秒
	};
	if (/(y+)/.test(fmt))
		fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
	for ( var k in o)
		if (new RegExp("(" + k + ")").test(fmt))
			fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
	return fmt;
};

Date.prototype.addDays = function(d)
{
	this.setDate(this.getDate() + d);
};

Date.prototype.addWeeks = function(w)
{
	this.addDays(w * 7);
};

Date.prototype.addMonths = function(m)
{
	var d = this.getDate();
	this.setMonth(this.getMonth() + m);

	if (this.getDate() < d)
		this.setDate(0);
};

Date.prototype.addYears = function(y)
{
	var m = this.getMonth();
	this.setFullYear(this.getFullYear() + y);

	if (m < this.getMonth())
	{
		this.setDate(0);
	}
};
function getnowTime(d)
{
	var date = new Date(); // 日期对象
	if (d)
	{
		return date.Format("yyyy-MM-dd hh:mm:ss");
	} else
	{
		return date.Format("yyyy-MM-dd");
	}
};
//function backspace()
//{
//	if (event.keyCode != 8)
//	{
//		event.returnValue = true;
//		return;
//	} else
//	{
//
//		// 如果当前焦点在form里,退格键有效,否则无效
//		if (activeElement())
//		{
//			// alert("焦点是否在form里: true ");
//			event.returnValue = true;
//		} else
//		{
//			// alert("焦点是否在form里: false ");
//			event.returnValue = false;
//		}
//	}
//}
//
//function activeElement()
//{
//	var forms = document.getElementById("mainWorkArea");
//	if (forms != null)
//	{
//		if (children(forms))
//			return true;
//	}
//	return false;
//}
//
//// 迭代判断焦点所在
//function children(obj)
//{
//	if (obj == document.activeElement)
//		return false;
//	// 如果有子元素
//	if (obj.hasChildNodes())
//	{
//		for ( var i = 0; i < obj.childNodes.length; i++)
//		{
//			if (obj.childNodes[i] == document.activeElement && obj.childNodes[i].tagName.toLowerCase() != "td")
//			{
//				if (obj.childNodes[i].type)
//				{
//					if (obj.childNodes[i].type.toLowerCase() == "text" || obj.childNodes[i].tagName.toLowerCase() == "textarea" || obj.childNodes[i].type.toLowerCase() == "password")
//					{
//
//						// if(obj.childNodes[i].hasFocus()){
//						return true;
//						/*
//						 * }else{ return false; }
//						 */
//
//					}
//				}
//			}
//
//			if (children(obj.childNodes[i]))
//				return true;
//		}
//
//	}
//	return false;
//}
buildAlarmVoice = function()
{
	var so = new SWFObject("script/util/AlarmPlugins.swf", "alarmVoice", "100%", "100%", "8", "#FF6600");
	so.addVariable("flashVarText", "这里是一个flash,请您下载最新的插件");
	so.addParam("wmode", "transparent");
	so.write("flashVoiceDiv");
	if (so && so.attributes.id)
		KCPT.alarmVoiceSwtObj = getFlashObj(so.attributes.id);
};

//根据轨迹点查询位置信息
var getLnglat = function(id, lon, lat) {
	var lnglat = {
		mapLon : lon / 600000,
		mapLat : lat / 600000
	};
	JAjax("monitor/findAddress.action", lnglat, 'json', function(data, err) {
		if (id && data && data.length > 0) {
			var ad = null2blank(data[0].address);
			$("#" + id).attr("title", ad).text(ad);
		}
	}, function(err) {
		return "";
	});
};

playVoice = function()
{
	if (KCPT.alarmVoice)
	{
		try
		{
			// document.getElementById("alarmVoice").alarmPrompt(10);
			KCPT.alarmVoiceSwtObj.alarmPrompt(10);// alarmPrompt(alarmCode)参数为报警代码
		}
		catch (err)
		{
			// alert(err);
		}
	}
};
// 根据轨迹点查询位置信息
var findAddressByLngLat = function(vid, lnglat, textObj)
{
	JAjax("monitor/findAddress.action", lnglat, 'json', function(data, err)
	{
		if (textObj && data && data.length > 0)
		{
			var ad = null2blank(data[0].address);
			$(textObj).attr("title", ad).text(ad);
		}
	}, function(err)
	{
		return "";
	});
};
// 根据vid 查询线路名称
var findClassLineByVid = function(vid, textObj)
{
	JAjax("monitor/findClassLine.action",
	{
		"requestParam.equal.vid" : vid
	}, 'json', function(data, err)
	{
		if (textObj && data && data.length > 0){
			$(textObj[0]).text(null2blank(data[0].classLine));
			$(textObj[1]).text(KCPT.CodeManager.getNameByCode("SYS_VCL_RUNSTATUS", data[0].operState));
		}
	}, function(err)
	{
		return "";
	});
};
// 根据vid 查询车辆内部编号
var findVehicleInnerCodeByVid = function(vid, textObj)
{
	JAjax("monitor/findVehicleInnerCode.action",
	{
		"requestParam.equal.vid" : vid
	}, 'json', function(data, err)
	{
		if (textObj && data && data.length > 0)
			$(textObj).text(null2blank(data[0].innerCode));
	}, function(err)
	{
		return "";
	});
};

//显示指令下发状态图片提示信息
var showRsTip = function(data,tipObj){
	if (data && data.length > 0)
	{
		if(data[0].sendOk == "true"){
			tipObj.css({
				"background-position": "0% 0%"
			});
		}else{
			tipObj.css({
				"background-position": "0% 50%"
			});
		}
		tipObj.show();
		var s =	setTimeout(function(){
			tipObj.hide();
			clearTimeout(s);
		}, 2001);
	}
};

/**
 * 显示报警处理消息
 */
var getAlarmHandleMessage = function(p)
{
	// var
	// _testData={"Rows":[{"createTime":"1326431665186","coParm":"TYPE:0",
	// "coOemcode":"4C54","coCommand":"CAITS 1_1326431665_2 E002_13901234501
	// 0 D_GETP {TYPE:0} ",
	// "opId":"1","coFrom":"0","coSubtype":"0","coType":"D_GETP","crResult":"34324234324324234",
	// "coTrytimes":"1","createByName":"ADMIN12","createBy":"1","oemName":"",
	// "coStatus":"2","autoId":"45120","coSeq":"1_1326431665_2",
	// "coSutc":"1326431665186","coText":"","oemShortName":"","coSendtimes":"1","crTime":"",
	// "vid":"269","vehicleNo":"京B00006","coChannel":"0","updateBy":"","updateTime":""}],"Total":"0"};
	var url = "monitor/vehicleCommandManage!findByParamThVehicleCommand.action", param =
	{
		"requestParam.equal.vid" : p.vid,
		"requestParam.equal.coType" : "D_SNDM",// 指令类型(D_SNDM)
		"requestParam.equal.coSubtype" : "1"// 指令子类型(1)
	}, panel = p.panel;// $("#alarmHandlerDiv").find(".alarmHandleDiv_context
	// ul");
	panel.html("");
	JAjax(url, param, "json", function(data, err)
	{
		$(data.Rows).each(function(i)
		{
			var that = this;
			var li = $("<li>");
			 li.css({"line-height":"25px"});
			var label = $("<label>");
			if (this.coStatus > 0)
				label.append("<img src='images/global/offline.png' width=10 height=10 />&nbsp;");
			else if (this.coStatus < 0)
				label.append("<img src='images/global/online.png' width=10 height=10 />&nbsp;");
			else
				label.css("margin-left", "15px");
			label.append(this.createByName);// 操作员
			label.append("&nbsp;&nbsp;&nbsp;&nbsp;" + (utc2Date(this.createTime)).split(" ")[1]);// 时间
			// li.append("<br>" + this.crResult);
			li.append(label);
			var div = $("<div>",
			{
				"style" : "margin-left:10px;",
				text : this.coText
			});
			// 发送状态-1等待回应 0:成功 1:设备返回失败 2:发送失败
			// 3:设备不支持此功能 4:设备不在线 */
			// 更新人 updateBy 更新时间 updateTime 为空
			if (this.coStatus > 0 && this.updateBy == "" && this.updateTime == "")
			{
				var a = $("<a>");
				a.css("cursor","pointer");
				a.append("是否重发");
				a.click(function()
				{
					reSend(that.coSeq, this);
				});
				div.append("消息发送失败，");
				div.append(a);
			}
			li.append($(div));
			// if(this.coStatus < 0){
			// label.addClass("wait");
			// }else if(this.coStatus > 0){
			// label.addClass("fail");
			// }
			panel.append(li);
		});
	}, function(data, err)
	{

	});
};
/**
 * 重发
 */
var reSend = function(seq, obj)
{
	// 请求： /monitor/vehicleCommandManage!repeatSendThVehicleCommand.action
	// 参数： requestParam.equal.coSeq seq
	// 对象参考： ThVehicleCommandManage
	var url = "monitor/vehicleCommandManage!repeatSendThVehicleCommand.action";
	JAjax(url,
	{
		"requestParam.equal.coSeq" : seq
	}, 'json', function(data, err)
	{
		//update by WangMeng for YYPT-297  把“发送成功”改为“操作成功”
		if(data.displayMessage == "操作成功！"){
			$.ligerDialog.warn("重发成功", "提示");
			$(obj).replaceWith("已重发");
		}else{
			$.ligerDialog.warn("重发失败", "提示");
		}
	}, function(data, err)
	{
		$.ligerDialog.warn("重发失败", "提示");
	});
};

function makeTipShowTop(tipObj)
{
	tipObj.getObject().style.zIndex = 10000;
};
//Array.prototype.indexOf = function(val)
//{
//	for ( var i = 0; i < this.length; i++)
//	{
//		if (this[i] == val)
//			return i;
//	}
//	return -1;
//};
//Array.prototype.remove = function(val)
//{
//	//var index = this.indexOf(val);
//	var index = $.inArray(val, this);
//	if (index > -1)
//	{
//		this.splice(index, 1);
//	}
//};
//Array.prototype.insertByIndex=function(index,value){
//	var ar0=this.slice(0,index);
//	var ar1=this.slice(index);
//	var obj=new Array();
//	obj.push(value);
//	return ar0.concat(obj,ar1);
//};
arrayRemove = function(array, item){
	var index = $.inArray(item, array);
	if (index > -1)
	{
		array.splice(index, 1);
	}
};
////params{vid:,vehicleNo:,map:,markerId,showTipWindow(){},markerId}
var alarmMarkerPathCache = [];
var alarmMarkerIdCache = "";
var markerAlarmFlash = function(params){
	var requestParams = {};
	if(params.vid){
		requestParams["requestParam.equal.vid"] = params.vid;
	}else if(params.vehicleNo){
		requestParams["requestParam.equal.vehicleNo"] = params.vehicleNo;
	}
	JAjax("monitor/findRealAlarmTrack.action"
	,	requestParams
	,	"json"
	,	function(data){
			if(data.maplon){
				markerAlarmFlashReturn(data,params);
			}else{
				//$.ligerDialog.alert("未查询到符合条件的数据", "提示", "error");
			}
		}
	,	function(err){
			//$.ligerDialog.alert("查询报警车辆位置信息错误", "提示", "error");
	});
};
//查询车辆定位
var markerVehicleFlash = function(params){
	var requestParams = {};
	if(params.vid){
		requestParams["requestParam.equal.vid"] = params.vid;
	}else if(params.vehicleNo){
		requestParams["requestParam.equal.vehicleNo"] = params.vehicleNo;
	}
	JAjax("monitor/findVehicleInfo.action"
	,	requestParams
	,	"json"
	,	function(data){
			if(data.maplon){
				markerVehicleFlashReturn(data,params);
			}else{
				//$.ligerDialog.alert("未查询到符合条件的数据", "提示", "error");
			}
		}
	,	function(err){
			//$.ligerDialog.alert("查询报警车辆位置信息错误", "提示", "error");
	});
};
//车辆定位
var markerVehicleFlashReturn = function(p,params){
	if (p.maplon && p.maplon > 0 && p.maplat && p.maplat > 0) {
		var	_lon = p.maplon / 600000,
			_lat = p.maplat / 600000,
			markerParams = {
					id: params.markerId
				,	lng : _lon ? _lon : 0
				,	lat : _lat ? _lat : 0
				,	iconUrl : getCarDirectionIcon(p.head, p.isonline,p.speed, "alarm")//"images/markerId.gif"
				,	iconW : 24
				,	iconH : 24
				,	tip : ""
				,	title : p.vehicleno
				,	handler : params.showTipWindow
				,	isDefaultTip : false
				,	isOpen : false
				,	isMultipleTip : false
			};
		params.map.panTo(_lon, _lat);//转移中心点
		params.map.removeMarker(params.markerId);
		params.map.addMarker(markerParams);
	}
};

var markerAlarmFlashReturn = function(p,params){
	if (p.maplon && p.maplon > 0 && p.maplat && p.maplat > 0) {
		var	_marker,
			_lon = p.maplon / 600000,
			_lat = p.maplat / 600000,
			markerParams = {
					id: params.markerId
				,	lng : _lon ? _lon : 0
				,	lat : _lat ? _lat : 0
				,	iconUrl : getCarDirectionIcon(p.head, p.isonline,p.speed, "alarm")//"images/markerId.gif"
				,	iconW : 24
				,	iconH : 24
				,	tip : ""
				,	title : p.vehicleno
				,	label : p.vehicleno + " <img src='images/global/tcolse2.png' style='cursor:pointer;' class='deleteMarker' />"
				,	labelFontSize : 12
				,	labelFontColor : "#000000"
				,	labelBgColor : "#F2EFE9"
				,	handler : params.showTipWindow
				,	isDefaultTip : false
				,	isOpen : false
				,	isMultipleTip : false
			};	
		if(alarmMarkerIdCache == params.vid){
			alarmMarkerPathCache.push(_lon);
			alarmMarkerPathCache.push(_lat);
		}else{
			alarmMarkerPathCache = [_lon, _lat];
			params.map.panTo(_lon, _lat);
		}		
		if(params.map.polyLineObj["alarmMarkerPath"]){
			params.map.removePolyLine("alarmMarkerPath");
		}
		var pathParam = {
				id: "alarmMarkerPath"
			,	arrLngLat: alarmMarkerPathCache.slice(0)
			,	strColor: "red"
		};
		if(params.vehicleNo == undefined) {
			if(alarmMarkerPathCache.length > 2){
				params.map.addPolyLine(pathParam);
			}
		}		
		if(params.map.getMarker(params.markerId)){
			params.map.moveMarker(markerParams);
		}
		else{
			_marker = params.map.addMarker(markerParams);
		}
		$(params.map.markerLblObj[params.markerId].getObject())
		.find("img.deleteMarker").unbind("click").click(function(){
			params.map.removeMarker(params.markerId);
			if(params.clearIdCache) params.clearIdCache.call();//点击关闭清除vid缓存
			params.map.removePolyLine("alarmMarkerPath");
			if(params.alarmMarkerPositionTimer) clearInterval(params.alarmMarkerPositionTimer);
		});
//		if(params.showTipWindow && KCPT.VehicleMonitorObj.currentTip){
//			//todo tip不跟随marker移动
//			params.map.map.removeOverLay(KCPT.VehicleMonitorObj.currentTip);
//		}
		alarmMarkerIdCache = params.vid;
	}
};
//过滤数组重复,数组数据为 --字符串或数字.==null?null:arr[i].name
function filterArrayRepeat(arr){
     var newArray=[];
     var provisionalTable = {};
     for (var i = 0, item; (item = arr[i] == undefined?null:arr[i]) != null; i++) {
         if (!provisionalTable[item]) {
             newArray.push(arr[i]);
             provisionalTable[item] = true;
         }
     }
     return newArray;
}

function isLessThanZero(vl){
	if(vl < 0){
		return "--";
	}
	return vl;
}

function addBr(vl){
	if(vl.length == 0){
		return "";
	}
	var arr = vl.split(" ");
	var str = "";
	str = str+arr[0];
	str = str+"<br>";
	str = str+arr[1];
	return str;
}

/**
 * 显示油量趋势图
 * 
 * @param vid
 */
function showOilDetail(_vid)
{
	if (_vid)
	{
		window['monitor_oildetail_vid'] = _vid;
		$("#mainWorkArea").A_Window({
			dragabId : 'mainWorkArea', // 可拖动的范围
			width : 550, // 宽度
			height : 330,// 高度
			load_fn : function()
			{

				$("#monitor_oildetail_close").click(function()
				{
					$("#mainWorkArea").close_ALL_Window();
					delete window['monitor_oildetail_vid'];
				});
			},
			url : "model/monitor/oildetail.html"
		});
		$("#mainWorkArea").show_A_Window({});
	}
};
/**
 * 1、设置grid列合并，仅支持对没有冻结列的grid及有冻结列grid的左半部分的列合并，不支持对冻结列的右半部分合并
 * 2、如需使用此方法对同一grid中的多个列进行合并，注意使用顺序，后面的列先调用此方法，例如对grid的2、3列进行合并
 * 先调用setGridRowSpan("yourGrid", 3);
 * @param gridId, colIdx
 */
function setGridRowSpan(gridId, colIdx) {
	var lastRowObj = null;
	var rowCounter = 1;
	//取grid中第一个table的colIdx列，冻结列时有2个table，这里只取第一个table，不支持冻结列的右半部分合并
	$("#" + gridId + " .l-grid-body-table:eq(0) td:nth-child(" + colIdx + ")").each(function(){
		if ($(this).html() == null)
			return false;
		if (lastRowObj == null) {
			lastRowObj = $(this);
			return true;
		}
		if (lastRowObj.html() == $(this).html()) {
			rowCounter++;
			$(this).remove();
		} else {
			lastRowObj.attr("rowspan", rowCounter);
			rowCounter = 1;
			lastRowObj = $(this);			
		}
	});
	if (lastRowObj != null && lastRowObj.attr("rowspan") == '1') {
		lastRowObj.attr("rowspan", rowCounter);
	}
}
/**
 * 定位到grid的选中行
 * @param grid
 */
function setGridScroll(grid) {
	try {
		grid.gridManager.gridbody.scrollTop((grid.gridManager.getSelectedRowObj().id.substr(grid.gridManager.getSelectedRowObj().id.length - 3) - 1) * 23);
	} catch(e) {}
}

/**
* 封装装载XML的方法,并返回XML文档的根元素节点。
* @param flag true时参数xml表示xml文档的名称；false时参数xml是一个字符串，其内容是一个xml文档
* @param xml 根据flag参数的不同表示xml文档的名称或一个xml文档的字符串表示
*/
function loadXML(flag,xml){
var xmlDoc;
//针对IE浏览器
if(window.ActiveXObject){
var aVersions = ["MSXML2.DOMDocument.6.0","MSXML2.DOMDocument.5.0","MSXML2.DOMDocument.4.0","MSXML2.DOMDocument.3.0","MSXML2.DOMDocument","Microsoft.XmlDom"];
for (var i = 0; i < aVersions.length; i++) {
try {
//建立xml对象
xmlDoc = new ActiveXObject(aVersions[i]);
break;
} catch (oError) {
}
}
if(xmlDoc != null){
    //同步方式加载XML数据
xmlDoc.async = false;
//根据XML文档名称装载
if(flag == true){
        xmlDoc.load(xml);
} else{
        //根据表示XML文档的字符串装载
        xmlDoc.loadXML(xml);
}
//返回XML文档的根元素节点。
return xmlDoc.documentElement;
}
} else{
//针对非IE浏览器
    if(document.implementation && document.implementation.createDocument){
      /*
       第一个参数表示XML文档使用的namespace的URL地址
       第二个参数表示要被建立的XML文档的根节点名称
       第三个参数是一个DOCTYPE类型对象，表示的是要建立的XML文档中DOCTYPE部分的定义，通常我们直接使用null
       这里我们要装载一个已有的XML文档，所以首先建立一个空文档，因此使用下面的方式
      */
      xmlDoc = document.implementation.createDocument("","",null);
      if(xmlDoc != null){
       //根据XML文档名称装载
        if(flag == true){
          //同步方式加载XML数据
xmlDoc.async = false;
          xmlDoc.load(xml);
        } else{
          //根据表示XML文档的字符串装载
          var oParser = new DOMParser();
          xmlDoc = oParser.parseFromString(xml,"text/xml");
        }
        //返回XML文档的根元素节点。
        return xmlDoc.documentElement;
      }
    }
}
return null;
}