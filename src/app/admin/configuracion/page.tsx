"use client";

import { useState } from "react";
import { Plus, Download, Edit2, Trash2, Power, Eye, ArrowRight } from "lucide-react";
import { ActionBar } from "@/components/admin/ActionBar";
import { RoleBadge, StatusBadge, RoleType, StatusType } from "@/components/shared/Badge";
import { PageFooter } from "@/components/admin/PageFooter";
import { ResultsCount } from "@/components/shared/ResultsCount";

type AdminUser = { id: number; nombre: string; email: string; rol: RoleType; ultimoAcceso: string; };
type Abogado = { id: number; nombre: string; email: string; especialidad: string; telefono: string; casosActivos: number; estado: "Activo" | "Inactivo"; };
type Categoria = { id: number; nombre: string; descripcion: string; documentos: number; };
type AuditLog = { id: number; fechaHora: string; usuario: string; accion: string; detalle: string; ip: string; };

const adminUsers: AdminUser[] = [
  { id: 1, nombre: "Carlos Mendoza", email: "carlos.mendoza@sup.es", rol: "Super Admin", ultimoAcceso: "2025-12-14 09:30" },
  { id: 2, nombre: "Ana García", email: "ana.garcia@sup.es", rol: "Admin", ultimoAcceso: "2025-12-14 08:15" },
  { id: 3, nombre: "Miguel Torres", email: "miguel.torres@sup.es", rol: "Admin", ultimoAcceso: "2025-12-13 18:45" },
  { id: 4, nombre: "Laura Sánchez", email: "laura.sanchez@sup.es", rol: "Moderador", ultimoAcceso: "2025-12-14 10:00" },
  { id: 5, nombre: "Javier Ruiz", email: "javier.ruiz@sup.es", rol: "Moderador", ultimoAcceso: "2025-12-12 16:20" },
];

const abogados: Abogado[] = [
  { id: 1, nombre: "Dra. Patricia Morales", email: "patricia.morales@bufete.es", especialidad: "Derecho Laboral", telefono: "+34 912 345 678", casosActivos: 8, estado: "Activo" },
  { id: 2, nombre: "Dr. Francisco López", email: "francisco.lopez@abogados.es", especialidad: "Derecho Penal", telefono: "+34 913 456 789", casosActivos: 12, estado: "Activo" },
  { id: 3, nombre: "Dra. Isabel Fernández", email: "isabel.fernandez@legal.es", especialidad: "Derecho Administrativo", telefono: "+34 914 567 890", casosActivos: 5, estado: "Activo" },
  { id: 4, nombre: "Dr. Roberto Díaz", email: "roberto.diaz@juridico.es", especialidad: "Derecho Civil", telefono: "+34 915 678 901", casosActivos: 3, estado: "Inactivo" },
  { id: 5, nombre: "Dra. Carmen Vega", email: "carmen.vega@asesoria.es", especialidad: "Derecho Laboral", telefono: "+34 916 789 012", casosActivos: 10, estado: "Activo" },
  { id: 6, nombre: "Dr. Alberto Ramos", email: "alberto.ramos@defensores.es", especialidad: "Derecho Penal", telefono: "+34 917 890 123", casosActivos: 0, estado: "Inactivo" },
];

const categorias: Categoria[] = [
  { id: 1, nombre: "Documentación Personal", descripcion: "DNI, pasaporte, certificados personales", documentos: 145 },
  { id: 2, nombre: "Informes Médicos", descripcion: "Partes de lesiones, informes psicológicos", documentos: 89 },
  { id: 3, nombre: "Documentación Laboral", descripcion: "Nóminas, contratos, historiales laborales", documentos: 203 },
  { id: 4, nombre: "Expedientes Disciplinarios", descripcion: "Documentación relacionada con procedimientos", documentos: 67 },
  { id: 5, nombre: "Documentación Legal", descripcion: "Sentencias, recursos, demandas", documentos: 124 },
  { id: 6, nombre: "Otros Documentos", descripcion: "Documentación no categorizada", documentos: 45 },
];

