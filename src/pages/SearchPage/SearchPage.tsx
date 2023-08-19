import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { STATUS } from '../../utils/status';
import { fetchAsyncSearchProduct, getSearchProducts, getSearchProductsStatus, clearSearch } from '../../store/searchSlice';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import ProductList from '../../components/ProductList/ProductList';
import Loader from '../../components/Loader/Loader';

import "./SearchPage.scss";

const SearchPage = () => {
    const dispatch = useAppDispatch();
    const searchProducts = useAppSelector(getSearchProducts);
    const searchProductsStatus = useAppSelector(getSearchProductsStatus);
    const { searchTerm } = useParams();

    useEffect(() => {
        dispatch(clearSearch());
        dispatch(fetchAsyncSearchProduct(searchTerm));
    }, [dispatch, searchTerm]);

    if (searchProducts.length === 0) {
        return (
            <div className='container' style={{
                minHeight: "70vh"
            }}>
                <div className='fw-5 text-danger py-5'>
                    <h3>No Products found.</h3>
                </div>
            </div>
        )
    }

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
                            <ProductList products={searchProducts}
                            />
                        }
                    </div>
                </div>
            </div>
        </main>
    )
}

export default SearchPage;