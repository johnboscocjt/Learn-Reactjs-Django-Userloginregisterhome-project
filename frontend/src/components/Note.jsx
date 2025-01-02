import React from "react";
import "../styles/Note.css"

// you can use the note component inside the home page

// used to render all the notes very easy

// take the note and the function delete, on delete is passed as probe
function Note({ note, onDelete }) {
    // stripoff all the things wedont wanna see, like timezone
    const formattedDate = new Date(note.created_at).toLocaleDateString("en-US")

    return (
        // rendering the container
        <div className="note-container">
            <p className="note-title">{note.title}</p>
            <p className="note-content">{note.content}</p>
            <p className="note-date">{formattedDate}</p>
            <button className="delete-button" onClick={() => onDelete(note.id)}>
                Delete
            </button>
        </div>
    );
}

export default Note