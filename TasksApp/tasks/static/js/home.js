// Variables
const infoBox = $('#info');

// Functions
function appendTask(response, project) {
    let new_task = $('<div></div>').text(response['task']);
    $(new_task).attr({'id': response['taskId'], 'class': 'task'});
    let tasks = $(project).find('.tasks');
    if ($(tasks).find('p').length > 0){
        $(tasks).empty();
    };
    $(tasks).append(new_task);
}

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

// Events
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

    // Task clicked
    else if (target.classList.contains('task')){
        let taskId = $(target).attr('id');
        let token = $(project).find('input[name=csrfmiddlewaretoken]').val();
        $.ajax({     
            type: 'POST',
            url: 'http://' + window.location.host + '/ajax/remove-task/' + taskId + '/',
            data: {csrfmiddlewaretoken: token},
        });
        smoothRemove(target);
        newInfo('Task removed');
    }
})

$('.project').mouseleave(function() {
    let taskForm = $(this).find('.add-task');
    let taskInput = $(taskForm).find('input[name=task]');
    taskInput.val('');
    taskForm.hide();
})

$('.add-task').submit(function(e) {
    e.preventDefault();
    let project = $(this).closest('.project');
    let id = $(project).attr('id');
    let taskInput = $(this).find('input[name=task]');
    let token = $(this).find('input[name=csrfmiddlewaretoken]').val();
    $.ajax({     
        type: 'POST',
        url: 'http://' + window.location.host + '/ajax/add-task/' + id + '/',
        data: {
            task: taskInput.val(),
            csrfmiddlewaretoken: token
        },
        success: (response) => appendTask(response, project)
    });
    $(taskInput).val('');
    newInfo('Task added');
})