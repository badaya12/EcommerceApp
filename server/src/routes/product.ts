import { Router, Response,Request} from "express";
import { Iproduct, ProductModel } from "../models/products";
import { verifyToken } from "./user";
import {  userModel } from "../models/user";
import { ProductErrors, UserErrors } from "../error";

const router = Router();

router.get("/",verifyToken,async(_,res:Response)=>{
    try
    {
    const Products  = await ProductModel.find({});
    res.json({Products});
    }
    catch(err)
    {
        res.status(400).json({err});
    }
});

// router.get("/", verifyToken,async (_, res: Response) => {
//   const products = await ProductModel.find({});

//   res.json({ products });
// });

router.post('/checkout',verifyToken,async(req:Request,res:Response)=>{
    
    const {customerID,cartItems} = req.body;
    try{
        const user = await userModel.findById(customerID);

        const productIDs = Object.keys(cartItems);
        // const products = await ProductModel.find({ _id: { $in: productIDs } });
        const products = [];

        for (const productId of productIDs) {
        const product = await ProductModel.findById(productId);
        if (product) {
            products.push(product);
        }
        }
    
        if (!user) {
          return res.status(400).json({ type: UserErrors.NO_USER_FOUND });
        }
        if (products.length !== productIDs.length) {
          return res.status(400).json({ type: ProductErrors.NO_PRODUCT_FOUND });
        }
    
        let totalPrice = 0;
        for (const item in cartItems) {
          item.trim();  
          const product = products.find((product) => String(product._id) === item);
          if (!product) {
            return res.status(400).json({ type: ProductErrors.NO_PRODUCT_FOUND });
          }

            if(cartItems[item] > product.stockQuantity)
               { return res.status(400).json(ProductErrors.NOT_ENOUGH_STOCK);}

            totalPrice += cartItems[item]*product.price
        }

        if(user.availableMoney < totalPrice)
            return res.status(400).json(ProductErrors.NOT_ENOUGH_MONEY)
        
        user.availableMoney -= totalPrice;
        user.purchasedItems.push(...productIDs);

        await user.save();

        // await ProductModel.updateMany({_id :{$in : productIDs},  $inc:{stockQuantity: -1}});
        // await ProductModel.updateMany({_id:{$in:productIDs}},{$inc:{stockQuantity : -1}})
        for (const _id of productIDs) {
          const decrementValue = cartItems[String(_id)];
          if (decrementValue) {
            await ProductModel.updateOne(
              { _id },
              { $inc: { stockQuantity: -decrementValue } }
            );
          }
        }

        res.json({purchasedItems: user.purchasedItems})
    }
    catch(err)
    {
        res.status(400).json(err);
    }
})
export {router as ProductRouter};