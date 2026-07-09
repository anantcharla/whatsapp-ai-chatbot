import { useState } from "react";
import { FiUser, FiUsers, FiLink, FiBell, FiTrash2 } from "react-icons/fi";
import { FaWhatsapp } from "react-icons/fa";
import Card from "../components/common/Card.jsx";
import Badge from "../components/common/Badge.jsx";
import Button from "../components/common/Button.jsx";
import { teamMembers, currentUser } from "../data/dummyData.js";
import { useToast } from "../context/ToastContext.jsx";

const TABS = [
  { id: "general", label: "General", icon: FiUser },
  { id: "team", label: "Team", icon: FiUsers },
  { id: "integrations", label: "Integrations", icon: FiLink },
  { id: "notifications", label: "Notifications", icon: FiBell },
];

/**
 * Settings — tabbed settings screen: workspace details, team management,
 * WhatsApp/integration connections, and notification preferences.
 * 🔌 BACKEND HOOK: PATCH /api/workspace, /api/team, /api/integrations
 */
export default function Settings() {
  const [tab, setTab] = useState("general");
  const { showToast } = useToast();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="page-title text-2xl">Settings</h1>
        <p className="text-sm text-slate-500 dark:text-slate-400">Manage your workspace, team, and integrations.</p>
      </div>

      <div className="flex flex-col gap-6 lg:flex-row">
        {/* Tab nav */}
        <div className="flex gap-1 overflow-x-auto lg:w-56 lg:flex-col">
          {TABS.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setTab(id)}
              className={`flex shrink-0 items-center gap-2.5 rounded-xl px-3.5 py-2.5 text-sm font-medium transition-colors ${
                tab === id
                  ? "bg-brand-gradient text-white shadow-soft"
                  : "text-slate-500 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-white/10"
              }`}
            >
              <Icon size={16} /> {label}
            </button>
          ))}
        </div>

        {/* Tab content */}
        <div className="flex-1 space-y-5">
          {tab === "general" && (
            <Card>
              <h3 className="mb-4 text-sm font-semibold text-slate-800 dark:text-white">Workspace Details</h3>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <Field label="Company Name" defaultValue={currentUser.company} />
                <Field label="Support Email" defaultValue={currentUser.email} />
                <Field label="Business Hours" defaultValue="9:00 AM – 9:00 PM IST" />
                <Field label="Default Language" defaultValue="English (India)" />
              </div>
              <div className="mt-5 flex justify-end">
                <Button onClick={() => showToast("Workspace settings saved", "success")}>Save Changes</Button>
              </div>
            </Card>
          )}

          {tab === "team" && (
            <Card className="!p-0 overflow-hidden">
              <div className="flex items-center justify-between p-5 pb-0">
                <h3 className="text-sm font-semibold text-slate-800 dark:text-white">Team Members</h3>
                <Button onClick={() => showToast("Invite sent", "success")} className="!py-2 text-xs">Invite Member</Button>
              </div>
              <div className="mt-4 divide-y divide-slate-50 dark:divide-white/5">
                {teamMembers.map((m) => (
                  <div key={m.id} className="flex items-center justify-between px-5 py-3.5">
                    <div className="flex items-center gap-3">
                      <img src={m.avatar} className="h-9 w-9 rounded-full object-cover" alt={m.name} />
                      <div>
                        <p className="text-sm font-medium text-slate-700 dark:text-slate-100">{m.name}</p>
                        <p className="text-xs text-slate-400">{m.role}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Badge variant={m.status === "Online" ? "success" : m.status === "Away" ? "warning" : "neutral"}>
                        {m.status}
                      </Badge>
                      <button className="btn-ghost h-8 w-8 !p-0 hover:!bg-red-50 hover:!text-red-500" aria-label="Remove member">
                        <FiTrash2 size={14} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          )}

          {tab === "integrations" && (
            <Card>
              <h3 className="mb-4 text-sm font-semibold text-slate-800 dark:text-white">Connected Channels</h3>
              <div className="flex items-center justify-between rounded-xl border border-slate-100 dark:border-white/10 p-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-green/10 text-brand-green">
                    <FaWhatsapp size={20} />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-slate-800 dark:text-white">WhatsApp Business API</p>
                    <p className="text-xs text-slate-400">+91 98765 43210 — Connected</p>
                  </div>
                </div>
                <Badge variant="success">Active</Badge>
              </div>
              <p className="mt-4 text-xs text-slate-400">
                🔌 Backend connection point: wire this panel to your WhatsApp Business Cloud API credentials.
              </p>
            </Card>
          )}

          {tab === "notifications" && (
            <Card>
              <h3 className="mb-4 text-sm font-semibold text-slate-800 dark:text-white">Notification Preferences</h3>
              <div className="space-y-4">
                {["New message alerts", "Broadcast completion alerts", "Weekly analytics digest", "AI escalation alerts"].map((label) => (
                  <div key={label} className="flex items-center justify-between">
                    <p className="text-sm text-slate-600 dark:text-slate-300">{label}</p>
                    <ToggleSwitch defaultOn />
                  </div>
                ))}
              </div>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}

function Field({ label, defaultValue }) {
  return (
    <div>
      <label className="mb-1.5 block text-xs font-medium text-slate-600 dark:text-slate-300">{label}</label>
      <input defaultValue={defaultValue} className="input-field" />
    </div>
  );
}

function ToggleSwitch({ defaultOn = false }) {
  const [on, setOn] = useState(defaultOn);
  return (
    <button
      onClick={() => setOn((o) => !o)}
      className={`relative h-6 w-11 rounded-full transition-colors ${on ? "bg-brand-gradient" : "bg-slate-200 dark:bg-white/10"}`}
      aria-pressed={on}
    >
      <span
        className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform ${on ? "translate-x-5" : "translate-x-0.5"}`}
      />
    </button>
  );
}
