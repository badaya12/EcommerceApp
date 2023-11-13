import { Schema,model } from "mongoose";
import { Request,Response } from "express";

export interface Iproduct {
    productName : string;
    price : number;
    description : string;
    imageURL : string;
    stockQuantity : number;
}

const productSchema = new Schema<Iproduct>({
    productName : {type:String,required : true},
    price : {type : Number,required : true ,min : [1,'price should be above 1']},
    description : {type : String,required : true},
    imageURL : {type : String,required : true},
    stockQuantity : {type : Number,required : true,min : [0,'quantity cannot be negative']}
});

export const ProductModel =  model<Iproduct> ("product",productSchema);