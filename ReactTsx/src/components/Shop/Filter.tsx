import { useState, ChangeEvent, useEffect } from 'react';
import '../../assets/components/Shop/Filter.css'; 

interface Filters {
    brand: string[];
    wood: string[];
    paintType: string[];
    price: string[];
    colour: string[];
};

interface FilterProps {
    onFilterChange: (filters: Filters) => void;
};

function Filter({ onFilterChange }: FilterProps) {
    const [filters, setFilters] = useState<Filters>({
        brand: [],
        wood: [],
        paintType: [],
        price: [],
        colour: [],
    });
    const [debouncedFilters, setDebouncedFilters] = useState<Filters>(filters);

    const handleCheckBoxChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value, checked } = e.target;
        // console.log('change')
        setFilters((prevFilters) => {
            const updatedFilters = { ...prevFilters };
    
            if (checked) {
                if (!updatedFilters[name as keyof Filters].includes(value)) {
                    updatedFilters[name as keyof Filters] = [
                        ...updatedFilters[name as keyof Filters],
                        value,
                    ];
                }
            } else {
                updatedFilters[name as keyof Filters] = updatedFilters[name as keyof Filters].filter(
                    (v) => v !== value
                );
            }
            // console.log(updatedFilters)
            return updatedFilters;
        });
    };

    useEffect(() => {
        if (JSON.stringify(filters) !== JSON.stringify(debouncedFilters)) {
            const handler = setTimeout(() => setDebouncedFilters(filters), 500);
            return () => clearTimeout(handler);
        }
    }, [filters, debouncedFilters]);

    useEffect(() => {
        onFilterChange(debouncedFilters);
    }, [debouncedFilters, onFilterChange]);

    return (
      <div className="filter-container">
          <h1>Filter</h1>
          <hr />

          <div>
            <h1>Brand</h1>
            <hr />
                <form>
                    <label className="filter-option">
                        <input type="checkbox" name="brand" value="okendama" onChange={handleCheckBoxChange} />
                        OKendama
                    </label>
                    <label className="filter-option">
                        <input type="checkbox" name="brand" value="krom" onChange={handleCheckBoxChange} />
                        KROM 
                    </label>
                    <label className="filter-option">
                        <input type="checkbox" name="brand" value="israel" onChange={handleCheckBoxChange} />
                        Israel
                    </label>
                    <label className="filter-option">
                        <input type="checkbox" name="brand" value="kusa" onChange={handleCheckBoxChange} />
                        KUSA 
                    </label>
                    <label className="filter-option">
                        <input type="checkbox" name="brand" value="sweets" onChange={handleCheckBoxChange} />
                        Sweets Kendamas
                    </label>
                    <label className="filter-option">
                        <input type="checkbox" name="brand" value="sol" onChange={handleCheckBoxChange} />
                        Sol Kendamas 
                    </label>
                </form>
          </div>

          <div>
            <h1>Brand</h1>
            <hr />
                <form>
                    <label className="filter-option">
                        <input type="checkbox" name="wood" value="maple" onChange={handleCheckBoxChange} />
                        Maple
                    </label>
                    <label className="filter-option">
                        <input type="checkbox" name="wood" value="ash" onChange={handleCheckBoxChange} />
                        Ash 
                    </label>
                    <label className="filter-option">
                        <input type="checkbox" name="wood" value="bamboo" onChange={handleCheckBoxChange} />
                        Bamboo
                    </label>
                    <label className="filter-option">
                        <input type="checkbox" name="wood" value="birch" onChange={handleCheckBoxChange} />
                        Birch 
                    </label>
                    <label className="filter-option">
                        <input type="checkbox" name="wood" value="beech" onChange={handleCheckBoxChange} />
                        Beech
                    </label>
                    <label className="filter-option">
                        <input type="checkbox" name="wood" value="padauk" onChange={handleCheckBoxChange} />
                        Padauk 
                    </label>
                    <label className="filter-option">
                        <input type="checkbox" name="wood" value="hickory" onChange={handleCheckBoxChange} />
                        Hickory 
                    </label>
                    <label className="filter-option">
                        <input type="checkbox" name="wood" value="red elm" onChange={handleCheckBoxChange} />
                        Red Elm 
                    </label>
                    <label className="filter-option">
                        <input type="checkbox" name="wood" value="cherry" onChange={handleCheckBoxChange} />
                        Cherry 
                    </label>
                </form>
          </div>

          <div>
            <h1>Paint Type</h1>
            <hr />
                <form >
                    <label className="filter-option">
                        <input type="checkbox" name="paintType" value="silk" onChange={handleCheckBoxChange} />
                        Silk
                    </label>
                    <label className="filter-option">
                        <input type="checkbox" name="paintType" value="super sticky" onChange={handleCheckBoxChange} />
                        Super Stick
                    </label>
                    <label className="filter-option">
                        <input type="checkbox" name="paintType" value="natural" onChange={handleCheckBoxChange} />
                        Natural
                    </label>
                </form>
          </div>

          <div>
            <h1>Price</h1>
            <hr />
            <form>
    <label className="filter-option">
        <input type="checkbox" name="price" value="under_25" onChange={handleCheckBoxChange} />
        Under 25$
    </label>
    <label className="filter-option">
        <input type="checkbox" name="price" value="25_to_50" onChange={handleCheckBoxChange} />
        25$ to 50$
    </label>
    <label className="filter-option">
        <input type="checkbox" name="price" value="50_to_75" onChange={handleCheckBoxChange} />
        50$ to 75$
    </label>
    <label className="filter-option">
        <input type="checkbox" name="price" value="75_to_100" onChange={handleCheckBoxChange} />
        75$ to 100$
    </label>
    <label className="filter-option">
        <input type="checkbox" name="price" value="100_plus" onChange={handleCheckBoxChange} />
        100$+
    </label>
</form>
          </div>

          <div>
            <h1>Color</h1>
            <hr />
                <form >
                    <label className="filter-option">
                        <input type="checkbox" name="colour" value="red" onChange={handleCheckBoxChange} />
                        🟥Red 
                    </label>
                    <label className="filter-option">
                        <input type="checkbox" name="colour" value="black" onChange={handleCheckBoxChange} />
                        🔳Black
                    </label>
                    <label className="filter-option">
                        <input type="checkbox" name="colour" value="brown" onChange={handleCheckBoxChange} />
                        🟫Brown
                    </label>
                    <label className="filter-option">
                        <input type="checkbox" name="colour" value="orange" onChange={handleCheckBoxChange} />
                        🟧Orange
                    </label>
                    <label className="filter-option">
                        <input type="checkbox" name="colour" value="blue" onChange={handleCheckBoxChange} />
                        🟦Blue
                    </label>
                    <label className="filter-option">
                        <input type="checkbox" name="colour" value="purple" onChange={handleCheckBoxChange} />
                        🟪Purple
                    </label>
                    <label className="filter-option">
                        <input type="checkbox" name="colour" value="white" onChange={handleCheckBoxChange} />
                        ⬜White
                    </label>
                    <label className="filter-option">
                        <input type="checkbox" name="colour" value="yellow" onChange={handleCheckBoxChange} />
                        🟨Yellow
                    </label>
                    <label className="filter-option">
                        <input type="checkbox" name="colour" value="green" onChange={handleCheckBoxChange} />
                        🟩Green
                    </label>
                    <label className="filter-option">
                        <input type="checkbox" name="colour" value="natural" onChange={handleCheckBoxChange} />
                        Natural
                    </label>
                    <label className="filter-option">
                        <input type="checkbox" name="colour" value="grey" onChange={handleCheckBoxChange} />
                        Grey
                    </label>
                    <label className="filter-option">
                        <input type="checkbox" name="colour" value="gold" onChange={handleCheckBoxChange} />
                        Gold
                    </label>
                    <label className="filter-option">
                        <input type="checkbox" name="colour" value="pink" onChange={handleCheckBoxChange} />
                        Pink
                    </label>
                </form>
          </div>

      </div>
    )
  }
  
  export default Filter;
  