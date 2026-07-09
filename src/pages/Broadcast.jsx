import { useState } from "react";
import { FiPlus, FiSend, FiUsers, FiClock } from "react-icons/fi";
import Card from "../components/common/Card.jsx";
import Badge from "../components/common/Badge.jsx";
import Modal from "../components/common/Modal.jsx";
import Button from "../components/common/Button.jsx";
import { broadcasts } from "../data/dummyData.js";
import { useToast } from "../context/ToastContext.jsx";

const STATUS_VARIANT = { Sent: "success", Scheduled: "info", Draft: "neutral" };

/**
 * Broadcast — create and track bulk WhatsApp message campaigns.
 * 🔌 BACKEND HOOK: POST /api/broadcasts to create/send, GET to list history
 */
export default function Broadcast() {
  const [list, setList] = useState(broadcasts);
  const [modalOpen, setModalOpen] = useState(false);
  const [name, setName] = useState("");
  const { showToast } = useToast();

  const handleCreate = () => {
    if (!name.trim()) return;
    setList((prev) => [
      { id: crypto.randomUUID(), name, audience: "All Customers", recipients: 0, status: "Draft", sentAt: "—", openRate: "—" },
      ...prev,
    ]);
    setName("");
    setModalOpen(false);
    showToast("Broadcast draft created", "success");
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
        <div>
          <h1 className="page-title text-2xl">Broadcast</h1>
          <p className="text-sm text-slate-500 dark:text-slate-400">Send bulk campaigns to segmented customer lists.</p>
        </div>
        <Button onClick={() => setModalOpen(true)}>
          <FiPlus size={16} /> New Broadcast
        </Button>
      </div>

      {/* Summary strip */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <Card className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-gradient-soft text-brand-dark dark:text-brand-green"><FiSend size={18} /></div>
          <div><p className="text-xs text-slate-400">Total Sent</p><p className="text-lg font-bold text-slate-800 dark:text-white">6,300</p></div>
        </Card>
        <Card className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-gradient-soft text-brand-dark dark:text-brand-green"><FiUsers size={18} /></div>
          <div><p className="text-xs text-slate-400">Audience Reach</p><p className="text-lg font-bold text-slate-800 dark:text-white">4,210</p></div>
        </Card>
        <Card className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-gradient-soft text-brand-dark dark:text-brand-green"><FiClock size={18} /></div>
          <div><p className="text-xs text-slate-400">Scheduled</p><p className="text-lg font-bold text-slate-800 dark:text-white">1</p></div>
        </Card>
      </div>

      <Card className="!p-0 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-slate-100 dark:border-white/10 text-xs uppercase tracking-wide text-slate-400">
                <th className="px-5 py-3 font-medium">Campaign</th>
                <th className="px-5 py-3 font-medium">Audience</th>
                <th className="px-5 py-3 font-medium">Recipients</th>
                <th className="px-5 py-3 font-medium">Status</th>
                <th className="px-5 py-3 font-medium">Open Rate</th>
                <th className="px-5 py-3 font-medium">Sent At</th>
              </tr>
            </thead>
            <tbody>
              {list.map((b) => (
                <tr key={b.id} className="border-b border-slate-50 dark:border-white/5 hover:bg-slate-50 dark:hover:bg-white/5">
                  <td className="px-5 py-3.5 font-medium text-slate-700 dark:text-slate-100">{b.name}</td>
                  <td className="px-5 py-3.5 text-slate-500 dark:text-slate-400">{b.audience}</td>
                  <td className="px-5 py-3.5 text-slate-500 dark:text-slate-400">{b.recipients.toLocaleString()}</td>
                  <td className="px-5 py-3.5"><Badge variant={STATUS_VARIANT[b.status]}>{b.status}</Badge></td>
                  <td className="px-5 py-3.5 text-slate-500 dark:text-slate-400">{b.openRate}</td>
                  <td className="px-5 py-3.5 text-slate-500 dark:text-slate-400">{b.sentAt}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title="Create Broadcast Campaign"
        footer={
          <>
            <Button variant="secondary" onClick={() => setModalOpen(false)}>Cancel</Button>
            <Button onClick={handleCreate}><FiSend size={15} /> Save Draft</Button>
          </>
        }
      >
        <div className="space-y-4">
          <div>
            <label className="mb-1.5 block text-xs font-medium text-slate-600 dark:text-slate-300">Campaign Name</label>
            <input value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g. New Year Flash Sale" className="input-field" />
          </div>
          <div>
            <label className="mb-1.5 block text-xs font-medium text-slate-600 dark:text-slate-300">Audience Segment</label>
            <select className="input-field">
              <option>All Customers</option>
              <option>VIP Customers</option>
              <option>Abandoned Cart</option>
              <option>Recent Buyers</option>
            </select>
          </div>
          <div>
            <label className="mb-1.5 block text-xs font-medium text-slate-600 dark:text-slate-300">Message</label>
            <textarea rows={4} placeholder="Write your broadcast message..." className="input-field resize-none" />
          </div>
        </div>
      </Modal>
    </div>
  );
}
