const note = require('./note.js');
const yargs = require('yargs');
const argv = yargs
			.command('create','create note',{
				title:{
					describe:'title of note',
					demand: true,
					alias: 't'
				},
				body:{
					describe:'body of note',
					demand:true,
					alias:'b'
				}
			})
			.command('read','list note ( if no title,then list all notes)',{
				title:{
					describe:'title of note',
					alias:'t'
				}
			})
			.command('delete','delete note',{
				title:{
					describe:'title of note',
					demand:true,
					alias:'t'
				}
			})
			.help()
			.argv;
if (argv._[0] === 'create')
{
    var res = note.create(argv.title,argv.body);
    if (res === true)
        console.log(`${argv.title}: ${argv.body}\ncreated successfully`);
}
else if (argv._[0] === 'read')
{
    notes = note.read(argv.title);
    console.log('===============\nNotes\n===============');
    notes.forEach((note) => {
        console.log(`${note.title}: ${note.body}`);
    })
    console.log('===============');
}
else if (argv._[0] === 'delete')
    note.delet(argv.title);
else
    console.log('commend not found');