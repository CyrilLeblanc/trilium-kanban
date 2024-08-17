const note = api.originEntity;
const parentNotes = note.getParentNotes();

const children = parentNotes.getChildNotes();
const sortOrder = children.length;

note.setLabel("sortOrder", sortOrder);