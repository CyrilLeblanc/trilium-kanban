module.exports = function (el) {
    const noteId = $(el).data("eid");

    api.activateNote(noteId);
}