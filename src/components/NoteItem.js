import React from 'react'

const NoteItem = (props) => {
    const { note, viewNoteModal } = props;
    return (
        <div className="col-md-3">
            <div className="card m-2 overflow-hidden position-relative" onClick={() => { viewNoteModal(note) }}>
                <span
                    className="badge bg-secondary"
                    style={{
                        position: "absolute",
                        top: "-0.75%",
                        right: "-1%",
                        // backgroundColor: "#C70039",
                        // backgroundColor: "#ff5b6f",
                        // backgroundColor: "#00afef",
                    }}
                >
                    {note.tag}
                </span>
                <div className="card-body" style={{ height: "250px" }}>
                    <div className="d-flex justify-content-between mb-1">
                        <h5 className="card-title text-break pt-1">{note.title}</h5>
                        {/* <div className="dlt-edit d-flex flex-column">
                            <i className="fa-solid fa-pen-to-square m-1" onClick={() => { updateNote(note) }}></i><i className="fa-solid fa-trash m-1" onClick={() => { openDltModal(note) }}></i>
                        </div> */}
                    </div>
                    <p className="card-text">{note.description}</p>
                </div>
            </div>
        </div>
    )
}

export default NoteItem