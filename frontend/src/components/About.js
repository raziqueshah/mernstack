import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import razpic from '../images/Office.png';
import rapic from '../images/raz.jpeg'

const About = () => {

  const navigate = useNavigate();
  const [userData, setUserData] = useState({});

  const callAboutPage = async() => {
        try {
          const res = await fetch('/about',{
            method: 'GET',
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json"
            },
            credentials: "include"

          });

          const data = await res.json();
          console.log(data);
          setUserData(data);

          if(!res.status === 200){
            const error = new Error(res.error);
            throw error;
          }

        } catch (err) {
          console.log(err);
          navigate('/login');
        }
  }

  useEffect(() => {
    callAboutPage();
    // eslint-disable-next-line
  }, []);
  
  
  return (
    <>
      <div className="card mt-5">
        <div className="card-body">
          <div className="container">
            <form method="GET">
              <div className="row">
                <div className="col-md-4">
                  <div className="profile-img">
                  <img src={userData.name === "Razique Shah" ? razpic : rapic} alt="razpic" />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="profile-head">
                      <h5>{userData.name}</h5>
                      <h6>{userData.work}</h6>
                      <p className="profile-rating mt-3 mb-5">RANKINGS: <span>1/10</span></p>

                      <ul className="nav nav-tabs" role='tablist'>
                        <li className="nav-item">
                          <NavLink className="nav-link active" id="home-tab" data-toggle='tab' role='tab' to="#home">About</NavLink>
                        </li>
                        <li className="nav-item">
                        <NavLink className="nav-link active" id="profile-tab" data-toggle='tab' role='tab' to="#profile">Timeline</NavLink>
                        </li>
                      </ul>
                  </div>
                </div>
                <div className="col-md-2">
                    <input type="submit" className="profile-edit-btn" name="btnAddMore" value='Edit Profile' />
                </div>
              </div>

              <div className="row">
                {/* left side url */}
                <div className="col-md-4">
                  <div className="profile-work">
                    <p>WORK LINK</p>
                    <NavLink to="https://google.com" target='_blank'>Google</NavLink><br />
                    <NavLink to="https://google.com" target='_blank'>Google</NavLink><br />
                    <NavLink to="https://google.com" target='_blank'>Google</NavLink><br />
                    <NavLink to="https://google.com" target='_blank'>Google</NavLink><br />
                  </div>
                </div>

                {/* right side data toggle */}

                <div className="col-md-8 pl-5 about-info">
                    <div className="tab-content profile-tab" id="myTabContent">
                      <div className="tab-pane fade show active" id="home" role='tabpanel' aria-labelledby="home">
                        <div className="row">
                          <div className="col-md-6">
                            <label>USER ID</label>
                          </div>
                          <div className="col-md-6">
                            <p>{userData._id}</p>
                          </div>
                        </div>
                        <div className="row mt-3">
                          <div className="col-md-6">
                            <label>Name</label>
                          </div>
                          <div className="col-md-6">
                            <p>{userData.name}</p>
                          </div>
                        </div>
                        <div className="row mt-3">
                          <div className="col-md-6">
                            <label>Email</label>
                          </div>
                          <div className="col-md-6">
                            <p>{userData.email}</p>
                          </div>
                        </div>
                        <div className="row mt-3">
                          <div className="col-md-6">
                            <label>Phone</label>
                          </div>
                          <div className="col-md-6">
                            <p>{userData.phone}</p>
                          </div>
                        </div>
                        <div className="row mt-3">
                          <div className="col-md-6">
                            <label>Profession</label>
                          </div>
                          <div className="col-md-6">
                            <p>{userData.work}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default About;
