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
    <i class="edit fas fa-edit"></i> 
</div>
<textarea></textarea>
    `;
    // save delete
    const save = note.querySelector(".save");
    const trash = note.querySelector(".trash");
    const editBtn = note.querySelector(".edit");
    const textarea = note.querySelector("textarea");
    trash.addEventListener("click",()=>{

        note.remove();
        saveNotes();

    });

     // Edit button event listener
     editBtn.addEventListener("click", () => {
        // Toggle the editable state of the textarea
        if (textarea.hasAttribute('readonly')) {
            textarea.removeAttribute('readonly');
            textarea.focus(); // Automatically focus to the textarea
            editBtn.classList.add('editing'); // Optionally, toggle an 'editing' class for CSS styling
        } else {
            textarea.setAttribute('readonly', 'readonly');
            editBtn.classList.remove('editing'); // Remove the editing class if present
        }
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

// }
function loadNotes() {
    // Make sure 'notes' is the correct key you used to save the notes
    const storedNotes = JSON.parse(localStorage.getItem("notes"));
    if (storedNotes !== null) {
        storedNotes.forEach(noteText => {
            addNote(); // Create a new note element
            const textareas = document.querySelectorAll(".note textarea"); // Select all textareas
            const lastTextarea = textareas[textareas.length - 1]; // Get the last one (the one we just added)
            lastTextarea.value = noteText; // Set its value to the stored text
        });
    } else {
        addNote(); // If no notes are stored, create a new blank note
    }
}

loadNotes();