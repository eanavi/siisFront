// Interfaz para la estructura de la dirección
export interface DireccionDetalle {
  calle: string;
  numero: string;
  zona: string;
}

// Interfaz para el objeto que contiene el tipo y el detalle de la dirección
export interface Direccion {
  direccion: DireccionDetalle;
  tipo: string;
}

// Interfaz para la estructura del teléfono
export interface Telefono {
  celular: string;
  fijo: string;
}

// Interfaz para la estructura del correo
export interface Correo {
  domicilio: string;
  personal: string;
}

// La interfaz principal para el Paciente
export interface Paciente {
  id_persona: string;
  id_paciente: number;
  tipo: string;
  ci: string;
  paterno: string;
  materno: string;
  nombres: string;
  fecha_nacimiento: string; // Puede ser tipo Date si se transforma
  sexo: 'M' | 'F';
  direccion: Direccion[]; // Un array de objetos Direccion
  telefono: Telefono;
  correo: Correo;
}
