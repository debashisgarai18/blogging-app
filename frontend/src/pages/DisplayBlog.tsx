import HomeNavbar from "@/components/HomeNavbar";
import { useSearchParams } from "react-router-dom";

const DisplayBlog = () => {
  // hooks
  const [searchParams] = useSearchParams();
  const userName = searchParams.get("user") ?? "";
  const email = searchParams.get("email") ?? "";

  return (
    <div>
      <HomeNavbar userName={userName} email={email} />
    </div>
  );
};

export default DisplayBlog;
