import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import notesContext from '../context/notes/NoteContext';
import alertContext from '../context/alerts/AlertContext';

const Signup = () => {
  const noteContext = useContext(notesContext);
  const { host } = noteContext;
  const altContext = useContext(alertContext);
  const { showAlert } = altContext;
  let navigate = useNavigate();
  const [signupCredentials, setSignupCredentials] = useState({ name: "", email: "", password: "", confirmPass: "" });

  const onChange = (e) => {
    setSignupCredentials({ ...signupCredentials, [e.target.name]: e.target.value })
  }

  const handleSignup = async (e) => {
    e.preventDefault();
    if (signupCredentials.password !== signupCredentials.confirmPass) {
      return alert("password dosen't match with confirm password");
    }
    const url = `${host}/api/auth/createuser`;
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name: signupCredentials.name, email: signupCredentials.email, password: signupCredentials.password })
    })
    const json = await response.json();
    console.log(json);
    if (json.success) {
      navigate("/");
      showAlert("Account Created Successfully.", "success");
    } else {
      showAlert("Error: Invalid Details.", "danger");
    }
  }

  return (
    <form className='container mt-4' onSubmit={handleSignup}>
      <div className="mb-3">
        <label htmlFor="username" className="form-label">User Name</label>
        <input type="text" className="form-control" id="username" name='name' value={signupCredentials.name} onChange={onChange} required />
      </div>
      <div className="mb-3">
        <label htmlFor="signupEmail" className="form-label">Email address</label>
        <input type="email" className="form-control" id="signupEmail" aria-describedby="emailHelp" name='email' value={signupCredentials.email} onChange={onChange} required />
      </div>
      <div className="mb-3">
        <label htmlFor="signupPassword" className="form-label">Password</label>
        <input type="password" className="form-control" id="signupPassword" name='password' value={signupCredentials.password} minLength={5} onChange={onChange} required />
        <div id="emailHelp" className="form-text">Password must be at least 5 characters long.</div>
      </div>
      <div className="mb-3">
        <label htmlFor="signupConfirmPassword" className="form-label">Confirm Password</label>
        <input type="password" className="form-control" id="signupConfirmPassword" name='confirmPass' value={signupCredentials.confirmPass} minLength={5} onChange={onChange} required />
      </div>
      <button type="submit" className="btn btn-primary">Sign Up</button>
    </form>
  )
}

export default Signup