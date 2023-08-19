import { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { setSidebarOn, getSidebarStatus } from '../../store/sidebarSlice';
import { getAllCarts, getCartItemsCount, getCartTotal } from '../../store/cartSlice';
import CartModal from '../CartModal/CartModal';

import "./Navbar.scss";

const Navbar = () => {
    const dispatch = useDispatch();
    const carts = useSelector(getAllCarts);
    const itemsCount = useSelector(getCartItemsCount);
    const isSidebarOn = useSelector(getSidebarStatus);
    const [searchTerm, setSearchTerm] = useState("");

    const handleSearchTerm = (evt: React.ChangeEvent<HTMLInputElement>) => {
        evt.preventDefault();
        setSearchTerm(evt.target.value);
    }

    useEffect(() => {
        dispatch(getCartTotal());
    }, [carts, dispatch])

    return (
        <nav className='navbar'>
            <div className='navbar-cnt flex align-center'>
                <div className='brand-and-toggler flex align-center'>
                    <button
                        type="button"
                        className='sidebar-show-btn text-white'
                        onClick={() => dispatch(setSidebarOn())}
                    >
                        <i className='fas fa-bars'></i>
                    </button>
                    <Link to="/" className='navbar-brand flex align-center'>
                        <span className='navbar-brand-ico'>
                            <i className='fa-solid fa-bag-shopping'></i>
                        </span>
                        <span className='navbar-brand-txt mx-2'>
                            <span>Wildberries</span>
                        </span>
                    </Link>
                </div>

                <div className='navbar-collapse w-100'>
                    <div className='navbar-search bg-white'>
                        <div className='flex align-center'>
                            <input type="text"
                                className='form-control fs-14'
                                placeholder="I'm looking for..."
                                onChange={(e) => handleSearchTerm(e)}
                            />
                            <Link to={`search/${searchTerm}`} className='text-white search-btn flex align-center justify-center'>
                                <i className='fa-solid fa-magnifying-glass'></i>
                            </Link>
                        </div>
                    </div>
                </div>

                <div className='navbar-cart flex align-center'>
                    <Link to="/cart" className='cart-btn'>
                        <i className='fa-solid fa-cart-shopping'></i>
                        <div className='cart-items-value'>{itemsCount}</div>
                        <CartModal carts={carts} />
                    </Link>
                </div>
            </div>

            <div className={`overlay ${isSidebarOn ? 'show' : ''}`}></div>
        </nav>
    )
}

export default Navbar