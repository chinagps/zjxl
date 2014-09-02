/**
 * 皖H06276（27） 湘N09903(320)
 */
var alarmHandlerVedio = function(params) {
	this.params = params;
	this.params = params;
	// this.params.vid=27;
	var m_vidiconId = "20110824001", iStreamType = "1", iPuGetStreamMode = "1";
	// 注册服务器IP、端口
	var m_szRegIP = "221.12.122.194";// "58.83.236.27";
	var m_iRegPort = "7660";
	// 流媒体服务器IP、端口、使用方式(3种～2种，参数不详细，默认1就ok)
	var m_szRsmIP = "58.83.236.27";
	var m_iRsmPort = "7554";
	var m_iRsmUseType = "1";
	// 系统视频登录的用户名和密码
	var m_user = "root";
	var m_password = "12345";
	var _thisref = this;
	// 中科视频使用的
	this._videoActivex;
	this.videoNameList = new Array();
	this.videoIdList = new Array();
	$('a[rel*=downloadr]').downloadr();
	this.zhongKeDianParams = {
		IsReadConfigFiles : false,
		GroupID : "administrators",
		LoginUser : "admin",
		LoginPasswd : "1234",
		ServerIP : "124.16.134.60",// 124.16.135.34
		ServerPort : "9900",
		deviceName:"7001213",
		IsSaveVideo:false,
		ChID:1,
	    SaveFilePath:"C:\\VS_Video\\"
	};
	this.init();
};
alarmHandlerVedio.prototype = {
	init : function() {
		var _thisref = this;
		var url = "vedio.html";
		_thisref.params.container.load(url, {}, function() {
			_thisref.getVideoSource();

		});
	},
	getVideoSource : function() {
		var _thisref = this;
		JAjax("../../monitor/sendVidioCommand.action", {
			"requestParam.equal.vid" : _thisref.params.vid
		}, 'json', function(data, err) {
			//data=[{vidioOemCode:3},{vidioOemCode:3}];//测试中科电视频使用
			if (data && data.error)
				return false;
			else
				_thisref.compileVideo(data);
		}, function(data, err) {
			// alert("获取车辆视频源错误");
		});
	},
	compileVideo : function(data) {
		var _thisref = this;
		$(data).each(function(i) {
			var vidioOemCode = this.vidioOemCode;
			if (vidioOemCode == "1") {
				_thisref.compileVideoForWeiSen(this.vidioUrl, i + 1);
			} else if (vidioOemCode == "2") {
				_thisref.compileVideoForHaiKang(this, i + 1);
			}else if(vidioOemCode=="3"){
				_thisref.compileVideoForZhongKeDidan(this, i + 1);
			}else
				return false;
			
		});
		if (data[0]["vidioOemCode"] == "1")
			_thisref.playWeiSenVideo();
	},
	playWeiSenVideo : function() {
		var _thisref = this;
		if (document.video1) {
			try {
				document.video1.play();
			} catch (e) {
			}
			_thisref.params.container.find("object[name='video1']").attr({
				"width" : 235,
				"height" : 173
			}).css({
				"width" : 235,
				"height" : 173
			}).end();
		} else
			_thisref.params.container.find("div.videoDiv:eq(0)").html("无法连接该路视频");

		setTimeout(function() {
			if (document.video2) {
				try {
					document.video2.play();
				} catch (e) {
				}
				_thisref.params.container.find("object[name='video2']").attr({
					"width" : 235,
					"height" : 173
				}).css({
					"width" : 235,
					"height" : 173
				}).end();
			} else
				_thisref.params.container.find("div.videoDiv:eq(1)").html("无法连接该路视频");
		}, 8000);
		setTimeout(function() {
			if (document.video3) {
				try {
					document.video3.play();
				} catch (e) {
				}
				_thisref.params.container.find("object[name='video3']").attr({
					"width" : 235,
					"height" : 173
				}).css({
					"width" : 235,
					"height" : 173
				}).end();
			} else
				_thisref.params.container.find("div.videoDiv:eq(2)").html("无法连接该路视频");
		}, 16000);
		setTimeout(function() {
			if (document.video4) {
				try {
					document.video4.play();
				} catch (e) {
				}
				_thisref.params.container.find("object[name='video4']").attr({
					"width" : 235,
					"height" : 173
				}).css({
					"width" : 235,
					"height" : 173
				}).end();
			} else
				_thisref.params.container.find("div.videoDiv:eq(3)").html("无法连接该路视频");
		}, 24000);
	},
	compileVideoForWeiSen : function(videoUrl, i) {
		var _thisref = this;
		if (videoUrl)
			_thisref.params.container.find("div.videoDiv:eq(" + (i - 1) + ")").append(
					'<OBJECT classid="clsid:E23FE9C6-778E-49D4-B537-38FCDE4887D8"' + 'codebase="http://downloads.videolan.org/pub/videolan/vlc/latest/win32/axvlc.cab"' + 'width="235" height="173" name="video' + i + '" events="True">' + '<param name="Src" value="' + videoUrl + '" />' + '<param name="ShowDisplay" value="True" />' + '<param name="AutoLoop" value="True" />'
							+ '<param name="AutoPlay" value="False" />' + '<param name="Volume" value="100" />' + '</OBJECT>');
	},
	compileVideoForWeiSen : function(videoUrl, i) {
		var _thisref = this;
		if (videoUrl)
			_thisref.params.container.find("div.videoDiv:eq(" + (i - 1) + ")").append(
					'<OBJECT classid="clsid:E23FE9C6-778E-49D4-B537-38FCDE4887D8"' + 'codebase="http://downloads.videolan.org/pub/videolan/vlc/latest/win32/axvlc.cab"' + 'width="235" height="173" name="video' + i + '" events="True">' + '<param name="Src" value="' + videoUrl + '" />' + '<param name="ShowDisplay" value="True" />' + '<param name="AutoLoop" value="True" />'
							+ '<param name="AutoPlay" value="False" />' + '<param name="Volume" value="100" />' + '</OBJECT>');
	},
	compileVideoForHaiKang : function(videoParams, i) {
		var _thisref = this;
		if (videoParams) {
			_thisref.params.container.find("div.videoDiv:eq(" + (i - 1) + ")").append('<OBJECT classid="clsid:EE4EA829-B8DA-4229-AC72-585AF45AD778"' + 'codebase=""' + 'width="235" height="173" name="video' + i + '" id="PPVS' + i + '" class="haikang">' + '</OBJECT>');
			_thisref.RunPlay(videoParams, i);
		}
	},
	RunPlay : function(videoParams, num) {
		var _thisref = this;
		var PlayOCX = document.getElementById("PPVS" + num);
		var videoChanel = videoParams.caNum;
		var lConDevice = PlayOCX.ConnectDeviceByACS(videoParams.deviceName, videoParams.regServerIp, videoParams.regServerPort, videoParams.username, videoParams.userpass);
		if (0 > lConDevice) {
			alert("连接设备失败！");
			return;
		}
		PlayOCX.SetDeviceInfoForShow('视频通道:' + videoChanel);
		PlayOCX.StreamPlayStartByTCP(videoParams.serverIp, videoParams.serverPort, videoParams.deviceName, videoChanel, iStreamType, iPuGetStreamMode);
	},
	StopPlay : function(num) {
		var PlayOCX = document.getElementById("PPVS" + num);
		PlayOCX.StreamPlayStop();
	},
	compileVideoForZhongKeDidan : function(Params, i) {
		var _thisref = this;
		var paly = function() {
			var obj = document.getElementById("axVideo" + i);
			obj.IsReadConfigFiles = _thisref.zhongKeDianParams.IsReadConfigFiles;
			obj.GroupID = _thisref.zhongKeDianParams.GroupID;
			obj.LoginUser = _thisref.zhongKeDianParams.LoginUser;
			obj.LoginPasswd = _thisref.zhongKeDianParams.LoginPasswd;
			obj.ServerIP = _thisref.zhongKeDianParams.ServerIP;
			obj.ServerPort = _thisref.zhongKeDianParams.ServerPort;
			obj.IsSaveVideo= _thisref.zhongKeDianParams.IsSaveVideo;
			obj.SaveFilePath = _thisref.zhongKeDianParams.SaveFilePath;
			// VS_CONNECTSERVER 当控件与Server连接成功或失败后，触发该事件
			obj.attachEvent('VS_CONNECTSERVER', function() {
				obj.StartPlay(_thisref.zhongKeDianParams.deviceName,i);
			});
			obj.Init();
			obj.SetVideoWndNum(1);
		};
		if (Params) {
			_thisref.params.container.find("div.videoDiv:eq(" + (i - 1) + ")").append('<object classid="clsid:04F60EAE-29E7-4617-A2BC-D0D44CCF8CF8" codebase="VS_Video3.0\VS_Video.cab#version=3,0,12,410"  width="235" height="173" id="axVideo' + i + '"+ name="axVideo"> </object>');
			if (Params.IsReadConfigFiles)
			{
				_thisref.zhongKeDianParams.IsReadConfigFiles = Params.IsReadConfigFiles;
			}
			if (Params.username)
			{
				 _thisref.zhongKeDianParams.LoginUser = Params.username;
			}
			if (Params.password)
			{
				_thisref.zhongKeDianParams.LoginPasswd = Params.password;
			}
			if (Params.GroupId)
			{
				_thisref.zhongKeDianParams.GroupID = Params.GroupId;
			}
			if (Params.serverPort)
			{
				_thisref.zhongKeDianParams.ServerPort = Params.serverPort;
			}
			if (Params.AlarmOpenVideo)
			{
				z_AlarmOpenVideo = Params.AlarmOpenVideo;
			}
			if (Params.ShowDetailInfo)
			{
				z_ShowDetailInfo = Params.ShowDetailInfo;
			}
			if (Params.USETCPTransData)
			{
				z_USETCPTransData = Params.USETCPTransData;
			}
			if (Params.IsLDblClkFullScreen)
			{
				z_IsLDblClkFullScreen = Params.IsLDblClkFullScreen;
			}
			if (Params.DecodeBussSize)
			{
				z_DecodeBussSize = Params.DecodeBussSize;
			}
			if (Params.serverIp)
			{
				 _thisref.zhongKeDianParams.ServerIP = Params.serverIp;
			}
			if (Params.deviceName)
			{
				_thisref.zhongKeDianParams.deviceName = Params.deviceName;
			}
			paly();
		}
		

	}

};