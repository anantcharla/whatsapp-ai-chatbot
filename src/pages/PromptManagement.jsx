import { useState } from "react";
import { FiPlus, FiCpu, FiEdit2, FiCopy } from "react-icons/fi";
import { HiOutlineSparkles } from "react-icons/hi2";
import Card from "../components/common/Card.jsx";
import Badge from "../components/common/Badge.jsx";
import Modal from "../components/common/Modal.jsx";
import Button from "../components/common/Button.jsx";
import { prompts as dummyPrompts } from "../data/dummyData.js";
import { useToast } from "../context/ToastContext.jsx";

/**
 * PromptManagement — manage the system prompts that define the AI's tone
 * and behavior for different conversation flows.
 * 🔌 BACKEND HOOK: CRUD via /api/prompts, versioning via /api/prompts/:id/versions
 */
export default function PromptManagement() {
  const [prompts, setPrompts] = useState(dummyPrompts);
  const [selected, setSelected] = useState(null);
  const [draftContent, setDraftContent] = useState("");
  const { showToast } = useToast();

  const openEditor = (prompt) => {
    setSelected(prompt);
    setDraftContent(prompt.content);
  };

  const handleSave = () => {
    setPrompts((prev) => prev.map((p) => (p.id === selected.id ? { ...p, content: draftContent, lastEdited: "just now" } : p)));
    showToast("Prompt updated successfully", "success");
    setSelected(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
        <div>
          <h1 className="page-title text-2xl">Prompt Management</h1>
          <p className="text-sm text-slate-500 dark:text-slate-400">Define how your AI assistant sounds and behaves.</p>
        </div>
        <Button onClick={() => showToast("Prompt builder coming right up", "info")}>
          <FiPlus size={16} /> New Prompt
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
        {prompts.map((p) => (
          <Card key={p.id} className="flex flex-col">
            <div className="flex items-start justify-between">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-gradient-soft text-brand-dark dark:text-brand-green">
                <FiCpu size={18} />
              </div>
              <Badge variant={p.status === "Active" ? "success" : "warning"}>{p.status}</Badge>
            </div>
            <h3 className="mt-3 text-sm font-semibold text-slate-800 dark:text-white">{p.name}</h3>
            <p className="mt-1 flex-1 text-xs text-slate-500 dark:text-slate-400">{p.description}</p>
            <div className="mt-3 flex items-center gap-1.5 text-[11px] text-brand-blue">
              <HiOutlineSparkles size={12} /> {p.model}
            </div>
            <p className="mt-1 text-[11px] text-slate-400">Edited {p.lastEdited}</p>
            <div className="mt-4 flex gap-2">
              <Button variant="secondary" className="flex-1 !py-2 text-xs" onClick={() => openEditor(p)}>
                <FiEdit2 size={13} /> Edit
              </Button>
              <button
                onClick={() => showToast("Prompt duplicated", "info")}
                className="btn-ghost !py-2 text-xs"
                aria-label="Duplicate prompt"
              >
                <FiCopy size={13} />
              </button>
            </div>
          </Card>
        ))}
      </div>

      <Modal
        isOpen={!!selected}
        onClose={() => setSelected(null)}
        title={selected ? `Edit "${selected.name}"` : ""}
        size="lg"
        footer={
          <>
            <Button variant="secondary" onClick={() => setSelected(null)}>Cancel</Button>
            <Button onClick={handleSave}>Save & Publish</Button>
          </>
        }
      >
        <label className="mb-1.5 block text-xs font-medium text-slate-600 dark:text-slate-300">System Prompt</label>
        <textarea
          rows={10}
          value={draftContent}
          onChange={(e) => setDraftContent(e.target.value)}
          className="input-field resize-none font-mono text-xs leading-relaxed"
        />
        <p className="mt-2 text-xs text-slate-400">
          Tip: be specific about tone, length, and escalation rules for the best AI responses.
        </p>
      </Modal>
    </div>
  );
}
