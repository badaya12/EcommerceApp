import {Schema,model }from "mongoose";

export interface IUser {
   _id?: string;
   username : string;
   password : string;
   availableMoney : number;
//    purchasedItems : string[];

}

const userSchema =  new Schema<IUser>({
    username: {type : String,required : true,unique:true},
    password : {type : String,required : true},
    availableMoney : {type : Number,default: 5000},
    // purchasedItems : {}
}) 


export const userModel = model<IUser>("user",userSchema);
