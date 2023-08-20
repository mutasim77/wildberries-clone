import { shopping_cart } from '../../utils/images';
import { formatPrice } from '../../utils/helpers';
import { IProduct } from "../../types";

import "./CartModal.scss";

interface CartModalProps {
    carts: IProduct[];
}

const CartModal: React.FC<CartModalProps> = ({ carts }) => {
    return (
        <div className='cart-modal'>
            <h5 className='cart-modal-title fw-5 fs-15 font-manrope text-center'>Recenlty Added Products</h5>
            {carts.length > 0 ?
                <DisplayAllProducts carts={carts} />
                :
                <NoProductsYet />
            }
        </div>
    )
}

const DisplayAllProducts = ({ carts }: CartModalProps) => {
    return (
        <div className='cart-modal-list grid'>
            {carts.map(cart => {
                return (
                    <div className='cart-modal-item grid align-center font-manrope py-2' key={cart.id}>
                        <div className='cart-modal-item-img'>
                            <img src={cart.thumbnail} alt="" className='img-cover' />
                        </div>
                        <div className='cart-modal-item-title fs-13 font-manrope text-capitalize'>{cart.title}</div>
                        <div className='cart-modal-item-price fs-14 fw-6'>
                            {formatPrice(Number(cart.discountedPrice))}
                        </div>
                    </div>
                )
            })}
            <div
                className='text-capitalize view-cart-btn bg-pink fs-15 font-manrope text-center'
            >
                view my shopping cart
            </div>
        </div>
    )
}

const NoProductsYet = () => {
    return (
        <div className="flex flex-column align-center justify-center cart-modal-empty">
            <img src={shopping_cart} alt="" className='' />
            <h6 className='text-dark fw-4'>No products yet</h6>
        </div>
    )
}

export default CartModal