/* eslint-disable @typescript-eslint/no-unused-vars */
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
      const {password, confirmPassword} = data;
      console.log()
      if(password !== confirmPassword){
        alert("passwords don't match!")
      }
      else if(Object.values(data).length < 6){
        alert("Enter the missing values");
      }else{
        const {confirmPassword, ...user} = data
        
        const response = await fetch("http://localhost:5000/register", {
          method: "POST",
          body: JSON.stringify(user),
          headers: {
            'Accept': 'application/json, text/plain',
            'Content-Type': 'application/json;charset=UTF-8'
        },
        });
        // const json = await response.json()
        alert(response.statusText)

      }
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
