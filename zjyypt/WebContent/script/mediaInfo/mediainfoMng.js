var mediaInfo = function() {
	this.leftTree;
	this.init();
	this.vehicleNoList = {};
	KCPT.root.mediaObjects = this;
};

mediaInfo.prototype = {
	cache : {
		// 远程多媒体查询seq
		remoteSearchSeq : "",
		remoteCurrentPageIndex : 1,
		local : {
			startTime : "",
			endTime : "",
			mtypeCode : "",
			isOverload : "",
			vids : "",
			localCurrentPageIndex : 1
		},
		remotePlayMediaId : ""
	},
	// mtypeCode0：图像 1：音频 2:视频
	mediaType : {
		IMAGE : "0",
		SOUND : "1",
		MEDIA : "2"
	},
//	orgTree : function() {// 初始化组织结构Tree
//		var obj = this;
//		obj.leftTree = KCPT.root.leftTree;
//		obj.leftTree.setCheckDataName("vid");
//		obj.leftTree.showTabs();
//		obj.leftTree.showGrid();
//		obj.leftTree.show();
//		obj.leftTree.triggerShowObj = obj;
		//KCPT.root.triggerShowObj = obj;
//	},
	show : function() {
		var obj = this;
		obj.leftTree = KCPT.root.leftTree;
		obj.leftTree.setCheckDataName("vid");
//		obj.leftTree.showTabs();
//		obj.leftTree.showGrid();
//		obj.leftTree.show();
//		obj.leftTree.triggerShowObj = obj;
	},
	onResize : function() {
		var center = getHeightAndWidth();
		$("#mediainfonmg").attr("height",(center.height-31)+"px");
		$("#mediainfonmg").attr("width",(center.width-5)+"px");
		var center = getHeightAndWidth();
		$("#mediainfonmg").find(".content").each(function() {
			var cc = $(this).find("div.right_cc");
			cc.css({
				"overflow" : "auto"
			});
			cc.height(center.height - 35-34);
			cc.width('100%');
		});

		var imgConttentH = center.height - 200;
		$("#viewImgDiv").css({
			"height" : imgConttentH
		});
		$("#mediaInfo_remoteListBox").css({
			"height" : imgConttentH
		});
	},
	change : function(node, chlidrens, parent) {
	},
	closePage : function() {
		var obj = this;
		obj.grid.hideAddPage();
		KCPT.root.mediaObjects = null;
	},
	removeSuccess : function(o) {
		$.ligerDialog.success(JSON.stringify(o));
	},
	removeError : function(o) {
		$.ligerDialog.error(JSON.stringify(o));
	},
	init : function() {
		this.initTab();
		$("#mediaInfo_vehicleNoList1").hide();
	},
	initTab : function() {
		var _thisTab = $("#mediaInfo_tabBox").find(".mediaInfoTab_all");

		// 本地查询权限
		var _rs = checkFunction("FG_MEMU_STATIC_SELECT_PIC_LOCAL");
		if (!_rs) {
			_thisTab.find("li:eq(0)").remove();
			$("#mediainfonmg").find("div.right_cc:eq(0)").remove();
			$("#mediainfonmg").find("div.right_cc").show();
			_thisTab.find("a").addClass("mediaInfoTab_back");
		}

		// 远程查询权限
		if (!checkFunction("FG_MEMU_STATIC_SELECT_PIC_REMOTE")) {
			if (!_rs) {
				_thisTab.find("li:eq(0)").remove();
				$("#mediainfonmg").find("div.right_cc:eq(0)").remove();
			} else {
				_thisTab.find("li:eq(1)").remove();
				$("#mediainfonmg").find("div.right_cc:eq(1)").remove();
			}
		}
		_thisTab.find("a").each(function(i) {
			$(this).bind('click', function() {
				_thisTab.find("a").each(function(j) {
					$(this).removeClass("mediaInfoTab_back");
				});
				$(this).addClass("mediaInfoTab_back");
				var _div = $("#mediainfonmg");
				_div.find("div.right_cc").hide();
				_div.find("div.right_cc:eq(" + i + ")").show();
			});
		});

	},
	/**
	 * 本地多媒体查询
	 */
	searchLocalMedia : function() {
		var obj = this;
		var rows = obj.leftTree.GridManager.getCheckedRows();
		if (rows.length < 1) {
			$.ligerDialog.warn("车辆选择不能为空！", "提示");
			return false;
		}
		var startTime = date2utcm($("#media_local_startTime").val());
		var endTime = date2utcm($("#media_local_endTime").val());
		if ("" == startTime) {
			$.ligerDialog.warn("开始时间不能为空！", "提示");
			return false;
		}
		if ("" == endTime) {
			$.ligerDialog.warn("结束时间不能为空！", "提示");
			return false;
		}
		if (startTime > endTime) {
			$.ligerDialog.warn("开始时间不能大于结束时间！", "提示");
			return false;
		}
		var vehicleNo = $("#vehicleNo").val();
		var isOverload = $("#isOverload").find("option:selected").attr("value");
		obj.param = {};
		obj.param["requestParam.rows"] = 10;
		obj.param["requestParam.page"] = 1;

		if (rows.length > 0) {
			var vids = "";
			for ( var i = 0; i < rows.length; i++) {
				vids += rows[i].vid + ",";
				obj.vehicleNoList["" + rows[i].vid + ""] = rows[i].vehicleNo;
			}
			vids = vids.substring(0, vids.length - 1);
		}
		obj.cache.local.vids = vids;
		if (startTime && endTime) {
			obj.cache.local.startTime = startTime;
			obj.cache.local.endTime = endTime;
		}
		obj.cache.local.isOverload = isOverload;
		var _mediaType = $("#local_mediaType option:selected").val();
		obj.cache.local.mtypeCode = _mediaType;
		$('#Searchresult').empty();
		obj.cache.remotePlayMediaId = "";
		obj.localRequerst(1, true);
	},

	localRequerst : function(pageIndex) {

		var _thisref = this;
		// 从缓存中取避免，翻页时更改查询条件，导致结果不同
		_thisref.param = {};
		_thisref.param["requestParam.rows"] = 10;
		_thisref.cache.local.localCurrentPageIndex = pageIndex - 1;
		_thisref.param["requestParam.page"] = pageIndex;
		_thisref.param["requestParam.equal.vids"] = this.cache.local.vids;
		_thisref.param["requestParam.equal.startTime"] = this.cache.local.startTime;
		_thisref.param["requestParam.equal.endTime"] = this.cache.local.endTime;
		_thisref.param["requestParam.equal.isOverload"] = this.cache.local.isOverload;
		_thisref.param["requestParam.equal.mtypeCode"] = this.cache.local.mtypeCode;
		JAjax("operationmanagement/media!findVehicleMediaForListPage.action", _thisref.param, 'json', function(datas, erro) {
			var opt = {
				callback : _thisref.localMediaPageChange,
				current_page : pageIndex - 1
			};
			if (null == datas || datas.Rows.length < 1) {
				$("#Pagination").empty();
				$.ligerDialog.success("查询数据为空！", "提示");
				return false;
			} else {
				$("#Pagination").pagination(datas.Total, opt);
				_thisref.localMedinInfoCallback(pageIndex, datas);
			}

		});

	},

	/**
	 * 本地多媒体查询应答处理
	 * 
	 * @param page_index
	 * @param datas
	 */
	localMedinInfoCallback : function(page_index, datas) {
		var thisref = this;
		var obj = KCPT.root.mediaObjects;
		if (datas) {
			var showContentArray = new Array();
			$('#Searchresult').empty();
			var imgIndex=-1;
			$(datas.Rows).each(function(i) {
				var _mediaType = (this.mtypeCode == "" ? "0" : this.mtypeCode);
				var _url = this.mediaUri;
				var _vid = this.vid;
				var showContent = {};
				var li = $("<li>");
				var atag = $("<a>");
				$(atag).attr('href', 'javascript:void(0)');
				var em = $("<em>");
				var datetimes = utc2Date(this.utc).split("-");
				var months = datetimes[1];
				var dateTime = datetimes[0] + "-" + months + "-" + datetimes[2];
				$(em).text(dateTime);
				$(atag).append($(em));
				var img = $("<img>");
				var _mediaId = this.mediaId;
				$(img).attr('id', this.mediaId);
				var rsText = "";
				if (_mediaType == thisref.mediaType.IMAGE) {
					rsText = "本地图片";
					$(img).attr('src', _url);
					$(img).attr('imgIndex', ++imgIndex);
				} else {
					rsText = "本地音频";
					$(img).attr('src', "images/global/Sound.png");
				}
				$(img).attr('width', '155');
				$(img).attr('height', '120');
				$(img).attr('alt', this.memo);
				$(img).attr('index', i);
				$(img).bind('click', function() {
					obj.showPop(_mediaType, true);
					KCPT.root.mediaIndex = parseInt($(this).attr("index"));
//					if (_mediaType == thisref.mediaType.IMAGE) {
//						KCPT.root.mediaIndex = parseInt($(this).attr("imgIndex"));// 初始显示的图片序号
//					}else{
//						KCPT.root.mediaIndex = parseInt($(this).attr("index"));// 初始显示的音乐序号
//					}
				});
				$(atag).append($(img));

				var _div = $("<div>");
				_div.append(thisref.vehicleNoList[this.vid]);
				_div.append("&nbsp;" + rsText);

				// 播放
				var playBtn = $("<img>");
				playBtn.attr('class', 'remoteMediaInfo_itemButton');
				playBtn.addClass("play");
				playBtn.attr('src', 'images/global/playMedia.png');
				playBtn.attr('style', 'border: 0px;');
				playBtn.attr("value", _mediaId);
				playBtn.bind('click', function() {
					// 音频播放value
					thisref.cache.remotePlayMediaId = $(this).attr("value");
					obj.showPop(_mediaType, true);
					KCPT.root.mediaIndex = i;
				});
				// 重新加载
				var reloadBtn = $("<img>");
				reloadBtn.attr('class', 'remoteMediaInfo_itemButton');
				reloadBtn.addClass("reload");
				reloadBtn.attr('src', 'images/global/reGetMedia.png');
				reloadBtn.attr('style', 'border: 0px;');
				reloadBtn.bind('click', function() {
					thisref.reloadMedia(_mediaId, _vid, li, true, _mediaType);
				});
				$(li).append($(atag));
				$(li).append($(_div));
				$(li).append(playBtn);
				$(li).append(reloadBtn);
//				if (_mediaType == thisref.mediaType.IMAGE) {
					showContent["uri"] = this.mediaUri;
					showContent["mediaId"] = this.mediaId;
					showContent["mediaType"]=_mediaType;
//				}
				showContentArray.push(showContent);
				$('#Searchresult').append($(li));
			});
			KCPT.root.showMediaContent = showContentArray;

			// });
		}
	},
	/**
	 * 加载下拉车辆列表(加载完成后查询在线车辆多媒体数据)
	 * 
	 * @returns {Boolean}
	 */
	loadDropdownVehicleList : function() {
		var obj = this;
		var seq = "";
		$("#mediaInfo_remote_searchResult").empty();
		var rows = obj.leftTree.GridManager.getCheckedRows();

		if (rows.length < 1) {
			$.ligerDialog.warn("车辆选择不能为空！", "提示");
			return false;
		}
		if ("" == $("#media_remote_startTime").val() || "" == $("#media_remote_endTime").val()) {
			$.ligerDialog.warn("时间不能为空！", "提示");
			return false;
		}
		var startTime = date2utcm($("#media_remote_startTime").val());
		var endTime = date2utcm($("#media_remote_endTime").val());
		if (startTime > endTime) {
			$.ligerDialog.warn("开始时间不能大于结束时间！", "提示");
			return false;
		}
		obj.param = {};
		obj.param["requestParam.rows"] = 14;
		obj.param["requestParam.page"] = 1;
		var vids = "";
		for ( var i = 0; i < rows.length; i++) {
			if (i != 0) {
				vids += "&";
			}
			vids += "vids=" + rows[i].vid;
			obj.vehicleNoList["" + rows[i].vid + ""] = rows[i].vehicleNo;
		}
		var _mediaType = $("#rmeote_mediaType option:selected").val();
		// 查询是否在线车辆(查询完成后根据车辆是否在线初始化，下拉列表，然后，在请求在线的多媒体列表)
		var search = function() {

			obj.param["requestParam.equal.mtypeCode"] = _mediaType;
			if (startTime && endTime) {
				obj.param["requestParam.equal.startTime"] = startTime;
				obj.param["requestParam.equal.endTime"] = endTime;
			}

			mask("mediainfonmg", "", true);

			// JAjax("http://www.kypt.cn/operationmanagement/media!terminalCheckImage.action?" + vids, obj.param, 'json', function(datas, erro) {
			JAjax("operationmanagement/media!terminalCheckImageDir.action?" + vids, obj.param, 'json', function(datas, erro) {
				$(datas.Rows).each(function(i) {
					// 1：在线 0：不再线 -1：未注册
					if (this.mediaIdxStatus == "1") {
						if (i != 0) {
							seq += ",";
						}
						seq += this.seq;
					}
				});
				obj.cache.remoteSearchSeq = seq;
				$("#remoteMediaInfo_condition").show();
				initDropdownList(datas, obj);
				mask("mediainfonmg", "", false);
				if ("" != seq) {
					obj.searchRemoteMedia(seq, 1, _mediaType);
				}

			}, function(datas, er) {
				mask("mediainfonmg", "", false);
				$.ligerDialog.warn("获取多媒体失败！", "提示");
			}, null, null, 30000);
		};
		// 初始化车辆下拉列表，如果在线点击则请求多媒体
		var initDropdownList = function(datas, thisref) {
			var options = "";
			$(datas.Rows).each(function(i) {
				var _isonline = this.mediaIdxStatus;// 1：在线 0：不再线 -1：未注册
				var _url = "";
				if (_isonline == "1") {
					_url = "images/global/online.png";
				} else if (_isonline == "0") {
					_url = "images/global/offline.png";
				} else {
					_url = "images/global/offline.png";
				}
				options += "<option title=" + _url + "    value=" + this.seq + "  isOnline=" + this.mediaIdxStatus + " >" + obj.vehicleNoList[this.vid] + "</option>";
			});
			var _d1 = $("#mediaInfo_vehicleNoList1");
			$(".jgd-dropdown").remove();
			_d1.html("");
			_d1.show();
			_d1.html(options);
			_d1.jgdDropdown({
				clsLIPrefix : 'flag ',
				cls : 'jgd-dropdown jgd-countries',
				selected : 'UK',
				callback : function(drop, val) {
					thisref.searchRemoteMedia(val, 1, _mediaType);
				}
			});
			$("#jgd_dd_mediaInfo_vehicleNoList1").find(".dd_openlist").width("152px");
			$("#jgd_dd_mediaInfo_vehicleNoList1").find(".dd_openlist ul").width("150px");
		};
		search();
		$("#mediaInfo_remote_orderSel").bind('change', function() {
			obj.searchRemoteMedia(seq, 1, _mediaType);
		});

		// testStart
		// var _testData = {
		// "Rows" : [ {
		// "mediaId" : "",
		// "lon" : "",
		// "maplat" : "",
		// "gpsTime" : "",
		// "mtypeCode" : "",
		// "direction" : "",
		// "pid" : "",
		// "eventType" : "",
		// "lensNo" : "",
		// "gpsSpeed" : "",
		// "mediaIdxStatus" : "1",
		// "sysutc" : "",
		// "seq" : "1_1329816587_5",
		// "maplon" : "",
		// "vid" : "1394",
		// "lat" : ""
		// } ],
		// "Total" : "0"
		// };
		// mask("mediainfonmg", "", true);
		// initDropdownList(_testData, obj);
		// obj.searchRemoteMedia("1_1329816587_5");
		// mask("mediainfonmg", "", false);
		// testEnd

	},
	/**
	 * 远程多媒体查询
	 * 
	 * @param seq
	 * @param pageIndex
	 * @param mediaType
	 * @param queryStatus
	 *            翻页时状态为1，避免后台再次向终端发请求
	 * @returns {Boolean}
	 */
	searchRemoteMedia : function(seq, pageIndex, mediaType, queryStatus) {
		$("#mediaInfo_remotePagination").empty();
		var _thisBox = $("#mediaInfo_remoteListBox");
		_thisBox.find("ul").empty();
		if ("" == seq) {
			return false;
		}
		var obj = this;
		// // testStart
		// var _testData = {
		// "Rows" : [ {
		// "mediaId" : "1",
		// "lon" : "69808189",
		// "maplat" : "23986523",
		// "gpsTime" : "1329724461000",
		// "mtypeCode" : "1",
		// "direction" : "359",
		// "pid" : "11658fd1-c7cd-48cc-a073-8b71eb6d0b6b",
		// "eventType" : "0",
		// "lensNo" : "1",
		// "gpsSpeed" : "0",
		// "mediaIdxStatus" : "",
		// "sysutc" : "1329816632144",
		// "seq" : "1_1329816587_5",
		// "maplon" : "69811903",
		// "vid" : "106",
		// "lat" : "23985709"
		// }, {
		// "mediaId" : "2",
		// "lon" : "69808359",
		// "maplat" : "23986573",
		// "gpsTime" : "1329725823000",
		// "mtypeCode" : "0",
		// "direction" : "157",
		// "pid" : "95640b97-f176-4e96-8f09-0b3cc0bdb069",
		// "eventType" : "0",
		// "lensNo" : "1",
		// "gpsSpeed" : "0",
		// "mediaIdxStatus" : "",
		// "sysutc" : "1329816632144",
		// "seq" : "1_1329816587_5",
		// "maplon" : "69812074",
		// "vid" : "108",
		// "lat" : "23985759"
		// }, {
		// "mediaId" : "3",
		// "lon" : "69808200",
		// "maplat" : "23986714",
		// "gpsTime" : "1329792812000",
		// "mtypeCode" : "1",
		// "direction" : "358",
		// "pid" : "11ceb505-7d8c-41e8-abf3-835ddd318905",
		// "eventType" : "0",
		// "lensNo" : "1",
		// "gpsSpeed" : "0",
		// "mediaIdxStatus" : "",
		// "sysutc" : "1329816632144",
		// "seq" : "1_1329816587_5",
		// "maplon" : "69811914",
		// "vid" : "109",
		// "lat" : "23985900"
		// }, {
		// "mediaId" : "4",
		// "lon" : "69808209",
		// "maplat" : "23986703",
		// "gpsTime" : "1329793060000",
		// "mtypeCode" : "0",
		// "direction" : "358",
		// "pid" : "864cca19-f602-4047-8d9d-426d4ca9f0c1",
		// "eventType" : "0",
		// "lensNo" : "1",
		// "gpsSpeed" : "0",
		// "mediaIdxStatus" : "",
		// "sysutc" : "1329816632144",
		// "seq" : "1_1329816587_5",
		// "maplon" : "69811924",
		// "vid" : "1394",
		// "lat" : "23985889"
		// }, {
		// "mediaId" : "5",
		// "lon" : "69808249",
		// "maplat" : "23986693",
		// "gpsTime" : "1329793935000",
		// "mtypeCode" : "0",
		// "direction" : "316",
		// "pid" : "3da94ee3-8cd5-4083-932c-193197625f71",
		// "eventType" : "0",
		// "lensNo" : "1",
		// "gpsSpeed" : "0",
		// "mediaIdxStatus" : "",
		// "sysutc" : "1329816632144",
		// "seq" : "1_1329816587_5",
		// "maplon" : "69811964",
		// "vid" : "1394",
		// "lat" : "23985879"
		// }, {
		// "mediaId" : "6",
		// "lon" : "69808279",
		// "maplat" : "23986654",
		// "gpsTime" : "1329794504000",
		// "mtypeCode" : "0",
		// "direction" : "183",
		// "pid" : "3064dd9f-0122-4281-80ac-056e1315d2e5",
		// "eventType" : "0",
		// "lensNo" : "1",
		// "gpsSpeed" : "0",
		// "mediaIdxStatus" : "",
		// "sysutc" : "1329816632145",
		// "seq" : "1_1329816587_5",
		// "maplon" : "69811994",
		// "vid" : "1394",
		// "lat" : "23985840"
		// }, {
		// "mediaId" : "7",
		// "lon" : "69808140",
		// "maplat" : "23986873",
		// "gpsTime" : "1329801047000",
		// "mtypeCode" : "0",
		// "direction" : "209",
		// "pid" : "d88f7857-c5a6-467e-9169-8257c4d3fd96",
		// "eventType" : "0",
		// "lensNo" : "1",
		// "gpsSpeed" : "0",
		// "mediaIdxStatus" : "",
		// "sysutc" : "1329816632145",
		// "seq" : "1_1329816587_5",
		// "maplon" : "69811854",
		// "vid" : "1394",
		// "lat" : "23986059"
		// }, {
		// "mediaId" : "8",
		// "lon" : "69808509",
		// "maplat" : "23986993",
		// "gpsTime" : "1329802582000",
		// "mtypeCode" : "0",
		// "direction" : "47",
		// "pid" : "1c2a8e00-985b-407a-af11-2b91b2b0057c",
		// "eventType" : "0",
		// "lensNo" : "1",
		// "gpsSpeed" : "0",
		// "mediaIdxStatus" : "",
		// "sysutc" : "1329816632145",
		// "seq" : "1_1329816587_5",
		// "maplon" : "69812224",
		// "vid" : "1394",
		// "lat" : "23986179"
		// }, {
		// "mediaId" : "9",
		// "lon" : "69808399",
		// "maplat" : "23986954",
		// "gpsTime" : "1329802650000",
		// "mtypeCode" : "0",
		// "direction" : "47",
		// "pid" : "120f5932-07e2-48cc-b9b9-df20a92cd3e4",
		// "eventType" : "0",
		// "lensNo" : "1",
		// "gpsSpeed" : "0",
		// "mediaIdxStatus" : "",
		// "sysutc" : "1329816632145",
		// "seq" : "1_1329816587_5",
		// "maplon" : "69812114",
		// "vid" : "1394",
		// "lat" : "23986140"
		// }, {
		// "mediaId" : "10",
		// "lon" : "69808219",
		// "maplat" : "23986813",
		// "gpsTime" : "1329814097000",
		// "mtypeCode" : "0",
		// "direction" : "359",
		// "pid" : "16aac10f-a3b0-488f-8575-27c61d3c989b",
		// "eventType" : "0",
		// "lensNo" : "1",
		// "gpsSpeed" : "0",
		// "mediaIdxStatus" : "",
		// "sysutc" : "1329816632145",
		// "seq" : "1_1329816587_5",
		// "maplon" : "69811933",
		// "vid" : "1394",
		// "lat" : "23985999"
		// } ],
		// "Total" : "10"
		// };
		// $("#remoteMediaInfo_condition").show();
		// obj.remoteMediaInfoCallBack(0, _testData);
		// testEnd
		mask("mediainfonmg", "", true);
		obj.param = {};
		obj.param["requestParam.rows"] = 10;
		obj.param["requestParam.page"] = pageIndex;
		obj.cache.remoteCurrentPageIndex = pageIndex - 1;
		obj.param["requestParam.order"] = "gpsTime";
		obj.param["mtypeCode"] = mediaType;
		if (queryStatus) {
			obj.param["queryStatus"] = "1";
		}
		obj.param["requestParam.sort"] = $("#mediaInfo_remote_orderSel option:selected").val();
		obj.param["seq"] = seq;
		// 查询远程多媒体(通过终端获取)
		JAjax("operationmanagement/media!terminalCheckImageDirBySeq.action", obj.param, 'json', function(datas, erro) {
			var opt = {
				callback : obj.remoteMediaPageChange,
				items_per_page : 10,
				current_page : pageIndex - 1
			};
			$("#remoteMediaInfo_condition").show();
			if (datas.Rows.length > 0) {
				$("#mediaInfo_remotePagination").pagination(datas.Total, opt);
				obj.remoteMediaInfoCallBack(datas);
			} else {
				$.ligerDialog.warn("对不起，未查询到数据！", "提示");
			}
			mask("mediainfonmg", "", false);
		}, function(datas, er) {
			$.ligerDialog.warn("获取多媒体数据失败！", "提示");
			mask("mediainfonmg", "", false);
		}, null, null, 120000);

	},
	/**
	 * 本地多媒体页面翻页时，重新查询
	 * 
	 * @param pageIndex
	 */
	localMediaPageChange : function(pageIndex) {
		$("#Searchresult").empty();
		if (media.cache.local.localCurrentPageIndex != pageIndex) {
			media.localRequerst(pageIndex + 1);// 翻页控件第0页为第一页
		}
	},
	/**
	 * 远程多媒体页面翻页时，重新查询
	 * 
	 * @param pageIndex
	 */
	remoteMediaPageChange : function(pageIndex) {
		$("#mediaInfo_remote_searchResult").empty();
		if (media.cache.remoteCurrentPageIndex != pageIndex) {
			media.searchRemoteMedia(media.cache.remoteSearchSeq, pageIndex + 1, true);// 翻页控件第0页为第一页
		}
	},
	/**
	 * 远程多媒体查询应答处理
	 * 
	 * @param page_index
	 * @param datas
	 */
	remoteMediaInfoCallBack : function(datas) {
		var thisref = this;
		var _thisBox = $("#mediaInfo_remoteListBox");
		var obj = KCPT.root.mediaObjects;
		if (datas) {
			var showContentArray = new Array();
			$(datas.Rows).each(function(i) {
				var _mediaType = this.mtypeCode;
				var _mediaId = this.mediaId;
				var _vid = this.vid;
				var showContent = {};
				var li = $("<li>");
				var atag = $("<a>");
				$(atag).attr('href', 'javascript:void(0)');
				var em = $("<em>");
				var datetimes = utc2Date(this.gpsTime).split("-");
				var months = datetimes[1];
				if (months < 10) {
					months = months;
				}
				var dateTime = datetimes[0] + "-" + months + "-" + datetimes[2];
				$(em).text(dateTime);
				$(atag).append($(em));
				var img = $("<img>");
				var rsText = "";
				if (_mediaType == thisref.mediaType.IMAGE) {
					rsText = "终端图片";
					$(img).attr('src', "images/global/picture.png");
				} else {
					rsText = "终端音频";
					$(img).attr('src', "images/global/Sound.png");
				}
				$(img).attr('id', this.mediaId);
				$(img).attr('width', '155');
				$(img).attr('height', '120');
				$(img).attr('alt', this.memo);
				$(atag).append($(img));

				var _div = $("<div>");
				_div.append(thisref.vehicleNoList[this.vid]);
				_div.append("&nbsp;" + rsText);

				// 播放
				var playBtn = $("<img>");
				playBtn.attr('class', 'remoteMediaInfo_itemButton');
				playBtn.attr('src', 'images/global/playMedia.png');
				playBtn.attr('style', 'border: 0px;');
				playBtn.addClass("play");
				playBtn.bind('click', function() {
					thisref.cache.remotePlayMediaId = $(this).attr("value");
					obj.showPop(_mediaType, false);
				});
				playBtn.hide();

				// 重新加载
				var reloadBtn = $("<img>");
				reloadBtn.attr('class', 'remoteMediaInfo_itemButton');
				reloadBtn.attr('src', 'images/global/reGetMedia.png');
				reloadBtn.attr('style', 'border: 0px;');
				reloadBtn.addClass("reload");
				reloadBtn.bind('click', function() {
					thisref.reloadMedia(_mediaId, _vid, li, true, _mediaType);
				});
				reloadBtn.hide();

				// 获取
				var getBtn = $("<img>");
				getBtn.attr('class', 'remoteMediaInfo_itemButton');
				getBtn.addClass("load");
				getBtn.attr('src', 'images/global/getMedia.png');
				getBtn.attr('style', 'border: 0px;');
				getBtn.bind('click', function() {
					thisref.reloadMedia(_mediaId, _vid, li, false, _mediaType);
				});

				$(li).append($(atag));
				$(li).append($(_div));
				$(li).append(getBtn);
				$(li).append(playBtn);
				$(li).append(reloadBtn);
				_thisBox.find("ul").append($(li));
			});
		}

	},
	/**
	 * 重新加载多媒体
	 * 
	 * @param mediaId
	 * @param vids
	 * @param li
	 */
	reloadMedia : function(multMediaId, vids, li, isReload, mediaType) {
		// testStart
		// var _testData = {
		// "alarmCode" : "",
		// "deviceNo" : "",
		// "dimension" : "",
		// "direction" : 0,
		// "elevation" : 0,
		// "enableFlag" : "",
		// "entId" : 0,
		// "entName" : "",
		// "eventStatus" : 0,
		// "eventType" : "",
		// "eventid" : "",
		// "fileSize" : 0,
		// "fileType" : "",
		// "gpsSpeed" : 0,
		// "isOverload" : 0,
		// "lat" : 0,
		// "lensNo" : 0,
		// "lon" : 0,
		// "maplat" : 0,
		// "maplon" : 0,
		// "mediaId" : "",
		// "mediaUri" : "test.jpg",
		// "memo" : "",
		// "mformatCode" : "",
		// "mtypeCode" : "1",
		// "multMediaId" : "",
		// "sampleRate" : 0,
		// "sendUser" : 0,
		// "seq" : "",
		// "statusCode" : "",
		// "sysutc" : 0,
		// "utc" : 0,
		// "vehicleNo" : "",
		// "vid" : 0
		// };
		// var _t;
		// $(li).find("img").eq(1).hide();
		// $(li).find("img").eq(2).hide();
		// $(li).find("img").eq(3).hide();
		// var _span = $("<span>");
		// _span.append("重新加载成功");
		// $(li).append($(_span));
		// var _showBtns = function() {
		// var imgs = $(li).find("img");
		// if (imgs.length > 3) {
		// $(li).find("img:eq(1)").remove();
		// }
		// $(li).find("span").remove();
		// imgs.show();
		// if (_testData.mtypeCode == "0") {
		// $(li).parent().find("img:eq(0)").attr("src", _testData.mediaUri);
		// }
		//
		// clearTimeout(_t);
		// };
		// _t = setTimeout(_showBtns, 1000);

		// requestParam.equal.multMediaId：多媒体ID
		// requestParam.equal.vid：车辆ID
		// requestParam.equal.mtypeCode：多媒体类型 空为全部、0图片、1音频、2视频
		// requestParam.equal.type：是否重新获取0：获取，1：重新获取
		// testEnd

		var _isReload = "0";
		if (isReload) {
			_isReload = "1";
		}
		var param = {
			"requestParam.equal.multMediaId" : multMediaId,
			"requestParam.equal.vid" : vids,
			"requestParam.equal.mtypeCode" : mediaType,
			"requestParam.equal.type" : _isReload
		};
		$(li).find(".play").hide();
		$(li).find(".load").hide();
		$(li).find(".reload").hide();
		var _img = $("<img>");
		$(_img).attr('id', "mediaInfo_reload_Loading");
		$(_img).attr('src', "images/global/loading.gif");
		$(_img).attr('width', "32");
		$(_img).attr('height', "32");
		$(_img).attr('style', "border:0px;margin-left:50px;");
		$(li).append($(_img));

		var success = function(datas) {
			var _t;
			var _span = $("<div>");
			_span.css({
				height : "32"
			});
			_span.append("重新加载成功");
			$(li).append($(_span));
			$("#mediaInfo_reload_Loading").remove();
			var _showBtns = function() {
				$(li).find("div:eq(1)").remove();
				$(li).find(".reload").show();
				$(li).find(".play").show();
				$(li).find(".play").attr("value", datas.mediaId);
				if (datas.mtypeCode == "0") {
					$(li).find("img:eq(0)").attr("src", datas.mediaUri);
				}
				clearTimeout(_t);
			};
			_t = setTimeout(_showBtns, 1000);
		};

		var fail = function() {
			var _t;
			$(li).find(".play").hide();
			var _span = $("<div>");
			_span.append("重新加载失败");
			_span.css({
				height : "32"
			});
			$(li).append($(_span));
			$("#mediaInfo_reload_Loading").remove();
			var _showBtns = function() {
				$(li).find(".reload").show();
				$(li).find("div:eq(1)").remove();
				clearTimeout(_t);
			};
			_t = setTimeout(_showBtns, 1000);
		};

		JAjax("operationmanagement/media!terminalCheckImage.action", param, 'json', function(datas, erro) {
			if ("" != datas.mediaUri) {
				success(datas);
			} else {
				fail();
			}
		}, function(datas, er) {
			fail();
		}, true, null, 60000);

	},
	setToday : function() {
		var obj = this;
		var nowDate = getnowTime(true);
		// 时间
		$("#media_local_startTime").val(nowDate);
		$("#media_local_endTime").val(nowDate);
		$("#media_remote_endTime").val(nowDate);
		$("#media_remote_startTime").val(nowDate);
	},
	/**
	 * 显示新窗口，如果为远程多媒体，则无上一页，下一页按钮
	 * 
	 * @param popType
	 * @param isShowPage
	 *            是否显示上一页，下一页，远程多媒体无分页
	 */
	showPop : function(popType, isShowPage) {
		var _url = "", thisref = this;
		// mtypeCode 0：图像 1：音频 2:视频
		switch (popType) {
		case thisref.mediaType.IMAGE:
			_url = "model/mediaInfo/viewImgInfo.jsp";
			break;
		case thisref.mediaType.SOUND:
			_url = "model/mediaInfo/viewSound.jsp";
			break;
		case thisref.mediaType.MEDIA:
			_url = "";
			break;
		}
		$("#mainWorkArea").A_Window({
			dragabId : 'mediainfonmg',
			width : 560,
			id : "mediaInfo_showDetailWin",
			height : 373,
			load_fn : function() {
				// 超载判定
				if (!checkFunction("FG_MEMU_STATIC_SELECT_PIC_OVERLOAD")) {
					$("#viewImgInfo_isOverLoad").remove();
					$("#viewSoundInfo_isOverLoad").remove();
				}
				$("#popClose").click(function() {
					$("#mediaInfo_SoundContainer").empty();
					var player = document.getElementById("mediaInfo_Player");
					if (player) {
						player.controls.stop();
					}
					$("#mainWorkArea").close_ALL_Window("mediaInfo_showDetailWin");
				});
				if (!isShowPage) {
					$("#mediaInfo_imgPop_page").hide();
				} else {
					if (popType == thisref.mediaType.IMAGE && KCPT.root.mediaIndex == 0) {
						$("#prevImg").hide();
					}
				}
				if (KCPT.root.showMediaContent.length == 1) {
					$("#prevImg").hide();
					$("#nextImg").hide();
				}
			},
			url : _url
		});
		$("#mainWorkArea").show_A_Window();// 弹框
	}
};

$(document).ready(function() {
	var media = new mediaInfo();
	media.setToday();
	window.media = media;
	media.onResize();
	media.show();
	//runManager.addChildList(media);
	//runManager.showObj = media;
	$("#findMedia").bind("click", function() {
		media.searchLocalMedia();
	});
	$("#remote_findMedia").bind("click", function() {
		media.loadDropdownVehicleList();
	});
	KCPT.onresizeObj = media;
});
