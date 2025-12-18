"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Mail,
  Phone,
  MapPin,
  Calendar,
  FileText,
  ChevronDown,
  Edit2,
  UserX,
  Plus,
  ArrowRight,
} from "lucide-react";
import { ActionBar, ActionButton } from "@/components/admin/ActionBar";
import { StatusBadge, Badge } from "@/components/shared/Badge";
import { PageFooter } from "@/components/admin/PageFooter";
import { EmptyState } from "@/components/shared/EmptyState";

const affiliateData = {
  tip: "12345",
  nombre: "Juan García López",
  dni: "12345678A",
  email: "juan.garcia@email.com",
  telefono: "612 345 678",
  destino: "Comisaría Provincial de Barcelona",
  fechaAlta: "01/03/2010",
  antiguedadCNP: "15 años",
  estado: "Activo" as const,
  cuotas: "Al día" as const,
};

const expedientes = [
  { title: "Expedientes Disciplinarios", count: 2 },
  { title: "Recursos Contencioso-Admin", count: 1 },
  { title: "Expedientes Administrativos", count: 5 },
  { title: "Actos de Servicio", count: 12 },
  { title: "Asuntos Personales", count: 3 },
];

const solicitudesAbogado = [
  { fecha: "10/12/2024", tipo: "Disciplinario", estado: "En trámite" },
  { fecha: "05/11/2024", tipo: "Contencioso", estado: "Resuelta" },
  { fecha: "22/10/2024", tipo: "Administrativo", estado: "Resuelta" },
];

interface AccordionItemProps {
  title: string;
  count: number;
  isOpen: boolean;
  onToggle: () => void;
}

