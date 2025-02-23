import { useEffect, useState } from 'react';
import ReactQuill from 'react-quill-new';
// import 'react-quill-new/dist/quill.snow.css';
import { useBlog } from '../context/BlogContext';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function NewBlog(){
    const navigate = useNavigate();
    const {newBlog , isLoading} = useBlog();
    const {user} = useAuth();
    const [blogData , setBlogData] = useState({
        title:"",
        image:null,
        content:"",
        author:null
    })
    useEffect(()=>{
        if(user?._id){
            setBlogData((prevData)=>({
                ...prevData,
                author:user._id
            }))
        }
    } , [user]);
    const handleFile = (e)=>{
        setBlogData({...blogData , image:e.target.files[0]})
    }
    const handleNewBlog = async (e)=>{
        e.preventDefault();
        try {
            const formData = new FormData();
            formData.append("title", blogData.title);
            formData.append("image", blogData.image);
            formData.append("content", blogData.content);
            formData.append("author" , blogData.author);
            console.log("Submitting with author:", blogData.author);
            const response = await newBlog(formData);
            if(response){
                navigate("/myblogs");
            }
        } catch (error) {
            console.log("error from newBlogPage! " , error);
        }
    }
    return(
        <div className="flex flex-col gap-6 justify-start items-center min-h-screen py-10">
            <input 
            type="text" 
            placeholder="Type here" 
            className="input w-full max-w-lg" 
            required
            value={blogData.title}
            onChange={(e)=>setBlogData({...blogData , title:e.target.value})}/>
            <div className="w-full max-w-lg">
                <label className="block mb-2 text-sm font-medium text-gray-700">Cover Image</label>    
                <input
                type="file" 
                className="file-input file-input-bordered w-full" 
                required
                onChange={handleFile}/>
                <p className="text-xs text-gray-500 mt-1">Max size 2MB</p>
            </div>
            <div className="w-full max-w-2xl overflow-auto">
                <ReactQuill theme="snow" value={blogData.content} onChange={(content)=>setBlogData({...blogData , content})}/>
            </div>
            <div className="w-full max-w-sm">
                <button className="btn w-full" onClick={handleNewBlog} 
                disabled={isLoading}>{isLoading ? "Processing...." :"Submit"}</button>
            </div>
        </div>
    )
}