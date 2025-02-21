import { ReactNode } from "react";
import SideBar from "./_components/SideBar";
import Orders from "./Orders/page";

type Props = {
  children: ReactNode;
};
const Layout = (props: Props) => {
  return (
    <div className="bg-[#f4f4f5] flex">
      <SideBar />

      {props.children}
    </div>
  );
};
export default Layout;
