import { IoAddSharp } from "react-icons/io5";
import { useNavigate, useSearchParams } from "react-router-dom";

// todo : to be taken from the original postgres DB ->  modify the DB according to the categories
const demoCategories = [
  "For you",
  "Following",
  "Data Engineering",
  "Science",
  "Music",
];

export const BlogCategoriesRenderer = () => {

  
  // hooks
  const [searchParams] = useSearchParams();
  const nav = useNavigate();
  const user = searchParams.get("user") ?? "";
  const email = searchParams.get("email") ?? "";


  return (
    <>
      <div className="w-full hidden md:flex justify-between items-center overflow-clip md:sticky top-0 bg-white">
        <button
          className="bg-white hover:bg-[#e7e6e6] flex items-center justify-center rounded-[50%] h-[1.5rem] w-[1.5rem]"
          onClick={() => {
            nav(`/postBlog?user=${user}&email=${email}`);
          }}
        >
          <IoAddSharp />
        </button>
        {demoCategories.map((_, idx) => {
          return (
            <button
              key={idx}
              className="text-[#8E8E8E] hover:text-black text-[14px] py-[1rem] border-b-[1px] border-b-white focus:border-b-[1px] focus:border-b-black z-10"
              style={{
                fontFamily: `sohne, "Helvetica Neue", Helvetica, Arial, sans-serif`,
              }}
            >
              {_}
            </button>
          );
        })}
      </div>
    </>
  );
};
