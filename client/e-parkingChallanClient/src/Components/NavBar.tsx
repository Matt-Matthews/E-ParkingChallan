import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";
import { User } from "../interfaces/user";



const NavBar = () => {
  const [user, setUser] = useState<User>();
  const [initials, setInitials] = useState("");
  useEffect(() => {
    const token = localStorage.getItem("jwt");
    if (token !== null) {
      const decoded = jwtDecode<User>(token);
      console.log(decoded);
      setUser(decoded);
      setInitials(decoded.firstName[0] + decoded.lastName[0]);
    }
  }, []);
  return (
    <div className="w-full flex pr-3 items-center  justify-between">
      <div className="h-full flex items-center">
        <div className="w-14 menu h-14 mr-3"></div>
        <h3 className="font-bold">E-Parking Challan</h3>
      </div>
      <div className="flex items-center cursor-pointer">
        <p>{user?.firstName + " " + user?.lastName}</p>
        <div className="w-10 h-10 menu rounded-full flex text-white font-bold items-center justify-center ml-3">
          {initials}
        </div>
      </div>
    </div>
  );
};

export default NavBar;
