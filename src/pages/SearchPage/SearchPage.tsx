import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { STATUS } from '../../utils/status';
import { fetchAsyncSearchProduct, getSearchProducts, getSearchProductsStatus, clearSearch } from '../../store/searchSlice';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import ProductList from '../../components/ProductList/ProductList';
import Loader from '../../components/Loader/Loader';

import "./SearchPage.scss";
import NoProduct from '../../components/NoProduct/NoProduct';

const SearchPage = () => {
    const dispatch = useAppDispatch();
    const searchProducts = useAppSelector(getSearchProducts);
    const searchProductsStatus = useAppSelector(getSearchProductsStatus);
    const { searchTerm } = useParams();

    useEffect(() => {
        dispatch(clearSearch());
        dispatch(fetchAsyncSearchProduct(searchTerm));
    }, [dispatch, searchTerm]);

    return (
        <main>
            <div className='search-content bg-whitesmoke'>
                <div className='container'>
                    <div className='py-5'>
                        <div className='title-md'>
                            <h3>Search results:</h3>
                        </div>
                        <br />
                        {searchProductsStatus === STATUS.LOADING ?
                            <Loader />
                            :
                            searchProducts.length === 0 ?
                                <NoProduct />
                                :
                                <ProductList products={searchProducts} />
                        }
                    </div>
                </div>
            </div>
        </main>
    )
}

export default SearchPage;