import { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import { fetchAsyncProductSingle, getProductSingle, getSingleProductStatus } from '../../store/productSlice';
import { STATUS } from '../../utils/status';
import { formatPrice, calculateDiscount } from "../../utils/helpers";
import { addToCart, getCartMessageStatus, setCartMessageOff, setCartMessageOn } from '../../store/cartSlice';
import { IProduct } from '../../types';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { Loader, CartMessage } from '../../components';

import "./ProductSinglePage.scss";

const ProductSinglePage = () => {
    const { id } = useParams();
    const dispatch = useAppDispatch();
    const product: IProduct = useAppSelector(getProductSingle);
    const cartMessageStatus = useAppSelector(getCartMessageStatus);
    const productSingleStatus = useAppSelector(getSingleProductStatus);

    const [quantity, setQuantity] = useState(1);

    // getting single product
    useEffect(() => {
        dispatch(fetchAsyncProductSingle(id));

        if (cartMessageStatus) {
            setTimeout(() => {
                dispatch(setCartMessageOff());
            }, 2000);
        }

    }, [cartMessageStatus, dispatch, id]);

    const discountedPrice = calculateDiscount(product.price, product.discountPercentage);

    const increaseQty = () => setQuantity((prevState) => prevState + 1);
    const decreaseQty = () => setQuantity((prevState) => prevState === 1 ? prevState : prevState - 1);

    const addToCartHandler = (product: IProduct) => {
        const totalPrice = quantity * discountedPrice;
        dispatch(addToCart({ ...product, quantity, totalPrice, discountedPrice }));
        dispatch(setCartMessageOn());
    }

    if (productSingleStatus === STATUS.LOADING) {
        return <Loader />
    }

    return (
        <main className='py-5 bg-whitesmoke'>
            <div className='product-single'>
                <div className='container'>
                    <div className='product-single-content bg-white grid'>
                        <div className='product-single-l'>
                            <div className='product-img'>
                                <div className='product-img-zoom'>
                                    <img src={product.images[0]} alt={product.title} className='img-cover' />
                                </div>

                                <div className='product-img-thumbs flex align-center my-2'>
                                    <div className='thumb-item'>
                                        <img src={product.images[1]} alt={product.title} className='img-cover' />
                                    </div>
                                    <div className='thumb-item'>
                                        <img src={product.images[2]} alt={product.title} className='img-cover' />
                                    </div>
                                    <div className='thumb-item'>
                                        <img src={product.images[3]} alt={product.title} className='img-cover' />
                                    </div>
                                    <div className='thumb-item'>
                                        <img src={product.images[4]} alt={product.title} className='img-cover' />
                                    </div>
                                </div>

                            </div>
                        </div>

                        <div className='product-single-r'>
                            <div className='product-details font-manrope'>
                                <div className='title fs-20 fw-5'>{product.title}</div>
                                <div>
                                    <p className='para fw-3 fs-15'>{product.description}</p>
                                </div>
                                <div className='info flex align-center flex-wrap fs-14'>
                                    <div className='rating'>
                                        <span className='text-pink fw-5'>Rating:</span>
                                        <span className='mx-1'>
                                            {product.rating}
                                        </span>
                                    </div>
                                    <div className='vert-line-pink'></div>
                                    <div className='brand'>
                                        <span className='text-pink fw-5'>Brand:</span>
                                        <span className='mx-1'>{product.brand}</span>
                                    </div>
                                    <div className='vert-line-pink'></div>
                                    <div className='brand'>
                                        <span className='text-pink fw-5'>Category:</span>
                                        <span className='mx-1 text-capitalize'>
                                            {product.category.replace("-", " ")}
                                        </span>
                                    </div>
                                </div>

                                <div className="price">
                                    <div className='flex align-center'>
                                        <div className='old-price text-gray'>
                                            {formatPrice(product?.price)}
                                        </div>
                                        <span className='fs-14 mx-2 text-dark'>
                                            Inclusive of all taxes
                                        </span>
                                    </div>

                                    <div className='flex align-center my-1'>
                                        <div className='new-price fw-5 font-poppins fs-24 text-pink'>
                                            {formatPrice(discountedPrice)}
                                        </div>
                                        <div className='discount bg-orange fs-13 text-white fw-6 font-poppins'>
                                            {product.discountPercentage}% OFF
                                        </div>
                                    </div>
                                </div>

                                <div className='qty flex align-center my-4'>
                                    <div className='qty-text'>Quantity:</div>
                                    <div className='qty-change flex align-center mx-3'>
                                        <button
                                            type="button"
                                            className='qty-decrease flex align-center justify-center'
                                            onClick={() => decreaseQty()}
                                        >
                                            <i className='fas fa-minus'></i>
                                        </button>
                                        <div className="qty-value flex align-center justify-center">{quantity}</div>
                                        <button
                                            type="button"
                                            className='qty-increase flex align-center justify-center'
                                            onClick={() => increaseQty()}
                                        >
                                            <i className='fas fa-plus'></i>
                                        </button>
                                    </div>
                                </div>

                                <div className='btns'>
                                    <button type="button" className='add-to-cart-btn btn'>
                                        <i className='fas fa-shopping-cart'></i>
                                        <span className='btn-text mx-2'
                                            onClick={() => { addToCartHandler(product) }}
                                        >
                                            add to cart
                                        </span>
                                    </button>
                                    <button type="button" className='buy-now btn mx-3'>
                                        <span className='btn-text'>buy now</span>
                                    </button>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {cartMessageStatus && <CartMessage />}
        </main>
    )
}

export default ProductSinglePage