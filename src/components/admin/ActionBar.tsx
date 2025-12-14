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
      <div className="px-6 py-3 flex items-center justify-between">
        <div className="flex items-center gap-4">
          {backHref && (
            <Link
              href={backHref}
              className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Volver
            </Link>
          )}
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-sm font-bold text-gray-900 uppercase tracking-wide">
                {title}
              </h1>
              {badges}
            </div>
            {subtitle && (
              <p className="text-xs text-gray-600 mt-0.5">{subtitle}</p>
            )}
          </div>
        </div>
        {actions && <div className="flex items-center gap-2">{actions}</div>}
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
      className={`flex items-center gap-2 px-4 py-2 text-sm font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2 ${variantStyles[variant]}`}
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
