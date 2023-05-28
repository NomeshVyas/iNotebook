import React, { useContext, useEffect, useRef, useState } from 'react'
import notesContext from '../context/notes/NoteContext';
import NoteItem from './NoteItem';
import AddNote from './AddNote';

const Notes = () => {
    const context = useContext(notesContext);
    const { notes, fetchAllNotes, editNote } = context;
    const editRef = useRef(null);
    const closeModalRef = useRef(null);
    useEffect(() => {
        fetchAllNotes();
        // eslint-disable-next-line
    }, [])

    const [editedNote, setEditedNote] = useState({ id: "", eTitle: "", eDescription: "", eTag: "" })

    const handleClickOnUpdateNote = (e) => {
        e.preventDefault();
        editNote(editedNote.id, editedNote.eTitle, editedNote.eDescription, editedNote.eTag);
        closeModalRef.current.click();
    }

    const onChange = (e) => {
        setEditedNote({ ...editedNote, [e.target.name]: e.target.value })
    }
    const updateNote = (currentNote) => {
        editRef.current.click();
        setEditedNote({ id: currentNote._id, eTitle: currentNote.title, eDescription: currentNote.description, eTag: currentNote.tag });

    }
    return (
        <>
            <AddNote />
            {/* Edit Modal */}
            <button ref={editRef} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
                Launch demo modal
            </button>

            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Modal title</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form>
                                <div className="mb-2">
                                    <label htmlFor="eTitle" className="form-label">Title</label>
                                    <input type="text" className="form-control" id="eTitle" name='eTitle' aria-describedby="emailHelp" value={editedNote.eTitle} onChange={onChange}/>
                                </div>
                                <div className="mb-4">
                                    <label htmlFor="eDescription" className="form-label col-form-label-lg">Description</label>
                                    <input type="text" className="form-control form-control-lg" id="eDescription" name='eDescription' value={editedNote.eDescription} onChange={onChange}/>
                                </div>
                                <div className="input-group mb-1">
                                    <label htmlFor="tag" className="input-group-text">Tag</label>
                                    <select className="form-select" id="eTag" aria-label="Floating label select example" name='eTag' value={editedNote.eTag} onChange={onChange}>
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
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" ref={closeModalRef} className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-primary" onClick={handleClickOnUpdateNote} disabled={editedNote.eTitle.length<2 || editedNote.eDescription<5} >Update Note</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row my-3">
                <h2>Your Notes</h2>
                {notes.length===0 && <h3 className='container d-flex justify-content-center my-2 text-muted'>No Notes to Display</h3>}
                {notes.map((note) => {
                    return <NoteItem key={note._id} note={note} updateNote={updateNote} />
                })}
            </div>
        </>
    )
}

export default Notes