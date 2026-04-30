import { useEffect, useState } from "react";
import { getSettings } from "../../Api/settings";
import { Link } from "react-router-dom";
import PageMeta from "../../components/common/PageMeta";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import { toast } from "react-toastify";
import { BASE_URL } from "../../config";

export default function SettingsView() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const res = await getSettings();
      setData(res.data.data);
    } catch (error) {
      toast.error("Failed to load settings");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div>
        <PageMeta title="Settings | IWCI" description="Software settings" />
        <PageBreadcrumb pageTitle="Settings" />
        <div className="p-5 border border-gray-200 rounded-2xl dark:border-gray-800 lg:p-6">
          <div className="animate-pulse space-y-6">
            <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-1/3"></div>
            <div className="h-32 bg-gray-200 dark:bg-gray-700 rounded-xl"></div>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="h-40 bg-gray-200 dark:bg-gray-700 rounded-xl"></div>
              <div className="h-40 bg-gray-200 dark:bg-gray-700 rounded-xl"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <PageMeta
        title="Settings Dashboard | Institute for Water and Climate Initiatives"
        description="Manage Software settings"
      />
      <PageBreadcrumb pageTitle="Settings" />
      <div className="p-5 border border-gray-200 rounded-2xl dark:border-gray-800 lg:p-6 space-y-6">
        {/* Header with Edit Button */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white/90">
              Software  Settings
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              Manage your Software configuration, contact details, and branding
            </p>
          </div>
          <Link
            to="/settings/edit"
            className="inline-flex items-center gap-2 rounded-full bg-blue-600 px-5 py-2.5 text-sm font-medium text-white shadow-md hover:bg-blue-700 transition"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
            </svg>
            Edit Settings
          </Link>
        </div>

        {/* Brand Card */}
        <div className="p-6 rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-center gap-6">
            <div className="relative w-24 h-24 rounded-full overflow-hidden border-2 border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 flex-shrink-0">
              {data.logo ? (
                <img
                  src={`${BASE_URL}/storage/${data.logo}`}
                  alt="Site Logo"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="flex items-center justify-center h-full text-gray-400">
                  <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
              )}
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-800 dark:text-white/90">
                {data.site_name || "Site Name"}
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                Primary logo and site identity
              </p>
            </div>
          </div>
        </div>

        {/* Two Column Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Contact Information Card */}
          <div className="p-6 rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-sm">
            <div className="flex items-center gap-2 mb-4">
              <svg className="w-5 h-5 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              <h4 className="font-semibold text-gray-800 dark:text-white/90">
                Contact Information
              </h4>
            </div>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <span className="text-gray-500 dark:text-gray-400">📧</span>
                <span className="text-gray-700 dark:text-gray-300 break-all">{data.email}</span>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-gray-500 dark:text-gray-400">📱</span>
                <span className="text-gray-700 dark:text-gray-300">{data.phone}</span>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-gray-500 dark:text-gray-400">📍</span>
                <span className="text-gray-700 dark:text-gray-300">{data.address}</span>
              </div>
              {data.address_alt && (
                <div className="flex items-start gap-3">
                  <span className="text-gray-500 dark:text-gray-400">📍</span>
                  <span className="text-gray-700 dark:text-gray-300">{data.address_alt}</span>
                </div>
              )}
            </div>
          </div>

          {/* Footer Info Card */}
          <div className="p-6 rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-sm">
            <div className="flex items-center gap-2 mb-4">
              <svg className="w-5 h-5 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <h4 className="font-semibold text-gray-800 dark:text-white/90">
                Footer & Extra
              </h4>
            </div>
            <div className="space-y-3">
              <p className="text-gray-700 dark:text-gray-300">
                <span className="font-medium">Footer About:</span> {data.footer_about}
              </p>
            </div>
          </div>
        </div>

        {/* Logo & Favicon Row */}
        <div className="grid md:grid-cols-2 gap-6">
          <div className="p-6 rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-sm text-center">
            <h4 className="font-semibold text-gray-800 dark:text-white/90 mb-3 flex items-center justify-center gap-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              Footer Logo
            </h4>
            <div className="flex justify-center">
              {data.footer_logo ? (
                <img
                  src={`${BASE_URL}/storage/${data.footer_logo}`}
                  alt="Footer Logo"
                  className="h-16 object-contain"
                />
              ) : (
                <div className="text-gray-400 text-sm">No footer logo</div>
              )}
            </div>
          </div>

          <div className="p-6 rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-sm text-center">
            <h4 className="font-semibold text-gray-800 dark:text-white/90 mb-3 flex items-center justify-center gap-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
              </svg>
              Favicon
            </h4>
            <div className="flex justify-center">
              {data.favicon ? (
                <img
                  src={`${BASE_URL}/storage/${data.favicon}`}
                  alt="Favicon"
                  className="h-10 object-contain"
                />
              ) : (
                <div className="text-gray-400 text-sm">No favicon</div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}