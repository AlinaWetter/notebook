let titles = []
let dates = []
let notes = []

let trashTitles = []
let trashDates = []
let trashNotes = []

load();




function renderIndex() {
    newNote = document.getElementById('note');
    newNote.innerHTML = '';
    newNote.innerHTML += /* html */ `
    <div class="first-input-row">
        <input id="titleInput" class="title-input" placeholder="Title" required>
        <input id="dateInput" class="date-input" placeholder="Datum" required>
    </div>
    <form>
        <textarea id="noteInput" class="note-input" type="text" placeholder="Deine Notiz" required></textarea>
        <span class="add" onclick = "controlInput() ">Hinzufügen</span>
    </form>
    <div id="lastNotes" class="last-notes">
    <div class="last-note"></div>
    <div class="last-note"></div>
    <div class="last-note"></div>
    </div>` ;

    showLastThreeNotes();

}


function renderArchive() {
    archiveNotes = document.getElementById('archiveNotes');
    archiveNotes.innerHTML = '';

    for (i = titles.length - 1; i > -1; i--) {

        const title = titles[i];
        const date = dates[i];
        const note = notes[i];

        archiveNotes.innerHTML += /* html */ `
            <div class="archive-note" >
                <div class="archive-note-child">
                    <span><h3>${title}</h3>${date}</span>
                    <span>${note}</span>
                </div>
                <img onclick = "saveTrashNote(${i}); deleteNoteArchive(${i}); " class="trash-icon" src="./img/trash.png" alt="">
            </div>
        `;
    }

}

function controlInput() {

    if (document.getElementById('titleInput').value == '') {
        document.getElementById('titleInput').classList.add('red-outline')
    }
    if (document.getElementById('dateInput').value == '') {
        document.getElementById('dateInput').classList.add('red-outline')
    }
    if (document.getElementById('noteInput').value == '') {
        document.getElementById('noteInput').classList.add('red-outline')
    } else {
        addNote();
    }
}

function addNote() {

    let title = document.getElementById('titleInput');
    let date = document.getElementById('dateInput');
    let note = document.getElementById('noteInput');

    titles.push(title.value);
    dates.push(date.value);
    notes.push(note.value);

    title.value = '';
    date.value = '';
    note.value = '';

    save();
    renderIndex();

}

function save() {

    let titlesAsText = JSON.stringify(titles)
    let datesAsText = JSON.stringify(dates)
    let notesAsText = JSON.stringify(notes)
    localStorage.setItem('titles', titlesAsText)
    localStorage.setItem('dates', datesAsText)
    localStorage.setItem('notes', notesAsText)

    let trashTitlesAsText = JSON.stringify(trashTitles)
    let trashDatesAsText = JSON.stringify(trashDates)
    let trashNotesAsText = JSON.stringify(trashNotes)
    localStorage.setItem('trashTitles', trashTitlesAsText)
    localStorage.setItem('trashDates', trashDatesAsText)
    localStorage.setItem('trashNotes', trashNotesAsText)
}


function load() {

    let titlesAsText = localStorage.getItem('titles')
    let datesAsText = localStorage.getItem('dates')
    let notesAsText = localStorage.getItem('notes')
    if (titlesAsText && datesAsText && notesAsText) {
        titles = JSON.parse(titlesAsText)
        dates = JSON.parse(datesAsText)
        notes = JSON.parse(notesAsText)
    }

    let trashTitlesAsText = localStorage.getItem('trashTitles')
    let trashDatesAsText = localStorage.getItem('trashDates')
    let trashNotesAsText = localStorage.getItem('trashNotes')
    if (trashTitlesAsText && trashDatesAsText && trashNotesAsText) {
        trashTitles = JSON.parse(trashTitlesAsText)
        trashDates = JSON.parse(trashDatesAsText)
        trashNotes = JSON.parse(trashNotesAsText)
    }
}

function saveTrashNote(i) {

    trashTitles.push(titles[i]);
    trashDates.push(dates[i]);
    trashNotes.push(notes[i]);

    save();
}

function deleteTrashNote(i) {

    trashTitles.splice(i, 1);
    trashDates.splice(i, 1);
    trashNotes.splice(i, 1);

    renderTrash();
    save();

}

function refreshTrashNote(i) {
    titles.push(trashTitles[i]);
    dates.push(trashDates[i]);
    notes.push(trashNotes[i]);

    deleteTrashNote(i);
    renderTrash();
    renderArchive();
    save();
}

function deleteNoteArchive(i) {

    titles.splice(i, 1);
    dates.splice(i, 1);
    notes.splice(i, 1);

    renderArchive();
    save();

}

function deleteNoteIndex(i) {
    titles.splice(i, 1);
    dates.splice(i, 1);
    notes.splice(i, 1);

    renderIndex();
    save();
}


function showLastThreeNotes() {

    let lastNotes = document.getElementById('lastNotes');
    lastNotes.innerHTML = '';


    for (let i = notes.length - 1; i > notes.length - 4; i--) {

        const title = titles[i];
        const date = dates[i];
        const note = notes[i];

        if (title && date && note) {
            lastNotes.innerHTML += /* html */ `   
            <div class="last-note">
                <span><h3>${title}</h3>${date}</span>
                <span>${note}</span>
                <img onclick = "saveTrashNote(${i}); deleteNoteIndex(${i});" class="trash-icon" src="./img/trash.png" alt="">
            </div>
            `;
        }else {
            lastNotes.innerHTML += /* html */ `   
            <div class="last-note">
                <span>Füge weitere Notizen hinzu!</span>
                <img onclick = "saveTrashNote(${i}); deleteNoteIndex(${i});" class="trash-icon" src="./img/trash.png" alt="">
            </div>
            `;
        }
    }

    save();
}

function renderTrash() {

    let trashcan = document.getElementById('trash');
    trashcan.innerHTML = '';

    for (i = trashTitles.length - 1; i > -1; i--) {

        const trashTitle = trashTitles[i];
        const trashDate = trashDates[i];
        const trashNote = trashNotes[i];

        trashcan.innerHTML += /* html */ `
        <div class="trash-note" >
            <div class="trash-note-child">
                <span><h3>${trashTitle}</h3>${trashDate}</span>
                <span>${trashNote}</span>
            </div>
            <div class="trash-icons">
            <img onclick = "deleteTrashNote(${i})" class="trash-icon" src="./img/trash.png" alt="">
            <img onclick = "refreshTrashNote(${i})" class="trash-icon" src="./img/refresh.png" alt="">
            </div>
        </div>
    `;

    }

}

function toggleTrash() {


    document.getElementById('trash').classList.toggle('trash');
    document.getElementById('trash').classList.toggle('d-none');

    renderTrash();
}







