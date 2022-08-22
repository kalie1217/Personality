// Javascript Code
// 10-20-2018 Aaron Lee
// Revision 1.0

const data = [];

function removeRing() {
    $('.item').each(function () {
        $(this).removeClass('active');
        var i = $(this).index();
        $('.item').eq(i).css('background-image', 'url(images/personality/circle_0' + (i+1) + '.png)');
        $('.item').eq(i).find('img').attr('src', 'images/personality/button_0' + (i+1) + '.png');
    });
}

function setMainContent(i) {
    $('.content-img > img').attr('src', 'images/personality/' + data[i].image);
    $('.content-text').text(data[i].text);
}

function loadPersonality_HTML5(){
    $(document).ready(function(){

        var mainTemplate = `<div class="main-container">

        <div id="personalityInstructions">
            <div class="personalityInstrTitle" id="popupTitle"></div>
            <div id="personalityInstrCloseX" onclick="$('#personalityInstructions').hide()">X</div>
            <div id="personalityInstrContent"><span>
                <span id="popupText"></span>
            </span>
            </div>
        </div>

        <div class="container-header">
            <div class="container-header-left">
                <span id="firstTitle"></span> |
                <span id="secondTitle"></span>
            </div>
            <div class="container-header-right"><a href="#" onclick="$('#personalityInstructions').show()" id="buttonTitle"></a></div>
            <div class="clearer"></div>
        </div>
        <div class="container-body">
            <div class="content-img"><img src=""></div>
            <div class="content-text">

            </div>
            <div id="contentThumbs"></div>
        </div>
    </div>`;

        $('#HTML5').html(mainTemplate);

        var file = 'xml/cip_' + projCode + '_personalityHTML5.xml';
        var xmlObj = new load_XML(file);
        var objElements = xmlObj.tagNameElement('data_xml');

        // set titles
        $('#firstTitle').text(objElements[0].getAttribute('title'));
        $('#secondTitle').text(objElements[0].getAttribute('subtitle'));

        // set button title and popup title
        objElements = xmlObj.tagNameElement('instructions');
        $('#buttonTitle, #popupTitle').text(objElements[0].getAttribute('title'));

        // set popup text
        objElements = xmlObj.tagNameElement('content');
        $('#popupText').text(objElements[0].textContent);

        // draw circles
        var circles = '';
        var eventXMLObj = xmlObj.tagNameElement('event');
        for (var i = 0; i < eventXMLObj.length && i < 9; i++) {
            var obj = new Object();
            data.push({image: eventXMLObj[i].getAttribute('image'), text: eventXMLObj[i].textContent});

            circles += `
            <div class="item content-thumb-`+ (i+1) +` `+ (!i ? 'active' : '') +`" `+ (!i ? 'style="background-image: url(images/personality/ring_0'+ (i+1) +'.png)"' : '') +`>
                <span class="content-item-year">` + eventXMLObj[i].getAttribute('date') + `</span>
                <div class="content-item-img">
                    <img src="images/personality/` + ( i ? eventXMLObj[i].getAttribute('thumb').replace('live_', '') : eventXMLObj[i].getAttribute('thumb') )+ `" alt="">
                </div>
            </div>
        `;
        }

        // set main image and text with first element
        setMainContent(0);

        // draw circles
        $('#contentThumbs').html(circles);

        // thumbs mouseover events
        $('.content-item-img').mouseover(function() {
            removeRing();
            var i = $(this).parent().index();

            $('.item').eq(i).addClass('active');
            $('.item').eq(i).css('background-image', 'url(images/personality/ring_0' + (i + 1) + '.png)');
            $('.item').eq(i).find('img').attr('src', 'images/personality/live_button_0' + (i + 1) + '.png');

            setMainContent(i);
        });
    });
}
