import { createContext, useState } from "react"
import { useGetProducts } from "../hooks/useGetProducts";
import axios from "axios";
import { useGetToken } from "../hooks/useGetToken";

export interface IshopContext{
    addToCart: (itemId: string) => void;
    updateCartItemCount: (newAmount: number, itemId: string) => void;
    removeFromCart: (itemId: string) => void;
    getItemCount:(itemId:string)=>number;
    getTotalAmt:()=>number;
    checkout:()=>void;
}

const defaultVal : IshopContext = {
    addToCart:()=> null,
    updateCartItemCount :()=> null,
    removeFromCart:()=>null,
    getItemCount:()=>0,
    getTotalAmt:()=>0,
    checkout:()=>null
};

// export const ShopContext = createContext<IshopContext>(defaultVal);
export const ShopContext = createContext<IshopContext | null>(null);

export const ShopContextProvider = (props)=>{
    const [ cartItems,setCartItems] = useState<{string:number }|{}>({});
    const {Products} = useGetProducts();
    const {headers} = useGetToken();
    const storedData = localStorage.getItem('user_id');

    const getItemCount = (itemId:string):number=>{
        if(itemId in cartItems)
            return cartItems[itemId];
        return 0;
    }
    const addToCart = (itemId:string)=>{
        if(!cartItems[itemId])
        {
            setCartItems((prev)=>({
                ...prev,
                [itemId]:1
            }))
        }
        else
        {
            setCartItems((prev)=>({
                ...prev,
                [itemId]:prev[itemId] +1
            }))
        }
    }

    const removeFromCart = (itemId:string)=>{
        if(!cartItems[itemId])return;
        if(cartItems[itemId] === 0) return;
        setCartItems((prev)=>({
            ...prev,
            [itemId]:prev[itemId]-1
        }))
    };

    const updateCartItemCount = (count:number,itemId:string,)=>
    {
        if(count <= 0)return;
        setCartItems((prev)=>({
            ...prev,
            [itemId]:count
        }))
    };

    const getTotalAmt = ():number=>{
        let amount = 0;
        for(const item in cartItems)
        {
            if(cartItems[item] > 0)
            {
                const itemInfo = Products.find((product)=>product._id === item);
                amount += cartItems[item]*itemInfo.price;
            }
        }
        return amount;
    }

    const checkout = async ()=>{
        const body = {customerID:storedData,cartItems}
        try
       { await axios.post("http://localhost:3001/products/checkout",body,{headers});}
       catch(err)
       {
        console.log(err);
       }

    }

    const contextVal : IshopContext = {
        addToCart,
        removeFromCart,
        updateCartItemCount,
        getItemCount,
        getTotalAmt,
        checkout

    }
        return(<ShopContext.Provider value={contextVal}>
            {props.children}
        </ShopContext.Provider>)
}