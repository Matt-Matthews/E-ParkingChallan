import React, { useEffect, useState } from "react";
import { FaCaretLeft, FaCaretRight, FaPlus } from "react-icons/fa";
import { User } from "../interfaces/user";
import { jwtDecode } from "jwt-decode";
import VehicleForm from "../Components/VehicleForm";
import { Vehicle } from "../interfaces/vehicle";

const VehiclesView = () => {
  const [pageNumber, setPageNumber] = useState(1);
  const [pages, setPages] = useState(1);
  const [user, setUser] = useState<User>();
  const [isAddVehicle, setIsAddVehicle] = useState(false);
  const [vehicles, setVehicles] = useState<Array<Vehicle>>([])

  const getOtherPage = async (isIncrement = true) => {
    if (isIncrement) {
      // getViolations(pageNumber + 1, 10);
    } else {
      // getViolations(pageNumber - 1, 10);
    }
  };

  const getVehicles = async () => {
    const token = localStorage.getItem("jwt");
    const res = await fetch("http://localhost:5000/vehicles", {
      method: "GET",
      headers: {
        Accept: "application/json, text/plain",
        "Content-Type": "application/json;charset=UTF-8",
        Authorization: `Bearer ${token}`,
      },
    });
    if (!res.ok) alert(res.statusText);
    else {
      const results = await res.json();
      console.log(results)
      setVehicles(results)
    }
    
  }

  useEffect(() => {
    const token = localStorage.getItem("jwt");
    if (token !== null) {
      const decoded = jwtDecode<User>(token);
      console.log(decoded);
      setUser(decoded);
      getVehicles();
    }
  }, []);
  return (
    <div className="w-full h-full">
      {isAddVehicle && <VehicleForm close={() => setIsAddVehicle(false)} />}
      <table className="w-full">
        <thead>
          <th>Reg Number</th>
          <th>Model</th>
          <th>Make</th>
          <th>Vin Number Type</th>
          <th>Color</th>
          {/* {user?.role === "Driver"&&<th>Option</th>} */}
        </thead>
        <tbody>
          {vehicles.map((row) => {
            return (
              <tr key={row.id}>
                <td>{row.registration}</td>
                <td>{row.model}</td>
                <td>{row.make}</td>
                <td>{row.vinNumber}</td>
                <td>{row.color}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <div className="w-full flex items-center justify-center absolute bottom-6">
        <div className="flex items-center justify-center text-white mt-6">
          <button
            onClick={() => getOtherPage(false)}
            className="py-1"
            disabled={pageNumber === 1}
          >
            <FaCaretLeft />
          </button>
          <button className="py-1 mx-3">
            Page {pageNumber} of {pages}
          </button>
          <button
            onClick={() => getOtherPage()}
            className="py-1"
            disabled={pages === 1}
          >
            <FaCaretRight />
          </button>
        </div>
      </div>
      {user?.role === "Driver" && (
        <button
          className="absolute right-6 bottom-6"
          onClick={() => setIsAddVehicle(true)}
        >
          <FaPlus />
        </button>
      )}
    </div>
  );
};

export default VehiclesView;
