/************本地使用变量*****************/

var checkflag=true;//标识是否第一次加载树
var timeflag=true;//标识是否跳转时间
var clickflag=false;//标识用户是否点击搜索按妞 默认否;
var ispdf = false;
/**
 * query请求时过滤特殊字符
 * @param replacestr
 * @returns
 */
 function replaceStrs(str){
    var replacestr = str.replace(/[\(\)\*\（\）\-\\]/g," ");
    replacestr = replacestr.replace(" to "," ");
    return replacestr;
 }
 function blockLoading()
 {

    $("#sse_query_menu").css("display","none");
    $("#layout").css("display","block");

 }
 function noneLoading()
 {

    $("#sse_query_menu").css("display","block");
    $("#layout").css("display","none");
 }

 function queryBLoading()
 {

    $("#sse_query_list").css("display","none");
    $("#laylist").css("display","block");

 }
 function queryNLoading()
 {

    $("#sse_query_list").css("display","block");
    $("#laylist").css("display","none");
 }
 var searchPdf = "T_L CTITLE T_D E_KEYWORDS T_JT_E likeT_L";
 function searchpdf(indexf){
    if("1"==indexf){
        ispdf = false;
        searchPdf ="T_L CTITLE T_D E_KEYWORDS T_JT_E likeT_L";
    }else{
        ispdf = true;
        searchPdf ="T_L CTITLE T_D CONTENT T_JT_E likeT_L";
    }

 }
/**
 *手机版全文和标题切换响应事件
 *1 标题
 *2 全文
 */
 function searchMobilepdf(indexf){
    if("1"==indexf){
        ispdf = false;
        searchPdf ="T_L CTITLE T_D E_KEYWORDS T_JT_E likeT_L";
    }else{
        ispdf = true;
        searchPdf ="T_L CTITLE T_D CONTENT T_JT_E likeT_L";
    }
    keyOnclick();

 }
/*function searchpdf(){
    checkflag=true;
    var pdfcode = $("#hchannelcode").val();
    pdfcode = pdfcode.replace(new RegExp("T_D",'gm'),',');
    var pdfpCode = $("#pCode").val();//传递的父级节点
    if($("#checkAll").hasClass('checked')){
        $("#checkAll").removeClass('checked');
        searchPdf ="T_L CTITLE T_E likeT_L";
    }else {
        $("#checkAll").addClass('checked');
        searchPdf ="T_L CTITLE T_D CONTENT T_JT_E likeT_L";
    }
    $("#pageinfo").children().remove();
    getCountSearchResult(pdfcode,"",pdfpCode);
    setTimeout(function(){
        orderbyTime();
        },2800);
    
    
    
    
}*/


/**
 * 主页热词点击事件
 */
 function rcmonclick(v){

    var gourl="/home/search?webswd="+v;
    windowOpen(gourl,"_self");

 }


/**
 * 重写setcookie
 * @param c_name
 * @param value
 * @param expiredays
 */
 function orrderSetCokie(c_name, value, expiredays){

    var cookieVal="";
    var stVal=getCookie(c_name);
    var ckstrs= new Array(); //定义一数组 
    if(stVal != null && stVal!=""){
        ckstrs = stVal.split(",");
        var idx =ckstrs.indexOf(value);
        if(idx>-1){
            ckstrs.splice(idx,1);
        }
        ckstrs.push(value);
        
        for(var i=0;i<ckstrs.length;i++){
            cookieVal +=ckstrs[i]+",";
        }
        cookieVal = cookieVal.substring(0,cookieVal.lastIndexOf(","))
    }else{
        cookieVal = value;
    }
    setCookie(c_name,cookieVal,expiredays);
    
}

/**
 * 设置cookie
 * @param c_name
 * @param value
 * @param expiredays
 */
 function setCookie(c_name,value,expiredays)
 {
    var exdate=new Date()
    exdate.setDate(exdate.getDate()+30);
    var domain = document.domain;
        domain = domain.substr(domain.indexOf("."));
    document.cookie=c_name+ "=" +escape(value)+
    ((expiredays==null) ? "" : "; path=/; expires="+exdate.toGMTString()+"; domain="+domain)
 }



/**
 * 获取时间段
 * @param todayDate
 * @param n
 * @returns {String}
 */
 function minusMonth(todayDate, n)
 {      
    var s = todayDate.split(".");
    var yy = parseInt(s[0]);
    var mm = parseInt(s[1]); 
    var dd = parseInt(s[2]); 
    var dt = new Date(yy, mm, dd); 
    var n = dt.setMonth(dt.getMonth() - n);


    if ((dt.getYear() * 12 + dt.getMonth()) < (yy * 12 + mm - n)) {
        dt = new Date(dt.getYear(), dt.getMonth(), 0); 
    }
    var nmonth = dt.getMonth();
    var nday = dt.getDate();
    if(nmonth<10){
        nmonth = "0"+nmonth;
    }
    if(nday<10){
        nday = "0"+nday;
    }
    return dt.getFullYear() + "." + nmonth + "." + nday;
 }



 var myDate = new Date();
 var year = myDate.getFullYear();
 var day = myDate.getDate();
 var month = 0; 
 var today = 0;


 if ((myDate.getMonth()+1)<10){
    month = myDate.getMonth()+1
    month = "0"+month
 }else{
    month = myDate.getMonth()+1
 }
 if (myDate.getDate()<10){
    today = '0'+ myDate.getDate()
 }else{
    today = myDate.getDate()
 }

 var todayDate = myDate.getFullYear()+"."+month+"."+today;
 var endDate =myDate.getFullYear()+"-"+month+"-"+today;
/**
 * 获取开始时间
 */
 function getStartTime(){
    var ctime;
    var select = $(".single_select");
    var $time;
    if(select!=undefined){
        $time = select.find("option:selected").val();

        if($time==""){
            ctime="";
        }
        if($time=="1"){
            ctime = minusMonth(todayDate, 3);

        }
        if($time=="2"){
            ctime = minusMonth(todayDate, 6);

        }
        if($time=="3"){
            ctime=  minusMonth(todayDate, 12);

        }
        if($time=="4"){
            ctime=  minusMonth(todayDate, 36);

        }

    }
    return ctime;
 }

/**
 * 右侧的组合searchword
 */
 function returnswd(){
    var hchannelcode = $("#hchannelcode").val();
    var ctime;
    var timef = $("#webtmf").val();//时间标识
    //0和2表示默认和点击时间 1表示跳转
    if(timef==0||timef==2){
        ctime=getStartTime();
    }else if(timef==1){
        ctime=$("#webtm").val()
    }
    var searchword =$("#hsearchword").val();
    searchword = replaceStrs(searchword);
     //searchword = searchword.replace(new RegExp(' ','gm'),'*');
     if(null==searchword||""==searchword) {alert("请输入搜索关键词"); return ;}
     if (searchword.length <= 2 && searchword != "ST" && searchword != "st") {
        searchPdf = searchPdf.substring(0,searchPdf.length-8);
        // searchword =searchPdf+searchword+"T_R";
        // console.log(searchword);
     }else if(ctime==""&&hchannelcode=="flag"){
        searchword =searchPdf+searchword+"T_RT_R";
     }
     else if(ctime==""&&hchannelcode!="flag"){
        searchword=searchPdf+ searchword +"T_R "+" and "+"cchannelcode T_E T_L"+hchannelcode+"T_RT_R";

     }else if(ctime!=""&&hchannelcode!="flag"){
        searchword =searchPdf+searchword+"T_R and CRELEASETIME T_E BETWEEN["+ctime+"T_D"+todayDate+"] and "+"cchannelcode T_E T_L"+hchannelcode+"T_R T_R";
     }else if(ctime!=""&&hchannelcode=="flag"){
        searchword =searchPdf+searchword+"T_R AND CRELEASETIME T_E BETWEEN["+ctime+"T_D"+todayDate+"] T_R";
     }  
     return searchword;
    }

    /************************时间段查询start *************************************/

/**
 * 时间段查询
 * @param time
 */
 function searchTime(){
    if(timeflag){

        timeflag=false;
        return;
    }
    checkflag=true;

    if($("#88888888_switch").prev().hasClass("checked")){
        clickflag=true;

    }

    var timecode = $("#hchannelcode").val();
    timecode = timecode.replace(new RegExp("T_D",'gm'),',');
    var timepCode = $("#pCode").val();//传递的父级节点
    
    getCountSearchResult(timecode,"",timepCode);
    $("#pageinfo").children().remove();
    setTimeout(function(){
        changeTime();
    },2800);
}

function changeTime(){
    //时间段查询将时间表示变更为2表示不再获取url的时间
    $("#webtmf").val("2");
    var searchword =returnswd();
    if(searchword=="" ||searchword==null || searchword==undefined){
        return;
    }
    var tableDatatime = {
        url:dataurl,
        params:{
            "page":"1",
            "searchword":searchword,
            "orderby":"-CRELEASETIME",
            "perpage":"10"
        }


    };
    
    $("#isrul").val("0");
    loadPages(tableDatatime);
    

}
/************************时间段查询end *************************************/

var orderby;
/**
 * 时间排序调用
 */
 function orderbyTime(){
    $('#realhref').removeClass("active");
    $('#timehref').addClass("active");
    orderby = $("#odrul").val();
    if(orderby=="CRELEASETIME"){
        $("#odrul").val("-CRELEASETIME");
        orderby="-CRELEASETIME";
    }else{
    }
    $("#isrul").val("1");
    searchBytime();
 }


/**
 * 关键词搜索
 */
 var dataurl =sseQueryURL +"search/getSearchResult.do?search=qwjs";

 function searchBytime(){ 
    var searchword =returnswd();
    if(searchword=="" ||searchword==null || searchword==undefined){
        return;
    }
    var tableDataBytime = {
        url:dataurl,
        params:{
            "page":"1",
            "searchword":searchword,
            "orderby":orderby,
            "perpage":"10"

        }
    };



    $("#pageinfo").children().remove();
    loadPages(tableDataBytime);

 }


