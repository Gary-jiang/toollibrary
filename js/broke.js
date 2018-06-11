//加载模块
layui.use([ 'jquery', 'utils', 'laytpl', 'layer', 'form','laydate','flow','element','upload' ], function($, utils, laytpl, layer, form,laydate,flow,element,upload) {
	var form = layui.form(), layer = layui.layer,element = layui.element(),upload = layui.upload();
	form.render('select');
	//爆料列表
	layui.broke = function(page, _next){
		$('#broke_list').html("");
		flow.load({
		     elem: '#broke_list',
		     isAuto: false,
		     isLazyimg: true,
		     done: function(page, next){//broke(page, next);
		     	utils.ajax({
				   url: "web/article/brokeList.do",
				   data: {
			    		currPage: page || 1, 
			    	    pageSize: 5,
			    	    searchWord: $("#searchWord").val() || "",
			    	    searchTime: $("#searchTime").val() || "",
			    	    startTime:  $("#startTime").val()  || "",
			    	    endTime:    $("#endTime").val()    || ""
				   }
				},function(result){
					next(laytpl($("#broke_list_tpl").html()).render(result), page < result.data.totalPages );
					for(var i = 0; i < result.data.ldata.length; i++){
						var article =  result.data.ldata[i];
						utils.ajax({
							type:"post",
							url : "web/article/findVideosById.do",
							data:{
								'id':article.id
							}
				  		},function(result) {
				  			if (result.data.url != undefined) {
				  				if(result.data.fileType == 3){
				  					$("#" + result.data.id).html('<video src="'+result.data.url+'" controls="controls" width="290" height="180"></video>');
								} else if(result.data.fileType == 2){
									$("#" + result.data.id).html('<audio src="'+result.data.url+'" controls="controls" ></audio>');
								}
							}
				  			
				  		});
					}	
					//图片放大
					$("#broke_list").find("ul.imageList").each(function(){
						layer.photos({
						  photos: $(this)
						  ,anim: 5 //0-6的选择，指定弹出图片动画类型，默认随机（请注意，3.0之前的版本用shift参数）
						});
					});
				});
		     }
		}) ;
	};
	layui.broke(1);
	//监控时间筛选
	form.on('select(timeFilter)', function(data){
		 $("#searchTime").val(data.value)
		 layui.broke(1);
	});
	
	//保存事件
	layui.saveBtn = function() {
		//传入音视频或图片的信息
		var videos = layui.getVideoNum();
		var audios = layui.getAudioNum();
		var pics = layui.getPicNum();
		if(videos.length>0){
			$('#qiniuIds').val(videos.join(","));
		}
		if(audios.length>0){
			$('#qiniuIds').val(audios.join(","));
		}
		if(pics.length>0){
			$('#pictureIds').val(pics.join(","));
		}
    	//正文校验
    	var editorValue = $("#editorValue").val();
    	$("#articleContent").val(editorValue);
    	if(editorValue=="" || editorValue.length==0){
 			 layer.tips("请输入内容！", $("#editorValue"),{tips:3});
 	       return;
 		}
  		utils.ajax({
  			type : "post",
  			url : "web/article/addEdit.do",
  			data : $('#brokeFrm').serialize(),
  		},function(result) {
  			if (result.success) {
  				layer.alert("保存成功！", {
  					icon : 1,
  					scrollbar:false,
  					closeBtn:0,
  				}, function(index) {
  					window.location.reload(); 
  					layer.close(index);
  				});
  			}
  		}); 
  		return false;
    };
	//关键字检索
	$("#searchBtn").click(function(){
		 broke(1);
	});
	//判断是否继续上传
	layui.isContinue = function(){
		var videos = layui.getVideoNum();
		var audios = layui.getAudioNum();
		var pics = layui.getPicNum();
		if(videos.length>0){
			return false;
		}
		if(audios.length>0){
			return false;
		}
		if(pics.length>=9){
			return false;
		}
		return true;
	};
	//判断是否上传过图片
	layui.isExistPic = function(){
		var pics = layui.getPicNum();
		if(pics.length > 0){
			return false;
		}
		return true;
	};
	//点击加号出发图片上传按钮
	layui.addImageBtn = function(){
		if(!layui.isContinue()){
			layer.alert("您只能上传1部视频或1部音频或9张图片！", {
				icon : 7,
				scrollbar:false,
				closeBtn:0,
			});
			return;
		}	
		$("#uploadPicBtn").click();
	};
	//图片上传
	layui.upload({
	    url: layui.root_path + 'upload/image.do'
	    ,elem: '#uploadPicBtn'
	    ,method: 'post' 
	    ,type: "images"
	    ,title: "图片上传"
	    ,success: function(res){
	    	if(res.success){
	    		addPic(res);
	    	}else{
	    		utils.openMsgDialog(res.message, false);
	    	}
	    }
	});
	//添加移除图片
	function addPic(res){
		var src = layui.upload_path + res.url + "?t=" + Math.random();
		var html = '<div class="ugc_bl_picture ugc_num_pic" id="'+res.fileName+'" pid="'+res.fileName+':'+res.title+':'+res.url+':'+res.thumFileName+'"><img src="'+src+'" width="223" height="222" /><div class="ugc_bl_close"><a href="javascript:;" ><img src="images/close.png" width="43" height="41" /></a></div></div>';
		$("#js_picture_append").prepend(html);
		$(".ugc_bl_close").click(function(){
			$(this).parent().remove();
		});
	};
	//遍历js_picture_append统计上传图片数量
	layui.getPicNum = function(){
		var picNum = new Array();
		$(".ugc_num_pic").each(function(){
			picNum.push($(this).attr("pid"));
		});
		return picNum;
	};
	//遍历js_video_append统计上传图片数量
	layui.getVideoNum = function(){
		var videoNum = new Array();
		$(".ugc_num_video").each(function(){
			videoNum.push($(this).attr("vid"));
		});
		return videoNum;
	};
	//遍历js_audio_append统计上传图片数量
	layui.getAudioNum = function(){
		var audioNum = new Array();
		$(".ugc_mp3_box").each(function(){
			audioNum.push($(this).attr("aid"));
		});
		return audioNum;
	};
	//上传音视频方法
	var uploadVideo = function() {
		if(!layui.isContinue() || !layui.isExistPic()){
			layer.alert("您只能上传1部视频或1部音频或9张图片！", {
				icon : 7,
				scrollbar:false,
				closeBtn:0,
			});
		}else{
			window.frames[0].postMessage('upload','http://m.v.zjol.com.cn');//http://m.v.zjol.com.cn
		}
	};
	$("#js_add_video").click(function(){
		uploadVideo();
	});
	
	$("#js_add_audio").click(function(){
		uploadVideo();
	});
	//选择音视频或图片按钮
	layui.pictureBtn = function(type,fileType){
		$("#type").val(type);
		$("#fileType").val(fileType);
		if(fileType==0){
			$("#picture").show();
			$("#video").hide();
			$("#audio").hide();
			
		}
		if(fileType==2){
			$("#video").hide();
			$("#picture").hide();
			$("#audio").show();
		}
		if(fileType==3){
			$("#audio").hide();
			$("#video").show();
			$("#picture").hide();
		}
	};
	//保存音视频
	window.addEventListener('message', function(e) {
		var msg=e.data;
		if(msg.indexOf("progress")>=0 && msg.indexOf("progress")<=100){
			$("#js_audio_process").show();
			$("#js_video_process").show();
			layui.progressBar(e.data.split("=")[1]);
		}else{
			$("#js_audio_process").hide();
			$("#js_video_process").hide();
			layui.progressBar(0);
			var vId = e.data.split("=")[1];
			var vType = $("#fileType").val();
			$("#id").val(vId);
			utils.ajax({
				type:"post",
				url : "web/article/saveVideo.do",
				data:{
					'id': vId,
					'name':'test',
					'docId':'0'
				}
			},function(result) {
				addVideoBox(vId, vType);
				
			});
		}
		
	}, false); 
	//添加一个音视频占位框
	function addVideoBox(_vid, _type){
		if(_type == 3){
			var html = '<div class="ugc_num_video" vid="' + _vid + ':' + _type + '" id="v_' + _vid + '">'
			+ '<div class="ugc_video_player">'
			+ '<img title="转码中..." class="loadingImg" src="images/onLoad.gif">'
			+ '<video controls="controls" width="100%" height="100%"></video>'
			+ '</div>'
			+ '<ul><li class="ugc_yp_leftjl"><a href="javascript:;" onclick="layui.deleteAudioVideo(' + _vid + ')">删除</a></li></ul></div>';
			$("#js_video_append").append(html);
		}else if(_type == 2){
			var html = '<div class="ugc_mp3_box" aid="' + _vid + ':' + _type + '" id="v_' + _vid + '">' 
			+ '<div class="ugc_mp3">'
			+ '<img title="转码中..." class="loadingImg" src="images/onLoad.gif">' 
			//+ '<audio controls="controls" width="100%" height="100%"></audio>'
			+ '</div>'
			+ '<ul><li class="ugc_yp_leftjl"><a href="javascript:;" onclick="layui.deleteAudioVideo(' + _vid + ')">删除</a></li></ul>'
			+ '</div>';
			$("#js_audio_append").append(html);
		}
		//获取转码状态，转码完成后才下载视频
		var int = self.setInterval(function(){
			utils.ajax({
				url : "web/article/queryVideoStatus.do",
				data : {id: _vid}
			}, function(result){
				var message = JSON.parse(result.message);
				if(message && message.code == 0){
					window.clearInterval(int);
					downLoadVideo();
				}
			});
			
		},2000);
	}
	//获取视频地址并显示
	function downLoadVideo(){
		//video显示
		utils.ajax({
			type:"post",
			url : "web/article/downLoadVideoStatus.do",
			data:{
				'id':$("#id").val()
			}
		},function(result) {
			$("#js_video_process").hide();
			$("#js_audio_process").hide();
			if(result.res != undefined && result.res == false){
				//下载失败时重试
				downLoadVideo();
			}
			var data = result.message;
			var obj = JSON.parse(data); 
			if(obj.res != undefined && obj.res == false){
				parent.layer.alert("音视频上传失败,请刷新当前页面后重新上传！",{scrollbar: false,closeBtn: 0});
			}
			if($("#fileType").val() == 3){
				/*var html = '<div class="ugc_num_video" vid="'+$("#id").val()+':'+$("#fileType").val()+'" id="v_'+$("#id").val()+'"><video src="'+obj.url+'" controls="controls" width="290" height="180"></video><ul><li class="ugc_yp_leftjl"><a href="javascript:;" onclick="layui.deleteAudioVideo('+$("#id").val()+')">删除</a></li></ul></div>';
				$("#js_video_append").append(html);*/
				var $videoBox = $("#v_" + $("#id").val());
				//$videoBox.find("img.loadingImg").remove();
				$videoBox.find(".ugc_video_player").html('<video src="'+obj.url+'" controls="controls" width="100%" height="100%"></video>');
			} else if($("#fileType").val() == 2){
				/*var html = '<div class="ugc_mp3" aid="'+$("#id").val()+':'+$("#fileType").val()+'" id="v_'+$("#id").val()+'"><audio src="'+obj.url+'" controls="controls" ></audio><ul><li class="ugc_yp_leftjl"><a href="javascript:;" onclick="layui.deleteAudioVideo('+$("#id").val()+')">删除</a></li></ul></div>';
				$("#js_audio_append").append(html);*/
				var $videoBox = $("#v_" + $("#id").val());
				//$videoBox.find("img.loadingImg").remove();
				$videoBox.find(".ugc_mp3").html('<audio src="'+obj.url+'" controls="controls" width="421" height="54"></audio>');
			}
		});
	}
	//进度条
	layui.progressBar = function(percent){
		element.progress('js_process_filter', percent+"%");
	};
	//删除附件操作
	layui.deleteAudioVideo = function(id){
		$("#v_"+id).remove();
	}
	
});