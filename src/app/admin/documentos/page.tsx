"use client";

import { useState } from "react";
import {
  FileText,
  Eye,
  Download,
  Edit2,
  Trash2,
  Plus,
  Upload,
  X,
  Search,
} from "lucide-react";
import { ActionBar } from "@/components/admin/ActionBar";
import { StatusBadge, CategoryBadge, StatusType } from "@/components/shared/Badge";
import { PageFooter } from "@/components/admin/PageFooter";
import { ResultsCount } from "@/components/shared/ResultsCount";
import { EmptyState } from "@/components/shared/EmptyState";
import { formatDate } from "@/lib/shared/format";

type DocumentStatus = "Pendiente" | "Vigente" | "Archivado";
type DocumentCategory =
  | "Exp. Disciplinario"
  | "Recursos CA"
  | "Exp. Administrativos"
  | "Actos Servicio"
  | "Asuntos Personales";

interface Document {
  id: string;
  ref: string;
  name: string;
  afiliadoName: string;
  afiliadoTip: string;
  category: DocumentCategory;
  date: string;
  status: DocumentStatus;
  notes?: string;
}

const mockDocuments: Document[] = [
  { id: "1", ref: "ED-2024-001", name: "Expediente disciplinario - Falta grave", afiliadoName: "García Martínez, Juan", afiliadoTip: "12345678A", category: "Exp. Disciplinario", date: "2024-01-15", status: "Vigente" },
  { id: "2", ref: "RC-2024-002", name: "Recurso contra sanción", afiliadoName: "López Fernández, María", afiliadoTip: "87654321B", category: "Recursos CA", date: "2024-01-20", status: "Pendiente" },
  { id: "3", ref: "EA-2024-003", name: "Expediente administrativo - Traslado", afiliadoName: "Rodríguez Pérez, Carlos", afiliadoTip: "23456789C", category: "Exp. Administrativos", date: "2024-02-01", status: "Archivado" },
  { id: "4", ref: "AS-2024-004", name: "Acta de servicio - Intervención operativa", afiliadoName: "Sánchez Gómez, Ana", afiliadoTip: "34567890D", category: "Actos Servicio", date: "2024-02-10", status: "Vigente" },
  { id: "5", ref: "AP-2024-005", name: "Solicitud permiso personal", afiliadoName: "Martínez Torres, Luis", afiliadoTip: "45678901E", category: "Asuntos Personales", date: "2024-02-15", status: "Vigente" },
  { id: "6", ref: "ED-2024-006", name: "Expediente disciplinario - Falta leve", afiliadoName: "Fernández Ruiz, Isabel", afiliadoTip: "56789012F", category: "Exp. Disciplinario", date: "2024-03-01", status: "Pendiente" },
  { id: "7", ref: "RC-2024-007", name: "Recurso de reposición", afiliadoName: "González López, Pedro", afiliadoTip: "67890123G", category: "Recursos CA", date: "2024-03-05", status: "Vigente" },
  { id: "8", ref: "EA-2024-008", name: "Expediente administrativo - Cambio destino", afiliadoName: "Díaz Moreno, Carmen", afiliadoTip: "78901234H", category: "Exp. Administrativos", date: "2024-03-10", status: "Archivado" },
  { id: "9", ref: "AS-2024-009", name: "Acta de servicio - Control manifestación", afiliadoName: "Jiménez Vega, Miguel", afiliadoTip: "89012345I", category: "Actos Servicio", date: "2024-03-15", status: "Vigente" },
  { id: "10", ref: "AP-2024-010", name: "Solicitud excedencia", afiliadoName: "Romero Castro, Laura", afiliadoTip: "90123456J", category: "Asuntos Personales", date: "2024-03-20", status: "Pendiente" },
];

const TOTAL_DOCUMENTS = 15;

