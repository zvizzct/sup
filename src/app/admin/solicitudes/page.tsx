"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ActionBar } from "@/components/admin/ActionBar";
import { UrgencyBadge, CategoryBadge, getUrgencyBarColor, Badge, UrgencyType } from "@/components/shared/Badge";
import { PageFooter } from "@/components/admin/PageFooter";
import { ResultsCount } from "@/components/shared/ResultsCount";
import { EmptyState } from "@/components/shared/EmptyState";

type Status = "Nueva" | "Asignada" | "En trámite" | "Resuelta";
type RequestType =
  | "Expediente disciplinario"
  | "Recurso de alzada"
  | "Tema penal"
  | "Accidente tráfico"
  | "Asesoramiento laboral"
  | "Reclamación patrimonial";

interface LawyerRequest {
  id: string;
  reference: string;
  urgency: UrgencyType;
  affiliateName: string;
  tip: string;
  requestType: RequestType;
  description: string;
  timeAgo: string;
  status: Status;
  assignedTo?: string;
}

const MOCK_REQUESTS: LawyerRequest[] = [
  { id: "1", reference: "SA-2024-1247", urgency: "Alta", affiliateName: "Juan Carlos Martínez López", tip: "12345-A", requestType: "Expediente disciplinario", description: "Expediente sancionador por presunta falta grave. Necesito representación urgente para alegaciones que vencen en 48 horas.", timeAgo: "Hace 2 horas", status: "Nueva" },
  { id: "2", reference: "SA-2024-1246", urgency: "Normal", affiliateName: "María Dolores García Ruiz", tip: "23456-B", requestType: "Tema penal", description: "Denuncia por agresión en acto de servicio. Requiero asesoramiento sobre procedimiento a seguir y posible representación.", timeAgo: "Hace 5 horas", status: "Asignada", assignedTo: "Dr. Antonio Fernández" },
  { id: "3", reference: "SA-2024-1245", urgency: "Normal", affiliateName: "Pedro Sánchez Moreno", tip: "34567-C", requestType: "Recurso de alzada", description: "Recurso contra resolución denegatoria de solicitud de traslado. Necesito revisión de documentación y preparación del recurso.", timeAgo: "Hace 1 día", status: "En trámite", assignedTo: "Dra. Carmen López" },
  { id: "4", reference: "SA-2024-1244", urgency: "Alta", affiliateName: "Ana Isabel Rodríguez Pérez", tip: "45678-D", requestType: "Accidente tráfico", description: "Accidente in itinere con lesiones graves. Necesito urgentemente iniciar reclamación y gestión con aseguradora.", timeAgo: "Hace 3 horas", status: "Nueva" },
  { id: "5", reference: "SA-2024-1243", urgency: "Baja", affiliateName: "Francisco Javier Muñoz", tip: "56789-E", requestType: "Asesoramiento laboral", description: "Consulta sobre condiciones de jubilación anticipada y cálculo de pensión. Solicito asesoramiento sobre opciones disponibles.", timeAgo: "Hace 2 días", status: "Asignada", assignedTo: "Dr. Miguel Ángel Torres" },
  { id: "6", reference: "SA-2024-1242", urgency: "Normal", affiliateName: "Isabel Martín González", tip: "67890-F", requestType: "Expediente disciplinario", description: "Apertura de expediente por retrasos reiterados. Necesito preparar defensa y documentación justificativa.", timeAgo: "Hace 1 día", status: "Nueva" },
  { id: "7", reference: "SA-2024-1241", urgency: "Baja", affiliateName: "Roberto Fernández Silva", tip: "78901-G", requestType: "Reclamación patrimonial", description: "Reclamación por daños materiales en vehículo oficial durante servicio. Requiero asesoramiento para presentación de reclamación.", timeAgo: "Hace 3 días", status: "En trámite", assignedTo: "Dr. Antonio Fernández" },
  { id: "8", reference: "SA-2024-1240", urgency: "Normal", affiliateName: "Carmen López Jiménez", tip: "89012-H", requestType: "Tema penal", description: "Citación judicial como investigado por denuncia de particular. Necesito representación legal para declaración.", timeAgo: "Hace 4 horas", status: "Asignada", assignedTo: "Dra. Carmen López" },
  { id: "9", reference: "SA-2024-1239", urgency: "Alta", affiliateName: "José Luis Romero Castro", tip: "90123-I", requestType: "Expediente disciplinario", description: "Expediente muy grave por presunto incumplimiento de órdenes. Urgente preparación de defensa con vista en 5 días.", timeAgo: "Hace 1 hora", status: "Nueva" },
  { id: "10", reference: "SA-2024-1238", urgency: "Baja", affiliateName: "Lucía Díaz Morales", tip: "01234-J", requestType: "Asesoramiento laboral", description: "Consulta sobre compatibilidad de segunda actividad. Solicito informe sobre normativa aplicable.", timeAgo: "Hace 5 días", status: "Resuelta", assignedTo: "Dr. Miguel Ángel Torres" },
];

