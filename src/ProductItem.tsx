import { useState ,ChangeEvent, useEffect} from 'react';
import './productitem.css';
import { BsSearch,BsArrowLeftCircleFill  } from "react-icons/bs"
import {   useNavigate } from "react-router-dom";
interface ProductItemProps {
  items: {
    id: number;
    name: string;
    description: string;
    imageurl: string;
    price:number;
  }[];
}

const ProductItem = ({ items }: ProductItemProps) => {
  const clickArrow=useNavigate();
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedQuantities, setSelectedQuantities] = useState<Record<number, number[]>>({});
  const [noResults, setNoResults] = useState<boolean>(false);

  const filteredItems = items.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Update the noResults state whenever filteredItems or searchTerm changes
  useEffect(() => {
    setNoResults(filteredItems.length === 0 && searchTerm.trim() !== '');
  }, [filteredItems, searchTerm]);

  const handleQuantityChange = (itemId: number, quantity: number) => {
    setSelectedQuantities((prevQuantities) => ({
      ...prevQuantities,
      [itemId]: [...(prevQuantities[itemId] || []), quantity],
    }));
  };

  const calculateTotalQuantity = () => {
    return Object.values(selectedQuantities)
      .flat()
      .reduce((total, quantity)=> total + quantity, 0);
  };

  return (
    <section>
      <div className="top">
      <span className='arrow' onClick={()=>{clickArrow('/myown')}}><BsArrowLeftCircleFill  /></span>
      <div className="search-wrapper">
  <BsSearch className="search-icon" />
  <input
    type="text"
    placeholder="Search"
    value={searchTerm}
    onChange={(e: ChangeEvent<HTMLInputElement>) => setSearchTerm(e.target.value)}
    className="searchbar"
  />
</div>

        <div>
          <a className="container" href="#">Total: {calculateTotalQuantity()}</a>
        </div>
      </div>

      
        <form className="thewhole">
          {filteredItems.length > 0 ? (
            filteredItems.map((item) => (
              <div key={item.id} className="product-item">
                <div>
                  <img src={item.imageurl} alt={item.name} className="image-item" />
                </div>
                <label>
                  <input type="checkbox" />
                  <strong>{item.name}</strong>
                  <p>{item.description}</p>
                  <p>${item.price}</p>
                  <div className="option-quantity">
                    <span>Quantity:</span>
                    <select
                      onChange={(e) => handleQuantityChange(item.id, parseInt(e.target.value))}
                    >
                      <option value={1}>1</option>
                      <option value={2}>2</option>
                      <option value={3}>3</option>
                      <option value={4}>4</option>
                      <option value={5}>5</option>
                      <option value={6}>6</option>
                      <option value={7}>7</option>
                      <option value={8}>8</option>
                      <option value={9}>9</option>
                      <option value={10}>10</option>
                      <option value={11}>11</option>
                      <option value={12}>12</option>
                    </select>
                  </div>
                  <div>
                  </div>
                </label>
              </div>
            ))
          ) : (
            searchTerm.trim() !== '' && <p className="no-results">The item is not found.</p>
          )}
        </form>
        <button type="submit" className='submit-btns'>Submit</button>
      
    </section>
  );
};

export default ProductItem;