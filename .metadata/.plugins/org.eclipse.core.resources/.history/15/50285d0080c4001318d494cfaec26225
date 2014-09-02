require.config({
	paths : {
		main : '../../scripts/pages/main',
		global : '../../scripts/common/global',
		util : '../../scripts/common/util',
		ctfoMenu : '../../scripts/plugins/ctfoMenu/ctfoMenu',
		loadmask : '../../scripts/plugins/jquery/jquery.loadmask',
		domReady : '../../scripts/plugins/requirejs/domReady', // requirejs domReady插件
		base:'../../scripts/plugins/ligerUI_V1.1.9/js/core/base',
		ligerGrid:'../../scripts/plugins/ligerUI_V1.1.9/js/plugins/ligerGrid',
		ligerForm:'../../scripts/plugins/ligerUI_V1.1.9/js/plugins/ligerForm',
		ligerTextBox:'../../scripts/plugins/ligerUI_V1.1.9/js/plugins/ligerTextBox',
		ctfoGrid:'../../scripts/plugins/ctfoGrid/ctfoGrid',
		ctfoForm:'../../scripts/plugins/ctfoForm/ctfoForm',
		ctfoFormWithGrid:'../../scripts/plugins/ctfoFormWithGrid/ctfoFormWithGrid',
		messages_cn:'../../scripts/plugins/jquery/messages_cn',
		jqueryvalidate:'../../scripts/plugins/jquery/jquery.validate',
		validate:'../../scripts/common/validate',
		jquerymetadata:'../../scripts/plugins/jquery/jquery.metadata',
		ligerSpinner:'../../scripts/plugins/ligerUI_V1.1.9/js/plugins/ligerSpinner',
		ligerTip:'../../scripts/plugins/ligerUI_V1.1.9/js/plugins/ligerTip',
		ligerDialog:'../../scripts/plugins/ligerUI_V1.1.9/js/plugins/ligerDialog',
		ligerToolBar:'../../scripts/plugins/ligerUI_V1.1.9/js/plugins/ligerToolBar',
		ligerDrag:'../../scripts/plugins/ligerUI_V1.1.9/js/plugins/ligerDrag',
		ligerResizable:'../../scripts/plugins/ligerUI_V1.1.9/js/plugins/ligerResizable',
		ligerComboBox:'../../scripts/plugins/ligerUI_V1.1.9/js/plugins/ligerComboBox',
		ligerCheckBox:'../../scripts/plugins/ligerUI_V1.1.9/js/plugins/ligerCheckBox',
		//ligerButton:'../../scripts/plugins/ligerUI_V1.1.9/js/plugins/ligerButton',
		ligerDateEditor:'../../scripts/plugins/ligerUI_V1.1.9/js/plugins/ligerDateEditor',
		ligerTab:'../../scripts/plugins/ligerUI_V1.1.9/js/plugins/ligerTab',
		//ligerAccordion:'../../scripts/plugins/ligerUI_V1.1.9/js/plugins/ligerAccordion',
		ligerTree:'../../scripts/plugins/ligerUI_V1.1.9/js/plugins/ligerTree',
		//ligerMenu:'../../scripts/plugins/ligerUI_V1.1.9/js/plugins/ligerMenu',
		ctfoSelect:'../../scripts/plugins/ctfoSelect/ctfoSelect',
		ajaxupload:'../../scripts/plugins/jquery/ajaxupload',
		autocomplete:'../../scripts/plugins/jquery/jquery.autocomplete',
		WdatePicker:'../../scripts/plugins/My97DatePicker/WdatePicker'
	},
	shim : {
		'main' : ['jquery'],
		'ligerGrid' :['base','jquery'],
		'ligerForm' : ['base','jquery','ligerTextBox','ligerComboBox','ligerDateEditor','validate','ligerSpinner'],
		'ligerTextBox' : ['base','jquery'],
		'ligerCheckBox' : ['base','jquery'],
		'ligerDialog' : ['base','jquery'],
		'ligerToolBar' : ['base','jquery'],
		'ligerTip' : ['base','jquery'],
		'ligerTab': ['base','jquery'],
		'ligerDrag': ['base','jquery'],
		'ligerComboBox': ['base','jquery'],
		'ligerDateEditor': ['base','jquery'],
		'ligerTree':['base','jquery'],
		'messages_cn':['jquery','jqueryvalidate'],
		'validate' : ['jquery','jqueryvalidate'],
		'ctfoMenu' : ['jquery'],
		'loadmask':['jquery'],
		'ligerSpinner':['base','jquery'],
		'ligerResizable':['base','jquery'],
		'ajaxupload':['jquery'],
		'autocomplete':['jquery'],
		'ctfoForm':['base','jquery','ligerTextBox','ligerComboBox','ligerDateEditor','validate']
	//,'ctfoMap':['maps','server','route','api','entity']
	}
});
require(['jquery','domReady','global', 'util','main','ctfoMenu','base','ligerGrid',
         'ligerForm','ligerTextBox','ctfoGrid','ctfoForm','ctfoFormWithGrid','messages_cn','jqueryvalidate','validate','jquerymetadata',
         'ligerSpinner','ligerTip','loadmask','ligerDialog','ligerToolBar','ligerDrag','ligerResizable','ligerComboBox',
         'ligerCheckBox','ligerDateEditor','ligerTab','ligerTree','ctfoSelect',
         'autocomplete','ajaxupload','WdatePicker'//,'maps','api','entity','server','route','ctfoMap'
         ], function($,domReady)
{
	domReady(function() {
		//是否为预加载判断
		if(document.getElementById("main-body-div")){
			 var _mainPage=new MainPage();
			 GLOBAL["mainPage"]=_mainPage;
		}
	});
});

