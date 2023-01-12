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

$('.project').on('click','.task',function(e){
    removeTask(e.target);
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