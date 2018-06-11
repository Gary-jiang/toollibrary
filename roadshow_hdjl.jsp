<%@ page contentType="text/html" pageEncoding="UTF-8"%>
<%@ taglib uri="/WEB-INF/c.tld" prefix="c"%>
<%@ taglib uri="/WEB-INF/mytag.tld" prefix="mytag"%>
<mytag:const var="STATUS_NOT_START"/>
<mytag:const var="STATUS_IN_PROGRESS"/>
<mytag:const var="STATUS_CLOSED"/>
<mytag:const var="STATUS_NOT_PUBLISH"/>
<mytag:const var="STATUS_PUBLISH"/>
<mytag:const var="STATUS_LIVE_VIDEO_STOP"/>
<mytag:const var="STATUS_LIVE_VIDEO_START"/>
<mytag:const var="STATUS_AUDIT_APPLY"/>
<mytag:const var="STATUS_AUDIT_PASS"/>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn"%>

<style>
<!--
@charset "utf-8";


/* 最新互动 */
.qa_text {
	float: left;
	width: 600px;
	padding: 8px;
	
	clear: both;
	border-left: 1px solid #cbcbcb;
	border-bottom: 1px solid #cbcbcb;
	border-right: 1px solid #cbcbcb;
	height: 800px;
	overflow: auto;
	overflow-x: hidden;
}
.qa_text a {
	color: #c80000;
}
.qa_text a:hover {
	color: #f00;
}
.qa_block {
	margin-bottom: 15px;
	padding-bottom: 20px;
	border-bottom: 1px solid #ddd;
	word-wrap:break-word;
}
.qa_text_a {
	margin-top: 5px;
}
.qa_text_a_t {
	height: 15px;
	background: url(${res_root}images/qa_bg1.png) left top no-repeat;
}
.qa_text_a_m {
	padding: 2px 20px;
	background: url(${res_root}images/qa_bg1.png) -622px center repeat-y;
}
.qa_text_a_b {
	height: 10px;
	background: url(${res_root}images/qa_bg1.png) -1244px bottom no-repeat;
}
.qa_text_date {
	margin: 5px 0 0;
	color: #ccc;
}
.qa_talkbar {
/* 	float: right; */
/* 	width: 228px; */
	border: 1px solid #ddd;
	font-size: 12px;
}
h4.qa_talkbar_hd {
	background: url(${res_root}images/roadshow/title_bj.png) no-repeat;
	padding: 4px 8px;
/* 	background: #dc0000; */
/* 	color: #fff; */
	font-size: 14px;
}
.qa_talkbar_bd {
	padding: 8px 10px;
}
.qa_talkbar_bd td {
	font-size: 12px;
	padding: 4px 0;
}
.qa_talkbar_bd input.text {
	width: 135px;
}
.qa_talkbar_bd textarea.textarea {
	width: 188px;
	height: 300px;
	padding: 8px;
}
input.btn_ask {
	display: block;
	margin: 0 auto 10px;
	padding: 5px 10px;
}

h4.qa_talkbar_hd a.btn_login {
float: right;
cursor: pointer;
padding: 2px 6px;
/* border: 1px solid #fff; */
/* border-radius: 1px; */
/* box-shadow: 0 0 0 1px #ffe; */
font-size: 12px;
line-height: 12px;
font-weight: normal;
}

