const separator = $('#separator');
const body = $('html, body');

$(separator).click( () => {
    if (body.scrollLeft() == 0) {
        var scrollTo = body.width();
    }
    else {
        var scrollTo = 0;
    }
    body.animate({scrollLeft: scrollTo}, 800);
})