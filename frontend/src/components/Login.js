import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';

import { UserContext } from '../App';

const Login = () => {
  const {state, dispatch} = useContext(UserContext);

  const navigate = useNavigate();
    const [val, setval] = useState({
      email: '',
      password: ''
    })

    const changeInput = (e) => {
        let target = e.target.value;

        setval({
          ...val,
          [e.target.name]:target
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
    }

    const handleClick = async() => {
      const {email, password} = val;

      const res = await fetch('/signin',{
        method: "POST",
        headers: {
          "Content-Type":"application/json"
        },
        body: JSON.stringify({
          email, password
        })
      });

      const data = await res.json();
      console.log(data);

      if(res.status === 400 || !data){
        window.alert("Invalid Credentials");
      }else{
        dispatch({type: "USER", payload: true})
        window.alert("Login Successful");
        navigate('/');
      }


    }

  return (
    <>
     <div className="card mt-5">
      <div className="card-body">
        <h1>Login</h1>
      <form onSubmit={handleSubmit} method="POST">
        <div className="form-group mt-3">
          <label htmlFor="email">Email address</label>
          <input type="email" name='email' value={val.email} className="form-control" id="email" placeholder="Enter email" onChange={changeInput} />
        </div>
        <div className="form-group mt-3">
          <label htmlFor="password">Password</label>
          <input type="password" name='password' value={val.password} className="form-control" id="password" placeholder="Password" onChange={changeInput} />
        </div>
        <button type="submit" className="btn btn-primary mt-3" onClick={handleClick}>Submit</button> <Link to='/register'><span>Create an Account</span></Link>
      </form>
      </div>
    </div>
    </>
  )
}

export default Login