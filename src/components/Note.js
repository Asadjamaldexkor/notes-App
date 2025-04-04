import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { getCurrentDateTime } from "../Date";
import { getRandomColor } from "../Color";
import { RiAddBoxLine } from "react-icons/ri";

function Note({ setNotes, editNoteId, setEditNoteId }) {
  const [noteTitle, setNoteTitle] = useState("");
  const [noteText, setNoteText] = useState("");
  const [remaining, setRemaining] = useState(300);
  function handleChange(event) {
    const { name, value } = event.target;
    if (name === "title" && 50 - value.length >= 0) {
      setNoteTitle(value);
    } else if (name === "text" && 300 - value.length >= 0) {
      setNoteText(value);
    }
  }
  function handleAddNote() {
    if (editNoteId) {
      // If we are editing, update the existing note
      setNotes((prevNotes) =>
        prevNotes.map((note) =>
          note.id === editNoteId
            ? { ...note, title: noteTitle, text: noteText }
            : note
        )
      );
      setEditNoteId(null); // Reset edit mode
    } else {
      setNotes((preValue) => [
        ...preValue,
        {
          id: uuidv4(),
          title: noteTitle,
          text: noteText,
          date: getCurrentDateTime(),
          Color: getRandomColor(),
        },
      ]);
    }
    setNoteTitle("");
    setNoteText("");
    setRemaining(300);
  }
  return (
    <div className="note bg-green-300">
      <input
        className="text "
        type="text"
        name="title"
        placeholder="Title..."
        value={noteTitle}
        onChange={handleChange}
      />
      <textarea
        className="input-area"
        name="text"
        rows="8"
        placeholder="Take a note...."
        value={noteText}
        onChange={handleChange}
        autoFocus
      />
      <div className="note-footer">
        <small>
          {noteText.length > 0 ? remaining - noteText.length : remaining}
          Remaining
        </small>
        <RiAddBoxLine
          className="button-hover "
          size="25px"
          onClick={() => handleAddNote(noteTitle, noteText)}
        />
      </div>
    </div>
  );
}

export default Note;
