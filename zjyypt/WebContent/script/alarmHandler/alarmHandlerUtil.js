function JAjax(u, d, h, fn, er, sync, scope, time) {
	$.ajax({
		url : u,
		type : "POST",
		timeout : time || 10000,
		data : d || {},
		dataType : h || "html",
		cache : false,
		async : (sync == true || sync == false) ? sync : true,
		success : function(req, err) {
			if (fn)
				if (fn instanceof Function) {
					if (!scope) {
						fn.call(this, req);
					} else {
						fn.call(scope, req);
					}
				}
		},
		error : function(e, s) {
			if (er)
				if (er instanceof Function) {
					er.call(this, e);
				}
		}
	});
};
// 车牌颜色转码
var getPlateColor = function(plateId) {
	return window.opener.tocolor(plateId);
};
var utc2Date = function(n_utc) {
	if (!n_utc || n_utc == null || n_utc == "null" || n_utc == "无" || +n_utc == 0)
		return "";
	var date = new Date();
	date.setTime((parseInt(n_utc) + (8 * 3600 * 1000)));
	var s = date.getUTCFullYear() + "-";
	if ((date.getUTCMonth() + 1) < 10) {
		s += "0" + (date.getUTCMonth() + 1) + "-";
	} else {
		s += (date.getUTCMonth() + 1) + "-";
	}
	if (date.getUTCDate() < 10) {
		s += "0" + date.getUTCDate();
	} else {
		s += date.getUTCDate();
	}
	if (date.getUTCHours() < 10) {
		s += " 0" + date.getUTCHours() + ":";
	} else {
		s += " " + date.getUTCHours() + ":";
	}
	if (date.getMinutes() < 10) {
		s += "0" + date.getUTCMinutes() + ":";
	} else {
		s += date.getUTCMinutes() + ":";
	}
	if (date.getUTCSeconds() < 10) {
		s += "0" + date.getUTCSeconds();
	} else {
		s += date.getUTCSeconds();
	}

	return s;
};

var alarmCodeList = {
	isLoad : false
};
// 转换车辆报警类型描述
var getAlarmTypeDesc = function(code) {
	var alarmTypeDesc = "";
	if (!alarmCodeList.isLoad) {
		alarmCodeList.isLoad = true;
		JAjax("../../entbusiness/findAllSysAlarmType.action", {}, 'json', function(data, err) {
			$(data).each(function(i) {
				alarmCodeList[this.alarmCode] = this.alarmName;
			});
		}, function(data, err) {

		});
	} else {
		alarmTypeDesc = alarmCodeList[code];
	}
	return alarmTypeDesc == undefined ? "未知报警" : alarmTypeDesc;
};
//begin add jiangwei 增加通过坐标获取地址的方法 at:20121030
function getAddress(thisObj, mapLat,mapLon)
{
	if(mapLat>0&&mapLon>0){
		JAjax("../../monitor/monitorAction!getAddress.action",
		{mapLat:mapLat,mapLon:mapLon}, 'text', function(data)
		{
			var _address = "";
			if (undefined != data)
			{
				_address = data;
			} else
			{
				_address = "未知位置";
			}
			var span = $("<span>");
			var _alarmPlace = "";
			if (_address.length > 15) {
				_alarmPlace = _address.substring(0, 15);
				_alarmPlace += "...";
			} else {
				_alarmPlace = _address;
			}
			$(span).addClass("cutText").text(_alarmPlace).attr("title", _address);
			$(thisObj).parent().append($(span));
			$(thisObj).hide();
		}, function(data, err)
		{
			var span = $("<span>");
			$(span).addClass("cutText").width(280).text("未知位置").attr("title", "未知位置");
			$(thisObj).parent().append($(span));
			$(thisObj).hide();
		});
	}else{
		var span = $("<span>");
		$(span).addClass("cutText").width(280).text("未知位置").attr("title", "未知位置");
		$(thisObj).parent().append($(span));
		$(thisObj).hide();
	}
};
//end add jiangwei 增加通过坐标获取地址的方法 at:20121030
/**
 * 检查是否手机号,13/15/18开头
 * 
 * @param {Object}
 *            _string
 */
function isTelphone(_string) {
	// var istel = /^13\d{9}$/g.test(_string) || /^15[8,9]\d{8}$/g.test(_string)
	// || /^18\d{9}$/g.test(_string);
	var istel = /^[0-9]\d{10}$/g.test(_string);
	return istel;
};
/**
 * 验证字符长度
 */
