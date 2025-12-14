"use client";

import { useState } from "react";
import Link from "next/link";
import { Download, Plus, Search, Eye, Edit2, ChevronLeft, ChevronRight } from "lucide-react";
import { ActionBar, ActionButton } from "@/components/admin/ActionBar";
import { StatusBadge, StatusType } from "@/components/shared/Badge";
import { PageFooter } from "@/components/admin/PageFooter";
import { ResultsCount } from "@/components/shared/ResultsCount";
import { EmptyState } from "@/components/shared/EmptyState";
import { formatDate } from "@/lib/shared/format";

type EstadoAfiliado = "Activo" | "Inactivo" | "Pendiente";

interface Afiliado {
  id: string;
  tip: string;
  nombreCompleto: string;
  destino: string;
  email: string;
  fechaAlta: string;
  estado: EstadoAfiliado;
}

const MOCK_AFILIADOS: Afiliado[] = [
  {
    id: "1",
    tip: "45231",
    nombreCompleto: "García Martínez, Juan Carlos",
    destino: "Comisaría Provincial de Barcelona",
    email: "jc.garcia@policia.es",
    fechaAlta: "2023-01-15",
    estado: "Activo",
  },
  {
    id: "2",
    tip: "38947",
    nombreCompleto: "Rodríguez López, María del Carmen",
    destino: "Comisaría Provincial de Madrid",
    email: "mc.rodriguez@policia.es",
    fechaAlta: "2022-06-20",
    estado: "Activo",
  },
  {
    id: "3",
    tip: "52103",
    nombreCompleto: "Fernández Sánchez, Antonio",
    destino: "TEDAX-NRBQ",
    email: "a.fernandez@policia.es",
    fechaAlta: "2024-03-10",
    estado: "Activo",
  },
  {
    id: "4",
    tip: "29384",
    nombreCompleto: "Pérez Gómez, Isabel",
    destino: "Comisaría Provincial de Valencia",
    email: "i.perez@policia.es",
    fechaAlta: "2021-11-05",
    estado: "Inactivo",
  },
  {
    id: "5",
    tip: "61728",
    nombreCompleto: "Martín Ruiz, Francisco Javier",
    destino: "GEO - Grupo Especial de Operaciones",
    email: "fj.martin@policia.es",
    fechaAlta: "2024-08-22",
    estado: "Activo",
  },
  {
    id: "6",
    tip: "43567",
    nombreCompleto: "González Díaz, Ana Belén",
    destino: "Comisaría Provincial de Sevilla",
    email: "ab.gonzalez@policia.es",
    fechaAlta: "2020-04-18",
    estado: "Activo",
  },
  {
    id: "7",
    tip: "18492",
    nombreCompleto: "López Hernández, Miguel Ángel",
    destino: "Brigada Provincial de Policía Científica",
    email: "ma.lopez@policia.es",
    fechaAlta: "2019-09-30",
    estado: "Pendiente",
  },
  {
    id: "8",
    tip: "57834",
    nombreCompleto: "Sánchez Moreno, Carmen",
    destino: "Comisaría Provincial de Bilbao",
    email: "c.sanchez@policia.es",
    fechaAlta: "2023-12-01",
    estado: "Activo",
  },
  {
    id: "9",
    tip: "34921",
    nombreCompleto: "Jiménez Torres, Rafael",
    destino: "Unidad de Intervención Policial (UIP)",
    email: "r.jimenez@policia.es",
    fechaAlta: "2022-02-14",
    estado: "Activo",
  },
  {
    id: "10",
    tip: "46785",
    nombreCompleto: "Navarro Romero, Lucía",
    destino: "Comisaría Provincial de Zaragoza",
    email: "l.navarro@policia.es",
    fechaAlta: "2021-07-08",
    estado: "Activo",
  },
];

const DESTINOS = [
  "Todos",
  "Comisaría Provincial de Barcelona",
  "Comisaría Provincial de Madrid",
  "Comisaría Provincial de Valencia",
  "Comisaría Provincial de Sevilla",
  "Comisaría Provincial de Bilbao",
  "Comisaría Provincial de Zaragoza",
  "TEDAX-NRBQ",
  "GEO - Grupo Especial de Operaciones",
  "Brigada Provincial de Policía Científica",
  "Unidad de Intervención Policial (UIP)",
];

const ESTADOS: (EstadoAfiliado | "Todos")[] = [
  "Todos",
  "Activo",
  "Inactivo",
  "Pendiente",
];

