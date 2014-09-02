var customReport = function(o) {
	this.version = "create by cuisong in 2012.06.04";
	this.customColumns ={} ;
	this.grid;
	KCPT.customColumns=null;
	this.init(o);

};

customReport.prototype = {
    init : function(o) {
			var su = this.loadParams(o);
			if (su) {
				if (o.reportId) {
					this.getCustomColumn();
				} else {
					//	this.grid = new ctfoGrid(o);
				};
			} else {
				alert("加载数据失败");
			};
	 },
	loadParams : function(o) {
		if (o) {
			this.options = o;
			return true;
		} else
			return false;
	},
	//没有自定义列信息时处理
   customColumnsNull : function(o){
		var columns = o.columns;
		var result = [];
   		for ( var j = 0; j < columns.length; j++) {
			var col = columns[j];
			if ( col.showType != 'hidden' || col.showType == undefined ||col.showType ==null ) {
					result.push(col);
			};
		};
		this.options.columns = result;
   },
	getCustomColumn : function() {
		var obj = this;
		
		$.ajax({
			type : 'post',
			url : obj.options.getReportColumnAction	|| "customReportColumn/findPageDisColumn.action",
			data : {
				'reportId' : obj.options.reportId
			},
			cache : false,
			async : false,
			success : function(reportColumn) {
				
 				if (reportColumn.length > 2) {
					var col = eval(reportColumn);
					this.customColumns=col;
					KCPT.customColumns =col;
  					if (col.length != 0) {
						obj.flterDisplayColumns(col);
					};
				}
 				if(reportColumn=="[]"){
					obj.customColumnsNull(obj.options);
				}
			}
		});
	},
	//多grid使用
	getCustomColumnForManyGrid : function(o) {
		var obj = this;
		var result = [];
		$.ajax({
			type : 'post',
			url : o.getReportColumnAction	|| "customReportColumn/findPageDisColumn.action",
			data : {
				'reportId' : o.reportId
			},
			cache : false,
			async : false,
			success : function(reportColumn) {
  				if (reportColumn.length > 2) {
					var col = eval(reportColumn);
					this.customColumns=col;
					KCPT.customColumns =col;
  					if (col.length != 0) {
  						result = obj.flterDisplayColumnsForManyGrid(o,col);
					};
				}
  				if(reportColumn=="[]"){
 					var columns = o.columns;
 			   		for ( var j = 0; j < columns.length; j++) {
 						var col = columns[j];
 						if ( col.showType != 'hidden' || col.showType == undefined ||col.showType ==null ) {
 								result.push(col);
 						};
 					};
 			 }
			}
		});
		return result;	
	},
	getFreshCustomColumn : function(o) {
		var obj = this;
		 this.loadParams(o);
		$.ajax({
			type : 'post',
			url : obj.options.getReportColumnAction	|| "customReportColumn/findPageDisColumn.action",
			data : {
				'reportId' : obj.options.reportId
			},
			cache : false,
			async : false,
			success : function(reportColumn) {
 				if (reportColumn.length > 2) {
					var col = eval(reportColumn);
					this.customColumns=col;
					KCPT.customColumns =col;
 					if (col.length != 0) {
						obj.flterDisplayColumns(col);
					};
				}
				if(reportColumn=="[]"){
					obj.customColumnsNull(obj.options);
				}
			}
		});
	},
	/**
	 * 过滤报表展示列,用户自定义的列展示与顺序
	 * displayCol要显示的自定义列
	 */
	flterDisplayColumns : function(displayCol) {
		var columns = this.options.columns;// 
		var result = [];//过滤后的columns
		var temp = [];
		//处理固定列
  		for ( var j = 0; j < columns.length; j++) {
			var col = columns[j];
			if (col.frozen == true && col.showType != 'hidden') {
 					result.push(col);
 			};
			if (col.frozen == false &&  col.showfirst == true  && col.showType != 'hidden') {
					result.push(col);
			};
			if( col.showType == 'hidden'){
				temp.push(col);
			}
		};
		//处理自定义列
     	for ( var i = 0; i < displayCol.length; i++) {
			var discol = displayCol[i];
			for ( var j = 0; j < columns.length; j++) {
				var col = columns[j];
				if (discol.codeId && col.name) {
					if (discol.codeId == col.name) {
						result.push(col);
					};
				};
			};
		};
 		//处理不固定列且不允许自定义的列
		for ( var j = 0; j < columns.length; j++) {
			var col = columns[j];
			if (col.frozen ==false &&  col.showfirst != true  && col.showType != 'hidden') {
				result.push(col);
			};
		};
  		this.options.columns = result;
	},
	//多grid過濾列
	flterDisplayColumnsForManyGrid : function(o,displayCol) {
		var columns = o.columns;// 
		var result = [];//过滤后的columns
		var temp = [];
		//处理固定列
  		for ( var j = 0; j < columns.length; j++) {
			var col = columns[j];
			if (col.frozen == false &&  col.showfirst == true  && col.showType != 'hidden') {
					result.push(col);
			};
			if( col.showType == 'hidden'){
				temp.push(col);
			}
		};
		//处理自定义列
     	for ( var i = 0; i < displayCol.length; i++) {
			var discol = displayCol[i];
			for ( var j = 0; j < columns.length; j++) {
				var col = columns[j];
				if (discol.codeId && col.name) {
					if (discol.codeId == col.name) {
						result.push(col);
					};
				};
			};
		};
 		//处理不固定列且不允许自定义的列
		for ( var j = 0; j < columns.length; j++) {
			var col = columns[j];
			if (col.frozen ==false &&  col.showfirst != true  && col.showType != 'hidden') {
				result.push(col);
			};
		};
   		return result;
	},
	//更新grid表头时使用
	changeColumnForGrid : function(obj,o) {
 		var columns = obj.columns;//当前gird中的列
 		var result = [];//过滤后的columns
		//处理固定列
  		for ( var j = 0; j < columns.length; j++) {
			var col = columns[j];
			if (col.frozen == true && col.showType != 'hidden') {
 					result.push(col);
 			};
			if (col.frozen == false &&  col.showfirst == true  && col.showType != 'hidden') {
					result.push(col);
			};
			};
		if(KCPT.customColumns!=undefined){
			var displayCol;
			if(o){
			  displayCol =o;// $.data("customReoprtColumns",obj.reportId);
			}else{
			  displayCol=KCPT.customColumns;// $.data("customReoprtColumns",obj.reportId);
			}
			for ( var i = 0; i < displayCol.length; i++) {
				var discol = displayCol[i];
				for ( var j = 0; j < columns.length; j++) {
					var col = columns[j];
					if (discol.codeId && col.name) {
						if (discol.codeId == col.name) {
							result.push(col);
						};
					};
				};
			};
		}else{
	    	return obj.columns;
		}
 			//处理不固定列且不允许自定义的列
		for ( var j = 0; j < columns.length; j++) {
			var col = columns[j];
			if (col.frozen ==false &&  col.showfirst != true  && col.showType != 'hidden') {
				result.push(col);
			};
		};
		return  result;
 	},
 	//多grid使用
 	changeColumnForManyGrid : function(obj,o) {
 		
   		var columns = obj.columns;//当前gird中的列
 		var result = [];//过滤后的columns
 		if(o!=null){
			var displayCol =o;// $.data("customReoprtColumns",obj.reportId);
 			for ( var i = 0; i < displayCol.length; i++) {
				var discol = displayCol[i]; 
				for ( var j = 0; j < columns.length; j++) {
					var col = columns[j];
					if (discol.codeId && col.name) {
						if (discol.codeId == col.name) {
							result.push(col);
						};
					};
				};
			};
			//处理不固定列且不允许自定义的列
			for ( var j = 0; j < columns.length; j++) {
				var col = columns[j];
				if (col.frozen ==false &&  col.showfirst != true  && col.showType != 'hidden') {
					result.push(col);
				};
			};
		}else{
	    	return obj.columns;
		}
 		return  result;
 	},
	changeColumnForChart : function(obj,o) {
    		var columns = obj.columns;//当前gird中的列
 		var result = [];//过滤后的columns
 		var temp = [];
		//处理固定列
  		for ( var j = 0; j < columns.length; j++) {
			var col = columns[j];
			if( col.showType == 'hidden'){
				temp.push(col);
			}
		};
  		if(o!=null){
			var displayCol =o;// $.data("customReoprtColumns",obj.reportId);
 			for ( var i = 0; i < displayCol.length; i++) {
				var discol = displayCol[i]; 
				for ( var j = 0; j < columns.length; j++) {
					var col = columns[j];
					if (discol.codeId && col.name) {
						if (discol.codeId == col.name) {
							result.push(col);
						};
					};
				};
			};
			//处理默认隐藏列
			for ( var i = 0; i < temp.length; i++) {
				var hiddenColumns = temp[i];
		     	for ( var j = 0; j < displayCol.length; j++) {
					var discol = displayCol[j];
					if (discol.codeId && hiddenColumns.name) {
					  if (discol.codeId == hiddenColumns.name) {
						   result.push(hiddenColumns);
						};
					};
				};
			};
			//处理不固定列且不允许自定义的列
			for ( var j = 0; j < columns.length; j++) {
				var col = columns[j];
				if (col.frozen ==false &&  col.showfirst != true  && col.showType != 'hidden') {
					result.push(col);
				};
			};
		}else{
	    	return obj.columns;
		}
  		
 		return  result;
 	}
};
