import "./App.css";
import { BrowserRouter as Router, useRoutes } from "react-router-dom";

import LoginForm from "./componentes/Login/LoginForm";
import Registro from "./componentes/Login/Registro";

const Rutas = () => {
  let routes = useRoutes([
    { path: "/", element: <LoginForm></LoginForm> },
    { path: "/loggedIn", element: <>Logged In</> },
    { path: "/register/", element: <Registro></Registro> },
  ]);
  return routes;
};

function App() {
  return (
    <>
      <Router>
        <Rutas></Rutas>
      </Router>
    </>
  );
}
export default App;
