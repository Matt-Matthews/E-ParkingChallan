import { useForm } from "react-hook-form";
import { Vehicle } from "../interfaces/vehicle";
import { FaTimes } from "react-icons/fa";
import Input from "./Input";
import { jwtDecode } from "jwt-decode";
import { User } from "../interfaces/user";

interface Props {
  close: () => void;
}

const VehicleForm = ({ close }: Props) => {
  const { register, handleSubmit } = useForm<Vehicle>();

  const onSubmit = async (data: Vehicle) => {
    const token = localStorage.getItem("jwt");
    const decoded = jwtDecode<User>(token!);
    const res = await fetch("http://localhost:5000/vehicles/add", {
      method: "POST",
      body: JSON.stringify({...data, ownerId: decoded.id}),
      headers: {
        Accept: "application/json, text/plain",
        "Content-Type": "application/json;charset=UTF-8",
        Authorization: `Bearer ${token}`,
      },
    });
    if (res.ok) alert("Added vehicle");
    else alert(res.statusText);
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
            formRegisterReturn={register("registration")}
            inputId="registration"
            label="Registration Number"
            placeholder="PKL 123 L"
            type="text"
          />
          <Input
            formRegisterReturn={register("model")}
            inputId="model"
            label="Model"
            placeholder="Toyota"
            type="text"
          />
          <Input
            formRegisterReturn={register("make")}
            inputId="make"
            label="Make"
            placeholder="Corolla"
            type="text"
          />
          <Input
            formRegisterReturn={register("color")}
            inputId="color"
            label="Color"
            placeholder="black"
            type="text"
          />
          <button
            className="max-h-10 py-1 rounded w-full text-white mt-5 flex items-center justify-center"
            type="submit"
          >
            Add
          </button>
        </form>
      </div>
    </div>
  );
};

export default VehicleForm;
