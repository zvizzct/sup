import { AlertCircle, Info, Calendar } from "lucide-react";

// Status types
export type StatusType = "Nueva" | "Asignada" | "En trámite" | "Resuelta" | "Activo" | "Inactivo" | "Pendiente" | "Vigente" | "Archivado" | "Rechazado" | "Aprobado" | "En revisión";
export type UrgencyType = "Alta" | "Normal" | "Baja";
export type RoleType = "Super Admin" | "Admin" | "Moderador";
export type CommunicationType = "URGENTE" | "INFORMATIVO" | "CONVOCATORIA";

// Color configurations
const statusColors: Record<StatusType, string> = {
  Nueva: "bg-blue-100 text-blue-800 border border-blue-300",
  Asignada: "bg-amber-100 text-amber-900 border border-amber-300",
  "En trámite": "bg-blue-100 text-blue-800 border border-blue-300",
  Resuelta: "bg-green-100 text-green-800 border border-green-300",
  Activo: "bg-green-100 text-green-800 border border-green-300",
  Inactivo: "bg-gray-100 text-gray-700 border border-gray-200",
  Pendiente: "bg-blue-100 text-blue-800 border border-blue-300",
  Vigente: "bg-green-100 text-green-800 border border-green-300",
  Archivado: "bg-gray-100 text-gray-700 border border-gray-200",
  Rechazado: "bg-red-100 text-red-800 border border-red-300",
  Aprobado: "bg-green-100 text-green-800 border border-green-300",
  "En revisión": "bg-amber-100 text-amber-900 border border-amber-300",
};

const urgencyColors: Record<UrgencyType, string> = {
  Alta: "bg-red-100 text-red-800 border border-red-300",
  Normal: "bg-amber-100 text-amber-900 border border-amber-300",
  Baja: "bg-gray-100 text-gray-700 border border-gray-200",
};

const urgencyLabels: Record<UrgencyType, string> = {
  Alta: "URGENTE",
  Normal: "NORMAL",
  Baja: "BAJA",
};

const roleColors: Record<RoleType, string> = {
  "Super Admin": "bg-gray-800 text-white border border-gray-800",
  Admin: "bg-blue-100 text-blue-800 border border-blue-300",
  Moderador: "bg-gray-100 text-gray-700 border border-gray-200",
};

const communicationColors: Record<CommunicationType, string> = {
  URGENTE: "bg-red-100 text-red-800 border border-red-300",
  INFORMATIVO: "bg-blue-100 text-blue-800 border border-blue-300",
  CONVOCATORIA: "bg-amber-100 text-amber-900 border border-amber-300",
};

const communicationIcons: Record<CommunicationType, React.ReactNode> = {
  URGENTE: <AlertCircle className="w-3 h-3" />,
  INFORMATIVO: <Info className="w-3 h-3" />,
  CONVOCATORIA: <Calendar className="w-3 h-3" />,
};

// Base badge styles
const baseStyles = "inline-flex items-center gap-1 px-2 py-0.5 text-xs font-semibold uppercase tracking-wide";

// Badge component for status
export function StatusBadge({ status }: { status: StatusType }) {
  return (
    <span className={`${baseStyles} ${statusColors[status]}`}>
      {status}
    </span>
  );
}

// Badge component for urgency
export function UrgencyBadge({ urgency }: { urgency: UrgencyType }) {
  return (
    <span className={`${baseStyles} ${urgencyColors[urgency]}`}>
      {urgency === "Alta" && <AlertCircle className="w-3 h-3" />}
      {urgencyLabels[urgency]}
    </span>
  );
}

// Badge component for roles
export function RoleBadge({ role }: { role: RoleType }) {
  return (
    <span className={`${baseStyles} ${roleColors[role]}`}>
      {role}
    </span>
  );
}

// Badge component for communication types
export function CommunicationBadge({ type }: { type: CommunicationType }) {
  return (
    <span className={`${baseStyles} ${communicationColors[type]}`}>
      {communicationIcons[type]}
      {type}
    </span>
  );
}

// Badge component for categories (generic colored badge)
export function CategoryBadge({ category }: { category: string }) {
  return (
    <span className={`${baseStyles} bg-gray-100 text-gray-700 border border-gray-200`}>
      {category}
    </span>
  );
}

// Generic badge with custom color
export type BadgeColor = "green" | "blue" | "amber" | "red" | "gray";

const customColors: Record<BadgeColor, string> = {
  green: "bg-green-100 text-green-800 border border-green-300",
  blue: "bg-blue-100 text-blue-800 border border-blue-300",
  amber: "bg-amber-100 text-amber-900 border border-amber-300",
  red: "bg-red-100 text-red-800 border border-red-300",
  gray: "bg-gray-100 text-gray-700 border border-gray-200",
};

export function Badge({
  children,
  color = "gray"
}: {
  children: React.ReactNode;
  color?: BadgeColor;
}) {
  return (
    <span className={`${baseStyles} ${customColors[color]}`}>
      {children}
    </span>
  );
}

// Urgency bar color helper (for card side bars)
export function getUrgencyBarColor(urgency: UrgencyType): string {
  switch (urgency) {
    case "Alta": return "bg-red-600";
    case "Normal": return "bg-amber-500";
    case "Baja": return "bg-gray-400";
    default: return "bg-gray-400";
  }
}
