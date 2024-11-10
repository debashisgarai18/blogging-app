import CircularProgress from "@mui/material/CircularProgress";

const Loading = () => {
  return (
    <>
      <div className="w-full h-full absolute top-0 left-0 bg-white opacity-80 z-40"></div>
      <div className="w-full h-full absolute bg-transparent flex items-center justify-center z-50">
        <div className="w-full flex flex-col gap-[1rem] items-center justify-center">
          <CircularProgress size="5%" />
          <div className="text-[1.5rem] md:text-[2.75rem] font-medium">
            Loading...
          </div>
        </div>
      </div>
    </>
  );
};

export default Loading;
