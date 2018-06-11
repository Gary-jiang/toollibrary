var $findzxgg = $(".search_jumpj");
if ( $findzxgg.length >0 && $(".nav-tabs").length >0 ) {
	var $comCodeSort = $("#comCodeSort").find("a");//按时间排序tab点击绑定
	var isComCodeSort = 0;//按时间排序,0降序，1升序
	var $dateSort = $("#dateSort").find("a");//按代码排序tab点击绑定
	var isDateSort = 0;//按代码排序,0降序，1升序
	
	$comCodeSort.on("click", function () {
		if(!isComCodeSort){
			$.ajax({
				url : sseQueryURL + 'disclosure/listedinfo/announcement/s_docdatesort_desc.htm?p='+Math.floor(Math.random() * (100000 + 1)),
				type:"post",
				dataType: "html",
				async:false,
				cache : false,
				success : function (callBackData) {
					$("#panel-1").addClass("active");
					$("#panel-2").removeClass("active");
					$("#panel-1").find(".sse_list_1").show();
					$("#panel-2").find(".sse_list_1").hide();
					$("#panel-1").find(".glyphicon").removeClass("glyphicon-arrow-up").addClass("glyphicon-arrow-down");
					$("#panel-1").find(".modal_pdf_list").html(callBackData);
					isComCodeSort = 1;
				}
			});
		}else{
			$.ajax({
				url : sseQueryURL + 'disclosure/listedinfo/announcement/s_docdatesort_asc.htm?p='+Math.floor(Math.random() * (100000 + 1)),
				type:"post",
				dataType: "html",
				async:false,
				cache : false,
				success : function (callBackData) {
					$("#panel-1").addClass("active");
					$("#panel-2").removeClass("active");
					$("#panel-1").find(".sse_list_1").show();
					$("#panel-2").find(".sse_list_1").hide();
					$("#panel-1").find(".glyphicon").removeClass("glyphicon-arrow-down").addClass("glyphicon-arrow-up");
					$("#panel-1").find(".modal_pdf_list").html(callBackData);
					isComCodeSort = 0;
				}
			});
		}

	});
	
	$dateSort.on("click", function () {
		if(!isDateSort){
			$.ajax({
				url : sseQueryURL + 'disclosure/listedinfo/announcement/s_doczqdmsort_desc.htm?p='+Math.floor(Math.random() * (100000 + 1)),
				type:"post",
				dataType: "html",
				async:false,
				cache : false,
				success : function (callBackData) {
					$("#panel-2").addClass("active");
					$("#panel-1").removeClass("active");
					$("#panel-2").find(".sse_list_1").show();
					$("#panel-1").find(".sse_list_1").hide();
					$("#panel-2").find(".glyphicon").removeClass("glyphicon-arrow-up").addClass("glyphicon-arrow-down");
					$("#panel-2").find(".modal_pdf_list").html(callBackData);
					isDateSort = 1;
				}
			});
		}else{
			$.ajax({
				url : sseQueryURL + 'disclosure/listedinfo/announcement/s_doczqdmsort_asc.htm?p='+Math.floor(Math.random() * (100000 + 1)),
				type:"post",
				dataType: "html",
				async:false,
				cache : false,
				success : function (callBackData) {
					$("#panel-2").addClass("active");
					$("#panel-1").removeClass("active");
					$("#panel-2").find(".sse_list_1").show();
					$("#panel-1").find(".sse_list_1").hide();
					$("#panel-2").find(".glyphicon").removeClass("glyphicon-arrow-down").addClass("glyphicon-arrow-up");
					$("#panel-2").find(".modal_pdf_list").html(callBackData);
					isDateSort = 0;
				}
			});
		}

	});
}