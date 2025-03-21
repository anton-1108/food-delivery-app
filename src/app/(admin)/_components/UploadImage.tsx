"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
const formSchema = z.object({
  categoryName: z.string().min(2, {
    message: "Category name must be at least 2 characters.",
  }),
});

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

export default function UploadImage() {
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [categories, setCategories] = useState([]);
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
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      categoryName: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    createCategories(values.categoryName);
  }

  return (
    <div className="bg-[#F4F4F5] w-screen">
      <div className="flex flex-col rounded-[12px] bg-[#FFF] h-auto p-[24px]  w-[1171px] ml-[20px] gap-[16px]">
        <h1 className="text-[20px] font-semibold">Dishes category</h1>
        <div className="flex gap-[12px] flex-wrap self-stretch h-[84px] w-[1124px]">
          {categories?.map((category: categoryType) => {
            return (
              <div className="flex">
                <Button
                  variant="outline"
                  className="h-[36px]"
                  key={category._id}
                >
                  {category.categoryName}
                </Button>
              </div>
            );
          })}
          <button
            onClick={() => setIsOpen(true)}
            className="w-12 h-12 bg-red-500 text-white rounded-full text-2xl flex items-center justify-center shadow-lg hover:bg-red-600 transition"
          >
            <Plus />
          </button>
          {isOpen && (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
              <div className="bg-[#FFF] p-[24px] gap-[24px] rounded-[12px] shadow-lg   w-[460px] h-[272px] flex-col">
                <button
                  className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
                  onClick={() => setIsOpen(false)}
                >
                  &times;
                </button>
                <div className="flex justify-between">
                  <h2 className="text-[18px] font-semibold mb-4">
                    Add new category
                  </h2>

                  <Button
                    onClick={() => setIsOpen(false)}
                    variant="secondary"
                    className="w-10 h-10   rounded-full text-2xl flex items-center justify-center shadow-lg "
                  >
                    <X className="text-[#18181B]" />
                  </Button>
                </div>
                <div className="flex gap-[24px]">
                  <Form {...form}>
                    <form
                      onSubmit={form.handleSubmit(onSubmit)}
                      className="space-y-8"
                    >
                      <FormField
                        control={form.control}
                        name="categoryName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Category name</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Type category name..."
                                {...field}
                              />
                            </FormControl>

                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <Button type="submit">Add category</Button>
                    </form>
                  </Form>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
