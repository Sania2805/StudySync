import React, { useState, useEffect } from "react";
import "../styles/Notes.css";
import { motion, AnimatePresence } from "framer-motion";
const Notes = () => {
  const [notes, setNotes] = useState(() => {
    const saved = localStorage.getItem("studyNotes");
    return saved ? JSON.parse(saved) : [];
  });
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [search, setSearch] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [expandedNoteId, setExpandedNoteId] = useState(null);
  const [colorIndex, setColorIndex] = useState(0);

  useEffect(() => {
    localStorage.setItem("studyNotes", JSON.stringify(notes));
  }, [notes]);

  const handleAddNote = () => {
    const colors = ["#FFEB99", "#FFB6B9", "#C3F0CA", "#B5EAEA", "#f0b791", "#E2F0CB", "#F8E9A1"];

    if (!title.trim() && !content.trim()) return;
    const selectedColor = colors[colorIndex];
    const newNote = {
      id: Date.now(),
      title,
      content,
      timestamp: new Date().toLocaleString(),
      pinned: false,
      color: selectedColor,
    };

    if (editingId) {
      setNotes(notes.map(n =>
        n.id === editingId ? { ...n, title, content, timestamp: newNote.timestamp } : n
      ));
      setEditingId(null);
    } else {
      setNotes([newNote, ...notes]);
      setColorIndex((prev) => (prev + 1) % colors.length);
    }

    setTitle("");
    setContent("");
  };

  const handleEditNote = (note) => {
    setTitle(note.title);
    setContent(note.content);
    setEditingId(note.id);
  };

  const handleDeleteNote = (id) => {
    setNotes(notes.filter(n => n.id !== id));
  };

  const handlePinNote = (id) => {
    setNotes(notes.map(n =>
      n.id === id ? { ...n, pinned: !n.pinned } : n
    ));
  };


  const filteredNotes = notes
    .filter(
      n =>
        n.title.toLowerCase().includes(search.toLowerCase()) ||
        n.content.toLowerCase().includes(search.toLowerCase())
    )
    .sort((a, b) => (b.pinned ? 1 : 0) - (a.pinned ? 1 : 0));

  
  const handleCardClick = (id) => {
    setExpandedNoteId(id === expandedNoteId ? null : id);
  };

  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (!e.target.closest(".note-card")) setExpandedNoteId(null);
    };
    document.addEventListener("click", handleOutsideClick);
    return () => document.removeEventListener("click", handleOutsideClick);
  }, []);

  return (
    <motion.div className="note-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}>
    <motion.div className="notes"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, ease: "easeOut" }}
    >
      <h2 className="notes-title">My Notes 📝</h2>

      <div className="notes-inputs">
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          placeholder="Write your note..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <button className="add-btn" onClick={handleAddNote}>
          {editingId ? "Update Note" : "Add Note"}
        </button>
      </div>

      <input
        type="text"
        placeholder="Search notes..."
        className="search-bar"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <div className="notes-grid">
        {filteredNotes.map(note => (
          <div
            className={`note-card ${expandedNoteId === note.id ? "expanded" : ""}`}
            key={note.id}
            style={{backgroundColor: note.color}}

            onClick={(e) => {
              e.stopPropagation();
              handleCardClick(note.id);
            }}
          >
            <h3>{note.title}</h3>
            <p>{note.content}</p>
            <small>{note.timestamp}</small>
            <div className="note-actions">
              <button onClick={() => handleEditNote(note)}>Edit</button>
              <button onClick={() => handleDeleteNote(note.id)}>Delete</button>
              <button onClick={() => handlePinNote(note.id)}>
                {note.pinned ? "Unpin" : "Pin"}
              </button>
            </div>
          </div>
         
        ))}
        {filteredNotes.length === 0 && (
          <p className="no-notes">No notes found...</p>
        )}
      </div>
    </motion.div>
  </motion.div>
  );
};

export default Notes;
