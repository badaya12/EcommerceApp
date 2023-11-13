import { useContext } from "react";
import { Iproduct } from "../../models/interface"
import'./styles.css';
import { IshopContext, ShopContext } from "../../context/shop-context";


interface Props{
    product:Iproduct
}
export const CartItem = (props:Props)=>{
    const {_id,description,productName,price,imageURL} = props.product;
    const {addToCart,removeFromCart,updateCartItemCount,getItemCount} = useContext<IshopContext>(ShopContext);
    const cartItemCount = getItemCount(_id);
    
    return <div className="cartItem">
        {" "}
            <img src={imageURL} alt="Read description for product details"/>
            <div className="description">
                <h3>{productName}</h3>
                <p>Price : {price}</p>
            </div>
            <div className="countHandler">
            <button onClick={()=>{addToCart(_id)}}> + </button>
            <input type="number" value = {cartItemCount} onChange={(e)=>{
                updateCartItemCount(Number(e.target.value),_id)
            }}/>
            <button onClick={()=>{removeFromCart(_id)}}>-</button>
            </div>
        </div>
}