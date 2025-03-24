import Image from "next/image";
import Header from "@/app/_components/Header";
import Footer from "./_components/Footer";
import MenuCloud from "./_components/MenuCloud";
import Card2 from "./_components/Foodcard";
export default function Home() {
  return (
    <div className="bg-[#404040]">
      <Header />
      <MenuCloud />
      <Card2 />
      <Footer />
    </div>
  );
}
