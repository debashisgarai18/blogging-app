import { useNavigate } from "react-router-dom";
import HomeNavbar from "../components/HomeNavbar";
import { ViewBlogs } from "../components/TaskSection";
import { useEffect } from "react";
import axios, { AxiosError } from "axios";
import { BACKEND_URL } from "../../config";

// todo : need to add the loading secene in the axios request.. loading should be stated to true till the request is completed
const Home = () => {
  const nav = useNavigate()

  // function to cehck that the endpoint is authenticated or not
  // if not send it back to the homepage to signin
  useEffect(() => {
    (async function(){
      if(localStorage.getItem("token")){
        try{
          const resp = await axios.get(`${BACKEND_URL}v1/user/me`, {
            headers : {
              Authorization : localStorage.getItem("token")
            }
          })
          if(resp){
            console.log("Authenticated")
          }
        }
        catch(err){
          const error = err as AxiosError<{message : string}>
          console.log(`Some error : ${error.response?.data?.message}`)
          alert("you are not authenticated")
          nav("/")
        }
      }
      else{
        alert("you are not signed in!!")
        nav("/")
      }
    })()
  }, [nav])

  return (
    <div className="w-full flex items-center flex-col">
      <HomeNavbar />
      <BlogContainer />
    </div>
  );
};

const BlogContainer = () => {
  return (
    <div className="w-full md:w-[60%]">
      <ViewBlogs />
    </div>
  );
};

export default Home;
