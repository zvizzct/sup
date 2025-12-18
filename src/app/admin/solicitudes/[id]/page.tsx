"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Mail,
  Phone,
  MapPin,
  Calendar,
  FileText,
  Download,
  Eye,
  Clock,
  CheckCircle,
  XCircle,
  Plus,
  UserCheck,
  ArrowRight,
} from "lucide-react";
import { ActionBar } from "@/components/admin/ActionBar";
import { StatusBadge, UrgencyBadge, StatusType, UrgencyType } from "@/components/shared/Badge";
import { PageFooter } from "@/components/admin/PageFooter";

const REQUEST_DATA = {
  id: "SA-2024-045",
  status: "Nueva" as StatusType,
  urgency: "Alta" as UrgencyType,
  affiliate: {
    name: "Juan García López",
    tip: "12345",
    destination: "Com. Provincial Barcelona",
    email: "juan.garcia@email.com",
    phone: "612 345 678"
  },
  type: "Expediente Disciplinario",
  date: "12/12/2024",
  description: "Me han notificado un pliego de cargos por presunta falta grave relacionada con una intervención el pasado 15 de noviembre. Necesito asistencia urgente para preparar las alegaciones. El plazo para presentarlas finaliza el 20 de diciembre de 2024.",
  documents: [
    { id: 1, name: "Pliego de cargos.pdf", size: "2.3 MB", uploadedAt: "12/12/2024 10:30" },
    { id: 2, name: "Notificación.pdf", size: "1.1 MB", uploadedAt: "12/12/2024 10:31" }
  ],
  timeline: [
    { id: 1, date: "12/12/2024 10:28", action: "Solicitud creada", user: "Juan García López" },
    { id: 2, date: "12/12/2024 10:30", action: "Documento añadido: Pliego de cargos.pdf", user: "Juan García López" },
    { id: 3, date: "12/12/2024 10:31", action: "Documento añadido: Notificación.pdf", user: "Juan García López" }
  ]
};

const LAWYERS = [
  { id: 1, name: "Dra. Ana Martínez", specialty: "Exp. disciplinario", activeCases: 3, email: "ana.martinez@sup.es" },
  { id: 2, name: "Dr. Carlos Ruiz", specialty: "Contencioso-admin", activeCases: 5, email: "carlos.ruiz@sup.es" },
  { id: 3, name: "Dra. Laura Sanz", specialty: "Derecho penal", activeCases: 2, email: "laura.sanz@sup.es" }
];

