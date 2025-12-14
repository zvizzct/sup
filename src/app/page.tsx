"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { Header, Footer } from "@/components/layout";
import { Mail, Lock, Eye, EyeOff, ChevronRight, AlertCircle } from "lucide-react";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    identifier: "",
    password: "",
    remember: false,
  });

  const t = useTranslations("auth");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    // Simulate login - redirect to panel on success
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // For demo, redirect to panel
    window.location.href = "/panel";
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />

      <main className="flex-1 flex items-center justify-center py-12 px-4">
        <div className="w-full max-w-md">
          {/* Login card */}
          <div className="bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden">
            {/* Header */}
            <div className="bg-sup-blue px-6 py-8 text-center text-white">
              <div className="mx-auto mb-4">
                <Image
                  src="/images/logo-sup.png"
                  alt="SUP - Sindicato Unificado de Policía"
                  width={160}
                  height={53}
                  className="h-16 w-auto mx-auto brightness-0 invert"
                  priority
                />
              </div>
              <h1 className="font-heading text-2xl font-bold mb-1">
                {t("loginTitle")}
              </h1>
              <p className="text-blue-100 text-sm">
                {t("loginSubtitle")}
              </p>
            </div>

            {/* Form */}
            <div className="p-6">
              {error && (
                <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded flex items-center gap-2 text-red-700 text-sm">
                  <AlertCircle className="w-4 h-4 flex-shrink-0" />
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Email/TIP field */}
                <div>
                  <label htmlFor="identifier" className="block text-sm font-medium text-gray-700 mb-1">
                    {t("emailOrTip")}
                  </label>
                  <div className="input-group">
                    <Mail className="input-icon w-5 h-5" />
                    <input
                      id="identifier"
                      type="text"
                      placeholder={t("emailOrTipPlaceholder")}
                      className="input-with-icon"
                      value={formData.identifier}
                      onChange={(e) => setFormData({ ...formData, identifier: e.target.value })}
                      required
                    />
                  </div>
                </div>

                {/* Password field */}
                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                    {t("password")}
                  </label>
                  <div className="input-group">
                    <Lock className="input-icon w-5 h-5" />
                    <input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder={t("passwordPlaceholder")}
                      className="input-with-icon pr-10"
                      value={formData.password}
                      onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                      tabIndex={-1}
                    >
                      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                </div>

                {/* Remember & Forgot */}
                <div className="flex items-center justify-between text-sm">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.remember}
                      onChange={(e) => setFormData({ ...formData, remember: e.target.checked })}
                      className="w-4 h-4 rounded border-gray-300 text-sup-blue focus:ring-sup-blue"
                    />
                    <span className="text-gray-600">{t("rememberMe")}</span>
                  </label>
                  <Link href="/recuperar-clave" className="text-sup-blue hover:text-sup-blue-dark">
                    {t("forgotPassword")}
                  </Link>
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={isLoading}
                  className="btn-primary w-full py-3"
                >
                  {isLoading ? (
                    <span className="flex items-center justify-center gap-2">
                      <svg className="animate-spin w-5 h-5" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      {t("loggingIn")}
                    </span>
                  ) : (
                    <span className="flex items-center justify-center gap-2">
                      {t("login")}
                      <ChevronRight className="w-5 h-5" />
                    </span>
                  )}
                </button>
              </form>

              {/* Divider */}
              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-200"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-4 bg-white text-gray-500">{t("noAccess")}</span>
                </div>
              </div>

              {/* Alternative actions */}
              <div className="space-y-3">
                <Link href="/solicitar-acceso" className="btn-secondary w-full justify-center">
                  {t("requestAccess")}
                </Link>
                <Link href="/afiliarse" className="block text-center text-sm text-sup-blue hover:text-sup-blue-dark">
                  {t("notAffiliate")}
                </Link>
              </div>
            </div>
          </div>

          {/* Security note */}
          <p className="mt-6 text-center text-xs text-gray-500">
            🔒 {t("secureConnection")}
          </p>
        </div>
      </main>

      <Footer />
    </div>
  );
}
