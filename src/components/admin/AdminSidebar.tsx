"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  FileText,
  Scale,
  MessageSquare,
  Settings,
  BarChart3,
  LogOut,
  ChevronRight,
  Menu,
  X,
} from "lucide-react";

const navigation = [
  { name: "Inicio", href: "/admin", icon: LayoutDashboard },
  { name: "Afiliados", href: "/admin/afiliados", icon: Users },
  { name: "Documentos", href: "/admin/documentos", icon: FileText },
  { name: "Solicitudes", href: "/admin/solicitudes", icon: Scale },
  { name: "Comunicaciones", href: "/admin/comunicaciones", icon: MessageSquare },
  { name: "Estadísticas", href: "/admin/estadisticas", icon: BarChart3 },
  { name: "Configuración", href: "/admin/configuracion", icon: Settings },
];

export function AdminSidebar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const isActive = (href: string) => {
    if (href === "/admin") {
      return pathname === "/admin";
    }
    return pathname.startsWith(href);
  };

  return (
    <>
      <header className="lg:hidden fixed top-0 left-0 right-0 z-50 h-14 bg-gray-900 flex items-center justify-between px-4">
        <Link href="/admin" className="flex items-center">
          <Image
            src="/images/logo-sup.png"
            alt="SUP"
            width={100}
            height={33}
            className="h-7 w-auto"
            priority
          />
        </Link>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="p-2 text-gray-400 hover:text-white hover:bg-gray-800 rounded transition-colors focus:outline-none focus:ring-2 focus:ring-white"
          aria-expanded={isOpen}
          aria-label={isOpen ? "Cerrar menú" : "Abrir menú"}
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </header>

      {isOpen && (
        <div
          className="lg:hidden fixed inset-0 z-40 bg-black/60 backdrop-blur-sm"
          onClick={() => setIsOpen(false)}
          aria-hidden="true"
        />
      )}

      <aside
        className={`
          fixed top-0 left-0 z-50 h-screen w-64 bg-gray-900 text-white flex flex-col
          transform transition-transform duration-300 ease-in-out
          lg:translate-x-0
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        <div className="hidden lg:flex h-16 items-center justify-center border-b border-gray-800 px-4">
          <Link href="/admin" className="flex items-center gap-2">
            <Image
              src="/images/logo-sup.png"
              alt="SUP"
              width={120}
              height={40}
              className="h-8 w-auto"
              priority
            />
          </Link>
        </div>

        <div className="lg:hidden h-14 border-b border-gray-800" />

        <div className="px-4 py-3 border-b border-gray-800">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-500 rounded-full" />
            <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
              Panel de Administración
            </span>
          </div>
        </div>

        <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
          {navigation.map((item) => {
            const active = isActive(item.href);
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`
                  flex items-center gap-3 px-3 py-2.5 text-sm font-medium rounded transition-colors
                  ${active
                    ? "bg-sup-blue text-white"
                    : "text-gray-400 hover:bg-gray-800 hover:text-white"
                  }
                `}
              >
                <item.icon className="w-5 h-5 flex-shrink-0" aria-hidden="true" />
                <span className="flex-1">{item.name}</span>
                {active && (
                  <ChevronRight className="w-4 h-4" aria-hidden="true" />
                )}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-gray-800">
          <div className="mb-3 px-3">
            <p className="text-sm font-medium text-white">Admin Usuario</p>
            <p className="text-xs text-gray-500">admin@sup.es</p>
          </div>
          <Link
            href="/"
            className="flex items-center gap-3 px-3 py-2 text-sm font-medium text-gray-400 hover:bg-gray-800 hover:text-white rounded transition-colors"
          >
            <LogOut className="w-5 h-5" aria-hidden="true" />
            <span>Cerrar sesión</span>
          </Link>
        </div>
      </aside>
    </>
  );
}
