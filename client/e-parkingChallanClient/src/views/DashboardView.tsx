import { useState } from "react";
import NavBar from "../Components/NavBar";
import { FaExclamationTriangle, FaCar, FaMoneyBillWave, FaTools, FaSignOutAlt } from "react-icons/fa";
import MenuButton from "../Components/MenuButton";
import ViolationsView from "./ViolationsView";
import VehiclesView from "./VehiclesView";
import AnnualTaxView from "./AnnualTaxView";
import Settings from "./Settings";

const DashboardView = () => {
  const [isActive, SetIsactive] = useState("Violations");
  const handleClick = (value:string) => {
    SetIsactive(value)
    console.log(value)
  }
  const handleLogout = () => {
    localStorage.removeItem("jwt");
    window.dispatchEvent(new Event("storageEvent"));
  }
  return (
    <div className="w-full h-full ">
      <NavBar />
      <div className="flex items-center main">
        <div className="menu h-full w-14 pt-3">
          <MenuButton isActive={isActive} handleClick={handleClick} title="Violations" Icon={FaExclamationTriangle} />
          <MenuButton isActive={isActive} handleClick={handleClick} title="Vehicles" Icon={FaCar} />
          <MenuButton isActive={isActive} handleClick={handleClick} title="Annual-tax" Icon={FaMoneyBillWave} />
          <MenuButton isActive={isActive} handleClick={handleClick} title="Settings" Icon={FaTools} />
          <MenuButton isActive={isActive} handleClick={handleLogout} title="Logout" Icon={FaSignOutAlt} />
        </div>
        <div className="main-view h-full p-3">
          {isActive === "Violations" && <ViolationsView />}
          {isActive === "Vehicles" && <VehiclesView />}
          {isActive === "Annual-tax" && <AnnualTaxView />}
          {isActive === "Settings" && <Settings />}
        </div>
      </div>
    </div>
  );
};
export default DashboardView;
