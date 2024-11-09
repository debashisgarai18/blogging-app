import { CiSearch } from "react-icons/ci";
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

const HomeNavbar = ({ userAvatar }: { userAvatar: string }) => {
  // hooks
  const { setIsLoading } = useLoadingContext();
  const nav = useNavigate();

  // states

  // function calls
  const handleSignout = () => {
    setIsLoading((prev) => !prev);
    localStorage.removeItem("token");
    nav("/");
    setIsLoading((prev) => !prev);
  };

  return (
    <div className="w-full flex justify-between px-[2rem] py-[1rem] border-b-[1px] border-b-[#f2f1f1]">
      <div className="flex items-center gap-[1rem]">
        <div className="text-3xl font-bold">Blogspot</div>
        <div className="items-center gap-[0.5rem] bg-[#F9F9F9] px-[0.75rem] py-[0.5rem] rounded-full hidden md:flex">
          <CiSearch className="text-2xl" />
          <div>
            <input
              type="text"
              className="outline-none bg-transparent"
              placeholder="Search"
            />
          </div>
        </div>
      </div>
      <div
        className="flex items-center gap-[1rem]"
        style={{
          fontFamily: `sohne, "Helvetica Neue", Helvetica, Arial, sans-serif`,
        }}
      >
        <div className=" md:flex hidden items-center text-[#7D7D7D] hover:text-black gap-[0.5rem] cursor-pointer">
          <HiOutlinePencilAlt className="text-2xl" />
          <div>Write</div>
        </div>
        <CiSearch className="text-2xl block md:hidden" />
        <div>
          <IoIosNotificationsOutline className="text-2xl text-[#7D7D7D] hover:text-black cursor-pointer" />
        </div>
        <DropdownMenu>
          <div className="w-[2.3rem] h-[2.3rem] rounded-[50%] flex items-center justify-center bg-black cursor-pointer">
            <DropdownMenuTrigger className="text-2xl font-semibold text-white">
              {userAvatar}
            </DropdownMenuTrigger>
          </div>
          <DropdownMenuContent>
            <DropdownMenuLabel className="text-lg md:text-xl">
              My Account
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-lg md:text-xl">
              Edit Profile
            </DropdownMenuItem>
            <DropdownMenuItem className="text-lg md:text-xl">
              <button
                className="bg-black w-full text-white px-[1rem] py-[0.75rem] rounded-full text-xl"
                style={{
                  fontFamily: `sohne, "Helvetica Neue", Helvetica, Arial, sans-serif`,
                }}
                onClick={handleSignout}
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
