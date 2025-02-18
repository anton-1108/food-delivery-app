import Link from "next/link";

const Header = () => {
  return (
    <div className="flex bg-primary h-[68px] px-[120px] items-center justify-between">
      <div className="flex">
        <img className="w-[46px]" src="/logo.png" alt="" />
        <div className="flex">
          <h1 className="font-semibold text-secondary">Nom</h1>
          <h1 className="text-[#EF4444] font-semibold">Nom</h1>
        </div>
        <p className="text-secondary text-sm">Swift delivery</p>
      </div>
      <div className="flex gap-3">
        <Link href="/signup">
          <button className="bg-secondary rounded-3xl py-2 px-3">
            Sign up
          </button>
        </Link>
        <Link href="/login">
          <button className="bg-[#EF4444] rounded-3xl py-2 px-3">Log in</button>
        </Link>
      </div>
    </div>
  );
};
export default Header;
