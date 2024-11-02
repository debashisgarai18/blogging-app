import { BlogCategoriesRenderer } from "./BlogCategoriesRenderer";

export const ViewBlogs = () => {
  return (
    <div className="w-full h-full py-[2rem] flex gap-[1rem]">
      <Allblogs />
      <Suggestions />
    </div>
  );
};

const Allblogs = () => {
  return <div className="w-[75%] px-[1rem] h-full relative">
    <BlogCategoriesRenderer />
  </div>;
};

const Suggestions = () => {
  return <div className="w-[25%] bg-cyan-300 h-full">suggest</div>;
};
