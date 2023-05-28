import React, { useContext, useState } from 'react';
import noteContext from '../context/notes/NoteContext';

const AddNote = () => {
    const context = useContext(noteContext);
    const { addNote } = context;

    const [note, setNote] = useState({ title: "", description: "", tag: "default" })

    const handleClickOnAddNote = (e) => {
        e.preventDefault();
        addNote(note.title, note.description, note.tag);
        setNote({ title: "", description: "", tag: "General" })
    }

    const onChange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value });
    }

    return (
        <div className="container my-3">
            <h2>Add a Note</h2>
            <form>
                <div className="">
                    <label htmlFor="title" className="form-label col-form-label-lg d-none">Title</label>
                    <input type="text" className="form-control form-control-lg title" id="title" name='title' aria-describedby="emailHelp" placeholder='Title' value={note.title} onChange={onChange} />
                </div>
                <hr style={{marginBlock: "0"}} />
                <div className="mb-2">
                    <label htmlFor="description" className="form-label col-form-label-lg d-none">Description</label>
                    <textarea type="text" className="form-control description" id="description" name='description' placeholder='Description' value={note.description} onChange={onChange} />
                </div>
                <div className="input-group my-3">
                    <label htmlFor="tag" className="input-group-text">Tag</label>
                    <select className="form-select" id="floatingSelect" aria-label="Floating label select example" name='tag' value={note.tag} onChange={onChange}>
                        <option value="General">General</option>
                        <option value="Personal">Personal</option>
                        <option value="Important">Important</option>
                        <option value="Quote">Quote</option>
                        <option value="Study">Study</option>
                        <option value="Project">Project</option>
                        <option value="Event">Event</option>
                        <option value="Celebration">Celebration</option>
                        <option value="Statement">Statement</option>
                        <option value="Confused">Confused</option>
                    </select>
                </div>
                <button type="submit" className="btn btn-primary" onClick={handleClickOnAddNote} disabled={note.title.length < 2 || note.description.length < 5} >Submit</button>
            </form>
        </div>
    )
}

export default AddNote