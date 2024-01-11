var _____WB$wombat$assign$function_____ = function(name) {return (self._wb_wombat && self._wb_wombat.local_init && self._wb_wombat.local_init(name)) || self[name]; };
if (!self.__WB_pmw) { self.__WB_pmw = function(obj) { this.__WB_source = obj; return this; } }
{
  let window = _____WB$wombat$assign$function_____("window");
  let self = _____WB$wombat$assign$function_____("self");
  let document = _____WB$wombat$assign$function_____("document");
  let location = _____WB$wombat$assign$function_____("location");
  let top = _____WB$wombat$assign$function_____("top");
  let parent = _____WB$wombat$assign$function_____("parent");
  let frames = _____WB$wombat$assign$function_____("frames");
  let opener = _____WB$wombat$assign$function_____("opener");

function amAjaxLoginForm(selector,options)
{if(typeof options=='function'){options={success:options};}
options=jQuery.extend(true,{success:function(response,frm){if(response.url)window.location=response.url;else if(response.reload)window.location.reload(true);},error:function(response,frm){var errUl=jQuery("ul.errors.am-login-errors");if(!errUl.length)
frm.before(errUl=jQuery("<ul class='errors am-login-errors'></ul>"));else
errUl.empty();for(var i=0;i<response.error.length;i++)
errUl.append("<li>"+response.error[i]+"</li>");errUl.fadeTo('slow',0.1).fadeTo('slow',1.0);if(response.recaptcha_key)
{jQuery("#recaptcha-row").show();if(typeof grecaptcha=="undefined")
{window.onLoadGrecaptcha=function(){frm.data('recaptcha',grecaptcha.render('recaptcha-element',{sitekey:response.recaptcha_key,theme:jQuery("#recaptcha-row").data('recaptcha-theme')}));}
jQuery.getScript('//web.archive.org/web/20161116120545/https://www.google.com/recaptcha/api.js?onload=onLoadGrecaptcha&render=explicit');}else{if(typeof(frm.data('recaptcha'))=='undefined'){frm.data('recaptcha',grecaptcha.render('recaptcha-element',{sitekey:response.recaptcha_key,theme:jQuery("#recaptcha-row").data('recaptcha-theme')}));}else{grecaptcha.reset(frm.data('recaptcha'));}}}else{jQuery("#recaptcha-row").hide();}}},options);jQuery(document).off("click.ajax-login",selector+' [type=submit]');jQuery(document).on("click.ajax-login",selector+' [type=submit]',function(){var frm=jQuery(this).closest('form');var formData=frm.serializeArray();formData.push({name:this.name,value:this.value});jQuery.post(frm.attr("action"),formData,function(response,status,request){if((request.status!='200')&&(request.status!=200))
response={ok:false,error:["ajax request error: "+ request.status+': '+ request.statusText]};if(!response)
response={ok:false,error:["ajax request error: empty response"]};if(!response||!response.ok)
{if(response.code==-8){var p=frm.parent().empty().append(response.html);frm=p.find('form');}else{if(!response.error)response.error=["Login failed"];options.error(response,frm);}}else{options.success(response,frm);}});return false;});}
function amAjaxSendPassForm(selector,options)
{if(typeof options=='function'){options={success:options};}
options=jQuery.extend(true,{successContainer:jQuery("success",this),success:function(response,frm){if(response.url)window.location=response.url;else if(response.reload)window.location.reload(true);else{if(!options.successContainer.length)
{frm.before(options.successContainer=jQuery('<div class="am-info"></div>'));}
jQuery("ul.errors.am-sendpass-errors").remove();options.successContainer.html(response.error[0]);jQuery(":submit",frm).prop("disabled","disabled");}},error:function(response,frm){var errUl=jQuery("ul.errors.am-sendpass-errors");if(!errUl.length)
frm.before(errUl=jQuery("<ul class='errors am-sendpass-errors'></ul>"));else
errUl.empty();for(var i=0;i<response.error.length;i++)
errUl.append("<li>"+response.error[i]+"</li>");errUl.fadeTo('slow',0.1).fadeTo('slow',1.0);}},options);jQuery(document).off("submit.ajax-send-pass",selector);jQuery(document).on("submit.ajax-send-pass",selector,function(){var frm=jQuery(this);jQuery.post(frm.attr("action"),frm.serialize(),function(response,status,request){if((request.status!='200')&&(request.status!=200))
response={ok:false,error:["ajax request error: "+ request.status+': '+ request.statusText]};if(!response)
response={ok:false,error:["ajax request error: empty response"]};if(!response||!response.ok)
{if(!response.error)response.error=["Error while e-mailing lost password"];options.error(response,frm);}else{options.success(response,frm);}});return false;});}
function amFlashError(msg){return amFlash(msg,'error',5000);}
function amFlashMessage(msg){return amFlash(msg,'message',2000);}
function amFlash(msg,msgClass,timeout)
{$('#am-flash .am-flash-content').empty().text(msg).removeClass('am-flash-content-error am-flash-content-message').addClass('am-flash-content-'+ msgClass);$('#am-flash').fadeIn();if(timeout)
setTimeout(function(){$('#am-flash').fadeOut();},timeout);}
function ajaxLink(selector)
{jQuery(document).on('click',selector,function(){var $link=$(this);jQuery("#ajax-link").remove();jQuery.get(jQuery(this).attr('href'),{},function(html){var options={};if($link.data('popup-width'))
options.width=$link.data('popup-width');if($link.data('popup-height'))
options.height=$link.data('popup-height');if($link.prop('title'))
options.title=$link.prop('title');jQuery('body').append('<div id="ajax-link" style="display:none"></div>');jQuery("#ajax-link").html(html).amPopup(options);})
return false;});}
(function($){if(!$.fn.amPopup){$(window).resize(function(){$('.am-popup').css({left:$('body').width()/2 - $('.am-popup').outerWidth(false)/2
});})
$.fn.amPopup=function(params){return this.each(function(){var options=params;if(options=='close')
{$(".am-popup-close").first().click();return;}
var options=$.extend({width:null,height:null,title:'',animation:300,onClose:function(){}},options);var $this=$(this);$("#mask").remove();var $popup=$("\
    <div class='am-popup am-common'>\
        <div class='am-popup-header'>\
            <a href='javascript:' class='am-popup-close-icon am-popup-close' />\
            <div class='am-popup-title'>\
                <h2 class='am-popup-title' />\
            </div>\
        </div>\
        <div class='am-popup-content' />\
    </div>");var $parent=$this.wrap('<div><div>').parent();$popup.find(".am-popup-title").empty().append(options.title);options.width&&$popup.css('width',options.width);options.height&&$popup.find(".am-popup-content").css('max-height',options.height).css('overflow-y','auto');$popup.find(".am-popup-content").empty().append($(this).css('display','block'));var _top=$(window).scrollTop()+ 100;$('body').append('<div id="mask"></div>').append($popup);$popup.css({top:_top- 50,left:$('body').width()/2 - $popup.outerWidth(false)/2,
transition:'top 0.5s ease'});$popup.fadeIn(options.animation);$popup.css({top:_top,});$popup.find(".am-popup-close").unbind('click.popup').bind('click.popup',function(){$popup.css({top:_top- 50});$popup.fadeOut(options.animation,function(){$parent.append($this.css('display','none'));$this.unwrap();$(this).closest('.am-popup').remove();$("#mask").remove();options.onClose.call();});});});};}
$.fn.amRevealPass=function(){return $(this).each(function(){if($(this).data('am-reveal-pass-init'))return;$(this).data('am-reveal-pass-init',true);var $switch=$('<span class="am-switch-reveal am-switch-reveal-off" title="Toggle Password Visibility"></span>');$(this).after($switch);$switch.click(function(){$(this).toggleClass('am-switch-reveal-on am-switch-reveal-off');var $input=$(this).prev();$input.attr('type',$input.attr('type')=='text'?'password':'text');});})};})(jQuery);jQuery(function($){var errors=$(".errors:visible:first,.error:visible:first");if(errors.length)
$("html, body").scrollTop(Math.floor(errors.offset().top));$('input.datepicker').datepicker({defaultDate:window.uiDefaultDate,dateFormat:window.uiDateFormat,changeMonth:true,changeYear:true,yearRange:'c-90:c+10'});$('.upload').upload();amAjaxLoginForm(".am-login-form form");amAjaxSendPassForm(".am-sendpass-form form");$(document).on('click',".cancel-subscription",function(event){event.stopPropagation();var $div=$(".cancel-subscription-popup");$div.amPopup({width:500,title:$div.data('popup-title')}).data('href',this.href);return false;});$(document).on('click',"#cancel-subscription-yes",function(){window.location.href=$(".cancel-subscription-popup").data('href');});$(document).on('click',"a.upgrade-subscription",function(event){event.stopPropagation();var $div=$(".upgrade-subscription-popup-"+$(this).data('invoice_item_id'));$div.amPopup({width:500,title:$div.data('popup-title')}).data('href',this.href);return false;});ajaxLink(".ajax-link");$('.am-pass-reveal').amRevealPass();$(document).ajaxComplete(function(){setTimeout(function(){$('.am-pass-reveal').amRevealPass();},100);})
$(document).on("click",".am-switch-forms",function(){var el=$(this);$(el.data('show_form')).show();$(el.data('hide_form')).hide();});$(document).on('click',"#cancel-subscription-no, .upgrade-subscription-no",function(){if(!$(this).hasClass("am-popup-close")){$(".am-popup").amPopup("close");}});});function filterHtml(source)
{HTMLReg.disablePositioning=true;HTMLReg.validateHTML=false;return HTMLReg.parse(source);}

}
/*
     FILE ARCHIVED ON 12:05:45 Nov 16, 2016 AND RETRIEVED FROM THE
     INTERNET ARCHIVE ON 20:32:16 Jan 10, 2024.
     JAVASCRIPT APPENDED BY WAYBACK MACHINE, COPYRIGHT INTERNET ARCHIVE.

     ALL OTHER CONTENT MAY ALSO BE PROTECTED BY COPYRIGHT (17 U.S.C.
     SECTION 108(a)(3)).
*/
/*
playback timings (ms):
  captures_list: 307.88
  exclusion.robots: 0.133
  exclusion.robots.policy: 0.116
  cdx.remote: 0.114
  esindex: 0.019
  LoadShardBlock: 251.856 (3)
  PetaboxLoader3.datanode: 164.304 (5)
  PetaboxLoader3.resolve: 252.116 (3)
  load_resource: 265.143 (2)
*/