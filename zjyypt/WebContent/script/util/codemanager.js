/**
 * 通用编码管理器
 */

var codeManager = function() {
	this.AREAKEY = "SYS_AREA_INFO";
	this.init();
	this.loaded = false;
};
codeManager.prototype = {

	init:function(f){
		var obj = this;
		
		//obj.loaded = false;

		$.ajax({
			url : "baseinfo/findInitSysGeneralCode.action",
			type : "POST",
			data : {},
			dataType :"json",
			cache : false,
			async : true,
			success : function(date, err)
			{	
//				var data = eval(date);
				KCPT.GeneralCode = date;
				obj.loaded = true;
			},
			error : function(e, s)
			{
				alert("初始化codeManager数据失败 "+e);
			}
		});
//		return obj.loaded;
//		if(f){
//			f.call(obj);
//		}
	},
		
	getSelectList : function(key, selectid) {
		var obj = this;
		if(!obj.loaded){
			obj.init(obj.getSelectList);
		}
		if (key != null && key != undefined && key && obj.loaded) {
			if (KCPT.GeneralCode[key]) {
				var opts = KCPT.GeneralCode[key];
				var options = "";
				for ( var i = 0; i < opts.length; i++) {
					options += "<option value='" + opts[i].code + "'>" + opts[i].name + "</option>";
				}
				$("#" + selectid).append(options);
			}
		}
	},
	getSelectListByObject : function(key, selectObj) {
		var obj = this;
		if(!obj.loaded){
			obj.init(obj.getSelectList);
		}
		if (key != null && key != undefined && key && obj.loaded) {
			if (KCPT.GeneralCode[key]) {
				var opts = KCPT.GeneralCode[key];
				var options = "";
				for ( var i = 0; i < opts.length; i++) {
					options += "<option value='" + opts[i].code + "'>" + opts[i].name + "</option>";
				}
				selectObj.append(options);
			}
		}
	},
	// 根据编码查询对应名字
	getNameByCode : function(key, code) {
		var obj=this;
		if(!key){
			key = "SYS_AREA_INFO";
		}
		if (key != null && key != undefined && key && obj.loaded && code != null && code != undefined) {
			if (KCPT.GeneralCode[key]) {
				var opts = KCPT.GeneralCode[key];
				for ( var i = 0; i < opts.length; i++) {
					if (code == opts[i].code)
					{
						return opts[i].name;
						break;
					}
				}
			}
		}
	},
	// 根据编码查询对应名字
	getCityNameByCode : function(key, code) {
		if(!key){
			key = "SYS_AREA_INFO";
		}
		if (key != null && key != undefined && key && obj.loaded) {
			if (KCPT.GeneralCode[key]) {
				var opts = KCPT.GeneralCode[key];
				for ( var i = 0; i < opts.length; i++) {
					var provi = prov[i];
					
					var children = provi.children;
					for ( var i = 0; i < children.length; i++) {
						var codea = children[i].code;
						if(codea==code){
							var name = children[i].name;
							return name;
							break;
						}

					}
				}
			}
		}
	},
	// 根据编码查询对应名字
	getCityProvcodeNameByCode : function(key, Pcode,Ccode) {
		var obj=this;
		if(!key){
			key = "SYS_AREA_INFO";
		}
		if (key != null && key != undefined && key && obj.loaded && Pcode != null && Pcode != undefined && Ccode != null && Ccode != undefined ) {
			if (KCPT.GeneralCode[key]) {
				var opts = KCPT.GeneralCode[key];
				for ( var i = 0; i < opts.length; i++) {
					var provi = opts[i];
					var icode = provi.code;
					if(icode == Pcode){
						//retuStr = provi.name;
						var children = provi.children;
						for ( var j = 0; j < children.length; j++) {
							var codea = children[j].code;
							if(codea==Ccode){
								var name = children[j].name;
								return name;
							}

						}
					}
				}
			}
		}
		return "";
	},
	
	getProvinceList : function(selectid) {
		if (KCPT.GeneralCode[this.AREAKEY]) {
			var opts = KCPT.GeneralCode[this.AREAKEY];
			for ( var i = 0; i < opts.length; i++) {
				var opt = $("<option>");
				$(opt).text(opts[i].name);
				$(opt).attr("value", opts[i].code);
				$("#" + selectid).append($(opt));
			}
		}
	},
	getCityList : function(provcode, cityid) {
		$("#" + cityid).empty();
		var option = $("<option>");
		$(option).text("请选择");
		$(option).attr("value", "");
		$("#" + cityid).append($(option));
		if (provcode) {
			if (KCPT.GeneralCode[this.AREAKEY]) {
				var opts = KCPT.GeneralCode[this.AREAKEY];
				for ( var i = 0; i < opts.length; i++) {
					if (opts[i].code == provcode) {
						var children = opts[i].children;
						for ( var j = 0; j < children.length; j++) {
							var code = children[j].code;
							var name = children[j].name;
							var opt = $("<option>");
							$(opt).text(name);
							$(opt).attr("value", code);
							$(opt).attr("title", name);
							$("#" + cityid).append($(opt));
						}
					}
				}
			}
		}
	},
	getProvAndCity : function(provid, cityid, cityval) {
		if (KCPT.GeneralCode[this.AREAKEY]) {
			var opts = KCPT.GeneralCode[this.AREAKEY];
			var options = "";
			for ( var i = 0; i < opts.length; i++) {
				var code = opts[i].code;
				var name = opts[i].name;

				options += "<option value='" + code + "'>" + name + "</option>";
				// $("#" + provid).append($(opt));
				//				
			}
			$("#" + provid).append(options);

			$("#" + provid).change(function() {
				KCPT.CodeManager.selectChange(provid, cityid, cityval);
			});
		}
	},
	selectChange : function(provid, cityid, cityval) {
		var key = "SYS_AREA_INFO";
		if (KCPT.GeneralCode[key]) {
			var provcode = $("#" + provid).val();
			var prov = KCPT.GeneralCode[key];
			for ( var i = 0; i < prov.length; i++) {
				var provi = prov[i];
				var code = provi.code;
				if (code == provcode) {
					var children = provi.children;
					var options = "";
					for ( var i = 0; i < children.length; i++) {
						var code = children[i].code;
						var name = children[i].name;
						if(cityval == code){
							options += "<option selected='selected' value='" + code + "'>" + name + "</option>";
						}else{
							options += "<option value='" + code + "'>" + name + "</option>";
						}
					}
					$("#" + cityid).empty();
					$("#" + cityid).append(options);
					break;
				} else if (provcode == "") {
					$("#" + cityid).empty();
					var oo = "<option value=''> 请选择 </option>";
					$("#" + cityid).append(oo);
				}
			}

			/*
			 * if(prov[provcode].children) { $("#" + cityid).empty(); var children=prov[provcode].children; var options = ""; for(var i=0;i<children.length;i++) { var code=children[i].code; var name=children[i].name;
			 * 
			 * options += "<option value='" + code + "'>" + name + "</option>"; } $("#" + cityid).append(options); // options += "<option value='" + value + "'>" + name + "</option>";
			 *  }
			 */
		}
	}

};