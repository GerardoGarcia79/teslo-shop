import { Outlet } from "react-router";

export const ShopLayout = () => {
  return (
    <div className="font-bold">
      <Outlet />
    </div>
  );
};
