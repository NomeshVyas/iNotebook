import React, { useContext, useEffect } from 'react'
import NoteState from '../context/notes/NoteContext'

const About = () => {
  const noteStateData = useContext(NoteState);
  useEffect(()=>{
    noteStateData.update();
    // eslint-disable-next-line
  }, [])
  return (
    <div>About {noteStateData.state.name} and his {noteStateData.state.class} class</div>
  )
}

export default About