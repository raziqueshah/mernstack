import React,{useEffect, useState} from 'react';

const Home = () => {

  const [userName, setUserName] = useState("");
  const [show, setShow] = useState(false);

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
          setUserName(data.name);
          setShow(true);

        } catch (err) {
          console.log(err);
        }
  }

  useEffect(() => {
    callContactPage();
    // eslint-disable-next-line
  }, []);

  return (
    <>
    <p>WELCOME</p>
    <h1>{ userName }</h1>
    <h2>{ show ? "Happy, To see you back" : "We Are The MERN Developer"}</h2>
    </>
  )
}

export default Home