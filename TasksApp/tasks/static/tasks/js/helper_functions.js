const infoBox = $('#info');

function newInfo(info) {
    $(infoBox).css({bottom: '-20%'});
    infoBox.text(info);
    $(infoBox).animate({bottom: '5%'}, 1000);
    setTimeout(() => {$(infoBox).animate({bottom: '-20%'}, 1000)}, 3000);
}

function smoothRemove(elm) {
    $(elm).fadeTo(300, 0.01, () => { 
        $(elm).slideUp(150, () => {
            $(elm).remove(); 
        }); 
    });
}