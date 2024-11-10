import { useEffect, useState } from "react";
import { BlogCategoriesRenderer } from "./BlogCategoriesRenderer";
import axios, { AxiosError } from "axios";
import { BACKEND_URL } from "../../config/config";
import BlogCard from "./BlogCard";
import { useLoadingContext } from "@/Hooks/myLoadingHook";

export const ViewBlogs = () => {
  return (
    <div className="w-full py-[2rem] flex gap-[1rem]">
      <Allblogs />
      <Suggestions />
    </div>
  );
};

const Allblogs = () => {
  // hooks
  const {setIsLoading} = useLoadingContext()

  // states
  const [blogContent, setBlogContent] = useState<Array<{
    id : string,
    title : string,
    content : string,
    thumbnail : string,
    publishedOn : string,
    author : string
  }>>([])

  // functions
  // render all the blogs from the backend
  useEffect(() => {
    (async function(){
      try{
        setIsLoading(prev => !prev)
        const resp = await axios.get(`${BACKEND_URL}v1/blog/bulk`, {
          headers : {
            Authorization : localStorage.getItem("token")
          }
        })
        setIsLoading(prev => !prev)
        console.log(resp.data.message)
        setBlogContent(resp.data.message)
      }
      catch(err){
        const error = err as AxiosError<{message : string}>
        console.log(`Some Axios Error : ${error.response?.data?.message}`)
      }
    })()
  }, [])
  
  return <div className="w-full md:w-[75%] px-[1rem]">
    <BlogCategoriesRenderer />
    <BlogCard content={blogContent}/>
  </div>;
};

const Suggestions = () => {
  return <div className="w-[25%] hidden md:block bg-cyan-300 h-full">suggest</div>;
};
