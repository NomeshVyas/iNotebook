import React, { useContext, useEffect, useRef, useState } from 'react';
import notesContext from '../context/notes/NoteContext';
import NoteItem from './NoteItem';
import AddNote from './AddNote';
import alertContext from '../context/alerts/AlertContext';
import { useNavigate } from 'react-router-dom';

const Notes = () => {
    const noteContext = useContext(notesContext);
    const { notes, fetchAllNotes, editNote, dltNote } = noteContext;
    const altContext = useContext(alertContext);
    const { setLoadingProgress, showAlert } = altContext;
    let navigate = useNavigate();

    const viewRef = useRef(null);
    const viewCloseRef = useRef(null);
    const dltModalRef = useRef(null);

    // const [viewNote, setViewNote] = useState({ _id: "", title: "", description: "", tag: "" })
    const [editedNote, setEditedNote] = useState({ id: "", eTitle: "", eDescription: "", eTag: "" })
    const [noteEditable, setNoteEditable] = useState(false)
    const [dltModal, setDltModal] = useState({ id: "", title: "" })

    useEffect(() => {
        if (localStorage.getItem("token")) {
            fetchAllNotes();
        } else {
            navigate("/login");
        }
        // eslint-disable-next-line
    }, [])

    const onChange = (e) => {
        setEditedNote({ ...editedNote, [e.target.name]: e.target.value })
    }
    const viewNoteModal = (currentNote) => {
        viewRef.current.click();
        setEditedNote({ id: currentNote._id, eTitle: currentNote.title, eDescription: currentNote.description, eTag: currentNote.tag });
    }
    const updateNote = () => {
        setNoteEditable(true);
    }
    const handleClickOnUpdateNote = (e) => {
        e.preventDefault();
        setLoadingProgress(20);
        editNote(editedNote.id, editedNote.eTitle, editedNote.eDescription, editedNote.eTag);
        showAlert(`"${editedNote.eTitle}" has been updated Successfully.`, "primary")
        setNoteEditable(false)
        setLoadingProgress(100);
    }
    const openDltModal = (currentNote) => {
        setDltModal({ id: currentNote.id, title: currentNote.title })
        dltModalRef.current.click();
    }
    const handleClickOnDltNote = (e) => {
        e.preventDefault();
        setNoteEditable(false);
        viewCloseRef.current.click();
        setLoadingProgress(20);
        dltNote(dltModal.id)
        dltModalRef.current.click();
        showAlert("Your note has been deleted successfully.", "primary")
        setLoadingProgress(100);
    }
    return (
        <>
            <AddNote />
            {/* View Modal */}
            <button ref={viewRef} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#viewModal">
                Launch demo modal
            </button>
            <div className="modal fade" id="viewModal" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="viewModal" aria-hidden="true">
                <div className="modal-dialog modal-fullscreen">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="viewModalTitle">
                                <img style={{ width: "25px", borderRadius: "50%", marginTop: "-3px" }} src="https://w7.pngwing.com/pngs/739/481/png-transparent-note-taking-reading-writing-taking-miscellaneous-angle-text-thumbnail.png" alt="" /> 
                                <span className='text-info'>i</span>Notebook
                                <span className="badge rounded-pill ms-2" style={{backgroundColor: "#00afef", fontWeight: "500", fontSize: "0.85rem"}}>
                                    {editedNote.eTag}
                                </span>
                            </h5>
                            <button type="button" className="btn-close" onClick={() => { setNoteEditable(false); }} ref={viewCloseRef} data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body mt-1 d-flex flex-column justify-content-center align-items-center">
                            <input type="text" className="form-control viewTitle" id="eTitle" name='eTitle' aria-describedby="emailHelp" value={editedNote.eTitle} minLength={2} maxLength={120} onChange={onChange} disabled={!noteEditable} />
                            <textarea type="text" className="p-2 viewDescription border border-1" id="viewDescription" name='eDescription' placeholder='Description' value={editedNote.eDescription} onChange={onChange} disabled={!noteEditable} />
                        </div>
                        <div className="modal-footer m-0 p-1">
                            <button type="button" className="btn btn-secondary viewModalDltBtn me-2" onClick={() => { openDltModal(editedNote) }}><i className="fa-solid fa-trash m-1"></i> Dlt</button>
                            {noteEditable ? <button type="button" className="btn btn-secondary viewModalEditBtn" onClick={handleClickOnUpdateNote} disabled={editedNote.eTitle.length < 2 || editedNote.eDescription.length < 5}><i className="fa-solid fa-pen-to-square m-1"></i> Save</button> : <button type="button" className="btn btn-secondary viewModalEditBtn px-3" onClick={updateNote}><i className="fa-solid fa-pen-to-square m-1"></i> Edit</button>}
                        </div>
                    </div>
                </div>
            </div>
            {/* Edit Modal */}
            {/* <button ref={editRef} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#editModal">
                Launch demo modal
            </button> */}
            {/* <div className="modal fade" id="editModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Update</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form>
                                <div>
                                    <label htmlFor="eTitle" className="form-label d-none">Title</label>
                                    <input type="text" className="form-control fs-4 title" id="eTitle" name='eTitle' placeholder='Title' aria-describedby="emailHelp" value={editedNote.eTitle} minLength={2} maxLength={120} onChange={onChange} />
                                </div>
                                <hr style={{ marginBlock: "0" }} />
                                <div className="mb-4">
                                    <label htmlFor="eDescription" className="form-label col-form-label-lg d-none">Description</label>
                                    <textarea type="text" className="form-control form-control-lg description" id="eDescription" name='eDescription' placeholder='Description' value={editedNote.eDescription} onChange={onChange} />
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
                            <button type="button" className="btn btn-primary" onClick={handleClickOnUpdateNote} disabled={editedNote.eTitle.length < 2 || editedNote.eDescription.length < 5} >Update Note</button>
                            <button type="button" ref={editModalRef} className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        </div>
                    </div>
                </div>
            </div> */}
            {/* Delete Modal */}
            <button ref={dltModalRef} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#deleteModal">
                Launch demo modal
            </button>
            <div className="modal fade" id="deleteModal" tabIndex="-1" data-bs-backdrop="static" data-bs-keyboard="false" aria-labelledby="deleteModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title text-break me-2" id="exampleModalLabel">{dltModal.title}</h5>
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
            {localStorage.getItem('token') &&
                <div className="row my-3">
                    <h2>Your Notes</h2>
                    {notes.length === 0 && <h3 className='container d-flex justify-content-center my-2 text-muted'>No Notes to Display</h3>}
                    {notes.map((note) => {
                        return <NoteItem key={note._id} note={note} viewNoteModal={viewNoteModal} updateNote={updateNote} openDltModal={openDltModal} />
                    })}
                </div>}
        </>
    )
}

export default Notes