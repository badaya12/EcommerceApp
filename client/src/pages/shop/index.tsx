import {useGetProducts} from '../../hooks/useGetProducts';
import { Product } from './Product';


export const ShopPage = ()=>{
    const {Products} = useGetProducts();
    // console.log(Products);
    return <div className="shop">
        <div className="products">
       {
        Products.map((product)=>(<Product product={product}/>))
       }

        </div>

    </div>;
}