"use client";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import UploadImage from "../_components/UploadImage";
import { ButtonDemo } from "../_components/Button";
import { AvatarDemo } from "../_components/Avatar";
import Card2 from "../_components/Card2";

export default function Foodmenu() {
  return (
    <div className="flex flex-col gap-[20px] bg-[#F4F4F5] w-screen">
      <AvatarDemo />
      <ButtonDemo />
      <UploadImage />
      <Card2 />
    </div>
  );
}
