import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getAllCategories } from '../../store/categorySlice';
import { fetchAsyncProducts, getAllProducts, getAllProductsStatus } from '../../store/productSlice';
import { STATUS } from '../../utils/status';
import { shuffleArray } from '../../utils/helpers';
import Slider from '../../components/Slider/Slider';
import ProductList from "../../components/ProductList/ProductList";
import Loader from "../../components/Loader/Loader";

import "./HomePage.scss";

const HomePage = () => {
    const dispatch = useDispatch();
    const categories = useSelector(getAllCategories);

    useEffect(() => {
        dispatch(fetchAsyncProducts(50));
        
    // eslint-disable-next-line
    }, []);

    const products = useSelector(getAllProducts);
    const productStatus = useSelector(getAllProductsStatus);
    // shuffle products;
    const shuffledProducts = shuffleArray(products);

    let catProductsOne = [];
    let catProductsTwo = [];
    let catProductsThree = [];
    let catProductsFour = [];

    if (products.length > 0) {
        catProductsOne = products.filter(product => product.category === categories[0]);
        catProductsTwo = products.filter(product => product.category === categories[1]);
        catProductsThree = products.filter(product => product.category === categories[2]);
        catProductsFour = products.filter(product => product.category === categories[3]);
    }

    return (
        <main>
          <div className='slider-wrapper'>
            <Slider />
          </div>
          <div className='main-content bg-whitesmoke'>
            <div className='container'>
              <div className='categories py-5'>
                <div className='categories-item'>
                  <div className='title-md'>
                    <h3>See our products</h3>
                  </div>
                  {productStatus === STATUS.LOADING ? <Loader /> : <ProductList products={shuffledProducts} />}
                </div>
    
                <div className='categories-item'>
                  <div className='title-md'>
                    <h3>{categories[0]}</h3>
                  </div>
                  {productStatus === STATUS.LOADING ? <Loader /> : <ProductList products={catProductsOne} />}
                </div>
    
                <div className='categories-item'>
                  <div className='title-md'>
                    <h3>{categories[1]}</h3>
                  </div>
                  {productStatus === STATUS.LOADING ? <Loader /> : <ProductList products={catProductsTwo} />}
                </div>
    
                <div className='categories-item'>
                  <div className='title-md'>
                    <h3>{categories[2]}</h3>
                  </div>
                  {productStatus === STATUS.LOADING ? <Loader /> : <ProductList products={catProductsThree} />}
                </div>
    
                <div className='categories-item'>
                  <div className='title-md'>
                    <h3>{categories[3]}</h3>
                  </div>
                  {productStatus === STATUS.LOADING ? <Loader /> : <ProductList products={catProductsFour} />}
                </div>
              </div>
            </div>
          </div>
        </main>
      )


}


export default HomePage; 