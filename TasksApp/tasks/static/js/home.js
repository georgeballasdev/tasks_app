// Functions
function smoothRemove(elm) {
    $(elm).fadeTo(300, 0.01, function(){ 
        $(elm).slideUp(150, function() {
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
        let addTask = $(project).find('.add-task');
        let textInput = $(addTask).find('input[name=task]');
        addTask.show();
        textInput.focus();
    }

    // Remove project button clicked
    else if (target.classList.contains('remove-button')){
        let title = $($(project).find('.title-text')).text();
        let id = $(project).attr('id');
        let token = $(project).find('input[name=csrfmiddlewaretoken]').val();
        $.confirm({
            boxWidth: '40%',
            useBootstrap: false,
            title: title,
            content: 'Delete this project?',
            buttons: {
                delete: function () {
                    $.ajax({     
                        url: 'http://' + window.location.host + '/ajax/remove-project/' + id + '/',
                        type: 'POST',
                        data: {csrfmiddlewaretoken: token},
                    });
                    smoothRemove(project);
                },
                cancel: function () {}
            },
        });
    }

    // Task clicked
    else if (target.classList.contains('task')){
        let task_id = $(target).attr('id');
        let token = $(project).find('input[name=csrfmiddlewaretoken]').val();
        $.ajax({     
            url: 'http://' + window.location.host + '/ajax/remove-task/' + task_id + '/',
            type: 'POST',
            data: {csrfmiddlewaretoken: token},
        });
        smoothRemove(target);
    }
})

$('.project').mouseleave(function() {
    let addTask = $(this).find('.add-task');
    let textInput = $(addTask).find('input[name=task]');
    textInput.val('');
    addTask.hide();
})

$('.add-task').submit(function(e) {
    e.preventDefault();
    let project = $(this).closest('.project');
    let id = $(project).attr('id');
    let taskInput = $(this).find('input[name=task]');
    let taskText = taskInput.val();
    let token = $(this).find('input[name=csrfmiddlewaretoken]').val();
    $.ajax({     
        url: 'http://' + window.location.host + '/ajax/add-task/' + id + '/',
        type: 'POST',
        data: {
            task: taskText,
            csrfmiddlewaretoken: token
        },
        success: function(data) {
            var new_task = $('<div></div>').text(data['task']);
            $(new_task).attr({'id': data['task_id'], 'class': 'task'});
            let tasks = $(project).find('.tasks');
            if ($(tasks).find('p').length > 0){
                $(tasks).empty();
            };
            $(tasks).append(new_task);
        }
    });
    $(taskInput).val('');
})