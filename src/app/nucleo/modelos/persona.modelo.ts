export interface Persona {
  id_persona: string;
  ci: string;
  paterno: string;
  materno: string;
  nombres: string;
  fecha_nacimiento: string; // O puedes usar el tipo Date si lo transformas
  sexo: 'M' | 'F';
  tipo: string;
  procedencia: string;
}
