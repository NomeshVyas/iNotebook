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

    const [modalNote, setModalNote] = useState({id: "", eTitle:"", eDescription:"", eTag: ""})

    const handleClickOnUpdateNote=(e)=>{
        e.preventDefault();
        editNote(modalNote.id, modalNote.eTitle, modalNote.eDescription, modalNote.eTag);
        console.log("updating the note", modalNote);
        closeModalRef.current.click();
    }
    
    const onChange=(e)=>{
        setModalNote({...modalNote, [e.target.name]: e.target.value})
    }
    const updateNote = (currentNote) => {
        editRef.current.click();
        setModalNote({id: currentNote._id, eTitle: currentNote.title, eDescription: currentNote.description, eTag: currentNote.tag});
        
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
                                <div className="mb-3">
                                    <label htmlFor="eTitle" className="form-label">Title</label>
                                    <input type="text" className="form-control" id="eTitle" name='eTitle' aria-describedby="emailHelp" value={modalNote.eTitle} onChange={onChange} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="eDescription" className="form-label col-form-label-lg">Description</label>
                                    <input type="text" className="form-control form-control-lg" id="eDescription" name='eDescription' value={modalNote.eDescription} onChange={onChange} />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label" htmlFor="eTag">Tag</label>
                                    <input type="text" className="form-control" id="eTag" name='eTag' value={modalNote.eTag} onChange={onChange} />
                                </div>
                                <button type="submit" className="btn btn-primary" >Submit</button>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" ref={closeModalRef} className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-primary" onClick={handleClickOnUpdateNote}>Update Note</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row my-3">
                <h2>Your Notes</h2>
                {notes.map((note) => {
                    return <NoteItem key={note._id} note={note} updateNote={updateNote} />
                })}
            </div>
        </>
    )
}

export default Notes