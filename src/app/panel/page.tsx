"use client";

import Link from "next/link";
import { useTranslations } from "next-intl";
import { Header, Footer } from "@/components/layout";
import {
  FileText,
  Bell,
  Calendar,
  Briefcase,
  Users,
  FileCheck,
  MessageSquare,
  ChevronRight,
  AlertCircle,
  Info,
  Download,
  FolderOpen,
  Shield,
  Scale,
  User,
  Building,
} from "lucide-react";

// Datos de ejemplo
const userData = {
  name: "Juan García López",
  tip: "12345",
  escala: "Escala Básica",
  categoria: "Policía",
  destino: "Comisaría Eixample (Barcelona)",
  antiguedad: "15 años",
  afiliadoDesde: "01/03/2010",
};

const comunicadosRecientes = [
  {
    id: 1,
    tipo: "urgente",
    titulo: "Nuevo plazo concurso de traslados",
    fecha: "Hace 2 horas",
    extracto: "Se ha publicado la resolución con el nuevo plazo para presentar solicitudes...",
  },
  {
    id: 2,
    tipo: "info",
    titulo: "Acta reunión trimestral disponible",
    fecha: "Hace 1 día",
    extracto: "Ya podéis consultar el acta de la última reunión trimestral...",
  },
  {
    id: 3,
    tipo: "convocatoria",
    titulo: "Asamblea de afiliados - Enero 2025",
    fecha: "Hace 3 días",
    extracto: "Se convoca asamblea ordinaria de afiliados del SUP...",
  },
];

const proximosPlazos = [
  { fecha: "15 Ene", titulo: "Plazo instancias comisión de servicio" },
  { fecha: "20 Ene", titulo: "Reunión trimestral JSP Barcelona" },
  { fecha: "31 Ene", titulo: "Plazo solicitud vestuario" },
];

const accesosRapidos = [
  { icon: FileText, label: "Instancias", href: "/documentos/instancias", color: "bg-blue-100 text-blue-600" },
  { icon: Briefcase, label: "Vestuario", href: "/documentos/vestuario", color: "bg-amber-100 text-amber-600" },
  { icon: FileCheck, label: "Reclamaciones", href: "/documentos/reclamaciones", color: "bg-green-100 text-green-600" },
  { icon: Building, label: "Comisión Servicio", href: "/documentos/comision-servicio", color: "bg-purple-100 text-purple-600" },
  { icon: Users, label: "Trimestrales", href: "/documentos/trimestrales", color: "bg-indigo-100 text-indigo-600" },
  { icon: Scale, label: "Vacantes", href: "/vacantes", color: "bg-pink-100 text-pink-600" },
];

