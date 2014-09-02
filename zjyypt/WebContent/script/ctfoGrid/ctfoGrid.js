/**
 * userDBTotal:true,//使用后台合计 DataBase:'sub-total',//使用后台合计字段名 { "Rows": [ {
 * "oemcode":"6001" ,"commaddr":"13709809009" } ],"Total":"1", "sub-total":{
 * 
 * "oemcode":"6001" ,"commaddr":"13709809009" }}
 */

var ctfoGrid = function(o)
{
	this.version = "create by yangxu in 2011.10.08";
	this.options = {};
	this.active = true;
	this.init(o);

};
ctfoGrid.sort = function(a, b)
{
	if (b.length != 0)
	{
		this.prototype.tableTitleSort(a, b);
	}
	this.prototype.init(a);
};
ctfoGrid.prototype = {
	loadParams : function(o)
	{
		if (o)
		{
			this.options = o;
			return true;
		}
		else
			return false;
	},
	init : function(o)
	{
		var su = this.loadParams(o);
		if (su)
		{
				this.loading();
		}
		else
		{
			alert("加载数据失败");
		}
	},
	// 加载数据
	loading : function()
	{
		var obj = this;
 			obj.realGrid = $("#" + obj.options.tableId).ligerGrid({
			columns : obj.options.columns,
			buttons : obj.options.buttons,
	        resizable: false,   //table是否可伸缩
 			errorMessage : '发生错误',
			pageStatMessage : '从{from}到{to}，总数 {total} 条',
			pageTextMessage : 'Page',
			pageParmName : 'requestParam.page', // 页索引参数名，(提交给服务器)
			pagesizeParmName : 'requestParam.rows',
			loadingMessage : '加载中...',
			findTextMessage : '查找',
			noRecordMessage : '没有符合条件的记录存在',
			title : obj.options.title,
			isContinueByDataChanged : '数据已经改变,如果继续将丢失数据,是否继续?',
			resizable : true, // table是否可伸缩
			usePager : obj.options.usePager != null && obj.options.usePager == false ? false : true, // 是否分页
			page : 1, // 默认当前页
			total : 0, // 总页面数
			parms : obj.options.parms, // 提交到服务器的参数
			minColToggle : 0, // 最小显示的列
			// dataType : 'server', // 数据源：本地(local)或(server),本地是将读取p.data
			dataAction : 'server', // 提交数据的方式：本地(local)或(server),选择本地方式时将在客服端分页、排序
			showTableToggleBtn : obj.options.showTableToggleBtn || true, // 是否显示'显示隐藏Grid'按钮
			allowAdjustColWidth : obj.options.allowAdjustColWidth==null||obj.options.allowAdjustColWidth==undefined ? true: obj.options.allowAdjustColWidth  , // 是否允许调整列宽
			checkbox : obj.options.showCheckbox || false, // 是否显示复选框
			showToggleColBtn : false, // 是否显示'切换列层'按钮
			enabledEdit : false, // 是否允许编辑
			isScroll : true, // 是否滚动
			onDragCol : obj.options.DragCol || false, // 拖动列事件
			onToggleCol : obj.options.onToggleCol || false, // 切换列事件
			onChangeSort : obj.options.onChangeSort || false, // 改变排序事件
			onSuccess : obj.options.onSuccess || false, // 成功事件
			onSelectRow : obj.options.onSelectRow || false, // 选择行事件
			onBeforeShowData : obj.options.onBeforeShowData || false, // 显示数据前事件
			onAfterShowData : obj.options.onAfterShowData || false, // 显示完数据事件
			onCheckRow : obj.options.onCheckRow || false, // 选择事件(复选框)
			onCheckAllRow : obj.options.onCheckAllRow || false, // 全部选择事件(复选框)
			onError : obj.options.onError || false, // 错误事件
			onSubmit : obj.options.onSubmit || false, // 提交前事件
			dateFormat : 'yyyy-MM-dd', // 默认时间显示格式
			method : 'POST',
			url : obj.options.url,
			sortName : obj.options.sortName,
			sortnameParmName : 'requestParam.equal.sortname', // 页排序列名(提交给服务器)
			sortorderParmName : 'requestParam.equal.sortorder',
			showTitle : obj.options.showTitle,
			pageSize : obj.options.pageSize || 10,
			pageSizeOptions : obj.options.pageSizeOptions || [ 10, 20, 30, 40, 50, 60, 80, 100 ],
			height : obj.options.height,
			autoLoad : obj.options.autoLoad || false,
			renderDate : obj.options.renderDate,
			enabledEdit : obj.options.enabledEdit || false,
			onAfterEdit : obj.options.onAfterEdit || false,
			selectId : obj.options.selectId || false,
			width : obj.options.width || '100%',
			timeout : obj.options.timeout,
			rownumbers : obj.options.rownumbers || false,
			groupColumnName : obj.options.groupColumnName || null,
			//start add by jiangwei 增加底部页数是否显示的控制
			barTextShow : obj.options.barTextShow,
			//end add by jiangwei 增加底部页数是否显示的控制
			groupColumnDisplay : obj.options.groupColumnDisplay || null,
			allowHideColumn:  obj.options.allowHideColumn==null||obj.options.allowHideColumn==undefined ? true: obj.options.allowHideColumn//是否显示'切换列层'按钮
		});

		obj.gridManager = $("#" + obj.options.tableId).ligerGetGridManager();

		$('#' + obj.options.searchFormId).submit(function()
		{
			var su = true;
			// add by ningdh 2011/10/31
			if (obj.active)
			{
				if (obj.options.gridBeforeSubmit)
				{
					su = obj.options.gridBeforeSubmit(obj.options.beforeSubmitScope || obj);
				}
			}
			if (su)
			{
				if (obj.active)
				{
					obj.search();
				}
				return false;
			}
			return false;
		});
		if (obj.options.Buttons)
		{
			var length = obj.options.Buttons.length;
			for ( var i = 0; i < length; i++)
			{
				var data = obj.options.Buttons[i];

				$("#" + obj.options.mainContain).find("#" + data.id).bind("click", function(e)
				{
					var ids = $(e.currentTarget.outerHTML).attr("id");
					var length = obj.options.Buttons.length;
					for ( var i = 0; i < length; i++)
					{
						var datai = obj.options.Buttons[i].id;
						if (datai == ids)
						{
							obj.options.Buttons[i].fun.call(obj);
							break;
						}
					}
				});

			}
		}

	},
	hide : function()
	{
		var obj = this;

		$("#" + obj.options.mainContain).find("#" + obj.options.gridDIV).hide();
	},
	show : function()
	{
		var obj = this;

		$("#" + obj.options.mainContain).find("#" + obj.options.gridDIV).show();
	},
	search : function()
	{
		var obj = this;
		var data = $('#' + obj.options.searchFormId).serializeArray();
		var pp = {};
		var param = [];
		for ( var i = 0; i < data.length; i++)
		{
			var datai = data[i];
			var d = {};
			if (datai.value)
			{
				d["name"] = datai.name;
				d["value"] = $.trim(datai.value);
			}
			param.push(d);
		}
		if (obj.options.otherData)
		{
			for ( var i in obj.options.otherData)
			{
				var d = {};
				d["name"] = i;
				d["value"] = $.trim(obj.options.otherData[i]);
				param.push(d);
			}
		}
		if (obj.options.parms)
		{
			for ( var i = 0; i < obj.options.parms.length; i++)
			{
				var _parms = obj.options.parms[i];
				param.push(_parms);
			}

		}
		pp["parms"] = param;
		obj.gridManager.setOptions(pp);
		obj.gridManager.loadDataOut(true);
	},
	reload : function()
	{
		var obj = this;
		obj.gridManager.loadDataOut(true);
	},
	getGridManager : function()
	{
		var obj = this;
		return obj.gridManager;
	},
	setGridActive : function(bo)
	{
		var obj = this;
		obj.active = bo;
	},
	setOtherData : function(data)
	{
		var obj = this;
		if (!obj.options.otherData)
		{
			obj.options.otherData = {};
		}
		for ( var i in data)
		{
			obj.options.otherData[i] = data[i];
		}
	},
	onReSize : function()
	{
		var obj = this;
		var oldAllWidth = KCPT.root.oldCenterSize.width;
		var oldAllHeight = KCPT.root.oldCenterSize.height;

		var nowHeight = KCPT.root.getCenterSize().height;

		var zhongjianHe = nowHeight - oldAllHeight;
		if (obj.gridManager)
		{
			var endHeight = obj.gridManager.getHeight() + zhongjianHe;
			obj.gridManager.setHeight(endHeight);
		}
		else
		{
			var endHeight = obj.options.height + zhongjianHe;
			obj.gridManager.setHeight(endHeight);
		}

	},
	addRow : function()
	{
		var obj = this;

		obj.gridManager.addRow();

	},
	removeRow : function(row)
	{
		var obj = this;

		obj.gridManager.deleteRow(row);
	},
	removeSelectedRow : function()
	{
		var obj = this;

		obj.gridManager.deleteSelectedRow();
	},
	getSelectRow : function()
	{
		var obj = this;

		var row = obj.gridManager.getSelectRow();

		return row;

	},
	/*
	 * exportExcel() @Date Sep-13-2012 @Author Deng Wei, @Modified Kane Export
	 * to excel function, calling exportData.action in dataAction.java located
	 * in com.ctfo.manager.action
	 */
	exportExcel : function(x, y)
	{
		var obj = this;// 打印 数据 看看是不是有数据 如果有再进行下一步
		if (!obj.gridManager.data || obj.gridManager.data == [] || obj.gridManager.data.Total == "0")
		{
			alert("请确定先查询再导出,或确认查询结果不为空!");
			return;
		}
		if (obj.gridManager.data)
		{
			if (obj.gridManager.data.error)
			{
				alert("请确定先查询再导出,或确认查询结果不为空!");
				return;
			}
		}
		var size = obj.gridManager.getPageSize();
		var sortname = obj.gridManager.getSortName();
		var sortorder = obj.gridManager.getSortOrder();

		// id+ random number is not working somehow, might because that " . "
		// between numbers
		var id = "exportBtn";// +Math.random();
//		var html = '<div class="kcptWindow" style="width:290px; height:150px;">'
//					+'<div class="kcptWindow_top" style="width:290px;">'
//						+'<div class="kcptWindow_top_img"><img src="" /></div>'
//						+'<div id="exportExcelDataClose" class="kcptWindow_top_close"><img src="images/global/topRightClose.png" onmouseover="this.src=\'images/global/topRightCloseHover.png\'" onmouseout="this.src=\'images/global/topRightClose.png\'" /></div>'
//						+'<div class="kcptWindow_top_text">导出向导</div></div>'
//					+'</div>'
//					+'<dvi class="kcptWindow_main">'
//						+ '<table width="92%" border="0" align="center" cellpadding="4" cellspacing="0">'
//						+ '<tr >'
//							+ '        <td align="center" class="xhx" >从第 ' + '         <label>' + '  	        <input name="fromPage" style="width: 30px; class="export_input" value="1"/>  ' + '          页 &nbsp;&nbsp;&nbsp;&nbsp;到 &nbsp;&nbsp;&nbsp;&nbsp;第 '
//				+ '		<input name="toPage" style="width: 30px;" class="export_input" value="1"/>' + '          页</label></td>' + '        </tr>' + '      <tr >&nbsp' + '      </tr>' + '      <tr >' + '        <td align="center" class="xhx" ><label>'
//				+ '          <p>&nbsp;</p><Div id = "exportBut"><input name="Submit" type="submit" class="input0" value="导出" id="' + id + '"/></div>' + '     <tr><td align="center" class="xhx"><p>&nbsp;</p><Div id="excelExoprt" ></Div></td></tr>' + '</label></td>';
		var html = [
		        '<div class="kcptWindow" style="width:290px; height:150px;">'
			,		'<div class="kcptWindow_top" style="width:290px;">'
			,			'<div class="kcptWindow_top_img"><img src="images/global/derived.png" /></div>'
			,			'<div id="exportExcelDataClose" class="kcptWindow_top_close"><img src="images/global/topRightClose.png" onmouseover="this.src=\'images/global/topRightCloseHover.png\'" onmouseout="this.src=\'images/global/topRightClose.png\'" /></div>'
			,			'<div class="kcptWindow_top_text">导出向导</div>'
			,		'</div>'
			,		'<div class="kcptWindow_main">'
			,			'<table width="92%" border="0" align="center" cellpadding="4" cellspacing="0">'
			,				'<tr >'
			,					'<td align="center" class="xhx" >从第'
			,							'<input name="fromPage" style="width: 30px; text-align:center; margin:0 3px;" class="export_input" value="1" />页&nbsp;&nbsp;&nbsp;&nbsp;到 &nbsp;&nbsp;&nbsp;&nbsp;第'
			,							'<input name="toPage" style="width: 30px; text-align:center; margin:0 3px;" class="export_input" value="' + Math.ceil(obj.gridManager.data.Total/size)+ '" />'
			,						'页</td>'
			,				'</tr>'
			,				'<tr >&nbsp</tr>'
			,				'<tr ><td align="center" class="xhx" >'
			,						'<p>&nbsp;</p><div id = "exportBut"><input type="submit" name="Submit" class="btn_blue" style="margin:5px 0;" onmouseover="this.style.backgroundPosition=\'0px -50px\'" onmouseout="this.style.backgroundPosition=\'0px 0px\'" value="导&nbsp;出" id="' + id + '" /></div>'
			,				'</td></tr>'
			,				'<tr><td align="center" class="xhx"><p>&nbsp;</p><div id="excelExoprt" ><p><font color="blue">请确认要导出的页面...</font></p></div></td></tr>'
			,			'</table>'
			,		'</div>'
			,		'<div class="kcptWindow_bottom">'
			,			'<div class="kcptWindow_bottom_middle"></div>'
			,		'</div>'
			,	'</div>'
		];
//		$("#mainWorkArea").append(html.join(''));
		$("#mainWorkArea").A_Window({
			title : '导出向导',
			width : 300,
			height : 150,
			html : html.join("")
		});
		$("#mainWorkArea").show_A_Window();
		$("#exportExcelDataClose").bind("click", function()
		{
			$("#mainWorkArea").close_ALL_Window();
		});

//		document.getElementById("excelExoprt").innerHTML = '<p><font color="blue">请确认要导出的页面...</font></p>';
		// Old one is not working $("#id").click(function(){
		$('#' + id).click(function()
		{
			var op = Math.floor($("input[name=fromPage]").val());
			var op1 = Math.floor($("input[name=toPage]").val());
			// bug-YYPT-593  冯龙  modify 输入非数字当前用户退出，将alert修改为innerHTML。 at:20130108
			if ((isNaN(op) || isNaN(op1)) || op1 <= 0 || op <= 0 || op > op1)
			{ // checking op op1
				//alert("请检查输入数据");
				document.getElementById("excelExoprt").innerHTML='<p><font color="red">请检查输入数据</font></p>';
				return;
			}
			else if ((op1 - op) * size > 1000)
			{
				document.getElementById("excelExoprt").innerHTML = '<p><font color="red">导出数据过量, 请重新输入导出范围<br>请不要一次性导出1000条以上的数据</font></p>';
				//$("#" + id).attr("disabled", ""); // bug-YYPT-607  冯龙  modified 导出数据量过多时，重新输入页数再导出没反应（所有导出都有此问题）。 at:201301010
				return;
			}
			else
			{
				document.getElementById("excelExoprt").innerHTML = '<p><font color="red">正在导出, 请耐心等待...</font></p>';
				$("#" + id).attr("disabled", "disabled");
				var sub = (op1 - op + 1) * size; // calculate how many row
				// needs to be export
				//var cm = obj.options.columns; // col name
				var cm = obj.gridManager.options.columns;
				var exportData = ""; // init
				$(cm).each(function()
				{
					if (!this.hide)
					{
						if (!(this.display == "操作") && (!(this.display == "图表")) && (!(this.display == "序号")) && (!(this.display == "违规照片")) && (!(this.display == "位置/轨迹")))
						{
							//处理合并表头的第二列，_1代表第一行，_2代表第二行
							var innercm = this.columns;
							if (exportData)
							{
								if (innercm) {
									exportData += "&" + this.name + "_1=" + this.display;
								} else {
									exportData += "&" + this.name + "=" + this.display;
								}
							}
							else
							{
								if (innercm) {
									exportData = this.name + "_1=" + this.display;
								} else {
									exportData = this.name + "=" + this.display;
								}
							}

							if (innercm) {
								$(innercm).each(function() {
									if (!this.hide) {
										if (exportData)
										{
											exportData += "&" + this.name + "_2=" + this.display;
										}
									}
								});
							}
						}
					}
				});
				// getting search pram form detail
				var param = [];
				var dt = $('#' + obj.options.searchFormId).serializeArray();

				for ( var i = 0; i < dt.length; i++)
				{
					var datai = dt[i];

					if ($.trim(datai.value))
					{
						var d = {};
						d["name"] = datai.name;
						d["value"] = $.trim(datai.value);
						param.push(d);

					}
				}
				if (obj.options.otherData)
				{
					param.push(obj.options.otherData);
				}
				var xmlString = {};
				var dd = {};
				var page = {};
				var rows = {};
				var pagesize = {};
				if (sortname)
				{
					dd["name"] = sortname;
					dd["value"] = sortorder || "asc";

					param.push(dd);
				}

				xmlString["name"] = "exportDataHeader";
				xmlString["value"] = exportData;
				param.push(xmlString);
				// param["exportDataHeader"]= exportData;
				page["name"] = "requestParam.page";
				page["value"] = op;
				param.push(page);
				rows["name"] = "requestParam.rows";
				rows["value"] = size;
				// rows["value"] = (op1 + 1 - op) * size;
				param.push(rows);
				pagesize["name"] = "requestParam.pagesize";
				pagesize["value"] = op1 + 1 - op;
				param.push(pagesize);
				/*
				 * param["requestParam.page"]= op; param["requestParam.rows"]=
				 * (op1 + 1 - op) * size;
				 */
				var o = this;
				// 往后台发送数据 exportData.action
				JAjax(obj.options.exportAction, param, 'json', function(x)
				{
					// 得到存放excele的URL 在前台显示，并提供下载
					var path = x.msg;
					if (path != "error")
						document.getElementById("excelExoprt").innerHTML = '<p><a target="_blank" href="' + path + '"><font color="red">请点击下载</font></a></p>';
					else
					{
						document.getElementById("excelExoprt").innerHTML = '<p>导出出错</p>';
					}
				}, function(x)
				{
					// 得到存放excele的URL 在前台显示，并提供下载
					document.getElementById("excelExoprt").innerHTML = '<p>导出出错</p>';
				}, null, null, 60000);

			}
		});
	}  
 };

