// import { CiSearch } from "react-icons/ci";
import { HiOutlinePencilAlt } from "react-icons/hi";
import { IoIosNotificationsOutline } from "react-icons/io";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useLoadingContext } from "@/Hooks/myLoadingHook";
import { useNavigate } from "react-router-dom";

const HomeNavbar = ({
  userName,
  email,
}: {
  userName: string;
  email: string;
}) => {
  // hooks
  const { setIsLoading } = useLoadingContext();
  const nav = useNavigate();

  // states

  return (
    <div className="w-full flex justify-between px-[2rem] bg-white z-10 md:bg-white sticky top-0 md:relative py-[1rem] border-b-[1px] border-b-[#f2f1f1]">
      <div className="flex items-center gap-[1rem]">
        <div
          className="text-3xl font-bold cursor-pointer"
          onClick={() => nav(`/home?user=${userName}&email=${email}`)}
        >
          Blogspot
        </div>
        {/* <div className="items-center gap-[0.5rem] bg-[#F9F9F9] px-[0.75rem] py-[0.5rem] rounded-full hidden md:flex">
          <div>
            <input
              type="text"
              className="outline-none bg-transparent"
              placeholder="Search"
            />
          </div>
          <CiSearch className="text-2xl cursor-pointer" />
        </div> */}
      </div>
      <div
        className="flex items-center gap-[1rem]"
        style={{
          fontFamily: `sohne, "Helvetica Neue", Helvetica, Arial, sans-serif`,
        }}
      >
        <div
          className=" md:flex hidden items-center text-[#7D7D7D] hover:text-black gap-[0.5rem] cursor-pointer"
          onClick={() => {
            setIsLoading((prev) => !prev);
            nav(`/postBlog?user=${userName}&email=${email}`);
            setIsLoading((prev) => !prev);
          }}
        >
          <HiOutlinePencilAlt className="text-2xl" />
          <div>Write</div>
        </div>
        {/* <CiSearch className="text-2xl block md:hidden" /> */}
        <div>
          <IoIosNotificationsOutline className="text-2xl text-[#7D7D7D] hover:text-black cursor-pointer" />
        </div>
        <DropdownMenu>
              <DropdownMenuTrigger className="text-lg md:text-2xl font-semibold text-white m-[1rem]">
                <div className="w-[2.3rem] h-[2.3rem] rounded-[50%] flex items-center justify-center bg-black cursor-pointer uppercase">
                  {userName && userName[0]}
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel className="text-sm md:text-base flex items-center gap-[0.5rem] py-[1rem]">
                  <div className="w-[1.75rem] h-[1.75rem] md:w-[2.3rem] md:h-[2.3rem] text-white rounded-[50%] flex items-center justify-center text-xs md:text-base bg-black cursor-pointer uppercase">
                    {userName && userName[0]}
                  </div>
                  <div className="fles flex-col justify-center">
                    <div className="capitalize hidden md:block">{userName}</div>
                    <div className="font-thin text-sm">@{email}</div>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <div>
                  <DropdownMenuItem className="text-sm md:text-base px-[0.75rem] cursor-pointer" onClick={() => nav(`/postBlog?user=${userName}&email=${email}}`)}>
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
  );
};

export default HomeNavbar;
