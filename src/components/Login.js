import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import notesContext from '../context/notes/NoteContext'
import alertContext from '../context/alerts/AlertContext';


const Login = () => {
  const noteContext = useContext(notesContext);
  const { host } = noteContext;
  const altContext = useContext(alertContext);
  const { setLoadingProgress, showAlert } = altContext;
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  let navigate = useNavigate();

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  }

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoadingProgress(20);
    const url = `${host}/api/auth/login`;
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: credentials.email, password: credentials.password })
    });
    setLoadingProgress(70);
    const json = await response.json();
    if (json.success) {
      // redirect
      localStorage.setItem("token", json.authToken);
      navigate("/");
      showAlert("Logged in Successfully.", "primary")
    } else {
      showAlert("Error: Invalid Email or Password.", "danger")
    }
    setLoadingProgress(100);

  }

  return (
    <div className='container mt-4'>
      <h1 className='text-center'>Login to iNotebook</h1>
      <form onSubmit={handleLogin}>
        <div className="mb-3">
          <label htmlFor="loginEmail" className="form-label">Email address</label>
          <input type="email" className="form-control" id="loginEmail" name='email' value={credentials.email} aria-describedby="emailHelp" onChange={onChange} />
          <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
        </div>
        <div className="mb-3">
          <label htmlFor="loginPassword" className="form-label">Password</label>
          <input type="password" className="form-control" id="loginPassword" name='password' value={credentials.password} onChange={onChange} />
        </div>
        <button type="submit" className="btn btn-primary">Login</button>
      </form>
    </div>
  )
}

export default Login