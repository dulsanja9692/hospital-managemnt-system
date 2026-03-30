import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Save, X, UserPen, ShieldCheck, Phone, MapPin, Activity, ClipboardList, Stethoscope } from 'lucide-react';

export const EditPatientProfile = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: 'Saman Kumara',
    nic: '198522334410',
    phone: '0712345678',
    emergency: 'Mrs. Kumara (Wife)',
    address: 'No. 45, Galle Road, Colombo 03',
    bloodGroup: 'A+',
    status: 'Active',
    lastVisit: '2026-03-10'
  });

  // New state for adding a history log
  const [newLog, setNewLog] = useState({
    title: '',
    doctor: '',
    department: 'OPD',
    notes: ''
  });

  const handleUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, you would POST both formData and newLog to your backend
    alert("Patient medical record and history updated!");
    navigate(`/dashboard/patients/${id}`);
  };

  return (
    <div className="max-w-5xl mx-auto animate-soft-load text-left pb-20">
      <div className="flex items-center justify-between mb-10">
        <div className="flex items-center gap-5">
          <div className="p-4 bg-(--accent-bg) rounded-3xl border border-(--accent-border)">
            <UserPen className="text-(--accent)" size={32} />
          </div>
          <div>
            <h2 className="text-4xl font-black text-(--text-h) tracking-tight">Clinical Edit</h2>
            <p className="text-(--text) font-medium italic">Record ID: {id}</p>
          </div>
        </div>
      </div>

      <form onSubmit={handleUpdate} className="space-y-10">
        
        {/* BLOCK 1: DEMOGRAPHICS & VITALS */}
        <div className="bg-(--code-bg) p-10 rounded-[2.5rem] border border-(--border) shadow-(--shadow) grid grid-cols-1 md:grid-cols-2 gap-10">
          <div className="space-y-6 flex flex-col items-start">
            <div className="flex items-center gap-2 text-(--accent) mb-2">
              <ShieldCheck size={18} /><span className="font-black text-sm uppercase tracking-[0.2em]">Identity</span>
            </div>
            <div className="w-full">
              <label className="block text-xs font-black uppercase opacity-40 mb-2">Full Name</label>
              <input type="text" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} className="w-full p-4 bg-(--bg) border border-(--border) rounded-2xl outline-none focus:border-(--accent) font-bold" />
            </div>
            <div className="w-full">
              <label className="block text-xs font-black uppercase opacity-40 mb-2">Blood Group</label>
              <select value={formData.bloodGroup} onChange={(e) => setFormData({...formData, bloodGroup: e.target.value})} className="w-full p-4 bg-(--bg) border border-(--border) rounded-2xl outline-none focus:border-(--accent) font-bold appearance-none">
                <option value="A+">A+</option><option value="A-">A-</option>
                <option value="B+">B+</option><option value="B-">B-</option>
                <option value="O+">O+</option><option value="O-">O-</option>
                <option value="AB+">AB+</option><option value="AB-">AB-</option>
              </select>
            </div>
          </div>

          <div className="space-y-6 flex flex-col items-start">
            <div className="flex items-center gap-2 text-(--accent) mb-2">
              <Phone size={18} /><span className="font-black text-sm uppercase tracking-[0.2em]">Contact</span>
            </div>
            <div className="w-full">
              <label className="block text-xs font-black uppercase opacity-40 mb-2">Primary Mobile</label>
              <input type="tel" value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})} className="w-full p-4 bg-(--bg) border border-(--border) rounded-2xl outline-none focus:border-(--accent) font-bold" />
            </div>
            <div className="w-full">
              <label className="block text-xs font-black uppercase opacity-40 mb-2">Residential Address</label>
              <textarea rows={1} value={formData.address} onChange={(e) => setFormData({...formData, address: e.target.value})} className="w-full p-4 bg-(--bg) border border-(--border) rounded-2xl outline-none focus:border-(--accent) resize-none font-bold"></textarea>
            </div>
          </div>
        </div>

        {/* BLOCK 2: ADD MEDICAL HISTORY ENTRY (Timeline Addition) */}
        <div className="bg-(--code-bg) p-10 rounded-[2.5rem] border border-(--border) shadow-(--shadow) flex flex-col items-start">
          <div className="flex items-center gap-2 text-(--accent) mb-8">
            <ClipboardList size={22} /><span className="font-black text-sm uppercase tracking-[0.2em]">Append Medical Timeline</span>
          </div>

          <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div className="w-full text-left">
              <label className="block text-xs font-black uppercase opacity-40 mb-2">Consultation Type</label>
              <input type="text" placeholder="e.g. Annual Checkup" value={newLog.title} onChange={(e) => setNewLog({...newLog, title: e.target.value})} className="w-full p-4 bg-(--bg) border border-(--border) rounded-2xl outline-none focus:border-(--accent)" />
            </div>
            <div className="w-full text-left">
              <label className="block text-xs font-black uppercase opacity-40 mb-2">Attending Doctor</label>
              <div className="relative">
                <Stethoscope size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-(--text) opacity-40" />
                <input type="text" placeholder="Dr. Name" value={newLog.doctor} onChange={(e) => setNewLog({...newLog, doctor: e.target.value})} className="w-full pl-11 pr-4 py-4 bg-(--bg) border border-(--border) rounded-2xl outline-none focus:border-(--accent)" />
              </div>
            </div>
            <div className="w-full text-left">
              <label className="block text-xs font-black uppercase opacity-40 mb-2">Department</label>
              <select value={newLog.department} onChange={(e) => setNewLog({...newLog, department: e.target.value})} className="w-full p-4 bg-(--bg) border border-(--border) rounded-2xl outline-none focus:border-(--accent) appearance-none">
                <option value="OPD">OPD</option>
                <option value="Cardiology">Cardiology</option>
                <option value="Laboratory">Laboratory</option>
                <option value="Emergency">Emergency</option>
              </select>
            </div>
          </div>
          
          <div className="w-full text-left">
            <label className="block text-xs font-black uppercase opacity-40 mb-2">Clinical Notes</label>
            <textarea rows={3} placeholder="Describe symptoms, diagnosis, or prescription updates..." value={newLog.notes} onChange={(e) => setNewLog({...newLog, notes: e.target.value})} className="w-full p-4 bg-(--bg) border border-(--border) rounded-2xl outline-none focus:border-(--accent) resize-none"></textarea>
          </div>
        </div>

        {/* ACTION BUTTONS */}
        <div className="flex flex-col sm:flex-row gap-4">
          <button type="submit" className="flex-1 py-5 bg-(--accent) text-white text-xl font-bold rounded-2xl shadow-(--shadow) hover:brightness-110 active:scale-95 transition-all flex items-center justify-center gap-3">
            <Save size={24} /> Commit Changes
          </button>
          <button type="button" onClick={() => navigate(`/dashboard/patients/${id}`)} className="px-12 py-5 border-2 border-(--border) text-(--text-h) text-xl font-bold rounded-2xl hover:bg-(--bg) active:scale-95 transition-all flex items-center justify-center gap-3">
            <X size={24} /> Discard
          </button>
        </div>
      </form>
    </div>
  );
};