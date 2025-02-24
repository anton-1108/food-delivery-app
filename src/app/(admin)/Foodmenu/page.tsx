"use client";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import UploadImage from "../_components/UploadImage";
import { ButtonDemo } from "../_components/Button";

export default function Foodmenu() {
  return (
    <div>
      <ButtonDemo />
      <UploadImage />
    </div>
  );
}
