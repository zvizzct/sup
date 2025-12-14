"use client";

import { useState } from "react";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { Header, Footer } from "@/components/layout";
import { Download, Scale, Phone, Mail, FileUp, Calendar, History, CheckCircle } from "lucide-react";
import { PDFViewer, SyncFooter } from "@/components/shared";
import { ExpedienteAccordion, Documento } from "@/components/panel";

// Datos del usuario
const userData = {
  name: "Juan García López",
  tip: "12345",
  destino: "Comisaría Provincial de Barcelona",
  afiliadoDesde: "01/03/2010",
  antiguedad: "15 años",
};

// Datos de expedientes con documentos
const expedientes: Record<string, { titulo: string; descripcion: string; documentos: Documento[] }> = {
  disciplinario: {
    titulo: "Expediente Disciplinario",
    descripcion: "Expedientes disciplinarios, sanciones, recursos y alegaciones",
    documentos: [
      { id: "ED-2024-001", nombre: "Expediente 2024/1234 - Pliego de cargos", fecha: "12/12/2024", estado: "pendiente", tipo: "PDF" },
      { id: "ED-2024-002", nombre: "Alegaciones presentadas - Exp. 2024/1234", fecha: "15/12/2024", estado: "pendiente", tipo: "PDF" },
      { id: "ED-2023-001", nombre: "Resolución sancionadora Exp. 2023/0892", fecha: "15/03/2024", estado: "archivado", tipo: "PDF" },
      { id: "ED-2023-002", nombre: "Recurso de alzada Exp. 2023/0892", fecha: "20/03/2024", estado: "archivado", tipo: "PDF" },
    ],
  },
  contencioso: {
    titulo: "Recursos Contencioso-Administrativos",
    descripcion: "Recursos judiciales, demandas y sentencias",
    documentos: [
      { id: "RCA-2024-001", nombre: "Recurso CA 456/2024 - Escrito de interposición", fecha: "20/11/2024", estado: "pendiente", tipo: "PDF" },
      { id: "RCA-2024-002", nombre: "Auto de admisión - Recurso CA 456/2024", fecha: "05/12/2024", estado: "vigente", tipo: "PDF" },
      { id: "RCA-2023-001", nombre: "Sentencia TSJ 2023/7821", fecha: "08/06/2024", estado: "archivado", tipo: "PDF" },
    ],
  },
  administrativo: {
    titulo: "Expedientes Administrativos",
    descripcion: "Permisos, licencias, situaciones administrativas y solicitudes",
    documentos: [
      { id: "EA-2024-001", nombre: "Solicitud comisión de servicios", fecha: "05/12/2024", estado: "pendiente", tipo: "PDF" },
      { id: "EA-2024-002", nombre: "Resolución permiso sin sueldo", fecha: "01/11/2024", estado: "vigente", tipo: "PDF" },
      { id: "EA-2024-003", nombre: "Certificado de servicios prestados", fecha: "15/10/2024", estado: "vigente", tipo: "PDF" },
      { id: "EA-2024-004", nombre: "Solicitud excedencia voluntaria", fecha: "20/09/2024", estado: "archivado", tipo: "PDF" },
      { id: "EA-2024-005", nombre: "Resolución cambio de destino", fecha: "01/09/2024", estado: "vigente", tipo: "PDF" },
    ],
  },
  servicio: {
    titulo: "Actos de Servicio",
    descripcion: "Atestados, informes, intervenciones y reconocimientos",
    documentos: [
      { id: "AS-2024-001", nombre: "Atestado intervención 14/11/2024", fecha: "15/11/2024", estado: "archivado", tipo: "PDF" },
      { id: "AS-2024-002", nombre: "Informe actuación operativo conjunto", fecha: "01/11/2024", estado: "archivado", tipo: "PDF" },
      { id: "AS-2024-003", nombre: "Felicitación por actuación destacada", fecha: "22/09/2024", estado: "vigente", tipo: "PDF" },
      { id: "AS-2024-004", nombre: "Parte de lesiones en acto de servicio", fecha: "10/08/2024", estado: "archivado", tipo: "PDF" },
    ],
  },
  personal: {
    titulo: "Asuntos Personales",
    descripcion: "Temas penales, defensa jurídica personal y reclamaciones",
    documentos: [
      { id: "AP-2024-001", nombre: "Consulta jurídica - Accidente tráfico", fecha: "28/11/2024", estado: "pendiente", tipo: "PDF" },
      { id: "AP-2024-002", nombre: "Escrito defensa procedimiento penal", fecha: "15/10/2024", estado: "vigente", tipo: "PDF" },
      { id: "AP-2023-001", nombre: "Resolución reclamación patrimonial", fecha: "10/08/2024", estado: "archivado", tipo: "PDF" },
    ],
  },
  abogado: {
    titulo: "Solicitudes de Abogado",
    descripcion: "Historial de solicitudes de asistencia jurídica",
    documentos: [
      { id: "SA-2024-001", nombre: "Solicitud abogado - Recurso de alzada", fecha: "10/12/2024", estado: "pendiente", tipo: "PDF" },
      { id: "SA-2024-002", nombre: "Asignación letrado - Exp. disciplinario", fecha: "01/12/2024", estado: "vigente", tipo: "PDF" },
      { id: "SA-2024-003", nombre: "Informe actuación letrada - Caso 2024/456", fecha: "15/11/2024", estado: "archivado", tipo: "PDF" },
    ],
  },
};

