import React from "react";
import { useForm } from "react-hook-form";
import { FaTimes } from "react-icons/fa";
import { Payment } from "../interfaces/payment";
import Input from "./Input";

interface Props {
  close: () => void;
}

const PaymentForm = ({ close }: Props) => {
  const { register, handleSubmit } = useForm<Payment>();

  const onSubmit = async (data: Payment) => {
    const token = localStorage.getItem("jwt");
    const response = await fetch(
      `http://localhost:5000/payment`,
      {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if(response.ok) alert("Added payment")
        else alert(response.statusText)
  };
  return (
    <div className="w-full z-50 h-full absolute top-0 left-0 popup flex items-center justify-center">
      <div className="popup-form w-1/2 py-3 flex flex-col items-center relative">
        <button
          onClick={() => close()}
          className="absolute top-2 right-2 w-10 h-10 rounded-full flex flex-col items-center justify-center"
        >
          <FaTimes />
        </button>
        <form className="w-1/2" onSubmit={handleSubmit(onSubmit)}>
          <Input
            formRegisterReturn={register("cardNo")}
            inputId="cardNo"
            label="Card Number"
            placeholder="1234 5678 9000 0000"
            type="number"
          />
          <Input
            formRegisterReturn={register("cVV")}
            inputId="cVV"
            label="CVV"
            placeholder="123"
            type="number"
          />
          <Input
            formRegisterReturn={register("expireDate")}
            inputId="expireDate"
            label="Expiry DAte"
            placeholder="12/04/24"
            type="date"
          />
          <Input
            formRegisterReturn={register("amount")}
            inputId="amount"
            label="Amount"
            placeholder="123"
            type="number"
          />
           <button
            className="max-h-10 py-1 rounded w-full text-white mt-5 flex items-center justify-center"
            type="submit"
          >
            Pay
          </button>
        </form>
      </div>
    </div>
  );
};

export default PaymentForm;
