"use client";

import Link from "next/link";
import { useTranslations } from "next-intl";
import { Header, Footer } from "@/components/layout";
import {
  ArrowLeft,
  Scale,
  BookOpen,
  Gift,
  FileText,
  Users,
  Shield,
  Download,
  Mail,
  Phone,
  MapPin,
  CheckCircle2,
} from "lucide-react";

export default function AfiliatePage() {
  const t = useTranslations("affiliate");
  const tCommon = useTranslations("common");

  const beneficios = [
    {
      icon: Scale,
      title: t("legalAdvice"),
      description: t("legalAdviceDesc"),
      highlight: t("freeForAffiliates"),
    },
    {
      icon: Users,
      title: t("laborDefense"),
      description: t("laborDefenseDesc"),
      highlight: t("majorityUnion"),
    },
    {
      icon: BookOpen,
      title: t("continuousTraining"),
      description: t("continuousTrainingDesc"),
      highlight: t("exclusiveDiscounts"),
    },
    {
      icon: Gift,
      title: t("benefitsClub"),
      description: t("benefitsClubDesc"),
      highlight: t("companies"),
    },
    {
      icon: FileText,
      title: t("exclusiveInfo"),
      description: t("exclusiveInfoDesc"),
      highlight: t("dailyUpdate"),
    },
    {
      icon: Shield,
      title: t("personalSupport"),
      description: t("personalSupportDesc"),
      highlight: t("support24h"),
    },
  ];

  const pasos = [
    {
      numero: "01",
      titulo: t("step1Title"),
      descripcion: t("step1Desc"),
    },
    {
      numero: "02",
      titulo: t("step2Title"),
      descripcion: t("step2Desc"),
    },
    {
      numero: "03",
      titulo: t("step3Title"),
      descripcion: t("step3Desc"),
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />

      <main className="flex-1">
        {/* Hero */}
        <section className="bg-sup-blue text-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-sm text-blue-200 hover:text-white mb-6"
            >
              <ArrowLeft className="w-4 h-4" />
              {tCommon("back")}
            </Link>

            <div className="max-w-3xl">
              <h1 className="font-heading text-4xl sm:text-5xl font-bold mb-4">
                {t("title")}
              </h1>
              <p className="text-xl text-blue-100 mb-8">
                {t("subtitle")}
              </p>

              <div className="flex flex-wrap gap-6 mb-8">
                <div className="text-center">
                  <div className="font-heading text-3xl font-bold text-sup-yellow">45.000+</div>
                  <div className="text-sm text-blue-200">{t("affiliates")}</div>
                </div>
                <div className="text-center">
                  <div className="font-heading text-3xl font-bold text-sup-yellow">45+</div>
                  <div className="text-sm text-blue-200">{t("yearsHistory")}</div>
                </div>
                <div className="text-center">
                  <div className="font-heading text-3xl font-bold text-sup-yellow">24h</div>
                  <div className="text-sm text-blue-200">{t("urgentAttention")}</div>
                </div>
              </div>

              <a
                href="#como-afiliarse"
                className="btn-yellow py-3 px-6"
              >
                <Download className="w-5 h-5" />
                {t("downloadForm")}
              </a>
            </div>
          </div>
        </section>

        {/* Beneficios */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="font-heading text-3xl font-bold text-gray-900 mb-4">
                {t("benefits")}
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                {t("benefitsDesc")}
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {beneficios.map((beneficio, i) => (
                <div
                  key={i}
                  className="bg-white rounded-lg border border-gray-200 p-6 shadow-card hover:shadow-md transition-shadow"
                >
                  <div className="w-12 h-12 rounded-lg bg-sup-blue-pale flex items-center justify-center mb-4">
                    <beneficio.icon className="w-6 h-6 text-sup-blue" />
                  </div>
                  <h3 className="font-heading font-semibold text-lg text-gray-900 mb-2">
                    {beneficio.title}
                  </h3>
                  <p className="text-sm text-gray-600 mb-4">
                    {beneficio.description}
                  </p>
                  <div className="inline-flex items-center gap-1.5 text-xs font-medium text-green-700 bg-green-100 px-2 py-1 rounded">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    {beneficio.highlight}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Cómo afiliarse */}
        <section id="como-afiliarse" className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-start">
              {/* Pasos */}
              <div>
                <h2 className="font-heading text-3xl font-bold text-gray-900 mb-4">
                  {t("howToAffiliate")}
                </h2>
                <p className="text-gray-600 mb-8">
                  {t("howToAffiliateDesc")}
                </p>

                <div className="space-y-6">
                  {pasos.map((paso, i) => (
                    <div key={i} className="flex gap-4">
                      <div className="flex-shrink-0 w-14 h-14 rounded-lg bg-sup-blue text-white flex items-center justify-center font-heading font-bold text-xl">
                        {paso.numero}
                      </div>
                      <div>
                        <h3 className="font-heading font-semibold text-gray-900 mb-1">
                          {paso.titulo}
                        </h3>
                        <p className="text-sm text-gray-600">{paso.descripcion}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-8">
                  <a
                    href="/documentos/formulario-afiliacion.pdf"
                    download
                    className="btn-primary py-3 px-6"
                  >
                    <Download className="w-5 h-5" />
                    {t("downloadForm")} (PDF)
                  </a>
                </div>
              </div>

              {/* Contacto */}
              <div className="bg-gray-50 rounded-lg border border-gray-200 p-8">
                <h3 className="font-heading text-xl font-bold text-gray-900 mb-2">
                  {t("contactUs")}
                </h3>
                <p className="text-gray-600 mb-6">
                  {t("contactUsDesc")}
                </p>

                <div className="space-y-4">
                  <a
                    href="mailto:sup@sup.es"
                    className="flex items-center gap-4 p-4 bg-white rounded-lg border border-gray-200 hover:border-sup-blue transition-colors"
                  >
                    <div className="w-10 h-10 rounded-lg bg-sup-blue-pale flex items-center justify-center">
                      <Mail className="w-5 h-5 text-sup-blue" />
                    </div>
                    <div>
                      <div className="text-xs text-gray-500">{t("email")}</div>
                      <div className="font-medium text-gray-900">sup@sup.es</div>
                    </div>
                  </a>

                  <a
                    href="tel:914615833"
                    className="flex items-center gap-4 p-4 bg-white rounded-lg border border-gray-200 hover:border-sup-blue transition-colors"
                  >
                    <div className="w-10 h-10 rounded-lg bg-sup-blue-pale flex items-center justify-center">
                      <Phone className="w-5 h-5 text-sup-blue" />
                    </div>
                    <div>
                      <div className="text-xs text-gray-500">{t("phone")}</div>
                      <div className="font-medium text-gray-900">914 615 833</div>
                    </div>
                  </a>

                  <div className="flex items-center gap-4 p-4 bg-white rounded-lg border border-gray-200">
                    <div className="w-10 h-10 rounded-lg bg-sup-blue-pale flex items-center justify-center">
                      <MapPin className="w-5 h-5 text-sup-blue" />
                    </div>
                    <div>
                      <div className="text-xs text-gray-500">{t("address")}</div>
                      <div className="font-medium text-gray-900">
                        C/ Ejemplo, 123<br />
                        28001 Madrid
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-6 border-t border-gray-200">
                  <div className="text-sm text-gray-500 mb-1">{t("schedule")}</div>
                  <p className="text-sm text-gray-700">
                    {t("scheduleHours")}
                  </p>
                  <p className="text-sm text-sup-blue font-medium mt-1">
                    {t("urgentHelp")}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Final */}
        <section className="py-16 bg-sup-blue text-white">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="font-heading text-3xl font-bold mb-4">
              {t("joinToday")}
            </h2>
            <p className="text-blue-100 mb-8">
              {t("joinTodayDesc")}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/documentos/formulario-afiliacion.pdf"
                download
                className="btn-yellow py-3 px-6"
              >
                <Download className="w-5 h-5" />
                {t("downloadForm")}
              </a>
              <Link href="/" className="btn bg-white text-sup-blue hover:bg-gray-100 py-3 px-6">
                {t("alreadyAffiliate")}
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
