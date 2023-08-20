import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getSidebarStatus, setSidebarOff } from '../../store/sidebarSlice';
import { fetchAsyncCategories, getAllCategories } from '../../store/categorySlice';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';

import "./Sidebar.scss";

const Sidebar = () => {
    const dispatch = useAppDispatch();
    const isSidebarOn = useAppSelector(getSidebarStatus);
    const categories = useAppSelector(getAllCategories);

    useEffect(() => {
        dispatch(fetchAsyncCategories())
    }, [dispatch])

    return (
        <aside className={`sidebar ${isSidebarOn ? 'hide-sidebar' : ""}`}>
            <button
                type="button"
                className='sidebar-hide-btn'
                onClick={() => dispatch(setSidebarOff())}
            >
                <i className='fas fa-times'></i>
            </button>
            <div className='sidebar-cnt'>
                <div className='cat-title fs-17 text-uppercase fw-6 ls-1h'>All Categories</div>
                <ul className='cat-list'>
                    {categories.map((category: string, idx: number) => (
                        <li key={idx} onClick={() => dispatch(setSidebarOff())}>
                            <Link
                                to={`category/${category}`}
                                className='cat-list-link text-capitalize'
                            >
                                {category.replace("-", " ")}
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
        </aside>
    )
}

export default Sidebar;
