import { Outlet } from "react-router-dom";
import { Navbar } from "./components/Navbar";

export function LayoutDashboard() {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
}
