import React, { useState } from "react";
import { useCart } from "../../context/CartContext";
import '../../assets/pages/ShopCard.css';

interface KendamaCardProps {
  id: string;
  name: string;
  brand: string;
  price: number;
  imageUrl: string;
  imageUrlHover?: string;
}

const ShopCard: React.FC<KendamaCardProps> = ({
  id,
  name,
  brand,
  price,
  imageUrl,
  imageUrlHover
}) => {

  const { addToCart, decreaseQuantity, removeFromCart } = useCart();

  const [ count, setCount] = useState(1);
  const [isRemoving, setIsRemoving] = useState(false);

  const handleRemove = () => {
    setIsRemoving(true);
    setTimeout(() => removeFromCart(id), 300); // Удаляем через 300мс после анимации
  };

  const Minus = () => {
    if(count > 1) {
      setCount( count - 1 );
      decreaseQuantity(id);
    } else {
      handleRemove();
    }
  
  }

  const Plus = () => {
    setCount( count +1 );
    addToCart( id, price)
  }



  
  return (
    <div className={`shop-card-container ${isRemoving ? "removing" : ""}`}>
      <img
        src={imageUrl}
        alt={name}
        onMouseOver={(e) =>
          imageUrlHover && (e.currentTarget.src = imageUrlHover)
        }
        onMouseOut={(e) => (e.currentTarget.src = imageUrl)}
      />
      <div>
        <p>{brand}</p>
        <h1>{name}</h1>
        <div className="btn-container">
          <p>{price !== undefined ? `${price.toFixed(2)}` : 'Price not available'}</p> 

          <button className="minus"
                  onClick={Minus} >-</button>
          <span className="quantity" >{count}</span>
          <button className="plus"
                  onClick={Plus} >+</button>
        </div>

          <button className="delete-button"
                  onClick={ handleRemove}>
                  &#128465;
          </button>

      </div>
    </div>
  );
};

export default ShopCard;

