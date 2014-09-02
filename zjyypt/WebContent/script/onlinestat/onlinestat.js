var onlinestat = function() {
	this.name = "在线统计率";
	this.flag = true;
	this.ONLINE_EMP = false;//导出
	this.ONLINE_YYINFO = false;//运营信息
	this.ONLINE_ZXINFO = false;//在线信息
	this.titleHeight = $("#onlineSearchform").height();
};
onlinestat.prototype = {
	orgTree : function() {// 初始化组织结构Tree
		var obj = this;
//		obj.leftTree = KCPT.root.leftTree;
//		obj.leftTree.hideTabs();
//		obj.leftTree.hidengrid();
//		obj.leftTree.show();
//		obj.leftTree.triggerShowObj = obj;
		KCPT.root.triggerShowObj = obj;
	},
//	show : function() {
//		var obj = this;
//		obj.orgTree();
//	},
	getGridHeight : function(){
		var center = getHeightAndWidth();
		return center.height - this.titleHeight - 86;
	},
	onResize : function() {
		var obj = this;
		if(obj.gridManager){
			obj.gridManager.setHeight(obj.getGridHeight());
		} 	
	},
	// 增加的权限验证
	authentication : function() {
		this.ONLINE_EMP = checkFunction("FG_MEMU_STATIC_STATIC_TLOG_EMP");// 导出
		this.ONLINE_YYINFO = checkFunction("FG_MEMU_STATIC_STATIC_TLOG_YYINFO");// 营运信息
		this.ONLINE_ZXINFO = checkFunction("FG_MEMU_STATIC_STATIC_TLOG_ZXINFO");// 在线信息
		if (!this.ONLINE_EMP) {
			$("#gridExport").remove();
		}
	},
	onlinestatGrid : function() {// 初始化列表页面Grid
		var obj = this;
		var height = obj.getGridHeight();
		var options = {
			// 列
			columns : [
					{
						display : '序号',
						name : 'serail',
						width : 40,
						sortable : true,
						align : 'center'
					},
					{
						display : '分公司',
						name : 'pentName',
						width : 160,
						align : 'center'
					},
					{
						display : '车队',
						name : 'entName',
						width : 120,
						align : 'center'
					},
					{
						display : '车辆总数',
						name : 'sumVel',
						width : 110,
						align : 'center'
					},
					{
						display : '营运车辆数',
						name : 'cotOperstate',
						width : 110,
						align : 'center'
					},
					{
						display : '停运车辆数',
						name : 'nocotOperstate',
						width : 90,
						align : 'center'
					},
					{
						display : '在线车辆数',
						name : 'isonline',
						width : 100,
						align : 'center'
					},
					{
						display : '未在线车辆数',
						name : 'noisonline',
						width : 90,
						align : 'center'
					},
					{
						display : '实时在线率',
						name : 'onlineRate',
						width : 100,
						align : 'center',
						render: function(row){
							var bai = row.onlineRate;
							if (bai == '.00'){
								return '0'+bai+'%';
							} else {
								return bai+'%';
							}
						}
					},
					{
						display : '操作',
						name : 'handleState',
						width : 140,
						align : 'center',
						render : function(row) {
								var oper = '';
								var online = '';
								if(obj.ONLINE_YYINFO){
									oper ='<a href="javascript:objop.vstate('+ row.entId + ')">营运信息</a>';
								}
								if(obj.ONLINE_ZXINFO){
									online = '&nbsp;&nbsp;<a href="javascript:objop.vonline('+ row.entId +',' + row.utc+ ')">在线信息</a>';
								}
							return oper + online;
						}
					} ],
			/**
			 * 首页
			 */
			sortName : 'serail',
			showCheckbox : false,
			showTitle : false,
			pageSize : 30,
 			url : 'baseinfo/searchByParamOnLine.action',// 数据请求地址
			height : height,
			width : "99.8%",
			autoLoad : false,
			mainContain : "onlinestatDIV",
			gridDIV : "onlinestatcontentDIV",
			tableId : 'onlinestatGrid', // 填充数据的tableid
			searchFormId : 'onlineSearchform',   // 查询条件formid
			Buttons : [ {
                id : "gridExport",
                fun : function() {
                	window.objop.grid.exportExcel(1, 2);
                }
            }],
            exportAction : "baseinfo/exportDataToExcel.action",
            gridBeforeSubmit : function(){
            	var entId = $("#parentOrgIdOper").val();
            	if (entId == null || entId == ''){
            		$.ligerDialog.alert("请选择机构后再进行查询！","提示",'warn');
            		return false;
            	}
            	var beforeutc = $("#beforeutc").val();
            	if (beforeutc == 0 || beforeutc > 1440 || beforeutc == '' || beforeutc == null){
            		$.ligerDialog.alert("统计时间段在  0---1440分钟！","提示",'warn');
            		return false;
            	}
            	return true;
            },
            onBeforeShowData : function (data) {
                checkData(data);
                return true;
            },
            onAfterShowData : function(data){
                if (!data && !data.Total && data.Total == 0 && !data.error){
                    $.ligerDialog.alert("查询无结果！","提示");
                }
            }
		};
		obj.grid = new ctfoGrid(options);
		obj.gridManager = $("#onlinestatGrid").ligerGetGridManager();
	},
	/**
	 * 营运明细
	 * @param entId
	 */
	vstate : function(entId) {
		$("#mainWorkArea")
				.A_Window(
						{ 
							dragabId : 'mainWorkArea', 
							id : 'vstate',
							priv : entId,
							width : 659, // 宽度
							height : 500,// 高度
							load_fn : function() {
								$("#CloseDivY").click(function() {
									$("#mainWorkArea").close_ALL_Window();
								});
							},
							url : 'model/onlinestat/vstate.jsp?entId='+ entId 
						});
	},
	/**
	 * 在线明细 ，需要时间参数
	 * @param entId ,utc
	 */
	vonline : function(entId,utc) {
		beforeutc = $("#beforeutc").val();
		$("#mainWorkArea")
				.A_Window(
						{ 
							dragabId : 'mainWorkArea', 
							id : 'vonline',
							priv : entId,
							width : 700, // 宽度
							height : 500,// 高度
							load_fn : function() {
								$("#CloseDivL").click(function() {
									$("#mainWorkArea").close_ALL_Window();
								});
							},
							url : 'model/onlinestat/vonline.jsp?entId='+ entId + '&utc='+utc + '&beforeutc=' + beforeutc
						});
	},
	/**
	 * 改变组织机构
	 * @param date    <s:property value="#parameters.entId" />
	 */
	change : function(date) {
		var obj = this;
		var checkedOrg = $("#parentOrgNameOper");
		var checkedOrgId = $("#parentOrgIdOper");
		checkedOrgId.empty();
		checkedOrg.empty();
		checkedOrg.append(date.data.text);
		checkedOrgId.val(date.data.id);
		
		var checkedOrgAdd = $("#parentOrgNameAddOper");
		var checkedOrgIdAdd = $("#parentOrgIdAddOper");
		checkedOrgIdAdd.empty();
		checkedOrgAdd.empty();
		checkedOrgAdd.append(date.data.text);
		checkedOrgIdAdd.val(date.data.id);
		
		var parentOrgCode = $("#parentOrgCode");
		parentOrgCode.empty();
		parentOrgCode.val(date.data.value);
	},
	/**
	 * 初始化并且获取选中组织机构
	 * @param data
	 */
	initOrgGrid : function(data) {
		var checkedOrg = $("#parentOrgNameOper");
		var checkedOrgId = $("#parentOrgIdOper");
		
		var operatorEntId = ((KCPT.root.leftTree.loadTreeSelectedData.data.id != null) ? KCPT.root.leftTree.loadTreeSelectedData.data.id : KCPT.user.entId);
		var operatorEntName = (KCPT.root.leftTree.loadTreeSelectedData.data.text != null) ? KCPT.root.leftTree.loadTreeSelectedData.data.text : KCPT.user.entName;
		checkedOrgId.empty();
		checkedOrg.empty();
		checkedOrg.append(operatorEntName);
		checkedOrgId.val(operatorEntId);		
	}
};
/**
 * 页面加载初始化
 */
$(document).ready(function() {
	var obj = new onlinestat();
	obj.authentication();
	window.objop = obj;
	objop.orgTree();
	objop.onlinestatGrid();
	objop.initOrgGrid();
	KCPT.onresizeObj = obj;
	//runManager.addChildList(obj);
	//runManager.showObj = obj;
});