import HomeNavbar from "../components/HomeNavbar";
import { ViewBlogs } from "../components/TaskSection";

const Home = () => {
  return (
    <div className="w-full flex items-center flex-col">
      <HomeNavbar />
      <BlogContainer />
    </div>
  );
};

const BlogContainer = () => {
  return (
    <div className="w-full md:w-[60%]">
      <ViewBlogs />
    </div>
  );
};

export default Home;
