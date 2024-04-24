import { Outlet } from "react-router-dom";
import "./App.css";
import NavItems from "./components/NavItems";
import Footer from "./components/Footer";

function App() {
  return (
    <div className="App">
      <>
        <NavItems />
        <Outlet />
        <Footer />
      </>
    </div>
  );
}

export default App;
