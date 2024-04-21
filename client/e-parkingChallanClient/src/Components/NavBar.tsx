import React from "react";

const NavBar = () => {
  return (
    <div className="w-full flex pr-3 items-center  justify-between">
      <div className="h-full flex items-center">
        <div className="w-14 menu h-14 mr-3"></div>
        <h3 className="font-bold">E-Parking Challan</h3>
      </div>
      <div className="flex items-center cursor-pointer">
        <p>Mathews Paku</p>
        <div className="w-10 h-10 menu rounded-full flex items-center justify-center ml-3">
          MP
        </div>
      </div>
    </div>
  );
};

export default NavBar;
