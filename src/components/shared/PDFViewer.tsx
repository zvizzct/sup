"use client";

import { Download, X } from "lucide-react";

interface PDFViewerProps {
  isOpen: boolean;
  onClose: () => void;
  document: {
    id: string;
    nombre: string;
    fecha: string;
  } | null;
  pdfUrl?: string;
}

export function PDFViewer({
  isOpen,
  onClose,
  document,
  pdfUrl = "/documents/sample.pdf",
}: PDFViewerProps) {
  if (!isOpen || !document) return null;

  return (
    <div
      className="fixed inset-0 z-50 overflow-hidden"
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
    >
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-gray-900/80 transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal */}
      <div className="fixed inset-4 sm:inset-8 lg:inset-12 flex flex-col bg-white shadow-2xl">
        {/* Header del modal */}
        <div className="flex items-center justify-between px-4 py-3 bg-gray-100 border-b border-gray-300">
          <div className="flex-1 min-w-0">
            <h2
              id="modal-title"
              className="text-sm font-bold text-gray-900 uppercase tracking-wide truncate"
            >
              {document.nombre}
            </h2>
            <p className="text-xs text-gray-600 mt-0.5">
              Ref: {document.id} · Fecha: {document.fecha}
            </p>
          </div>
          <div className="flex items-center gap-2 ml-4">
            <a
              href={pdfUrl}
              download={`${document.id}.pdf`}
              className="flex items-center gap-2 px-3 py-2 bg-gray-800 text-white text-sm font-semibold hover:bg-gray-900 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-900"
            >
              <Download className="w-4 h-4" aria-hidden="true" />
              <span className="hidden sm:inline">Descargar</span>
            </a>
            <button
              onClick={onClose}
              className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-200 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-500"
              aria-label="Cerrar visor"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Contenido del PDF */}
        <div className="flex-1 bg-gray-200 overflow-hidden">
          <iframe
            src={`${pdfUrl}#toolbar=1&navpanes=0&scrollbar=1`}
            className="w-full h-full border-0"
            title={`Documento: ${document.nombre}`}
          />
        </div>

        {/* Footer del modal */}
        <div className="px-4 py-2 bg-gray-100 border-t border-gray-300 flex items-center justify-between">
          <p className="text-xs text-gray-600">
            Documento confidencial · Solo para uso del afiliado
          </p>
          <button
            onClick={onClose}
            className="text-sm text-gray-700 hover:text-gray-900 font-semibold underline focus:outline-none focus:ring-2 focus:ring-gray-500"
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
}
