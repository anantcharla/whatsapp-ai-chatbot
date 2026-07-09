/**
 * Button — thin wrapper around the .btn-* utility classes defined in index.css.
 * variant: 'primary' | 'secondary' | 'ghost'
 */
export default function Button({ variant = "primary", className = "", children, ...props }) {
  const base = variant === "primary" ? "btn-primary" : variant === "secondary" ? "btn-secondary" : "btn-ghost";
  return (
    <button className={`${base} ${className}`} {...props}>
      {children}
    </button>
  );
}
