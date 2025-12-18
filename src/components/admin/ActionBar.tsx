import Link from "next/link";
import { ArrowLeft } from "lucide-react";

interface ActionBarProps {
  title: string;
  subtitle?: string;
  backHref?: string;
  badges?: React.ReactNode;
  actions?: React.ReactNode;
}

export function ActionBar({
  title,
  subtitle,
  backHref,
  badges,
  actions,
}: ActionBarProps) {
  return (
    <div className="bg-white border-b border-gray-300 shadow-sm">
      <div className="px-4 sm:px-6 py-3">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div className="flex items-center gap-3 sm:gap-4 min-w-0">
            {backHref && (
              <Link
                href={backHref}
                className="flex items-center gap-1 sm:gap-2 text-sm text-gray-600 hover:text-gray-900 transition-colors flex-shrink-0"
                aria-label="Volver"
              >
                <ArrowLeft className="w-4 h-4" />
                <span className="hidden sm:inline">Volver</span>
              </Link>
            )}
            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                <h1 className="text-sm font-bold text-gray-900 uppercase tracking-wide truncate">
                  {title}
                </h1>
                {badges && <div className="flex items-center gap-1 flex-shrink-0">{badges}</div>}
              </div>
              {subtitle && (
                <p className="text-xs text-gray-600 mt-0.5 truncate">{subtitle}</p>
              )}
            </div>
          </div>
          {actions && <div className="flex items-center gap-2 self-end sm:self-auto flex-shrink-0">{actions}</div>}
        </div>
      </div>
    </div>
  );
}

// Primary action button for ActionBar
export function ActionButton({
  children,
  onClick,
  icon,
  variant = "primary",
}: {
  children: React.ReactNode;
  onClick?: () => void;
  icon?: React.ReactNode;
  variant?: "primary" | "secondary" | "danger";
}) {
  const variantStyles = {
    primary: "bg-gray-800 text-white hover:bg-gray-900",
    secondary: "bg-white text-gray-800 border border-gray-300 hover:bg-gray-50",
    danger: "bg-red-600 text-white hover:bg-red-700",
  };

  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-2 px-3 sm:px-4 py-2 text-sm font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2 ${variantStyles[variant]}`}
    >
      {icon}
      {children}
    </button>
  );
}

// Link styled as action button
export function ActionLink({
  children,
  href,
  icon,
  variant = "primary",
}: {
  children: React.ReactNode;
  href: string;
  icon?: React.ReactNode;
  variant?: "primary" | "secondary" | "danger";
}) {
  const variantStyles = {
    primary: "bg-gray-800 text-white hover:bg-gray-900",
    secondary: "bg-white text-gray-800 border border-gray-300 hover:bg-gray-50",
    danger: "bg-red-600 text-white hover:bg-red-700",
  };

  return (
    <Link
      href={href}
      className={`flex items-center gap-2 px-4 py-2 text-sm font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2 ${variantStyles[variant]}`}
    >
      {icon}
      {children}
    </Link>
  );
}
