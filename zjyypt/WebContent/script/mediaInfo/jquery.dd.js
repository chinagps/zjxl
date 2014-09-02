/*
 * jGD DropDown
 * Version 0.4 (18-SEP-2010)
 * @requires jQuery v1.3 or later
 *
 * Homepage: http://www.dev4press.com/jquery/jgd-dropdown/
 * Examples: http://www.dev4press.com/jgd/dropdown/
 * 
 * Copyright (c) 2008-2010 Milan Petrovic, Dev4Press
 *
 * Dual licensed under the MIT and GPL licenses:
 * http://www.opensource.org/licenses/mit-license.php
 * http://www.gnu.org/licenses/gpl.html
 *
 * Thanks to Janko at Warp Speed for this great article:
 * http://www.jankoatwarpspeed.com/post/2009/07/28/reinventing-drop-down-with-css-jquery.aspx
 */

(function($){
    $.fn.jgdDropdown = function(options) {
        var settings =  $.extend({}, $.fn.jgdDropdown.defaults, options);
        return this.each(function() {
            var $this = $(this);
            var $id = $.fn.jgdDropdown.convert($this, settings);

            $("#" + $id + " dt a").click(function() {
            	  $(".dd_openlist").show();
                $("#" + $id + " dd ul").toggle();
                return false;
            });

            $(document).bind('click', function(e) {
                var $clicked = $(e.target);
                $(".dd_openlist").hide();
                $(".jgd-dropdown").find("ul").hide();
//                if (!$clicked.parents().hasClass(settings.cls)) {
//                    $("." + settings.cls + " dd ul").hide();
//                }
            });
//            $("#" + $id + " dd ul").bind('mouseover',function(){
//            	$(".jgd-dropdown").find("ul").show();
//            });
//            $("#" + $id + " dd ul").bind('mouseout',function(){
//            	setTimeout(function(){
//            	$(".jgd-dropdown").find("ul").hide();
//            	},2000);
//            });
            $("#" + $id + " dd ul li").click(function() {
                var $sel = $(this);
                $(".dd_openlist").hide();
                var $val = $sel.find("span.value").html();
                $this.val($val);
                $("#" + $id + " dt a").html("");
                var _img="<img src='"+$(this).find("img:eq(0)").attr("src")+"'/>";
                $("#" + $id + " dt a").append(_img);
                $("#" + $id + " dt a").append($(this).find("a").html());
                $("#" + $id + " dd ul").hide();
                if (settings.clsCopySelect) {
                    $("#" + $id + " dt").attr("class", $sel.parent().attr("class"));
                }
                $sel.parent().parent().find("li").removeClass(settings.clsLISelected);
                $sel.parent().addClass(settings.clsLISelected);
                if (settings.callback) {
                	 var _isOnLine= $sel.find("a").attr("isOnline");
                	//在线车辆
                	if(_isOnLine=="1"){
                		 settings.callback($this, $val);
                	}
                }
                return false;
            });
        });
    };
    $.fn.jgdDropdown.defaults = {
        callback: null,
        cls: 'jgd-dropdown',
        initTitle: '',
        forceTitle: false,
        clsLIPrefix: '',
        clsLISelected: 'dropdownSelected',
        clsCopySelect: true,
        clsLIExpand: true,
        selected: ''
    };
    $.fn.jgdDropdown.convert = function($obj, settings) {
        var iTitle = settings.initTitle;
        var iVal = '';
        if (settings.selected !== null && settings.selected !== '') {
            $obj.val(settings.selected);
            if (!settings.forceTitle) {
                iTitle = '';
            }
        }
        var selected = $obj.find("option[selected]");
        var options = $("option", $obj);
        var id = "jgd_dd_" + get_id($obj);
        $obj.after('<dl id="' + id + '" class="' + settings.cls + '"></dl>');
        if (iTitle === '') {
            iTitle = selected.text();
            iVal = selected.val();
        }
        $("#" + id).append('<dt><a href="javascript:void(0);">' + iTitle + '<span class="value">' + iVal +  '</span></a></dt>');
        $("#" + id).append('<dd><div class="dd_openlist"><ul></ul></div></dd>');
        options.each(function(index){
            var elClass = $(this).attr("class");
            var elStyle = $(this).attr("style");

            var cls = settings.clsLIPrefix + $(this).val();
            if (settings.clsLIExpand) {
                cls += " item-" + index;
                cls += " item-" + ($.fn.jgd.isEven(index) ? "even" : "odd");
                if (index === 0) {
                    cls += " item-first";
                }
                if (index == options.length - 1) {
                    cls += " item-last";
                }
                if(elClass && elClass !== '') {
                    cls+= " " + thisclass;
                }
            }
            if (settings.clsCopySelect) {
                $("#" + id + " dt").attr("class", cls);
            }
            if ($(this).val() == selected.val()) {
                cls += " " + settings.clsLISelected;
            }
            var _imgUrl=$(this).attr("title");
            var _isOnline=$(this).attr("isOnline");
            $("#" + id + " dd ul").append('<li class="' + cls + '"><img src='+_imgUrl+' style="display:inline;"/><a isOnline="'+_isOnline+'" style="display:inline;" href="javascript:void(0);">' +
                $(this).text() + '<span class="value">' + $(this).val() + '</span></a></li>');
            if (elStyle) {
                $("#" + id + " dd ul").find("li:last a").attr("style", elStyle);
            }
        });
        $obj.hide();
        return id;
    };
    $.fn.jgd = function() {};
    $.fn.jgd.isEven = function($num) {
        return ($num%2 === 0);
    };
    function get_id($obj) {
        var id = $obj.attr("id");
        if (id === "") {
            id = random_id();
        }
        return id;
    }
    function random_id() {
        var dt = new Date().getMilliseconds();
        var num = Math.random();
        var rnd = Math.round(num * 100000);
        return "jgd" + dt + rnd;
    }
    function debug($obj) {
        if (window.console && window.console.log) {
             window.console.log('jgd_dropdown: ' + $obj.size());
        }
    }
})(jQuery);