export default function AfiliadosPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedEstado, setSelectedEstado] = useState<EstadoAfiliado | "Todos">("Todos");
  const [selectedDestino, setSelectedDestino] = useState("Todos");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const filteredAfiliados = MOCK_AFILIADOS.filter((afiliado) => {
    const matchesSearch =
      searchQuery === "" ||
      afiliado.nombreCompleto.toLowerCase().includes(searchQuery.toLowerCase()) ||
      afiliado.tip.includes(searchQuery) ||
      afiliado.email.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesEstado =
      selectedEstado === "Todos" || afiliado.estado === selectedEstado;

    const matchesDestino =
      selectedDestino === "Todos" || afiliado.destino === selectedDestino;

    return matchesSearch && matchesEstado && matchesDestino;
  });

  const totalPages = Math.ceil(filteredAfiliados.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentAfiliados = filteredAfiliados.slice(startIndex, endIndex);

  return (
    <div className="min-h-screen bg-gray-100">
      <ActionBar
        title="Gestión de Afiliados"
        subtitle="Gestión de afiliados del sindicato"
        actions={
          <>
            <ActionButton
              variant="secondary"
              icon={<Download className="w-4 h-4" aria-hidden="true" />}
              onClick={() => console.log("Exporting...")}
            >
              Exportar
            </ActionButton>
            <Link
              href="/admin/afiliados/nuevo"
              className="flex items-center gap-2 px-4 py-2 bg-gray-800 text-white text-sm font-semibold hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2 transition-colors"
            >
              <Plus className="w-4 h-4" aria-hidden="true" />
              Nuevo Afiliado
            </Link>
          </>
        }
      />

      {/* Content */}
      <div className="p-6">
        {/* Filters */}
        <div className="bg-white border border-gray-300 p-4 mb-4">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
            {/* Search */}
            <div className="md:col-span-5 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" aria-hidden="true" />
              <input
                type="text"
                placeholder="Buscar por nombre, TIP o email..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setCurrentPage(1);
                }}
                className="w-full pl-10 pr-4 py-2 text-sm text-gray-900 bg-white border border-gray-300 focus:border-gray-500 focus:ring-0 focus:outline-none transition-colors"
              />
            </div>

            {/* Estado Filter */}
            <div className="md:col-span-3">
              <select
                value={selectedEstado}
                onChange={(e) => {
                  setSelectedEstado(e.target.value as EstadoAfiliado | "Todos");
                  setCurrentPage(1);
                }}
                className="w-full px-3 py-2 text-sm text-gray-900 bg-white border border-gray-300 focus:border-gray-500 focus:ring-0 focus:outline-none transition-colors"
              >
                {ESTADOS.map((estado) => (
                  <option key={estado} value={estado}>
                    {estado === "Todos" ? "Estado: Todos" : estado}
                  </option>
                ))}
              </select>
            </div>

            {/* Destino Filter */}
            <div className="md:col-span-4">
              <select
                value={selectedDestino}
                onChange={(e) => {
                  setSelectedDestino(e.target.value);
                  setCurrentPage(1);
                }}
                className="w-full px-3 py-2 text-sm text-gray-900 bg-white border border-gray-300 focus:border-gray-500 focus:ring-0 focus:outline-none transition-colors"
              >
                {DESTINOS.map((destino) => (
                  <option key={destino} value={destino}>
                    {destino === "Todos" ? "Destino: Todos" : destino}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-2">
          <ResultsCount
            current={currentAfiliados.length}
            total={filteredAfiliados.length}
            label="afiliados"
          />
        </div>

        {/* Data Table */}
        <div className="bg-white border border-gray-300">
          {/* Table Header */}
          <div className="grid grid-cols-12 gap-2 px-4 py-2 bg-gray-100 text-xs font-bold text-gray-700 uppercase tracking-wide border-b border-gray-300">
            <div className="col-span-1">TIP</div>
            <div className="col-span-3">Nombre Completo</div>
            <div className="col-span-2">Destino</div>
            <div className="col-span-2">Email</div>
            <div className="col-span-1">Alta</div>
            <div className="col-span-1">Estado</div>
            <div className="col-span-2 text-right">Acciones</div>
          </div>

          {/* Table Body */}
          <div className="divide-y divide-gray-200">
            {currentAfiliados.length === 0 ? (
              <EmptyState message="No se encontraron afiliados" />
            ) : (
              currentAfiliados.map((afiliado) => (
                <div
                  key={afiliado.id}
                  className="grid grid-cols-12 gap-2 px-4 py-3 items-center hover:bg-gray-50 transition-colors"
                >
                  <div className="col-span-1">
                    <span className="text-sm font-mono font-semibold text-gray-900">
                      {afiliado.tip}
                    </span>
                  </div>
                  <div className="col-span-3">
                    <span className="text-sm text-gray-900 font-medium">
                      {afiliado.nombreCompleto}
                    </span>
                  </div>
                  <div className="col-span-2">
                    <span className="text-sm text-gray-700 truncate block">
                      {afiliado.destino}
                    </span>
                  </div>
                  <div className="col-span-2">
                    <span className="text-sm text-gray-600 truncate block">
                      {afiliado.email}
                    </span>
                  </div>
                  <div className="col-span-1">
                    <span className="text-sm text-gray-700 tabular-nums">
                      {formatDate(afiliado.fechaAlta)}
                    </span>
                  </div>
                  <div className="col-span-1">
                    <StatusBadge status={afiliado.estado as StatusType} />
                  </div>
                  <div className="col-span-2 flex items-center justify-end gap-1">
                    <Link
                      href={`/admin/afiliados/${afiliado.id}`}
                      className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-200 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-500"
                      title="Ver detalles"
                      aria-label={`Ver detalles de ${afiliado.nombreCompleto}`}
                    >
                      <Eye className="w-4 h-4" />
                    </Link>
                    <Link
                      href={`/admin/afiliados/${afiliado.id}/editar`}
                      className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-200 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-500"
                      title="Editar"
                      aria-label={`Editar ${afiliado.nombreCompleto}`}
                    >
                      <Edit2 className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Table Footer */}
          <div className="px-4 py-2 bg-gray-100 border-t border-gray-300 flex items-center justify-between">
            <span className="text-xs text-gray-600 font-medium">
              Página {currentPage} de {totalPages || 1}
            </span>
            {totalPages > 1 && (
              <div className="flex items-center gap-1">
                <button
                  onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  className="p-1.5 text-gray-600 hover:text-gray-900 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors focus:outline-none focus:ring-2 focus:ring-gray-500"
                  aria-label="Página anterior"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`min-w-[28px] h-7 px-2 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-gray-500 ${
                      currentPage === page
                        ? "bg-gray-800 text-white"
                        : "text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    {page}
                  </button>
                ))}
                <button
                  onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                  className="p-1.5 text-gray-600 hover:text-gray-900 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors focus:outline-none focus:ring-2 focus:ring-gray-500"
                  aria-label="Página siguiente"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
        </div>

        <PageFooter />
      </div>
    </div>
  );
}
