import { useState } from "react"
import { useAuth } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";

export default function Login(){
    const navigate = useNavigate();
    const {loginUser , isLoading} = useAuth();
    const [userData , setUserData] = useState({
        email:"",
        password:""
    })
    const handleLogin = async (e)=>{
        e.preventDefault();
        try {
            const response = await loginUser(userData);
            if(response){
                navigate("/");
            }
        } catch (error) {
            console.log("error from loginPage! " , error);
        }
    };
    const handleOnChange = (e)=>{
        setUserData({...userData , [e.target.name]:e.target.value});
    };
    return(
        <div className="flex flex-col justify-center items-center min-h-screen gap-4">
            <div className="max-w-sm w-full bg-base-100 p-6 rounded-lg shadow-md">
                <h1 className="text-center font-bold text-2xl mb-1.5">Login</h1>
                <div className="">
                    <form className="flex flex-col gap-4" onSubmit={handleLogin}>
                    <input
                    name="email" 
                    type="email" 
                    placeholder="exp@email.com" 
                    className="input w-full" 
                    required
                    value={userData.email}
                    onChange={handleOnChange}/>
                    <input
                    name="password" 
                    type="password" 
                    placeholder="pass@123" 
                    className="input w-full" 
                    required
                    value={userData.password}
                    onChange={handleOnChange}/>
                    <p> Create a new account <Link to={"/register"}>
                    <span className="hover:border-b-2 hover:text-blue-500">Register</span></Link></p>
                    <button className="btn w-full">{isLoading ? "signingin" : "Login"}</button>
                    </form>
                </div>
            </div>
        </div>
    )
}