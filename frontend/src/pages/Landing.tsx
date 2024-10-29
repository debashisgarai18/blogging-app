import ParentButton from "../components/ParentButton";
import Logo from "../assets/logo.webp";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useState } from "react";
import { SigninContext } from "../Context";
import { useMySignincontext } from "../Hooks/mySigninContextHook";
import { RxCross2 } from "react-icons/rx";

const Landing = () => {
  const [isSigninActive, setSigninActive] = useState(false);
  return (
    <>
      <SigninContext.Provider value={{ isSigninActive, setSigninActive }}>
        <Navbar />
      </SigninContext.Provider>
      <div className="w-full py-[1rem] h-[90vh] bg-[#F7F4ED] flex justify-end items-center">
        <div className="w-full md:w-[63%] h-[500px] flex flex-col justify-center px-[1rem] gap-[2.75rem]">
          <div
            className="text-[80px] md:text-[120px] leading-[72px] md:leading-[100px]  flex flex-col justify-center"
            style={{
              fontFamily: `gt-super, Georgia, Cambria, "Times New Roman", Times, serif`,
            }}
          >
            <div>Human</div>
            <div>stories & ideas</div>
          </div>
          <div
            className="text-[22px] tracking-wide"
            style={{
              fontFamily: `sohne, "Helvetica Neue", Helvetica, Arial, sans-serif`,
            }}
          >
            A place to read, write, and deepen your understanding
          </div>
          <div>
            <ParentButton
              label="Start Reading"
              textSize="text-2xl"
              adjustText="text-lg"
              width="w-[10rem]"
              fontFamily={`sohne, "Helvetica Neue", Helvetica, Arial, sans-serif`}
              borderRadius="rounded-[2.5rem]"
            />
          </div>
        </div>
        <div className="hidden md:block w-[20%] h-[500px]">
          <img src={Logo} alt="Logo" className="w-full h-full object-contain" />
        </div>
      </div>
      <Footer />
      {isSigninActive && (
        <SigninContext.Provider value={{ isSigninActive, setSigninActive }}>
          <AuthComponent />
        </SigninContext.Provider>
      )}
    </>
  );
};

const AuthComponent = () => {
  const { setSigninActive } = useMySignincontext();
  const [authPref, setAuthPref] = useState<string>("signin");
  return (
    <>
      <div className="absolute bg-white h-screen w-full top-0 text-white opacity-[0.95]"></div>
      <div className="absolute flex items-center justify-center bg-transparent h-screen w-full top-0 z-10">
        <div className="md:w-[40%] md:h-[80%] w-full h-screen bg-white shadow-xl rounded-xl relative px-[2rem] py-[3rem]">
          <RxCross2
            className="absolute top-5 right-5 text-black text-2xl cursor-pointer"
            onClick={() => setSigninActive(false)}
          />
          {authPref === "signin" ? (
            <AuthData
              label="Welcome back."
              setAuthPref={setAuthPref}
              authPref={authPref}
            />
          ) : (
            <AuthData
              label="Join Blogspot."
              setAuthPref={setAuthPref}
              authPref={authPref}
            />
          )}
        </div>
      </div>
    </>
  );
};

interface AuthProps {
  label: string;
  setAuthPref: React.Dispatch<React.SetStateAction<string>>;
  authPref: string;
}

const AuthData = ({ label, setAuthPref, authPref }: AuthProps) => {
  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <div className="w-full h-full flex flex-col gap-[5rem] items-center justify-center">
      <div
        className="w-full text-center text-[28px]"
        style={{
          fontFamily: `gt-super, Georgia, Cambria, "Times New Roman", Times, serif`,
        }}
      >
        {label}
      </div>
      <div className="w-full flex flex-col items-center justify-center gap-[2.5rem]">
        <form
          action="submit"
          onSubmit={handleFormSubmit}
          className="w-[70%] flex flex-col gap-[1.75rem]"
        >
          <div
            className={`w-full ${authPref === "signin" ? "hidden" : "block"}`}
          >
            <input
              type="text"
              name=""
              className="w-full px-[1rem] py-[1rem] border-[1px] border-[#6b6b6b] rounded-3xl focus:outline-none "
              placeholder="Full Name"
            />
          </div>
          <div className="w-full">
            <input
              type="text"
              name=""
              className="w-full px-[1rem] py-[1rem] border-[1px] border-[#6b6b6b] rounded-3xl focus:outline-none "
              placeholder="Email"
            />
          </div>
          <div className="w-full">
            <input
              type="text"
              name=""
              className="w-full px-[1rem] py-[1rem] border-[1px] border-[#6b6b6b] rounded-3xl focus:outline-none "
              placeholder="Password"
            />
          </div>
        </form>
        <div
          className="w-full text-center text-[16px]"
          style={{
            fontFamily: `sohne, "Helvetica Neue", Helvetica, Arial, sans-serif`,
          }}
        >
          {authPref === "signin" ? (
            <>
              <span>No account? </span>
              <span
                className="font-bold text-[#156d12] cursor-pointer"
                onClick={() => setAuthPref("signup")}
              >
                Create One
              </span>
            </>
          ) : (
            <>
              <span>Already have an account? </span>
              <span
                className="font-bold text-[#156d12] cursor-pointer"
                onClick={() => setAuthPref("signin")}
              >
                Sign In
              </span>
            </>
          )}
        </div>
      </div>
      <div className="w-[70%] flex items-center justify-center flex-col gap-[1.75rem] text-[13px] text-[#6b6b6b]">
        <div className="text-center">
          Forgot email or trouble signing in?{" "}
          <span className="underline cursor-pointer">Get Help</span>
        </div>
        <div className="text-center">
          Click “Sign in” to agree to Medium&apos;s{" "}
          <span className="underline cursor-pointer">Terms of Service</span> and
          acknowledge that Medium&apos;s{" "}
          <span className="underline cursor-pointer">Privacy Policy</span>{" "}
          applies to you.
        </div>
      </div>
    </div>
  );
};

export default Landing;
