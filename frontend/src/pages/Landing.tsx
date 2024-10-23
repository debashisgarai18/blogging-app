import ParentButton from "../components/ParentButton";
import Logo from "../assets/logo.webp";

const Landing = () => {
  return (
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
  );
};

export default Landing;
