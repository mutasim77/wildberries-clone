import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { HomePage, CategoryProduct, ProductSingle, CartPage, SearchPage } from './pages/index';
import { Header, Footer, Sidebar } from './components/index';
import store from './store/store';
import { Provider } from 'react-redux';

const App = () => {
  return (
    <Provider store={store}>
      <div className='App'>
        <BrowserRouter>
          <Header />
          <Sidebar />

          <Routes>
            {/* home page route */}
            <Route path="/" element={<HomePage />} />
            {/* single product route */}
            <Route path="/product/:id" element={<ProductSingle />} />
            {/* category wise product listing route */}
            <Route path="/category/:category" element={<CategoryProduct />} />
            {/* cart */}
            <Route path="/cart" element={<CartPage />} />
            {/* searched products */}
            <Route path="/search/:searchTerm" element={<SearchPage />} />
          </Routes>

          <Footer />
        </BrowserRouter>
      </div>
    </Provider>
  )
}

export default App;
