import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../assets/pages/Shop.css';
import ImageSliader from '../components/Shop/Slider';
import KendamaCard from '../components/Shop/KendamaCard';
import TextLine from '../components/Shop/TextLine';

interface KendamaItem {
  id: number;  
  name: string; 
  price: number; 
  imageUrl: string;  
  imageUrlHover: string;
  category: string; 
}

function Shop() {
  const [kendamaItems, setKendamaItems] = useState<KendamaItem[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchKendamaItems = async () => {
      try {
        const response = await axios.get('http://localhost:5156/api/kendama');
        setKendamaItems(response.data);
        // console.log(kendamaItems)
      } catch (error) {
        console.error('Ошибка', error);
      }
    };
    fetchKendamaItems();
  }, []);

  const beginnerItems = kendamaItems.filter(item => item.category === 'beginner').slice(0, 4);
  const proItems = kendamaItems.filter(item => item.category === 'pro').slice(0, 4);
  const newItems = kendamaItems.filter(item => item.category === 'new').slice(0, 4);

  return (
    <div className='shop-container'>
      <TextLine />
      <ImageSliader />
      <hr />
      <h1>BEST FOR BEGINNERS</h1>
      <div className='kendama-list'>
        {beginnerItems.map((item) => (
          <KendamaCard 
            key={item.id}
            img={item.imageUrl}
            hoverImg={item.imageUrlHover}
            name={item.name}
            price={item.price} id={item.id} onAddToCart={function (): void {
              throw new Error('айй зараза');
            } } />
        ))}
      </div>
      <div className='button'>
        <button onClick={() => navigate('/shop/collections/beginner')}>VIEW ALL</button>
      </div>
      <hr />

      <h1>PRO MODELS</h1>
      <div className='kendama-list'>
        {proItems.map((item) => (
          <KendamaCard 
            key={item.id} 
            img={item.imageUrl}
            hoverImg={item.imageUrlHover} 
            name={item.name} 
            price={item.price} id={item.id} onAddToCart={function (): void {
              throw new Error('айй зараза');
            } } />
        ))}
      </div>
      <div className='button'>
        <button onClick={() => navigate('/shop/collections/pro')}>VIEW ALL</button>
      </div>
      <hr />

      <h1>NEW KENDAMAS</h1>
      <div className='kendama-list'>
        {newItems.map((item) => (
          <KendamaCard 
            key={item.id} 
            img={item.imageUrl} 
            hoverImg={item.imageUrlHover} 
            name={item.name} 
            price={item.price} id={item.id} onAddToCart={function (): void {
              throw new Error('айй зараза');
            } } />
        ))}
      </div>
      <div className='button'>
        <button onClick={() => navigate('/shop/collections/new')}>VIEW ALL</button>
      </div>
      <hr />
      
    </div>
  );
}

export default Shop;
