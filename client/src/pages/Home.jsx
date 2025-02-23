import { useEffect, useState } from "react";
import { useBlog } from "../context/BlogContext"
import { Link } from "react-router-dom";

export default function Home(){
    const [blogs , setBlogs] = useState([])
    const {getAllBlogs , isLoading} = useBlog();
    useEffect(()=>{
        const fetchAllBlogs = async()=>{
            const response = await getAllBlogs();
            if(response){
                setBlogs(response);
            }
        }
        fetchAllBlogs();
    } , []);
    return(
        <div className="flex flex-wrap gap-4 justify-center items-center ">
            {
                isLoading ? "loading...." :
                blogs && blogs.length > 0 ? blogs.map((blog)=>(
                        <div className="card bg-base-100 w-96 shadow-sm" key={blog._id}>
                        <figure className="px-10 pt-10">
                            <img
                            src={blog?.coverImage || ""}
                            alt="blogCoverImage"
                            className="rounded-xl" />
                        </figure>
                        <div className="card-body items-center text-center">
                            <h2 className="card-title">{blog?.title || ""}</h2>
                            <p>{blog?.content || ""}</p>
                            <div className="card-actions">
                            <Link to={`blog/${blog._id}`}><button className="btn btn-primary">More</button></Link>
                            </div>
                        </div>
                        </div>
                )) : "there are no blogs!"
            }
        </div>
    )
}