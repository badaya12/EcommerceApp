import { SyntheticEvent, useState } from "react";
import axios from "axios";
import {useCookies}from "react-cookie";
import { UserErrors } from "../../models/error";
import {useNavigate} from 'react-router-dom'

export const AuthPage = ()=>{
        return <div>
            <Register/>
            <Login/>
        </div>;

        
}

const Register = ()=>{
        const[username,setUsername] = useState("");
        const[password,setPassword] = useState("");
        

        const handleSubmit = async (event : SyntheticEvent)=>{
            event.preventDefault();
             try{ 
                await axios.post("http://localhost:3001/user/register",{username,password});
                alert("Registration successful");
            }
             catch(err){
                    if(err.response.data.type === UserErrors.USERNAME_ALREADY_EXISTS)
                    alert(UserErrors.USERNAME_ALREADY_EXISTS);
                    else
                    {
                        alert("something went wrong");
                    }
             }
            
        }

        return <div className="auth-container">
                <form onSubmit={handleSubmit}>
                    <h2>
                        Register
                    </h2>

                    <div className="form-group">
                        <label htmlFor="username">
                            username:
                        </label >
                        <input type="text" id = "username"  value={username}  onChange={(e)=>{setUsername(e.target.value)}}/>
                    </div>

                    <div className="form-group">
                        <label htmlFor="password">
                            password:
                        </label >
                        <input type="text" id = "password"  value={password}  onChange={(e)=>{setPassword(e.target.value)}} />
                    </div>

                    <button type="submit">Register</button>

                    </form>

        </div>    
}


const Login = ()=>{
    const[username,setUsername] = useState<string>("");
    const[password,setPassword] = useState("");
    const[_,setCookies] = useCookies(["access_token"]);
    const navigate = useNavigate();

    const handleSubmit = async (event : SyntheticEvent)=>{
        event.preventDefault();
         try{ 
           const result =  await axios.post("http://localhost:3001/user/login",{username,password});
           console.log(result);
            setCookies("access_token",result.data.token);
            localStorage.setItem("user_id",result.data.userID);
            navigate("/");
        }
         catch(err){
               let errorMess:string = ""

               switch(err?.response?.data?.type){
                case UserErrors.NO_USER_FOUND:
                    errorMess += "No such user exist"
                    break;
                case UserErrors.WRONG_CREDENTIALS:
                    errorMess += "Either username or password is wrong"
                    break;
                default: 
                    errorMess+= "Something went wrong"
                    break;
               }
               alert("ERROR : " +  errorMess)
         }
        
    }

    return <div className="auth-container">
            <form onSubmit={handleSubmit}>
                <h2>
                    Login
                </h2>

                <div className="form-group">
                    <label htmlFor="username">
                        username:
                    </label >
                    <input type="text" id = "username"  value={username}  onChange={(e)=>{setUsername(e.target.value)}}/>
                </div>

                <div className="form-group">
                    <label htmlFor="password">
                        password:
                    </label >
                    <input type="text" id = "password"  value={password}  onChange={(e)=>{setPassword(e.target.value)}} />
                </div>

                <button type="submit">Login</button>

                </form>

    </div>    
}