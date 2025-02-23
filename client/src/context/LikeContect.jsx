import { createContext, useContext } from "react";

const likeContext = createContext({
    likeDislike:()=>{}
})
const useLike = ()=>useContext(likeContext);
const LikeProvider = ()=>{}

export {LikeProvider , useLike}