/**
 * 相关度查询
 */
 function reslosearch(){ 
    $('#timehref').removeClass("active");
    $('#realhref').addClass("active");
    var searchword =returnswd();
    if(searchword=="" ||searchword==null || searchword==undefined){
        return;
    }
    $("#isrul").val("2");
    var tableDataByRel = {
        url:dataurl,
        params:{
            "page":"1",
            "searchword":searchword,
            "orderby":"RELEVANCE",
            "perpage":"10"
        }

    };

    $("#pageinfo").children().remove();
    loadPages(tableDataByRel);

 }
 /******************************分页start***************************************/
var pageCount =0;//模拟后台总页数
function printPage(){
    //根据总页数判断，如果小于5页，则显示所有页数，如果大于5页，则显示5页。根据当前点击的页数生成
    if(pageCount<1){
        $("#pageinfo").children().remove();
        return ;
    }
    //生成分页按钮
    
    
    if(pageCount>5){
        page_icon(1,5,0);
    }else{
        page_icon(1,pageCount,0);
    }
}
function pageClick(v){
    //点击分页按钮触发
    //$("#pageinfo li a").on("click",function(){
        //判断是否上一页
        if($(v).attr('id')=="Previous"){
            if(pageCount > 5){
                var pageNum = parseInt($("#pageinfo li a.active").text());//获取当前页
                var pageIndex =Number(pageNum-1);
                if(pageIndex<1){
                    return;
                }
                searchByPage(pageIndex);
                pageUp(pageNum,pageCount);
            }else{
                var index = parseInt($("#pageinfo li a.active").text());//获取当前页
                var pageIndex = Number(index-1);
                if(pageIndex<1){
                    return;
                }
                searchByPage(pageIndex);
                if(pageIndex > 0){
                    $("#pageinfo li a.active").removeClass("active");
                    $("#pageinfo li a").eq(pageIndex+1).addClass("active");//选中上一页
                }
            }
        }else if($(v).attr('id')=="Next"){
            if(pageCount > 5){
                    var pageNum = parseInt($("#pageinfo li a.active").text());//获取当前页
                    var pageIndex = Number(pageNum+1);
                    if(pageIndex>pageCount){
                        return;
                    }
                    searchByPage(pageIndex);
                    pageDown(pageNum,pageCount);
                }else{
                    var index = parseInt($("#pageinfo li a.active").text());//获取当前页
                    var pageIndex = Number(index+1);
                    if(pageIndex>pageCount){
                        return;
                    }
                    searchByPage(pageIndex);
                    if(index < pageCount){
                        $("#pageinfo li a.active").removeClass("active");
                        $("#pageinfo li a").eq(index+2).addClass("active");//选中上一页
                    }
                }
            } else if($(v).attr('id')=="first"){
                if(pageCount > 5){
                    var pageNum =parseInt($("#pageinfo li a.active").text());
                    if(pageNum==1){
                        return;
                    }
                    searchByPage(1);

                    pageGroup(1,pageCount);
                }else{
                    searchByPage(1);
                    $("#pageinfo li a.active").removeClass("active");
                    $("#li1").addClass("active");
                }

            }
            else if($(v).attr('id')=="last"){
                if(pageCount > 5){
                    var pageNum =parseInt($("#pageinfo li a.active").text());
                    if(pageNum==pageCount){
                        return;
                    }
                    searchByPage(pageCount);

                    pageGroup(Number(pageCount),pageCount);
                }else{
                    searchByPage(pageCount);
                    $("#pageinfo li a.active").removeClass("active");
                    $("#li"+pageCount).addClass("active");
                }
            }
            else{
                if(pageCount > 5){
                var pageNum = parseInt($(v).text());//获取当前页数
                searchByPage(pageNum);
                pageGroup(pageNum,pageCount);
            }else{
                var pageNum = parseInt($(v).text());//获取当前页数
                searchByPage(pageNum);
                $("#pageinfo li a.active").removeClass("active");
                $(v).addClass("active");
                
            }
        }

    };

//点击跳转页面
function pageGroup(pageNum,pageCounts){
    
    switch(pageNum){
        case 1:
        page_icon(1,5,0);
        break;
        case 2:
        page_icon(1,5,1);
        break;
        case pageCounts-1:
        page_icon(pageCounts-4,pageCounts,3);
        break;
        case Number(pageCounts):
        page_icon(pageCounts-4,pageCounts,4);
        break;
        default:
        page_icon(pageNum-2,pageNum+2,2);
        break;
    }
}

//根据当前选中页生成页面点击按钮
function page_icon(pages,count,eq){
    
    //console.info("花树");
    var ul_html = "";
    ul_html +="<li title='首页'><a id='first' class='classStr' href='javaScript:;'onclick='pageClick(first);' aria-label='Previous'><span aria-hidden='true' class='page-prev'></span>";
    ul_html +="</a></li>";
    ul_html +="<li><a id='Previous' class='classStr' href='javaScript:;'onclick='pageClick(Previous);' aria-label='Previous'><span aria-hidden='true' class='glyphicon glyphicon-menu-left'></span>";
    ul_html +="</a></li>";
    for(var i=pages; i<=count; i++){
        ul_html += "<li><a id='li"+i+"' href='javaScript:;'onclick='pageClick(li"+i+");' class='classStr'>"+i+"</a></li>";
    }
    ul_html +="<li ><a id='Next' class='classStr' href='javaScript:;'onclick='pageClick(Next);' aria-label='Next'><span aria-hidden='true' class='glyphicon glyphicon-menu-right'></span>";
    ul_html +="</a></li>";
    ul_html +="<li title='尾页'><a id='last' class='classStr' href='javaScript:;'onclick='pageClick(last);' aria-label='Next'><span aria-hidden='true' class='page-next'></span>";
    ul_html +="</a></li>";
    $("#pageGro ul").html(ul_html);
    $("#pageGro ul a").eq(eq+2).addClass("active");
}

//上一页
function pageUp(pageNum,pageCount){
    switch(pageNum){
        case 1:
        break;
        case 2:
        page_icon(1,5,0);
        break;
        case pageCount-1:
        page_icon(pageCount-4,pageCount,2);
        break;
        case Number(pageCount):
        page_icon(pageCount-4,pageCount,3);
        break;
        default:
        page_icon(pageNum-2,pageNum+2,1);
        break;
    }
}

//下一页
function pageDown(pageNum,pageCount){
    switch(pageNum){
        case 1:
        page_icon(1,5,1);
        break;
        case 2:
        page_icon(1,5,2);
        break;
        case pageCount-1:
        page_icon(pageCount-4,pageCount,4);
        break;
        case pageCount:
        break;
        default:
        page_icon(pageNum-2,pageNum+2,3);
        break;
    }
}

function spageUp(){
    var spage = $("#spage").val();
    if(spage==1){
        return;
    }else{
        var spageu=Number(parseInt(spage)-1);
        $("#spage").val(spageu);
        searchByPage(spageu);
    }
    
}
function spageDown(){
    var spage = $("#spage").val();
    if(spage==pageCount){
        return;
    }else{
        var spaged=Number(parseInt(spage)+1);
        $("#spage").val(spaged);
        searchByPage(spaged);
    }
    
}
/******************************分页end*************************************/
var loadPages = function(tableData){
    queryBLoading();
    var url = tableData.url;
    jQuery.ajax({
        url:url,
        type:"POST",
        dataType: "jsonp",
        jsonp: "jsonCallBack",
        data:tableData.params,
        cache : false,
        contentType: "application/x-www-form-urlencoded; charset=UTF-8",

        success: function(json) {
            pageCount = json.countPage
            ajaxHtml(json);
            printPage();
        }

    });
}
var byPages = function(tableData){
    var url = tableData.url;
    jQuery.ajax({
        url:url,
        type:"POST",
        dataType: "jsonp",
        jsonp: "jsonCallBack",
        data:tableData.params,
        cache : false,
        contentType: "application/x-www-form-urlencoded; charset=UTF-8",

        success: function(json) {

            ajaxHtml(json);

        }

    });
}

/*****************************点击分页查询start************************************/

function searchByPage(page){
    var searchword =returnswd();
    var  horder = $("#odrul").val();
    var isrul = $("#isrul").val();
    if(isrul=="0"){
        horder ="-CRELEASETIME";
    }else if (isrul=="2"){
        horder ="RELEVANCE";
    }else if(isrul=="1"){
        horder =orderby;
    }
    var tableByPage = {
        url:dataurl,
        params:{
            "page":page,
            "searchword":searchword,
            "orderby":horder,
            "perpage":"10"
        }

    };
    byPages(tableByPage);
    
}


