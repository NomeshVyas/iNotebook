import { useState } from "react";
import NoteContext from "./NoteContext";

const NoteState=(props)=>{
    const s1={
        name: "Nomesh vyas",
        class: "xvi"
    }
    const [state, setState] = useState(s1);
    const update=()=>{
        setTimeout(()=>{
            setState({
                "name": "Nomesh dadhich",
                "class": "x"
            })
        }, 5000)
    }
    return(
        <NoteContext.Provider value={{state, update}}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;