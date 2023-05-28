import React from 'react'

const NoteItem = (props) => {
    const { note, updateNote, openDltModal } = props;
    return (
        <div className="col-md-3">
            <div className="card my-2">
                <div className="card-body">
                    <div className="d-flex justify-content-between">
                    <h5 className="card-title">{note.title}</h5><div className="dlt-edit"><i className="fa-solid fa-trash mx-2" onClick={()=>{openDltModal(note)}}></i><i className="fa-solid fa-pen-to-square" onClick={()=>{updateNote(note)}}></i></div>
                    </div>
                    <p className="card-text">{note.description}</p>
                </div>
            </div>
        </div>
    )
}

export default NoteItem