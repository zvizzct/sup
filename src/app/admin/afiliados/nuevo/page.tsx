"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Save, X } from "lucide-react";
import { ActionBar, ActionButton } from "@/components/admin/ActionBar";
import { PageFooter } from "@/components/admin/PageFooter";
import type { EstadoAfiliado } from "@/lib/shared";

const DESTINOS = [
  "Comisaría Provincial de Barcelona",
  "Comisaría Provincial de Madrid",
  "Comisaría Provincial de Valencia",
  "Comisaría Provincial de Sevilla",
  "Comisaría Provincial de Bilbao",
  "Comisaría Provincial de Zaragoza",
  "TEDAX-NRBQ",
  "GEO - Grupo Especial de Operaciones",
  "Brigada Provincial de Policía Científica",
  "Unidad de Intervención Policial (UIP)",
];

export default function NuevoAfiliadoPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    tip: "",
    dni: "",
    nombre: "",
    apellido1: "",
    apellido2: "",
    email: "",
    telefono: "",
    destino: "",
    fechaIngresoCNP: "",
    estado: "Pendiente" as EstadoAfiliado,
    direccion: "",
    codigoPostal: "",
    localidad: "",
    provincia: "",
    iban: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    router.push("/admin/afiliados");
  };

  const handleCancel = () => {
    router.push("/admin/afiliados");
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <ActionBar
        title="Nuevo Afiliado"
        subtitle="Registro de nuevo afiliado en el sindicato"
        backHref="/admin/afiliados"
        actions={
          <>
            <ActionButton
              variant="secondary"
              icon={<X className="w-4 h-4" aria-hidden="true" />}
              onClick={handleCancel}
            >
              <span className="hidden sm:inline">Cancelar</span>
            </ActionButton>
            <button
              type="submit"
              form="nuevo-afiliado-form"
              className="flex items-center gap-2 px-3 sm:px-4 py-2 bg-gray-800 text-white text-sm font-semibold hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2 transition-colors"
            >
              <Save className="w-4 h-4" aria-hidden="true" />
              <span className="hidden sm:inline">Guardar</span>
            </button>
          </>
        }
      />

      <div className="p-4 sm:p-6">
        <form id="nuevo-afiliado-form" onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
          <div className="bg-white border border-gray-300">
            <div className="px-4 py-3 border-b border-gray-300">
              <h2 className="text-sm font-bold text-gray-900 uppercase tracking-wide">
                Datos de Identificación
              </h2>
            </div>
            <div className="p-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <div>
                  <label htmlFor="tip" className="block text-xs font-bold text-gray-700 uppercase tracking-wide mb-1">
                    TIP *
                  </label>
                  <input
                    type="text"
                    id="tip"
                    name="tip"
                    value={formData.tip}
                    onChange={handleChange}
                    required
                    placeholder="12345"
                    className="w-full px-3 py-2 text-sm text-gray-900 bg-white border border-gray-300 focus:border-gray-500 focus:ring-0 focus:outline-none transition-colors font-mono"
                  />
                </div>
                <div>
                  <label htmlFor="dni" className="block text-xs font-bold text-gray-700 uppercase tracking-wide mb-1">
                    DNI *
                  </label>
                  <input
                    type="text"
                    id="dni"
                    name="dni"
                    value={formData.dni}
                    onChange={handleChange}
                    required
                    placeholder="12345678A"
                    className="w-full px-3 py-2 text-sm text-gray-900 bg-white border border-gray-300 focus:border-gray-500 focus:ring-0 focus:outline-none transition-colors"
                  />
                </div>
                <div className="sm:col-span-2 lg:col-span-1">
                  <label htmlFor="estado" className="block text-xs font-bold text-gray-700 uppercase tracking-wide mb-1">
                    Estado
                  </label>
                  <select
                    id="estado"
                    name="estado"
                    value={formData.estado}
                    onChange={handleChange}
                    className="w-full px-3 py-2 text-sm text-gray-900 bg-white border border-gray-300 focus:border-gray-500 focus:ring-0 focus:outline-none transition-colors"
                  >
                    <option value="Pendiente">Pendiente</option>
                    <option value="Activo">Activo</option>
                    <option value="Inactivo">Inactivo</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white border border-gray-300">
            <div className="px-4 py-3 border-b border-gray-300">
              <h2 className="text-sm font-bold text-gray-900 uppercase tracking-wide">
                Datos Personales
              </h2>
            </div>
            <div className="p-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <div>
                  <label htmlFor="nombre" className="block text-xs font-bold text-gray-700 uppercase tracking-wide mb-1">
                    Nombre *
                  </label>
                  <input
                    type="text"
                    id="nombre"
                    name="nombre"
                    value={formData.nombre}
                    onChange={handleChange}
                    required
                    placeholder="Juan"
                    className="w-full px-3 py-2 text-sm text-gray-900 bg-white border border-gray-300 focus:border-gray-500 focus:ring-0 focus:outline-none transition-colors"
                  />
                </div>
                <div>
                  <label htmlFor="apellido1" className="block text-xs font-bold text-gray-700 uppercase tracking-wide mb-1">
                    Primer Apellido *
                  </label>
                  <input
                    type="text"
                    id="apellido1"
                    name="apellido1"
                    value={formData.apellido1}
                    onChange={handleChange}
                    required
                    placeholder="García"
                    className="w-full px-3 py-2 text-sm text-gray-900 bg-white border border-gray-300 focus:border-gray-500 focus:ring-0 focus:outline-none transition-colors"
                  />
                </div>
                <div>
                  <label htmlFor="apellido2" className="block text-xs font-bold text-gray-700 uppercase tracking-wide mb-1">
                    Segundo Apellido
                  </label>
                  <input
                    type="text"
                    id="apellido2"
                    name="apellido2"
                    value={formData.apellido2}
                    onChange={handleChange}
                    placeholder="López"
                    className="w-full px-3 py-2 text-sm text-gray-900 bg-white border border-gray-300 focus:border-gray-500 focus:ring-0 focus:outline-none transition-colors"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-xs font-bold text-gray-700 uppercase tracking-wide mb-1">
                    Email *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="juan.garcia@email.com"
                    className="w-full px-3 py-2 text-sm text-gray-900 bg-white border border-gray-300 focus:border-gray-500 focus:ring-0 focus:outline-none transition-colors"
                  />
                </div>
                <div>
                  <label htmlFor="telefono" className="block text-xs font-bold text-gray-700 uppercase tracking-wide mb-1">
                    Teléfono *
                  </label>
                  <input
                    type="tel"
                    id="telefono"
                    name="telefono"
                    value={formData.telefono}
                    onChange={handleChange}
                    required
                    placeholder="612 345 678"
                    className="w-full px-3 py-2 text-sm text-gray-900 bg-white border border-gray-300 focus:border-gray-500 focus:ring-0 focus:outline-none transition-colors"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white border border-gray-300">
            <div className="px-4 py-3 border-b border-gray-300">
              <h2 className="text-sm font-bold text-gray-900 uppercase tracking-wide">
                Dirección
              </h2>
            </div>
            <div className="p-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="sm:col-span-2 lg:col-span-4">
                  <label htmlFor="direccion" className="block text-xs font-bold text-gray-700 uppercase tracking-wide mb-1">
                    Dirección
                  </label>
                  <input
                    type="text"
                    id="direccion"
                    name="direccion"
                    value={formData.direccion}
                    onChange={handleChange}
                    placeholder="Calle Ejemplo, 123, 2ºA"
                    className="w-full px-3 py-2 text-sm text-gray-900 bg-white border border-gray-300 focus:border-gray-500 focus:ring-0 focus:outline-none transition-colors"
                  />
                </div>
                <div>
                  <label htmlFor="codigoPostal" className="block text-xs font-bold text-gray-700 uppercase tracking-wide mb-1">
                    Código Postal
                  </label>
                  <input
                    type="text"
                    id="codigoPostal"
                    name="codigoPostal"
                    value={formData.codigoPostal}
                    onChange={handleChange}
                    placeholder="08001"
                    maxLength={5}
                    className="w-full px-3 py-2 text-sm text-gray-900 bg-white border border-gray-300 focus:border-gray-500 focus:ring-0 focus:outline-none transition-colors"
                  />
                </div>
                <div>
                  <label htmlFor="localidad" className="block text-xs font-bold text-gray-700 uppercase tracking-wide mb-1">
                    Localidad
                  </label>
                  <input
                    type="text"
                    id="localidad"
                    name="localidad"
                    value={formData.localidad}
                    onChange={handleChange}
                    placeholder="Barcelona"
                    className="w-full px-3 py-2 text-sm text-gray-900 bg-white border border-gray-300 focus:border-gray-500 focus:ring-0 focus:outline-none transition-colors"
                  />
                </div>
                <div className="sm:col-span-2 lg:col-span-2">
                  <label htmlFor="provincia" className="block text-xs font-bold text-gray-700 uppercase tracking-wide mb-1">
                    Provincia
                  </label>
                  <input
                    type="text"
                    id="provincia"
                    name="provincia"
                    value={formData.provincia}
                    onChange={handleChange}
                    placeholder="Barcelona"
                    className="w-full px-3 py-2 text-sm text-gray-900 bg-white border border-gray-300 focus:border-gray-500 focus:ring-0 focus:outline-none transition-colors"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white border border-gray-300">
            <div className="px-4 py-3 border-b border-gray-300">
              <h2 className="text-sm font-bold text-gray-900 uppercase tracking-wide">
                Datos Profesionales
              </h2>
            </div>
            <div className="p-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="destino" className="block text-xs font-bold text-gray-700 uppercase tracking-wide mb-1">
                    Destino *
                  </label>
                  <select
                    id="destino"
                    name="destino"
                    value={formData.destino}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 text-sm text-gray-900 bg-white border border-gray-300 focus:border-gray-500 focus:ring-0 focus:outline-none transition-colors"
                  >
                    <option value="">Seleccionar destino...</option>
                    {DESTINOS.map((destino) => (
                      <option key={destino} value={destino}>{destino}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label htmlFor="fechaIngresoCNP" className="block text-xs font-bold text-gray-700 uppercase tracking-wide mb-1">
                    Fecha de Ingreso en CNP
                  </label>
                  <input
                    type="date"
                    id="fechaIngresoCNP"
                    name="fechaIngresoCNP"
                    value={formData.fechaIngresoCNP}
                    onChange={handleChange}
                    className="w-full px-3 py-2 text-sm text-gray-900 bg-white border border-gray-300 focus:border-gray-500 focus:ring-0 focus:outline-none transition-colors"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white border border-gray-300">
            <div className="px-4 py-3 border-b border-gray-300">
              <h2 className="text-sm font-bold text-gray-900 uppercase tracking-wide">
                Datos Bancarios
              </h2>
            </div>
            <div className="p-4">
              <div>
                <label htmlFor="iban" className="block text-xs font-bold text-gray-700 uppercase tracking-wide mb-1">
                  IBAN (para domiciliación de cuotas)
                </label>
                <input
                  type="text"
                  id="iban"
                  name="iban"
                  value={formData.iban}
                  onChange={handleChange}
                  placeholder="ES00 0000 0000 0000 0000 0000"
                  className="w-full px-3 py-2 text-sm text-gray-900 bg-white border border-gray-300 focus:border-gray-500 focus:ring-0 focus:outline-none transition-colors font-mono"
                />
                <p className="mt-1 text-xs text-gray-500">
                  El IBAN se utilizará para la domiciliación de las cuotas sindicales.
                </p>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 sm:justify-end">
            <button
              type="button"
              onClick={handleCancel}
              className="w-full sm:w-auto px-6 py-2 bg-white text-gray-800 text-sm font-semibold border border-gray-300 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-2 bg-gray-800 text-white text-sm font-semibold hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2 transition-colors"
            >
              <Save className="w-4 h-4" aria-hidden="true" />
              Guardar Afiliado
            </button>
          </div>
        </form>

        <PageFooter />
      </div>
    </div>
  );
}
