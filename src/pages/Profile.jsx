import { FiCamera, FiMail, FiBriefcase, FiShield } from "react-icons/fi";
import Card from "../components/common/Card.jsx";
import Badge from "../components/common/Badge.jsx";
import Button from "../components/common/Button.jsx";
import { useAuth } from "../context/AuthContext.jsx";
import { useToast } from "../context/ToastContext.jsx";

/**
 * Profile — the logged-in user's personal profile & account details.
 * 🔌 BACKEND HOOK: PATCH /api/users/me
 */
export default function Profile() {
  const { user } = useAuth();
  const { showToast } = useToast();

  if (!user) return null;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="page-title text-2xl">My Profile</h1>
        <p className="text-sm text-slate-500 dark:text-slate-400">Manage your personal account information.</p>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Profile card */}
        <Card className="flex flex-col items-center text-center lg:col-span-1">
          <div className="relative">
            <img src={user.avatar} alt={user.name} className="h-24 w-24 rounded-full object-cover ring-4 ring-brand-green/15" />
            <button
              onClick={() => showToast("Avatar upload coming soon", "info")}
              className="absolute -bottom-1 -right-1 flex h-8 w-8 items-center justify-center rounded-full bg-brand-gradient text-white shadow-soft"
              aria-label="Change avatar"
            >
              <FiCamera size={14} />
            </button>
          </div>
          <h2 className="mt-4 text-base font-semibold text-slate-800 dark:text-white">{user.name}</h2>
          <p className="text-xs text-slate-400">{user.role}</p>
          <Badge variant="success" className="mt-3">{user.plan}</Badge>

          <div className="mt-5 w-full space-y-3 border-t border-slate-100 dark:border-white/10 pt-4 text-left">
            <InfoRow icon={<FiMail size={14} />} label={user.email} />
            <InfoRow icon={<FiBriefcase size={14} />} label={user.company} />
            <InfoRow icon={<FiShield size={14} />} label="Two-factor authentication enabled" />
          </div>
        </Card>

        {/* Edit form */}
        <Card className="lg:col-span-2">
          <h3 className="mb-4 text-sm font-semibold text-slate-800 dark:text-white">Personal Information</h3>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Field label="Full Name" defaultValue={user.name} />
            <Field label="Email Address" defaultValue={user.email} />
            <Field label="Role" defaultValue={user.role} disabled />
            <Field label="Company" defaultValue={user.company} />
          </div>

          <div className="mt-5 border-t border-slate-100 dark:border-white/10 pt-5">
            <h3 className="mb-3 text-sm font-semibold text-slate-800 dark:text-white">Change Password</h3>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <Field label="New Password" type="password" placeholder="••••••••" />
              <Field label="Confirm Password" type="password" placeholder="••••••••" />
            </div>
          </div>

          <div className="mt-6 flex justify-end gap-2">
            <Button variant="secondary">Cancel</Button>
            <Button onClick={() => showToast("Profile updated successfully", "success")}>Save Changes</Button>
          </div>
        </Card>
      </div>
    </div>
  );
}

function InfoRow({ icon, label }) {
  return (
    <div className="flex items-center gap-2.5 text-xs text-slate-500 dark:text-slate-400">
      <span className="text-brand-dark dark:text-brand-green">{icon}</span>
      {label}
    </div>
  );
}

function Field({ label, defaultValue, type = "text", disabled = false, placeholder }) {
  return (
    <div>
      <label className="mb-1.5 block text-xs font-medium text-slate-600 dark:text-slate-300">{label}</label>
      <input
        type={type}
        defaultValue={defaultValue}
        placeholder={placeholder}
        disabled={disabled}
        className="input-field disabled:cursor-not-allowed disabled:opacity-60"
      />
    </div>
  );
}
