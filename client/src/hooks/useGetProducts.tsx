import axios from 'axios';
import {useState,useEffect} from 'react';
import {useGetToken} from './useGetToken'
import { Iproduct } from '../models/interface';
export const useGetProducts = ()=>{
    const [ Products,setProducts] = useState<Iproduct[]>([]);
    const {headers} = useGetToken();
    const fetchedProduct = async()=>{
       try{ const fProducts = await axios.get("http://localhost:3001/products/",{headers});
        setProducts(fProducts.data.Products);}
        catch(err)
        {
            alert("SOMETHING WENT WRONG");
        }
    }
    useEffect(()=>{
       fetchedProduct();
    },[]);

    return {Products};
}