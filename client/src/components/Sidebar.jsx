import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Package,
  Receipt,
  History,
  MenuSquare,
  Image,
} from "lucide-react";

function Sidebar() {
  const menus = [
    {
      name: "Dashboard",
      path: "/",
      icon: LayoutDashboard,
    },
    {
      name: "Products",
      path: "/products",
      icon: Package,
    },
    {
      name: "Billing",
      path: "/billing",
      icon: Receipt,
    },
    {
      name: "Bill History",
      path: "/bill-history",
      icon: History,
    },
    {
      name: "Customer Menu",
      path: "/menu",
      icon: MenuSquare,
    },
    {
      name: "Menu Card",
      path: "/menu-card",
      icon: Image,
    },
  ];

  return (
    <div className="w-64 min-h-screen bg-black text-white shadow-2xl">
      {/* Logo Section */}
      <div className="p-6 border-b border-amber-100">
        <h1 className="text-3xl font-extrabold">
          <span className="text-white">Waff</span>
          <span className="text-amber-500"> N Burg</span>
        </h1>

        <p className="text-xs text-gray-500 mt-1 text-justify">
          Fresh Waffles • Thick Shakes • Good Vibes
        </p>
      </div>

      {/* Menu */}
      <div className="p-3 space-y-2  bg-black-400">
        {menus.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all duration-200 ${
                isActive
                  ? "bg-black text-white shadow-md"
                  : "text-gray-700 hover:bg-amber-50 hover:text-amber-600"
              }`
            }
          >
            <item.icon size={18} />
            <span>{item.name}</span>
          </NavLink>
        ))}
      </div>
      <button
        onClick={() => {
          localStorage.removeItem("adminToken");
          localStorage.removeItem("admin");
          window.location.href = "/";
        }}
        className="
  bg-amber-500
  text-white
  px-4
  py-2
  rounded-xl
  "
      >
        Logout
      </button>
    </div>
  );
}

export default Sidebar;