function AccordionItem({ title, count, isOpen, onToggle }: AccordionItemProps) {
  return (
    <div className="bg-white border border-gray-300">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between px-4 py-3 text-left hover:bg-gray-50 focus:outline-none focus:bg-gray-100 transition-colors"
        aria-expanded={isOpen}
      >
        <div className="flex items-center gap-3">
          <FileText className="w-4 h-4 text-gray-600" aria-hidden="true" />
          <span className="text-sm font-bold text-gray-900 uppercase tracking-wide">
            {title}
          </span>
          <span className="inline-block px-2 py-0.5 text-xs font-semibold bg-gray-200 text-gray-700 border border-gray-300">
            {count}
          </span>
        </div>
        <ChevronDown
          className={`w-5 h-5 text-gray-600 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
          aria-hidden="true"
        />
      </button>
      {isOpen && (
        <div className="px-4 py-3 border-t border-gray-300 bg-gray-100">
          <EmptyState message="No se encontraron expedientes" />
        </div>
      )}
    </div>
  );
}

export default function AffiliateDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const [openAccordions, setOpenAccordions] = useState<Set<number>>(new Set());
  const [notasInternas, setNotasInternas] = useState("");

  const toggleAccordion = (index: number) => {
    const newSet = new Set(openAccordions);
    if (newSet.has(index)) {
      newSet.delete(index);
    } else {
      newSet.add(index);
    }
    setOpenAccordions(newSet);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <ActionBar
        title={affiliateData.nombre}
        subtitle={`TIP: ${affiliateData.tip}`}
        backHref="/admin/afiliados"
        badges={<StatusBadge status={affiliateData.estado} />}
        actions={
          <>
            <ActionButton
              variant="secondary"
              icon={<Edit2 className="w-4 h-4" aria-hidden="true" />}
            >
              <span className="hidden sm:inline">Editar</span>
            </ActionButton>
            <button className="flex items-center gap-2 px-3 sm:px-4 py-2 bg-white text-red-700 text-sm font-semibold border border-red-300 hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-red-500 transition-colors">
              <UserX className="w-4 h-4" aria-hidden="true" />
              <span className="hidden sm:inline">Desactivar</span>
            </button>
          </>
        }
      />

      <div className="p-4 sm:p-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
          {/* Left column - 2/3 width */}
          <div className="lg:col-span-2 space-y-4">
            {/* Datos Personales */}
            <div className="bg-white border border-gray-300">
              <div className="px-4 py-3 border-b border-gray-300">
                <h2 className="text-sm font-bold text-gray-900 uppercase tracking-wide">
                  Datos Personales
                </h2>
              </div>
              <div className="p-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide mb-1">
                      Nombre Completo
                    </label>
                    <p className="text-sm text-gray-900">
                      {affiliateData.nombre}
                    </p>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide mb-1">
                      TIP
                    </label>
                    <p className="text-sm font-mono text-gray-900">
                      {affiliateData.tip}
                    </p>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide mb-1">
                      DNI
                    </label>
                    <p className="text-sm text-gray-900">
                      {affiliateData.dni}
                    </p>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide mb-1">
                      Email
                    </label>
                    <p className="text-sm text-gray-900 flex items-center gap-2">
                      <Mail className="w-4 h-4 text-gray-500" aria-hidden="true" />
                      {affiliateData.email}
                    </p>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide mb-1">
                      Teléfono
                    </label>
                    <p className="text-sm text-gray-900 flex items-center gap-2">
                      <Phone className="w-4 h-4 text-gray-500" aria-hidden="true" />
                      {affiliateData.telefono}
                    </p>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide mb-1">
                      Destino Actual
                    </label>
                    <p className="text-sm text-gray-900 flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-gray-500" aria-hidden="true" />
                      {affiliateData.destino}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Historial de Afiliación */}
            <div className="bg-white border border-gray-300">
              <div className="px-4 py-3 border-b border-gray-300">
                <h2 className="text-sm font-bold text-gray-900 uppercase tracking-wide">
                  Historial de Afiliación
                </h2>
              </div>
              <div className="p-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide mb-1">
                      Fecha de Alta
                    </label>
                    <p className="text-sm text-gray-900 flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-gray-500" aria-hidden="true" />
                      {affiliateData.fechaAlta}
                    </p>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide mb-1">
                      Antigüedad en CNP
                    </label>
                    <p className="text-sm text-gray-900">
                      {affiliateData.antiguedadCNP}
                    </p>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide mb-1">
                      Estado de Cuotas
                    </label>
                    <Badge color={affiliateData.cuotas === "Al día" ? "green" : "amber"}>
                      {affiliateData.cuotas}
                    </Badge>
                  </div>
                </div>
              </div>
            </div>

            {/* Expedientes */}
            <div>
              <div className="mb-2">
                <h2 className="text-sm font-bold text-gray-900 uppercase tracking-wide">
                  Expedientes
                </h2>
              </div>
              <div className="space-y-1">
                {expedientes.map((expediente, index) => (
                  <AccordionItem
                    key={index}
                    title={expediente.title}
                    count={expediente.count}
                    isOpen={openAccordions.has(index)}
                    onToggle={() => toggleAccordion(index)}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Right column - 1/3 width */}
          <div className="space-y-4">
            {/* Solicitudes de Abogado */}
            <div className="bg-white border border-gray-300">
              <div className="px-4 py-3 border-b border-gray-300">
                <h2 className="text-sm font-bold text-gray-900 uppercase tracking-wide">
                  Solicitudes de Abogado
                </h2>
              </div>
              <div className="divide-y divide-gray-200">
                {solicitudesAbogado.map((solicitud, index) => (
                  <div key={index} className="px-4 py-3">
                    <div className="flex items-start justify-between mb-1">
                      <span className="text-sm font-medium text-gray-900">
                        {solicitud.tipo}
                      </span>
                      <StatusBadge status={solicitud.estado as "En trámite" | "Resuelta"} />
                    </div>
                    <p className="text-xs text-gray-600">{solicitud.fecha}</p>
                  </div>
                ))}
              </div>
              <div className="px-4 py-3 bg-gray-100 border-t border-gray-300">
                <button className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-gray-800 text-white text-sm font-semibold hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2 transition-colors">
                  <Plus className="w-4 h-4" aria-hidden="true" />
                  Nueva Solicitud
                </button>
              </div>
            </div>

            {/* Notas Internas */}
            <div className="bg-white border border-gray-300">
              <div className="px-4 py-3 border-b border-gray-300">
                <h2 className="text-sm font-bold text-gray-900 uppercase tracking-wide">
                  Notas Internas
                </h2>
              </div>
              <div className="p-4">
                <textarea
                  value={notasInternas}
                  onChange={(e) => setNotasInternas(e.target.value)}
                  placeholder="Escribe una nota interna..."
                  rows={5}
                  className="w-full px-3 py-2 text-sm text-gray-900 bg-white border border-gray-300 focus:border-gray-500 focus:ring-0 focus:outline-none transition-colors resize-none"
                />
              </div>
              <div className="px-4 py-3 bg-gray-100 border-t border-gray-300">
                <button className="w-full px-4 py-2 bg-white text-gray-800 text-sm font-semibold border border-gray-300 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 transition-colors">
                  Guardar Nota
                </button>
              </div>
            </div>

            {/* Acciones Rápidas */}
            <div className="bg-white border border-gray-300">
              <div className="px-4 py-3 border-b border-gray-300">
                <h2 className="text-sm font-bold text-gray-900 uppercase tracking-wide">
                  Acciones
                </h2>
              </div>
              <nav className="p-2" aria-label="Acciones rápidas">
                <Link
                  href={`/admin/afiliados/${params.id}/documentos`}
                  className="flex items-center justify-between px-3 py-2 text-sm text-gray-800 hover:bg-gray-100 font-medium focus:outline-none focus:ring-2 focus:ring-gray-500 transition-colors"
                >
                  <span>Ver Documentos</span>
                  <ArrowRight className="w-4 h-4 text-gray-500" aria-hidden="true" />
                </Link>
                <Link
                  href={`/admin/afiliados/${params.id}/expedientes`}
                  className="flex items-center justify-between px-3 py-2 text-sm text-gray-800 hover:bg-gray-100 font-medium focus:outline-none focus:ring-2 focus:ring-gray-500 transition-colors"
                >
                  <span>Ver Expedientes</span>
                  <ArrowRight className="w-4 h-4 text-gray-500" aria-hidden="true" />
                </Link>
                <Link
                  href={`/admin/afiliados/${params.id}/cuotas`}
                  className="flex items-center justify-between px-3 py-2 text-sm text-gray-800 hover:bg-gray-100 font-medium focus:outline-none focus:ring-2 focus:ring-gray-500 transition-colors"
                >
                  <span>Gestionar Cuotas</span>
                  <ArrowRight className="w-4 h-4 text-gray-500" aria-hidden="true" />
                </Link>
                <Link
                  href={`/admin/afiliados/${params.id}/historial`}
                  className="flex items-center justify-between px-3 py-2 text-sm text-gray-800 hover:bg-gray-100 font-medium focus:outline-none focus:ring-2 focus:ring-gray-500 transition-colors"
                >
                  <span>Historial Completo</span>
                  <ArrowRight className="w-4 h-4 text-gray-500" aria-hidden="true" />
                </Link>
              </nav>
            </div>
          </div>
        </div>

        <PageFooter />
      </div>
    </div>
  );
}
