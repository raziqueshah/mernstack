import React,{useEffect, useState} from 'react';

const Contact = () => {
  const handleSubmit = (e)=>{
      e.preventDefault();
  }

  const [userData, setUserData] = useState({
    name:"",
    email:"",
    phone:"",
    message:"",
  });

  const callContactPage = async() => {
        try {
          const res = await fetch('/getcontact',{
            method: 'GET',
            headers: {
              "Content-Type": "application/json"
            }

          });

          const data = await res.json();
          console.log(data);
          setUserData({...userData,
            name:data.name,
            email:data.email,
            phone:data.phone,});

          if(!res.status === 200){
            const error = new Error(res.error);
            throw error;
          }

        } catch (err) {
          console.log(err);
        }
  }

  useEffect(() => {
    callContactPage();
    // eslint-disable-next-line
  }, []);

  const handleChange = (e) => {
      const name = e.target.name;
      const value = e.target.value;
      setUserData({
        ...userData,
        [name]:value
      });
  }

  const handleClick = async() => {
    const {name, email, phone, message} = userData;

    const res = await fetch('/contact',{
      method: 'POST',
      headers:{
        "Content-Type": "application/json"
      },
      body:JSON.stringify({
        name, email, phone, message
      })
    });

    const data = await res.json();

    if(!data){
      console.log("message not send")
    }else{
      alert("message sent successfully");
      setUserData({...userData, message:""});
    }

  }

  return (
    <>
      <div className="card mt-5">
      <div className="card-body">
        <h1>Get In Touch</h1>
      <form onSubmit={handleSubmit} method='POST'>
        <div className="row mt-5">
          <div className="col">
            <input type="text" className="form-control" name='name' value={userData.name} onChange={handleChange} placeholder="Your name" />
          </div>
          <div className="col">
            <input type="email" className="form-control" name='email' value={userData.email} onChange={handleChange} placeholder="Your email" />
          </div>
          <div className="col">
            <input type="number" className="form-control" name='phone' value={userData.phone} onChange={handleChange} placeholder="Your mobile number" />
          </div>
        </div>
        <div className="form-group mt-5">
          <textarea className="form-control" id="exampleFormControlTextarea1" rows="3" name='message' value={userData.message} onChange={handleChange} placeholder='Message'></textarea>
        </div>
        <button type="submit" className="btn btn-primary mt-5" onClick={handleClick}>Send Message</button>
      </form>
        </div>
      </div>
    </>
  )
}

export default Contact