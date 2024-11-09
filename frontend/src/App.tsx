import { lazy, Suspense } from "react";
import Loading from "./components/Loading";

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

export default App;
