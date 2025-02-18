"use client";
import React, { useState } from "react";

export const CloudinaryUpload = () => {
  const [file, setFile] = useState(null);
  const [image, setimage] = useState(null);

  const PRESENT_NAME = "food-delivery-app";
  const CLODINARY_NAME = "dnpwi1bxt";

  const handleFile = (e) => {
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

    const res = await fetch("");
  };
};
