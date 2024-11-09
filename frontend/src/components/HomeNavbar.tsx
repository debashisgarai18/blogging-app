import { CiSearch } from "react-icons/ci";
import { HiOutlinePencilAlt } from "react-icons/hi";
import { IoIosNotificationsOutline } from "react-icons/io";

const HomeNavbar = () => {
  return (
    <div className="w-full flex justify-between p-[1rem] border-b-[1px] border-b-[#f2f1f1]">
      <div className="flex items-center gap-[1rem]">
        <div className="text-3xl font-bold">Blogspot</div>
        <div className="items-center gap-[0.5rem] bg-[#F9F9F9] px-[0.75rem] py-[0.5rem] rounded-full hidden md:flex">
          <CiSearch className="text-2xl" />
          <div>
            <input type="text" className="outline-none bg-transparent" placeholder="Search" />
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
        <div className="w-[2.3rem] h-[2.3rem] rounded-[50%] flex items-center justify-center bg-red-300 cursor-pointer">
          {/* // TODO : Place the pic of the user / Avatar */}
          <div className="text-xl font-medium">D</div>
        </div>
      </div>
    </div>
  );
};

export default HomeNavbar;
