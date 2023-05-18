import React, { useContext } from 'react'
import noteContext from '../context/notes/NoteContext'

const NoteItem = (props) => {
    const context = useContext(noteContext);
    const {dltNote} = context;
    const { note } = props;
    return (
        <div className="col-md-3">
            <div className="card my-2">
                <div className="card-body">
                    <div className="d-flex justify-content-between">
                    <h5 className="card-title">{note.title}</h5><div className="dlt-edit"><i className="fa-solid fa-trash mx-2" onClick={()=>{dltNote(note._id)}}></i><i className="fa-solid fa-pen-to-square"></i></div>
                    </div>
                    {/* <h6 className="card-subtitle mb-2 text-muted"></h6> */}
                    <p className="card-text">{note.description}</p>
                </div>
            </div>
        </div>
    )
}

export default NoteItem