if (!KCPT)
{
	var KCPT = {
		user : {},
		funlist:[],
		//在百度地图中查看位置对象缓存
		baiduMapPointList:{}
	};
}
KCPT.TITLE = "中交兴路运营平台";
KCPT.VehicleMonitor = null;// 全局车辆监控对象引用
KCPT.SearchTree = null;// 全局带搜索功能的树形结构
try{
	KCPT.CodeManager=new codeManager();
}catch(e){}
// 字典表对象
KCPT.GeneralCode;

KCPT.min_height = 635;
KCPT.min_width = 1020;

KCPT.EmphasisMonitorSuccessStatus = false;//重点监控命令发送成功/失败状态值
KCPT.AlarmMessageCommandSuccessStatus = [];//报警处理中消息发送命令成功/失败状态值
KCPT.VehicleMessageCommandSuccessStatus = [];//单车处理中消息发送命令成功/失败状态值
KCPT.AlarmMonitorCommandSuccessStatus = false;//报警处理中监听发送成功/失败状态值
KCPT.VehicleMonitorCommandSuccessStatus = false;//单车处理中监听发送成功/失败状态值
KCPT.AlarmRecordCommandSuccessStatus = false;//报警处理中录音发送成功/失败状态值
KCPT.VehicleRecordCommandSuccessStatus = []; //单车处理中录音发送成功/失败状态值
KCPT.VehicleCallNameComandSuccessStatus = false;//批量点名发送成功/失败状态值

KCPT.VehicleLatestStatusWindows = {};//批量监控对象管理器
KCPT.VehicleLatestStatusWindowsNumLimit = 4;//批量监控对象数量限制

KCPT.schedulePreMessage = null;//预设调度信息

KCPT.ActionRecordsObj = null;//收发记录窗口对象缓存

//VehicleMonitor对象的缓存
KCPT.VehicleMonitorObj = null;
//车辆监控页面树形组件缓存
KCPT.ctfoTreeCache = null;
//notify 使用的container
var $notifyContainer;

var VehilceDetailId;
var RoleDetailId=0;
KCPT.alarmVoice = true;

KCPT.onresizeObj = null;

KCPT.cache={
		//报警级别缓存列表（严重，紧急，一般  格式： alarmLevelList:[{ alarmCode:0,alarmName:"紧急",levelCode：0}]
		alarmLevelList:[]
};

KCPT.LeftPanelTree;

//登录页面地址
KCPT.index_url = "index_yy.jsp";
//首页地址
KCPT.home_url = "home_yy.html";