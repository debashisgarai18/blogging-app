import { useLoadingContext } from "@/Hooks/myLoadingHook";
import axios, { AxiosError } from "axios";
import { BACKEND_URL, CLOUDINARY_CLOUD_NAME } from "../../config/config";
import React, { useEffect, useState } from "react";
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
import { postInputType } from "@deba018/blogs-common";
import Swal from "sweetalert2";

const WriteBlog = () => {
  // hooks
  const [searchParams] = useSearchParams();
  const nav = useNavigate();

  // states
  const user = searchParams.get("user") ?? "";
  const email = searchParams.get("email") ?? "";
  const { isLoading, setIsLoading } = useLoadingContext();
  const [blogInput, setBlogInput] = useState<postInputType>({
    title: "",
    content: "",
    thumbnail: "",
  });

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
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "You are not Authenticated",
            confirmButtonColor: "#000000",
          });
          nav("/");
        }
      };

      checkUserAuth();
    } else {
      alert("You must be logged in to write a blog");
      nav("/");
    }
  }, [nav, setIsLoading]);

  // function to handle the publishing of the data to the DB
  const handlePublish = async () => {
    // just a check that the title and the content cannot be empty
    if (blogInput.title.length <= 0 || blogInput.content.length <= 0) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Title or Content be empty",
        confirmButtonColor: "#000000",
      });
      return;
    }

    console.log(blogInput);
    
    // upload the data to the db -> if all the fields are present
    try {
      setIsLoading((prev) => !prev);
      await axios.post(`${BACKEND_URL}v1/blog/postBlog`, blogInput, {
        headers: {
          Authorization: localStorage.getItem("token"),
          "Content-Type": "application/json",
        },
      });
      setIsLoading((prev) => !prev);
      Swal.fire({
        icon: "success",
        title: "Suceess",
        text: "Blog Uploaded",
        confirmButtonColor: "#000000",
      });
      nav(`/home?user=${user}&email=${email}`);
    } catch (err) {
      const error = err as AxiosError<{ message: string }>;
      console.log(`Some err : ${error.response?.data?.message}`);
    }
  };

  return (
    <>
      {isLoading && <Loading />}
      <div className="w-full h-screen flex flex-col items-center gap-[2.5rem]">
        <PostBlogNavbar userName={user} email={email} publish={handlePublish} />
        <PostBlogContent
          setTitle={(e: React.ChangeEvent<HTMLInputElement>) =>
            setBlogInput({ ...blogInput, title: e.target.value })
          }
          setContent={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
            setBlogInput({ ...blogInput, content: e.target.value })
          }
          setThumbnail={(url: string) =>
            setBlogInput({ ...blogInput, thumbnail: url })
          }
        />
      </div>
    </>
  );
};

const PostBlogNavbar = ({
  userName,
  email,
  publish,
}: {
  userName: string;
  email: string;
  publish: () => void;
}) => {
  // hooks
  const nav = useNavigate();
  const { setIsLoading } = useLoadingContext();

  return (
    <>
      <div className="w-full md:w-[80%]">
        <div className="w-full flex justify-between px-[2rem] py-[1rem] ">
          <div className="flex items-center gap-[0.75rem]">
            <div
              className="text-3xl font-bold cursor-pointer"
              onClick={() => {
                setIsLoading((prev) => !prev);
                nav(`/home?user=${userName}&email=${email}`);
                setIsLoading((prev) => !prev);
              }}
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
            {/* // todo : handle the publish request from here.. not from the upload button */}
            <div>
              <button
                className="text-base bg-[#1e8f1a] hover:bg-[#0F730C] text-white px-[0.75rem] py-[0.3rem] rounded-full"
                onClick={publish}
              >
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

const PostBlogContent = ({
  setTitle,
  setContent,
  setThumbnail,
}: {
  setTitle: (e: React.ChangeEvent<HTMLInputElement>) => void;
  setContent: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  setThumbnail: (url: string) => void;
}) => {
  // todo : move these states and the functions to the parent component
  // states
  const [file, setFile] = useState<File | null>(null);

  // functions
  const handleFileInput = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) setFile(selectedFile);
  };

  // function to submit the filename to the endpoint
  // todo :this function will only uplaod the image to the cloudinary and set the image link to the global state
  const handleSubmit = async () => {
    // process to upload data to the cloudinary
    if (file) {
      const fileData = new FormData();
      fileData.append("file", file);
      fileData.append("folder", "blogspot_thumbnails");
      fileData.append("upload_preset", "blogspot_thumbnail");

      // send the api request to  upload the file
      try {
        const resp = await axios.post(
          `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`,
          fileData
        );
        setThumbnail(resp.data.secure_url);

        // upload the data to the db as postBlogs
      } catch (err) {
        const error = err as AxiosError<{ error: { message: string } }>;
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: error.response?.data?.error.message,
          confirmButtonColor: "#000000",
        });
      }
    }
  };
  return (
    <>
      <div className="w-full md:w-[60%] flex flex-col gap-[1rem] justify-center">
        <input
          type="text"
          placeholder="Title"
          className="w-full text-[42px] placeholder:font-medium px-[1rem] py-[1rem] outline-none border-l-2 border-white focus:border-l-2 focus:border-[#B3B3B1]"
          onChange={(e) => setTitle(e)}
        />
        <TextareaAutosize
          className="text-[21px] border-l-2 border-white w-full px-[1rem] py-[1rem] outline-none focus:border-l-2 focus:border-[#B3B3B1]"
          placeholder="Tell your story..."
          onChange={(e) => setContent(e)}
        />
        <div className="flex flex-col px-[1rem] gap-[0.75rem]">
          <label>Upload a Thumbnail</label>
          {/* // todo : later => customize the input button */}
          <input
            type="file"
            className="cursor-pointer"
            onChange={handleFileInput}
          />
          <button
            className="w-[18%] bg-black py-[0.3rem] font-medium text-base md:text-lg rounded-full text-white"
            onClick={handleSubmit}
          >
            Upload
          </button>
        </div>
      </div>
    </>
  );
};

export default WriteBlog;
