import { useEffect, useState } from "react";
import "./App.css";
import AuthView from "./views/AuthView.tsx";
import DashboardView from "./views/DashboardView.tsx";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  useEffect(() => {
    const handleStorageChange = () => {
      const token = localStorage.getItem("jwt");
      if (token === null) setIsLoggedIn(false);
      else setIsLoggedIn(true);
      console.log(token)
    };
    window.addEventListener("storageEvent", handleStorageChange);
    handleStorageChange();
    // return () => {
    //   window.removeEventListener("storage", handleStorageChange);
    // };
  }, []);

  return (
    <div className="w-full h-screen ">
      {!isLoggedIn ? <AuthView /> : <DashboardView  />}
    </div>
  );
}

export default App;
