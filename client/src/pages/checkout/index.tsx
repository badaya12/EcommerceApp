import { useContext } from "react";
import { useGetProducts } from "../../hooks/useGetProducts";
import { IshopContext, ShopContext } from "../../context/shop-context";
import { Iproduct } from "../../models/interface";
import {CartItem } from "./cart-item";
import './styles.css';
import { useNavigate } from "react-router-dom";

export const CheckoutPage = ()=>{
    const {Products} = useGetProducts();
    const {getItemCount,getTotalAmt,checkout} = useContext<IshopContext>(ShopContext);
    const navigate = useNavigate();
    return <div className="cart">
        <div>
            <h1>Your Cart Items</h1>
        </div>
        <div className="cart">
            {
                Products.map((product : Iproduct)=>{
                    if(getItemCount(product._id) !== 0)
                    return <CartItem product={product}/>;
                  
                })
            }
        </div>
        {getTotalAmt() > 0 ? (
        <div className="checkout">
            <button onClick={()=>{checkout();}}>subtotal: ${getTotalAmt().toFixed(2)}</button>
            <button onClick={()=>{navigate("/")}}>Continue Shopping</button>
        </div>):<h1>Your Cart is Empty</h1>}
    </div>;
}