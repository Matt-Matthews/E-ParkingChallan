import { useState } from "react";
import { useForm } from "react-hook-form";
import Input from "./Input";
import PasswordInput from "./PasswordInput";
import ReactLoading from "react-loading";

interface User {
  email: string;
  password: string;
}

const LoginForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { register, handleSubmit } = useForm<User>();
  const onSubmit = async (data: User) => {
    const { email, password } = data;
    console.log(data);

    if (email !== "" && password !== "") {
      setIsLoading(true);
      try{
        const response = await fetch("http://localhost:5000/login", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          Accept: "application/json, text/plain",
          "Content-Type": "application/json;charset=UTF-8",
        },
      });
      if (response.statusText !== "Unauthorized") {
        const token = await response.json();
        localStorage.setItem("jwt", token);
        setIsLoading(false);
        window.dispatchEvent(new Event("storageEvent"));
      }
      else{
        const token = await response.json();
        console.log(token)
        setIsLoading(false);
        alert(response.statusText);
      }
      }catch(e){
        alert(e.message)
        setIsLoading(false);
      }
    } else {
      alert("Enter all the details");
    }
  };
  return (
    <div className="w-1/4">
      <h3 className="font-bold text-xl">Login</h3>
      <p>Enter your email and password to login</p>
      <form className="mt-4" onSubmit={handleSubmit(onSubmit)}>
        <Input
          formRegisterReturn={register("email")}
          label="Email"
          inputId="email"
          type="email"
          placeholder="example@mail.com"
        />
        <div className="relative">
          <PasswordInput
            inputId="password"
            formRegisterReturn={register("password")}
            placeholder="*****"
            label="Password"
          />
          <button
            className="text-sm underline bg-transparent mt-5"
            onClick={(e) => {
              e.preventDefault();
              //   resetPassword((currentValue: boolean) => !currentValue);
            }}
          >
            Forgot your password?
          </button>
        </div>
        <button
          className="max-h-10 py-1 rounded w-full text-white mt-5 flex items-center justify-center"
          type="submit"
        >
          {isLoading ? (
            <ReactLoading type="spin" color="blue" height={20} width={20} />
          ) : (
            "Login"
          )}
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
