import React, { useContext, useEffect, useRef, useState } from 'react'
import notesContext from '../context/notes/NoteContext';
import NoteItem from './NoteItem';
import AddNote from './AddNote';
// import noteContext from '../context/notes/NoteContext'

const Notes = () => {

    const context = useContext(notesContext);
    const { notes, fetchAllNotes, editNote, dltNote } = context;
    // const context = useContext(noteContext);
    // const {dltNote} = context;
    const editRef = useRef(null);
    const closeModalRef = useRef(null);
    const dltModalRef = useRef(null);
    

    const [editedNote, setEditedNote] = useState({ id: "", eTitle: "", eDescription: "", eTag: "" })
    const [dltModal, setDltModal] = useState({id: "", title: ""})

    useEffect(() => {
        fetchAllNotes();
        // eslint-disable-next-line
    }, [])

    const onChange = (e) => {
        setEditedNote({ ...editedNote, [e.target.name]: e.target.value })
    }
    const updateNote = (currentNote) => {
        editRef.current.click();
        setEditedNote({ id: currentNote._id, eTitle: currentNote.title, eDescription: currentNote.description, eTag: currentNote.tag });
    }
    const handleClickOnUpdateNote = (e) => {
        e.preventDefault();
        editNote(editedNote.id, editedNote.eTitle, editedNote.eDescription, editedNote.eTag);
        closeModalRef.current.click();
    }
    const openDltModal = (currentNote) => {
        dltModalRef.current.click();
        setDltModal({id: currentNote._id, title: currentNote.title})
    }
    const handleClickOnDltNote = (e) => {
        e.preventDefault();
        dltNote(dltModal.id)
        dltModalRef.current.click();
    }
    return (
        <>
            <AddNote />
            {/* Edit Modal */}
            <button ref={editRef} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#editModal">
                Launch demo modal
            </button>
            <div className="modal fade" id="editModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
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
                                    <input type="text" className="form-control" id="eTitle" name='eTitle' aria-describedby="emailHelp" value={editedNote.eTitle} onChange={onChange} />
                                </div>
                                <div className="mb-4">
                                    <label htmlFor="eDescription" className="form-label col-form-label-lg">Description</label>
                                    <textarea type="text" className="form-control form-control-lg eDescription" id="eDescription" name='eDescription' value={editedNote.eDescription} onChange={onChange} />
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
                            <button type="button" className="btn btn-success" onClick={handleClickOnUpdateNote} disabled={editedNote.eTitle.length < 2 || editedNote.eDescription.length < 5} >Update Note</button>
                            <button type="button" ref={closeModalRef} className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        </div>
                    </div>
                </div>
            </div>
            {/* Delete Modal */}
            <button ref={dltModalRef} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#deleteModal">
                Launch demo modal
            </button>
            <div className="modal fade" id="deleteModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">{dltModal.title}</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body h6">
                        <i className="fa-solid fa-triangle-exclamation me-2 text-danger"></i>
                        Are you sure you want to permanently delete this note?
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-danger" onClick={handleClickOnDltNote} >Yes</button>
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">No</button>
                        </div>
                    </div>
                </div>
            </div>
            {/* Notes Section */}
            <div className="row my-3">
                <h2>Your Notes</h2>
                {notes.length === 0 && <h3 className='container d-flex justify-content-center my-2 text-muted'>No Notes to Display</h3>}
                {notes.map((note) => {
                    return <NoteItem key={note._id} note={note} updateNote={updateNote} openDltModal={openDltModal} />
                })}
            </div>
        </>
    )
}

export default Notes