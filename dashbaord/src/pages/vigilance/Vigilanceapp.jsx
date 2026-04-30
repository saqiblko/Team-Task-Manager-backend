// src/pages/Enquiry/EnquiryPage.jsx
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import PageMeta from "../../components/common/PageMeta";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import {
  getEnquiries,
  createEnquiry,
  updateEnquiry,
  deleteEnquiry,
  searchEnquiries,
} from "../../Api/enquiry";
import { BASE_URL } from "../../config";

// ── CONSTANTS ────────────────────────────────────────────────
const DEPARTMENTS = [
  "Vigilance HQ Lucknow","Revenue Dept","Police Dept","PWD",
  "Health Dept","Education Dept","Forest Dept","Transport Dept",
  "Agriculture Dept","Finance Dept",
];
const DISTRICTS = [
  "Lucknow","Kanpur","Agra","Varanasi","Prayagraj","Gorakhpur",
  "Meerut","Bareilly","Moradabad","Aligarh","Ghaziabad","Noida",
];
const DESIGNATIONS = [
  "Inspector","Sub Inspector","Constable","Head Constable",
  "DSP","SSP","DIG","IG","ADG","DGP",
  "Clerk","Senior Clerk","Accountant","Naib Tehsildar",
  "Tehsildar","SDM","DM","Commissioner","Junior Engineer","Sub Engineer",
];

// ── EMPTY FORM ───────────────────────────────────────────────
const EMPTY = {
  enquiry_no: "", type: "Open",
  accuse_name: "", department: "", district: "", designation: "",
  age: "", aadhar_no: "", permanent_address: "", current_address: "",
  personal_no: "", mobile: "",
  date_of_joining: "", joining_department: "", joining_designation: "",
  current_designation: "", id_department: "",
  sector_name: "", io_name: "", io_mobile: "",
  writeup: "", file_path: null,
  dfo_date: "", dfo_comment: "", brief_description: "",
  supplementary_report: "", result: "",
};

// ── REUSABLE FIELD ───────────────────────────────────────────
const Field = ({ label, required, children }) => (
  <div className="flex flex-col gap-1">
    <label className="text-xs font-medium text-gray-600 dark:text-gray-400">
      {label} {required && <span className="text-red-500">*</span>}
    </label>
    {children}
  </div>
);

const inputCls =
  "w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 px-3 py-2 text-sm text-gray-800 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none";

const SectionTitle = ({ title }) => (
  <div className="col-span-2 border-b border-gray-200 dark:border-gray-700 pb-1 mt-2">
    <p className="text-xs font-semibold text-blue-600 dark:text-blue-400 uppercase tracking-wide">
      {title}
    </p>
  </div>
);

// ── BADGE ────────────────────────────────────────────────────
const Badge = ({ type }) => (
  <span
    className={`inline-block text-xs font-medium px-2.5 py-0.5 rounded-full ${
      type === "Open"
        ? "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300"
        : "bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300"
    }`}
  >
    {type}
  </span>
);

