import { BrowserRouter, Route, Routes } from "react-router-dom";
import Landing from "./pages/Landing";
import Home from "./pages/Home";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import WriteBlog from "./pages/WriteBlog";


// TODO : Add lazy loading to the components -> React.lazy
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/home" element={<Home />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/postblog" element={<WriteBlog />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
