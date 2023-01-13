$('.project-title').click(function() {
    let id = $(this).closest('.project').attr('id');
    window.location.href = 'http://' + window.location.host + '/project/' + id + '/';
})

$('.project-title').mouseenter(function() {
    let title = $(this).find('.title-text')[0];
    if (title.scrollWidth > title.offsetWidth){
        $(title).stop();
        $(title).animate({left: (title.offsetWidth-title.scrollWidth)}, 2000);
    }
})

$('.project-title').mouseleave(function() {
    let title = $(this).find('.title-text')[0];
    if (title.scrollWidth > title.offsetWidth){
        $(title).stop();
        $(title).animate({left: '0'}, 2000);
    }
})

$('.add-button').click(function(e) {
        let taskForm = $(this).siblings('.add-task');
        let taskInput = $(taskForm).find('input[name=task]');
        taskForm.show();
        taskInput.focus();
})

$('.project').mouseleave(function() {
    let taskForm = $(this).find('.add-task');
    let taskInput = $(taskForm).find('input[name=task]');
    taskInput.val('');
    taskForm.hide();
})

$('#add-project').click( () => {
    window.location.href = 'http://' + window.location.host + '/new-project/';
})