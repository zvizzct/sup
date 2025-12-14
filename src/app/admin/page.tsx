"use client";

import { useState } from "react";
import Link from "next/link";
import { Users, FileText, Scale, FolderOpen, Clock, ArrowRight, Eye } from "lucide-react";
import { ActionBar } from "@/components/admin/ActionBar";
import { UrgencyBadge } from "@/components/shared/Badge";
import { PageFooter } from "@/components/admin/PageFooter";
import { formatDate } from "@/lib/shared/format";

const mockSolicitudes = [
  {
    id: "SOL-2024-0156",
    referencia: "SOL-2024-0156",
    afiliado: "García Martínez, Juan Carlos",
    tipo: "Asesoramiento Disciplinario",
    urgencia: "Alta" as const,
    fecha: "2024-12-12",
  },
  {
    id: "SOL-2024-0155",
    referencia: "SOL-2024-0155",
    afiliado: "Rodríguez López, María Elena",
    tipo: "Accidente Laboral",
    urgencia: "Alta" as const,
    fecha: "2024-12-12",
  },
  {
    id: "SOL-2024-0154",
    referencia: "SOL-2024-0154",
    afiliado: "Fernández Sánchez, Pedro",
    tipo: "Consulta Legal",
    urgencia: "Normal" as const,
    fecha: "2024-12-11",
  },
  {
    id: "SOL-2024-0153",
    referencia: "SOL-2024-0153",
    afiliado: "Martínez Pérez, Ana Isabel",
    tipo: "Recurso Administrativo",
    urgencia: "Normal" as const,
    fecha: "2024-12-11",
  },
  {
    id: "SOL-2024-0152",
    referencia: "SOL-2024-0152",
    afiliado: "López García, Carlos",
    tipo: "Asesoramiento Laboral",
    urgencia: "Baja" as const,
    fecha: "2024-12-10",
  },
];

const mockActividad = [
  {
    id: 1,
    accion: "Nuevo afiliado registrado",
    detalles: "García Ruiz, Antonio - DNI: 12345678A",
    usuario: "Admin SUP",
    fecha: "Hace 15 minutos",
  },
  {
    id: 2,
    accion: "Documento subido",
    detalles: "Convenio Colectivo 2024 - Policía Nacional.pdf",
    usuario: "María González",
    fecha: "Hace 1 hora",
  },
  {
    id: 3,
    accion: "Solicitud aprobada",
    detalles: "SOL-2024-0148 - Asesoramiento Disciplinario",
    usuario: "Juan Martínez",
    fecha: "Hace 2 horas",
  },
  {
    id: 4,
    accion: "Caso cerrado",
    detalles: "CASO-2024-0089 - Recurso contra sanción",
    usuario: "Laura Fernández",
    fecha: "Hace 3 horas",
  },
  {
    id: 5,
    accion: "Comunicación enviada",
    detalles: "Boletín informativo - Diciembre 2024",
    usuario: "Admin SUP",
    fecha: "Hace 4 horas",
  },
];