// ════════════════════════════════════════════════════════════
//  MAIN COMPONENT
// ════════════════════════════════════════════════════════════
export default function EnquiryPage() {
  const [enquiries, setEnquiries]   = useState([]);
  const [loading, setLoading]       = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [view, setView]             = useState("list"); // list | form | detail
  const [editItem, setEditItem]     = useState(null);
  const [viewItem, setViewItem]     = useState(null);
  const [form, setForm]             = useState(EMPTY);
  const [fileInput, setFileInput]   = useState(null);

  // Search state
  const [search, setSearch] = useState({
    name: "", enquiry_no: "", department: "",
    district: "", designation: "", type: "",
  });
  const [isSearching, setIsSearching] = useState(false);

  // ── FETCH ──────────────────────────────────────────────────
  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await getEnquiries();
      setEnquiries(res.data.data || []);
    } catch {
      toast.error("Records load karne mein error aaya ❌");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchData(); }, []);

  // ── FORM HANDLER ───────────────────────────────────────────
  const setField = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  const openForm = (item = null) => {
    setEditItem(item);
    setForm(item ? { ...item } : EMPTY);
    setFileInput(null);
    setView("form");
  };

  const openDetail = (item) => {
    setViewItem(item);
    setView("detail");
  };

  // ── SUBMIT ─────────────────────────────────────────────────
  const handleSubmit = async () => {
    if (!form.enquiry_no || !form.accuse_name || !form.department || !form.district) {
      toast.warn("Enquiry No, Name, Department aur District required hain ❗");
      return;
    }

    const fd = new FormData();
    Object.entries(form).forEach(([k, v]) => {
      if (v !== null && v !== undefined && k !== "file_path") fd.append(k, v);
    });
    if (fileInput) fd.append("file_path", fileInput);

    // Laravel update ke liye _method spoof
    if (editItem) fd.append("_method", "PUT");

    setSubmitting(true);
    try {
      if (editItem) {
        await updateEnquiry(editItem.id, fd);
        toast.success("Enquiry update ho gayi ✅");
      } else {
        await createEnquiry(fd);
        toast.success("Enquiry saved ✅");
      }
      setView("list");
      fetchData();
    } catch (err) {
      const errors = err?.response?.data?.errors;
      if (errors) {
        Object.values(errors).flat().forEach((e) => toast.error(e));
      } else {
        toast.error("wrong");
      }
    } finally {
      setSubmitting(false);
    }
  };

  // ── DELETE ─────────────────────────────────────────────────
  const handleDelete = async (id) => {
    if (!window.confirm("Kya aap is enquiry ko delete karna chahte hain?")) return;
    try {
      await deleteEnquiry(id);
      toast.success("Deleted ✅");
      fetchData();
    } catch {
      toast.error("Delete failed ❌");
    }
  };

  // ── SEARCH ─────────────────────────────────────────────────
  const handleSearch = async () => {
    setIsSearching(true);
    try {
      const res = await searchEnquiries(search);
      setEnquiries(res.data.data || []);
    } catch {
      toast.error("Search mein error ❌");
    } finally {
      setIsSearching(false);
    }
  };

  const clearSearch = () => {
    setSearch({ name: "", enquiry_no: "", department: "", district: "", designation: "", type: "" });
    fetchData();
  };

  // ── DETAIL VIEW (with Print functionality) ─────────────────
  if (view === "detail" && viewItem) {
    return (
      <div className="p-5 lg:p-6 print:p-0">
        <PageMeta title="Enquiry Detail" description="" />
        
        {/* Back button & breadcrumb – hidden when printing */}
        <div className="flex items-center gap-3 mb-6 print:hidden">
          <button onClick={() => setView("list")} className="text-sm text-blue-600 hover:underline">← Back</button>
          <span className="text-gray-400">/</span>
          <span className="text-sm text-gray-600 dark:text-gray-400">Enquiry Detail</span>
        </div>

        {/* Main card – remove border/shadow when printing */}
        <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6 shadow-sm print:shadow-none print:border-0 print:bg-white print:p-0">
          
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-semibold text-gray-800 dark:text-white print:text-black">{viewItem.accuse_name}</h2>
              <p className="text-sm text-blue-600 dark:text-blue-400 print:text-gray-700 mt-1">{viewItem.enquiry_no}</p>
            </div>
            <div className="print:hidden">
              <Badge type={viewItem.type} />
            </div>
            {/* Show plain text badge when printing */}
            <div className="hidden print:block text-sm font-medium text-black">
              Status: {viewItem.type}
            </div>
          </div>

          {/* All sections – force black text when printing */}
          <div className="print:text-black">
            {[
              { title: "Enquiry Info", fields: [
                ["Enquiry No", viewItem.enquiry_no], ["Type", viewItem.type],
              ]},
              { title: "Personal Details", fields: [
                ["Name", viewItem.accuse_name], ["Age", viewItem.age],
                ["Aadhar No", viewItem.aadhar_no], ["Mobile", viewItem.mobile],
                ["Personal No", viewItem.personal_no],
                ["Permanent Address", viewItem.permanent_address],
                ["Current Address", viewItem.current_address],
              ]},
              { title: "Posting Details", fields: [
                ["Department", viewItem.department], ["District", viewItem.district],
                ["Designation", viewItem.designation], ["Date of Joining", viewItem.date_of_joining],
                ["Joining Dept", viewItem.joining_department],
                ["Joining Designation", viewItem.joining_designation],
                ["Current Designation", viewItem.current_designation],
                ["ID Department", viewItem.id_department],
              ]},
              { title: "Sector & IO", fields: [
                ["Sector Name", viewItem.sector_name], ["IO Name", viewItem.io_name],
                ["IO Mobile", viewItem.io_mobile],
              ]},
              { title: "Write-up / Note", fields: [
                ["Write-up", viewItem.writeup],
              ]},
              { title: "DFO — Draft Final Report", fields: [
                ["DFO Date", viewItem.dfo_date], ["Comment / Note", viewItem.dfo_comment],
                ["Brief Description", viewItem.brief_description],
                ["Supplementary Report", viewItem.supplementary_report],
                ["Result / Decision of Govt Order", viewItem.result],
              ]},
            ].map((section) => (
              <div key={section.title} className="mb-6 print:break-inside-avoid">
                <p className="text-xs font-semibold text-blue-600 uppercase tracking-wider mb-3 border-b border-gray-100 dark:border-gray-800 pb-1 print:text-gray-800 print:border-gray-300">
                  {section.title}
                </p>
                <div className="grid grid-cols-2 gap-3">
                  {section.fields.map(([label, val]) => val ? (
                    <div key={label} className="col-span-1">
                      <p className="text-xs text-gray-400 print:text-gray-500">{label}</p>
                      <p className="text-sm text-gray-800 dark:text-white print:text-black mt-0.5">{val}</p>
                    </div>
                  ) : null)}
                </div>
              </div>
            ))}
          </div>

          {/* File link */}
          {viewItem.file_path && (
            <div className="mt-4 print:text-black">
              <p className="text-xs text-gray-400 mb-1">Uploaded File</p>
              <a
                href={`${BASE_URL}/storage/${viewItem.file_path}`}
                target="_blank"
                rel="noreferrer"
                className="text-sm text-blue-600 hover:underline print:text-black print:no-underline"
              >
                View File →
              </a>
            </div>
          )}

          {/* Action Buttons – hidden when printing */}
          <div className="flex gap-3 mt-6 pt-4 border-t border-gray-100 dark:border-gray-800 print:hidden">
            <button onClick={() => openForm(viewItem)} className="px-4 py-2 bg-yellow-500 hover:bg-yellow-600 text-white rounded-lg text-sm font-medium">
              Edit
            </button>
            <button onClick={() => handleDelete(viewItem.id)} className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg text-sm font-medium">
              Delete
            </button>
            <button onClick={() => window.print()} className="px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg text-sm font-medium">
              🖨️ Print
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ── FORM VIEW ──────────────────────────────────────────────
  if (view === "form") {
    return (
      <div className="p-5 lg:p-6">
        <PageMeta title={editItem ? "Edit Enquiry" : "New Enquiry"} description="" />
        <div className="flex items-center gap-3 mb-6">
          <button onClick={() => setView("list")} className="text-sm text-blue-600 hover:underline">← Back</button>
          <h2 className="text-lg font-semibold text-gray-800 dark:text-white">
            {editItem ? "✏️ Edit Enquiry" : "➕ New Enquiry — Data Entry"}
          </h2>
        </div>

        <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-5 lg:p-6 shadow-sm">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* ── Section 1: Enquiry Info ── */}
            <SectionTitle title="Enquiry Details" />
            <Field label="Enquiry No" required>
              <input className={inputCls} value={form.enquiry_no}
                onChange={(e) => setField("enquiry_no", e.target.value)}
                placeholder="e.g. VIG/2024/001" />
            </Field>
            <Field label="Type of Enquiry" required>
              <select className={inputCls} value={form.type} onChange={(e) => setField("type", e.target.value)}>
                <option value="Open">Open</option>
                <option value="Close">Close</option>
              </select>
            </Field>

            {/* ── Section 2: Accused Info ── */}
            <SectionTitle title="Name of Accused" />
            <Field label="Name of Accused" required>
              <input className={inputCls} value={form.accuse_name}
                onChange={(e) => setField("accuse_name", e.target.value)}
                placeholder="Full Name" />
            </Field>
            <Field label="Department" required>
              <select className={inputCls} value={form.department} onChange={(e) => setField("department", e.target.value)}>
                <option value="">-- Select --</option>
                {DEPARTMENTS.map((d) => <option key={d}>{d}</option>)}
              </select>
            </Field>
            <Field label="District" required>
              <select className={inputCls} value={form.district} onChange={(e) => setField("district", e.target.value)}>
                <option value="">-- Select --</option>
                {DISTRICTS.map((d) => <option key={d}>{d}</option>)}
              </select>
            </Field>
            <Field label="Designation">
              <select className={inputCls} value={form.designation} onChange={(e) => setField("designation", e.target.value)}>
                <option value="">-- Select --</option>
                {DESIGNATIONS.map((d) => <option key={d}>{d}</option>)}
              </select>
            </Field>

            {/* ── Section 3: Personal Details ── */}
            <SectionTitle title="Personal Details of Accused" />
            <Field label="Age">
              <input className={inputCls} type="number" value={form.age}
                onChange={(e) => setField("age", e.target.value)} placeholder="Age" />
            </Field>
            <Field label="Aadhar No">
              <input className={inputCls} value={form.aadhar_no}
                onChange={(e) => setField("aadhar_no", e.target.value)} placeholder="XXXX-XXXX-XXXX" />
            </Field>
            <Field label="Personal No">
              <input className={inputCls} value={form.personal_no}
                onChange={(e) => setField("personal_no", e.target.value)} />
            </Field>
            <Field label="Mobile No">
              <input className={inputCls} value={form.mobile}
                onChange={(e) => setField("mobile", e.target.value)} placeholder="10 digit" />
            </Field>
            <div className="md:col-span-2">
              <Field label="Permanent Address">
                <textarea className={inputCls} rows={2} value={form.permanent_address}
                  onChange={(e) => setField("permanent_address", e.target.value)} />
              </Field>
            </div>
            <div className="md:col-span-2">
              <Field label="Current Address">
                <textarea className={inputCls} rows={2} value={form.current_address}
                  onChange={(e) => setField("current_address", e.target.value)} />
              </Field>
            </div>

            {/* ── Section 4: Service Details ── */}
            <SectionTitle title="Service / Joining Details" />
            <Field label="Date of Joining">
              <input className={inputCls} type="date" value={form.date_of_joining}
                onChange={(e) => setField("date_of_joining", e.target.value)} />
            </Field>
            <Field label="Which Dept (Joining)">
              <select className={inputCls} value={form.joining_department} onChange={(e) => setField("joining_department", e.target.value)}>
                <option value="">-- Select --</option>
                {DEPARTMENTS.map((d) => <option key={d}>{d}</option>)}
              </select>
            </Field>
            <Field label="Joining Designation">
              <select className={inputCls} value={form.joining_designation} onChange={(e) => setField("joining_designation", e.target.value)}>
                <option value="">-- Select --</option>
                {DESIGNATIONS.map((d) => <option key={d}>{d}</option>)}
              </select>
            </Field>
            <Field label="Current Designation">
              <select className={inputCls} value={form.current_designation} onChange={(e) => setField("current_designation", e.target.value)}>
                <option value="">-- Select --</option>
                {DESIGNATIONS.map((d) => <option key={d}>{d}</option>)}
              </select>
            </Field>
            <div className="md:col-span-2">
              <Field label="ID Department / Dept Code">
                <input className={inputCls} value={form.id_department}
                  onChange={(e) => setField("id_department", e.target.value)} />
              </Field>
            </div>

            {/* ── Section 5: Sector & IO ── */}
            <SectionTitle title="Sector & Investigation Officer" />
            <Field label="Name of Sector">
              <input className={inputCls} value={form.sector_name}
                onChange={(e) => setField("sector_name", e.target.value)} placeholder="e.g. Sector A" />
            </Field>
            <Field label="IO Name (Investigation Officer)">
              <input className={inputCls} value={form.io_name}
                onChange={(e) => setField("io_name", e.target.value)} />
            </Field>
            <Field label="IO Mobile No">
              <input className={inputCls} value={form.io_mobile}
                onChange={(e) => setField("io_mobile", e.target.value)} />
            </Field>

            {/* ── Section 6: Write-up ── */}
            <SectionTitle title="Write-up / Comment / Note" />
            <div className="md:col-span-2">
              <Field label="Write-up / Comment Box / Note">
                <textarea className={inputCls} rows={4} value={form.writeup}
                  onChange={(e) => setField("writeup", e.target.value)}
                  placeholder="Enter detailed notes / write-up..." />
              </Field>
            </div>
            <div className="md:col-span-2">
              <Field label="File Upload (optional)">
                <input type="file" accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                  className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 dark:file:bg-gray-700 dark:file:text-gray-200"
                  onChange={(e) => setFileInput(e.target.files[0] || null)} />
                {editItem?.file_path && (
                  <a href={`${BASE_URL}/storage/${editItem.file_path}`} target="_blank" rel="noreferrer"
                    className="text-xs text-blue-500 mt-1 inline-block hover:underline">
                    Existing file dekho →
                  </a>
                )}
              </Field>
            </div>

            {/* ── Section 7: DFO ── */}
            <SectionTitle title="D.F.O — Draft Final Report" />
            <Field label="DFO Date">
              <input className={inputCls} type="date" value={form.dfo_date}
                onChange={(e) => setField("dfo_date", e.target.value)} />
            </Field>
            <Field label="Result / Decision of Govt Order">
              <input className={inputCls} value={form.result}
                onChange={(e) => setField("result", e.target.value)}
                placeholder="e.g. Pending / Decision issued" />
            </Field>
            <div className="md:col-span-2">
              <Field label="Comment Box / Note Box">
                <textarea className={inputCls} rows={3} value={form.dfo_comment}
                  onChange={(e) => setField("dfo_comment", e.target.value)} />
              </Field>
            </div>
            <div className="md:col-span-2">
              <Field label="Brief Description of Enquiry">
                <textarea className={inputCls} rows={3} value={form.brief_description}
                  onChange={(e) => setField("brief_description", e.target.value)} />
              </Field>
            </div>
            <div className="md:col-span-2">
              <Field label="Supplementary Report (optional, if any)">
                <textarea className={inputCls} rows={3} value={form.supplementary_report}
                  onChange={(e) => setField("supplementary_report", e.target.value)} />
              </Field>
            </div>

            {/* ── Buttons ── */}
            <div className="md:col-span-2 flex gap-3 pt-2">
              <button onClick={handleSubmit} disabled={submitting}
                className="flex items-center gap-2 rounded-full bg-blue-600 px-6 py-2.5 text-sm font-medium text-white shadow hover:bg-blue-700 disabled:opacity-50 transition">
                {submitting ? "Saving..." : editItem ? "Update Enquiry" : "Save Enquiry"}
              </button>
              <button onClick={() => { setForm(EMPTY); setFileInput(null); }}
                className="rounded-full border border-gray-300 bg-white px-6 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400">
                Reset
              </button>
              <button onClick={() => setView("list")}
                className="rounded-full border border-gray-300 bg-white px-6 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400">
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ── LIST VIEW ──────────────────────────────────────────────
  return (
    <div className="p-5 lg:p-6">
      <PageMeta title="Enquiries" description="Manage all enquiries" />
      <PageBreadcrumb pageTitle="Enquiries" />

      {/* ── Search Panel ── */}
      <div className="mb-6 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-5 shadow-sm">
        <p className="text-sm font-semibold text-gray-700 dark:text-white mb-4">🔍 Search Options</p>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
          <input className={inputCls} placeholder="Name of Accused" value={search.name}
            onChange={(e) => setSearch((s) => ({ ...s, name: e.target.value }))} />
          <input className={inputCls} placeholder="Enquiry No" value={search.enquiry_no}
            onChange={(e) => setSearch((s) => ({ ...s, enquiry_no: e.target.value }))} />
          <select className={inputCls} value={search.type} onChange={(e) => setSearch((s) => ({ ...s, type: e.target.value }))}>
            <option value="">All Types</option>
            <option value="Open">Open</option>
            <option value="Close">Close</option>
          </select>
          <select className={inputCls} value={search.department} onChange={(e) => setSearch((s) => ({ ...s, department: e.target.value }))}>
            <option value="">All Departments</option>
            {DEPARTMENTS.map((d) => <option key={d}>{d}</option>)}
          </select>
          <select className={inputCls} value={search.district} onChange={(e) => setSearch((s) => ({ ...s, district: e.target.value }))}>
            <option value="">All Districts</option>
            {DISTRICTS.map((d) => <option key={d}>{d}</option>)}
          </select>
          <select className={inputCls} value={search.designation} onChange={(e) => setSearch((s) => ({ ...s, designation: e.target.value }))}>
            <option value="">All Designations</option>
            {DESIGNATIONS.map((d) => <option key={d}>{d}</option>)}
          </select>
        </div>
        <div className="flex gap-3 mt-4">
          <button onClick={handleSearch} disabled={isSearching}
            className="rounded-full bg-blue-600 px-5 py-2 text-sm font-medium text-white hover:bg-blue-700 disabled:opacity-50">
            {isSearching ? "Searching..." : "Search"}
          </button>
          <button onClick={clearSearch}
            className="rounded-full border border-gray-300 px-5 py-2 text-sm text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:text-gray-400">
            Clear
          </button>
        </div>
      </div>

      {/* ── Header ── */}
      <div className="flex items-center justify-between mb-4">
        <p className="text-sm text-gray-500 dark:text-gray-400">{enquiries.length} record(s)</p>
        <button onClick={() => openForm()}
          className="flex items-center gap-2 rounded-full bg-blue-600 px-5 py-2 text-sm font-medium text-white shadow hover:bg-blue-700 transition">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          New Enquiry
        </button>
      </div>

      {/* ── Table ── */}
      <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl shadow-sm overflow-hidden">
        {loading ? (
          <div className="flex items-center justify-center py-16 text-gray-400">Loading...</div>
        ) : enquiries.length === 0 ? (
          <div className="text-center py-16 text-gray-400 dark:text-gray-600">
            Koi record nahi mila. Upar se naya add karo.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
                <tr>
                  {["#","Enquiry No","Type","Name of Accused","Department","District","Designation","Actions"].map((h) => (
                    <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide whitespace-nowrap">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                {enquiries.map((item, idx) => (
                  <tr key={item.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition">
                    <td className="px-4 py-3 text-gray-400">{idx + 1}</td>
                    <td className="px-4 py-3 font-medium text-blue-600 dark:text-blue-400 whitespace-nowrap">
                      <button onClick={() => openDetail(item)} className="hover:underline">
                        {item.enquiry_no}
                      </button>
                    </td>
                    <td className="px-4 py-3"><Badge type={item.type} /></td>
                    <td className="px-4 py-3 font-medium text-gray-800 dark:text-white whitespace-nowrap">{item.accuse_name}</td>
                    <td className="px-4 py-3 text-gray-600 dark:text-gray-400 whitespace-nowrap">{item.department}</td>
                    <td className="px-4 py-3 text-gray-600 dark:text-gray-400">{item.district}</td>
                    <td className="px-4 py-3 text-gray-600 dark:text-gray-400">{item.designation || "—"}</td>
                    <td className="px-4 py-3">
                      <div className="flex gap-2">
                        <button onClick={() => openDetail(item)}
                          className="text-xs px-3 py-1 rounded-full border border-blue-200 text-blue-600 hover:bg-blue-50 dark:border-blue-800 dark:text-blue-400">
                          View
                        </button>
                        <button onClick={() => openForm(item)}
                          className="text-xs px-3 py-1 rounded-full border border-yellow-200 text-yellow-600 hover:bg-yellow-50 dark:border-yellow-800 dark:text-yellow-400">
                          Edit
                        </button>
                        <button onClick={() => handleDelete(item.id)}
                          className="text-xs px-3 py-1 rounded-full border border-red-200 text-red-600 hover:bg-red-50 dark:border-red-800 dark:text-red-400">
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}