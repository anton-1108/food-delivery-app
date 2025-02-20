"use client";
import React, { useState } from "react";

export const CloudinaryUpload = () => {
  const [file, setFile] = useState(null);
  const [image, setImage] = useState(null);

  const PRESENT_NAME = "food-delivery-app";
  const CLODINARY_NAME = "dquipdgj5";

  const handleFile = (e: any) => {
    const file = e.target.files[0];
    if (file) {
      setFile(file);
    }
  };

  const handleUpload = async () => {
    if (!file) {
      alert("Please select a file ");
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_present", PRESENT_NAME);
    formData.append("api_key", CLODINARY_NAME);
    try {
      const res = await fetch(
        `https://api.cloudinary.com/v1_1/${CLODINARY_NAME}/image/upload`,
        {
          method: "POST",
          body: "formData",
        }
      );
      const data = await res.json();
      setImage(data.secure_url);
      console.log(data);
    } catch (err) {
      console.error(err);
      alert("Failed to upload file");
    }
  };
  console.log(file);
  return <div></div>;
};
