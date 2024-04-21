import React, { useState } from "react";
import LoginForm from "../Components/LoginForm";
import RegisterForm from "../Components/RegisterForm";

const AuthView = () => {
  const [isLogin, setIsLogin] = useState(true);
  return (
    <div className="w-full flex flex-col items-center justify-center h-full">
      {isLogin ? <LoginForm /> : <RegisterForm />}

      <button
        className="text-sm bg-transparent mt-5"
        onClick={(e) => {
          e.preventDefault();
            setIsLogin((currentValue: boolean) => !currentValue);
        }}
      >
        {
          isLogin? "Don't have an account? Sign up":
          "Already have an account? Sign in"
        }
      </button>
    </div>
  );
};

export default AuthView;
