import Image from "next/image";
import Header from "@/app/_components/Header";
import Footer from "./_components/Footer";
import MenuCloud from "./_components/MenuCloud";
export default function Home() {
  return (
    <div>
      <Header />
      <MenuCloud />
      <Footer />
    </div>
  );
}
