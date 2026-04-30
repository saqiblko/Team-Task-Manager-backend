import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import {
  getTestimonials,
  uploadTestimonial,
  updateTestimonial,
  deleteTestimonial,  
} from "../../Api/testimonials";
import PageMeta from "../../components/common/PageMeta";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import { BASE_URL } from "../../config";

export default function Testimonial() {
  const [testimonials, setTestimonials] = useState([]);
  const [files, setFiles] = useState([]);
  const [form, setForm] = useState({ name: "", designation: "", message: "" });
  const [loading, setLoading] = useState(false);
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const res = await getTestimonials();
      setTestimonials(res.data.data);
    } catch (err) {
      toast.error("Failed to load testimonials ❌");
    }
  };

  const handleFileChange = (e) => {
    setFiles(e.target.files ? Array.from(e.target.files) : []);
  };

  const handleSubmit = async () => {
    if (!form.name || !form.designation || !form.message) {
      toast.warn("Please fill all fields ❗");
      return;
    }

    const formData = new FormData();
    formData.append("name", form.name);
    formData.append("designation", form.designation);
    formData.append("message", form.message);
    if (files[0]) formData.append("image", files[0]);

    setLoading(true);
    try {
      if (editId) {
        await updateTestimonial(editId, formData);
        toast.success("Testimonial updated ✅");
      } else {
        await uploadTestimonial(formData);
        toast.success("Testimonial added ✅");
      }
      setForm({ name: "", designation: "", message: "" });
      setFiles([]);
      setEditId(null);
      fetchData();
    } catch (err) {
      toast.error("Operation failed ❌");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (item) => {
    setForm({ name: item.name, designation: item.designation, message: item.message });
    setEditId(item.id);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this testimonial?")) return;
    try {
      await deleteTestimonial(id);
      toast.success("Deleted ✅");
      fetchData();
    } catch (err) {
      toast.error("Delete failed ❌");
    }
  };

  const scroll = (direction) => {
    const container = document.querySelector(".testimonial-scroll");
    if (container) {
      const scrollAmount = direction === "left" ? -320 : 320;
      container.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  return (
    <div className="p-5 lg:p-6">
      <PageMeta title="Testimonials Dashboard" description="Manage testimonials" />
      <PageBreadcrumb pageTitle="Testimonials" />

      {/* Form Card - modern design */}
      <div className="mb-8 border border-gray-200 dark:border-gray-800 rounded-2xl bg-white dark:bg-gray-900 p-5 lg:p-6 shadow-sm">
        <h4 className="text-lg font-semibold text-gray-800 dark:text-white/90 mb-4">
          {editId ? "✏️ Edit Testimonial" : "➕ Add New Testimonial"}
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Full Name</label>
            <input
              type="text"
              placeholder="e.g. John Doe"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 px-4 py-2 text-gray-800 dark:text-white/90 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Designation</label>
            <input
              type="text"
              placeholder="e.g. CEO, Company"
              value={form.designation}
              onChange={(e) => setForm({ ...form, designation: e.target.value })}
              className="w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 px-4 py-2 text-gray-800 dark:text-white/90 focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Message</label>
            <textarea
              rows="3"
              placeholder="What they say about you..."
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              className="w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 px-4 py-2 text-gray-800 dark:text-white/90 focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Profile Image (optional)</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 dark:file:bg-gray-700 dark:file:text-gray-200"
            />
            {files[0] && <p className="text-xs text-green-600 mt-1">✓ {files[0].name} selected</p>}
          </div>
          <div className="flex items-end justify-end md:col-span-2">
            <button
              onClick={handleSubmit}
              disabled={loading}
              className="flex items-center gap-2 rounded-full bg-blue-600 px-6 py-2.5 text-sm font-medium text-white shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 transition"
            >
              {loading ? (
                "Processing..."
              ) : editId ? (
                <>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Update
                </>
              ) : (
                <>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                  Add
                </>
              )}
            </button>
            {editId && (
              <button
                onClick={() => {
                  setEditId(null);
                  setForm({ name: "", designation: "", message: "" });
                  setFiles([]);
                }}
                className="ml-3 rounded-full border border-gray-300 bg-white px-6 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03]"
              >
                Cancel
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Testimonials Slider */}
      {testimonials.length === 0 ? (
        <div className="text-center py-12 border border-dashed border-gray-300 dark:border-gray-700 rounded-2xl text-gray-500 dark:text-gray-400">
          No testimonials yet. Add your first one above!
        </div>
      ) : (
        <div className="relative group">
          {/* Left Arrow */}
          <button
            onClick={() => scroll("left")}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/90 dark:bg-gray-800/90 rounded-full p-2 shadow-md opacity-0 group-hover:opacity-100 transition-all duration-200 hover:bg-white dark:hover:bg-gray-700"
            aria-label="Scroll left"
          >
            <svg className="w-5 h-5 text-gray-700 dark:text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          {/* Scrollable container */}
          <div className="testimonial-scroll overflow-x-auto scroll-smooth whitespace-nowrap pb-4 hide-scrollbar">
            <div className="inline-flex gap-6">
              {testimonials.map((item) => (
                <div
                  key={item.id}
                  className="relative inline-block w-80 rounded-2xl overflow-hidden shadow-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 transition-transform duration-300 hover:scale-[1.02]"
                >
                  {/* Image area */}
                  <div className="relative h-48 overflow-hidden bg-gray-100 dark:bg-gray-700">
                    {item.image ? (
                      <img
                        src={`${BASE_URL}/storage/${item.image}`}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="flex items-center justify-center h-full text-gray-400">
                        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                      </div>
                    )}
                    {/* Action buttons overlay */}
                    <div className="absolute top-3 right-3 flex gap-2">
                      <button
                        onClick={() => handleEdit(item)}
                        className="bg-yellow-500 hover:bg-yellow-600 text-white p-1.5 rounded-full shadow-md transition"
                        aria-label="Edit"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                        </svg>
                      </button>
                      <button
                        onClick={() => handleDelete(item.id)}
                        className="bg-red-600 hover:bg-red-700 text-white p-1.5 rounded-full shadow-md transition"
                        aria-label="Delete"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-4">
                    <h3 className="text-md font-bold text-gray-800 dark:text-white truncate">{item.name}</h3>
                    <p className="text-xs text-blue-600 dark:text-blue-400 mb-2">{item.designation}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-3 whitespace-normal">
                      "{item.message}"
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Arrow */}
          <button
            onClick={() => scroll("right")}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/90 dark:bg-gray-800/90 rounded-full p-2 shadow-md opacity-0 group-hover:opacity-100 transition-all duration-200 hover:bg-white dark:hover:bg-gray-700"
            aria-label="Scroll right"
          >
            <svg className="w-5 h-5 text-gray-700 dark:text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      )}

      <style>{`
        .hide-scrollbar::-webkit-scrollbar { display: none; }
        .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        .line-clamp-3 {
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
}