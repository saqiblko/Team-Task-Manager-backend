// src/pages/Enquiry/EnquiryPage.jsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import html2pdf from "html2pdf.js";
import PageMeta from "../../components/common/PageMeta";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import {
  getEnquiries,
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

const inputCls =
  "w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 px-3 py-2 text-sm text-gray-800 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none";

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

export default function EnquiryPage() {
  const navigate = useNavigate();
  const [enquiries, setEnquiries] = useState([]);
  const [loading, setLoading] = useState(false);
  const [view, setView] = useState("list");
  const [viewItem, setViewItem] = useState(null);
  const [search, setSearch] = useState({
    name: "", enquiry_no: "", department: "",
    district: "", designation: "", type: "",
  });
  const [isSearching, setIsSearching] = useState(false);

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

  const downloadPDF = () => {
    const element = document.getElementById("enquiry-detail-content");
    const opt = {
      margin: [0.5, 0.5, 0.5, 0.5],
      filename: `Enquiry_${viewItem.enquiry_no}.pdf`,
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2, letterRendering: true },
      jsPDF: { unit: "in", format: "a4", orientation: "portrait" }
    };
    html2pdf().set(opt).from(element).save();
  };

  // ── DETAIL VIEW (with Print & PDF) ─────────────────────────
  if (view === "detail" && viewItem) {
    return (
      <div className="p-5 lg:p-6 print:p-0">
        <PageMeta title="Enquiry Detail" description="" />
        <div className="flex items-center gap-3 mb-6 print:hidden">
          <button onClick={() => setView("list")} className="text-sm text-blue-600 hover:underline">← Back</button>
          <span className="text-gray-400">/</span>
          <span className="text-sm text-gray-600 dark:text-gray-400">Enquiry Detail</span>
        </div>

        <div id="enquiry-detail-content" className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6 shadow-sm print:shadow-none print:border-0 print:bg-white print:p-0">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-semibold text-gray-800 dark:text-white print:text-black">{viewItem.accuse_name}</h2>
              <p className="text-sm text-blue-600 dark:text-blue-400 print:text-gray-700 mt-1">{viewItem.enquiry_no}</p>
            </div>
            <div className="print:hidden"><Badge type={viewItem.type} /></div>
            <div className="hidden print:block text-sm font-medium text-black">Status: {viewItem.type}</div>
          </div>

          <div className="print:text-black">
            {[
              { title: "Enquiry Info", fields: [["Enquiry No", viewItem.enquiry_no], ["Type", viewItem.type]] },
              { title: "Personal Details", fields: [["Name", viewItem.accuse_name], ["Age", viewItem.age], ["Aadhar No", viewItem.aadhar_no], ["Mobile", viewItem.mobile], ["Personal No", viewItem.personal_no], ["Permanent Address", viewItem.permanent_address], ["Current Address", viewItem.current_address]] },
              { title: "Posting Details", fields: [["Department", viewItem.department], ["District", viewItem.district], ["Designation", viewItem.designation], ["Date of Joining", viewItem.date_of_joining], ["Joining Dept", viewItem.joining_department], ["Joining Designation", viewItem.joining_designation], ["Current Designation", viewItem.current_designation], ["ID Department", viewItem.id_department]] },
              { title: "Sector & IO", fields: [["Sector Name", viewItem.sector_name], ["IO Name", viewItem.io_name], ["IO Mobile", viewItem.io_mobile]] },
              { title: "Write-up / Note", fields: [["Write-up", viewItem.writeup]] },
              { title: "DFO — Draft Final Report", fields: [["DFO Date", viewItem.dfo_date], ["Comment / Note", viewItem.dfo_comment], ["Brief Description", viewItem.brief_description], ["Supplementary Report", viewItem.supplementary_report], ["Result / Decision", viewItem.result]] },
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

          {viewItem.file_path && (
            <div className="mt-4 print:text-black">
              <p className="text-xs text-gray-400 mb-1">Uploaded File</p>
              <a href={`${BASE_URL}/storage/${viewItem.file_path}`} target="_blank" rel="noreferrer" className="text-sm text-blue-600 hover:underline print:text-black print:no-underline">View File →</a>
            </div>
          )}
        </div>

        <div className="flex gap-3 mt-6 pt-4 border-t border-gray-100 dark:border-gray-800 print:hidden">
          <button onClick={() => navigate(`/enquiries/edit/${viewItem.id}`)} className="px-4 py-2 bg-yellow-500 hover:bg-yellow-600 text-white rounded-lg text-sm font-medium">Edit</button>
          <button onClick={() => handleDelete(viewItem.id)} className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg text-sm font-medium">Delete</button>
          <button onClick={() => window.print()} className="px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg text-sm font-medium">🖨️ Print</button>
          <button onClick={downloadPDF} className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg text-sm font-medium">📄 Download PDF</button>
        </div>
      </div>
    );
  }

  // ── LIST VIEW ──────────────────────────────────────────────
  return (
    <div className="p-5 lg:p-6">
      <PageMeta title="Enquiries" description="Manage all enquiries" />
      <PageBreadcrumb pageTitle="Enquiries" />

      <div className="mb-6 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-5 shadow-sm">
        <p className="text-sm font-semibold text-gray-700 dark:text-white mb-4">🔍 Search Options</p>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
          <input className={inputCls} placeholder="Name of Accused" value={search.name} onChange={e => setSearch(s => ({ ...s, name: e.target.value }))} />
          <input className={inputCls} placeholder="Enquiry No" value={search.enquiry_no} onChange={e => setSearch(s => ({ ...s, enquiry_no: e.target.value }))} />
          <select className={inputCls} value={search.type} onChange={e => setSearch(s => ({ ...s, type: e.target.value }))}>
            <option value="">All Types</option><option value="Open">Open</option><option value="Close">Close</option>
          </select>
          <select className={inputCls} value={search.department} onChange={e => setSearch(s => ({ ...s, department: e.target.value }))}>
            <option value="">All Departments</option>{DEPARTMENTS.map(d => <option key={d}>{d}</option>)}
          </select>
          <select className={inputCls} value={search.district} onChange={e => setSearch(s => ({ ...s, district: e.target.value }))}>
            <option value="">All Districts</option>{DISTRICTS.map(d => <option key={d}>{d}</option>)}
          </select>
          <select className={inputCls} value={search.designation} onChange={e => setSearch(s => ({ ...s, designation: e.target.value }))}>
            <option value="">All Designations</option>{DESIGNATIONS.map(d => <option key={d}>{d}</option>)}
          </select>
        </div>
        <div className="flex gap-3 mt-4">
          <button onClick={handleSearch} disabled={isSearching} className="rounded-full bg-blue-600 px-5 py-2 text-sm font-medium text-white hover:bg-blue-700">Search</button>
          <button onClick={clearSearch} className="rounded-full border border-gray-300 px-5 py-2 text-sm text-gray-700 hover:bg-gray-50">Clear</button>
        </div>
      </div>

      <div className="flex items-center justify-between mb-4">
        <p className="text-sm text-gray-500 dark:text-gray-400">{enquiries.length} record(s)</p>
        <button onClick={() => navigate("/enquiries/new")} className="flex items-center gap-2 rounded-full bg-blue-600 px-5 py-2 text-sm font-medium text-white shadow hover:bg-blue-700">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
          New Enquiry
        </button>
      </div>

      <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl shadow-sm overflow-hidden">
        {loading ? <div className="flex justify-center py-16 text-gray-400">Loading...</div>
        : enquiries.length === 0 ? <div className="text-center py-16 text-gray-400">Koi record nahi mila.</div>
        : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
                <tr>{["#","Enquiry No","Type","Name","Department","District","Designation","Actions"].map(h => <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">{h}</th>)}</tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {enquiries.map((item, idx) => (
                  <tr key={item.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/50">
                    <td className="px-4 py-3 text-gray-400">{idx+1}</td>
                    <td className="px-4 py-3 font-medium text-blue-600"><button onClick={() => { setViewItem(item); setView("detail"); }} className="hover:underline">{item.enquiry_no}</button></td>
                    <td className="px-4 py-3"><Badge type={item.type} /></td>
                    <td className="px-4 py-3 font-medium text-gray-800">{item.accuse_name}</td>
                    <td className="px-4 py-3 text-gray-600">{item.department}</td>
                    <td className="px-4 py-3 text-gray-600">{item.district}</td>
                    <td className="px-4 py-3 text-gray-600">{item.designation || "—"}</td>
                    <td className="px-4 py-3">
                      <div className="flex gap-2">
                        <button onClick={() => { setViewItem(item); setView("detail"); }} className="text-xs px-3 py-1 rounded-full border border-blue-200 text-blue-600 hover:bg-blue-50">View</button>
                        <button onClick={() => navigate(`/enquiries/edit/${item.id}`)} className="text-xs px-3 py-1 rounded-full border border-yellow-200 text-yellow-600 hover:bg-yellow-50">Edit</button>
                        <button onClick={() => handleDelete(item.id)} className="text-xs px-3 py-1 rounded-full border border-red-200 text-red-600 hover:bg-red-50">Delete</button>
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