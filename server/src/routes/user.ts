import {Router,Request,Response} from "express";
// import {} from "bcrypt";
import {userModel} from "../models/user"
import {UserErrors} from "../error"

const router = Router();

router.post("/register",async(req:Request,res:Response)=>{
    // console.log("something right");
    const {username,password} = req.body;

    try{
    const user = await userModel.findOne({username})
    
    try{if(user)
    {return res.status(400).json({type:UserErrors.USERNAME_ALREADY_EXISTS});}}
    catch(err)
    {
        console.log("first");
    }

    // const hashedPassword = await bcrypt.hash(password,10);
    const newUser = new userModel({username,password});
    await newUser.save();

    res.json({message: "successfully committed"});}
    catch(err)
    {
        res.status(500).json({type:err});
    }

})

export {router as userRouter};
