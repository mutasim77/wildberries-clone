import { no_product_found } from '../../utils/images';

import './NoProduct.scss';

const NoProduct = () => {
    return (
        <div className='container no-product-found'>
            <div className='fw-5 text-danger py-5'>
                <img src={no_product_found} alt="no-product-found" />
                <h3>No Products found.</h3>
                <p>Your search did not match any products. <br /> Please try again.</p>
            </div>
        </div>
    )
}

export default NoProduct;
