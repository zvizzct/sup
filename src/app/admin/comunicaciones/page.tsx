"use client";

import { useState } from "react";
import { Clock, Users, Paperclip, Eye, Send, Plus } from "lucide-react";
import { ActionBar } from "@/components/admin/ActionBar";
import { CommunicationBadge } from "@/components/shared/Badge";
import { PageFooter } from "@/components/admin/PageFooter";
import { ResultsCount } from "@/components/shared/ResultsCount";
import type { TipoComunicacion } from "@/lib/shared";

type FilterType = "all" | TipoComunicacion;

interface Communication {
  id: number;
  type: TipoComunicacion;
  subject: string;
  content: string;
  sentDate: string;
  sentTime: string;
  recipientCount: number;
}

const mockCommunications: Communication[] = [
  { id: 1, type: "URGENTE", subject: "Cambios en el turno de guardia - Acción inmediata requerida", content: "Se comunica que debido a circunstancias excepcionales, se ha modificado el turno de guardia para el fin de semana. Es imprescindible que todos los afiliados afectados revisen el nuevo cuadrante publicado en el portal...", sentDate: "Hoy", sentTime: "14:30", recipientCount: 1234 },
  { id: 2, type: "CONVOCATORIA", subject: "Asamblea General Extraordinaria - 20 de Diciembre", content: "Se convoca a todos los afiliados a la Asamblea General Extraordinaria que tendrá lugar el próximo 20 de diciembre a las 18:00 horas en la sede central. Orden del día: Aprobación de nuevas medidas sindicales...", sentDate: "Hoy", sentTime: "09:15", recipientCount: 2456 },
  { id: 3, type: "INFORMATIVO", subject: "Actualización del protocolo de seguridad ciudadana", content: "Les informamos que se ha publicado la actualización del protocolo de seguridad ciudadana. Todos los afiliados pueden consultar el documento completo en la sección de documentos del portal...", sentDate: "Ayer", sentTime: "16:45", recipientCount: 2456 },
  { id: 4, type: "CONVOCATORIA", subject: "Proceso de selección - Vacantes en Unidades Especiales", content: "Se abre el plazo para la presentación de solicitudes para las plazas vacantes en las Unidades Especiales. Los afiliados interesados deberán presentar su solicitud antes del 31 de diciembre...", sentDate: "Ayer", sentTime: "11:20", recipientCount: 1890 },
  { id: 5, type: "INFORMATIVO", subject: "Resumen de logros sindicales del último trimestre", content: "Queremos compartir con todos los afiliados los principales logros conseguidos durante el último trimestre: mejoras salariales, nuevas condiciones laborales, acuerdos con la administración...", sentDate: "15 Dic", sentTime: "10:00", recipientCount: 2456 },
  { id: 6, type: "URGENTE", subject: "Suspensión temporal de servicios administrativos", content: "Debido a trabajos de mantenimiento urgentes, los servicios administrativos estarán temporalmente suspendidos el día 18 de diciembre. Se ruega planificar con antelación cualquier gestión...", sentDate: "14 Dic", sentTime: "13:30", recipientCount: 2456 },
];

const TOTAL_COMMUNICATIONS = 10;