export default function LawyerRequestDetailPage({ params }: { params: { id: string } }) {
  const [selectedLawyer, setSelectedLawyer] = useState<number | null>(null);
  const [assignmentNotes, setAssignmentNotes] = useState("");
  const [isAssigned, setIsAssigned] = useState(false);
  const [assignedLawyer, setAssignedLawyer] = useState<typeof LAWYERS[0] | null>(null);
  const [assignmentDate, setAssignmentDate] = useState("");

  const handleAssignLawyer = () => {
    if (selectedLawyer) {
      const lawyer = LAWYERS.find(l => l.id === selectedLawyer);
      if (lawyer) {
        setAssignedLawyer(lawyer);
        setIsAssigned(true);
        setAssignmentDate(new Date().toLocaleDateString('es-ES'));
      }
    }
  };

  const handleReassign = () => {
    setIsAssigned(false);
    setAssignedLawyer(null);
    setSelectedLawyer(null);
    setAssignmentNotes("");
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <ActionBar
        title={`Solicitud ${REQUEST_DATA.id}`}
        subtitle={`Fecha: ${REQUEST_DATA.date}`}
        backHref="/admin/solicitudes"
        badges={
          <>
            <StatusBadge status={REQUEST_DATA.status} />
            <UrgencyBadge urgency={REQUEST_DATA.urgency} />
          </>
        }
      />

      <div className="p-4 sm:p-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
          {/* Left Column - 2/3 */}
          <div className="lg:col-span-2 space-y-4">
            {/* Datos del Afiliado */}
            <div className="bg-white border border-gray-300">
              <div className="px-4 py-3 border-b border-gray-300">
                <h2 className="text-sm font-bold text-gray-900 uppercase tracking-wide">
                  Datos del Afiliado
                </h2>
              </div>
              <div className="p-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide mb-1">Nombre completo</label>
                    <p className="text-sm text-gray-900">{REQUEST_DATA.affiliate.name}</p>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide mb-1">TIP</label>
                    <p className="text-sm font-mono text-gray-900">{REQUEST_DATA.affiliate.tip}</p>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide mb-1">Destino</label>
                    <p className="text-sm text-gray-900 flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-gray-500" aria-hidden="true" />
                      {REQUEST_DATA.affiliate.destination}
                    </p>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide mb-1">Email</label>
                    <p className="text-sm text-gray-900 flex items-center gap-2">
                      <Mail className="w-4 h-4 text-gray-500" aria-hidden="true" />
                      {REQUEST_DATA.affiliate.email}
                    </p>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide mb-1">Teléfono</label>
                    <p className="text-sm text-gray-900 flex items-center gap-2">
                      <Phone className="w-4 h-4 text-gray-500" aria-hidden="true" />
                      {REQUEST_DATA.affiliate.phone}
                    </p>
                  </div>
                </div>
                <Link
                  href={`/admin/afiliados/${REQUEST_DATA.affiliate.tip}`}
                  className="flex items-center gap-1 text-sm text-gray-700 hover:text-gray-900 font-medium underline focus:outline-none focus:ring-2 focus:ring-gray-500"
                >
                  Ver ficha completa
                  <ArrowRight className="w-4 h-4" aria-hidden="true" />
                </Link>
              </div>
            </div>

            {/* Motivo de la Solicitud */}
            <div className="bg-white border border-gray-300">
              <div className="px-4 py-3 border-b border-gray-300">
                <h2 className="text-sm font-bold text-gray-900 uppercase tracking-wide">
                  Motivo de la Solicitud
                </h2>
              </div>
              <div className="p-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide mb-1">Tipo de asunto</label>
                    <p className="text-sm text-gray-900">{REQUEST_DATA.type}</p>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide mb-1">Fecha de solicitud</label>
                    <p className="text-sm text-gray-900 flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-gray-500" aria-hidden="true" />
                      {REQUEST_DATA.date}
                    </p>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide mb-1">Urgencia</label>
                    <UrgencyBadge urgency={REQUEST_DATA.urgency} />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide mb-2">Descripción completa</label>
                  <div className="bg-gray-100 border border-gray-300 p-4">
                    <p className="text-sm text-gray-800 leading-relaxed whitespace-pre-wrap">
                      {REQUEST_DATA.description}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Documentos Adjuntos */}
            <div className="bg-white border border-gray-300">
              <div className="px-4 py-3 border-b border-gray-300">
                <h2 className="text-sm font-bold text-gray-900 uppercase tracking-wide">
                  Documentos Adjuntos
                </h2>
              </div>
              <div className="divide-y divide-gray-200">
                {REQUEST_DATA.documents.map((doc) => (
                  <div key={doc.id} className="flex flex-col sm:flex-row sm:items-center justify-between px-4 py-3 hover:bg-gray-50 transition-colors gap-2">
                    <div className="flex items-center gap-3 min-w-0">
                      <FileText className="w-5 h-5 text-red-700 flex-shrink-0" aria-hidden="true" />
                      <div className="min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate">{doc.name}</p>
                        <p className="text-xs text-gray-500">{doc.size} · {doc.uploadedAt}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-1 self-end sm:self-auto">
                      <button className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-200 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-500" title="Ver">
                        <Eye className="w-4 h-4" />
                      </button>
                      <button className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-200 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-500" title="Descargar">
                        <Download className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Timeline */}
            <div className="bg-white border border-gray-300">
              <div className="px-4 py-3 border-b border-gray-300">
                <h2 className="text-sm font-bold text-gray-900 uppercase tracking-wide">
                  Timeline del Caso
                </h2>
              </div>
              <div className="p-4">
                <div className="space-y-4">
                  {REQUEST_DATA.timeline.map((event, index) => (
                    <div key={event.id} className="flex gap-3">
                      <div className="flex flex-col items-center">
                        <span className="h-6 w-6 bg-gray-100 flex items-center justify-center">
                          <Clock className="h-3 w-3 text-gray-600" aria-hidden="true" />
                        </span>
                        {index < REQUEST_DATA.timeline.length - 1 && (
                          <div className="w-px h-full bg-gray-200 flex-1 mt-1" aria-hidden="true" />
                        )}
                      </div>
                      <div className="flex-1 pb-4">
                        <p className="text-xs text-gray-500">{event.date}</p>
                        <p className="text-sm font-medium text-gray-900">{event.action}</p>
                        <p className="text-xs text-gray-600">{event.user}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - 1/3 */}
          <div className="space-y-4">
            {/* Asignar/Ver Letrado */}
            {!isAssigned ? (
              <div className="bg-white border border-gray-300">
                <div className="px-4 py-3 border-b border-gray-300">
                  <h2 className="text-sm font-bold text-gray-900 uppercase tracking-wide">
                    Asignar Letrado
                  </h2>
                </div>
                <div className="p-4">
                  <div className="mb-4">
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide mb-1">Seleccionar letrado</label>
                    <select
                      value={selectedLawyer || ""}
                      onChange={(e) => setSelectedLawyer(Number(e.target.value))}
                      className="w-full px-3 py-2 text-sm text-gray-900 bg-white border border-gray-300 focus:border-gray-500 focus:ring-0 focus:outline-none transition-colors"
                    >
                      <option value="">Seleccione un letrado...</option>
                      {LAWYERS.map((lawyer) => (
                        <option key={lawyer.id} value={lawyer.id}>{lawyer.name}</option>
                      ))}
                    </select>
                  </div>

                  <div className="mb-4">
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide mb-2">Letrados disponibles</label>
                    <div className="space-y-1">
                      {LAWYERS.map((lawyer) => (
                        <div
                          key={lawyer.id}
                          className={`p-3 border cursor-pointer transition-colors ${
                            selectedLawyer === lawyer.id
                              ? 'border-gray-800 bg-gray-100'
                              : 'border-gray-200 hover:bg-gray-50'
                          }`}
                          onClick={() => setSelectedLawyer(lawyer.id)}
                        >
                          <p className="text-sm font-medium text-gray-900">{lawyer.name}</p>
                          <p className="text-xs text-gray-600">{lawyer.specialty}</p>
                          <p className="text-xs text-gray-500 mt-1">{lawyer.activeCases} casos activos</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="mb-4">
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide mb-1">Notas para el letrado</label>
                    <textarea
                      value={assignmentNotes}
                      onChange={(e) => setAssignmentNotes(e.target.value)}
                      placeholder="Escribe notas o instrucciones..."
                      rows={3}
                      className="w-full px-3 py-2 text-sm text-gray-900 bg-white border border-gray-300 focus:border-gray-500 focus:ring-0 focus:outline-none transition-colors resize-none"
                    />
                  </div>
                </div>
                <div className="px-4 py-3 bg-gray-100 border-t border-gray-300">
                  <button
                    onClick={handleAssignLawyer}
                    disabled={!selectedLawyer}
                    className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-gray-800 text-white text-sm font-semibold hover:bg-gray-900 disabled:bg-gray-300 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2 transition-colors"
                  >
                    <UserCheck className="w-4 h-4" aria-hidden="true" />
                    Asignar y Notificar
                  </button>
                </div>
              </div>
            ) : (
              <div className="bg-white border border-gray-300">
                <div className="px-4 py-3 border-b border-gray-300">
                  <h2 className="text-sm font-bold text-gray-900 uppercase tracking-wide">
                    Letrado Asignado
                  </h2>
                </div>
                <div className="p-4">
                  {assignedLawyer && (
                    <>
                      <div className="bg-green-100 border border-green-300 p-3 mb-4">
                        <div className="flex items-center gap-2 mb-1">
                          <CheckCircle className="w-4 h-4 text-green-700" aria-hidden="true" />
                          <p className="text-sm font-semibold text-green-800">Caso asignado</p>
                        </div>
                        <p className="text-xs text-green-700">Fecha de asignación: {assignmentDate}</p>
                      </div>
                      <div className="space-y-3">
                        <div>
                          <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide mb-1">Nombre</label>
                          <p className="text-sm text-gray-900">{assignedLawyer.name}</p>
                        </div>
                        <div>
                          <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide mb-1">Especialidad</label>
                          <p className="text-sm text-gray-900">{assignedLawyer.specialty}</p>
                        </div>
                        <div>
                          <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide mb-1">Email</label>
                          <p className="text-sm text-gray-900 flex items-center gap-2">
                            <Mail className="w-4 h-4 text-gray-500" aria-hidden="true" />
                            {assignedLawyer.email}
                          </p>
                        </div>
                        <div>
                          <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide mb-1">Casos activos</label>
                          <p className="text-sm text-gray-900">{assignedLawyer.activeCases} casos</p>
                        </div>
                      </div>
                    </>
                  )}
                </div>
                <div className="px-4 py-3 bg-gray-100 border-t border-gray-300">
                  <button
                    onClick={handleReassign}
                    className="w-full px-4 py-2 bg-white text-gray-800 text-sm font-semibold border border-gray-300 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 transition-colors"
                  >
                    Reasignar
                  </button>
                </div>
              </div>
            )}

            {/* Acciones */}
            <div className="bg-white border border-gray-300">
              <div className="px-4 py-3 border-b border-gray-300">
                <h2 className="text-sm font-bold text-gray-900 uppercase tracking-wide">
                  Acciones
                </h2>
              </div>
              <div className="p-4 space-y-2">
                <button className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-white text-gray-800 text-sm font-semibold border border-gray-300 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 transition-colors">
                  <Plus className="w-4 h-4" aria-hidden="true" />
                  Nuevo Documento
                </button>
                <button className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-white text-gray-800 text-sm font-semibold border border-gray-300 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 transition-colors">
                  <Plus className="w-4 h-4" aria-hidden="true" />
                  Nueva Nota
                </button>
                <button className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-white text-green-700 text-sm font-semibold border border-green-300 hover:bg-green-50 focus:outline-none focus:ring-2 focus:ring-green-500 transition-colors">
                  <CheckCircle className="w-4 h-4" aria-hidden="true" />
                  Marcar como resuelta
                </button>
                <button className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-red-700 text-white text-sm font-semibold hover:bg-red-800 focus:outline-none focus:ring-2 focus:ring-red-700 focus:ring-offset-2 transition-colors">
                  <XCircle className="w-4 h-4" aria-hidden="true" />
                  Rechazar solicitud
                </button>
              </div>
            </div>
          </div>
        </div>

        <PageFooter />
      </div>
    </div>
  );
}
