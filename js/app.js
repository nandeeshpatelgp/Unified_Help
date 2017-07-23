var $tabsShell = $('.tabBar')

/* Intializing the tabs container */
chromeTabs.init({
    $shell: $tabsShell,
    minWidth: 45,
    maxWidth: 160
});

/* Adding all the required tabs using the library */
chromeTabs.addNewTab($tabsShell, {
    favicon: '',
    title: '<span class="fa fa-comment"></span>  Live Chat',
    data: {
        tabType: 'chat'
    }
});
chromeTabs.addNewTab($tabsShell, {
    title: '<span class="fa fa-search"></span> FAQ',
    data: {
        tabType: 'faq'
    }
});
chromeTabs.addNewTab($tabsShell, {
    favicon: '',
    title: '<span class="fa fa-envelope-o"></span> Mail Us',
    data: {
        tabType: 'mailUs'
    }
});

/* Event handler for tab switch event which will be triggered whenever user switches between tabs. */
$tabsShell.bind('chromeTabRender', function(){
    var $currentTab = $tabsShell.find('.chrome-tab-current');
    if($currentTab.data('tabData')){
        var type = $currentTab.data('tabData').data.tabType;
        if(type === 'mailUs'){
            $('body').find(".mailUs .content .success-msg").hide();
        }
        $(".main div.tab").hide();
        $(".main div." + type).show();
        if(!$(".tabBar .tabBar-toggle").attr("open")){
            $(".tabBar .tabBar-toggle").click();
        }
    }
});

/* Event handle for click event of widget open/close button which toggles the display of widget body.*/
$(".tabBar .tabBar-toggle").on("click",function(e,data){
    if($(this).attr("open")){
        $(this).removeAttr("open");
        $(".main").removeClass("active");
        setTimeout(function(){
            $(".main div.tab").hide();
        },1000);
        $(this).find("i").removeClass("fa-times").addClass("fa-arrow-up");
        $('.chrome-tab-current').removeClass('chrome-tab-current');
    }else{
        $(this).attr("open",true);
        $(".main").addClass("active");
        $(this).find("i").removeClass("fa-arrow-up").addClass("fa-times");
        if(e.originalEvent)
            $($(".chrome-tab")[1]).click();
    }
});

/* Event handler to show the success message after clicking send email button on Mail Us tab */
$('body').find("[data-action='sendMail']").on("click",function(e){
    e.preventDefault();
    $('body').find(".mailUs .content .success-msg").show();
    $("#emailForm")[0].reset();
});

/* Event handler to filter the thumbnails of FAQ tab based on the search text entered by user */
$("body").find("#search #filter-input").on("input",function(){
    var text = $(this).val().toLowerCase();
    $(".faq-widgets .box").hide();
    $.each($(".faq-widgets .box p"),function(index,elem){
        if($(elem).text().toLowerCase().indexOf(text) >= 0)
            $(elem).parents(".box").show();
    });
});

/* Event handler which will switch to Mail Us tab once user clicks on Write to us button */
$("body").find(".email-section .email-button").on("click",function(e){
    $($(".chrome-tab")[2]).click();
});

/* Dummy logic for chat screen */
$("body").find(".main .chat .chat-form textarea").on("keyup",function(e){
    e.preventDefault();
    if(e.which === 13){
        $("body").find(".main .chat .chat-form button").click();
    }
});

$("body").find(".main .chat .chat-form button").on("click",function(){
    var text = $("body").find(".main .chat .chat-form textarea").val();
    if(text.trim() !== ""){
        $("body").find(".main .chat .chat-form textarea").val("");
        $("body").find(".main .chat .chat-window").append("<br/><strong class='you'>You: </strong>" + text +
                                                        "<br/> <span class='wait-msg'>Please wait while we connect you to one of our executives...</span>");        
    }
});