export default function ComunicacionesPage() {
  const [activeFilter, setActiveFilter] = useState<FilterType>("all");
  const [showForm, setShowForm] = useState(false);
  const [formType, setFormType] = useState<TipoComunicacion>("INFORMATIVO");
  const [recipients, setRecipients] = useState("all");
  const [subject, setSubject] = useState("");
  const [content, setContent] = useState("");
  const [notifyEmail, setNotifyEmail] = useState(true);
  const [sendTime, setSendTime] = useState<"now" | "scheduled">("now");
  const [scheduledDate, setScheduledDate] = useState("");
  const [scheduledTime, setScheduledTime] = useState("");

  const filteredCommunications = activeFilter === "all" ? mockCommunications : mockCommunications.filter((comm) => comm.type === activeFilter);

  const handleSubmit = (e: React.FormEvent) => { e.preventDefault(); };

  const filterTabs: { key: FilterType; label: string }[] = [
    { key: "all", label: "Todas" },
    { key: "URGENTE", label: "Urgentes" },
    { key: "INFORMATIVO", label: "Informativos" },
    { key: "CONVOCATORIA", label: "Convocatorias" },
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      <ActionBar
        title="Comunicaciones"
        subtitle="Gestión de comunicaciones a los afiliados"
        actions={
          <button onClick={() => setShowForm(!showForm)} className="flex items-center gap-2 px-3 sm:px-4 py-2 bg-gray-800 text-white text-sm font-semibold hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2 transition-colors lg:hidden">
            <Plus className="w-4 h-4" aria-hidden="true" />
            <span className="hidden sm:inline">Nueva</span>
          </button>
        }
      />

      <div className="p-4 sm:p-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <div className="lg:col-span-2 space-y-4">
            <div className="bg-white border border-gray-300 overflow-x-auto">
              <div className="flex min-w-max">
                {filterTabs.map((tab) => (
                  <button key={tab.key} onClick={() => setActiveFilter(tab.key)} className={`flex-1 px-3 sm:px-4 py-3 text-sm font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-inset focus:ring-gray-500 whitespace-nowrap ${activeFilter === tab.key ? "bg-gray-800 text-white" : "text-gray-700 hover:bg-gray-100"}`}>
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>

            <div><ResultsCount current={filteredCommunications.length} total={TOTAL_COMMUNICATIONS} label="comunicaciones" /></div>

            <div className="space-y-2">
              {filteredCommunications.map((comm) => (
                <div key={comm.id} className="bg-white border border-gray-300 p-3 sm:p-4 hover:shadow-md transition-shadow">
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-2">
                    <CommunicationBadge type={comm.type} />
                    <div className="flex items-center gap-1 text-xs text-gray-500">
                      <Clock className="w-3 h-3" aria-hidden="true" />
                      <span>{comm.sentDate} - {comm.sentTime}</span>
                    </div>
                  </div>
                  <h3 className="text-sm font-medium text-gray-900 mb-2">{comm.subject}</h3>
                  <p className="text-sm text-gray-600 line-clamp-2 mb-3">{comm.content}</p>
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pt-3 border-t border-gray-200">
                    <div className="flex items-center gap-2 text-xs text-gray-600">
                      <Users className="w-4 h-4" aria-hidden="true" />
                      <span>Enviado a {comm.recipientCount.toLocaleString("es-ES")} afiliados</span>
                    </div>
                    <button className="text-sm text-gray-700 hover:text-gray-900 font-medium underline focus:outline-none focus:ring-2 focus:ring-gray-500">Ver detalle</button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className={`lg:col-span-1 ${showForm ? "block" : "hidden lg:block"}`}>
            <div className="bg-white border border-gray-300 lg:sticky lg:top-6">
              <div className="px-4 py-3 border-b border-gray-300 flex items-center justify-between">
                <h2 className="text-sm font-bold text-gray-900 uppercase tracking-wide">Nueva Comunicación</h2>
                <button onClick={() => setShowForm(false)} className="lg:hidden text-sm text-gray-600 hover:text-gray-900">Cerrar</button>
              </div>

              <form onSubmit={handleSubmit} className="p-4 space-y-4">
                <div>
                  <label htmlFor="type" className="block text-xs font-bold text-gray-700 uppercase tracking-wide mb-1">Tipo</label>
                  <select id="type" value={formType} onChange={(e) => setFormType(e.target.value as TipoComunicacion)} className="w-full px-3 py-2 text-sm text-gray-900 bg-white border border-gray-300 focus:border-gray-500 focus:ring-0 focus:outline-none transition-colors">
                    <option value="INFORMATIVO">Informativo</option>
                    <option value="URGENTE">Urgente</option>
                    <option value="CONVOCATORIA">Convocatoria</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="recipients" className="block text-xs font-bold text-gray-700 uppercase tracking-wide mb-1">Destinatarios</label>
                  <select id="recipients" value={recipients} onChange={(e) => setRecipients(e.target.value)} className="w-full px-3 py-2 text-sm text-gray-900 bg-white border border-gray-300 focus:border-gray-500 focus:ring-0 focus:outline-none transition-colors">
                    <option value="all">Todos los afiliados</option>
                    <option value="destination">Por destino</option>
                    <option value="individual">Individual</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="subject" className="block text-xs font-bold text-gray-700 uppercase tracking-wide mb-1">Asunto</label>
                  <input type="text" id="subject" value={subject} onChange={(e) => setSubject(e.target.value)} placeholder="Escribe el asunto..." className="w-full px-3 py-2 text-sm text-gray-900 bg-white border border-gray-300 focus:border-gray-500 focus:ring-0 focus:outline-none transition-colors" />
                </div>

                <div>
                  <label htmlFor="content" className="block text-xs font-bold text-gray-700 uppercase tracking-wide mb-1">Contenido</label>
                  <textarea id="content" value={content} onChange={(e) => setContent(e.target.value)} placeholder="Escribe el contenido..." rows={4} className="w-full px-3 py-2 text-sm text-gray-900 bg-white border border-gray-300 focus:border-gray-500 focus:ring-0 focus:outline-none transition-colors resize-none" />
                </div>

                <div className="flex items-center">
                  <input type="checkbox" id="notifyEmail" checked={notifyEmail} onChange={(e) => setNotifyEmail(e.target.checked)} className="w-4 h-4 text-gray-800 border-gray-300 focus:ring-gray-500" />
                  <label htmlFor="notifyEmail" className="ml-2 text-sm text-gray-700">Notificar por email</label>
                </div>

                <div>
                  <button type="button" className="flex items-center gap-2 text-sm text-gray-700 hover:text-gray-900 font-medium underline focus:outline-none focus:ring-2 focus:ring-gray-500">
                    <Paperclip className="w-4 h-4" aria-hidden="true" />
                    Añadir archivo
                  </button>
                </div>

                <div className="pt-4 border-t border-gray-300">
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide mb-2">Envío</label>
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <input type="radio" id="sendNow" name="sendTime" value="now" checked={sendTime === "now"} onChange={(e) => setSendTime(e.target.value as "now" | "scheduled")} className="w-4 h-4 text-gray-800 border-gray-300 focus:ring-gray-500" />
                      <label htmlFor="sendNow" className="ml-2 text-sm text-gray-700">Enviar ahora</label>
                    </div>
                    <div className="flex items-center">
                      <input type="radio" id="sendScheduled" name="sendTime" value="scheduled" checked={sendTime === "scheduled"} onChange={(e) => setSendTime(e.target.value as "now" | "scheduled")} className="w-4 h-4 text-gray-800 border-gray-300 focus:ring-gray-500" />
                      <label htmlFor="sendScheduled" className="ml-2 text-sm text-gray-700">Programar</label>
                    </div>
                  </div>
                  {sendTime === "scheduled" && (
                    <div className="mt-3 grid grid-cols-2 gap-3">
                      <div>
                        <label htmlFor="scheduledDate" className="block text-xs font-bold text-gray-700 uppercase tracking-wide mb-1">Fecha</label>
                        <input type="date" id="scheduledDate" value={scheduledDate} onChange={(e) => setScheduledDate(e.target.value)} className="w-full px-3 py-2 text-sm text-gray-900 bg-white border border-gray-300 focus:border-gray-500 focus:ring-0 focus:outline-none transition-colors" />
                      </div>
                      <div>
                        <label htmlFor="scheduledTime" className="block text-xs font-bold text-gray-700 uppercase tracking-wide mb-1">Hora</label>
                        <input type="time" id="scheduledTime" value={scheduledTime} onChange={(e) => setScheduledTime(e.target.value)} className="w-full px-3 py-2 text-sm text-gray-900 bg-white border border-gray-300 focus:border-gray-500 focus:ring-0 focus:outline-none transition-colors" />
                      </div>
                    </div>
                  )}
                </div>
              </form>

              <div className="px-4 py-3 bg-gray-100 border-t border-gray-300 space-y-2">
                <button type="button" className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-white text-gray-800 text-sm font-semibold border border-gray-300 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 transition-colors">
                  <Eye className="w-4 h-4" aria-hidden="true" />
                  Vista previa
                </button>
                <button type="submit" onClick={handleSubmit} className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-gray-800 text-white text-sm font-semibold hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2 transition-colors">
                  <Send className="w-4 h-4" aria-hidden="true" />
                  Enviar
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