function validateCharLength(str) {
	var l = 0;
	var chars = str.split("");
	for ( var i = 0; i < chars.length; i++) {
		if (chars[i].charCodeAt(0) < 299)
			l++;
		else
			l += 2;
	}
	return l;
};
/**
 * 显示报警处理消息
 */
var getAlarmHandleMessage = function(p) {
	var url = "../../monitor/vehicleCommandManage!findByParamThVehicleCommand.action", param = {
		"requestParam.equal.vid" : p.vid,
		"requestParam.equal.coType" : "D_SNDM",// 指令类型(D_SNDM)
		"requestParam.equal.coSubtype" : "1"// 指令子类型(1)
	}, panel = p.panel;
	$(panel).empty();
	JAjax(url, param, "json", function(data, err) {
		if (null != data) {
			$(data.Rows).each(function(i) {
				var that = this;
				var li = $("<li>");
				var label = $("<label>");
				if (this.coStatus > 0)
					label.append("<img src='../../images/global/offline.png' width=10 height=10 />&nbsp;");
				else if (this.coStatus < 0)
					label.append("<img src='../../images/global/online.png' width=10 height=10 />&nbsp;");
				else
					label.css("margin-left", "15px");
				label.append(this.createByName);// 操作员
				label.append("&nbsp;&nbsp;&nbsp;&nbsp;" + (utc2Date(this.createTime)).split(" ")[1]);// 时间
				// li.append("<br>" + this.crResult);
				li.append(label);
				var div = $("<div>", {
					"style" : "margin-left:10px;width:98%;",
					text : this.coText
				});
				// 发送状态-1等待回应 0:成功 1:设备返回失败 2:发送失败
				// 3:设备不支持此功能 4:设备不在线 */
				// 更新人 updateBy 更新时间 updateTime 为空
				if (this.coStatus > 0 && this.updateBy == "" && this.updateTime == "") {
					var a = $("<a>");
					a.css({
						color : "red"
					});
					a.append("重发");
					a.click(function() {
						reSend(that.coSeq, this);
					});
					div.append("&nbsp;消息发送失败，是否&nbsp;");
					div.append(a);
				}
				li.append($(div));
				panel.append(li);

			});
		}
	}, function(data, err) {

	});
};
/**
 * 重发
 */
var reSend = function(seq, obj) {
	// 请求： /monitor/vehicleCommandManage!repeatSendThVehicleCommand.action
	// 参数： requestParam.equal.coSeq seq
	// 对象参考： ThVehicleCommandManage
	var url = "../../monitor/vehicleCommandManage!repeatSendThVehicleCommand.action";
	JAjax(url, {
		"requestParam.equal.coSeq" : seq
	}, 'json', function(data, err) {
		$.ligerDialog.warn("重发成功", "提示");
		alarmHandler.onResize();
		alarmHandler.onResize();
		$(obj).replaceWith("已重发");
	}, function(data, err) {
		$.ligerDialog.warn("重发失败", "提示");
		alarmHandler.onResize();
		alarmHandler.onResize();
	});
};
var date2utcsA = function(c_date) {
	if (!c_date)
		return "";
	var tempArray2 = c_date.split(" ")[1].split(":");
	var tempArray = c_date.split(" ")[0].split("-");
	if (tempArray.length != 3) {
		alert("你输入的日期格式不正确,正确的格式:2000-05-01 23:23:23");
		return 0;
	}
	var date = new Date(tempArray[0], tempArray[1] - 1, tempArray[2], (tempArray2[0] ? tempArray2[0] : "00"), (tempArray2[1] ? tempArray2[1] : "00"), (tempArray2[2] ? tempArray2[2] : "00"));

	return parseInt("" + date.getTime());
};

date2utcs = function(c_date) {
	if (!c_date)
		return "";
	var tempArray2 = c_date.split(" ")[1].split(":");
	var tempArray = c_date.split(" ")[0].split("-");
	if (tempArray.length != 3) {
		// alert(c_date);
		alert("你输入的日期格式不正确,正确的格式:2000-05-01 23:23:23");
		return 0;
	}
	var date = new Date(tempArray[0], tempArray[1] - 1, tempArray[2], (tempArray2[0] ? tempArray2[0] : "00"), (tempArray2[1] ? tempArray2[1] : "00"), (tempArray2[2] ? tempArray2[2] : "00"));

	return parseInt("" + date.getTime() / 1000);
};

