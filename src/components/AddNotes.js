import React, { useState } from "react";
import { RiDeleteBin6Line } from "react-icons/ri";
import { MdEdit } from "react-icons/md";
import { getCurrentDateTime } from "../Date"; // Import date-time function

function AddNotes({ note, setNotes }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(note.title);
  const [editedText, setEditedText] = useState(note.text);

  const handleEdit = () => setIsEditing(true);

  const handleSave = () => {
    setNotes((prevNotes) =>
      prevNotes.map((n) =>
        n.id === note.id
          ? {
              ...n,
              title: editedTitle,
              text: editedText,
              date: getCurrentDateTime(),
              color: note.color, // Retain original color
            }
          : n
      )
    );
    setIsEditing(false);
  };

  const handleDelete = () => {
    setNotes((prevNotes) => prevNotes.filter((n) => n.id !== note.id));
  };

  return (
    <div
      className={`note p-4 rounded-lg shadow-md flex flex-col h-full ${note.color}`}
    >
      {isEditing ? (
        <div className="flex flex-col h-full">
          <input
            className="block w-full mb-2 px-2 py-1 font-bold outline-none"
            style={{ backgroundColor: "transparent" }} // Match note color
            value={editedTitle}
            onChange={(e) => setEditedTitle(e.target.value)}
          />
          <textarea
            className="block w-full mb-2 px-2 py-1 resize-none outline-none overflow-hidden scrollbar-none"
            style={{ backgroundColor: "transparent" }} // Match note color
            value={editedText}
            onChange={(e) => setEditedText(e.target.value)}
          />
          <button
            className="bg-blue-500 text-white px-3 py-1 rounded w-full mt-auto hover:bg-blue-600"
            onClick={handleSave}
          >
            Save
          </button>
        </div>
      ) : (
        <>
          <div className="flex-grow">
            <span className="font-bold block mb-1">{note.title}</span>
            <span className="block">{note.text}</span>
          </div>
          <div className="flex justify-between items-center mt-4 pt-2">
            <small className="text-black-600">{note.date}</small>
            <div className="flex gap-3">
              <MdEdit
                size="20px"
                className="text-black-500 cursor-pointer"
                onClick={handleEdit}
              />
              <RiDeleteBin6Line
                size="20px"
                className="text-black-500 cursor-pointer"
                onClick={handleDelete}
              />
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default AddNotes;
