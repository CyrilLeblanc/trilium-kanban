module.exports = async function(event, kanban, el, boardId) {
    const $button = $(el);
    const $board = $button.parents(".kanban-board");

    // create a form to display
    const $form = $("<form/>").addClass("kanban-item");
    const $input = $("<input/>");
    $form.append($input);
    
    const reset = function() {
        $form.remove();
        $button.show();
    }

    /**
     * Submit the form
     * Create a new note, toggle the button and remove the form.
     */
    const submit = async function(event) {
        event.preventDefault();
        
        const title = $input.val().trim();
        if (!title) {
            reset();
            return;
        }

        // set the position to be the last
        const position = $board.find(".kanban-item:not(form)").length;

        // add the new note with last position
        const cardId = await api.runOnBackend((boardId, title, position) => {
            const newNote = api.createTextNote(boardId, title, "").note;
            newNote.setLabel("sortOrder", position);
            newNote.save();

            return newNote.noteId;
        }, [boardId, title, position])
        await api.waitUntilSynced();
    
        // add the new card to board, remove the form and reset button visibility
        kanban.addElement(boardId, {id: cardId, title}, position);
        reset();
    };

    // bind events
    $form.on("submit", submit);
    $input.on("blur", submit);
    $input.on("keydown", event => {
        if (event.code == "Escape") {
            reset();
        }
    });

    // add form to DOM
    $button.hide();
    kanban.addForm(boardId, $form[0]);

    // focus on input
    $input.select().focus();
}