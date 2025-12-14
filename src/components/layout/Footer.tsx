"use client";

import Link from "next/link";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { Mail, Phone, MapPin } from "lucide-react";

export function Footer() {
  const t = useTranslations("footer");
  const tNav = useTranslations("nav");
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-sup-blue text-white mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <div className="mb-4">
              <Image
                src="/images/logo-sup.png"
                alt="SUP - Sindicato Unificado de Policía"
                width={150}
                height={50}
                className="h-12 w-auto"
              />
            </div>
            <p className="text-sm text-gray-300 leading-relaxed">
              {t("defending")}
            </p>
          </div>

          {/* Contacto */}
          <div>
            <h3 className="font-heading font-semibold text-sup-yellow mb-4">{t("contact")}</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <a href="mailto:sup@sup.es" className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors">
                  <Mail className="w-4 h-4" />
                  sup@sup.es
                </a>
              </li>
              <li>
                <a href="tel:914615833" className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors">
                  <Phone className="w-4 h-4" />
                  914 615 833
                </a>
              </li>
              <li>
                <div className="flex items-start gap-2 text-gray-300">
                  <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
                  <span>C/ Ejemplo, 123<br />28001 Madrid</span>
                </div>
              </li>
            </ul>
          </div>

          {/* Enlaces */}
          <div>
            <h3 className="font-heading font-semibold text-sup-yellow mb-4">{t("links")}</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/afiliarse" className="text-gray-300 hover:text-white transition-colors">
                  {tNav("affiliate")}
                </Link>
              </li>
              <li>
                <Link href="/solicitar-acceso" className="text-gray-300 hover:text-white transition-colors">
                  {t("requestAccess")}
                </Link>
              </li>
              <li>
                <a href="https://www.sup.es" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white transition-colors">
                  {t("supNational")}
                </a>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="font-heading font-semibold text-sup-yellow mb-4">{t("legal")}</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/legal/aviso" className="text-gray-300 hover:text-white transition-colors">
                  {t("legalNotice")}
                </Link>
              </li>
              <li>
                <Link href="/legal/privacidad" className="text-gray-300 hover:text-white transition-colors">
                  {t("privacyPolicy")}
                </Link>
              </li>
              <li>
                <Link href="/legal/cookies" className="text-gray-300 hover:text-white transition-colors">
                  {t("cookiesPolicy")}
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-10 pt-6 border-t border-white/20">
          <p className="text-sm text-gray-400 text-center">
            © {currentYear} Sindicato Unificado de Policía. {t("rights")}.
          </p>
        </div>
      </div>
    </footer>
  );
}
