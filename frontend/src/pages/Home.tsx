import { useNavigate, useSearchParams } from "react-router-dom";
import HomeNavbar from "../components/HomeNavbar";
import { ViewBlogs } from "../components/TaskSection";
import { useEffect } from "react";
import axios, { AxiosError } from "axios";
import { BACKEND_URL } from "../../config/config";
import { useLoadingContext } from "../Hooks/myLoadingHook";
import Loading from "../components/Loading";

const Home = () => {
  const nav = useNavigate();

  // states
  const { isLoading, setIsLoading } = useLoadingContext();
  const [searchParams] = useSearchParams();

  // get the username
  const user = searchParams.get("user") || "";

  // function to cehck that the endpoint is authenticated or not
  // if not send it back to the homepage to signin
  useEffect(() => {
    (async function () {
      if (localStorage.getItem("token")) {
        try {
          setIsLoading((prev) => !prev);
          const resp = await axios.get(`${BACKEND_URL}v1/user/me`, {
            headers: {
              Authorization: localStorage.getItem("token"),
            },
          });
          setIsLoading((prev) => !prev);
          if (resp) {
            console.log("Authenticated");
          }
        } catch (err) {
          const error = err as AxiosError<{ message: string }>;
          console.log(`Some error : ${error.response?.data?.message}`);
          alert("You are not authenticated")
          nav("/");
        }
      } else {
        alert("you are not signed in!!");
        nav("/");
      }
    })();
  }, [nav, setIsLoading]);

  return (
    <>
      {isLoading && <Loading />}
      <div className="w-full flex items-center flex-col">
        <HomeNavbar userName={user} />
        <BlogContainer />
      </div>
    </>
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
