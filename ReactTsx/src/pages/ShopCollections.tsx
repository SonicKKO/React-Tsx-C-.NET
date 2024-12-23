import { Route, Routes } from "react-router-dom";
import "../assets/pages/ShopCollections.css";
import BeginnerCollection from "../components/Shop/Collections/BeginnerCollection";
import ProCollection from "../components/Shop/Collections/ProCollection";
import NewCollection from "../components/Shop/Collections/NewCollection";


function ShopCollections() {


  return (
    <div className="beginner-collection-container">
      <Routes>
        <Route path="beginner" element={<BeginnerCollection />} />
        <Route path="pro" element={<ProCollection />} />
        <Route path="new" element={<NewCollection />} />
      </Routes>
    </div>
  )
}

export default ShopCollections;
