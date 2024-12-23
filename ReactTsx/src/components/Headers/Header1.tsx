import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';

import '../../assets/components/Headers/Header1.css';   

import Notification from '../../components/Notifications/Logout';
import ShopCard from '../Shop/ShopCard';
import ReactTsx from '../../assets/img/ReactTsx.png';

import search from '../../assets/img/Shop/search.png';
import heart from '../../assets/img/Shop/heart.png';
import buy from '../../assets/img/Shop/buy.png';
import user from '../../assets/img/Shop/user.png';
import emptyCart from '../../assets/img/Header/EmptyCart.png';

interface KendamaItem {
  id: string;
  name: string;
  brand: string;
  price: number;
  imageUrl: string;
  imageUrlHover?: string; 
}


const Header1: React.FC = () => {
  const navigate = useNavigate();
  const { cartItems, clearCart, calculateTotalPrice } = useCart();

  const [shopProducts, setShopProducts] = useState<KendamaItem[]>([]);
  const [totalPrice, setTotalPrice] = useState(0);

  const [activeItem, setActiveItem] = useState<string | null>(null); 
  const [showSearch, setShowSearch] = useState<boolean>(false); 
  const [showProfile, setShowProfile] = useState<boolean>(false);
  const [showShop, setShowShop] = useState<boolean>(false);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(true);
  const [notification, setNotification] = useState<boolean>(false);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);

  const sidebarRef = useRef<HTMLDivElement>(null); 
  const sidebarShopRef = useRef<HTMLDivElement>(null);

  const handleMouseEnter = (item: string): void => {
    setActiveItem(item);
    setShowProfile(false); 
    setShowShop(false);
  };

  const handleMouseLeave = (): void => {
    setActiveItem(null);
  };

  const toggleSearch = (): void => {
    setShowSearch(prevShowSearch => !prevShowSearch);
  };

  const toggleProfile = (): void => {
    setShowProfile(prevShowProfile => !prevShowProfile);
  };

  const toogleShop = (): void => {
    setShowShop(prevShowShop => !prevShowShop);
  };

  const toogleNotification = (): void  => {
    setNotification(prevToogleNotification => !prevToogleNotification);
  }

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token); 

    const handleClickOutside = (event: MouseEvent): void => {

      if(notification) return;
      if (sidebarRef.current && !sidebarRef.current.contains(event.target as Node)) {
        setShowProfile(false); 
      }

      if (sidebarShopRef.current && !sidebarShopRef.current.contains(event.target as Node)) {
        setShowShop(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
    
  }, [notification]);

  useEffect(() => {
    const fetchProducts = async  () => {
        // console.log("gbgbcrf", cartItems)
        try {
          const ids = cartItems.map(item => item.id)
          // console.log(ids)
          const responses = await axios.post("http://localhost:5156/api/kendama/ids", ids);
          const products = responses.data;
          setShopProducts(products);
          // console.log(responses.data);
          // console.log(products); 
        } catch (error) {
            console.error("Error fetching products:", error);
          }
    };

    if (cartItems.length > 0) {
      fetchProducts();
    } else {
      setShopProducts([]);
    }
  }, [cartItems]);

  useEffect(() => {
    setTotalPrice(calculateTotalPrice());
    // console.log(totalPrice);
  }, [cartItems]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // console.log(email, password);
      const response = await axios.post('http://localhost:5190/api/Auth/login', {
        email,
        password,
      });

      const { token } = response.data;
      console.log(token);
      localStorage.setItem('token', token);
      
      setError(null);
      setIsLoggedIn(true);

    } catch (error: any) {
      setError('Invalid email or password');
      console.error(error.response.data);
    }
  };

  function Logout() {
    localStorage.removeItem('token'); 
    setIsLoggedIn(false);
    setNotification(false);
  };

  return (
    <div className="header1">
      <div className='header-container1'>
        <div className="logo-section1">
          <img onClick={() => navigate("/shop")}
               src={ReactTsx} alt="logo" 
               className="logo-image1" />
        </div>

        <div className='choice-list'>
          <ul>
            <li><span>ALL KENDAMAS</span></li>

            <li 
              onMouseEnter={() => handleMouseEnter('NEW')} 
              onMouseLeave={handleMouseLeave}
            >
              <span>NEW<span className="arrow">∨</span></span>
              {activeItem === 'NEW' && (
                <div className="dropdown-container">
                  <p>Latest Releases</p>
                  <p>Upcoming Models</p>
                </div>
              )}
            </li>

            <li
              onMouseEnter={() => handleMouseEnter('KROM')} 
              onMouseLeave={handleMouseLeave}
            >
              <span>KROM<span className="arrow">∨</span></span>
              {activeItem === 'KROM' && (
                <div className="dropdown-container">
                  <p>Latest Releases</p>
                  <p>Upcoming Models</p>
                </div>
              )}
            </li>

            <li
              onMouseEnter={() => handleMouseEnter('KUSA')} 
              onMouseLeave={handleMouseLeave} 
            >
              <span>KUSA<span className="arrow">∨</span></span>
              {activeItem === 'KUSA' && (
                <div className="dropdown-container">
                  <p>Latest Releases</p>
                  <p>Upcoming Models</p>
                </div>
              )}
            </li>

            <li
              onMouseEnter={() => handleMouseEnter('OKENDAMAS')} 
              onMouseLeave={handleMouseLeave}
            >
              <span>OKENDAMAS<span className="arrow">∨</span></span>
              {activeItem === 'OKENDAMAS' && (
                <div className="dropdown-container">
                  <p>Latest Releases</p>
                  <p>Upcoming Models</p>
                </div>
              )}
            </li>

            <li
              onMouseEnter={() => handleMouseEnter('ISRAEL')} 
              onMouseLeave={handleMouseLeave}
            >
              <span>ISRAEL<span className="arrow">∨</span></span>
              {activeItem === 'ISRAEL' && (
                <div className="dropdown-container">
                  <p>Latest Releases</p>
                  <p>Upcoming Models</p>
                </div>
              )}
            </li>

            <li><span>SALE</span></li>
            <li><span>ONE MORE</span></li>
          </ul>
        </div>      

        <div className='side-list'> 
          <img 
            src={search} 
            alt="search" 
            onClick={toggleSearch} 
          />
          <img
            src={user} 
            alt="user" 
            onClick={toggleProfile}/>
          <img src={heart} alt="heart" />
          <div className='cart'>
          <img src={buy} 
               alt="buy"
               onClick={toogleShop} />
               <span>{cartItems.length}</span>
          </div>

        </div>
      </div>

      {showSearch && (
        <input 
          type="text" 
          placeholder="Search" 
          className="search-input" 
          onBlur={() => setShowSearch(false)} 
          autoFocus
        />
      )}

      {showProfile && (
        <div className='sidebar-profile' ref={sidebarRef}>
          <h4 onClick={toggleProfile}>Close</h4>
          {isLoggedIn ? (
            <div className='log-out'>
              <p onClick={toogleNotification}>Log out</p>
              <p>My account</p>
            </div>
          ) : (
            <>
              <span onClick={() => { 
                navigate('/register');
                toggleProfile();
              }}>Register</span>
              
              <form onSubmit={handleSubmit}>
                <label> LOGIN
                  <input 
                    type="text"
                    placeholder="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <input 
                    type="password"
                    placeholder="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  {error && <p style={{ color: 'red', fontSize: 'large' }}>{error}</p>}
                  <button type="submit">ENTER</button>
                </label>
              </form>
            </>
          )}
        </div>
      )}

      {showShop && (
        <div className="sidebar-shop" ref={sidebarShopRef}>
          <div style={{ paddingInline: "50px", height: '100%' }}>
            <div className="up-section">
              <button onClick={clearCart}>&#128465; Clear All</button> 
              <h4 onClick={toogleShop}>Close</h4>
            </div>
            <hr />

            {shopProducts.length > 0 ? (
              shopProducts.map((item) => (
                <ShopCard
                  key={item.id} 
                  id={item.id}
                  name={item.name}
                  brand={item.brand}
                  price={item.price}
                  imageUrl={item.imageUrl}
                  imageUrlHover={item.imageUrlHover}
                />
              ))
            ) : (
              <div className='empty-cart'>
                <p>Your cart is empty</p>
                <img src={emptyCart} alt="" />
              </div>
            )}

            {shopProducts.length > 0 && (
              <div className="total-price">
                <p>Total Price: ${totalPrice.toFixed(2)}</p>
              </div>
            )}
          </div>
        </div>
      )}  
      {notification && (
        <Notification Logout={Logout}
                      toogleNotification={toogleNotification} />
      )}
    </div>
  );
};

export default Header1;
