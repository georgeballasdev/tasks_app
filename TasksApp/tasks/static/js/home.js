$('.project-title').click(function(e) {
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

$('.project').click(function(e) {
    let target = e.target;
    let project = this;

    // Add task button clicked
    if (target.classList.contains('add-button')){
        let taskForm = $(project).find('.add-task');
        let taskInput = $(taskForm).find('input[name=task]');
        taskForm.show();
        taskInput.focus();
    }

    // Remove project button clicked
    else if (target.classList.contains('remove-button')){
        $.confirm({
            boxWidth: '40%',
            useBootstrap: false,
            title: $($(project).find('.title-text')).text(),
            content: 'Delete this project?',
            buttons: {
                delete: () => {
                    let id = $(project).attr('id');
                    let token = $(project).find('input[name=csrfmiddlewaretoken]').val();
                    $.ajax({     
                        url: 'http://' + window.location.host + '/ajax/remove-project/' + id + '/',
                        type: 'POST',
                        data: {csrfmiddlewaretoken: token},
                    });
                    smoothRemove(project);
                    newInfo('Project removed');
                },
                cancel: () => {}
            },
        });
    }
})

$('.project').mouseleave(function() {
    let taskForm = $(this).find('.add-task');
    let taskInput = $(taskForm).find('input[name=task]');
    taskInput.val('');
    taskForm.hide();
})