export default function AdminDashboard() {
  const [currentDate] = useState(() => {
    const now = new Date();
    return now.toLocaleDateString("es-ES", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  });

  return (
    <div className="min-h-screen bg-gray-100">
      <ActionBar
        title="Dashboard"
        subtitle={currentDate}
      />

      {/* Content */}
      <div className="p-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {/* Afiliados Activos */}
          <div className="bg-white border border-gray-300">
            <div className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-bold text-gray-700 uppercase tracking-wide">
                    Afiliados Activos
                  </p>
                  <p className="mt-2 text-2xl font-bold text-gray-900 tabular-nums">
                    1.234
                  </p>
                </div>
                <div className="p-2 bg-gray-100">
                  <Users className="w-6 h-6 text-gray-700" aria-hidden="true" />
                </div>
              </div>
            </div>
          </div>

          {/* Solicitudes Pendientes */}
          <div className="bg-white border border-gray-300">
            <div className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-bold text-gray-700 uppercase tracking-wide">
                    Solicitudes Pendientes
                  </p>
                  <p className="mt-2 text-2xl font-bold text-amber-700 tabular-nums">
                    23
                  </p>
                </div>
                <div className="p-2 bg-amber-100">
                  <Scale className="w-6 h-6 text-amber-700" aria-hidden="true" />
                </div>
              </div>
            </div>
          </div>

          {/* Casos Abiertos */}
          <div className="bg-white border border-gray-300">
            <div className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-bold text-gray-700 uppercase tracking-wide">
                    Casos Abiertos
                  </p>
                  <p className="mt-2 text-2xl font-bold text-gray-900 tabular-nums">
                    8
                  </p>
                </div>
                <div className="p-2 bg-gray-100">
                  <FolderOpen className="w-6 h-6 text-gray-700" aria-hidden="true" />
                </div>
              </div>
            </div>
          </div>

          {/* Documentos Este Mes */}
          <div className="bg-white border border-gray-300">
            <div className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-bold text-gray-700 uppercase tracking-wide">
                    Documentos Este Mes
                  </p>
                  <p className="mt-2 text-2xl font-bold text-gray-900 tabular-nums">
                    156
                  </p>
                </div>
                <div className="p-2 bg-gray-100">
                  <FileText className="w-6 h-6 text-gray-700" aria-hidden="true" />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Solicitudes Pendientes Table */}
          <div className="lg:col-span-2">
            <div className="bg-white border border-gray-300">
              <div className="px-4 py-3 border-b border-gray-300 flex items-center justify-between">
                <h2 className="text-sm font-bold text-gray-900 uppercase tracking-wide">
                  Solicitudes Pendientes
                </h2>
                <Link
                  href="/admin/solicitudes"
                  className="text-sm text-gray-700 hover:text-gray-900 font-medium underline focus:outline-none focus:ring-2 focus:ring-gray-500"
                >
                  Ver todas
                </Link>
              </div>

              {/* Table Header */}
              <div className="grid grid-cols-12 gap-2 px-4 py-2 bg-gray-100 text-xs font-bold text-gray-700 uppercase tracking-wide border-b border-gray-300">
                <div className="col-span-1">Ref.</div>
                <div className="col-span-3">Afiliado</div>
                <div className="col-span-2">Tipo</div>
                <div className="col-span-2">Urgencia</div>
                <div className="col-span-2">Fecha</div>
                <div className="col-span-2 text-right">Acciones</div>
              </div>

              {/* Table Body */}
              <div className="divide-y divide-gray-200">
                {mockSolicitudes.map((solicitud) => (
                  <div
                    key={solicitud.id}
                    className="grid grid-cols-12 gap-2 px-4 py-3 items-center hover:bg-gray-50 transition-colors"
                  >
                    <div className="col-span-1">
                      <span className="text-sm font-mono font-semibold text-gray-900">
                        {solicitud.referencia.split("-").pop()}
                      </span>
                    </div>
                    <div className="col-span-3">
                      <span className="text-sm text-gray-900 truncate block">
                        {solicitud.afiliado}
                      </span>
                    </div>
                    <div className="col-span-2">
                      <span className="text-sm text-gray-700 truncate block">
                        {solicitud.tipo}
                      </span>
                    </div>
                    <div className="col-span-2">
                      <UrgencyBadge urgency={solicitud.urgencia} />
                    </div>
                    <div className="col-span-2">
                      <span className="text-sm text-gray-600 tabular-nums">
                        {formatDate(solicitud.fecha)}
                      </span>
                    </div>
                    <div className="col-span-2 flex items-center justify-end gap-1">
                      <Link
                        href={`/admin/solicitudes/${solicitud.id}`}
                        className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-200 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-500"
                        title="Ver detalle"
                      >
                        <Eye className="w-4 h-4" />
                      </Link>
                    </div>
                  </div>
                ))}
              </div>

              {/* Table Footer */}
              <div className="px-4 py-2 bg-gray-100 border-t border-gray-300">
                <Link
                  href="/admin/solicitudes"
                  className="flex items-center gap-1 text-sm text-gray-700 hover:text-gray-900 font-medium focus:outline-none focus:ring-2 focus:ring-gray-500"
                >
                  Ver todas las solicitudes
                  <ArrowRight className="w-4 h-4" aria-hidden="true" />
                </Link>
              </div>
            </div>
          </div>

          {/* Actividad Reciente */}
          <div className="lg:col-span-1">
            <div className="bg-white border border-gray-300">
              <div className="px-4 py-3 border-b border-gray-300">
                <h2 className="text-sm font-bold text-gray-900 uppercase tracking-wide">
                  Actividad Reciente
                </h2>
              </div>
              <div className="p-4">
                <div className="space-y-4">
                  {mockActividad.map((item, index) => (
                    <div key={item.id} className="relative">
                      {index !== mockActividad.length - 1 && (
                        <span
                          className="absolute top-6 left-3 h-full w-px bg-gray-200"
                          aria-hidden="true"
                        />
                      )}
                      <div className="flex gap-3">
                        <div className="flex-shrink-0">
                          <span className="h-6 w-6 bg-gray-100 flex items-center justify-center">
                            <Clock className="h-3 w-3 text-gray-600" aria-hidden="true" />
                          </span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-900">
                            {item.accion}
                          </p>
                          <p className="text-xs text-gray-600 truncate">
                            {item.detalles}
                          </p>
                          <p className="text-xs text-gray-500 mt-0.5">
                            {item.usuario} · {item.fecha}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="px-4 py-2 bg-gray-100 border-t border-gray-300">
                <button className="text-sm text-gray-700 hover:text-gray-900 font-medium underline focus:outline-none focus:ring-2 focus:ring-gray-500">
                  Ver toda la actividad
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
