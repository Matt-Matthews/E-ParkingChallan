import { useForm } from "react-hook-form";
import Input from "./Input";
import { violation } from "../interfaces/violation";
import { FaTimes } from "react-icons/fa";
import { useEffect, useState } from "react";
import { storage } from "../config/firebase";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { jwtDecode } from "jwt-decode";
import { User } from "../interfaces/user";

const ViolationForm = () => {
  const { register, handleSubmit } = useForm<violation>();
  const [files, setFiles] = useState<Array<File>>([]);
  const [imageUrls, setImageUrls] = useState<Array<string>>([]);
  const [_violation, setViolation] = useState<violation>();

  const uploadeImg = (img: File) => {
    const storageRef = ref(storage, `/images/${img.name}`);

    uploadBytesResumable(storageRef, img).then((uploadTask) => {
      getDownloadURL(uploadTask.ref)
        .then((url) => {
          console.log("Url: ", url);
          setImageUrls((curr) => [...curr, url]);
        })
        .then(() => {
          //upload
          console.log("uploaded", imageUrls);
        });
    });
  };
  const fileHandler = (e) => {
    setFiles((curr) => [...curr, ...e.target.files]);
  };
  const onSubmit = async (data: violation) => {
    setViolation(data);
    console.log(files?.length, files);
    for (const file of files) {
      uploadeImg(file);
    }
  };

  const createViolation = async () => {
    const token = localStorage.getItem("jwt");
    const decoded = jwtDecode<User>(token!);
    const data = {
      ..._violation,
      imageUrls,
      officerId: decoded.id,
      status: "Unpaid",
      createdAt: Date.now,
    };
    const res = await fetch("http://localhost:5000/violations/add", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        Accept: "application/json, text/plain",
        "Content-Type": "application/json;charset=UTF-8",
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(res);
  };
  useEffect(() => {
    if (imageUrls.length === files.length && imageUrls.length > 0) {
      console.log("Added an img", imageUrls, _violation);
      createViolation();
    }
  }, [imageUrls]);
  return (
    <div className="w-full z-50 h-full absolute top-0 left-0 popup flex items-center justify-center">
      <div className="popup-form w-1/2 py-3 flex flex-col items-center relative">
        <button className="absolute top-2 right-2 w-10 h-10 rounded-full flex flex-col items-center justify-center">
          <FaTimes />
        </button>
        <form className="w-1/2" onSubmit={handleSubmit(onSubmit)}>
          <Input
            formRegisterReturn={register("regNum")}
            label="Registration Number"
            inputId="regNum"
            type="text"
            placeholder="PKL 123 L"
          />
          <Input
            formRegisterReturn={register("violationType")}
            label="Violation type"
            inputId="violationType"
            type="text"
            placeholder="wrong parking"
          />
          <Input
            formRegisterReturn={register("location")}
            label="Location"
            inputId="location"
            type="text"
            placeholder="123 name of street"
          />
          <div className="mt-3 flex flex-col items-start">
            <label htmlFor="description">Description</label>
            <textarea
              className="w-full py-1 rounded border-solid px-2 border-2 border-gray-400 mt-1"
              id="description"
              cols={30}
              rows={5}
              placeholder="Description"
              {...register("description")}
            ></textarea>
          </div>
          <div className="mt-3 flex flex-col items-start">
            <label htmlFor="imageUrls">Added Images ({files.length})</label>
            <input
              type="file"
              accept="image/png, image/jpeg, image/jpg"
              className="w-full py-1 rounded border-solid px-2 border-2 border-gray-400 mt-1"
              id="imageUrls"
              placeholder="Add images"
              onChange={(e) => fileHandler(e)}
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
