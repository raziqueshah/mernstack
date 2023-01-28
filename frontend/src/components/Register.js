import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';

const Register = () => {

  const [value, setValue] = useState({
    name: '',
    email: '',
    phone: '',
    work: '',
    password: '',
    cpassword: ''
  })

  const navigate = useNavigate();

  const handleChange = (e)=>{
    let val = e.target.value;

    setValue({
      ...value,
      [e.target.name] : val
    })
  }

  const handleSubmit = (e)=>{
      e.preventDefault();
  }

  const handleClick = async() => {
    const {name, email, phone, work, password, cpassword} = value;
    console.log(value);
    const res = await fetch("/signup",{
      method:"POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name, email, phone, work, password, cpassword
      })
    });

    const data = await res.json();
    console.log(data)
    if(data.status === 422 || !data){
      window.alert("invalid Registration");
      console.log("invalid Registration")
    }else{
      window.alert("user register successful");
      console.log("user register successful");
      
      navigate('/login')
    }
  }

  return (
    <>
    <div className="card mt-5">
      <div className="card-body">
        <h1>Sign up</h1>
        <form method='POST' onSubmit={handleSubmit}>
          <div className="form-group mt-3">
            <label htmlFor="name">Your Name</label>
            <input type="text" value={value.name} name='name' className="form-control" id="name" placeholder="Your Name" onChange={handleChange} />
          </div>
          <div className="form-group mt-2">
            <label htmlFor="email">Email address</label>
            <input type="email" value={value.email} name='email' className="form-control" id="email" placeholder="Enter email" onChange={handleChange} />
           
          </div>
          <div className="form-group mt-2">
            <label htmlFor="phone">Mobile Number</label>
            <input type="number" value={value.phone} name='phone' className="form-control" id="phone" placeholder="Your Mobile Number" onChange={handleChange} />
           
          </div>
          <div className="form-group mt-2">
            <label htmlFor="work">Your Profession</label>
            <input type="text" value={value.work} name='work' className="form-control" id="work" placeholder="Your Name" onChange={handleChange} />
           
          </div>
          <div className="form-group mt-2">
            <label htmlFor="password">Password</label>
            <input type="password" value={value.password} name='password' className="form-control" id="password" placeholder="Password" onChange={handleChange} />
          </div>
          <div className="form-group mt-2">
            <label htmlFor="cpassword">Confirm Password</label>
            <input type="password" value={value.cpassword} name='cpassword' className="form-control" id="cpassword" placeholder="Confirm Password" onChange={handleChange} />
          </div>
          <button className="btn btn-primary mt-3" onClick={handleClick}>Submit</button> <Link to='/login'><span>Already have an account ?</span></Link>
        </form>
      </div>
    </div>
    </>
  )
}

export default Register