export default function PanelPage() {
  const t = useTranslations("panel");
  const tComm = useTranslations("communications");

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header variant="private" userName={userData.name} />

      <main className="flex-1">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Bienvenida */}
          <div className="bg-white rounded-lg shadow-card border border-gray-200 p-6 mb-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-500 mr-1.5"></span>
                    {t("affiliateZone")}
                  </span>
                </div>
                <h1 className="font-heading text-2xl font-bold text-gray-900">
                  {t("welcome")}, {userData.name}
                </h1>
                <p className="text-gray-600 mt-1">
                  TIP: {userData.tip} · {userData.escala} · {userData.destino}
                </p>
              </div>
              <Link
                href="/mi-perfil"
                className="btn-secondary text-sm self-start sm:self-auto"
              >
                <User className="w-4 h-4" />
                {t("myAffiliation")}
              </Link>
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            {/* Columna principal */}
            <div className="lg:col-span-2 space-y-6">
              {/* Comunicados recientes */}
              <div className="bg-white rounded-lg shadow-card border border-gray-200">
                <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
                  <h2 className="font-heading font-semibold text-gray-900 flex items-center gap-2">
                    <Bell className="w-5 h-5 text-sup-blue" />
                    {t("recentCommunications")}
                  </h2>
                  <Link href="/comunicados" className="text-sm text-sup-blue hover:text-sup-blue-dark font-medium">
                    {t("viewAll")} →
                  </Link>
                </div>
                <div className="divide-y divide-gray-100">
                  {comunicadosRecientes.map((comunicado) => (
                    <div key={comunicado.id} className="px-6 py-4 hover:bg-gray-50 transition-colors">
                      <div className="flex items-start gap-3">
                        <div className={`mt-0.5 flex-shrink-0 ${
                          comunicado.tipo === "urgente"
                            ? "text-red-500"
                            : comunicado.tipo === "info"
                            ? "text-blue-500"
                            : "text-green-500"
                        }`}>
                          {comunicado.tipo === "urgente" ? (
                            <AlertCircle className="w-5 h-5" />
                          ) : comunicado.tipo === "info" ? (
                            <Info className="w-5 h-5" />
                          ) : (
                            <Calendar className="w-5 h-5" />
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <span className={`badge ${
                              comunicado.tipo === "urgente"
                                ? "badge-red"
                                : comunicado.tipo === "info"
                                ? "badge-blue"
                                : "badge-green"
                            }`}>
                              {comunicado.tipo === "urgente" ? tComm("urgent") : comunicado.tipo === "info" ? tComm("informative") : tComm("convocation")}
                            </span>
                            <span className="text-xs text-gray-500">{comunicado.fecha}</span>
                          </div>
                          <h3 className="font-medium text-gray-900 mb-1">{comunicado.titulo}</h3>
                          <p className="text-sm text-gray-600 line-clamp-2">{comunicado.extracto}</p>
                        </div>
                        <ChevronRight className="w-5 h-5 text-gray-400 flex-shrink-0" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Acceso rápido a documentos */}
              <div className="bg-white rounded-lg shadow-card border border-gray-200">
                <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
                  <h2 className="font-heading font-semibold text-gray-900 flex items-center gap-2">
                    <FolderOpen className="w-5 h-5 text-sup-blue" />
                    {t("quickAccess")}
                  </h2>
                  <Link href="/documentos" className="text-sm text-sup-blue hover:text-sup-blue-dark font-medium">
                    {t("viewAll")} →
                  </Link>
                </div>
                <div className="p-6">
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                    {accesosRapidos.map((acceso) => (
                      <Link
                        key={acceso.label}
                        href={acceso.href}
                        className="flex flex-col items-center p-4 rounded-lg border border-gray-200 hover:border-sup-blue hover:shadow-md transition-all group"
                      >
                        <div className={`w-12 h-12 rounded-lg ${acceso.color} flex items-center justify-center mb-3 group-hover:scale-110 transition-transform`}>
                          <acceso.icon className="w-6 h-6" />
                        </div>
                        <span className="text-sm font-medium text-gray-700 text-center group-hover:text-sup-blue">
                          {acceso.label}
                        </span>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>

              {/* Mi Expediente Personal */}
              <div className="bg-gradient-to-r from-red-50 to-red-100 rounded-lg border border-red-200 p-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg bg-red-500 text-white flex items-center justify-center flex-shrink-0">
                    <Shield className="w-6 h-6" />
                  </div>
                  <div className="flex-1">
                    <h2 className="font-heading font-semibold text-gray-900 mb-1">
                      {t("myPersonalFile")}
                    </h2>
                    <p className="text-sm text-gray-600 mb-4">
                      {t("myPersonalFileDesc")}
                    </p>
                    <Link href="/mi-expediente" className="btn-primary">
                      {t("accessMyFile")} →
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            {/* Sidebar derecho */}
            <div className="space-y-6">
              {/* Próximos plazos */}
              <div className="bg-white rounded-lg shadow-card border border-gray-200">
                <div className="px-6 py-4 border-b border-gray-200">
                  <h2 className="font-heading font-semibold text-gray-900 flex items-center gap-2">
                    <Calendar className="w-5 h-5 text-sup-blue" />
                    {t("upcomingDeadlines")}
                  </h2>
                </div>
                <div className="p-4">
                  <div className="space-y-3">
                    {proximosPlazos.map((plazo, i) => (
                      <div key={i} className="flex items-start gap-3 p-3 rounded-lg bg-gray-50">
                        <div className="flex-shrink-0 w-14 text-center">
                          <div className="text-xs text-gray-500 uppercase">2025</div>
                          <div className="font-bold text-sup-blue">{plazo.fecha}</div>
                        </div>
                        <div className="flex-1">
                          <p className="text-sm text-gray-700">{plazo.titulo}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <Link
                    href="/calendario"
                    className="block mt-4 text-center text-sm text-sup-blue hover:text-sup-blue-dark font-medium"
                  >
                    {t("viewFullCalendar")} →
                  </Link>
                </div>
              </div>

              {/* Info afiliación */}
              <div className="bg-white rounded-lg shadow-card border border-gray-200">
                <div className="px-6 py-4 border-b border-gray-200">
                  <h2 className="font-heading font-semibold text-gray-900 flex items-center gap-2">
                    <Users className="w-5 h-5 text-sup-blue" />
                    {t("myAffiliation")}
                  </h2>
                </div>
                <div className="p-4 space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-500">{t("status")}</span>
                    <span className="badge badge-green">{t("active")}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">{t("affiliateSince")}</span>
                    <span className="font-medium text-gray-900">{userData.afiliadoDesde}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">{t("seniority")}</span>
                    <span className="font-medium text-gray-900">{userData.antiguedad}</span>
                  </div>
                  <div className="pt-3 border-t border-gray-100">
                    <Link
                      href="/mi-perfil/certificados"
                      className="flex items-center justify-between text-sup-blue hover:text-sup-blue-dark"
                    >
                      <span className="flex items-center gap-2">
                        <Download className="w-4 h-4" />
                        {t("affiliateCertificate")}
                      </span>
                      <ChevronRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </div>

              {/* Contacto rápido */}
              <div className="bg-sup-blue rounded-lg p-6 text-white">
                <h3 className="font-heading font-semibold mb-2 flex items-center gap-2">
                  <MessageSquare className="w-5 h-5" />
                  {t("needHelp")}
                </h3>
                <p className="text-sm text-blue-100 mb-4">
                  {t("helpText")}
                </p>
                <Link
                  href="/contacto"
                  className="block w-full text-center py-2 bg-white text-sup-blue font-semibold rounded hover:bg-gray-100 transition-colors"
                >
                  {t("contactUs")}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
