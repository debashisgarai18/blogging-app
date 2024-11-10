import { useNavigate, useSearchParams } from "react-router-dom";
import HomeNavbar from "../components/HomeNavbar";
import { ViewBlogs } from "../components/TaskSection";
import { useEffect } from "react";
import axios, { AxiosError } from "axios";
import { BACKEND_URL } from "../../config/config";
import { useLoadingContext } from "../Hooks/myLoadingHook";
import Loading from "../components/Loading";
import Swal from "sweetalert2";

const Home = () => {
  const nav = useNavigate();

  // states
  const { isLoading, setIsLoading } = useLoadingContext();
  const [searchParams] = useSearchParams();

  // get the username
  const user = searchParams.get("user") ?? "";
  const email = searchParams.get("email") ?? "";

  // function to check that the endpoint is authenticated or not
  // if not send it back to the homepage to signin
  useEffect(() => {
    (async function () {
      if (
        localStorage.getItem("token") &&
        user.length > 0 &&
        email.length > 0
      ) {
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
          alert("You are not authenticated!!");
          nav("/");
        }
      } else if (
        (user.length === 0 || email.length === 0) &&
        localStorage.getItem("token")
      ) {
        localStorage.removeItem("token");
        nav("/");
      } else {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "You are not Authenticated",
          confirmButtonColor: "#000000"
        });
        nav("/");
      }
    })();
  }, [nav, setIsLoading, user, email]);

  return (
    <>
      {isLoading && <Loading />}
      <div className="w-full flex items-center flex-col">
        <HomeNavbar userName={user} email={email} />
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