/*****************************点击分页查询end************************************/
/**
 * 默认查询
 */
 function search(){ 
    $('#searhInput').hide();
    var searchword = $("#searchword").val();
    $("#hsearchword").val(searchword);
    if(null==searchword||""==searchword) {alert("请输入搜索关键词"); return;}
    $("#rstword").html(searchword);
    $("#contword").html(searchword);
    if(ispdf){
        $("#conttitle").html("全文");
    }
    //var srelword = searchword.replace(new RegExp(' ','gm'),'*');
    searchword = replaceStrs(searchword);
    //var swords = "CTITLE T_E likeT_L "+ searchword +" T_R"; 
    var swords = searchPdf+ searchword +"T_RT_R"; 
    if (searchword.length <= 2 && searchword != "ST" && searchword != "st") {
        // searchPdf = searchPdf.substring(0,searchPdf.length-8);
        swords =searchPdf.substring(0,searchPdf.length-8)+searchword+"T_R";
        // console.log("~"+searchword);
    }

    var tableDatas = {
        url:dataurl,
        params:{
            "page":"1",
            "searchword":swords,
            "orderby":"-CRELEASETIME",
            "perpage":"10"
        }

    };
    loadPages(tableDatas);
    

}
var page;
var countpage
var ajaxHtml = function (results){
    var countstr;
    var startNum;
    var endNum;
    var rshtml="";
    if(results.count>0){
        page=results.page;
        countpage=results.countPage;
        startnum=Number(((page-1)*10)+1);
        endNum=Number(10*page);
        
        if(page==countpage){
            countstr="总共<strong>"+results.count+"</strong>条, 现在显示"+startnum+"到"+results.count+"条";
        }else{
            countstr="总共<strong>"+results.count+"</strong>条, 现在显示"+startnum+"到"+endNum+"条";
        }

        for(var i=0;i<results.data.length;i++){

            var fileType = results.data[i].MIMETYPE;
            rshtml+="<dl class='clearfix'>";
            if(i<9 && page<2){
                rshtml+="<dt class='hidden-xs' >0"+Number(i+startnum)+"</dt>";
            }else{
                rshtml+="<dt class='hidden-xs' >"+Number(i+startnum)+"</dt>";
            }

            rshtml+="<dd>";
            rshtml+="<a title='"+results.data[i].CTITLE_TXT+"' href='"+results.data[i].CURL+"' target='_blank'>";
            rshtml+="<span>"+results.data[i].CRELEASETIME+"</span>";

            /**
             * Li.chen 2016-02-23 16:02:58
             */
            var _rTitle = results.data[i].CTITLE;
            _rTitle = _rTitle.substring(0,_rTitle.indexOf("</font>"));
            _rTitle = _rTitle.substring(_rTitle.indexOf(">")+1);
            // console.log(_rTitle);

            var _keyTitle = results.data[i].CTITLE_TXT;
            var _reger=new RegExp(_rTitle,"gi"); 
            _keyTitle = _keyTitle.replace(_reger,"<font color='red'>"+_rTitle+"</font>");
            // console.log(_keyTitle);
            // rshtml+="<h2>"+results.data[i].CTITLE;
            
            rshtml+="<h2>"+_keyTitle;
                //<i><img src="images/ui/icon-exl-16.png"> 1.5M</i>
                if(fileType !="" &&fileType.toLowerCase()=="zip"){
                    rshtml+="<i><img src='/images/ui/icon-zip-16.png'></i>";
                }
                if(fileType !="" &&fileType.toLowerCase()=="txt"){
                    rshtml+="<i><img src='/images/ui/icon-txt-16.png'></i>";
                }
                if(fileType !="" &&fileType.toLowerCase()=="pdf"){
                    rshtml+="<i><img src='/images/ui/icon-pdf-16.png'></i>";
                }
                if(fileType !="" &&(fileType.toLowerCase()=="doc"||fileType.toLowerCase()=="docx")){
                    rshtml+="<i><img src='/images/ui/icon-word-16.png'></i>";
                }
                if(fileType !="" &&(fileType.toLowerCase()=="xlsx"||fileType.toLowerCase()=="xls")){
                    rshtml+="<i><img src='/images/ui/icon-exl-16.png'></i>";
                }
                rshtml+="</h2></a>";

                /**
                 * 解决检索结果显示乱码问题
                 * 当检索结果摘要显示乱码时、将摘要替换为标题显示
                 * 当检索结果为空时、将摘要替换为标题显示
                 * @param  {[type]} sse_string.isCompatibleStr(results.data[i].CONTENT) [description]
                 * @return {[type]}                                                     [description]
                 * Li.chen  2016-06-06 11:31:03
                 */
                // if (sse_string.isCompatibleStr(results.data[i].CONTENT) && sse_string.isBlank(results.data[i].CONTENT)){
                if (sse_string.isCompatibleStr(results.data[i].CONTENT)){
                    rshtml+="<p>"+results.data[i].CONTENT+"</p>";
                }else{
                    // console.log("乱码字符："+results.data[i].CONTENT);
                    rshtml+="<p>"+results.data[i].CTITLE_TXT+"</p>";
                }

            rshtml+="</dd>";
            rshtml+="</dl>";
            
        }
        $("#countStr").html(countstr);
        $("#sse_query_list").html(rshtml);
        queryNLoading();
    }else{
        countstr="总共<strong>0</strong>条";
        $("#countStr").html(countstr);
        $("#pageinfo").children().remove();
        $("#sse_query_list").html("未搜索到相关结果");
        
        $("#mobeilpage").remove();
        queryNLoading();
    }
    
}

var loadPage2 = function(tableData,obj,ajaxHtml){
    var url = tableData.url;
    //初始化数据
    jQuery.ajax({
        url:url,
        type:"POST",
        dataType: "jsonp",
        jsonp: "jsonCallBack",
        data:tableData.params,
        cache : false,
        contentType: "application/x-www-form-urlencoded; charset=UTF-8",
        success:function(dataJson){
            var results = {"pageIndex":"1","pageCount":dataJson.countPage,dataJson:dataJson};//APP接口返回的数据
            //填充html页面
            if(tableData.isPageing){obj.pageSelect.find('.page-con-table').show();}
            
            ajaxHtml(tableData,obj,results,tableData.pageCache);
            getPage({
                pageId:obj.pageSelect,  //分页输出ID选择器
                headerKeep:1,       //头部预留页码数量 headerKeep + footerKeep 必须为偶数
                footerKeep:1,       //尾部预留页码数量 headerKeep + footerKeep 必须为偶数
                pageLength:5,       //页码显示数量,必须为奇数
                tagStr:'a',         //使用标签
                classStr:'classStr',//标签class
                idStr:'idStr',      //标签id
                nameStr:'nameStr',  //标签name
                disable:'disable',  //不能点击class
                active:'active',    //标签选中class
                prevName:'<span aria-hidden="true"  class="glyphicon glyphicon-menu-left"></span>', 
                nextName:'<span aria-hidden="true" class="glyphicon glyphicon-menu-right"></span>',
                classPage:'classPage',//上下页class
                classPage:'classPage',//上下页class
                pageType:'APP',     //分页类型
                ajaxData:function($this){
                    /**
                        pageIndex: 当前页码
                        pageCount：共多少页码
                        */
                        if($this != undefined){
                            tableData.params.page = $this.pageIndex;
                        //查询数据
                        jQuery.ajax({
                            url:url,
                            dataType: "jsonp",
                            jsonp: "jsonCallBack",
                            data:tableData.params,
                            async:false,
                            cache : false,
                            success:function(dataJson){
                                var results = {"pageIndex":$this.pageIndex,"pageCount":dataJson.countPage,dataJson:dataJson};//APP接口返回的数据
                                
                                ajaxHtml(tableData,obj,results,true);
                            },
                            error:function(e){}
                        });
                    }else{
                        return results;
                    }
                    
                }
            });

},
error:function(e){}
});
};




//点击搜索显示信息
function searchValues(index) {
    // $("#searchword").val($("#"+index).text());
    var sval = ($("#"+index).attr("value"));
    $("#searchword").val(sval);
    clickflag = true;
    getsewordtype();

}

