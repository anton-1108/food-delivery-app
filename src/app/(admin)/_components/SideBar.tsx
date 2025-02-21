import { Button } from "@/components/ui/button";
import { LayoutDashboard, Settings, Truck } from "lucide-react";
import Link from "next/link";

const SideBar = () => {
  return (
    <div className="flex flex-col h-screen w-[205px] bg-white gap-[40px]">
      <div className="flex">
        <img src="/logo.png" className="w-[46px]" alt="" />
        <div>
          <div className="flex">
            <h3 className="font-semibold text-secondary text-[#09090b]">Nom</h3>
            <h3 className="text-[#09090b] font-semibold">Nom</h3>
          </div>
          <p className="text-[#71717a]">Swift delivery</p>
        </div>
      </div>
      <div className="flex flex-col gap-5">
        <Link href="/Foodmenu">
          <Button className="rounded-full w-[165px] h-[40px]">
            <LayoutDashboard />
            Food menu
          </Button>
        </Link>
        <Link href="/Orders">
          <Button className="rounded-full  w-[165px] h-[40px]">
            <Truck />
            Orders
          </Button>
        </Link>
        <Button className="rounded-full  w-[165px] h-[40px]">
          <Settings />
          Settings
        </Button>
      </div>
    </div>
  );
};

export default SideBar;