/*
 * 
 * 示例： var dateUTC = strToDate("2011-11-22 10:12"); dateFormat(dateUTC,"yyyy-MM-dd hh:mm"); 返回：2011-11-22 10:12
 */
function dateFormat(date, format) {
	var o = {
		"M+" : date.getMonth() + 1,
		"d+" : date.getDate(),
		"h+" : date.getHours(),
		"m+" : date.getMinutes(),
		"s+" : date.getSeconds(),
		"q+" : Math.floor((date.getMonth() + 3) / 3),
		"S" : date.getMilliseconds()
	};
	if (/(y+)/.test(format)) {
		format = format.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
	}
	for ( var k in o) {
		if (new RegExp("(" + k + ")").test(format)) {
			format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));
		}
	}
	return format;
}
var utcToDate = function(n_utc)
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
// 显示遮罩
// i 为false时隐藏 true 显示
function mask(id, l, i) {
	if (!l) {
		l = "&nbsp;";
	}
	if (i) {
		$("#" + id).loadMask(l);
	} else {
		$("#" + id).unLoadMask(l);
	}
};

/*
 * 弹出窗口
 * 
 */
$.fn.A_Window = function(o) {
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
		// load_fn: function(){ 注册点击页面X关闭事件},
		loading : false,
		mode : true,
		module : ""
	};
	var obj = this;
	apply(p, o);

	if (p.mode) {
		// 取消遮盖
		this.una_Window();

		if (this.css("position") == "static") {
			this.addClass("masked-relative");
		}
		this.addClass("masked");
		var maskDiv = $('<div class="loadmask"></div>');
		// auto height fix for IE
		if (navigator.userAgent.toLowerCase().indexOf("msie") > -1) {
			maskDiv.height(this.height() + parseInt(this.css("padding-top")) + parseInt(this.css("padding-bottom")));
			maskDiv.width(this.width() + parseInt(this.css("padding-left")) + parseInt(this.css("padding-right")));
		}

		// fix for z-index bug with selects in IE6
		if (navigator.userAgent.toLowerCase().indexOf("msie 6") > -1) {
			this.find("select").addClass("masked-hidden");
		}

		this.append(maskDiv);
	}

	var centerX = p.x;
	var centerY = p.y;
	var str = "";
	var search_title = "";
	var title = p.title;

	// 操作模式
	var moduleClass = "title";
	var moduleClassClose = "close";

	var loading;
	if (p.loading) {
		loading = '<div class="loading"><img src="images/loading.gif"/></div>';
	}
	var clazz = "openwindow";

	// 判断是否为弹出页面
	if (p.module == "delete") {
		// 设定弹出页面页头样式, XP样式
		moduleClass = "delete";
		moduleClassClose = "deletePopClose";
	}
	if (p.priv) {
		str = '<div id="' + p.id + '" class=' + clazz + ' style="width: ' + p.width + 'px;height: ' + p.height + 'px;">' + '<div><table><tr><td><input type="hidden" id="priv" name="priv" value="' + o.priv + '" /></td></tr></table></div>' + '<div  class="p_content" style="height: ' + (p.height) + 'px;"></div></div>' + loading;
	} else {// title
		str = '<div id="' + p.id + '" class=' + clazz + ' style="width: ' + p.width + 'px;height: ' + p.height + 'px;">' + '<div  class="p_content" style="height: ' + (p.height) + 'px;"></div></div>' + loading;
	}

	var dw = $(str);

	$(dw).appendTo($(this));
	if (p.background) {
		$(".loading").css({
			'margin-left' : Math.round($(".openwindow").width() - $(".loading").width()) / 2,
			'margin-top' : Math.round($(".openwindow").height() - $(".loading").height()) / 2
		// 'margin-left' :($(this).width() - $(".loading").width()) / 2,
		// 'margin-top' : ($(this).height() - $(".loading").height()) / 2
		});
	} else {
		$(".loading").css({
			'margin-left' : Math.round($(".openwindow1").width() - $(".loading").width()) / 2,
			'margin-top' : Math.round($(".openwindow1").height() - $(".loading").height()) / 2
		});

	}
	dw.css("top", centerY || Math.round(this.height() / 2 - (dw.height() - parseInt(dw.css("padding-top")) - parseInt(dw.css("padding-bottom"))) / 2) + "px");
	// dw.css("top", "300px");
	dw.css("left", centerX || Math.round(this.width() / 2 - (dw.width() - parseInt(dw.css("padding-left")) - parseInt(dw.css("padding-right"))) / 2) + "px");
	if (p.url) {
		$(dw).find("div.p_content").load(p.url, p.data, p.load_fn);
	} else {
		$(dw).find("div.p_content").append(p.html);
	}
	if (p.dragAble && o.dragabId) {
		$(dw).draggable({
			// handle: 'div.title',
			// ,
			containment : '#' + o.dragabId
		// containment : 'parent'
		});
	} else if (p.dragAble) {
		$(dw).draggable({
		// handle: $(dw)// 建议以title拖动 否则滚动条时操作异常
		});
	}
	return $(dw);
};
$.fn.show_A_Window = function() {
	$(this).find("div.openwindow").fadeIn("slow");

};
/**
 * 去除遮盖层
 */
