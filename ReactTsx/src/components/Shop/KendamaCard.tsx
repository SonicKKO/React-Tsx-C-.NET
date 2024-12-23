import { useState } from 'react';
import { useCart } from '../../context/CartContext';

import '../../assets/components/Shop/KendamaCard.css';

interface  KendamaCardProps {
  id: string;
  img: string;
  hoverImg: string;
  name: string;
  price: number;
  onAddToCart: () => void;
};



function KendamaCard({ id, img, hoverImg, name, price }: KendamaCardProps) {
  const { addToCart } = useCart();
    const [isHovered, setIsHovered] = useState(false);

    return (
        <div className='card-container'
             onMouseEnter={() => setIsHovered(true)}
             onMouseLeave={() => setIsHovered(false)}        
        >
            <img src={isHovered ? hoverImg : img} 
                 alt={name} />
            <p>{name}</p>
            <p style={{ fontWeight: 'bold' }}>${price}</p>
            
            <div className='btn'>
              <button onClick={() => addToCart(id, price)}> Add to cart </button>                 
            </div>


        </div>
    );
};

export default KendamaCard;