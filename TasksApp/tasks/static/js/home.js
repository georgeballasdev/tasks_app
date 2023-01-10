// Variables


// Functions
function smoothRemove(elm) {
    $(elm).fadeTo(300, 0.01, function(){ 
        $(elm).slideUp(150, function() {
            $(elm).remove(); 
        }); 
    });
}

// Events
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

    // Add task button clicked
    if (target.classList.contains('add-button')){
        let addTask = $(this).find('.add-task');
        addTask.show();
        addTask.focus();
        $(addTask).keypress(function(e) {
            if (e.key == 'Enter') {
                console.log('Send ajax for new task');
            }
        })
    }

    // Remove project button clicked
    else if (target.classList.contains('remove-button')){
        let project = this;
        let title = $($(project).find('.title-text')).text();
        $.confirm({
            boxWidth: '40%',
            useBootstrap: false,
            title: title,
            content: 'Delete this project?',
            buttons: {
                delete: function () {
                    console.log('Send ajax to remove project');
                    smoothRemove(project);
                },
                cancel: function () {}
            },
        });
    }

    // Task clicked
    else if (target.classList.contains('task')){
        let task_id = $(target).attr('id');
        console.log(window.location.host + '/' + task_id);
        smoothRemove(target);
    }

    // Go to project detail view
    else {
        let id = $(this).attr('id');
        window.location.href = 'http://' + window.location.host + '/project/' + id + '/';
    }
})

$('.project').mouseleave(function() {
    let addTask = $(this).find('.add-task');
    addTask.val('');
    addTask.hide();
})