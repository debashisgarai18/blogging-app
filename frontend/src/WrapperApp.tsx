import { BrowserRouter, Route, Routes } from "react-router-dom";
import Landing from "./pages/Landing";
import Home from "./pages/Home";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
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
            <Route path="/signin" element={<Signin />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/postblog" element={<WriteBlog />} />
          </Routes>
        </isLoadingContext.Provider>
      </BrowserRouter>
    </>
  );
};

export default WrapperApp;
