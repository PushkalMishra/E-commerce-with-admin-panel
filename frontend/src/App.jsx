import { BrowserRouter,Route,Routes,Navigate} from "react-router-dom"
import Top from "./components/Top"
import Home from "./pages/Home"
import Category from "./pages/Category"
import Cart from "./pages/Cart"
import Login from "./pages/Login"
import Product from "./pages/Product"
import Footer from "./components/Footer"
import Admin from "./pages/Admin";
import AddProduct from "./components/AddProduct"
import ListProduct from "./components/ListProduct"
import bannermens from "./assets/bannermens.png"
import bannerwomens from "./assets/bannerwomens.png"
import bannerkids from "./assets/bannerkids.png"
import { useState } from "react"

export default function App() {
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);
  const requireAdminAuth = (element) =>
    isAdminAuthenticated ? element : <Navigate to="/login" />;
  return (
    <main className="bg-primary text text-tertiary">
      <BrowserRouter>
      <Top/>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/mens" element={<Category category="men" banner={bannermens}/>}/>
        <Route path="/womens" element={<Category category="women" banner={bannerwomens}/>}/>
        <Route path="/kids" element={<Category category="kid" banner={bannerkids}/>}/>
        <Route path="/product" element={<Product/>}>
        <Route path=":productId" element={<Product/>}/>
        </Route>
        <Route path="/cart-page" element={<Cart/>}/>
        <Route path="/login" element={<Login setIsAdminAuthenticated={setIsAdminAuthenticated}/>}/>
        <Route path="admin" element={requireAdminAuth(<Admin/>)}>
          <Route path="addproduct" element={<AddProduct/>}/>
          <Route path="listproduct" element={<ListProduct/>}/>
        </Route>
      </Routes>
      <Footer/>
      </BrowserRouter>
    </main>
  )
}