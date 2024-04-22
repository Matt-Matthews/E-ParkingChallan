import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";
import { FaPlus, FaCaretLeft, FaCaretRight } from "react-icons/fa";
import { User } from "../interfaces/user";
import ViolationForm from "../Components/ViolationForm";

const ViolationsView = () => {
  const [user, setUser] = useState<User>();
  const getViolations = async (pageNumber: number, pageSize: number) => {
    const token = localStorage.getItem("jwt");
    console.log("token" + token)
    const response = await fetch(`http://localhost:5000/violations?pageNumber=${pageNumber}&pageSize=${pageSize}&regNumber=${null}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const results = await response.json();
    console.log(results)
  };

  useEffect(() => {
    const token = localStorage.getItem("jwt");
    if (token !== null) {
      const decoded = jwtDecode<User>(token);
      console.log(decoded);
      setUser(decoded);
      getViolations(1, 15);
    }
  }, []);
  const tableData = [
    {
      name: "test",
      value: 10,
      ann: 40,
      tot: 200,
    },
    {
      name: "test1",
      value: 11,
      ann: 40,
      tot: 200,
    },
    {
      name: "test2",
      value: 12,
      ann: 40,
      tot: 200,
    },
  ];
  return (
    <div className="w-full h-full">
      <ViolationForm />
      <table className="w-full">
        <thead>
          {Object.keys(tableData[0]).map((val, index) => {
            return <th key={index}>{val}</th>;
          })}
        </thead>
        <tbody>
          {tableData.map((row, index) => {
            return (
              <tr key={index}>
                {Object.values(row).map((val, _index) => {
                  return <td key={_index}>{val}</td>;
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
      <div className="w-full flex items-center justify-center absolute bottom-6">
        <div className="flex items-center justify-center text-white mt-6">
          <button className="py-1">
            <FaCaretLeft />
          </button>
          <button className="py-1 mx-3">Page 1</button>
          <button className="py-1">
            <FaCaretRight />
          </button>
        </div>
      </div>
      {user?.role === "Officer" && (
        <button className="absolute right-6 bottom-6">
          <FaPlus />
        </button>
      )}
    </div>
  );
};

export default ViolationsView;
