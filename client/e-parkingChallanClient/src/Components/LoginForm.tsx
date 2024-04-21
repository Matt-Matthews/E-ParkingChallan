import React from "react";
import { useForm } from "react-hook-form";
import Input from "./Input";
import PasswordInput from "./PasswordInput";

interface User {
  email: string;
  password: string;
}

const LoginForm = () => {
  const { register, handleSubmit } = useForm<User>();
  const onSubmit = async (data: User) => {
    const { email, password } = data;

    if (email && password) {
      //   const token = await handleAuth(data, '/user/login');
      //   if(token){
      //     localStorage.setItem("token", token);
      //   }
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
          className="max-h-10 py-1 rounded w-full text-white mt-5"
          type="submit"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
