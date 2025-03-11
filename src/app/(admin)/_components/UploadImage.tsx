"use client";

import React, { useEffect, useState } from "react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge, Plus, Trash, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { headers } from "next/headers";

export default function UploadImage() {
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [categories, setCategories] = useState();
  const PRESET_NAME = "food-app";
  const CLOUDINARY_NAME = "dakwzoavm";

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const selectedFile = event.target.files[0];
      setFile(selectedFile);
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
    formData.append("uploud_freset", PRESET_NAME);
    formData.append("api_key", CLOUDINARY_NAME);

    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${CLOUDINARY_NAME}/image/upload`,
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

  useEffect(() => {
    const getCategories = async () => {
      const data = await fetch("http://localhost:8000/food-category");
      const jsonData = await data.json();
      setCategories(jsonData.allCategory);
      console.log(jsonData);
    };
    getCategories();
  });

  const createCategories = async () => {
    const data = await fetch("http://localhost:8000/food-category", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ categoryName: "Side Dish" }),
    });
  };

  return (
    <div>
      <div>
        <p className="text-20px">Dishes category</p>
        <div>
          {categories?.map((category) => {
            return (
              <div>
                <Button>{category.categoryName}</Button>
              </div>
            );
          })}
        </div>
        <button
          onClick={() => setIsOpen(true)}
          className="w-12 h-12 bg-red-500 text-white rounded-full text-2xl flex items-center justify-center shadow-lg hover:bg-red-600 transition"
        >
          <Plus />
        </button>
      </div>

      <div className="border-2 border-dashed border-[#EF4444] p-[16px] w-[271px] h-[241px]">
        {
          <div className="flex flex-col items-center gap-[24px] ">
            <button
              onClick={() => setIsOpen(true)}
              className="w-12 h-12 bg-red-500 text-white rounded-full text-2xl flex items-center justify-center shadow-lg hover:bg-red-600 transition"
            >
              <Plus />
            </button>
            <p className="text-[14px] w-[154px] text-center font-medium ">
              Add new Dish to Appetizers
            </p>

            {isOpen && (
              <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                  <button
                    className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
                    onClick={() => setIsOpen(false)}
                  >
                    &times;
                  </button>
                  <div className="flex justify-between">
                    <h2 className="text-xl font-semibold mb-4">Dishes Info</h2>

                    <Button
                      onClick={() => setIsOpen(false)}
                      variant="outline"
                      className="w-12 h-12 bg-secondary rounded-full text-2xl flex items-center justify-center shadow-lg  transition"
                    >
                      <X />
                    </Button>
                  </div>

                  <div className="flex">
                    <p>Dish name</p>
                    <input
                      type="text"
                      className="w-full p-2 border rounded-lg mt-1"
                      placeholder="Enter dish name"
                    />
                  </div>
                  <div className="flex">
                    <p>Dish category</p>
                    <Select>
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="All dishes">All dishes</SelectItem>
                        <SelectItem value="Appetizers">Appetizers</SelectItem>
                        <SelectItem value="Salads">Salads</SelectItem>
                        <SelectItem value="Pizzas">Pizzas</SelectItem>
                        <SelectItem value="Lunch favorites">
                          Lunch favorites
                        </SelectItem>
                        <SelectItem value="Main dishes">Main dishes</SelectItem>
                        <SelectItem value="Fish & Sea foods">
                          Fish & Sea foods
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex">
                    <p>Ingredients</p>
                    <input
                      type="text"
                      className="w-full p-2 border rounded-lg mt-1"
                      placeholder=""
                    />
                  </div>

                  <input
                    type="file"
                    onChange={handleFileChange}
                    accept="image/*"
                  />
                  <div className="flex justify-between">
                    <Button variant="outline" className="border-[#EF4444]">
                      <Trash className="text-[#EF4444]" />
                    </Button>
                    <Button>Save changes</Button>
                  </div>
                </div>
              </div>
            )}
          </div>
        }
        <button onClick={handleUpload} disabled={loading}>
          {loading}
        </button>
        {imageUrl && (
          <div>
            <img src={imageUrl} alt="" />
          </div>
        )}
      </div>
    </div>
  );
}
