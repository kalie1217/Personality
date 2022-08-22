function removeRing() {
    $('.item').each(function () {
        $(this).removeClass('active');
        var i = $(this).index() - 1;
        $('.item').eq(i - 1).css('background-image', 'url(images/circle_0' + i + '.png)');
        $('.item').eq(i - 1).find('img').attr('src', 'images/button_0' + i + '.png');
    });
}

function setMainContent(i) {
    const d = data[i];
    $('.content-img > img').attr('src', 'images/' + d.image);
    $('.content-text').text(d.text);
}

$(document).ready(function(){
    $('.content-item-img').mouseover(function() {
        removeRing();
        var i = $(this).parent().index() - 1;

        $('.item').eq(i - 1).addClass('active');
        $('.item').eq(i - 1).css('background-image', 'url(images/ring_0' + i + '.png)');
        $('.item').eq(i - 1).find('img').attr('src', 'images/live_button_0' + i + '.png');

        setMainContent(i - 1);
    });
});