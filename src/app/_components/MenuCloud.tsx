"use client";
import { useState, useEffect } from "react";
export default function MenuCloud() {
  const defaultImageUrl =
    "https://res.cloudinary.com/dquipdgj5/image/upload/v1740019108/a2a7c22f5fe9122b2bd6276cdd549c3e_yzprly.png";
  const PRESENT_NAME = "food-delivery-app";
  const CLODINARY_NAME = "dquipdgj5";

  const [imageUrl, setImageUrl] = useState<string | null>(defaultImageUrl);
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const handleUpload = async () => {
    if (!file) {
      alert("Please enter a photo");
      return;
    }
    setLoading(true);
    const formData = new FormData();
    formData.append("file", file);
    formData.append("uploud_freset", PRESENT_NAME);
    formData.append("api_key", CLODINARY_NAME);

    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${CLODINARY_NAME}/image/upload`,
      {
        method: "POST",
        body: formData,
      }
    );
    const data = await response.json();
    setLoading(false);

    if (data.secure_url) {
      setImageUrl(data.secure_url);
    }
  };
  return (
    <div>
      <div>
        <img
          src={imageUrl || defaultImageUrl}
          alt=""
          className="w-screen h-[570px]"
        />
      </div>
      <button onClick={handleUpload} disabled={loading}></button>
    </div>
  );
}
