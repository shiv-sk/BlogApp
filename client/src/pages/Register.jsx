import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useState } from "react";

export default function Register(){
    const navigate = useNavigate();
    const {registerUser , isLoading} = useAuth();
    const [userData , setUserData] = useState({
        name:"",
        email:"",
        password:""
    })
    const handleOnChange = (e)=>{
        setUserData({...userData , [e.target.name]:e.target.value})
    }
    const handleRegister = async (e)=>{
        e.preventDefault();
        try {
            const response = await registerUser(userData);
            if(response){
                navigate("/");
            }
        } catch (error) {
            console.log("error from handleRegister! " , error);
        }
    }
    return(
        <div className="flex flex-col justify-center items-center min-h-screen gap-4">
            <div className="max-w-sm w-full bg-base-100 p-6 rounded-lg shadow-md">
                <h1 className="text-center font-bold text-2xl mb-1.5">Register</h1>
                <div className="">
                    <form className="flex flex-col gap-4" onSubmit={handleRegister}>
                    <input
                    name="name" 
                    type="text" 
                    placeholder="Enter your name" 
                    className="input w-full" 
                    required
                    value={userData.name}
                    onChange={handleOnChange}/>
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
                    <p>Already have an account <Link to={"/login"}>
                    <span className="hover:border-b-2 hover:text-blue-500">Login</span></Link></p>
                    <button className="btn w-full" type="submit">{isLoading ? "Registering" : "Register"}</button>
                    </form>
                </div>
            </div>
        </div>
    )
}