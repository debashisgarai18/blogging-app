import ParentButton from "./ParentButton";
import { useMySignincontext } from "../Hooks/mySigninContextHook";

const Navbar = () => {
  // taking the value of the setSigninActive from the custom hook
  const { setSigninActive } = useMySignincontext();
  return (
    <>
      <div className="w-[100vw] border-b-[1px] bg-transparent border-b-black z-1 py-[1rem] flex items-center justify-center sticky top-0">
        <div className="w-full h-full opacity-90 bg-[#F7F4ED] absolute top-0 z-[-1]"></div>
        <div className="w-full px-[1rem] md:px-0 md:w-[65%] flex items-center justify-between">
          <div className="text-3xl font-bold">Blogspot</div>
          <div className="flex items-center gap-[1.5rem]">
            <div className="cursor-pointer hidden md:block">Our Story</div>
            <div className="cursor-pointer hidden md:block">Membership</div>
            <div className="cursor-pointer hidden md:block">Write</div>
            <div
              className="cursor-pointer hidden sm:block"
              onClick={() => setSigninActive(true)}
            >
              Sign in
            </div>
            <div>
              <ParentButton
                label="Get Started"
                textSize="text-sm"
                width="w-full"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
