import { BrowserRouter, Route, Routes } from "react-router-dom";
import Landing from "./pages/Landing";
import Home from "./pages/Home";
import WriteBlog from "./pages/WriteBlog";
import { useState } from "react";
import { isLoadingContext } from "./Context";

const WrapperApp = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  return (
    <>
      <BrowserRouter>
        <isLoadingContext.Provider value={{ isLoading, setIsLoading }}>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/home" element={<Home />} />
            <Route path="/postblog" element={<WriteBlog />} />
          </Routes>
        </isLoadingContext.Provider>
      </BrowserRouter>
    </>
  );
};

export default WrapperApp;
