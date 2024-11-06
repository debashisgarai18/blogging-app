import { lazy, Suspense } from "react";
import CircularProgress from "@mui/material/CircularProgress";

const WrapperApp = lazy(() => import("./WrapperApp"));

function App() {
  return (
    <>
      <Suspense fallback={<Loading />}>
        <WrapperApp />
      </Suspense>
    </>
  );
}

const Loading = () => {
  return (
    <div className="w-screen h-screen bg-[#F7F4ED] flex items-center justify-center">
      <div className="w-full flex flex-col gap-[1rem] items-center justify-center">
        <CircularProgress size="10%" />
        <div className="text-[2.75rem]">Loading...</div>
      </div>
    </div>
  );
};

export default App;
