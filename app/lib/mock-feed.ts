export type TipoPost = "logro" | "actividad" | "anuncio";

export interface PostMock {
  id: string;
  tipo: TipoPost;
  autor: string;
  iniciales?: string;
  hora: string;
  destinatarios: string;
  texto: string;
  foto?: { etiqueta: string };
  corazones: number;
  comentarios: number;
}

export const usuarioActual = {
  nombre: "Caro Giménez",
  rol: "Maestra",
  sala: "Soles",
  iniciales: "C",
};

export const feedPosts: PostMock[] = [
  {
    id: "logro-orinal",
    tipo: "logro",
    autor: "Mateo",
    iniciales: "M",
    hora: "14:20",
    destinatarios: "familia de Mateo",
    texto: "¡Usó el orinal solito por primera vez! Estaba feliz de contárselo a todos. Un gran paso.",
    corazones: 3,
    comentarios: 1,
  },
  {
    id: "actividad-temperas",
    tipo: "actividad",
    autor: "Mateo",
    iniciales: "M",
    hora: "09:40",
    destinatarios: "familia de Mateo",
    texto: "Pintamos con témperas esta mañana. Mateo eligió el azul para todo y se concentró un montón mezclando colores.",
    foto: { etiqueta: "Foto · pintando con témperas" },
    corazones: 5,
    comentarios: 2,
  },
  {
    id: "anuncio-parque",
    tipo: "anuncio",
    autor: "Anuncio general",
    hora: "07:50",
    destinatarios: "toda la sala",
    texto: "El viernes salimos al parque por la mañana. Recuerden mandar gorra y una botellita de agua.",
    corazones: 8,
    comentarios: 0,
  },
];
