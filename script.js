const addBtn = document.querySelector("#addBtn");
const main = document.querySelector("#main");

// calling callback function
addBtn.addEventListener("click", addNote);


function addNote() {
    const note = document.createElement("div");
    note.classList.add("note");

    note.innerHTML = `
    <div class="tool">
    <i class="save fas fa-save"></i>
    <i class="trash fas fa-trash"></i>
</div>
<textarea></textarea>
    `;
    // save delete
    const save = note.querySelector(".save");
    const trash = note.querySelector(".trash");
    const textarea = note.querySelector("textarea");
    trash.addEventListener("click",()=>{

        note.remove();
        saveNotes();

    });



    save.addEventListener("click", saveNotes);
    textarea.addEventListener("input", saveNotes);
    // on input text add to storage
    textarea.addEventListener("input", saveNotes);

    main.appendChild(note);

}

function saveNotes() {
    const notes = document.querySelectorAll(".note textarea");
    const data = Array.from(notes).map(note => note.value);
    console.log(notes, data)
    if (data.length === 0) {
        localStorage.removeItem("notes");
    }
    else {
        localStorage.setItem("notes", JSON.stringify(data))
    }


}


function loadNotes(){
    const isNote = JSON.parse(localStorage.getItem("notes"));
    if(isNote !== null)
    {
        isNote.forEach(noteText =>
            {
                addNote();
                const notes = document.querySelector(".notes textarea")
                const lastNote = notes[notes.length -1];
                lastNote.value = noteText;
            }
        );
    }
    else{
        addNote();
    }
}
loadNotes();