import { logout } from "../Api/auth";
import { useNavigate } from "react-router-dom";
import { PlugInIcon } from "../icons";
import { useSidebar } from "../context/SidebarContext"; // ✅ ye add karo

export default function SidebarWidget() {
  const navigate = useNavigate();

  // ✅ sidebar state lo
  const { isExpanded, isHovered, isMobileOpen } = useSidebar();

  const handleLogout = async () => {
    const token = localStorage.getItem("token");

    try {
      await logout(token);
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      localStorage.removeItem("token");
      navigate("/signin");
    }
  };

  return (
    <div className="mt-4">
      <button
        onClick={handleLogout}
        className={`menu-item group dark:text-white hover:text-white hover:bg-red-500 w-full ${
          !isExpanded && !isHovered ? "lg:justify-center" : "lg:justify-start"
        }`}
      >
        {/* Icon */}
        <span className="menu-item-icon-size">
          <PlugInIcon />
        </span>

        {/* Text (IMPORTANT CONDITION) */}
        {(isExpanded || isHovered || isMobileOpen) && (
          <span className="menu-item-text ">Logout</span>
        )}
      </button>
    </div>
  );
}