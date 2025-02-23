import { useEffect, useState } from "react";
import { useBlog } from "../context/BlogContext"
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";


export default function MyBlogs(){
    const [blogs , setBlogs] = useState([]);
    console.log("the userblogs are! " , blogs)
    const {getUserBlogs} = useBlog();
    const {user} = useAuth();
    useEffect(()=>{
        const fetchAllBlogs = async ()=>{
            if(!user?._id){return}
            // console.log(await getUserBlogs(user?._id))
            const response = await getUserBlogs(user?._id);
            if(response){
                setBlogs(response || []);
            }
        }
        fetchAllBlogs();
        // console.log(getUserBlogs())
    } , [user]);
    return(
        <div className="flex flex-wrap gap-4 justify-center items-center ">
            {
                blogs && blogs.length > 0 ? blogs.map((blog)=>(
                    <div className="card bg-base-100 w-96 shadow-sm" key={blog._id}>
                        <figure className="px-10 pt-10">
                            <img
                            src={blog?.coverImage || "blogCoverimage"}
                            alt="Shoes"
                            className="rounded-xl" />
                        </figure>
                        <div className="card-body items-center text-center">
                            <h2 className="card-title">{blog?.title || "blogTitle"}</h2>
                            <div className="card-actions">
                            <Link to={`/blog/edit/${blog._id}`}><button className="btn btn-primary">Edit</button></Link>
                            <Link><button className="btn btn-primary">Delete</button></Link>
                            <Link to={`blog/${blog?._id}`}><button className="btn btn-primary">More</button></Link>
                            </div>
                        </div>
                    </div>
                )) : "you have not created blogs yet..."
            }
            
        </div>
    )
}