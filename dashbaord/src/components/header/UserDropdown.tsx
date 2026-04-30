import { useEffect, useState } from "react";
import { getSettings } from "../../Api/settings";
import { BASE_URL } from "../../config";

type Settings = {
  logo?: string;
  site_name?: string;
  email?: string;
};

export default function UserDropdown() {
  const [data, setData] = useState<Settings | null>(null);
  const [loading, setLoading] = useState(true);

  // 🔥 Load from cache first
  useEffect(() => {
    const cached = localStorage.getItem("settings");
    if (cached) {
      setData(JSON.parse(cached));
      setLoading(false);
    }
  }, []);

  // 🔥 Fetch latest
  useEffect(() => {
    getSettings()
      .then((res: any) => {
        const settingsData = res?.data?.data || res?.data || {};
        setData(settingsData);

        // cache save
        localStorage.setItem("settings", JSON.stringify(settingsData));
      })
      .catch((err: any) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="flex items-center gap-3">
      
      {/* 🔥 Logo */}
      {loading ? (
        <div className="w-10 h-10 bg-gray-200 animate-pulse rounded-full"></div>
      ) : (
        <img
          src={
            data?.logo
              ? `${BASE_URL}/storage/${data.logo}`
              : "/images/logo/logo.png"
          }
          alt="logo"
          className="w-10 h-10 rounded-full object-cover border"
          onError={(e) => {
            e.currentTarget.src = "/images/logo/logo.png";
          }}
        />
      )}

      {/* 🔥 Info */}
      <div>
        <h4 className="text-sm font-semibold text-gray-800 dark:text-white">
          {loading ? "Loading..." : data?.site_name || "Vigilance System"}
        </h4>

        <p className="text-xs text-gray-500">
          {loading ? "" : data?.email || "admin@email.com"}
        </p>
      </div>

    </div>
  );
}