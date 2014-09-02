var tableCustomColumn = function() {
 	this.grid = null;
	this.parentManager;
	this.init();
};

tableCustomColumn.prototype = {
		getXmlDoc:function(){
			var obj=this;
			var reportId = $("#reportId").val();
			if(reportId && (typeof reportId)!="undefined"){
				JAjax("customReportColumn/getReportInitColumn.action",{"reportId":reportId},'json',obj.showRightList, null);
			}
		},
		
	init : function() {
 		var cusCol = this;
		if ($("#rightSel").children().length == 0 && $("#leftSel").children().length == 0) {
			cusCol.getXmlDoc();
		}

		$("#toR").click(function() {
			cusCol.leftToRight();
		});
		$("#toL").click(function() {
			cusCol.rightToLeft();
		});

		$("#cancel").click(function() {
			cusCol.closeWindow();
		});

		$("#saveS").click(function() {
			cusCol.submitBtn();
		});

        $("#moveUp").click(function(){
        	cusCol.moveUp();
 		  });

        $("#moveDown").click(function(){
			cusCol.moveDown();
	     });
        
        $("#resetCustomlInfo").click(function(){
			cusCol.resetCustomlInfo();
	     });
	},
	
	resetCustomlInfo:function(){
		var obj=this;
 		$.ligerDialog.confirm("确定要恢复默认值吗？", function(yes) {
			if (yes) {
		 		var reportId = $("#reportId").val();
				JAjax("customReportColumn/deleteUserCustomColumnsByReportId.action?reportId=" + reportId,null, null,obj.resetGetXmlDoc(), null, true);
 			}
		});
	},
	
	resetGetXmlDoc:function(){
		var obj=this;
		KCPT.customColumns=null;
		$("#rightSel")[0].options.length=0;
 		$("#leftSel")[0].options.length=0;
		obj.getXmlDoc();
	},
	
	getSaveData : function() {
		var rightArr = $("#rightSel").children();
		var leftArr = $("#leftSel").children();
		var rightString = "";
		var leftString = "";
		for ( var i = 0; i < rightArr.length; i++) {
			var codeName = $(rightArr[i]).text();
			var codeId = $(rightArr[i]).attr("name");
			var ids = $(rightArr[i]).attr("id");
			rightString = rightString + ids + ":" + codeId + ":" + codeName
					+ ":" + "1" + ":" + (i + 1) + "!";
		}
		for ( var i = 0; i < leftArr.length; i++) {
			var codeName = $(leftArr[i]).text();
			var codeId = $(leftArr[i]).attr("name");
			var ids = $(leftArr[i]).attr("id");
			leftString = leftString + ids + ":" + codeId + ":" + codeName + ":"
					+ "0" + ":" + (i + 1) + "!";
		}
		return (rightString + leftString);
	},

	loadXMLDoc : function(dname) {
		var xmlDoc;
		try // Internet Explorer
		{
			xmlDoc = new ActiveXObject("Microsoft.XMLDOM");
		} catch (e) {
			try // Firefox, Mozilla, Opera, etc.
			{
				xmlDoc = document.implementation.createDocument("", "", null);
			} catch (e) {
			}
		}
		try {
			xmlDoc.async = false;
			xmlDoc.load(dname);
			return (xmlDoc);
		} catch (e) {
		}
		return (null);
	},

	showLeftList : function(target) {
		var liStr = "";
		for ( var i = 0; i < target.length; i++) {
			var disVal = target[i].text;
			var valC = target[i].getAttribute("name");
			var ids = target[i].getAttribute("id");
			liStr = liStr+"<option id='" + ids + "' name='" + disVal + "'>" + valC + "</option>";
		}
		$("#leftSel").append(liStr);
	},
	showRightList : function(target,err) {
  		var rigthStr = "";
		var leftStr ="";
		$(target).each(function(i) {
			var disVal = this.text;
			var valC = this.name;
			var ids =this.id;
			var showTYpe=this.show;
			ids = ids == null ? "" : ids;
			if(showTYpe!='hidden'){
				rigthStr = rigthStr + "<option id='" + ids + "' name='" + valC + "'>"
				+ disVal + "</option>";
			}else{
				leftStr =leftStr+"<option id='" + ids + "' name='" + valC + "'>"
				+ disVal + "</option>";
			}
		});
		$("#rightSel").append(rigthStr);
		if(leftStr!=""){
		   $("#leftSel").append(leftStr);
		}
	},

	showLeftJson : function(target) {
		var lisStr = "";
		for ( var i = 0; i < target.length; i++) {
			var disVal = target[i].codeName;
			var valC = target[i].codeId;
			var ids = target[i].autoId;
			ids = ids == null ? "" : ids;
			lisStr = lisStr + "<option id='" + ids + "' name='" + valC + "'>"
					+ disVal + "</option>";
		}
		$("#leftSel").append(lisStr);
	},

	showRightJson : function(target) {
		var lisStr = "";
		for ( var i = 0; i < target.length; i++) {
			var disVal = target[i].codeName;
			var valC = target[i].codeId;
			var ids = target[i].autoId;
			ids = ids == null ? "" : ids;
			lisStr = lisStr + "<option id='" + ids + "' name='" + valC + "'>"
					+ disVal + "</option>";
		}
		$("#rightSel").append(lisStr);
	},

	clearLeftList : function() {
		$("#leftSel").empty();
	},
	
	clearRightList : function() {
		$("#rightSel").empty();
	},

	leftToRight : function() {
		$("#leftSel option:selected").appendTo("#rightSel");
	},

	rightToLeft : function() {
		$("#rightSel option:selected").appendTo("#leftSel");
	},

	moveUp :function(){
 	    var target = $("#rightSel option:selected");
	     $(target).insertBefore($(target).prev());
	},
	moveDown: function(){
 		var target = $("#rightSel option:selected");
	  	$(target[0]).insertAfter($(target[0]).next());
	},
	closeWindow : function() {
		$("#closeCustomColumnDiv2").click();
	},

	submitBtn : function() {
		var columnArr = tableCustomColumn.getSaveData();
 		var reportId = $("#reportId").val();
 		$.ajax({
					type : 'post',
					url : 'customReportColumn/addOrUpdateCustomColumn.action',
					data : 'columnArr=' + columnArr + '&reportId=' + reportId,
					success : function(msg) {
						if (msg == '1') {
							$.ligerDialog.alert("保存成功！", "信息提示", "success" ,function(){
							    $("#refreshGridButton").click();
							    $("#closeCustomColumnDiv").click();
							});
						}
			 }
		});
	}

};
var tableCustomColumn = new tableCustomColumn();
$(document).ready(function() {
	$("#mainWorkArea").show_A_Window({});
 });
