import ParentButton from "./ParentButton";

const Navbar = () => {
  return (
    <div className="w-full border-b-[2px] border-b-black py-[1rem] flex items-center justify-center">
      <div className="w-[65%] flex items-center justify-between">
        <div className="text-3xl font-bold">Blogspot</div>
        <div className="flex items-center gap-[1.5rem]">
          <div className="cursor-pointer">Our Story</div>
          <div className="cursor-pointer">Membership</div>
          <div className="cursor-pointer">Write</div>
          <div className="cursor-pointer">Sign in</div>
          <div>
            <ParentButton label="Get Started" textSize="text-sm" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
