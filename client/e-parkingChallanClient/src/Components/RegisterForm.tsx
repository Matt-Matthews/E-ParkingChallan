import React from "react";
import { useForm } from "react-hook-form";
import Input from "./Input";
import PasswordInput from "./PasswordInput";

interface User {
  firstName: string;
  lastName: string;
  email: string;
  contact: string;
  password: string;
  confirmPassword: string;
}

const RegisterForm = () => {
    const { register, handleSubmit } = useForm<User>();
    const onSubmit = async (data: User) => {
      console.log(data)
    };
    return (
      <div className="w-1/4">
        <h3 className="font-bold text-xl">Register</h3>
        <p>Enter your email below to create your account</p>
  
        <form className="mt-4" onSubmit={handleSubmit(onSubmit)}>
          <Input
            formRegisterReturn={register("firstName")}
            label="First name"
            inputId="firstName"
            type="text"
            placeholder="John"
          />
          <Input
            formRegisterReturn={register("lastName")}
            label="Last name"
            inputId="lastName"
            type="text"
            placeholder="Smith"
          />
          <Input
            formRegisterReturn={register("email")}
            label="Email"
            inputId="email"
            type="email"
            placeholder="example@mail.com"
          />
          <Input
            formRegisterReturn={register("contact")}
            label="Contact"
            inputId="contact"
            type="tel"
            placeholder="0607509979"
          />
          <PasswordInput
              inputId="password"
              formRegisterReturn={register("password")}
              placeholder="*****"
              label="Password"
            />
            <PasswordInput
              inputId="password2"
              formRegisterReturn={register("confirmPassword")}
              placeholder="*****"
              label="Confirm Password"
            />
          <button
            className="max-h-10 py-1 rounded w-full bg-primary text-white mt-5"
            type="submit"
          >
            Register
          </button>
        </form>
      </div>
    );
};

export default RegisterForm;
