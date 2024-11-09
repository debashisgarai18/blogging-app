import CircularProgress from "@mui/material/CircularProgress";

const Loading = () => {
  return (
    <>
      <div className="w-screen h-screen absolute top-0 left-0 bg-white opacity-70 z-40"></div>
      <div className="w-screen h-screen absolute bg-transparent flex items-center justify-center z-50">
        <div className="w-full flex flex-col gap-[1rem] items-center justify-center">
          <CircularProgress size="5%" />
          <div className="text-[2.75rem]">Loading...</div>
        </div>
      </div>
    </>
  );
};

export default Loading;
