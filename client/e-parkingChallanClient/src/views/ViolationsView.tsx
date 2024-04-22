import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";
import { FaPlus, FaCaretLeft, FaCaretRight, FaEllipsisV } from "react-icons/fa";
import { User } from "../interfaces/user";
import ViolationForm from "../Components/ViolationForm";
import { Violation } from "../interfaces/violation";
import OptionsMenu from "../Components/OptionsMenu";
import PaymentForm from "../Components/PaymentForm";

const ViolationsView = () => {
  const [user, setUser] = useState<User>();
  const [isAddViolation, setIsAddViolation] = useState(false);
  const [violations, setViolations] = useState<Array<Violation>>([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [pages, setPages] = useState(1);
  const [isOptionsOpen, setIsOptionsOpen] = useState(false);
  const [isPaying, setIsPaying] = useState(false);

  const getViolations = async (pageNumber: number, pageSize: number) => {
    const token = localStorage.getItem("jwt");
    console.log("token" + token);
    const response = await fetch(
      `http://localhost:5000/violations?pageNumber=${pageNumber}&pageSize=${pageSize}&regNumber=${null}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const results = await response.json();
    setViolations(results.violations);
    setPageNumber(results.pageNumber);
    setPages(results.pages);
  };

  const getOtherPage = async (isIncrement = true) => {
    if (isIncrement) {
      getViolations(pageNumber + 1, 10);
    } else {
      getViolations(pageNumber - 1, 10);
    }
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

  return (
    <div className="w-full h-full">
      {isAddViolation && (
        <ViolationForm close={() => setIsAddViolation(false)} />
      )}
      {isPaying&&<PaymentForm close={()=>setIsPaying(false)} />}
      <table className="w-full">
        <thead>
          <th>Reg Number</th>
          <th>Description</th>
          <th>Location</th>
          <th>Violation Type</th>
          <th>Amount (R)</th>
          <th>Status</th>
          <th>Images</th>
          {user?.role === "Driver"&&<th>Option</th>}
        </thead>
        <tbody>
          {violations.map((row) => {
            return (
              <tr key={row.id}>
                <td>{row.regNum}</td>
                <td>{row.description}</td>
                <td>{row.location}</td>
                <td>{row.violationType}</td>
                <td>{row.amount}</td>
                <td>{row.status}</td>
                <td>{row.imageUrls.length}</td>
                {user?.role === "Driver"&&<td>
                  <button onClick={()=>setIsOptionsOpen(true)} onBlur={()=>setIsOptionsOpen(false)} className="bg-transparent relative">
                    <FaEllipsisV />
                    {isOptionsOpen && <OptionsMenu amount={row.amount} openPay={()=>setIsPaying(true)} />}
                  </button>
                </td>}
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
      {user?.role === "Officer" && (
        <button
          className="absolute right-6 bottom-6"
          onClick={() => setIsAddViolation(true)}
        >
          <FaPlus />
        </button>
      )}
    </div>
  );
};

export default ViolationsView;