const auditLogs: AuditLog[] = [
  { id: 1, fechaHora: "2025-12-14 10:15:23", usuario: "Carlos Mendoza", accion: "Creación de caso", detalle: "Nuevo caso #1247 - Juan Martínez", ip: "192.168.1.105" },
  { id: 2, fechaHora: "2025-12-14 10:10:45", usuario: "Ana García", accion: "Modificación de documento", detalle: "Actualización estado documento #5823", ip: "192.168.1.112" },
  { id: 3, fechaHora: "2025-12-14 09:58:12", usuario: "Laura Sánchez", accion: "Asignación de abogado", detalle: "Caso #1245 asignado a Dra. Patricia Morales", ip: "192.168.1.118" },
  { id: 4, fechaHora: "2025-12-14 09:45:33", usuario: "Miguel Torres", accion: "Actualización de caso", detalle: "Estado de caso #1240 cambiado a En Proceso", ip: "192.168.1.107" },
  { id: 5, fechaHora: "2025-12-14 09:30:18", usuario: "Carlos Mendoza", accion: "Inicio de sesión", detalle: "Acceso al panel de administración", ip: "192.168.1.105" },
];

const TOTAL_LOGS = 50;

export default function ConfiguracionPage() {
  const [activeTab, setActiveTab] = useState<"usuarios" | "abogados" | "categorias" | "logs">("usuarios");
  const [filterDateFrom, setFilterDateFrom] = useState("");
  const [filterDateTo, setFilterDateTo] = useState("");
  const [filterUser, setFilterUser] = useState("");
  const [filterAction, setFilterAction] = useState("");

  const tabs = [
    { id: "usuarios" as const, label: "Usuarios" },
    { id: "abogados" as const, label: "Abogados" },
    { id: "categorias" as const, label: "Categorías" },
    { id: "logs" as const, label: "Logs" },
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      <ActionBar title="Configuración" subtitle="Gestión de usuarios, abogados y configuración general" />

      <div className="p-4 sm:p-6">
        <div className="bg-white border border-gray-300 mb-4 overflow-x-auto">
          <div className="flex min-w-max">
            {tabs.map((tab) => (
              <button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`flex-1 px-3 sm:px-4 py-3 text-sm font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-inset focus:ring-gray-500 whitespace-nowrap ${activeTab === tab.id ? "bg-gray-800 text-white" : "text-gray-700 hover:bg-gray-100"}`}>
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {activeTab === "usuarios" && (
          <div className="space-y-4">
            <div className="bg-white border border-gray-300 p-3 sm:p-4">
              <h3 className="text-xs font-bold text-gray-700 uppercase tracking-wide mb-3">Roles y Permisos</h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 text-sm">
                <div><span className="font-semibold text-gray-900">Super Admin:</span><p className="text-gray-600 text-xs mt-1">Acceso total al sistema.</p></div>
                <div><span className="font-semibold text-gray-900">Admin:</span><p className="text-gray-600 text-xs mt-1">Gestión de casos y afiliados.</p></div>
                <div><span className="font-semibold text-gray-900">Moderador:</span><p className="text-gray-600 text-xs mt-1">Consulta y actualizaciones.</p></div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <ResultsCount current={adminUsers.length} total={adminUsers.length} label="usuarios" />
              <button className="flex items-center justify-center gap-2 px-4 py-2 bg-gray-800 text-white text-sm font-semibold hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2 transition-colors">
                <Plus className="w-4 h-4" aria-hidden="true" />
                Nuevo Usuario
              </button>
            </div>

            <div className="bg-white border border-gray-300">
              <div className="hidden lg:grid grid-cols-12 gap-2 px-4 py-2 bg-gray-100 text-xs font-bold text-gray-700 uppercase tracking-wide border-b border-gray-300">
                <div className="col-span-3">Nombre</div>
                <div className="col-span-3">Email</div>
                <div className="col-span-2">Rol</div>
                <div className="col-span-2">Último Acceso</div>
                <div className="col-span-2 text-right">Acciones</div>
              </div>
              <div className="hidden lg:block divide-y divide-gray-200">
                {adminUsers.map((user) => (
                  <div key={user.id} className="grid grid-cols-12 gap-2 px-4 py-3 items-center hover:bg-gray-50 transition-colors">
                    <div className="col-span-3 text-sm font-medium text-gray-900">{user.nombre}</div>
                    <div className="col-span-3 text-sm text-gray-600">{user.email}</div>
                    <div className="col-span-2"><RoleBadge role={user.rol} /></div>
                    <div className="col-span-2 text-sm text-gray-600 tabular-nums">{user.ultimoAcceso}</div>
                    <div className="col-span-2 flex items-center justify-end gap-1">
                      <button className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-200 transition-colors" title="Ver"><Eye className="w-4 h-4" /></button>
                      <button className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-200 transition-colors" title="Editar"><Edit2 className="w-4 h-4" /></button>
                      {user.rol !== "Super Admin" && <button className="p-2 text-gray-600 hover:text-red-700 hover:bg-red-50 transition-colors" title="Eliminar"><Trash2 className="w-4 h-4" /></button>}
                    </div>
                  </div>
                ))}
              </div>
              <div className="lg:hidden divide-y divide-gray-200">
                {adminUsers.map((user) => (
                  <div key={user.id} className="px-4 py-3">
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-sm font-medium text-gray-900">{user.nombre}</span>
                          <RoleBadge role={user.rol} />
                        </div>
                        <p className="text-xs text-gray-600">{user.email}</p>
                        <p className="text-xs text-gray-500 mt-0.5">Último acceso: {user.ultimoAcceso}</p>
                      </div>
                      <div className="flex gap-1">
                        <button className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-200 transition-colors" title="Editar"><Edit2 className="w-4 h-4" /></button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === "abogados" && (
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <ResultsCount current={abogados.length} total={abogados.length} label="abogados" />
              <button className="flex items-center justify-center gap-2 px-4 py-2 bg-gray-800 text-white text-sm font-semibold hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2 transition-colors">
                <Plus className="w-4 h-4" aria-hidden="true" />
                Nuevo Abogado
              </button>
            </div>

            <div className="bg-white border border-gray-300">
              <div className="hidden xl:grid grid-cols-12 gap-2 px-4 py-2 bg-gray-100 text-xs font-bold text-gray-700 uppercase tracking-wide border-b border-gray-300">
                <div className="col-span-2">Nombre</div>
                <div className="col-span-2">Email</div>
                <div className="col-span-2">Especialidad</div>
                <div className="col-span-2">Teléfono</div>
                <div className="col-span-1 text-center">Casos</div>
                <div className="col-span-1">Estado</div>
                <div className="col-span-2 text-right">Acciones</div>
              </div>
              <div className="hidden xl:block divide-y divide-gray-200">
                {abogados.map((abogado) => (
                  <div key={abogado.id} className="grid grid-cols-12 gap-2 px-4 py-3 items-center hover:bg-gray-50 transition-colors">
                    <div className="col-span-2 text-sm font-medium text-gray-900">{abogado.nombre}</div>
                    <div className="col-span-2 text-sm text-gray-600 truncate">{abogado.email}</div>
                    <div className="col-span-2 text-sm text-gray-700">{abogado.especialidad}</div>
                    <div className="col-span-2 text-sm text-gray-600">{abogado.telefono}</div>
                    <div className="col-span-1 text-sm text-gray-900 text-center tabular-nums">{abogado.casosActivos}</div>
                    <div className="col-span-1"><StatusBadge status={abogado.estado as StatusType} /></div>
                    <div className="col-span-2 flex items-center justify-end gap-1">
                      <button className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-200 transition-colors" title="Ver"><Eye className="w-4 h-4" /></button>
                      <button className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-200 transition-colors" title="Editar"><Edit2 className="w-4 h-4" /></button>
                      <button className={`p-2 transition-colors ${abogado.estado === "Activo" ? "text-gray-600 hover:text-amber-700 hover:bg-amber-50" : "text-gray-600 hover:text-green-700 hover:bg-green-50"}`} title={abogado.estado === "Activo" ? "Desactivar" : "Activar"}><Power className="w-4 h-4" /></button>
                    </div>
                  </div>
                ))}
              </div>
              <div className="xl:hidden divide-y divide-gray-200">
                {abogados.map((abogado) => (
                  <div key={abogado.id} className="px-4 py-3">
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-sm font-medium text-gray-900">{abogado.nombre}</span>
                          <StatusBadge status={abogado.estado as StatusType} />
                        </div>
                        <p className="text-xs text-gray-600">{abogado.especialidad}</p>
                        <p className="text-xs text-gray-500 mt-0.5">{abogado.email}</p>
                        <p className="text-xs text-gray-500">{abogado.telefono} · {abogado.casosActivos} casos activos</p>
                      </div>
                      <button className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-200 transition-colors" title="Editar"><Edit2 className="w-4 h-4" /></button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === "categorias" && (
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <ResultsCount current={categorias.length} total={categorias.length} label="categorías" />
              <button className="flex items-center justify-center gap-2 px-4 py-2 bg-gray-800 text-white text-sm font-semibold hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2 transition-colors">
                <Plus className="w-4 h-4" aria-hidden="true" />
                Nueva Categoría
              </button>
            </div>

            <div className="bg-white border border-gray-300 p-3 sm:p-4">
              <h3 className="text-xs font-bold text-gray-700 uppercase tracking-wide mb-3">Estados de Documentos</h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-sm">
                <div className="flex items-center gap-2"><span className="w-3 h-3 bg-amber-500" aria-hidden="true"></span><span className="text-gray-700 text-xs">Pendiente</span></div>
                <div className="flex items-center gap-2"><span className="w-3 h-3 bg-blue-500" aria-hidden="true"></span><span className="text-gray-700 text-xs">En Revisión</span></div>
                <div className="flex items-center gap-2"><span className="w-3 h-3 bg-green-500" aria-hidden="true"></span><span className="text-gray-700 text-xs">Aprobado</span></div>
                <div className="flex items-center gap-2"><span className="w-3 h-3 bg-red-500" aria-hidden="true"></span><span className="text-gray-700 text-xs">Rechazado</span></div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              {categorias.map((categoria) => (
                <div key={categoria.id} className="bg-white border border-gray-300 p-3 sm:p-4 hover:shadow-md transition-shadow">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="text-sm font-medium text-gray-900">{categoria.nombre}</h3>
                      <p className="text-xs text-gray-600 mt-1">{categoria.descripcion}</p>
                    </div>
                    <span className="inline-block px-2 py-0.5 text-xs font-semibold bg-gray-800 text-white">{categoria.documentos}</span>
                  </div>
                  <div className="flex gap-3 mt-3 pt-3 border-t border-gray-200">
                    <button className="text-sm text-gray-700 hover:text-gray-900 font-medium underline">Editar</button>
                    <button className="text-sm text-red-600 hover:text-red-800 font-medium underline">Eliminar</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === "logs" && (
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <ResultsCount current={auditLogs.length} total={TOTAL_LOGS} label="registros" />
              <button className="flex items-center justify-center gap-2 px-4 py-2 bg-gray-800 text-white text-sm font-semibold hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2 transition-colors">
                <Download className="w-4 h-4" aria-hidden="true" />
                Exportar
              </button>
            </div>

            <div className="bg-white border border-gray-300 p-3 sm:p-4">
              <h3 className="text-xs font-bold text-gray-700 uppercase tracking-wide mb-3">Filtros</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide mb-1">Fecha Desde</label>
                  <input type="date" value={filterDateFrom} onChange={(e) => setFilterDateFrom(e.target.value)} className="w-full px-3 py-2 text-sm text-gray-900 bg-white border border-gray-300 focus:border-gray-500 focus:ring-0 focus:outline-none transition-colors" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide mb-1">Fecha Hasta</label>
                  <input type="date" value={filterDateTo} onChange={(e) => setFilterDateTo(e.target.value)} className="w-full px-3 py-2 text-sm text-gray-900 bg-white border border-gray-300 focus:border-gray-500 focus:ring-0 focus:outline-none transition-colors" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide mb-1">Usuario</label>
                  <select value={filterUser} onChange={(e) => setFilterUser(e.target.value)} className="w-full px-3 py-2 text-sm text-gray-900 bg-white border border-gray-300 focus:border-gray-500 focus:ring-0 focus:outline-none transition-colors">
                    <option value="">Todos</option>
                    <option value="Carlos Mendoza">Carlos Mendoza</option>
                    <option value="Ana García">Ana García</option>
                    <option value="Miguel Torres">Miguel Torres</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide mb-1">Acción</label>
                  <select value={filterAction} onChange={(e) => setFilterAction(e.target.value)} className="w-full px-3 py-2 text-sm text-gray-900 bg-white border border-gray-300 focus:border-gray-500 focus:ring-0 focus:outline-none transition-colors">
                    <option value="">Todas</option>
                    <option value="Creación de caso">Creación de caso</option>
                    <option value="Inicio de sesión">Inicio de sesión</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="bg-white border border-gray-300">
              <div className="hidden lg:grid grid-cols-12 gap-2 px-4 py-2 bg-gray-100 text-xs font-bold text-gray-700 uppercase tracking-wide border-b border-gray-300">
                <div className="col-span-2">Fecha/Hora</div>
                <div className="col-span-2">Usuario</div>
                <div className="col-span-2">Acción</div>
                <div className="col-span-4">Detalle</div>
                <div className="col-span-2">IP</div>
              </div>
              <div className="hidden lg:block divide-y divide-gray-200">
                {auditLogs.map((log) => (
                  <div key={log.id} className="grid grid-cols-12 gap-2 px-4 py-3 items-center hover:bg-gray-50 transition-colors">
                    <div className="col-span-2 text-sm text-gray-900 tabular-nums">{log.fechaHora}</div>
                    <div className="col-span-2 text-sm font-medium text-gray-900">{log.usuario}</div>
                    <div className="col-span-2"><span className="inline-block px-2 py-0.5 text-xs font-semibold bg-blue-100 text-blue-800 border border-blue-300">{log.accion}</span></div>
                    <div className="col-span-4 text-sm text-gray-600 truncate">{log.detalle}</div>
                    <div className="col-span-2 text-sm text-gray-500 font-mono">{log.ip}</div>
                  </div>
                ))}
              </div>
              <div className="lg:hidden divide-y divide-gray-200">
                {auditLogs.map((log) => (
                  <div key={log.id} className="px-4 py-3">
                    <div className="flex items-center justify-between gap-2 mb-1">
                      <span className="text-xs text-gray-500 tabular-nums">{log.fechaHora}</span>
                      <span className="inline-block px-2 py-0.5 text-xs font-semibold bg-blue-100 text-blue-800">{log.accion}</span>
                    </div>
                    <p className="text-sm font-medium text-gray-900">{log.usuario}</p>
                    <p className="text-xs text-gray-600 mt-0.5">{log.detalle}</p>
                    <p className="text-xs text-gray-400 font-mono mt-0.5">{log.ip}</p>
                  </div>
                ))}
              </div>
              <div className="px-4 py-2 bg-gray-100 border-t border-gray-300">
                <span className="text-xs text-gray-600 font-medium">Total: {auditLogs.length} registros</span>
              </div>
            </div>
          </div>
        )}

        <PageFooter />
      </div>
    </div>
  );
}
