// import React from "react";
import chatImg   from '../../assets/img/messege.png';
import '../../assets/components/Footers/Footer.css';

const Footer = () => {

    return (
    <div className="sm-container">
      <img src={chatImg} alt="yt" className="youtube" />
      <img src={chatImg} alt="inst" className="instagram" />
      <img src={chatImg} alt="tg" className="telegram" />
    </div>
    );
};

export default Footer;
