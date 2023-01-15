const separator = $('#separator');
const body = $('html, body');
let state = 'login';

$(separator).click( () => {
    if (state == 'login') {
        body.animate({scrollLeft: 0}, 800);
        state = 'register';
    }
    else {
        body.animate({scrollLeft: body.width()}, 800);
        state = 'login';
    }
})