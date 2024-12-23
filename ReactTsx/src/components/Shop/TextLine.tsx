import React, { useState, useEffect } from 'react';
import '../../assets/components/Shop/TextLine.css'

const TextLine : React.FC = () => {
    const messages = [
        "BUY NOW, PAY LATER OPTIONS AVAILABLE",
        "FREE SHIPPING ON ORDERS $100+ USD"
      ];
    
      const [currentIndex, setCurrentIndex] = useState(0);
    
      useEffect(() => {
        const interval = setInterval(() => {
          setCurrentIndex((prevIndex) => (prevIndex + 1) % messages.length);
        }, 17000); 
    
        return () => clearInterval(interval);
      }, []);
    
      return (
        <div className="text-line">
          <div className="text-container" style={{ transform: `translateY(-${currentIndex * 40}px)` }}>
            {messages.map((message, index) => (
              <p key={index} className="text">{message}</p>
            ))}
          </div>
        </div>
      );
    };

export default TextLine ;
