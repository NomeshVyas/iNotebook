import React from 'react'

const NoteItem = (props) => {
    const { note } = props
    return (
        <div className="col-md-3">
            <div className="card my-2">
                <div className="card-body">
                    <div className="d-flex justify-content-between">
                    <h5 className="card-title">{note.title}</h5><div className="dlt-edit"><i className="fa-solid fa-trash mx-2"></i><i className="fa-solid fa-pen-to-square"></i></div>
                    </div>
                    {/* <h6 className="card-subtitle mb-2 text-muted"></h6> */}
                    <p className="card-text">{note.description} Lorem ipsum, dolor sit amet consectetur adipisicing elit. Perspiciatis quisquam similique culpa! Asperiores id soluta placeat nisi, sequi similique at reprehenderit distinctio impedit, delectus suscipit.</p>
                </div>
            </div>
        </div>
    )
}

export default NoteItem