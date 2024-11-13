import HomeNavbar from "@/components/HomeNavbar";
import Loading from "@/components/Loading";
import { useLoadingContext } from "@/Hooks/myLoadingHook";
import axios, { AxiosError } from "axios";
import { BACKEND_URL } from "../../config/config";
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { BsDot } from "react-icons/bs";
import { AiTwotoneEdit } from "react-icons/ai";
import { AiOutlineDelete } from "react-icons/ai";
import { CiSaveUp2 } from "react-icons/ci";
import { TextareaAutosize } from "@mui/base/TextareaAutosize";
import { updatePostType } from "@deba018/blogs-common";
import Swal from "sweetalert2";

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
      <div className="flex flex-col items-center">
        <HomeNavbar userName={userName} email={email} />
        <ShowBlogDetails blogid={blogId} userName={userName} email={email} />
      </div>
    </>
  );
};

const ShowBlogDetails = ({
  blogid,
  userName,
  email,
}: {
  blogid: string;
  userName: string;
  email: string;
}) => {
  interface postType {
    id: string;
    title: string;
    content: string;
    thumbnail: string;
    publishedOn: string;
    author: string;
    authorId: string;
  }

  // states
  const [post, setPost] = useState<postType>({
    id: "",
    title: "",
    content: "",
    thumbnail: "",
    publishedOn: "",
    author: "",
    authorId: "",
  });
  const [avatarHover, setAvatarHover] = useState<boolean>(false);
  const [enableEdit, setEnableEdit] = useState<boolean>(false);
  const [updatedInput, setUpdatedInput] = useState<updatePostType>({
    title: "",
    content: "",
  });

  // hooks
  const { setIsLoading } = useLoadingContext();
  const nav = useNavigate();

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
        setPost(response.data.message);
      } catch (err) {
        const error = err as AxiosError<{ message: string }>;
        console.log(`Some axios error : ${error}`);
      }
    })();
  }, [blogid, setIsLoading]);

  // function to upload the updated inputs to the DB
  const handleSaveButton = async () => {
    setEnableEdit((prev) => !prev);

    // send the api call to the edit endpoint
    try {
      setIsLoading((prev) => !prev);
      const resp = await axios.put(
        `${BACKEND_URL}v1/blog/updateBlog/${blogid}`,
        updatedInput,
        {
          headers: {
            Authorization: localStorage.getItem("token"),
            "Content-Type": "application/json",
          },
        }
      );
      setIsLoading((prev) => !prev);
      if (resp) {
        Swal.fire({
          icon: "success",
          title: "success",
          text: "Blog updated successfully",
          confirmButtonColor: "#000000",
        });
      }

      // recall the function to make the smae Api call again
      (async function () {
        try {
          setIsLoading((prev) => !prev);
          const response = await axios.get(`${BACKEND_URL}v1/blog/${blogid}`, {
            headers: {
              Authorization: localStorage.getItem("token"),
            },
          });
          setIsLoading((prev) => !prev);
          setPost(response.data.message);
        } catch (err) {
          const error = err as AxiosError<{ message: string }>;
          console.log(`Some axios error : ${error}`);
        }
      })();
    } catch (err) {
      const error = err as AxiosError<{ message: string }>;
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: error.response?.data?.message,
        confirmButtonColor: "#000000",
      });
      nav(`/displayBlog?user=${userName}&email=${email}}`);
    }
  };

  // function to delete a particular blog
  const handleDeleteButton = async () => {
    try {
      setIsLoading((prev) => !prev);
      const resp = await axios.delete(
        `${BACKEND_URL}v1/blog/deleteBlog/${blogid}`,
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      );
      setIsLoading((prev) => !prev);
      if (resp) {
        Swal.fire({
          icon: "success",
          title: "Sucess",
          text: "The Blog is deleted successfully",
          confirmButtonColor: "#000000",
        });
      }
      nav(`/home?user=${userName}&email=${email}`);
    } catch (err) {
      const error = err as AxiosError<{ message: string }>;
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: error.response?.data?.message,
        confirmButtonColor: "#000000",
      });
      nav(`/displayBlog?user=${userName}&email=${email}}`);
    }
  };

  return (
    <>
      <div className="w-full relative md:w-[50%] px-[1rem] md:px-0 py-[2rem] leading-tight flex flex-col gap-[1rem]">
        {/* // title */}
        {enableEdit ? (
          <input
            type="text"
            defaultValue={post.title}
            className="w-full text-[42px] placeholder:font-medium px-[1rem] py-[1rem] outline-none border-l-2 border-white focus:border-l-2 focus:border-[#B3B3B1]"
            style={{
              fontFamily: `sohne, "Helvetica Neue", Helvetica, Arial, sans-serif`,
            }}
            onChange={(e) =>
              setUpdatedInput({ ...updatedInput, title: e.target.value })
            }
          />
        ) : (
          <div
            className="w-full text-[42px] font-bold capitalize"
            style={{
              fontFamily: `sohne, "Helvetica Neue", Helvetica, Arial, sans-serif`,
            }}
          >
            {post.title}
          </div>
        )}
        {/* // avatar and username */}
        <div className="w-full flex items-center gap-[0.75rem]">
          {/* // avatar */}
          <div
            className="w-[2.3rem] h-[2.3rem] rounded-[50%] flex items-center justify-center bg-black cursor-pointer uppercase text-white font-medium"
            onMouseEnter={() => setAvatarHover(true)}
            onMouseLeave={() => setAvatarHover(false)}
          >
            {post.author && post.author[0]}
          </div>
          {/* // username, duration and date */}
          <div className="flex flex-col">
            <div className="flex items-center gap-[0.2rem]">
              <div className="capitalize hover:underline cursor-pointer">
                {post.author}
              </div>
              <div className="text-xs">
                <BsDot />
              </div>
              <div>Follow</div>
            </div>
            <div className="flex items-center gap-[0.2rem]">
              <div>{Math.floor(post.content.length / 60)} min(s) read</div>
              <div className="text-xs">
                <BsDot />
              </div>
              <div>
                {/* {String(dayjs(post.publishedOn))} */}
                {post.publishedOn.split("T")[0].split("-").reverse().join("-")}
              </div>
            </div>
          </div>
        </div>
        {avatarHover && (
          <div className="absolute w-[25%] top-[147px] md:top-[170px] md:left-[-2%] left-[3%]">
            <AvatarHoverCard name={post.author} />
          </div>
        )}
        {/* //edit and delete button part */}
        <div className="w-full border-y-[1px] border-y-[#F2F2F2] py-[1rem] flex justify-end">
          <div className="flex gap-[1rem]">
            {!enableEdit ? (
              <button
                className="py-[0.3rem] px-[1rem] text-white bg-black rounded-full flex items-center justify-center gap-[0.5rem]"
                onClick={() => setEnableEdit((prev) => !prev)}
              >
                <AiTwotoneEdit />
                <div className="hidden md:block">Edit</div>
              </button>
            ) : (
              <button
                className="py-[0.3rem] px-[1rem] text-white bg-black rounded-full flex items-center justify-center gap-[0.5rem]"
                onClick={handleSaveButton}
              >
                <CiSaveUp2 />
                <div className="hidden md:block">Save</div>
              </button>
            )}
            <button
              className="py-[0.5rem] px-[1rem] text-white bg-black rounded-full flex items-center justify-center gap-[0.5rem]"
              onClick={handleDeleteButton}
            >
              <AiOutlineDelete />
              <div className="hidden md:block">Delete</div>
            </button>
          </div>
        </div>
        {/* thumbnail part */}
        <div className="w-full h-[450px]">
          {post.thumbnail.match(
            /^https:\/\/res\.cloudinary\.com\/dsqym1wwy\/image\/upload\/(.+)?$/
          ) ? (
            <img
              src={post.thumbnail}
              alt="image"
              className="w-full h-full object-cover"
            />
          ) : (
            <img
              src="https://images.pexels.com/photos/9881302/pexels-photo-9881302.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
              alt="no thumbnail"
              className="w-full h-full object-cover"
            />
          )}
        </div>
        {/* content part */}
        {enableEdit ? (
          <TextareaAutosize
            className="text-[21px] border-l-2 border-white w-full px-[1rem] py-[1rem] outline-none focus:border-l-2 focus:border-[#B3B3B1]"
            defaultValue={post.content}
            style={{
              fontFamily: `source-serif-pro, Georgia, Cambria, "Times New Roman", Times, serif`,
            }}
            onChange={(e) =>
              setUpdatedInput({ ...updatedInput, content: e.target.value })
            }
          />
        ) : (
          <div
            className="w-full text-xl"
            style={{
              fontFamily: `source-serif-pro, Georgia, Cambria, "Times New Roman", Times, serif`,
            }}
          >
            {post.content}
          </div>
        )}
      </div>
    </>
  );
};

const AvatarHoverCard = ({ name }: { name: string }) => {
  return (
    <div className="p-[1rem] w-full bg-white shadow-lg rounded-xl flex flex-col gap-[1rem] justify-center">
      <div className="w-full flex items-end justify-between">
        <div className="w-[4.75rem] h-[4.75rem] rounded-[50%] flex items-center justify-center bg-black cursor-pointer uppercase text-white text-4xl font-bold">
          {name[0]}
        </div>
        {/* // todo : can add a follow button */}
        {/* <div className="px-[0.5rem] text-center bg-black text-white py-[0.3rem] rounded-full">
          <button>Follow</button>
        </div> */}
      </div>
      <div className="text-2xl font-medium capitalize">{name}</div>
    </div>
  );
};
export default DisplayBlog;
