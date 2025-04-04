import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import Notes from "./components/Note";
import AddNotes from "./components/AddNotes";
import { getCurrentDateTime } from "./Date";
import { getRandomColor } from "./Color";
import Search from "./components/Search";
import FloatingMenu from "./components/FloatingMenu";

function App() {
  const [noteText, setNoteText] = useState("");
  const [noteTitle, setNoteTitle] = useState("");
  const [searchText, setSearchText] = useState("");
  const [editNoteId, setEditNoteId] = useState(null);
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("theme") === "dark"
  );

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      document.body.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      document.body.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  const [notes, setNotes] = useState(() => {
    const savedNotes = localStorage.getItem("react-my-notes");
    return savedNotes ? JSON.parse(savedNotes) : [];
  });

  useEffect(() => {
    localStorage.setItem("react-my-notes", JSON.stringify(notes));
  }, [notes]);

  function handleAddNote(noteTitle, noteText) {
    if (editNoteId) {
      // Update existing note
      setNotes((prevNotes) =>
        prevNotes.map((note) =>
          note.id === editNoteId
            ? { ...note, title: noteTitle, text: noteText }
            : note
        )
      );
      setEditNoteId(null);
    } else {
      const newNote = {
        id: crypto.randomUUID(),
        title: noteTitle,
        text: noteText,
        color: getRandomColor(),
        date: getCurrentDateTime(),
      };

      setNotes((prevNotes) => [...prevNotes, newNote]);
    }
    setNoteTitle("");
    setNoteText("");
  }

  return (
    <div
      className={`min-h-screen overflow-y-scroll${
        darkMode ? "bg-blue-900 text-white" : "bg-white text-black"
      }`}
    >
      <Header darkMode={darkMode} setDarkMode={setDarkMode} />
      <FloatingMenu />
      <div className="px-4">
        <Search setSearchText={setSearchText} />
        <div className="container flex-1 p-6">
          <Notes
            setNotes={setNotes}
            noteTitle={noteTitle}
            setNoteTitle={setNoteTitle}
            noteText={noteText}
            setNoteText={setNoteText}
          />
          {notes
            .filter((note) =>
              note.title.toLowerCase().includes(searchText.toLowerCase())
            )
            .map((note) => (
              <AddNotes
                key={note.id}
                note={note}
                setNotes={setNotes}
                setNoteText={setNoteText}
                setNoteTitle={setNoteTitle}
                setEditNoteId={setEditNoteId}
                handleAddNote={handleAddNote}
              />
            ))}
        </div>
      </div>
    </div>
  );
}

export default App;
