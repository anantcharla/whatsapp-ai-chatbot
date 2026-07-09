import { useState } from "react";
import { FiPlus, FiSearch, FiEdit2, FiTrash2, FiEye, FiBookOpen } from "react-icons/fi";
import Card from "../components/common/Card.jsx";
import Badge from "../components/common/Badge.jsx";
import Modal from "../components/common/Modal.jsx";
import Button from "../components/common/Button.jsx";
import EmptyState from "../components/common/EmptyState.jsx";
import { knowledgeBaseArticles } from "../data/dummyData.js";
import { useToast } from "../context/ToastContext.jsx";

const STATUS_VARIANT = { Published: "success", Draft: "warning", Archived: "neutral" };

/**
 * KnowledgeBase — manage the articles the AI uses to answer customer
 * questions. Includes search, status badges, and add/edit modal.
 * 🔌 BACKEND HOOK: CRUD via /api/knowledge-base
 */
export default function KnowledgeBase() {
  const [articles, setArticles] = useState(knowledgeBaseArticles);
  const [query, setQuery] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [title, setTitle] = useState("");
  const { showToast } = useToast();

  const filtered = articles.filter((a) => a.title.toLowerCase().includes(query.toLowerCase()));

  const handleCreate = () => {
    if (!title.trim()) return;
    setArticles((prev) => [
      { id: crypto.randomUUID(), title, category: "General", updated: "just now", status: "Draft", views: 0 },
      ...prev,
    ]);
    setTitle("");
    setModalOpen(false);
    showToast("Article created as draft", "success");
  };

  const handleDelete = (id) => {
    setArticles((prev) => prev.filter((a) => a.id !== id));
    showToast("Article deleted", "info");
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
        <div>
          <h1 className="page-title text-2xl">Knowledge Base</h1>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Articles your AI assistant uses to answer customer questions accurately.
          </p>
        </div>
        <Button onClick={() => setModalOpen(true)}>
          <FiPlus size={16} /> New Article
        </Button>
      </div>

      <div className="relative max-w-sm">
        <FiSearch className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search articles..."
          className="input-field pl-10"
        />
      </div>

      <Card className="!p-0 overflow-hidden">
        {filtered.length === 0 ? (
          <EmptyState
            icon={<FiBookOpen size={22} />}
            title="No articles found"
            description="Try a different search term, or create a new article."
            action={<Button onClick={() => setModalOpen(true)}><FiPlus size={15} /> New Article</Button>}
          />
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-slate-100 dark:border-white/10 text-xs uppercase tracking-wide text-slate-400">
                  <th className="px-5 py-3 font-medium">Title</th>
                  <th className="px-5 py-3 font-medium">Category</th>
                  <th className="px-5 py-3 font-medium">Status</th>
                  <th className="px-5 py-3 font-medium">Views</th>
                  <th className="px-5 py-3 font-medium">Updated</th>
                  <th className="px-5 py-3 font-medium text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((a) => (
                  <tr key={a.id} className="border-b border-slate-50 dark:border-white/5 hover:bg-slate-50 dark:hover:bg-white/5">
                    <td className="px-5 py-3.5 font-medium text-slate-700 dark:text-slate-100">{a.title}</td>
                    <td className="px-5 py-3.5 text-slate-500 dark:text-slate-400">{a.category}</td>
                    <td className="px-5 py-3.5"><Badge variant={STATUS_VARIANT[a.status]}>{a.status}</Badge></td>
                    <td className="px-5 py-3.5 text-slate-500 dark:text-slate-400">
                      <span className="inline-flex items-center gap-1"><FiEye size={13} /> {a.views}</span>
                    </td>
                    <td className="px-5 py-3.5 text-slate-500 dark:text-slate-400">{a.updated}</td>
                    <td className="px-5 py-3.5">
                      <div className="flex justify-end gap-1">
                        <button className="btn-ghost h-8 w-8 !p-0" aria-label="Edit article"><FiEdit2 size={14} /></button>
                        <button
                          onClick={() => handleDelete(a.id)}
                          className="btn-ghost h-8 w-8 !p-0 hover:!bg-red-50 hover:!text-red-500"
                          aria-label="Delete article"
                        >
                          <FiTrash2 size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Card>

      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title="Create New Article"
        footer={
          <>
            <Button variant="secondary" onClick={() => setModalOpen(false)}>Cancel</Button>
            <Button onClick={handleCreate}>Save Draft</Button>
          </>
        }
      >
        <label className="mb-1.5 block text-xs font-medium text-slate-600 dark:text-slate-300">Article Title</label>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="e.g. Shipping Timelines"
          className="input-field"
        />
        <label className="mb-1.5 mt-4 block text-xs font-medium text-slate-600 dark:text-slate-300">Content</label>
        <textarea rows={5} placeholder="Write the article content the AI should learn from..." className="input-field resize-none" />
      </Modal>
    </div>
  );
}
