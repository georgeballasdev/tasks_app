function appendTask(response, project) {
    let new_task = $('<div></div>').text(response['task']);
    $(new_task).attr({'id': response['task_id'], 'class': 'task'});
    let tasks = $(project).find('.tasks');
    $(tasks).find('p').remove();
    $(tasks).append(new_task);
}

function removeTask(target) {
    let taskId = $(target).attr('id');
    let token = $('input[name=csrfmiddlewaretoken]').val();
    $.ajax({     
        type: 'POST',
        url: 'http://' + window.location.host + '/ajax/remove-task/' + taskId + '/',
        data: {csrfmiddlewaretoken: token},
    });
    smoothRemove(target);
    newInfo('Task removed');
}

function removeProject(project) {
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
    if (window.location.href !== window.location.origin + '/') {
        setTimeout(() => {
            window.location.href = window.location.origin;
          }, "2000")
    };
}

$('.project').on('click','.task',function(e){
    removeTask(e.target);
   });

$('.project').on('click','.remove-button',function(e){
    removeProject($(e.target).closest('.project'));
});

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