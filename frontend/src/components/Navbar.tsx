import ParentButton from "./ParentButton";

const Navbar = () => {
  return (
    <>
      <div className="w-full border-b-[2px] bg-transparent border-b-black z-10 py-[1rem] flex items-center justify-center sticky top-0">
        <div className="w-full h-full opacity-90 bg-white absolute top-0 z-[-1]"></div>
        <div className="w-full px-[1rem] md:px-0 md:w-[65%] flex items-center justify-between">
          <div className="text-3xl font-bold">Blogspot</div>
          <div className="flex items-center gap-[1.5rem]">
            <div className="cursor-pointer hidden md:block">Our Story</div>
            <div className="cursor-pointer hidden md:block">Membership</div>
            <div className="cursor-pointer hidden md:block">Write</div>
            <div className="cursor-pointer hidden sm:block">Sign in</div>
            <div>
              <ParentButton label="Get Started" textSize="text-sm" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