$.fn.una_Window = function(label) {
	this.find(".loadmask-msg,.loadmask").remove();
	this.removeClass("masked");
	this.removeClass("masked-relative");
	this.find("select").removeClass("masked-hidden");
};
// 关闭所有悬浮窗
$.fn.close_ALL_Window = function(o) {
	var p = {
		priv : false
	};
	if (o)
		apply(p, o);
	// o.priv = true 隐藏 false 显示
	var obj = $(this).find("div.openwindow");
	var obj1 = $(this).find("div.openwindow1");
	if (p.priv) {
		$(obj).hide();
		$(obj1).hide();
	} else {
		$(obj).remove();
		$(obj1).remove();
	}
	// 取消遮盖
	this.una_Window();
};

// 根据ID关闭悬浮窗
$.fn.close_A_Window = function(o) {
	var p = {
		priv : false
	};
	if (o)
		apply(p, o);
	// o.priv = true 隐藏 false 显示
	var obj = $("#" + o.id);

	if (p.priv) {
		$(obj).hide();
	} else {
		$(obj).remove();
	}
	// 取消遮盖
	this.una_Window();
};
var apply = function(o, c) {
	if (o && c && typeof c == 'object') {
		for ( var p in c) {
			o[p] = c[p];
		}
	}
	return o;
};


//获取车辆方向图标
//getCarDirectionIcon = function(direction, ifOnline,speed, markerIconType, alarmStatus)
//{
//	var icon = "http://localhost:8888/BsApp/images/vehicleDirection/new/";
//	direction = parseFloat(direction);
//	switch (markerIconType){
//		case "cluster":
//			icon += "c-";
//			break;
//		case "user":
//			icon += "";
//			break;
//		default:
//			icon += "";
//			break;
//	}
//	if(alarmStatus)
//		icon += "a-online-";
//
//	else if (typeof (ifOnline) == "string" && (ifOnline == "true" || ifOnline == "1")){
//		if(markerIconType=="alarm"||alarmStatus) {
//			icon += "a-online-";
//		}else if(markerIconType!="alarm"&&markerIconType!="cluster"&&speed<50){
//			icon += "stop-";
//		}else if(markerIconType!="alarm"&&markerIconType!="cluster"&&speed>700){
//			icon += "warning-";
//		}else{
//			icon += "online-";
//		}
//	}
//	else if (typeof (ifOnline) == "string" && (ifOnline == "false" || ifOnline == "0"))
//		icon += "offline-";
//
//	if (15 > direction || direction >= 345)
//		icon += "0";
//	else if (15 <= direction && direction < 45)
//		icon += "30";
//	else if (45 <= direction && direction < 75)
//		icon += "60";
//	else if (75 <= direction && direction < 105)
//		icon += "90";
//	else if (105 <= direction && direction < 135)
//		icon += "120";
//	else if (135 <= direction && direction < 165)
//		icon += "150";
//	else if (165 <= direction && direction < 195)
//		icon += "180";
//	else if (195 <= direction && direction < 225)
//		icon += "210";
//	else if (225 <= direction && direction < 255)
//		icon += "240";
//	else if (255 < direction && direction < 285)
//		icon += "270";
//	else if (285 <= direction && direction < 315)
//		icon += "300";
//	else if (315 <= direction && direction < 345)
//		icon += "330";
//	else
//		icon += "0";
//	icon += (markerIconType == "alarm" || alarmStatus ? ".gif" : ".png");
//	return icon;
//};
