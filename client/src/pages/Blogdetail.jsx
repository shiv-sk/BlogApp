import { useParams } from "react-router-dom"
import { useBlog } from "../context/BlogContext";
import { useEffect, useState } from "react";
import DOMPurify from 'dompurify';

export default function BlogDetail(){
    const {blogId} = useParams();
    const {getBlog , isLoading} = useBlog();
    const [blog , setBlog] = useState(null);
    useEffect(()=>{
        const fetchBlog = async()=>{
            const response = await getBlog(blogId);
            if(response){
                setBlog(response);
            }
        }
        fetchBlog();
    } , [blogId]);
    console.log("thr blog is! " , blog);
    return(
        <div className="max-w-4xl mx-auto p-6">
            {
                isLoading ? "loading..." :
                blog ? (
                    <>
                        <h1 className="text-4xl font-bold mb-4">{blog.title || "blogTitle"}</h1>
                    
                        <div className="flex items-center gap-4 text-sm text-gray-500 mb-6">
                            <span>By John Doe</span>
                            <span>•</span>
                            <span>Published on Feb 19, 2025</span>
                        </div>
                    
                        <img  
                            src={blog.coverImage || "link not found..."}
                            alt="BlogCoverImage"
                            className="rounded-lg w-full mb-6"
                        />
                        <div className="space-y-4 text-lg leading-relaxed prose max-w-none" 
                        dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(blog.content) }}/>
                    </>
                ) : "blog is not found..."
            }
              
        </div>
    )
}