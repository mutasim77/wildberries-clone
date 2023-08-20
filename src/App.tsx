import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { HomePage, CategoryProduct, ProductSingle, CartPage, SearchPage } from './pages/index';
import { Header, Footer, Sidebar } from './components/index';

const App = () => {
  return (
    <BrowserRouter>
      <Header />
      <Sidebar />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/product/:id" element={<ProductSingle />} />
        <Route path="/category/:category" element={<CategoryProduct />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/search/:searchTerm" element={<SearchPage />} />
      </Routes>

      <Footer />
    </BrowserRouter>
  )
}

export default App;
