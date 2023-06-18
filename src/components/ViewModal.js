import React, { useContext } from 'react'
import notesContext from '../context/notes/NoteContext';

const ViewModal = () => {
    const noteContext = useContext(notesContext);
    const { viewRef, viewCloseRef, tagColorChange, editedNote, noteEditable, setNoteEditable, onChangeEditedNote, openDltModal, handleClickOnUpdateNote } = noteContext;
    return (
        <>
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
                                <span className="badge rounded-pill ms-2" style={{ background: tagColorChange(editedNote.eTag), fontWeight: "500", fontSize: "0.85rem" }}>
                                    {editedNote.eTag}
                                </span>
                            </h5>
                            <button type="button" className="btn-close" onClick={() => { setNoteEditable(false); }} ref={viewCloseRef} data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body mt-1 d-flex flex-column justify-content-center align-items-center">
                            <input type="text" className="form-control viewTitle" id="eTitle" name='eTitle' aria-describedby="emailHelp" value={editedNote.eTitle} minLength={2} maxLength={120} onChange={onChangeEditedNote} disabled={!noteEditable} />
                            <textarea type="text" className="p-2 viewDescription border border-1" id="viewDescription" name='eDescription' placeholder='Description' value={editedNote.eDescription} onChange={onChangeEditedNote} disabled={!noteEditable} />
                        </div>
                        <div className="modal-footer m-0 p-1">
                            <button type="button" className="btn btn-secondary viewModalDltBtn me-2" onClick={() => { openDltModal(editedNote) }}><i className="fa-solid fa-trash m-1"></i> Dlt</button>
                            {noteEditable ? <button type="button" className="btn btn-secondary viewModalEditBtn" onClick={handleClickOnUpdateNote} disabled={editedNote.eTitle.length < 2 || editedNote.eDescription.length < 5}><i className="fa-solid fa-pen-to-square m-1"></i> Save</button> : <button type="button" className="btn btn-secondary viewModalEditBtn px-3" onClick={() => { setNoteEditable(true); }}><i className="fa-solid fa-pen-to-square m-1"></i> Edit</button>}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ViewModal