-->
</style>
<script type="text/javascript" src="${res_root}js/roadshow/hdjl.js"></script>
<div id="main_page_home">
	<!--页中开始 -->
	<div class="title_bj">互动交流</div>
	<c:if test="${qa_url != null}">
		<div>
			<iframe id="questionFrame" border="0" marginwidth="0" framespacing="0" marginheight="0" src="${qa_url}" frameborder="0" width="100%" height="690"></iframe>
		</div>
	</c:if>
	<c:if test="${qa_url == null}">
		<div id="content">
			<div id="content_left" class="mbView mb_content_left">
				<%-- <c:if test="${live_video != null}">
					<!-- 视频图片开始  -->
					<div class="right_1">
						<h3>视频直播</h3>
						<div class="right_border">
							<div class="hdjl_video">
								<div>
								<c:if test="${roadshow.liveStatus == 1}">
									<img src="${res_root}images/roadshow/novideo_s.jpg" style="width:306px;height:230px">
								</c:if>
								<c:if test="${roadshow.liveStatus == 2}">
									<embed 
										type="application/x-shockwave-flash"
										id="player2"
										name="player2"
										<c:if test="${roadshow.isSeniorPlayer == 1}">
										src="${res_root}js/video/VJTVPlayer.swf"
										</c:if>
										<c:if test="${roadshow.isSeniorPlayer == null or roadshow.isSeniorPlayer == 0}">
										src="${res_root}js/video/VJMSPlayer.swf"
										</c:if>
										height="360" 
										width="480"
										allowscriptaccess="always"
										allowfullscreen="true"
										flashvars="autostart=true&src=${video_url}"
									>
								</c:if>
								</div>
							</div>
						</div>
			  		</div>
				  	<span>视频直播时间为：${live_time}</span>
				  	<!-- 视频图片结束  -->
				</c:if> --%>
	       		<input type="hidden" id="testCode" value="${testCode}" name="testCode">
	        	<input type="hidden" id="rsId" value="${id}" name="rsId">
	        	<input type="hidden" id="companyId" name="companyId" value="${roadshow.uid}">
				<c:if test="${roadshow.isQuestionBoxShow == 1}">
				  	<div class="right_2">
				  	
					  	<c:if test="${roadshow.status == STATUS_NOT_START or roadshow.status == STATUS_IN_PROGRESS}">
						  	<!-- 提问开始  -->
							<div class="qa_talkbar">
							<c:if test="${hasStock==0}">
								<h4 class="qa_talkbar_hd"><a href="javascript:singleCasLogin1();" onclick="singleCasLogin1();" class="btn_login">嘉宾登录</a>向上市公司提问</h4>
							</c:if>
							<c:if test="${hasStock==1}">
								<h4 class="qa_talkbar_hd"><a href="javascript:singleCasLogin1();" onclick="singleCasLogin1();" class="btn_login">嘉宾登录</a>向路演嘉宾提问</h4>
							</c:if>
								<div class="qa_talkbar_bd mb_qa_talke" >
						        	<table style="width:210px;" >
							          	<tbody>
							          		<tr id="casUser">
							            		<td colspan="2">
							            			<input type="button" value="用户登录" onclick="singleCasLogin();">&nbsp;&nbsp;
						            				<span class="liulanyonghu">
						            					<input name="utype" type="radio" value="" checked="checked">浏览用户
							              			</span>
							              		</td>
							              		<input type="hidden" id="isLogin" name="isLogin" value="0">
							          		</tr>
							          		<tr>
							            		<td colspan="2">
								            		<select name="members" id="members" class="select_members" style="width: 250px">
										                <option value="0">选择嘉宾提问：</option>
										                <c:choose>
										                	<c:when test="${members != null}">
																<c:forEach items="${members}" var="v" varStatus="status">
																	<c:if test="${v.uid != null}">
														                <option value="${v.uid}">${v.user_title}:${v.uname}</option>
																	</c:if>
																</c:forEach>
															</c:when>
														</c:choose>
													</select>
												</td>
											</tr>
							          		<tr>
							            		<td colspan="2" id="wordCount">提问内容：还可输入<strong style="color:#093; font-size:16px;">200</strong>字</td>
							          		</tr>
							          		<tr class="mb_textarea">
							          			<td colspan="2"><textarea style="width:250px;height:200px;padding:8px" id="ask_content" onpaste="p_paste()" <c:if test="${roadshow.status == 3}">placeholder='本次活动已结束，您可登录“上证e互动平台”（http://sns.sseinfo.com/）继续向上市公司提问，感谢您的热情参与！'</c:if>></textarea></td>
							          		</tr>
											<c:if test="${roadshow.status != 3 }">
												<tr>
													<td colspan="2">
														<span class="v_code_char">验证码</span>
														<input type="text" size="4" maxlength="4" id="vcode" value="">
														<img style="CURSOR: pointer" id="randImage" title="刷新" width="75" height="26" name="randImage" align="absMiddle" src="${base_href}validateCode.do">
												  	</td>
												</tr>
												<tr>
													<td colspan="2"><input name="btn_ask" id="btn_ask" type="button" value="提问" class="btn_ask"></td>
												</tr>
											</c:if>
							        	</tbody>
							    	</table>
								</div>
							</div>
							<!-- 提问结束  -->
							<h3>提问列表</h3>
							<div id="q_list" class="q_list" style="height:347px;height:344px\9;*height:334px;text-align: left;">
							</div>
		                </c:if>
		                <c:if test="${roadshow.status == STATUS_CLOSED}">
			            	<div class="right_2">
					            <!-- 提问开始  -->
					            <h3 class="h3_tw">
					                提问
					            </h3>
					            <div class="right2_border" style="height:425px">
									<div style="padding-left:15px">欢迎进入在线互动平台！</div>
					            	<div style="padding-left:15px;padding-right:15px;">本次活动已结束，您可登录“上证e互动平台”（<a href="http://sns.sseinfo.com/" target="_blank">http://sns.sseinfo.com/</a>）继续向上市公司提问，感谢您的热情参与！</div>
					            </div>
				            </div>
			            </c:if>
	                </div>
				</c:if>
				<c:if test="${roadshow.isQuestionBoxShow == 0}">
					<div class="right_2">
			            <!-- 提问开始  -->
			            <h3 class="h3_tw">
			                提问
			            </h3>
			            <div class="right2_border" style="height:818px">
			                  <div style="padding-left:15px">欢迎进入在线互动平台！</div>
			                  <c:if test="${roadshow.status == STATUS_NOT_START or roadshow.status == STATUS_IN_PROGRESS}">
			                  	<!-- 2016-07-18	夏高峰	12836	BEGIN  -->
				                  <div style="padding-left:15px;padding-right:15px;"><pre>${roadshow.questionBoxContent}</pre></div>
				                <!-- 2016-07-18	夏高峰	12836	END  -->
			                  </c:if>
			                  <c:if test="${roadshow.status == STATUS_CLOSED}">
			                  		<div style="padding-left:15px;padding-right:15px;">${roadshow.title}已经结束，感谢您的关注和参与！</div>
			                  </c:if>
					<%--<c:if test="${roadshow.status == STATUS_CLOSED}"> --%>
					<!--<div style="padding-left:15px">本次活动已结束，您可登录“上证e互动平台”（<a href="http://sns.sseinfo.com/" target="_blank">http://sns.sseinfo.com/</a>）继续向上市公司提问，感谢您的热情参与！</div> -->
					<%--</c:if> --%>
			            </div>
		            </div>
				</c:if>
	            
			</div>
			<div id="content_left">
				<div id="tabs0">
	 				<div id="tabtitle">
	 					<div style="float:right;width:130px;line-height:25px;" class="mb_interact">
	 						<input style="vertical-align:middle;" type="checkbox" name="checkbox" id="refresh" checked="checked">
	 						<span title="60秒刷新一次"> 自动刷新</span>
	 					</div>
						<ul class="menu0" id="menu0">
							<li class="hover">互动交流</li>
						</ul>
					</div>
						<!--<div class="main" id="main0"> -->
						<!-- 互动正文 START -->
					    <div class="qa_text"> 
					    </div>
						<!--</div> -->
				</div>
			</div>
			<div id="content_right" class="mbHidden">
				<%-- <c:if test="${live_video != null}">
					<!-- 视频图片开始  -->
					<div class="right_1">
						<h3>视频直播</h3>
						<div class="right_border">
							<div class="hdjl_video">
								<div>
								<c:if test="${roadshow.liveStatus == 1}">
									<img src="${res_root}images/roadshow/novideo_s.jpg" style="width:306px;height:230px">
								</c:if>
								<c:if test="${roadshow.liveStatus == 2}">
									<embed 
										type="application/x-shockwave-flash"
										id="player2"
										name="player2"
										<c:if test="${roadshow.isSeniorPlayer == 1}">
										src="${res_root}js/video/VJTVPlayer.swf"
										</c:if>
										<c:if test="${roadshow.isSeniorPlayer == null or roadshow.isSeniorPlayer == 0}">
										src="${res_root}js/video/VJMSPlayer.swf"
										</c:if>
										height="360" 
										width="480"
										allowscriptaccess="always"
										allowfullscreen="true"
										flashvars="autostart=true&src=${video_url}"
									>
								</c:if>
								</div>
							</div>
						</div>
			  		</div>
				  	<span>视频直播时间为：${live_time}</span>
				  	<!-- 视频图片结束  -->
				</c:if> --%>
	       		<input type="hidden" id="testCode" value="${testCode}" name="testCode">
	        	<input type="hidden" id="rsId" value="${id}" name="rsId">
	        	<input type="hidden" id="companyId" name="companyId" value="${roadshow.uid}">
				<c:if test="${roadshow.isQuestionBoxShow == 1}">
				  	<div class="right_2">
				  	
					  	<c:if test="${roadshow.status == STATUS_NOT_START or roadshow.status == STATUS_IN_PROGRESS}">
						  	<!-- 提问开始  -->
							<div class="qa_talkbar">
							<c:if test="${hasStock==0}">
								<h4 class="qa_talkbar_hd"><a href="javascript:singleCasLogin1();" onclick="singleCasLogin1();" class="btn_login">嘉宾登录</a>向上市公司提问</h4>
							</c:if>
							<c:if test="${hasStock==1}">
								<h4 class="qa_talkbar_hd"><a href="javascript:singleCasLogin1();" onclick="singleCasLogin1();" class="btn_login">嘉宾登录</a>向路演嘉宾提问</h4>
							</c:if>
								<div class="qa_talkbar_bd">
						        	<table style="width:210px;">
							          	<tbody>
							          		<tr id="casUser">
							            		<td colspan="2">
							            			<input type="button" value="用户登录" onclick="singleCasLogin();">&nbsp;&nbsp;
						            				<span class="liulanyonghu">
						            					<input name="utype" type="radio" value="" checked="checked">浏览用户
							              			</span>
							              		</td>
							              		<input type="hidden" id="isLogin" name="isLogin" value="0">
							          		</tr>
							          		<tr>
							            		<td colspan="2">
								            		<select name="members" id="members" class="select_members" style="width: 250px">
										                <option value="0">选择嘉宾提问：</option>
										                <c:choose>
										                	<c:when test="${members != null}">
																<c:forEach items="${members}" var="v" varStatus="status">
																	<c:if test="${v.uid != null}">
														                <option value="${v.uid}">${v.user_title}:${v.uname}</option>
																	</c:if>
																</c:forEach>
															</c:when>
														</c:choose>
													</select>
												</td>
											</tr>
							          		<tr>
							            		<td colspan="2" id="wordCount">提问内容：还可输入<strong style="color:#093; font-size:16px;">200</strong>字</td>
							          		</tr>
							          		<tr>
							          			<td colspan="2"><textarea style="width:250px;height:200px;padding:8px" id="ask_content" onpaste="p_paste()" <c:if test="${roadshow.status == 3}">placeholder='本次活动已结束，您可登录“上证e互动平台”（http://sns.sseinfo.com/）继续向上市公司提问，感谢您的热情参与！'</c:if>></textarea></td>
							          		</tr>
											<c:if test="${roadshow.status != 3 }">
												<tr>
													<td colspan="2">
														<span class="v_code_char">验证码</span>
														<input type="text" size="4" maxlength="4" id="vcode" value="">
														<img style="CURSOR: pointer" id="randImage" title="刷新" width="75" height="26" name="randImage" align="absMiddle" src="${base_href}validateCode.do">
												  	</td>
												</tr>
												<tr>
													<td colspan="2"><input name="btn_ask" id="btn_ask" type="button" value="提问" class="btn_ask"></td>
												</tr>
											</c:if>
							        	</tbody>
							    	</table>
								</div>
							</div>
							<!-- 提问结束  -->
							<h3>提问列表</h3>
							<div id="q_list" class="q_list" style="height:347px;height:344px\9;*height:334px;text-align: left;">
							</div>
		                </c:if>
		                <c:if test="${roadshow.status == STATUS_CLOSED}">
			            	<div class="right_2">
					            <!-- 提问开始  -->
					            <h3 class="h3_tw">
					                提问
					            </h3>
					            <div class="right2_border" style="height:425px">
									<div style="padding-left:15px">欢迎进入在线互动平台！</div>
					            	<div style="padding-left:15px;padding-right:15px;">本次活动已结束，您可登录“上证e互动平台”（<a href="http://sns.sseinfo.com/" target="_blank">http://sns.sseinfo.com/</a>）继续向上市公司提问，感谢您的热情参与！</div>
					            </div>
				            </div>
			            </c:if>
	                </div>
				</c:if>
				<c:if test="${roadshow.isQuestionBoxShow == 0}">
					<div class="right_2">
			            <!-- 提问开始  -->
			            <h3 class="h3_tw">
			                提问
			            </h3>
			            <div class="right2_border" style="height:818px">
			                  <div style="padding-left:15px">欢迎进入在线互动平台！</div>
			                  <c:if test="${roadshow.status == STATUS_NOT_START or roadshow.status == STATUS_IN_PROGRESS}">
			                  	<!-- 2016-07-18	夏高峰	12836	BEGIN  -->
				                  <div style="padding-left:15px;padding-right:15px;"><pre>${roadshow.questionBoxContent}</pre></div>
				                <!-- 2016-07-18	夏高峰	12836	END  -->
			                  </c:if>
			                  <c:if test="${roadshow.status == STATUS_CLOSED}">
			                  		<div style="padding-left:15px;padding-right:15px;">${roadshow.title}已经结束，感谢您的关注和参与！</div>
			                  </c:if>
					<%--<c:if test="${roadshow.status == STATUS_CLOSED}"> --%>
					<!--<div style="padding-left:15px">本次活动已结束，您可登录“上证e互动平台”（<a href="http://sns.sseinfo.com/" target="_blank">http://sns.sseinfo.com/</a>）继续向上市公司提问，感谢您的热情参与！</div> -->
					<%--</c:if> --%>
			            </div>
		            </div>
				</c:if>
	            
			</div>
		</div>
	</c:if>
