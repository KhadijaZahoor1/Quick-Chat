import React from "react";
import { useNavigate } from "react-router-dom";
import Form from "./Form";

export const HomePage = () => {
  const navigate = useNavigate();
  function imageupload() {
    navigate("/imageupload");
  }
  return (
    <>
      <h2 className="flex justify-center pt-10 text-white font-semibold  sm:text-[18px] lg:text-[25px] ">
        Send SMS to team members
      </h2>
      <div className="main">
        <Form />
      </div>
      <button
        onClick={imageupload}
        className="flex justify-center pt-2 mx-auto text-white font-semibold sm:text-[18px]  lg:text-[25px] "
      >
        If upload image click me
      </button>
    </>
  );
};
