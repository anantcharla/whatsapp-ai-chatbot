import { FiMapPin, FiPhone, FiShoppingBag, FiDollarSign, FiTag } from "react-icons/fi";
import Badge from "../common/Badge.jsx";

/**
 * CustomerDetails — right-hand info panel in the Chat Interface showing
 * the active conversation's customer profile, tags, and quick stats.
 */
export default function CustomerDetails({ customer }) {
  if (!customer) return null;

  return (
    <div className="hidden h-full w-80 flex-col border-l border-slate-100 dark:border-white/10 bg-white dark:bg-brand-panel p-5 xl:flex">
      <div className="flex flex-col items-center text-center">
        <img src={customer.avatar} alt={customer.name} className="h-20 w-20 rounded-full object-cover ring-4 ring-brand-green/10" />
        <h3 className="mt-3 text-base font-semibold text-slate-800 dark:text-white">{customer.name}</h3>
        <p className="text-xs text-slate-400">{customer.phone}</p>
        <div className="mt-2 flex flex-wrap justify-center gap-1.5">
          {customer.tags.map((tag) => (
            <Badge key={tag} variant="info">
              <FiTag className="mr-1 inline" size={10} /> {tag}
            </Badge>
          ))}
        </div>
      </div>

      <div className="my-5 h-px bg-slate-100 dark:bg-white/10" />

      <div className="space-y-4">
        <DetailRow icon={<FiMapPin size={15} />} label="Location" value={customer.location} />
        <DetailRow icon={<FiPhone size={15} />} label="Phone" value={customer.phone} />
        <DetailRow icon={<FiShoppingBag size={15} />} label="Total Orders" value={customer.orders} />
        <DetailRow icon={<FiDollarSign size={15} />} label="Lifetime Value" value={customer.lifetimeValue} />
      </div>

      <div className="my-5 h-px bg-slate-100 dark:bg-white/10" />

      <div>
        <p className="section-eyebrow mb-2">Internal Note</p>
        <textarea
          rows={4}
          placeholder="Add a private note about this customer (visible to your team only)..."
          className="input-field resize-none text-xs"
        />
      </div>
    </div>
  );
}

function DetailRow({ icon, label, value }) {
  return (
    <div className="flex items-center gap-3">
      <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand-gradient-soft text-brand-dark dark:text-brand-green">
        {icon}
      </div>
      <div>
        <p className="text-[11px] text-slate-400">{label}</p>
        <p className="text-sm font-medium text-slate-700 dark:text-slate-100">{value}</p>
      </div>
    </div>
  );
}
