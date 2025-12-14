import Link from "next/link";
import { Eye, Edit2, Download, Trash2, Power } from "lucide-react";

// Table container
export function Table({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-white border border-gray-300">
      {children}
    </div>
  );
}

// Table header row
interface TableHeaderProps {
  columns: {
    label: string;
    span: number;
    align?: "left" | "center" | "right";
  }[];
}

export function TableHeader({ columns }: TableHeaderProps) {
  const getAlignment = (align?: "left" | "center" | "right") => {
    switch (align) {
      case "center": return "text-center";
      case "right": return "text-right";
      default: return "";
    }
  };

  return (
    <div className="grid grid-cols-12 gap-2 px-4 py-2 bg-gray-100 text-xs font-bold text-gray-700 uppercase tracking-wide border-b border-gray-300">
      {columns.map((col, index) => (
        <div
          key={index}
          className={`col-span-${col.span} ${getAlignment(col.align)}`}
        >
          {col.label}
        </div>
      ))}
    </div>
  );
}

// Table body container
export function TableBody({ children }: { children: React.ReactNode }) {
  return <div className="divide-y divide-gray-200">{children}</div>;
}

// Table row
export function TableRow({ children }: { children: React.ReactNode }) {
  return (
    <div className="grid grid-cols-12 gap-2 px-4 py-3 items-center hover:bg-gray-50 transition-colors">
      {children}
    </div>
  );
}

// Table cell
interface TableCellProps {
  span: number;
  children: React.ReactNode;
  align?: "left" | "center" | "right";
  truncate?: boolean;
  mono?: boolean;
  bold?: boolean;
  muted?: boolean;
  tabular?: boolean;
}

export function TableCell({
  span,
  children,
  align,
  truncate,
  mono,
  bold,
  muted,
  tabular,
}: TableCellProps) {
  const classes = [
    `col-span-${span}`,
    "text-sm",
    align === "center" ? "text-center" : "",
    align === "right" ? "text-right" : "",
    truncate ? "truncate" : "",
    mono ? "font-mono" : "",
    bold ? "font-semibold" : "",
    muted ? "text-gray-600" : "text-gray-900",
    tabular ? "tabular-nums" : "",
  ]
    .filter(Boolean)
    .join(" ");

  return <div className={classes}>{children}</div>;
}

// Table footer
export function TableFooter({ children }: { children: React.ReactNode }) {
  return (
    <div className="px-4 py-2 bg-gray-100 border-t border-gray-300">
      {children}
    </div>
  );
}

// Standard action buttons
interface ActionButtonProps {
  onClick?: () => void;
  title: string;
  ariaLabel?: string;
}

export function ActionButtonView({ onClick, title = "Ver", ariaLabel }: ActionButtonProps) {
  return (
    <button
      onClick={onClick}
      className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-200 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-500"
      title={title}
      aria-label={ariaLabel || title}
    >
      <Eye className="w-4 h-4" />
    </button>
  );
}

export function ActionButtonEdit({ onClick, title = "Editar", ariaLabel }: ActionButtonProps) {
  return (
    <button
      onClick={onClick}
      className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-200 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-500"
      title={title}
      aria-label={ariaLabel || title}
    >
      <Edit2 className="w-4 h-4" />
    </button>
  );
}

export function ActionButtonDownload({ onClick, title = "Descargar", ariaLabel }: ActionButtonProps) {
  return (
    <button
      onClick={onClick}
      className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-200 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-500"
      title={title}
      aria-label={ariaLabel || title}
    >
      <Download className="w-4 h-4" />
    </button>
  );
}

export function ActionButtonDelete({ onClick, title = "Eliminar", ariaLabel }: ActionButtonProps) {
  return (
    <button
      onClick={onClick}
      className="p-2 text-gray-600 hover:text-red-700 hover:bg-red-50 transition-colors focus:outline-none focus:ring-2 focus:ring-red-500"
      title={title}
      aria-label={ariaLabel || title}
    >
      <Trash2 className="w-4 h-4" />
    </button>
  );
}

export function ActionButtonToggle({
  isActive,
  onClick,
  ariaLabel
}: {
  isActive: boolean;
  onClick?: () => void;
  ariaLabel?: string;
}) {
  return (
    <button
      onClick={onClick}
      className={`p-2 transition-colors focus:outline-none focus:ring-2 ${
        isActive
          ? "text-gray-600 hover:text-amber-700 hover:bg-amber-50 focus:ring-amber-500"
          : "text-gray-600 hover:text-green-700 hover:bg-green-50 focus:ring-green-500"
      }`}
      title={isActive ? "Desactivar" : "Activar"}
      aria-label={ariaLabel || (isActive ? "Desactivar" : "Activar")}
    >
      <Power className="w-4 h-4" />
    </button>
  );
}

// Actions cell wrapper
export function ActionButtons({ children }: { children: React.ReactNode }) {
  return (
    <div className="col-span-2 flex items-center justify-end gap-1">
      {children}
    </div>
  );
}

// Link styled as action button
export function ActionLinkView({ href, title = "Ver", ariaLabel }: { href: string; title?: string; ariaLabel?: string }) {
  return (
    <Link
      href={href}
      className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-200 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-500"
      title={title}
      aria-label={ariaLabel || title}
    >
      <Eye className="w-4 h-4" />
    </Link>
  );
}

export function ActionLinkEdit({ href, title = "Editar", ariaLabel }: { href: string; title?: string; ariaLabel?: string }) {
  return (
    <Link
      href={href}
      className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-200 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-500"
      title={title}
      aria-label={ariaLabel || title}
    >
      <Edit2 className="w-4 h-4" />
    </Link>
  );
}
