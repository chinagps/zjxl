/**
 * Copyright (c) 2009 Sergiy Kovalchuk (serg472@gmail.com)
 * 
 * Dual licensed under the MIT (http://www.opensource.org/licenses/mit-license.php)
 * and GPL (http://www.opensource.org/licenses/gpl-license.php) licenses.
 *  
 * Following code is based on Element.mask() implementation from ExtJS framework (http://extjs.com/)
 *
 */

(function(e){e.fn.loadMask=function(t){this.unLoadMask(),this.css("position")=="static"&&this.addClass("masked-relative"),this.addClass("masked");var n=e('<div class="loadmask"></div>');navigator.userAgent.toLowerCase().indexOf("msie")>-1&&(n.height(this.height()+parseInt(this.css("padding-top"))+parseInt(this.css("padding-bottom"))),n.width(this.width()+parseInt(this.css("padding-left"))+parseInt(this.css("padding-right")))),navigator.userAgent.toLowerCase().indexOf("msie 6")>-1&&this.find("select").addClass("masked-hidden"),this.append(n);if(typeof t=="string"){var r=e('<div class="loadmask-msg" style="display:none;"></div>');r.append("<div>"+t+"</div>"),this.append(r),r.css("top",Math.round(this.height()/2-(r.height()-parseInt(r.css("padding-top"))-parseInt(r.css("padding-bottom")))/2)+"px"),r.css("left",Math.round(this.width()/2-(r.width()-parseInt(r.css("padding-left"))-parseInt(r.css("padding-right")))/2)+"px"),r.show()}},e.fn.unLoadMask=function(e){this.find(".loadmask-msg,.loadmask").remove(),this.removeClass("masked"),this.removeClass("masked-relative"),this.find("select").removeClass("masked-hidden")}})(jQuery);