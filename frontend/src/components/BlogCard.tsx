import { useLoadingContext } from "@/Hooks/myLoadingHook";
import { useRef } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

const BlogCard = ({
  content,
}: {
  content: Array<{
    id: string;
    title: string;
    content: string;
    thumbnail: string;
    publishedOn: string;
    author: string;
  }>;
}) => {
  // hooks
  const [searchParams] = useSearchParams();
  const nav = useNavigate();
  const { setIsLoading } = useLoadingContext();
  const userName = searchParams.get("user");
  const email = searchParams.get("email");
  const imageRef = useRef<HTMLImageElement>(null);

  return (
    <div className="w-full flex flex-col cursor-pointer">
      {content.map((e) => {
        return (
          <div
            className="flex w-full py-[1rem] border-b-[1px] gap-[1rem] border-b-[#6B6B6B] flex-col"
            onClick={() => {
              setIsLoading((prev) => !prev);
              nav(
                `/displayBlog?user=${userName}&email=${email}&blogid=${e.id}`
              );
              setIsLoading((prev) => !prev);
            }}
            key={e.id}
          >
            {/* // avatar + username */}
            <div className="w-full flex items-center gap-[0.5rem]">
              <div className="w-[1.75rem] h-[1.75rem] flex items-center justify-center bg-black text-white rounded-full">
                <div className="uppercase text-xs">{e.author[0]}</div>
              </div>
              <div
                className="capitalize font-medium text-sm"
                style={{
                  fontFamily: `sohne, "Helvetica Neue", Helvetica, Arial, sans-serif`,
                }}
              >
                {e.author}
              </div>
            </div>
            {/* // title + content + thumbnail */}
            <div
              className="w-full flex justify-between"
              style={{
                fontFamily: `medium-content-sans-serif-font, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif`,
              }}
            >
              {/* // title + content */}
              <div className="w-[75%] h-full flex flex-col gap-[0.5rem]">
                <div className="w-full text-xl md:text-3xl font-bold break-words">
                  {e.title}
                </div>
                <div className="w-full text-[#6B6B6B] break-word overflow-ellipsis">
                  {e.content.length > 250
                    ? `${e.content.slice(0, 250)}...`
                    : e.content}
                </div>
              </div>
              {/* // thumbnail */}
              <div className="w-[20%] h-full">
                {/* // match the regex for the URL */}
                {e.thumbnail.match(/^https:\/\/res\.cloudinary\.com\/dsqym1wwy\/image\/upload\/(.+)?$/) ? (
                  <img
                    ref={imageRef}
                    src={e.thumbnail}
                    alt="image"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <img
                    src="https://images.pexels.com/photos/9881302/pexels-photo-9881302.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                    alt="no thumbnail"
                    className="w-full h-full object-cover"
                  />
                )}
              </div>
            </div>
            {/* //footer -> date + min read + delete button */}
            <div className="w-full text-[#6B6B6B] flex items-center justify-between">
              <div className="flex items-center gap-[0.5rem]">
                <div>{e.publishedOn.split("T")[0]}</div>
                <div>{Math.floor(e.content.length / 60)} min(s) read</div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
export default BlogCard;
