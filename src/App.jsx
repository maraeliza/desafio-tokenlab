import { HashRouter as Router, Routes, Route } from "react-router-dom";

import ScreenLogin from "./screens/screenLogin.jsx";
import ScreenRegister from "./screens/screenRegister.jsx";
import ScreenHome from "./screens/screenHome.jsx";

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

import 'bootstrap/dist/js/bootstrap.bundle.min';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/registro" element={<ScreenRegister />} />
        <Route path="/login" element={<ScreenLogin />} />

        <Route path="/home" element={<ScreenHome />} />
        <Route path="/" element={<ScreenLogin />} />
      </Routes>
    </Router>
  );
};

export default App;
