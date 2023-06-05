import { useState } from "react";
import NoteContext from "./NoteContext";

const NoteState = (props) => {
  const host = "http://localhost:5000";
  const notesInitial = [];
  const [notes, setNotes] = useState(notesInitial);

  //// Get all Notes
  const fetchAllNotes = async () => {
    const url = `${host}/api/notes/fetchallnotes`;
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token")
      }
    });
    const json = await response.json();
    setNotes(json);
  }

  //// Add a Note
  const addNote = async (title, description, tag) => {
    //// API Call
    const url = `${host}/api/notes/addnote`
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token")
      },
      body: JSON.stringify({ title, description, tag }),
    });
    const newNote = await response.json();
    const note = {
      _id: newNote._id,
      title: title,
      description: description,
      tag: tag,
    }
    setNotes(notes.concat(note));
  }

  //// Edit a Note
  const editNote = async (id, title, description, tag) => {
    //// API Call
    const url = `${host}/api/notes/updatenote/${id}`
    const response = await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token")
      },
      body: JSON.stringify({ title, description, tag })
    });
    const json = await response.json();
    //// Logic to edit in Client
    let afterEditNotes = JSON.parse(JSON.stringify(notes));
    for (let index = 0; index < notes.length; index++) {
      const element = afterEditNotes[index];
      if (element._id === id) {
        element.title = title;
        element.description = description;
        element.tag = tag;
        break;
      }
    }
    setNotes(afterEditNotes)
    // fetchAllNotes()
  }

  //// Delete a Note
  const dltNote = async (id) => {
    const url = `${host}/api/notes/deletenote/${id}`;
    const response = await fetch(url, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token")
      }
    });
    const newNote = notes.filter((note) => { return note._id !== id });
    setNotes(newNote);
  }
  return (
    <NoteContext.Provider value={{ host, notes, addNote, editNote, dltNote, fetchAllNotes }}>
      {props.children}
    </NoteContext.Provider>
  )
}

export default NoteState;