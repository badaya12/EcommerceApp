import { useContext } from "react"
import { Iproduct } from "../../models/interface"
import "./styles.css"
import { IshopContext, ShopContext } from "../../context/shop-context"

interface Props{
    product:Iproduct
}
export const Product = (props:Props)=>{

    const {_id,description,productName,price,imageURL,stockQuantity} = props.product

    const {addToCart,getItemCount} = useContext<IshopContext>(ShopContext);

    const count = getItemCount(_id);

    console.log(count);

        return <div className="product">
            <img src={imageURL} alt="Read description for product details"/>
            <div className="description">
                <h3>{productName}</h3>
                <p>{description}</p>
                <p>{price}rs</p>
                </div>
            <button className="add-to-cart-bttn" 
            onClick={()=>{addToCart(_id)}}> Add to cart {count !== 0 && <>{count}</>} </button>
            <div className="stockQuantity">
                {stockQuantity === 0 && <h1>OUT OF STOCK</h1>}
            </div>
        </div>
}