import { useCallback, useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { getSettings } from "../Api/settings";
import { BASE_URL } from "../config";

import {
  BoxCubeIcon,
  ChevronDownIcon,
  GridIcon,
  HorizontaLDots,
} from "../icons";

import { useSidebar } from "../context/SidebarContext";
import SidebarWidget from "./SidebarWidget";

// ✅ Types
type Settings = {
  logo?: string;
  site_name?: string;
  email?: string;
};

type NavItem = {
  name: string;
  icon: React.ReactNode;
  path?: string;
  subItems?: { name: string; path: string }[];
};

const navItems: NavItem[] = [
  {
    icon: <GridIcon />,
    name: "Dashboard",
    path: "/",
  },
  // {
  //   icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path></svg>,
  //   name: " Enquiry",
  //   path: "#",
  //   // subItems: [
  //   //   { name: "Add Enquiry", path: "/testimonial" },
  //   // ],
  // },
  // {
  //   icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>,
  //   name: "testimonial",
  //   path: "/testimonial",
  //   // subItems: [
  //   //   { name: "Add Enquiry", path: "/testimonial" },
  //   // ],
  // },
  // {
  //   icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>,
  //   name: "Search",
  //   path: "#",
  //   // subItems: [
  //   //   { name: "Add Enquiry", path: "/testimonial" },
  //   // ],
  // },
  // {
  //   icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 5H7a2 2 0 00-2 2v11a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path></svg>,
  //   name: "All Enquiries",
  //   path: "#",
  //   // subItems: [
  //   //   { name: "Add Enquiry", path: "/testimonial" },
  //   // ],
  // },
  {
    icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 5H7a2 2 0 00-2 2v11a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path></svg>,
    name: "All Enquiries",
    path: "/vigilance",
    // subItems: [
    //   { name: "Add Enquiry", path: "/testimonial" },
    // ],
  },
  
  {
    icon: <BoxCubeIcon />,
    name: "Site Setting",
    path: "/settings",
  },
];

const AppSidebar: React.FC = () => {
  const { isExpanded, isMobileOpen, isHovered, setIsHovered } = useSidebar();
  const location = useLocation();

  const [settings, setSettings] = useState<Settings | null>(null);
  const [loading, setLoading] = useState(true);
  const [logoError, setLogoError] = useState(false);

  const [openSubmenu, setOpenSubmenu] = useState<number | null>(null);
  const [subMenuHeight, setSubMenuHeight] = useState<Record<string, number>>({});

  const subMenuRefs = useRef<Record<string, HTMLDivElement | null>>({});

  const isActive = useCallback(
    (path: string) => location.pathname === path,
    [location.pathname]
  );

  // ✅ Fetch Settings — saare response structures handle karta hai
  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const res = await getSettings();

        // Debug ke liye — sahi response milne ke baad hata sakte ho
        console.log("Settings RAW response:", res);

        // Laravel API response structure handle karo:
        // Case 1: res.data.data (nested)
        // Case 2: res.data (direct)
        // Case 3: res (flat)
        const data =
          res?.data?.data ?? res?.data ?? res ?? {};

        console.log("Settings parsed:", data);
        setSettings(data);
        setLogoError(false); // reset logo error on fresh fetch
      } catch (error) {
        console.error("Settings fetch error:", error);
        setSettings(null);
      } finally {
        setLoading(false);
      }
    };

    fetchSettings();
  }, []);

  // ✅ Auto open submenu based on current route
  useEffect(() => {
    let found = false;
    navItems.forEach((nav, index) => {
      nav.subItems?.forEach((sub) => {
        if (isActive(sub.path)) {
          setOpenSubmenu(index);
          found = true;
        }
      });
    });
    if (!found) setOpenSubmenu(null);
  }, [location.pathname, isActive]);

  // ✅ Submenu height animation
  useEffect(() => {
    if (openSubmenu !== null) {
      const key = `menu-${openSubmenu}`;
      if (subMenuRefs.current[key]) {
        setSubMenuHeight((prev) => ({
          ...prev,
          [key]: subMenuRefs.current[key]?.scrollHeight || 0,
        }));
      }
    }
  }, [openSubmenu]);

  const toggleMenu = (index: number) => {
    setOpenSubmenu((prev) => (prev === index ? null : index));
  };

  // ✅ Logo URL builder
  const getLogoSrc = () => {
    if (logoError || !settings?.logo) {
      return "/images/logo/logo.png"; // fallback
    }

    // Agar logo already full URL hai
    if (settings.logo.startsWith("http")) {
      return settings.logo;
    }

    // Normal case: BASE_URL + /storage/ + path
    return `${BASE_URL}/storage/${settings.logo}`;
  };

  return (
    <aside
      className={`fixed top-0 left-0 h-screen bg-red dark:bg-gray-900 border-r transition-all bg-blue-100 duration-300 ${
        isExpanded || isHovered || isMobileOpen ? "w-[260px]" : "w-[80px]"
      } ${isMobileOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0`}
      onMouseEnter={() => !isExpanded && setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* ✅ LOGO */}
      <div className="py-4 flex justify-center items-center">
        <Link to="/">
          {loading ? (
            // Loading skeleton
            <div
              className="bg-gray-200 dark:bg-gray-700 animate-pulse rounded"
              style={{
                width: isExpanded || isHovered || isMobileOpen ? 140 : 32,
                height: 40,
              }}
            />
          ) : (
            <img
              src={getLogoSrc()}
              alt={settings?.site_name || "Logo"}
              width={isExpanded || isHovered || isMobileOpen ? 70 : 32}
              onError={() => setLogoError(true)}
              className="transition-all duration-300 object-contain"
            />
          )}
        </Link>
      </div>

      {/* ✅ SITE NAME */}
      {(isExpanded || isHovered || isMobileOpen) && (
        <div className="text-center text-sm font-semibold mb-3 text-gray-800 dark:text-white px-2">
          {loading ? (
            <div className="bg-gray-200 dark:bg-gray-700 animate-pulse rounded h-4 w-3/4 mx-auto" />
          ) : (
            settings?.site_name || "Admin Panel"
          )}
        </div>
      )}

      {/* ✅ NAV MENU */}
      <div className="overflow-y-auto px-4">
        <h2 className="text-xs text-gray-400 mb-3">
          {isExpanded || isHovered || isMobileOpen ? "Menu" : <HorizontaLDots />}
        </h2>

        <ul className="flex flex-col gap-4">
          {navItems.map((nav, index) => (
            <li key={nav.name}>
              {nav.subItems ? (
                <>
                  {/* Parent with submenu */}
                  <button
                    onClick={() => toggleMenu(index)}
                    className={`menu-item ${
                      openSubmenu === index
                        ? "menu-item-active"
                        : "menu-item-inactive"
                    }`}
                  >
                    <span className="menu-item-icon-size">{nav.icon}</span>

                    {(isExpanded || isHovered || isMobileOpen) && (
                      <>
                        <span className="menu-item-text">{nav.name}</span>
                        <ChevronDownIcon
                          className={`ml-auto transition-transform duration-300 ${
                            openSubmenu === index ? "rotate-180" : ""
                          }`}
                        />
                      </>
                    )}
                  </button>

                  {/* Submenu */}
                  <div
                    ref={(el) => {
                      subMenuRefs.current[`menu-${index}`] = el;
                    }}
                    className="overflow-hidden transition-all duration-300"
                    style={{
                      height:
                        openSubmenu === index
                          ? subMenuHeight[`menu-${index}`]
                          : 0,
                    }}
                  >
                    <ul className="ml-8 mt-2 space-y-1">
                      {nav.subItems.map((sub) => (
                        <li key={sub.name}>
                          <Link
                            to={sub.path}
                            className={`menu-dropdown-item ${
                              isActive(sub.path)
                                ? "menu-dropdown-item-active"
                                : "menu-dropdown-item-inactive"
                            }`}
                          >
                            {sub.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                </>
              ) : (
                nav.path && (
                  <Link
                    to={nav.path}
                    className={`menu-item ${
                      isActive(nav.path)
                        ? "menu-item-active"
                        : "menu-item-inactive"
                    }`}
                  >
                    <span className="menu-item-icon-size">{nav.icon}</span>
                    {(isExpanded || isHovered || isMobileOpen) && (
                      <span className="menu-item-text">{nav.name}</span>
                    )}
                  </Link>
                )
              )}
            </li>
          ))}
        </ul>

        {(isExpanded || isHovered || isMobileOpen) && <SidebarWidget />}
      </div>
    </aside>
  );
};

export default AppSidebar;