$(function(){
    $("#searhInput").width(436);
    $("#searhTable").width(436);
    var disp = true;
 //点击空白处隐藏
  //  $(".page_content").click(function(){
    $(document).click(function(){
          //点击搜索处显示
          $("#searchword").click(function(){ 
            disp = true;
            if (disp) {
                        //  $('#searhInput').show();
                        //  onblurShowHiosty();
                    }
                });
          if(!disp){
            $('#searhInput').hide();
          }
          disp = false;

      });

    //输入框键盘触发事件
    $("#searchword").keyup(function(e){
        var key =  e.which;
        if (key != 40 && key != 38) {
            querySearchInfo(this);
        }
    });

//预查询匹配
function resAjaxGet(inputvalue){
    $.ajax({
        url:sseQueryURL +"search/getPrepareSearchResult.do?search=ycxjs",
        type:"POST",
        dataType: "jsonp",
        jsonp: "jsonCallBack",
        data:{"searchword": "%"+inputvalue+"%",
            "orderby":"-searchorder"},
        cache : false,
        contentType: "application/x-www-form-urlencoded; charset=UTF-8",
        success: function(json) {
            if (json.data.length < 1) {return;};
            isNs = 7;
            var sword = json.data[0].WORD;
            var scode = json.data[0].CODE;
            var gateGory = json.data[0].CATEGORY;
            if(gateGory=="RCM" || gateGory=="OTE" || gateGory=="HOT"){
                sword=sword.replace(inputvalue,'<font color=red>'+inputvalue+'</font>');
                $("<li class='cur' id='searchTr9' value='"+json.data[0].WORD+"'><i></i><a id='searchA9' href='javaScript:;' target='_self'>"+sword+"</a></li>").insertBefore("#searhTable li:first");
            }else{
                sword=sword.replace(inputvalue,'<font color=red>'+inputvalue+'</font>');
                scode=scode.replace(inputvalue,'<font color=red>'+inputvalue+'</font>');
                $("<li class='cur' id='searchTr9' value='"+json.data[0].WORD+"'><i></i><a id='searchA9' href='javaScript:;' target='_self'>["+scode+"]"+sword+"</a></li>").insertBefore("#searhTable li:first");
            }
            $("#searhTable li:last").remove();
            $("#searhTable li").click(function(){
               $("#searhTable").hide();
               searchValues($(this).attr("id"));
            });
        }
    });
}

//搜索框级联输入
/**
 * 输入框键盘响应预查询
 */
 function querySearchInfo(v) {
    var cookies = getCookie("seecookie");
    var cstrs= new Array(); //定义一数组 
    var cindex=0;
    if(cookies==""){
        cindex=0;
    }if(cookies!=""){
        if(cookies.indexOf(",")==-1){
            cindex = 0;
            cstrs.push(cookies);

        }else if(cookies.indexOf(",")>0){
                cstrs=cookies.split(","); //字符分割 
                cindex = cstrs.length;
            }
        }
        
        var inputvalue = $("#searchword").val();
        if(inputvalue!=""){
            if(cookies!=""){

                $("#searchHist").empty();
                var newcstrs= new Array();
        //cstrs.sort();
        for (var l=0;l<cstrs.length ;l++ ) {
            if(cstrs[l].indexOf(inputvalue)>-1){
                cstrs[l]=cstrs[l].replace(inputvalue,'<font color=red>'+inputvalue+'</font>')
                newcstrs.push(cstrs[l]);
            }
        }
        for (var k=newcstrs.length-1;k>-1 ;k-- ) 
        { 
            if (k == newcstrs.length-4) {
                break;
            }
            var idx = newcstrs[k].indexOf(':');
            if(idx!=-1){
                var cookstr = newcstrs[k].substring(idx + 1);
                cookstr = cookstr.replace("<font color=red>","");
                cookstr = cookstr.replace("</font>","");

                var replaceStr = ":";
                newcstrs[k] = newcstrs[k].replace(new RegExp(replaceStr,'gm'),'');
                $("#searchHist").append("<li class='' id='searchTrH"+k+"' value='"+cookstr+"'><i></i><a id='searchH"+k+"' href='javaScript:;'>"+newcstrs[k]+"</a></li>")

            }else{
                var cnewcstrs =newcstrs[k].replace("<font color=red>","");
                cnewcstrs =cnewcstrs.replace("</font>","");
                $("#searchHist").append("<li class='' id='searchTrH"+k+"' value='"+cnewcstrs+"'><i></i><a id='searchH"+k+"' href='javaScript:;'>"+newcstrs[k]+"</a></li>")

            }
        } 
    }
    
    jQuery.ajax({
        url:sseQueryURL +"search/getPrepareSearchResult.do?search=ycxjs",
        type:"POST",
        dataType: "jsonp",
        jsonp: "jsonCallBack",
        data:{"searchword": "%"+$("#searchword").val()+"%",
        "orderby":"-searchorder"
    },
    cache : false,
    contentType: "application/x-www-form-urlencoded; charset=UTF-8",
    
    success: function(json) {

        $("#searhTable").empty();
        $("#searhInput").hide();
        $("#searchIndex").val(0);
        var maxIndex =0;

        for (var i = 0;i < json.data.length;i++) {
            if (i == 8) {
                break;
            }
            var sword = json.data[i].WORD;
            var scode = json.data[i].CODE;
            if(json.data[i].CATEGORY=="RCM"||json.data[i].CATEGORY=="OTE"||json.data[i].CATEGORY=="HOT"){
                sword=sword.replace(inputvalue,'<font color=red>'+inputvalue+'</font>');
                $("#searhTable").append("<li class='cur' id='searchTr"+i+"' value='"+json.data[i].WORD+"'><i></i><a id='searchA"+i+"' href='javaScript:;'>"+sword+"</a></li>");
            }else{
                sword=sword.replace(inputvalue,'<font color=red>'+inputvalue+'</font>');
                scode=scode.replace(inputvalue,'<font color=red>'+inputvalue+'</font>');
                $("#searhTable").append("<li class='cur' id='searchTr"+i+"' value='"+json.data[i].WORD+"'><i></i><a id='searchA"+i+"' href='javaScript:;'>["+scode+"]"+sword+"</a></li>");

            }

        }

        maxIndex= json.data.length;
        if (json.data.length != 0) {
            if (json.data.length > 8) {
                maxIndex = Number(8+cindex);

            }else {
                maxIndex = Number(maxIndex+cindex);
            }


        }

        if(maxIndex==0) maxIndex=cindex;
        $("#maxIndex").val(Number(maxIndex));
        $("#searhInput").show();
        $("#searchHist").show();
                    /**
                    鼠标悬停 给检索框赋值
                    */
                    $("#searhInput li").click(function(){
                        
                        searchValues($(this).attr("id"));
                    });
                /**
                    鼠标点击隐藏下啦列表
                    */
                    $("#searhInput li").click(function(){
                        $("#searhInput").hide();
                    });    

                }
            });
}else if(inputvalue==""){
    if(cookies=!""){
        $("#searchHist").empty();
        $("#searhTable").empty();
        $("#searchHist").show()
        //  cstrs.sort();
        for (var k=cstrs.length-1;k>-1 ;k-- ) 
        { 
            if (k == cstrs.length-11) {
                break;
            }
            var idx = cstrs[k].indexOf(':');
            if(idx!=-1){
                var cookstr = cstrs[k].substring(idx + 1);
                cookstr = cookstr.replace("<font color=red>","");
                cookstr = cookstr.replace("</font>","");
                var replaceStr = ":";
                cstrs[k] = cstrs[k].replace(new RegExp(replaceStr,'gm'),'');
                $("#searchHist").append("<li class='' id='searchTrH"+k+"' value='"+cookstr+"'><i></i><a id='searchH"+k+"' href='javaScript:;'>"+cstrs[k]+"</a></li>")

            }else{
                var cinewcstrs =cstrs[k].replace("<font color=red>","");

                cinewcstrs =cinewcstrs.replace("</font>","");
                $("#searchHist").append("<li class='' id='searchTrH"+k+"' value='"+cinewcstrs+"'><i></i><a id='searchH"+k+"' href='javaScript:;'>"+cstrs[k]+"</a></li>")

            }
        } 
    }
    $("#maxIndex").val(Number(cindex));
    $("#searhInput").show();

}

                 /**
                鼠标悬停 给检索框赋值 //hover
                */
                $("#searhInput li").click(function(){
                    searchValues($(this).attr("id"));
                });
            /**
                鼠标点击隐藏下啦列表
                */
                $("#searhInput li").click(function(){
                    $("#searhInput").hide();
                });



            }

        });
