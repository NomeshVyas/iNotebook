import React from 'react'

const NoteItem = (props) => {
    const { note, updateNote, openDltModal } = props;
    return (
        <div className="col-md-3" >
            <div className="card my-2">
                <div className="card-body">
                    <div className="d-flex justify-content-between mb-1">
                        <h5 className="card-title text-break w-75 pt-1">{note.title}</h5><div className="dlt-edit d-flex flex-column"><i className="fa-solid fa-pen-to-square m-1" onClick={() => { updateNote(note) }}></i><i className="fa-solid fa-trash m-1" onClick={() => { openDltModal(note) }}></i></div>
                    </div>
                    <p className="card-text">{note.description}</p>
                </div>
            </div>
        </div>
    )
}

export default NoteItem