</div>


<script type="text/javascript">

	

	var timeId;
	$(function(){
		
		//ajax请求确认用户是否登录
		$.ajax({
			type: "post",
			async:false,
			cache:false,
			url: _PUBLIC_ + "ajax/isuserLogined.do",
			success: function(data, textStatus){  
				if(data.status == 1){
					$("#casUser").html("<td colspan='2'>"+ data.uname +"已登录<a href='javascript:void(0);' onclick='singleCasLogout();' class='dengchu'>>>登出</a></td>");
					$("#isLogin").val("1");
				} else {
					$("#casUser").html("<td colspan='2'><input type='button' value='用户登录' onclick='singleCasLogin();'><span class='liulanyonghu'><input name='utype' type='radio' value='' checked='checked'> 浏览用户</span></td>");
					$("#isLogin").val("0");
				}
			},
			error: function(XMLHttpRequest, textStatus, errorThrown){                        
				showError("网络出错，请稍后再试");             
			} 
		});
		
		//验证码
		$('#randImage').click(function(){
			$('#randImage').attr('src',_PUBLIC_ + "validateCode.do?"+Math.random()); 
		});
		
		var rsId = $("#rsId").val();
		var companyId = $("#companyId").val();
		
		//初始化自动刷新
		if ($("#refresh").attr("checked")){
			var refresh_time = "${refresh_time}";
			var isChecked = $("#refresh").is(':checked');
			if (isChecked != true) {
				$("#refresh").attr("checked", false);
				window.clearInterval(itmeID);
			} else {
				$("#refresh").attr("checked","checked");
				timeID = window.setInterval("reloadData()", refresh_time * 1000);
			}
		}
		
		//点击自动刷新
		$("#refresh").click(function(){
			var refresh_time = "${refresh_time}";
			var isChecked = $("#refresh").is(':checked');
			if (isChecked != true) {
				$("#refresh").attr("checked", false);
				window.clearInterval(timeID);
			} else {
				$("#refresh").attr("checked","checked");
				timeID = window.setInterval("reloadData()", refresh_time * 1000);
			};
		});
		
		$.ajax({
			type : "get",
			url : _PUBLIC_ + "ajax/singlefeeds.do?type=11&pageIndex=1&pageSize=20&rsId=" + rsId + "&companyId=" + companyId + "&testCode=${testCode}",
			cache : false,
			success : function(txtData, textStatus){
				$(".qa_text").html(txtData);
			},
			complete : function(XMLHttpRequest, textStatus){
			},
			error : function(){
			}
		});
		
		$.ajax({
			type : "get",
			url : _PUBLIC_ + "ajax/singlefeeds.do?type=10&pageIndex=1&pageSize=20&rsId=" + rsId + "&companyId=" + companyId + "&testCode=${testCode}",
			cache : false,
			success : function(txtData,textStatus){
				$("#q_list").html(txtData);
			},
			complete : function(XMLHttpRequest, textStatus){
			},
			error : function(){
			}
		});
	});
	
	//嘉宾单点登录
	function singleCasLogin1() {
		var url = window.location.href;
		var id = url.split('?')[1].split('&')[0].split('=')[1];
		var tabId = url.split('?')[1].split('&')[1].split('=')[1];
		var testCode = "";
		var href = "";
		var isLogin = $("#isLogin").val();
		if (url.split('?')[1].split('&').length > 2) {
			testCode = url.split('?')[1].split('&')[2].split('=')[1];
			href = "${casServerUrlPrefix}" + "login?service=" + encodeURIComponent("${base_href}investor_index.do");
		} else {
			href = "${casServerUrlPrefix}" + "login?service=" + encodeURIComponent("${base_href}investor_index.do");
		}
		window.location.href = href;
	}
	
	//单点登录
	function singleCasLogin() {
		var url = window.location.href;
		var id = url.split('?')[1].split('&')[0].split('=')[1];
		var tabId = url.split('?')[1].split('&')[1].split('=')[1];
		var testCode = "";
		var href = "";
		var isLogin = $("#isLogin").val();
		if (url.split('?')[1].split('&').length > 2) {
			testCode = url.split('?')[1].split('&')[2].split('=')[1];
			href = "${casServerUrlPrefix}" + "login?service=" + encodeURIComponent("${base_href}guest/single_pending.do?id=" + id + "&tabId=" + tabId + "&testCode=" + testCode + "&isLogin=" + isLogin);
		} else {
			href = "${casServerUrlPrefix}" + "login?service=" + encodeURIComponent("${base_href}guest/single_pending.do?id=" + id + "&tabId=" + tabId + "&isLogin=" + isLogin);
		}
		window.location.href = href;
	}
	
	$("#btn_ask").click(function(){
		var checkcode = $("#vcode").val();
		var rsId = $("#rsId").val();
		var companyId = $("#companyId").val();
		
		var content = $("#ask_content").val();
		var testCode = $("#testCode").val();
		
		
		
		if(content == null || content == "" || content.length==0 ){
			$.jBox.tip("请输入提问内容");
			return false;
		}else if(content.realLength() > 200){
			$.jBox.tip("内容超过限定字数");
			return false;
		}
		if(checkcode == ""){
			$.jBox.tip("请输入验证码");
			return false;
		}
		var issued = '${roadshow.isIssued}';
		var toUid = $("#members").val();
		
		if(issued == '0'  || issued == '' || issued == 'null' ){
			if (toUid == 0) {
				$.jBox.tip("请选择嘉宾");
				return false;
			}
			$.ajax({
				type : "post",
				url : _PUBLIC_ + "ajax/singleAsk.do",
				data : {"checkcode":checkcode,"rsId":rsId,"companyId":companyId,"toUid":toUid,"content":content,"testCode":testCode,"issued":issued},
				success : function(data, textStatus) {
					if (data.status == 1){
						$.jBox.tip("提问成功");
						$("#vcode").val("");
						$("#ask_content").val("");
						$("#wordCount").html("提问内容：还可输入<strong style='color:#093; font-size:16px;'>" + 200 + "</strong>字");
					} else {
						$.jBox.tip(data.reason);
					}
				},
				complete:function(XMLHttpRequest, testStatus){
					$('#randImage').click();
				},
				error : function() {
					$.jBox.tip("网络错误");
				}
			})
		}
		if(issued == '1'){	
			//0代表未选择嘉宾，toUid设置为-1是为了兼容原来的逻辑
			// if(toUid == '0'){
			//	 toUid = '-1'; 
			//}
			
			 if (toUid == 0) {
				 $.jBox.tip("请选择嘉宾");
					return false;
			}
			
			$.ajax({
					type : "post",
					url : _PUBLIC_ + "ajax/singleAsk.do",
					data : {"checkcode":checkcode,"rsId":rsId,"companyId":companyId,"toUid":toUid,"content":content,"testCode":testCode,"issued":issued},
					success : function(data, textStatus) {
						if (data.status == 1){
							$.jBox.tip("提问成功");
							$("#vcode").val("");
							$("#ask_content").val("");
							$("#wordCount").html("提问内容：还可输入<strong style='color:#093; font-size:16px;'>" + 200 + "</strong>字");
						} else {
							$.jBox.tip(data.reason);
						}
					},
					complete:function(XMLHttpRequest, testStatus){
						$('#randImage').click();
					},
					error : function() {
						$.jBox.tip("网络错误");
					}
				})
		}
	});
	
	//自动刷新加载数据
	function reloadData() {
		var page = $("#pageNo").find("option:selected").val();
		if (page != 1) {
			$("#refresh").attr("checked", false);
			window.clearInterval(timeID);
		} else {
			$(".qa_text").animate({scrollTop:0},100);
			var rsId = $("#rsId").val();
			var companyId = $("#companyId").val();
			$.ajax({
			      type: "get",
			      url : _PUBLIC_ + "ajax/singlefeeds.do",
			      data: {"pageIndex": page, "type":11,"pageSize":20,"companyId":companyId,"rsId":rsId,"orderBy":2, "testCode":"${testCode}"},
			      cache : false,
			      success: function(txtData, textStatus){
	// 		    		  $('#a').attr("class","current");
	// 		    		  $('#q').attr("class","");
			    		  $(".qa_text").html("");
			    		  $(".qa_text").html(txtData);
			      },
			      complete: function(XMLHttpRequest, textStatus){
		          },
		          error: function(){
		          }
			 });
			
			$.ajax({
				type : "get",
				url : _PUBLIC_ + "ajax/singlefeeds.do",
				data : {"pageIndex": 1, "type":10, "pageSize":20,"companyId":companyId,"rsId":rsId,"orderBy":2,"testCode":"${testCode}"},
				cache : false,
				success : function(txtData,textStatus){
					$("#qa_text").html("");
					$("#q_list").html(txtData);
				},
				complete : function(XMLHttpRequest, textStatus){
				},
				error : function(){
				}
			});
		}
	}
	
</script>

<script type="text/javascript">
	function singleCasLogout() {
		var url = window.location.href;
		var id = url.split('?')[1].split('&')[0].split('=')[1];
		var tabId = url.split('?')[1].split('&')[1].split('=')[1];
		var testCode = "";
		var href = "";
		if (url.split('?')[1].split('&').length > 2) {
			testCode = url.split('?')[1].split('&')[2].split('=')[1];
			href = "${casServerUrlPrefix}logout?serviceUrl=" + encodeURIComponent("${base_href}singleCasLogout.do?id=" + id + "&tabId=" + tabId + "&testCode=" + testCode);
		} else {
			href = "${casServerUrlPrefix}logout?serviceUrl=" + encodeURIComponent("${base_href}singleCasLogout.do?id=" + id + "&tabId=" + tabId);
		}
		window.location.href = href;
	}
</script>