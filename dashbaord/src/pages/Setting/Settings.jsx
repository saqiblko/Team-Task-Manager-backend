import { useEffect, useState } from "react";
import { getSettings, saveSettings } from "../../Api/settings";
import Label from "../../components/form/Label";
import PageMeta from "../../components/common/PageMeta";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import { toast } from "react-toastify";
import { BASE_URL } from "../../config";

export default function Settings() {
  // Text fields
  const [form, setForm] = useState({
    site_name: "",
    email: "",
    phone: "",
    address: "",
    address_alt: "",
    donate_text: "",
    donate_link: "",
    footer_about: "",
    facebook: "",
    instagram: "",
  });

  // File states
  const [logo, setLogo] = useState(null);
  const [footerLogo, setFooterLogo] = useState(null);
  const [favicon, setFavicon] = useState(null);

  // Existing file URLs (for preview)
  const [existingLogo, setExistingLogo] = useState(null);
  const [existingFooterLogo, setExistingFooterLogo] = useState(null);
  const [existingFavicon, setExistingFavicon] = useState(null);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch existing settings on mount
  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const res = await getSettings();
        if (res.data?.data) {
          const data = res.data.data;
          setForm({
            site_name: data.site_name || "",
            email: data.email || "",
            phone: data.phone || "",
            address: data.address || "",
            address_alt: data.address_alt || "",
            donate_text: data.donate_text || "",
            donate_link: data.donate_link || "",
            footer_about: data.footer_about || "",
            facebook: data.facebook || "",
            instagram: data.instagram || "",
          });
          setExistingLogo(data.logo || null);
          setExistingFooterLogo(data.footer_logo || null);
          setExistingFavicon(data.favicon || null);
        }
      } catch (err) {
        console.error("Failed to load settings", err);
        setError("Failed to load settings.");
      }
    };
    fetchSettings();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFileChange = (setter) => (e) => {
    setter(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const formData = new FormData();
    Object.keys(form).forEach((key) => {
      if (form[key] !== null && form[key] !== undefined) {
        formData.append(key, form[key]);
      }
    });
    if (logo) formData.append("logo", logo);
    if (footerLogo) formData.append("footer_logo", footerLogo);
    if (favicon) formData.append("favicon", favicon);

    try {
      await saveSettings(formData);
      toast.success("Settings saved successfully ✅");
    } catch (err) {
      toast.error("FULL ERROR:", err.response?.data);
      setError(err.response?.data?.message || "Failed to save settings");
    } finally {
      setLoading(false);
    }
  };

  if (!form && !error) return <p className="text-center py-10">Loading settings...</p>;

  return (
  <div className="">
<PageMeta
  title="Settings | Vigilance Enquiry Management System"
  description="Manage system settings including site details, logo, contact information, and configuration for the Vigilance Enquiry Management System."
/>
      <PageBreadcrumb pageTitle="Setting Update" />
      <div className="p-5 border border-gray-200 rounded-2xl dark:border-gray-800 lg:p-6">
      <h2 className="mb-6 text-2xl font-bold text-gray-900 dark:text-gray-100">Software Settings</h2>

      {error && (
        <div className="mb-6 text-red-600 dark:text-red-400 font-semibold">{error}</div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Site Name */}
        <div>
          <Label className="block text-sm font-medium text-gray-900 dark:text-gray-200 mb-1">
            Site Name
          </Label>
          <input
            type="text"
            name="site_name"
            value={form.site_name || ""}
            onChange={handleChange}
            placeholder="Site Name"
            className="w-full p-2 border border-gray-300 rounded-md placeholder-gray-400 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-100 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        {/* Email */}
        <div>
          <Label className="block text-sm font-medium text-gray-900 dark:text-gray-200 mb-1">
            Email
          </Label>
          <input
            type="email"
            name="email"
            value={form.email || ""}
            onChange={handleChange}
            placeholder="Email"
            className="w-full p-2 border border-gray-300 rounded-md placeholder-gray-400 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-100 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        {/* Phone */}
        <div>
          <Label className="block text-sm font-medium text-gray-900 dark:text-gray-200 mb-1">
            Mobile No.
          </Label>
          <input
            type="text"
            name="phone"
            value={form.phone || ""}
            onChange={handleChange}
            placeholder="Phone"
            className="w-full p-2 border border-gray-300 rounded-md placeholder-gray-400 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-100 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        {/* Address */}
        <div>
          <Label className="block text-sm font-medium text-gray-900 dark:text-gray-200 mb-1">
            Address
          </Label>
          <input
            type="text"
            name="address"
            value={form.address || ""}
            onChange={handleChange}
            placeholder="Address"
            className="w-full p-2 border border-gray-300 rounded-md placeholder-gray-400 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-100 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        {/* Alternative Address */}
        <div>
          <Label className="block text-sm font-medium text-gray-900 dark:text-gray-200 mb-1">
            Alternative Address
          </Label>
          <input
            type="text"
            name="address_alt"
            value={form.address_alt || ""}
            onChange={handleChange}
            placeholder="Alternative Address"
            className="w-full p-2 border border-gray-300 rounded-md placeholder-gray-400 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-100 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        {/* Footer About */}
        <div>
          <Label className="block text-sm font-medium text-gray-900 dark:text-gray-200 mb-1">
            Footer About
          </Label>
          <textarea
            name="footer_about"
            value={form.footer_about || ""}
            onChange={handleChange}
            placeholder="Footer About"
            rows={4}
            className="w-full p-2 border border-gray-300 rounded-md resize-none placeholder-gray-400 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-100 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        {/* File Uploads */}
        <div className="space-y-6">
          {/* Logo */}
          <div>
            <div className="flex justify-center rounded-lg border-2 border-dashed border-gray-300 dark:border-gray-700 py-6 cursor-pointer hover:border-indigo-500 transition">
              <label
                htmlFor="logo-upload"
                className="cursor-pointer font-semibold text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300"
              >
                Upload Logo
                <input
                  id="logo-upload"
                  type="file"
                  onChange={handleFileChange(setLogo)}
                  className="sr-only"
                  accept="image/*"
                />
              </label>
            </div>
            <div className="mt-2 flex justify-center">
              {existingLogo && !logo && (
                <img
                  src={`${BASE_URL}/storage/${existingLogo}`}
                  alt="Existing Logo"
                  className="h-16 object-contain rounded"
                />
              )}
              {logo && (
                <img
                  src={URL.createObjectURL(logo)}
                  alt="New Logo Preview"
                  className="h-16 object-contain rounded"
                />
              )}
            </div>
          </div>

          {/* Footer Logo */}
          <div>
            <div className="flex justify-center rounded-lg border-2 border-dashed border-gray-300 dark:border-gray-700 py-6 cursor-pointer hover:border-indigo-500 transition">
              <label
                htmlFor="footer-logo-upload"
                className="cursor-pointer font-semibold text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300"
              >
                Upload Footer Logo
                <input
                  id="footer-logo-upload"
                  type="file"
                  onChange={handleFileChange(setFooterLogo)}
                  className="sr-only"
                  accept="image/*"
                />
              </label>
            </div>
            <div className="mt-2 flex justify-center">
              {existingFooterLogo && !footerLogo && (
                <img
                  src={`${BASE_URL}/storage/${existingFooterLogo}`}
                  alt="Existing Footer Logo"
                  className="h-16 object-contain rounded"
                />
              )}
              {footerLogo && (
                <img
                  src={URL.createObjectURL(footerLogo)}
                  alt="New Footer Logo Preview"
                  className="h-16 object-contain rounded"
                />
              )}
            </div>
          </div>

          {/* Favicon */}
          <div>
            <div className="flex justify-center rounded-lg border-2 border-dashed border-gray-300 dark:border-gray-700 py-6 cursor-pointer hover:border-indigo-500 transition">
              <label
                htmlFor="favicon-upload"
                className="cursor-pointer font-semibold text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300"
              >
                Upload Favicon
                <input
                  id="favicon-upload"
                  type="file"
                  onChange={handleFileChange(setFavicon)}
                  className="sr-only"
                  accept="image/*"
                />
              </label>
            </div>
            <div className="mt-2 flex justify-center">
              {existingFavicon && !favicon && (
                <img
                   src={`${BASE_URL}/storage/${existingFavicon}`}
                  alt="Existing Footer Logo"
                  className="h-16 object-contain rounded"
                />
              )}
              {favicon && (
                <img
                  src={URL.createObjectURL(favicon)}
                  alt="New Favicon Preview"
                  className="h-8 object-contain rounded"
                />
              )}
            </div>
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 mt-4 font-semibold rounded bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white transition"
        >
          {loading ? "Saving..." : "Save Settings"}
        </button>
      </form>
    </div>
    </div>
  );
}