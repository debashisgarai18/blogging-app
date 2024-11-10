import { useLoadingContext } from "@/Hooks/myLoadingHook";
import axios, { AxiosError } from "axios";
import { BACKEND_URL } from "../../config/config";
import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { IoIosNotificationsOutline } from "react-icons/io";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { TextareaAutosize } from "@mui/base/TextareaAutosize";
import Loading from "@/components/Loading";

const WriteBlog = () => {
  // hooks
  const [searchParams] = useSearchParams();
  const nav = useNavigate();

  // states
  const user = searchParams.get("user") ?? "";
  const email = searchParams.get("email") ?? "";
  const { isLoading, setIsLoading } = useLoadingContext();

  // functions
  // this should load if there exists a token in the localStorage
  useEffect(() => {
    if (localStorage.getItem("token")) {
      // auth with me endpoint
      const checkUserAuth = async () => {
        try {
          setIsLoading((prev) => !prev);
          const resp = await axios.get(`${BACKEND_URL}v1/user/me`, {
            headers: {
              Authorization: localStorage.getItem("token"),
            },
          });
          setIsLoading((prev) => !prev);
          if (resp) console.log("Endpoint protected");
        } catch (err) {
          const error = err as AxiosError<{ message: string }>;
          console.log(`Some axios error : ${error.response?.data?.message}`);
          alert("You are not authenticated");
          nav("/");
        }
      };

      checkUserAuth();
    } else {
      alert("You must be logged in to write a blog");
      nav("/");
    }
  }, [nav, setIsLoading]);

  return (
    <>
      {isLoading && <Loading />}
      <div className="w-full h-screen flex flex-col items-center gap-[2.5rem]">
        <PostBlogNavbar userName={user} email={email} />
        <PostBlogContent />
      </div>
    </>
  );
};

const PostBlogNavbar = ({
  userName,
  email,
}: {
  userName: string;
  email: string;
}) => {
  const nav = useNavigate();

  // states
  const { setIsLoading } = useLoadingContext();

  return (
    <>
      <div className="w-full md:w-[80%]">
        <div className="w-full flex justify-between px-[2rem] py-[1rem] ">
          <div className="flex items-center gap-[0.75rem]">
            <div
              className="text-3xl font-bold cursor-pointer"
              onClick={() => nav(`/home?user=${userName}&email=${email}`)}
            >
              Blogspot
            </div>
            <div className="capitalize hidden md:block">draft</div>
          </div>
          <div
            className="flex items-center gap-[1rem]"
            style={{
              fontFamily: `sohne, "Helvetica Neue", Helvetica, Arial, sans-serif`,
            }}
          >
            {/* // todo : display the error message if someone tries to publish with empty fields
            // todo : change the color of the button till the fields are not filled */}
            <div>
              <button className="text-base bg-[#1e8f1a] hover:bg-[#0F730C] text-white px-[0.75rem] py-[0.3rem] rounded-full">
                Publish
              </button>
            </div>
            <div>
              <IoIosNotificationsOutline className="text-2xl text-[#7D7D7D] hover:text-black cursor-pointer" />
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger className="text-lg md:text-2xl font-semibold text-white">
                <div className="w-[2.3rem] h-[2.3rem] rounded-[50%] flex items-center justify-center bg-black cursor-pointer uppercase">
                  {userName[0]}
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel className="text-sm md:text-base flex items-center gap-[0.5rem] py-[1rem]">
                  <div className="w-[2.3rem] h-[2.3rem] text-white rounded-[50%] flex items-center justify-center bg-black cursor-pointer uppercase">
                    {userName[0]}
                  </div>
                  <div className="fles flex-col justify-center">
                    <div className="capitalize">{userName}</div>
                    <div className="font-thin text-sm">@{email}</div>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <div>
                  <DropdownMenuItem
                    className="text-sm md:text-base px-[0.75rem] cursor-pointer"
                    onClick={() =>
                      nav(`/postBlog?user=${userName}&email=${email}`)
                    }
                  >
                    Write
                  </DropdownMenuItem>
                  <DropdownMenuItem className="text-sm md:text-base px-[0.75rem] cursor-pointer">
                    Edit Profile
                  </DropdownMenuItem>
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-sm md:text-base">
                  <button
                    className="bg-black w-full text-white px-[0.75rem] py-[0.5rem] rounded-full text-sm md:text-base"
                    style={{
                      fontFamily: `sohne, "Helvetica Neue", Helvetica, Arial, sans-serif`,
                    }}
                    onClick={() => {
                      setIsLoading((prev) => !prev);
                      localStorage.removeItem("token");
                      nav("/");
                      setIsLoading((prev) => !prev);
                    }}
                  >
                    {" "}
                    Sign Out{" "}
                  </button>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </>
  );
};

const PostBlogContent = () => {
  return (
    <>
      <div className="w-full md:w-[60%] flex flex-col items-center gap-[1rem] justify-center">
        <input
          type="text"
          placeholder="Title"
          className="w-full text-[42px] placeholder:font-medium px-[1rem] py-[1rem] outline-none border-l-2 border-white focus:border-l-2 focus:border-[#B3B3B1]"
        />
        <TextareaAutosize
          className="text-[21px] border-l-2 border-white w-full px-[1rem] py-[1rem] outline-none focus:border-l-2 focus:border-[#B3B3B1]"
          placeholder="Tell your story..."
        />
        {/* // todo : add a file upload input box.. which will upload a file in the */}
        {/* // todo : cloudinary and receive the cloudinary link */}
      </div>
    </>
  );
};

export default WriteBlog;
