/* eslint-disable react/prop-types */
import { createContext, useContext, useState } from "react";
import {baseUrl, getAndDeleteReq, postAndPatchReq} from "../apiCalls/apiCall";

const blogContext = createContext({
    blog:null,
    blogs:[],
    getAllBlogs:()=>{},
    getBlog:()=>{},
    updateBlog:()=>{},
    deleteBlog:()=>{},
    newBlog:()=>{},
    getUserBlogs:()=>{},
})

const useBlog = ()=>useContext(blogContext);
const BlogProvider = ({children})=>{
    const [isLoading , setIsLoading] = useState(false);
    const [isError , setIsError] = useState(false);
    const newBlog = async(data)=>{
        try {
            setIsLoading(true);
            const response = await postAndPatchReq(`${baseUrl}/blog/newblog` , "post" , data , true);
            console.log("response from blogContext! " , response);
            return response;
        } catch (error) {
            console.log("error from blogContext! " , error);
            setIsError(true);
        }finally{
            setIsLoading(false);
        }
    }
    const getAllBlogs = async()=>{
        try {
            setIsLoading(true);
            const response = await getAndDeleteReq(`${baseUrl}/blog/allblogs` , "get");
            console.log("response from blogContext! " , response);
            return response?.data;
        } catch (error) {
            console.log("error from blogContext! " , error);
            setIsError(true);
        }finally{
            setIsLoading(false);
        }
    }
    const getBlog = async(blogId)=>{
        try {
            setIsLoading(true);
            const response = await getAndDeleteReq(`${baseUrl}/blog/${blogId}` , "get");
            console.log("response from blogContext! " , response);
            return response?.data;
        } catch (error) {
            console.log("error from blogContext! " , error);
            setIsError(true);
        }finally{
            setIsLoading(false);
        }
    }
    const updateBlog = async(data , blogId)=>{
        try {
            setIsLoading(true);
            const response = await postAndPatchReq(`${baseUrl}/blog/updateblog/${blogId}` , "patch" , data , true);
            console.log("response from blogContext! " , response);
            return response?.data;
        } catch (error) {
            console.log("error from blogContext! " , error);
            setIsError(true);
        }finally{
            setIsLoading(false);
        }
    }
    const deleteBlog = async(blogId)=>{
        try {
            setIsLoading(true);
            const response = await getAndDeleteReq(`${baseUrl}/blog/deleteblog/${blogId}` , "delete");
            console.log("response from blogContext! " , response);
            return response?.data;
        } catch (error) {
            console.log("error from blogContext! " , error);
            setIsError(true);
        }finally{
            setIsLoading(false);
        }
    }
    const getUserBlogs = async(userId)=>{
        try {
            setIsLoading(true);
            if(userId){
                const response = await getAndDeleteReq(`${baseUrl}/blog/userblogs/${userId}` , "get");
                console.log("response from blogContext! " , response);
                return response?.data;
            }
            
        } catch (error) {
            console.log("error from blogContext! " , error);
            setIsError(true);
        }finally{
            setIsLoading(false);
        }
    }
    return(
        <blogContext.Provider value={{isError , isLoading , getAllBlogs , getBlog , 
        updateBlog , deleteBlog , getUserBlogs , newBlog}}>
        {children}</blogContext.Provider>
    )
}

export {BlogProvider , useBlog};