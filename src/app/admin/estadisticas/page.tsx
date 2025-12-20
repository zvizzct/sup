"use client";

import { useState } from "react";
import { ActionBar } from "@/components/admin/ActionBar";
import { Badge } from "@/components/shared/Badge";
import {
  TrendingUp,
  TrendingDown,
  Users,
  Scale,
  FileText,
  MessageSquare,
  Calendar,
  BarChart3,
  PieChart,
  Download,
} from "lucide-react";

type PeriodFilter = "week" | "month" | "quarter" | "year";

export default function EstadisticasPage() {
  const [period, setPeriod] = useState<PeriodFilter>("month");

  const kpis = [
    {
      title: "Total Afiliados",
      value: "1,234",
      change: "+12.5%",
      trend: "up" as const,
      icon: Users,
      color: "text-sup-blue",
      bgColor: "bg-sup-blue/10",
    },
    {
      title: "Casos Activos",
      value: "87",
      change: "+8.3%",
      trend: "up" as const,
      icon: Scale,
      color: "text-yellow-600",
      bgColor: "bg-yellow-50",
    },
    {
      title: "Nuevas Solicitudes",
      value: "23",
      change: "-5.2%",
      trend: "down" as const,
      icon: FileText,
      color: "text-green-600",
      bgColor: "bg-green-50",
    },
    {
      title: "Comunicaciones Enviadas",
      value: "156",
      change: "+18.9%",
      trend: "up" as const,
      icon: MessageSquare,
      color: "text-purple-600",
      bgColor: "bg-purple-50",
    },
  ];

  const solicitudesPorTipo = [
    { tipo: "Exp. Disciplinario", cantidad: 45, porcentaje: 35 },
    { tipo: "Recurso de Alzada", cantidad: 32, porcentaje: 25 },
    { tipo: "Tema Penal", cantidad: 28, porcentaje: 22 },
    { tipo: "Accidente Tráfico", cantidad: 15, porcentaje: 12 },
    { tipo: "Asesoramiento Laboral", cantidad: 8, porcentaje: 6 },
  ];

  const solicitudesPorEstado = [
    { estado: "Nuevas", cantidad: 23, color: "bg-blue-500" },
    { estado: "Asignadas", cantidad: 18, color: "bg-yellow-500" },
    { estado: "En Trámite", cantidad: 31, color: "bg-orange-500" },
    { estado: "Resueltas", cantidad: 156, color: "bg-green-500" },
  ];

  const abogadosRendimiento = [
    { nombre: "Dra. María García López", casos: 28, resueltos: 24, pendientes: 4, tasa: 86 },
    { nombre: "Dr. Juan Martínez Ruiz", casos: 24, resueltos: 20, pendientes: 4, tasa: 83 },
    { nombre: "Dra. Carmen Sánchez Torres", casos: 19, resueltos: 18, pendientes: 1, tasa: 95 },
    { nombre: "Dr. Pedro López Díaz", casos: 16, resueltos: 14, pendientes: 2, tasa: 88 },
  ];

  const tendenciaAfiliados = [
    { mes: "Jul", afiliados: 1180 },
    { mes: "Ago", afiliados: 1195 },
    { mes: "Sep", afiliados: 1210 },
    { mes: "Oct", afiliados: 1218 },
    { mes: "Nov", afiliados: 1227 },
    { mes: "Dic", afiliados: 1234 },
  ];

  const maxAfiliados = Math.max(...tendenciaAfiliados.map((t) => t.afiliados));

  const handleExport = (tipo: string) => {
    console.log(`Exportando reporte: ${tipo}`);
  };

  return (
    <div className="min-h-screen pb-8">
      <ActionBar
        title="Estadísticas y Reportes"
        actions={
          <div className="flex items-center gap-3">
            <select
              value={period}
              onChange={(e) => setPeriod(e.target.value as PeriodFilter)}
              className="px-3 py-1.5 text-sm border border-gray-300 rounded hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-sup-blue/50 transition-all"
            >
              <option value="week">Última semana</option>
              <option value="month">Último mes</option>
              <option value="quarter">Último trimestre</option>
              <option value="year">Último año</option>
            </select>
            <button
              onClick={() => handleExport("general")}
              className="px-3 py-1.5 text-sm bg-sup-blue text-white rounded hover:bg-sup-blue-dark flex items-center gap-2 transition-colors"
            >
              <Download className="w-4 h-4" />
              Exportar PDF
            </button>
          </div>
        }
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        {/* KPIs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {kpis.map((kpi) => (
            <div
              key={kpi.title}
              className="bg-white rounded-lg border border-gray-200 p-5 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <p className="text-sm text-gray-600 mb-1">{kpi.title}</p>
                  <p className="text-3xl font-bold text-gray-900 mb-2">{kpi.value}</p>
                  <div className="flex items-center gap-1.5">
                    {kpi.trend === "up" ? (
                      <TrendingUp className="w-4 h-4 text-green-600" />
                    ) : (
                      <TrendingDown className="w-4 h-4 text-red-600" />
                    )}
                    <span
                      className={`text-sm font-medium ${
                        kpi.trend === "up" ? "text-green-600" : "text-red-600"
                      }`}
                    >
                      {kpi.change}
                    </span>
                    <span className="text-xs text-gray-500">vs mes anterior</span>
                  </div>
                </div>
                <div className={`${kpi.bgColor} ${kpi.color} p-3 rounded-lg`}>
                  <kpi.icon className="w-6 h-6" />
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Tendencia de Afiliados */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                  <BarChart3 className="w-5 h-5 text-sup-blue" />
                  Evolución de Afiliados
                </h3>
                <p className="text-sm text-gray-600 mt-1">Últimos 6 meses</p>
              </div>
            </div>
            <div className="space-y-3">
              {tendenciaAfiliados.map((item) => (
                <div key={item.mes} className="flex items-center gap-3">
                  <span className="text-sm font-medium text-gray-700 w-8">{item.mes}</span>
                  <div className="flex-1 bg-gray-100 rounded-full h-8 relative overflow-hidden">
                    <div
                      className="bg-sup-blue h-full rounded-full flex items-center justify-end pr-3 transition-all duration-500"
                      style={{ width: `${(item.afiliados / maxAfiliados) * 100}%` }}
                    >
                      <span className="text-xs font-semibold text-white">{item.afiliados}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Solicitudes por Tipo */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                  <PieChart className="w-5 h-5 text-sup-blue" />
                  Solicitudes por Tipo
                </h3>
                <p className="text-sm text-gray-600 mt-1">Distribución actual</p>
              </div>
            </div>
            <div className="space-y-4">
              {solicitudesPorTipo.map((item, index) => (
                <div key={item.tipo}>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-sm font-medium text-gray-700">{item.tipo}</span>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-gray-600">{item.cantidad}</span>
                      <span className="text-xs text-gray-500">({item.porcentaje}%)</span>
                    </div>
                  </div>
                  <div className="w-full bg-gray-100 rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-sup-blue to-sup-blue-dark h-2 rounded-full transition-all duration-500"
                      style={{ width: `${item.porcentaje}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Solicitudes por Estado */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                <Scale className="w-5 h-5 text-sup-blue" />
                Estado de Solicitudes
              </h3>
              <p className="text-sm text-gray-600 mt-1">Resumen general del periodo</p>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {solicitudesPorEstado.map((item) => (
              <div
                key={item.estado}
                className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
              >
                <div className="flex items-center gap-3">
                  <div className={`${item.color} w-1 h-12 rounded-full`} />
                  <div>
                    <p className="text-sm text-gray-600">{item.estado}</p>
                    <p className="text-2xl font-bold text-gray-900">{item.cantidad}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Rendimiento de Abogados */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                <Users className="w-5 h-5 text-sup-blue" />
                Rendimiento de Abogados
              </h3>
              <p className="text-sm text-gray-600 mt-1">Casos activos y resueltos</p>
            </div>
            <button
              onClick={() => handleExport("abogados")}
              className="px-3 py-1.5 text-sm border border-gray-300 rounded hover:bg-gray-50 flex items-center gap-2 transition-colors"
            >
              <Download className="w-4 h-4" />
              Exportar
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-900">
                    Abogado
                  </th>
                  <th className="text-center py-3 px-4 text-sm font-semibold text-gray-900">
                    Total Casos
                  </th>
                  <th className="text-center py-3 px-4 text-sm font-semibold text-gray-900">
                    Resueltos
                  </th>
                  <th className="text-center py-3 px-4 text-sm font-semibold text-gray-900">
                    Pendientes
                  </th>
                  <th className="text-center py-3 px-4 text-sm font-semibold text-gray-900">
                    Tasa de Éxito
                  </th>
                </tr>
              </thead>
              <tbody>
                {abogadosRendimiento.map((abogado, index) => (
                  <tr
                    key={abogado.nombre}
                    className={`${
                      index % 2 === 0 ? "bg-white" : "bg-gray-50"
                    } hover:bg-gray-100 transition-colors`}
                  >
                    <td className="py-3 px-4 text-sm text-gray-900">{abogado.nombre}</td>
                    <td className="py-3 px-4 text-sm text-gray-700 text-center">
                      {abogado.casos}
                    </td>
                    <td className="py-3 px-4 text-center">
                      <Badge color="green">
                        {abogado.resueltos}
                      </Badge>
                    </td>
                    <td className="py-3 px-4 text-center">
                      <Badge color="amber">
                        {abogado.pendientes}
                      </Badge>
                    </td>
                    <td className="py-3 px-4 text-center">
                      <div className="flex items-center justify-center gap-2">
                        <div className="w-16 bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-green-500 h-2 rounded-full"
                            style={{ width: `${abogado.tasa}%` }}
                          />
                        </div>
                        <span className="text-sm font-medium text-gray-900">{abogado.tasa}%</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Reportes Disponibles */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                <FileText className="w-5 h-5 text-sup-blue" />
                Reportes Disponibles
              </h3>
              <p className="text-sm text-gray-600 mt-1">Exporta reportes personalizados</p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              {
                titulo: "Reporte Mensual de Afiliados",
                descripcion: "Incluye nuevos afiliados, bajas y estadísticas",
                icon: Users,
              },
              {
                titulo: "Análisis de Solicitudes Legales",
                descripcion: "Desglose por tipo, urgencia y abogado",
                icon: Scale,
              },
              {
                titulo: "Estadísticas de Comunicaciones",
                descripcion: "Alcance, engagement y respuestas",
                icon: MessageSquare,
              },
              {
                titulo: "Reporte de Documentos",
                descripcion: "Documentos por categoría y estado",
                icon: FileText,
              },
              {
                titulo: "Rendimiento por Periodo",
                descripcion: "KPIs y métricas comparativas",
                icon: Calendar,
              },
              {
                titulo: "Reporte Ejecutivo",
                descripcion: "Resumen completo para la directiva",
                icon: BarChart3,
              },
            ].map((reporte) => (
              <div
                key={reporte.titulo}
                className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-all cursor-pointer group"
                onClick={() => handleExport(reporte.titulo)}
              >
                <div className="flex items-start gap-3">
                  <div className="bg-sup-blue/10 text-sup-blue p-2 rounded-lg group-hover:bg-sup-blue group-hover:text-white transition-colors">
                    <reporte.icon className="w-5 h-5" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900 text-sm mb-1">{reporte.titulo}</h4>
                    <p className="text-xs text-gray-600">{reporte.descripcion}</p>
                  </div>
                  <Download className="w-4 h-4 text-gray-400 group-hover:text-sup-blue transition-colors" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
