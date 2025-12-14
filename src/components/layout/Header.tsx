"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { useTranslations } from "next-intl";
import { Mail, Phone, Calendar, Menu, X, User } from "lucide-react";

interface HeaderProps {
  variant?: "public" | "private";
  userName?: string;
}

export function Header({ variant = "public", userName }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const t = useTranslations("nav");
  const tAuth = useTranslations("auth");

  const today = new Date().toLocaleDateString("es-ES", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });

  const navigation = [
    { name: t("infoGeneral"), href: "#" },
    { name: t("legalZone"), href: "#" },
    { name: t("training"), href: "#" },
    { name: t("services"), href: "#" },
  ];

  return (
    <header className="bg-white shadow-sm">
      {/* Top bar */}
      <div className="bg-sup-blue text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-10 text-sm">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              <span>{today}</span>
            </div>
            <div className="hidden sm:flex items-center gap-6">
              <a href="mailto:sup@sup.es" className="flex items-center gap-2 hover:text-sup-yellow transition-colors">
                <Mail className="w-4 h-4" />
                <span>SUP@SUP.ES</span>
              </a>
              <a href="tel:914615833" className="flex items-center gap-2 hover:text-sup-yellow transition-colors">
                <Phone className="w-4 h-4" />
                <span>914 615 833</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Main header */}
      <div className="border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center">
              <Image
                src="/images/logo-sup.png"
                alt="SUP - Sindicato Unificado de Policía"
                width={180}
                height={60}
                className="h-14 w-auto"
                priority
              />
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-1">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-sup-blue hover:bg-gray-50 rounded transition-colors"
                >
                  {item.name}
                </Link>
              ))}
            </nav>

            {/* Right section */}
            <div className="flex items-center gap-4">
              {variant === "public" ? (
                <>
                  <Link
                    href="/afiliarse"
                    className="hidden sm:inline-flex text-sm font-medium text-sup-blue hover:text-sup-blue-dark"
                  >
                    {t("affiliate").toUpperCase()}
                  </Link>
                  <Link href="/" className="btn-primary">
                    {t("privateArea")}
                  </Link>
                </>
              ) : (
                <div className="flex items-center gap-3">
                  <div className="hidden sm:flex items-center gap-2 text-sm text-gray-600">
                    <User className="w-4 h-4" />
                    <span>{userName}</span>
                  </div>
                  <Link href="/" className="btn-secondary text-sm py-2">
                    {t("logout")}
                  </Link>
                </div>
              )}

              {/* Mobile menu button */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-2 text-gray-600 hover:text-sup-blue"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-gray-200">
          <div className="px-4 py-4 space-y-2">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="block px-4 py-2 text-sm font-medium text-gray-700 hover:text-sup-blue hover:bg-gray-50 rounded"
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
            <div className="pt-4 border-t border-gray-200 flex flex-col gap-2">
              <a href="mailto:sup@sup.es" className="flex items-center gap-2 px-4 py-2 text-sm text-gray-600">
                <Mail className="w-4 h-4" />
                SUP@SUP.ES
              </a>
              <a href="tel:914615833" className="flex items-center gap-2 px-4 py-2 text-sm text-gray-600">
                <Phone className="w-4 h-4" />
                914 615 833
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
