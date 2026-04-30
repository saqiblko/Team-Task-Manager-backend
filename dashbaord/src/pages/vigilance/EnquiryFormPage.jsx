// src/pages/Enquiry/EnquiryFormPage.jsx
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import PageMeta from "../../components/common/PageMeta";
import { getEnquiry, createEnquiry, updateEnquiry } from "../../Api/enquiry";
import { BASE_URL } from "../../config";

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

const Field = ({ label, required, children }) => (
  <div className="flex flex-col gap-1">
    <label className="text-xs font-medium text-gray-600 dark:text-gray-400">
      {label} {required && <span className="text-red-500">*</span>}
    </label>
    {children}
  </div>
);

const inputCls = "w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 px-3 py-2 text-sm text-gray-800 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none";
const SectionTitle = ({ title }) => (
  <div className="col-span-2 border-b border-gray-200 dark:border-gray-700 pb-1 mt-2">
    <p className="text-xs font-semibold text-blue-600 dark:text-blue-400 uppercase tracking-wide">{title}</p>
  </div>
);

export default function EnquiryFormPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState(EMPTY);
  const [fileInput, setFileInput] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const isEdit = !!id;

  useEffect(() => {
    if (isEdit) {
      getEnquiry(id)
        .then(res => setForm(res.data.data))
        .catch(() => toast.error("Error loading enquiry"));
    }
  }, [id, isEdit]);

  const setField = (k, v) => setForm(f => ({ ...f, [k]: v }));

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
    if (isEdit) fd.append("_method", "PUT");

    setSubmitting(true);
    try {
      if (isEdit) await updateEnquiry(id, fd);
      else await createEnquiry(fd);
      toast.success(isEdit ? "Enquiry updated ✅" : "Enquiry created ✅");
      navigate("/enquiries");
    } catch (err) {
      const errors = err?.response?.data?.errors;
      if (errors) Object.values(errors).flat().forEach(e => toast.error(e));
      else toast.error("Kuch galat hua ❌");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="p-5 lg:p-6">
      <PageMeta title={isEdit ? "Edit Enquiry" : "New Enquiry"} description="" />
      <div className="flex items-center gap-3 mb-6">
        <button onClick={() => navigate("/enquiries")} className="text-sm text-blue-600 hover:underline">← Back</button>
        <h2 className="text-lg font-semibold text-gray-800 dark:text-white">
          {isEdit ? "✏️ Edit Enquiry" : "➕ New Enquiry"}
        </h2>
      </div>

      <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-5 lg:p-6 shadow-sm">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <SectionTitle title="Enquiry Details" />
          <Field label="Enquiry No" required><input className={inputCls} value={form.enquiry_no} onChange={e => setField("enquiry_no", e.target.value)} placeholder="e.g. VIG/2024/001" /></Field>
          <Field label="Type of Enquiry" required><select className={inputCls} value={form.type} onChange={e => setField("type", e.target.value)}><option value="Open">Open</option><option value="Close">Close</option></select></Field>

          <SectionTitle title="Name of Accused" />
          <Field label="Name of Accused" required><input className={inputCls} value={form.accuse_name} onChange={e => setField("accuse_name", e.target.value)} placeholder="Full Name" /></Field>
          <Field label="Department" required><select className={inputCls} value={form.department} onChange={e => setField("department", e.target.value)}><option value="">-- Select --</option>{DEPARTMENTS.map(d => <option key={d}>{d}</option>)}</select></Field>
          <Field label="District" required><select className={inputCls} value={form.district} onChange={e => setField("district", e.target.value)}><option value="">-- Select --</option>{DISTRICTS.map(d => <option key={d}>{d}</option>)}</select></Field>
          <Field label="Designation"><select className={inputCls} value={form.designation} onChange={e => setField("designation", e.target.value)}><option value="">-- Select --</option>{DESIGNATIONS.map(d => <option key={d}>{d}</option>)}</select></Field>

          <SectionTitle title="Personal Details of Accused" />
          <Field label="Age"><input className={inputCls} type="number" value={form.age} onChange={e => setField("age", e.target.value)} /></Field>
          <Field label="Aadhar No"><input className={inputCls} value={form.aadhar_no} onChange={e => setField("aadhar_no", e.target.value)} /></Field>
          <Field label="Personal No"><input className={inputCls} value={form.personal_no} onChange={e => setField("personal_no", e.target.value)} /></Field>
          <Field label="Mobile No"><input className={inputCls} value={form.mobile} onChange={e => setField("mobile", e.target.value)} /></Field>
          <div className="md:col-span-2"><Field label="Permanent Address"><textarea className={inputCls} rows={2} value={form.permanent_address} onChange={e => setField("permanent_address", e.target.value)} /></Field></div>
          <div className="md:col-span-2"><Field label="Current Address"><textarea className={inputCls} rows={2} value={form.current_address} onChange={e => setField("current_address", e.target.value)} /></Field></div>

          <SectionTitle title="Service / Joining Details" />
          <Field label="Date of Joining"><input className={inputCls} type="date" value={form.date_of_joining} onChange={e => setField("date_of_joining", e.target.value)} /></Field>
          <Field label="Which Dept (Joining)"><select className={inputCls} value={form.joining_department} onChange={e => setField("joining_department", e.target.value)}><option value="">-- Select --</option>{DEPARTMENTS.map(d => <option key={d}>{d}</option>)}</select></Field>
          <Field label="Joining Designation"><select className={inputCls} value={form.joining_designation} onChange={e => setField("joining_designation", e.target.value)}><option value="">-- Select --</option>{DESIGNATIONS.map(d => <option key={d}>{d}</option>)}</select></Field>
          <Field label="Current Designation"><select className={inputCls} value={form.current_designation} onChange={e => setField("current_designation", e.target.value)}><option value="">-- Select --</option>{DESIGNATIONS.map(d => <option key={d}>{d}</option>)}</select></Field>
          <div className="md:col-span-2"><Field label="ID Department / Dept Code"><input className={inputCls} value={form.id_department} onChange={e => setField("id_department", e.target.value)} /></Field></div>

          <SectionTitle title="Sector & Investigation Officer" />
          <Field label="Name of Sector"><input className={inputCls} value={form.sector_name} onChange={e => setField("sector_name", e.target.value)} /></Field>
          <Field label="IO Name"><input className={inputCls} value={form.io_name} onChange={e => setField("io_name", e.target.value)} /></Field>
          <Field label="IO Mobile"><input className={inputCls} value={form.io_mobile} onChange={e => setField("io_mobile", e.target.value)} /></Field>

          <SectionTitle title="Write-up / Comment / Note" />
          <div className="md:col-span-2"><Field label="Write-up"><textarea className={inputCls} rows={4} value={form.writeup} onChange={e => setField("writeup", e.target.value)} /></Field></div>
          <div className="md:col-span-2">
            <Field label="File Upload (optional)">
              <input type="file" accept=".pdf,.doc,.docx,.jpg,.jpeg,.png" onChange={e => setFileInput(e.target.files[0])} />
              {isEdit && form.file_path && <a href={`${BASE_URL}/storage/${form.file_path}`} target="_blank" rel="noreferrer" className="text-xs text-blue-500 mt-1 inline-block">Existing file dekho →</a>}
            </Field>
          </div>

          <SectionTitle title="D.F.O — Draft Final Report" />
          <Field label="DFO Date"><input className={inputCls} type="date" value={form.dfo_date} onChange={e => setField("dfo_date", e.target.value)} /></Field>
          <Field label="Result"><input className={inputCls} value={form.result} onChange={e => setField("result", e.target.value)} /></Field>
          <div className="md:col-span-2"><Field label="Comment Box"><textarea className={inputCls} rows={3} value={form.dfo_comment} onChange={e => setField("dfo_comment", e.target.value)} /></Field></div>
          <div className="md:col-span-2"><Field label="Brief Description"><textarea className={inputCls} rows={3} value={form.brief_description} onChange={e => setField("brief_description", e.target.value)} /></Field></div>
          <div className="md:col-span-2"><Field label="Supplementary Report"><textarea className={inputCls} rows={3} value={form.supplementary_report} onChange={e => setField("supplementary_report", e.target.value)} /></Field></div>

          <div className="md:col-span-2 flex gap-3 pt-2">
            <button onClick={handleSubmit} disabled={submitting} className="rounded-full bg-blue-600 px-6 py-2.5 text-sm font-medium text-white hover:bg-blue-700">{submitting ? "Saving..." : isEdit ? "Update Enquiry" : "Save Enquiry"}</button>
            <button onClick={() => navigate("/enquiries")} className="rounded-full border border-gray-300 bg-white px-6 py-2.5 text-sm text-gray-700">Cancel</button>
          </div>
        </div>
      </div>
    </div>
  );
}