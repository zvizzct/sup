interface SyncFooterProps {
  message?: string;
}

export function SyncFooter({ message }: SyncFooterProps) {
  const fecha = new Date().toLocaleDateString("es-ES");
  const hora = new Date().toLocaleTimeString("es-ES", {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div className="mt-8 pt-4 border-t border-gray-300">
      <p className="text-xs text-gray-600 text-center">
        {message && `${message} `}
        Última sincronización: {fecha} a las {hora}
      </p>
    </div>
  );
}
