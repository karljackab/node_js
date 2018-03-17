const fs = require('fs');

var readNotes = function(pt) {
    try
    {
        var notes = fs.readFileSync(pt);
        return JSON.parse(notes);
    }
    catch (e)
    {
        return [];
    }
}

var create = function(title, body) {
    notes = readNotes('./list.json');
    note = {
        title,
        body
    };
    var duplicate = notes.filter((now) => now.title === title);
    if (duplicate.length === 0 && typeof(title) !== 'undefined')
    {
        notes.push(note);
        fs.writeFileSync('list.json', JSON.stringify(notes));
        return true;
    }
    return false;
};

var read = function(title) {
    notes = readNotes('./list.json');
    if (typeof(title) !== 'undefined')
        notes = notes.filter((now) => now.title === title);
    return notes;
};
var delet = function(title) {
    notes=readNotes(('./list.json'));
    notes=notes.filter((now) => now.title!==title);
    fs.writeFileSync('list.json',JSON.stringify(notes));
}

module.exports = {
    create,
    read,
    delet
};