"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

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
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { categoryType } from "@/type/Type";

const formSchema = z.object({
  dishName: z.string().min(2, {
    message: " Food name must be at least 2 characters.",
  }),
});
export default function Card2() {
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [categories, setCategories] = useState([]);
  const [foods, setFoods] = useState<any | null>(null);
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
    getCategories();
  }, []);

  const getCategories = async () => {
    const data = await fetch("http://localhost:8000/food-category");
    const jsonData = await data.json();
    setCategories(jsonData.allCategory);
    console.log(jsonData);
  };

  const createCategories = async (category: string) => {
    const data = await fetch("http://localhost:8000/food-category", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ categoryName: category }),
    });
    setIsOpen(false);
    getCategories();
  };
  const getFoods = async () => {
    const data = await fetch("http://localhost:8000/food");
    const jsonData = await data.json();
    setFoods(jsonData.allFoods);
    console.log(jsonData);
  };
  useEffect(() => {
    getFoods();
  }, []);

  const createFood = async (category: string) => {
    const data = await fetch("http://localhost:8000/food", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ categoryName: category }),
    });
    setIsOpen(false);
    getFoods();
  };
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      dishName: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    createCategories(values.dishName);
  }

  return (
    <div className="bg-[#FFF] w-[1171px] ml-[20px] flex flex-col gap-[16px] p-[24px] rounded-[12px]">
      {categories?.map((category: categoryType) => {
        return (
          <div key={category._id} className="flex flex-col gap-[16px]">
            <p className="text-[20px] font-semibold " key={category._id}>
              {category.categoryName}
            </p>
            <div className="flex gap-[16px]">
              {" "}
              <div className="border-2 border-dashed  p-[16px] w-[271px] h-[241px] border-[#EF4444] rounded-[16px]">
                {
                  <div className="flex flex-col items-center gap-[24px] justify-center self-stretch">
                    <button
                      onClick={() => setIsOpen(true)}
                      className="w-12 h-12 bg-red-500 text-white rounded-full text-2xl flex items-center justify-center shadow-lg hover:bg-red-600 transition"
                    >
                      <Plus />
                    </button>
                    <p className="text-[14px] w-[154px] text-center font-medium">
                      Add new Dish to Appetizers
                    </p>

                    {isOpen && (
                      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                        <div className="bg-[#FFF] p-[24px] gap-[12px] rounded-[12px] shadow-lg   w-[472px] h-[596px] flex-col">
                          <button
                            className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
                            onClick={() => setIsOpen(false)}
                          >
                            &times;
                          </button>
                          <div className="flex justify-between">
                            <h2 className="text-[18px] font-semibold mb-4">
                              Dishes Info
                            </h2>

                            <Button
                              onClick={() => setIsOpen(false)}
                              variant="secondary"
                              className="w-10 h-10   rounded-full text-2xl flex items-center justify-center shadow-lg "
                            >
                              <X className="text-[#18181B]" />
                            </Button>
                          </div>

                          <div className="flex gap-[16px] w-[424px]">
                            <div className="flex gap-[24px]">
                              <Form {...form}>
                                <form
                                  onSubmit={form.handleSubmit(onSubmit)}
                                  className="space-y-8"
                                >
                                  <FormField
                                    control={form.control}
                                    name="dishName"
                                    render={({ field }) => (
                                      <FormItem>
                                        <div className="flex">
                                          <FormLabel>Dish name</FormLabel>
                                          <div>
                                            <FormControl>
                                              <Input
                                                placeholder="Type food name..."
                                                {...field}
                                              />
                                            </FormControl>
                                            <FormMessage />
                                          </div>
                                        </div>

                                        <div>
                                          <FormLabel>Dish category</FormLabel>
                                          <Select>
                                            <SelectTrigger className="w-[288px]">
                                              <SelectValue placeholder="" />
                                            </SelectTrigger>
                                            <SelectContent>
                                              <SelectItem value="All dishes">
                                                All dishes
                                              </SelectItem>
                                              <SelectItem value="Appetizers">
                                                Appetizers
                                              </SelectItem>
                                              <SelectItem value="Salads">
                                                Salads
                                              </SelectItem>
                                              <SelectItem value="Pizzas">
                                                Pizzas
                                              </SelectItem>
                                              <SelectItem value="Lunch favorites">
                                                Lunch favorites
                                              </SelectItem>
                                              <SelectItem value="Main dishes">
                                                Main dishes
                                              </SelectItem>
                                              <SelectItem value="Fish & Sea foods">
                                                Fish & Sea foods
                                              </SelectItem>
                                            </SelectContent>
                                          </Select>
                                        </div>
                                        <FormLabel>Ingredients</FormLabel>
                                        <FormControl>
                                          <Input
                                            placeholder="List ingredients..."
                                            {...field}
                                          />
                                        </FormControl>

                                        <FormMessage />
                                        <FormLabel>Price</FormLabel>
                                        <FormControl>
                                          <Input
                                            placeholder="Enter price......"
                                            {...field}
                                          />
                                        </FormControl>

                                        <FormMessage />
                                        <input
                                          type="file"
                                          onChange={handleFileChange}
                                          accept="image/*"
                                        />
                                      </FormItem>
                                    )}
                                  />
                                  <div className="flex justify-between">
                                    <Button
                                      variant="outline"
                                      className="border-[#EF4444] "
                                    >
                                      <Trash className="text-[#EF4444]" />
                                    </Button>
                                    <Button type="submit">Add category</Button>
                                  </div>
                                </form>
                              </Form>
                            </div>
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
              {foods
                ?.filter((food: any) => food.category._id === category._id)
                .map((food: categoryType) => {
                  return (
                    <div
                      key={food._id}
                      className="flex flex-col border-2 w-[271px]  h-[241px] rounded-[12px] gap-[20px] p-[16px]"
                    >
                      <img
                        className="h-[129px] w-[239px] rounded-[12px] self-stretch"
                        src={food.image}
                        alt=""
                      />
                      <div className="gap-[8px] flex flex-col">
                        <div className="flex gap-[10px]">
                          <p className="text-[#EF4444] text-[14px]">
                            {food.foodName}
                          </p>
                          <p className="text-[#09090B] text-[12px]">
                            ${food.price}
                          </p>
                        </div>
                        <p className="w-[238px] h-[38px] text-[12px]">
                          {food.ingredients}
                        </p>
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
        );
      })}
      <div className="flex gap-[16px]"></div>
    </div>
  );
}
