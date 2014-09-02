//自定义列设置
	function showTableCustomColumnPop (reportID,fun){
		$("#mainWorkArea").A_Window({
					dragabId : 'mainWorkArea', // 可拖动的范围
					id : 'customColumnDiv',
					width : 450, // 宽度
					height : 363,// 高度
					load_fn : function() {
						$("#closeCustomColumnDiv").click(function() {
							$("#mainWorkArea").close_ALL_Window();
							$("li[fun="+fun+"]").click();
						});
					},
		     url : 'customReportColumn/findReportColumn.action?reportId='+reportID
		});
	}