import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './ppa.css';
import Header from './components/Headers/Header';
import Header1 from './components/Headers/Header1';
import Footer from './components/Footers/Footer';
import Footer1 from './components/Footers/Footer1';
import News from './pages/News';
import Shop from './pages/Shop';
import Register from './pages/Register';
import ShopCollections from './pages/ShopCollections';
// import Filter from './components/Shop/Filter';
import TextLine from "./components/Shop/TextLine";

function App() {
  return (

    <Router>
      <Routes>
        
      <Route
          path="/"
          element={
            <>
              <Header />
              <News />
              <Footer />
            </>
          }
        />

      <Route
          path="/shop/collections/*"
          element={
            <>
              <Header1 />
              <TextLine />
              {/* <div className="container"> */}
                {/* <div className="filter">
                  <Filter />
                </div> */}
                {/* <div className="shop-collections"> */}
                <ShopCollections />
                {/* </div> */}
              {/* </div> */}
              <Footer1 />
            </>
          }
        />

      <Route
          path='/shop'
          element={
            <>
              <Header1 />
              <Shop />
              <Footer1 />
            </>
          }
      />

     <Route 
          path='/register'
          element={
            <>
              <Header1 />
              <Register />
              <Footer1 />
            </>
          }
          />

      </Routes>
    </Router>


  );
}

export default App;

