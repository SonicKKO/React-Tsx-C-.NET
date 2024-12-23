import { useState, useEffect, useCallback, ChangeEvent } from "react";
import axios from "axios";
import "../../../assets/pages/ShopCollections/Begginer.css";
import KendamaCard from "../KendamaCard";
import Filter from "../Filter";

interface KendamaItem {
  id: number;  
  name: string; 
  price: number; 
  imageUrl: string;  
  imageUrlHover: string;
  category: string; 
  brand: string[];
  wood: string[];
  paintType: string[];
  colour: string[];
}

interface Filters {
  brand: string[];
  wood: string[];
  paintType: string[];
  price: string[];
  colour: string[];
}

function NewCollection() {
  const [kendamaItems, setKendamaItems] = useState<KendamaItem[]>([]);
  const [filteredItems, setFilteredItems] = useState<KendamaItem[]>([]);
  const [filters, setFilters] = useState<Filters>({
      brand: [],
      wood: [],
      paintType: [],
      price: [],
      colour: [],
  });

  useEffect(() => {
      const fetchKendamaItems = async () => {
          try {
              const response = await axios.get('http://localhost:5156/api/Kendama/filter?category=new');
              setKendamaItems(response.data);
              // console.log(response.data)
          } catch (error) {
              console.log('ошибка', error);
          }
      };
      fetchKendamaItems();
  }, []);

  useEffect(() => {
    const filtered = kendamaItems.filter((item) => {
        const isBrandMatch = filters.brand.length
            ? filters.brand.some((filterBrand) => item.brand.includes(filterBrand))
            : true;
        const isWoodMatch = filters.wood.length
            ? filters.wood.some((filterWood) => item.wood.includes(filterWood))
            : true;
        const isPaintTypeMatch = filters.paintType.length
            ? filters.paintType.some((filterPaintType) =>
                  item.paintType.includes(filterPaintType)
              )
            : true;
        const isColourMatch = filters.colour.length
            ? filters.colour.some((filterColour) => item.colour.includes(filterColour))
            : true;
            const isPriceMatch = filters.price.length
            ? filters.price.some((filterPrice) => {
              const itemPrice = item.price;
                  if (filterPrice === "under_25") return itemPrice < 25;
                  if (filterPrice === "25_to_50") return itemPrice >= 25 && item.price < 50;
                  if (filterPrice === "50_to_75") return itemPrice >= 50 && item.price < 75;
                  if (filterPrice === "75_to_100") return itemPrice >= 75 && item.price < 100;
                  if (filterPrice === "100_plus") return itemPrice >= 100;
                  return true;
              })
            : true;
        // console.log(filters); 
        return (isBrandMatch && isWoodMatch && isPaintTypeMatch && isColourMatch && isPriceMatch);
    });

    setFilteredItems(filtered);
  }, [kendamaItems, filters]);

  const handleFilterChange = useCallback((newFilters: Filters) => {
      setFilters(newFilters);
  }, []);

  const handleSortChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const sortValue = event.target.value;
  
    const sortedItems = [...filteredItems]; 
    if (sortValue === "price_asc") {
      sortedItems.sort((a, b) => a.price - b.price); 
    } else if (sortValue === "price_desc") {
      sortedItems.sort((a, b) => b.price - a.price); 
    }
  
    setFilteredItems(sortedItems); 
  };


  return (
    <div className="beginner-collection-container"> 

      <div className="filter">
        <Filter onFilterChange={handleFilterChange}/>
      </div>

      <div className="collection">
        <h1>New Models</h1>
        <div>
          <hr />

        <div className="sort-container">
          <span>{filteredItems.length} products</span> 
          <div className="sort">
            Sort by:⠀ 
            <select name="sort" id="sort" onChange={handleSortChange}>
              <option value="price_asc">Lower Price</option> 
              <option value="price_desc">Higher Price</option>
            </select>
          </div>
        </div>

        </div>
        <div className="kendama-list">
        {filteredItems.map((item) => (
          <KendamaCard
            key={item.id}
            img={item.imageUrl}
            hoverImg={item.imageUrlHover}
            name={item.name}
            price={item.price}
          />
        ))}
      </div>
      </div>
    </div>
  )
}

export default NewCollection;

  