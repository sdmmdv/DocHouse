import React, { useRef, useState } from 'react';
import consultingIMG from '../../assets/consulting.png';
import { NavLink } from 'react-router-dom';
import emailjs from '@emailjs/browser';
import '../../styles/homePageBody.css';


const Header = (props) => {

  const form = useRef();

  const [user_email, setUserEmail] = useState('');

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs.send('service_vjbae72', 'template_qx9shek', {user_email}, 'ZQpMpJvnBWcVY4by_')
      .then((result) => {
          console.log(result.text);
          setUserEmail('')
      }, (error) => {
          console.log(error.text);
      });
  };

  return (
  <div className="dh__body section__padding" id="home">
    <div className="dh__body-content">
      <h1>DocHouse eMED services</h1>
      <p>
          DocHouse is a medical appointment platform providing services between
          patients and professional doctors of distinct medical fields. After long queue times,
          crowdy hospitals, unscheduling patient registration and several other problems, we decided
          to build appointment portal which will make your medical sessions extremely easy and pleasant.
          We opened our doors for the professional doctors who aspire to schedule efficiently, 
          and extend their medical services beyond the millions of users. To enjoy our services and
          explore many features we provide, you need to&nbsp;
              <NavLink className={props.link} to="/log-transition"> 
                  sign up
              </NavLink>.            
      </p>
      <p>
          With just registering to our services, you may consult with qualifed doctors corresponding
          your health issues, as well as review doctors after the medical experience. You may edit your profiles and make written communication with doctors.
          As a doctor you can react to patients requests, and edit your portofilio to gain a ground
          among other professional doctors.
      </p>

      <form onSubmit={sendEmail} id="subsform">
      <p>
        Dig deeper into the medical researchs and health topics you care about most by subscribing to our newsletter.
      </p>

      <div className="dh__body-content__input">
        <input type="email" placeholder="Enter your e-mail address!" onChange = {(e) => setUserEmail(e.target.value)} value = {user_email} />
        <button type="submit">Subscribe</button>
      </div>
      </form>
    </div>

    <div className="dh__body-image">
      <img src={consultingIMG} alt=""/>
    </div>
  </div>
  )
};

export default Header;
