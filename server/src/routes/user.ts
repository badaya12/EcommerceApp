import { NextFunction, Request, Response, Router } from "express";
import jwt from "jsonwebtoken";
import { UserErrors } from "../error";
import { IUser, userModel } from "../models/user";

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

});

router.post("/login",async(req:Request,res:Response)=>{
    const {username,password} = req.body;

    const user : IUser = await userModel.findOne({username})

    if (!user) {
        return res.status(400).json({ type: UserErrors.NO_USER_FOUND });
      }

    if(password === null || password != user.password)
    return res.status(400).json({type:UserErrors.NO_USER_FOUND})

    const token = await jwt.sign({id:user._id},"secret");

    try{
        res.json({token,userID:user._id});
    }
    catch(err)
    {
        res.status(500).json({type:err})
    }
})

export const verifyToken = (req:Request,res:Response,next:NextFunction)=>{
    
    const authHeader = req.headers.authorization;
    if(authHeader)
    {
        jwt.verify(authHeader,"secret",(err,decoded)=>{
            if(err)
                {return res.sendStatus(403).json({type: "error something went wrong1"})}
            next();
        })
    }
    else
    {
        console.log(req);
        return res.sendStatus(400).json({type:req});
    }
}

// export const verifyToken = (req:Request, res:Response, next:NextFunction) => {
//     const authHeader = req.headers.authorization;
//     if (authHeader) {
//       jwt.verify(authHeader, "secret", (err) => {
//         if (err) {
//           return res.sendStatus(403);
//         }
//         next();
//       });
//     } else {
//       res.sendStatus(401);
//     }
//   };

export { router as userRouter };
