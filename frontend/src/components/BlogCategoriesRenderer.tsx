import { IoAddSharp } from "react-icons/io5";

// todo : to be taken from the original postgres DB
const demoCategories = [
  "For you",
  "Following",
  "Data Engineering",
  "Science",
  "Music",
];

export const BlogCategoriesRenderer = () => {
  return (
    <>
    <div className="w-full flex justify-between items-center overflow-clip">
      <button className="bg-white hover:bg-[#e7e6e6] flex items-center justify-center rounded-[50%] h-[1.5rem] w-[1.5rem]">
        <IoAddSharp />
      </button>
      {demoCategories.map((_, idx) => {
        return (
          <button
            key={idx}
            className="text-[#8E8E8E] hover:text-black text-[14px] py-[1rem] border-b-[1px] border-b-[#eae9e9] focus:border-b-[1px] focus:border-b-black z-10"
            style={{
              fontFamily: `sohne, "Helvetica Neue", Helvetica, Arial, sans-serif`,
            }}
          >
            {_}
          </button>
        );
    })}
    </div>
    <div className="w-full h-[1px] bg-[#eae9e9] absolute bottom-0 left-0"></div>
    </>
  );
};