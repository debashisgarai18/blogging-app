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

const WriteBlog = () => {
  // hooks
  const [searchParams] = useSearchParams();
  const nav = useNavigate();

  // states
  const user = searchParams.get("user") ?? "";
  const { setIsLoading } = useLoadingContext();

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
    <div className="w-full h-screen flex flex-col items-center gap-[2.5rem]">
      <PostBlogNavbar userName={user} />
      <PostBlogContent />
    </div>
  );
};

const PostBlogNavbar = ({ userName }: { userName: string }) => {
  const nav = useNavigate();

  return (
    <>
      <div className="w-full md:w-[80%]">
        <div className="w-full flex justify-between px-[2rem] py-[1rem] ">
          <div className="flex items-center gap-[0.75rem]">
            <div
              className="text-3xl font-bold"
              onClick={() => nav(`/home?user=${userName}`)}
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
            {/* // todo : modify this dropdown menu according to the website */}
            <DropdownMenu>
              <div className="w-[2.3rem] h-[2.3rem] rounded-[50%] flex items-center justify-center bg-black cursor-pointer">
                <DropdownMenuTrigger className="text-2xl font-semibold text-white">
                  {userName[0]}
                </DropdownMenuTrigger>
              </div>
              <DropdownMenuContent>
                <DropdownMenuLabel className="text-sm md:text-base">
                  My Account
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-sm md:text-base">
                  Edit Profile
                </DropdownMenuItem>
                <DropdownMenuItem className="text-sm md:text-base">
                  <button
                    className="bg-black w-full text-white px-[0.75rem] py-[0.5rem] rounded-full text-sm md:text-base"
                    style={{
                      fontFamily: `sohne, "Helvetica Neue", Helvetica, Arial, sans-serif`,
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
