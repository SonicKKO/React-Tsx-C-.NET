import React from 'react';
import '../assets/components/Header.css';   
import chatImg   from '../assets/img/messege.png';
import ReactTsx from '../assets/img/ReactTsx.png';

const Header: React.FC = () => {
    // const [showElement, setShowElement] = useState(false);


    // const toggleElement = () => {
    //   setShowElement(!showElement);
    // };

    // const hideElement = () => {
    //   setShowElement(false); 
    // };

  return (
    <div className="header">

     <div className='header-container'>
      <div className="logo-section" >
        <img src={ReactTsx} alt="logo" className="logo-image" />
      </div>

      <div className='list-container'>
        <ul>
          <li>shop</li>
          <li>profile</li>
          <li>about the project</li>
          <li><img src={chatImg} className='chat-image' /></li>
        </ul>
      </div>        
     </div>


      {/* <div className="right-section">
        <h1 className="profile-link">
          Профиль
        </h1>
        <div className="chat-icon">
          <img src={chatImg} alt="Chat" className="chat-image"  />
        </div>
        <h2 className="menu-icon" onClick={toggleElement}>
          &#8801;
        </h2>

        {showElement && (
          <>
            <div className="backdrop" onClick={hideElement}></div>
            <div className="menu-container">
              <p className="menu-item" >
                Новости
              </p>
              <p className="menu-item">еще чет</p>

                  <button className="logout-button" >
                    Выйти
                  </button>
                  <p className="delete-account" >
                    Удалить аккаунт
                  </p>
                <button className="login-button" >
                  Войти
                </button>
            </div>
          </>
        )}
      </div> */}
    </div>
  );
};

export default Header;

