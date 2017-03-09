$(function(){
    $('.news-content a:first').siblings().hide();
    setInterval(function(){
        $('.news-content a:visible').slideUp('slow', function(){
            $(this).next('a')[0] === undefined ? $('.news-content a:first').fadeIn("slow") : $(this).next('.news-content a').fadeIn("slow");
        });
    }, 1000*3)
});