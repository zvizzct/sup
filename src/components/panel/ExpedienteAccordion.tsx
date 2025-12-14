"use client";

import { ChevronDown, FileText, Download, Eye } from "lucide-react";
import { StatusBadge, StatusType } from "@/components/shared/Badge";

export interface Documento {
  id: string;
  nombre: string;
  fecha: string;
  estado: "vigente" | "archivado" | "pendiente";
  tipo: string;
}

interface ExpedienteAccordionProps {
  id: string;
  titulo: string;
  descripcion: string;
  documentos: Documento[];
  isOpen: boolean;
  onToggle: () => void;
  onViewDocument: (doc: Documento) => void;
  onDownloadDocument: (doc: Documento) => void;
}

// Mapeo de estado de documento a StatusType
const estadoToStatus: Record<string, StatusType> = {
  vigente: "Vigente",
  archivado: "Archivado",
  pendiente: "Pendiente",
};

export function ExpedienteAccordion({
  id,
  titulo,
  descripcion,
  documentos,
  isOpen,
  onToggle,
  onViewDocument,
  onDownloadDocument,
}: ExpedienteAccordionProps) {
  return (
    <div className="border border-gray-300 bg-white overflow-hidden">
      {/* Header del acordeón */}
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between px-3 sm:px-4 py-3 text-left hover:bg-gray-50 focus:outline-none focus:bg-gray-100 transition-colors active:bg-gray-100"
        aria-expanded={isOpen}
      >
        <div className="flex-1 min-w-0 pr-2">
          <h3 className="text-xs sm:text-sm font-bold text-gray-900 uppercase tracking-wide truncate">
            {titulo}
          </h3>
          <p className="text-xs sm:text-sm text-gray-600 mt-0.5 line-clamp-1">{descripcion}</p>
        </div>
        <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
          <span className="text-xs sm:text-sm text-gray-700 tabular-nums font-medium whitespace-nowrap">
            {documentos.length} <span className="hidden xs:inline">{documentos.length === 1 ? "doc" : "docs"}</span>
          </span>
          <ChevronDown
            className={`w-5 h-5 text-gray-600 transition-transform duration-300 ease-out ${isOpen ? "rotate-180" : ""}`}
            aria-hidden="true"
          />
        </div>
      </button>

      {/* Contenido desplegable con animación */}
      <div
        className={`border-t border-gray-300 transition-all duration-300 ease-out ${
          isOpen ? "opacity-100" : "opacity-0 h-0 overflow-hidden border-t-0"
        }`}
      >
        {/* Vista Desktop - Tabla (hidden en móvil) */}
        <div className="hidden md:block">
          {/* Cabecera de tabla */}
          <div className="grid grid-cols-12 gap-2 px-4 py-2 bg-gray-100 text-xs font-bold text-gray-700 uppercase tracking-wide border-b border-gray-300">
            <div className="col-span-1">Ref.</div>
            <div className="col-span-5">Documento</div>
            <div className="col-span-2">Fecha</div>
            <div className="col-span-2">Estado</div>
            <div className="col-span-2 text-right">Acciones</div>
          </div>

          {/* Lista de documentos - Desktop */}
          <div className="divide-y divide-gray-200">
            {documentos.map((doc, index) => (
              <div
                key={doc.id}
                className="grid grid-cols-12 gap-2 px-4 py-3 items-center hover:bg-gray-50 transition-colors"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <div className="col-span-1">
                  <span className="text-xs text-gray-600 font-mono font-medium">
                    {doc.id.split("-").pop()}
                  </span>
                </div>
                <div className="col-span-5 flex items-center gap-2 min-w-0">
                  <FileText className="w-4 h-4 text-red-600 flex-shrink-0" aria-hidden="true" />
                  <span className="text-sm text-gray-900 truncate">{doc.nombre}</span>
                </div>
                <div className="col-span-2">
                  <span className="text-sm text-gray-700 tabular-nums">{doc.fecha}</span>
                </div>
                <div className="col-span-2">
                  <StatusBadge status={estadoToStatus[doc.estado]} />
                </div>
                <div className="col-span-2 flex items-center justify-end gap-1">
                  <button
                    onClick={() => onViewDocument(doc)}
                    className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-200 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-500"
                    title="Ver documento"
                    aria-label={`Ver documento ${doc.nombre}`}
                  >
                    <Eye className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => onDownloadDocument(doc)}
                    className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-200 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-500"
                    title="Descargar documento"
                    aria-label={`Descargar documento ${doc.nombre}`}
                  >
                    <Download className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Vista Móvil - Cards (hidden en desktop) */}
        <div className="md:hidden divide-y divide-gray-200">
          {documentos.map((doc, index) => (
            <div
              key={doc.id}
              className="p-3 hover:bg-gray-50 active:bg-gray-100 transition-colors"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              {/* Fila superior: Icono + Nombre + Estado */}
              <div className="flex items-start gap-2 mb-2">
                <FileText className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" aria-hidden="true" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 leading-tight">
                    {doc.nombre}
                  </p>
                  <div className="flex items-center gap-2 mt-1.5">
                    <span className="text-xs text-gray-500 font-mono">{doc.id}</span>
                    <span className="text-gray-300">·</span>
                    <span className="text-xs text-gray-600 tabular-nums">{doc.fecha}</span>
                  </div>
                </div>
              </div>

              {/* Fila inferior: Estado + Acciones */}
              <div className="flex items-center justify-between mt-3 pt-2 border-t border-gray-100">
                <StatusBadge status={estadoToStatus[doc.estado]} />
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => onViewDocument(doc)}
                    className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 active:bg-gray-300 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-500"
                    aria-label={`Ver documento ${doc.nombre}`}
                  >
                    <Eye className="w-3.5 h-3.5" />
                    Ver
                  </button>
                  <button
                    onClick={() => onDownloadDocument(doc)}
                    className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 active:bg-gray-300 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-500"
                    aria-label={`Descargar documento ${doc.nombre}`}
                  >
                    <Download className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="px-3 sm:px-4 py-2 bg-gray-100 border-t border-gray-300 flex justify-between items-center">
          <span className="text-xs text-gray-600 font-medium">
            {documentos.length} {documentos.length === 1 ? "documento" : "documentos"}
          </span>
          <button className="text-xs text-gray-700 hover:text-gray-900 font-semibold underline focus:outline-none focus:ring-2 focus:ring-gray-500 active:text-gray-900">
            Ver todos
          </button>
        </div>
      </div>
    </div>
  );
}
