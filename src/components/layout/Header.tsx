"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { useTranslations } from "next-intl";
import { Mail, Phone, Menu, X, Shield, LogOut, ChevronDown } from "lucide-react";

interface HeaderProps {
  variant?: "public" | "private";
  userName?: string;
  userTip?: string;
  userDestino?: string;
}

export function Header({ variant = "public", userName, userTip, userDestino }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const t = useTranslations("nav");

  const navigation = [
    { name: t("infoGeneral"), href: "#" },
    { name: t("legalZone"), href: "#" },
    { name: t("training"), href: "#" },
    { name: t("services"), href: "#" },
  ];

  // Header para variant="private" - diseño institucional refinado
  if (variant === "private") {
    return (
      <header className="bg-white shadow-sm sticky top-0 z-40">
        {/* Barra superior institucional */}
        <div className="bg-sup-blue">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <div className="flex items-center justify-between h-8">
              <span className="text-xs text-blue-200 font-medium tracking-wide">
                  Área Privada del Afiliado
                </span>
              <div className="hidden sm:flex items-center gap-4 text-xs text-blue-200">
                <a
                  href="tel:914615833"
                  className="flex items-center gap-1.5 hover:text-white transition-colors"
                >
                  <Phone className="w-3 h-3" aria-hidden="true" />
                  <span>Urgencias: 914 615 833</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Header principal */}
        <div className="bg-white border-b border-gray-200">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <div className="flex items-center justify-between h-14 sm:h-16">
              {/* Logo */}
              <Link
                href="/panel"
                className="flex items-center focus:outline-none focus-visible:ring-2 focus-visible:ring-sup-blue focus-visible:ring-offset-2 rounded"
              >
                <Image
                  src="/images/logo-sup.png"
                  alt="SUP"
                  width={120}
                  height={40}
                  className="h-8 sm:h-9 w-auto"
                  priority
                />
              </Link>

              {/* Desktop: Usuario */}
              <div className="hidden sm:flex items-center gap-3">
                {/* Dropdown de usuario */}
                <div className="relative">
                  <button
                    onClick={() => setUserMenuOpen(!userMenuOpen)}
                    className="flex items-center gap-3 px-3 py-2 rounded hover:bg-gray-50 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-sup-blue"
                  >
                    {/* Avatar con iniciales */}
                    <div className="w-9 h-9 rounded-full bg-gradient-to-br from-sup-blue to-sup-blue-dark flex items-center justify-center shadow-inner">
                      <span className="text-sm font-bold text-white">
                        {userName?.split(" ").map(n => n[0]).join("").slice(0, 2)}
                      </span>
                    </div>
                    <div className="text-left">
                      <p className="text-sm font-semibold text-gray-900 leading-tight">{userName}</p>
                      <div className="flex items-center gap-1.5 mt-0.5">
                        <span className="inline-flex items-center px-1.5 py-0.5 text-[10px] font-bold text-sup-blue bg-sup-blue/10 rounded tracking-wide">
                          TIP {userTip}
                        </span>
                      </div>
                    </div>
                    <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${userMenuOpen ? 'rotate-180' : ''}`} />
                  </button>

                  {/* Dropdown menu */}
                  {userMenuOpen && (
                    <>
                      <div
                        className="fixed inset-0 z-10"
                        onClick={() => setUserMenuOpen(false)}
                        aria-hidden="true"
                      />
                      <div className="absolute right-0 mt-1 w-64 bg-white border border-gray-200 shadow-lg z-20 animate-in fade-in slide-in-from-top-2 duration-200">
                        <div className="px-4 py-3 border-b border-gray-100">
                          <p className="text-xs text-gray-500 uppercase tracking-wide font-medium">Destino</p>
                          <p className="text-sm text-gray-900 mt-0.5 font-medium">{userDestino}</p>
                        </div>
                        <div className="p-2">
                          <Link
                            href="/"
                            className="flex items-center gap-2 w-full px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                            onClick={() => setUserMenuOpen(false)}
                          >
                            <LogOut className="w-4 h-4" aria-hidden="true" />
                            {t("logout")}
                          </Link>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </div>

              {/* Móvil: Usuario compacto */}
              <div className="sm:hidden flex items-center gap-2">
                <Link
                  href="/"
                  className="flex items-center gap-2 px-2.5 py-1.5 text-xs font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded transition-colors"
                >
                  <div className="w-7 h-7 rounded-full bg-gradient-to-br from-sup-blue to-sup-blue-dark flex items-center justify-center">
                    <span className="text-[10px] font-bold text-white">
                      {userName?.split(" ").map(n => n[0]).join("").slice(0, 2)}
                    </span>
                  </div>
                  <LogOut className="w-4 h-4" aria-hidden="true" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </header>
    );
  }

  // Header para variant="public" - con top bar azul
  return (
    <header className="bg-white border-b border-gray-300 sticky top-0 z-40">
      {/* Top bar - Azul institucional */}
      <div className="bg-sup-blue text-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-9 text-sm">
            <div className="flex items-center gap-2">
              <Shield className="w-3.5 h-3.5 text-sup-yellow" aria-hidden="true" />
              <span className="text-xs text-blue-200 uppercase tracking-wide font-medium">
                Sindicato Unificado de Policía
              </span>
            </div>
            <div className="hidden sm:flex items-center gap-6">
              <a
                href="mailto:sup@sup.es"
                className="flex items-center gap-2 text-blue-200 hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-sup-blue rounded"
              >
                <Mail className="w-3.5 h-3.5" aria-hidden="true" />
                <span className="text-xs">sup@sup.es</span>
              </a>
              <a
                href="tel:914615833"
                className="flex items-center gap-2 text-blue-200 hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-sup-blue rounded"
              >
                <Phone className="w-3.5 h-3.5" aria-hidden="true" />
                <span className="text-xs">914 615 833</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Main header */}
      <div className="bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link
              href="/"
              className="flex items-center focus:outline-none focus-visible:ring-2 focus-visible:ring-sup-blue rounded"
            >
              <Image
                src="/images/logo-sup.png"
                alt="SUP - Sindicato Unificado de Policía"
                width={140}
                height={47}
                className="h-10 w-auto"
                priority
              />
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-1" aria-label="Navegación principal">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-sup-blue hover:bg-gray-50 rounded transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-sup-blue"
                >
                  {item.name}
                </Link>
              ))}
            </nav>

            {/* Right section */}
            <div className="flex items-center gap-3">
              <Link
                href="/afiliarse"
                className="hidden sm:inline-flex text-sm font-medium text-gray-700 hover:text-sup-blue underline underline-offset-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-sup-blue rounded"
              >
                {t("affiliate")}
              </Link>
              <Link
                href="/"
                className="px-4 py-2 bg-sup-blue text-white text-sm font-semibold hover:bg-sup-blue-dark transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-sup-blue focus-visible:ring-offset-2 shadow-sm"
              >
                {t("privateArea")}
              </Link>

              {/* Mobile menu button */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-2 text-gray-700 hover:text-sup-blue hover:bg-gray-50 rounded focus:outline-none focus-visible:ring-2 focus-visible:ring-sup-blue"
                aria-expanded={mobileMenuOpen}
                aria-label={mobileMenuOpen ? "Cerrar menú" : "Abrir menú"}
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-t border-gray-200 animate-in slide-in-from-top-2 duration-200">
          <nav className="px-4 py-3 space-y-1" aria-label="Navegación móvil">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="block px-3 py-2.5 text-sm font-medium text-gray-700 hover:text-sup-blue hover:bg-gray-50 rounded transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-sup-blue"
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
            <div className="pt-3 mt-3 border-t border-gray-200 space-y-1">
              <a
                href="mailto:sup@sup.es"
                className="flex items-center gap-2 px-3 py-2.5 text-sm text-gray-600 hover:text-sup-blue hover:bg-gray-50 rounded focus:outline-none focus-visible:ring-2 focus-visible:ring-sup-blue"
              >
                <Mail className="w-4 h-4" aria-hidden="true" />
                sup@sup.es
              </a>
              <a
                href="tel:914615833"
                className="flex items-center gap-2 px-3 py-2.5 text-sm text-gray-600 hover:text-sup-blue hover:bg-gray-50 rounded focus:outline-none focus-visible:ring-2 focus-visible:ring-sup-blue"
              >
                <Phone className="w-4 h-4" aria-hidden="true" />
                914 615 833
              </a>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
