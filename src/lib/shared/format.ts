/**
 * Formatea una fecha como "15/12/2024"
 */
export function formatDate(date: string | Date): string {
  const d = typeof date === "string" ? new Date(date) : date;
  return d.toLocaleDateString("es-ES");
}

/**
 * Formatea una fecha con hora como "15/12/2024 10:30"
 */
export function formatDateTime(date: string | Date): string {
  const d = typeof date === "string" ? new Date(date) : date;
  return `${d.toLocaleDateString("es-ES")} ${d.toLocaleTimeString("es-ES", {
    hour: "2-digit",
    minute: "2-digit",
  })}`;
}

/**
 * Formatea una fecha relativa como "Hace 2 horas"
 */
export function formatRelativeTime(date: string | Date): string {
  const d = typeof date === "string" ? new Date(date) : date;
  const now = new Date();
  const diffMs = now.getTime() - d.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);

  if (diffMins < 1) return "Ahora mismo";
  if (diffMins < 60) return `Hace ${diffMins} ${diffMins === 1 ? "minuto" : "minutos"}`;
  if (diffHours < 24) return `Hace ${diffHours} ${diffHours === 1 ? "hora" : "horas"}`;
  if (diffDays < 7) return `Hace ${diffDays} ${diffDays === 1 ? "día" : "días"}`;
  return formatDate(d);
}

/**
 * Formatea un teléfono como "+34 612 345 678"
 */
export function formatPhone(phone: string): string {
  // Remove all non-digit characters
  const digits = phone.replace(/\D/g, "");

  // If it starts with 34 (Spain), format with country code
  if (digits.startsWith("34") && digits.length === 11) {
    return `+${digits.slice(0, 2)} ${digits.slice(2, 5)} ${digits.slice(5, 8)} ${digits.slice(8)}`;
  }

  // Otherwise just add spaces every 3 digits
  if (digits.length === 9) {
    return `${digits.slice(0, 3)} ${digits.slice(3, 6)} ${digits.slice(6)}`;
  }

  return phone;
}

/**
 * Formatea un número con separadores de miles como "1.234"
 */
export function formatNumber(num: number): string {
  return num.toLocaleString("es-ES");
}

/**
 * Formatea un porcentaje como "85%"
 */
export function formatPercent(num: number): string {
  return `${Math.round(num)}%`;
}

/**
 * Formatea moneda como "1.234,56 €"
 */
export function formatCurrency(amount: number): string {
  return amount.toLocaleString("es-ES", {
    style: "currency",
    currency: "EUR",
  });
}
