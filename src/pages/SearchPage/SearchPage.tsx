import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { STATUS } from '../../utils/status';
import { fetchAsyncSearchProduct, getSearchProducts, getSearchProductsStatus, clearSearch } from '../../store/searchSlice';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { ProductList, Loader, NoProduct } from '../../components';

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

    return (
        <main>
            <div className='search-content bg-whitesmoke'>
                <div className='container'>
                    <div className='py-5'>
                        <div className='title-md'>
                            <h3>results for : <span style={{ color: '#cb11ab' }}>{searchTerm}</span></h3>
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