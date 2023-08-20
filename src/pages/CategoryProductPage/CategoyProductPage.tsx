import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { STATUS } from '../../utils/status';
import { getAllProductsByCategory, getCategoryProductsStatus, fetchAsyncProductsOfCategory } from '../../store/categorySlice';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { Loader, ProductList } from '../../components';

import "./CategoryProductPage.scss";

const CategoryProductPage = () => {
    const dispatch = useAppDispatch();
    const { category } = useParams();
    const categoryProducts = useAppSelector(getAllProductsByCategory);
    const categoryProductsStatus = useAppSelector(getCategoryProductsStatus);

    useEffect(() => {
        dispatch(fetchAsyncProductsOfCategory(category));
    }, [dispatch, category]);

    return (
        <div className='cat-products py-5 bg-whitesmoke'>
            <div className='container'>
                <div className='cat-products-content'>
                    <div className='title-md'>
                        <h3>See our <span className='text-capitalize'>{category?.replace("-", " ")}</span></h3>
                    </div>
                    {categoryProductsStatus === STATUS.LOADING ?
                        <Loader />
                        :
                        <ProductList products={categoryProducts} />
                    }
                </div>
            </div>
        </div>
    )
}

export default CategoryProductPage