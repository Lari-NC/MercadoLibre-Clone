import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from './pages/HomePage/HomePage';
import LoginForm from '../src/components/LoginForm/LoginForm';
import RegisterForm from '../src/components/RegisterForm/RegisterForm';
import UserPageWithoutU from "./pages/UserPage/UserPageWithoutU";
import UserPageWithU from "./pages/UserPage/UserPageWithU";
import EditForm from '../src/components/EditForm/EditForm';
import NewProductForm from '../src/components/NewProductForm/NewProductForm';
import CartWithProducts from '../src/components/CartWithProducts/CartWithProducts';
import Purchase from '../src/components/Purchase/Purchase';
import ProductByIdWithQuestions from '../src/components/ProductById/ProductByIdWithQuestions'
import CategoryProductsPage from "./pages/CategoriesPages/CategoryProductsPage";
import SearchPage from "./pages/SearchPages/SearchPage";
import PageTemplate from "./pages/TemplatePages/PageTemplate";
import CategoriesForm from "../src/components/CategoriesCatalog/CategoriesCatalog";
import { useState, useEffect } from "react";
import { ToastContainer } from 'react-toastify';

const App = () => {
  const [isLoggedIn, setLoggedIn] = useState(false)

  useEffect(() => {}, [isLoggedIn])

  return (
    <BrowserRouter>
        <Routes>
          <Route path="/" element={<PageTemplate isLoggedIn={isLoggedIn} setLoggedIn={setLoggedIn}/>}>
            <Route index element={<HomePage isLoggedIn={isLoggedIn}/>} />
            <Route path="/categories" element={<CategoriesForm />} />
            <Route path="/login" element={<LoginForm setLoggedIn={setLoggedIn}/>} />
            <Route path="/register" element={<RegisterForm />} />
            <Route path="/user/:id" element={<UserPageWithoutU />} />
            <Route path="/user" element={<UserPageWithU setLoggedIn={setLoggedIn} isLoggedIn={isLoggedIn}/>} />
            <Route path="/editProduct/:id" element={<EditForm />} />
            <Route path="/newProduct" element={<NewProductForm />} />
            <Route path="/cart" element={<CartWithProducts />} />
            <Route path="/purchase" element={<Purchase />} />
            <Route path="/product/:id" element={<ProductByIdWithQuestions isLoggedIn={isLoggedIn}/>} /> 
            <Route path="/category/:id" element={<CategoryProductsPage/>} />
            <Route path="/search" element={<SearchPage isLoggedIn={isLoggedIn}/>} />
          </Route>
        </Routes>
        <ToastContainer /> 
    </BrowserRouter>
  );
}

export default App;
