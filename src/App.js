import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./Home";
import Demo from './Demo'
import Cart from "./Cart";
import PlaceOrder from './PlaceOrder'

function App() {
  return (
   
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/home" />}></Route>
          {/* <Route path="/home" element={<Home />} /> */}
          <Route path='/home' element={<Demo/>} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/place-order" element={<PlaceOrder />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