export default function PanelPage() {
  const t = useTranslations("panel");
  const [openSections, setOpenSections] = useState<string[]>(["disciplinario"]);
  const [viewerOpen, setViewerOpen] = useState(false);
  const [selectedDocument, setSelectedDocument] = useState<Documento | null>(null);

  const toggleSection = (id: string) => {
    setOpenSections((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]
    );
  };

  const handleViewDocument = (doc: Documento) => {
    setSelectedDocument(doc);
    setViewerOpen(true);
  };

  const handleCloseViewer = () => {
    setViewerOpen(false);
    setSelectedDocument(null);
  };

  const handleDownloadDocument = (doc: Documento) => {
    const pdfUrl = "/documents/sample.pdf";
    const link = document.createElement("a");
    link.href = pdfUrl;
    link.download = `${doc.id}.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <Header
        variant="private"
        userName={userData.name}
        userTip={userData.tip}
        userDestino={userData.destino}
      />

      <main className="flex-1 pb-20 lg:pb-0">
        {/* Barra de título */}
        <div className="bg-white border-b border-gray-200 shadow-sm">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4">
            <h1 className="text-sm sm:text-base font-bold text-gray-900 uppercase tracking-wide">
              Mis Expedientes
            </h1>
            <p className="text-xs sm:text-sm text-gray-600 mt-0.5">
              Gestión de documentos y expedientes personales
            </p>
          </div>
        </div>

        {/* Contenido principal */}
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 sm:py-6">
          {/* Móvil: Quick actions horizontal scroll */}
          <div className="lg:hidden mb-4 -mx-4 px-4 overflow-x-auto scrollbar-hide">
            <div className="flex gap-2 pb-2">
              <Link
                href="/solicitar-abogado"
                className="flex-shrink-0 flex items-center gap-2 px-4 py-2.5 bg-sup-blue text-white text-sm font-semibold rounded-lg shadow-md hover:bg-sup-blue-dark active:scale-95 transition-all"
              >
                <Scale className="w-4 h-4" />
                Solicitar Abogado
              </Link>
              <a
                href="tel:914615833"
                className="flex-shrink-0 flex items-center gap-2 px-4 py-2.5 bg-white border border-gray-300 text-gray-800 text-sm font-medium rounded-lg shadow-sm hover:bg-gray-50 active:scale-95 transition-all"
              >
                <Phone className="w-4 h-4 text-sup-blue" />
                Urgencias
              </a>
              <Link
                href="/subir-documento"
                className="flex-shrink-0 flex items-center gap-2 px-4 py-2.5 bg-white border border-gray-300 text-gray-800 text-sm font-medium rounded-lg shadow-sm hover:bg-gray-50 active:scale-95 transition-all"
              >
                <FileUp className="w-4 h-4 text-gray-600" />
                Subir
              </Link>
            </div>
          </div>

          <div className="grid lg:grid-cols-4 gap-4 sm:gap-6">
            {/* Columna principal - Acordeones */}
            <div className="lg:col-span-3 space-y-1">
              {Object.entries(expedientes).map(([id, data]) => (
                <ExpedienteAccordion
                  key={id}
                  id={id}
                  titulo={data.titulo}
                  descripcion={data.descripcion}
                  documentos={data.documentos}
                  isOpen={openSections.includes(id)}
                  onToggle={() => toggleSection(id)}
                  onViewDocument={handleViewDocument}
                  onDownloadDocument={handleDownloadDocument}
                />
              ))}
            </div>

            {/* Sidebar - Hidden en móvil, visible en desktop */}
            <div className="hidden lg:block space-y-4">
              {/* Solicitar Abogado */}
              <div className="bg-white border border-gray-200 p-4 shadow-sm">
                <Link
                  href="/solicitar-abogado"
                  className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-sup-blue text-white text-sm font-semibold hover:bg-sup-blue-dark transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-sup-blue focus-visible:ring-offset-2 shadow-sm"
                >
                  <Scale className="w-4 h-4" aria-hidden="true" />
                  Solicitar Abogado
                </Link>
                <p className="text-xs text-gray-500 mt-2 text-center">
                  Solicita asistencia jurídica para tu caso
                </p>
              </div>

              {/* Asistencia Jurídica */}
              <div className="bg-white border border-gray-200 p-4 shadow-sm">
                <h2 className="text-xs font-bold text-gray-900 uppercase tracking-wide mb-3">
                  Asistencia Jurídica
                </h2>
                <div className="space-y-3">
                  <a
                    href="tel:914615833"
                    className="flex items-center gap-3 p-2 -mx-2 rounded hover:bg-gray-50 transition-colors group"
                  >
                    <div className="w-8 h-8 rounded-full bg-sup-blue/10 flex items-center justify-center">
                      <Phone className="w-4 h-4 text-sup-blue" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Urgencias 24h</p>
                      <p className="text-sm font-bold text-gray-900 group-hover:text-sup-blue transition-colors">914 615 833</p>
                    </div>
                  </a>
                  <a
                    href="mailto:juridico@sup.es"
                    className="flex items-center gap-3 p-2 -mx-2 rounded hover:bg-gray-50 transition-colors group"
                  >
                    <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
                      <Mail className="w-4 h-4 text-gray-600" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Correo electrónico</p>
                      <p className="text-sm font-medium text-gray-900 group-hover:text-sup-blue transition-colors">juridico@sup.es</p>
                    </div>
                  </a>
                </div>
              </div>

              {/* Estado afiliación */}
              <div className="bg-white border border-gray-200 p-4 shadow-sm">
                <h2 className="text-xs font-bold text-gray-900 uppercase tracking-wide mb-3">
                  Estado de Afiliación
                </h2>
                <div className="space-y-2">
                  <div className="flex items-center justify-between py-1">
                    <span className="text-sm text-gray-600">Estado</span>
                    <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-green-700">
                      <CheckCircle className="w-4 h-4" />
                      Activo
                    </span>
                  </div>
                  <div className="flex items-center justify-between py-1">
                    <span className="text-sm text-gray-600">Alta</span>
                    <span className="text-sm font-medium text-gray-900 tabular-nums">{userData.afiliadoDesde}</span>
                  </div>
                  <div className="flex items-center justify-between py-1">
                    <span className="text-sm text-gray-600">Antigüedad</span>
                    <span className="text-sm font-medium text-gray-900">{userData.antiguedad}</span>
                  </div>
                </div>
                <div className="mt-3 pt-3 border-t border-gray-100">
                  <Link
                    href="/certificado-afiliacion"
                    className="flex items-center justify-center gap-2 w-full px-3 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 transition-colors"
                  >
                    <Download className="w-4 h-4" aria-hidden="true" />
                    Descargar certificado
                  </Link>
                </div>
              </div>

              {/* Acciones rápidas */}
              <div className="bg-white border border-gray-200 p-4 shadow-sm">
                <h2 className="text-xs font-bold text-gray-900 uppercase tracking-wide mb-3">
                  Acciones
                </h2>
                <nav className="space-y-0.5" aria-label="Acciones rápidas">
                  <Link
                    href="/subir-documento"
                    className="flex items-center gap-3 px-2 py-2.5 text-sm text-gray-700 hover:bg-gray-50 rounded transition-colors"
                  >
                    <FileUp className="w-4 h-4 text-gray-500" />
                    Subir documento
                  </Link>
                  <Link
                    href="/cita-previa"
                    className="flex items-center gap-3 px-2 py-2.5 text-sm text-gray-700 hover:bg-gray-50 rounded transition-colors"
                  >
                    <Calendar className="w-4 h-4 text-gray-500" />
                    Solicitar cita previa
                  </Link>
                  <Link
                    href="/historial"
                    className="flex items-center gap-3 px-2 py-2.5 text-sm text-gray-700 hover:bg-gray-50 rounded transition-colors"
                  >
                    <History className="w-4 h-4 text-gray-500" />
                    Ver historial completo
                  </Link>
                </nav>
              </div>
            </div>
          </div>

          {/* Móvil: Estado de afiliación colapsado */}
          <div className="lg:hidden mt-6">
            <div className="bg-white border border-gray-200 p-4 shadow-sm rounded-lg">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-900">Afiliación Activa</p>
                    <p className="text-xs text-gray-500">Desde {userData.afiliadoDesde} · {userData.antiguedad}</p>
                  </div>
                </div>
                <Link
                  href="/certificado-afiliacion"
                  className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
                  aria-label="Descargar certificado"
                >
                  <Download className="w-5 h-5" />
                </Link>
              </div>
            </div>
          </div>

          {/* Pie de página */}
          <SyncFooter message="Los documentos aquí mostrados tienen carácter confidencial." />
        </div>
      </main>

      <Footer />

      {/* FAB Móvil - Solicitar Abogado (fixed bottom) */}
      <div className="lg:hidden fixed bottom-4 right-4 z-30">
        <Link
          href="/solicitar-abogado"
          className="flex items-center gap-2 px-5 py-3.5 bg-sup-blue text-white font-semibold rounded-full shadow-lg hover:bg-sup-blue-dark active:scale-95 transition-all focus:outline-none focus-visible:ring-4 focus-visible:ring-sup-blue/50"
        >
          <Scale className="w-5 h-5" aria-hidden="true" />
          <span className="text-sm">Solicitar Abogado</span>
        </Link>
      </div>

      {/* Modal de visualización de PDF */}
      <PDFViewer
        isOpen={viewerOpen}
        onClose={handleCloseViewer}
        document={selectedDocument}
      />
    </div>
  );
}
