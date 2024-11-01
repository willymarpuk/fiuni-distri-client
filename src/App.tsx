import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import NavBar from "./components/nav/NavBar";
import ProtectedRoute from "./components/routes/ProtectedRoute";
import Forbiden from "./pages/error/Forbiden";
import NotFound from "./pages/error/NotFound";
import Login from "./pages/auth/Login";
import SignUp from "./pages/auth/SignUp";
import Role from "./pages/role/Role";
import CreateRole from "./pages/role/CreateRole";

function App() {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/">

          {/* Public routes */}
          <Route index element={<Home />} />
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<SignUp />} />
          <Route path="about" element={<About />} />

          {/* Authenticated routes */}
          <Route element={<ProtectedRoute />}>
            <Route path="role/">
              <Route path="" element={<Role />} />
              <Route path="create" element={<CreateRole />} />
            </Route>
          </Route>

          {/* Authorized routes */}
          <Route></Route>

          {/* Error routes */}
          <Route path="forbiden" element={<Forbiden />} />
          <Route path="*" element={<NotFound />} />

        </Route>
      </Routes>
    </>
  );
}

export default App;