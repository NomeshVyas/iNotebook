import { useState } from "react";
import NoteContext from "./NoteContext";

const NoteState=(props)=>{
    const notesInitial = [
        {
          "_id": "6463ceeb19bc8db3d512585c",
          "user": "6460a83c2432a271761cf8d2",
          "title": "my 1st Note",
          "description": "my 1st Note Desc",
          "tag": "General",
          "date": "2023-05-16T18:43:55.937Z",
          "__v": 0
        },
        {
          "_id": "646512871bb3914326083aa5",
          "user": "6460a83c2432a271761cf8d2",
          "title": "my 2nd Note",
          "description": "my 2nd Note Desc",
          "tag": "General",
          "date": "2023-05-17T17:44:39.952Z",
          "__v": 0
        },
        {
          "_id": "6463ceeb19b258c8db3d512585c",
          "user": "6460a83c2432a271761cf8d2",
          "title": "my 1st Note",
          "description": "my 1st Note Desc",
          "tag": "General",
          "date": "2023-05-16T18:43:55.937Z",
          "__v": 0
        },
        {
          "_id": "646512875541bb3914326083aa5",
          "user": "6460a83c2432a271761cf8d2",
          "title": "my 2nd Note",
          "description": "my 2nd Note Desc",
          "tag": "General",
          "date": "2023-05-17T17:44:39.952Z",
          "__v": 0
        },
        {
          "_id": "6463c778eeb19bc8db3d512585c",
          "user": "6460a83c2432a271761cf8d2",
          "title": "my 1st Note",
          "description": "my 1st Note Desc",
          "tag": "General",
          "date": "2023-05-16T18:43:55.937Z",
          "__v": 0
        },
        {
          "_id": "645746512871bb3914326083aa5",
          "user": "6460a83c2432a271761cf8d2",
          "title": "my 2nd Note",
          "description": "my 2nd Note Desc",
          "tag": "General",
          "date": "2023-05-17T17:44:39.952Z",
          "__v": 0
        }
      ];
      const [notes, setNotes] = useState(notesInitial);
      
      //// Add a Note
      const addNote=(title, description, tag)=>{
        console.log("Adding a new note")
        const note={
          "_id": "61574t46512871bb3914326083aa5",
          "user": "6460a83c2432a271761cf8d2",
          "title": title,
          "description": description,
          "tag": tag,
          "date": "2023-05-17T17:44:39.952Z",
          "__v": 0
        }
        setNotes(notes.concat(note));
      }

      //// Edit a Note
      const editNote=()=>{

      }

      //// DeleteNote
      const dltNote=()=>{

      }

    return(
        <NoteContext.Provider value={{notes, addNote, editNote, dltNote}}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;