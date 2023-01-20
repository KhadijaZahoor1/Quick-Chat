import React from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export const ImageUpload = () => {
  const [fileData, setFileData] = useState();

  function updateImg(e) {
    setFileData(e.target.files);
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = new FormData();
    for (let i = 0; i < fileData.length; i++)
      data.append("images", fileData[i]);

    fetch("http://localhost:8000/multiple", {
      method: "POST",
      body: data,
    })
      .then((res) => {
        let resData = res;
        console.log(resData);
        console.log("File sent successful");
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const navigate = useNavigate();
  function back() {
    navigate("/");
  }

  return (
    <>
      <div className="flex justify-center items-center">
        <form
          action="/multiple"
          method="POST"
          encType="multipart/form-data"
          onSubmit={handleSubmit}
        >
          <div className="bg-white px-4 py-5 mt-[100px] rounded">
            <input type="file" name="images" multiple onChange={updateImg} />
            <div className="flex justify-between">
              <button className="login__submit imgBtn" type="submit">
                Upload
              </button>
              <button className="login__submit imgBtn" onClick={back}>
                Back
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};
