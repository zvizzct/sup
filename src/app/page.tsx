"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { Eye, EyeOff, ArrowRight } from "lucide-react";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    identifier: "",
    password: "",
  });

  const t = useTranslations("auth");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    window.location.href = "/panel";
  };

  return (
    <div className="min-h-screen flex">
      {/* Left side - Form */}
      <div className="w-full lg:w-[40%] flex flex-col justify-center px-8 sm:px-16 lg:px-20 py-12 bg-white">
        <div className="w-full max-w-md mx-auto">
          {/* Logo - Centered */}
          <div className="mb-8 flex justify-center">
            <Image
              src="/images/logo-sup.png"
              alt="SUP - Sindicato Unificado de Policía"
              width={180}
              height={60}
              className="h-16 w-auto"
              priority
            />
          </div>

          {/* Title - Centered */}
          <div className="mb-10 text-center">
            <h1 className="font-heading text-4xl sm:text-5xl font-bold text-gray-900 leading-tight">
              Acceso Afiliados
            </h1>
            <div className="w-16 h-1 bg-sup-blue mt-6 mx-auto"></div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Username field */}
            <div>
              <label htmlFor="identifier" className="sr-only">
                Nombre de usuario o TIP
              </label>
              <input
                id="identifier"
                type="text"
                placeholder="Nombre de usuario"
                className="w-full px-0 py-4 text-base text-gray-900 placeholder:text-gray-500 bg-transparent border-0 border-b-2 border-gray-300 focus:border-sup-blue focus:ring-0 focus:outline-none transition-colors"
                value={formData.identifier}
                onChange={(e) => setFormData({ ...formData, identifier: e.target.value })}
                required
                aria-required="true"
              />
            </div>

            {/* Password field */}
            <div className="relative">
              <label htmlFor="password" className="sr-only">
                Contraseña
              </label>
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Contraseña"
                className="w-full px-0 py-4 pr-12 text-base text-gray-900 placeholder:text-gray-500 bg-transparent border-0 border-b-2 border-gray-300 focus:border-sup-blue focus:ring-0 focus:outline-none transition-colors"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                required
                aria-required="true"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-0 top-1/2 -translate-y-1/2 p-2 text-gray-600 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-sup-blue rounded"
                tabIndex={-1}
                aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>

            {/* Submit button */}
            <div className="pt-4">
              <button
                type="submit"
                disabled={isLoading}
                className="group w-full sm:w-auto inline-flex items-center justify-center gap-3 px-10 py-4 bg-sup-blue text-white font-semibold hover:bg-sup-blue-dark focus:outline-none focus:ring-2 focus:ring-sup-blue focus:ring-offset-2 disabled:opacity-70 disabled:cursor-not-allowed transition-all"
              >
                {isLoading ? (
                  <>
                    <svg className="animate-spin w-5 h-5" viewBox="0 0 24 24" aria-hidden="true">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    <span>INICIANDO SESIÓN</span>
                  </>
                ) : (
                  <>
                    <ArrowRight className="w-5 h-5" aria-hidden="true" />
                    <span>INICIAR SESIÓN</span>
                  </>
                )}
              </button>
            </div>
          </form>

          {/* Links */}
          <div className="mt-8">
            <Link
              href="/recuperar-clave"
              className="text-sup-blue hover:text-sup-blue-dark text-sm font-semibold underline focus:outline-none focus:ring-2 focus:ring-sup-blue focus:ring-offset-2 rounded transition-colors"
            >
              Recuperar contraseña
            </Link>
          </div>

          {/* Footer info */}
          <div className="mt-16 pt-8 border-t border-gray-300">
            <p className="text-sm text-gray-700">
              ¿No eres afiliado?{" "}
              <Link href="/afiliarse" className="text-sup-blue hover:text-sup-blue-dark font-semibold underline focus:outline-none focus:ring-2 focus:ring-sup-blue rounded">
                Infórmate aquí
              </Link>
            </p>
            <p className="text-sm text-gray-600 mt-4">
              © {new Date().getFullYear()} Sindicato Unificado de Policía
            </p>
          </div>
        </div>
      </div>

      {/* Right side - Image */}
      <div className="hidden lg:block lg:w-[60%] relative">
        {/* Background image */}
        <Image
          src="/images/area-privada.jpg"
          alt="Policía Nacional de España"
          fill
          className="object-cover"
          priority
        />
        {/* Dark overlay para mejor contraste */}
        <div className="absolute inset-0 bg-gray-900/60"></div>


      </div>
    </div>
  );
}
