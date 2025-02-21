"use client";
import { useState } from "react";

export default function UploadImage() {
  const [file, setfile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const PRESENT_NAME = "food-delivery-app";
  const CLODINARY_NAME = "dquipdgj5";

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const selectedFile = event.target.files[0];
      setfile(selectedFile);
      setPreviewUrl(URL.createObjectURL(selectedFile));
    }
  };

  const handleUpload = async () => {
    if (!file) {
      alert("Select photo!");
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
      setPreviewUrl(null);
    }
  };

  return (
    <div className="border-2 p-[16px] w-[271px] h-[241px]">
      <input type="file" onChange={handleFileChange} accept="image/*" />
      {previewUrl && (
        <div className="w-[239px] h-[129px]">
          <img src={previewUrl} alt="" width={239} height={129} />
          <div className="flex">
            <p className="text-[#EF4444]">Grilled Chicken cobb salad</p>
            <p>$12.99</p>
          </div>
          <p>
            Fluffy pancakes stacked with fruits, cream, syrup, and powdered
            sugar.
          </p>
        </div>
      )}
      <button onClick={handleUpload} disabled={loading}>
        {loading}
      </button>
      {imageUrl && (
        <div>
          <img src={imageUrl} alt="" />
        </div>
      )}
    </div>
  );
}
