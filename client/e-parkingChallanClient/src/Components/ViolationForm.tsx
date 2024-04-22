import React from "react";
import { useForm } from "react-hook-form";
import Input from "./Input";
import { violation } from "../interfaces/violation";
import { FaTimes } from "react-icons/fa";

const ViolationForm = () => {
  const { register, handleSubmit } = useForm<violation>();
  return (
    <div className="w-full h-full absolute top-0 left-0 popup flex items-center justify-center">
      <div className="popup-form w-1/2 py-3 flex flex-col items-center relative">
        <button className="absolute top-2 right-2 w-10 h-10 rounded-full flex flex-col items-center justify-center">
          <FaTimes />
        </button>
        <form className="w-1/2">
          <Input
            formRegisterReturn={register("regNum")}
            label="Registration Number"
            inputId="regNum"
            type="text"
            placeholder="PKL 123 L"
          />
          <div className="mt-3 flex flex-col items-start">
            <label htmlFor="imageUrls">Add Images</label>
            <input
              name="imageUrls"
              type="search"
              accept="image/png, image/jpeg, image/jpg"
              className="w-full py-1 rounded border-solid px-2 border-2 border-gray-400 mt-1"
              id="imageUrls"
              placeholder="Add images"
              autoComplete=""
              
            />
          </div>
          <div className="mt-3 flex flex-col items-start">
            <label htmlFor="description">Description</label>
            <textarea
              name="description"
              className="w-full py-1 rounded border-solid px-2 border-2 border-gray-400 mt-1"
              id="description"
              cols={30}
              rows={10}
              placeholder="Description"
            ></textarea>
          </div>
          <div className="mt-3 flex flex-col items-start">
            <label htmlFor="imageUrls">Add Images</label>
            <input
              name="imageUrls"
              type="file"
              accept="image/png, image/jpeg, image/jpg"
              className="w-full py-1 rounded border-solid px-2 border-2 border-gray-400 mt-1"
              id="imageUrls"
              placeholder="Add images"
            />
          </div>
          <button
            className="max-h-10 py-1 rounded w-full text-white mt-5 flex items-center justify-center"
            type="submit"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default ViolationForm;
