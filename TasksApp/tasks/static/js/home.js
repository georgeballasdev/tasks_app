// Variables


// Functions


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

    // Task clicked
    else if (target.classList.contains('task')){
        let task_id = $(target).attr('id');
        console.log(window.location.host + '/' + task_id);
        $(target).fadeTo(300, 0.01, function(){ 
            $(this).slideUp(150, function() {
                $(this).remove(); 
            }); 
        });
    }

    // Go to project detail view
    else {
        console.log('goto project detail view');
    }
})

$('.project').mouseleave(function() {
    let addTask = $(this).find('.add-task');
    addTask.val('');
    addTask.hide();
})