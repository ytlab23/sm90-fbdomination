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

(function($){var methods={init:function(options){return this.each(function(){var $this=$(this);if($this.data('upload')){return;}
var params=$.extend({onChange:function(filesCount){},onFileAdd:function(info){},onFileDraw:function(info){},onSelect:function(){},onSubmit:function(){},fileMime:false,fileMaxSize:false,fileBrowser:true,urlUpload:'/admin-upload/upload',urlGet:'/admin-upload/get'},options);$this.data('params',params).data('upload',1);var name=$this.attr('name');var end=name.substr(name.length-2,2);var info=$this.upload('info');var error=$this.upload('error');var i;var $el=$this.closest('.element');$el.prepend($('<input type="hidden" value="-1">').attr('name',name));for(i=0;i<error.length;i++){var $span=$('<span class="error"></span>').text(error[i]);$el.append($span);}
if(end=='[]'){$this.data('multiple',1);}
$this.upload('drawUpload');if($this.attr('value')){if($this.data('multiple')){var values=$this.attr('value').split(',');for(i=0;i<values.length;i++){info[values[i]].upload_id=values[i];$this.upload('drawFile',info[values[i]]);}}else{info[$this.attr('value')].upload_id=$this.attr('value');$(this).upload('drawFile',info[$this.attr('value')]);}}
$this.hide();$this.attr('disabled','disabled');$this.data('params').onChange.call($this,$this.upload('count'));});},increaseCount:function(){this.data('count',this.upload('count')+1);if(this.upload('count')==1){this.parent().find('.error').not('input').remove();}},decreaseCount:function(){this.data('count',this.upload('count')-1);},count:function(){return this.data('count')?this.data('count'):0;},drawFile:function(info){var $this=this;$this.upload('destroyUploader');var $a=$('<a href="javascript:;" class="local local-link">x</a>');var $div=$('<div></div>');var $aFile=$('<a class="link"></a>');$aFile.attr('href',window.rootUrl+ $this.data('params').urlGet+'?id='+ info.upload_id.toString().split('|',2)[0]).attr('target','_top');$this.before($div.append($aFile.append(info.name)).append(' ('+ info.size_readable+')').append(' [').append($a).append(']').append($('<input type="hidden" />').attr('name',$this.attr('name')).attr('value',info.upload_id)));$a.click(function(){$(this).closest('div').remove();$this.upload('decreaseCount');$this.upload('destroyUploader');$this.upload('drawUpload');$this.data('params').onChange.call($this,$this.upload('count'));});$this.data('params').onFileDraw.call($this,info);$this.upload('increaseCount');$this.upload('drawUpload');},drawUpload:function(){var $this=this;$this.upload('destroyUploader');if(!$this.data('multiple')&&$this.upload('count')){return;}
var $a=($this.data('params').fileBrowser?$('<div class="upload-control-browse"><span>browse</span></div>'):'');var $wrapper=$('<div class="upload-control"></div>');if($this.upload('count')){$wrapper.css('margin-top','1em');}
var $uploader=$this.upload('getUploader');$this.before($wrapper.append($uploader).append($a));$this.data('params').fileBrowser&&$a.before(' ');var $div=$('<div></div>');$('body').append($div);$div.hide();$div.addClass('filesmanager-container');$div.get(0).uploader=$this;if($this.data('params').fileBrowser){$a.click(function(){$div.dialog({modal:true,title:"Uploaded Files",width:800,height:600,position:['center',100],buttons:{Cancel:function(){$(this).dialog("close");}},open:function(){$.get(window.rootUrl+'/admin-upload/grid',{prefix:$this.data('prefix'),secure:$this.data('secure')},function(data,textStatus,jqXHR){$div.empty().append(data);$(".grid-wrap").ngrid();});},close:function(){$div.empty();$div.remove();}});});$a.bind('mouseover mouseout',function(){$a.toggleClass('hover');});}
$this.upload('initUploader',$uploader);},addFile:function(info){var $this=this;if(!info.ok){alert('Error: '+ info.error);$this.upload('drawUpload');return;}else if($this.data('params').fileMime&&$.inArray(info.mime,$this.data('params').fileMime)==-1){alert('Incorrect file type : '+
info.mime+'. Expect one of: '+
$this.data('params').fileMime.join(', '));$this.upload('drawUpload');return;}
$(this).upload('drawFile',info);$this.data('params').onChange.call($this,$this.upload('count'));$this.data('params').onFileAdd.call($this,info);},info:function(){return this.data("info");},error:function(){return this.data("error");},destroyUploader:function(){var $this=this;var $uploader=$this.closest('div').find('.upload-control-upload');$uploader.data('intervalId')&&clearInterval($uploader.data('intervalId'));$this.closest('div').find('div.upload-control').remove();$('#uploader-iframe-'+ $this.attr('id')).remove();$('#uploader-form-'+ $this.attr('id')).remove();},getUploader:function(){var $this=this;var aUpload=$('<span>upload</span>');var $uploader=$('<div class="upload-control-upload"></div>').css({display:'inline-block',overflow:'hidden','float':'left'}).append(aUpload);!$this.data('params').fileBrowser&&$uploader.addClass('upload-control-upload-single');return $uploader;},initUploader:function($uploader){var $this=this;var uploaderId=$this.attr('id');var $input=$('<input type="file" />').attr('name','upload');var $form=$('<form></form>').attr({method:'post',enctype:'multipart/form-data',action:window.rootUrl+ $this.data('params').urlUpload,target:'uploader-iframe-'+ uploaderId,id:'uploader-form-'+ uploaderId}).css({margin:0,padding:0});var $input_hidden=$('<input />').attr({name:'prefix',value:$this.data('prefix'),type:'hidden'});var $input_hidden_secure=$('<input />').attr({name:'secure',value:$this.data('secure'),type:'hidden'});$form.append($input_hidden).append($input_hidden_secure);if($this.data('params').fileMaxSize){var $input_hidden_limit=$('<input />').attr({name:'MAX_FILE_SIZE',value:$this.data('params').fileMaxSize,type:'hidden'});$form.append($input_hidden_limit);}
$form.append($input);var $frame=$('<iframe></iframe>').attr({name:'uploader-iframe-'+ uploaderId,id:'uploader-iframe-'+ uploaderId});$('body').append($form);$('body').append($frame);$frame.hide();var $div=$input.wrap('<div></div>').parent().css({overflow:'hidden',width:$uploader.outerWidth(),height:$uploader.outerHeight()}).css({position:'absolute','z-index':10000});setTimeout(function(){$div.css({width:$uploader.outerWidth(),height:$uploader.outerHeight()});},100);var intervalId=setInterval(function(){if($div.css('width')!=$uploader.outerWidth()){$div.css('width',$uploader.outerWidth());}
if($div.css('height')!=$uploader.outerHeight()){$div.css('height',$uploader.outerHeight());}},250);$uploader.data('intervalId',intervalId);$input.css({'float':'right'});$div.css({opacity:0,display:'none'});$input.bind('mouseover mouseout',function(){$uploader.toggleClass('hover');});$uploader.mousemove(function(e){$div.css({display:'block',top:$uploader.offset().top+'px',left:$uploader.offset().left+'px'});});$input.change(function(){$this.data('params').onSelect.call($this);$this.data('params').onSubmit.call($this);$uploader.find('span').empty().append('Uploading...').addClass('uploading');$form.submit();$frame.load(function(){var frame=document.getElementById($frame.attr('id'));var response=$(frame.contentWindow.document.body).text();try{response=$.parseJSON(response);}catch(e){response={ok:false,error:'Error of file uploading on server side'};}
setTimeout(function(){$this.upload('addFile',response);},10);});});}};$.fn.upload=function(method){if(methods[method]){return methods[method].apply(this,Array.prototype.slice.call(arguments,1));}else if(typeof method==='object'||!method){return methods.init.apply(this,arguments);}else{$.error('Method '+ method+' does not exist on jQuery.upload');}};})(jQuery);

}
/*
     FILE ARCHIVED ON 17:46:12 Nov 16, 2016 AND RETRIEVED FROM THE
     INTERNET ARCHIVE ON 20:32:18 Jan 10, 2024.
     JAVASCRIPT APPENDED BY WAYBACK MACHINE, COPYRIGHT INTERNET ARCHIVE.

     ALL OTHER CONTENT MAY ALSO BE PROTECTED BY COPYRIGHT (17 U.S.C.
     SECTION 108(a)(3)).
*/
/*
playback timings (ms):
  captures_list: 179.562
  exclusion.robots: 0.243
  exclusion.robots.policy: 0.225
  cdx.remote: 0.136
  esindex: 0.018
  LoadShardBlock: 145.65 (3)
  PetaboxLoader3.datanode: 423.569 (5)
  PetaboxLoader3.resolve: 1752.419 (3)
  load_resource: 2123.837 (2)
*/