export default function DocumentosPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedAfiliado, setSelectedAfiliado] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Todos");
  const [selectedStatus, setSelectedStatus] = useState("Todos");
  const [isDragging, setIsDragging] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);

  const [formData, setFormData] = useState({
    afiliado: "",
    category: "",
    documentName: "",
    status: "Pendiente" as DocumentStatus,
    date: "",
    notes: "",
  });

  const filteredDocuments = mockDocuments.filter((doc) => {
    const matchesSearch =
      doc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.ref.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesAfiliado =
      !selectedAfiliado ||
      doc.afiliadoName.toLowerCase().includes(selectedAfiliado.toLowerCase());
    const matchesCategory =
      selectedCategory === "Todos" || doc.category === selectedCategory;
    const matchesStatus =
      selectedStatus === "Todos" || doc.status === selectedStatus;

    return matchesSearch && matchesAfiliado && matchesCategory && matchesStatus;
  });

  const handleDragEnter = (e: React.DragEvent) => { e.preventDefault(); e.stopPropagation(); setIsDragging(true); };
  const handleDragLeave = (e: React.DragEvent) => { e.preventDefault(); e.stopPropagation(); setIsDragging(false); };
  const handleDragOver = (e: React.DragEvent) => { e.preventDefault(); e.stopPropagation(); };
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault(); e.stopPropagation(); setIsDragging(false);
    const files = e.dataTransfer.files;
    if (files && files[0] && files[0].type === "application/pdf") { setUploadedFile(files[0]); }
  };
  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files[0]) { setUploadedFile(files[0]); }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData, uploadedFile);
    setIsModalOpen(false);
    resetForm();
  };

  const resetForm = () => {
    setFormData({ afiliado: "", category: "", documentName: "", status: "Pendiente", date: "", notes: "" });
    setUploadedFile(null);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <ActionBar
        title="Gestión de Documentos"
        subtitle="Gestión de documentos del sindicato"
        actions={
          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2 bg-gray-800 text-white text-sm font-semibold hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2 transition-colors"
          >
            <Plus className="w-4 h-4" aria-hidden="true" />
            Subir Documento
          </button>
        }
      />

      {/* Content */}
      <div className="p-6">
        {/* Filters */}
        <div className="bg-white border border-gray-300 p-4 mb-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" aria-hidden="true" />
              <input
                type="text"
                placeholder="Buscar por nombre o referencia..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 text-sm text-gray-900 bg-white border border-gray-300 focus:border-gray-500 focus:ring-0 focus:outline-none transition-colors"
              />
            </div>
            <input
              type="text"
              placeholder="Buscar afiliado..."
              value={selectedAfiliado}
              onChange={(e) => setSelectedAfiliado(e.target.value)}
              className="w-full px-3 py-2 text-sm text-gray-900 bg-white border border-gray-300 focus:border-gray-500 focus:ring-0 focus:outline-none transition-colors"
            />
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full px-3 py-2 text-sm text-gray-900 bg-white border border-gray-300 focus:border-gray-500 focus:ring-0 focus:outline-none transition-colors"
            >
              <option value="Todos">Categoría: Todas</option>
              <option value="Exp. Disciplinario">Exp. Disciplinario</option>
              <option value="Recursos CA">Recursos CA</option>
              <option value="Exp. Administrativos">Exp. Administrativos</option>
              <option value="Actos Servicio">Actos Servicio</option>
              <option value="Asuntos Personales">Asuntos Personales</option>
            </select>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="w-full px-3 py-2 text-sm text-gray-900 bg-white border border-gray-300 focus:border-gray-500 focus:ring-0 focus:outline-none transition-colors"
            >
              <option value="Todos">Estado: Todos</option>
              <option value="Pendiente">Pendiente</option>
              <option value="Vigente">Vigente</option>
              <option value="Archivado">Archivado</option>
            </select>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-2">
          <ResultsCount
            current={filteredDocuments.length}
            total={TOTAL_DOCUMENTS}
            label="documentos"
          />
        </div>

        {/* Documents Table */}
        <div className="bg-white border border-gray-300">
          {/* Table Header */}
          <div className="grid grid-cols-12 gap-2 px-4 py-2 bg-gray-100 text-xs font-bold text-gray-700 uppercase tracking-wide border-b border-gray-300">
            <div className="col-span-1">Ref.</div>
            <div className="col-span-3">Documento</div>
            <div className="col-span-2">Afiliado</div>
            <div className="col-span-2">Categoría</div>
            <div className="col-span-1">Fecha</div>
            <div className="col-span-1">Estado</div>
            <div className="col-span-2 text-right">Acciones</div>
          </div>

          {/* Table Body */}
          <div className="divide-y divide-gray-200">
            {filteredDocuments.length === 0 ? (
              <EmptyState message="No se encontraron documentos" />
            ) : (
              filteredDocuments.map((doc) => (
                <div
                  key={doc.id}
                  className="grid grid-cols-12 gap-2 px-4 py-3 items-center hover:bg-gray-50 transition-colors"
                >
                  <div className="col-span-1">
                    <span className="text-sm font-mono font-semibold text-gray-900">
                      {doc.ref.split("-").pop()}
                    </span>
                  </div>
                  <div className="col-span-3 flex items-center gap-2 min-w-0">
                    <FileText className="w-4 h-4 text-red-700 flex-shrink-0" aria-hidden="true" />
                    <span className="text-sm text-gray-900 truncate">{doc.name}</span>
                  </div>
                  <div className="col-span-2">
                    <p className="text-sm text-gray-900 truncate">{doc.afiliadoName}</p>
                    <p className="text-xs text-gray-500">{doc.afiliadoTip}</p>
                  </div>
                  <div className="col-span-2">
                    <CategoryBadge category={doc.category} />
                  </div>
                  <div className="col-span-1">
                    <span className="text-sm text-gray-700 tabular-nums">{formatDate(doc.date)}</span>
                  </div>
                  <div className="col-span-1">
                    <StatusBadge status={doc.status as StatusType} />
                  </div>
                  <div className="col-span-2 flex items-center justify-end gap-1">
                    <button className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-200 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-500" title="Ver documento">
                      <Eye className="w-4 h-4" />
                    </button>
                    <button className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-200 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-500" title="Descargar">
                      <Download className="w-4 h-4" />
                    </button>
                    <button className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-200 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-500" title="Editar">
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button className="p-2 text-gray-600 hover:text-red-700 hover:bg-red-50 transition-colors focus:outline-none focus:ring-2 focus:ring-red-500" title="Eliminar">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Table Footer */}
          <div className="px-4 py-2 bg-gray-100 border-t border-gray-300">
            <span className="text-xs text-gray-600 font-medium">
              Total: {filteredDocuments.length} documentos
            </span>
          </div>
        </div>

        <PageFooter />
      </div>

      {/* Upload Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden" role="dialog" aria-modal="true">
          <div className="fixed inset-0 bg-gray-900/80 transition-opacity" onClick={() => { setIsModalOpen(false); resetForm(); }} aria-hidden="true" />
          <div className="fixed inset-4 sm:inset-8 lg:inset-y-12 lg:inset-x-auto lg:left-1/2 lg:-translate-x-1/2 lg:w-full lg:max-w-2xl flex flex-col bg-white shadow-2xl">
            {/* Modal Header */}
            <div className="flex items-center justify-between px-4 py-3 bg-gray-100 border-b border-gray-300">
              <h2 className="text-sm font-bold text-gray-900 uppercase tracking-wide">
                Subir Documento
              </h2>
              <button
                onClick={() => { setIsModalOpen(false); resetForm(); }}
                className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-200 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-500"
                aria-label="Cerrar"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-4">
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide mb-1">Afiliado</label>
                  <input
                    type="text"
                    placeholder="Buscar afiliado por nombre o TIP..."
                    value={formData.afiliado}
                    onChange={(e) => setFormData({ ...formData, afiliado: e.target.value })}
                    className="w-full px-3 py-2 text-sm text-gray-900 bg-white border border-gray-300 focus:border-gray-500 focus:ring-0 focus:outline-none transition-colors"
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide mb-1">Categoría</label>
                    <select
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      className="w-full px-3 py-2 text-sm text-gray-900 bg-white border border-gray-300 focus:border-gray-500 focus:ring-0 focus:outline-none transition-colors"
                      required
                    >
                      <option value="">Seleccionar...</option>
                      <option value="Exp. Disciplinario">Exp. Disciplinario</option>
                      <option value="Recursos CA">Recursos CA</option>
                      <option value="Exp. Administrativos">Exp. Administrativos</option>
                      <option value="Actos Servicio">Actos Servicio</option>
                      <option value="Asuntos Personales">Asuntos Personales</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide mb-1">Estado</label>
                    <select
                      value={formData.status}
                      onChange={(e) => setFormData({ ...formData, status: e.target.value as DocumentStatus })}
                      className="w-full px-3 py-2 text-sm text-gray-900 bg-white border border-gray-300 focus:border-gray-500 focus:ring-0 focus:outline-none transition-colors"
                      required
                    >
                      <option value="Pendiente">Pendiente</option>
                      <option value="Vigente">Vigente</option>
                      <option value="Archivado">Archivado</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide mb-1">Nombre del documento</label>
                  <input
                    type="text"
                    placeholder="Ej: Expediente disciplinario - Falta grave"
                    value={formData.documentName}
                    onChange={(e) => setFormData({ ...formData, documentName: e.target.value })}
                    className="w-full px-3 py-2 text-sm text-gray-900 bg-white border border-gray-300 focus:border-gray-500 focus:ring-0 focus:outline-none transition-colors"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide mb-1">Fecha del documento</label>
                  <input
                    type="date"
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    className="w-full px-3 py-2 text-sm text-gray-900 bg-white border border-gray-300 focus:border-gray-500 focus:ring-0 focus:outline-none transition-colors"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide mb-1">Archivo PDF</label>
                  <div
                    onDragEnter={handleDragEnter}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                    className={`relative border-2 border-dashed p-6 text-center transition-colors ${
                      isDragging ? "border-gray-500 bg-gray-100" : "border-gray-300 bg-gray-50 hover:border-gray-400"
                    }`}
                  >
                    <input
                      type="file"
                      accept="application/pdf"
                      onChange={handleFileInput}
                      className="absolute inset-0 cursor-pointer opacity-0"
                    />
                    <Upload className="mx-auto mb-2 text-gray-400 w-8 h-8" aria-hidden="true" />
                    {uploadedFile ? (
                      <div className="text-sm">
                        <p className="font-medium text-green-700">Archivo seleccionado:</p>
                        <p className="text-gray-700">{uploadedFile.name}</p>
                        <p className="text-xs text-gray-500">{(uploadedFile.size / 1024).toFixed(2)} KB</p>
                      </div>
                    ) : (
                      <div className="text-sm text-gray-600">
                        <p className="font-medium">Arrastra un archivo PDF aquí</p>
                        <p className="text-xs text-gray-500">o haz clic para seleccionar</p>
                      </div>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide mb-1">Notas internas (opcional)</label>
                  <textarea
                    placeholder="Escribe notas o comentarios..."
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    rows={3}
                    className="w-full px-3 py-2 text-sm text-gray-900 bg-white border border-gray-300 focus:border-gray-500 focus:ring-0 focus:outline-none transition-colors resize-none"
                  />
                </div>
              </div>
            </form>

            {/* Modal Footer */}
            <div className="px-4 py-3 bg-gray-100 border-t border-gray-300 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => { setIsModalOpen(false); resetForm(); }}
                className="px-4 py-2 bg-white text-gray-800 text-sm font-semibold border border-gray-300 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 transition-colors"
              >
                Cancelar
              </button>
              <button
                type="submit"
                onClick={handleSubmit}
                className="px-4 py-2 bg-gray-800 text-white text-sm font-semibold hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2 transition-colors"
              >
                Subir Documento
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