/**
 * 鼠标点击输入框时显示历史搜索记录
 */
 function onblurShowHiosty(){
    var inpswd = $("#searchword").val();

    if(inpswd==""||inpswd=="请输入您想搜索的文字"){
        var cookies = getCookie("seecookie");
        var cstrs= new Array(); //定义一数组 
        var cindex=0;
        
        if(cookies!=""){
            if(cookies.indexOf(",")==-1){
                cindex = 0;
                cstrs.push(cookies);

            }else if(cookies.indexOf(",")>0){
                        cstrs=cookies.split(","); //字符分割 
                        cindex = cstrs.length;
                    }
                    $("#searhTable").empty();
                    $("#searchHist").empty();
                    for (var k=cstrs.length-1;k>-1 ;k-- ) 
                    { 
                        if (k == cstrs.length-11) {
                            break;
                        }
                        var idx = cstrs[k].indexOf(':');
                        if(idx!=-1){
                            var cookstr = cstrs[k].substring(idx + 1);
                            var replaceStr = ":";
                            cstrs[k] = cstrs[k].replace(new RegExp(replaceStr,'gm'),'');
                            $("#searchHist").append("<li class='' id='searchTrH"+k+"' value='"+cookstr+"'><i></i><a id='searchH"+k+"' href='javaScript:;'>"+cstrs[k]+"</a></li>")

                        }else{
                            $("#searchHist").append("<li class='' id='searchTrH"+k+"' value='"+cstrs[k]+"'><i></i><a id='searchH"+k+"' href='javaScript:;'>"+cstrs[k]+"</a></li>")

                        }
                    } 
                    $("#maxIndex").val(Number(cindex));
                    $("#searhInput").show();
                    $("#searchHist").show();
                    /**
                    鼠标悬停 给检索框赋值 //hover
                    */
                    $("#searhInput li").click(function(){
                        searchValues($(this).attr("id"));
                    });
                /**
                    鼠标点击隐藏下啦列表
                    */
                    $("#searhInput li").click(function(){
                        $("#searhInput").hide();
                    });
                }


            }   
}
var display=false;
/**
 * 判断用户输入检索词的类型
 */
 function getsewordtype() {
    //时间段查询将时间表示变更为2表示不再获取url的时间
    $("#webtmf").val("2");
    var searchword = $("#searchword").val();
    if(searchword.length>0){
        searchword = searchword.replace(/[\[\]\,\，\、\—\…\/\$\@\=\>\<\!\&\*\%\^\￥\#\!\！\+\?\'\\]/g,"");
            //searchword = searchword.replace(/\\-/g,'`').replace(/-/g,'\\-').replace(/`/g,'\\-');
            searchword = searchword.replace(/'/g,'\\\'');
            searchword = searchword.replace(/\s+/g, ' ');
            
            if($.trim(searchword)!=""){
                searchword = $.trim(searchword);
            }else{
                alert("输入的检索条件不符合要求，请重新输入！");
                return false;
            }
        }
        else{
            alert("请输入搜索关键词"); return false;
        }

        $("#searchword").val(searchword);
        $("#hsearchword").val(searchword);
    //var relword = searchword.replace(new RegExp(' ','gm'),'*');
    searchword = replaceStrs(searchword);
    jQuery.ajax({
        url:sseQueryURL +"search/getPrepareSearchResult.do?search=ycxjs",
        type:"POST",
        dataType: "jsonp",
        jsonp: "jsonCallBack",
        data:{"searchword": searchword},
        cache : false,
        contentType: "application/x-www-form-urlencoded; charset=UTF-8",
        success: function(json) {
            $("#resultTable").hide();
            $("#beforresult").hide();
            var i=0;
            if(json.data.length<1){
                $("#contwordiv").hide();
                orrderSetCokie('seecookie',searchword,1);
            }
            if(json.data.length>0){
                if(json.data[0].CATEGORY=="EQU"){
                    display = true;
                    $("#contwordiv").show();
                    var Code=json.data[0].CODE;
                    var Word =json.data[0].WORD;
             //动态加载js
             $.getScript("/js/common/stocks/new/"+json.data[0].CODE+".js",function(){  
                getjs(Code,Word);
             })
             orrderSetCokie('websearch','"'+Code+'":"'+Word+'"',1);
             orrderSetCokie('seecookie','['+Code+']:'+Word+'',1);
            }else if(json.data[0].CATEGORY=="RCM"){
                display = false
                orrderSetCokie('seecookie',searchword,1);
            }else{
                display = false;
                $("#contwordiv").hide();
                orrderSetCokie('seecookie',searchword,1);
            }
           }

           if(i == 0){
            getCountSearchResult(); 
            search();
            recommended(searchword);
           }
       }       
   });

}
/**
 * 关键词推荐结果
 */
 function recommended(recomword){
    jQuery.ajax({
        url:sseQueryURL +"search/getRecommendSearchResult.do?jsonCallBack=?&search=tjjs",
        type:"POST",
        dataType: "jsonp",
        jsonp: "jsonCallBack",
        data:{"searchword": "like["+recomword+"]"},
        cache : false,
        contentType: "application/x-www-form-urlencoded; charset=UTF-8",
        success: function(json) {
            var rststr= $("#resultTable");
            var befor = $("#beforresult");
            if(json.data.length>0){
                var reHtml ="<div class='sse_query_condition'><dl>";
                var reHtmllm ="<dd><span>栏目：</span>";
                var reHtmlzd ="<dd><span>站点：</span>";
                var reHtmlxx ="<dd><span id='infoxx'>信息：</span>";
                var lmNm=0;
                var zdNm=0;
                var xxNm=0;

                for(var i=0;i<json.data.length;i++){
                    if(json.data[i].TYPE =="站点"){
                        zdNm =1;
                        reHtmlzd +="<a href='"+json.data[i].URL+"' target='_blank'>"+json.data[i].RECRESULT+"</a>";
                    }
                    else if(json.data[i].TYPE =="栏目"){
                        lmNm =1;
                        reHtmllm +="<a href='"+json.data[i].URL+"' target='_blank'>"+json.data[i].RECRESULT+"</a>";
                    }
                    else if(json.data[i].TYPE =="信息"){
                        xxNm =1;
                            //reHtmlxx +="<a href='"+json.data[i].URL+"' target='_blank'>"+json.data[i].RECRESULT+"</a>";
                            
                            if(json.data[i].URL!=""){
                                $.get(json.data[i].URL+"?rand="+Math.random(),function(dataHtml){
                                    // $("#beforresult").html(data);
                                    // reHtmlxx +=dataHtml;
                                    $("#infoxx").after(dataHtml);
                                });
                            }
                            
                        }
                    }
                    
                    reHtmllm +="</dd>";
                    reHtmlzd +="</dd>";
                    reHtmlxx +="</dd>";
                    if(lmNm>0){
                        reHtml +=reHtmllm;
                    }
                    if(zdNm>0){
                        reHtml +=reHtmlzd;
                    }
                    if(xxNm>0){
                        reHtml +=reHtmlxx;
                    }
                    reHtml +="</dl></div>"
                    $("#beforresult").html(reHtml);
                    $("#contwordiv").show();
                    rststr.css("display","none");
                    befor.css("display","block");


                }else if(!display){
                    $("#contwordiv").hide();
                    rststr.css("display","none");
                    befor.css("display","none");
                }
            }
        });
}
/**
 * 获取股票公告js
 * @param code
 * @param word
 */
 function getjs(code,word){
    var stockDataList = window.eval("get_"+code+"()");
    var htmlStr="";
htmlStr +=" <div class='sse_query_title clearfix'>";
htmlStr +="<p class='sse_query_title_left'>"+word+"<i class='ssecode'>"+code+"</i>" +
"<em class='ssecode-number  ssecode-number-bold hidden-xs' id='c1' title='现价'></em>";
htmlStr +="<em class='ssecode-number  hidden-xs' id='c2' title='涨跌'></em>";
htmlStr +="<em class='ssecode-number  hidden-xs 'id='c3' title='涨幅'></em></p>";
htmlStr +="<p class='sse_query_title_right hidden-xs' id='c4'></p>";
htmlStr +="</div>";
htmlStr +="<div class='clearfix'>";
htmlStr +=" <div class='col-sm-7 seccode_query_list'>";
    htmlStr +="<div class='alpha-top'>";
    htmlStr +="<a target='_blank' class='active' href='/assortment/stock/list/info/announcement/index.shtml?productId="+code+"' style='font-weight: bold;'><span>最新公告</span></a>";
    htmlStr +=" <a target='_blank' href='/assortment/stock/list/info/company/index.shtml?COMPANY_CODE="+code+"'><span>公司概况</span></a>";
    htmlStr +="<a target='_blank' href='/assortment/stock/list/info/capital/index.shtml?COMPANY_CODE="+code+"'><span>股本结构</span></a>";
    htmlStr +="<a target='_blank' href='/assortment/stock/list/info/profit/index.shtml?COMPANY_CODE="+code+"'><span>利润分配</span></a>";
    htmlStr +="<a target='_blank' href='/assortment/stock/list/info/turnover/index.shtml?COMPANY_CODE="+code+"'><span>成交概况</span></a>";
    htmlStr +="<a target='_blank' href='/assortment/stock/list/info/price/index.shtml?COMPANY_CODE="+code+"'><span>行情图表</span></a>";
    htmlStr +="<a target='_blank' href='/assortment/stock/list/info/meeting/index.shtml?COMPANY_CODE="+code+"'><span>股东大会</span></a>";
    htmlStr +="<a target='_blank' href='http://sns.sseinfo.com/company.do?stockcode="+code+"'><span>e互动</span></a>";
    htmlStr +="<a target='_blank' href='/assortment/stock/list/info/announcement/index.shtml?productId="+code+"' style='font-size: 18px;float: right;border: 0px;color: #8f8f8f;padding-top: 10px;'><i class='sseicon-icon_more'></i></a>";
    htmlStr +="</div>";
    htmlStr +="<div class='swiper-container' id='PAGE_SWIPER_SECCODE'>";
    htmlStr +="<div class='swiper-wrapper'>";
    for (var i=0; i < stockDataList.length; i++) {
        if (i == 15) {
            break;
        }
        if(i%5==0){
            htmlStr +=" <ul class='swiper-slide'>";
        }
        
        htmlStr +=" <li><span>"+stockDataList[i].bulletin_date+"</span><a target='_blank' href='"+stockDataList[i].bulletin_file_url+"'>"+stockDataList[i].bulletin_title+" </a></li>";
        if(i==4 ||i==9||i==14){
            htmlStr +=" </ul>";
        }

    };
    if(stockDataList.length<4 || (stockDataList.length>4 && stockDataList.length<9) || (stockDataList.length>9 && stockDataList.length<14)){
        htmlStr +=" </ul>";
    }

    htmlStr +=" </div>";
    htmlStr +=" <div class='pagination' id='SWIPER_SECCODE_PAGINATION'></div>";
    htmlStr +=" </div>";

    htmlStr +="</div>";

    htmlStr +=" <div class='col-sm-5 seccode_query_chart hidden-xs'>";
    htmlStr +="<div class='sse_title_1'>";
    htmlStr +="<h2><a href='/disclosure/dealinstruc/calendar/detail.shtml?_staDate=&_indexCode="+code+"'><i class='sseicon-icon_more'></i></a>公司动态</h2>";
    htmlStr +="</div>";
    htmlStr +="<div class='sse_list_5'>";
    htmlStr +="<ul id='econtent'>";
    htmlStr +="</ul>";
    htmlStr +="</div>";
    htmlStr +="</div>";
        htmlStr +="</div>";
        $("#resultTable").html(htmlStr);
        var rststr= $("#resultTable");
        var befor = $("#beforresult");
        rststr.css("display","block");
        befor.css("display","none");
       //轮播图
       if ($('#PAGE_SWIPER_SECCODE').length > 0) {
        require(["swiper"], function () {
            var mySwiper = new Swiper('#PAGE_SWIPER_SECCODE', {
                                        mode: 'horizontal', // for old swiper
                                        cssWidthAndHeight :"height",// for old swiper
                                        loop: false,
                                        grabCursor: true,
                                        pagination: "#SWIPER_SECCODE_PAGINATION",
                                        paginationClickable: true
                                    });
        });
       }


       jQuery.ajax({
        url: hq_queryUrl+"/v1/sh1/snap/" +code,
        type:"POST",
        dataType: "jsonp",
        jsonp: "callback",
        data:{select: 'last,change,chg_rate,tradephase'},
        cache : false,
        contentType: "application/x-www-form-urlencoded; charset=UTF-8",
        success: function(resultData) {
            var qqhqList = resultData.snap;
            var _isShow = qqhqList[3];
            var _pice   = qqhqList[0];
            var _pchange = qqhqList[1];
            var _date = resultData.date+"";
            var _dDate = _date.substring(0, _date.length - 4) + "-" + _date.substring(_date.length - 4, _date.length - 2) + "-" + _date.substring(_date.length - 2);
            var _timer = resultData.time+"";
            var _dTime = _timer.substring(0,_timer.length-4)+":"+_timer.substring(_timer.length-4,_timer.length-2);
            if (_isShow.replace(/\s/ig,'') == "P1") {
                $("#c1").addClass('ssecode-grey');
                $("#c1").html("停牌");
                $("#c4").html(_dDate+" "+_dTime);

            }else{
                var _chg_rate = qqhqList[2];
                if(_chg_rate > 0){
                    $("#c1").addClass('ssecode-up');
                    $("#c1").html(_pice);
                    $("#c2").addClass('ssecode-up');
                    $("#c2").html(_pchange+"<span class='glyphicon glyphicon-arrow-up' aria-hidden='true'> </span>");
                    $("#c3").addClass('ssecode-up');
                    $("#c3").html(_chg_rate+"%<span class='glyphicon glyphicon-arrow-up' aria-hidden='true'> </span>");
                    $("#c4").html(_dDate+" "+_dTime);
                }else if(_chg_rate < 0){
                    $("#c1").removeClass("ssecode-up").addClass("ssecode-down");
                    $("#c1").html(_pice);
                    $("#c2").removeClass("ssecode-up").addClass('ssecode-down');
                    $("#c2").html(_pchange+"<span class='glyphicon glyphicon-arrow-down' aria-hidden='true'> </span>");
                    $("#c3").removeClass("ssecode-up").addClass('ssecode-down');
                    $("#c3").html(_chg_rate+"%<span class='glyphicon glyphicon-arrow-down' aria-hidden='true'> </span>");
                    $("#c4").html(_dDate+" "+_dTime);
                }else{
                    $("#c1").removeClass("ssecode-up").addClass('ssecode-grey');
                    $("#c1").html(_pice);
                    $("#c2").removeClass("ssecode-up").addClass('ssecode-grey');
                    $("#c2").html("0.00");
                    $("#c3").removeClass("ssecode-up").addClass('ssecode-grey');
                    $("#c3").html("0.00%");
                    $("#c4").html(_dDate+" "+_dTime);
                }
            }
        }
       });
ecalendar(code);
}

/**
 * 最新动态
 * @param obj
 */
 function ecalendar(code){
    //showloading();
    $.ajax({
        type: 'POST',
        dataType: "jsonp",
        url: sseQueryURL+"commonSoaQuery.do",
        jsonp: "jsonCallBack",
        data:{
            isPagination:true,//是否分页
            stockCode:code,
            order:"tradeBeginDate|desc",
            tradeBeginDate:"19700101",//开始时间
            tradeEndDate:endDate.replace(/\-/g, ''),//结束时间
            sqlId:'PL_SCRL_SCRLB',//SQLID
            'pageHelp.pageNo':1,//当前页码
            'pageHelp.beginPage':1,//开始页码
            'pageHelp.cacheSize':1,//缓存条数
            'pageHelp.endPage':1,
            'pageHelp.pageSize':5//每页显示条数
        },
        cache:false,
        success: function(resultData){
            var _result = resultData.result;
            var table_tfp = [];
            var numlengt =4;
            if (_result != null && _result != "") {
                if (_result.length < 4) {
                    numlengt = _result.length;
                };
                for (var i = 0; i < numlengt; i++) {
                    // table_tfp.push("<li><span>"+dateAddLine(_result[i]['tradeBeginDate'])+"</span>"+_result[i]['bizTypeDesc']+"<p>"+_result[i]['title']+"</p></li>");
                    table_tfp.push("<li><span>"+dateAddLine(_result[i]['tradeBeginDate'])+"</span>"+_result[i]['bizTypeDesc']+"<p><a title='"+_result[i]['title']+"'>"+_result[i]['title']+"</a></p></li>");
                };
            }else{
                table_tfp.push("<li>无相关数据</li>");
            };
            $("#econtent").html(table_tfp.join(""));
        }
    })
}
/*日期加个-*/
function dateAddLine(turnDate) {
    return turnDate.substring(0,4)+'-'+turnDate.substring(4,6)+'-'+turnDate.substring(6,8);
}
/**
 * list数组去除重复
 * @param arr
 * @returns {Array}
 */
 function unique(arr) {
    var result = [], hash = {};
    for (var i = 0, elem; (elem = arr[i]) != null; i++) {
        if (!hash[elem]) {
            result.push(elem);
            hash[elem] = true;
        }
    }
    return result;

 }

/**
 * 格式js数据
 */

 var jsonmap = eval(SSE_MENU_28);
/**
 * 将channelID按order排序
 * @param ordchannel
 * @returns
 */
 function orderchannel(ordchannel){

    var orarry = new Array();
    var jsonarry = [];
    //jsonarry = eval(jsonarry);
    var aky;
    orarry=ordchannel.split(","); //字符分割 
    orarry = unique(orarry);
    for (var ar=0;ar<orarry.length ;ar++ ) {
        akey = orarry[ar];
        var aobj = jsonmap[akey];
        if(aobj==undefined) {
            continue;
        }
        
        var jsontemp = {};
        jsontemp.id = akey;
        jsontemp.order = aobj["ORDER"];

        jsonarry.push(jsontemp);
    }
    jsonarry = JsonSort(jsonarry,'order');
    var strtmp="";
    for(var tp=0;tp<jsonarry.length;tp++){
        strtmp +=jsonarry[tp].id+",";
    }
    return strtmp;
}
/**
 * 格式化2
 * @returns {String}
 */
var pstrsindex= new Array(); //定义一数组 

function resulveJson2(channels){
pstrsindex.length=0;

    var chstrs= new Array(); //定义一数组 
    chstrs=channels.split(","); //字符分割 
    chstrs = unique(chstrs); //暂时去掉
    var key;
    var strs="" ;
    var rstrs="";
    for (var k=0;k<chstrs.length ;k++ ) {
        key = chstrs[k];
        
        if((pstrsindex!=undefined&&pstrsindex.indexOf(key)>-1)){
            continue;
        }
        var a = jsonmap[key];
        if(a==undefined) {
            continue;
        }
        strs +="{id:"+key+",";                              
        strs +="open:true,";
        if(key=="0"){

            strs +="pId:'88888888',";
            strs +="pIds:'88888888',";
            strs +="disply:'3',";
            strs +="name:'上海证券交易所官网',";
        }else{
            strs +="pId:'"+a["PARENTCODE"]+"',";
            var pidstrs = getTreesParents(key);
            strs +="pIds:'"+pidstrs+"',";
            if(a["PARENTCODE"]==undefined){
                strs +="disply:'0',";

            }else if (a["PARENTCODE"]=="0"){
                strs +="disply:'3',";
            }else
            {
                strs +="disply:'"+a["DISPLAY"]+"',";
            }
            strs +="name:\""+a["CHNLNAME"]+"\"},";
        }
                pstrsindex.push(key);//将父节点写入数组

                    //通过一个key找到它的所有父节点
                    strs +=getPartentStr(a["PARENTCODE"]);
                    
                    
                    
                } 




                strs +="{id:88888888,open:true,disply:'3',pId:'',pIds:'',name:'全部结果'}"
                strs +="]";
                rstrs ="["+strs;
                return rstrs;
            }

            var cstrs="";
            var fcstrs=""

            function getPartentStr(pkey){

                if(pstrsindex.indexOf(pkey)>-1 ){
                    fcstrs = cstrs
                    cstrs ="";
                    return fcstrs;
                }
    pstrsindex.push(pkey);//将父节点写入数组
    var b = jsonmap[pkey];
    
    if(b==null||b==undefined){
        fcstrs = cstrs
        cstrs ="";
        return fcstrs;
    }
    
    cstrs +="{id:"+pkey+",";                                
    cstrs +="open:true,";
    if(pkey=="0"){
        cstrs +="pId:'88888888',";
        cstrs +="pIds:'88888888',";
        cstrs +="disply:'3',";
        cstrs +="name:'上海证券交易所官网'},";
        fcstrs = cstrs
        cstrs ="";
        return fcstrs;

    }else{
        if(b["PARENTCODE"]==undefined){
            cstrs +="pId:'0',";
        }else{
            cstrs +="pId:'"+b["PARENTCODE"]+"',";
        }

        var pidstrs = getTreesParents(pkey);
        cstrs +="pIds:'"+pidstrs+"',";
    }
    if(b["PARENTCODE"]==undefined && pkey!="0"){
        cstrs +="disply:'0',";

    }else if (b["PARENTCODE"]=="0"){
        cstrs +="disply:'3',";
    }else{
        cstrs +="disply:'"+b["DISPLAY"]+"',";
    }
    
    cstrs +="name:\""+b["CHNLNAME"]+"\"},";
    if(b["PARENTCODE"]!=undefined||b["PARENTCODE"]!=""||b["PARENTCODE"]!="0"){
        return getPartentStr(b["PARENTCODE"]);
    }
    fcstrs = cstrs
    cstrs ="";
    return fcstrs;
    
}

function resulveJson(){

    var strs="" ;
    var rstrs="";
    var i=0;
    for (var key in jsonmap) {
        i++;
        var a = jsonmap[key];
        strs +="{id:"+key+",";                              
        strs +="open:true,";
        if(key=="0"){

            strs +="pId:'88888888',";
            strs +="pIds:'88888888',";
            strs +="name:'上海证券交易所官网',";
        }else{
            strs +="pId:'"+a["PARENTCODE"]+"',";
            strs +="pIds:'',";

            if(a["PARENTCODE"]==undefined){
                strs +="disply:'0',";

            }else
            {
                strs +="disply:'"+a["DISPLAY"]+"',";
            }
            strs +="name:\""+a["CHNLNAME"]+"\"},";
        }

    }  
    strs +="{id:88888888,open:true,disply:'1',pId:'',pIds:'',name:'全部结果'}"
    strs +="]";
    rstrs ="["+strs;
    return rstrs;
}

/**
 * 获取当前id上父亲们s
 */

 var parentIds="";


 function getTreesParents(cId){
    try{

        for (var treeKey in jsonmap) {

            var atree = jsonmap[cId];
            if(cId=="0"){
                parentIds += '88888888,';
                break;
            }
            else if(atree["PARENTCODE"] != null && atree["PARENTCODE"] != ""
                && atree["PARENTCODE"] != 'undefined'
                && atree["PARENTCODE"] != undefined){
                parentIds += atree["PARENTCODE"]+',';
            return getTreesParents(atree["PARENTCODE"]);
        }

    }  

    var _str = "";
    _str = parentIds;
    parentIds="";
    _str=_str.substr(0 ,_str.length-1)

    return _str;

 }catch(e){}




}

//var channnelStrs ="8361,8400,8401,8371";
var channnelStrs ="";
/**
 * 创建树
 * @returns {Boolean}
 */
 function crte(){
    var setting = {
        data: {
            simpleData: {
                enable: true
            }
        }
    };
    if(channnelStrs.length>1){
        channnelStrs = channnelStrs.substring(0,channnelStrs.length-1);
    }
//  orderchannel(channnelStrs);
//  //请求一次排序
//  var map = eval(resulveJson2(channnelStrs));
var map = eval(resulveJson2(channnelStrs ));
$.getScript("jquery.ztree.core-3.5.js",function(){  

    $.fn.zTree.init($("#treeDemo"), setting, map);
    $.fn.checkTree = function(settings) {
        settings = jQuery.extend({
                /* Callbacks
                    The callbacks should be functions that take one argument. The checkbox tree
                    will return the jQuery wrapped LI element of the item that was checked/expanded.
                    */
                    onExpand: null,
                    onCollapse: null,
                    onCheck: null,
                    onUnCheck: null,
                    onHalfCheck: null,
                    onLabelHoverOver: null,
                    onLabelHoverOut: null,
                    checkBoxClick:null,

                    /* Valid choices: 'expand', 'check' */
                    labelAction: "expand",

                // Debug (currently does nothing)
                debug: false
            }, settings);
        var $tree = this;
        var $lis = $tree.find('li');
        var $checkboxes = $lis.find(":checkbox");

            // Hide all checkbox inputs
            $checkboxes.css('display', 'none');

            $lis.not(':has(.arrow)').each(function() {
                // This little piece here is by far the slowest.
                jQuery(this).prepend('<div class="arrow glyphicon"></div><div class="checkbox"></div>');
            });

            /*
            What to do when the arrow is clicked
            Tried:
                - $lis.filter(':has(li)').find(' > .arrow')
                - $lis.filter(':has(li)').find('.arrow')
                - $tree.find('li:has(li) .arrow')
                - $tree.find('li:has(li) > .arrow') <- This was the fastest.
                */
                $tree.find('li:has(li) > .arrow').click(function() {
                    var $this = jQuery(this);
                    $this
                    .toggleClass('expanded')
                    .toggleClass('collapsed')
                    .siblings("ul:first")
                    .toggle()
                    ;
                    $tree.find('label.active,.arrow.active').removeClass('active');
                    $this.siblings('label:first').addClass('active');
                    $this.addClass('active');
                    // Handle callbacks
                    if (settings.onExpand && $this.hasClass('expanded')) {
                        settings.onExpand($this.parent());
                    }
                    else if (settings.onCollapse && $this.hasClass('collapsed')){
                        settings.onCollapse($this.parent());
                    }
                })
                .addClass(function(){
                    return $(this).siblings('ul.expanded').length === 1 ? 'expanded' : 'collapsed';
                })
                ;

            // Remove the now redundant 'expanded' class from any sub-lists
            $tree.find('ul').removeClass('expanded');
            
            // Hide all collapsed sub-trees
            $tree.find('li:has(> .arrow.collapsed) > ul').css('display', 'none');

            /*
            What to do when the checkbox is clicked
            */
            $tree.find('.checkbox').click(function() {
                var $this = jQuery(this);
                $this
                .toggleClass('checked')
                .removeClass('half_checked')
                .siblings(':checkbox:first').prop('checked', $this.hasClass('checked'))
                ;

                $this.filter('.checked').siblings('ul:first').find('.checkbox:not(.checked)')
                .removeClass('half_checked')
                .addClass('checked')
                .siblings(':checkbox').prop('checked', true)
                ;
                $this.filter(':not(.checked)').siblings('ul:first').find('.checkbox.checked')
                .removeClass('checked half_checked')
                .siblings(':checkbox').prop('checked', false)
                ;

                // Send a change event to our parent checkbox:
                $this.parents("ul:first").siblings(":checkbox:first").trigger('refresh');
                
                // Handle callbacks
                if (settings.onCheck && $this.hasClass('checked')) {
                    settings.onCheck($this.parent());
                }
                else if (settings.onUnCheck && $this.hasClass('checked') === false) {
                    settings.onUnCheck($this.parent());
                }
                if (settings.checkBoxClick) {
                    settings.checkBoxClick();
                }
            });

            /*
            What to do when a checkbox gets a change event
            (Fired when the children of this checkbox have changed)
            */
            $checkboxes.on('refresh', function() {
                // If all the children are checked, this should be checked:
                var $this = jQuery(this);
                var $checkbox = $this.siblings('.checkbox:first');
                var any_checked = $this.siblings('ul:first').find(':checkbox:checked:first').length == 1;
                var any_unchecked = $this.siblings('ul:first').find(':checkbox:not(:checked):first').length == 1;
                
                if (any_checked) {
                    $this.prop('checked', true);
                    if (any_unchecked) {
                        $checkbox
                        .addClass('half_checked')
                        .removeClass('checked')
                        ;
                        if (settings.onHalfCheck) {
                            settings.onHalfCheck($this.parent());
                        }
                    }
                    else {
                        $checkbox
                        .addClass('checked')
                        .removeClass('half_checked')
                        ;
                    }
                }
                else {
                    $checkbox.removeClass('checked half_checked');
                    $this.prop('checked', false);
                }
                
                // Bubble up to our parent checkbox
                $this.parents('ul:first').siblings(':checkbox:first').trigger('refresh');
            });

            /*
            What to do when a label is hovered or clicked
            */
            $tree.find('label')
            .click(function() {
                if(jQuery(this).siblings('.arrow:first')){
                    $tree.find('label.active,.arrow.active').removeClass('active');
                    jQuery(this).addClass('active');
                }
                switch(settings.labelAction) {
                    case 'expand':
                    jQuery(this).siblings('.arrow:first').click();
                    break;
                    case 'check':
                    jQuery(this).siblings('.checkbox:first').click();
                    break;
                }
            })

            .hover(
                function() {
                    jQuery(this).addClass("hover");
                    if (settings.onLabelHoverOver) {
                        settings.onLabelHoverOver(jQuery(this).parent());
                    }
                },
                function() {
                    jQuery(this).removeClass("hover");
                    if (settings.onLabelHoverOut) {
                        settings.onLabelHoverOut(jQuery(this).parent());
                    }
                }
                )
            ;

            /*
            Extra convenience methods
            */
            $tree.clear = function() {
                $tree.find('.checkbox')
                .removeClass('checked')
                .siblings(':checkbox').prop('checked', false)
                ;
            };
        };
        $('#sse_query_menu ul').checkTree({
            checkBoxClick:function(){
                var checkedArr = $(".checkbox.checked");
                var strarry="";
                for (var i = checkedArr.length-1; i >= 0; i--) {
                    var str = checkedArr.eq(i).next().attr("id");
                    strarry += str.substring(0,str.indexOf('_'))+",";
                };

                searchlm(strarry);
            }
        });
    })
    
    return true;
}

$(document).ready(function(){

    /**
    *    Project: CheckTree jQuery Plugin
    *    Version: 0.4
    *    Project Website (since v0.4): https://github.com/yeurch/checktree
    */
    

});

/**
 * 选择栏目时的事件
 */
 function searchlm(chanelId){ 
    //如果是第一次加载树则栏目事件不再响应
    
    if(chanelId !=''){
        chanelId=chanelId.substring(0,chanelId.length-1);
        var replaceStr = ",";
        chanelId = chanelId.replace(new RegExp(replaceStr,'gm'),'T_D');
        $("#hchannelcode").val(chanelId);
    }
    if(clickflag){
        
        return;
        
    }
    
    if($("#pCode").val()==""){
        checkflag=false;
    }
    if($("#lmtemp").val()=="1"){
        checkflag=true;
    }
    if(checkflag ){
        checkflag= false;

        return;
    }
    $("#pCode").val("");
    $("#ctemp").val('1');
    if($("#88888888_switch").prev().hasClass("checked")){
        $("#ctemp").val('0');
    }
    
    //时间段查询将时间表示变更为2表示不再获取url的时间
//   $("#webtmf").val("2");
     //clearParms();
     var searchword = $("#hsearchword").val();
    //searchword = searchword.replace(new RegExp(' ','gm'),'*');
    searchword = replaceStrs(searchword);
    var lmClickctime;
    var lmClicktimef = $("#webtmf").val();//时间标识
    //0和2表示默认和点击时间 1表示跳转
    if(lmClicktimef==0||lmClicktimef==2){
        lmClickctime=getStartTime();
    }else if(lmClicktimef==1){
        lmClickctime=$("#webtm").val()
    }
    
    var stime="";
    if(lmClickctime!=""){
        stime=" and CRELEASETIME T_E BETWEEN["+lmClickctime+"T_D"+todayDate+"]";
    }
    
    
    if(chanelId!=""){
        //chanelId=chanelId.substring(0,chanelId.length-1);
        //var replaceStr = ",";
        //chanelId = chanelId.replace(new RegExp(replaceStr,'gm'),'T_D');
        searchword=searchPdf+ searchword +"T_R  and cchannelcode T_E T_L"+chanelId+" T_R"+stime+"T_R";
        //$("#hchannelcode").val(chanelId);
    }else {
        $("#hchannelcode").val("flag");
        countstr="总共<strong>0</strong>条";
        $("#countStr").html(countstr);
        $("#pageinfo").children().remove();
        $("#sse_query_list").html("未搜索到相关结果");
        return;
    }
    
    var tableDataLm = {
        url:dataurl,
        params:{
            "page":"1",
            "searchword":searchword,
            "orderby":"-CRELEASETIME",

            "perpage":"10"
        }
    };
    
    

    $("#pageinfo").children().remove();
    loadPages(tableDataLm);
    
}
/**
 * jso排序
 * @param json
 * @param key
 * @returns
 */
 function JsonSort(json,key){
    for(var j=1,jl=json.length;j < jl;j++){
        var temp = json[j],
        val  = temp[key],
        i    = j-1;
        while(i >=0 && json[i][key]>val){
            json[i+1] = json[i];
            i = i-1;    
        }
        json[i+1] = temp;

    }
    return json;
 }

/**
 * 获取关键词栏目命中数
 */
 function getCountSearchResult(channelCode,temp,pCode) {
    blockLoading();
    queryBLoading();
  //暂时去掉看是否有影响
$('#treeDemo').children().remove();


var searchword = $("#searchword").val();
if(null==searchword||""==searchword) { return;}
    var lmctime;
    var lmtimef = $("#webtmf").val();//时间标识
    //0和2表示默认和点击时间 1表示跳转
    if(lmtimef==0||lmtimef==2){
        lmctime=getStartTime();
    }else if(lmtimef==1){
        lmctime=$("#webtm").val()
    }
    var counts="";
    if(lmctime!=""){
        counts=searchPdf+ searchword +"T_R and CRELEASETIME T_E BETWEEN["+lmctime+"T_D"+todayDate+"]T_R ";
    }else if(lmctime ==""){
        counts=searchPdf+ searchword +"T_RT_R";
    }
    
    counts = replaceStrs(counts);
    
    jQuery.ajax({
        url:sseQueryURL +"search/getCountSearchResult.do?search=lmmzs",
        type:"POST",
        dataType: "jsonp",
        jsonp: "jsonCallBack",
        data:{"searchword":counts},
        cache : true,
        contentType: "application/x-www-form-urlencoded; charset=UTF-8",

        success: function(json) {
            

            var jsons = JsonSort(json.data,'word');
            
            
            
            var codes="";
            var chcode;
            //var tempcode="";
            for(var j=0;j<jsons.length;j++){
                chcode =jsons[j].word;

                codes+=chcode+",";

            }
            
            if(channelCode!=undefined && channelCode!=null &&channelCode!="" && channelCode!="flag"){
                if(codes.indexOf(channelCode)<0){
                    codes+=channelCode+",";
                    if(channelCode.indexOf(",")){
                        
                     var chstr= new Array(); //定义一数组 
                    chstr=channelCode.split(","); //字符分割 
                    for (var c=0;c<chstr.length ;c++ ) {
                        var jsonStr1 = {};
                        jsonStr1.word = chstr[c];
                        jsonStr1.num = "0";

                        jsons.push(jsonStr1);
                    }

                }else{
                    var jsonStr2 = {};
                    jsonStr2.word = channelCode;
                    jsonStr2.num = "0";

                    jsons.push(jsonStr2);
                }


            }

        }else if(jsons.length==0 &&(channelCode==undefined||channelCode==null ||channelCode=="")){
            var resultHtml ='<li  tabindex="0"  style="display:block;">';
            resultHtml +='<input type="checkbox" value="全部结果"   style="display: none;">';
            resultHtml +='<label  style="display:block;" >';
            resultHtml +='<span >全部结果<i class="badge">0</i>';
            resultHtml +='</span></label><li>';
            $("#treeDemo").html(resultHtml);


        }
        channnelStrs = codes;
            // if(channnelStrs.length>1){
            var timers = 0;
            if(channnelStrs.length>1 && document.body.clientWidth > 700){//Li.chen 当宽度小于700 不加载树结构
                timers = 1800;
                crte();                 
            }
            window.setTimeout(function(){
  
                var checkstr = pCode;

                
                var code ;
                var num;
                var spanid;
                var lmcount=0;

                var pflag=false;
                var ctemp = $("#ctemp").val();//标识用户是否手动选择了栏目 默认0， 否0 是1。
                
                for (var i = 0;i <jsons.length;i++) {

                    code =jsons[i].word;
                    num = jsons[i].num;  


                    spanid=code+"_span";
                    lmcount =Number(lmcount)+Number(num);
                    var spanb= $('#'+code+'_span');

                    if (spanb == null ||spanb==undefined
                        ||spanb=='undefined' ||spanb==""){
                        continue;
                }
                         //判断disply是否为1
                         if(spanb.attr('disply')!='3'){
                            //显示上级html标签

                            var tempobj = spanb.parent().parent().parent().prev().prev().prev().prev();
                            if(tempobj.hasClass('expanded')){
                                tempobj.trigger('click');

                            }

                        }

                        var c_numstart = $('#'+code).text();
                        var c_numend = Number(c_numstart)+Number(num);
                        $('#'+code).html(c_numend);
                          //操作父节点标签
                          if(spanb.attr('pids')!=null && spanb.attr('pids')!="" 
                            && spanb.attr('pids')!="undefined"
                            && spanb.attr('pids')!=undefined){
                              var parentIds = spanb.attr('pids');//获取pids字符串
                            parentIds = parentIds.toString();
                            var arr=new Array();
                            var fs_span;
                            var fs_numstart;
                              arr=parentIds.split(',');//逗号字符串分割
                              for(var k=0;k<arr.length;k++)
                              {

                                  fs_span =$('#'+arr[k]+'_span');//父节点span
                                  if(arr[k]==checkstr){
                                    pflag = true;
                                  }
                                  if(fs_span.attr('disply')!='3'){
                                    var fstemp= fs_span.parent().parent().parent().prev().prev().prev().prev();
                                    if(fstemp.hasClass('expanded')){
                                        fstemp.trigger('click');

                                    }
                                  }
                               fs_span =$('#'+arr[k]+'_span');//父节点span

                               fs_numstart =$('#'+arr[k]).text();//0 5
                               
                               var selfnum = $('#'+arr[k]).attr('selfnum');//自身节点的值
                               
                                var fs_numend = Number(num)+Number(fs_numstart);//i=0 表示父亲数= 父数+子值
                                $('#'+arr[k]).html(fs_numend);


                            }

                        }else{
                            // alert("找到没有父亲的code:"+code);
                        }



                    }
            //默认勾选
            if(clickflag){
            //  console.info("默认勾选");
            $("#88888888_switch").prev().trigger('click');
            clickflag=false;
        }
            //跳转勾选
            if(checkstr!=""&&checkstr!=null&&checkstr!=undefined&&ctemp=='0'){


                $("#"+checkstr+"_switch").prev().trigger('click');

                var pCodeSpan =$('#'+checkstr+'_span');
                if(pCodeSpan.attr('pids')!=null && pCodeSpan.attr('pids')!="" 
                    && pCodeSpan.attr('pids')!="undefined"
                    && pCodeSpan.attr('pids')!=undefined){
                         var pCodeIds = pCodeSpan.attr('pids');//获取pids字符串
                        
                        pCodeIds = pCodeIds.toString();
                        var pCodeIdsarr=new Array();
                        var fs_pCodeIds_span;
                    pCodeIdsarr=pCodeIds.split(',');//逗号字符串分割

                    for(var k=0;k<pCodeIdsarr.length;k++){
                        fs_pCodeIds_span =$('#'+pCodeIdsarr[k]+'_span');//父节点span
                        var temp1 =fs_pCodeIds_span.parent().prev().prev().prev();

                        if(temp1.hasClass('collapsed')){
                            temp1.trigger('click');
                        }
                    }

                   }
                     //展示到pCode节点
                     $("#"+checkstr+"_span").parent().prev().prev().prev().trigger('click');
                    }

                //用户自定义勾选
                
                if(channelCode!=""&&channelCode!=null&&channelCode!=undefined&&channelCode!="flag"&&ctemp=='1'){
                    
                    channelCode = channelCode+',';
                    if(channelCode.indexOf(",")>0){
                        var userbox= new Array(); 
                        userbox=channelCode.split(","); 

                        var arrlength = userbox.length;

                        var arrtemp = new Array();
                        for (var j=0;j<arrlength ;j++ ) {
                            var tempSpan =$('#'+userbox[j]+'_span');
                            var temvale = tempSpan.attr('parentid');

                            var idx = channelCode.indexOf(","+temvale);

                            if(idx>-1){

                                channelCode = channelCode.replace(userbox[j]+",","");
                                
                            }

                        }
                         var userbox1= new Array();
                         channelCode = channelCode.substring(0, channelCode.length-1);
                         userbox1=channelCode.split(","); 
                         for (var k=0;k<userbox1.length ;k++ ) {
                            var boxobj1 = $("#"+userbox1[k]+"_switch");
                            $("#lmtemp").val('1');
                            boxobj1.prev().trigger('click');
                            $("#lmtemp").val('0');
                            checkflag = false;

                            var boxSpan1 =$('#'+userbox1[k]+'_span');
                            if(boxSpan1.attr('pids')!=null && boxSpan1.attr('pids')!="" 
                                && boxSpan1.attr('pids')!="undefined"
                                && boxSpan1.attr('pids')!=undefined){
                                 var boxIds1 = boxSpan1.attr('pids');//获取pids字符串
                                boxIds1 = boxIds1.toString();
                                var boxIdsarr1=new Array();
                                var fs_boxIds_span1;
                            boxIdsarr1=boxIds1.split(',');//逗号字符串分割
                            for(var x=0;x<boxIdsarr1.length;x++){
                                fs_boxIds_span1 =$('#'+boxIdsarr1[x]+'_span');//父节点span
                                var temp1 =fs_boxIds_span1.parent().prev().prev().prev();
                                if(temp1.hasClass('collapsed')){
                                    temp1.trigger('click');
                                }
                               }
                           }
                       }
                    }
                }
                $("#88888888").html(lmcount);
                $("#sse_query_menu ul label.active").removeClass("active"); 
                noneLoading();
                if(timeflag&&temp!=undefined&&temp!=""){

                    slected(temp);
                }else{
                    timeflag=false;
                }
            },timers);
        }
    });
}

/**
 *显示父栏目
 */
 function showParentId(chId){
     var chSpanb= $('#'+chId+'_span');//儿子节点的span
     chSpanb.parent().parent().parent().show();
     chSpanb.parent().parent().show();
     chSpanb.parent().show();
     var parentId =  chSpanb.attr('parentid'); //将所有

     var par_span;
     if(parentId!=null && parentId!="" && parentId!="undefined" && parentId!=undefined){

        par_span=$('#'+parentId+'_span');
        if(par_span.is(":hidden")){
            par_span.parent().parent().parent().show();
            par_span.parent().parent().show();
            par_span.parent().show();
        }

        return showParentId(par_span.attr('parentid'));
     }else{
        return "";
     }
    }

$("#searchword").keydown(function (e) {

    var key = e.which;
    if (key == 13 || (key == 10 && $.browser.msie && $.browser.version <= 6.0)) {
        $('#searhInput').hide();
        $("#searchword").blur();
        keyOnclick();
    }
});
function slected(temp){
    $("select").multipleSelect();
    $("select").multipleSelect("setSelects", [temp]);
}
/**
 * 清除页面的缓存数据
 */
 function clearParms(){
    checkflag= false;
    clickflag = true;
    $("#pCode").val("");
    $("#hchannelcode").val("flag");
    $('select').multipleSelect('refresh');//刷新时间段回复默认
    $("#pageinfo").children().remove();
    $("#ctemp").val("0");// 1201-1853 1-->0
    $("#odrul").val("CRELEASETIME"); //时间排序回复默认
    //时间段查询将时间表示变更为2表示不再获取url的时间
    $("#webtmf").val("2");  
    $("#spage").val("1");
$('#realhref').removeClass("active");
$('#timehref').addClass("active");


}
var keyOnclick = function (){
    clearParms();
    getsewordtype();
    
}