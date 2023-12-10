module.exports = function(ids, newId, before, after, position) {
    // remove the "newId" if present in "ids"
    const currentIndex = ids.findIndex(id => id == newId);
    if (currentIndex > -1) {
        ids.splice(currentIndex, 1);
    }

    // handle "before" and "after"
    var sortOrder = null;
    if (after) {
        sortOrder = ids.findIndex(item => item == after);
        ids.splice(sortOrder, 0, newId);
    } else if (before) {
        sortOrder = ids.findIndex(item => item == before);
        ids.splice(sortOrder, 0, newId);
    } else if (position !== undefined) {
        sortOrder = position;
        ids.splice(sortOrder, 0, newId);
    } else {
        
        ids.push(newId)
    }

    return ids;
}