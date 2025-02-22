const Footer = () => {
  return (
    <div className="h-[755px] bg-primary pt-[60px] w-full">
      <div className="h-[92px] bg-[#ef4444] whitespace-normal flex gap-[34px] overflow-hidden justify-center items-center w-full">
        <div className="flex gap-7 ">
          {Array.from({ length: 14 }, (_, i) => (
            <h2 key={i} className="text-[30px] text-white">
              Fresh fast delivered
            </h2>
          ))}
        </div>
      </div>
      <div className="px-[220px] py-[88px]">
        <div className="flex gap-[220px]">
          <div className="flex flex-col items-center">
            <img className="w-[46px]" src="/logo.png" alt="" />
          </div>
          <div className="flex">
            <h4 className="font-semibold text-secondary">Nom</h4>
            <h4 className="text-[#ef4444] font-semibold">Nom</h4>
          </div>
          <p className="text-secondary text-sm">Swift delivery</p>
        </div>
      </div>
      <div className="text-secondary flex flex-col gap-2">
        <p className="text-[#71717A]">NOMNOM</p>
        <p>Home</p>
        <p>Contact us</p>
        <p>Delivery zone</p>
      </div>
      <div className="flex gap-[220px]">
        <div className="text-secondary flex flex-col gap-2">
          <p className="text-[#71717A]">MENU</p>
          <p>Appetizers</p>
          <p>Salads</p>
          <p>Pizzas</p>
          <p>Lunch Favorites</p>
          <p>Main dishes</p>
        </div>
        <div className="text-secondary flex flex-col gap-2">
          <p>&nbsp;</p>
          <p>Side dish</p>
          <p>Brunch</p>
          <p>Desserts</p>
          <p>Beverages</p>
          <p>Fish & Sea foods</p>
        </div>
      </div>
      <div>
        <p className="text-[#71717A]">Follow us</p>
        <div className="flex gap-4 mt-4">
          <img src="" alt="" />
          <img src="" alt="" />
        </div>
      </div>
      <div className="px-[220px] py-8">
        <div className="border-t border-t-[#71717A] flex gap-12 pt-4">
          <p className="text-[#71717A]">Copyright 2024 Nomnom LLC</p>
          <p className="text-[#71717A]">Privacy policy</p>
          <p className="text-[#71717A]">Terms and conditions</p>
          <p className="text-[#71717A]">Cookie policy</p>
        </div>
      </div>
    </div>
  );
};
export default Footer;
