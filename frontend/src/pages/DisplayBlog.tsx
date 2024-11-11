import HomeNavbar from "@/components/HomeNavbar";
import Loading from "@/components/Loading";
import { useLoadingContext } from "@/Hooks/myLoadingHook";
import axios, { AxiosError } from "axios";
import { BACKEND_URL } from "../../config/config";
import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";

const DisplayBlog = () => {
  // hooks
  const { isLoading } = useLoadingContext();
  const [searchParams] = useSearchParams();
  const userName = searchParams.get("user") ?? "";
  const email = searchParams.get("email") ?? "";
  const blogId = searchParams.get("blogid") ?? "";

  return (
    <>
      {isLoading && <Loading />}
      <div className="flex flex-col ">
        <HomeNavbar userName={userName} email={email} />
        <ShowBlogDetails blogid={blogId} />
      </div>
    </>
  );
};

const ShowBlogDetails = ({ blogid }: { blogid: string }) => {
  // hooks
  const { setIsLoading } = useLoadingContext();

  // functions
  // function to fetch the blog data given the blogId
  useEffect(() => {
    (async function () {
      try {
        setIsLoading((prev) => !prev);
        const response = await axios.get(`${BACKEND_URL}v1/blog/${blogid}`, {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        });
        setIsLoading((prev) => !prev);
        console.log(response.data);
      } catch (err) {
        const error = err as AxiosError<{ message: string }>;
        console.log(`Some axios error : ${error}`);
      }
    })();
  }, [blogid, setIsLoading]);

  return <div></div>;
};

export default DisplayBlog;