const TOTAL_REQUESTS = 10;

export default function SolicitudesPage() {
  const [activeTab, setActiveTab] = useState<"Nuevas" | "Asignadas" | "En trámite" | "Resueltas" | "Todas">("Nuevas");

  const getFilteredRequests = () => {
    switch (activeTab) {
      case "Nuevas": return MOCK_REQUESTS.filter((req) => req.status === "Nueva");
      case "Asignadas": return MOCK_REQUESTS.filter((req) => req.status === "Asignada");
      case "En trámite": return MOCK_REQUESTS.filter((req) => req.status === "En trámite");
      case "Resueltas": return MOCK_REQUESTS.filter((req) => req.status === "Resuelta");
      case "Todas": return MOCK_REQUESTS;
      default: return MOCK_REQUESTS;
    }
  };

  const getCount = (tab: string) => {
    switch (tab) {
      case "Nuevas": return MOCK_REQUESTS.filter((req) => req.status === "Nueva").length;
      case "Asignadas": return MOCK_REQUESTS.filter((req) => req.status === "Asignada").length;
      case "En trámite": return MOCK_REQUESTS.filter((req) => req.status === "En trámite").length;
      case "Resueltas": return MOCK_REQUESTS.filter((req) => req.status === "Resuelta").length;
      case "Todas": return MOCK_REQUESTS.length;
      default: return 0;
    }
  };

  const filteredRequests = getFilteredRequests();

  return (
    <div className="min-h-screen bg-gray-100">
      <ActionBar
        title="Solicitudes de Abogado"
        subtitle="Gestión de solicitudes de asesoramiento jurídico"
      />

      {/* Content */}
      <div className="p-6">
        {/* Tab Filters */}
        <div className="bg-white border border-gray-300 mb-4">
          <div className="flex">
            {(["Nuevas", "Asignadas", "En trámite", "Resueltas", "Todas"] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex items-center gap-2 px-4 py-3 text-sm font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-inset focus:ring-gray-500 ${
                  activeTab === tab
                    ? "bg-gray-800 text-white"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                {tab}
                <span className={`inline-block px-2 py-0.5 text-xs font-semibold ${
                  activeTab === tab
                    ? "bg-white/20 text-white"
                    : "bg-gray-200 text-gray-700"
                }`}>
                  {getCount(tab)}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-2">
          <ResultsCount
            current={filteredRequests.length}
            total={TOTAL_REQUESTS}
            label="solicitudes"
          />
        </div>

        {/* Request Cards */}
        <div className="space-y-1">
          {filteredRequests.length === 0 ? (
            <EmptyState message="No se encontraron solicitudes" />
          ) : (
            filteredRequests.map((request) => (
              <div
                key={request.id}
                className="bg-white border border-gray-300 hover:shadow-md transition-shadow overflow-hidden"
              >
                <div className="flex">
                  {/* Urgency Indicator Bar */}
                  <div className={`w-1 flex-shrink-0 ${getUrgencyBarColor(request.urgency)}`} />

                  {/* Card Content */}
                  <div className="flex-1 p-4">
                    {/* Header Row */}
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center gap-3">
                        <span className="text-sm font-mono font-semibold text-gray-900">
                          {request.reference}
                        </span>
                        <UrgencyBadge urgency={request.urgency} />
                      </div>
                      <span className="text-xs text-gray-500">
                        {request.timeAgo}
                      </span>
                    </div>

                    {/* Affiliate Info */}
                    <div className="mb-2">
                      <h3 className="text-sm font-medium text-gray-900">
                        {request.affiliateName}
                      </h3>
                      <p className="text-xs text-gray-600">TIP: {request.tip}</p>
                    </div>

                    {/* Request Type */}
                    <div className="mb-2">
                      <CategoryBadge category={request.requestType} />
                    </div>

                    {/* Description */}
                    <p className="text-sm text-gray-700 mb-3 line-clamp-2">
                      {request.description}
                    </p>

                    {/* Footer Row */}
                    <div className="flex items-center justify-between pt-3 border-t border-gray-200">
                      <div>
                        {request.assignedTo ? (
                          <span className="text-xs text-gray-700">
                            <span className="font-medium">Asignado a:</span> {request.assignedTo}
                          </span>
                        ) : (
                          <Badge color="amber">Sin asignar</Badge>
                        )}
                      </div>
                      <Link
                        href={`/admin/solicitudes/${request.id}`}
                        className="flex items-center gap-2 px-4 py-2 bg-gray-800 text-white text-sm font-semibold hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2 transition-colors"
                      >
                        Ver detalle
                        <ArrowRight className="w-4 h-4" aria-hidden="true" />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        <PageFooter />
      </div>
    </div>
  );
}
