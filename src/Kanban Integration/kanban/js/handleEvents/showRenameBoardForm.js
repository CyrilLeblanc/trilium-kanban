module.exports = function(event) {
    const $title = $(event.target);
    const $container = $title.parent();

    const $form = $("<form/>").addClass("kanban-title-board");
    const $input = $("<input/>");
    $input.val($title.text());
    $form.append($input);
    
    const reset = function() {
        return;
        $form.remove();
        $title.show();
    }
    
    const submit = async function(event) {
        event.preventDefault();
        
        const $board = $form.parents(".kanban-board");
        const boardId = $board.data("id");
        const title = $input.val().trim();

        if (!title) {
            reset();
            return;
        }
        $title.text(title);
        reset();

        await api.runOnBackend((boardId, title) => {
            var board = api.getNote(boardId);
            board.title = title;
            board.save();
        }, [boardId, title]);
    }
    
    // bind events
    $form.on("submit", submit);
    $input.on("blur", submit);
    $input.on("keydown", event => {
        if (event.code == "Escape") {
            reset();
        }
    });
    
    $title.hide();
    $container.append($form);
    
    // focus on input
    $input.select().focus();
}