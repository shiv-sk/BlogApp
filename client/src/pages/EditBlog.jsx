import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import { useBlog } from "../context/BlogContext";
import ReactQuill from "react-quill-new";

export default function EditBlog(){
    const {blogId} = useParams();
    const [blogData , setBlogData] = useState({
        title:"",
        image:null,
        content:""
    });
    const {getBlog , updateBlog , isLoading} = useBlog();
    useEffect(()=>{
        const fetchBlog = async()=>{
            const response = await getBlog(blogId);
            if(response){
                setBlogData({title:response?.title , content:response.content , image:response.coverImage});
            }
        }
        fetchBlog();
    } , [blogId]);
    const handleUpdate = async(e)=>{
        e.preventDefault();
        try {
            const formData = new FormData();
            formData.append("title" , blogData.title);
            formData.append("content" , blogData.content);
            formData.append("image" , blogData.image);
            const response = await updateBlog(formData , blogId);
            console.log("the response is editPage! " , response);
        } catch (error) {
            console.log("error from editPage is! " , error);
        }
    }
    console.log("the blog data is! " , blogData);
    return(
        <div className="flex flex-col gap-6 justify-start items-center min-h-screen py-10">
            <input 
            type="text" 
            placeholder="Type here" 
            className="input w-full max-w-lg" 
            required
            value={blogData?.title}
            onChange={(e)=>setBlogData({...blogData , title:e.target.value})}/>
            <div className="w-full max-w-lg">
                <label className="block mb-2 text-sm font-medium text-gray-700">Cover Image</label>    
                <input
                type="file" 
                className="file-input file-input-bordered w-full" 
                required
                onChange={(e) => setBlogData({ ...blogData, image: e.target.files[0] })}/>
                <p className="text-xs text-gray-500 mt-1">Max size 2MB</p>
            </div>
            <div className="w-full max-w-2xl overflow-auto">
                <ReactQuill theme="snow" value={blogData.content} onChange={(content)=>setBlogData({...blogData , content})}/>
            </div>
            <div className="w-full max-w-sm">
                <button className="btn w-full" onClick={handleUpdate} 
                disabled={isLoading}>{isLoading ? "Processing...." :"Submit"}</button>
            </div>
        </div>
    )
}