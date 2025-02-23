/* eslint-disable react/prop-types */
import { createContext, useContext, useState } from "react";
import { baseUrl, getAndDeleteReq, postAndPatchReq } from "../apiCalls/apiCall";

const commentContext = createContext({
    newComment:()=>{},
    allComments:()=>{},
})

const useComment = ()=>useContext(commentContext);
const CommentProvider = ({children})=>{
    const [isError , setIsError] = useState(false);
    const [isLoading , setIsLoading] = useState(false);
    const allComments = async(blogId)=>{
        try {
            setIsLoading(true);
            const response = await getAndDeleteReq(`${baseUrl}/comment/${blogId}` , "get");
            console.log("response from CommentContext! " , response);
            return response;
        } catch (error) {
            console.log("error from commentContext! " , error);
            setIsError(true);
        }finally{
            setIsLoading(false);
        }
    }
    const newComment = async(data)=>{
        try {
            setIsLoading(true);
            const response = await postAndPatchReq(`${baseUrl}/comment/new` , "post" , data );
            console.log("response from CommentContext! " , response);
            return response;
        } catch (error) {
            console.log("error from commentContext! " , error);
            setIsError(true);
        }finally{
            setIsLoading(false);
        }
    }

    return(
        <commentContext.Provider value={{newComment , allComments , isError , isLoading}}>{children}</commentContext.Provider>
    )
}

export {useComment , CommentProvider};