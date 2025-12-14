"use client";

export function PageFooter() {
  const now = new Date();
  const fecha = now.toLocaleDateString("es-ES");
  const hora = now.toLocaleTimeString("es-ES", {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div className="mt-6 pt-4 border-t border-gray-300">
      <p className="text-xs text-gray-600 text-center">
        Última actualización: {fecha} a las {hora}
      </p>
    </div>
  );
}
