/**
 * 创建包含ctfoForm 和 meGrid 的 右侧对象
 *
 * @param o = {
 * 			  //grid使用的参数
 * 			  tableId:'',//grid挂在的地方
 * 			  columns : '',//列表使用的列
 * 			  Buttons : [{}],添加 导出 导入 方法按钮
 *            showCheckbox：true,//是否展示checkbox
 *            sortName : 'id',
 *			  url : 'systemmng/findSpRoleForList.action',//数据请求地址
 *			  data : "orgId=4",
 *			  showTitle : false,
 *			  pageSize : 2,
 *			  pageSizeOptions : [ 10, 20, 30, 40 ],
 *			  height : height - titleHeight - 57,
 *			  autoLoad : true,
 *			  mainContain : "#sprolenmg",
 * 			  gridDIV:"sprolenmgcontent",
 * 			  searchFormId : 'opRoleSearchform'
 *
 *            container:obj //包含这个form的对象用来loadhtml
 *            loadHtml : '',//增加页面使用的html
 *            formId : '',//页面中使用的form的ID 用来在新增和修改的时候
 *            submitId : '',//提交时候使用的buttonID
 *            resetId : '',//重置按钮的id,
 *            closeId :'',
 *            addURL : '', //添加的时候使用的url
 *            detailURL : '',//获得详情方法 在修改前要调用
 *            updateURL : ''//修改的时候使用的url
 *            beforeSubmit : function(){},//提交之前的使用方法 如果返回false则不能提交用来做最后一步校验
 *            toFunData : ['name',function(){},'name',function(){}....],//
 *            otherData : {'name':value}, toAddOtherData:['name',function(xx){
 *            return {"name":xx}},'name'function(xx){return
 *            {"name":xx}}],//在详情的时候追加到otherData中去 用来保存不变的一些数据
 *            addLoadFunction:funciton(){},//调用添加时候提前使用的方法
 *            editLoadFunction：function(){},//调用修改的时候提前使用的方法
 *            detailLoadFunction:funciton(){},//详情时候提前使用的方法 toEditInitData
 *            ：['name',function(){},'name'function(){}], rules : {},//验证规则
 *            selects : {},//ajax下拉框 }
 * @returns
 */

var ctfoFormWithGrid = function(o,t) {
	this.version = "create by yangxu in 2011.10.22";
	this.status = "list";
	//this.fun = fun;
	this.options = {
			success:this.addSuccess,
			successScope:this
	};
	this.init(o,t);
};
ctfoFormWithGrid.prototype = {
		loadParams : function(o,t) {
			if (o) {
				this.options = KCPT.apply(this.options, o);
				return true;
			} else
				return false;
		},
		init : function(o,t) {
			var su = this.loadParams(o);
			if (su) {
				this.loading(t);
			} else {
				alert("加载数据失败");
			}
		},
		loading : function(t) {
			var obj = this;

			obj.mainContainer = $("#"+obj.options.mainContain);

			obj.createGrid(t);

			obj.createForm();
		},
		createGrid : function(t){
			var obj = this;
			obj.grid = new ctfoGrid(obj.options,t);

		},
		createForm : function(){
			var  obj = this;

			obj.form = new ctfoForm(obj.options);
		},
		add : function(){
			var obj = this;

			obj.grid.hide();

			obj.form.add();

			obj.status = "add";

			obj.bindClick();

		},
		update : function(data){
			var obj = this;

			obj.grid.hide();

			obj.form.update(data);

			obj.status = "update";

			obj.bindClick(data);

		},
		/**
		 * {"name":value}
		 * @param data
		 */
		detail : function(data){
			var obj = this;

			obj.grid.hide();

			obj.form.detail(data);

			obj.status = "detail";

			obj.bindClick();
		},
		bindClick : function(){
			var obj = this;
			$('#' + obj.options.closeId).unbind("click");

			$('#' + obj.options.closeId).bind("click",function() {

				obj.form.reset();

				obj.status = "list";

				obj.form.actionType == "add";

				obj.form.hide();

				obj.grid.show();

			});

		},
		getGrid:function(){
			var obj = this;
			return obj.grid;
		},
		/*
		 *  默认的 添加修改 成功后的调用
		 */
		addSuccess : function(data){
			var obj = this;
			obj.form.actionType == "add";

			obj.status = "list";

			obj.form.hide();

			obj.form.reset();

			obj.grid.show();

			$.ligerDialog.success("数据保存成功！");

			obj.grid.search();

		},
		getForm : function(){
			var obj = this;

			return obj.form;
		}


};