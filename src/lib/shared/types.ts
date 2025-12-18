// Estados
export type EstadoAfiliado = "Activo" | "Inactivo" | "Pendiente";
export type EstadoSolicitud = "Nueva" | "Asignada" | "En trámite" | "Resuelta";
export type EstadoDocumento = "Vigente" | "Pendiente" | "Archivado";
export type EstadoCuota = "Al día" | "Pendiente";

// Urgencias
export type Urgencia = "Alta" | "Normal" | "Baja";

// Tipos de solicitud
export type TipoSolicitud =
  | "Expediente disciplinario"
  | "Recurso de alzada"
  | "Tema penal"
  | "Accidente tráfico"
  | "Asesoramiento laboral"
  | "Reclamación patrimonial";

// Tipos de comunicación
export type TipoComunicacion = "URGENTE" | "INFORMATIVO" | "CONVOCATORIA";

// Destinos
export type Destino =
  | "Comisaría Central"
  | "Jefatura Superior"
  | "UPR Norte"
  | "UPR Sur"
  | "Brigada Provincial"
  | "Grupo Operativo"
  | "UDEV";

// Roles
export type Rol = "Super Admin" | "Admin" | "Moderador";

// Categorías de documentos (admin)
export type CategoriaDocumentoAdmin =
  | "Exp. Disciplinario"
  | "Recursos CA"
  | "Exp. Administrativos"
  | "Actos Servicio"
  | "Asuntos Personales";

// Categorías de documentos (general)
export type CategoriaDocumento =
  | "Convenio Colectivo"
  | "Normativa Interna"
  | "Circular Informativa"
  | "Acta Reunión"
  | "Formación"
  | "Prevención Riesgos"
  | "Otros";

// Interfaces de entidades
export interface Afiliado {
  id: string;
  tip: string;
  nombreCompleto: string;
  email: string;
  telefono: string;
  destino: Destino | string;
  fechaAlta: string;
  estado: EstadoAfiliado;
}

export interface Solicitud {
  id: string;
  referencia: string;
  afiliadoId: string;
  afiliadoNombre: string;
  afiliadoTip: string;
  tipo: TipoSolicitud;
  descripcion: string;
  urgencia: Urgencia;
  estado: EstadoSolicitud;
  fechaCreacion: string;
  asignadoA?: string;
}

export interface Documento {
  id: string;
  nombre: string;
  categoria: CategoriaDocumento | string;
  estado: EstadoDocumento;
  fechaSubida: string;
  tamaño: string;
  subidoPor: string;
}

export interface Comunicacion {
  id: string;
  tipo: TipoComunicacion;
  asunto: string;
  contenido: string;
  fechaEnvio: string;
  destinatarios: number;
  abiertos: number;
}

export interface Usuario {
  id: string;
  nombre: string;
  email: string;
  rol: Rol;
  ultimoAcceso: string;
  estado: "Activo" | "Inactivo";
}

export interface Abogado {
  id: string;
  nombre: string;
  especialidad: string;
  email: string;
  telefono: string;
  casosActivos: number;
  estado: "Activo" | "Inactivo";
}
