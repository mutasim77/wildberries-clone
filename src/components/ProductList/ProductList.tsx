import "./ProductList.scss";
import Product from "../Product/Product";
import { IProduct } from "../../types";
import { calculateDiscount } from "../../utils/helpers";

interface ProductListProps {
    products: IProduct[];
}

const ProductList: React.FC<ProductListProps> = ({ products }) => {
    return (
        <div className='product-lists grid bg-whitesmoke my-3'>
            {products.map(product => {
                const discountedPrice = calculateDiscount(product.price, product.discountPercentage);
                return (
                    <Product
                        key={product.id}
                        product={{ ...product, discountedPrice }}
                    />
                )
            })}
        </div>
    )
}

export default ProductList;